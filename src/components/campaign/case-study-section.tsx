"use client"

import { useEffect, useState, useRef } from "react"
import { CaseStudyCard } from "./case-study-card"
import { ChevronRight } from "lucide-react"
import type { CaseStudy } from "@/lib/data/campaign-data"
import Link from "next/link"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

interface CaseStudySectionProps {
  title: string
  caseStudies: CaseStudy[]
  viewMoreLink?: string
}

export function CaseStudySection({ title, caseStudies, viewMoreLink }: CaseStudySectionProps) {
  // Show exactly 10 case studies (or all available if less than 10)
  const displayedCaseStudies = caseStudies.slice(0, 10)
  const [api, setApi] = useState<CarouselApi>()
  const carouselContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!api || !carouselContainerRef.current) return

    const carouselElement = carouselContainerRef.current
    const carouselContent = carouselElement.querySelector('[data-slot="carousel-content"]') as HTMLElement
    
    if (!carouselContent) return

    let scrollAccumulator = 0
    let scrollTimeout: NodeJS.Timeout
    const SCROLL_THRESHOLD = 100

    const handleWheel = (e: WheelEvent) => {
      const rect = carouselContent.getBoundingClientRect()
      const isOverCarousel = 
        e.clientX >= rect.left && 
        e.clientX <= rect.right && 
        e.clientY >= rect.top && 
        e.clientY <= rect.bottom

      if (!isOverCarousel) return

      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault()
        e.stopPropagation()
        
        scrollAccumulator += e.deltaX
        
        if (Math.abs(scrollAccumulator) >= SCROLL_THRESHOLD) {
          if (scrollAccumulator > 0) {
            api.scrollNext()
          } else {
            api.scrollPrev()
          }
          scrollAccumulator = 0
        }
        
        clearTimeout(scrollTimeout)
        scrollTimeout = setTimeout(() => {
          scrollAccumulator = 0
        }, 100)
        return
      }

      if (Math.abs(e.deltaY) > 0) {
        e.preventDefault()
        e.stopPropagation()
        
        scrollAccumulator += e.deltaY
        
        if (Math.abs(scrollAccumulator) >= SCROLL_THRESHOLD) {
          if (scrollAccumulator > 0) {
            api.scrollNext()
          } else {
            api.scrollPrev()
          }
          scrollAccumulator = 0
        }
        
        clearTimeout(scrollTimeout)
        scrollTimeout = setTimeout(() => {
          scrollAccumulator = 0
        }, 100)
      }
    }

    carouselContent.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      carouselContent.removeEventListener("wheel", handleWheel)
      clearTimeout(scrollTimeout)
    }
  }, [api])

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-6 text-white">
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
        {viewMoreLink && (
          <Link
            href={viewMoreLink}
            className="text-sm text-white hover:text-accent transition-colors flex items-center gap-1"
          >
            View More
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      <div ref={carouselContainerRef}>
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: false,
            dragFree: true,
            containScroll: "trimSnaps",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {displayedCaseStudies.map((study) => (
              <CarouselItem key={study.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <CaseStudyCard {...study} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 bg-black/60 hover:bg-black/80 border-white/20 text-white" />
          <CarouselNext className="right-0 bg-black/60 hover:bg-black/80 border-white/20 text-white" />
        </Carousel>
      </div>
    </section>
  )
}

