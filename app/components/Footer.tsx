import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, MessageCircle, Lock } from 'lucide-react'
import { SITE, FOOTER_DISCLAIMER, WHATSAPP_DEFAULT } from '@/app/lib/site'
import { LIVE_CALCULATORS } from '@/app/lib/calculators'
import TrackedLink from './TrackedLink'
import { LogoLockup } from './Logo'

const services = [
  { label: 'ITR Filing', href: '/services/itr' },
  { label: 'ITR for Salaried', href: '/services/itr/itr-salaried' },
  { label: 'ITR for F&O Traders', href: '/services/itr/itr-fno-trader' },
  { label: 'ITR for NRIs', href: '/services/itr/itr-nri' },
  { label: 'GST Registration', href: '/services/gst/gst-registration' },
  { label: 'GST Return Filing', href: '/services/gst' },
  { label: 'TDS Return Filing', href: '/services/tds' },
  { label: 'Company Registration', href: '/services/registrations/pvt-ltd-incorporation' },
  { label: 'CMA Report for Bank Loan', href: '/services/registrations/cma-project-report' },
  { label: 'Tax Audit (44AB)', href: '/services/audit/tax-audit-44ab' },
  { label: 'Cost Audit (Section 148)', href: '/services/audit/cost-audit-148' },
  { label: 'Tax Notice Reply', href: '/services/notices' },
]

const resources = [
  { label: 'All calculators', href: '/calculators' },
  { label: 'Tax guides', href: '/guides' },
  { label: 'Due dates calendar', href: '/due-dates' },
  { label: 'Income tax sections', href: '/sections' },
  { label: 'Tax forms explained', href: '/forms' },
  { label: 'ITR filing last date', href: '/due-dates/itr-filing-last-date' },
  { label: 'GSTR-3B due date', href: '/due-dates/gstr-3b-due-date' },
  { label: 'Advance tax due dates', href: '/due-dates/advance-tax-due-date' },
]

const company = [
  { label: 'About', href: '/about' },
  { label: 'Our experts', href: '/experts' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Book a consultation', href: '/consult' },
  { label: 'Contact', href: '/contact' },
  { label: 'Security and privacy', href: '/trust' },
]

const legal = [
  { label: 'Privacy policy', href: '/privacy-policy' },
  { label: 'Terms of service', href: '/terms' },
  { label: 'Refund policy', href: '/refund-policy' },
  { label: 'Cancellation policy', href: '/cancellation-policy' },
  { label: 'Data deletion', href: '/data-deletion' },
  { label: 'Disclaimer', href: '/disclaimer' },
]

export default function Footer() {
  return (
    <footer className="mt-24 bg-navy-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)]">
          <div>
            <LogoLockup height={64} onDark tagline />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">{SITE.shortDescription}</p>
            <div className="mt-5 flex items-center gap-2 text-xs text-white/60">
              <Lock className="h-3.5 w-3.5 text-green-500" />
              Documents encrypted at rest. Visible only to your assigned expert.
            </div>
            <div className="mt-5 flex gap-2">
              {SITE.social.instagram && (
                <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold hover:bg-white/20">Instagram</a>
              )}
              {SITE.social.facebook && (
                <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold hover:bg-white/20">Facebook</a>
              )}
            </div>
          </div>

          <FooterCol title="Services" links={services} />
          <FooterCol title="Calculators" links={[...LIVE_CALCULATORS.map((c) => ({ label: c.name, href: `/calculators/${c.slug}` })), ...resources.slice(0, 3)]} />
          <FooterCol title="Company" links={[...company, ...resources.slice(3)]} />

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-white/80">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                <TrackedLink event="call_click" props={{ placement: 'footer' }} href={`tel:${SITE.phoneE164}`} className="font-mono hover:text-white">{SITE.phoneDisplay}</TrackedLink>
              </li>
              <li className="flex gap-2.5">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                <TrackedLink event="whatsapp_click" props={{ placement: 'footer' }} href={WHATSAPP_DEFAULT} target="_blank" rel="noopener noreferrer" className="hover:text-white">WhatsApp us</TrackedLink>
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                <a href={`mailto:${SITE.email}`} className="hover:text-white break-all">{SITE.email}</a>
              </li>
              <li className="flex gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                <span>{SITE.hours}</span>
              </li>
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                <address className="not-italic">
                  {SITE.address.street}, {SITE.address.locality} {SITE.address.postalCode}
                  <br />
                  Also at {SITE.address.secondOffice}
                </address>
              </li>
              {SITE.gstin && <li className="font-mono text-xs text-white/50">GSTIN: {SITE.gstin}</li>}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="max-w-4xl text-xs leading-relaxed text-white/50">{FOOTER_DISCLAIMER}</p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/60">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white">{l.label}</Link>
                </li>
              ))}
            </ul>
            <p className="text-xs text-white/40">© {new Date().getFullYear()} {SITE.legalName}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-white/80">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-white/65 hover:text-white">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
