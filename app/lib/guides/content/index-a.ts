// Guide batch A: ITR filing, tax saving and capital gains pillars.
// Merged into GUIDE_LIST in ./index.ts alongside batch B.
import type { Guide } from '../types'
import { guide as itrFilingGuide } from './itr-filing-guide-ay-2026-27'
import { guide as whichItrForm } from './which-itr-form-to-file'
import { guide as belatedRevisedUpdated } from './belated-revised-updated-return'
import { guide as oldVsNewRegime } from './old-vs-new-tax-regime'
import { guide as hraExemption } from './hra-exemption'
import { guide as capitalGains } from './capital-gains-tax-guide'
import { guide as incomeTaxSlabs } from './income-tax-slabs-fy-2025-26'

export const GUIDES_A: Guide[] = [
  incomeTaxSlabs,
  itrFilingGuide,
  whichItrForm,
  belatedRevisedUpdated,
  oldVsNewRegime,
  hraExemption,
  capitalGains,
]
