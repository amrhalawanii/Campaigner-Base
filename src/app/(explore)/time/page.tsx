"use client"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { CategoryCarousel } from "@/components/shared/category-carousel"
import { CampaignCard } from "@/components/campaign/campaign-card"
import { campaigns } from "@/lib/data/campaign-data"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TimePage() {
  // Generate years from 2000 to 2025 (in descending order)
  const years = Array.from({ length: 26 }, (_, i) => 2025 - i)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#171a00] to-black text-white">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-7xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <div className="w-8 h-8 rounded-full bg-[#CCED00] flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 text-black" />
            </div>
            Go back
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase">BROWSE BY YEAR</h1>
          <p className="text-muted-foreground mb-12">Explore campaigns from different time periods</p>

          {years.map((year) => {
            const yearCampaigns = campaigns.filter((c) => c.year === year)
            
            return (
              <CategoryCarousel
                key={year}
                title={year.toString()}
                items={yearCampaigns}
                renderItem={(campaign) => <CampaignCard {...campaign} />}
                viewMoreLink={yearCampaigns.length > 0 ? `/time/${year}` : undefined}
                maxItems={10}
                itemKey={(campaign) => campaign.id}
              />
            )
          })}
        </div>
      </main>

      <Footer />
    </div>
  )
}
