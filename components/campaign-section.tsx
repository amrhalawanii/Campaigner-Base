import { CampaignCard } from "./campaign-card"
import { ChevronRight } from "lucide-react"
import type { Campaign } from "@/lib/campaign-data"
import Link from "next/link"

interface CampaignSectionProps {
  title: string
  campaigns: Campaign[]
  viewMoreLink?: string
}

export function CampaignSection({ title, campaigns, viewMoreLink }: CampaignSectionProps) {
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-6 text-white">
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
        {viewMoreLink && (
          <Link
            href={viewMoreLink}
            className="text-sm text-white hover:text-accent transition-colors flex items-center gap-1"
          >
            View More
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.id} {...campaign} />
        ))}
      </div>
    </section>
  )
}
