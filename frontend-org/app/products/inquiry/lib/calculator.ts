// 견적 계산 로직

import { QUOTE_FORM_OPTIONS } from "../constants"
import type { QuoteItem, QuoteTotals } from "../types"

/**
 * 견적 합계 계산 함수
 * 품목별 공급가, 세액을 계산하여 총액을 반환합니다
 * 
 * @param items - 품목 목록
 * @param shippingFee - 배송비
 * @param discount - 할인 (퍼센트 또는 금액)
 * @param opts - 옵션 (할인 모드)
 * @returns 계산된 합계 정보
 */
export function calculateQuoteTotals(
  items: QuoteItem[],
  shippingFee: number,
  discount: number,
  opts?: { discountMode?: "rate" | "amount" }
): QuoteTotals {
  // Early return: 품목이 없는 경우
  if (!Array.isArray(items) || items.length === 0) {
    const shipping = Math.max(0, shippingFee)
    const discountMode = opts?.discountMode ?? QUOTE_FORM_OPTIONS.discount.mode
    const discountAmount = discountMode === "rate" ? 0 : Math.max(0, discount)
    const itemsTotal = 0
    const grandTotal = Math.max(0, itemsTotal + shipping - discountAmount)
    
    return { 
      supplyAmount: 0, 
      taxAmount: 0, 
      itemsTotal, 
      grandTotal, 
      discountAmount 
    }
  }

  let supplyAmount = 0
  let taxAmount = 0

  // 품목별 공급가 및 세액 계산
  for (const item of items) {
    const quantity = Math.max(0, item.quantity || 0)
    const price = Math.max(0, item.unitPrice || 0)
    const lineSupply = quantity * price
    
    supplyAmount += lineSupply
    
    // 과세 품목인 경우 세액 추가
    if (item.taxType === "과세") {
      taxAmount += Math.floor(lineSupply * QUOTE_FORM_OPTIONS.vatRate)
    }
  }

  const itemsTotal = supplyAmount + taxAmount
  const discountMode = opts?.discountMode ?? QUOTE_FORM_OPTIONS.discount.mode
  
  // 할인 금액 계산
  const discountAmount = discountMode === "rate"
    ? Math.floor(Math.max(0, Math.min(100, discount)) * itemsTotal / 100)
    : Math.max(0, discount)

  // 최종 합계
  const grandTotal = Math.max(0, itemsTotal + Math.max(0, shippingFee) - discountAmount)
  
  return { 
    supplyAmount, 
    taxAmount, 
    itemsTotal, 
    grandTotal, 
    discountAmount 
  }
}

/**
 * 단일 품목의 공급가 계산
 * 
 * @param unitPrice - 단가
 * @param quantity - 수량
 * @returns 공급가
 */
export function calculateLineSupplyAmount(unitPrice: number, quantity: number): number {
  return Math.max(0, (unitPrice || 0) * (quantity || 0))
}

/**
 * 단일 품목의 세액 계산
 * 
 * @param supplyAmount - 공급가
 * @param taxType - 과세 구분
 * @returns 세액
 */
export function calculateLineTaxAmount(supplyAmount: number, taxType: "과세" | "면세"): number {
  if (taxType === "과세") {
    return Math.floor(supplyAmount * QUOTE_FORM_OPTIONS.vatRate)
  }
  return 0
}

