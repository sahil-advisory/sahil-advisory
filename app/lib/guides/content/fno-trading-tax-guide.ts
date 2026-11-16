import type { Guide } from '../types'

export const guide: Guide = {
  slug: 'fno-trading-tax-guide',
  cluster: 'capital-gains',
  title: 'Tax on F&O and Intraday Trading Income FY 2025-26: ITR-3, Turnover and Audit',
  h1: 'Tax on F&O and Intraday Trading Income FY 2025-26: ITR-3, Turnover and Audit',
  metaTitle: 'F&O and Intraday Trading Tax FY 2025-26: ITR-3, Audit',
  metaDescription:
    'How F&O and intraday income is taxed in FY 2025-26: business income rules, turnover computation, the 44AD choice, audit limits, loss set-off and advance tax.',
  keywords: [
    'tax on f&o income',
    'f&o turnover calculation',
    'intraday trading tax india',
    'itr 3 for f&o traders',
    'tax audit for f&o',
    'f&o loss carry forward',
    '44ad for f&o trading',
    'speculative business income intraday',
  ],
  excerpt:
    'F&O and intraday profits are business income, not capital gains. This guide explains turnover, the 44AD decision, when a tax audit is needed, how losses are set off and how to fill ITR-3 for FY 2025-26.',
  datePublished: '2026-09-06',
  dateModified: '2026-11-16',
  readMinutes: 11,
  sections: [
    {
      type: 'key-takeaways',
      items: [
        'F&O profit or loss is non-speculative business income. Intraday equity profit or loss is speculative business income. Both go in ITR-3, never ITR-1 or ITR-2.',
        'Turnover for F&O is the sum of absolute profits and losses on every trade, plus option premium received on contracts that were not squared off. Contract value is not turnover.',
        'Tax audit is required only above ₹10 crore turnover when 95% or more of receipts and payments are digital (₹1 crore otherwise), or when you fall into the 44AD opt-out trap.',
        'F&O losses can be set off against any income except salary and carried forward for 8 years, but only if the return is filed by the due date. For AY 2026-27 that was 31 August 2026 for non-audit traders (now passed) and is 21 November 2026 for audit cases, as extended by CBDT Circular 07/2026.',
        'STT on derivatives went up from 1 April 2026: 0.05% on futures (was 0.02%) and 0.15% on the sale of options premium (was 0.1%). Every trade in tax year 2026-27 carries the higher cost.',
      ],
    },
    {
      type: 'stat-grid',
      stats: [
        { label: 'Audit threshold (digital)', value: '₹10 crore', note: 'Turnover, with 95% digital receipts and payments' },
        { label: 'Loss carry forward', value: '8 years', note: 'F&O (non-speculative). Intraday: 4 years' },
        { label: 'ITR-3 due date, AY 2026-27', value: '31 Aug 2026', note: 'Passed. Audit cases: 21 Nov 2026 (extended)' },
        { label: 'Advance tax trigger', value: '₹10,000', note: 'Tax liability after TDS for the year' },
      ],
    },
    {
      type: 'tool-card',
      calculatorSlug: 'advance-tax',
      text: 'Traders rarely have TDS covering their tax. Estimate your four advance tax instalments and the interest under section 234C if you miss one.',
    },
    { type: 'heading', text: 'Why F&O and intraday income is business income', id: 'business-income' },
    {
      type: 'paragraph',
      text: 'Section 43(5) of the Income-tax Act 1961 defines a speculative transaction as one settled without actual delivery. Intraday equity trades are exactly that, so intraday profit or loss is speculative business income. Futures and options traded on a recognised stock exchange are carved out by proviso (d) to section 43(5), which makes F&O income non-speculative business income.',
    },
    {
      type: 'paragraph',
      text: 'The practical consequence is that a trader is treated like a proprietor running a business. You report income under the head Profits and Gains of Business or Profession, you can deduct expenses, and you file ITR-3. Delivery-based equity investments held for even a day are capital gains, and these can sit in the same ITR-3 alongside trading income.',
    },
    {
      type: 'table',
      head: ['Activity', 'Head of income', 'Nature', 'ITR form'],
      rows: [
        ['Equity futures and options', 'Business', 'Non-speculative', 'ITR-3'],
        ['Commodity and currency derivatives', 'Business', 'Non-speculative', 'ITR-3'],
        ['Intraday equity (no delivery)', 'Business', 'Speculative', 'ITR-3'],
        ['Delivery equity, mutual funds', 'Capital gains', 'STCG 20% / LTCG 12.5%', 'ITR-2 or ITR-3'],
        ['Salary plus F&O', 'Salary and Business', 'Mixed', 'ITR-3'],
      ],
      caption: 'Where each trading activity is reported for AY 2026-27',
    },
    { type: 'heading', text: 'How to compute F&O turnover the ICAI way', id: 'turnover-computation' },
    {
      type: 'paragraph',
      text: 'Turnover matters for two decisions: whether you can use presumptive taxation under section 44AD and whether a tax audit under section 44AB is required. The ICAI Guidance Note on Tax Audit is the accepted method. Contract value, which can run into crores even for small traders, is not turnover.',
    },
    {
      type: 'list',
      items: [
        'Futures: add the absolute value of profit and loss on each trade. A profit of ₹30,000 and a loss of ₹20,000 give a turnover of ₹50,000, not ₹10,000.',
        'Options: add the absolute value of profit and loss on each trade in the same way.',
        'Premium received on options you sold: include it in turnover only where the trade was not squared off, so that the premium is not already inside the profit or loss figure. Where the trade was squared off and the premium is already part of the realised P&L, do not add it again.',
        'Intraday equity: the absolute sum of profits and losses, computed separately as speculative turnover.',
      ],
    },
    {
      type: 'example',
      title: 'Turnover from a small F&O trade log',
      lines: [
        { label: 'Nifty futures: profit on trade 1', value: '₹42,000' },
        { label: 'Nifty futures: loss on trade 2', value: '₹65,000' },
        { label: 'Bank Nifty option bought and sold: loss', value: '₹18,000' },
        { label: 'Option written, expired unexercised: premium received', value: '₹9,500' },
        { label: 'Turnover (42,000 + 65,000 + 18,000 + 9,500)', value: '₹1,34,500', strong: true },
        { label: 'Net profit or loss (42,000 minus 65,000 minus 18,000 plus 9,500)', value: 'Loss ₹31,500', strong: true },
      ],
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Broker turnover figures differ',
      text: 'Zerodha, Groww, Upstox and Angel each compute turnover in their tax P&L reports, and the method is not always identical to the ICAI note, especially for option premium. Use the broker report as the starting point and let your preparer recompute where option writing is involved.',
    },
    { type: 'heading', text: 'Reading your broker tax P&L report', id: 'broker-pnl' },
    {
      type: 'paragraph',
      text: 'Every major broker gives a tax P&L for the financial year. Download it for 1 April 2025 to 31 March 2026 and look for four things: realised profit or loss split by segment, turnover, charges, and the opening and closing position statements. Segment-wise separation matters because intraday and F&O are taxed differently and cannot be merged.',
    },
    {
      type: 'list',
      items: [
        'Realised P&L by segment: futures, options, intraday equity, delivery equity, commodity, currency.',
        'Charges: brokerage, STT, exchange transaction charges, SEBI fees, stamp duty and GST on brokerage. All of these are deductible expenses for business income, including STT.',
        'Other deductible expenses not on the broker report: internet, a share of phone and electricity, data subscriptions, advisory fees, depreciation on a laptop used for trading, and interest on borrowed trading capital.',
        'Open positions on 31 March 2026: mark-to-market on open futures is generally recognised only on settlement, but be consistent from year to year.',
      ],
    },
    { type: 'heading', text: 'STT rates from 1 April 2026', id: 'stt-rates' },
    {
      type: 'paragraph',
      text: 'The Finance Act 2026 raised securities transaction tax on derivatives from 1 April 2026. Your FY 2025-26 tax P&L reflects the old rates. Trades from April 2026 onwards fall in tax year 2026-27, the first year under the Income-tax Act 2025, and carry the new ones. A high-frequency trader should budget for the extra cost, because it is charged on every trade whether it makes money or not.',
    },
    {
      type: 'table',
      head: ['Transaction', 'Up to 31 March 2026', 'From 1 April 2026'],
      rows: [
        ['Futures', '0.02%', '0.05%'],
        ['Options, sale of premium', '0.1%', '0.15%'],
        ['Options exercised', '0.125%', '0.15%'],
      ],
      caption: 'STT on exchange-traded derivatives, before and after Finance Act 2026',
    },
    {
      type: 'example',
      title: 'STT on one month of trading, old and new rates',
      lines: [
        { label: 'Futures contract value subject to STT', value: '₹50,00,000' },
        { label: 'STT at 0.02% (up to 31 March 2026)', value: '₹1,000' },
        { label: 'STT at 0.05% (from 1 April 2026)', value: '₹2,500' },
        { label: 'Options premium sold', value: '₹2,00,000' },
        { label: 'STT at 0.1% (up to 31 March 2026)', value: '₹200' },
        { label: 'STT at 0.15% (from 1 April 2026)', value: '₹300' },
        { label: 'Extra STT for the month (1,500 plus 100)', value: '₹1,600', strong: true },
      ],
    },
    { type: 'heading', text: 'Should you opt for presumptive taxation under 44AD?', id: '44ad-option' },
    {
      type: 'paragraph',
      text: 'Section 44AD lets an eligible business with turnover up to ₹2 crore (₹3 crore if at least 95% of receipts are digital) declare 6% of digital turnover as profit and skip books of account. F&O is an eligible business, and because all trading receipts are digital the ₹3 crore limit and the 6% rate apply.',
    },
    {
      type: 'paragraph',
      text: 'The catch is that 44AD works only when you have a profit. If your real profit is lower than 6% of turnover, or you have a loss, you cannot declare the loss under 44AD. Declaring a loss means filing with regular books, and if you opted for 44AD in any of the previous five years and now declare less than 6%, section 44AD(4) bars you from the scheme for five years and section 44AB(e) makes a tax audit compulsory if your total income exceeds the basic exemption limit.',
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'The 44AD opt-out trap',
      text: 'Traders often pick 44AD in a profitable year to avoid keeping books, then face a loss the next year. Declaring that loss triggers a five-year exclusion from 44AD and a tax audit even at a turnover of ₹20 lakh. Decide the 44AD question with next year in mind, not just this year.',
    },
    { type: 'heading', text: 'When is a tax audit required?', id: 'tax-audit' },
    {
      type: 'paragraph',
      text: 'Section 44AB requires a tax audit when business turnover exceeds ₹1 crore. The limit rises to ₹10 crore when cash receipts and cash payments are each 5% or less of total receipts and payments. Since trading flows entirely through bank and broker accounts, almost every trader qualifies for the ₹10 crore limit.',
    },
    {
      type: 'table',
      head: ['Situation', 'Turnover', 'Audit required?'],
      rows: [
        ['Regular books, digital receipts and payments 95% or more', 'Up to ₹10 crore', 'No'],
        ['Regular books, digital receipts and payments 95% or more', 'Above ₹10 crore', 'Yes'],
        ['Cash receipts or payments above 5%', 'Above ₹1 crore', 'Yes'],
        ['Opted 44AD earlier, now declaring below 6% and income above ₹4 lakh (new regime exemption)', 'Any', 'Yes, under 44AB(e)'],
        ['Loss year, never opted for 44AD', 'Up to ₹10 crore', 'No'],
      ],
      caption: 'Tax audit triggers for traders, FY 2025-26 and tax year 2026-27 (limits unchanged)',
    },
    {
      type: 'paragraph',
      text: 'A tax audit under section 44AB can only be signed by a Chartered Accountant. For AY 2026-27, CBDT Circular 07/2026 extended the audit report in Form 3CB and 3CD from 30 September to 21 October 2026 and the audited ITR-3 from 31 October to 21 November 2026. From tax year 2026-27 the tax audit provision is section 63 of the Income-tax Act 2025, and Forms 3CA, 3CB and 3CD are replaced by Form 26 under the Income-tax Rules 2026. Books of account are separately mandatory under section 44AA when business income exceeds ₹2.5 lakh or turnover exceeds ₹25 lakh, even without an audit.',
    },
    { type: 'heading', text: 'Setting off and carrying forward trading losses', id: 'loss-set-off' },
    {
      type: 'paragraph',
      text: 'The rules differ for the two kinds of trading loss, and mixing them is the most common error in self-filed trader returns.',
    },
    {
      type: 'table',
      head: ['Loss type', 'Set off in the same year against', 'Carry forward', 'Future set-off against'],
      rows: [
        ['F&O (non-speculative)', 'Any head except salary: house property, capital gains, other sources, other business', '8 assessment years', 'Any business income including speculative'],
        ['Intraday (speculative)', 'Speculative business income only', '4 assessment years', 'Speculative income only'],
        ['Unabsorbed depreciation', 'Any head except salary', 'Indefinitely', 'Any income except salary'],
      ],
      caption: 'Loss set-off and carry forward under sections 70 to 73',
    },
    {
      type: 'example',
      title: 'Salaried employee with F&O and intraday losses',
      lines: [
        { label: 'Salary income', value: '₹12,00,000' },
        { label: 'Bank interest (other sources)', value: '₹60,000' },
        { label: 'F&O net loss', value: '₹1,50,000' },
        { label: 'Intraday net loss', value: '₹40,000' },
        { label: 'F&O loss set off against interest', value: '₹60,000' },
        { label: 'F&O loss carried forward (8 years)', value: '₹90,000', strong: true },
        { label: 'Intraday loss carried forward (4 years, speculative only)', value: '₹40,000', strong: true },
        { label: 'Taxable income (salary; loss cannot touch salary)', value: '₹12,00,000', strong: true },
      ],
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'File on time or lose the carry forward',
      text: 'Section 80 read with section 139(3) allows carry forward of business losses only when the return is filed by the due date. For AY 2026-27 the due date for a non-audit trader was 31 August 2026. A belated return filed after that, up to 31 December 2026, keeps the same-year set-off but forfeits the ₹90,000 and ₹40,000 carry forward in the example above.',
    },
    { type: 'heading', text: 'Computing tax and advance tax on trading profit', id: 'tax-and-advance-tax' },
    {
      type: 'paragraph',
      text: 'Trading profit is added to your other income and taxed at slab rates. Under the new regime for FY 2025-26, and unchanged for tax year 2026-27, the slabs are 0% up to ₹4 lakh, 5% from ₹4 to ₹8 lakh, 10% from ₹8 to ₹12 lakh, 15% from ₹12 to ₹16 lakh, 20% from ₹16 to ₹20 lakh, 25% from ₹20 to ₹24 lakh and 30% above, plus 4% cess. The section 87A rebate (section 156 from tax year 2026-27) of up to ₹60,000 makes tax nil where total income is up to ₹12 lakh. The ₹75,000 standard deduction applies only to salary, not trading income.',
    },
    {
      type: 'example',
      title: 'Full-time trader, F&O profit ₹15 lakh, new regime',
      lines: [
        { label: 'Net F&O profit after brokerage, STT and expenses', value: '₹15,00,000' },
        { label: 'Tax on ₹4 to 8 lakh at 5%', value: '₹20,000' },
        { label: 'Tax on ₹8 to 12 lakh at 10%', value: '₹40,000' },
        { label: 'Tax on ₹12 to 15 lakh at 15%', value: '₹45,000' },
        { label: 'Tax before cess', value: '₹1,05,000' },
        { label: 'Health and education cess at 4%', value: '₹4,200' },
        { label: 'Total tax payable', value: '₹1,09,200', strong: true },
        { label: 'Advance tax: 15 June (15%)', value: '₹16,380' },
        { label: 'Advance tax: 15 September (45% cumulative)', value: '₹49,140' },
        { label: 'Advance tax: 15 December (75% cumulative)', value: '₹81,900' },
        { label: 'Advance tax: 15 March (100%)', value: '₹1,09,200', strong: true },
      ],
    },
    {
      type: 'paragraph',
      text: 'Advance tax applies whenever the tax liability after TDS exceeds ₹10,000. Traders using 44AD pay the whole amount in one instalment by 15 March. Missing an instalment attracts interest at 1% per month under section 234C, and a shortfall at year end attracts 1% per month under 234B until the balance is paid. From tax year 2026-27 these are sections 425 and 424 of the Income-tax Act 2025, with the same four instalment dates.',
    },
    {
      type: 'service-card',
      serviceSlug: 'itr-fno-trader',
      text: 'We compute turnover from your broker P&L, decide the 44AD question with next year in mind, file ITR-3 with the loss schedules and refer audit cases to an empanelled Chartered Accountant.',
    },
    { type: 'heading', text: 'ITR-3 schedules a trader must fill', id: 'itr-3-schedules' },
    {
      type: 'paragraph',
      text: 'ITR-3 looks intimidating because it is designed for every kind of business. A trader touches only a handful of schedules. Fill them in this order so the figures flow correctly.',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Part A-GEN: tick that you are liable to maintain books under 44AA if applicable, and answer the 44AB audit question.',
        'Part A-BS and Part A-P&L: the balance sheet and profit and loss account. Traders without books use the "no account case" rows to report gross receipts, gross profit, expenses and net profit.',
        'Schedule BP: separate speculative (intraday) and non-speculative (F&O) income. This is where losses first appear.',
        'Schedule CYLA: current year set-off of F&O loss against other heads.',
        'Schedule BFLA and CFL: brought forward losses adjusted and the balance carried forward, year by year.',
        'Schedule CG: delivery-based equity and mutual fund gains, if any.',
        'Schedule AL: assets and liabilities, mandatory when total income exceeds ₹50 lakh.',
        'Schedule TDS and IT: TDS from Form 26AS and advance tax challans, reconciled with AIS.',
      ],
    },
    { type: 'heading', text: 'Common mistakes traders make', id: 'common-mistakes' },
    {
      type: 'list',
      items: [
        'Filing ITR-1 or ITR-2 and ignoring F&O because it was a loss. AIS now carries derivative data from exchanges, and a 139(9) defective return notice or a 143(1)(a) adjustment follows.',
        'Reporting contract value as turnover, which pushes small traders over the audit limit on paper.',
        'Setting off intraday losses against F&O profit, which is not allowed.',
        'Claiming the ₹75,000 standard deduction against trading income.',
        'Choosing 44AD in a profit year without planning for the opt-out consequences in a loss year.',
        'Missing the due date (31 August 2026 for non-audit traders for AY 2026-27) and losing the 8-year carry forward.',
      ],
    },
    { type: 'heading', text: 'What to do next', id: 'what-to-do-next' },
    {
      type: 'paragraph',
      text: 'For AY 2026-27, audit cases can still file by 21 November 2026. Non-audit traders who missed 31 August 2026 can file a belated return until 31 December 2026 with the section 234F fee of ₹5,000 (₹1,000 if total income is up to ₹5 lakh), but the loss carry forward is gone. For tax year 2026-27, keep the tax P&L from every broker you use, budget for the higher STT and compute turnover the ICAI way before deciding on 44AD. If turnover is under ₹10 crore and you have never opted for 44AD, you can file with a loss and no audit. If you are unsure, an expert-assisted trader return gets the turnover, set-off and schedules right the first time, and audit-tier work goes to an empanelled Chartered Accountant.',
    },
  ],
  faqs: [
    {
      q: 'Is F&O income taxed as capital gains or business income?',
      a: 'Business income. Proviso (d) to section 43(5) treats exchange-traded derivatives as non-speculative business, so F&O profit is added to your income and taxed at slab rates, and F&O loss can be set off against any head except salary.',
    },
    {
      q: 'How is F&O turnover calculated for tax audit?',
      a: 'Add the absolute value of profit and loss on each futures and options trade, and include premium received on options sold that were not squared off. A profit of ₹50,000 and a loss of ₹30,000 give a turnover of ₹80,000. Contract value is not turnover.',
    },
    {
      q: 'Is tax audit compulsory if I have an F&O loss?',
      a: 'No, not merely because of a loss. Audit is required if turnover exceeds ₹10 crore (₹1 crore where cash exceeds 5% of receipts or payments), or if you opted for 44AD in any of the last five years and now declare below 6% with total income above the basic exemption limit.',
    },
    {
      q: 'Can I set off F&O losses against my salary?',
      a: 'No. Business loss cannot be set off against salary under section 71(2A). It can be set off against interest, rent, capital gains or other business income in the same year, and the balance carried forward for 8 years against business income.',
    },
    {
      q: 'For how many years can intraday losses be carried forward?',
      a: 'Four assessment years, and only against speculative business income. F&O losses, being non-speculative, get 8 years and can be set off against any business income.',
    },
    {
      q: 'Which ITR form should an F&O trader file for AY 2026-27?',
      a: 'ITR-3, because F&O and intraday are business income. ITR-4 is possible only if you declare profit under 44AD with turnover up to ₹3 crore and have no capital gains or foreign assets.',
    },
    {
      q: 'Can a salaried person use 44AD for F&O income?',
      a: 'Yes, if turnover is within ₹3 crore (digital receipts) and you are willing to declare at least 6% of turnover as profit. Once opted, declaring a lower profit in any of the next five years triggers a five-year bar and a tax audit.',
    },
    {
      q: 'What is the last date to file ITR-3 for F&O traders?',
      a: 'For AY 2026-27: 31 August 2026 for non-audit cases, a permanent change made by the Finance Act 2026 (now passed), and 21 November 2026 where a tax audit applies, with the audit report due by 21 October 2026 under CBDT Circular 07/2026. A belated return can be filed until 31 December 2026 but forfeits loss carry forward. For tax year 2026-27 the dates are 31 August 2027 and 31 October 2027.',
    },
    {
      q: 'What is the STT on F&O trades from 1 April 2026?',
      a: '0.05% on futures, up from 0.02%, and 0.15% on the sale of options premium, up from 0.1%. Exercised options also attract 0.15%, up from 0.125%. The new rates apply to every trade in tax year 2026-27.',
    },
    {
      q: 'Do I have to pay advance tax on F&O profits?',
      a: 'Yes, if your total tax after TDS exceeds ₹10,000. Instalments of 15%, 45%, 75% and 100% fall due on 15 June, 15 September, 15 December and 15 March. Under 44AD the entire amount is due by 15 March.',
    },
  ],
  relatedServiceSlug: 'itr-fno-trader',
  relatedGuides: ['capital-gains-tax-guide', 'which-itr-form-to-file', 'belated-revised-updated-return'],
  relatedCalculators: ['advance-tax', 'income-tax'],
}
