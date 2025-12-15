import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CategoryTile } from "@/components/category-tile"
import { CampaignSection } from "@/components/campaign-section"
import { CaseStudyCard } from "@/components/case-study-card"
import { campaigns, caseStudies } from "@/data/campaigns"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#171a00] to-black text-white">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="w-full px-4 sm:px-6 lg:px-12">
          {/* Category Selection */}
          <section className="mb-16">
            <div className="text-base uppercase tracking-[0.12em] text-white/60 mb-2">Based On</div>
            <h1 className="text-4xl font-black leading-tight mb-8">WHAT ARE WE LOOKING FOR TODAY?</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-[21px]">
              {/* Column 1: BRAND and AGENCY stacked */}
              <div className="md:col-span-1 space-y-4">
                <div className="h-[180px] md:h-[220px]">
                  <CategoryTile label="BRAND" image="/Brand.png" href="/brands" />
                </div>
                <div className="h-[180px] md:h-[220px]">
                  <CategoryTile label="AGENCY" image="/Agency.png" href="/agencies" />
                </div>
              </div>

              {/* Column 2: Tall TIME card spanning full height */}
              <div className="md:col-span-1 h-[180px] md:h-[464px]">
                <CategoryTile label="TIME" image="/Time.png" size="large" href="/time" />
              </div>

              {/* Column 3: INDUSTRY on top, PRODUCT and CHANNEL side-by-side below */}
              <div className="md:col-span-2 space-y-4">
                {/* Top card - INDUSTRY */}
                <div className="h-[180px] md:h-[220px]">
                  <CategoryTile label="INDUSTRY" image="/Industry.png" href="/industry" />
                </div>

                {/* Bottom row - PRODUCT and CHANNEL side by side */}
                <div className="grid grid-cols-2 gap-[21px] h-[180px] md:h-[220px]">
                  <CategoryTile label="PRODUCT" image="/Product.png" href="/product" />
                  <CategoryTile label="CHANNEL" image="/Channel.png" href="/channel" />
                </div>
              </div>
            </div>
          </section>

          {/* My Campaigns */}
          <CampaignSection title="My Campaigns" campaigns={campaigns.slice(0, 4)} viewMoreLink="/my-campaigns" />

          {/* You Might Like */}
          <CampaignSection title="You Might Like" campaigns={campaigns.slice(0, 4)} viewMoreLink="/you-might-like" />

          {/* Case Studies */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Case Studies</h2>
              <Link
                href="/case-studies"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                View More
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {caseStudies.slice(0, 4).map((study) => (
                <CaseStudyCard key={study.id} {...study} />
              ))}
            </div>
          </section>

          {/* Trending Campaigns */}
          <CampaignSection
            title="Trending Campaigns"
            campaigns={campaigns.slice(0, 4)}
            viewMoreLink="/trending-campaigns"
          />

          {/* Saved Campaigns */}
          <CampaignSection title="Saved Campaigns" campaigns={campaigns.slice(0, 4)} viewMoreLink="/saved-campaigns" />
        </div>
      </main>

      <Footer />
    </div>
  )
}
