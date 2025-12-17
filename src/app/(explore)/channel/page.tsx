"use client"

import { useState, useMemo } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"
import { ArrowLeft, ChevronRight, Search } from "lucide-react"

const channels = [
  { id: "social-media", name: "Social Media", description: "Instagram, Facebook, TikTok, and Twitter campaigns" },
  { id: "tv", name: "Television", description: "TV commercials and broadcast advertising" },
  { id: "digital", name: "Digital Display", description: "Banner ads, programmatic, and display advertising" },
  { id: "print", name: "Print", description: "Magazine, newspaper, and print media campaigns" },
  { id: "outdoor", name: "Out-of-Home", description: "Billboards, transit, and outdoor advertising" },
  { id: "video", name: "Video/Streaming", description: "YouTube, streaming platforms, and online video" },
  { id: "email", name: "Email Marketing", description: "Direct email campaigns and newsletters" },
  { id: "influencer", name: "Influencer", description: "Creator partnerships and influencer marketing" },
]

export default function ChannelPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredChannels = useMemo(() => {
    if (!searchQuery.trim()) return channels

    return channels.filter(
      (channel) =>
        channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        channel.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#171a00] to-black text-white">
      <Navbar />

      <main className="pt-32 pb-12">
        <div className="container mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-foreground transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#CCED00] flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 text-black" />
            </div>
            <span className="text-sm font-medium">Go back</span>
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 uppercase">Browse by Channel</h1>

          {/* Search Bar */}
          <div className="relative mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white/70 pointer-events-none shrink-0" />
            <input
              type="text"
              placeholder="Search channels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full backdrop-blur-[15px] bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all h-14"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChannels.map((channel) => (
              <Link
                key={channel.id}
                href={`/channel/${channel.id}`}
                className="group backdrop-blur-[25px] bg-[rgba(8,33,37,0.1)] border border-[rgba(57,77,81,0.3)] rounded-xl p-6 hover:bg-[#CCED00] hover:border-[#CCED00] transition-all"
              >
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-black transition-colors">{channel.name}</h3>
                <p className="text-white/70 text-sm mb-4 group-hover:text-black/70 transition-colors">{channel.description}</p>
                <div className="flex items-center gap-1 text-sm text-white/70 group-hover:text-black transition-colors">
                  View campaigns
                  <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
