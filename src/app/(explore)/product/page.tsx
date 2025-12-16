import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"
import { ArrowLeft, ChevronRight } from "lucide-react"

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
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-foreground transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-lime-400 flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 text-black" />
            </div>
            <span className="text-sm font-medium">Go back</span>
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-12 uppercase">Browse by Product</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group p-6 rounded-lg border border-border bg-card hover:border-lime-400 transition-all"
              >
                <h3 className="text-xl font-bold mb-2 group-hover:text-lime-400 transition-colors">{product.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                <div className="flex items-center gap-1 text-sm text-lime-400">
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
