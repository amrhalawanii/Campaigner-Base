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
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`aspect-[3/5] rounded-[10px] overflow-hidden border border-white/20 shadow-[0_0_10px_rgba(0,0,0,0.2)] ${
                      i > 0 ? "hidden md:block" : ""
                    }`}
                  >
                    <Image
                      src={campaign.image}
                      alt={campaign.title}
                      width={600}
                      height={1000}
