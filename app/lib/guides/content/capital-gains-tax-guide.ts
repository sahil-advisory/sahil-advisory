import type { Guide } from '../types'

export const guide: Guide = {
  slug: 'capital-gains-tax-guide',
  cluster: 'capital-gains',
  title: 'Capital Gains Tax in India FY 2025-26: Shares, Mutual Funds and Property',
  h1: 'Capital Gains Tax in India FY 2025-26: Shares, Mutual Funds and Property',
  metaTitle: 'Capital Gains Tax FY 2025-26: Shares, Funds, Property',
  metaDescription:
    'Capital gains tax FY 2025-26: holding periods, 20% STCG, 12.5% LTCG above ₹1.25 lakh, property at 12.5% or 20% indexed, sections 54 and 54F, loss set-off.',
  keywords: [
    'capital gains tax india',
    'ltcg tax on shares',
    'stcg tax rate 2025-26',
    'capital gains on property',
    'section 54 exemption',
    'ltcg on mutual funds',
    'indexation on property sale',
    'capital loss set off',
    'grandfathering ltcg',
  ],
  excerpt:
    'A single reference for how shares, equity and debt mutual funds, property, gold and crypto are taxed in FY 2025-26, with the post-July 2024 rates, worked examples, reinvestment exemptions and loss rules.',
  datePublished: '2026-09-06',
  dateModified: '2026-09-06',
  readMinutes: 14,
  sections: [
    {
      type: 'key-takeaways',
      items: [
        'Listed shares and equity mutual funds held over 12 months are long-term: gains above ₹1.25 lakh a year are taxed at 12.5%. Held 12 months or less, gains are short-term and taxed at 20%.',
        'Property and most other assets become long-term after 24 months and are taxed at 12.5% without indexation. Resident individuals and HUFs who bought property before 23 July 2024 can instead pay 20% with indexation if that is lower.',
        'Debt mutual funds bought on or after 1 April 2023 are taxed at your slab rate regardless of holding period. Crypto is taxed at a flat 30% with no loss set-off.',
        'Long-term capital losses set off only against long-term gains; short-term losses set off against both. Unabsorbed losses carry forward for 8 years only if you file by the due date.',
      ],
    },
    {
      type: 'stat-grid',
      stats: [
        { label: 'Equity STCG rate', value: '20%', note: 'Held 12 months or less' },
        { label: 'LTCG rate (all assets)', value: '12.5%', note: 'Without indexation' },
        { label: 'Equity LTCG exemption', value: '₹1.25 lakh', note: 'Per financial year, u/s 112A' },
        { label: 'Loss carry forward', value: '8 years', note: 'Return must be filed by the due date' },
      ],
    },
    {
      type: 'tool-card',
      calculatorSlug: 'capital-gains',
      text: 'Pick the asset, enter purchase and sale dates and amounts, and the calculator applies the right holding period, rate and exemption, including the indexed 20% option for pre-July 2024 property.',
    },
    { type: 'heading', text: 'The July 2024 reset: one set of rates for everything', id: 'july-2024-changes' },
    {
      type: 'paragraph',
      text: 'The Finance (No. 2) Act 2024 simplified capital gains from 23 July 2024. Long-term gains on every asset class are now taxed at 12.5% without indexation, short-term gains on listed equity moved from 15% to 20%, and the equity LTCG exemption rose from ₹1 lakh to ₹1.25 lakh. Holding periods were reduced to two categories: 12 months for listed securities and 24 months for everything else. FY 2025-26 is the first full year under these rules.',
    },
    { type: 'heading', text: 'Holding periods and rates by asset', id: 'holding-periods-rates' },
    {
      type: 'table',
      head: ['Asset', 'Long-term if held more than', 'STCG rate', 'LTCG rate'],
      rows: [
        ['Listed equity shares, equity mutual funds (65%+ equity), units of business trusts', '12 months', '20% u/s 111A', '12.5% u/s 112A above ₹1.25 lakh'],
        ['Listed bonds, debentures, government securities', '12 months', 'Slab rate', '12.5%'],
        ['Debt mutual funds bought on or after 1 April 2023', 'Never long-term (section 50AA)', 'Slab rate', 'Not applicable'],
        ['Debt mutual funds bought before 1 April 2023', '24 months', 'Slab rate', '12.5%'],
        ['Hybrid and international funds (35% to 65% equity), gold funds, FoFs bought on or after 1 April 2023', '24 months', 'Slab rate', '12.5%'],
        ['Land, building, residential property', '24 months', 'Slab rate', '12.5%, or 20% with indexation for pre-23 July 2024 purchases (resident individuals and HUFs)'],
        ['Unlisted shares, physical gold, jewellery, other capital assets', '24 months', 'Slab rate', '12.5%'],
        ['Crypto and other virtual digital assets', 'Not applicable', '30% flat u/s 115BBH', '30% flat u/s 115BBH'],
      ],
      caption: 'Rates for transfers during FY 2025-26. Add 4% cess to every rate, and surcharge where total income exceeds ₹50 lakh (surcharge on 111A and 112A gains is capped at 15%).',
    },
    { type: 'heading', text: 'Listed shares and equity mutual funds', id: 'equity-shares-mutual-funds' },
    {
      type: 'paragraph',
      text: 'Equity gains are computed per transaction on a first-in-first-out basis for shares held in demat form. Your broker tax P&L and the CAMS or KFintech capital gains statement already do this, but check that the statement uses the post-July 2024 rates and the grandfathered cost for pre-2018 holdings.',
    },
    {
      type: 'example',
      title: 'Long-term gain on equity mutual fund: bought 10 January 2024 for ₹4,00,000, sold 15 October 2025 for ₹6,50,000',
      lines: [
        { label: 'Holding period', value: '21 months (long-term)' },
        { label: 'Capital gain', value: '₹2,50,000' },
        { label: 'Less exemption u/s 112A', value: '₹1,25,000' },
        { label: 'Taxable LTCG', value: '₹1,25,000' },
        { label: 'Tax at 12.5%', value: '₹15,625' },
        { label: 'Add cess 4%', value: '₹625' },
        { label: 'Tax payable', value: '₹16,250', strong: true },
      ],
    },
    {
      type: 'example',
      title: 'Short-term gain on shares: bought 3 March 2025 for ₹3,00,000, sold 20 September 2025 for ₹3,80,000',
      lines: [
        { label: 'Holding period', value: '6 months (short-term)' },
        { label: 'Capital gain', value: '₹80,000' },
        { label: 'Tax at 20% u/s 111A', value: '₹16,000' },
        { label: 'Add cess 4%', value: '₹640' },
        { label: 'Tax payable', value: '₹16,640', strong: true },
      ],
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'The ₹1.25 lakh exemption resets every year',
      text: 'Investors with large equity holdings can book up to ₹1.25 lakh of long-term gains each March and reinvest, paying no tax and raising the cost base. The 87A rebate does not apply to 112A gains, so this harvesting is the main relief available.',
    },
    { type: 'heading', text: 'Grandfathering for shares bought before 1 February 2018', id: 'grandfathering' },
    {
      type: 'paragraph',
      text: 'Equity LTCG was fully exempt until 31 January 2018. To protect gains up to that date, the cost of shares or equity fund units bought before 1 February 2018 is taken as the higher of the actual cost and the lower of the fair market value on 31 January 2018 and the sale price. In effect, only appreciation after 31 January 2018 is taxed.',
    },
    {
      type: 'example',
      title: 'Grandfathering: bought in 2015 for ₹1,00,000, FMV on 31 January 2018 ₹2,60,000, sold in FY 2025-26 for ₹4,00,000',
      lines: [
        { label: 'Actual cost', value: '₹1,00,000' },
        { label: 'Lower of FMV (₹2,60,000) and sale price (₹4,00,000)', value: '₹2,60,000' },
        { label: 'Deemed cost (higher of the two)', value: '₹2,60,000' },
        { label: 'Long-term capital gain', value: '₹1,40,000' },
        { label: 'Taxable after ₹1,25,000 exemption', value: '₹15,000' },
        { label: 'Tax at 12.5% plus cess', value: '₹1,950', strong: true },
      ],
    },
    { type: 'heading', text: 'Debt, hybrid and gold funds', id: 'debt-hybrid-gold-funds' },
    {
      type: 'paragraph',
      text: 'Debt fund units bought on or after 1 April 2023 are deemed short-term under section 50AA no matter how long you hold them, so the gain is added to income and taxed at your slab. Units bought before that date follow the 24-month rule and get 12.5% as long-term, without indexation, if sold on or after 23 July 2024.',
    },
    {
      type: 'paragraph',
      text: 'Hybrid funds with 35% to 65% in equity, gold ETFs, gold funds, international funds and fund of funds are treated like debt for units bought on or after 1 April 2023, but from 1 April 2025 those held more than 24 months qualify as long-term at 12.5%. Sovereign Gold Bonds redeemed at maturity with the RBI remain exempt.',
    },
    { type: 'heading', text: 'Property: 12.5% or 20% with indexation', id: 'property' },
    {
      type: 'paragraph',
      text: 'Land and buildings held for more than 24 months are long-term. The default rate is 12.5% on the difference between sale price and actual cost, with no inflation adjustment. Resident individuals and HUFs who acquired the property before 23 July 2024 may instead compute tax at 20% on the gain after indexing the cost with the Cost Inflation Index, and pay whichever is lower. Companies, firms and non-residents get only the 12.5% route.',
    },
    {
      type: 'example',
      title: 'Older property: bought June 2010 for ₹30,00,000 (CII 167), sold November 2025 for ₹1,20,00,000 (CII 376)',
      lines: [
        { label: 'Gain without indexation (₹1,20,00,000 minus ₹30,00,000)', value: '₹90,00,000' },
        { label: 'Tax at 12.5%', value: '₹11,25,000' },
        { label: 'Indexed cost (₹30,00,000 x 376 / 167)', value: '₹67,54,491' },
        { label: 'Indexed gain', value: '₹52,45,509' },
        { label: 'Tax at 20% on indexed gain', value: '₹10,49,102' },
        { label: 'Lower tax (choose 20% indexed), before cess', value: '₹10,49,102', strong: true },
      ],
    },
    {
      type: 'example',
      title: 'Recent property: bought August 2021 for ₹60,00,000 (CII 317), sold December 2025 for ₹90,00,000 (CII 376)',
      lines: [
        { label: 'Gain without indexation', value: '₹30,00,000' },
        { label: 'Tax at 12.5%', value: '₹3,75,000' },
        { label: 'Indexed cost (₹60,00,000 x 376 / 317)', value: '₹71,16,719' },
        { label: 'Indexed gain', value: '₹18,83,281' },
        { label: 'Tax at 20% on indexed gain', value: '₹3,76,656' },
        { label: 'Lower tax (choose 12.5%), before cess', value: '₹3,75,000', strong: true },
      ],
    },
    {
      type: 'paragraph',
      text: 'The pattern is consistent: the longer you have held, the more indexation helps, so properties bought before roughly 2017 usually favour the 20% indexed route, while recent purchases favour 12.5%. Stamp duty value under section 50C is treated as the sale price if it exceeds the actual consideration by more than 10%, so check the circle rate before signing.',
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Buyer TDS and advance tax',
      text: 'The buyer must deduct 1% TDS under section 194-IA if the property price is ₹50 lakh or more, and file Form 26QB. The seller still has to pay the balance tax as advance tax in the instalment following the sale, or face interest under section 234C.',
    },
    { type: 'heading', text: 'Exemptions: sections 54, 54F and 54EC', id: 'exemptions-54-54f-54ec' },
    {
      type: 'table',
      head: ['Section', 'Asset sold', 'Reinvest in', 'Time limit', 'Key limits'],
      rows: [
        ['54', 'Residential house (long-term)', 'One residential house in India (two if gain is up to ₹2 crore, once in a lifetime)', '1 year before or 2 years after sale; 3 years for construction', 'Exemption capped at ₹10 crore; new house cannot be sold for 3 years'],
        ['54F', 'Any long-term asset other than a residential house (shares, gold, land)', 'One residential house in India', 'Same as section 54', 'Must invest the full net sale consideration for full exemption, else proportionate; cannot own more than one other house; capped at ₹10 crore'],
        ['54EC', 'Land or building (long-term)', 'Bonds of NHAI, REC, PFC or IRFC', 'Within 6 months of sale', 'Maximum ₹50 lakh per financial year; 5-year lock-in'],
        ['54B', 'Agricultural land used for 2 years', 'Other agricultural land', 'Within 2 years', 'Rural land is not a capital asset at all'],
      ],
    },
    {
      type: 'paragraph',
      text: 'If you cannot buy the new house before the return due date, deposit the unutilised gain in a Capital Gains Account Scheme account with a bank before 31 July 2026 to keep the exemption alive. Money left in the account after the time limit becomes taxable in the year the limit expires.',
    },
    {
      type: 'service-card',
      serviceSlug: 'itr-capital-gains',
      text: 'Sold property or have hundreds of equity transactions? We compute gains with grandfathering, run the 12.5% versus indexed 20% comparison, plan 54, 54F and 54EC claims and file ITR-2 or ITR-3. From ₹1,999.',
    },
    { type: 'heading', text: 'Set-off and carry forward of capital losses', id: 'set-off-carry-forward' },
    {
      type: 'paragraph',
      text: 'Losses are not wasted if you follow the ordering rules. Within the year, a short-term capital loss can be set off against any capital gain, short or long. A long-term capital loss can be set off only against long-term gains. Capital losses cannot be set off against salary, business or other income.',
    },
    {
      type: 'list',
      items: [
        'Unabsorbed losses carry forward for 8 assessment years, but only if the return for the loss year is filed by the due date under section 139(1).',
        'Carried-forward losses must be reported every year in Schedule CFL, even in years with no gains, or CPC drops them.',
        'Long-term losses on equity are allowed since AY 2019-20 and can be set off against LTCG on property or gold.',
        'Losses on crypto cannot be set off against anything, not even other crypto gains, and cannot be carried forward.',
        'Intraday equity losses are speculative business losses, not capital losses, and set off only against speculative gains for 4 years.',
      ],
    },
    {
      type: 'example',
      title: 'Set-off in FY 2025-26: LTCG on property ₹8,00,000, LTCL on shares ₹3,00,000, STCL on shares ₹1,00,000',
      lines: [
        { label: 'Long-term gain on property', value: '₹8,00,000' },
        { label: 'Less long-term loss on shares', value: '₹3,00,000' },
        { label: 'Less short-term loss on shares', value: '₹1,00,000' },
        { label: 'Net taxable long-term gain', value: '₹4,00,000' },
        { label: 'Tax at 12.5% plus 4% cess', value: '₹52,000', strong: true },
      ],
    },
    { type: 'heading', text: 'Crypto, ESOPs and other special cases', id: 'special-cases' },
    {
      type: 'list',
      items: [
        'Crypto and NFTs: 30% flat tax under section 115BBH on each transfer, no deduction except cost of acquisition, no set-off, and 1% TDS under section 194S deducted by the exchange. Reported in Schedule VDA.',
        'ESOPs and RSUs: the difference between fair market value and exercise price is taxed as salary perquisite at allotment; the later sale is a capital gain with the FMV as cost. Foreign shares are unlisted for Indian purposes, so 24 months applies.',
        'Bonus shares: cost is nil, holding period starts from the bonus allotment date. Rights shares: cost is the amount paid.',
        'Gifts and inheritance: no tax on receipt from relatives; on sale, the previous owner cost and holding period are inherited.',
        'Non-residents: TDS is deducted on the full sale consideration of property at the applicable rate unless a lower deduction certificate is obtained under section 197. Indexation is not available.',
      ],
    },
    { type: 'heading', text: 'Reporting capital gains in your ITR', id: 'reporting-in-itr' },
    {
      type: 'paragraph',
      text: 'Capital gains beyond the small 112A allowance push you to ITR-2, or ITR-3 if you also have business income. Schedule CG asks for gains split by asset type and by quarter, which feeds the advance tax interest computation under section 234C. Schedule 112A requires scrip-wise details for grandfathered holdings, and Schedule CFL carries the loss history.',
    },
    {
      type: 'callout',
      tone: 'success',
      title: 'Match AIS before filing',
      text: 'AIS lists every sale reported by your broker, depository and sub-registrar, usually at gross value. A return whose Schedule CG totals differ from AIS gets flagged. Reconcile first, then file.',
    },
    { type: 'heading', text: 'What to do next', id: 'what-to-do-next' },
    {
      type: 'paragraph',
      text: 'Download your broker tax P&L, mutual fund capital gains statements and, if you sold property, the sale deed and original purchase documents. Run each asset through the capital gains calculator, decide the indexed versus 12.5% route for property, check whether a section 54 or 54EC investment is still within its time limit, and file ITR-2 by the due date so that any losses stay available for the next 8 years.',
    },
  ],
  faqs: [
    {
      q: 'What is the LTCG tax rate on shares for FY 2025-26?',
      a: '12.5% on long-term gains above ₹1.25 lakh in a financial year, plus 4% cess. Long-term means listed shares or equity mutual funds held for more than 12 months.',
    },
    {
      q: 'What is the STCG tax rate on equity?',
      a: '20% plus cess under section 111A for listed equity and equity funds sold within 12 months of purchase, where STT was paid. This rose from 15% on 23 July 2024.',
    },
    {
      q: 'Is indexation still available on property sale?',
      a: 'Only as an option for resident individuals and HUFs on property acquired before 23 July 2024. You compute tax at 12.5% without indexation and at 20% with indexation, and pay the lower amount. Property bought after that date gets 12.5% only.',
    },
    {
      q: 'How are debt mutual funds taxed in 2025-26?',
      a: 'Units bought on or after 1 April 2023 are taxed at your income slab regardless of holding period. Units bought before that date and held more than 24 months are long-term at 12.5% without indexation.',
    },
    {
      q: 'How much capital gain is exempt on property under section 54?',
      a: 'The full long-term gain up to ₹10 crore, if you buy a residential house within 2 years (or 1 year before) or construct within 3 years. If the gain is up to ₹2 crore you can buy two houses, once in your lifetime.',
    },
    {
      q: 'Can I set off short-term capital loss against long-term capital gain?',
      a: 'Yes. Short-term losses set off against both short-term and long-term gains. Long-term losses set off only against long-term gains. Neither can be set off against salary or business income.',
    },
    {
      q: 'What is grandfathering in LTCG on shares?',
      a: 'For shares and equity funds bought before 1 February 2018, the cost is taken as the higher of actual cost and the lower of the 31 January 2018 fair market value and the sale price. Only gains after 31 January 2018 are taxed.',
    },
    {
      q: 'How is crypto taxed in India?',
      a: 'A flat 30% plus cess on every gain under section 115BBH, with no deduction other than purchase cost, no set-off of losses and 1% TDS under section 194S on each transfer above ₹10,000 (₹50,000 for specified persons).',
    },
    {
      q: 'Do I need to pay advance tax on capital gains?',
      a: 'Yes if total tax after TDS exceeds ₹10,000. Because gains cannot be predicted, section 234C interest is waived as long as you pay the tax on the gain in the instalment immediately after the sale, or by 31 March if the sale is after 15 March.',
    },
    {
      q: 'Which ITR form is required for capital gains?',
      a: 'ITR-2 for individuals and HUFs without business income. ITR-3 if you also have business or professional income, including F&O trading. ITR-1 is allowed only for 112A long-term gains up to ₹1.25 lakh with no losses.',
    },
  ],
  relatedServiceSlug: 'itr-capital-gains',
  relatedGuides: ['fno-trading-tax-guide', 'which-itr-form-to-file', 'itr-filing-guide-ay-2026-27'],
  relatedCalculators: ['capital-gains', 'advance-tax'],
}
