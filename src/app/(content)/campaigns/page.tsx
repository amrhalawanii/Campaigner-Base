"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { CampaignCard } from "@/components/campaign/campaign-card"
import { campaignService } from "@/lib/services/campaign.service"
import { useAuth } from "@/lib/contexts/auth-context"
import { ErrorHandler, type AppError } from "@/lib/utils/error-handler"
import type { Campaign } from "@/lib/data/campaign-data"

// Transform API campaign to component format
// Handles both nested object format (brand: {name: "..."}) and flat format (brand_name: "...")
function transformCampaign(apiCampaign: any): Campaign {
  // Handle image URL - if it's a relative path, keep it; if it's a full URL, use it as is
  let imageUrl = apiCampaign.cover_image
  if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('/')) {
    // If it's a relative path without leading slash, add one
    imageUrl = `/${imageUrl}`
  }

  // Handle brand name - support both nested object and flat string
  let brandName = 'Unknown Brand'
  if (apiCampaign.brand?.name) {
    brandName = apiCampaign.brand.name
  } else if (apiCampaign.brand_name) {
    brandName = apiCampaign.brand_name
  }

  // Handle agency name - support both nested object and flat string
  let agencyName: string | undefined
  if (apiCampaign.agency?.name) {
    agencyName = apiCampaign.agency.name
  } else if (apiCampaign.agency_name) {
    agencyName = apiCampaign.agency_name
  }

  // Handle is_saved - can be boolean, number (0/1), or undefined
  const isSaved = apiCampaign.is_saved === true || apiCampaign.is_saved === 1 || apiCampaign.is_saved === '1'

  // Handle ID - can be string or number
  const campaignId = typeof apiCampaign.id === 'string' ? parseInt(apiCampaign.id, 10) : apiCampaign.id

  return {
    id: campaignId,
    title: apiCampaign.title || '',
    brand: brandName,
    image: imageUrl || '/placeholder.svg',
    description: apiCampaign.description || '',
    saved: isSaved,
    agency: agencyName,
    year: apiCampaign.launch_date && apiCampaign.launch_date !== '0000-00-00 00:00:00' 
      ? new Date(apiCampaign.launch_date).getFullYear() 
      : undefined,
  }
}

export default function AllCampaignsPage() {
  const { user } = useAuth()
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const userId = user?.id
        const response = await campaignService.getAllCampaigns(userId)
        console.log('All campaigns API response:', response)

        if (response.success && response.data) {
          const responseData = response.data as any
          let campaignsData: Campaign[] = []

          if (Array.isArray(responseData)) {
            campaignsData = responseData.map(transformCampaign)
          } else if (responseData.campaigns && Array.isArray(responseData.campaigns)) {
            campaignsData = responseData.campaigns.map(transformCampaign)
          } else if (responseData.data && Array.isArray(responseData.data)) {
            campaignsData = responseData.data.map(transformCampaign)
          }

          setCampaigns(campaignsData)
          console.log(`Loaded ${campaignsData.length} campaigns`)
        } else {
          setError(response.message || 'No campaigns found')
        }
      } catch (err: any) {
        // Handle error - might already be an AppError from the interceptor
        let appError: AppError;
        if (err && typeof err === 'object' && 'type' in err && 'message' in err) {
          // Already an AppError
          appError = err as AppError;
        } else {
          // Convert to AppError
          appError = ErrorHandler.handleApiError(err);
        }
        
        ErrorHandler.logError(appError, 'All Campaigns Page - Fetch Campaigns')
        const errorMessage = ErrorHandler.getUserFriendlyMessage(appError)
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCampaigns()
  }, [user])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#171a00] to-black text-white">
      <Navbar />

      <main className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">All Campaigns</h1>
            <p className="text-gray-400">
              {isLoading 
                ? 'Loading campaigns...' 
                : campaigns.length > 0 
                  ? `Showing ${campaigns.length} campaign${campaigns.length !== 1 ? 's' : ''}`
                  : 'No campaigns available'}
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                <p className="text-gray-400">Loading campaigns...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-2 text-red-400">Error Loading Campaigns</h2>
              <p className="text-gray-300">{error}</p>
            </div>
          )}

          {/* Campaigns Grid */}
          {!isLoading && !error && campaigns.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {campaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  id={campaign.id}
                  title={campaign.title}
                  brand={campaign.brand}
                  image={campaign.image}
                  saved={campaign.saved}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && campaigns.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg mb-4">No campaigns available at the moment.</p>
              <p className="text-gray-500">Check back later for new campaigns.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

