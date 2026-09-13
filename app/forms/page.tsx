import type { Metadata } from 'next'
import { buildMetadata, breadcrumbJsonLd, graph, webPageJsonLd } from '@/app/lib/seo'
import { BASE_URL } from '@/app/lib/site'
import { referenceOf, referencePath, KIND_LABEL } from '@/app/lib/reference'
import JsonLd from '@/app/components/JsonLd'
import ReferenceHub from '@/app/components/reference/ReferenceHub'

const label = KIND_LABEL.form

export const metadata: Metadata = buildMetadata({
  title: 'Income Tax Forms Explained | Form 16, 26AS, AIS, ITR-1 to 4',
  description: label.hubDesc,
  path: '/forms',
  keywords: ['income tax forms', 'form 16', 'form 26as', 'ais', 'itr forms', 'which itr form', 'form 15g'],
})

export default function Page() {
  const items = referenceOf('form')
  return (
    <>
      <JsonLd
        data={graph(
          { ...webPageJsonLd({ path: '/forms', name: label.hubTitle, description: label.hubDesc }), '@type': 'CollectionPage' },
          breadcrumbJsonLd([{ name: label.plural, path: '/forms' }], '/forms'),
          { '@type': 'ItemList', '@id': `${BASE_URL}/forms#list`, itemListElement: items.map((r, i) => ({ '@type': 'ListItem', position: i + 1, name: r.name, url: `${BASE_URL}${referencePath(r)}` })) }
        )}
      />
      <ReferenceHub kind="form" />
    </>
  )
}
