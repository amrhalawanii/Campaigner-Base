"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Share2, Check, Copy } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

interface ShareButtonProps {
  title: string
  slug: string
}

export function ShareButton({ title, slug }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const url = `${window.location.origin}/campaigns/${slug}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setIsOpen(false)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy to clipboard:", error)
    }
  }

  const handleNativeShare = async () => {
    const shareData = {
      title: title,
      url: url,
    }

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData)
        setIsOpen(false)
      } else {
        // Fallback to copy link if native share is not available
        handleCopyLink()
      }
    } catch (error) {
      // User cancelled or error occurred
      if ((error as Error).name !== "AbortError") {
        // Only fallback if it's not a user cancellation
        handleCopyLink()
      }
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="h-10 w-10 rounded-full backdrop-blur-[25px] border border-[rgba(57,77,81,0.5)] bg-black/40 hover:bg-[rgba(204,237,0,0.2)] hover:border-[rgba(204,237,0,0.3)] transition-all duration-200 group"
          aria-label="Share campaign"
        >
          {copied ? (
            <Check className="w-5 h-5 text-[#CCED00]" />
          ) : (
            <Share2 className="w-5 h-5 text-white group-hover:text-[#CCED00] transition-colors duration-200" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="backdrop-blur-[10px] w-auto min-w-[200px] bg-[rgba(8,33,37,0.5)] border border-[rgba(255,255,255,0.05)] p-2 mt-2 rounded-lg"
      >
        {/* Campaign Title */}
        <div className="px-3 py-2 mb-2">
          <div className="text-white text-sm font-medium line-clamp-2">{title}</div>
        </div>

        <DropdownMenuSeparator className="bg-[rgba(255,255,255,0.05)] my-2" />

        {/* Copy Link Option */}
        <DropdownMenuItem
          onClick={handleCopyLink}
          className="p-0 h-auto focus:bg-transparent hover:bg-transparent cursor-pointer"
        >
          <div className="flex items-center gap-3 h-[27px] w-full px-2 py-1.5 rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-colors group">
            <Copy className="w-6 h-6 text-white shrink-0 group-hover:text-white" />
            <span className="text-white text-base font-medium leading-[27px]">Copy Link</span>
          </div>
        </DropdownMenuItem>

        {/* Native Share Option (if available) */}
        {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
          <>
            <DropdownMenuSeparator className="bg-[rgba(255,255,255,0.05)] my-2" />
            <DropdownMenuItem
              onClick={handleNativeShare}
              className="p-0 h-auto focus:bg-transparent hover:bg-transparent cursor-pointer"
            >
              <div className="flex items-center gap-3 h-[27px] w-full px-2 py-1.5 rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-colors group">
                <Share2 className="w-6 h-6 text-white shrink-0 group-hover:text-white" />
                <span className="text-white text-base font-medium leading-[27px]">Share</span>
              </div>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
