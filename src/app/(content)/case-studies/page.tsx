"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { CaseStudyCard } from "@/components/campaign/case-study-card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { campaignService } from "@/lib/services/campaign.service"
import { useAuth } from "@/lib/contexts/auth-context"
import { ErrorHandler } from "@/lib/utils/error-handler"

export default function CaseStudiesPage() {
  const { user } = useAuth()
  const [caseStudies, setCaseStudies] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const userId = user?.id
        console.log('📡 Fetching case studies, userId:', userId)

        // Get home page data to extract case_studies
        const homePageResponse = await campaignService.getHomePageData(userId || 0)
        
        if (homePageResponse.success && homePageResponse.data) {
          const data = homePageResponse.data as any
          let caseStudiesData: any[] = []

          // Extract case studies from case_studies collection
          if (data.case_studies) {
            if (Array.isArray(data.case_studies)) {
              caseStudiesData = data.case_studies
            } else if (typeof data.case_studies === 'object' && data.case_studies.items && Array.isArray(data.case_studies.items)) {
              caseStudiesData = data.case_studies.items
            }
          }

          setCaseStudies(caseStudiesData)
          console.log(`✅ Loaded ${caseStudiesData.length} case studies`)
        } else {
          setError(homePageResponse.message || 'Failed to load case studies')
        }
      } catch (err: any) {
        const appError = ErrorHandler.handleApiError(err)
        ErrorHandler.logError(appError, 'Case Studies Page')
        const errorMessage = ErrorHandler.getUserFriendlyMessage(appError)
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCaseStudies()
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

          <h1 className="text-4xl font-bold mb-12 uppercase tracking-tight">Case Studies</h1>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-white/60">Loading case studies...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-400">{error}</p>
            </div>
          ) : caseStudies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/60">No case studies found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {caseStudies.map((study, index) => (
                <CaseStudyCard 
                  key={study.id || index} 
                  id={study.id || index}
                  title={study.title || 'Untitled Case Study'}
                  brand={study.brand_name || study.brand || 'Unknown Brand'}
                  image={study.cover_image || study.image || '/placeholder.svg'}
                  description={study.description || ''}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
