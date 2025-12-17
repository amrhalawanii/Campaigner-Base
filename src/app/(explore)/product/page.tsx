"use client"

import { useState, useMemo } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"
import { ArrowLeft, ChevronRight, Search } from "lucide-react"

const products = [
  { id: "fashion", name: "Fashion & Apparel", description: "Clothing, footwear, and accessories campaigns" },
  { id: "electronics", name: "Electronics & Tech", description: "Gadgets, devices, and technology products" },
  { id: "beauty", name: "Beauty & Cosmetics", description: "Makeup, skincare, and personal care products" },
  { id: "food-beverage", name: "Food & Beverage", description: "Food products, drinks, and culinary experiences" },
  { id: "home", name: "Home & Furniture", description: "Home decor, furniture, and household items" },
  { id: "automotive", name: "Automotive", description: "Cars, motorcycles, and vehicle accessories" },
  { id: "sports", name: "Sports & Fitness", description: "Athletic gear, equipment, and fitness products" },
  { id: "entertainment", name: "Entertainment", description: "Games, movies, music, and media products" },
]

export default function ProductPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#171a00] to-black text-white">
      <Navbar />

      <main className="pt-24 pb-12">
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

          <h1 className="text-4xl md:text-5xl font-bold mb-6 uppercase">Browse by Product</h1>

          {/* Search Bar */}
          <div className="relative mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white/70 pointer-events-none shrink-0" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full backdrop-blur-[15px] bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all h-14"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group backdrop-blur-[25px] bg-[rgba(8,33,37,0.1)] border border-[rgba(57,77,81,0.3)] rounded-xl p-6 hover:bg-[#CCED00] hover:border-[#CCED00] transition-all"
              >
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-black transition-colors">{product.name}</h3>
                <p className="text-white/70 text-sm mb-4 group-hover:text-black/70 transition-colors">{product.description}</p>
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
