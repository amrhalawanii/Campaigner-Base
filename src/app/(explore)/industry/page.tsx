"use client"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

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

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <div className="w-8 h-8 rounded-full bg-lime-400 flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 text-black" />
            </div>
            Go back
          </button>

          <h1 className="text-4xl md:text-5xl font-bold mb-12 uppercase">BROWSE BY INDUSTRY</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <Link
                key={industry.id}
                href={`/industry/${industry.id}`}
                className="group bg-card hover:bg-accent border border-border rounded-xl p-6 transition-all hover:scale-[1.02]"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold group-hover:text-lime-400 transition-colors">{industry.name}</h3>
                  <span className="text-sm text-muted-foreground">{industry.count} campaigns</span>
                </div>
                <p className="text-sm text-muted-foreground">{industry.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
