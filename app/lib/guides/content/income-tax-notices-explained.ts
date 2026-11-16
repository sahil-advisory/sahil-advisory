import type { Guide } from '../types'

export const guide: Guide = {
  slug: 'income-tax-notices-explained',
  cluster: 'notices',
  title: 'Income Tax Notices Explained: 143(1), 139(9), 142(1), 143(2), 148 and How to Reply',
  h1: 'Income Tax Notices Explained: 143(1), 139(9), 142(1), 143(2), 148 and How to Reply',
  metaTitle: 'Income Tax Notices Explained: 143(1), 139(9), 143(2), 148',
  metaDescription:
    'What each income tax notice means and how long you have to reply: 143(1), 139(9), 142(1), 143(2) and 148, common triggers, e-Proceedings steps and penalties.',
  keywords: [
    'income tax notice reply',
    'intimation under section 143(1)',
    'defective return notice 139(9)',
    'notice under section 142(1)',
    'scrutiny notice 143(2)',
    'section 148 notice reassessment',
    'how to reply to income tax notice online',
    'rectification under section 154',
    'ais mismatch notice',
  ],
  excerpt:
    'A notice from the income tax department is usually a request for information, not an accusation. This guide decodes the five most common notices, the deadline for each, what triggers them and how to reply on the portal.',
  datePublished: '2026-09-06',
  dateModified: '2026-11-16',
  readMinutes: 12,
  sections: [
    {
      type: 'key-takeaways',
      items: [
        'A 143(1) intimation is automated processing, not scrutiny. Respond within 30 days only if there is a demand or a proposed adjustment you disagree with.',
        'A 139(9) defective return notice must be answered within 15 days, or the return is treated as never filed and you lose the original filing date.',
        '142(1) and 143(2) notices start an assessment. Reply by the date on the notice through e-Proceedings, with documents, or face a best-judgement assessment under section 144.',
        'A 148 notice reopens a past year. It is preceded by a 148A show-cause notice, and the reply to that notice is your best chance to close the matter early.',
      ],
    },
    {
      type: 'stat-grid',
      stats: [
        { label: '143(1) response', value: '30 days', note: 'From the date of the intimation or adjustment proposal' },
        { label: '139(9) response', value: '15 days', note: 'Extendable on request, before the return becomes invalid' },
        { label: '143(2) issue window', value: '3 months', note: 'From the end of the FY in which the return was filed' },
        { label: '148 outer limit', value: '3 years', note: '5 years and 3 months if escaped income is ₹50 lakh or more' },
      ],
    },
    {
      type: 'tool-card',
      calculatorSlug: 'income-tax',
      text: 'Check what the tax on an omitted income item should be before you accept or contest a demand.',
    },
    { type: 'heading', text: 'How to read any income tax notice', id: 'how-to-read-a-notice' },
    {
      type: 'paragraph',
      text: 'Every genuine notice carries a Document Identification Number (DIN), the section under which it is issued, the assessment year, the response deadline and the name of the issuing unit. Start by verifying the DIN on the e-filing portal under Authenticate Notice, since fake demand emails are common. Then note the section, because it decides everything about the deadline and the reply.',
    },
    {
      type: 'table',
      head: ['Section', 'What it is', 'Time to reply', 'Typical trigger'],
      rows: [
        ['143(1)', 'Intimation after automated processing', '30 days for demand or adjustment', 'Arithmetic error, TDS mismatch, AIS income not reported'],
        ['139(9)', 'Defective return', '15 days', 'Missing schedule, income in AIS not in return, tax not paid'],
        ['142(1)', 'Inquiry before assessment', 'Date on notice, usually 7 to 15 days', 'Return not filed, or documents needed'],
        ['143(2)', 'Scrutiny assessment', 'Date on notice', 'CASS selection, high-value transactions, refund claims'],
        ['148A / 148', 'Reassessment of income that escaped', '7 to 30 days for 148A; return within date on 148', 'Information from AIS, search, SFT, third-party data'],
        ['245', 'Adjustment of refund against old demand', '30 days', 'Outstanding demand from an earlier year'],
        ['133(6)', 'Information request', 'Date on notice', 'Verification of a transaction reported by a third party'],
      ],
      caption: 'Income tax notices at a glance, AY 2026-27',
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'New section numbers from tax year 2026-27',
      text: 'Notices for AY 2026-27 and earlier years stay under the 1961 Act and carry the numbers above. For tax year 2026-27 onwards, under the Income-tax Act 2025, the 143(1) intimation is now section 270(1), the 148 notice is now section 280 and the 148A show-cause notice is now section 281. The 143(2) scrutiny notice is reported to be section 270(2). Sources do not yet agree on the new number for 142(1).',
    },
    { type: 'heading', text: 'Section 143(1): intimation after processing', id: 'section-143-1' },
    {
      type: 'paragraph',
      text: 'Every return is processed by the Centralised Processing Centre and an intimation under section 143(1) is sent, usually within a few weeks and at most within nine months from the end of the financial year in which you filed. It shows two columns: income and tax as reported by you, and as computed by the department. If both match, the intimation is simply a receipt. If they differ, it ends in a demand, a reduced refund or an increased refund. For tax year 2026-27 onwards this intimation is now section 270(1) of the Income-tax Act 2025.',
    },
    {
      type: 'list',
      items: [
        'Before making an adjustment under 143(1)(a), the department sends a proposal by email. You have 30 days to agree or disagree on the portal under Pending Actions, e-Proceedings. Silence means the adjustment goes through.',
        'Common adjustments: TDS claimed but not in Form 26AS, interest or dividend in AIS not reported, a deduction claimed in the wrong schedule, or a late filing fee under 234F added.',
        'If you agree with a demand, pay it through e-Pay Tax and submit the response as "demand is correct". Interest under 220(2) at 1% per month runs after 30 days.',
        'If the department made a mistake apparent from the record, file a rectification under section 154 instead of a new return.',
      ],
    },
    {
      type: 'example',
      title: 'Typical 143(1) demand from an AIS mismatch',
      lines: [
        { label: 'Fixed deposit interest reported in the return', value: '₹12,000' },
        { label: 'Interest as per AIS from three banks', value: '₹48,000' },
        { label: 'Income added by CPC', value: '₹36,000' },
        { label: 'Tax on the addition at 30% (taxpayer in top slab, new regime)', value: '₹10,800' },
        { label: 'Cess at 4%', value: '₹432' },
        { label: 'Interest under 234B and 234C, approximately', value: '₹900' },
        { label: 'Demand raised', value: '₹12,132', strong: true },
      ],
    },
    { type: 'heading', text: 'Section 139(9): defective return', id: 'section-139-9' },
    {
      type: 'paragraph',
      text: 'A 139(9) notice means the return is incomplete or internally inconsistent. It is not an assessment and there is no tax demand in it, but it has the shortest fuse. You must correct the defect and respond within 15 days from the date of the notice. If you do not, the return is treated as invalid, which is the same as never having filed, and a belated return with late fee and loss of carry-forward becomes the only route.',
    },
    {
      type: 'list',
      items: [
        'Presumptive income under 44AD or 44ADA declared but gross receipts or the profit percentage not filled.',
        'TDS credit claimed on income that is not shown in the return, for example 194J fees claimed as TDS but no business income reported.',
        'Tax payable as per the return but not paid before filing.',
        'ITR-3 filed without the balance sheet and profit and loss rows.',
        'Audit report required but not uploaded, or the wrong form used for the income shown.',
      ],
    },
    {
      type: 'paragraph',
      text: 'To respond, go to Pending Actions, e-Proceedings, and select the 139(9) notice. You can either agree and upload a corrected return JSON prepared in the offline utility with the notice number and original acknowledgement, or disagree with reasons. Responding in time preserves the original filing date, which matters for loss carry-forward and for the 234F fee. If 15 days is not enough, apply for an extension on the portal before the deadline.',
    },
    { type: 'heading', text: 'Section 142(1): inquiry before assessment', id: 'section-142-1' },
    {
      type: 'paragraph',
      text: 'A 142(1) notice does one of two things. Where no return was filed, it directs you to file one within the date specified. Where a return exists, it asks for specific accounts, documents or information, such as bank statements, a loan confirmation or the source of a property purchase. It is often the first step of a scrutiny, and is sometimes issued alongside a 143(2) notice.',
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Do not ignore a 142(1) notice',
      text: 'Non-compliance allows the officer to complete a best-judgement assessment under section 144 using whatever information is available, attracts a penalty of ₹10,000 for each failure under section 272A(1)(d), and can lead to prosecution under section 276D. If the deadline is genuinely short, file a partial reply with an adjournment request rather than nothing.',
    },
    {
      type: 'paragraph',
      text: 'Reply point by point. If the notice lists eight questions, your submission should have eight numbered answers, each with the document attached as a PDF. Keep each file under the portal limit, name them clearly, and keep a copy of the acknowledgement generated after submission.',
    },
    { type: 'heading', text: 'Section 143(2): scrutiny assessment', id: 'section-143-2' },
    {
      type: 'paragraph',
      text: 'A 143(2) notice means your return has been selected for detailed examination. Selection is mostly through the Computer Assisted Scrutiny Selection system on risk parameters, with a smaller number of compulsory selections such as search cases, information from other agencies or large refund claims. The notice must be served within three months from the end of the financial year in which the return was filed, so a return filed in July 2026 can be picked up until 30 June 2027.',
    },
    {
      type: 'list',
      items: [
        'Limited scrutiny examines only the issues named in the notice, such as capital gains on a property sale or cash deposits. Complete scrutiny covers the whole return.',
        'Assessment is faceless under the National Faceless Assessment Centre. There is no officer to meet; every exchange is on e-Proceedings, with a video hearing available on request.',
        'Expect a sequence: 143(2) notice, one or more 142(1) questionnaires, a show-cause notice with the proposed additions, and finally the assessment order under 143(3).',
        'The order must be passed within 12 months from the end of the assessment year, so AY 2026-27 scrutiny concludes by 31 March 2028.',
      ],
    },
    {
      type: 'paragraph',
      text: 'The quality of the first submission decides the outcome. Reconcile every figure the notice questions with bank statements, AIS, Form 26AS and your books before you write a word. Where an addition is proposed in the show-cause, respond with the legal basis and evidence, because that reply becomes the record for any appeal to the Commissioner (Appeals).',
    },
    { type: 'heading', text: 'Sections 148A and 148: reassessment of a past year', id: 'section-148' },
    {
      type: 'paragraph',
      text: 'A reassessment notice reopens a year that was already processed or assessed, on the basis that income escaped assessment. Since 1 September 2024 the procedure is: a show-cause notice under section 148A(1) with the information suggesting escapement, your reply within the time given in the notice, an order under 148A(3) deciding whether it is a fit case, and only then a notice under 148 requiring you to file a return for that year. Under the Income-tax Act 2025, 148A is now section 281 and 148 is now section 280, for tax year 2026-27 onwards.',
    },
    {
      type: 'table',
      head: ['Situation', 'Time limit for 148 notice', 'What to do'],
      rows: [
        ['Escaped income below ₹50 lakh', '3 years and 3 months from the end of the relevant assessment year', 'Reply to 148A with evidence that the income was reported or is not taxable'],
        ['Escaped income of ₹50 lakh or more, represented by an asset, expenditure or entry', '5 years and 3 months from the end of the relevant assessment year', 'Same, and check that the ₹50 lakh threshold is actually met'],
        ['148 notice issued after 148A order', 'Return due within the date on the notice', 'File the return for that year, then contest additions in assessment'],
      ],
      caption: 'Reassessment time limits after the Finance (No. 2) Act 2024',
    },
    {
      type: 'paragraph',
      text: 'The information behind a 148A notice usually comes from the Statement of Financial Transactions: a property purchase above ₹30 lakh, cash deposits above ₹10 lakh, mutual fund or share purchases above ₹10 lakh, credit card payments above ₹10 lakh, or a foreign remittance. If the transaction is already explained in the return of that year, or funded from disclosed sources, say so with proof in the 148A reply. A well-documented reply often ends the proceeding at the 148A(3) stage. If the income was genuinely omitted, note that from 1 March 2026 an updated return (ITR-U) can be filed even after a reassessment notice, with a further 10% additional tax on top of the usual 25% to 70%.',
    },
    { type: 'heading', text: 'What triggers notices: AIS, TDS and high-value transactions', id: 'common-triggers' },
    {
      type: 'paragraph',
      text: 'The department now matches returns against the Annual Information Statement, which pulls data from banks, employers, mutual funds, registrars, brokers and property registrars. Most notices in the last two years trace back to a gap between AIS and the return.',
    },
    {
      type: 'list',
      items: [
        'Interest on savings and fixed deposits reported by banks but left out of the return, especially deposits in the name of a spouse or parent funded by you.',
        'Dividends, mutual fund redemptions and share sales in AIS with no capital gains schedule filed.',
        'TDS claimed that is not in Form 26AS because the deductor filed late or quoted a wrong PAN.',
        'Salary from two employers with only one Form 16 reported, or standard deduction claimed twice.',
        'Cash deposits, property purchases and credit card spending above the SFT limits with no visible income to support them.',
        'F&O and intraday activity reported by exchanges with no business income in the return.',
        'HRA or 80C claimed in the return without any evidence and with rent paid to a relative.',
        'Non-filing when AIS shows income above the basic exemption limit, which is ₹4 lakh under the new regime for FY 2025-26.',
      ],
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Use AIS feedback before a notice arrives',
      text: 'If an AIS entry is wrong, for example a joint account interest attributed entirely to you, submit feedback against that entry on the Compliance portal. The source is asked to confirm, and the corrected value reduces the chance of an automated mismatch notice.',
    },
    {
      type: 'service-card',
      serviceSlug: 'notice-143-1',
      text: 'Upload your notice for a free assessment. We identify the section, the demand and the deadline, and quote a fixed fee for the reply, rectification or scrutiny representation before any work starts.',
    },
    { type: 'heading', text: 'How to reply on the e-Proceedings portal', id: 'how-to-reply' },
    {
      type: 'list',
      ordered: true,
      items: [
        'Log in at incometax.gov.in, open Pending Actions and then e-Proceedings. Every live notice appears here with its deadline. Intimations under 143(1) with adjustments appear as "Response to Intimation".',
        'Click the notice, read the full PDF and download it. Note the DIN and the date by which the response is due.',
        'Prepare a written reply addressing each point in the order asked. Attach supporting documents as PDFs, each under the size limit, with descriptive file names.',
        'For 139(9), upload the corrected JSON. For 142(1) and 143(2), choose Submit Response, paste or attach the reply, and add the documents. For 148A, respond under the 148A notice itself.',
        'If more time is needed, use Seek Adjournment before the deadline with a reason. Do not let the date pass without any submission.',
        'After submitting, save the acknowledgement. Check the portal and your registered email every week until the proceeding shows as closed.',
      ],
    },
    { type: 'heading', text: 'When to file a rectification under section 154', id: 'rectification-154' },
    {
      type: 'paragraph',
      text: 'Section 154 lets you ask the department to correct a mistake apparent from the record in an order or intimation, within four years from the end of the financial year in which the order was passed. It is the right tool when the return was correct and the processing was wrong: TDS credit not given although it is in Form 26AS, a challan not matched, or a deduction ignored despite being in the return.',
    },
    {
      type: 'table',
      head: ['Situation', 'Use'],
      rows: [
        ['You made a mistake in the return and the revision window is open', 'Revised return under 139(5), until 31 March 2027 for AY 2026-27 (234-I fee after 31 December 2026)'],
        ['CPC processed the correct return wrongly', 'Rectification under 154: reprocess, tax credit mismatch or return data correction'],
        ['You omitted income and the revised return window has closed', 'Updated return under 139(8A) with additional tax, within 48 months'],
        ['You disagree with an assessment order', 'Appeal to Commissioner (Appeals) within 30 days of the order'],
      ],
      caption: 'Choosing between revision, rectification, updated return and appeal',
    },
    { type: 'heading', text: 'Penalties for ignoring a notice', id: 'penalties' },
    {
      type: 'list',
      items: [
        'Best-judgement assessment under section 144, where the officer estimates income without your input.',
        '₹10,000 for each failure to respond to a 142(1) or 143(2) notice under section 272A(1)(d).',
        'Penalty of 50% of the tax on under-reported income, rising to 200% for misreporting, under section 270A once an addition is confirmed.',
        'Interest under 220(2) at 1% per month on any demand not paid within 30 days, and recovery through bank attachment.',
        'Prosecution under 276CC for wilful failure to file a return after a notice, and under 276D for failure to produce accounts.',
      ],
    },
    { type: 'heading', text: 'When to get professional help', id: 'when-to-get-help' },
    {
      type: 'paragraph',
      text: 'A 143(1) intimation with a small TDS mismatch or a 139(9) notice for a missing schedule can be handled yourself if you understand the defect. Get a qualified professional (CMA/CA) involved when the notice is under 142(1), 143(2) or 148A, when the demand exceeds what you can explain from your own records, when a past year is being reopened, or when the deadline is within a week. Appeals against assessment orders are drafted and argued with Chartered Accountants or advocates.',
    },
    { type: 'heading', text: 'What to do next', id: 'what-to-do-next' },
    {
      type: 'paragraph',
      text: 'Authenticate the notice on the portal, write down the section and the deadline, and pull together your filed return, Form 26AS, AIS and bank statements for that year. Compare what the department is questioning with what you reported. If the gap is explainable, reply with evidence before the date. If it is not, or the notice is a scrutiny or reassessment, get the notice reviewed by a professional this week so that the first submission is the right one.',
    },
  ],
  faqs: [
    {
      q: 'What is an intimation under section 143(1)?',
      a: 'An automated communication after your return is processed by CPC, comparing the return as filed with the return as computed. If both match it is only a receipt. If there is a demand or reduced refund, you can respond or file a rectification within 30 days.',
    },
    {
      q: 'How many days do I have to reply to a defective return notice under 139(9)?',
      a: '15 days from the date of the notice, extendable on request before the deadline. If no response is filed the return is treated as invalid, which means it is as if you never filed.',
    },
    {
      q: 'What is the difference between 142(1) and 143(2) notices?',
      a: '142(1) asks you to file a return or produce specific documents and information. 143(2) informs you that your return has been selected for scrutiny. A 143(2) notice is often followed by 142(1) questionnaires during the same assessment.',
    },
    {
      q: 'Within how many years can a 148 notice be issued?',
      a: 'Three years and three months from the end of the relevant assessment year in ordinary cases, and five years and three months where the escaped income is ₹50 lakh or more and is represented by an asset, expenditure or book entry.',
    },
    {
      q: 'What happens if I ignore an income tax notice?',
      a: 'The officer can complete a best-judgement assessment under section 144, levy ₹10,000 per failure under 272A(1)(d), impose penalty of 50% to 200% of tax on any addition under 270A, and in serious cases initiate prosecution.',
    },
    {
      q: 'How do I reply to an income tax notice online?',
      a: 'Log in at incometax.gov.in, go to Pending Actions and e-Proceedings, open the notice, and submit your written reply with PDF attachments before the deadline. For a 139(9) notice upload the corrected return JSON; for 143(1) adjustments use Response to Intimation.',
    },
    {
      q: 'When should I file a rectification under section 154 instead of a revised return?',
      a: 'When your return was correct but the processing was wrong, for example TDS in Form 26AS not credited. A revised return is for mistakes you made, and can be filed until 31 March 2027 for AY 2026-27, with a fee under section 234-I if filed after 31 December 2026.',
    },
    {
      q: 'Why did I get a notice for AIS mismatch?',
      a: 'Because income reported by a bank, employer, broker or registrar in the Annual Information Statement was not found in your return. Interest, dividends, mutual fund redemptions and second-employer salary are the most common omissions.',
    },
    {
      q: 'Is a section 245 intimation a notice?',
      a: 'It is an intimation that the department proposes to adjust your refund against an outstanding demand from an earlier year. You have 30 days to agree or to dispute the demand on the portal, failing which the adjustment is made.',
    },
    {
      q: 'Can I get more time to reply to a scrutiny notice?',
      a: 'Yes. Use the Seek Adjournment option on e-Proceedings before the deadline, stating the reason. Requests are usually granted once, so use the extra time to prepare a complete reply.',
    },
  ],
  relatedServiceSlug: 'notice-143-1',
  relatedGuides: ['itr-filing-guide-ay-2026-27', 'belated-revised-updated-return', 'tds-guide-for-employers'],
  relatedCalculators: ['income-tax', 'advance-tax'],
}
