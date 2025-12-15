"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Share2, Copy, Check, Facebook, Twitter, Linkedin } from "lucide-react"

interface ShareDialogProps {
  url: string
  title: string
}

export function ShareDialog({ url, title }: ShareDialogProps) {
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)

  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}${url}` : url

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("[v0] Failed to copy:", err)
    }
  }

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl)
    const encodedTitle = encodeURIComponent(title)

    const urls: { [key: string]: string } = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    }

    window.open(urls[platform], "_blank", "width=600,height=400")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white hover:bg-white/10">
          <Share2 className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle>Share Campaign</DialogTitle>
          <DialogDescription className="text-zinc-400">Share this campaign with your network</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {/* Social Media Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-4 bg-zinc-800 border-zinc-700 hover:bg-zinc-700 hover:text-white"
              onClick={() => handleShare("facebook")}
            >
              <Facebook className="w-5 h-5" />
              <span className="text-xs">Facebook</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-4 bg-zinc-800 border-zinc-700 hover:bg-zinc-700 hover:text-white"
              onClick={() => handleShare("twitter")}
            >
              <Twitter className="w-5 h-5" />
              <span className="text-xs">Twitter</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-4 bg-zinc-800 border-zinc-700 hover:bg-zinc-700 hover:text-white"
              onClick={() => handleShare("linkedin")}
            >
              <Linkedin className="w-5 h-5" />
              <span className="text-xs">LinkedIn</span>
            </Button>
          </div>

          {/* Copy Link */}
          <div className="flex items-center gap-2">
            <div className="flex-1 px-3 py-2 bg-zinc-800 rounded-lg text-sm text-zinc-300 truncate">{shareUrl}</div>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
              onClick={handleCopyLink}
            >
              {copied ? <Check className="w-4 h-4 text-lime-400" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
