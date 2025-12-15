"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CampaignCard } from "@/components/campaign-card"
import { campaigns } from "@/data/campaigns"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

const industryNames: Record<string, string> = {
  retail: "Retail & E-commerce",
  technology: "Technology",
  automotive: "Automotive",
  "food-beverage": "Food & Beverage",
  fashion: "Fashion & Beauty",
  healthcare: "Healthcare & Wellness",
  entertainment: "Entertainment & Media",
  finance: "Finance & Insurance",
}

export default function IndustryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const industryId = params.id as string
  const industryName = industryNames[industryId] || "Industry"

  // Filter campaigns by industry (for now showing all, you can add industry field to campaign data)
  const industryCampaigns = campaigns

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <div className="w-8 h-8 rounded-full bg-lime-400 flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 text-black" />
            </div>
            Go back
          </button>

          <h1 className="text-4xl md:text-5xl font-bold mb-12 uppercase">{industryName}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industryCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} {...campaign} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
