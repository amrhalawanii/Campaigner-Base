"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { CampaignCard } from "@/components/campaign/campaign-card"
import Link from "next/link"
import { ArrowLeft, MapPin } from "lucide-react"
import { campaignService } from "@/lib/services/campaign.service"
import { useAuth } from "@/lib/contexts/auth-context"
import { useCampaign } from "@/lib/contexts/campaign-context"
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

export default function LocationDetailPage() {
  const params = useParams()
  const { user } = useAuth()
  const { syncBookmarkStates, setCampaignData } = useCampaign()
  const [locationCampaigns, setLocationCampaigns] = useState<Campaign[]>([])
  const [locationName, setLocationName] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const locationId = params.id as string

  useEffect(() => {
    const fetchLocationCampaigns = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const userId = user?.id
        console.log('📡 Fetching campaigns for location:', locationId, 'userId:', userId)

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

          // Transform all campaigns first
          const transformedCampaigns = allCampaigns.map(transformCampaign)
          
          // Store campaign data in context
          transformedCampaigns.forEach(campaign => {
            if (campaign && campaign.id) {
              setCampaignData(campaign.id, campaign)
            }
          })
          
          // Sync bookmark states
          syncBookmarkStates(transformedCampaigns)

          // Filter campaigns by location (matching the slug)
          const filtered = transformedCampaigns.filter((campaign) => {
            // We need to get location from the original API campaign
            const originalCampaign = allCampaigns.find(c => {
              const transformed = transformCampaign(c)
              return transformed.id === campaign.id
            })
            
            if (!originalCampaign) return false

            let country: string | undefined
            let region: string | undefined

            // Handle location from nested object
            if (originalCampaign.location) {
              if (typeof originalCampaign.location === 'object') {
                country = originalCampaign.location.country
                region = originalCampaign.location.region
              }
            }

            // Handle flat structure
            if (!country && originalCampaign.country) {
              country = originalCampaign.country
            }
            if (!region && originalCampaign.region) {
              region = originalCampaign.region
            }

            if (!country) return false

            // Create location slug to match (same format as list page)
            // List page creates: key = "country::region" then slug = key.replace(/\s+/g, "-").replace(/::/g, "-")
            const locationKey = region 
              ? `${country}::${region}`.toLowerCase()
              : country.toLowerCase()
            
            const locationSlug = locationKey.replace(/\s+/g, "-").replace(/::/g, "-")

            return locationSlug === locationId
          })

          if (filtered.length > 0) {
            // Get location name from first campaign
            const firstOriginal = allCampaigns.find(c => {
              const transformed = transformCampaign(c)
              return transformed.id === filtered[0].id
            })
            
            let country: string | undefined
            let region: string | undefined
            
            if (firstOriginal?.location) {
              if (typeof firstOriginal.location === 'object') {
                country = firstOriginal.location.country
                region = firstOriginal.location.region
              }
            }
            
            if (!country && firstOriginal?.country) {
              country = firstOriginal.country
            }
            if (!region && firstOriginal?.region) {
              region = firstOriginal.region
            }

            const displayName = region 
              ? `${country}, ${region}`
              : country || 'Unknown Location'

            setLocationName(displayName)
            setLocationCampaigns(filtered)
            console.log(`✅ Loaded ${filtered.length} campaigns for location: ${displayName}`)
          } else {
            setError('No campaigns found for this location')
          }
        } else {
          setError(response.message || 'Failed to load campaigns')
        }
      } catch (err: any) {
        const appError = ErrorHandler.handleApiError(err)
        ErrorHandler.logError(appError, 'Location Detail Page')
        const errorMessage = ErrorHandler.getUserFriendlyMessage(appError)
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    if (locationId) {
      fetchLocationCampaigns()
    }
  }, [locationId, user, syncBookmarkStates, setCampaignData])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#171a00] to-black text-white">
      <Navbar />

      <main className="pt-32 pb-12">
        <div className="container mx-auto px-6 max-w-7xl">
          <Link
            href="/location"
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
          ) : locationCampaigns.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/60">No campaigns found for this location.</p>
            </div>
          ) : (
            <>
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-8 h-8 text-[#cced00]" />
                  <h1 className="text-4xl md:text-5xl font-bold uppercase">{locationName}</h1>
                </div>
                <div className="text-sm text-white/60">
                  {locationCampaigns.length} {locationCampaigns.length === 1 ? "campaign" : "campaigns"}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {locationCampaigns.map((campaign) => (
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

