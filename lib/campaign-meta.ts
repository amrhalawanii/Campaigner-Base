export interface TagMeta {
  key: string
  label: string
}

const tagMetadata: Record<string, TagMeta> = {
  furniture: { key: "furniture", label: "Furniture" },
  "july-2023": { key: "july-2023", label: "July 2023" },
  pillows: { key: "pillows", label: "Pillows" },
  amoux: { key: "amoux", label: "Amoux" },
  "social-media-tv": { key: "social-media-tv", label: "Social Media & TV" },
  billboards: { key: "billboards", label: "Billboards" },
  australia: { key: "australia", label: "Australia" },
}

export const campaignDetailTagKeys = [
  "furniture",
  "july-2023",
  "pillows",
  "amoux",
  "social-media-tv",
  "billboards",
  "australia",
] as const

export function resolveTagMetadata(keys: readonly string[]): TagMeta[] {
  return keys.map((key) => tagMetadata[key] ?? { key, label: key })
}
