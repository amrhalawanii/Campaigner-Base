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

export const campaigns: Campaign[] = [
  {
    id: 1,
    title: "Red Bull Racing Campaign",
    brand: "Red Bull",
    agency: "Wieden+Kennedy",
    image: "/red-bull-racing-car-on-track.jpg",
    saved: false,
    tags: ["sports", "racing", "automotive", "red bull"],
    year: 2023,
  },
  {
    id: 2,
    title: "The Language Files",
    brand: "Duolingo",
    agency: "TBWA",
    image: "/cartoon-characters-educational.jpg",
    saved: false,
    tags: ["education", "children", "learning", "creative"],
    year: 2023,
  },
  {
    id: 3,
    title: "RIMOWA Travel Stories",
    brand: "RIMOWA",
    agency: "Anomaly",
    image: "/people-walking-in-misty-forest.jpg",
    saved: false,
    tags: ["travel", "luxury", "lifestyle", "adventure"],
    year: 2024,
  },
  {
    id: 4,
    title: "Ocean Conservation",
    brand: "WWF",
    agency: "Ogilvy",
    image: "/underwater-ocean-scene.png",
    saved: false,
    tags: ["nature", "ocean", "environment", "sustainability"],
    year: 2023,
  },
  {
    id: 5,
    title: "Creative Excellence",
    brand: "Adobe",
    agency: "Droga5",
    image: "/creative-ad-campaign.png",
    saved: false,
    tags: ["creative", "advertising", "marketing", "brand"],
    year: 2024,
  },
  {
    id: 6,
    title: "Racing Heritage",
    brand: "Red Bull",
    agency: "Wieden+Kennedy",
    image: "/red-bull-racing-car-on-track.jpg",
    saved: false,
    tags: ["sports", "racing", "automotive", "red bull"],
    year: 2024,
  },
  {
    id: 7,
    title: "Learning Adventures",
    brand: "Duolingo",
    agency: "TBWA",
    image: "/cartoon-characters-educational.jpg",
    saved: false,
    tags: ["education", "children", "learning", "creative"],
    year: 2022,
  },
  {
    id: 8,
    title: "Luxury Travel",
    brand: "RIMOWA",
    agency: "Anomaly",
    image: "/people-walking-in-misty-forest.jpg",
    saved: false,
    tags: ["travel", "luxury", "lifestyle", "adventure"],
    year: 2023,
  },
  {
    id: 9,
    title: "Save Our Oceans",
    brand: "WWF",
    agency: "Ogilvy",
    image: "/underwater-ocean-scene.png",
    saved: false,
    tags: ["nature", "ocean", "environment", "sustainability"],
    year: 2024,
  },
  {
    id: 10,
    title: "Speed and Performance",
    brand: "Red Bull",
    agency: "Wieden+Kennedy",
    image: "/red-bull-racing-car-on-track.jpg",
    saved: false,
    tags: ["sports", "racing", "automotive", "red bull"],
    year: 2022,
  },
  {
    id: 11,
    title: "Global Learning",
    brand: "Duolingo",
    agency: "TBWA",
    image: "/cartoon-characters-educational.jpg",
    saved: false,
    tags: ["education", "children", "learning", "creative"],
    year: 2024,
  },
  {
    id: 12,
    title: "Journey Stories",
    brand: "RIMOWA",
    agency: "Droga5",
    image: "/people-walking-in-misty-forest.jpg",
    saved: false,
    tags: ["travel", "luxury", "lifestyle", "adventure"],
    year: 2023,
  },
]

export interface Agency {
  id: string
  name: string
  description: string
  logo?: string
  campaignCount: number
}

export const agencies: Agency[] = [
  {
    id: "wieden-kennedy",
    name: "Wieden+Kennedy",
    description: "Independent creative agency known for Nike, Coca-Cola, and Old Spice campaigns",
    campaignCount: 3,
  },
  {
    id: "tbwa",
    name: "TBWA",
    description: "Global advertising agency with expertise in disruption and innovation",
    campaignCount: 3,
  },
  {
    id: "anomaly",
    name: "Anomaly",
    description: "Creative agency that builds brands through unconventional thinking",
    campaignCount: 2,
  },
  {
    id: "ogilvy",
    name: "Ogilvy",
    description: "Legendary agency combining creativity with data-driven insights",
    campaignCount: 2,
  },
  {
    id: "droga5",
    name: "Droga5",
    description: "Award-winning creative agency known for bold, culturally relevant work",
    campaignCount: 2,
  },
]

export const caseStudies = [
  {
    id: 21,
    title: "Polo Ralph Lauren Heritage",
    brand: "Polo Ralph Lauren",
    image: "/polo-ralph-lauren-vintage-men-fashion.jpg",
    description: "Lorem ipsum dolor sit amet consectetur, adipiscing elit. Phasellus imperdiet.",
    saved: false,
  },
  {
    id: 22,
    title: "Nike Air Max Campaign",
    brand: "Nike",
    image: "/polo-ralph-lauren-vintage-men-fashion.jpg",
    description: "Revolutionary sneaker design meets bold marketing in this iconic campaign.",
    saved: false,
  },
  {
    id: 23,
    title: "Apple Think Different",
    brand: "Apple",
    image: "/polo-ralph-lauren-vintage-men-fashion.jpg",
    description: "Celebrating the creative minds who dare to change the world through innovation.",
    saved: false,
  },
  {
    id: 24,
    title: "Coca-Cola Share a Coke",
    brand: "Coca-Cola",
    image: "/polo-ralph-lauren-vintage-men-fashion.jpg",
    description: "Personalized bottles created connections and drove unprecedented engagement.",
    saved: false,
  },
  {
    id: 25,
    title: "Dove Real Beauty",
    brand: "Dove",
    image: "/polo-ralph-lauren-vintage-men-fashion.jpg",
    description: "Challenging beauty standards and celebrating diversity in authentic storytelling.",
    saved: false,
  },
  {
    id: 26,
    title: "Airbnb Belong Anywhere",
    brand: "Airbnb",
    image: "/polo-ralph-lauren-vintage-men-fashion.jpg",
    description: "Creating a global community where anyone can feel at home anywhere.",
    saved: false,
  },
  {
    id: 27,
    title: "Old Spice Man",
    brand: "Old Spice",
    image: "/polo-ralph-lauren-vintage-men-fashion.jpg",
    description: "Viral video sensation that transformed brand perception and drove massive sales.",
    saved: false,
  },
  {
    id: 28,
    title: "Spotify Wrapped",
    brand: "Spotify",
    image: "/polo-ralph-lauren-vintage-men-fashion.jpg",
    description: "Data-driven personalized storytelling that became an annual social media phenomenon.",
    saved: false,
  },
]
