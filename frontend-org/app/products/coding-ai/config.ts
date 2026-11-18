/**
 * 코딩(SW.AI) 교육제품 페이지 설정
 * 라벨, 카테고리, 학년, 연락처 정보 등을 관리합니다.
 */

// 페이지 라벨 및 텍스트
export const LABELS = {
  // Hero Section
  hero: {
    title: "코딩(SW.AI) 교육제품",
    subtitle: "학교 수업에 최적화된 전문 교육 키트",
    description: "체계적인 커리큘럼과 교사용 지도서가 포함되어 있어 바로 수업에 활용 가능합니다",
  },

  // Filter Section
  filter: {
    categoryLabel: "카테고리",
    gradeLabel: "학년별",
    placeholder: "선택하세요",
  },

  // Product List
  productList: {
    title: "전체 제품",
    emptyMessage: "선택하신 조건에 맞는 제품이 없습니다.",
    emptySubMessage: "다른 카테고리나 학년을 선택해 주세요.",
    sortOptions: {
      recommended: "추천순",
      popular: "인기순",
      priceLow: "낮은 가격순",
      priceHigh: "높은 가격순",
      newest: "최신순",
    },
  },

  // Product Card
  productCard: {
    educationalValue: "교육적 가치",
    classroomUse: "수업 활용",
    classTime: "수업시간",
    groupSize: "권장인원",
    targetGrade: "대상학년",
    discount: "할인",
    reviews: "개 리뷰",
  },

  // Contact Section
  contact: {
    salesTitle: "교육담당 견적, 배송문의",
    educationTitle: "교육수업문의",
    catalogTitle: "교육용 제품 카탈로그",
    catalogDescription: "전체 제품 정보 및 커리큘럼 안내",
    guideTitle: "교사용 지도서",
    guideDescription: "수업 활용 가이드 및 교안",
    downloadButton: "PDF 다운로드",
    inquiryButton: "견적문의 바로가기",
    classInquiryButton: "수업문의 바로가기",
  },

  // Benefits Section
  benefits: {
    title: "왜 AI Make Lab 교육 키트인가요?",
    curriculum: {
      title: "체계적인 커리큘럼",
      description: "교육 전문가가 설계한 단계별 커리큘럼으로 학생들의 수준에 맞는 학습이 가능합니다",
    },
    teacherSupport: {
      title: "교사 지원 자료",
      description: "교사용 지도서, 수업 PPT, 평가 자료 등 수업 준비에 필요한 모든 자료를 제공합니다",
    },
    verified: {
      title: "실전 수업 검증",
      description: "전국 200개 이상의 학교에서 실제 수업에 활용되어 그 효과가 검증된 제품입니다",
    },
  },
}

// 카테고리 목록
export const CATEGORIES = [
  { id: "all", name: "전체보기" },
  { id: "block-coding", name: "블록 코딩" },
  { id: "arduino", name: "아두이노" },
  { id: "raspberry-pi", name: "라즈베리파이" },
  { id: "ai-robot", name: "AI 로봇" },
  { id: "app-inventor", name: "앱 인벤터" },
  { id: "entry", name: "엔트리" },
]

// 학년 목록
export const GRADES = [
  { id: "all", name: "전체 학년" },
  { id: "elementary-lower", name: "초등 저학년" },
  { id: "elementary-upper", name: "초등 고학년" },
  { id: "middle", name: "중학생" },
  { id: "high", name: "고등학생" },
]

// 카테고리 ID를 실제 이름으로 매핑
export const CATEGORY_MAP: Record<string, string> = {
  "all": "",
  "block-coding": "블록 코딩",
  "arduino": "아두이노",
  "raspberry-pi": "라즈베리파이",
  "ai-robot": "AI 로봇",
  "app-inventor": "앱 인벤터",
  "entry": "엔트리",
}

// 학년 ID를 실제 이름으로 매핑
export const GRADE_MAP: Record<string, string> = {
  "all": "",
  "elementary-lower": "초등 저학년",
  "elementary-upper": "초등 고학년",
  "middle": "중학생",
  "high": "고등학생",
}

// 연락처 정보
export const CONTACT_INFO = {
  sales: {
    phone: "053-719-3435",
    email: "edu@aimakelab.com",
  },
  education: {
    phone: "053-719-3437",
    email: "edu@aimakelab.com",
  },
}

// 정렬 옵션
export const SORT_OPTIONS = [
  { value: "recommended", label: "추천순" },
  { value: "popular", label: "인기순" },
  { value: "price-low", label: "낮은 가격순" },
  { value: "price-high", label: "높은 가격순" },
  { value: "newest", label: "최신순" },
]

// 제품 데이터 JSON 파일 경로
export const PRODUCTS_JSON_PATH = "/products/products.json"

/**
 * 제품 상세 페이지 텍스트 라벨
 * - 모든 고정 텍스트는 이 객체에서 관리합니다.
 */
export const PRODUCT_DETAIL_TEXTS = {
  top: {
    salePriceLabel: "판매가",
    currencySuffix: "원",
    listPriceLabel: "정가",
    discountSuffix: "할인",
    quantityLabel: "수량",
    totalPriceLabel: "총 상품금액",
    addToCartButton: "견적 문의하기",
    schoolPurchase: {
      title: "학교 구매 안내",
      items: [
        "• 학교 구매 시 세금계산서 발행 가능",
        "• 10세트 이상 구매 시 추가 할인 제공",
        "• 3차시 수업 자료, 교육 커리큘럼 제공",
      ],
    },
  },
  educationalValueSection: {
    heading: "왜 선생님들이 이 제품을 선택하나요?",
    subheading: "교육 현장에서 검증된 체계적인 교육 키트",
    cards: {
      curriculumTitle: "체계적인 커리큘럼",
      curriculumDescSuffix: " 완성형 수업 계획과 차시별 학습 목표 제공",
      teacherSupportTitle: "교사 지원 자료",
      teacherSupportDesc: "교사용 지도서, 수업 PPT, 학생 워크북 포함",
      verifiedTitle: "실전 수업 검증",
      verifiedDescSuffix: "개 학교에서 활용 중",
    },
    detailTitle: "교육적 가치",
    detailSubtitle: "이 키트로 무엇을 배우나요?",
  },
  purchaseSection: {
    title: "교육 키트 구매 문의",
    subtitle: "학교 및 교육기관 대량 구매 시 추가 할인 혜택",
    inquiryPhoneLabel: "견적 및 배송 문의",
    inquiryEmailLabel: "이메일 문의",
    quoteInquiryLabel: "지금 견적 문의하기",
  },
}

