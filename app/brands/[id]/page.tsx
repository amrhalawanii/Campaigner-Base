import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { campaigns } from "@/lib/campaign-data"
import { CampaignCard } from "@/components/campaign-card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

export default async function BrandDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const brandCampaigns = campaigns.filter((c) => c.brand.toLowerCase().replace(/\s+/g, "-") === id)

  if (brandCampaigns.length === 0) {
    notFound()
  }

  const brandName = brandCampaigns[0].brand

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-7xl">
          <Link
            href="/brands"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 text-black" />
            </div>
            Go back
          </Link>

          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase">{brandName}</h1>
            <div className="text-sm text-muted-foreground">
              {brandCampaigns.length} {brandCampaigns.length === 1 ? "campaign" : "campaigns"}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} {...campaign} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
