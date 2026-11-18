# About 페이지 관리 가이드

About 페이지는 유지보수성을 위해 **컨텐츠(JSON)**, **스타일 설정(config.ts)**, **컴포넌트**를 분리하여 관리합니다.

## 📁 폴더 구조

```
app/about/
├── page.tsx                    # 메인 페이지 (섹션을 동적으로 렌더링)
├── config.ts                   # 스타일, 아이콘, 섹션 순서 설정
├── components/                 # 섹션별 컴포넌트
│   ├── index.ts               # 컴포넌트 인덱스
│   ├── HeroAboutSection.tsx
│   ├── PhilosophySection.tsx
│   ├── MethodologySection.tsx
│   ├── ComparisonSection.tsx
│   ├── ProjectsGallerySection.tsx
│   ├── BrandAboutSection.tsx
│   ├── FacilitySection.tsx
│   └── HistorySection.tsx
├── hooks/
│   └── useAboutContent.ts     # JSON 데이터 로딩 훅
└── README.md                   # 이 문서

public/about/
└── about-content.json          # 모든 컨텐츠 데이터
```

## 🎯 수정 방법

### 1️⃣ 컨텐츠 수정 (텍스트, 제목, 설명 등)

**파일**: `public/about/about-content.json`

```json
{
  "philosophy": {
    "heading": "우리의 교육 철학",
    "items": [
      {
        "id": "creative",
        "topLabelEn": "PLANNER",
        "topLabelKo": "기획자",
        "title": "진짜 문제 발견과 정의",
        "description": "벤치마킹과 페르소나 분석을 통해...",
        "color": "blue"
      }
    ]
  }
}
```

**수정 가능한 항목**:
- 제목, 부제목, 설명 텍스트
- 항목 추가/삭제
- 순서 변경

### 2️⃣ 스타일 및 색상 설정

**파일**: `app/about/config.ts`

#### 색상 테마 변경
```typescript
export const themeStyles: Record<ThemeColor, {...}> = {
  blue: {
    border: 'border-blue-200',
    bg: 'bg-blue-50',
    icon: 'text-blue-500',
    // ...
  },
}
```

#### 아이콘 변경
```typescript
export const philosophyIcons: Record<string, LucideIcon> = {
  creative: Lightbulb,    // 다른 아이콘으로 변경 가능
  experience: Target,
  confidence: Heart,
}
```

#### 섹션 배경색 변경
```typescript
export const sectionBackgrounds = {
  hero: 'bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100',
  philosophy: 'bg-gradient-to-br from-pink-50 to-purple-50',
  // ...
}
```

### 3️⃣ 섹션 순서 변경 및 표시/숨김

**파일**: `app/about/config.ts`

```typescript
export const sectionsConfig: Array<{...}> = [
  { key: 'hero', enabled: true, order: 1 },
  { key: 'philosophy', enabled: true, order: 2 },
  { key: 'methodology', enabled: true, order: 3 },
  // ...
]
```

**변경 방법**:
- `order`: 섹션 표시 순서 (숫자가 작을수록 위에 표시)
- `enabled`: `false`로 설정하면 해당 섹션이 페이지에 표시되지 않음

**예시 - 섹션 순서 변경**:
```typescript
{ key: 'methodology', enabled: true, order: 2 },  // 2번으로 변경
{ key: 'philosophy', enabled: true, order: 3 },   // 3번으로 변경
```

**예시 - 섹션 숨기기**:
```typescript
{ key: 'comparison', enabled: false, order: 4 },  // 비교표 섹션 숨김
```

### 4️⃣ 새로운 섹션 추가

#### 단계 1: 컴포넌트 생성
`app/about/components/NewSection.tsx` 파일 생성:

```tsx
import { useAboutSectionContent } from "../hooks/useAboutContent"
import { themeText, themeColors } from "@/theme"
import { sectionBackgrounds } from "../config"

export function NewSection() {
  const { content, isLoading, error } = useAboutSectionContent('newSection')

  if (isLoading || !content) return null
  if (error) {
    console.error('NewSection 로딩 실패:', error)
    return null
  }

  return (
    <section className={`${sectionBackgrounds.newSection} py-24`}>
      <div className="container mx-auto px-4">
        <h2 className={`mb-4 text-center ${themeText.h2} ${themeColors.heading}`}>
          {content.heading}
        </h2>
        {/* 컨텐츠 렌더링 */}
      </div>
    </section>
  )
}
```

#### 단계 2: JSON에 컨텐츠 추가
`public/about/about-content.json`:

```json
{
  "newSection": {
    "heading": "새로운 섹션",
    "content": "섹션 내용..."
  }
}
```

#### 단계 3: config.ts 업데이트

```typescript
// 1. 섹션 키 타입에 추가
export type SectionKey = 
  | 'hero' 
  | 'philosophy'
  | 'newSection'  // 추가
  // ...

// 2. 배경 설정 추가
export const sectionBackgrounds = {
  // ...
  newSection: 'bg-gradient-to-br from-gray-50 to-white',
}

// 3. 섹션 설정에 추가
export const sectionsConfig: Array<{...}> = [
  // ...
  { key: 'newSection', enabled: true, order: 9 },
]
```

#### 단계 4: page.tsx에 컴포넌트 등록

```typescript
import { NewSection } from "./components/NewSection"

const sectionComponents: Record<SectionKey, React.ComponentType> = {
  // ...
  newSection: NewSection,
}
```

#### 단계 5: index.ts에 export 추가

```typescript
export { NewSection } from './NewSection'
```

## 🔧 타입 안전성

모든 섹션은 TypeScript로 타입이 정의되어 있습니다:
- `useAboutContent.ts`: 각 섹션의 데이터 타입 정의
- `config.ts`: 색상, 아이콘 등의 타입 정의

타입 오류가 발생하면 IDE에서 바로 확인할 수 있습니다.

## 📝 유지보수 팁

1. **컨텐츠만 수정**: `about-content.json` 파일만 수정
2. **색상/스타일 변경**: `config.ts`의 해당 부분만 수정
3. **섹션 순서 변경**: `config.ts`의 `sectionsConfig`만 수정
4. **섹션 숨김**: `enabled: false`로 설정 (삭제하지 않음)

## 🎨 디자인 일관성

- 색상 테마는 `config.ts`의 `themeStyles`에서 중앙 관리
- 모든 섹션은 동일한 패딩(`py-24`) 사용
- 제목 스타일은 `@/theme`에서 가져와 일관성 유지

## ⚠️ 주의사항

1. JSON 파일 수정 시 문법 오류가 없는지 확인 (쉼표, 따옴표 등)
2. 섹션 순서 변경 시 `order` 값이 중복되지 않도록 주의
3. 새로운 색상 추가 시 `ThemeColor` 타입에도 추가 필요
4. 아이콘 변경 시 `lucide-react`에서 제공하는 아이콘만 사용 가능
