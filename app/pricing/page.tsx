import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata, breadcrumbJsonLd, graph, webPageJsonLd } from '@/app/lib/seo'
import { BASE_URL } from '@/app/lib/site'
import { CATEGORIES, CATEGORY_PATH, CONSULTATIONS, servicesIn, servicePath, unitSuffix } from '@/app/lib/services'
import { formatINR } from '@/app/lib/format'
import JsonLd from '@/app/components/JsonLd'
import FaqJsonLd from '@/app/components/FaqJsonLd'
import PageEvent from '@/app/components/PageEvent'
import { Container, Breadcrumbs, SectionHeading, FaqAccordion, CtaBand, Badge } from '@/app/components/ui'

export const metadata: Metadata = buildMetadata({
  title: 'Pricing | Every ITR, GST, TDS and Registration Fee Published',
  description: 'All our prices on one page. ITR filing from ₹499, GST returns from ₹999 per month, TDS returns from ₹3,999 per quarter, Pvt Ltd from ₹6,999, consultations from ₹499. Ex-GST, no hidden fees.',
  path: '/pricing',
  keywords: ['itr filing charges', 'gst return filing charges', 'tds return filing fees', 'pvt ltd registration cost', 'tax consultant fees india', 'ca fees for itr filing'],
})

const FAQS = [
  { q: 'Are these prices inclusive of GST?', a: 'No. All prices are exclusive of 18% GST, which is added on the invoice. A GST invoice is issued for every order so businesses can claim input credit.' },
  { q: 'Are there any hidden charges?', a: 'No. The price covers everything listed under the plan. Government fees for registrations (stamp duty, DIN, DSC, name reservation) are charged at actuals with receipts and shown separately.' },
  { q: 'Why are notice replies quoted after triage?', a: 'The work depends on the section, the amount in dispute and the evidence needed. We read your notice free, explain it, and quote a fixed fee before any work begins.' },
  { q: 'Is the consultation fee adjustable?', a: 'Yes. The consultation fee is deducted from any service you buy within 30 days of the call.' },
  { q: 'Do you offer refunds?', a: 'Full refund if we cannot file because of our fault, and full refund on cancellation before work starts. See the refund policy for the complete terms.' },
  { q: 'Do prices change during the season?', a: 'Launch prices shown with a strikethrough are valid until 31 March 2027. Prices without a strikethrough are standard.' },
]

export default function PricingPage() {
  const allOffers = CATEGORIES.flatMap((c) => servicesIn(c.id)).filter((s) => s.price !== null && s.price > 0)
  return (
    <>
      <JsonLd
        data={graph(
          webPageJsonLd({ path: '/pricing', name: 'Pricing', description: metadata.description as string }),
          breadcrumbJsonLd([{ name: 'Pricing', path: '/pricing' }], '/pricing'),
          {
            '@type': 'OfferCatalog',
            '@id': `${BASE_URL}/pricing#catalog`,
            name: 'Sahil Advisory service prices',
            itemListElement: allOffers.map((s) => ({
              '@type': 'Offer',
              name: s.name,
              url: `${BASE_URL}${servicePath(s)}`,
              price: s.price,
              priceCurrency: 'INR',
              priceValidUntil: '2027-03-31',
            })),
          }
        )}
      />
      <FaqJsonLd faqs={FAQS} />
      <PageEvent event="pricing_view" />
      <Container className="py-10 lg:py-16">
        <Breadcrumbs crumbs={[{ name: 'Pricing', path: '/pricing' }]} />
        <div className="mt-6">
          <SectionHeading align="left" eyebrow="Pricing" title="Every price we charge," emphasis="on one page." desc="Prices exclude 18% GST. Strikethrough shows the standard price; the launch price is valid until 31 March 2027. Government fees are extra and charged at actuals." />
        </div>

        <div className="mt-12 space-y-14">
          {CATEGORIES.map((c) => {
            const items = servicesIn(c.id)
            return (
              <section key={c.id} id={c.id}>
                <div className="flex items-end justify-between gap-4">
                  <h2 className="text-2xl font-extrabold tracking-tight text-navy-900">{c.name}</h2>
                  <Link href={CATEGORY_PATH[c.id]} className="text-sm font-semibold text-green-700 hover:underline">View plans →</Link>
                </div>
                <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
                  <table className="w-full min-w-[640px] text-sm">
                    <thead className="bg-bg-alt text-left text-xs font-bold uppercase tracking-wider text-muted">
                      <tr>
                        <th className="px-5 py-3">Service</th>
                        <th className="px-5 py-3">Who it is for</th>
                        <th className="px-5 py-3">Turnaround</th>
                        <th className="px-5 py-3 text-right">Price (ex-GST)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {items.map((s) => (
                        <tr key={s.slug} className="hover:bg-bg-alt/60">
                          <td className="px-5 py-3.5">
                            <Link href={servicePath(s)} className="font-semibold text-navy-900 hover:text-green-700">{s.name}</Link>
                            {s.popular && <span className="ml-2"><Badge tone="gold">Popular</Badge></span>}
                          </td>
                          <td className="px-5 py-3.5 text-text-2">{s.whoFor}</td>
                          <td className="px-5 py-3.5 text-text-2">{s.turnaroundDays}</td>
                          <td className="px-5 py-3.5 text-right font-mono tabular">
                            {s.price === null ? (
                              <span className="text-text-2">{s.quoteLabel ?? 'Quote after free triage'}{s.mrp ? <span className="block text-xs text-muted">from {formatINR(s.mrp)}</span> : null}</span>
                            ) : s.price === 0 ? (
                              <span className="font-bold text-green-700">Free</span>
                            ) : (
                              <>
                                {s.mrp > s.price && <span className="mr-2 text-xs text-muted line-through">{formatINR(s.mrp)}</span>}
                                {s.priceFrom && <span className="mr-1 text-xs text-text-2">from</span>}
                                <span className="font-bold text-navy-900">{formatINR(s.price)}</span>
                                {unitSuffix(s.unit) && <span className="ml-1 text-xs text-muted">{unitSuffix(s.unit)}</span>}
                                {s.priceNote && <span className="block text-[11px] font-sans text-muted">{s.priceNote}</span>}
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )
          })}

          <section id="consult">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-extrabold tracking-tight text-navy-900">Consultation</h2>
              <Link href="/consult" className="text-sm font-semibold text-green-700 hover:underline">Book →</Link>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {CONSULTATIONS.map((k) => (
                <div key={k.slug} className={`rounded-2xl border bg-card p-5 shadow-[var(--shadow-card)] ${'popular' in k && k.popular ? 'border-green-600' : 'border-border'}`}>
                  <p className="font-bold text-navy-900">{k.name}</p>
                  <p className="mt-1 text-xs text-muted">{k.duration} minutes · video or phone</p>
                  <p className="mt-3 font-mono tabular"><span className="text-xs text-muted line-through">{formatINR(k.mrp)}</span> <span className="text-xl font-bold text-navy-900">{formatINR(k.price)}</span></p>
                  <p className="mt-2 text-sm text-text-2">{k.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted">Consultation fee is adjusted against any service bought within 30 days.</p>
          </section>
        </div>

        <div className="mt-16">
          <FaqAccordion faqs={FAQS} title="Pricing questions" />
        </div>
        <div className="mt-16">
          <CtaBand title="Want a quote for something not listed?" desc="Bookkeeping, payroll, ROC filings, GeM registration and tender support are priced on scope. Tell us what you need and we reply with a fixed fee." />
        </div>
      </Container>
    </>
  )
}
