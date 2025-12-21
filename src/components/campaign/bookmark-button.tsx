"use client"

import { useEffect, useRef } from "react"
import { Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCampaign } from "@/lib/contexts/campaign-context"

interface BookmarkButtonProps {
  campaignId: number
  initialSaved?: boolean
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function BookmarkButton({ 
  campaignId, 
  initialSaved = false,
  variant = "outline",
  size = "icon",
  className = ""
}: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark, isLoading, setBookmarkState } = useCampaign()
  const hasSyncedInitialState = useRef(false)
  const lastCampaignId = useRef(campaignId)

  // Sync initial saved state with context ONLY on mount or when campaignId changes
  useEffect(() => {
    // Reset sync flag if campaign ID changes
    if (lastCampaignId.current !== campaignId) {
      hasSyncedInitialState.current = false
      lastCampaignId.current = campaignId
    }

    // Only sync once per campaign ID, and only if:
    // 1. We haven't synced yet for this campaign
    // 2. We have an initial saved value
    // 3. Not currently loading (to avoid race conditions)
    if (!hasSyncedInitialState.current && initialSaved !== undefined && !isLoading(campaignId)) {
      const currentState = isBookmarked(campaignId)
      // Only sync if the state doesn't match (to avoid unnecessary updates)
      if (currentState !== initialSaved) {
        setBookmarkState(campaignId, initialSaved)
      }
      hasSyncedInitialState.current = true
    }
  }, [campaignId, initialSaved, isBookmarked, isLoading, setBookmarkState])

  // Get current bookmark state from context (this is the source of truth)
  const saved = isBookmarked(campaignId)
  const isBookmarkLoading = isLoading(campaignId)

  return (
    <Button
      size={size}
      variant={variant}
      onClick={() => toggleBookmark(campaignId)}
      disabled={isBookmarkLoading}
      className={className}
      aria-label={saved ? "Remove from saved" : "Save campaign"}
    >
      <Bookmark 
        className={`w-5 h-5 ${saved ? "fill-[#CCED00] text-[#CCED00]" : "text-white"} group-hover:text-[#CCED00] transition-colors duration-200`} 
      />
    </Button>
  )
}

