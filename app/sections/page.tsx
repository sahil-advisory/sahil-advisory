import type { Metadata } from 'next'
import { buildMetadata, breadcrumbJsonLd, graph, webPageJsonLd } from '@/app/lib/seo'
import { BASE_URL } from '@/app/lib/site'
import { referenceOf, referencePath, KIND_LABEL } from '@/app/lib/reference'
import JsonLd from '@/app/components/JsonLd'
import ReferenceHub from '@/app/components/reference/ReferenceHub'

const label = KIND_LABEL.section

export const metadata: Metadata = buildMetadata({
  title: 'Income Tax Sections Explained | 80C, 80D, 87A, 44AD, 54',
  description: label.hubDesc,
  path: '/sections',
  keywords: ['income tax sections list', 'section 80c', 'section 87a', 'section 44ad', 'income tax act 2025 sections', 'deductions under income tax'],
})

export default function Page() {
  const items = referenceOf('section')
  return (
    <>
      <JsonLd
        data={graph(
          { ...webPageJsonLd({ path: '/sections', name: label.hubTitle, description: label.hubDesc }), '@type': 'CollectionPage' },
          breadcrumbJsonLd([{ name: label.plural, path: '/sections' }], '/sections'),
          { '@type': 'ItemList', '@id': `${BASE_URL}/sections#list`, itemListElement: items.map((r, i) => ({ '@type': 'ListItem', position: i + 1, name: r.name, url: `${BASE_URL}${referencePath(r)}` })) }
        )}
      />
      <ReferenceHub kind="section" />
    </>
  )
}
