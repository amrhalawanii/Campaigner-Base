import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { campaigns } from "@/lib/data/campaign-data"
import Link from "next/link"
import { ArrowLeft, ChevronRight } from "lucide-react"

export default function BrandsPage() {
  const uniqueBrands = Array.from(new Set(campaigns.map((c) => c.brand)))
    .map((brandName) => {
      const brandCampaigns = campaigns.filter((c) => c.brand === brandName)
      return {
        id: brandName.toLowerCase().replace(/\s+/g, "-"),
        name: brandName,
        campaignCount: brandCampaigns.length,
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="min-h-screen">
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
          

          <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase">SELECT A BRAND</h1>
          <p className="text-muted-foreground mb-12">Browse campaigns by brand</p>

          <div className="grid gap-6">
            {uniqueBrands.map((brand) => (
              <Link
                key={brand.id}
                href={`/brands/${brand.id}`}
                className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{brand.name}</h3>
                    <div className="text-sm text-muted-foreground">
                      {brand.campaignCount} {brand.campaignCount === 1 ? "campaign" : "campaigns"}
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-4" />
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
