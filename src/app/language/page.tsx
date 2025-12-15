"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LanguagePage() {
  const router = useRouter()

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-background" />
          </div>
          <span>Go back</span>
        </button>

        <h1 className="text-4xl font-bold mb-8">LANGUAGE SETTINGS</h1>

        <div className="max-w-2xl">
          <div className="bg-card border border-border rounded-lg p-8">
            <p className="text-muted-foreground">Language settings coming soon...</p>
          </div>
        </div>
      </div>
    </main>
  )
}
