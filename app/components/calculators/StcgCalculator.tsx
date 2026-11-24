'use client'

import CapitalGainsCalculator from './CapitalGainsCalculator'

export default function StcgCalculator() {
  return <CapitalGainsCalculator initial={{ buyDate: '2026-05-10', sellDate: '2026-10-20', buyPrice: '500000', sellPrice: '600000' }} />
}
