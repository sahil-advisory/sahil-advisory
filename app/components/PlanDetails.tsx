import { Check, MessageCircle, Download, KeyRound, Camera } from 'lucide-react'
import type { Service } from '@/app/lib/services'
import { WHATSAPP_DEFAULT } from '@/app/lib/site'
import Reveal from './Reveal'
import TrackedLink from './TrackedLink'

// The "what you get, what you send" block on a plan page. Documents are
// classified by keyword so each gets the right illustration and the right
// instruction (photo on WhatsApp, we download with consent, share a login).

type DocKind = 'id' | 'statement' | 'agreement' | 'login' | 'form'

function classify(doc: string): DocKind {
  const d = doc.toLowerCase()
  if (/traces|login|portal|password|credentials/.test(d)) return 'login'
  if (/pan|aadhaar|passport|photograph|identity|address proof|kyc/.test(d)) return 'id'
  if (/deed|agreement|resolution|noc|certificate|sale deed|bye-laws/.test(d)) return 'agreement'
  if (/statement|register|p&l|ledger|summary|invoice|challan|payroll|data|details/.test(d)) return 'statement'
  return 'form'
}

function howToSend(doc: string, kind: DocKind): { icon: typeof Camera; text: string } {
  const d = doc.toLowerCase()
  if (/ais|26as|with your consent|we can download/.test(d)) return { icon: Download, text: 'We download it with your consent' }
  if (kind === 'login') return { icon: KeyRound, text: 'Shared securely, never stored in chat' }
  if (kind === 'id') return { icon: Camera, text: 'A clear photo is enough' }
  return { icon: MessageCircle, text: 'PDF or photo on WhatsApp' }
}

// Small illustrated documents. One SVG each, tinted by kind.
export function DocArt({ kind }: { kind: DocKind }) {
  const tone = { id: '#0B1F3A', statement: '#059669', agreement: '#B45309', login: '#1E3A5F', form: '#047857' }[kind]
  if (kind === 'id') {
    return (
      <svg viewBox="0 0 56 56" className="h-12 w-12" aria-hidden>
        <rect x="6" y="14" width="44" height="28" rx="4" fill="#fff" stroke={tone} strokeWidth="1.5" />
        <rect x="6" y="14" width="44" height="7" rx="4" fill={tone} />
        <rect x="6" y="18" width="44" height="3" fill={tone} />
        <circle cx="17" cy="31" r="4.5" fill="#E3E9F2" stroke={tone} strokeWidth="1.2" />
        <rect x="26" y="27" width="18" height="2.5" rx="1.25" fill="#CFD6E0" />
        <rect x="26" y="32" width="13" height="2.5" rx="1.25" fill="#CFD6E0" />
        <rect x="11" y="38" width="10" height="1.5" rx="0.75" fill="#E3E9F2" />
      </svg>
    )
  }
  if (kind === 'login') {
    return (
      <svg viewBox="0 0 56 56" className="h-12 w-12" aria-hidden>
        <rect x="8" y="10" width="40" height="30" rx="4" fill="#fff" stroke={tone} strokeWidth="1.5" />
        <rect x="8" y="10" width="40" height="6" rx="4" fill={tone} />
        <rect x="8" y="13" width="40" height="3" fill={tone} />
        <rect x="15" y="22" width="26" height="4" rx="2" fill="#E3E9F2" />
        <rect x="15" y="29" width="26" height="4" rx="2" fill="#E3E9F2" />
        <rect x="17" y="30" width="10" height="2" rx="1" fill={tone} opacity=".5" />
        <rect x="22" y="43" width="12" height="2" rx="1" fill="#CFD6E0" />
        <circle cx="41" cy="36" r="6" fill="#ECFDF5" stroke="#059669" strokeWidth="1.2" />
        <path d="M38.5 36l1.8 1.8 3.2-3.4" fill="none" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  }
  if (kind === 'agreement') {
    return (
      <svg viewBox="0 0 56 56" className="h-12 w-12" aria-hidden>
        <path d="M14 6h20l10 10v34H14z" fill="#fff" stroke={tone} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M34 6v10h10" fill="#FFFBEB" stroke={tone} strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="19" y="21" width="18" height="2" rx="1" fill="#CFD6E0" />
        <rect x="19" y="26" width="18" height="2" rx="1" fill="#CFD6E0" />
        <rect x="19" y="31" width="12" height="2" rx="1" fill="#CFD6E0" />
        <circle cx="36" cy="41" r="6" fill="#FFFBEB" stroke={tone} strokeWidth="1.2" />
        <circle cx="36" cy="41" r="2.5" fill={tone} opacity=".6" />
        <path d="M19 42c2-3 4 1 6-2s3 1 5-1" fill="none" stroke={tone} strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    )
  }
  if (kind === 'statement') {
    return (
      <svg viewBox="0 0 56 56" className="h-12 w-12" aria-hidden>
        <path d="M14 6h20l10 10v34H14z" fill="#fff" stroke={tone} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M34 6v10h10" fill="#ECFDF5" stroke={tone} strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="19" y="21" width="18" height="2" rx="1" fill="#CFD6E0" />
        <rect x="19" y="27" width="6" height="2" rx="1" fill="#CFD6E0" />
        <rect x="31" y="27" width="6" height="2" rx="1" fill={tone} opacity=".7" />
        <rect x="19" y="32" width="6" height="2" rx="1" fill="#CFD6E0" />
        <rect x="31" y="32" width="6" height="2" rx="1" fill={tone} opacity=".7" />
        <rect x="19" y="37" width="6" height="2" rx="1" fill="#CFD6E0" />
        <rect x="31" y="37" width="6" height="2" rx="1" fill={tone} opacity=".7" />
        <rect x="19" y="43" width="18" height="1.5" rx=".75" fill={tone} />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 56 56" className="h-12 w-12" aria-hidden>
      <path d="M14 6h20l10 10v34H14z" fill="#fff" stroke={tone} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M34 6v10h10" fill="#ECFDF5" stroke={tone} strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="19" y="20" width="12" height="3" rx="1.5" fill={tone} opacity=".8" />
      <rect x="19" y="27" width="18" height="2" rx="1" fill="#CFD6E0" />
      <rect x="19" y="32" width="18" height="2" rx="1" fill="#CFD6E0" />
      <rect x="19" y="37" width="14" height="2" rx="1" fill="#CFD6E0" />
      <rect x="19" y="42" width="10" height="2" rx="1" fill="#CFD6E0" />
    </svg>
  )
}

export default function PlanDetails({ service }: { service: Service }) {
  const fetchable = service.documents.filter((d) => /ais|26as|with your consent/i.test(d)).length
  return (
    <section className="relative overflow-hidden py-16 lg:py-20">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--green-50),_transparent_50%)]" />
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12 lg:px-8">
        {/* What you get */}
        <Reveal>
          <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-green-700">What you get</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy-900">Everything in {service.name}</h2>
            <ul className="mt-6 space-y-1">
              {service.includes.map((it, i) => (
                <Reveal key={it} delay={80 + i * 70}>
                  <li className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-green-50/60">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-600 text-white shadow-[0_0_0_4px_var(--green-50)]">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                    </span>
                    <span className="text-[15px] leading-snug text-navy-900">{it}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-3 rounded-2xl bg-navy-900 px-4 py-3.5 text-sm text-white">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10"><Check className="h-4 w-4 text-green-400" aria-hidden /></span>
              <span>Draft computation shared for your approval before anything is filed. Turnaround <strong className="font-semibold">{service.turnaroundDays}</strong>.</span>
            </div>
          </div>
        </Reveal>

        {/* What you send */}
        <Reveal delay={120}>
          <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-green-700">What you send</p>
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy-900">{service.documents.length} documents, mostly from your phone</h2>
              </div>
              {fetchable > 0 && (
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">{fetchable} we can download for you</span>
              )}
            </div>

            <ol className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.documents.map((d, i) => {
                const kind = classify(d)
                const how = howToSend(d, kind)
                return (
                  <Reveal key={d} delay={160 + i * 80} className="h-full">
                    <li className="group relative flex h-full items-start gap-3 rounded-2xl border border-border bg-white p-3.5 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-green-600/50 hover:shadow-[var(--shadow-card)] motion-reduce:transition-none">
                      <span className="shrink-0 rounded-xl bg-bg-alt p-1 transition-transform duration-300 group-hover:-rotate-3 motion-reduce:transition-none">
                        <DocArt kind={kind} />
                      </span>
                      <span className="min-w-0 pr-5">
                        <span className="block text-sm font-semibold leading-snug text-navy-900">{d}</span>
                        <span className="mt-1.5 flex items-center gap-1.5 text-xs text-muted">
                          <how.icon className="h-3.5 w-3.5 shrink-0 text-green-600" aria-hidden />
                          {how.text}
                        </span>
                      </span>
                      <span className="absolute right-3 top-3 font-mono text-[10px] font-bold text-border-strong">{String(i + 1).padStart(2, '0')}</span>
                    </li>
                  </Reveal>
                )
              })}
            </ol>

            <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-dashed border-border-strong bg-bg-alt/60 p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-text-2">Missing something? Start anyway. Your expert tells you exactly what is needed and what we can pull with your consent.</p>
              <TrackedLink event="whatsapp_click" props={{ placement: 'plan_documents', plan: service.slug }} href={WHATSAPP_DEFAULT} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white hover:brightness-95">
                <MessageCircle className="h-4 w-4" aria-hidden /> Send on WhatsApp
              </TrackedLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
