import type { Metadata } from 'next'
import { Check, Video, FileText, Clock, IndianRupee } from 'lucide-react'
import { buildMetadata, breadcrumbJsonLd, graph, webPageJsonLd, ORG_ID } from '@/app/lib/seo'
import { BASE_URL, whatsappLink, SITE } from '@/app/lib/site'
import { CONSULTATIONS } from '@/app/lib/services'
import { formatINR } from '@/app/lib/format'
import { publishedExperts } from '@/app/lib/experts'
import JsonLd from '@/app/components/JsonLd'
import FaqJsonLd from '@/app/components/FaqJsonLd'
import CallbackForm from '@/app/components/CallbackForm'
import TrackedLink from '@/app/components/TrackedLink'
import { Container, Breadcrumbs, SectionHeading, FaqAccordion, Badge } from '@/app/components/ui'
import { ExpertCard } from '@/app/components/cards'

export const metadata: Metadata = buildMetadata({
  title: 'Book a Tax Consultation Online | 30-min Call from ₹499',
  description: 'Talk to a qualified tax professional (CMA/CA) on video or phone. 30-minute consultation ₹499, 60-minute ₹1,499, tax planning and startup structuring sessions. Written summary after every call, fee adjustable against services.',
  path: '/consult',
  keywords: ['tax consultation online', 'talk to tax expert', 'online ca consultation', 'tax advisor call', 'income tax consultation fees', 'gst consultation online'],
})

const FAQS = [
  { q: 'How do I book a consultation?', a: 'Pick a session below and tap Book on WhatsApp. We confirm a slot within working hours (Mon to Sat, 10 AM to 7 PM IST), share a payment link and a Google Meet or phone call link. Online slot booking is coming with the client portal.' },
  { q: 'What happens after the call?', a: 'You receive a written summary within one working day: what we discussed, the recommendation, and the next steps with prices if a service is needed.' },
  { q: 'Is the fee adjustable?', a: 'Yes. The consultation fee is deducted from any service you purchase within 30 days.' },
  { q: 'Can I reschedule?', a: 'Free up to 4 hours before the slot. Within 4 hours, one reschedule is allowed at no charge; a second one is treated as a new booking.' },
  { q: 'Who will I speak to?', a: 'A qualified professional from our panel matched to your topic. For most individual tax questions this is CMA Sahil. Audit and certification questions are routed to an empanelled Chartered Accountant.' },
  { q: 'Do you give advice on WhatsApp for free?', a: 'We answer quick factual questions on WhatsApp free. Anything that needs us to look at your numbers or documents is a consultation, so that you get a considered, written answer.' },
]

export default function ConsultPage() {
  const experts = publishedExperts()
  return (
    <>
      <JsonLd
        data={graph(
          webPageJsonLd({ path: '/consult', name: 'Book a tax consultation', description: metadata.description as string }),
          breadcrumbJsonLd([{ name: 'Consultation', path: '/consult' }], '/consult'),
          {
            '@type': 'Service',
            '@id': `${BASE_URL}/consult#service`,
            name: 'Tax consultation',
            serviceType: 'Tax advisory consultation',
            provider: { '@id': ORG_ID },
            areaServed: { '@type': 'Country', name: 'India' },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Consultation sessions',
              itemListElement: CONSULTATIONS.map((k) => ({ '@type': 'Offer', name: k.name, price: k.price, priceCurrency: 'INR', priceValidUntil: '2027-03-31' })),
            },
          }
        )}
      />
      <FaqJsonLd faqs={FAQS} />
      <Container className="py-10 lg:py-16">
        <Breadcrumbs crumbs={[{ name: 'Consultation', path: '/consult' }]} />
        <div className="mt-6 grid items-start gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div>
            <SectionHeading align="left" eyebrow="Consultation" title="Talk to a tax expert" emphasis="before you decide." desc="Regime choice, a notice you do not understand, selling property, starting a company. One call with a qualified professional, then a written summary you can act on." />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                { icon: Video, t: 'Video or phone, your choice' },
                { icon: FileText, t: 'Written summary within 1 working day' },
                { icon: IndianRupee, t: 'Fee adjusted against any service in 30 days' },
                { icon: Clock, t: 'Slots Mon to Sat, 10 AM to 7 PM IST' },
              ].map((f) => (
                <li key={f.t} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-navy-900">
                  <f.icon className="h-4 w-4 shrink-0 text-green-600" /> {f.t}
                </li>
              ))}
            </ul>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {CONSULTATIONS.map((k) => {
                const popular = 'popular' in k && k.popular
                const wa = whatsappLink(`Hi, I want to book a ${k.name} (${formatINR(k.price)}). Topic: `)
                return (
                  <article key={k.slug} className={`relative flex flex-col rounded-2xl border bg-card p-6 shadow-[var(--shadow-card)] ${popular ? 'border-green-600 ring-1 ring-green-600' : 'border-border'}`}>
                    {popular && <span className="absolute -top-3 left-5"><Badge tone="gold">Most booked</Badge></span>}
                    <h2 className="text-lg font-bold text-navy-900">{k.name}</h2>
                    <p className="text-xs text-muted">{k.duration} minutes</p>
                    <p className="mt-3 font-mono tabular"><span className="text-sm text-muted line-through">{formatINR(k.mrp)}</span> <span className="text-3xl font-bold text-navy-900">{formatINR(k.price)}</span> <span className="text-xs text-muted">+ GST</span></p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-text-2">{k.desc}</p>
                    <TrackedLink event="consult_click" props={{ session: k.slug, price: k.price }} href={wa} target="_blank" rel="noopener noreferrer" className="mt-5 rounded-lg bg-green-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-green-700">
                      Book on WhatsApp
                    </TrackedLink>
                  </article>
                )
              })}
            </div>

            <div className="mt-10 rounded-2xl border border-border bg-bg-alt p-6">
              <p className="text-sm font-bold text-navy-900">What to have ready</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {['Your question in one or two lines', 'Form 16, AIS or the notice PDF if relevant', 'Rough numbers: income, gains, turnover', 'For business queries: entity type and GSTIN status'].map((t) => (
                  <li key={t} className="flex gap-2 text-sm text-text-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" /> {t}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-6 lg:pt-16">
            <CallbackForm title="Prefer we call you first?" subtitle={`Free 5-minute call to confirm the right session. ${SITE.hours}.`} service="Consultation" options={{ label: 'Topic', values: ['ITR / regime choice', 'Notice received', 'Capital gains / property', 'GST / business', 'Startup structuring', 'NRI'] }} />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">Who you will speak to</p>
              <div className="mt-3 space-y-3">
                {experts.map((e) => (
                  <ExpertCard key={e.slug} expert={e} compact />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <FaqAccordion faqs={FAQS} title="Consultation questions" />
        </div>
      </Container>
    </>
  )
}
