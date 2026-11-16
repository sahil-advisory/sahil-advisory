import type { Guide } from '../types'

export const guide: Guide = {
  slug: 'gst-registration-guide',
  cluster: 'gst',
  title: 'GST Registration Online 2026: Documents, Threshold, Fees, Process and Penalty',
  h1: 'GST Registration Online 2026: Documents, Threshold, Fees, Process and Penalty',
  metaTitle: 'GST Registration Online 2026: Threshold, Documents, Fees',
  metaDescription:
    'Who must register for GST in 2026: ₹40 lakh goods and ₹20 lakh services limits, mandatory cases, documents, portal steps, timelines and the penalty for delay.',
  keywords: [
    'gst registration online',
    'gst registration threshold limit',
    'documents required for gst registration',
    'gst registration process',
    'gst registration fees',
    'composition scheme gst',
    'voluntary gst registration',
    'penalty for not registering under gst',
    'gst registration for e-commerce sellers',
  ],
  excerpt:
    'Everything a new business needs before applying for a GSTIN: thresholds, mandatory registration cases, documents by entity type, the portal process with Aadhaar authentication, timelines, composition scheme and what non-registration costs.',
  datePublished: '2026-09-06',
  dateModified: '2026-11-16',
  readMinutes: 11,
  sections: [
    {
      type: 'key-takeaways',
      items: [
        'Registration is compulsory when aggregate turnover crosses ₹40 lakh for goods or ₹20 lakh for services (₹10 lakh in the special category states of Manipur, Mizoram, Nagaland and Tripura).',
        'Some businesses must register from the first rupee: inter-state suppliers of goods, sellers on e-commerce platforms with tax collected at source, and anyone paying tax under reverse charge.',
        'The government charges no fee. Aadhaar-authenticated applications are normally approved within 7 working days; others go for physical verification and can take up to 30 days.',
        'Operating without registration after crossing the threshold attracts a penalty of ₹10,000 or 10% of the tax due, whichever is higher, along with the tax and 18% interest.',
      ],
    },
    {
      type: 'stat-grid',
      stats: [
        { label: 'Goods threshold', value: '₹40 lakh', note: 'Aggregate turnover, exclusive suppliers of goods' },
        { label: 'Services threshold', value: '₹20 lakh', note: '₹10 lakh in special category states' },
        { label: 'Approval time', value: '7 working days', note: 'With Aadhaar authentication and no risk flag' },
        { label: 'Composition limit', value: '₹1.5 crore', note: '₹50 lakh for service providers under 10(2A)' },
      ],
    },
    {
      type: 'tool-card',
      calculatorSlug: 'gst',
      text: 'Once registered you must charge GST on every invoice. See how 5%, 18% or 40% changes your selling price before you decide on voluntary registration.',
    },
    { type: 'heading', text: 'Who must register: the turnover thresholds', id: 'threshold-limits' },
    {
      type: 'paragraph',
      text: 'Section 22 of the CGST Act requires registration once aggregate turnover in a financial year crosses the threshold. Aggregate turnover is computed on a PAN basis across all states and includes taxable, exempt and export supplies, but excludes GST itself and inward supplies taxed under reverse charge.',
    },
    {
      type: 'table',
      head: ['Nature of supply', 'Normal states', 'Special category states'],
      rows: [
        ['Exclusively goods', '₹40 lakh', '₹10 lakh (Manipur, Mizoram, Nagaland, Tripura); ₹20 lakh in others'],
        ['Services, or goods and services', '₹20 lakh', '₹10 lakh (Manipur, Mizoram, Nagaland, Tripura); ₹20 lakh in others'],
        ['Ice cream, pan masala, tobacco (goods)', '₹20 lakh', '₹10 lakh'],
      ],
      caption: 'Registration thresholds under section 22 and notification 10/2019',
    },
    {
      type: 'paragraph',
      text: 'The ₹40 lakh goods limit does not apply in a handful of states that opted to keep ₹20 lakh, including Uttarakhand, Telangana, Puducherry, Sikkim, Arunachal Pradesh and Meghalaya. A business in Haryana, Punjab or Chandigarh selling only goods gets the full ₹40 lakh limit. Once the threshold is crossed you have 30 days to apply.',
    },
    { type: 'heading', text: 'Cases where registration is mandatory from day one', id: 'mandatory-registration' },
    {
      type: 'paragraph',
      text: 'Section 24 overrides the threshold for certain categories. If you fall into any of these, turnover does not matter and you must register before making the first supply.',
    },
    {
      type: 'list',
      items: [
        'Inter-state supply of goods. Inter-state supply of services is exempt from compulsory registration up to ₹20 lakh.',
        'Selling goods through an e-commerce operator that collects TCS, such as Amazon or Flipkart. Since 1 October 2023, intra-state sellers of goods below the threshold can instead obtain an enrolment number and sell without full registration, provided they do not sell across state lines.',
        'Persons liable to pay tax under reverse charge, for example a business receiving legal services from an advocate or goods transport services.',
        'Casual taxable persons and non-resident taxable persons, such as an exhibitor at a trade fair in another state.',
        'Agents supplying on behalf of a principal, input service distributors, and persons required to deduct TDS or collect TCS under GST.',
        'Suppliers of online information and database services (OIDAR) from outside India to unregistered persons in India.',
      ],
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Freelancers and exporters of services',
      text: 'A freelancer billing foreign clients is making a zero-rated export of services. Registration is not compulsory below ₹20 lakh, but it is the only way to file a Letter of Undertaking, export without paying IGST and claim refund of input tax credit. Many freelancers register voluntarily for this reason.',
    },
    { type: 'heading', text: 'Documents required by entity type', id: 'documents-required' },
    {
      type: 'paragraph',
      text: 'The portal rejects a surprising number of applications for document problems: an electricity bill older than two months, a rent agreement without an NOC, or a photograph in the wrong format. Assemble the set below before you start Part B of the application.',
    },
    {
      type: 'table',
      head: ['Document', 'Proprietorship', 'Partnership / LLP', 'Company'],
      rows: [
        ['PAN', 'Of the proprietor', 'Of the firm and all partners', 'Of the company and all directors'],
        ['Aadhaar', 'Of the proprietor', 'Of partners and authorised signatory', 'Of directors and authorised signatory'],
        ['Photograph (JPEG, under 100 KB)', 'Proprietor', 'All partners', 'All directors'],
        ['Constitution proof', 'Not required', 'Partnership deed or LLP certificate', 'Certificate of incorporation'],
        ['Authorisation', 'Not required', 'Authorisation letter for signatory', 'Board resolution for signatory'],
        ['Principal place of business', 'Electricity bill or property tax receipt; rent agreement plus NOC if rented', 'Same', 'Same'],
        ['Bank proof', 'Cancelled cheque or statement (can be added within 30 days of registration)', 'Same', 'Same'],
        ['Digital signature', 'Not required (EVC works)', 'Not required for partnership; DSC for LLP', 'Class 3 DSC of a director'],
      ],
      caption: 'Documents for GST registration, 2026',
    },
    {
      type: 'paragraph',
      text: 'Bank account details can be furnished after the GSTIN is allotted, but rule 10A requires them within 30 days of registration or before filing the first GSTR-1, whichever is earlier. Missing this suspends the registration.',
    },
    { type: 'heading', text: 'Step-by-step process on the GST portal', id: 'registration-process' },
    {
      type: 'list',
      ordered: true,
      items: [
        'Go to gst.gov.in, choose Services, Registration, New Registration. Select the taxpayer type, state and district, enter the legal name as per PAN, PAN, mobile and email. Verify both OTPs to receive a Temporary Reference Number (TRN).',
        'Log in with the TRN and complete Part B, which has ten tabs: business details, promoters or partners, authorised signatory, authorised representative, principal place of business, additional places, goods and services, state-specific information, Aadhaar authentication and verification.',
        'Enter at least one HSN code for goods or SAC code for services. Pick the codes that match your actual supplies, since they decide the rate schedule shown on your returns.',
        'Choose whether to opt for the composition scheme on the business details tab. This choice cannot be changed mid-year once the first return is filed.',
        'Complete Aadhaar authentication for the promoters and authorised signatory through the OTP link sent to the Aadhaar-linked mobile. Applicants flagged as high risk are directed to a GST Suvidha Kendra for biometric authentication.',
        'Submit with DSC (compulsory for companies and LLPs) or EVC. You receive an Application Reference Number (ARN) by email and SMS.',
        'Track the ARN. If the officer raises a query in form REG-03, reply in REG-04 within 7 working days. On approval, download the registration certificate in REG-06 from the portal.',
      ],
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Common reasons for rejection',
      text: 'Mismatch between the name on PAN and the application, address proof not in the name of the owner or the landlord, an NOC without the landlord signature, a residential address without supporting rent agreement, and unreadable scans. Each query adds a week to the timeline, so check these before submitting.',
    },
    { type: 'heading', text: 'Timelines: 7 working days, or up to 30', id: 'timelines' },
    {
      type: 'paragraph',
      text: 'Rule 9 gives the officer 7 working days from the ARN date to approve or query an application where Aadhaar authentication is completed and the applicant is not flagged by the risk system. If no action is taken in that time, registration is deemed approved.',
    },
    {
      type: 'paragraph',
      text: 'Where Aadhaar authentication is not done, or the applicant is flagged, the officer may order physical verification of the premises and the time limit extends to 30 days. ',
    },
    {
      type: 'table',
      head: ['Scenario', 'Time limit', 'Outcome if no action'],
      rows: [
        ['Aadhaar authenticated, not flagged', '7 working days', 'Deemed approved'],
        ['Officer issues REG-03 query', 'Reply within 7 working days', 'Rejection if no reply'],
        ['After REG-04 reply', '7 working days', 'Deemed approved'],
        ['Aadhaar not authenticated or flagged', '30 days with physical verification', 'Deemed approved after 30 days'],
      ],
      caption: 'Registration timelines under rule 9',
    },
    {
      type: 'paragraph',
      text: 'Since 1 November 2025 there is also a faster, optional route under rule 14A. An applicant who expects output tax on supplies to registered businesses of no more than ₹2.5 lakh a month, and completes Aadhaar authentication, is granted registration within 3 working days. Most new freelancers, small traders and service providers qualify. The option can be withdrawn later if supplies grow beyond the limit.',
    },
    {
      type: 'paragraph',
      text: 'The effective date of registration is the date you became liable, if you applied within 30 days of that date. Apply later and the effective date is the date of grant, which means you cannot collect GST from customers or claim credit for the gap period. Stock and inputs held on the effective date qualify for credit through form ITC-01 filed within 30 days.',
    },
    { type: 'heading', text: 'Composition scheme: lower tax, less paperwork, real limits', id: 'composition-scheme' },
    {
      type: 'paragraph',
      text: 'Section 10 lets small businesses with aggregate turnover up to ₹1.5 crore (₹75 lakh in special category states) pay tax at a flat rate on turnover instead of charging GST on each invoice. Service providers can use the parallel scheme under section 10(2A) up to ₹50 lakh. You file CMP-08 quarterly by the 18th and GSTR-4 annually by 30 June.',
    },
    {
      type: 'table',
      head: ['Business', 'Composition rate', 'Turnover limit'],
      rows: [
        ['Manufacturers', '1% of turnover (0.5% CGST + 0.5% SGST)', '₹1.5 crore'],
        ['Traders', '1% of taxable turnover', '₹1.5 crore'],
        ['Restaurants (not serving alcohol)', '5% of turnover', '₹1.5 crore'],
        ['Service providers and mixed suppliers', '6% of turnover', '₹50 lakh'],
      ],
      caption: 'Composition rates for FY 2026-27',
    },
    {
      type: 'list',
      items: [
        'You cannot collect GST from customers or claim input tax credit. The tax is a cost to you.',
        'No inter-state outward supplies. Intra-state sales through e-commerce platforms are allowed for goods since October 2023.',
        'Every invoice must say "composition taxable person, not eligible to collect tax on supplies".',
        'Manufacturers of ice cream, pan masala and tobacco cannot opt in.',
        'The scheme suits B2C shops and restaurants with low input credit. It rarely suits B2B businesses whose customers want credit.',
      ],
    },
    {
      type: 'example',
      title: 'Composition versus regular scheme for a kirana store',
      lines: [
        { label: 'Annual turnover, all B2C, mostly 18% goods', value: '₹80,00,000' },
        { label: 'Purchases with GST at 18% (₹60 lakh base)', value: '₹10,80,000 ITC available in regular scheme' },
        { label: 'Regular scheme: output GST on ₹80 lakh at 18%', value: '₹14,40,000' },
        { label: 'Regular scheme: net cash GST (14,40,000 minus 10,80,000)', value: '₹3,60,000' },
        { label: 'Composition: 1% of ₹80 lakh, plus ₹10,80,000 ITC lost as cost', value: '₹80,000 tax, ₹10,80,000 cost' },
        { label: 'Composition is cheaper only if prices stay GST-inclusive; here regular scheme wins by', value: '₹8,00,000', strong: true },
      ],
    },
    { type: 'heading', text: 'Voluntary registration: pros and cons', id: 'voluntary-registration' },
    {
      type: 'paragraph',
      text: 'Section 25(3) allows anyone to register voluntarily. Once registered, every provision of the Act applies as if you had crossed the threshold, so the decision should be made on the basis of your customers, not your turnover.',
    },
    {
      type: 'table',
      head: ['Advantages', 'Disadvantages'],
      rows: [
        ['Claim input tax credit on purchases, rent, software and equipment', 'Must charge GST on every sale, which raises prices for B2C customers'],
        ['B2B customers prefer registered vendors so they can claim credit', 'Monthly or quarterly returns even with no sales, and ₹20 a day late fee for missed nil returns'],
        ['Required to sell on most e-commerce marketplaces and to export under LUT', 'Books, invoices and e-way bills must follow GST rules'],
        ['Adds credibility for bank loans, tenders and vendor onboarding', 'Cancellation later requires a final return in GSTR-10 and reversal of credit on stock'],
      ],
      caption: 'Weighing voluntary GST registration',
    },
    {
      type: 'service-card',
      serviceSlug: 'gst-registration',
      text: 'We select the right scheme and HSN or SAC codes, format the documents so the application is not queried, handle Aadhaar authentication and REG-03 replies, and share a compliance calendar the day your GSTIN arrives.',
    },
    { type: 'heading', text: 'Penalty for not registering', id: 'penalty-for-non-registration' },
    {
      type: 'paragraph',
      text: 'Operating above the threshold without a GSTIN means the department can demand the tax you should have collected, with interest at 18% per annum, plus penalty. Under section 73, for a lapse without fraud, the penalty is 10% of the tax due or ₹10,000, whichever is higher. Where the failure is treated as wilful evasion under section 74, the penalty is 100% of the tax. Section 122(1)(xi) separately prescribes ₹10,000 or the tax evaded, whichever is higher, for failing to register when liable.',
    },
    {
      type: 'example',
      title: 'Service provider who ignored the ₹20 lakh threshold',
      lines: [
        { label: 'Receipts in FY 2025-26', value: '₹32,00,000' },
        { label: 'Receipts above the ₹20 lakh threshold, treated as inclusive of 18% GST', value: '₹12,00,000' },
        { label: 'GST payable (12,00,000 x 18 / 118)', value: '₹1,83,051' },
        { label: 'Interest at 18% for roughly 12 months', value: '₹32,949' },
        { label: 'Penalty under section 73 (10% of tax, minimum ₹10,000)', value: '₹18,305' },
        { label: 'Total demand, with no credit for the GST paid on inputs', value: '₹2,34,305', strong: true },
      ],
    },
    {
      type: 'paragraph',
      text: 'The tax cannot be recovered from customers after the event, so the entire amount comes out of your margin. Applying within 30 days of crossing the threshold avoids all of it.',
    },
    { type: 'heading', text: 'What to do next', id: 'what-to-do-next' },
    {
      type: 'paragraph',
      text: 'Add up your receipts for the current year across all states and all activities. If you are near ₹20 lakh for services or ₹40 lakh for goods, or you sell inter-state or on a marketplace, collect the documents in the table above and apply now. If you are below the threshold, decide voluntary registration based on whether your customers are businesses. An expert-assisted application typically clears in 3 to 7 working days without a query.',
    },
  ],
  faqs: [
    {
      q: 'What is the GST registration threshold limit in 2026?',
      a: '₹40 lakh aggregate turnover for businesses supplying only goods and ₹20 lakh for services or mixed supplies. In the special category states of Manipur, Mizoram, Nagaland and Tripura the limit is ₹10 lakh. Some states such as Uttarakhand and Telangana kept ₹20 lakh for goods.',
    },
    {
      q: 'Is there any government fee for GST registration?',
      a: 'No. The government charges nothing for a normal registration. Professional fees for preparing and filing the application typically range from ₹1,000 to ₹2,500, and a Class 3 DSC for companies costs about ₹1,500.',
    },
    {
      q: 'How many days does GST registration take?',
      a: '3 working days under the simplified rule 14A route, available since 1 November 2025 to Aadhaar-authenticated applicants whose output tax on B2B supplies will not exceed ₹2.5 lakh a month. Otherwise 7 working days from the ARN date where Aadhaar authentication is completed and the application is not flagged, and up to 30 days if a query is raised or physical verification is ordered.',
    },
    {
      q: 'Which documents are needed for GST registration of a proprietorship?',
      a: 'PAN and Aadhaar of the proprietor, a passport-size photograph, proof of the business premises (electricity bill or property tax receipt, with rent agreement and NOC if rented), and a cancelled cheque or bank statement, which can be added within 30 days.',
    },
    {
      q: 'Is GST registration compulsory for selling on Amazon or Flipkart?',
      a: 'Yes for sellers of goods through a platform that collects TCS, regardless of turnover. Since October 2023, intra-state sellers below the threshold can use an enrolment number instead of full registration, but only if they do not sell inter-state.',
    },
    {
      q: 'What is the penalty for not registering under GST?',
      a: 'The tax due plus 18% interest, and a penalty of 10% of the tax or ₹10,000, whichever is higher, under section 73. Where evasion is deliberate the penalty is 100% of the tax. Section 122 also prescribes ₹10,000 or the tax evaded for failure to register.',
    },
    {
      q: 'Who can opt for the GST composition scheme?',
      a: 'Manufacturers, traders and restaurants with aggregate turnover up to ₹1.5 crore, and service providers up to ₹50 lakh. They pay 1%, 5% or 6% of turnover, cannot collect GST or claim credit, and cannot make inter-state supplies.',
    },
    {
      q: 'Can I register for GST voluntarily below the threshold?',
      a: 'Yes, under section 25(3). Once registered, all provisions apply: you must charge GST, file returns every period and can claim input tax credit. It suits businesses with B2B customers, exporters and marketplace sellers.',
    },
    {
      q: 'Do I need a separate GST registration for each state?',
      a: 'Yes. Registration is state-wise. A business with premises in Haryana and Punjab needs two GSTINs under the same PAN. Multiple branches within one state can be covered under one GSTIN as additional places of business.',
    },
  ],
  relatedServiceSlug: 'gst-registration',
  relatedGuides: ['gst-return-filing-guide', 'llp-vs-pvt-ltd', 'itr-filing-guide-ay-2026-27'],
  relatedCalculators: ['gst', 'income-tax'],
}
