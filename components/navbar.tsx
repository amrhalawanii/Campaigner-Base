"use client"

import Link from "next/link"
import { Search } from "lucide-react"
import { useSearch } from "@/lib/search-context"
import { UserDropdown } from "@/components/user-dropdown"

export function Navbar() {
  const { setIsSearchOpen } = useSearch()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Campaigner logo"
            className="h-20 w-auto"
          />
        </Link>

        <div className="text-sm text-muted-foreground">V1.0</div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
            aria-label="Search campaigns"
          >
            <Search className="w-5 h-5" />
          </button>
          <UserDropdown />
        </div>
      </div>
    </nav>
  )
}
