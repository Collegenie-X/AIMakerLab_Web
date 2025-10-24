# Gallery 섹션 JSON 관리 구조

Gallery 페이지(작품/후기)의 데이터와 텍스트 설정은 JSON 파일로 관리되며, React Hooks를 통해 불러옵니다.

## 📁 파일 구조

```
app/gallery/
├── hooks/
│   ├── useGalleryItems.ts         # 갤러리 아이템 데이터 로딩
│   └── useGalleryConfig.ts        # 텍스트 설정 로딩
├── components/                    # 공통 컴포넌트들
├── reviews/                       # 후기 페이지
│   ├── page.tsx
│   └── config.ts                  # @deprecated (타입 참조용)
├── works/                         # 작품 페이지
│   └── page.tsx
├── config.ts                      # @deprecated (타입 참조용)
└── README.md                      # 이 문서

public/gallery/
├── images/                        # 갤러리 이미지 파일들
│   ├── ai-neural-network.png
│   ├── app-inventor-coding-blocks.jpg
│   ├── arduino-electronics-circuit.jpg
│   ├── mobile-app-interface.png
│   ├── raspberry-pi-computer-iot.jpg
│   ├── smart-home-iot-device.jpg
│   └── student-robot-project.jpg
├── reviews.json                   # 후기 데이터
├── reviews-config.json            # 후기 페이지 텍스트 설정
├── works.json                     # 작품 데이터
└── works-config.json              # 작품 페이지 텍스트 설정
```

## 📄 JSON 파일 구조

### 데이터 파일 (reviews.json / works.json)

```json
[
  {
    "id": 1,
    "title": "작품/후기 제목",
    "description": "간단한 설명",
    "category": "카테고리",
    "image": "/gallery/images/이미지.jpg",
    "emoji": "🎯",
    "author": "작성자",
    "date": "2025.02.18",
    "views": 145,
    "likes": 32,
    "rating": 5,
    "details": "상세 내용...",
    "images": ["/gallery/images/이미지1.jpg", "/gallery/images/이미지2.png"],
    "tags": ["태그1", "태그2"]
  }
]
```

### 설정 파일 (reviews-config.json / works-config.json)

```json
{
  "hero": {
    "emoji": "💬",
    "title": "수업 후기",
    "subtitle": "학부모님과 학생들의 생생한 수업 후기"
  },
  "categoryAll": "전체",
  "itemCountSuffix": "개의 후기",
  "emptyState": {
    "emoji": "🔍",
    "title": "후기가 없습니다",
    "message": "선택한 카테고리에 해당하는 후기가 아직 없습니다."
  },
  "actions": {
    "like": "도움됨",
    "share": "공유하기",
    "create": "새 후기 작성하기",
    "cancel": "취소",
    "submit": "후기 등록하기"
  },
  "form": { ... }
}
```

## 🎣 Hooks 사용법

### 1. 갤러리 아이템 데이터 불러오기

```typescript
import { useGalleryItems } from '@/app/gallery/hooks/useGalleryItems'
import { galleryDataUrls } from '@/app/gallery/config'

function ReviewsPage() {
  const { items, loading, error, categories } = useGalleryItems({ 
    sourceUrl: galleryDataUrls.reviews 
  })
  
  if (loading) return <div>로딩 중...</div>
  if (error) return <div>오류: {error}</div>
  
  return <div>{items.map(item => ...)}</div>
}
```

### 2. 텍스트 설정 불러오기

```typescript
import { useGalleryConfig } from '@/app/gallery/hooks/useGalleryConfig'

function ReviewsPage() {
  const { config, isLoading, error } = useGalleryConfig('reviews')
  
  if (isLoading) return <div>로딩 중...</div>
  if (error || !config) return <div>오류 발생</div>
  
  return (
    <div>
      <h1>{config.hero.title}</h1>
      <p>{config.hero.subtitle}</p>
    </div>
  )
}
```

## 📝 컨텐츠 수정 방법

### 데이터 추가/수정

1. `/public/gallery/reviews.json` 또는 `works.json` 파일 열기
2. 배열에 새 항목 추가 또는 기존 항목 수정
3. 저장 → 자동으로 반영됨

### 텍스트 설정 수정

1. `/public/gallery/reviews-config.json` 또는 `works-config.json` 파일 열기
2. 원하는 텍스트 수정
3. 저장 → 자동으로 반영됨

### 이미지 추가/변경

1. 이미지를 `/public/gallery/images/` 폴더에 저장
2. JSON 파일에서 `/gallery/images/파일명.확장자` 형식으로 참조

```json
{
  "image": "/gallery/images/새이미지.jpg",
  "images": [
    "/gallery/images/이미지1.jpg",
    "/gallery/images/이미지2.png"
  ]
}
```

## 🎯 주요 기능

### 카테고리 필터링
- `useGalleryItems` hook이 자동으로 카테고리 목록 생성
- 프론트엔드에서 카테고리별 필터링 가능

### 검색 기능
- 제목, 설명, 태그 기반 검색
- `useGalleryItems` hook에서 제공

### 폼 설정
- 작품/후기 등록 폼의 모든 텍스트를 JSON으로 관리
- 라벨, placeholder, 옵션 등 모두 커스터마이징 가능

## ⚠️ 주의사항

1. **이미지 경로**: 반드시 `/gallery/images/` 경로 사용
2. **타입 안전성**: TypeScript 타입이 자동으로 적용됨
3. **에러 처리**: 모든 컴포넌트에 로딩/에러 상태 처리 포함
4. **config.ts**: 텍스트 설정은 더 이상 사용하지 않음 (타입 참조용으로만 유지)
5. **ID 중복**: 각 아이템의 `id`는 고유해야 함

## 🔄 마이그레이션

기존 `config.ts`에서 JSON으로 마이그레이션 완료:
- ✅ 데이터와 설정을 별도 JSON 파일로 분리
- ✅ Hooks를 통한 데이터 로딩 구현
- ✅ 이미지 파일 `/gallery/images/` 폴더로 정리
- ✅ 타입 안전성 유지

## 📚 참고

- 데이터 Hook: `/app/gallery/hooks/useGalleryItems.ts`
- 설정 Hook: `/app/gallery/hooks/useGalleryConfig.ts`
- 후기 데이터: `/public/gallery/reviews.json`
- 후기 설정: `/public/gallery/reviews-config.json`
- 작품 데이터: `/public/gallery/works.json`
- 작품 설정: `/public/gallery/works-config.json`
- 이미지: `/public/gallery/images/`

