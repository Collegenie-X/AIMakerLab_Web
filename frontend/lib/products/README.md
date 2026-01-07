# Products 라이브러리

제품(Products) 관련 비즈니스 로직을 중앙화하여 관리하는 라이브러리입니다.

## 📁 구조

```
lib/products/
├── types.ts              # 비즈니스 모델 타입 정의
├── api.ts                # API 함수 (JSON 파일 기반)
├── hooks.ts              # ReactQuery hooks (5분 캐시)
├── utils.ts              # 유틸리티 함수
├── query-provider.tsx    # ReactQuery Provider
├── index.ts              # 통합 export
└── README.md             # 문서
```

## 🎯 주요 기능

### 1. 비즈니스 모델 타입 정의 (`types.ts`)

모든 제품 관련 데이터 구조를 TypeScript 타입으로 정의합니다.

```typescript
import type { Product, ProductDetail, ProductReview } from '@/lib/products/types'
```

**주요 타입:**
- `Product` - 제품 목록 아이템
- `ProductDetail` - 제품 상세 정보
- `ProductReview` - 제품 리뷰
- `RelatedClass` - 관련 수업
- `ClassroomPhoto` - 수업 현장 사진

### 2. API 함수 (`api.ts`)

JSON 파일 기반 데이터 로딩 함수를 제공합니다. (추후 Backend API로 전환 가능)

```typescript
import { productApi } from '@/lib/products'

// 제품 목록 조회
const products = await productApi.fetchProducts()

// 제품 상세 정보 조회
const detail = await productApi.fetchProductDetail('smart-farm-kit')

// 제품 리뷰 조회
const reviews = await productApi.fetchProductReviews('smart-farm-kit')
```

**주요 API 함수:**
- `fetchProducts()` - 전체 제품 목록
- `fetchProductById(id)` - 특정 제품 조회
- `fetchProductDetail(id)` - 제품 상세 정보
- `fetchProductReviews(id)` - 제품 리뷰
- `fetchRelatedClasses(category)` - 관련 수업
- `fetchProductDetailPage(id)` - 상세 페이지 통합 데이터

### 3. ReactQuery Hooks (`hooks.ts`)

**5분 캐시**가 적용된 ReactQuery hooks를 제공합니다.

```typescript
import { useProducts, useProductDetailPage } from '@/lib/products'

function ProductListPage() {
  // 자동 캐싱, 재검증, 에러 처리
  const { data: products, isLoading, error } = useProducts()
  
  return (
    // ...
  )
}

function ProductDetailPage({ productId }: { productId: string }) {
  // 제품, 리뷰, 수업 사진 등 통합 로드
  const { data, isLoading } = useProductDetailPage(productId)
  
  return (
    // ...
  )
}
```

**주요 Hooks:**
- `useProducts()` - 전체 제품 목록
- `useProduct(id)` - 특정 제품
- `useProductDetail(id)` - 제품 상세 정보
- `useProductDetailPage(id)` - 상세 페이지 통합 데이터 (추천)
- `useProductReviews(id)` - 제품 리뷰
- `useRelatedClasses(category)` - 관련 수업

**캐시 설정:**
- `staleTime`: 5분 (300초) - 데이터가 stale이 되기 전 시간
- `gcTime`: 10분 (600초) - 캐시 메모리 유지 시간
- `retry`: 1 - 실패시 1번만 재시도
- `refetchOnWindowFocus`: false - 윈도우 포커스시 재fetch 안함

### 4. 유틸리티 함수 (`utils.ts`)

가격 포맷팅, 정렬, 필터링 등 공통 로직을 제공합니다.

```typescript
import { productUtils } from '@/lib/products'

// 가격 포맷팅
const formatted = productUtils.formatPrice("57200") // "57,200원"

// 제품 가격 정보 계산
const priceInfo = productUtils.getProductPriceInfo(product)
// { currentPrice, originalPrice, discount, formattedCurrentPrice, ... }

// 제품 필터링 및 정렬
const filtered = productUtils.filterAndSortProducts(products, {
  category: 'arduino',
  grade: '초등 고학년',
  sortBy: 'popular'
})

// 평점 포맷팅
const rating = productUtils.formatRating(4.8) // "4.8"

// 리뷰 통계 계산
const avgRating = productUtils.calculateAverageRating(reviews)
const distribution = productUtils.calculateRatingDistribution(reviews)
```

**주요 유틸리티:**
- 가격 관련: `formatPrice`, `calculateDiscountPrice`, `getProductPriceInfo`
- 필터링/정렬: `filterByCategory`, `filterByGrade`, `sortProducts`
- 리뷰 관련: `formatRating`, `calculateAverageRating`, `calculateRatingDistribution`
- 검색: `searchProducts`, `highlightSearchText`
- URL: `getProductDetailUrl`, `getCategoryUrl`

### 5. Query Provider (`query-provider.tsx`)

ReactQuery Provider를 제공합니다. 앱 Layout에서 사용합니다.

```typescript
import { ProductsQueryProvider } from '@/lib/products/query-provider'

export default function ProductsLayout({ children }) {
  return (
    <ProductsQueryProvider>
      {children}
    </ProductsQueryProvider>
  )
}
```

## 🚀 사용 방법

### 1. Provider 설정

앱 또는 레이아웃에 Provider를 추가합니다:

```tsx
// app/products/coding-ai/layout.tsx
import { ProductsQueryProvider } from '@/lib/products/query-provider'

export default function CodingAIProductsLayout({ children }) {
  return <ProductsQueryProvider>{children}</ProductsQueryProvider>
}
```

### 2. 제품 목록 페이지

```tsx
// app/products/coding-ai/page.tsx
'use client'

import { useProducts } from '@/lib/products'
import { productUtils } from '@/lib/products'

export default function ProductsPage() {
  const { data: products = [], isLoading } = useProducts()
  
  if (isLoading) return <div>Loading...</div>
  
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <p>{productUtils.formatPrice(product.price)}</p>
        </div>
      ))}
    </div>
  )
}
```

### 3. 제품 상세 페이지

```tsx
// app/products/coding-ai/[id]/page.tsx
'use client'

import { useProductDetailPage } from '@/lib/products'

export default function ProductDetailPage({ params }) {
  const { data, isLoading } = useProductDetailPage(params.id)
  
  if (isLoading) return <div>Loading...</div>
  if (!data) return <div>Not Found</div>
  
  const { product, reviews, classroomPhotos, relatedClasses } = data
  
  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.educationalValue}</p>
      
      {/* 리뷰 */}
      <div>
        {reviews.map(review => (
          <div key={review.id}>{review.content}</div>
        ))}
      </div>
      
      {/* 수업 사진 */}
      <div>
        {classroomPhotos.map(photo => (
          <img key={photo.id} src={photo.image} alt={photo.title} />
        ))}
      </div>
    </div>
  )
}
```

## 📊 데이터 흐름

```
JSON 파일
    ↓
API 함수 (api.ts)
    ↓
ReactQuery Hooks (hooks.ts)
    ↓  (5분 캐시)
컴포넌트
    ↓
유틸리티 함수 (utils.ts)
    ↓
UI 렌더링
```

## 🔄 Backend API 전환 가이드

현재는 JSON 파일 기반이지만, Backend API로 쉽게 전환할 수 있습니다:

1. **`api.ts` 수정**:
   ```typescript
   // Before (JSON)
   const API_ENDPOINTS = {
     products: '/products/products.json',
   }
   
   // After (Backend API)
   const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
   const API_ENDPOINTS = {
     products: `${API_BASE_URL}/api/products`,
   }
   ```

2. **hooks와 컴포넌트는 수정 불필요**
   - ReactQuery가 자동으로 캐싱 및 재검증 처리
   - 타입도 동일하게 유지

## 🎨 Best Practices

### 1. 데이터 로딩

```tsx
// ✅ Good - 통합 hook 사용 (한번에 로드)
const { data, isLoading } = useProductDetailPage(productId)

// ❌ Bad - 여러 hook 분리 (N번 fetch)
const { data: product } = useProduct(productId)
const { data: reviews } = useProductReviews(productId)
const { data: photos } = useClassroomPhotos(productId)
```

### 2. 캐시 활용

```tsx
// ReactQuery가 자동으로 5분간 캐시
// 같은 productId로 여러번 호출해도 1번만 fetch
function Component1() {
  useProductDetailPage('smart-farm-kit') // fetch
}

function Component2() {
  useProductDetailPage('smart-farm-kit') // 캐시 사용
}
```

### 3. 타입 안전성

```typescript
import type { Product } from '@/lib/products'

// 타입을 명시하여 안전한 코드 작성
function processProduct(product: Product) {
  // product의 모든 필드가 타입 체크됨
  return product.price
}
```

## 📝 JSON 파일 구조

### `/products/products.json`
제품 목록 (기본 정보)

### `/products/product-details.json`
제품 상세 정보 (키트 이미지, 시연 영상, 커리큘럼, 구성품 등)

### `/products/product-reviews.json`
제품 리뷰

### `/products/related-classes.json`
관련 수업 (방문 수업, 온라인 수업)

### `/products/classroom-photos.json`
수업 현장 사진

## 🔧 개발자 가이드

### 새로운 필드 추가

1. `types.ts`에 타입 추가
2. JSON 파일에 데이터 추가
3. `api.ts`는 자동으로 처리 (수정 불필요)
4. hooks도 자동으로 처리 (수정 불필요)

### 새로운 API 추가

1. `api.ts`에 함수 추가
2. `hooks.ts`에 hook 추가
3. `productKeys`에 key 추가

## 📚 참고 자료

- [TanStack Query (React Query) 공식 문서](https://tanstack.com/query/latest)
- [Next.js App Router 가이드](https://nextjs.org/docs/app)

## 🐛 트러블슈팅

### 캐시가 업데이트되지 않을 때

```typescript
import { useQueryClient } from '@tanstack/react-query'
import { productKeys } from '@/lib/products'

const queryClient = useQueryClient()

// 특정 제품 캐시 무효화
queryClient.invalidateQueries({ queryKey: productKeys.detail('smart-farm-kit') })

// 전체 제품 캐시 무효화
queryClient.invalidateQueries({ queryKey: productKeys.all })
```

### 개발 중 캐시 비활성화

```typescript
const { data } = useProducts({
  staleTime: 0, // 즉시 stale
  gcTime: 0, // 캐시 안함
})
```

---

**작성일**: 2026-01-07  
**작성자**: AI Maker Lab Dev Team

