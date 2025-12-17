import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { CampaignCard } from "@/components/campaign/campaign-card"
import { campaigns } from "@/lib/data/campaign-data"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SavedCampaignsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <Link href="/" className="inline-flex items-center gap-2 mb-8 text-sm hover:opacity-80 transition-opacity">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#CCED00] text-black">
              <ArrowLeft className="w-4 h-4" />
            </span>
            <span className="text-muted-foreground">Back to Home</span>
          </Link>

          <h1 className="text-4xl font-bold mb-12 uppercase tracking-tight">Saved Campaigns</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((campaign) => (
              <CampaignCard key={campaign.id} {...campaign} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
