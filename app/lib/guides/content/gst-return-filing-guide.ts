import type { Guide } from '../types'

export const guide: Guide = {
  slug: 'gst-return-filing-guide',
  cluster: 'gst',
  title: 'GST Return Filing Guide: GSTR-1, GSTR-3B, QRMP, IMS and Due Dates',
  h1: 'GST Return Filing Guide: GSTR-1, GSTR-3B, QRMP, IMS and Due Dates',
  metaTitle: 'GST Return Filing Guide: GSTR-1, 3B, QRMP, IMS, Due Dates',
  metaDescription:
    'Which GST returns to file and when: GSTR-1 by the 11th, GSTR-3B by the 20th, QRMP dates, GSTR-2B reconciliation, ₹50 a day late fee and GSTR-9 thresholds.',
  keywords: [
    'gst return filing',
    'gstr 1 due date',
    'gstr 3b due date',
    'qrmp scheme',
    'invoice management system gst',
    'gstr 2b reconciliation',
    'gst late fee per day',
    'gstr 9 applicability',
    'gst return filing process',
  ],
  excerpt:
    'A plain-language map of GST returns for regular, QRMP and composition taxpayers: what to file, the due dates, how IMS and GSTR-2B decide your input tax credit, and what late filing costs.',
  datePublished: '2026-09-06',
  dateModified: '2026-11-16',
  readMinutes: 11,
  sections: [
    {
      type: 'key-takeaways',
      items: [
        'Regular taxpayers file GSTR-1 by the 11th and GSTR-3B by the 20th of the next month. Under QRMP you file both quarterly (13th, and 22nd or 24th) but pay tax monthly by the 25th through PMT-06.',
        'Input tax credit is allowed only for invoices that appear in GSTR-2B, and GSTR-2B is now built from the actions you take in the Invoice Management System (IMS).',
        'Late fee is ₹50 per day (₹20 per day for a nil return) per return, and late tax payment carries 18% interest per annum. Nil returns are compulsory even with zero business.',
        'GSTR-9 annual return is mandatory above ₹2 crore turnover, GSTR-9C above ₹5 crore, both due 31 December. GSTR-3B cannot be revised, so reconcile before you file.',
      ],
    },
    {
      type: 'stat-grid',
      stats: [
        { label: 'GSTR-1 monthly', value: '11th', note: 'Of the following month' },
        { label: 'GSTR-3B monthly', value: '20th', note: 'QRMP: 22nd or 24th after the quarter' },
        { label: 'Late fee', value: '₹50/day', note: '₹20/day for nil returns, per return' },
        { label: 'Interest on late tax', value: '18% p.a.', note: 'On net cash liability, from the due date' },
      ],
    },
    {
      type: 'tool-card',
      calculatorSlug: 'gst',
      text: 'Check the CGST, SGST or IGST split on any invoice before it goes into GSTR-1.',
    },
    { type: 'heading', text: 'Who files which GST return', id: 'who-files-what' },
    {
      type: 'paragraph',
      text: 'Every GSTIN has a filing profile decided by its scheme and turnover. Regular taxpayers with aggregate turnover above ₹5 crore file monthly. Those up to ₹5 crore can choose the Quarterly Return Monthly Payment scheme. Composition dealers file a quarterly statement and one annual return. Getting the profile right on day one avoids paying for returns you do not need.',
    },
    {
      type: 'table',
      head: ['Taxpayer type', 'Returns', 'Frequency', 'Due date'],
      rows: [
        ['Regular, turnover above ₹5 crore (or opted monthly)', 'GSTR-1, GSTR-3B', 'Monthly', '11th and 20th of next month'],
        ['Regular, QRMP (turnover up to ₹5 crore)', 'GSTR-1, GSTR-3B, PMT-06', 'Quarterly returns, monthly payment', '13th; 22nd or 24th; PMT-06 by 25th'],
        ['Composition dealer', 'CMP-08, GSTR-4', 'Quarterly, annual', '18th after quarter; 30 June'],
        ['Regular, turnover above ₹2 crore', 'GSTR-9', 'Annual', '31 December'],
        ['Regular, turnover above ₹5 crore', 'GSTR-9C with GSTR-9', 'Annual', '31 December'],
        ['Cancelled registration', 'GSTR-10', 'Once', 'Within 3 months of cancellation'],
        ['TDS or TCS deductor under GST', 'GSTR-7, GSTR-8', 'Monthly', '10th of next month'],
      ],
      caption: 'GST return calendar for FY 2026-27',
    },
    { type: 'heading', text: 'GSTR-1: reporting your sales', id: 'gstr-1' },
    {
      type: 'paragraph',
      text: 'GSTR-1 is the statement of outward supplies. It carries every B2B invoice with the buyer GSTIN, B2C sales in summary, exports, credit and debit notes, advances received and an HSN-wise summary. What you file here flows to your customers as their GSTR-2B, so a wrong GSTIN or a missed invoice blocks their credit and comes back as a phone call.',
    },
    {
      type: 'list',
      items: [
        'B2B invoices: invoice-wise, with GSTIN, taxable value, rate and place of supply.',
        'B2C large: inter-state invoices above ₹1 lakh to unregistered buyers, invoice-wise.',
        'B2C others: consolidated by state and rate.',
        'Credit and debit notes: linked to the original invoice, with the reason.',
        'HSN summary: mandatory 6-digit codes for turnover above ₹5 crore and 4-digit below.',
        'GSTR-1A: an optional amendment window after GSTR-1 and before GSTR-3B, for corrections in the same period.',
      ],
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Auto-populated liability in GSTR-3B',
      text: 'The outward tax shown in GSTR-3B is auto-filled from GSTR-1 and, from the July 2025 tax period, is locked for editing. Corrections have to go through GSTR-1A before you file 3B, which is why the two returns must be prepared together.',
    },
    { type: 'heading', text: 'GSTR-3B: paying the tax', id: 'gstr-3b' },
    {
      type: 'paragraph',
      text: 'GSTR-3B is the self-assessed summary return where you declare total outward tax, claim input tax credit and pay the net amount. It cannot be revised. Any error is corrected in a later period, and if the correction increases tax, interest runs from the original due date. That single fact is the reason every filing should start with a reconciliation, not end with one.',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Table 3.1: outward taxable supplies, zero-rated, exempt and reverse charge inward supplies.',
        'Table 4: eligible ITC as per GSTR-2B, ITC reversed under rules 42 and 43, ineligible ITC under section 17(5) and reclaimed ITC.',
        'Table 5: exempt and non-GST inward supplies.',
        'Table 6.1: payment of tax, using ITC first and cash from the electronic cash ledger for the balance.',
      ],
    },
    {
      type: 'paragraph',
      text: 'If your GSTR-3B liability is lower than the GSTR-1 figure by more than 20% and ₹25 lakh, the portal issues an intimation in DRC-01B under rule 88C. If ITC claimed in 3B exceeds GSTR-2B beyond the tolerance, DRC-01C under rule 88D follows. Both need a reply within 7 days or payment.',
    },
    { type: 'heading', text: 'QRMP: quarterly returns with monthly payment', id: 'qrmp' },
    {
      type: 'paragraph',
      text: 'The QRMP scheme cuts filings from 24 to 8 a year for taxpayers with aggregate turnover up to ₹5 crore in the previous financial year. You file GSTR-1 and GSTR-3B once a quarter but must still pay tax for the first two months by the 25th of the next month through form PMT-06.',
    },
    {
      type: 'table',
      head: ['Item', 'Monthly scheme', 'QRMP scheme'],
      rows: [
        ['GSTR-1', '11th of next month', '13th of the month after the quarter'],
        ['Invoice Furnishing Facility (IFF)', 'Not applicable', 'Optional, B2B invoices up to ₹50 lakh per month, by the 13th'],
        ['GSTR-3B', '20th of next month', '22nd (Group A states) or 24th (Group B states) after the quarter'],
        ['Tax payment', 'With 3B by the 20th', 'PMT-06 by the 25th for months 1 and 2; balance with 3B'],
        ['Payment method', 'Self-assessed', 'Fixed sum (35% of last quarter) or self-assessment'],
        ['Filings per year', '24', '8 plus PMT-06 challans'],
      ],
      caption: 'Monthly versus QRMP for FY 2026-27',
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Which 3B date applies to you',
      text: 'Group B, with the 24th, covers Haryana, Punjab, Himachal Pradesh, Chandigarh, Delhi, Uttar Pradesh, Uttarakhand, Rajasthan, Bihar, West Bengal, the north-eastern states, Jammu and Kashmir, Ladakh, Odisha and Jharkhand. Group A, with the 22nd, covers Maharashtra, Gujarat, Karnataka, the southern states, Madhya Pradesh, Chhattisgarh, Goa and the island territories.',
    },
    {
      type: 'paragraph',
      text: 'Use the IFF if your B2B customers need credit every month. Without it, a buyer who purchased from you in April sees the invoice in GSTR-2B only after your quarterly GSTR-1 in July. Larger buyers often insist on monthly IFF uploads from QRMP vendors for this reason.',
    },
    { type: 'heading', text: 'IMS and GSTR-2B: how your input tax credit is decided', id: 'ims-and-2b' },
    {
      type: 'paragraph',
      text: 'Section 16(2)(aa) allows ITC only on invoices that your supplier has reported in their GSTR-1 and that appear in your GSTR-2B. The Invoice Management System on the GST portal sits between the two. Every invoice, credit note and amendment uploaded by a supplier lands in your IMS dashboard, where you accept, reject or keep it pending.',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Suppliers file GSTR-1 or IFF by the 11th or 13th. Their invoices appear in your IMS in near real time.',
        'Review each record against your purchase register. Accept genuine invoices, reject ones that are not yours or are wrong, keep pending those where goods have not arrived.',
        'GSTR-2B is generated on the 14th from accepted and no-action records. Pending records are excluded until you accept them. Rejected records never enter 2B.',
        'If you take IMS actions after the 14th, recompute GSTR-2B from the IMS screen before filing GSTR-3B.',
        'GSTR-3B Table 4 auto-fills from GSTR-2B. Claim only what is in 2B and eligible under section 16 and 17(5).',
      ],
    },
    {
      type: 'example',
      title: 'Monthly ITC reconciliation for a trading firm',
      lines: [
        { label: 'ITC as per purchase register', value: '₹2,40,000' },
        { label: 'ITC as per GSTR-2B after IMS actions', value: '₹2,10,000' },
        { label: 'Difference: two suppliers have not filed GSTR-1', value: '₹30,000' },
        { label: 'ITC claimed in GSTR-3B this month', value: '₹2,10,000', strong: true },
        { label: 'ITC to claim when suppliers file, tracked in follow-up list', value: '₹30,000', strong: true },
      ],
    },
    {
      type: 'paragraph',
      text: 'Credit claimed in 3B but missing from 2B is the single largest source of GST notices in ASMT-10 and DRC-01C. Reversal with 18% interest, or 24% where the excess credit was utilised, is the usual outcome. A monthly 2B versus books matching exercise costs far less than that.',
    },
    { type: 'heading', text: 'Late fees, interest and what happens if you stop filing', id: 'late-fees-and-interest' },
    {
      type: 'paragraph',
      text: 'Late fee under section 47 is ₹50 per day of delay for each of GSTR-1 and GSTR-3B, split equally between CGST and SGST. For a nil return it is ₹20 per day. Caps depend on turnover: ₹2,000 for turnover up to ₹1.5 crore, ₹5,000 for ₹1.5 to ₹5 crore and ₹10,000 above that, with a ₹500 cap for nil returns. Interest under section 50 is 18% per annum on the net cash tax paid late, counted from the due date to the date of payment.',
    },
    {
      type: 'example',
      title: 'GSTR-3B filed 15 days late with tax due',
      lines: [
        { label: 'Net cash tax liability for the month', value: '₹1,20,000' },
        { label: 'Days of delay after the 20th', value: '15' },
        { label: 'Late fee (15 days at ₹50)', value: '₹750' },
        { label: 'Interest (₹1,20,000 at 18% for 15 of 365 days)', value: '₹888' },
        { label: 'Total cost of the delay', value: '₹1,638', strong: true },
        { label: 'If GSTR-1 was also 15 days late, add', value: '₹750', strong: true },
      ],
    },
    {
      type: 'list',
      items: [
        'GSTR-1 for a period cannot be filed until GSTR-3B for the previous period is filed (rule 59(6)).',
        'E-way bill generation is blocked after two consecutive unfiled periods (rule 138E).',
        'Registration can be cancelled after six months of non-filing for monthly filers, or two consecutive quarters under QRMP and composition.',
        'A return cannot be filed at all once three years have passed from its due date, so a long-neglected GSTIN has to be regularised quickly.',
        'Late fee is auto-computed and must be paid before the return can be submitted.',
      ],
    },
    { type: 'heading', text: 'Nil returns and amendments', id: 'nil-returns-and-amendments' },
    {
      type: 'paragraph',
      text: 'A registered person with no sales and no purchases in a period must still file. Nil GSTR-1 and nil GSTR-3B can be filed through the portal in a few clicks or by SMS from the registered mobile number to 14409. Skipping a nil return costs ₹20 a day per return until it is filed.',
    },
    {
      type: 'paragraph',
      text: 'Mistakes in GSTR-1 are corrected through the amendment tables (9A, 9B and 9C) in a later GSTR-1, or through GSTR-1A in the same period. Mistakes in GSTR-3B are corrected by adjusting the figures in a subsequent 3B. The outer time limit for amendments, for claiming missed ITC and for issuing credit notes for FY 2025-26 is 30 November 2026 or the date of filing GSTR-9, whichever is earlier.',
    },
    {
      type: 'service-card',
      serviceSlug: 'gst-monthly',
      text: 'Monthly GSTR-1 and GSTR-3B with IMS actioning and a GSTR-2B match before every filing, so you claim the credit you are entitled to and nothing that will bounce back as a notice.',
    },
    { type: 'heading', text: 'GSTR-9 and GSTR-9C: the annual returns', id: 'annual-returns' },
    {
      type: 'paragraph',
      text: 'GSTR-9 consolidates the year and reconciles what was filed in GSTR-1 and GSTR-3B with your books. It is optional for aggregate turnover up to ₹2 crore and mandatory above that. GSTR-9C, a reconciliation statement between audited financial statements and GSTR-9, is required above ₹5 crore and is self-certified by the taxpayer. Both are due by 31 December of the following year, so FY 2025-26 returns are due by 31 December 2026.',
    },
    {
      type: 'table',
      head: ['Aggregate turnover FY 2025-26', 'GSTR-9', 'GSTR-9C', 'Late fee for GSTR-9'],
      rows: [
        ['Up to ₹2 crore', 'Optional', 'Not required', '₹50 per day, capped at 0.04% of turnover'],
        ['₹2 crore to ₹5 crore', 'Mandatory', 'Not required', '₹50 per day, capped at 0.04% of turnover'],
        ['₹5 crore to ₹20 crore', 'Mandatory', 'Mandatory', '₹100 per day, capped at 0.04% of turnover'],
        ['Above ₹20 crore', 'Mandatory', 'Mandatory', '₹200 per day, capped at 0.50% of turnover'],
      ],
      caption: 'Annual return thresholds and late fees, due 31 December 2026',
    },
    {
      type: 'paragraph',
      text: 'The annual return is also the last chance to pay any shortfall found during the year through DRC-03 with interest, before the department finds it in scrutiny. Composition dealers file GSTR-4 by 30 June instead.',
    },
    {
      type: 'paragraph',
      text: 'GSTR-9 for FY 2025-26 has new tables. Table 8A now draws on IMS, Table 8H1 captures import ITC taken in the following year, Tables 6A1 and 6H report ITC of earlier years and reclaims, and the rate-wise tables are split at 22 September 2025, when GST moved to 5%, 18% and 40%. Plan the reconciliation in two halves for that reason.',
    },
    { type: 'heading', text: 'A monthly filing checklist', id: 'monthly-checklist' },
    {
      type: 'list',
      ordered: true,
      items: [
        'By the 5th: close the sales register, check e-invoices where applicable (mandatory above ₹5 crore turnover), and prepare the HSN summary.',
        'By the 10th: file GSTR-1 or IFF. Confirm customer GSTINs are active.',
        'By the 13th: take IMS actions on supplier invoices.',
        'On the 14th: download GSTR-2B and match it with the purchase register.',
        'By the 18th: compute net liability, create the challan, and pay through the cash ledger.',
        'By the 20th (or QRMP dates): file GSTR-3B and save the acknowledgement.',
        'Monthly: update the vendor follow-up list for invoices missing from 2B.',
      ],
    },
    { type: 'heading', text: 'What to do next', id: 'what-to-do-next' },
    {
      type: 'paragraph',
      text: 'Check your filing profile on the portal, note whether you are monthly or QRMP, and put the dates above into a calendar with reminders three days ahead. If reconciling IMS and GSTR-2B every month is eating your time, or you have a backlog of unfiled periods, an expert-assisted filing plan handles the matching and files before the due date, with a draft shared for your approval.',
    },
  ],
  faqs: [
    {
      q: 'What is the due date for GSTR-1 and GSTR-3B?',
      a: 'GSTR-1 is due on the 11th and GSTR-3B on the 20th of the month following the tax period for monthly filers. Under QRMP, GSTR-1 is due on the 13th and GSTR-3B on the 22nd or 24th of the month after the quarter, depending on your state.',
    },
    {
      q: 'What is the late fee for GST return filing?',
      a: '₹50 per day for each of GSTR-1 and GSTR-3B, and ₹20 per day for a nil return, subject to turnover-based caps of ₹2,000, ₹5,000 or ₹10,000 per return. Interest at 18% per annum applies separately on tax paid late.',
    },
    {
      q: 'Can I revise GSTR-3B after filing?',
      a: 'No. GSTR-3B cannot be revised. Errors are adjusted in a subsequent month, and additional tax carries interest from the original due date. GSTR-1 errors can be amended in a later GSTR-1 or through GSTR-1A in the same period.',
    },
    {
      q: 'What is the QRMP scheme in GST?',
      a: 'Quarterly Return Monthly Payment, available to taxpayers with aggregate turnover up to ₹5 crore. You file GSTR-1 and GSTR-3B once a quarter and pay tax for the first two months through PMT-06 by the 25th of the following month.',
    },
    {
      q: 'What is IMS in GST and is it mandatory?',
      a: 'The Invoice Management System lets you accept, reject or keep pending each invoice your suppliers upload, and GSTR-2B is generated from those actions on the 14th. Taking action is not mandatory; invoices with no action are treated as accepted, but reviewing them protects you from claiming credit on wrong invoices.',
    },
    {
      q: 'Do I need to file a nil GST return?',
      a: 'Yes. Every registered taxpayer must file GSTR-1 and GSTR-3B for each period even with no transactions. Nil returns can be filed by SMS to 14409, and skipping them costs ₹20 per day per return.',
    },
    {
      q: 'Is GSTR-9 mandatory for turnover below ₹2 crore?',
      a: 'No. GSTR-9 is optional for aggregate turnover up to ₹2 crore and mandatory above it. GSTR-9C is required only above ₹5 crore. Both are due by 31 December 2026 for FY 2025-26.',
    },
    {
      q: 'What is the last date to claim missed ITC for FY 2025-26?',
      a: '30 November 2026 or the date of filing the annual return, whichever is earlier, under section 16(4). The same date applies to GSTR-1 amendments and credit notes for FY 2025-26.',
    },
    {
      q: 'What happens if GST returns are not filed for six months?',
      a: 'The officer can cancel the registration under section 29, GSTR-1 is blocked once the previous 3B is unfiled, and e-way bills are blocked after two unfiled periods. Late fees keep accumulating, and returns older than three years from the due date cannot be filed at all.',
    },
  ],
  relatedServiceSlug: 'gst-monthly',
  relatedGuides: ['gst-registration-guide', 'tds-guide-for-employers', 'itr-filing-guide-ay-2026-27'],
  relatedCalculators: ['gst', 'tds'],
}
