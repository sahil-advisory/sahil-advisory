import type { Guide } from '../types'

export const guide: Guide = {
  slug: 'tds-guide-for-employers',
  cluster: 'tds',
  title: 'TDS Compliance Guide for Employers and Small Businesses: Rates, Due Dates, 24Q/26Q and Form 16',
  h1: 'TDS Compliance Guide for Employers and Small Businesses: Rates, Due Dates, 24Q/26Q and Form 16',
  metaTitle: 'TDS Guide for Employers: Rates, Due Dates, 24Q, 26Q, Form 16',
  metaDescription:
    'TDS compliance for tax year 2026-27: Forms 138, 140 and 130 replacing 24Q, 26Q and Form 16, rates and thresholds, deposit dates, late fees and penalties.',
  keywords: [
    'tds compliance for employers',
    'tds rate chart fy 2025-26',
    'tds payment due date',
    'tds return due date',
    'form 24q and 26q',
    'form 138 and form 140 tds',
    'form 130 tds certificate',
    'form 16 due date',
    'tds late filing fee 234e',
    'tds correction statement traces',
    'lower deduction certificate section 197',
  ],
  excerpt:
    'A working calendar and rate chart for anyone who deducts TDS: when to deposit, when to file, what late filing costs, how expense disallowance under 40(a)(ia) bites, and how to fix errors on TRACES. Updated for the new forms and section numbers that apply from 1 April 2026.',
  datePublished: '2026-09-06',
  dateModified: '2026-11-16',
  readMinutes: 11,
  sections: [
    {
      type: 'key-takeaways',
      items: [
        'Deposit TDS by the 7th of the following month, and by 30 April for TDS deducted in March. File quarterly statements by 31 July, 31 October, 31 January and 31 May. From 1 April 2026 these are Form 138 (salary, was 24Q), Form 140 (other residents, was 26Q) and Form 144 (non-residents, was 27Q).',
        'Late filing costs ₹200 per day, capped at the TDS amount, under section 234E (section 427 from 1 April 2026). A penalty of ₹10,000 to ₹1,00,000 can follow under 271H, now section 461, which is not levied if the TDS is paid and the statement filed within one month.',
        'Failing to deduct or deposit TDS disallows 30% of the expense under 40(a)(ia) (section 35(b) of the Income-tax Act 2025), and paying a deductee without a PAN means deducting at 20%.',
        'Form 16 (Form 130 from tax year 2026-27) must reach employees by 15 June and Form 16A (now Form 131) within 15 days of the quarterly return due date. Errors are corrected through a correction statement on TRACES.',
      ],
    },
    {
      type: 'stat-grid',
      stats: [
        { label: 'Monthly deposit', value: '7th', note: '30 April for March deductions' },
        { label: 'Late filing fee', value: '₹200/day', note: 'Section 427 (was 234E), capped at TDS amount' },
        { label: 'Interest on late deposit', value: '1.5% p.m.', note: '1% p.m. for late deduction' },
        { label: 'Form 130 (Form 16) due', value: '15 June', note: 'Form 131 (16A) within 15 days of return due date' },
      ],
    },
    {
      type: 'tool-card',
      calculatorSlug: 'tds',
      text: 'Pick the section and enter the payment to see the current rate, threshold and the 20% no-PAN rule applied.',
    },
    { type: 'heading', text: 'Start with a TAN', id: 'tan' },
    {
      type: 'paragraph',
      text: 'Every person who deducts tax needs a Tax Deduction and Collection Account Number. Apply in Form 49B (Form 134 under the Income-tax Rules 2026) through Protean (NSDL) for a fee under ₹100 and the TAN arrives in about a week. Quote it on every challan, statement and certificate. Section 272BB prescribes a penalty of ₹10,000 for failing to obtain a TAN or quoting a wrong one.',
    },
    {
      type: 'paragraph',
      text: 'Individuals and HUFs are required to deduct TDS on business payments only if their turnover exceeded ₹1 crore (business) or receipts exceeded ₹50 lakh (profession) in the previous year. Two kinds of deductor need no TAN at all: a buyer deducting 1% under 194-IA on property where the higher of price and stamp duty value is ₹50 lakh or more, and an individual or HUF deducting 2% under 194-IB on rent above ₹50,000 a month. Payments up to 31 March 2026 went through Forms 26QB and 26QC, filed using PAN. From 1 April 2026 both use Form 141, a single challan-cum-statement with property in Schedule B. From 1 October 2026 an individual or HUF buying property from a non-resident also needs no TAN.',
    },
    { type: 'heading', text: 'Common TDS sections, rates and thresholds for FY 2025-26 and 2026-27', id: 'tds-rate-chart' },
    {
      type: 'paragraph',
      text: 'Budget 2025 raised several thresholds from 1 April 2025. The same thresholds were carried into the Income-tax Act 2025 from 1 April 2026: salary TDS is section 392, every other payment to a resident sits in the table of section 393(1), and payments to non-residents fall under section 393(2). The table gives both references. Rates apply to the whole amount once the threshold is crossed, not just the excess.',
    },
    {
      type: 'table',
      head: ['Section (1961 Act)', '2025 Act', 'Nature of payment', 'Rate', 'Threshold'],
      rows: [
        ['192', '392', 'Salary', 'Slab rate', 'Basic exemption'],
        ['194A', '393(1) Sl.5', 'Interest (bank/post office)', '10%', '₹50,000 (₹1,00,000 senior)'],
        ['194C', '393(1) Sl.6(i)', 'Contractor payments, including supply of manpower from 1 April 2026', '1% (individual/HUF), 2% (others)', '₹30,000 single / ₹1,00,000 aggregate'],
        ['194H', '393(1)', 'Commission / brokerage', '2%', '₹20,000'],
        ['194I', '393(1) Sl.2(ii)', 'Rent', '2% plant & machinery, 10% land/building', '₹50,000 per month'],
        ['194J', '393(1) Sl.6(iii)', 'Professional / technical fees', '10% professional, 2% technical', '₹50,000'],
        ['194-IA', '393(1) Sl.3(i)', 'Purchase of property', '1%', '₹50,00,000 (higher of price and stamp duty value)'],
        ['194-IB', '393(1) Sl.2(i)', 'Rent by individual/HUF', '2%', '₹50,000 per month'],
        ['194Q', '393(1)', 'Purchase of goods', '0.1%', '₹50,00,000'],
        ['194S', '393(1)', 'Crypto / VDA transfer', '1%', '₹10,000 / ₹50,000'],
        ['194T', '393(1)', 'Salary, commission or interest to partners', '10%', '₹20,000 per year'],
      ],
      caption: 'TDS rate chart for resident payees, FY 2025-26 and tax year 2026-27',
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Two changes from 1 April 2025',
      text: 'Section 194T now requires firms and LLPs to deduct 10% on remuneration, commission and interest paid to partners above ₹20,000 a year. Section 206AB, which imposed higher TDS on non-filers of income tax returns, has been withdrawn, so you no longer need to check filing status before every payment.',
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Changes from 1 April 2026',
      text: 'Supply of manpower is now treated as work, so it attracts the contractor rates of 1% or 2%. Interest awarded by a Motor Accident Claims Tribunal is exempt. Lower and nil deduction certificates are issued through an automated process. From 1 October 2026, an individual or HUF buying property from a non-resident does not need a TAN.',
    },
    { type: 'heading', text: 'TDS on salary under section 192 (now section 392)', id: 'salary-tds' },
    {
      type: 'paragraph',
      text: 'Salary TDS is computed on the estimated annual income of each employee and deducted in equal monthly instalments. The new regime is the default. An employee who wants the old regime must tell you at the start of the year, and you collect proofs for HRA, 80C and home loan interest in Form 12BB (Form 124 from tax year 2026-27) before the year ends. Employees can also declare TDS and TCS suffered elsewhere in Form 12BAA so that you deduct less.',
    },
    {
      type: 'example',
      title: 'Monthly TDS for an employee earning ₹15 lakh, new regime',
      lines: [
        { label: 'Gross salary for tax year 2026-27 (same slabs as FY 2025-26)', value: '₹15,00,000' },
        { label: 'Less standard deduction', value: '₹75,000' },
        { label: 'Taxable salary', value: '₹14,25,000' },
        { label: 'Tax: ₹4 to 8 lakh at 5%', value: '₹20,000' },
        { label: 'Tax: ₹8 to 12 lakh at 10%', value: '₹40,000' },
        { label: 'Tax: ₹12 to 14.25 lakh at 15%', value: '₹33,750' },
        { label: 'Tax before cess', value: '₹93,750' },
        { label: 'Cess at 4%', value: '₹3,750' },
        { label: 'Annual TDS', value: '₹97,500', strong: true },
        { label: 'Monthly TDS (over 12 months)', value: '₹8,125', strong: true },
      ],
    },
    {
      type: 'paragraph',
      text: 'An employee with taxable salary up to ₹12 lakh after the ₹75,000 standard deduction pays nil tax under the new regime because of the ₹60,000 rebate under 87A (section 156 from tax year 2026-27), so no TDS is required. Recompute whenever salary changes mid-year, and adjust the final months so the total matches the annual liability.',
    },
    { type: 'heading', text: 'Deposit and filing calendar', id: 'due-dates' },
    {
      type: 'paragraph',
      text: 'TDS deducted in a month must be deposited through challan ITNS 281 by the 7th of the next month. The only exception is March, where the due date is 30 April. Quarterly statements are then filed for each TAN. For periods up to 31 March 2026, including the FY 2025-26 Q4 statement and any corrections, these are 24Q for salary, 26Q for other resident payments and 27Q for payments to non-residents. From 1 April 2026 they are Form 138, Form 140 and Form 144 under the Income-tax Rules 2026, and Form 143 replaces 27EQ for TCS.',
    },
    {
      type: 'table',
      head: ['Quarter', 'Period', 'Deposit due (each month)', 'Statement due', 'Form 131 (16A) due'],
      rows: [
        ['Q1', 'April to June', '7 May, 7 June, 7 July', '31 July', '15 August'],
        ['Q2', 'July to September', '7 August, 7 September, 7 October', '31 October', '15 November'],
        ['Q3', 'October to December', '7 November, 7 December, 7 January', '31 January', '15 February'],
        ['Q4', 'January to March', '7 February, 7 March, 30 April', '31 May', '15 June (Form 130 also)'],
      ],
      caption: 'TDS calendar for tax year 2026-27 deductions. The Q1 (31 July 2026) and Q2 (31 October 2026) statements have fallen due; Q3 is due 31 January 2027.',
    },
    {
      type: 'paragraph',
      text: 'Each quarterly statement is prepared in the RPU utility or compliant software, validated with the File Validation Utility (FVU) and uploaded on the income tax e-filing portal or through a TIN facilitation centre. Registering the TAN on TRACES is needed to download Form 130 and Form 131 (Form 16 and 16A for periods up to March 2026) and the justification report for defaults.',
    },
    { type: 'heading', text: 'Interest, late fees and penalties', id: 'interest-and-penalties' },
    {
      type: 'paragraph',
      text: 'Section 201(1A), section 398 of the Income-tax Act 2025 from 1 April 2026, charges interest at 1% per month from the date tax was deductible to the date it was actually deducted, and 1.5% per month from the date of deduction to the date of deposit. Any part of a month counts as a full month, which makes even a few days of delay expensive.',
    },
    {
      type: 'example',
      title: 'Professional fee TDS deposited six weeks late',
      lines: [
        { label: 'Fee paid to a consultant on 10 May 2026', value: '₹4,00,000' },
        { label: 'TDS at 10% under section 393(1) Sl.6(iii) (194J), deducted on 10 May', value: '₹40,000' },
        { label: 'Due date for deposit', value: '7 June 2026' },
        { label: 'Actual deposit date', value: '20 July 2026' },
        { label: 'Months counted (May, June, July, each part month is full)', value: '3' },
        { label: 'Interest at 1.5% for 3 months', value: '₹1,800', strong: true },
      ],
    },
    {
      type: 'table',
      head: ['Default', 'Consequence', 'Provision'],
      rows: [
        ['Statement filed late', '₹200 per day until filed, capped at TDS in the statement', 'Section 427 (234E for periods up to March 2026)'],
        ['Statement filed late, or with wrong PAN or amounts', '₹10,000 to ₹1,00,000; none if tax is paid and the statement filed within one month (within one year under 271H for periods up to March 2026)', 'Section 461 (271H)'],
        ['Deducted late', '1% per month from deductible date to deduction date', 'Section 398 (201(1A))'],
        ['Deposited late', '1.5% per month from deduction date to deposit date', 'Section 398 (201(1A))'],
        ['Not deducted or not deposited by ITR due date', '30% of the expense disallowed in your income tax computation', 'Section 35(b) (40(a)(ia))'],
        ['No TAN or wrong TAN', '₹10,000', 'Section 272BB'],
        ['Deducted but not deposited', 'Prosecution with rigorous imprisonment of 3 months to 7 years', 'Section 276B'],
      ],
      caption: 'Cost of TDS defaults',
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'The 40(a)(ia) disallowance is the expensive one',
      text: 'Pay a contractor ₹10 lakh without deducting 1% TDS and the department can disallow ₹3 lakh of that expense, adding ₹3 lakh to your taxable profit. The disallowance is reversed in the year you finally deposit the TDS, but the interest and the cash flow hit are permanent. For statements of periods up to March 2026, no penalty under 271H applies if you file within a year of the due date after paying tax, interest and late fee. From 1 April 2026 the disallowance is section 35(b) and the penalty is section 461, where the window is one month.',
    },
    { type: 'heading', text: 'Deductees without PAN, and lower deduction certificates', id: 'pan-and-197' },
    {
      type: 'paragraph',
      text: 'Section 206AA requires TDS at 20%, or the rate in the section if higher, whenever the payee does not furnish a valid PAN. A PAN that is inoperative because it is not linked to Aadhaar is treated the same way. Validate PANs on TRACES before filing, since an invalid PAN in a statement triggers a short deduction demand for the difference up to 20%.',
    },
    {
      type: 'list',
      items: [
        'A payee whose total tax is lower than the TDS can apply to the assessing officer in Form 13 for a certificate under section 197 allowing nil or lower deduction. From 1 April 2026 the application is Form 128 and certificates are issued through an automated process. You deduct at the certificate rate and quote the certificate number in the statement.',
        'Individuals receiving interest can give Form 15G (below 60 years) or Form 15H (60 and above) under 197A if their tax liability is nil; from 1 April 2026 both are replaced by a single Form 121. Report these in the statement even though no tax is deducted.',
        'TDS is not required on payments to certain exempt bodies such as the government, RBI and mutual funds, and on GST charged separately on an invoice where the GST component is shown distinctly.',
        'Payments to non-residents fall under section 195 (section 393(2) from 1 April 2026) and Form 27Q (now Form 144), with treaty rates available only against a tax residency certificate and Form 10F.',
      ],
    },
    {
      type: 'service-card',
      serviceSlug: 'tds-quarterly',
      text: 'Quarterly 24Q, 26Q and 27Q (now Forms 138, 140 and 144) with PAN validation, challan mapping, FVU generation and Form 16 or 16A download from TRACES, plus a default check after every filing.',
    },
    { type: 'heading', text: 'Form 16 and Form 16A (now Forms 130 and 131): your obligations as deductor', id: 'form-16-and-16a' },
    {
      type: 'paragraph',
      text: 'Form 16 is the annual salary certificate. Part A, downloaded from TRACES, shows quarterly deductions and deposits; Part B, generated by you, shows the salary breakup, deductions and tax computed. It must be issued by 15 June following the financial year, so Form 16 for FY 2025-26 was due by 15 June 2026 on the old form. For salary paid from 1 April 2026 the certificate is Form 130, due by 15 June 2027. Form 16A for non-salary deductions, now Form 131, is due within 15 days of the quarterly statement due date. For property and rent TDS, Forms 16B and 16C are replaced by Form 132, due within 15 days of the Form 141 due date.',
    },
    {
      type: 'list',
      items: [
        'Form 16 can only be generated after the Q4 salary statement (24Q, or Form 138 from tax year 2026-27) is processed on TRACES, so a late Q4 filing delays every employee return.',
        'Issue Form 16 to every employee from whom tax was deducted. Employees below the taxable limit can be given a salary certificate instead.',
        'Late issue of Form 16 or 16A attracts a penalty of ₹100 per day under section 272A(2)(g), capped at the TDS amount.',
        'Digitally sign the PDFs and password-protect them with the employee PAN as a courtesy; both are expected practice.',
      ],
    },
    { type: 'heading', text: 'Correcting mistakes on TRACES', id: 'traces-corrections' },
    {
      type: 'paragraph',
      text: 'After a statement is processed, TRACES issues an intimation for any default: short deduction, short payment, late payment interest, late filing fee or PAN errors. Download the justification report to see each default line by line. Most are fixed by a correction statement.',
    },
    {
      type: 'table',
      head: ['Problem', 'Fix', 'Where'],
      rows: [
        ['Wrong PAN of a deductee', 'PAN correction (allowed within limits) in an online correction', 'TRACES, Request for Correction'],
        ['Challan not matched or wrong amount', 'Challan correction or tag the unclaimed challan to the statement', 'TRACES online correction'],
        ['Deductee missed or amount wrong', 'Add or modify deductee rows in a correction statement (Conso file)', 'RPU with Conso file from TRACES, then upload'],
        ['Short deduction demand', 'Deduct and deposit the balance with interest, then add the challan', 'Pay via ITNS 281, then correction'],
        ['Late filing fee under 234E (section 427)', 'Pay the fee through challan 281 (select fee under 234E) and tag it', 'TRACES'],
        ['Interest on late payment', 'Pay the interest and tag the challan in a correction', 'TRACES'],
      ],
      caption: 'Common TDS defaults and their corrections',
    },
    {
      type: 'paragraph',
      text: 'Online corrections require a Digital Signature Certificate for most types, or an Aadhaar-based e-verification for some. Demands that remain unpaid are adjusted against refunds and can lead to recovery, so clear the TRACES default summary every quarter.',
    },
    { type: 'heading', text: 'A monthly TDS routine for a small business', id: 'monthly-routine' },
    {
      type: 'list',
      ordered: true,
      items: [
        'Before paying any vendor or salary: check the section, threshold and PAN validity. Deduct at the right rate, or 20% if no PAN.',
        'By the 5th of the next month: total the TDS by section, generate ITNS 281 and pay through net banking. Save the challan with BSR code and serial number.',
        'Maintain a TDS register with deductee PAN, date, amount, section, TDS and challan reference. This becomes the quarterly statement.',
        'Within the month after each quarter: prepare, validate and file Form 138 or Form 140 (24Q or 26Q for periods up to March 2026). Download Form 131 and send it to deductees.',
        'After every filing: check the TRACES default summary and clear it before it becomes a demand.',
        'By 15 June: issue Form 130 (Form 16 for FY 2025-26 and earlier) to all employees after the Q4 statement is processed.',
      ],
    },
    { type: 'heading', text: 'What to do next', id: 'what-to-do-next' },
    {
      type: 'paragraph',
      text: 'If you have started paying salaries, contractors or professionals, apply for a TAN now and set a recurring reminder for the 7th of every month. Reconcile your vendor payments for FY 2026-27 so far against the rate chart, deduct and deposit any shortfall with interest before the Q3 statement due on 31 January 2027, and register on TRACES. An expert-assisted quarterly plan handles the deposit computation, statements, Form 16 and corrections so the 30% disallowance and daily late fees never arise.',
    },
  ],
  faqs: [
    {
      q: 'What is the due date for TDS payment every month?',
      a: 'The 7th of the month following the month of deduction. For TDS deducted in March the due date is 30 April. Government deductors paying without challan must deposit on the same day.',
    },
    {
      q: 'What are the TDS return due dates for FY 2026-27?',
      a: '31 July for April to June, 31 October for July to September, 31 January for October to December and 31 May for January to March. The first two dates in 2026 have passed; the Q3 statement is due 31 January 2027. Statements are filed in Form 138, 140 or 144. Form 131 follows within 15 days of each date and Form 130 by 15 June 2027.',
    },
    {
      q: 'What is the late fee for filing a TDS return late?',
      a: '₹200 per day from the due date until the statement is filed, capped at the amount of TDS in the statement, under section 234E (section 427 from 1 April 2026). A separate penalty of ₹10,000 to ₹1,00,000 can apply under section 461 (271H), but not if the tax is paid and the statement filed within one month. For periods up to March 2026, 271H spares statements filed within one year.',
    },
    {
      q: 'How is interest on late TDS deposit calculated?',
      a: '1.5% per month from the date of deduction to the date of deposit, and 1% per month from the date tax was deductible to the date it was deducted. A part of a month counts as a full month.',
    },
    {
      q: 'What happens if I do not deduct TDS on a contractor payment?',
      a: '30% of the payment is disallowed as an expense under section 40(a)(ia) (section 35(b) from tax year 2026-27) in that year, you are treated as an assessee in default for the TDS with interest at 1% per month, and the disallowed amount is allowed only in the year you deposit the tax.',
    },
    {
      q: 'What is the TDS rate if the deductee has no PAN?',
      a: '20% or the rate specified in the section, whichever is higher, under section 206AA. An inoperative PAN not linked to Aadhaar is treated as no PAN, so validate PANs on TRACES before deducting.',
    },
    {
      q: 'When must an employer issue Form 16?',
      a: 'By 15 June following the end of the financial year. Form 16 for FY 2025-26 was due by 15 June 2026. For tax year 2026-27 the certificate is Form 130, due by 15 June 2027. It can be generated only after the Q4 24Q statement is processed on TRACES.',
    },
    {
      q: 'What is a lower deduction certificate under section 197?',
      a: 'A certificate issued by the assessing officer on the payee application in Form 13 (Form 128 from 1 April 2026, now issued through an automated process), allowing TDS at a lower or nil rate because the payee expects a lower tax liability. The deductor applies the certificate rate and reports the certificate number in the quarterly statement.',
    },
    {
      q: 'What is the difference between Form 24Q, 26Q and 27Q?',
      a: '24Q reports TDS on salary under section 192, 26Q reports TDS on all other payments to residents such as contractors, rent, professional fees and interest, and 27Q reports TDS on payments to non-residents under section 195. From 1 April 2026 they are Form 138 (section 392), Form 140 (section 393(1)) and Form 144 (section 393(2)).',
    },
    {
      q: 'What TDS applies to supply of manpower from 1 April 2026?',
      a: 'Supply of manpower is now treated as work, so the contractor rates apply: 1% for an individual or HUF payee and 2% for others, with the ₹30,000 single payment and ₹1 lakh aggregate thresholds.',
    },
    {
      q: 'How do I correct a wrong PAN in a filed TDS return?',
      a: 'File an online correction on TRACES using the PAN correction option, or prepare a correction statement with the Conso file in the RPU and upload it. Once corrected, the short deduction demand raised for the invalid PAN is dropped.',
    },
  ],
  relatedServiceSlug: 'tds-quarterly',
  relatedGuides: ['itr-filing-guide-ay-2026-27', 'gst-return-filing-guide', 'income-tax-act-2025-what-changes'],
  relatedCalculators: ['tds', 'take-home-salary'],
}
