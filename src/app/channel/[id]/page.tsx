import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CampaignCard } from "@/components/campaign-card"
import { campaigns } from "@/data/campaigns"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function ChannelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const channelNames: Record<string, string> = {
    "social-media": "Social Media",
    tv: "Television",
    digital: "Digital Display",
    print: "Print",
    outdoor: "Out-of-Home",
    video: "Video/Streaming",
    email: "Email Marketing",
    influencer: "Influencer",
  }

  const channelName = channelNames[id] || "Channel"
  const filteredCampaigns = campaigns.filter((campaign) => campaign.tags?.some((tag) => tag.toLowerCase().includes(id)))

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <Link
            href="/channel"
            className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-foreground transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-lime-400 flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 text-black" />
            </div>
            <span className="text-sm font-medium">Go back</span>
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-12 uppercase">{channelName} Campaigns</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCampaigns.length > 0
              ? filteredCampaigns.map((campaign) => <CampaignCard key={campaign.id} {...campaign} />)
              : campaigns.slice(0, 8).map((campaign) => <CampaignCard key={campaign.id} {...campaign} />)}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
