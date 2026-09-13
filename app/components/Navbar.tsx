'use client'

import { useEffect, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, FileText, Receipt, Percent, Building2, ScrollText, Headset, Calculator, BookOpen, CalendarClock, ClipboardCheck } from 'lucide-react'
import { SITE, WHATSAPP_DEFAULT } from '@/app/lib/site'
import { track } from '@/app/lib/analytics'
import { Logo } from './Logo'
import { WhatsAppIcon } from './WhatsAppFloat'

// Which top-level item owns the current path, for the active underline.
const SECTION_PREFIXES: Record<'services' | 'resources', string[]> = {
  services: ['/services', '/consult'],
  resources: ['/calculators', '/guides', '/due-dates', '/sections', '/forms'],
}

const subscribeScroll = (cb: () => void) => {
  window.addEventListener('scroll', cb, { passive: true })
  return () => window.removeEventListener('scroll', cb)
}
const isScrolled = () => window.scrollY > 8

function NavItem({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link href={href} aria-current={active ? 'page' : undefined} className={`relative rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:bg-bg-alt ${active ? 'text-green-700' : 'text-navy-900'}`}>
      {label}
      <span aria-hidden className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-green-600 transition-transform duration-200 ${active ? 'scale-x-100' : 'scale-x-0'}`} />
    </Link>
  )
}

function MegaButton({ label, open, active, onClick }: { label: string; open: boolean; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      className={`relative flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:bg-bg-alt ${active || open ? 'text-green-700' : 'text-navy-900'}`}
      aria-expanded={open}
      onClick={onClick}
    >
      {label}
      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180 text-green-600' : 'text-muted'}`} />
      <span aria-hidden className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-green-600 transition-transform duration-200 ${active ? 'scale-x-100' : 'scale-x-0'}`} />
    </button>
  )
}

// Mega panel wrapper. Stays mounted and animates in and out so the hover
// hand-off from the button to the panel does not flicker.
function MegaPanel({ open, width, children }: { open: boolean; width: string; children: ReactNode }) {
  return (
    <div
      inert={!open}
      aria-hidden={!open}
      className={`absolute left-1/2 top-full -translate-x-1/2 pt-2 transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none ${width} ${open ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'}`}
    >
      {children}
    </div>
  )
}

const returns = [
  { label: 'ITR Filing', desc: 'Salaried, traders, freelancers, NRI', href: '/services/itr', icon: FileText },
  { label: 'GST Returns', desc: 'Registration, monthly, QRMP, annual', href: '/services/gst', icon: Receipt },
  { label: 'TDS Returns', desc: '24Q, 26Q, 26QB, corrections', href: '/services/tds', icon: Percent },
]
const business = [
  { label: 'Registrations', desc: 'Pvt Ltd, LLP, MSME, IEC, DSC', href: '/services/registrations', icon: Building2 },
  { label: 'Audit', desc: '44AB tax audit, statutory, cost, internal', href: '/services/audit', icon: ClipboardCheck },
  { label: 'Tax Notices', desc: 'Free triage, fixed-fee replies', href: '/services/notices', icon: ScrollText },
  { label: 'Consultation', desc: '30-min calls from ₹499', href: '/consult', icon: Headset },
]
const resources = [
  { label: 'Calculators', desc: 'Income tax, HRA, capital gains, GST', href: '/calculators', icon: Calculator },
  { label: 'Guides', desc: 'Plain-English tax guides', href: '/guides', icon: BookOpen },
  { label: 'Due Dates', desc: 'Live compliance calendar', href: '/due-dates', icon: CalendarClock },
  { label: 'Sections and Forms', desc: '80C, 87A, Form 16, 26AS, ITR forms', href: '/sections', icon: ScrollText },
]

function MegaGroup({ title, items, onNav }: { title: string; items: typeof returns; onNav?: () => void }) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">{title}</p>
      <ul className="mt-3 space-y-1">
        {items.map((it) => (
          <li key={it.href}>
            <Link href={it.href} onClick={onNav} className="group flex gap-3 rounded-lg p-2.5 hover:bg-bg-alt">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-green-50 text-green-700">
                <it.icon className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-navy-900 group-hover:text-green-700">{it.label}</span>
                <span className="block text-xs text-muted">{it.desc}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [mega, setMega] = useState<'services' | 'resources' | null>(null)
  const pathname = usePathname()
  const scrolled = useSyncExternalStore(subscribeScroll, isScrolled, () => false)
  const section = (Object.keys(SECTION_PREFIXES) as Array<keyof typeof SECTION_PREFIXES>).find((k) => SECTION_PREFIXES[k].some((p) => pathname.startsWith(p)))

  // Close both menus when the route changes. Adjusting state during render on
  // a changed value is React's recommended alternative to a pathname effect.
  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
    setMega(null)
  }

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  // The blur sits on the bar, not the header: backdrop-filter turns its
  // element into the containing block for fixed descendants, which would
  // pin the mobile drawer to the 72px bar instead of the viewport.
  return (
    <header className="sticky top-0 z-50">
      <div className={`relative z-10 border-b bg-white/95 backdrop-blur transition-[box-shadow,border-color] duration-300 supports-[backdrop-filter]:bg-white/85 ${scrolled ? 'border-transparent shadow-[var(--shadow-card)]' : 'border-border'}`}>
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${SITE.name} home`}>
          <Logo size="sm" tagline />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          <div className="relative" onMouseEnter={() => setMega('services')} onMouseLeave={() => setMega(null)}>
            <MegaButton label="Services" open={mega === 'services'} active={section === 'services'} onClick={() => setMega(mega === 'services' ? null : 'services')} />
            <MegaPanel open={mega === 'services'} width="w-[640px]">
              <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-[var(--shadow-lift)]">
                <div className="grid grid-cols-2 gap-6 p-6">
                  <MegaGroup title="Returns" items={returns} />
                  <MegaGroup title="Business and compliance" items={business} />
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-border bg-bg-alt px-6 py-3.5">
                  <Link href="/pricing" className="text-sm font-semibold text-green-700 hover:underline">See every price on one page →</Link>
                  <span className="text-xs text-muted">Fixed fees. Draft approved by you before filing.</span>
                </div>
              </div>
            </MegaPanel>
          </div>
          <div className="relative" onMouseEnter={() => setMega('resources')} onMouseLeave={() => setMega(null)}>
            <MegaButton label="Resources" open={mega === 'resources'} active={section === 'resources'} onClick={() => setMega(mega === 'resources' ? null : 'resources')} />
            <MegaPanel open={mega === 'resources'} width="w-[340px]">
              <div className="rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-lift)]">
                <MegaGroup title="Free tools and reading" items={resources} />
              </div>
            </MegaPanel>
          </div>
          <NavItem href="/pricing" label="Pricing" active={pathname.startsWith('/pricing')} />
          <NavItem href="/experts" label="Experts" active={pathname.startsWith('/experts')} />
          <NavItem href="/about" label="About" active={pathname.startsWith('/about')} />
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={WHATSAPP_DEFAULT}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('whatsapp_click', { placement: 'nav' })}
            className="flex items-center gap-2 rounded-lg border border-border px-3.5 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:border-[#25D366] hover:bg-green-50"
          >
            <WhatsAppIcon className="h-4.5 w-4.5 text-[#25D366]" />
            WhatsApp
          </a>
          <Link href="/consult" className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700">
            Talk to an expert
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="relative h-10 w-10 rounded-lg text-navy-900 transition-colors hover:bg-bg-alt lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {/* Both icons stay mounted and cross-fade with a quarter turn. */}
          <Menu className={`absolute inset-0 m-auto h-6 w-6 transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${open ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} />
          <X className={`absolute inset-0 m-auto h-6 w-6 transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${open ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`} />
        </button>
      </div>
      </div>

      {/* Mobile drawer. Stays mounted so the close transition can play;
          `inert` keeps its links out of the tab order while hidden. */}
      <div
        id="mobile-menu"
        inert={!open}
        aria-hidden={!open}
        className={`fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto overscroll-contain bg-white transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none lg:hidden ${open ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'}`}
      >
        {/* Keyed on `open` so the stagger replays each time the drawer opens. */}
        <div key={String(open)} className="space-y-6 px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6">
            {[
              { title: 'Returns', items: returns },
              { title: 'Business and compliance', items: business },
              { title: 'Resources', items: resources },
            ].map((g, i) => (
              <div key={g.title} className="drawer-item" style={{ '--delay': `${60 + i * 70}ms` } as CSSProperties}>
                <MegaGroup title={g.title} items={g.items} onNav={() => setOpen(false)} />
              </div>
            ))}
            <div className="drawer-item grid grid-cols-2 gap-2 border-t border-border pt-5 text-sm font-semibold text-navy-900" style={{ '--delay': '270ms' } as CSSProperties}>
              <Link href="/pricing" className="rounded-lg bg-bg-alt px-3 py-2.5 transition-colors active:bg-green-50">Pricing</Link>
              <Link href="/experts" className="rounded-lg bg-bg-alt px-3 py-2.5 transition-colors active:bg-green-50">Experts</Link>
              <Link href="/about" className="rounded-lg bg-bg-alt px-3 py-2.5 transition-colors active:bg-green-50">About</Link>
              <Link href="/contact" className="rounded-lg bg-bg-alt px-3 py-2.5 transition-colors active:bg-green-50">Contact</Link>
            </div>
            <div className="drawer-item space-y-3" style={{ '--delay': '340ms' } as CSSProperties}>
              <Link href="/consult" className="block rounded-lg bg-green-600 px-4 py-3 text-center text-sm font-semibold text-white transition-colors active:bg-green-700">
                Talk to an expert
              </Link>
              <a href={`tel:${SITE.phoneE164}`} onClick={() => track('call_click', { placement: 'nav_mobile' })} className="block text-center text-sm font-semibold text-navy-900 font-mono">{SITE.phoneDisplay}</a>
            </div>
        </div>
      </div>
    </header>
  )
}
