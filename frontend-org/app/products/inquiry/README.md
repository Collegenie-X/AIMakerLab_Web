# 견적 문의 모듈

학교/기관 대량 구매 및 교구재 견적, 세금계산서 발행 요청을 접수하는 모듈입니다.

## 📁 폴더 구조

```
inquiry/
├── types.ts                    # 타입 정의
├── constants.ts                # 상수 정의 및 초기값 생성
├── config.ts                   # 레거시 호환성 (re-export)
├── page.tsx                    # 메인 페이지
├── board/                      # 게시판 페이지
│   └── page.tsx
├── lib/                        # 비즈니스 로직
│   ├── calculator.ts           # 금액 계산 로직
│   └── validation.ts           # 폼 검증 로직
├── utils/                      # 유틸리티 함수
│   └── formHelpers.ts          # 폼 헬퍼 함수
├── hooks/                      # 커스텀 훅
│   ├── useQuoteForm.ts         # 폼 상태 관리 (메인)
│   ├── useQuoteCalculator.ts  # 계산 메모이제이션
│   ├── useQuoteItems.ts        # 품목 카탈로그 로딩
│   └── useQuotes.ts            # 게시판 데이터 관리
└── components/                 # UI 컴포넌트
    ├── CustomerInfoSection.tsx
    ├── InvoiceInfoSection.tsx
    ├── ItemsTableSection.tsx
    ├── DeliveryAndAgreementSection.tsx
    └── QuoteBoardList.tsx
```

## 🏗️ 아키텍처 설계

### 1. 비즈니스 로직과 UI 로직 분리

#### 비즈니스 로직 (lib/)
- **calculator.ts**: 순수 함수로 금액 계산 (공급가, 세액, 할인, 합계)
- **validation.ts**: 폼 데이터 검증 로직

#### UI 로직 (components/)
- 순수하게 렌더링만 담당
- 상태 관리는 훅으로 위임
- 공통 유틸리티 함수 사용

### 2. 상태 관리 계층

```
page.tsx
  ↓
useQuoteForm (메인 훅)
  ↓
├── useState (폼 데이터)
├── useCallback (업데이트 함수)
├── useMemo (합계 계산)
└── validateQuoteForm (검증)
```

### 3. 공통 유틸리티

**formHelpers.ts**
- `createFieldChangeHandler`: 필드 변경 핸들러 생성
- `createNumberFieldChangeHandler`: 숫자 필드 변경 핸들러 생성
- `createSelectChangeHandler`: Select 필드 변경 핸들러 생성
- `createCheckboxChangeHandler`: 체크박스 변경 핸들러 생성
- `updateArrayItem`: 배열 아이템 업데이트
- `addArrayItem`: 배열 아이템 추가
- `removeArrayItem`: 배열 아이템 제거

## 📝 사용 방법

### 메인 페이지에서 폼 관리

```tsx
import { useQuoteForm } from "./hooks/useQuoteForm"

export default function Page() {
  const {
    formData,        // 폼 데이터
    totals,          // 계산된 합계
    updateCustomerInfo,
    updateInvoiceInfo,
    updateItems,
    updateExtraInfo,
    submitForm,
  } = useQuoteForm()

  return (
    <form onSubmit={submitForm}>
      <CustomerInfoSection 
        value={formData.customer}
        onChange={updateCustomerInfo}
      />
      {/* ... */}
    </form>
  )
}
```

### 컴포넌트에서 공통 헬퍼 사용

```tsx
import { createFieldChangeHandler } from "../utils/formHelpers"

export function CustomerInfoSection({ value, onChange }) {
  const handleFieldChange = createFieldChangeHandler(value, onChange)
  
  return (
    <Input 
      value={value.organizationName}
      onChange={handleFieldChange("organizationName")}
    />
  )
}
```

### 비즈니스 로직 직접 사용

```tsx
import { calculateQuoteTotals } from "../lib/calculator"
import { validateQuoteForm } from "../lib/validation"

// 계산
const totals = calculateQuoteTotals(items, shippingFee, discount)

// 검증
const errors = validateQuoteForm(formData)
if (errors.length > 0) {
  // 에러 처리
}
```

## 🔧 주요 타입

### QuoteFormData
```typescript
type QuoteFormData = {
  customer: QuoteCustomerInfo    // 고객 정보
  invoice: QuoteInvoiceInfo      // 세금계산서 정보
  items: QuoteItem[]             // 품목 목록
  extra: QuoteExtraInfo          // 배송/할인/동의
}
```

### QuoteTotals
```typescript
type QuoteTotals = {
  supplyAmount: number      // 공급가 합계
  taxAmount: number         // 세액 합계
  itemsTotal: number        // 품목 합계 (공급가 + 세액)
  grandTotal: number        // 최종 합계 (품목 + 배송비 - 할인)
  discountAmount: number    // 할인 금액
}
```

## 🎯 핵심 원칙

### 1. Early Return 패턴
```typescript
// ❌ 나쁜 예
if (items.length > 0) {
  // 긴 로직
}

// ✅ 좋은 예
if (items.length === 0) {
  return { supplyAmount: 0, taxAmount: 0, ... }
}
// 정상 로직
```

### 2. 함수 분할
- 한 함수는 한 가지 일만 수행
- 순수 함수로 작성 (부수 효과 없음)
- 테스트 가능하도록 작성

### 3. 명확한 네이밍
- 파일명, 함수명, 변수명 모두 구체적으로 (30자 이내)
- 약어 사용 최소화
- 타입 정의 필수

## 📊 데이터 흐름

```
1. 사용자 입력
   ↓
2. onChange 핸들러 (컴포넌트)
   ↓
3. updateXXX 함수 (useQuoteForm)
   ↓
4. useState 업데이트
   ↓
5. useMemo 재계산 (totals)
   ↓
6. 컴포넌트 리렌더링
```

## 🧪 테스트 가능성

모든 비즈니스 로직이 순수 함수로 분리되어 있어 쉽게 테스트 가능합니다:

```typescript
// calculator.test.ts
import { calculateQuoteTotals } from './lib/calculator'

test('품목 합계 계산', () => {
  const items = [
    { id: '1', name: '교구', unitPrice: 10000, quantity: 2, taxType: '과세' }
  ]
  const totals = calculateQuoteTotals(items, 3000, 0)
  
  expect(totals.supplyAmount).toBe(20000)
  expect(totals.taxAmount).toBe(2000)
  expect(totals.itemsTotal).toBe(22000)
  expect(totals.grandTotal).toBe(25000)
})
```

## 🚀 확장성

### 새로운 섹션 추가
1. `types.ts`에 타입 추가
2. `components/`에 새 섹션 컴포넌트 생성
3. `useQuoteForm`에 업데이트 함수 추가
4. `page.tsx`에 컴포넌트 배치

### 새로운 검증 규칙 추가
1. `lib/validation.ts`에 검증 함수 추가
2. `validateQuoteForm`에서 호출

### 새로운 계산 로직 추가
1. `lib/calculator.ts`에 계산 함수 추가
2. `useQuoteForm`의 `useMemo`에서 사용

## 📚 참고 문서

- [prod.md](../../../prod.md) - 프로젝트 전체 구조
- [개발 원칙](../../../prod.md#개발-원칙) - 코딩 가이드라인

## ✅ 체크리스트

리팩토링 완료 항목:
- [x] 타입 분리 (types.ts)
- [x] 상수 분리 (constants.ts)
- [x] 계산 로직 분리 (lib/calculator.ts)
- [x] 검증 로직 분리 (lib/validation.ts)
- [x] 폼 헬퍼 유틸리티 (utils/formHelpers.ts)
- [x] 폼 상태 관리 훅 (hooks/useQuoteForm.ts)
- [x] 컴포넌트 개선 (공통 헬퍼 사용)
- [x] 한글 주석 추가
- [x] Early return 패턴 적용
- [x] 레거시 호환성 유지 (config.ts)

