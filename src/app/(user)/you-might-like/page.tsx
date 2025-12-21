"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { CampaignCard } from "@/components/campaign/campaign-card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { campaignService } from "@/lib/services/campaign.service"
import { useAuth } from "@/lib/contexts/auth-context"
import { ErrorHandler } from "@/lib/utils/error-handler"
import type { Campaign } from "@/lib/data/campaign-data"

// Transform API campaign to component format (same as my-campaigns)
function transformCampaign(apiCampaign: any): Campaign {
  try {
    let imageUrl = apiCampaign.cover_image || apiCampaign.image || apiCampaign.coverImage
    if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('/')) {
      imageUrl = `/${imageUrl}`
    }

    let brandName = 'Unknown Brand'
    if (apiCampaign.brand?.name) {
      brandName = apiCampaign.brand.name
    } else if (apiCampaign.brand_name) {
      brandName = apiCampaign.brand_name
    } else if (apiCampaign.brand) {
      brandName = String(apiCampaign.brand)
    }

    let agencyName: string | undefined
    if (apiCampaign.agency?.name) {
      agencyName = apiCampaign.agency.name
    } else if (apiCampaign.agency_name) {
      agencyName = apiCampaign.agency_name
    } else if (apiCampaign.agency) {
      agencyName = String(apiCampaign.agency)
    }

    const isSaved = apiCampaign.is_saved === true || apiCampaign.is_saved === 1 || apiCampaign.is_saved === '1'

    let campaignId: number
    if (typeof apiCampaign.id === 'string') {
      campaignId = parseInt(apiCampaign.id, 10)
      if (isNaN(campaignId)) {
        campaignId = 0
      }
    } else if (typeof apiCampaign.id === 'number') {
      campaignId = apiCampaign.id
    } else {
      campaignId = 0
    }

    return {
      id: campaignId,
      title: apiCampaign.title || apiCampaign.name || 'Untitled Campaign',
      brand: brandName,
      image: imageUrl || '/placeholder.svg',
      description: apiCampaign.description || '',
      saved: isSaved,
      agency: agencyName,
      year: apiCampaign.launch_date && apiCampaign.launch_date !== '0000-00-00 00:00:00' 
        ? new Date(apiCampaign.launch_date).getFullYear() 
        : undefined,
    }
  } catch (error) {
    console.error('Error transforming campaign:', error, apiCampaign)
    return {
      id: apiCampaign.id || 0,
      title: apiCampaign.title || 'Unknown Campaign',
      brand: 'Unknown Brand',
      image: '/placeholder.svg',
      description: '',
      saved: false,
    }
  }
}

export default function YouMightLikePage() {
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
        console.log('📡 Fetching you might like campaigns, userId:', userId)

        // Get home page data to extract you_might_like
        const homePageResponse = await campaignService.getHomePageData(userId || 0)
        
        if (homePageResponse.success && homePageResponse.data) {
          const data = homePageResponse.data as any
          let youMightLikeData: Campaign[] = []

          // Extract campaigns from you_might_like collection
          if (data.you_might_like) {
            if (Array.isArray(data.you_might_like)) {
              youMightLikeData = data.you_might_like.map(transformCampaign)
            } else if (typeof data.you_might_like === 'object' && data.you_might_like.items && Array.isArray(data.you_might_like.items)) {
              youMightLikeData = data.you_might_like.items.map(transformCampaign)
            }
          }

          // If no you_might_like found, try to get all campaigns as fallback
          if (youMightLikeData.length === 0) {
            console.log('ℹ️ No you_might_like found, fetching all campaigns as fallback')
            const allCampaignsResponse = await campaignService.getAllCampaigns(userId)
            if (allCampaignsResponse.success && allCampaignsResponse.data) {
              const responseData = allCampaignsResponse.data as any
              let allCampaigns: any[] = []
              
              if (Array.isArray(responseData)) {
                allCampaigns = responseData
              } else if (responseData.campaigns && Array.isArray(responseData.campaigns)) {
                allCampaigns = responseData.campaigns
              } else if (responseData.data && Array.isArray(responseData.data)) {
                allCampaigns = responseData.data
              }

              youMightLikeData = allCampaigns.map(transformCampaign)
            }
          }

          setCampaigns(youMightLikeData)
          console.log(`✅ Loaded ${youMightLikeData.length} you might like campaigns`)
        } else {
          setError(homePageResponse.message || 'Failed to load campaigns')
        }
      } catch (err: any) {
        const appError = ErrorHandler.handleApiError(err)
        ErrorHandler.logError(appError, 'You Might Like Page')
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

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <Link href="/" className="inline-flex items-center gap-2 mb-8 text-sm text-[#cced00] hover:text-[#d6ff2f] transition-colors">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#CCED00] text-black">
              <ArrowLeft className="w-4 h-4" />
            </span>
            <span>Back to Home</span>
          </Link>

          <h1 className="text-4xl font-bold mb-12 uppercase tracking-tight">You Might Like</h1>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-white/60">Loading campaigns...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-400">{error}</p>
            </div>
          ) : campaigns.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/60">No campaigns found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {campaigns.map((campaign) => (
                <CampaignCard key={campaign.id} {...campaign} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
