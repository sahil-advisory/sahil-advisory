import type { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck, FileCheck2, Landmark, MessageCircle, ArrowRight } from 'lucide-react'
import { buildMetadata, breadcrumbJsonLd, graph, webPageJsonLd } from '@/app/lib/seo'
import { publishedExperts } from '@/app/lib/experts'
import { WHATSAPP_DEFAULT } from '@/app/lib/site'
import JsonLd from '@/app/components/JsonLd'
import Reveal from '@/app/components/Reveal'
import { Container, Breadcrumbs, SectionHeading, CtaBand } from '@/app/components/ui'
import { ExpertCard } from '@/app/components/cards'

export const metadata: Metadata = buildMetadata({
  title: 'Our Tax Experts | CMA-led Panel',
  description: 'Meet the qualified professionals who prepare and review every return: a Cost and Management Accountant, a senior tax and accounting consultant, and empanelled Chartered Accountants for audit work. Credentials, specialisations and languages listed for each.',
  path: '/experts',
  keywords: ['tax expert chandigarh', 'cma tax consultant', 'gst practitioner chandigarh', 'tax consultant panchkula'],
})

// Who signs what is a legal fact, not copy. See the table in docs/PROJECT.md.
const RIGHTS = [
  { icon: FileCheck2, title: 'Prepared and filed by our panel', items: ['Income tax returns, every ITR form', 'GST registration and returns', 'TDS statements and Form 16', 'Business registrations and MSME', 'Notice replies and rectifications'], tone: 'green' as const },
  { icon: Landmark, title: 'Signed by our CMA', items: ['Cost audit under section 148', 'CMA data and project reports for banks', 'Internal and stock audit', 'GST practitioner filings under section 48'], tone: 'navy' as const },
  { icon: ShieldCheck, title: 'Signed by an empanelled CA', items: ['Tax audit under section 44AB', 'Statutory audit under the Companies Act', 'Certificates reserved for Chartered Accountants'], tone: 'gold' as const },
]

export default function ExpertsPage() {
  const experts = publishedExperts()
  const years = experts.reduce((s, e) => s + e.years, 0)
  const languages = Array.from(new Set(experts.flatMap((e) => e.languages)))
  return (
    <>
      <JsonLd data={graph(webPageJsonLd({ path: '/experts', name: 'Our experts', description: metadata.description as string }), breadcrumbJsonLd([{ name: 'Experts', path: '/experts' }], '/experts'))} />

      <section className="bg-[radial-gradient(ellipse_at_top_left,_var(--green-50),_transparent_55%),linear-gradient(to_bottom,_#ffffff,_var(--bg-alt))]">
        <Container className="py-10 lg:py-16">
          <Breadcrumbs crumbs={[{ name: 'Experts', path: '/experts' }]} />
          <div className="mt-6 grid items-end gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <SectionHeading align="left" eyebrow="The panel" title="Real names." emphasis="Real credentials." desc="Every return, registration and notice reply is prepared and reviewed by a member of this panel. You see who is handling your filing in your portal and can message them directly." />
            <dl className="grid grid-cols-3 gap-3">
              {[
                { k: 'On the panel', v: String(experts.length) },
                { k: 'Combined years', v: `${years}+` },
                { k: 'Languages', v: String(languages.length) },
              ].map((s) => (
                <div key={s.k} className="rounded-2xl border border-border bg-white/80 p-4 backdrop-blur-sm">
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted">{s.k}</dt>
                  <dd className="mt-1 font-mono text-2xl font-bold tabular text-navy-900">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <Container className="py-12 lg:py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {experts.map((e, i) => (
            <Reveal key={e.slug} delay={i * 90} className="h-full">
              <ExpertCard expert={e} />
            </Reveal>
          ))}
          <Reveal delay={experts.length * 90} className="h-full">
            <div className="flex h-full flex-col justify-between rounded-3xl border-2 border-dashed border-border-strong bg-bg-alt/60 p-6">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-green-700">Empanelled Chartered Accountants</p>
                <h3 className="mt-2 text-lg font-bold text-navy-900">Audit-tier work, signed by a CA</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-2">Tax audit under 44AB, statutory audit and CA certificates are delivered through empanelled Chartered Accountants. Our panel prepares the working papers and schedules; the CA reviews and signs. You are told who is signing before the work starts.</p>
              </div>
              <Link href="/services/audit" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-green-700 hover:underline">Audit services <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </Reveal>
        </div>

        <section className="mt-16">
          <SectionHeading eyebrow="Who does what" title="The right professional signs each piece of work." desc="Cost and Management Accountants and Chartered Accountants can both prepare and file returns. Some reports are reserved by statute for one or the other. We name the professional on every filing so there is never any ambiguity." />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {RIGHTS.map((r, i) => (
              <Reveal key={r.title} delay={i * 80} className="h-full">
                <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${r.tone === 'green' ? 'bg-green-50 text-green-700' : r.tone === 'navy' ? 'bg-navy-900 text-white' : 'bg-gold-50 text-gold-600'}`}><r.icon className="h-5 w-5" aria-hidden /></span>
                  <h3 className="mt-4 text-base font-bold text-navy-900">{r.title}</h3>
                  <ul className="mt-3 space-y-2">
                    {r.items.map((it) => (
                      <li key={it} className="flex gap-2 text-sm text-text-2"><span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${r.tone === 'green' ? 'bg-green-600' : r.tone === 'navy' ? 'bg-navy-900' : 'bg-gold-600'}`} />{it}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-muted">CMAs are approved GST practitioners under section 48 of the CGST Act. Tax audit reports under section 44AB and statutory audits are reserved for Chartered Accountants; cost audit under section 148 is reserved for Cost Accountants.</p>
        </section>

        <section className="mt-16 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
          <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-green-700">Talk to the panel</p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy-900">Not sure who you need? Start on WhatsApp.</h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-2">Tell us what you are filing. We reply within working hours, say who will handle it, and quote a fixed price before any work begins.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={WHATSAPP_DEFAULT} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:opacity-90"><MessageCircle className="h-4 w-4" /> WhatsApp us</a>
              <Link href="/consult" className="inline-flex items-center gap-2 rounded-lg border border-border-strong bg-white px-5 py-3 text-sm font-semibold text-navy-900 hover:bg-bg-alt">Book a consultation</Link>
            </div>
          </div>
        </section>

        <div className="mt-16"><CtaBand title="Are you a CA or CS who wants to join the panel?" desc="We are adding Chartered Accountants for audit-tier work and Company Secretaries for ROC compliance. Write to us with your membership details." primary={{ label: 'Contact us', href: '/contact' }} secondary={{ label: 'See services', href: '/services' }} /></div>
      </Container>
    </>
  )
}
