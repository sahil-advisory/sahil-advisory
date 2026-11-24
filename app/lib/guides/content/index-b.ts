// Guide batch B: traders, GST, TDS, notices, business setup, Act 2025.
// Merged into GUIDE_LIST in ./index.ts alongside batch A.
import type { Guide } from '../types'
import { guide as fnoTradingTax } from './fno-trading-tax-guide'
import { guide as gstReturnFiling } from './gst-return-filing-guide'
import { guide as gstRegistration } from './gst-registration-guide'
import { guide as tdsForEmployers } from './tds-guide-for-employers'
import { guide as incomeTaxNotices } from './income-tax-notices-explained'
import { guide as llpVsPvtLtd } from './llp-vs-pvt-ltd'
import { guide as cmaReport } from './cma-report-bank-loan'
import { guide as cmaCharges } from './cma-report-charges'
import { guide as cmaSample } from './cma-report-sample'
import { guide as workingCapital } from './working-capital-assessment'
import { guide as incomeTaxAct2025 } from './income-tax-act-2025-what-changes'

export const GUIDES_B: Guide[] = [
  fnoTradingTax,
  gstReturnFiling,
  gstRegistration,
  tdsForEmployers,
  incomeTaxNotices,
  llpVsPvtLtd,
  cmaReport,
  cmaCharges,
  cmaSample,
  workingCapital,
  incomeTaxAct2025,
]
