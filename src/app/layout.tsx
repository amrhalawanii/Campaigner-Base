import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SearchProvider } from "@/lib/contexts/search-context"
import { AuthProvider } from "@/lib/contexts/auth-context"
import { CampaignProvider } from "@/lib/contexts/campaign-context"
import { SearchModal } from "@/components/search/search-modal"
import { VersionLogger } from "@/components/shared/version-logger"
import { Toaster } from "@/components/ui/toaster"
import "@/styles/globals.css"
import { Suspense } from "react"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Campaigner - Marketing Inspiration Platform",
  description: "A visual-first marketing inspiration platform for marketers to discover, organize, and plan campaigns",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/logo-c.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logo-c.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/logo-c.png",
        type: "image/png+xml",
      },
    ],
    apple: "/logo-c.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`} suppressHydrationWarning>
        <Suspense fallback={<div>Loading...</div>}>
          <VersionLogger />
          <AuthProvider>
            <CampaignProvider>
              <SearchProvider>
                {children}
                <SearchModal />
              </SearchProvider>
            </CampaignProvider>
          </AuthProvider>
          <Toaster />
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
