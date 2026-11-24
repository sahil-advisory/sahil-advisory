import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Phone } from 'lucide-react'
import { buildMetadata, breadcrumbJsonLd, graph, webPageJsonLd, ORG_ID } from '@/app/lib/seo'
import { BASE_URL, SITE, whatsappLink } from '@/app/lib/site'
import { LOCATIONS, getLocation, locationPath } from '@/app/lib/locations'
import { getService } from '@/app/lib/services'
import { REVIEWER } from '@/app/lib/experts'
import JsonLd from '@/app/components/JsonLd'
import FaqJsonLd from '@/app/components/FaqJsonLd'
import CallbackForm from '@/app/components/CallbackForm'
import { Container, Breadcrumbs, FaqAccordion, SectionHeading, CtaBand } from '@/app/components/ui'
import { PlanCard, ExpertCard } from '@/app/components/cards'

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return LOCATIONS.map((l) => ({ slug: l.slug }))
}
export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const l = getLocation(slug)
  if (!l) return {}
  return buildMetadata({ title: l.metaTitle, description: l.metaDescription, path: locationPath(l), keywords: [`tax consultant in ${l.city.toLowerCase()}`, `itr filing ${l.city.toLowerCase()}`, `gst consultant ${l.city.toLowerCase()}`, `cost accountant ${l.city.toLowerCase()}`] })
}

export default async function LocationPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const l = getLocation(slug)
  if (!l) notFound()
  const path = locationPath(l)
  const services = l.serviceSlugs.map(getService).filter((s) => s !== undefined)
  const others = LOCATIONS.filter((x) => x.slug !== l.slug)
  const h1 = `Tax consultant ${l.slug === 'mohali' ? 'for' : 'in'} ${l.city}`

  const jsonLd = graph(
    webPageJsonLd({ path, name: l.metaTitle, description: l.metaDescription }),
    breadcrumbJsonLd([{ name: l.city, path }], path),
    {
      '@type': 'Service',
      '@id': `${BASE_URL}${path}#service`,
      name: h1,
      serviceType: 'Tax and accounting services',
      provider: { '@id': ORG_ID },
      areaServed: { '@type': 'City', name: l.city },
      description: l.metaDescription,
    }
  )

  return (
    <>
      <JsonLd data={jsonLd} />
      <FaqJsonLd faqs={l.faqs} />
      <Container className="py-8 lg:py-12">
        <Breadcrumbs crumbs={[{ name: l.city, path }]} />
        <div className="mt-6 grid items-start gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div>
            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-navy-900 sm:text-5xl">{h1}</h1>
            <p className="mt-5 text-lg leading-relaxed text-text-2">{l.intro}</p>
            <p className="mt-4 flex items-start gap-2 text-text-2"><MapPin className="mt-1 h-4 w-4 shrink-0 text-green-700" aria-hidden /> {l.meeting}</p>
            <p className="mt-3 flex items-center gap-2 text-text-2"><Phone className="h-4 w-4 text-green-700" aria-hidden /> <a href={`tel:${SITE.phoneE164}`} className="font-mono font-semibold text-green-700 hover:underline">{SITE.phoneDisplay}</a></p>
            <h2 className="mt-10 text-xl font-bold text-navy-900">Tax facts for {l.city}</h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              {l.facts.map((f) => (
                <div key={f.label} className="rounded-2xl border border-border bg-card p-4">
                  <dt className="text-xs font-semibold text-muted">{f.label}</dt>
                  <dd className="mt-1 font-bold text-navy-900">{f.value}</dd>
                </div>
              ))}
            </dl>
            {l.notes.map((n) => (
              <section key={n.heading} className="mt-8">
                <h2 className="text-xl font-bold text-navy-900">{n.heading}</h2>
                <p className="mt-2 leading-relaxed text-text-2">{n.text}</p>
              </section>
            ))}
          </div>
          <aside className="space-y-6 lg:sticky lg:top-24">
            <CallbackForm compact service={h1} title={`Get a callback in ${l.city}`} options={{ label: 'You need', values: ['ITR filing', 'GST', 'Accounting', 'Bank loan report', 'Registration', 'Notice reply'] }} />
            <ExpertCard expert={REVIEWER} compact />
          </aside>
        </div>

        <section className="mt-16">
          <SectionHeading align="left" eyebrow="Services" title={`What ${l.city} clients ask us for`} desc="Prices exclude 18% GST." />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => <PlanCard key={s.slug} service={s} compact hideBadge />)}
          </div>
        </section>

        <div className="mt-16"><FaqAccordion faqs={l.faqs} title={`${l.city}: questions`} /></div>
        <p className="mt-8 text-sm text-text-2">
          Also serving {others.map((o, i) => <span key={o.slug}>{i > 0 && ' and '}<Link href={locationPath(o)} className="font-semibold text-green-700 hover:underline">{o.city}</Link></span>)}, and clients across India online.
        </p>
        <div className="mt-16">
          <CtaBand title="Tell us what you need filed" desc="Message us on WhatsApp. We confirm the price and the documents before any work starts." primary={{ label: 'Start on WhatsApp', href: whatsappLink(`Hi, I am in ${l.city} and need help with `) }} />
        </div>
      </Container>
    </>
  )
}
