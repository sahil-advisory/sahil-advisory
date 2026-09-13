// Single source of truth for brand, contact and legal identity.
// Everything user-facing (footer, JSON-LD, WhatsApp links, metadata) reads
// from here so an owner change is a one-file edit.

// Canonical URLs, the sitemap, robots and every JSON-LD @id are built from
// this, so it must always resolve. Pointing it at a domain that is not
// connected yet tells Google the real page lives at a dead URL, which stops
// the site indexing at all.
//
// Order: an explicit override wins; otherwise fall back to the Vercel
// production domain (always set on Vercel at build time) so a deployment is
// self-consistent before a custom domain exists; localhost for local dev.
// Set NEXT_PUBLIC_BASE_URL once the real domain is live.
function resolveBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_BASE_URL?.trim()
  if (explicit) return explicit.replace(/\/+$/, '')
  const vercelDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
  if (vercelDomain) return `https://${vercelDomain.replace(/^https?:\/\//, '').replace(/\/+$/, '')}`
  return 'http://localhost:3000'
}

export const BASE_URL = resolveBaseUrl()

export const SITE = {
  name: 'Sahil Advisory',
  legalName: 'Sahil Advisory',
  tagline: 'Tax filing and compliance, handled by experts. At prices you can see.',
  shortDescription:
    'Fixed-price ITR, GST, TDS, registrations and notice handling for Indian individuals and small businesses. Verified CMA/CA experts, tracked online, updated on WhatsApp.',
  phoneDisplay: '+91 78884 12302',
  phoneE164: '+917888412302',
  whatsappNumber: '917888412302',
  email: 'sahiladvisory1@gmail.com',
  hours: 'Mon to Sat, 10 AM to 7 PM IST',
  openingHours: 'Mo-Sa 10:00-19:00',
  address: {
    street: 'CHB Flats, Phase 9, Sector 63',
    locality: 'Chandigarh',
    region: 'Chandigarh',
    postalCode: '160047',
    country: 'IN',
    secondOffice: 'Sector 12, Panchkula',
  },
  // Fill these in once the entity / registrations are confirmed by the owner.
  gstin: process.env.NEXT_PUBLIC_COMPANY_GSTIN || '',
  cin: '',
  social: {
    instagram: 'https://www.instagram.com/sahil_advisory',
    facebook: 'https://www.facebook.com/sahiladvisory',
    linkedin: '',
    googleBusiness: '',
  },
  // Current filing season. Bump every April.
  currentFY: '2025-26',
  currentAY: '2026-27',
  // The FY the Income-tax Act 2025 first applies to.
  nextTaxYear: '2026-27',
  // Real number from the practice. Replace with a DB count in Phase 1.
  returnsFiled: 640,
  yearsInPractice: 8,
  googleRating: 5.0,
  googleReviewCount: 3,
} as const

export function whatsappLink(text: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`
}

export const WHATSAPP_DEFAULT = whatsappLink(
  'Hi Sahil Advisory, I want help with my tax filing.'
)

export const FOOTER_DISCLAIMER = `${SITE.legalName} provides tax and compliance services through a panel of independent qualified professionals (CMA / CA / CS). Content on this site is general information, not professional advice; your assigned expert advises on your specific facts. Tax audit and statutory audit services are delivered only by empanelled Chartered Accountants.`
