import Image from "next/image"

export type StoryBlock =
  | {
      type: "paragraph"
      content: string
    }
  | {
      type: "image"
      src: string
      alt: string
    }

interface StorySectionProps {
  blocks: StoryBlock[]
}

export function StorySection({ blocks }: StorySectionProps) {
  if (!blocks.length) return null

  return (
    <div className="space-y-8 max-w-[1344px]">
      {blocks.map((block, index) => {
        if (block.type === "image") {
          return (
            <div key={`${block.src}-${index}`} className="border border-white/20 rounded-[10px] overflow-hidden">
              <Image
                src={block.src}
                alt={block.alt}
                width={1344}
                height={903}
                className="w-full h-auto object-cover"
              />
            </div>
          )
        }

        return (
          <p key={`paragraph-${index}`} className="text-[20px] leading-relaxed text-[#f3f3f3] text-justify">
            {block.content}
          </p>
        )
      })}
    </div>
  )
}
