import { referenceOf, KIND_LABEL } from '@/app/lib/reference'
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/app/lib/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = KIND_LABEL.form.hubTitle

export default async function Image() {
  const n = referenceOf('form').length
  return ogImage({ eyebrow: KIND_LABEL.form.plural, title: KIND_LABEL.form.hubTitle, subtitle: KIND_LABEL.form.hubDesc, stat: { label: 'Explained', value: String(n), sub: 'forms' } })
}
