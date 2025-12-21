"use client"

import { useState, useEffect, useMemo } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"
import { ArrowLeft, ChevronRight, Search } from "lucide-react"
import { campaignService } from "@/lib/services/campaign.service"
import { useAuth } from "@/lib/contexts/auth-context"
import { ErrorHandler } from "@/lib/utils/error-handler"

interface Brand {
  id: string
  name: string
  campaignCount: number
}

export default function BrandsPage() {
  const { user } = useAuth()
  const [brands, setBrands] = useState<Brand[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const userId = user?.id
        console.log('📡 Fetching brands, userId:', userId)

        // Get all campaigns to extract unique brands
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

          // Extract unique brands
          const brandMap = new Map<string, number>()
          
          allCampaigns.forEach((campaign: any) => {
            let brandName = 'Unknown Brand'
            if (campaign.brand?.name) {
              brandName = campaign.brand.name
            } else if (campaign.brand_name) {
              brandName = campaign.brand_name
            } else if (campaign.brand) {
              brandName = String(campaign.brand)
            }

            if (brandName !== 'Unknown Brand') {
              brandMap.set(brandName, (brandMap.get(brandName) || 0) + 1)
            }
          })

          // Convert to array and sort
          const brandsList: Brand[] = Array.from(brandMap.entries())
            .map(([name, count]) => ({
              id: name.toLowerCase().replace(/\s+/g, "-"),
              name,
              campaignCount: count,
            }))
            .sort((a, b) => a.name.localeCompare(b.name))

          setBrands(brandsList)
          console.log(`✅ Loaded ${brandsList.length} brands`)
        } else {
          setError(response.message || 'Failed to load brands')
        }
      } catch (err: any) {
        const appError = ErrorHandler.handleApiError(err)
        ErrorHandler.logError(appError, 'Brands Page')
        const errorMessage = ErrorHandler.getUserFriendlyMessage(appError)
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBrands()
  }, [user])

  const filteredBrands = useMemo(() => {
    if (!searchQuery.trim()) return brands

    return brands.filter((brand) =>
      brand.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [brands, searchQuery])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#171a00] to-black text-white">
      <Navbar />

      <main className="pt-32 pb-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#cced00] hover:text-[#d6ff2f] transition-colors mb-8"
          >
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 text-black" />
            </div>
            Go back
          </Link>
          

          <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase">SELECT A BRAND</h1>
          <p className="text-white/60 mb-6">Browse campaigns by brand</p>

          {/* Search Bar */}
          <div className="relative mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white/70 pointer-events-none shrink-0" />
            <input
              type="text"
              placeholder="Search brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full backdrop-blur-[15px] bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all h-14"
            />
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-white/60">Loading brands...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-400">{error}</p>
            </div>
          ) : filteredBrands.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/60">No brands found.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredBrands.map((brand) => (
                <Link
                  key={brand.id}
                  href={`/brands/${brand.id}`}
                  className="group backdrop-blur-[25px] bg-[rgba(8,33,37,0.1)] border border-[rgba(57,77,81,0.3)] rounded-xl p-6 hover:bg-[#CCED00] hover:border-[#CCED00] transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-black transition-colors">{brand.name}</h3>
                      <div className="text-sm text-white/70 group-hover:text-black/70 transition-colors">
                        {brand.campaignCount} {brand.campaignCount === 1 ? "campaign" : "campaigns"}
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-white/70 group-hover:text-black transition-colors flex-shrink-0 ml-4" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
