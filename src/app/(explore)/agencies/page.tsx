import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { agencies } from "@/lib/data/campaign-data"
import Link from "next/link"
import { ArrowLeft, ChevronRight } from "lucide-react"

export default function AgenciesPage() {
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

          <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase">SELECT AN AGENCY</h1>
          <p className="text-muted-foreground mb-12">Browse campaigns by creative agency</p>

          <div className="grid gap-6">
            {agencies.map((agency) => (
              <Link
                key={agency.id}
                href={`/agencies/${agency.id}`}
                className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {agency.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">{agency.description}</p>
                    <div className="text-sm text-muted-foreground">
                      {agency.campaignCount} {agency.campaignCount === 1 ? "campaign" : "campaigns"}
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
