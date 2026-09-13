import Link from 'next/link'
import { Info, AlertTriangle, CheckCircle2, Calculator, ArrowRight, Lightbulb } from 'lucide-react'
import type { ContentSection } from '@/app/lib/guides/types'
import { getCalculator } from '@/app/lib/calculators'
import { getService, servicePath, unitSuffix } from '@/app/lib/services'
import { formatINR } from '@/app/lib/format'

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function headingId(s: { text: string; id?: string }) {
  return s.id ?? slugify(s.text)
}

export default function GuideContent({ sections }: { sections: ContentSection[] }) {
  return (
    <div className="prose-tax">
      {sections.map((s, i) => {
        switch (s.type) {
          case 'heading':
            return <h2 key={i} id={headingId(s)}>{s.text}</h2>
          case 'paragraph':
            return <p key={i}>{s.text}</p>
          case 'list':
            return s.ordered ? <ol key={i}>{s.items.map((it) => <li key={it}>{it}</li>)}</ol> : <ul key={i}>{s.items.map((it) => <li key={it}>{it}</li>)}</ul>
          case 'table':
            return (
              <div key={i} className="my-5 overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  {s.caption && <caption className="bg-bg-alt px-4 py-2 text-left text-xs font-semibold text-muted">{s.caption}</caption>}
                  <thead className="bg-bg-alt text-left text-xs font-bold uppercase tracking-wider text-muted">
                    <tr>{s.head.map((h) => <th key={h} className="px-4 py-2.5">{h}</th>)}</tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {s.rows.map((r, ri) => (
                      <tr key={ri}>{r.map((c, ci) => <td key={ci} className={`px-4 py-2.5 align-top ${ci === 0 ? 'font-medium text-navy-900' : 'text-text-2'}`}>{c}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          case 'callout': {
            const tone = { info: 'border-navy-100 bg-navy-100/40 text-navy-900', warning: 'border-amber-200 bg-gold-50 text-navy-900', success: 'border-green-100 bg-green-50 text-navy-900' }[s.tone]
            const Icon = { info: Info, warning: AlertTriangle, success: CheckCircle2 }[s.tone]
            return (
              <div key={i} className={`my-5 flex gap-3 rounded-xl border p-4 ${tone}`}>
                <Icon className="mt-0.5 h-5 w-5 shrink-0" />
                <div className="text-sm leading-relaxed">
                  {s.title && <p className="font-bold">{s.title}</p>}
                  <p className="!mb-0 !text-navy-900/80">{s.text}</p>
                </div>
              </div>
            )
          }
          case 'stat-grid':
            return (
              <dl key={i} className="my-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {s.stats.map((st) => (
                  <div key={st.label} className="rounded-xl border border-border bg-card p-4">
                    <dt className="text-xs font-semibold text-muted">{st.label}</dt>
                    <dd className="mt-1 font-mono text-2xl font-bold tabular text-navy-900">{st.value}</dd>
                    {st.note && <dd className="mt-0.5 text-xs text-muted">{st.note}</dd>}
                  </div>
                ))}
              </dl>
            )
          case 'key-takeaways':
            return (
              <div key={i} className="my-6 rounded-2xl border border-green-100 bg-green-50 p-5">
                <p className="flex items-center gap-2 text-sm font-bold text-green-700"><Lightbulb className="h-4 w-4" /> Key takeaways</p>
                <ul className="!mb-0 mt-3 space-y-1.5">
                  {s.items.map((it) => <li key={it} className="text-sm !text-navy-900">{it}</li>)}
                </ul>
              </div>
            )
          case 'tool-card': {
            const c = getCalculator(s.calculatorSlug)
            if (!c) return null
            return (
              <Link key={i} href={`/calculators/${c.slug}`} className="my-6 flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 !no-underline shadow-[var(--shadow-card)] hover:border-green-600">
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700"><Calculator className="h-5 w-5" /></span>
                  <span>
                    <span className="block text-sm font-bold text-navy-900">{c.name}</span>
                    <span className="block text-xs text-muted">{s.text ?? c.updatedFor}</span>
                  </span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-muted" />
              </Link>
            )
          }
          case 'service-card': {
            const sv = getService(s.serviceSlug)
            if (!sv) return null
            return (
              <div key={i} className="my-8 rounded-2xl bg-navy-900 p-6 text-white">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-green-500">Done for you</p>
                <p className="mt-2 text-lg font-bold">{sv.name}</p>
                <p className="mt-1 text-sm text-white/70">{s.text ?? sv.shortDesc}</p>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <span className="font-mono text-xl font-bold">{sv.price === null ? 'Quote after triage' : sv.price === 0 ? 'Free' : `${sv.priceFrom ? 'from ' : ''}${formatINR(sv.price)} ${unitSuffix(sv.unit)}`}</span>
                  <Link href={servicePath(sv)} className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold !text-white !no-underline hover:bg-green-700">View plan <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </div>
            )
          }
          case 'example':
            return (
              <div key={i} className="my-5 overflow-hidden rounded-xl border border-border">
                <p className="bg-bg-alt px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted">Worked example: {s.title}</p>
                <dl className="divide-y divide-border">
                  {s.lines.map((l) => (
                    <div key={l.label} className={`flex items-center justify-between gap-4 px-4 py-2 text-sm ${l.strong ? 'bg-green-50 font-bold text-navy-900' : 'text-text-2'}`}>
                      <dt>{l.label}</dt>
                      <dd className="font-mono tabular">{l.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
