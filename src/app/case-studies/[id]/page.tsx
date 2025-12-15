"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { caseStudies } from "@/data/campaigns"
import { notFound, useRouter } from "next/navigation"
import Image from "next/image"
import { Bookmark, Share2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CampaignSection } from "@/components/campaign-section"
import { campaigns } from "@/data/campaigns"

export default function CaseStudyDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const caseStudy = caseStudies.find((cs) => cs.id === Number.parseInt(params.id))

  if (!caseStudy) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24 pb-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-muted/50 to-background py-12 mb-12">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
              >
                <div className="w-6 h-6 rounded-full bg-lime-400 flex items-center justify-center">
                  <ArrowLeft className="w-4 h-4 text-black" />
                </div>
                Go back
              </button>

              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">{caseStudy.title}</h1>
                  <p className="text-xl text-muted-foreground">{caseStudy.brand}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button size="icon" variant="outline" className="rounded-full bg-transparent">
                    <Bookmark className="w-5 h-5" />
                  </Button>
                  <Button size="icon" variant="outline" className="rounded-full bg-transparent">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              <div className="aspect-[16/9] relative rounded-2xl overflow-hidden border-8 border-white shadow-2xl mb-8">
                <Image
                  src={caseStudy.image || "/placeholder.svg"}
                  alt={caseStudy.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto mb-16">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">{caseStudy.description}</p>

              <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                In today's competitive marketplace, brands need to create meaningful connections with their audience
                while standing out from the noise. This campaign faced the unique challenge of reaching a diverse
                demographic while maintaining brand authenticity and driving measurable results.
              </p>

              <h2 className="text-2xl font-bold mb-4">The Solution</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Through strategic storytelling and innovative creative execution, this campaign successfully captured
                attention and drove engagement across multiple channels. The approach combined data-driven insights with
                emotional resonance to create a truly memorable brand experience.
              </p>

              <h2 className="text-2xl font-bold mb-4">Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-card p-6 rounded-xl border">
                  <div className="text-3xl font-bold text-lime-400 mb-2">+250%</div>
                  <div className="text-sm text-muted-foreground">Engagement Increase</div>
                </div>
                <div className="bg-card p-6 rounded-xl border">
                  <div className="text-3xl font-bold text-lime-400 mb-2">5M+</div>
                  <div className="text-sm text-muted-foreground">Impressions</div>
                </div>
                <div className="bg-card p-6 rounded-xl border">
                  <div className="text-3xl font-bold text-lime-400 mb-2">+180%</div>
                  <div className="text-sm text-muted-foreground">Brand Awareness</div>
                </div>
              </div>
            </div>
          </div>

          <CampaignSection title="Related Campaigns" campaigns={campaigns.slice(0, 4)} viewMoreLink="/my-campaigns" />
        </div>
      </main>

      <Footer />
    </div>
  )
}
