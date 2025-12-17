"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { useSearch } from "@/lib/contexts/search-context"
import { UserDropdown } from "@/components/user/user-dropdown"

export function Navbar() {
  const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery } = useSearch()
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-6  flex items-center gap-4">
        {/* Logo - Always visible */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/logo.png"
            alt="Campaigner logo"
            className="h-20 w-auto"
          />
        </Link>

        {/* Middle Section - Search bar */}
        <div className="flex-1 flex items-center gap-4 min-w-0">
          {isSearchOpen && (
            <div className="flex-1 relative min-w-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white/70 pointer-events-none shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="What Are You Looking For Today?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full backdrop-blur-[15px] bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all h-12"
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setIsSearchOpen(false)
                    setSearchQuery("")
                  }
                }}
              />
            </div>
          )}
        </div>

        {/* Right Section - Search button (when closed) or separator + user dropdown */}
        <div className="flex items-center gap-4 shrink-0">
          {!isSearchOpen && (
            <button
              onClick={() => setIsSearchOpen(true)}
              className=" flex items-center justify-center h-12 p-2 transition-colors"
              aria-label="Search campaigns"
            >
              <Search className="w-6 h-6 text-white" />
            </button>

          )}

          {/* Vertical Separator */}
          <div className="flex h-4 items-center justify-center w-0">
            <div className="flex-none rotate-90">
              <div className="h-px w-4 bg-[rgba(255,255,255,0.1)]" />
            </div>
          </div>

          {/* User Dropdown - Always visible */}
          <UserDropdown />
        </div>
      </div>
    </nav>
  )
}
