"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { CampaignCard } from "@/components/campaign/campaign-card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { campaignService } from "@/lib/services/campaign.service"
import { useAuth } from "@/lib/contexts/auth-context"
import { ErrorHandler } from "@/lib/utils/error-handler"
import type { Campaign } from "@/lib/data/campaign-data"
import { useParams } from "next/navigation"

// Transform API campaign to component format
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

export default function BrandDetailPage() {
  const params = useParams()
  const { user } = useAuth()
  const [brandCampaigns, setBrandCampaigns] = useState<Campaign[]>([])
  const [brandName, setBrandName] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const brandId = params.id as string

  useEffect(() => {
    const fetchBrandCampaigns = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const userId = user?.id
        console.log('📡 Fetching campaigns for brand:', brandId, 'userId:', userId)

        // Get all campaigns
        const response = await campaignService.getAllCampaigns(userId)
        
        if (response.success && response.data) {
          const responseData = response.data as any
          let allCampaigns: any[] = []
          
          if (Array.isArray(responseData)) {
            allCampaigns = responseData
          } else if (responseData.campaigns && Array.isArray(responseData.campaigns)) {
            allCampaigns = responseData.campaigns
          } else if (responseData.data && Array.isArray(responseData.data)) {
            allCampaigns = responseData.data
          }

          // Filter campaigns by brand (matching the slug)
          const filtered = allCampaigns
            .map(transformCampaign)
            .filter((campaign) => {
              const campaignBrandSlug = campaign.brand.toLowerCase().replace(/\s+/g, "-")
              return campaignBrandSlug === brandId
            })

          if (filtered.length > 0) {
            setBrandName(filtered[0].brand)
            setBrandCampaigns(filtered)
            console.log(`✅ Loaded ${filtered.length} campaigns for brand: ${filtered[0].brand}`)
          } else {
            setError('No campaigns found for this brand')
          }
        } else {
          setError(response.message || 'Failed to load campaigns')
        }
      } catch (err: any) {
        const appError = ErrorHandler.handleApiError(err)
        ErrorHandler.logError(appError, 'Brand Detail Page')
        const errorMessage = ErrorHandler.getUserFriendlyMessage(appError)
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    if (brandId) {
      fetchBrandCampaigns()
    }
  }, [brandId, user])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#171a00] to-black text-white">
      <Navbar />

      <main className="pt-32 pb-12">
        <div className="container mx-auto px-6 max-w-7xl">
          <Link
            href="/brands"
            className="inline-flex items-center gap-2 text-sm text-[#cced00] hover:text-[#d6ff2f] transition-colors mb-8"
          >
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 text-black" />
            </div>
            Go back
          </Link>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-white/60">Loading campaigns...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-400">{error}</p>
            </div>
          ) : brandCampaigns.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/60">No campaigns found for this brand.</p>
            </div>
          ) : (
            <>
              <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase">{brandName}</h1>
                <div className="text-sm text-white/60">
                  {brandCampaigns.length} {brandCampaigns.length === 1 ? "campaign" : "campaigns"}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {brandCampaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} {...campaign} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
