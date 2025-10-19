"use client"

import { useMemo } from "react"
import type { QuoteItem } from "../config"
import { calculateTotals } from "../config"

export type UseQuoteCalculatorParams = {
  items: QuoteItem[]
  shippingFee: number
  discount: number
}

export function useQuoteCalculator({ items, shippingFee, discount }: UseQuoteCalculatorParams) {
  // 순수 계산을 메모이제이션하여 렌더 성능 최적화
  const totals = useMemo(() => calculateTotals(items, shippingFee, discount), [items, shippingFee, discount])
  return totals
}


