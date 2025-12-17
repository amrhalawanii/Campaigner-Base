"use client"

import { useState } from "react"
import { Bookmark } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { createSlug } from "@/lib/utils/slug"

interface CampaignCardProps {
  id: number
  title: string
  brand: string
  image: string
  saved?: boolean
}

export function CampaignCard({ id, title, brand, image, saved: initialSaved = false }: CampaignCardProps) {
  const [saved, setSaved] = useState(initialSaved)
  const slug = createSlug(title)

  return (
    <div className="group relative text-white">
      <Link href={`/campaigns/${slug}`}>
        <div className="aspect-[4/2] relative overflow-hidden rounded-lg border border-white/20 shadow-[0_0_10px_rgba(0,0,0,0.1)]">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setSaved(!saved)
            }}
            className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/80 rounded-lg backdrop-blur-sm transition-colors z-10"
          >
            <Bookmark className={`w-5 h-5 ${saved ? "fill-accent text-accent" : "text-white"}`} />
          </button>
        </div>
      </Link>

      <div className="mt-4">
        <Link href={`/campaigns/${slug}`}>
          <h3 className="font-semibold text-base text-white group-hover:text-accent transition-colors line-clamp-1">
            {title}
          </h3>
        </Link>
        <p className="text-sm text-white/60 mt-1">{brand}</p>
      </div>
    </div>
  )
}
