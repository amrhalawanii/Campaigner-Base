import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { CampaignSection } from "@/components/campaign-section"
import { campaigns, type Campaign } from "@/lib/campaign-data"
import { campaignDetailTagKeys, resolveTagMetadata } from "@/lib/campaign-meta"
import { Bookmark, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeroGallery, type HeroImage } from "@/src/components/hero-gallery"
import { TagList } from "@/src/components/tag-list"
import { StorySection, type StoryBlock } from "@/src/components/story-section"

type CampaignDetailContent = {
  tags: ReturnType<typeof resolveTagMetadata>
  storyBlocks: StoryBlock[]
}

const campaignDetailContent: CampaignDetailContent = {
  tags: resolveTagMetadata(campaignDetailTagKeys),
  storyBlocks: [
    {
      type: "paragraph",
      content:
        "One of the more documented side effects of the Covid-19 pandemic is the impact it is having on our sleep, with the situation described as the “perfect storm of sleep problems”. Ikea’s new ad campaign, which focuses on the benefits of sleeping well, is therefore nothing if not timely.",
    },
    {
      type: "paragraph",
      content:
        "The brand launched the first part of the campaign earlier this month, with a TV spot that spelt out how a lack of sleep (and a big night on the town) affected the hare’s ability to race the next day.",
    },
    {
      type: "paragraph",
      content:
        "Mother has now followed the spot with a series of clever and smartly designed posters which sees products such as energy drinks, anti-aging creams and vitamin supplements – all of which are intended to imitate the effects of a good night’s sleep – filled with Ikea bedding replicating the liquids, pills and creams.",
    },
    {
      type: "image",
      src: "/ikea-sleep-campaign-outdoor-billboard-on-street.jpg",
      alt: "Ikea sleep campaign street billboard",
    },
    {
      type: "paragraph",
      content:
        "The striking visuals were shot by photographer Amy Currell, using large-scale models designed by Andy Knight Ltd to house the Ikea bedding.",
    },
    {
      type: "image",
      src: "/ikea-sleep-campaign-poster-with-sleep-jar-product.jpg",
      alt: "Ikea sleep campaign poster",
    },
    {
      type: "paragraph",
      content:
        "It’s been a strong week for advertising posters, with the Ikea work following Uncommon’s release of a series of equally arresting visuals for B&Q. Both campaigns go to show the power that the good old-fashioned poster can have when well designed, especially when also shared across social media.",
    },
  ],
}

export default function CampaignDetailPage({ params }: { params: { id: string } }) {
  const campaignId = Number(params.id)
  const campaign: Campaign = campaigns.find((c) => c.id === campaignId) ?? campaigns[0]

  const heroImages: HeroImage[] = [campaign.image, campaign.image, campaign.image].map((src, index) => ({
    src,
    alt: `${campaign.title} gallery image ${index + 1}`,
  }))

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#171a00] to-black text-white">
      <Navbar />

      <main className="pt-24 pb-12">
        <section className="max-w-[1344px] mx-auto px-4 space-y-10">
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
              <h1 className="text-2xl md:text-[32px] font-semibold leading-snug">{campaign.title}</h1>
              <p className="text-base text-white/80">By {campaign.brand}</p>
            </div>
          </div>

          <HeroGallery images={heroImages} />

          <TagList tags={campaignDetailContent.tags} />

          <StorySection blocks={campaignDetailContent.storyBlocks} />

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
