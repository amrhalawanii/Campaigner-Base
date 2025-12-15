import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CampaignCard } from "@/components/campaign-card"
import { campaigns } from "@/lib/campaign-data"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function MyCampaignsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity mb-8"
          >
            <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 text-black" />
            </div>
            <span className="text-foreground">Back to Home</span>
          </Link>

          <h1 className="text-5xl md:text-6xl font-bold mb-16 uppercase tracking-tight">MY CAMPAIGNS</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((campaign) => (
              <CampaignCard key={campaign.id} {...campaign} saved={true} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
