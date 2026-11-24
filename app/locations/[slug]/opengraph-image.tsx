import { LOCATIONS, getLocation } from '@/app/lib/locations'
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/app/lib/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Sahil Advisory local tax services'

export function generateStaticParams() {
  return LOCATIONS.map((l) => ({ slug: l.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const l = getLocation(slug)
  if (!l) return ogImage({ eyebrow: 'Locations', title: 'Tax services near you' })
  return ogImage({ eyebrow: l.region, title: `Tax consultant for ${l.city}`, subtitle: l.intro, chips: ['ITR and GST', 'Published prices'] })
}
