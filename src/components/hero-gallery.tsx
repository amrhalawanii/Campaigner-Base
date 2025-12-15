import Image from "next/image"

export interface HeroImage {
  src: string
  alt: string
}

interface HeroGalleryProps {
  images: HeroImage[]
}

export function HeroGallery({ images }: HeroGalleryProps) {
  if (!images.length) return null

  const [primary, ...secondary] = images

  return (
    <section className="mb-12">
      <div className="max-w-[1068px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="aspect-[3/5] rounded-[10px] overflow-hidden border border-white/20 shadow-[0_0_10px_rgba(0,0,0,0.2)]">
            <Image src={primary.src} alt={primary.alt} width={600} height={1000} className="w-full h-full object-cover" />
          </div>
          {secondary.map((image, index) => (
            <div
              key={image.src + index}
              className="aspect-[3/5] rounded-[10px] overflow-hidden border border-white/20 shadow-[0_0_10px_rgba(0,0,0,0.2)] hidden md:block"
            >
              <Image src={image.src} alt={image.alt} width={600} height={1000} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
