"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CampaignSection } from "@/components/campaign-section"
import { campaigns } from "@/data/campaigns"
import { Button } from "@/components/ui/button"
import { Bookmark } from "lucide-react"
import { ShareDialog } from "@/components/share-dialog"
import Image from "next/image"

export default function CampaignPage() {
  const [saved, setSaved] = useState(false)

  const heroImages = [
    {
      url: "/ikea-sleep-campaign-poster-with-bottle-and-papers.jpg",
      alt: "Sleep campaign poster - medicine bottle with papers",
    },
    {
      url: "/ikea-sleep-campaign-poster-with-sleep-product-and-.jpg",
      alt: "Sleep campaign poster - sleep product",
    },
    {
      url: "/ikea-sleep-campaign-poster-with-sleep-jar-product.jpg",
      alt: "Sleep campaign poster - sleep jar product",
    },
  ]

  const campaignImages = [
    {
      url: "/ikea-sleep-campaign-outdoor-billboard-on-street.jpg",
      caption:
        "The striking visuals were shot by photographer Amy Currell, using large-scale models designed by Ardy Knight Ltd to house the Ikea branding.",
    },
    {
      url: "/ikea-sleep-campaign-advertisement-poster-in-urban-.jpg",
      caption:
        "It's been a strong week for advertising posters, with the flurry following Liz=emon's release of a series of equally-arresting visuals for Nike. Both campaigns go to show the power that the good old-fashioned poster can have when well designed, especially when also shared across social media.",
    },
  ]

  const handleSave = () => {
    setSaved(!saved)
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="relative bg-gradient-to-b from-zinc-900/50 via-zinc-800/30 to-black pt-20 pb-16">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-5 blur-2xl" />

        <div className="relative container mx-auto px-4">
          {/* Hero Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
            {heroImages.map((image, index) => (
              <div
                key={index}
                className="relative aspect-[3/4] rounded-lg overflow-hidden bg-white/10 border-[16px] border-white shadow-2xl"
              >
                <Image src={image.url || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
              </div>
            ))}
          </div>

          {/* Title and Actions */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start justify-between gap-6 mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Ikea adds to its sleep campaign with a series of striking posters
              </h1>
              <div className="flex items-center gap-1 shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-400 hover:text-white hover:bg-white/10"
                  onClick={handleSave}
                >
                  <Bookmark className={`w-5 h-5 ${saved ? "fill-lime-400 text-lime-400" : ""}`} />
                </Button>
                <ShareDialog
                  url="/campaigns/1"
                  title="Ikea adds to its sleep campaign with a series of striking posters"
                />
              </div>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-3 mb-12 text-sm">
              {/* Left Column */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-lime-400 text-base">●</span>
                  <span className="text-zinc-400">Furniture</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lime-400 text-base">●</span>
                  <span className="text-zinc-400">Phones</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lime-400 text-base">●</span>
                  <span className="text-zinc-400">Social Media & TV</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lime-400 text-base">●</span>
                  <span className="text-zinc-400">Australia</span>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-lime-400 text-base">●</span>
                  <span className="text-zinc-400">July 2023</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lime-400 text-base">●</span>
                  <span className="text-zinc-400">Amouz</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lime-400 text-base">●</span>
                  <span className="text-zinc-400">Billboards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 text-zinc-400 leading-relaxed text-base">
            <p>
              One of the more documented side effects of the COVID-19 pandemic is the impact it is having on our sleep,
              with the situation described as &apos;coronasomnia&apos;. Not only are we spending more time at home (and
              therefore less time commuting), we&apos;re also on our phones, with the countless distractions and
              doom-scrolling keeping us well away from our pillows. With focuses on the benefits of sleeping. In
              hazardous wiring if we don&apos;t get a good night&apos;s storm of sleep.
            </p>

            <p>
              The brand launched the first part of the campaign earlier this month, with a TV spot that spells out how a
              lack of sleep (and a big night on the beer) means that the best ability to race the future of stress,
              agitation and more.
            </p>

            <p>
              Mother has now followed the spot with a series of clever and smartly designed posters which sees products
              such as energy drinks, anti-aging cream and valium supplements—all of which are intended to break the
              regular pills box or prescription. It&apos;s strapline is simple, polls and universal.
            </p>

            {/* Campaign Image 1 */}
            <div className="my-16 pt-8">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-900 border-[12px] border-white shadow-2xl mb-4">
                <Image
                  src={campaignImages[0].url || "/placeholder.svg"}
                  alt="Campaign billboard on street"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed">{campaignImages[0].caption}</p>
            </div>

            {/* Campaign Image 2 */}
            <div className="my-16">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-900 border-[12px] border-white shadow-2xl mb-4">
                <Image
                  src={campaignImages[1].url || "/placeholder.svg"}
                  alt="Campaign poster in urban setting"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed">{campaignImages[1].caption}</p>
            </div>
          </div>
        </div>

        {/* Related Campaigns */}
        <div className="mt-32">
          <CampaignSection title="My Campaigns" campaigns={campaigns.slice(0, 4)} viewMoreLink="/my-campaigns" />
        </div>

        <div className="mt-20">
          <CampaignSection title="You Might Like" campaigns={campaigns.slice(0, 4)} viewMoreLink="/" />
        </div>
      </main>

      <Footer />
    </div>
  )
}
