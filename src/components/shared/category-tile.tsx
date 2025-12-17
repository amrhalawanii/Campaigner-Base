import Link from "next/link"

interface CategoryTileProps {
  label: string
  gradient?: string
  image?: string
  size?: "small" | "medium" | "large"
  href?: string
}

export function CategoryTile({ label, gradient, image, href }: CategoryTileProps) {
  const backgroundStyle = {
    backgroundImage: image ? `url(${image})` : gradient,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  } as const

  const content = (
    <>
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
      <div className="relative w-full h-full flex items-end p-0">
        <span className="text-[26px] md:text-2xl font-black text-white uppercase leading-[27px] mb-4 ml-4 md:ml-4">{label}</span>
      </div>
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        className="block w-full h-full rounded-[8px] md:rounded-lg overflow-hidden border border-white/20 shadow-[0_0_10px_rgba(0,0,0,0.1)] group hover:scale-[1.02] transition-transform duration-300 relative"
        style={backgroundStyle}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      className="w-full h-full rounded-[8px] md:rounded-lg overflow-hidden border border-white/20 shadow-[0_0_10px_rgba(0,0,0,0.1)] group hover:scale-[1.02] transition-transform duration-300 relative"
      style={backgroundStyle}
    >
      {content}
    </button>
  )
}
