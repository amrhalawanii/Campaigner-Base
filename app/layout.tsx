import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SearchProvider } from "@/lib/contexts/search-context"
import { SearchModal } from "@/components/search/search-modal"
import { VersionLogger } from "@/components/shared/version-logger"
import "./globals.css"
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
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
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
        <VersionLogger />
        <Suspense fallback={<div>Loading...</div>}>
          <SearchProvider>
            {children}
            <SearchModal />
          </SearchProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
