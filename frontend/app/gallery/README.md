# Gallery 섹션 - React Query 리팩토링 완료

Gallery 페이지(작품/후기)를 React Query 기반으로 완전히 리팩토링했습니다.

## 📁 파일 구조

```
app/gallery/
├── components/
│   ├── GalleryCard.tsx                 # 갤러리 카드 컴포넌트
│   ├── GalleryCategoryFilter.tsx       # 카테고리 필터 컴포넌트
│   ├── GalleryDetailDialog.tsx         # 상세 다이얼로그 (CRUD 포함)
│   ├── GalleryEmptyState.tsx           # 빈 상태 컴포넌트
│   ├── GalleryHeroSection.tsx          # Hero 섹션
│   └── GalleryListSection.tsx          # 리스트 섹션
├── config.ts                           # 타입 정의 (@deprecated - lib/gallery/types.ts 사용)
├── hooks/                              # @deprecated - lib/gallery/hooks.ts 사용
├── page.tsx                            # 메인 페이지 (React Query 기반)
└── README.md                           # 이 문서

lib/gallery/                            # 비즈니스 로직 (새로 추가)
├── types.ts                            # 타입 정의
├── api.ts                              # API 함수
├── hooks.ts                            # React Query Hooks
├── utils.ts                            # 유틸리티 함수
├── query-provider.tsx                  # Query Provider
└── index.ts                            # 통합 Export

public/gallery/
├── images/                             # 갤러리 이미지 파일들
├── reviews.json                        # 후기 데이터
├── reviews-config.json                 # 후기 설정 (@deprecated)
├── works.json                          # 작품 데이터
└── works-config.json                   # 작품 설정 (@deprecated)
```

## 🎯 주요 개선사항

### 1. 비즈니스 로직과 UI 로직 분리 ✅
- **lib/gallery**: 모든 비즈니스 로직 (API, types, hooks, utils)
- **app/gallery/components**: UI 컴포넌트만 포함
- 명확한 책임 분리로 유지보수성 향상

### 2. React Query 도입 (1분 캐시) ✅
```typescript
// lib/gallery/hooks.ts
const DEFAULT_QUERY_OPTIONS = {
  staleTime: 1 * 60 * 1000,    // 1분 캐시
  gcTime: 5 * 60 * 1000,        // 5분 메모리 유지
  retry: 1,
  refetchOnWindowFocus: false,
}
```

### 3. CRUD 기능 구현 (즉시 반영) ✅
- **좋아요 토글**: Optimistic Update로 즉시 UI 반영
- **조회수 증가**: 상세 다이얼로그 열 때 자동 증가
- **로컬 스토리지**: 좋아요/조회 이력 관리 (중복 방지)

```typescript
// 좋아요 토글 사용 예시
const { mutate: toggleLike } = useToggleLike('works')

toggleLike(itemId, {
  onSuccess: () => {
    // 즉시 UI 업데이트됨
  }
})
```

### 4. 공통 함수/컴포넌트로 유지보수 용이 ✅
- **extractCategories**: 카테고리 목록 추출
- **sortGalleryItems**: 정렬 (최신순, 인기순, 조회수순)
- **filterByCategory**: 카테고리 필터링
- **filterBySearch**: 검색 필터링
- **formatNumber**: 숫자 포맷팅 (1K, 1M)
- **getDefaultImage**: 카테고리별 기본 이미지

## 🚀 사용 방법

### 1. 갤러리 데이터 조회

```typescript
import { useGalleryItems } from '@/lib/gallery'

function MyComponent() {
  const { data: items, isLoading, error } = useGalleryItems('works')
  
  if (isLoading) return <div>로딩 중...</div>
  if (error) return <div>에러: {error.message}</div>
  
  return <div>{items.map(item => ...)}</div>
}
```

### 2. 좋아요/조회수 업데이트

```typescript
import { useToggleLike, useIncrementViews } from '@/lib/gallery'

function MyComponent() {
  const toggleLike = useToggleLike('works')
  const incrementViews = useIncrementViews('works')
  
  const handleLike = () => {
    toggleLike.mutate(itemId)
  }
  
  const handleView = () => {
    incrementViews.mutate(itemId)
  }
}
```

### 3. 검색/필터링/정렬

```typescript
import { 
  useGalleryItems, 
  extractCategories,
  filterByCategory,
  sortGalleryItems 
} from '@/lib/gallery'

function MyComponent() {
  const { data: items = [] } = useGalleryItems('works')
  
  // 카테고리 추출
  const categories = extractCategories(items)
  
  // 필터링
  const filtered = filterByCategory(items, 'IoT')
  
  // 정렬
  const sorted = sortGalleryItems(filtered, 'popular')
}
```

## 📋 JSON 데이터 구조

### works.json / reviews.json
```json
[
  {
    "id": 1,
    "title": "제목",
    "description": "간단한 설명",
    "category": "카테고리",
    "image": "/gallery/images/이미지.jpg",
    "emoji": "🎨",
    "author": "작성자",
    "date": "2025.02.18",
    "views": 145,
    "likes": 32,
    "rating": 5,
    "details": "상세 내용...",
    "images": ["/gallery/images/1.jpg", "/gallery/images/2.jpg"],
    "tags": ["태그1", "태그2"]
  }
]
```

## 🔧 환경 설정

### Provider 설정 (이미 적용됨)
```typescript
// app/gallery/page.tsx
import { GalleryQueryProvider } from '@/lib/gallery'

export default function GalleryPage() {
  return (
    <GalleryQueryProvider>
      <GalleryPageContent />
    </GalleryQueryProvider>
  )
}
```

## 🎨 컴포넌트 사용 예시

### GalleryCard
```typescript
<GalleryCard
  item={item}
  onClick={() => setSelectedItem(item)}
  showRating={type === "reviews"}
/>
```

### GalleryDetailDialog
```typescript
<GalleryDetailDialog
  item={selectedItem}
  type="works"
  open={!!selectedItem}
  onClose={() => setSelectedItem(null)}
/>
```

### GalleryListSection
```typescript
<GalleryListSection type="works" />
```

## 📊 캐시 전략

### Query 캐시
- **staleTime**: 1분 - 데이터가 1분간 fresh 상태 유지
- **gcTime**: 5분 - 메모리에 5분간 캐시 유지
- **retry**: 1번 - 실패 시 1번 재시도

### Mutation 최적화
- **Optimistic Update**: 좋아요 토글 시 즉시 UI 반영
- **Cache Invalidation**: 성공 시 관련 쿼리 무효화
- **Rollback**: 실패 시 이전 상태로 롤백

## 🔄 추후 백엔드 연동

### API 함수만 수정
```typescript
// lib/gallery/api.ts
export async function fetchGalleryItems(type: GalleryType): Promise<GalleryItem[]> {
  // 기존: JSON 파일
  // const response = await fetch(`/gallery/${type}.json`)
  
  // 변경: Backend API
  const response = await fetch(`/api/gallery/${type}`)
  
  // 나머지 로직 동일
}
```

### 좋아요/조회수 API 연동
```typescript
// lib/gallery/api.ts
export async function toggleLike(type: GalleryType, itemId: number) {
  // Backend API 호출
  const response = await fetch(`/api/gallery/${type}/${itemId}/like`, {
    method: 'POST',
  })
  
  return response.json()
}
```

## ✅ 체크리스트

- [x] 비즈니스 로직과 UI 로직 분리
- [x] React Query 도입 (1분 캐시)
- [x] CRUD 기능 구현 (좋아요, 조회수)
- [x] 공통 함수/컴포넌트 모듈화
- [x] TypeScript 타입 안전성
- [x] Optimistic Update 구현
- [x] 에러 처리 및 로딩 상태
- [x] 로컬 스토리지 연동
- [ ] Backend API 연동 (추후)

## 📝 주요 API

### Queries
- `useGalleryItems(type)` - 갤러리 아이템 목록
- `useGalleryItem(type, id)` - 특정 아이템
- `useGalleryItemsByCategory(type, category)` - 카테고리별
- `useGalleryConfig(type)` - 설정 (@deprecated)
- `useGalleryPage(type)` - 통합 데이터
- `useGallerySearch(type, query)` - 검색

### Mutations
- `useToggleLike(type)` - 좋아요 토글
- `useIncrementViews(type)` - 조회수 증가

### Utils
- `extractCategories(items)` - 카테고리 추출
- `sortGalleryItems(items, sortBy)` - 정렬
- `filterByCategory(items, category)` - 필터링
- `filterBySearch(items, query)` - 검색
- `getDefaultImage(category)` - 기본 이미지
- `formatNumber(num)` - 숫자 포맷팅
- `formatDate(dateString)` - 날짜 포맷팅
- `isItemLiked(type, id)` - 좋아요 상태 확인

## 🎉 완료!

Gallery 섹션이 React Query 기반으로 완전히 리팩토링되었습니다.
- 빠른 응답 속도 (1분 캐시)
- 즉각적인 UI 반영 (Optimistic Update)
- 깔끔한 코드 구조 (비즈니스/UI 분리)
- 쉬운 유지보수 (모듈화)
