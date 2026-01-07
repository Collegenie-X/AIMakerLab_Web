// 견적 문의 모듈 통합 export

// 타입
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

// 상수
export {
  QUOTE_FORM_OPTIONS,
  QUOTE_TEXT,
  createInitialQuoteFormData,
} from "./constants"

// 비즈니스 로직
export {
  calculateQuoteTotals,
  calculateLineSupplyAmount,
  calculateLineTaxAmount,
  validateQuoteForm,
} from "./lib"

// 훅
export {
  useQuoteForm,
  useQuoteCalculator,
  useQuoteItems,
  useQuotes,
} from "./hooks"

// 컴포넌트
export {
  CustomerInfoSection,
  InvoiceInfoSection,
  ItemsTableSection,
  DeliveryAndAgreementSection,
  QuoteBoardList,
} from "./components"

// 유틸리티
export {
  createFieldChangeHandler,
  createNumberFieldChangeHandler,
  createSelectChangeHandler,
  createCheckboxChangeHandler,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
} from "./utils"

