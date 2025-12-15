import { TagMeta } from "@/lib/campaign-meta"

interface TagListProps {
  tags: TagMeta[]
}

export function TagList({ tags }: TagListProps) {
  if (!tags.length) return null

  return (
    <div className="flex flex-wrap gap-3 text-sm">
      {tags.map((tag) => (
        <span
          key={tag.key}
          className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-white text-sm"
        >
          {tag.label}
        </span>
      ))}
    </div>
  )
}
