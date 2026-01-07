# 견적 문의 모듈 리팩토링 요약

## 🎯 리팩토링 목표

1. **비즈니스 로직과 UI 로직 분리**
2. **공통 함수/컴포넌트 추출로 유지보수성 향상**
3. **명확한 구조와 네이밍**
4. **한글 주석 및 클린 코드 적용**

## 📊 변경 사항 요약

### ✅ 완료된 작업

#### 1. 파일 구조 재조직 (Before → After)

**Before:**
```
inquiry/
├── config.ts (타입, 상수, 로직 혼재)
├── page.tsx (UI + 비즈니스 로직)
├── components/ (중복 코드 존재)
└── hooks/ (단순 래퍼)
```

**After:**
```
inquiry/
├── types.ts                 ✨ NEW - 타입 정의만
├── constants.ts             ✨ NEW - 상수 정의만
├── config.ts                📝 레거시 호환용 (re-export)
├── page.tsx                 ♻️ 비즈니스 로직 제거
├── lib/                     ✨ NEW - 비즈니스 로직
│   ├── calculator.ts        ✨ 계산 로직 (순수 함수)
│   ├── validation.ts        ✨ 검증 로직 (순수 함수)
│   └── index.ts            
├── utils/                   ✨ NEW - 공통 유틸리티
│   ├── formHelpers.ts       ✨ 폼 핸들러 생성 함수
│   └── index.ts
├── hooks/                   ♻️ 개선
│   ├── useQuoteForm.ts      ✨ NEW - 메인 폼 관리 훅
│   ├── useQuoteCalculator.ts ♻️ 타입 업데이트
│   ├── useQuoteItems.ts      ♻️ 타입 업데이트
│   ├── useQuotes.ts          ♻️ 타입 업데이트
│   └── index.ts             ✨ NEW
├── components/              ♻️ 공통 헬퍼 사용
│   ├── CustomerInfoSection.tsx
│   ├── InvoiceInfoSection.tsx
│   ├── ItemsTableSection.tsx
│   ├── DeliveryAndAgreementSection.tsx
│   ├── QuoteBoardList.tsx
│   └── index.ts             ✨ NEW
├── board/
│   └── page.tsx             ♻️ 주석 개선
├── index.ts                 ✨ NEW - 모듈 통합 export
└── README.md                ✨ NEW - 상세 문서
```

#### 2. 코드 분리 상세

##### 📁 types.ts (새로 생성)
- 모든 타입 정의를 하나의 파일로 통합
- `QuoteItem`, `QuoteCustomerInfo`, `QuoteInvoiceInfo`, `QuoteExtraInfo`, `QuoteFormData`, `QuoteTotals`, `QuoteBoardItem`, `QuoteCatalogItem`

##### 📁 constants.ts (새로 생성)
- 모든 상수를 하나의 파일로 통합
- `QUOTE_FORM_OPTIONS`: 폼 옵션 설정
- `QUOTE_TEXT`: 페이지 텍스트
- `createInitialQuoteFormData()`: 초기 폼 데이터 생성 함수

##### 📁 lib/calculator.ts (새로 생성)
**순수 함수로 계산 로직 분리:**
- `calculateQuoteTotals()`: 전체 합계 계산
- `calculateLineSupplyAmount()`: 품목별 공급가 계산
- `calculateLineTaxAmount()`: 품목별 세액 계산

**장점:**
- 테스트 가능
- 재사용 가능
- 부수 효과 없음

##### 📁 lib/validation.ts (새로 생성)
**순수 함수로 검증 로직 분리:**
- `validateQuoteForm()`: 전체 폼 검증
- `isValidPhone()`: 연락처 형식 검증
- `isValidEmail()`: 이메일 형식 검증
- `isValidBusinessNumber()`: 사업자번호 형식 검증

**장점:**
- 검증 규칙이 명확함
- 쉽게 규칙 추가/수정 가능
- 독립적으로 테스트 가능

##### 📁 utils/formHelpers.ts (새로 생성)
**공통 폼 핸들러 생성 함수:**
- `createFieldChangeHandler()`: 일반 필드 변경 핸들러
- `createNumberFieldChangeHandler()`: 숫자 필드 변경 핸들러
- `createSelectChangeHandler()`: Select 필드 변경 핸들러
- `createCheckboxChangeHandler()`: 체크박스 변경 핸들러
- `updateArrayItem()`: 배열 아이템 업데이트 헬퍼
- `addArrayItem()`: 배열 아이템 추가 헬퍼
- `removeArrayItem()`: 배열 아이템 제거 헬퍼

**Before (각 컴포넌트마다 중복):**
```tsx
const handle = <K extends keyof T>(key: K) => (e: React.ChangeEvent<HTMLInputElement>) => {
  onChange({ ...value, [key]: e.target.value })
}
```

**After (공통 헬퍼 사용):**
```tsx
import { createFieldChangeHandler } from "../utils/formHelpers"

const handleFieldChange = createFieldChangeHandler(value, onChange)
```

##### 📁 hooks/useQuoteForm.ts (새로 생성)
**폼 상태 및 비즈니스 로직 통합 관리:**
- 폼 데이터 상태 관리
- 섹션별 업데이트 함수 제공
- 합계 자동 계산 (useMemo)
- 폼 제출 및 검증 처리
- 토스트 알림 통합

**Before (page.tsx에 모든 로직):**
```tsx
const [data, setData] = useState<QuoteFormData>(initialData)
const handleSubmit = (e) => {
  e.preventDefault()
  const errors = validateQuoteForm(data)
  if (errors.length > 0) {
    toast({ title: "에러", description: errors.join("\n") })
    return
  }
  // ... 제출 로직
}
```

**After (훅으로 분리):**
```tsx
const {
  formData,
  totals,
  updateCustomerInfo,
  updateInvoiceInfo,
  updateItems,
  updateExtraInfo,
  submitForm,
} = useQuoteForm()
```

#### 3. 컴포넌트 개선

##### CustomerInfoSection.tsx
**Before:**
```tsx
const handle = <K extends keyof QuoteCustomerInfo>(key: K) => (e: React.ChangeEvent<HTMLInputElement>) => {
  onChange({ ...value, [key]: e.target.value })
}
```

**After:**
```tsx
import { createFieldChangeHandler, createSelectChangeHandler } from "../utils/formHelpers"

const handleFieldChange = createFieldChangeHandler(value, onChange)
const handleSelectChange = createSelectChangeHandler(value, onChange)
```

- ✅ 공통 헬퍼 함수 사용
- ✅ 한글 주석 추가
- ✅ 명확한 변수명

##### InvoiceInfoSection.tsx
- ✅ 공통 헬퍼 함수 사용
- ✅ Early return 패턴 적용
- ✅ 한글 주석 추가

##### ItemsTableSection.tsx
**개선사항:**
- ✅ 계산 로직을 `lib/calculator.ts`에서 import
- ✅ 배열 조작을 `utils/formHelpers.ts`에서 import
- ✅ 핸들러 함수를 명확한 이름으로 분리
- ✅ 한글 주석으로 각 기능 설명

**Before:**
```tsx
const update = (index: number, patch: Partial<QuoteItem>) => {
  const next = items.map((it, i) => (i === index ? { ...it, ...patch } : it))
  onChange(next)
}
const supply = Math.max(0, (it.unitPrice || 0) * (it.quantity || 0))
const tax = it.taxType === "과세" ? Math.floor(supply * 0.1) : 0
```

**After:**
```tsx
import { calculateLineSupplyAmount, calculateLineTaxAmount } from "../lib/calculator"
import { updateArrayItem, addArrayItem, removeArrayItem } from "../utils/formHelpers"

const handleUpdateItem = (index: number, patch: Partial<QuoteItem>) => {
  const updatedItems = updateArrayItem(items, index, patch)
  onChange(updatedItems)
}
const supply = calculateLineSupplyAmount(item.unitPrice, item.quantity)
const tax = calculateLineTaxAmount(supply, item.taxType)
```

##### DeliveryAndAgreementSection.tsx
- ✅ 숫자/텍스트 필드 핸들러 분리
- ✅ 상수를 `constants.ts`에서 import
- ✅ 한글 주석 추가

##### QuoteBoardList.tsx
**개선사항:**
- ✅ `useCallback`으로 핸들러 메모이제이션
- ✅ 초기 폼 데이터 생성 함수 분리
- ✅ 명확한 핸들러 네이밍
- ✅ 한글 주석 추가

#### 4. 페이지 개선

##### page.tsx
**Before (150줄+):**
- 폼 상태 관리
- 계산 로직
- 검증 로직
- 제출 처리
- UI 렌더링

**After (120줄):**
```tsx
const {
  formData,
  totals,
  updateCustomerInfo,
  updateInvoiceInfo,
  updateItems,
  updateExtraInfo,
  submitForm,
} = useQuoteForm()

return (
  <form onSubmit={submitForm}>
    {/* 단순히 컴포넌트 조립만 */}
  </form>
)
```

- ✅ 비즈니스 로직 완전히 제거
- ✅ 훅으로 상태 관리 위임
- ✅ 페이지는 UI 조립만 담당
- ✅ 한글 주석 추가

##### board/page.tsx
- ✅ 한글 주석 추가
- ✅ 구조 개선

## 📈 개선 효과

### 1. 유지보수성 향상
- **모듈화**: 각 기능이 독립적인 파일로 분리
- **재사용성**: 공통 함수/훅을 다른 곳에서도 사용 가능
- **명확성**: 각 파일의 역할이 명확함

### 2. 테스트 용이성
```typescript
// 순수 함수로 분리되어 쉽게 테스트 가능
test('계산 로직', () => {
  const result = calculateQuoteTotals(items, 3000, 10)
  expect(result.grandTotal).toBe(25000)
})
```

### 3. 코드 품질
- **타입 안정성**: 모든 함수와 컴포넌트에 명확한 타입 정의
- **가독성**: 한글 주석과 명확한 네이밍
- **일관성**: 동일한 패턴을 모든 컴포넌트에 적용

### 4. 확장성
- 새로운 섹션 추가 시: 컴포넌트 + 타입 + 업데이트 함수만 추가
- 새로운 검증 규칙: `validation.ts`에 함수 추가
- 새로운 계산 로직: `calculator.ts`에 함수 추가

## 📝 주요 패턴

### 1. Early Return
```typescript
// 조기 반환으로 중첩 감소
if (!items || items.length === 0) {
  return { supplyAmount: 0, taxAmount: 0, ... }
}
// 정상 로직
```

### 2. 순수 함수
```typescript
// 부수 효과 없음, 같은 입력 → 같은 출력
export function calculateQuoteTotals(items, shippingFee, discount) {
  // 계산 로직만
  return { supplyAmount, taxAmount, ... }
}
```

### 3. 공통 헬퍼
```typescript
// 반복되는 패턴을 함수로 추출
export function createFieldChangeHandler<T>(current: T, onChange: (next: T) => void) {
  return <K extends keyof T>(key: K) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...current, [key]: e.target.value })
  }
}
```

### 4. 커스텀 훅
```typescript
// 복잡한 상태 로직을 훅으로 캡슐화
export function useQuoteForm() {
  const [formData, setFormData] = useState(...)
  const totals = useMemo(() => calculateQuoteTotals(...), [...])
  return { formData, totals, updateXXX, submitForm }
}
```

## 🎯 네이밍 규칙

### 파일명
- `types.ts`: 타입만
- `constants.ts`: 상수만
- `calculator.ts`: 계산 로직
- `validation.ts`: 검증 로직
- `formHelpers.ts`: 폼 유틸리티

### 함수명
- `calculateQuoteTotals`: 계산 함수
- `validateQuoteForm`: 검증 함수
- `createFieldChangeHandler`: 생성 함수
- `updateArrayItem`: 배열 조작 함수

### 변수명
- `formData`: 폼 데이터
- `totals`: 계산 결과
- `handleFieldChange`: 이벤트 핸들러
- `updateCustomerInfo`: 업데이트 함수

## 🔄 마이그레이션 가이드

### 기존 코드 호환성
`config.ts`가 레거시 호환성을 위해 유지되므로 기존 코드는 그대로 동작합니다:

```typescript
// 기존 코드 (여전히 동작함)
import { QuoteFormData, calculateTotals, validateQuoteForm } from "./config"

// 새 코드 (권장)
import { QuoteFormData } from "./types"
import { calculateQuoteTotals } from "./lib/calculator"
import { validateQuoteForm } from "./lib/validation"
```

## 📚 추가 문서

- [README.md](./README.md) - 모듈 사용 가이드
- [prod.md](../../../prod.md) - 프로젝트 전체 구조

## ✅ 체크리스트

- [x] 타입 분리 (types.ts)
- [x] 상수 분리 (constants.ts)
- [x] 계산 로직 분리 (lib/calculator.ts)
- [x] 검증 로직 분리 (lib/validation.ts)
- [x] 폼 헬퍼 유틸리티 (utils/formHelpers.ts)
- [x] 폼 상태 관리 훅 (hooks/useQuoteForm.ts)
- [x] 기존 훅 개선 (types, 주석 추가)
- [x] 컴포넌트 개선 (공통 헬퍼 사용)
- [x] 페이지 개선 (비즈니스 로직 제거)
- [x] 한글 주석 추가
- [x] Early return 패턴 적용
- [x] index.ts 파일로 export 관리
- [x] README.md 작성
- [x] 레거시 호환성 유지

## 🎉 결론

이번 리팩토링으로:
- **비즈니스 로직과 UI 로직이 명확히 분리**되었습니다
- **공통 함수와 컴포넌트를 추출**하여 코드 중복이 제거되었습니다
- **명확한 구조와 네이밍**으로 가독성이 향상되었습니다
- **한글 주석과 클린 코드**로 유지보수성이 개선되었습니다
- **테스트 가능한 순수 함수**로 품질을 향상시켰습니다

이제 `products/inquiry` 모듈은 **확장 가능하고**, **유지보수가 쉬우며**, **테스트 가능한** 구조를 갖추게 되었습니다! 🚀

