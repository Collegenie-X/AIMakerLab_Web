// 견적 문의 관련 상수 정의

/**
 * 견적 폼 옵션 설정
 */
export const QUOTE_FORM_OPTIONS = {
  vatRate: 0.1, // 부가세율 10%
  
  // 배송비 정책 (고정 시 UI 비활성화)
  shipping: {
    fixed: true,
    amount: 3000,
  },
  
  // 할인 정책: rate(%) 또는 amount(원)
  discount: {
    mode: "rate" as "rate" | "amount",
  },
  
  // 요청 주체 타입
  requesterTypes: ["학교", "교육기관", "개인사업자", "법인"] as const,
  
  // 과세 구분 타입
  taxTypes: ["과세", "면세"] as const,
  
  // 기본 품목 설정
  defaultItem: {
    name: "교구/키트",
    unitPrice: 0,
    quantity: 1,
    taxType: "과세" as const,
  },
} as const

/**
 * 견적 관련 텍스트 상수
 */
export const QUOTE_TEXT = {
  pageTitle: "대량 견적 / 세금계산서 문의",
  pageDescription: "학교/기관 대량 구매 및 교구재 견적, 세금계산서 발행 요청을 접수합니다.",
  submitButton: "견적 요청 보내기",
  discountNotice: "10개 이상 구매 시 할인 혜택이 있습니다. 자세한 내용은 연락처로 안내드립니다.",
  discountInputLabel: "할인율 제시(%)",
  discountInputHint: "고객이 제시하는 희망 할인율 (0~100%)",
  discountTotalLabel: "할인(고객 제시 %)",
  grandTotalLabel: "총 제시금액",
} as const

/**
 * 초기 폼 데이터 생성 함수
 */
export function createInitialQuoteFormData() {
  return {
    customer: {
      requesterType: "학교" as const,
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
      { 
        id: `item-${Date.now()}`, 
        name: QUOTE_FORM_OPTIONS.defaultItem.name, 
        unitPrice: 0, 
        quantity: 1, 
        taxType: "과세" as const 
      },
    ],
    extra: {
      shippingFee: QUOTE_FORM_OPTIONS.shipping.fixed ? QUOTE_FORM_OPTIONS.shipping.amount : 0,
      discount: 0,
      deliveryMemo: "",
      agreePrivacy: false,
    },
  }
}

