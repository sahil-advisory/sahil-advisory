import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowRight, Check, ChevronDown, ClipboardList, UploadCloud, BadgeCheck, Clock } from 'lucide-react'
import { formatINR } from '@/app/lib/format'

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
}

type ButtonProps = {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'navy' | 'white'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  external?: boolean
  icon?: boolean
}

const variantCls: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-green-600 text-white hover:bg-green-700 shadow-sm',
  secondary: 'bg-white text-navy-900 border border-border-strong hover:border-navy-700 hover:bg-bg-alt',
  ghost: 'text-navy-900 hover:bg-navy-100/60',
  navy: 'bg-navy-900 text-white hover:bg-navy-800',
  white: 'bg-white text-navy-900 hover:bg-green-50',
}
const sizeCls = {
  sm: 'px-3.5 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3.5 text-base',
}

export function Button({ href, children, variant = 'primary', size = 'md', className = '', external, icon }: ButtonProps) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-150 whitespace-nowrap ${variantCls[variant]} ${sizeCls[size]} ${className}`
  const inner = (
    <>
      {children}
      {icon && <ArrowRight className="h-4 w-4" aria-hidden />}
    </>
  )
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    )
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  )
}

export function Eyebrow({ children, tone = 'green' }: { children: ReactNode; tone?: 'green' | 'muted' | 'light' }) {
  const c = tone === 'green' ? 'text-green-700' : tone === 'light' ? 'text-green-500' : 'text-muted'
  return <span className={`text-xs font-bold uppercase tracking-[0.14em] ${c}`}>{children}</span>
}

export function SectionHeading({
  eyebrow,
  title,
  emphasis,
  desc,
  align = 'center',
  light,
}: {
  eyebrow?: string
  title: string
  emphasis?: string
  desc?: string
  align?: 'center' | 'left'
  light?: boolean
}) {
  return (
    <div className={`${align === 'center' ? 'mx-auto text-center' : 'text-left'} max-w-2xl`}>
      {eyebrow && <Eyebrow tone={light ? 'light' : 'green'}>{eyebrow}</Eyebrow>}
      <h2 className={`mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.1] ${light ? 'text-white' : 'text-navy-900'}`}>
        {title} {emphasis && <span className="text-green-600">{emphasis}</span>}
      </h2>
      {desc && <p className={`mt-4 text-base sm:text-lg leading-relaxed ${light ? 'text-white/70' : 'text-text-2'}`}>{desc}</p>}
    </div>
  )
}

export function Badge({ children, tone = 'green' }: { children: ReactNode; tone?: 'green' | 'gold' | 'red' | 'navy' | 'muted' }) {
  const c = {
    green: 'bg-green-50 text-green-700 border-green-100',
    gold: 'bg-gold-50 text-gold-600 border-amber-200',
    red: 'bg-red-50 text-red-600 border-red-100',
    navy: 'bg-navy-100 text-navy-900 border-navy-100',
    muted: 'bg-bg-alt text-text-2 border-border',
  }[tone]
  return <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider ${c}`}>{children}</span>
}

export function PriceTag({ price, mrp, unit, size = 'md', quote, from, note }: { price: number | null; mrp?: number; unit?: string; size?: 'md' | 'lg'; quote?: string; from?: boolean; note?: string }) {
  if (price === null) {
    return (
      <div className="font-mono tabular">
        <span className={`${size === 'lg' ? 'text-2xl' : 'text-lg'} font-bold text-navy-900`}>{quote ?? 'Quoted after free triage'}</span>
        {mrp ? <span className="ml-2 text-sm text-muted">from {formatINR(mrp)}</span> : null}
      </div>
    )
  }
  return (
    <div>
      <div className="flex items-baseline gap-2 font-mono tabular">
        {mrp && mrp > price ? <span className="text-sm text-muted line-through">{formatINR(mrp)}</span> : null}
        {from && price > 0 && <span className="text-sm font-semibold text-text-2">from</span>}
        <span className={`${size === 'lg' ? 'text-3xl' : 'text-2xl'} font-bold text-navy-900`}>{price === 0 ? 'Free' : formatINR(price)}</span>
        {unit ? <span className="text-sm text-text-2">{unit}</span> : null}
        {price > 0 && <span className="text-xs text-muted">+ 18% GST</span>}
      </div>
      {note && <p className="mt-1 text-xs text-muted">{note}</p>}
    </div>
  )
}

export function CheckList({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-2.5 ${className}`}>
      {items.map((it) => (
        <li key={it} className="flex gap-2.5 text-sm text-text-2 leading-snug">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" aria-hidden />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

// Server-rendered accordion using <details>. FAQ JSON-LD is emitted separately
// by <FaqJsonLd /> (client) to avoid the duplicate-FAQPage bug.
export function FaqAccordion({ faqs, title = 'Frequently asked questions' }: { faqs: { q: string; a: string }[]; title?: string }) {
  if (!faqs.length) return null
  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl sm:text-3xl font-extrabold tracking-tight text-navy-900 text-center">
        {title}
      </h2>
      <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
        {faqs.map((f, i) => (
          <details key={f.q} className="faq group px-5 sm:px-6" open={i === 0}>
            <summary className="flex items-center justify-between gap-4 py-4 text-left text-base font-semibold text-navy-900">
              <span>{f.q}</span>
              <ChevronDown className="faq-chevron h-5 w-5 shrink-0 text-muted transition-transform" aria-hidden />
            </summary>
            <p className="pb-5 text-sm sm:text-base leading-relaxed text-text-2">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

export function Breadcrumbs({ crumbs }: { crumbs: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs sm:text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="hover:text-navy-900">Home</Link>
        </li>
        {crumbs.map((c, i) => (
          <li key={c.path} className="flex items-center gap-1.5">
            <span aria-hidden>/</span>
            {i === crumbs.length - 1 ? (
              <span className="text-text-2" aria-current="page">{c.name}</span>
            ) : (
              <Link href={c.path} className="hover:text-navy-900">{c.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function StatsRow({ stats, light }: { stats: { value: string; label: string }[]; light?: boolean }) {
  return (
    <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label}>
          <dt className={`text-xs font-semibold uppercase tracking-wider ${light ? 'text-white/60' : 'text-muted'}`}>{s.label}</dt>
          <dd className={`mt-1 font-mono tabular text-3xl font-bold ${light ? 'text-white' : 'text-navy-900'}`}>{s.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export function TrustStrip({ items }: { items: string[] }) {
  return (
    <div className="bg-navy-900">
      <Container>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-3.5 text-sm font-medium text-white/85">
          {items.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" aria-hidden />
              {t}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  )
}

// Three steps as a connected sequence: numbered nodes on a track, an icon per
// step, and the time as a pill. Reads as "this, then this, then this" rather
// than three unrelated cards. Icons are positional (pick, upload, approve)
// because every category's steps follow that shape.
const STEP_ICONS = [ClipboardList, UploadCloud, BadgeCheck]

export function ProcessSteps({ steps, title = 'How it works', desc, eyebrow = 'Simple process' }: { steps: { title: string; desc: string; time: string }[]; title?: string; desc?: string; eyebrow?: string }) {
  return (
    <section>
      <SectionHeading eyebrow={eyebrow} title={title} desc={desc} />
      <ol className="relative mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
        {/* Track behind the nodes on desktop */}
        <div aria-hidden className="absolute left-[16.66%] right-[16.66%] top-7 hidden h-0.5 bg-gradient-to-r from-green-100 via-green-500/60 to-green-100 md:block" />
        {steps.map((s, i) => {
          const Icon = STEP_ICONS[i] ?? Check
          const last = i === steps.length - 1
          return (
            <li key={s.title} className="relative flex md:flex-col md:items-center md:text-center">
              {/* Node */}
              <div className="relative z-10 mr-4 flex shrink-0 flex-col items-center md:mr-0">
                <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ring-4 ring-white shadow-[var(--shadow-card)] ${last ? 'bg-green-600 text-white' : 'bg-navy-900 text-white'}`}>
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <span className="mt-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-muted">Step {i + 1}</span>
                {/* Vertical connector on mobile */}
                {!last && <span aria-hidden className="mt-2 h-full w-0.5 flex-1 bg-green-100 md:hidden" />}
              </div>
              {/* Card */}
              <div className="flex-1 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] md:mt-4 md:w-full">
                <h3 className="text-lg font-bold text-navy-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-2">{s.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                  <Clock className="h-3.5 w-3.5" aria-hidden /> {s.time}
                </span>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export function CtaBand({
  title = 'Not sure where to start?',
  desc = 'Speak with a qualified tax professional who reviews your situation, explains your options in plain language and tells you exactly what to file.',
  primary = { label: 'Request a callback', href: '/contact' },
  secondary = { label: 'Book a consultation', href: '/consult' },
}: {
  title?: string
  desc?: string
  primary?: { label: string; href: string }
  secondary?: { label: string; href: string }
}) {
  return (
    <div className="overflow-hidden rounded-3xl bg-navy-900 px-6 py-10 sm:px-10 sm:py-14 text-white">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{title}</h2>
          <p className="mt-3 max-w-xl text-white/70 leading-relaxed">{desc}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={primary.href} variant="primary" icon>{primary.label}</Button>
            <Button href={secondary.href} variant="white">{secondary.label}</Button>
          </div>
        </div>
        <ul className="grid gap-3 text-sm text-white/80">
          {['Callback within 2 working hours', 'Fixed price quoted before any work', 'Every return reviewed by a CMA or CA'].map((t) => (
            <li key={t} className="flex items-center gap-2.5 rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
              <Check className="h-4 w-4 text-green-500" aria-hidden />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] ${className}`}>{children}</div>
}
