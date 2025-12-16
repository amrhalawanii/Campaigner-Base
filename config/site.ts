import { APP_CONFIG } from "@/lib/constants"

export const siteConfig = {
  name: APP_CONFIG.NAME,
  description: APP_CONFIG.DESCRIPTION,
  version: APP_CONFIG.VERSION,
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
} as const

