"use client"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { CategoryTile } from "@/components/shared/category-tile"
import { CategoryCarousel } from "@/components/shared/category-carousel"
import { CampaignCard } from "@/components/campaign/campaign-card"
import { CaseStudyCard } from "@/components/campaign/case-study-card"
import { campaigns, caseStudies } from "@/lib/data/campaign-data"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#171a00] to-black text-white">
      <Navbar />

      <main className="pt-32 pb-12">
        <div className="container mx-auto px-6">
          {/* Category Selection */}
          <section className="mb-16">
            <div className="text-sm md:text-base uppercase tracking-[0.12em] text-white/70 mb-2 italic font-light">Based On</div>
            <h1 className="text-[22px] md:text-4xl font-black leading-[27px] md:leading-tight mb-8">WHAT ARE WE LOOKING FOR TODAY?</h1>

            {/* Mobile Layout: 3 tiles (Brand, Time, Industry) */}
            <div className="md:hidden flex flex-col gap-2">
              {/* Top row: Brand and Time side by side */}
              <div className="flex gap-2">
                <div className="flex-1 aspect-square">
                  <CategoryTile label="BRAND" image="/Brand.png" href="/brands" />
                </div>
                <div className="flex-1 aspect-square">
                  <CategoryTile label="TIME" image="/Time.png" href="/time" />
                </div>
              </div>
              {/* Bottom row: Industry full width */}
              <div className="w-full h-[168px]">
                <CategoryTile label="INDUSTRY" image="/Industry.png" href="/industry" />
              </div>
            </div>

            {/* Desktop Layout: Full grid */}
            <div className="hidden md:grid grid-cols-4 gap-6">
              {/* Column 1: BRAND and AGENCY stacked */}
              <div className="col-span-1 space-y-6">
                <div className="h-[220px]">
                  <CategoryTile label="BRAND" image="/Brand.png" href="/brands" />
                </div>
                <div className="h-[220px]">
                  <CategoryTile label="AGENCY" image="/Agency.png" href="/agencies" />
                </div>
              </div>

              {/* Column 2: Tall TIME card spanning full height */}
              <div className="col-span-1 h-[464px]">
                <CategoryTile label="TIME" image="/Time.png" size="large" href="/time" />
              </div>

              {/* Column 3: INDUSTRY on top, PRODUCT and CHANNEL side-by-side below */}
              <div className="col-span-2 space-y-6">
                {/* Top card - INDUSTRY */}
                <div className="h-[220px]">
                  <CategoryTile label="INDUSTRY" image="/Industry.png" href="/industry" />
                </div>

                {/* Bottom row - PRODUCT and CHANNEL side by side */}
                <div className="grid grid-cols-2 gap-6 h-[220px]">
                  <CategoryTile label="PRODUCT" image="/Product.png" href="/product" />
                  <CategoryTile label="CHANNEL" image="/Channel.png" href="/channel" />
                </div>
              </div>
            </div>
          </section>

          {/* My Campaigns */}
          <CategoryCarousel
            title="My Campaigns"
            items={campaigns}
            renderItem={(campaign) => <CampaignCard {...campaign} />}
            viewMoreLink="/my-campaigns"
            maxItems={10}
            itemKey={(campaign) => campaign.id}
          />

          {/* You Might Like */}
          <CategoryCarousel
            title="You Might Like"
            items={campaigns}
            renderItem={(campaign) => <CampaignCard {...campaign} />}
            viewMoreLink="/you-might-like"
            maxItems={10}
            itemKey={(campaign) => campaign.id}
          />

          {/* Case Studies */}
          <CategoryCarousel
            title="Case Studies"
            items={caseStudies}
            renderItem={(study) => <CaseStudyCard {...study} />}
            viewMoreLink="/case-studies"
            maxItems={10}
            itemKey={(study) => study.id}
          />

          {/* Trending Campaigns */}
          <CategoryCarousel
            title="Trending Campaigns"
            items={campaigns}
            renderItem={(campaign) => <CampaignCard {...campaign} />}
            viewMoreLink="/trending-campaigns"
            maxItems={10}
            itemKey={(campaign) => campaign.id}
          />

          {/* Saved Campaigns */}
          <CategoryCarousel
            title="Saved Campaigns"
            items={campaigns}
            renderItem={(campaign) => <CampaignCard {...campaign} />}
            viewMoreLink="/saved-campaigns"
            maxItems={10}
            itemKey={(campaign) => campaign.id}
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}
