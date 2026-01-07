# 견적 문의 모듈 아키텍처

## 🏗️ 아키텍처 개요

이 모듈은 **관심사의 분리(Separation of Concerns)** 원칙에 따라 설계되었습니다.

```
┌─────────────────────────────────────────────────────────┐
│                      Presentation Layer                  │
│                    (page.tsx, components/)               │
│                                                           │
│  - UI 렌더링만 담당                                        │
│  - 사용자 입력 수집                                        │
│  - 비즈니스 로직 호출                                      │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                      Business Logic Layer                │
│                    (hooks/, lib/)                        │
│                                                           │
│  - 상태 관리 (hooks/)                                     │
│  - 계산 로직 (lib/calculator.ts)                         │
│  - 검증 로직 (lib/validation.ts)                         │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                      Data Layer                          │
│                    (types.ts, constants.ts)              │
│                                                           │
│  - 타입 정의                                              │
│  - 상수 정의                                              │
│  - 초기값 생성                                            │
└─────────────────────────────────────────────────────────┘
```

## 📂 디렉토리 구조와 역할

### 1. Data Layer (데이터 계층)

#### `types.ts`
**역할**: 모든 타입 정의
```typescript
export type QuoteFormData = {
  customer: QuoteCustomerInfo
  invoice: QuoteInvoiceInfo
  items: QuoteItem[]
  extra: QuoteExtraInfo
}
```

**특징**:
- 순수 타입 정의만 포함
- 다른 모듈에서도 재사용 가능
- 타입 안정성 보장

#### `constants.ts`
**역할**: 모든 상수 및 초기값 정의
```typescript
export const QUOTE_FORM_OPTIONS = {
  vatRate: 0.1,
  shipping: { fixed: true, amount: 3000 },
  // ...
}

export function createInitialQuoteFormData() {
  return { /* 초기 폼 데이터 */ }
}
```

**특징**:
- 하드코딩된 값 제거
- 중앙 집중식 설정 관리
- 쉬운 수정 및 확장

### 2. Business Logic Layer (비즈니스 로직 계층)

#### `lib/calculator.ts`
**역할**: 순수 함수로 금액 계산
```typescript
export function calculateQuoteTotals(
  items: QuoteItem[],
  shippingFee: number,
  discount: number
): QuoteTotals {
  // 계산 로직
  return { supplyAmount, taxAmount, ... }
}
```

**특징**:
- 순수 함수 (부수 효과 없음)
- 테스트 가능
- 재사용 가능

#### `lib/validation.ts`
**역할**: 순수 함수로 폼 검증
```typescript
export function validateQuoteForm(form: QuoteFormData): string[] {
  const errors: string[] = []
  // 검증 로직
  return errors
}
```

**특징**:
- 명확한 검증 규칙
- 에러 메시지 배열 반환
- 쉬운 규칙 추가/수정

#### `hooks/useQuoteForm.ts`
**역할**: 폼 상태 및 비즈니스 로직 통합 관리
```typescript
export function useQuoteForm() {
  const [formData, setFormData] = useState(...)
  const totals = useMemo(() => calculateQuoteTotals(...), [...])
  
  const submitForm = useCallback((e) => {
    // 검증 + 제출 로직
  }, [formData])
  
  return {
    formData,
    totals,
    updateCustomerInfo,
    updateInvoiceInfo,
    updateItems,
    updateExtraInfo,
    submitForm,
  }
}
```

**특징**:
- 복잡한 상태 로직 캡슐화
- 자동 계산 (useMemo)
- 명확한 API 제공

#### `hooks/useQuoteCalculator.ts`
**역할**: 계산 로직 메모이제이션
```typescript
export function useQuoteCalculator({ items, shippingFee, discount }) {
  const totals = useMemo(
    () => calculateQuoteTotals(items, shippingFee, discount),
    [items, shippingFee, discount]
  )
  return totals
}
```

**특징**:
- 성능 최적화
- 불필요한 재계산 방지

#### `hooks/useQuoteItems.ts`
**역할**: 품목 카탈로그 데이터 로딩
```typescript
export function useQuoteItems(options = {}) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    // JSON 파일에서 데이터 로딩
  }, [source])
  
  return { items, mapById, loading, error }
}
```

**특징**:
- 비동기 데이터 로딩
- 로딩/에러 상태 관리
- ID 맵 제공 (빠른 조회)

#### `hooks/useQuotes.ts`
**역할**: 게시판 데이터 관리
```typescript
export function useQuotes(options = {}) {
  const [items, setItems] = useState([])
  
  const upsert = useCallback((item) => {
    // 추가 또는 업데이트
  }, [])
  
  const remove = useCallback((id) => {
    // 삭제
  }, [])
  
  return { items, loading, error, upsert, remove }
}
```

**특징**:
- CRUD 기능 제공
- 로컬 상태 관리
- 확장 가능 (API 연동 준비)

#### `utils/formHelpers.ts`
**역할**: 공통 폼 핸들러 생성
```typescript
export function createFieldChangeHandler<T>(
  current: T,
  onChange: (next: T) => void
) {
  return <K extends keyof T>(key: K) => (e) => {
    onChange({ ...current, [key]: e.target.value })
  }
}
```

**특징**:
- 반복 코드 제거
- 타입 안정성
- 재사용 가능

### 3. Presentation Layer (프레젠테이션 계층)

#### `page.tsx`
**역할**: 메인 페이지 (UI 조립)
```typescript
export default function ProductsInquiryPage() {
  const {
    formData,
    totals,
    updateCustomerInfo,
    // ...
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

**특징**:
- 비즈니스 로직 없음
- 컴포넌트 조립만
- 훅으로 상태 관리 위임

#### `components/`
**역할**: 재사용 가능한 UI 컴포넌트

##### `CustomerInfoSection.tsx`
- 고객/학교 정보 입력
- 공통 헬퍼 사용

##### `InvoiceInfoSection.tsx`
- 세금계산서 정보 입력
- 조건부 렌더링

##### `ItemsTableSection.tsx`
- 품목 목록 테이블
- 카탈로그 선택
- 자동 계산 표시

##### `DeliveryAndAgreementSection.tsx`
- 배송 정보 입력
- 개인정보 동의

##### `QuoteBoardList.tsx`
- 게시판 목록 표시
- CRUD 기능

**공통 특징**:
- Props로 데이터 받음
- onChange로 변경 알림
- 순수 UI 로직만

## 🔄 데이터 흐름

### 1. 폼 입력 흐름
```
사용자 입력
  ↓
Input onChange
  ↓
createFieldChangeHandler
  ↓
updateCustomerInfo (useQuoteForm)
  ↓
setFormData (useState)
  ↓
formData 업데이트
  ↓
useMemo 재계산 (totals)
  ↓
컴포넌트 리렌더링
```

### 2. 폼 제출 흐름
```
사용자 제출
  ↓
submitForm (useQuoteForm)
  ↓
validateQuoteForm (lib/validation)
  ↓
에러 있음? → toast 에러 메시지
  ↓
에러 없음? → 백엔드 전송 (TODO)
  ↓
toast 성공 메시지
  ↓
resetForm
```

### 3. 계산 흐름
```
품목/배송비/할인 변경
  ↓
formData 업데이트
  ↓
useMemo 감지
  ↓
calculateQuoteTotals (lib/calculator)
  ↓
totals 업데이트
  ↓
UI 자동 반영
```

## 🎯 설계 원칙

### 1. 단일 책임 원칙 (SRP)
- 각 파일/함수는 하나의 책임만
- `calculator.ts`: 계산만
- `validation.ts`: 검증만
- 컴포넌트: UI 렌더링만

### 2. 개방-폐쇄 원칙 (OCP)
- 확장에는 열려있고 수정에는 닫혀있음
- 새 검증 규칙: `validation.ts`에 함수 추가
- 새 계산 로직: `calculator.ts`에 함수 추가
- 기존 코드 수정 불필요

### 3. 의존성 역전 원칙 (DIP)
- 상위 레벨이 하위 레벨에 의존하지 않음
- 컴포넌트 → 훅 → 비즈니스 로직
- 각 계층은 인터페이스(타입)에 의존

### 4. DRY (Don't Repeat Yourself)
- 공통 로직을 함수/훅으로 추출
- `formHelpers.ts`: 반복되는 핸들러 패턴
- `useQuoteForm`: 반복되는 상태 관리

### 5. 순수 함수 우선
- 부수 효과 없음
- 같은 입력 → 같은 출력
- 테스트 용이

## 🧪 테스트 전략

### 1. 단위 테스트 (Unit Test)
```typescript
// calculator.test.ts
describe('calculateQuoteTotals', () => {
  it('품목 합계를 정확히 계산한다', () => {
    const items = [
      { id: '1', name: '교구', unitPrice: 10000, quantity: 2, taxType: '과세' }
    ]
    const totals = calculateQuoteTotals(items, 3000, 0)
    
    expect(totals.supplyAmount).toBe(20000)
    expect(totals.taxAmount).toBe(2000)
    expect(totals.itemsTotal).toBe(22000)
    expect(totals.grandTotal).toBe(25000)
  })
})
```

### 2. 통합 테스트 (Integration Test)
```typescript
// useQuoteForm.test.ts
describe('useQuoteForm', () => {
  it('폼 제출 시 검증이 실행된다', () => {
    const { result } = renderHook(() => useQuoteForm())
    
    act(() => {
      result.current.submitForm(mockEvent)
    })
    
    expect(mockToast).toHaveBeenCalledWith({
      title: "입력값을 확인해 주세요.",
      // ...
    })
  })
})
```

### 3. 컴포넌트 테스트
```typescript
// CustomerInfoSection.test.tsx
describe('CustomerInfoSection', () => {
  it('입력값 변경 시 onChange가 호출된다', () => {
    const onChange = jest.fn()
    render(<CustomerInfoSection value={mockValue} onChange={onChange} />)
    
    fireEvent.change(screen.getByLabelText('기관/학교명'), {
      target: { value: '테스트학교' }
    })
    
    expect(onChange).toHaveBeenCalledWith({
      ...mockValue,
      organizationName: '테스트학교'
    })
  })
})
```

## 🚀 확장 가이드

### 새로운 섹션 추가
1. `types.ts`에 타입 추가
2. `components/`에 섹션 컴포넌트 생성
3. `useQuoteForm`에 업데이트 함수 추가
4. `page.tsx`에 컴포넌트 배치

### 새로운 검증 규칙 추가
1. `lib/validation.ts`에 검증 함수 추가
2. `validateQuoteForm`에서 호출

### 새로운 계산 로직 추가
1. `lib/calculator.ts`에 계산 함수 추가
2. `useQuoteForm`의 `useMemo`에서 사용

### API 연동
1. `hooks/useQuotes.ts` 수정
2. `fetch` 대신 API 클라이언트 사용
3. 에러 처리 추가

## 📊 성능 최적화

### 1. 메모이제이션
- `useMemo`: 계산 결과 캐싱
- `useCallback`: 함수 참조 유지

### 2. 조건부 렌더링
- 세금계산서 정보는 필요 시에만 렌더링
- Early return으로 불필요한 계산 방지

### 3. 배열 최적화
- `mapById`로 O(1) 조회
- 불변성 유지로 React 최적화

## 🔒 타입 안정성

모든 함수와 컴포넌트에 명확한 타입 정의:
- Props 타입
- 반환 타입
- 제네릭 타입

## 📝 문서화

- 모든 함수에 JSDoc 주석
- 한글로 명확한 설명
- 사용 예시 포함

## 🎉 결론

이 아키텍처는:
- ✅ **확장 가능**: 새 기능 추가 용이
- ✅ **유지보수 가능**: 명확한 구조
- ✅ **테스트 가능**: 순수 함수 중심
- ✅ **타입 안정**: TypeScript 완전 활용
- ✅ **성능 최적화**: 메모이제이션 적용
- ✅ **가독성**: 한글 주석 + 명확한 네이밍

견고하고 확장 가능한 프론트엔드 모듈입니다! 🚀

