"use client"

import { useState, useMemo } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { agencies } from "@/lib/data/campaign-data"
import Link from "next/link"
import { ArrowLeft, ChevronRight, Search } from "lucide-react"

export default function AgenciesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAgencies = useMemo(() => {
    if (!searchQuery.trim()) return agencies

    return agencies.filter(
      (agency) =>
        agency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agency.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#171a00] to-black text-white">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 text-black" />
            </div>
            Go back
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase">SELECT AN AGENCY</h1>
          <p className="text-muted-foreground mb-6">Browse campaigns by creative agency</p>

          {/* Search Bar */}
          <div className="relative mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white/70 pointer-events-none shrink-0" />
            <input
              type="text"
              placeholder="Search agencies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full backdrop-blur-[15px] bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all h-12"
            />
          </div>

          <div className="grid gap-6">
            {filteredAgencies.map((agency) => (
              <Link
                key={agency.id}
                href={`/agencies/${agency.id}`}
                className="group backdrop-blur-[25px] bg-[rgba(8,33,37,0.1)] border border-[rgba(57,77,81,0.3)] rounded-xl p-6 hover:bg-[#CCED00] hover:border-[#CCED00] transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-black transition-colors">
                      {agency.name}
                    </h3>
                    <p className="text-white/70 mb-4 group-hover:text-black/70 transition-colors">{agency.description}</p>
                    <div className="text-sm text-white/70 group-hover:text-black/70 transition-colors">
                      {agency.campaignCount} {agency.campaignCount === 1 ? "campaign" : "campaigns"}
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-white/70 group-hover:text-black transition-colors flex-shrink-0 ml-4" />
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
