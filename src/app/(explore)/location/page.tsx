"use client"

import { useState, useEffect, useMemo } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"
import { ArrowLeft, ChevronRight, Search, MapPin } from "lucide-react"
import { campaignService } from "@/lib/services/campaign.service"
import { useAuth } from "@/lib/contexts/auth-context"
import { ErrorHandler } from "@/lib/utils/error-handler"

interface Location {
  id: string
  country: string
  region?: string
  campaignCount: number
  displayName: string
}

export default function LocationPage() {
  const { user } = useAuth()
  const [locations, setLocations] = useState<Location[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const userId = user?.id
        console.log('📡 Fetching locations, userId:', userId)

        // Get all campaigns to extract unique locations
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

          // Extract unique locations
          const locationMap = new Map<string, { country: string; region?: string; count: number }>()
          
          allCampaigns.forEach((campaign: any) => {
            let country: string | undefined
            let region: string | undefined

            // Handle location from nested object
            if (campaign.location) {
              if (typeof campaign.location === 'object') {
                country = campaign.location.country
                region = campaign.location.region
              }
            }

            // Handle flat structure
            if (!country && campaign.country) {
              country = campaign.country
            }
            if (!region && campaign.region) {
              region = campaign.region
            }

            if (country) {
              // Create a unique key for country + region combination
              const locationKey = region 
                ? `${country}::${region}`.toLowerCase()
                : country.toLowerCase()
              
              const displayName = region 
                ? `${country}, ${region}`
                : country

              const existing = locationMap.get(locationKey)
              if (existing) {
                existing.count++
              } else {
                locationMap.set(locationKey, {
                  country,
                  region,
                  count: 1
                })
              }
            }
          })

          // Convert to array and sort
          const locationsList: Location[] = Array.from(locationMap.entries())
            .map(([key, data]) => {
              const slug = key.replace(/\s+/g, "-").replace(/::/g, "-")
              return {
                id: slug,
                country: data.country,
                region: data.region,
                campaignCount: data.count,
                displayName: data.region 
                  ? `${data.country}, ${data.region}`
                  : data.country
              }
            })
            .sort((a, b) => {
              // Sort by country first, then region
              if (a.country !== b.country) {
                return a.country.localeCompare(b.country)
              }
              if (a.region && b.region) {
                return a.region.localeCompare(b.region)
              }
              return 0
            })

          setLocations(locationsList)
          console.log(`✅ Loaded ${locationsList.length} locations`)
        } else {
          setError(response.message || 'Failed to load locations')
        }
      } catch (err: any) {
        const appError = ErrorHandler.handleApiError(err)
        ErrorHandler.logError(appError, 'Location Page')
        const errorMessage = ErrorHandler.getUserFriendlyMessage(appError)
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLocations()
  }, [user])

  const filteredLocations = useMemo(() => {
    if (!searchQuery.trim()) return locations

    return locations.filter((location) =>
      location.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (location.region && location.region.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }, [locations, searchQuery])

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
          

          <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase">SELECT A LOCATION</h1>
          <p className="text-white/60 mb-6">Browse campaigns by country and region</p>

          {/* Search Bar */}
          <div className="relative mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white/70 pointer-events-none shrink-0" />
            <input
              type="text"
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full backdrop-blur-[15px] bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all h-14"
            />
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-white/60">Loading locations...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-400">{error}</p>
            </div>
          ) : filteredLocations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/60">No locations found.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredLocations.map((location) => (
                <Link
                  key={location.id}
                  href={`/location/${location.id}`}
                  className="group backdrop-blur-[25px] bg-[rgba(8,33,37,0.1)] border border-[rgba(57,77,81,0.3)] rounded-xl p-6 hover:bg-[#CCED00] hover:border-[#CCED00] transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-white/70 group-hover:text-black transition-colors" />
                        <h3 className="text-2xl font-bold text-white group-hover:text-black transition-colors">
                          {location.displayName}
                        </h3>
                      </div>
                      <div className="text-sm text-white/70 group-hover:text-black/70 transition-colors">
                        {location.campaignCount} {location.campaignCount === 1 ? "campaign" : "campaigns"}
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

