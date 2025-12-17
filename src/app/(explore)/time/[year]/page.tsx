import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { CampaignCard } from "@/components/campaign/campaign-card"
import { campaigns } from "@/lib/data/campaign-data"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

export default async function YearDetailPage({ params }: { params: Promise<{ year: string }> }) {
  const { year } = await params
  const yearNumber = parseInt(year, 10)

  // Validate year is between 2000 and 2025
  if (isNaN(yearNumber) || yearNumber < 2000 || yearNumber > 2025) {
    notFound()
  }

  const yearCampaigns = campaigns.filter((c) => c.year === yearNumber)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#171a00] to-black text-white">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-7xl">
          <Link
            href="/time"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <div className="w-8 h-8 rounded-full bg-[#CCED00] flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 text-black" />
            </div>
            Go back
          </Link>

          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase">{year} Campaigns</h1>
            <div className="text-sm text-muted-foreground">
              {yearCampaigns.length} {yearCampaigns.length === 1 ? "campaign" : "campaigns"}
            </div>
          </div>

          {yearCampaigns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {yearCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} {...campaign} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No campaigns found for {year}.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

