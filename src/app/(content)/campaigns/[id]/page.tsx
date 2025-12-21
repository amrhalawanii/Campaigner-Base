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
          <section className="max-w-[1344px] mx-auto px-4 space-y-12">
            {/* Header with back button and actions */}
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-[#cced00] hover:text-[#d6ff2f] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                  <ArrowLeft className="w-4 h-4 text-black" />
                </div>
                <span className="text-foreground">Go back</span>
              </Link>
              
              <div className="flex items-center gap-3">
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

            {/* Hero Section with Cover Image */}
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src={campaign.image}
                alt={campaign.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              
              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  {campaign.title}
                </h1>
                
                {/* Quick Metadata */}
                <div className="flex flex-wrap items-center gap-6 text-sm md:text-base text-white/90">
                  {brandLogo && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                        <Image
                          src={brandLogo}
                          alt={campaign.brand}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                      <span className="font-medium">{campaign.brand}</span>
                    </div>
                  )}
                  
                  {campaign.agency && (
                    <div className="flex items-center gap-3">
                      {agencyLogo && (
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                          <Image
                            src={agencyLogo}
                            alt={campaign.agency}
                            width={32}
                            height={32}
                            className="object-contain"
                          />
                        </div>
                      )}
                      <span>{campaign.agency}</span>
                    </div>
                  )}
                  
                  {campaign.year && (
                    <span className="text-[#cced00] font-semibold">{campaign.year}</span>
                  )}
                  
                  {country && (
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📍</span>
                      <span>{country}{region ? `, ${region}` : ''}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Detailed Metadata Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {brandLogo && (
                <div className="bg-white/5 rounded-xl p-6 border border-white/10 backdrop-blur-sm">
                  <div className="text-xs uppercase tracking-wider text-white/60 mb-3">Brand</div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                      <Image
                        src={brandLogo}
                        alt={campaign.brand}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{campaign.brand}</div>
                    </div>
                  </div>
                </div>
              )}
              
              {campaign.agency && (
                <div className="bg-white/5 rounded-xl p-6 border border-white/10 backdrop-blur-sm">
                  <div className="text-xs uppercase tracking-wider text-white/60 mb-3">Agency</div>
                  <div className="flex items-center gap-3">
                    {agencyLogo && (
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                        <Image
                          src={agencyLogo}
                          alt={campaign.agency}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-lg">{campaign.agency}</div>
                    </div>
                  </div>
                </div>
              )}
              
              {(campaign.year || launchDate) && (
                <div className="bg-white/5 rounded-xl p-6 border border-white/10 backdrop-blur-sm">
                  <div className="text-xs uppercase tracking-wider text-white/60 mb-3">Launch Date</div>
                  <div className="font-semibold text-lg">
                    {launchDate && launchDate !== '0000-00-00 00:00:00' 
                      ? new Date(launchDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })
                      : campaign.year || 'N/A'
                    }
                  </div>
                </div>
              )}
              
              {(country || region) && (
                <div className="bg-white/5 rounded-xl p-6 border border-white/10 backdrop-blur-sm">
                  <div className="text-xs uppercase tracking-wider text-white/60 mb-3">Location</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📍</span>
                    <div className="font-semibold text-lg">
                      {country}
                      {region && <span className="text-white/70">, {region}</span>}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Description Section */}
            {fullDescription && (
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold">About This Campaign</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-lg md:text-xl leading-relaxed text-white/90 whitespace-pre-line">
                    {fullDescription}
                  </p>
                </div>
              </div>
            )}

            {/* Tags Section */}
            {campaign.tags && campaign.tags.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold">Tags</h2>
                <div className="flex flex-wrap gap-3">
                  {campaign.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full border border-[#cced00]/30 bg-[#cced00]/10 px-5 py-2.5 text-[#cced00] text-sm font-medium hover:bg-[#cced00]/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Media Gallery Section */}
            {mediaItems.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl md:text-3xl font-bold">Media Gallery</h2>
                  <span className="text-white/60 text-sm">{mediaItems.length} {mediaItems.length === 1 ? 'item' : 'items'}</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mediaItems.map((media: any, index: number) => (
                    <div 
                      key={media.id || index} 
                      className="group relative aspect-[4/5] rounded-xl overflow-hidden border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
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
                          fill
                          className="object-cover"
                        />
                      )}
                      
                      {media.description && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-white text-sm leading-relaxed">{media.description}</p>
                        </div>
                      )}
                      
                      {media.type === 'video' && (
                        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-white">
                          Video
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}


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
