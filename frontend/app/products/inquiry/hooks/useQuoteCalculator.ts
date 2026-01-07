// 견적 계산 훅 (메모이제이션)

"use client"

import { useMemo } from "react"
import type { QuoteItem } from "../types"
import { calculateQuoteTotals } from "../lib/calculator"

/**
 * 견적 계산 훅 파라미터
 */
export type UseQuoteCalculatorParams = {
  items: QuoteItem[]
  shippingFee: number
  discount: number
}

/**
 * 견적 계산 커스텀 훅
 * 순수 계산을 메모이제이션하여 렌더 성능을 최적화합니다
 * 
 * @param params - 계산에 필요한 파라미터
 * @returns 계산된 합계 정보
 */
export function useQuoteCalculator({ items, shippingFee, discount }: UseQuoteCalculatorParams) {
  const totals = useMemo(
    () => calculateQuoteTotals(items, shippingFee, discount), 
    [items, shippingFee, discount]
  )
  return totals
}


