// 견적 문의 관련 타입 정의

/**
 * 견적 품목 타입
 */
export type QuoteItem = {
  id: string
  name: string
  description?: string
  unitPrice: number
  quantity: number
  taxType: "과세" | "면세"
}

/**
 * 고객 정보 타입
 */
export type QuoteCustomerInfo = {
  requesterType: "학교" | "교육기관" | "개인사업자" | "법인"
  organizationName: string
  departmentOrClass?: string
  managerName: string
  phone: string
  email: string
}

/**
 * 세금계산서 정보 타입
 */
export type QuoteInvoiceInfo = {
  needTaxInvoice: boolean
  companyName?: string
  businessNumber?: string
  representativeName?: string
  address?: string
  taxEmail?: string
}

/**
 * 추가 정보 타입
 */
export type QuoteExtraInfo = {
  shippingFee: number
  discount: number
  deliveryMemo?: string
  agreePrivacy: boolean
}

/**
 * 견적 폼 데이터 타입
 */
export type QuoteFormData = {
  customer: QuoteCustomerInfo
  invoice: QuoteInvoiceInfo
  items: QuoteItem[]
  extra: QuoteExtraInfo
}

/**
 * 견적 합계 타입
 */
export type QuoteTotals = {
  supplyAmount: number
  taxAmount: number
  itemsTotal: number
  grandTotal: number
  discountAmount: number
}

/**
 * 게시판 아이템 타입
 */
export type QuoteBoardItem = {
  id: number
  title: string
  requester: string
  phone: string
  email: string
  createdAt: string
  status: "접수" | "응대중" | "완료"
}

/**
 * 카탈로그 아이템 타입
 */
export type QuoteCatalogItem = {
  id: string
  name: string
  unitPrice: number
}

