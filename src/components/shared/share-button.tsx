"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Share2, Check } from "lucide-react"

interface ShareButtonProps {
  title: string
  campaignId: number
}

export function ShareButton({ title, campaignId }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = `${window.location.origin}/campaigns/${campaignId}`
    const shareData = {
      title: title,
      url: url,
    }

    try {
      // Check if Web Share API is available
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData)
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (error) {
      // User cancelled or error occurred, try clipboard fallback
      try {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (clipboardError) {
        console.error("Failed to copy to clipboard:", clipboardError)
      }
    }
  }

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={handleShare}
      className="h-10 w-10 rounded-full backdrop-blur-[25px] border border-[rgba(57,77,81,0.5)] bg-black/40 hover:bg-[rgba(204,237,0,0.2)] hover:border-[rgba(204,237,0,0.3)] transition-all duration-200 group"
      aria-label="Share campaign"
    >
      {copied ? (
        <Check className="w-5 h-5 text-[#CCED00]" />
      ) : (
        <Share2 className="w-5 h-5 text-white group-hover:text-[#CCED00] transition-colors duration-200" />
      )}
    </Button>
  )
}

