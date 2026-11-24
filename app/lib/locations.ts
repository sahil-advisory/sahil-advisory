// Local landing pages. Each must carry facts that differ by city (GST state,
// payroll levies, how we meet clients), never the same copy with a new name.
// Only list an office in SITE.address; Mohali has none.
export interface Location {
  slug: string
  city: string
  region: string
  metaTitle: string
  metaDescription: string
  intro: string
  meeting: string
  facts: { label: string; value: string }[]
  notes: { heading: string; text: string }[]
  serviceSlugs: string[]
  faqs: { q: string; a: string }[]
  dateModified: string
}

export const LOCATIONS: Location[] = [
  {
    slug: 'chandigarh', city: 'Chandigarh', region: 'Chandigarh',
    metaTitle: 'Tax Consultant in Chandigarh | ITR, GST, Accounting',
    metaDescription: 'Tax consultant in Chandigarh, Sector 63. ITR from ₹499, GST returns from ₹999 a month, bookkeeping and CMA reports for bank loans by a Cost Accountant.',
    intro: 'Sahil Advisory is a Cost Accountant-led practice in Sector 63, Chandigarh. We file income tax and GST returns, keep books and prepare bank loan reports at published prices.',
    meeting: 'Meet us at the Sector 63 office by appointment, Monday to Saturday, 10 AM to 7 PM, or work with us entirely on WhatsApp and the dashboard.',
    facts: [
      { label: 'GST state code', value: '04' },
      { label: 'Tax on local sales', value: 'CGST and UTGST' },
      { label: 'Professional tax', value: 'Not levied' },
      { label: 'QRMP GSTR-3B', value: '24th after the quarter' },
    ],
    notes: [
      { heading: 'Selling to Mohali or Panchkula is inter-state', text: 'Chandigarh is a union territory, Mohali is in Punjab and Panchkula is in Haryana. A Chandigarh business selling goods across the road to either generally charges IGST, not CGST and UTGST. Using the wrong tax is one of the most common errors in Tricity GST returns.' },
      { heading: 'HRA for Chandigarh employees', text: 'Chandigarh is a 40% city for HRA, in both FY 2025-26 and tax year 2026-27. The exemption is available only in the old regime.' },
    ],
    serviceSlugs: ['itr-salaried', 'itr-capital-gains', 'gst-monthly', 'bookkeeping-monthly', 'cma-project-report', 'gst-notice-reply'],
    faqs: [
      { q: 'Where is your Chandigarh office?', a: 'In the Chandigarh Housing Board Flats, Phase 9, Sector 63, Chandigarh 160047. Please book before visiting.' },
      { q: 'How much does ITR filing cost in Chandigarh?', a: 'A salaried return starts at ₹499 plus GST. Returns with capital gains, business or F&O income cost more and are listed on the pricing page.' },
      { q: 'Is UTGST charged in Chandigarh?', a: 'Yes. On sales within Chandigarh the GST is split between CGST and UTGST. Sales to Punjab or Haryana carry IGST.' },
    ],
    dateModified: '2026-11-24',
  },
  {
    slug: 'panchkula', city: 'Panchkula', region: 'Haryana',
    metaTitle: 'Tax Consultant in Panchkula | ITR, GST, TDS, Loans',
    metaDescription: 'Tax consultant in Panchkula, Sector 12. ITR and GST filing at fixed prices, TDS, payroll, and CMA reports for business loans, by a Cost Accountant-led team.',
    intro: 'From Sector 12, Panchkula, we handle income tax, GST, TDS, payroll and bank loan reports for salaried families, traders and small manufacturers.',
    meeting: 'Meetings in Sector 12 are by appointment. Documents and approvals can all be handled online.',
    facts: [
      { label: 'GST state code', value: '06 (Haryana)' },
      { label: 'Tax on local sales', value: 'CGST and Haryana SGST' },
      { label: 'Professional tax', value: 'Not levied' },
      { label: 'QRMP GSTR-3B', value: '24th after the quarter' },
    ],
    notes: [
      { heading: 'A second branch can mean a second GSTIN', text: 'GST registration is state by state. A Panchkula business that opens a shop or godown in Chandigarh or Mohali needs a registration there, and stock moved between the two is a taxable supply between distinct persons.' },
      { heading: 'Loans for units in the Panchkula and Barwala belt', text: 'Banks size a cash credit limit on turnover, stock and debtors. We prepare the CMA data from your Haryana GST returns and books, so the sales in the proposal agree with what the bank sees on the portal.' },
    ],
    serviceSlugs: ['gst-registration', 'gst-monthly', 'itr-business', 'payroll-processing', 'working-capital-loan', 'cma-project-report'],
    faqs: [
      { q: 'Do you have an office in Panchkula?', a: 'Yes, in Sector 12, by appointment. The main office is in Sector 63, Chandigarh.' },
      { q: 'Is GST the same in Panchkula and Chandigarh?', a: 'The rates are the same. Panchkula sales within Haryana carry CGST and SGST, while sales to Chandigarh or Mohali are inter-state and carry IGST.' },
      { q: 'Do Panchkula employers deduct professional tax?', a: 'No. Haryana does not levy professional tax. PF and ESI apply as usual once an employer is covered.' },
    ],
    dateModified: '2026-11-24',
  },
  {
    slug: 'mohali', city: 'Mohali', region: 'Punjab',
    metaTitle: 'Tax Consultant for Mohali | ITR, GST, Startups, NRI',
    metaDescription: 'Tax consultant for Mohali businesses, startups, IT staff and NRIs. ITR, GST, payroll and company registration at fixed prices, from nearby Sector 63 Chandigarh.',
    intro: 'We serve Mohali (SAS Nagar) from our office in Sector 63, Chandigarh: startups, IT professionals, exporters of services and NRI families.',
    meeting: 'We do not have an office in Mohali. The Sector 63 office in Chandigarh takes appointments, and everything can be handled online.',
    facts: [
      { label: 'GST state code', value: '03 (Punjab)' },
      { label: 'Tax on local sales', value: 'CGST and Punjab SGST' },
      { label: 'Payroll levy', value: 'Punjab State Development Tax' },
      { label: 'QRMP GSTR-3B', value: '24th after the quarter' },
    ],
    notes: [
      { heading: 'IT exporters and freelancers', text: 'Services to overseas clients can be zero-rated when the export conditions are met. Supplying without paying IGST needs a Letter of Undertaking for the year. Remote employees with foreign company shares must also report them in their income tax return.' },
      { heading: 'Punjab State Development Tax', text: 'Punjab has a State Development Tax law of its own, unlike Chandigarh and Haryana. An employer with staff in Mohali should confirm its registration and current deduction on the state portal.' },
    ],
    serviceSlugs: ['itr-salaried-plus', 'itr-freelancer', 'itr-nri', 'gst-registration', 'pvt-ltd-incorporation', 'global-accounting'],
    faqs: [
      { q: 'Do you have an office in Mohali?', a: 'No. We serve Mohali clients from Sector 63, Chandigarh, and online.' },
      { q: 'My client is in Chandigarh and I am in Mohali. Which GST applies?', a: 'Usually IGST, because Punjab and Chandigarh are different for GST even though they adjoin. Place of supply rules decide some services, such as those tied to a property or event.' },
      { q: 'Can you file returns for NRIs with property in Mohali?', a: 'Yes. We handle rent and sale of Indian property, TDS credits and treaty relief, fully online.' },
    ],
    dateModified: '2026-11-24',
  },
]

export function getLocation(slug: string) {
  return LOCATIONS.find((l) => l.slug === slug)
}
export function locationPath(l: Pick<Location, 'slug'>) {
  return `/locations/${l.slug}`
}
