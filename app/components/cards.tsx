import Link from 'next/link'
import { ArrowRight, Star, Calculator as CalcIcon, BookOpen, Clock, Check, FileText, Receipt, Percent, Building2, ClipboardCheck, ScrollText, Sparkles, type LucideIcon } from 'lucide-react'
import { Badge, CheckList, PriceTag } from './ui'
import { servicePath, unitSuffix, servicesIn, CATEGORY_PATH, type Service, type ServiceCategoryId } from '@/app/lib/services'
import { formatINR } from '@/app/lib/format'
import type { Expert } from '@/app/lib/experts'
import type { Testimonial } from '@/app/lib/testimonials'
import type { CalculatorDef } from '@/app/lib/calculators'
import type { Guide } from '@/app/lib/guides/types'
import { guidePath } from '@/app/lib/guides'
import { whatsappLink } from '@/app/lib/site'
import TrackedLink from './TrackedLink'

// `hideBadge` is for cross-category grids (the home page featured row), where
// several category-level "most popular" plans sit together and the badge would
// lose all meaning by appearing on most of the cards.
export function PlanCard({ service, compact, hideBadge }: { service: Service; compact?: boolean; hideBadge?: boolean }) {
  const href = servicePath(service)
  const wa = whatsappLink(`Hi, I want to get started with ${service.name}.`)
  const showBadge = service.popular && !hideBadge
  return (
    <article
      className={`relative flex flex-col rounded-2xl border bg-card p-5 sm:p-6 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-lift)] ${
        showBadge ? 'border-green-600 ring-1 ring-green-600' : 'border-border'
      }`}
    >
      {showBadge && (
        <span className="absolute -top-3 left-5">
          <Badge tone="gold">Most popular</Badge>
        </span>
      )}
      <h3 className="text-lg font-bold text-navy-900 leading-snug">
        <Link href={href} className="hover:text-green-700">{service.name}</Link>
      </h3>
      <p className="mt-1 text-xs font-medium text-muted">{service.whoFor}</p>
      {!compact && <CheckList items={service.includes.slice(0, 3)} className="mt-4" />}
      <div className="mt-5 border-t border-border pt-4">
        <PriceTag price={service.price} mrp={service.mrp} unit={unitSuffix(service.unit)} quote={service.price === null ? (service.quoteLabel ?? 'Quote after free triage') : undefined} from={service.priceFrom} note={compact ? undefined : service.priceNote} />
        <p className="mt-1 flex items-center gap-1 text-xs text-muted">
          <Clock className="h-3.5 w-3.5" /> {service.turnaroundDays}
        </p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Link href={href} className="rounded-lg border border-border-strong px-3 py-2 text-center text-sm font-semibold text-navy-900 hover:bg-bg-alt">
          View details
        </Link>
        <TrackedLink event="plan_cta_click" props={{ plan: service.slug, category: service.category, placement: 'card' }} href={wa} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-green-700">
          Get started
        </TrackedLink>
      </div>
    </article>
  )
}

const CATEGORY_ICON: Record<ServiceCategoryId, LucideIcon> = {
  itr: FileText,
  gst: Receipt,
  tds: Percent,
  registrations: Building2,
  audit: ClipboardCheck,
  notices: ScrollText,
}

// Whole card is the link. Starting price and plan count come from the
// registry so this never drifts from the pricing page.
export function CategoryCard({ id, name, sub, items, cta }: { id: ServiceCategoryId; name: string; sub: string; items: readonly string[]; cta: string }) {
  const Icon = CATEGORY_ICON[id]
  const plans = servicesIn(id)
  const priced = plans.filter((s) => s.price !== null && s.price > 0)
  const min = priced.length ? Math.min(...priced.map((s) => s.price as number)) : null
  return (
    <Link
      href={CATEGORY_PATH[id]}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-green-600/60 hover:shadow-[var(--shadow-lift)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {/* Top accent that draws in on hover */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-green-600 to-green-400 transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none" />

      <div className="flex items-start justify-between gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-white transition-colors duration-300 group-hover:bg-green-600">
          <Icon className="h-6 w-6" aria-hidden />
        </span>
        {min !== null && (
          <span className="rounded-lg bg-green-50 px-2.5 py-1.5 text-right leading-none">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-green-700">From</span>
            <span className="mt-0.5 block font-mono text-base font-bold tabular text-navy-900">{formatINR(min)}</span>
          </span>
        )}
      </div>

      <h3 className="mt-5 text-xl font-bold tracking-tight text-navy-900 transition-colors group-hover:text-green-700">{name}</h3>
      <p className="mt-1 text-sm text-text-2">{sub}</p>

      <ul className="mt-5 space-y-2.5">
        {items.map((it) => (
          <li key={it} className="flex gap-2.5 text-sm leading-snug text-text-2">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-700">
              <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
            </span>
            <span>{it}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center justify-between border-t border-border pt-5">
        <span className="text-sm font-semibold text-green-700">{cta}</span>
        <span className="flex items-center gap-3">
          <span className="text-xs text-muted">{plans.length} plans</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-alt text-navy-900 transition-[background-color,color,transform] duration-300 group-hover:translate-x-1 group-hover:bg-green-600 group-hover:text-white motion-reduce:group-hover:translate-x-0">
            <ArrowRight className="h-4 w-4" aria-hidden />
          </span>
        </span>
      </div>
    </Link>
  )
}

export function FounderTag() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-gold-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-gold-600">
      <Sparkles className="h-3 w-3" aria-hidden /> Founder
    </span>
  )
}

export function expertInitials(name: string) {
  return name.replace(/^(CMA|CA|CS)\s+/, '').split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
}

export function ExpertCard({ expert, compact }: { expert: Expert; compact?: boolean }) {
  const initials = expertInitials(expert.name)
  if (compact) {
    return (
      <article className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy-900 text-lg font-bold text-white">{initials}</div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold text-navy-900"><Link href={`/experts/${expert.slug}`} className="hover:text-green-700">{expert.name}</Link></h3>
            {expert.role === 'Founder' && <FounderTag />}
            <Badge tone="navy">{expert.credential === 'Consultant' ? expert.qualifications[0] ?? 'Consultant' : expert.credential}</Badge>
          </div>
          <p className="text-xs text-muted">{expert.years}+ years · {expert.languages.join(', ')}</p>
        </div>
      </article>
    )
  }
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-green-600/50 hover:shadow-[var(--shadow-lift)] motion-reduce:transition-none">
      <div className="bg-[linear-gradient(135deg,_var(--navy-900),_var(--navy-700))] px-6 pb-14 pt-6">
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-md bg-white/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white/90">{expert.credentialLabel}</span>
          <span className="rounded-md bg-green-500/20 px-2 py-0.5 font-mono text-[11px] font-bold text-green-300">{expert.years}+ yrs</span>
        </div>
      </div>
      <div className="-mt-10 flex flex-1 flex-col px-6 pb-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-2xl font-extrabold text-navy-900 shadow-[var(--shadow-lift)] ring-4 ring-white">{initials}</div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <h3 className="text-xl font-bold tracking-tight text-navy-900">
            <Link href={`/experts/${expert.slug}`} className="hover:text-green-700">{expert.name}</Link>
          </h3>
          {expert.role === 'Founder' && <FounderTag />}
        </div>
        <p className="mt-0.5 text-sm text-text-2">{expert.title}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {expert.qualifications.map((q) => (
            <li key={q} className="rounded-md border border-green-100 bg-green-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-green-700">{q}</li>
          ))}
        </ul>
        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-text-2">{expert.bio}</p>
        <dl className="mt-4 space-y-2 text-sm">
          <div>
            <dt className="text-[11px] font-bold uppercase tracking-wider text-muted">Handles</dt>
            <dd className="mt-1 flex flex-wrap gap-1.5">
              {expert.specialisations.map((sp) => (
                <span key={sp} className="rounded-md bg-bg-alt px-2 py-0.5 text-xs text-text-2">{sp}</span>
              ))}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-wider text-muted">Speaks</dt>
              <dd className="mt-0.5 text-xs text-text-2">{expert.languages.join(', ')}</dd>
            </div>
          </div>
        </dl>
        <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
          <Link href={`/experts/${expert.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-green-700 hover:underline">Profile <ArrowRight className="h-4 w-4" /></Link>
          <Link href="/consult" className="rounded-lg bg-navy-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-navy-800">Book a call</Link>
        </div>
      </div>
    </article>
  )
}

export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <div className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-gold-600 text-gold-600" />
        ))}
      </div>
      <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-text-2">“{t.text}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-100 text-xs font-bold text-navy-900">
          {t.name.split(' ').map((w) => w[0]).join('')}
        </span>
        <span>
          <span className="block text-sm font-bold text-navy-900">{t.name}</span>
          <span className="block text-xs text-muted">
            {t.role}{t.city ? `, ${t.city}` : ''}{t.service ? ` · ${t.service}` : ''}
          </span>
        </span>
      </figcaption>
    </figure>
  )
}

export function CalculatorCard({ calc }: { calc: Pick<CalculatorDef, 'slug' | 'name' | 'metaDescription' | 'phase'> }) {
  if (calc.phase !== 0) {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-dashed border-border bg-bg-alt p-5 opacity-80">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-muted"><CalcIcon className="h-4 w-4" /></span>
        <div>
          <p className="text-sm font-bold text-navy-900">{calc.name}</p>
          <p className="text-xs text-muted">Coming soon</p>
        </div>
      </div>
    )
  }
  return (
    <Link href={`/calculators/${calc.slug}`} className="group flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] hover:border-green-600">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-700"><CalcIcon className="h-4 w-4" /></span>
      <div>
        <p className="text-sm font-bold text-navy-900 group-hover:text-green-700">{calc.name}</p>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-text-2">{calc.metaDescription}</p>
      </div>
    </Link>
  )
}

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link href={guidePath(guide)} className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] hover:border-green-600">
      <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-green-700">
        <BookOpen className="h-3.5 w-3.5" /> {guide.cluster.replace(/-/g, ' ')}
      </span>
      <h3 className="mt-2 text-base font-bold leading-snug text-navy-900 group-hover:text-green-700">{guide.title}</h3>
      <p className="mt-2 line-clamp-2 text-sm text-text-2">{guide.excerpt}</p>
      <p className="mt-auto pt-4 text-xs text-muted">{guide.readMinutes} min read · Updated {new Date(guide.dateModified).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
    </Link>
  )
}
