import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Clock, ShieldCheck } from 'lucide-react'
import { buildMetadata, breadcrumbJsonLd, graph, webPageJsonLd, ORG_ID } from '@/app/lib/seo'
import { BASE_URL, whatsappLink } from '@/app/lib/site'
import { SERVICES, CATEGORY_PATH, getCategory, getService, servicesIn, servicePath, unitSuffix } from '@/app/lib/services'
import { deadlineItems } from '@/app/lib/deadline-items'
import { LIVE_CALCULATORS } from '@/app/lib/calculators'
import { GUIDES, guidePath } from '@/app/lib/guides'
import { REVIEWER } from '@/app/lib/experts'
import JsonLd from '@/app/components/JsonLd'
import FaqJsonLd from '@/app/components/FaqJsonLd'
import DeadlineWidget from '@/app/components/DeadlineWidget'
import CallbackForm from '@/app/components/CallbackForm'
import PlanDetails from '@/app/components/PlanDetails'
import TrackedLink from '@/app/components/TrackedLink'
import PageEvent from '@/app/components/PageEvent'
import RelatedReference from '@/app/components/reference/RelatedReference'
import { Container, Breadcrumbs, TrustStrip, ProcessSteps, FaqAccordion, CtaBand, PriceTag, Badge, SectionHeading } from '@/app/components/ui'
import { PlanCard, ExpertCard, CalculatorCard, GuideCard } from '@/app/components/cards'
import { midSentence } from '@/app/lib/format'

type Params = { category: string; sku: string }

export function generateStaticParams(): Params[] {
  return SERVICES.map((s) => ({ category: s.category, sku: s.slug }))
}
export const dynamicParams = false
// Deadline countdown data is computed on the server; refresh hourly.
export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category, sku } = await params
  const s = getService(sku)
  if (!s || s.category !== category) return {}
  const priceTxt = s.price === null ? 'Fixed quote after free triage' : s.price === 0 ? 'Free' : `${s.priceFrom ? 'from ' : ''}₹${s.price.toLocaleString('en-IN')}${unitSuffix(s.unit) ? ' ' + unitSuffix(s.unit).replace('/ ', 'per ') : ''}`
  return buildMetadata({
    title: `${s.name} | ${priceTxt}`.slice(0, 60),
    // No manual slice here: buildMetadata clamps at a word boundary, and
    // slicing first can leave a dangling fragment such as a bare "10".
    description: `${s.shortDesc} ${s.whoFor}.`,
    path: servicePath(s),
    keywords: s.keywords,
  })
}

export default async function SkuPage({ params }: { params: Promise<Params> }) {
  const { category, sku } = await params
  const s = getService(sku)
  const c = getCategory(category)
  if (!s || !c || s.category !== category) notFound()
  const path = servicePath(s)
  const catPath = CATEGORY_PATH[c.id]
  const others = servicesIn(c.id).filter((x) => x.slug !== s.slug).slice(0, 3)
  const guides = GUIDES.filter((g) => s.relatedGuides?.includes(g.slug)).slice(0, 3)
  const calcs = LIVE_CALCULATORS.filter((x) => s.relatedCalculators?.includes(x.slug))
  const deadlines = deadlineItems(c.deadlineKeys).slice(0, 2)
  const faqs = [...s.faqs, ...c.faqs.slice(0, 4)]
  const wa = whatsappLink(`Hi, I want to get started with ${s.name}${s.price !== null && s.price > 0 ? ` (${s.priceFrom ? 'from ' : ''}₹${s.price.toLocaleString('en-IN')})` : ''}.`)

  const jsonLd = graph(
    webPageJsonLd({ path, name: s.name, description: s.shortDesc }),
    breadcrumbJsonLd([{ name: 'Services', path: '/services' }, { name: c.navLabel, path: catPath }, { name: s.name, path }], path),
    {
      '@type': 'Service',
      '@id': `${BASE_URL}${path}#service`,
      name: s.name,
      serviceType: c.name,
      description: s.longDesc,
      provider: { '@id': ORG_ID },
      areaServed: { '@type': 'Country', name: 'India' },
      ...(s.price !== null
        ? {
            offers: {
              '@type': 'Offer',
              price: s.price,
              priceCurrency: 'INR',
              priceValidUntil: '2027-03-31',
              availability: 'https://schema.org/InStock',
              url: `${BASE_URL}${path}`,
            },
          }
        : {}),
    },
    {
      '@type': 'HowTo',
      '@id': `${BASE_URL}${path}#howto`,
      name: `How ${s.name} works`,
      step: c.steps.map((st, i) => ({ '@type': 'HowToStep', position: i + 1, name: st.title, text: st.desc })),
    }
  )

  return (
    <>
      <JsonLd data={jsonLd} />
      <FaqJsonLd faqs={faqs} />
      <PageEvent event="plan_view" props={{ plan: s.slug, category: c.id, price: s.price ?? undefined }} />

      <section className="bg-[linear-gradient(to_bottom,_#ffffff,_var(--bg-alt))]">
        <Container className="py-8 lg:py-12">
          <Breadcrumbs crumbs={[{ name: 'Services', path: '/services' }, { name: c.navLabel, path: catPath }, { name: s.name, path }]} />
          <div className="mt-6 grid items-start gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="navy">{c.navLabel}</Badge>
                {s.popular && <Badge tone="gold">Most popular</Badge>}
              </div>
              <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight text-navy-900 sm:text-5xl">{s.name}</h1>
              <p className="mt-3 text-base font-medium text-green-700">{s.whoFor}</p>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-text-2">{s.longDesc}</p>
              <div className="mt-7 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
                <PriceTag size="lg" price={s.price} mrp={s.mrp} unit={unitSuffix(s.unit)} quote={s.quoteLabel} from={s.priceFrom} note={s.priceNote} />
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-text-2">
                  <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-green-600" /> {s.turnaroundDays}</span>
                  <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-green-600" /> Reviewed by {REVIEWER.name}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <TrackedLink event="plan_cta_click" props={{ plan: s.slug, category: c.id, placement: 'sku_hero' }} href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700">
                    Get started on WhatsApp <ArrowRight className="h-4 w-4" />
                  </TrackedLink>
                  <Link href="/consult" className="inline-flex items-center rounded-lg border border-border-strong bg-white px-5 py-3 text-sm font-semibold text-navy-900 hover:bg-bg-alt">
                    Ask a question first
                  </Link>
                </div>
                <p className="mt-3 text-xs text-muted">Online payment and dashboard tracking arrive with the client portal. Until then we confirm the order on WhatsApp and send a GST invoice.</p>
              </div>
            </div>
            <div className="space-y-4 lg:pl-4">
              {deadlines.length > 0 && <DeadlineWidget items={deadlines} />}
              <CallbackForm compact service={s.name} title="Questions? Get a free callback." />
            </div>
          </div>
        </Container>
      </section>

      <TrustStrip items={c.trust} />

      <PlanDetails service={s} />

      <section className="bg-bg-alt py-16 lg:py-20">
        <Container>
          <ProcessSteps steps={c.steps} title={`How ${midSentence(s.name)} works`} />
        </Container>
      </section>

      {(calcs.length > 0 || guides.length > 0) && (
        <Container className="py-16 lg:py-20">
          <SectionHeading align="left" eyebrow="Before you start" title="Estimate first, then file" />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {calcs.map((k) => (
              <CalculatorCard key={k.slug} calc={k} />
            ))}
            {guides.map((g) => (
              <GuideCard key={g.slug} guide={g} />
            ))}
          </div>
        </Container>
      )}

      <section className="bg-bg-alt py-16 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <div>
            <SectionHeading align="left" eyebrow="Your expert" title="Prepared and reviewed by a qualified professional" />
            <div className="mt-6"><ExpertCard expert={REVIEWER} compact /></div>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">Other {midSentence(c.navLabel)} plans</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {others.map((o) => (
                <PlanCard key={o.slug} service={o} compact />
              ))}
            </div>
            <Link href={catPath} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-green-700 hover:underline">
              All {midSentence(c.navLabel)} plans <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      <Container className="py-16 lg:py-20">
        <RelatedReference service={s.slug} title="Sections and forms this plan covers" />
        <div className="mt-12" />
        <FaqAccordion faqs={faqs} title={`FAQ about ${midSentence(s.name)}`} />
        {guides.length > 0 && (
          <p className="mt-6 text-center text-sm text-muted">
            Read next: {guides.map((g, i) => (<span key={g.slug}>{i > 0 && ' · '}<Link href={guidePath(g)} className="font-semibold text-green-700 hover:underline">{g.title}</Link></span>))}
          </p>
        )}
        <div className="mt-16">
          <CtaBand title={`Ready to start ${midSentence(s.name)}?`} desc="Message us on WhatsApp with the service name, or request a callback. We confirm the price, list the documents and get going the same day." primary={{ label: 'Start on WhatsApp', href: wa }} />
        </div>
      </Container>
    </>
  )
}
