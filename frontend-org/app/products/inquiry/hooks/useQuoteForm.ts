// 견적 폼 상태 관리 훅

"use client"

import { useState, useMemo, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import type { QuoteFormData } from "../types"
import { createInitialQuoteFormData } from "../constants"
import { calculateQuoteTotals } from "../lib/calculator"
import { validateQuoteForm } from "../lib/validation"

/**
 * 견적 폼 상태 및 비즈니스 로직 관리 훅
 * 폼 데이터 상태, 검증, 제출 로직을 캡슐화합니다
 */
export function useQuoteForm() {
  const [formData, setFormData] = useState<QuoteFormData>(createInitialQuoteFormData())
  const { toast } = useToast()

  /**
   * 고객 정보 업데이트
   */
  const updateCustomerInfo = useCallback((customer: QuoteFormData["customer"]) => {
    setFormData(prev => ({ ...prev, customer }))
  }, [])

  /**
   * 세금계산서 정보 업데이트
   */
  const updateInvoiceInfo = useCallback((invoice: QuoteFormData["invoice"]) => {
    setFormData(prev => ({ ...prev, invoice }))
  }, [])

  /**
   * 품목 목록 업데이트
   */
  const updateItems = useCallback((items: QuoteFormData["items"]) => {
    setFormData(prev => ({ ...prev, items }))
  }, [])

  /**
   * 추가 정보 업데이트
   */
  const updateExtraInfo = useCallback((extra: QuoteFormData["extra"]) => {
    setFormData(prev => ({ ...prev, extra }))
  }, [])

  /**
   * 폼 초기화
   */
  const resetForm = useCallback(() => {
    setFormData(createInitialQuoteFormData())
  }, [])

  /**
   * 폼 제출 처리
   * 검증 후 성공/실패 토스트 표시
   */
  const submitForm = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    
    // 검증
    const errors = validateQuoteForm(formData)
    if (errors.length > 0) {
      toast({ 
        title: "입력값을 확인해 주세요.", 
        description: errors.join("\n"),
        variant: "destructive"
      })
      return false
    }

    // 실제 환경에서는 백엔드 API로 전송
    // 여기서는 콘솔로 확인
    console.log("QUOTE_SUBMIT", formData)
    
    toast({ 
      title: "견적 요청이 접수되었습니다.", 
      description: "담당자가 확인 후 연락드리겠습니다." 
    })
    
    // 폼 초기화
    resetForm()
    return true
  }, [formData, toast, resetForm])

  /**
   * 합계 계산 (메모이제이션)
   */
  const totals = useMemo(() => {
    return calculateQuoteTotals(
      formData.items,
      formData.extra.shippingFee,
      formData.extra.discount
    )
  }, [formData.items, formData.extra.shippingFee, formData.extra.discount])

  return {
    formData,
    totals,
    updateCustomerInfo,
    updateInvoiceInfo,
    updateItems,
    updateExtraInfo,
    resetForm,
    submitForm,
  }
}

