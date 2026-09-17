// Panel of professionals. Photos, membership numbers and bios are
// placeholders until the owner supplies real ones (docs/PROJECT.md §Open).
// Never invent credentials: the CMA lead is real; CA partner entries must be
// confirmed before publish and stay hidden until then.

export interface Expert {
  slug: string
  name: string
  // The professional body membership shown as the badge. 'Consultant' is a
  // practitioner without a statutory signing credential; never show such a
  // person as a CA or CMA.
  credential: 'CMA' | 'CA' | 'CS' | 'GSTP' | 'Consultant'
  credentialLabel: string
  title: string
  years: number
  // Degrees and other qualifications, shown as chips.
  qualifications: string[]
  specialisations: string[]
  languages: string[]
  bio: string
  photo?: string
  knowsAbout: string[]
  isPublished: boolean
}

export const EXPERTS: Expert[] = [
  {
    slug: 'sahil',
    name: 'CMA Sahil',
    credential: 'CMA',
    credentialLabel: 'Cost and Management Accountant (ICMAI)',
    title: 'Cost and Management Accountant, Lead Tax Expert',
    years: 8,
    qualifications: ['CMA'],
    specialisations: ['Income tax returns', 'GST compliance', 'Project report & CMA data for bank loans', 'MSME and startup advisory'],
    languages: ['English', 'Hindi', 'Punjabi'],
    bio: 'Fellow-track member of the Institute of Cost Accountants of India with eight years in tax, GST and business advisory for individuals, traders and small businesses across Chandigarh, Panchkula and Mohali. Reviews every return before it is filed.',
    knowsAbout: ['Income tax', 'GST', 'TDS', 'Cost accounting', 'Project reports', 'MSME finance'],
    isPublished: true,
  },
  {
    slug: 'amit-jain',
    name: 'Amit Jain',
    credential: 'Consultant',
    credentialLabel: 'Tax and Accounting Consultant',
    title: 'Senior Tax and Accounting Consultant',
    years: 15,
    qualifications: ['MBA Finance', 'LLB'],
    specialisations: ['Taxation', 'Accounting', 'Books of account and finalisation', 'Tax notices and representation groundwork'],
    languages: ['English', 'Hindi', 'Punjabi'],
    bio: 'Fifteen years in taxation and accounting for individuals, traders and small businesses, with an MBA in Finance and a law degree. Prepares computations and books, reconciles them with AIS, 26AS and GST data, and drafts the groundwork for notice replies. Every filing he prepares is reviewed by the panel before it goes out.',
    knowsAbout: ['Income tax', 'Accounting', 'Bookkeeping', 'GST', 'Tax notices', 'Corporate law basics'],
    isPublished: true,
  },
]

export function publishedExperts() {
  return EXPERTS.filter((e) => e.isPublished)
}
export function getExpert(slug: string) {
  return EXPERTS.find((e) => e.slug === slug && e.isPublished)
}
export const REVIEWER = EXPERTS[0]
