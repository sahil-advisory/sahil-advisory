// Income-tax Act 1961 to Income-tax Act 2025 renumbering.
//
// One source of truth. Reference pages resolve their own mapping from here,
// and the Act 2025 guide builds its tables from it, so a correction is made
// once.
//
// Two rules, both deliberate:
//
// 1. The 1961 numbering stays primary everywhere on the site. It is what
//    applies to FY 2025-26 (AY 2026-27) returns being filed now, and it is
//    what people search for. The 2025 Act applies from tax year 2026-27.
//    These are shown as "the new number will be", never as a replacement.
// 2. Nothing here is invented. Every row is `reported` until the Rules are
//    notified, per the rule in AGENTS.md. Where the source is ambiguous the
//    entry says so rather than guessing.

export type Act2025Kind = 'section' | 'form' | 'challan'

export type Act2025Entry = {
  /** Reference under the 1961 Act, as people write it: "80C", "Form 16". */
  old: string
  /** Reference under the 2025 Act. Null when no direct equivalent is listed. */
  new: string | null
  kind: Act2025Kind
  /** Plain-English description of what the provision or form does. */
  what: string
  /** Slug of the /sections or /forms page for this item, where one exists. */
  refSlug?: string
  note?: string
}

export const ACT_2025_MAP: Act2025Entry[] = [
  // ── Deductions and exemptions ────────────────────────────────────────────
  { old: '80C', new: 'Section 123', kind: 'section', what: 'Deduction for PF, PPF, ELSS, life insurance, tuition fees and principal repayment', refSlug: '80c' },
  { old: '80D', new: 'Section 126', kind: 'section', what: 'Deduction for health insurance premium and preventive check-ups', refSlug: '80d' },
  { old: '80CCD(1B)', new: 'Section 124(3)', kind: 'section', what: 'Additional NPS deduction of ₹50,000 over the 80C limit', refSlug: '80ccd-1b' },
  { old: '80GG', new: 'Section 134', kind: 'section', what: 'Rent paid deduction where no HRA is received' },
  { old: '24(b)', new: 'Section 22(1)(b)', kind: 'section', what: 'Interest on a housing loan against house property income', refSlug: '24b' },
  { old: '10(13A)', new: 'Schedule III', kind: 'section', what: 'House rent allowance exemption for salaried employees', refSlug: '10-13a', note: 'Moved into the schedule of salary exemptions rather than given a new section number.' },
  { old: '87A', new: 'Section 156', kind: 'section', what: 'Rebate for resident individuals below the income threshold', refSlug: '87a' },

  // ── Regime, presumptive and special rates ────────────────────────────────
  { old: '115BAC', new: 'Section 202', kind: 'section', what: 'The new tax regime and its slab rates' },
  { old: '44AD', new: 'Section 58', kind: 'section', what: 'Presumptive taxation for small business', refSlug: '44ad' },
  { old: '44ADA', new: 'Section 58', kind: 'section', what: 'Presumptive taxation for professionals', refSlug: '44ada' },
  { old: '44AB', new: 'Section 63', kind: 'section', what: 'Compulsory tax audit above the turnover threshold' },
  { old: '115JB', new: 'Section 206', kind: 'section', what: 'Minimum alternate tax for companies' },
  { old: '111A', new: 'Section 197', kind: 'section', what: 'Short-term capital gains on listed equity at 20%' },
  { old: '112A', new: 'Section 198', kind: 'section', what: 'Long-term capital gains on listed equity at 12.5% above ₹1.25 lakh' },
  { old: '115BBH', new: 'Section 194', kind: 'section', what: 'Virtual digital assets taxed at 30% with no set-off' },
  { old: '50AA', new: 'Section 74', kind: 'section', what: 'Gains on specified mutual funds and market-linked debentures as short-term' },

  // ── Capital gains exemptions ─────────────────────────────────────────────
  { old: '54', new: 'Section 82', kind: 'section', what: 'Exemption on sale of a residential house reinvested in a house', refSlug: '54' },
  { old: '54B', new: 'Section 83', kind: 'section', what: 'Exemption on sale of agricultural land reinvested in agricultural land' },
  { old: '54EC', new: 'Section 85', kind: 'section', what: 'Exemption on reinvestment in NHAI and REC bonds within six months' },
  { old: '54F', new: 'Section 86', kind: 'section', what: 'Exemption on sale of any long-term asset reinvested in a house' },

  // ── Returns, assessment and notices ──────────────────────────────────────
  { old: '139(8A)', new: 'Section 263(6)', kind: 'section', what: 'Updated return, ITR-U' },
  { old: '139(9)', new: 'Section 268(1)', kind: 'section', what: 'Defective return notice' },
  { old: '143(1)', new: 'Section 270(1)', kind: 'section', what: 'Intimation after processing a return', refSlug: '143-1' },
  { old: '142(1)', new: 'Section 270', kind: 'section', what: 'Notice calling for information or a return' },
  { old: '143(2)', new: 'Section 280', kind: 'section', what: 'Scrutiny assessment notice' },
  { old: '148 and 148A', new: 'Section 281', kind: 'section', what: 'Reassessment of income escaping assessment', note: 'The supplied mapping lists one new number against both provisions; the split between them needs checking against the notified Act.' },

  // ── Interest and fees ────────────────────────────────────────────────────
  { old: '234C', new: 'Section 425', kind: 'section', what: 'Interest for deferring advance tax instalments' },
  { old: '234F', new: 'Section 428', kind: 'section', what: 'Late filing fee of ₹1,000 or ₹5,000', refSlug: '234f' },

  // ── TDS and TCS ──────────────────────────────────────────────────────────
  { old: '194J', new: 'Section 393(1)', kind: 'section', what: 'TDS on professional and technical fees' },
  { old: '194-IA', new: 'Section 393(1)', kind: 'section', what: 'TDS on purchase of immovable property above ₹50 lakh' },
  { old: '40(b)', new: null, kind: 'section', what: 'Limits on partner remuneration and interest in a firm', note: 'No direct equivalent in the mapping supplied. Treatment under the 2025 Act needs checking before you rely on it.' },

  // ── Forms ────────────────────────────────────────────────────────────────
  { old: 'Form 16', new: 'Form 130', kind: 'form', what: 'Salary TDS certificate issued by an employer', refSlug: 'form-16' },
  { old: 'Form 16A', new: 'Form 131', kind: 'form', what: 'TDS certificate for payments other than salary' },
  { old: 'Form 16B', new: 'Form 132', kind: 'form', what: 'TDS certificate for property purchase, issued by the buyer' },
  { old: 'Form 26AS', new: 'Form 168', kind: 'form', what: 'Annual tax statement of TDS, TCS and tax paid', refSlug: 'form-26as' },
  { old: 'Form 24Q', new: 'Form 138', kind: 'form', what: 'Quarterly TDS return for salary' },
  { old: 'Form 26Q', new: 'Form 140', kind: 'form', what: 'Quarterly TDS return for payments other than salary' },
  { old: 'Form 27Q', new: 'Form 144', kind: 'form', what: 'Quarterly TDS return for payments to non-residents' },
  { old: 'Form 27EQ', new: 'Form 143', kind: 'form', what: 'Quarterly TCS return' },
  { old: 'Form 27D', new: 'Form 133', kind: 'form', what: 'TCS certificate' },
  { old: 'Form 26QB', new: 'Form 141', kind: 'form', what: 'Challan-cum-statement for TDS on property purchase', refSlug: 'form-26qb' },
  { old: 'Form 49B', new: 'Form 134', kind: 'form', what: 'Application for a TAN' },
  { old: 'Form 10F', new: 'Form 41', kind: 'form', what: 'Declaration by a non-resident claiming treaty benefit' },
  { old: 'Form 10-IEA', new: 'Form 10-IEA', kind: 'form', what: 'Option to choose or leave the old regime', refSlug: 'form-10-iea', note: 'Number unchanged in the mapping supplied.' },

  // ── Challans ─────────────────────────────────────────────────────────────
  { old: 'ITNS 281', new: 'ITNS 281N', kind: 'challan', what: 'Challan for depositing TDS and TCS' },
]

const BY_REF_SLUG = new Map(ACT_2025_MAP.filter((e) => e.refSlug).map((e) => [e.refSlug!, e]))
const BY_OLD = new Map(ACT_2025_MAP.map((e) => [e.old.toLowerCase(), e]))

/** Mapping for a /sections or /forms page, by its slug. */
export function act2025ForRef(slug: string) {
  return BY_REF_SLUG.get(slug)
}

/** Mapping by the 1961 reference as written: "80C", "Form 16", "234F". */
export function act2025For(old: string) {
  return BY_OLD.get(old.trim().toLowerCase())
}

export function act2025Of(kind: Act2025Kind) {
  return ACT_2025_MAP.filter((e) => e.kind === kind)
}

/** Every mapping is reported until the Rules are notified. Say so once. */
export const ACT_2025_CAVEAT =
  'Reported from the Act as passed and the draft Rules. Verify against the notified Rules before relying on a number. Returns for AY 2026-27 continue to use the 1961 numbering.'
