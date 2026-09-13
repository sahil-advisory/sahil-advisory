import type { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck, Clock, Users, IndianRupee, MessageCircle, FileCheck2 } from 'lucide-react'
import { buildMetadata, graph, webPageJsonLd } from '@/app/lib/seo'
import { SITE } from '@/app/lib/site'
import { SERVICES } from '@/app/lib/services'
import { CALCULATORS } from '@/app/lib/calculators'
import { GUIDES } from '@/app/lib/guides'
import { publishedExperts } from '@/app/lib/experts'
import { TESTIMONIALS } from '@/app/lib/testimonials'
import { upcomingDeadlines } from '@/app/lib/deadline-items'
import JsonLd from '@/app/components/JsonLd'
import FaqJsonLd from '@/app/components/FaqJsonLd'
import HeroStatusCard from '@/app/components/HeroStatusCard'
import DeadlineWidget from '@/app/components/DeadlineWidget'
import CallbackForm from '@/app/components/CallbackForm'
import Reveal from '@/app/components/Reveal'
import TaxShowcase from '@/app/components/TaxShowcase'
import { Button, Container, SectionHeading, FaqAccordion, CtaBand, StatsRow, Eyebrow, ProcessSteps } from '@/app/components/ui'
import { CategoryCard, ExpertCard, TestimonialCard, CalculatorCard, GuideCard, PlanCard } from '@/app/components/cards'

// Deadline countdown data is computed on the server; refresh hourly.
export const revalidate = 3600

export const metadata: Metadata = buildMetadata({
  title: `${SITE.name} | Expert ITR, GST and TDS Filing at Fixed Prices`,
  description: 'Fixed-price ITR, GST, TDS, registrations and notice replies for Indian individuals and small businesses. Verified CMA/CA experts, draft approval before filing, WhatsApp updates.',
  path: '/',
})

const HOME_FAQS = [
  { q: 'How much does ITR filing cost?', a: 'Salaried ITR filing starts at ₹499 plus GST. Capital gains returns from ₹1,999, F&O and freelancer returns from ₹2,499, NRI returns from ₹4,999. Every price is on the pricing page; there are no hidden charges.' },
  { q: 'Who actually prepares my return?', a: 'A qualified professional from our panel, a Cost and Management Accountant or a Chartered Accountant, prepares and reviews it. You see the expert\'s name on your order and can message them directly.' },
  { q: 'Is it safe to share my PAN and Form 16?', a: 'Documents are encrypted at rest in private storage, visible only to your assigned expert and never shared with third parties. Read the security page for details.' },
  { q: 'Do you file GST returns every month?', a: 'Yes. GSTR-1 and GSTR-3B monthly filing costs ₹999 per month with ITC reconciliation, or ₹899 per month on annual prepay. Quarterly QRMP and composition plans are also available.' },
  { q: 'Can you help with an income tax notice?', a: 'Upload the notice and we assess it free within four working hours. We then quote a fixed fee for the reply. Intimation and defective return replies start at ₹999.' },
  { q: 'Where are you located?', a: 'Chandigarh and Panchkula, serving clients across India online. Everything from document upload to approval happens on the dashboard or WhatsApp.' },
]

const CATEGORY_CARDS = [
  { id: 'itr', name: 'Income tax returns', sub: 'For salaried, investors and business', items: ['Salaried, capital gains and F&O traders', 'Freelancers under 44ADA and proprietors', 'NRI returns with DTAA relief', 'Belated, revised and updated returns'], cta: 'View ITR plans' },
  { id: 'gst', name: 'GST', sub: 'For registration and monthly filing', items: ['Registration in 3 to 7 days', 'GSTR-1 and 3B monthly or QRMP', 'Composition CMP-08 and GSTR-4', 'Annual GSTR-9, 9C and ITC reconciliation'], cta: 'View GST plans' },
  { id: 'tds', name: 'TDS', sub: 'For employers and property buyers', items: ['Monthly deposit and challan support', 'Quarterly 24Q, 26Q and 27Q returns', 'Form 26QB on property purchase', 'TRACES corrections and Form 16'], cta: 'View TDS plans' },
  { id: 'registrations', name: 'Business registrations', sub: 'For starting or structuring entities', items: ['Private Limited, LLP, OPC, partnership', 'MSME Udyam, IEC, DSC, Startup India', 'TAN, PAN and professional tax', 'CMA data and project reports for loans'], cta: 'View registrations' },
  { id: 'audit', name: 'Audit and assurance', sub: 'Signed by the right professional', items: ['Tax audit under 44AB, signed by a CA', 'Statutory audit under the Companies Act', 'Cost audit under section 148, signed by our CMA', 'Internal and stock audit'], cta: 'View audit services' },
  { id: 'notices', name: 'Tax notices', sub: 'For replies, assessments and appeals', items: ['143(1) intimation and 139(9) defective', '142(1), 143(2) scrutiny submissions', '148 / 148A reassessment', 'GST ASMT-10, DRC-01 and TDS defaults'], cta: 'Resolve a notice' },
] as const

export default function HomePage() {
  const featured = ['itr-salaried', 'itr-fno-trader', 'gst-monthly', 'tds-quarterly', 'pvt-ltd-incorporation', 'cma-project-report']
    .map((s) => SERVICES.find((x) => x.slug === s)!)
  const deadlines = upcomingDeadlines(4)
  const experts = publishedExperts()
  const guides = GUIDES.slice(0, 3)
  const calcs = CALCULATORS.slice(0, 8)

  return (
    <>
      <JsonLd data={graph(webPageJsonLd({ path: '/', name: metadata.title as string, description: metadata.description as string }))} />
      <FaqJsonLd faqs={HOME_FAQS} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top_left,_var(--green-50),_transparent_55%),linear-gradient(to_bottom,_#ffffff,_var(--bg-alt))]">
        <Container className="grid items-center gap-12 py-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:py-24">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              <ShieldCheck className="h-3.5 w-3.5" /> CMA-led panel · Chandigarh and Panchkula · Serving all of India
            </div>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-navy-900 sm:text-5xl lg:text-6xl">
              Tax filing and compliance, handled by experts.
              <span className="block text-green-600">At prices you can see.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-text-2">
              ITR, GST, TDS, business registrations and notices, prepared by a qualified professional, approved by you before filing, and tracked on WhatsApp. No surprises at checkout.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/services/itr" size="lg" icon>File my ITR</Button>
              <Button href="/consult" size="lg" variant="secondary">Talk to an expert</Button>
            </div>
            <dl className="mt-10 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { icon: ShieldCheck, k: 'Reviewed before filing', v: 'By a CMA or CA' },
                { icon: Clock, k: '1 to 3 business days', v: 'Salaried returns next day' },
                { icon: IndianRupee, k: 'From ₹499', v: 'All prices published' },
              ].map((c) => (
                <div key={c.k} className="flex gap-2.5">
                  <c.icon className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                  <div>
                    <dt className="text-sm font-bold text-navy-900">{c.k}</dt>
                    <dd className="text-xs text-muted">{c.v}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
          <div className="space-y-8 lg:pl-6">
            <HeroStatusCard />
            <div className="pt-4">
              <DeadlineWidget items={deadlines} title="Upcoming deadlines" />
            </div>
          </div>
        </Container>
      </section>

      {/* What do you need help with */}
      <section className="py-16 lg:py-24">
        <Container>
          <SectionHeading eyebrow="Services" title="What do you need help with?" desc="Filing, registrations, audit and notices, each with a fixed price, a named professional and a tracked timeline." />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {CATEGORY_CARDS.map((c, i) => (
              <Reveal key={c.id} delay={i * 80} className="h-full">
                <CategoryCard {...c} />
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-text-2">
            Want advice before you commit to anything?{' '}
            <Link href="/consult" className="font-semibold text-green-700 hover:underline">Book a 30-minute consultation for ₹499</Link>, adjusted against any service you buy within 30 days.
          </p>
        </Container>
      </section>

      {/* Pricing preview */}
      <section className="bg-bg-alt py-16 lg:py-24">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading align="left" eyebrow="Transparent pricing" title="Every price, published." emphasis="Nothing hidden." desc="Prices exclude 18% GST and include everything else. A GST invoice is issued for every order." />
            <Button href="/pricing" variant="secondary" icon>See all prices</Button>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((s) => (
              <PlanCard key={s.slug} service={s} compact hideBadge />
            ))}
          </div>
        </Container>
      </section>

      {/* Why us: dark band */}
      <section className="bg-navy-900 py-16 text-white lg:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow tone="light">Why people switch to us</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              You know exactly who is filing your return, <span className="text-green-500">and what it costs.</span>
            </h2>
            <ul className="mt-8 space-y-5">
              {[
                { icon: Users, t: 'A named professional, not a queue', d: 'Your order shows the CMA or CA handling it. Message them directly; no ticket numbers.' },
                { icon: FileCheck2, t: 'Draft approval before we file', d: 'You see the computation, the refund or tax payable, and the regime chosen. Nothing is filed until you say so.' },
                { icon: MessageCircle, t: 'WhatsApp updates at every step', d: 'Documents received, draft ready, filed, verified. Reply to the message to reach your expert.' },
                { icon: IndianRupee, t: 'Fixed prices, published in advance', d: 'Notices and audits are the only things we quote after a look. Everything else is on the pricing page.' },
              ].map((f) => (
                <li key={f.t} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-green-500"><f.icon className="h-5 w-5" /></span>
                  <div>
                    <p className="font-bold">{f.t}</p>
                    <p className="mt-1 text-sm text-white/65">{f.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/60">Your experts</p>
            {experts.map((e) => (
              <ExpertCard key={e.slug} expert={e} />
            ))}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/70">
              Audit-tier work (tax audit under 44AB, statutory audit, certifications) is delivered by empanelled Chartered Accountants. <Link href="/experts" className="font-semibold text-green-500 hover:underline">Meet the panel</Link>
            </div>
            <StatsRow light stats={[
              { value: `${SITE.returnsFiled}+`, label: 'Returns filed' },
              { value: `${SITE.yearsInPractice}+`, label: 'Years in practice' },
              { value: `${SITE.googleRating.toFixed(1)}`, label: 'Google rating' },
              { value: '100%', label: 'On-time filing' },
            ]} />
          </div>
        </Container>
      </section>

      {/* Calculators */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading align="left" eyebrow="Free tools" title="Calculators updated for" emphasis={`FY ${SITE.currentFY}`} desc="Estimate your tax, HRA exemption, capital gains, TDS and advance tax instalments before you talk to anyone." />
            <Button href="/calculators" variant="secondary" icon>All calculators</Button>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {calcs.map((c) => (
              <CalculatorCard key={c.slug} calc={c} />
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="bg-bg-alt py-16 lg:py-24">
        <Container>
          <ProcessSteps
            eyebrow="How it works"
            title="Three steps. One to three business days."
            steps={[
              { title: 'Pick a plan or ask for a callback', desc: 'Use the plan finder on any service page. Unsure? Request a callback and we recommend one on the phone.', time: 'Under 2 minutes' },
              { title: 'Share documents securely', desc: 'Upload Form 16, AIS, broker statements or GST data on the dashboard or WhatsApp. We tell you exactly what is missing.', time: '5 to 10 minutes' },
              { title: 'Approve the draft, we file', desc: 'Your expert shares the computation. You approve, we file and send the acknowledgement. Reminders next year.', time: '1 to 3 business days' },
            ]}
          />
        </Container>
      </section>

      <TaxShowcase />

      {/* Guides */}
      {guides.length > 0 && (
        <section className="bg-bg-alt py-16 lg:py-24">
          <Container>
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
              <SectionHeading align="left" eyebrow="Guides" title="Plain-English tax guides," emphasis="reviewed by a professional" desc="Worked examples, current-year numbers and the exact steps. Updated whenever the law or a deadline changes." />
              <Button href="/guides" variant="secondary" icon>All guides</Button>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {guides.map((g) => (
                <GuideCard key={g.slug} guide={g} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Testimonials + callback */}
      <section className="py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div>
            <SectionHeading align="left" eyebrow="Clients" title="What clients say" desc={`Rated ${SITE.googleRating.toFixed(1)} on Google. Ask us for references in your line of work.`} />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <TestimonialCard key={t.name} t={t} />
              ))}
            </div>
          </div>
          <div className="lg:pt-16">
            <CallbackForm title="Not sure which plan? Get a callback." subtitle="A tax expert calls within 2 working hours, Mon to Sat." />
          </div>
        </Container>
      </section>

      <section className="pb-16 lg:pb-24">
        <Container>
          <FaqAccordion faqs={HOME_FAQS} />
          <div className="mt-16">
            <CtaBand />
          </div>
        </Container>
      </section>
    </>
  )
}
