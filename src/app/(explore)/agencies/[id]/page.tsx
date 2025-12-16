import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { campaigns, agencies } from "@/lib/data/campaign-data"
import { CampaignCard } from "@/components/campaign/campaign-card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

export default async function AgencyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const agency = agencies.find((a) => a.id === id)

  if (!agency) {
    notFound()
  }

  const agencyCampaigns = campaigns.filter((c) => c.agency?.toLowerCase().replace(/\+/g, "-") === id)

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-7xl">
          <Link
            href="/agencies"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 text-black" />
            </div>
            Go back
          </Link>

          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase">{agency.name}</h1>
            <p className="text-xl text-muted-foreground mb-2">{agency.description}</p>
            <div className="text-sm text-muted-foreground">
              {agencyCampaigns.length} {agencyCampaigns.length === 1 ? "campaign" : "campaigns"}
            </div>
          </div>

          {agencyCampaigns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agencyCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} {...campaign} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No campaigns found for this agency yet.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
