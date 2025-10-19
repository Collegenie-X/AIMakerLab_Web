// 제품 견적/세금계산서 폼 설정 및 타입 정의
// - 테스트 용이성을 위해 모든 상수/기능을 config로 노출

export type QuoteItem = {
  id: string
  name: string
  description?: string
  unitPrice: number
  quantity: number
  taxType: "과세" | "면세"
}

export type QuoteCustomerInfo = {
  requesterType: "학교" | "교육기관" | "개인사업자" | "법인"
  organizationName: string
  departmentOrClass?: string
  managerName: string
  phone: string
  email: string
}

export type QuoteInvoiceInfo = {
  needTaxInvoice: boolean
  companyName?: string
  businessNumber?: string
  representativeName?: string
  address?: string
  taxEmail?: string
}

export type QuoteExtraInfo = {
  shippingFee: number
  discount: number
  deliveryMemo?: string
  agreePrivacy: boolean
}

export type QuoteFormData = {
  customer: QuoteCustomerInfo
  invoice: QuoteInvoiceInfo
  items: QuoteItem[]
  extra: QuoteExtraInfo
}

export type QuoteTotals = {
  supplyAmount: number
  taxAmount: number
  itemsTotal: number
  grandTotal: number
  discountAmount: number
}

export const quoteFormOptions = {
  vatRate: 0.1, // 10%
  // 배송비 정책(고정시 UI 비활성화)
  shipping: {
    fixed: true,
    amount: 3000,
  },
  // 할인 정책: rate(%) 또는 amount(원)
  discount: {
    mode: "rate" as "rate" | "amount",
  },
  requesterTypes: ["학교", "교육기관", "개인사업자", "법인"] as const,
  taxTypes: ["과세", "면세"] as const,
  defaultItem: {
    name: "교구/키트",
    unitPrice: 0,
    quantity: 1,
    taxType: "과세" as const,
  },
}

// 금액 계산 로직 (간단 명확, 테스트 용이)
export function calculateTotals(
  items: QuoteItem[],
  shippingFee: number,
  discount: number,
  opts?: { discountMode?: "rate" | "amount" }
): QuoteTotals {
  if (!Array.isArray(items) || items.length === 0) {
    const shipping = Math.max(0, shippingFee)
    const discountMode = opts?.discountMode ?? quoteFormOptions.discount.mode
    const discountAmount = discountMode === "rate" ? 0 : Math.max(0, discount)
    const itemsTotal = 0
    const grandTotal = Math.max(0, itemsTotal + shipping - discountAmount)
    return { supplyAmount: 0, taxAmount: 0, itemsTotal, grandTotal, discountAmount }
  }

  let supplyAmount = 0
  let taxAmount = 0

  for (const item of items) {
    const qty = Math.max(0, item.quantity || 0)
    const price = Math.max(0, item.unitPrice || 0)
    const lineSupply = qty * price
    if (item.taxType === "과세") {
      supplyAmount += lineSupply
      taxAmount += Math.floor(lineSupply * quoteFormOptions.vatRate)
    } else {
      supplyAmount += lineSupply
    }
  }

  const itemsTotal = supplyAmount + taxAmount
  const discountMode = opts?.discountMode ?? quoteFormOptions.discount.mode
  const discountAmount = discountMode === "rate"
    ? Math.floor(Math.max(0, Math.min(100, discount)) * itemsTotal / 100)
    : Math.max(0, discount)

  const grandTotal = Math.max(0, itemsTotal + Math.max(0, shippingFee) - discountAmount)
  return { supplyAmount, taxAmount, itemsTotal, grandTotal, discountAmount }
}

// 입력값 검증 (기본 규칙)
export function validateQuoteForm(form: QuoteFormData): string[] {
  const errors: string[] = []
  if (!form.customer.organizationName?.trim()) errors.push("기관/학교명을 입력하세요.")
  if (!form.customer.managerName?.trim()) errors.push("담당자명을 입력하세요.")
  if (!/^\d{2,3}-?\d{3,4}-?\d{4}$/.test(form.customer.phone)) errors.push("연락처 형식을 확인하세요.")
  if (!/.+@.+\..+/.test(form.customer.email)) errors.push("이메일 형식을 확인하세요.")

  if (!Array.isArray(form.items) || form.items.length === 0) errors.push("품목을 1개 이상 추가하세요.")
  for (const [idx, it] of form.items.entries()) {
    if (!it.name?.trim()) errors.push(`${idx + 1}번 품목명을 입력하세요.`)
    if (it.unitPrice < 0) errors.push(`${idx + 1}번 단가는 0 이상이어야 합니다.`)
    if (it.quantity <= 0) errors.push(`${idx + 1}번 수량은 1 이상이어야 합니다.`)
  }

  if (form.invoice.needTaxInvoice) {
    if (!form.invoice.companyName?.trim()) errors.push("세금계산서 상호(회사명)를 입력하세요.")
    if (!/^\d{3}-?\d{2}-?\d{5}$/.test(form.invoice.businessNumber || "")) errors.push("사업자번호 형식을 확인하세요.")
    if (!/.+@.+\..+/.test(form.invoice.taxEmail || "")) errors.push("세금계산서 이메일을 입력하세요.")
  }

  if (!form.extra.agreePrivacy) errors.push("개인정보 수집·이용에 동의해 주세요.")

  return errors
}

export const quoteFormInitialData: QuoteFormData = {
  customer: {
    requesterType: "학교",
    organizationName: "",
    departmentOrClass: "",
    managerName: "",
    phone: "",
    email: "",
  },
  invoice: {
    needTaxInvoice: false,
    companyName: "",
    businessNumber: "",
    representativeName: "",
    address: "",
    taxEmail: "",
  },
  items: [
    { id: `item-${Date.now()}`, name: quoteFormOptions.defaultItem.name, unitPrice: 0, quantity: 1, taxType: "과세" },
  ],
  extra: {
    shippingFee: quoteFormOptions.shipping.fixed ? quoteFormOptions.shipping.amount : 0,
    discount: 0,
    deliveryMemo: "",
    agreePrivacy: false,
  },
}

export const quoteText = {
  pageTitle: "대량 견적 / 세금계산서 문의",
  pageDescription: "학교/기관 대량 구매 및 교구재 견적, 세금계산서 발행 요청을 접수합니다.",
  submitButton: "견적 요청 보내기",
  discountNotice: "10개 이상 구매 시 할인 혜택이 있습니다. 자세한 내용은 연락처로 안내드립니다.",
  discountInputLabel: "할인율 제시(%)",
  discountInputHint: "고객이 제시하는 희망 할인율 (0~100%)",
  discountTotalLabel: "할인(고객 제시 %)",
  grandTotalLabel: "총 제시금액",
}


