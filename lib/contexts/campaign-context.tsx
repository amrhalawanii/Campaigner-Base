"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { campaignService } from "../services/campaign.service"
import { useAuth } from "./auth-context"
import { ErrorHandler } from "../utils/error-handler"
import { toast } from "@/hooks/use-toast"

interface CampaignContextType {
  // Bookmark state management
  bookmarkedCampaigns: Set<number>
  isBookmarked: (campaignId: number) => boolean
  toggleBookmark: (campaignId: number) => Promise<void>
  setBookmarkState: (campaignId: number, isBookmarked: boolean) => void
  syncBookmarkStates: (campaigns: Array<{ id: number; saved?: boolean }>) => void
  // Campaign data storage for quick access
  setCampaignData: (campaignId: number, campaign: any) => void
  getCampaignData: (campaignId: number) => any | null
  // Loading states
  isLoading: (campaignId: number) => boolean
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined)

const STORAGE_KEY = 'bookmarked_campaigns'

export function CampaignProvider({ children }: { children: ReactNode }) {
  const [bookmarkedCampaigns, setBookmarkedCampaigns] = useState<Set<number>>(new Set())
  const [loadingBookmarks, setLoadingBookmarks] = useState<Set<number>>(new Set())
  const [campaignDataMap, setCampaignDataMap] = useState<Map<number, any>>(new Map())
  const { user, isAuthenticated } = useAuth()

  // Load bookmarked campaigns from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const campaignIds = JSON.parse(stored) as number[]
        setBookmarkedCampaigns(new Set(campaignIds))
      }
    } catch (error) {
      console.error('Failed to load bookmarked campaigns from storage:', error)
    }
  }, [])

  // Clear bookmarks when user logs out
  useEffect(() => {
    if (!isAuthenticated && typeof window !== 'undefined') {
      setBookmarkedCampaigns(new Set())
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [isAuthenticated])

  // Save bookmarked campaigns to localStorage whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    try {
      const campaignIds = Array.from(bookmarkedCampaigns)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(campaignIds))
    } catch (error) {
      console.error('Failed to save bookmarked campaigns to storage:', error)
    }
  }, [bookmarkedCampaigns])

  const isBookmarked = useCallback((campaignId: number): boolean => {
    return bookmarkedCampaigns.has(campaignId)
  }, [bookmarkedCampaigns])

  const isLoading = useCallback((campaignId: number): boolean => {
    return loadingBookmarks.has(campaignId)
  }, [loadingBookmarks])

  const setBookmarkState = useCallback((campaignId: number, isBookmarked: boolean) => {
    setBookmarkedCampaigns(prev => {
      const next = new Set(prev)
      if (isBookmarked) {
        next.add(campaignId)
      } else {
        next.delete(campaignId)
      }
      return next
    })
  }, [])

  const syncBookmarkStates = useCallback((campaigns: Array<{ id: number; saved?: boolean }>) => {
    // Only sync bookmark states, don't overwrite user actions
    setBookmarkedCampaigns(prev => {
      const next = new Set(prev)
      campaigns.forEach(campaign => {
        if (campaign && campaign.id) {
          // Only update if we have explicit saved state from API
          if (campaign.saved === true) {
            next.add(campaign.id)
          } else if (campaign.saved === false) {
            // Only remove if explicitly false AND not currently loading
            if (!loadingBookmarks.has(campaign.id)) {
              next.delete(campaign.id)
            }
          }
          // If saved is undefined, don't change the state (preserve user actions)
        }
      })
      return next
    })
    // Also store campaign data for quick access
    setCampaignDataMap(prev => {
      const next = new Map(prev)
      campaigns.forEach(campaign => {
        if (campaign && campaign.id) {
          next.set(campaign.id, campaign)
        }
      })
      return next
    })
  }, [loadingBookmarks])

  const setCampaignData = useCallback((campaignId: number, campaign: any) => {
    setCampaignDataMap(prev => {
      const next = new Map(prev)
      next.set(campaignId, campaign)
      return next
    })
  }, [])

  const getCampaignData = useCallback((campaignId: number): any | null => {
    return campaignDataMap.get(campaignId) || null
  }, [campaignDataMap])

  const toggleBookmark = useCallback(async (campaignId: number) => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save campaigns",
        variant: "destructive",
      })
      return
    }

    // Check current state using functional update to avoid stale closure
    let currentlyBookmarked: boolean = false
    setBookmarkedCampaigns(prev => {
      currentlyBookmarked = prev.has(campaignId)
      return prev // Return unchanged to just read the state
    })

    // Add to loading set
    setLoadingBookmarks(prev => new Set(prev).add(campaignId))

    // Optimistically update UI immediately
    const newState = !currentlyBookmarked
    setBookmarkState(campaignId, newState)

    try {
      const response = await campaignService.toggleSaveCampaign(
        campaignId,
        user.id,
        currentlyBookmarked
      )

      if (response.success) {
        // Update state based on API response
        const apiSavedState = response.data?.is_saved ?? newState
        setBookmarkState(campaignId, apiSavedState)
        toast({
          title: apiSavedState ? "Campaign Saved" : "Campaign Removed",
          description: apiSavedState
            ? "This campaign has been added to your saved campaigns"
            : "This campaign has been removed from your saved campaigns",
        })
      } else {
        // Revert on failure
        setBookmarkState(campaignId, currentlyBookmarked)
        toast({
          title: "Error",
          description: response.message || "Failed to update bookmark",
          variant: "destructive",
        })
      }
    } catch (error) {
      // Revert on error
      setBookmarkState(campaignId, currentlyBookmarked)
      const appError = ErrorHandler.handleApiError(error)
      const errorMessage = ErrorHandler.getUserFriendlyMessage(appError)
      ErrorHandler.logError(appError, 'Campaign Context - Toggle Bookmark')
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      // Remove from loading set
      setLoadingBookmarks(prev => {
        const next = new Set(prev)
        next.delete(campaignId)
        return next
      })
    }
  }, [isAuthenticated, user, setBookmarkState])

  return (
    <CampaignContext.Provider
      value={{
        bookmarkedCampaigns,
        isBookmarked,
        toggleBookmark,
        setBookmarkState,
        syncBookmarkStates,
        setCampaignData,
        getCampaignData,
        isLoading,
      }}
    >
      {children}
    </CampaignContext.Provider>
  )
}

export function useCampaign() {
  const context = useContext(CampaignContext)
  if (context === undefined) {
    throw new Error("useCampaign must be used within a CampaignProvider")
  }
  return context
}

