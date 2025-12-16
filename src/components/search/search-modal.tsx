"use client"

import { useEffect, useState } from "react"
import { Search, X } from "lucide-react"
<<<<<<<< HEAD:src/components/search-modal.tsx
import { useSearch } from "@/hooks/search-context"
import { campaigns } from "@/data/campaigns"
import { CampaignCard } from "@/components/campaign-card"
========
import { useSearch } from "@/lib/contexts/search-context"
import { campaigns } from "@/lib/data/campaign-data"
import { CampaignCard } from "@/components/campaign/campaign-card"
>>>>>>>> restructure:src/components/search/search-modal.tsx

export function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery } = useSearch()
  const [filteredCampaigns, setFilteredCampaigns] = useState(campaigns)

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCampaigns(campaigns)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = campaigns.filter(
      (campaign) =>
        campaign.title.toLowerCase().includes(query) ||
        campaign.brand.toLowerCase().includes(query) ||
        campaign.tags?.some((tag) => tag.toLowerCase().includes(query)),
    )
    setFilteredCampaigns(filtered)
  }, [searchQuery])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false)
      }
    }

    if (isSearchOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isSearchOpen, setIsSearchOpen])

  if (!isSearchOpen) return null

  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-6 pt-24 pb-12 h-full overflow-y-auto">
        {/* Search Header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search campaigns by title, brand, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-secondary/50 border border-border rounded-lg pl-12 pr-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-accent"
              autoFocus
            />
          </div>
          <button
            onClick={() => {
              setIsSearchOpen(false)
              setSearchQuery("")
            }}
            className="p-3 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Results */}
        <div>
          <div className="mb-4 text-sm text-muted-foreground">
            {searchQuery ? `Found ${filteredCampaigns.length} results` : "Recent campaigns"}
          </div>

          {filteredCampaigns.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} {...campaign} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-lg text-muted-foreground">No campaigns found</p>
              <p className="text-sm text-muted-foreground mt-2">Try searching with different keywords</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
