import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CaseStudyCardProps {
  id: number
  title: string
  brand: string
  image: string
  description: string
}

export function CaseStudyCard({ id, title, brand, image, description }: CaseStudyCardProps) {
  return (
    <Link href={`/case-studies/${id}`}>
      <div className="group relative rounded-xl overflow-hidden bg-card hover:ring-2 hover:ring-accent/50 transition-all duration-300 cursor-pointer">
        <div className="aspect-[3/4] relative overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>
              <p className="text-sm text-white/80 line-clamp-2">{description}</p>
            </div>

            <Button variant="secondary" className="w-full bg-white text-black hover:bg-white/90 font-medium">
              Read more
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
