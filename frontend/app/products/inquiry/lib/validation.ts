// 견적 폼 검증 로직

import type { QuoteFormData } from "../types"

/**
 * 견적 폼 데이터 검증 함수
 * 모든 필수 입력값을 검증하고 에러 메시지 배열을 반환합니다
 * 
 * @param form - 검증할 폼 데이터
 * @returns 에러 메시지 배열 (비어있으면 검증 성공)
 */
export function validateQuoteForm(form: QuoteFormData): string[] {
  const errors: string[] = []

  // 고객 정보 검증
  if (!form.customer.organizationName?.trim()) {
    errors.push("기관/학교명을 입력하세요.")
  }
  
  if (!form.customer.managerName?.trim()) {
    errors.push("담당자명을 입력하세요.")
  }
  
  if (!isValidPhone(form.customer.phone)) {
    errors.push("연락처 형식을 확인하세요.")
  }
  
  if (!isValidEmail(form.customer.email)) {
    errors.push("이메일 형식을 확인하세요.")
  }

  // 품목 검증
  if (!Array.isArray(form.items) || form.items.length === 0) {
    errors.push("품목을 1개 이상 추가하세요.")
  }
  
  for (const [idx, item] of form.items.entries()) {
    if (!item.name?.trim()) {
      errors.push(`${idx + 1}번 품목명을 입력하세요.`)
    }
    
    if (item.unitPrice < 0) {
      errors.push(`${idx + 1}번 단가는 0 이상이어야 합니다.`)
    }
    
    if (item.quantity <= 0) {
      errors.push(`${idx + 1}번 수량은 1 이상이어야 합니다.`)
    }
  }

  // 세금계산서 정보 검증
  if (form.invoice.needTaxInvoice) {
    if (!form.invoice.companyName?.trim()) {
      errors.push("세금계산서 상호(회사명)를 입력하세요.")
    }
    
    if (!isValidBusinessNumber(form.invoice.businessNumber || "")) {
      errors.push("사업자번호 형식을 확인하세요.")
    }
    
    if (!isValidEmail(form.invoice.taxEmail || "")) {
      errors.push("세금계산서 이메일을 입력하세요.")
    }
  }

  // 개인정보 동의 검증
  if (!form.extra.agreePrivacy) {
    errors.push("개인정보 수집·이용에 동의해 주세요.")
  }

  return errors
}

/**
 * 연락처 형식 검증
 * 형식: 010-0000-0000 또는 02-000-0000
 */
function isValidPhone(phone: string): boolean {
  return /^\d{2,3}-?\d{3,4}-?\d{4}$/.test(phone)
}

/**
 * 이메일 형식 검증
 */
function isValidEmail(email: string): boolean {
  return /.+@.+\..+/.test(email)
}

/**
 * 사업자번호 형식 검증
 * 형식: 000-00-00000
 */
function isValidBusinessNumber(businessNumber: string): boolean {
  return /^\d{3}-?\d{2}-?\d{5}$/.test(businessNumber)
}

