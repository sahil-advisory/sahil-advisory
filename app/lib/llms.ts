import { BASE_URL, SITE } from './site'
import { CATEGORIES, CATEGORY_PATH, CONSULTATIONS, servicesIn, servicePath, unitSuffix } from './services'
import { LIVE_CALCULATORS } from './calculators'
import { DEADLINES, nextDue } from './due-dates'
import { GUIDES, CLUSTERS, guidesIn, guidePath } from './guides'
import { publishedExperts } from './experts'
import { REFERENCE, referenceOf, referencePath } from './reference'
import { formatINR, formatDateIN } from './format'
import type { ContentSection } from './guides/types'

// llms.txt (llmstxt.org): a Markdown map of the site for AI assistants, and
// llms-full.txt with the actual content. MarketsEasy's second-largest
// acquisition channel was ChatGPT citing its FAQ answers; these files give
// assistants clean text to quote and a canonical URL to cite for each fact.

const u = (p: string) => `${BASE_URL}${p}`

function price(s: { price: number | null; unit: 'one_time' | 'month' | 'quarter' | 'year' | 'session'; mrp: number; quoteLabel?: string }) {
  if (s.price === null) return s.quoteLabel ?? 'Quoted after free triage'
  if (s.price === 0) return 'Free'
  return `${formatINR(s.price)}${unitSuffix(s.unit) ? ' ' + unitSuffix(s.unit) : ''} + 18% GST`
}

export function llmsIndex(): string {
  const lines: string[] = []
  lines.push(`# ${SITE.name}`)
  lines.push('')
  lines.push(`> ${SITE.shortDescription}`)
  lines.push('')
  lines.push(`Based in Chandigarh and Panchkula, India; serves clients across India online. Led by a Cost and Management Accountant (ICMAI). Tax audit and statutory audit are signed by empanelled Chartered Accountants; cost audit under section 148 is signed by the CMA. Prices are in Indian rupees, exclusive of 18% GST, and are published on every service page. Current filing season: FY ${SITE.currentFY} / AY ${SITE.currentAY}.`)
  lines.push('')
  lines.push(`Contact: ${SITE.phoneDisplay}, ${SITE.email}, ${SITE.hours}.`)
  lines.push('')
  lines.push('## Services')
  lines.push('')
  for (const c of CATEGORIES) {
    lines.push(`- [${c.name}](${u(CATEGORY_PATH[c.id])}): ${c.metaDescription}`)
    for (const s of servicesIn(c.id)) lines.push(`  - [${s.name}](${u(servicePath(s))}): ${price(s)}. ${s.shortDesc}`)
  }
  lines.push(`- [Consultation](${u('/consult')}): ${CONSULTATIONS.map((k) => `${k.name} ${formatINR(k.price)}`).join('; ')}. Fee adjustable against any service within 30 days.`)
  lines.push(`- [Pricing](${u('/pricing')}): every price on one page.`)
  lines.push('')
  lines.push('## Calculators (free, updated for FY ' + SITE.currentFY + ')')
  lines.push('')
  for (const c of LIVE_CALCULATORS) lines.push(`- [${c.name}](${u(`/calculators/${c.slug}`)}): ${c.metaDescription}`)
  lines.push('')
  lines.push('## Due dates')
  lines.push('')
  const now = new Date()
  for (const d of DEADLINES) lines.push(`- [${d.label}](${u(`/due-dates/${d.slug}`)}): next ${formatDateIN(nextDue(d.rule, now))}. ${d.lateFee}.`)
  lines.push('')
  lines.push('## Guides')
  lines.push('')
  for (const c of CLUSTERS) {
    const gs = guidesIn(c.id)
    if (!gs.length) continue
    lines.push(`### ${c.name}`)
    for (const g of gs) lines.push(`- [${g.title}](${u(guidePath(g))}): ${g.excerpt}`)
    lines.push('')
  }
  lines.push('## Income Tax Act sections')
  lines.push('')
  for (const r of referenceOf('section')) lines.push(`- [${r.name}](${u(referencePath(r))}): ${r.summary}${r.act2025 ? ` (${r.act2025.newNumber} under the Income-tax Act 2025, ${r.act2025.status})` : ''}`)
  lines.push('')
  lines.push('## Forms')
  lines.push('')
  for (const r of referenceOf('form')) lines.push(`- [${r.name}](${u(referencePath(r))}): ${r.summary}`)
  lines.push('')
  lines.push('## People')
  lines.push('')
  for (const e of publishedExperts()) lines.push(`- [${e.name}](${u(`/experts/${e.slug}`)}): ${e.title}, ${e.years}+ years. ${e.specialisations.join(', ')}.`)
  lines.push('')
  lines.push('## Optional')
  lines.push('')
  lines.push(`- [Full content](${u('/llms-full.txt')}): every guide, price and deadline as plain text.`)
  lines.push(`- [About](${u('/about')})`)
  lines.push(`- [Security and privacy](${u('/trust')})`)
  lines.push(`- [Sitemap](${u('/sitemap.xml')})`)
  return lines.join('\n') + '\n'
}

function sectionToMd(s: ContentSection): string {
  switch (s.type) {
    case 'heading': return `\n## ${s.text}\n`
    case 'paragraph': return s.text + '\n'
    case 'list': return s.items.map((it, i) => (s.ordered ? `${i + 1}. ` : '- ') + it).join('\n') + '\n'
    case 'table': return `\n| ${s.head.join(' | ')} |\n| ${s.head.map(() => '---').join(' | ')} |\n${s.rows.map((r) => `| ${r.join(' | ')} |`).join('\n')}\n`
    case 'callout': return `\n> **${s.title ?? (s.tone === 'warning' ? 'Note' : 'Tip')}:** ${s.text}\n`
    case 'stat-grid': return s.stats.map((st) => `- ${st.label}: ${st.value}${st.note ? ` (${st.note})` : ''}`).join('\n') + '\n'
    case 'key-takeaways': return `\n**Key takeaways**\n${s.items.map((it) => `- ${it}`).join('\n')}\n`
    case 'example': return `\n**Worked example: ${s.title}**\n${s.lines.map((l) => `- ${l.label}: ${l.value}`).join('\n')}\n`
    case 'tool-card': return `\n(See the ${s.calculatorSlug} calculator: ${u(`/calculators/${s.calculatorSlug}`)})\n`
    case 'service-card': return ''
    default: return ''
  }
}

export function llmsFull(): string {
  const out: string[] = []
  out.push(llmsIndex())
  out.push('\n---\n\n# Full content\n')

  out.push('\n# Services and prices\n')
  for (const c of CATEGORIES) {
    out.push(`\n## ${c.name}\n\n${c.intro}\n`)
    for (const s of servicesIn(c.id)) {
      out.push(`\n### ${s.name}\nURL: ${u(servicePath(s))}\nPrice: ${price(s)}\nFor: ${s.whoFor}\nTurnaround: ${s.turnaroundDays}\n\n${s.longDesc}\n\nIncludes:\n${s.includes.map((i) => `- ${i}`).join('\n')}\n\nDocuments needed:\n${s.documents.map((d) => `- ${d}`).join('\n')}\n`)
      if (s.faqs.length) out.push(s.faqs.map((f) => `\n**Q: ${f.q}**\n${f.a}`).join('\n') + '\n')
    }
    if (c.faqs.length) out.push(`\n### ${c.navLabel}: frequently asked questions\n` + c.faqs.map((f) => `\n**Q: ${f.q}**\n${f.a}`).join('\n') + '\n')
  }

  out.push('\n# Due dates\n')
  const now = new Date()
  for (const d of DEADLINES) {
    out.push(`\n## ${d.label}\nURL: ${u(`/due-dates/${d.slug}`)}\nNext due: ${formatDateIN(nextDue(d.rule, now))}\nApplies to: ${d.appliesTo}\nLate fee: ${d.lateFee}${d.interest ? `\nInterest: ${d.interest}` : ''}\nLast verified: ${d.lastVerified}\n\n${d.intro}\n\n${d.body.join('\n\n')}\n`)
    out.push(d.faqs.map((f) => `\n**Q: ${f.q}**\n${f.a}`).join('\n') + '\n')
  }

  out.push('\n# Calculators\n')
  for (const c of LIVE_CALCULATORS) {
    out.push(`\n## ${c.h1}\nURL: ${u(`/calculators/${c.slug}`)}\nUpdated for: ${c.updatedFor}\n\n${c.intro}\n`)
    for (const s of c.sections) {
      out.push(`\n### ${s.heading}\n`)
      if (s.paragraphs) out.push(s.paragraphs.join('\n\n') + '\n')
      if (s.bullets) out.push(s.bullets.map((b) => `- ${b}`).join('\n') + '\n')
      if (s.table) out.push(`\n| ${s.table.head.join(' | ')} |\n| ${s.table.head.map(() => '---').join(' | ')} |\n${s.table.rows.map((r) => `| ${r.join(' | ')} |`).join('\n')}\n`)
    }
    out.push(c.faqs.map((f) => `\n**Q: ${f.q}**\n${f.a}`).join('\n') + '\n')
  }

  out.push('\n# Sections and forms\n')
  for (const r of REFERENCE) {
    out.push(`\n## ${r.h1}\nURL: ${u(referencePath(r))}\nUpdated: ${r.dateModified}\n\n${r.summary}\n\n${r.keyFacts.map((f) => `- ${f.label}: ${f.value}`).join('\n')}\n`)
    if (r.act2025) out.push(`\nUnder the Income-tax Act 2025 (from tax year 2026-27) this is ${r.act2025.newNumber}${r.act2025.status === 'reported' ? ', as reported in secondary sources; verify against the notified Rules' : ''}.\n`)
    for (const s of r.sections) out.push(sectionToMd(s))
    out.push('\n### Frequently asked questions\n' + r.faqs.map((f) => `\n**Q: ${f.q}**\n${f.a}`).join('\n') + '\n')
  }

  out.push('\n# Guides\n')
  for (const g of GUIDES) {
    out.push(`\n# ${g.h1}\nURL: ${u(guidePath(g))}\nUpdated: ${g.dateModified}. Reviewed by ${publishedExperts()[0]?.name ?? 'a qualified professional'}.\n\n${g.excerpt}\n`)
    for (const s of g.sections) out.push(sectionToMd(s))
    out.push('\n### Frequently asked questions\n' + g.faqs.map((f) => `\n**Q: ${f.q}**\n${f.a}`).join('\n') + '\n')
  }

  out.push(`\n---\nContent is general information for FY ${SITE.currentFY}, not professional advice. ${SITE.name}, ${u('')}.\n`)
  return out.join('')
}
