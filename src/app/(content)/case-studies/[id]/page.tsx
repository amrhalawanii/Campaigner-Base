"use client"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { useRouter } from "next/navigation"
import { ArrowLeft, Clock, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CaseStudyComingSoonPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#171a00] to-black text-white">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-12"
            >
              <div className="w-8 h-8 rounded-full bg-[#CCED00] flex items-center justify-center">
                <ArrowLeft className="w-4 h-4 text-black" />
              </div>
              <span>Go back</span>
            </button>

            {/* Coming Soon Content */}
            <div className="text-center py-20">
              {/* Icon */}
              <div className="relative inline-flex items-center justify-center mb-8">
                <div className="absolute inset-0 bg-[#CCED00]/20 rounded-full blur-3xl animate-pulse" />
                <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#CCED00]/20 to-[#CCED00]/5 border-2 border-[#CCED00]/30 flex items-center justify-center">
                  <Clock className="w-16 h-16 text-[#CCED00]" />
                </div>
              </div>

              {/* Title */}
              <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Coming Soon
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-white/60 mb-4 max-w-2xl mx-auto">
                We're working hard to bring you detailed case studies
              </p>
              <p className="text-lg text-white/40 mb-12 max-w-xl mx-auto">
                Stay tuned for in-depth insights, strategies, and results from our featured campaigns
              </p>

              {/* Decorative Elements */}
              <div className="flex items-center justify-center gap-2 mb-12">
                <Sparkles className="w-5 h-5 text-[#CCED00] animate-pulse" />
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#CCED00] to-transparent" />
                <Sparkles className="w-5 h-5 text-[#CCED00] animate-pulse delay-150" />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  onClick={() => router.back()}
                  className="bg-[#CCED00] text-black hover:bg-[#CCED00]/90 font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105"
                >
                  Back to Case Studies
                </Button>
                <Link href="/">
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300"
                  >
                    Go to Home
                  </Button>
                </Link>
              </div>

              {/* Additional Info */}
              <div className="mt-16 pt-12 border-t border-white/10">
                <p className="text-sm text-white/40 mb-4">What to expect:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-3xl mx-auto">
                  <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                    <div className="w-12 h-12 rounded-full bg-[#CCED00]/20 flex items-center justify-center mb-4">
                      <Sparkles className="w-6 h-6 text-[#CCED00]" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Detailed Analysis</h3>
                    <p className="text-sm text-white/60">
                      Comprehensive breakdowns of campaign strategies and execution
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                    <div className="w-12 h-12 rounded-full bg-[#CCED00]/20 flex items-center justify-center mb-4">
                      <Sparkles className="w-6 h-6 text-[#CCED00]" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Real Results</h3>
                    <p className="text-sm text-white/60">
                      Data-driven insights and measurable outcomes from each campaign
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                    <div className="w-12 h-12 rounded-full bg-[#CCED00]/20 flex items-center justify-center mb-4">
                      <Sparkles className="w-6 h-6 text-[#CCED00]" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Best Practices</h3>
                    <p className="text-sm text-white/60">
                      Learn from successful campaigns and apply insights to your own work
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
