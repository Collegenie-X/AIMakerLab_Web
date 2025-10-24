# About 섹션

AI Maker Lab의 소개 페이지입니다.

## 📁 폴더 구조

```
about/
├── components/          # 각 섹션별 컴포넌트
│   ├── HeroAboutSection.tsx
│   ├── PhilosophySection.tsx
│   ├── MethodologySection.tsx
│   ├── ComparisonSection.tsx
│   ├── ProjectsGallerySection.tsx
│   ├── BrandAboutSection.tsx
│   ├── FacilitySection.tsx
│   └── HistorySection.tsx
├── hooks/               # 컨텐츠 관리 Hooks
│   ├── useAboutContent.ts
│   └── useLocationContent.ts
├── location/            # 위치 페이지
│   └── page.tsx
├── config.ts           # (Deprecated) 타입 정의 참조용
├── page.tsx            # About 메인 페이지
└── README.md           # 이 문서
```

## 🗂️ 컨텐츠 관리

### JSON 파일 위치

컨텐츠는 JSON 파일로 관리됩니다:

- **About 메인 페이지**: `/public/about/about-content.json`
- **Location 페이지**: `/public/about/location.json`

### Hooks 사용

각 섹션은 hooks를 통해 JSON 파일에서 컨텐츠를 불러옵니다:

```typescript
import { useAboutSectionContent } from "../hooks/useAboutContent"

export function HeroAboutSection() {
  const { content, isLoading, error } = useAboutSectionContent('hero')
  
  if (isLoading) return <LoadingState />
  if (error || !content) return null
  
  return <section>{content.title}</section>
}
```

## 📋 섹션 목록

### About 페이지 (`/about`)

1. **HeroAboutSection** - 히어로 섹션
   - 타이틀, 서브타이틀, 설명
   - 애니메이션 아이콘 (전구, 로켓, 상)

2. **PhilosophySection** - 교육 철학
   - 창의, 경험, 신뢰
   - 각 철학별 아이콘과 설명

3. **MethodologySection** - 교육 방법론
   - 이론 학습 → 실습 → 프로젝트
   - 3단계 프로세스 시각화

4. **ComparisonSection** - 비교표
   - 일반 학원 vs AI Maker Lab
   - 수업 방식, 학습 목표 등 비교

5. **ProjectsGallerySection** - 학생 작품 갤러리
   - 로봇, 앱, IoT, AI 등 다양한 프로젝트
   - 학생별 작품 소개

6. **BrandAboutSection** - 브랜드 소개
   - AI Maker Lab 소개
   - 교육 철학 및 비전

7. **FacilitySection** - 교육 시설
   - 시설 특징 및 통계
   - 레이저 커팅기, 교육 키트 등

8. **HistorySection** - 연혁
   - 2022년부터 현재까지
   - 년도별 주요 성과

### Location 페이지 (`/about/location`)

- **연락처 정보**: 전화, 이메일, 운영시간
- **지도**: Google Maps 임베드
- **주소**: 상세 주소 및 교통편
- **방문 안내**: 주차, 예약 등

## 🔧 컨텐츠 수정 방법

### 1. JSON 파일 수정

`/public/about/about-content.json` 또는 `/public/about/location.json` 파일을 직접 수정합니다.

```json
{
  "hero": {
    "title": "AI Maker Lab",
    "subtitle": "창의적인 미래를 만드는 AI 교육 연구소",
    "descriptions": [
      "첫 번째 설명",
      "두 번째 설명"
    ]
  }
}
```

### 2. 타입 확인

타입 정의는 `hooks/useAboutContent.ts`에 있습니다:

```typescript
export type AboutHeroContent = {
  title: string
  subtitle: string
  descriptions: string[]
}
```

### 3. 변경사항 적용

JSON 파일 수정 후 저장하면 자동으로 반영됩니다. (개발 서버 재시작 불필요)

## 🎨 스타일링

각 섹션은 다음과 같은 색상 테마를 사용합니다:

- **Hero**: 파란색-보라-분홍 그라데이션
- **Philosophy**: 분홍-보라 그라데이션
- **Methodology**: 회색-오렌지 그라데이션
- **Comparison**: 보라-분홍 테마
- **Projects**: 청록-파랑 그라데이션
- **Brand**: 보라-분홍 그라데이션
- **Facility**: 초록-청록 그라데이션
- **History**: 노랑-오렌지 그라데이션

## 🚀 개발 가이드

### 새 섹션 추가하기

1. **JSON에 데이터 추가**
   ```json
   {
     "newSection": {
       "heading": "새 섹션",
       "content": "내용"
     }
   }
   ```

2. **타입 정의 추가** (`hooks/useAboutContent.ts`)
   ```typescript
   export type NewSectionContent = {
     heading: string
     content: string
   }
   
   export type AboutContent = {
     // ... existing types
     newSection: NewSectionContent
   }
   ```

3. **컴포넌트 생성** (`components/NewSection.tsx`)
   ```typescript
   import { useAboutSectionContent } from "../hooks/useAboutContent"
   
   export function NewSection() {
     const { content, isLoading, error } = useAboutSectionContent('newSection')
     
     if (isLoading || !content) return null
     if (error) return null
     
     return <section>{content.heading}</section>
   }
   ```

4. **페이지에 추가** (`page.tsx`)
   ```typescript
   import { NewSection } from "./components/NewSection"
   
   // ...
   <NewSection />
   ```

### 로딩 및 에러 처리

각 컴포넌트는 다음과 같은 패턴을 따릅니다:

```typescript
const { content, isLoading, error } = useAboutSectionContent('sectionName')

// 간단한 방식
if (isLoading || !content) return null
if (error) {
  console.error('섹션 컨텐츠 로딩 실패:', error)
  return null
}

// 또는 커스텀 로딩 UI
if (isLoading) return <LoadingSpinner />
if (error || !content) return <ErrorMessage />
```

## 📝 참고사항

- **config.ts**: Deprecated - 타입 정의 참조용으로만 사용
- **"use client"**: hooks를 사용하므로 클라이언트 컴포넌트로 설정
- **이미지**: `/public` 폴더의 이미지 경로 사용
- **아이콘**: `lucide-react` 라이브러리 사용

## 🔗 관련 파일

- 타입 정의: `hooks/useAboutContent.ts`, `hooks/useLocationContent.ts`
- JSON 파일: `/public/about/about-content.json`, `/public/about/location.json`
- 테마: `/theme/index.ts`, `/theme/tokens.ts`
- UI 컴포넌트: `/components/ui/`

