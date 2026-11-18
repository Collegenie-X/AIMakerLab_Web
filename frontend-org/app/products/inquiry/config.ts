// 견적 문의 설정 파일 (레거시 호환성)
// 새 구조로 마이그레이션됨 - 하위 호환성을 위해 re-export

/**
 * ⚠️ 이 파일은 레거시 호환성을 위해 유지됩니다
 * 새로운 코드는 다음 파일들을 직접 import 하세요:
 * - types.ts: 타입 정의
 * - constants.ts: 상수 정의
 * - lib/calculator.ts: 계산 로직
 * - lib/validation.ts: 검증 로직
 */

// 타입 re-export
export type {
  QuoteItem,
  QuoteCustomerInfo,
  QuoteInvoiceInfo,
  QuoteExtraInfo,
  QuoteFormData,
  QuoteTotals,
  QuoteBoardItem,
  QuoteCatalogItem,
} from "./types"

// 상수 re-export
export {
  QUOTE_FORM_OPTIONS as quoteFormOptions,
  QUOTE_TEXT as quoteText,
  createInitialQuoteFormData,
} from "./constants"

// 레거시 호환성을 위한 초기 데이터 export
import { createInitialQuoteFormData } from "./constants"
export const quoteFormInitialData = createInitialQuoteFormData()

// 함수 re-export
export { 
  calculateQuoteTotals as calculateTotals,
  calculateLineSupplyAmount,
  calculateLineTaxAmount,
} from "./lib/calculator"

export { 
  validateQuoteForm,
} from "./lib/validation"



