# 커리큘럼 공통 컴포넌트

아두이노, 앱 인벤터, Raspberry Pi 커리큘럼 페이지에서 공통으로 사용하는 컴포넌트입니다.

## 설계 원칙

### ✅ 일관성 (Consistency)
모든 커리큘럼 페이지가 동일한 구조와 디자인을 공유합니다.

### ✅ 재사용성 (Reusability)
각 페이지는 개별 컴포넌트를 만들지 않고 공통 컴포넌트를 사용합니다.

### ✅ 유지보수성 (Maintainability)
컴포넌트 한 곳만 수정하면 모든 페이지에 즉시 반영됩니다.

### ✅ 설정 기반 (Configuration-driven)
- **config.ts**: 색상, 라벨, 링크 등의 텍스트 관리
- **JSON 파일**: 컨텐츠 데이터 관리

## 컴포넌트 목록

### 1. `CurriculumSectionContainer`
모든 섹션의 레이아웃 래퍼

```tsx
<CurriculumSectionContainer 
  className="py-12 bg-gray-50" 
  containerClass={layout.containerClass}
>
  {/* 내용 */}
</CurriculumSectionContainer>
```

### 2. `HeroSection`
페이지 상단 히어로 섹션

```tsx
<HeroSection
  badge="초급 과정"
  title="Raspberry Pi 코딩"
  description="IoT와 AI를 배우세요"
  gradientClass="from-green-500 to-emerald-600"
  containerClass={layout.containerClass}
/>
```

### 3. `CourseInfoSection`
과정 정보 카드 (기간, 인원, 방식)

```tsx
<CourseInfoSection
  data={data.courseInfo}
  iconColors={iconColors}
  containerClass={layout.containerClass}
/>
```

### 4. `CourseDescriptionSection`
과정 소개 및 이미지

```tsx
<CourseDescriptionSection
  title="Raspberry Pi 코딩이란?"
  paragraphs={data.paragraphs}
  images={data.images}
  containerClass={layout.containerClass}
/>
```

### 5. `LearningGoalsSection`
학습 목표 및 기대 효과

```tsx
<LearningGoalsSection
  title="학습 목표"
  description="무엇을 배울까요?"
  goals={data.goals}
  achievements={data.achievements}
  containerClass={layout.containerClass}
  primaryColor="green"
  gradientClass="from-green-600 to-emerald-600"
/>
```

### 6. `CurriculumSection`
커리큘럼 탭 (3시간, 6시간, 12시간)

```tsx
<CurriculumSection
  title="커리큘럼"
  tabs={data.curriculum.tabs}
  containerClass={layout.containerClass}
  activeTabClass="bg-green-600 text-white"
  inactiveTabClass="text-gray-600 hover:bg-white"
  primaryColor="green"
/>
```

### 7. `GradeRecommendationTable`
학년별 추천 커리큘럼 표

```tsx
<GradeRecommendationTable
  title="학년별 추천"
  description="학생의 수준에 맞는 과정을 선택하세요"
  programName="Raspberry Pi 과정"
  headers={["과정", "초3-4", "초5-6", "중1-2", "중3", "고등"]}
  courses={data.courses}
  legend={data.legend}
  containerClass={layout.containerClass}
  primaryColor="green"
/>
```

### 8. `EducationRequirementsSection`
교육 조건 (인원, 교구재, 환경 등)

```tsx
<EducationRequirementsSection
  title="교육 조건"
  subtitle="효과적인 교육을 위한 필수 조건"
  items={data.items}
  iconColors={iconColors}
  containerClass={layout.containerClass}
  primaryColor="green"
/>
```

### 9. `GallerySection`
단순 이미지 그리드 갤러리

```tsx
<GallerySection
  title="갤러리"
  description="이미지 갤러리"
  images={data.images}
  containerClass={layout.containerClass}
  primaryColor="green"
/>
```

### 10. `ClassGallerySection`
탭 기능이 있는 수업 현장 갤러리 (대표 이미지 3장)

```tsx
<ClassGallerySection
  title="수업 현장 및 학생 작품"
  description="실제 수업 모습과 작품들을 확인해보세요"
  tabs={[
    {
      id: "class-scene",
      label: "수업 현장",
      items: [
        { src: "/img1.jpg", alt: "수업 모습", description: "설명" }
      ]
    },
    {
      id: "student-works",
      label: "학생 작품",
      items: [...]
    },
    {
      id: "class-reviews",
      label: "수업 후기",
      items: [...]
    }
  ]}
  containerClass={layout.containerClass}
  activeTabClass="bg-green-600 text-white"
  inactiveTabClass="text-gray-600 hover:bg-white"
  primaryColor="green"
/>
```

### 11. `MaterialsDownloadSection`
수업 자료 다운로드 섹션

```tsx
<MaterialsDownloadSection
  title="수업 자료 다운로드"
  description="교육에 필요한 자료를 다운로드하세요"
  categories={[
    {
      id: "guides",
      title: "교사용 지도안",
      description: "상세한 교수 학습 지도안",
      items: [
        {
          id: "guide1",
          title: "3시간 과정 지도안",
          description: "기초 과정 가이드",
          icon: "FileText",
          format: "PDF",
          pages: "12페이지",
          size: "2.5MB",
          downloadUrl: "/downloads/guide.pdf"
        }
      ]
    }
  ]}
  containerClass={layout.containerClass}
  primaryColor="green"
/>
```

### 12. `CtaSection`
CTA (Call To Action) 버튼

```tsx
<CtaSection
  title="지금 시작하세요"
  description="수업 일정을 확인해보세요"
  buttonText="수업 일정 보기"
  buttonLink="/inquiry/schedule"
  bgClass="bg-green-600"
  containerClass={layout.containerClass}
/>
```

## 새 커리큘럼 페이지 만들기

### 1. 디렉토리 구조 생성

```bash
mkdir -p app/curriculum/[course-name]/{hooks}
```

### 2. `config.ts` 작성

```typescript
export const COURSE_CONFIG = {
  meta: {
    title: "과정명 | AI메이커랩",
    description: "과정 설명",
  },
  
  iconColors: {
    blue: { bg: "bg-blue-100", text: "text-blue-600" },
    // ... 더 많은 색상
  },
  
  gradients: {
    hero: "from-blue-500 to-blue-700",
    cta: "bg-blue-600",
  },
  
  tabs: {
    activeTabClass: "bg-blue-600 text-white",
    inactiveTabClass: "text-gray-600 hover:bg-white",
  },
  
  layout: {
    containerClass: "curriculum-container-6xl",
  },
} as const;
```

### 3. JSON 데이터 작성

`/public/curriculum/[course-name].json`에 컨텐츠 데이터 작성

### 4. Hook 작성

```typescript
// hooks/useCourseData.ts
export function useCourseData() {
  const [data, setData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/curriculum/[course-name].json");
      const jsonData = await response.json();
      setData(jsonData);
    };
    fetchData();
  }, []);

  return { data, loading, error };
}
```

### 5. 페이지 작성

```tsx
// page.tsx
"use client";

import { useCourseData } from "./hooks/useCourseData";
import { COURSE_CONFIG } from "./config";
import {
  HeroSection,
  CourseInfoSection,
  // ... 필요한 컴포넌트 import
} from "../components";

export default function CoursePage() {
  const { data, loading, error } = useCourseData();
  
  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;
  if (!data) return <EmptyState />;

  const { gradients, layout, iconColors } = COURSE_CONFIG;

  return (
    <main>
      <HeroSection
        badge={data.hero.badge}
        title={data.hero.title}
        description={data.hero.description}
        gradientClass={gradients.hero}
        containerClass={layout.containerClass}
      />
      
      {/* 나머지 섹션들... */}
    </main>
  );
}
```

## 컴포넌트 커스터마이징

### 색상 변경

각 컴포넌트는 `primaryColor` prop을 받아서 색상을 변경할 수 있습니다:

```tsx
// 파란색 테마
primaryColor="blue"

// 초록색 테마
primaryColor="green"

// 주황색 테마
primaryColor="orange"
```

### 그라데이션 변경

`gradientClass`로 그라데이션을 커스터마이징:

```tsx
gradientClass="from-blue-500 to-purple-600"
```

### 레이아웃 너비 조절

`globals.css`에 정의된 클래스 사용:

```typescript
// config.ts
layout: {
  containerClass: "curriculum-container",      // max-w-5xl
  // containerClass: "curriculum-container-6xl", // max-w-6xl
  // containerClass: "curriculum-container-7xl", // max-w-7xl
}
```

## 데이터 구조

### JSON 파일 구조

```json
{
  "hero": { ... },
  "courseInfo": [ ... ],
  "courseDescription": { 
    "title": "...",
    "paragraphs": [ ... ],
    "images": [ ... ]
  },
  "learningGoals": { ... },
  "curriculum": {
    "title": "...",
    "tabs": [ ... ]
  },
  "gradeRecommendation": { ... },
  "educationRequirements": { ... },
  "gallery": {
    "title": "...",
    "images": [ ... ]
  },
  "cta": { ... }
}
```

## 주의사항

### ⚠️ 개별 컴포넌트 생성 금지

각 커리큘럼 페이지마다 개별 컴포넌트를 만들지 마세요:

```
❌ app/curriculum/raspberry-pi/components/
❌ app/curriculum/arduino/components/
❌ app/curriculum/app-inventor/components/

✅ app/curriculum/components/ (공통)
```

### ⚠️ Tailwind 동적 클래스 주의

Tailwind CSS는 빌드 시 정적 분석을 하므로, 동적으로 생성된 클래스는 인식하지 못합니다:

```tsx
// ❌ 작동하지 않음
className={`text-${color}-600`}

// ✅ 미리 정의된 클래스 사용
className={primaryColor === "blue" ? "text-blue-600" : "text-green-600"}

// ✅ 또는 globals.css에 정의
```

### ⚠️ 이중 래핑 방지

`CurriculumSectionContainer`는 이미 컨테이너 역할을 하므로, 내부에 추가 래퍼를 사용하지 마세요:

```tsx
// ❌ 이중 래핑
<CurriculumSectionContainer containerClass={...}>
  <div className="container mx-auto">
    {children}
  </div>
</CurriculumSectionContainer>

// ✅ 직접 사용
<CurriculumSectionContainer containerClass={...}>
  {children}
</CurriculumSectionContainer>
```

## 혜택

✅ **일관성**: 모든 페이지가 동일한 UX 제공  
✅ **속도**: 새 페이지를 빠르게 만들 수 있음  
✅ **유지보수**: 한 곳만 수정하면 모든 페이지에 반영  
✅ **품질**: 검증된 컴포넌트로 버그 최소화  
✅ **확장성**: 새로운 커리큘럼 추가가 쉬움  

## 예제

- **아두이노**: `/app/curriculum/arduino/page.tsx`
- **앱 인벤터**: `/app/curriculum/app-inventor/page.tsx`
- **Raspberry Pi**: `/app/curriculum/raspberry-pi/page.tsx`
