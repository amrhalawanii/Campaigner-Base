"use client"

import { useEffect, useRef } from "react"
import { Bookmark } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCampaign } from "@/lib/contexts/campaign-context"

interface CampaignCardProps {
  id: number
  title: string
  brand: string
  image: string
  saved?: boolean
}

export function CampaignCard({ id, title, brand, image, saved: initialSaved = false }: CampaignCardProps) {
  const { isBookmarked, toggleBookmark, isLoading, setBookmarkState, setCampaignData } = useCampaign()
  const hasSyncedInitialState = useRef(false)
  const lastId = useRef(id)

  // Store campaign data and sync initial state
  useEffect(() => {
    // Always store campaign data in context for quick access
    setCampaignData(id, { id, title, brand, image, saved: initialSaved })
    
    // Reset sync flag if campaign ID changes
    if (lastId.current !== id) {
      hasSyncedInitialState.current = false
      lastId.current = id
    }
    
    // Only sync initial state once per campaign ID, and only if:
    // 1. We haven't synced yet for this campaign
    // 2. We have an initial saved value
    // 3. Not currently loading (to avoid race conditions)
    if (!hasSyncedInitialState.current && initialSaved !== undefined && !isLoading(id)) {
      const currentState = isBookmarked(id)
      // Only sync if the state doesn't match (to avoid unnecessary updates)
      if (currentState !== initialSaved) {
        setBookmarkState(id, initialSaved)
      }
      hasSyncedInitialState.current = true
    }
  }, [id, title, brand, image, initialSaved, isBookmarked, isLoading, setBookmarkState, setCampaignData])

  // Get current bookmark state from context (this is the source of truth)
  const saved = isBookmarked(id)
  const isBookmarkLoading = isLoading(id)

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleBookmark(id)
  }

  return (
    <div className="group relative text-white">
      <Link href={`/campaigns/${id}`}>
        <div className="aspect-[4/2] relative overflow-hidden rounded-lg border border-white/20 shadow-[0_0_10px_rgba(0,0,0,0.1)]">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

          <button
            onClick={handleBookmarkClick}
            disabled={isBookmarkLoading}
            className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/80 rounded-lg backdrop-blur-sm transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={saved ? "Remove from saved" : "Save campaign"}
          >
            <Bookmark className={`w-5 h-5 ${saved ? "fill-accent text-accent" : "text-white"}`} />
          </button>
        </div>
      </Link>

      <div className="mt-4">
        <Link href={`/campaigns/${id}`}>
          <h3 className="font-semibold text-base text-white group-hover:text-accent transition-colors line-clamp-1">
            {title}
          </h3>
        </Link>
        <p className="text-sm text-white/60 mt-1">{brand}</p>
      </div>
    </div>
  )
}
