"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { CategoryTile } from "@/components/shared/category-tile"
import { CategoryCarousel } from "@/components/shared/category-carousel"
import { CampaignCard } from "@/components/campaign/campaign-card"
import { CaseStudyCard } from "@/components/campaign/case-study-card"
import { campaignService } from "@/lib/services/campaign.service"
import { useAuth } from "@/lib/contexts/auth-context"
import { useCampaign } from "@/lib/contexts/campaign-context"
import { ErrorHandler } from "@/lib/utils/error-handler"
import type { Campaign as ApiCampaign } from "@/lib/types/api.types"
import type { Campaign } from "@/lib/data/campaign-data"

// Transform API campaign to component format
// Handles both nested object format (brand: {name: "..."}) and flat format (brand_name: "...")
function transformCampaign(apiCampaign: any): Campaign {
  try {
    // Handle image URL - if it's a relative path, keep it; if it's a full URL, use it as is
    let imageUrl = apiCampaign.cover_image || apiCampaign.image || apiCampaign.coverImage
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
    } else if (apiCampaign.brand) {
      brandName = String(apiCampaign.brand)
    }

    // Handle agency name - support both nested object and flat string
    let agencyName: string | undefined
    if (apiCampaign.agency?.name) {
      agencyName = apiCampaign.agency.name
    } else if (apiCampaign.agency_name) {
      agencyName = apiCampaign.agency_name
    } else if (apiCampaign.agency) {
      agencyName = String(apiCampaign.agency)
    }

    // Handle is_saved - can be boolean, number (0/1), or undefined
    const isSaved = apiCampaign.is_saved === true || apiCampaign.is_saved === 1 || apiCampaign.is_saved === '1'

    // Handle ID - can be string or number
    let campaignId: number
    if (typeof apiCampaign.id === 'string') {
      campaignId = parseInt(apiCampaign.id, 10)
      if (isNaN(campaignId)) {
        console.warn('Invalid campaign ID (string):', apiCampaign.id)
        campaignId = 0
      }
    } else if (typeof apiCampaign.id === 'number') {
      campaignId = apiCampaign.id
    } else {
      console.warn('Missing or invalid campaign ID:', apiCampaign)
      campaignId = 0
    }

    const transformed = {
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

    return transformed
  } catch (error) {
    console.error('Error transforming campaign:', error, apiCampaign)
    // Return a safe fallback campaign
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

export default function HomePage() {
  const { user } = useAuth()
  const { syncBookmarkStates, bookmarkedCampaigns, getCampaignData, setCampaignData } = useCampaign()
  const [allCampaigns, setAllCampaigns] = useState<Campaign[]>([])
  const [myCampaigns, setMyCampaigns] = useState<Campaign[]>([])
  const [youMightLike, setYouMightLike] = useState<Campaign[]>([])
  const [trendingCampaigns, setTrendingCampaigns] = useState<Campaign[]>([])
  const [savedCampaigns, setSavedCampaigns] = useState<Campaign[]>([])
  const [caseStudies, setCaseStudies] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const userId = user?.id
        console.log('🏠 Home Page: Starting to fetch campaigns, userId:', userId)

        // Initialize local variables for all campaign sections
        let myCampaignsData: Campaign[] = []
        let youMightLikeData: Campaign[] = []
        let trendingData: Campaign[] = []
        let savedData: Campaign[] = []
        let caseStudiesData: any[] = []
        let allCampaigns: Campaign[] = []
        
        // First, try to get all campaigns as fallback
        try {
          console.log('📡 Fetching all campaigns from API...')
          const allCampaignsResponse = await campaignService.getAllCampaigns(userId)
          console.log('✅ All campaigns API response:', JSON.stringify(allCampaignsResponse, null, 2))
          
          if (allCampaignsResponse.success && allCampaignsResponse.data) {
            const responseData = allCampaignsResponse.data as any
            console.log('📦 Response data type:', Array.isArray(responseData) ? 'Array' : typeof responseData)
            
            if (Array.isArray(responseData)) {
              console.log(`📊 Found ${responseData.length} campaigns in array`)
              allCampaigns = responseData.map(transformCampaign)
              console.log(`✅ Transformed ${allCampaigns.length} campaigns`)
            } else if (responseData.campaigns && Array.isArray(responseData.campaigns)) {
              console.log(`📊 Found ${responseData.campaigns.length} campaigns in responseData.campaigns`)
              allCampaigns = responseData.campaigns.map(transformCampaign)
              console.log(`✅ Transformed ${allCampaigns.length} campaigns`)
            } else if (responseData.data && Array.isArray(responseData.data)) {
              console.log(`📊 Found ${responseData.data.length} campaigns in responseData.data`)
              allCampaigns = responseData.data.map(transformCampaign)
              console.log(`✅ Transformed ${allCampaigns.length} campaigns`)
            } else {
              console.warn('⚠️ Unexpected response structure:', Object.keys(responseData))
            }
          } else {
            console.warn('⚠️ All campaigns response not successful:', allCampaignsResponse.message)
          }
        } catch (err) {
          const appError = ErrorHandler.handleApiError(err)
          ErrorHandler.logError(appError, 'Home Page - Get All Campaigns')
          console.error('❌ Error fetching all campaigns:', err)
          // Continue to try home page data
        }

        // Get home page data for categorized campaigns (primary source)
        try {
          console.log('📡 Fetching home page data from API...')
          const homePageResponse = await campaignService.getHomePageData(userId || 0)
          console.log('✅ Home page API response:', JSON.stringify(homePageResponse, null, 2))
          
          if (homePageResponse.success && homePageResponse.data) {
            const data = homePageResponse.data
            console.log('📦 Home page data type:', Array.isArray(data) ? 'Array' : typeof data)
            
            if (Array.isArray(data)) {
              // If it's an array, use it as trending campaigns
              console.log(`📊 Home page data is array with ${data.length} items, using as trending campaigns`)
              trendingData = data.map(transformCampaign)
              console.log(`✅ Transformed ${trendingData.length} trending campaigns`)
              // Also add to all campaigns if not already there
              const newCampaigns = trendingData.filter(
                c => !allCampaigns.find(ac => ac.id === c.id)
              )
              allCampaigns = [...allCampaigns, ...newCampaigns]
              console.log(`📊 Total campaigns after adding trending: ${allCampaigns.length}`)
            } else if (typeof data === 'object' && data !== null) {
              // Handle object structure with collections
              const dataKeys = Object.keys(data)
              console.log('📦 Home page data structure keys:', dataKeys)
              console.log('📦 Full data structure:', JSON.stringify(data, null, 2))
              
              // Helper function to extract campaigns from either array or object with items
              const extractCampaigns = (source: any, collectionName: string): Campaign[] => {
                if (!source) {
                  console.log(`ℹ️ No ${collectionName} found`)
                  return []
                }
                
                // If it's already an array, use it directly
                if (Array.isArray(source)) {
                  console.log(`📊 Found ${source.length} items in ${collectionName} (direct array)`)
                  return source.map(transformCampaign)
                }
                
                // If it's an object with an items array, extract the items
                if (typeof source === 'object' && source !== null && 'items' in source && Array.isArray(source.items)) {
                  const items = (source as { items: any[] }).items
                  console.log(`📊 Found ${items.length} items in ${collectionName} (from items array)`)
                  return items.map(transformCampaign)
                }
                
                // If it's an object but no items array, log the structure
                if (typeof source === 'object' && source !== null) {
                  console.log(`⚠️ ${collectionName} is an object but has no items array:`, Object.keys(source))
                }
                
                return []
              }
              
              // Process each collection from API response
              myCampaignsData = extractCampaigns(data.my_campaigns, 'my_campaigns')
              if (myCampaignsData.length > 0) {
                console.log(`✅ Loaded ${myCampaignsData.length} my campaigns`)
              }
              
              youMightLikeData = extractCampaigns(data.you_might_like, 'you_might_like')
              if (youMightLikeData.length > 0) {
                console.log(`✅ Loaded ${youMightLikeData.length} you might like campaigns`)
              }
              
              trendingData = extractCampaigns(data.trending_campaigns, 'trending_campaigns')
              if (trendingData.length > 0) {
                console.log(`✅ Loaded ${trendingData.length} trending campaigns`)
              }
              
              savedData = extractCampaigns(data.saved_campaigns, 'saved_campaigns')
              if (savedData.length > 0) {
                console.log(`✅ Loaded ${savedData.length} saved campaigns`)
              }
              
              // Handle case studies (might be different structure)
              if (data.case_studies) {
                if (Array.isArray(data.case_studies)) {
                  caseStudiesData = data.case_studies
                  console.log(`✅ Loaded ${caseStudiesData.length} case studies (direct array)`)
                } else if (typeof data.case_studies === 'object' && data.case_studies !== null && 'items' in data.case_studies && Array.isArray((data.case_studies as { items: any[] }).items)) {
                  caseStudiesData = (data.case_studies as { items: any[] }).items
                  console.log(`✅ Loaded ${caseStudiesData.length} case studies (from items array)`)
                } else {
                  console.log('ℹ️ case_studies found but not in expected format')
                }
              } else {
                console.log('ℹ️ No case_studies found')
              }
              
              // Add all categorized campaigns to allCampaigns
              const allCategorized = [
                ...myCampaignsData,
                ...youMightLikeData,
                ...trendingData,
                ...savedData,
              ]
              console.log(`📊 Total categorized campaigns: ${allCategorized.length}`)
              
              // Remove duplicates by ID
              const uniqueCampaigns = new Map<number, Campaign>()
              allCampaigns.forEach(c => uniqueCampaigns.set(c.id, c))
              allCategorized.forEach(c => uniqueCampaigns.set(c.id, c))
              allCampaigns = Array.from(uniqueCampaigns.values())
              console.log(`📊 Total unique campaigns after merge: ${allCampaigns.length}`)
            } else {
              console.warn('⚠️ Unexpected home page data type:', typeof data)
            }
          } else {
            console.warn('⚠️ Home page API response not successful:', homePageResponse.message)
          }
        } catch (err) {
          const appError = ErrorHandler.handleApiError(err)
          ErrorHandler.logError(appError, 'Home Page - Get Home Page Data')
          console.error('❌ Error fetching home page data:', err)
          // Continue with whatever campaigns we have from getAllCampaigns
        }

        // Fallback: If we have all campaigns but no categorized data, show all campaigns in trending
        if (allCampaigns.length > 0 && trendingData.length === 0) {
          console.log('📊 No trending data, using all campaigns as trending')
          trendingData = allCampaigns
        }

        // Fallback: If we still have campaigns but no specific sections, distribute campaigns across sections
        if (allCampaigns.length > 0 && myCampaignsData.length === 0 && youMightLikeData.length === 0 && savedData.length === 0 && trendingData.length === 0) {
          console.log('📊 No categorized data, distributing campaigns across sections')
          // Split campaigns across different sections
          const chunkSize = Math.ceil(allCampaigns.length / 4)
          myCampaignsData = allCampaigns.slice(0, chunkSize)
          youMightLikeData = allCampaigns.slice(chunkSize, chunkSize * 2)
          savedData = allCampaigns.slice(chunkSize * 2, chunkSize * 3)
          trendingData = allCampaigns.slice(chunkSize * 3)
          console.log(`📊 Distributed ${allCampaigns.length} campaigns across 4 sections`)
        }

        // Final validation: Ensure we have at least trending campaigns if we have any campaigns
        if (allCampaigns.length > 0 && trendingData.length === 0) {
          console.log('📊 Final fallback: Using all campaigns as trending')
          trendingData = allCampaigns
        }

        // Collect all campaigns for bookmark state sync
        const allCampaignsForSync = [
          ...allCampaigns,
          ...myCampaignsData,
          ...youMightLikeData,
          ...trendingData,
          ...savedData,
        ]

        // Store campaign data in context for quick access
        allCampaignsForSync.forEach(campaign => {
          if (campaign && campaign.id) {
            setCampaignData(campaign.id, campaign)
          }
        })

        // Sync bookmark states to global context
        syncBookmarkStates(allCampaignsForSync)

        // Update all state at once
        setAllCampaigns(allCampaigns)
        setMyCampaigns(myCampaignsData)
        setYouMightLike(youMightLikeData)
        setTrendingCampaigns(trendingData)
        setSavedCampaigns(savedData)
        setCaseStudies(caseStudiesData)

        console.log('🎉 Final campaigns loaded:', {
          total: allCampaigns.length,
          allCampaigns: allCampaigns.length,
          myCampaigns: myCampaignsData.length,
          youMightLike: youMightLikeData.length,
          trending: trendingData.length,
          saved: savedData.length,
          caseStudies: caseStudiesData.length,
        })
        
        // Log sample campaign data for debugging
        if (trendingData.length > 0) {
          console.log('📋 Sample trending campaign:', JSON.stringify(trendingData[0], null, 2))
        }
        if (allCampaigns.length > 0) {
          console.log('📋 Sample campaign:', JSON.stringify(allCampaigns[0], null, 2))
        }
      } catch (err: any) {
        const appError = ErrorHandler.handleApiError(err)
        ErrorHandler.logError(appError, 'Home Page - Fetch Campaigns')
        const errorMessage = ErrorHandler.getUserFriendlyMessage(appError)
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCampaigns()
  }, [user]) // Only fetch when user changes, not when bookmarks change

  // Update saved campaigns carousel when bookmarks change
  useEffect(() => {
    // Skip if campaigns haven't been loaded yet
    if (allCampaigns.length === 0 && myCampaigns.length === 0 && trendingCampaigns.length === 0 && youMightLike.length === 0) {
      return
    }

    // Get all campaigns that are currently bookmarked
    const bookmarkedIds = Array.from(bookmarkedCampaigns)
    
    // Create a map of all available campaigns for quick lookup
    const allAvailableCampaigns = new Map<number, Campaign>()
    ;[...allCampaigns, ...myCampaigns, ...trendingCampaigns, ...youMightLike, ...savedCampaigns].forEach(campaign => {
      if (campaign && campaign.id && !allAvailableCampaigns.has(campaign.id)) {
        allAvailableCampaigns.set(campaign.id, campaign)
      }
    })

    const updatedSavedCampaigns = bookmarkedIds
      .map(id => {
        // First try to find in the map of all available campaigns
        const campaign = allAvailableCampaigns.get(id)
        if (campaign) {
          return { ...campaign, saved: true }
        }
        // Try to get from context campaign data map
        const campaignData = getCampaignData(id)
        if (campaignData) {
          return transformCampaign(campaignData)
        }
        return null
      })
      .filter((campaign): campaign is Campaign => campaign !== null)

    // Only update if the list has actually changed (using functional update to avoid dependency)
    setSavedCampaigns(prev => {
      const currentIds = prev.map(c => c.id).sort().join(',')
      const newIds = updatedSavedCampaigns.map(c => c.id).sort().join(',')
      
      if (currentIds !== newIds) {
        console.log('📌 Updated saved campaigns carousel:', {
          previousCount: prev.length,
          newCount: updatedSavedCampaigns.length,
          bookmarkedIds: bookmarkedIds.length
        })
        return updatedSavedCampaigns
      }
      return prev
    })
  }, [bookmarkedCampaigns, allCampaigns, myCampaigns, trendingCampaigns, youMightLike, getCampaignData])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#171a00] to-black text-white">
      <Navbar />

      <main className="pt-32 pb-12">
        <div className="container mx-auto px-6">
          {/* Category Selection */}
          <section className="mb-16">
            <div className="text-sm md:text-base uppercase tracking-[0.12em] text-white/70 mb-2 italic font-light">Based On</div>
            <h1 className="text-[22px] md:text-4xl font-black leading-[27px] md:leading-tight mb-8">WHAT ARE WE LOOKING FOR TODAY?</h1>

            {/* Mobile Layout: 3 tiles (Brand, Time, Industry) */}
            <div className="md:hidden flex flex-col gap-2">
              {/* Top row: Brand and Time side by side */}
              <div className="flex gap-2">
                <div className="flex-1 aspect-square">
                  <CategoryTile label="BRAND" image="/Brand.png" href="/brands" />
                </div>
                <div className="flex-1 aspect-square">
                  <CategoryTile label="TIME" image="/Time.png" href="/time" />
                </div>
              </div>
              {/* Bottom row: Industry full width */}
              <div className="w-full h-[168px]">
                <CategoryTile label="INDUSTRY" image="/Industry.png" href="/industry" />
              </div>
            </div>

            {/* Desktop Layout: Full grid */}
            <div className="hidden md:grid grid-cols-4 gap-6">
              {/* Column 1: BRAND and AGENCY stacked */}
              <div className="col-span-1 space-y-6">
                <div className="h-[220px]">
                  <CategoryTile label="BRAND" image="/Brand.png" href="/brands" />
                </div>
                <div className="h-[220px]">
                  <CategoryTile label="AGENCY" image="/Agency.png" href="/agencies" />
                </div>
              </div>

              {/* Column 2: Tall TIME card spanning full height */}
              <div className="col-span-1 h-[464px]">
                <CategoryTile label="TIME" image="/Time.png" size="large" href="/time" />
              </div>

              {/* Column 3: INDUSTRY on top, PRODUCT and CHANNEL side-by-side below */}
              <div className="col-span-2 space-y-6">
                {/* Top card - INDUSTRY */}
                <div className="h-[220px]">
                  <CategoryTile label="INDUSTRY" image="/Industry.png" href="/industry" />
                </div>

                {/* Bottom row - PRODUCT and CHANNEL side by side */}
                <div className="grid grid-cols-2 gap-6 h-[220px]">
                  <CategoryTile label="PRODUCT" image="/Product.png" href="/product" />
                  <CategoryTile label="CHANNEL" image="/Channel.png" href="/channel" />
                </div>
              </div>
            </div>
          </section>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
              <p className="text-white/60">Loading campaigns...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-400 text-lg font-semibold mb-2">Error: {error}</p>
              <p className="text-white/60 mt-2">Please try refreshing the page</p>
              <p className="text-white/40 mt-1 text-sm">Check browser console for details</p>
              {/* Debug info */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mt-4 p-4 bg-gray-800 rounded text-left text-xs">
                  <p className="text-yellow-400 mb-2">Debug Info:</p>
                  <p>All Campaigns: {allCampaigns.length}</p>
                  <p>My Campaigns: {myCampaigns.length}</p>
                  <p>You Might Like: {youMightLike.length}</p>
                  <p>Trending: {trendingCampaigns.length}</p>
                  <p>Saved: {savedCampaigns.length}</p>
                  <p>Case Studies: {caseStudies.length}</p>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* My Campaigns */}
              {myCampaigns.length > 0 && (
                <CategoryCarousel
                  title="My Campaigns"
                  items={myCampaigns}
                  renderItem={(campaign) => <CampaignCard {...campaign} />}
                  viewMoreLink="/my-campaigns"
                  maxItems={myCampaigns.length}
                  itemKey={(campaign) => campaign.id}
                />
              )}

              {/* You Might Like */}
              {youMightLike.length > 0 && (
                <CategoryCarousel
                  title="You Might Like"
                  items={youMightLike}
                  renderItem={(campaign) => <CampaignCard {...campaign} />}
                  viewMoreLink="/you-might-like"
                  maxItems={youMightLike.length}
                  itemKey={(campaign) => campaign.id}
                />
              )}

              {/* Trending Campaigns */}
              {trendingCampaigns.length > 0 && (
                <CategoryCarousel
                  title="Trending Campaigns"
                  items={trendingCampaigns}
                  renderItem={(campaign) => <CampaignCard {...campaign} />}
                  viewMoreLink="/trending-campaigns"
                  maxItems={trendingCampaigns.length}
                  itemKey={(campaign) => campaign.id}
                />
              )}

              {/* Saved Campaigns */}
              {savedCampaigns.length > 0 && (
                <CategoryCarousel
                  title="Saved Campaigns"
                  items={savedCampaigns}
                  renderItem={(campaign) => <CampaignCard {...campaign} />}
                  viewMoreLink="/saved-campaigns"
                  maxItems={savedCampaigns.length}
                  itemKey={(campaign) => campaign.id}
                />
              )}

              {/* Case Studies */}
              {caseStudies.length > 0 && (
                <CategoryCarousel
                  title="Case Studies"
                  items={caseStudies}
                  renderItem={(study) => <CaseStudyCard {...study} />}
                  viewMoreLink="/case-studies"
                  maxItems={caseStudies.length}
                  itemKey={(study) => study.id}
                />
              )}

              {/* Show message if no campaigns available */}
              {myCampaigns.length === 0 && 
               youMightLike.length === 0 && 
               trendingCampaigns.length === 0 && 
               savedCampaigns.length === 0 && 
               caseStudies.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-white/60 text-lg mb-2">No campaigns available at the moment</p>
                  <p className="text-white/40 text-sm">Please check the browser console for API response details</p>
                  {/* Debug info */}
                  {process.env.NODE_ENV === 'development' && (
                    <div className="mt-4 p-4 bg-gray-800 rounded text-left text-xs max-w-2xl mx-auto">
                      <p className="text-yellow-400 mb-2 font-semibold">Debug Info:</p>
                      <p>Total Campaigns Fetched: {allCampaigns.length}</p>
                      <p>My Campaigns: {myCampaigns.length}</p>
                      <p>You Might Like: {youMightLike.length}</p>
                      <p>Trending: {trendingCampaigns.length}</p>
                      <p>Saved: {savedCampaigns.length}</p>
                      <p>Case Studies: {caseStudies.length}</p>
                      <p className="mt-2 text-yellow-300">Check browser console (F12) for detailed API responses</p>
                    </div>
                  )}
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
