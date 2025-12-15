import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CampaignSection } from "@/components/campaign-section"
import { campaigns } from "@/data/campaigns"
import { Button } from "@/components/ui/button"
import { Bookmark, ChevronLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CampaignDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const campaign = campaigns.find((c) => c.id === Number(id)) ?? campaigns[0]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#171a00] to-black text-white">
      <Navbar />

      <main className="pt-24 pb-12">
     

        {/* Content */}
        <section className="max-w-[1344px] mx-auto px-4 space-y-10">
          {/* Title + back + bookmark */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-[#cced00] hover:text-[#d6ff2f] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Link>
              <Button
                size="icon"
                variant="outline"
                className="h-10 w-10 rounded-full border-white/30 bg-black/40 hover:bg-black/60"
                aria-label="Save campaign"
              >
                <Bookmark className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl md:text-[32px] font-semibold leading-snug">
                Ikea adds to its sleep campaign with a series of striking posters
              </h1>
              <p className="text-base text-white/80">By {campaign.brand}</p>
            </div>
          </div>
             {/* Hero gallery */}
        <section className="mb-12">
          <div className="max-w-[1068px] mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="aspect-[3/5] rounded-[10px] overflow-hidden border border-white/20 shadow-[0_0_10px_rgba(0,0,0,0.2)]">
                <Image
                  src={campaign.image}
                  alt={campaign.title}
                  width={600}
                  height={1000}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/5] rounded-[10px] overflow-hidden border border-white/20 shadow-[0_0_10px_rgba(0,0,0,0.2)] hidden md:block">
                <Image
                  src={campaign.image}
                  alt={campaign.title}
                  width={600}
                  height={1000}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/5] rounded-[10px] overflow-hidden border border-white/20 shadow-[0_0_10px_rgba(0,0,0,0.2)] hidden md:block">
                <Image
                  src={campaign.image}
                  alt={campaign.title}
                  width={600}
                  height={1000}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
        </section>
        {/* Meta tags moved above first large image */}
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-white text-sm">
            Furniture
          </span>
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-white text-sm">
            July 2023
          </span>
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-white text-sm">
            Pillows
          </span>
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-white text-sm">
            Amoux
          </span>
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-white text-sm">
            Social Media &amp; TV
          </span>
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-white text-sm">
            Billboards
          </span>
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-white text-sm">
            Australia
          </span>
        </div>

          {/* Body copy + meta + large images */}
          <div className="space-y-8 max-w-[1344px]">
            <p className="text-[20px] leading-relaxed text-[#f3f3f3] text-justify">
              One of the more documented side effects of the Covid-19 pandemic is the impact it is having on our sleep,
              with the situation described as the “perfect storm of sleep problems”. Ikea’s new ad campaign, which
              focuses on the benefits of sleeping well, is therefore nothing if not timely.
            </p>
            <p className="text-[20px] leading-relaxed text-[#f3f3f3] text-justify">
              The brand launched the first part of the campaign earlier this month, with a TV spot that spelt out how a
              lack of sleep (and a big night on the town) affected the hare’s ability to race the next day.
            </p>
            <p className="text-[20px] leading-relaxed text-[#f3f3f3] text-justify">
              Mother has now followed the spot with a series of clever and smartly designed posters which sees products
              such as energy drinks, anti-aging creams and vitamin supplements – all of which are intended to imitate
              the effects of a good night’s sleep – filled with Ikea bedding replicating the liquids, pills and creams.
            </p>

            

            <div className="border border-white/20 rounded-[10px] overflow-hidden">
              <Image
                src="/ikea-sleep-campaign-outdoor-billboard-on-street.jpg"
                alt="Ikea sleep campaign street billboard"
                width={1344}
                height={903}
                className="w-full h-auto object-cover"
              />
            </div>

            <p className="text-[20px] leading-relaxed text-[#f3f3f3] text-justify">
              The striking visuals were shot by photographer Amy Currell, using large-scale models designed by Andy
              Knight Ltd to house the Ikea bedding.
            </p>

            <div className="border border-white/20 rounded-[10px] overflow-hidden">
              <Image
                src="/ikea-sleep-campaign-poster-with-sleep-jar-product.jpg"
                alt="Ikea sleep campaign poster"
                width={1344}
                height={903}
                className="w-full h-auto object-cover"
              />
            </div>

            <p className="text-[20px] leading-relaxed text-[#f3f3f3] text-justify">
              It’s been a strong week for advertising posters, with the Ikea work following Uncommon’s release of a
              series of equally arresting visuals for B&amp;Q. Both campaigns go to show the power that the
              good&nbsp;old-fashioned poster can have when well designed, especially when also shared across social
              media.
            </p>
          </div>

          {/* Related sections */}
          <div className="mt-16 space-y-10">
            <CampaignSection title="My Campaigns" campaigns={campaigns.slice(0, 5)} viewMoreLink="/my-campaigns" />
            <CampaignSection title="You Might Like" campaigns={campaigns.slice(0, 5)} viewMoreLink="/you-might-like" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
