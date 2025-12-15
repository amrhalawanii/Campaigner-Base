import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft, ChevronRight } from "lucide-react"

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

          <h1 className="text-4xl md:text-5xl font-bold mb-12 uppercase">Browse by Channel</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {channels.map((channel) => (
              <Link
                key={channel.id}
                href={`/channel/${channel.id}`}
                className="group p-6 rounded-lg border border-border bg-card hover:border-lime-400 transition-all"
              >
                <h3 className="text-xl font-bold mb-2 group-hover:text-lime-400 transition-colors">{channel.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{channel.description}</p>
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
