"use client"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"
import { ArrowLeft, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useMemo } from "react"

const industries = [
  {
    id: "retail",
    name: "Retail & E-commerce",
    description: "Campaigns focused on retail brands, online shopping, and consumer goods",
    count: 24,
  },
  {
    id: "technology",
    name: "Technology",
    description: "Tech companies, software, hardware, and digital innovation campaigns",
    count: 18,
  },
  {
    id: "automotive",
    name: "Automotive",
    description: "Car manufacturers, mobility services, and transportation campaigns",
    count: 15,
  },
  {
    id: "food-beverage",
    name: "Food & Beverage",
    description: "Restaurants, food brands, drinks, and culinary experiences",
    count: 22,
  },
  {
    id: "fashion",
    name: "Fashion & Beauty",
    description: "Clothing brands, cosmetics, accessories, and lifestyle campaigns",
    count: 20,
  },
  {
    id: "healthcare",
    name: "Healthcare & Wellness",
    description: "Medical services, wellness products, and health-focused campaigns",
    count: 12,
  },
  {
    id: "entertainment",
    name: "Entertainment & Media",
    description: "Movies, TV shows, music, gaming, and media campaigns",
    count: 16,
  },
  {
    id: "finance",
    name: "Finance & Insurance",
    description: "Banking, investment, insurance, and financial services campaigns",
    count: 10,
  },
]

export default function IndustryPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredIndustries = useMemo(() => {
    if (!searchQuery.trim()) return industries

    return industries.filter(
      (industry) =>
        industry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        industry.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#171a00] to-black text-white">
      <Navbar />

      <main className="pt-32 pb-12">
        <div className="container mx-auto px-6">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <div className="w-8 h-8 rounded-full bg-[#CCED00] flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 text-black" />
            </div>
            Go back
          </button>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 uppercase">BROWSE BY INDUSTRY</h1>

          {/* Search Bar */}
          <div className="relative mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white/70 pointer-events-none shrink-0" />
            <input
              type="text"
              placeholder="Search industries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full backdrop-blur-[15px] bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all h-14"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIndustries.map((industry) => (
              <Link
                key={industry.id}
                href={`/industry/${industry.id}`}
                className="group backdrop-blur-[25px] bg-[rgba(8,33,37,0.1)] border border-[rgba(57,77,81,0.3)] rounded-xl p-6 hover:bg-[#CCED00] hover:border-[#CCED00] transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-black transition-colors">{industry.name}</h3>
                  <span className="text-sm text-white/70 group-hover:text-black/70 transition-colors">{industry.count} campaigns</span>
                </div>
                <p className="text-sm text-white/70 group-hover:text-black/70 transition-colors">{industry.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
