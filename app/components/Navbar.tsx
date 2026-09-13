'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, FileText, Receipt, Percent, Building2, ScrollText, Headset, Calculator, BookOpen, CalendarClock, ClipboardCheck } from 'lucide-react'
import { SITE } from '@/app/lib/site'
import { track } from '@/app/lib/analytics'
import { Logo } from './Logo'

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
      <div className="relative z-10 border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${SITE.name} home`}>
          <Logo size="sm" tagline />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          <div className="relative" onMouseEnter={() => setMega('services')} onMouseLeave={() => setMega(null)}>
            <button
              type="button"
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-navy-900 hover:bg-bg-alt"
              aria-expanded={mega === 'services'}
              onClick={() => setMega(mega === 'services' ? null : 'services')}
            >
              Services <ChevronDown className="h-4 w-4 text-muted" />
            </button>
            {mega === 'services' && (
              <div className="absolute left-1/2 top-full w-[600px] -translate-x-1/2 pt-2">
                <div className="grid grid-cols-2 gap-6 rounded-2xl border border-border bg-white p-6 shadow-[var(--shadow-lift)]">
                  <MegaGroup title="Returns" items={returns} />
                  <MegaGroup title="Business and compliance" items={business} />
                  <Link href="/pricing" className="col-span-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700 hover:bg-green-100">
                    See every price on one page →
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="relative" onMouseEnter={() => setMega('resources')} onMouseLeave={() => setMega(null)}>
            <button
              type="button"
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-navy-900 hover:bg-bg-alt"
              aria-expanded={mega === 'resources'}
              onClick={() => setMega(mega === 'resources' ? null : 'resources')}
            >
              Resources <ChevronDown className="h-4 w-4 text-muted" />
            </button>
            {mega === 'resources' && (
              <div className="absolute left-1/2 top-full w-[320px] -translate-x-1/2 pt-2">
                <div className="rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-lift)]">
                  <MegaGroup title="Free tools and reading" items={resources} />
                </div>
              </div>
            )}
          </div>
          <Link href="/pricing" className="rounded-lg px-3 py-2 text-sm font-semibold text-navy-900 hover:bg-bg-alt">Pricing</Link>
          <Link href="/experts" className="rounded-lg px-3 py-2 text-sm font-semibold text-navy-900 hover:bg-bg-alt">Experts</Link>
          <Link href="/about" className="rounded-lg px-3 py-2 text-sm font-semibold text-navy-900 hover:bg-bg-alt">About</Link>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a href={`tel:${SITE.phoneE164}`} onClick={() => track('call_click', { placement: 'nav' })} className="px-3 text-sm font-semibold text-navy-900 font-mono tabular">{SITE.phoneDisplay}</a>
          <Link href="/consult" className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700">
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
