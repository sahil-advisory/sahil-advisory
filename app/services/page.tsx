import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buildMetadata, breadcrumbJsonLd, graph, webPageJsonLd } from '@/app/lib/seo'
import { BASE_URL } from '@/app/lib/site'
import { CATEGORIES, CATEGORY_PATH, CONSULTATIONS, servicesIn } from '@/app/lib/services'
import { formatINR, midSentence } from '@/app/lib/format'
import JsonLd from '@/app/components/JsonLd'
import { Button, Container, SectionHeading, Breadcrumbs, CtaBand, CheckList } from '@/app/components/ui'

export const metadata: Metadata = buildMetadata({
  title: 'Tax and Compliance Services | ITR, GST, TDS, Registrations, Notices',
  description: 'All tax and compliance services at fixed prices: ITR filing from ₹499, GST returns from ₹999/month, TDS returns, company and MSME registration, notice replies and paid consultations.',
  path: '/services',
  keywords: ['tax filing services', 'gst filing services', 'tds filing services', 'business registration services', 'tax consultant online'],
})

export default function ServicesHub() {
  const consult = CONSULTATIONS[0]
  return (
    <>
      <JsonLd
        data={graph(
          webPageJsonLd({ path: '/services', name: 'Tax and Compliance Services', description: metadata.description as string }),
          breadcrumbJsonLd([{ name: 'Services', path: '/services' }], '/services'),
          {
            '@type': 'ItemList',
            '@id': `${BASE_URL}/services#list`,
            itemListElement: CATEGORIES.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, url: `${BASE_URL}${CATEGORY_PATH[c.id]}` })),
          }
        )}
      />
      <Container className="py-10 lg:py-16">
        <Breadcrumbs crumbs={[{ name: 'Services', path: '/services' }]} />
        <div className="mt-6">
          <SectionHeading align="left" eyebrow="Services" title="Everything we file, register and reply to." emphasis="With the price next to it." desc="Pick a category. Each service page has a plan finder, the documents we need, turnaround and FAQs." />
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {CATEGORIES.map((c) => {
            const items = servicesIn(c.id)
            const priced = items.filter((s) => s.price !== null && s.price > 0)
            const min = priced.length ? Math.min(...priced.map((s) => s.price as number)) : null
            return (
              <article key={c.id} className="flex flex-col rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-navy-900">{c.name}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-text-2">{c.intro}</p>
                  </div>
                  {min !== null && (
                    <p className="shrink-0 rounded-xl bg-green-50 px-3 py-2 text-right">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-green-700">From</span>
                      <span className="font-mono text-lg font-bold text-navy-900">{formatINR(min)}</span>
                    </p>
                  )}
                </div>
                <CheckList className="mt-5" items={items.slice(0, 5).map((s) => s.name)} />
                <div className="mt-auto flex flex-wrap gap-3 pt-6">
                  <Button href={CATEGORY_PATH[c.id]} icon>View {midSentence(c.navLabel)} plans</Button>
                  <span className="self-center text-xs text-muted">{items.length} services</span>
                </div>
              </article>
            )
          })}
          <article className="flex flex-col rounded-3xl bg-navy-900 p-7 text-white">
            <h2 className="text-2xl font-extrabold tracking-tight">Consultation</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/70">Talk before you file. A 30 or 60-minute call with a qualified professional, with a written summary afterwards. The fee is adjusted against any service you buy within 30 days.</p>
            <p className="mt-5 font-mono text-lg font-bold">
              <span className="text-white/50 line-through">{formatINR(consult.mrp)}</span> {formatINR(consult.price)} <span className="text-sm font-normal text-white/60">/ 30 min</span>
            </p>
            <Link href="/consult" className="mt-auto inline-flex items-center gap-2 self-start rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold hover:bg-green-700">
              Book a consultation <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        </div>
        <div className="mt-16">
          <CtaBand />
        </div>
      </Container>
    </>
  )
}
