// Campaign Types
export interface Campaign {
  id: number
  title: string
  brand: string
  image: string
  description?: string
  tags?: string[]
  date?: string
  saved: boolean
  agency?: string
  year?: number
}

export interface Agency {
  id: string
  name: string
  description: string
  logo?: string
  campaignCount: number
}

export interface CaseStudy {
  id: number
  title: string
  brand: string
  image: string
  description: string
  saved?: boolean
}

// Component Props Types
export interface CampaignCardProps {
  id: number
  title: string
  brand: string
  image: string
  saved?: boolean
}

export interface CategoryTileProps {
  label: string
  image: string
  href: string
  size?: "default" | "large"
  gradient?: string
}

export interface ShareDialogProps {
  url: string
  title: string
}

// Search Types
export interface SearchContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void
  isSearchOpen: boolean
  setIsSearchOpen: (open: boolean) => void
}

