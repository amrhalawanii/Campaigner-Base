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

const productNames: Record<string, string> = {
  fashion: "Fashion & Apparel",
  electronics: "Electronics & Tech",
  beauty: "Beauty & Cosmetics",
  "food-beverage": "Food & Beverage",
  home: "Home & Furniture",
  automotive: "Automotive",
  sports: "Sports & Fitness",
  entertainment: "Entertainment",
}

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
      tags: apiCampaign.tags || apiCampaign.categories || [],
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

export default function ProductDetailPage() {
  const params = useParams()
  const { user } = useAuth()
  const [productCampaigns, setProductCampaigns] = useState<Campaign[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const productId = params.id as string
  const productName = productNames[productId] || "Product"

  useEffect(() => {
    const fetchProductCampaigns = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const userId = user?.id
        console.log('📡 Fetching campaigns for product:', productId, 'userId:', userId)

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

          // Filter campaigns by product (checking tags/categories)
          const filtered = allCampaigns
            .map(transformCampaign)
            .filter((campaign) => {
              if (!campaign.tags || campaign.tags.length === 0) return false
              return campaign.tags.some((tag: string) => 
                tag.toLowerCase().includes(productId.toLowerCase())
              )
            })

          setProductCampaigns(filtered)
          console.log(`✅ Loaded ${filtered.length} campaigns for product: ${productName}`)
        } else {
          setError(response.message || 'Failed to load campaigns')
        }
      } catch (err: any) {
        const appError = ErrorHandler.handleApiError(err)
        ErrorHandler.logError(appError, 'Product Detail Page')
        const errorMessage = ErrorHandler.getUserFriendlyMessage(appError)
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    if (productId) {
      fetchProductCampaigns()
    }
  }, [productId, productName, user])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#171a00] to-black text-white">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <Link
            href="/product"
            className="inline-flex items-center gap-2 mb-8 text-[#cced00] hover:text-[#d6ff2f] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#CCED00] flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 text-black" />
            </div>
            <span className="text-sm font-medium">Go back</span>
          </Link>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-white/60">Loading campaigns...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-400">{error}</p>
            </div>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl font-bold mb-12 uppercase">{productName} Campaigns</h1>

              {productCampaigns.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {productCampaigns.map((campaign) => (
                    <CampaignCard key={campaign.id} {...campaign} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-white/60 text-lg">No campaigns found for this product category.</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
