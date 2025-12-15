import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { campaigns } from "@/data/campaigns"
import { CampaignCard } from "@/components/campaign-card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TimePage() {
  const years = Array.from(new Set(campaigns.map((c) => c.year).filter(Boolean))).sort((a, b) => b! - a!)

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-7xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 text-black" />
            </div>
            Go back
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase">BROWSE BY YEAR</h1>
          <p className="text-muted-foreground mb-12">Explore campaigns from different time periods</p>

          {years.map((year) => {
            const yearCampaigns = campaigns.filter((c) => c.year === year)
            return (
              <div key={year} className="mb-16">
                <h2 className="text-3xl font-bold mb-6">{year}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {yearCampaigns.map((campaign) => (
                    <CampaignCard key={campaign.id} {...campaign} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </main>

      <Footer />
    </div>
  )
}
