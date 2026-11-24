'use client'

import CapitalGainsCalculator from './CapitalGainsCalculator'

export default function LtcgCalculator() {
  return <CapitalGainsCalculator initial={{ buyDate: '2024-06-10', sellDate: '2026-10-20', buyPrice: '500000', sellPrice: '800000' }} />
}
