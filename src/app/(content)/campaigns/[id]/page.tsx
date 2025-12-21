import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { CampaignSection } from "@/components/campaign/campaign-section"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { ShareButton } from "@/components/shared/share-button"
import { BookmarkButton } from "@/components/campaign/bookmark-button"
import { createSlug } from "@/lib/utils/slug"
import { campaignService } from "@/lib/services/campaign.service"
import { ErrorHandler } from "@/lib/utils/error-handler"
import type { Campaign as ApiCampaign } from "@/lib/types/api.types"
import type { Campaign } from "@/lib/data/campaign-data"

// Transform API campaign to component format
function transformCampaign(apiCampaign: any): Campaign {
  try {
    // Handle image URL
    let imageUrl = apiCampaign.cover_image || apiCampaign.image || apiCampaign.coverImage
    if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('/')) {
      imageUrl = `/${imageUrl}`
    }

    // Handle brand name
    let brandName = 'Unknown Brand'
    if (apiCampaign.brand?.name) {
      brandName = apiCampaign.brand.name
    } else if (apiCampaign.brand_name) {
      brandName = apiCampaign.brand_name
    } else if (apiCampaign.brand) {
      brandName = String(apiCampaign.brand)
    }

    // Handle agency name
    let agencyName: string | undefined
    if (apiCampaign.agency?.name) {
      agencyName = apiCampaign.agency.name
    } else if (apiCampaign.agency_name) {
      agencyName = apiCampaign.agency_name
    } else if (apiCampaign.agency) {
      agencyName = String(apiCampaign.agency)
    }

    // Handle is_saved
    const isSaved = apiCampaign.is_saved === true || apiCampaign.is_saved === 1 || apiCampaign.is_saved === '1'

    // Handle ID
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

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const campaignId = parseInt(id, 10)

  if (isNaN(campaignId)) {
    notFound()
  }

  try {
    // Fetch campaign from API
    // Note: In server components, we can't use useAuth hook
    // We'll fetch without userId for now, or you can pass it via cookies/headers
    console.log(`🔍 Fetching campaign with ID: ${campaignId}`)
    let response
    try {
      // TODO: Get userId from cookies or headers if needed
      response = await campaignService.getCampaign(campaignId)
      console.log(`📡 Campaign API response:`, JSON.stringify(response, null, 2))
    } catch (apiError) {
      console.error('❌ API call failed:', {
        error: apiError,
        campaignId,
        errorType: apiError instanceof Error ? apiError.constructor.name : typeof apiError,
        errorMessage: apiError instanceof Error ? apiError.message : String(apiError)
      })
      // Re-throw to be caught by outer catch
      throw apiError
    }

    if (!response || !response.success || !response.data) {
      console.error('❌ Failed to fetch campaign - invalid response:', {
        response: response,
        success: response?.success,
        message: response?.message,
        data: response?.data,
        campaignId
      })
      notFound()
    }

    const apiCampaign = response.data as any
    console.log('📦 Full API campaign data:', JSON.stringify(apiCampaign, null, 2))
    const campaign = transformCampaign(apiCampaign)

    // Extract additional data from API response
    const mediaItems = apiCampaign.media || []
    const location = apiCampaign.location || {}
    const brandLogo = apiCampaign.brand?.logo || null
    const agencyLogo = apiCampaign.agency?.logo || null
    const fullDescription = apiCampaign.description || campaign.description || ''
    const launchDate = apiCampaign.launch_date || null
    const country = location.country || null
    const region = location.region || null

    // Comprehensive campaign information logging
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📋 CAMPAIGN INFORMATION')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('🆔 ID:', campaign.id)
    console.log('📝 Title:', campaign.title)
    console.log('🏢 Brand:', campaign.brand)
    console.log('🎨 Agency:', campaign.agency || 'N/A')
    console.log('📅 Year:', campaign.year || 'N/A')
    console.log('📍 Location:', country ? `${country}${region ? `, ${region}` : ''}` : 'N/A')
    console.log('💾 Saved:', campaign.saved ? 'Yes' : 'No')
    console.log('🖼️  Cover Image:', campaign.image)
    console.log('📄 Description:', fullDescription ? `${fullDescription.substring(0, 100)}...` : 'N/A')
    console.log('🏷️  Tags:', campaign.tags && campaign.tags.length > 0 ? campaign.tags.join(', ') : 'N/A')
    console.log('📅 Launch Date:', launchDate && launchDate !== '0000-00-00 00:00:00' ? launchDate : 'N/A')
    console.log('🖼️  Brand Logo:', brandLogo || 'N/A')
    console.log('🎨 Agency Logo:', agencyLogo || 'N/A')
    console.log('📸 Media Items:', mediaItems.length)
    if (mediaItems.length > 0) {
      console.log('   Media Details:')
      mediaItems.forEach((media: any, index: number) => {
        console.log(`   ${index + 1}. Type: ${media.type || 'image'}, URL: ${media.url || 'N/A'}`)
        if (media.description) {
          console.log(`      Description: ${media.description}`)
        }
      })
    }
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📊 Transformed Campaign Object:')
    console.log(JSON.stringify(campaign, null, 2))
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

    // Fetch related campaigns for "You Might Like" section
    let relatedCampaigns: Campaign[] = []
    try {
      const allCampaignsResponse = await campaignService.getAllCampaigns()
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

        // Get up to 5 related campaigns (excluding current one)
        relatedCampaigns = allCampaigns
          .filter((c: any) => {
            const cId = typeof c.id === 'string' ? parseInt(c.id, 10) : c.id
            return cId !== campaignId
          })
          .slice(0, 5)
          .map(transformCampaign)
      }
    } catch (err) {
      console.error('Error fetching related campaigns:', err)
      // Continue without related campaigns
    }

    return (
      <div className="min-h-screen bg-gradient-to-b from-[#171a00] to-black text-white">
        <Navbar />

        <main className="pt-24 pb-12">
          {/* Content */}
          <section className="max-w-[1344px] mx-auto px-4 space-y-10">
            {/* Title + back + bookmark */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm text-[#cced00] hover:text-[#d6ff2f] transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                    <ArrowLeft className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-foreground">Go back</span>
                </Link>
                
                <div className="flex items-center gap-2">
                  <ShareButton 
                    title={campaign.title}
                    slug={createSlug(campaign.title)}
                  />
                  <BookmarkButton
                    campaignId={campaign.id}
                    initialSaved={campaign.saved}
                    size="icon"
                    variant="outline"
                    className="h-10 w-10 rounded-full backdrop-blur-[25px] border border-[rgba(57,77,81,0.5)] bg-black/40 hover:bg-[rgba(204,237,0,0.2)] hover:border-[rgba(204,237,0,0.3)] transition-all duration-200 group"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h1 className="text-2xl md:text-[32px] font-semibold leading-snug">
                  {campaign.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                  <div className="flex items-center gap-2">
                    {brandLogo && (
                      <Image
                        src={brandLogo}
                        alt={campaign.brand}
                        width={24}
                        height={24}
                        className="rounded"
                      />
                    )}
                    <span>By {campaign.brand}</span>
                  </div>
                  
                  {campaign.agency && (
                    <div className="flex items-center gap-2">
                      {agencyLogo && (
                        <Image
                          src={agencyLogo}
                          alt={campaign.agency}
                          width={24}
                          height={24}
                          className="rounded"
                        />
                      )}
                      <span>Agency: {campaign.agency}</span>
                    </div>
                  )}
                  
                  {campaign.year && (
                    <span>Year: {campaign.year}</span>
                  )}
                  
                  {launchDate && launchDate !== '0000-00-00 00:00:00' && (
                    <span>Launched: {new Date(launchDate).toLocaleDateString()}</span>
                  )}
                  
                  {country && (
                    <span>📍 {country}{region ? `, ${region}` : ''}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Hero gallery - Show all media items */}
            {mediaItems.length > 0 ? (
              <section className="mb-12">
                <div className="max-w-[1344px] mx-auto px-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mediaItems.slice(0, 6).map((media: any, index: number) => (
                      <div 
                        key={media.id || index} 
                        className="aspect-[3/5] rounded-[10px] overflow-hidden border border-white/20 shadow-[0_0_10px_rgba(0,0,0,0.2)]"
                      >
                        {media.type === 'video' ? (
                          <video
                            src={media.url}
                            className="w-full h-full object-cover"
                            controls
                            preload="metadata"
                          >
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <Image
                            src={media.url || campaign.image}
                            alt={media.description || `${campaign.title} - Image ${index + 1}`}
                            width={600}
                            height={1000}
                            className="w-full h-full object-cover"
                          />
                        )}
                        {media.description && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-3 text-white text-sm">
                            {media.description}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {mediaItems.length > 6 && (
                    <p className="text-center text-white/60 mt-4 text-sm">
                      Showing 6 of {mediaItems.length} media items
                    </p>
                  )}
                </div>
              </section>
            ) : (
              // Fallback to cover image if no media items
              <section className="mb-12">
                <div className="max-w-[1068px] mx-auto px-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="aspect-[3/5] rounded-[10px] overflow-hidden border border-white/20 shadow-[0_0_10px_rgba(0,0,0,0.2)]">
                      <Image
                        src={campaign.image}
                        alt={campaign.title}
                        width={600}
                        height={1000}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="aspect-[3/5] rounded-[10px] overflow-hidden border border-white/20 shadow-[0_0_10px_rgba(0,0,0,0.2)] hidden md:block">
                      <Image
                        src={campaign.image}
                        alt={campaign.title}
                        width={600}
                        height={1000}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="aspect-[3/5] rounded-[10px] overflow-hidden border border-white/20 shadow-[0_0_10px_rgba(0,0,0,0.2)] hidden md:block">
                      <Image
                        src={campaign.image}
                        alt={campaign.title}
                        width={600}
                        height={1000}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Meta tags */}
            {campaign.tags && campaign.tags.length > 0 && (
              <div className="flex flex-wrap gap-3 text-sm">
                {campaign.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-white text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            {fullDescription && (
              <div className="space-y-8 max-w-[1344px]">
                <div className="prose prose-invert max-w-none">
                  <p className="text-[20px] leading-relaxed text-[#f3f3f3] text-justify whitespace-pre-line">
                    {fullDescription}
                  </p>
                </div>
              </div>
            )}

            {/* Additional Campaign Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1344px]">
              {mediaItems.length > 0 && (
                <div className="bg-white/5 rounded-lg p-6 border border-white/20">
                  <h3 className="text-lg font-semibold mb-3">Media</h3>
                  <p className="text-white/80">{mediaItems.length} {mediaItems.length === 1 ? 'item' : 'items'}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {mediaItems.map((media: any, index: number) => (
                      <span key={media.id || index} className="text-xs bg-white/10 px-2 py-1 rounded">
                        {media.type || 'image'}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {(country || region) && (
                <div className="bg-white/5 rounded-lg p-6 border border-white/20">
                  <h3 className="text-lg font-semibold mb-3">Location</h3>
                  <p className="text-white/80">
                    {country && <span>{country}</span>}
                    {country && region && <span>, </span>}
                    {region && <span>{region}</span>}
                  </p>
                </div>
              )}
            </div>

            {/* Related sections */}
            {relatedCampaigns.length > 0 && (
              <div className="mt-16 space-y-10">
                <CampaignSection 
                  title="You Might Like" 
                  campaigns={relatedCampaigns} 
                  viewMoreLink="/you-might-like" 
                />
              </div>
            )}
          </section>
        </main>

        <Footer />
      </div>
    )
  } catch (err) {
    const appError = ErrorHandler.handleApiError(err)
    ErrorHandler.logError(appError, 'Campaign Detail Page')
    console.error('❌ Error fetching campaign:', {
      error: err,
      appError,
      campaignId,
      errorType: err instanceof Error ? err.constructor.name : typeof err,
      errorMessage: err instanceof Error ? err.message : String(err)
    })
    // Log the full error for debugging
    if (err instanceof Error) {
      console.error('Error stack:', err.stack)
    }
    notFound()
  }
}
