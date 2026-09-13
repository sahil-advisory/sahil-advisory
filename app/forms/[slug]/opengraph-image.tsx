import { referenceOf, getReference } from '@/app/lib/reference'
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/app/lib/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Income tax form explained by Sahil Advisory'

export function generateStaticParams() {
  return referenceOf('form').map((r) => ({ slug: r.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const r = getReference('form', slug)
  if (!r) return ogImage({ eyebrow: 'Forms', title: 'Income tax forms explained' })
  return ogImage({
    eyebrow: r.group,
    title: r.name,
    subtitle: r.summary,
    chips: r.keyFacts.slice(0, 3).map((f) => `${f.label}: ${f.value}`),
    stat: r.act2025 ? { label: 'Act 2025', value: r.act2025.newNumber.replace(/^(Section|Form)\s+/, ''), sub: 'from TY 2026-27' } : undefined,
  })
}
