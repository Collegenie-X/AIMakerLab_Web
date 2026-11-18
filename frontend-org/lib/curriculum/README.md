# 커리큘럼 시스템 통합 가이드

> **통일된 형식으로 커리큘럼 관리**  
> 비즈니스 로직과 UI 로직 분리, 공통 컴포넌트로 유지보수 최적화

---

## 📁 디렉토리 구조

```
lib/curriculum/
├── types.ts                    # 통합 타입 정의
├── hooks/
│   └── useCurriculum.ts       # React-Query Hook (30분 캐시)
├── utils/
│   └── curriculum-helpers.ts  # 비즈니스 로직 (순수 함수)
├── components/                 # 공통 UI 컴포넌트
│   ├── index.ts
│   ├── CurriculumLayout.tsx
│   ├── CurriculumHeroSection.tsx
│   ├── CurriculumInfoCards.tsx
│   ├── CurriculumModulesSection.tsx
│   ├── CurriculumLearningGoals.tsx
│   ├── CurriculumGradeTable.tsx
│   ├── CurriculumMaterials.tsx
│   └── CurriculumCTA.tsx
└── README.md                   # 이 파일
```

---

## 🎯 설계 원칙

### 1. 비즈니스 로직과 UI 로직 분리

```
┌─────────────────────────────────────┐
│  UI 컴포넌트 (components/)         │
│  - 화면 렌더링만 담당               │
│  - Props로 데이터 받기             │
│  - 이벤트 핸들러만 처리             │
└────────────┬────────────────────────┘
             │
             ↓
┌─────────────────────────────────────┐
│  비즈니스 로직 (utils/)            │
│  - 데이터 가공 및 변환             │
│  - 순수 함수로 작성                │
│  - 테스트 가능                     │
└────────────┬────────────────────────┘
             │
             ↓
┌─────────────────────────────────────┐
│  데이터 페칭 (hooks/)              │
│  - React-Query로 캐싱             │
│  - 로딩/에러 상태 관리             │
│  - API/JSON 통합                   │
└─────────────────────────────────────┘
```

### 2. 공통 컴포넌트로 재사용성 극대화

- 모든 커리큘럼 페이지에서 동일한 컴포넌트 사용
- 일관된 UI/UX 제공
- 수정 시 한 곳만 변경하면 전체 반영

### 3. 확장 가능한 타입 시스템

- TypeScript로 타입 안정성 확보
- 선택적(optional) 필드로 유연성 제공
- 프론트엔드 ↔ 백엔드 타입 일치

---

## 🚀 사용 방법

### 1. 새로운 커리큘럼 페이지 만들기

```tsx
// app/curriculum/new-course/page.tsx
"use client";

import { CurriculumCategory } from "@/lib/curriculum/types";
import {
  CurriculumLayout,
  CurriculumHeroSection,
  CurriculumInfoCards,
  CurriculumModulesSection,
  CurriculumLearningGoals,
  CurriculumGradeTable,
  CurriculumMaterials,
  CurriculumCTA,
} from "@/lib/curriculum/components";

export default function NewCoursePage() {
  return (
    <CurriculumLayout category={CurriculumCategory.NEW_COURSE}>
      {(data) => (
        <>
          {/* 히어로 섹션 */}
          <CurriculumHeroSection
            data={data.hero}
            gradientClass={data.meta.gradientClass}
          />

          {/* 과정 정보 카드 (선택적) */}
          {data.courseInfo && <CurriculumInfoCards items={data.courseInfo} />}

          {/* 커리큘럼 모듈 (선택적) */}
          {data.curriculum && (
            <CurriculumModulesSection data={data.curriculum} />
          )}

          {/* 학습 목표 (선택적) */}
          {data.learningGoals && (
            <CurriculumLearningGoals data={data.learningGoals} />
          )}

          {/* 학년별 추천 (선택적) */}
          {data.gradeRecommendation && (
            <CurriculumGradeTable data={data.gradeRecommendation} />
          )}

          {/* 수업 자료 (선택적) */}
          {data.materials && <CurriculumMaterials data={data.materials} />}

          {/* CTA */}
          <CurriculumCTA
            data={data.cta}
            gradientClass={data.meta.ctaGradient}
          />
        </>
      )}
    </CurriculumLayout>
  );
}
```

### 2. JSON 파일 작성

```json
// public/curriculum/new-course.json
{
  "meta": {
    "category": "new-course",
    "title": "새로운 과정",
    "description": "과정 설명",
    "gradientClass": "from-blue-500 to-cyan-600",
    "ctaGradient": "from-blue-500 to-cyan-600",
    "metaTitle": "새로운 과정 | AI메이커랩",
    "metaDescription": "과정 설명",
    "order": 10
  },
  "hero": {
    "badge": "신규 과정",
    "title": "새로운 과정",
    "description": "과정 설명"
  },
  "cta": {
    "title": "지금 바로 시작하세요!",
    "description": "AI 메이커랩과 함께 미래를 준비하세요.",
    "primaryButton": {
      "text": "수업 신청하기",
      "link": "/inquiry"
    }
  }
}
```

### 3. 비즈니스 로직 활용

```tsx
import {
  sortModules,
  calculateTotalDuration,
  getDifficultyBadgeClass,
} from "@/lib/curriculum/utils/curriculum-helpers";

// 모듈 정렬
const sortedModules = sortModules(modules);

// 총 학습 시간 계산
const totalDuration = calculateTotalDuration(modules);

// 난이도 배지 클래스
const badgeClass = getDifficultyBadgeClass("초급");
```

---

## 🔧 React-Query 설정

### 캐시 설정

- **staleTime**: 30분 (데이터가 fresh 상태 유지)
- **cacheTime**: 30분 (캐시 보관 시간)
- **retry**: 2번 (실패 시 재시도)
- **refetchOnWindowFocus**: false (창 포커스 시 재요청 안 함)

### 환경별 데이터 소스

```typescript
// 개발 환경: JSON 파일 사용
process.env.NODE_ENV === "development"
  → /public/curriculum/{category}.json

// 프로덕션 환경: 백엔드 API 사용
process.env.NEXT_PUBLIC_API_BASE_URL
  → /api/curriculum/{category}/
```

---

## 📦 백엔드 API

### 엔드포인트

```
GET /api/curriculum/              # 전체 커리큘럼 목록
GET /api/curriculum/{category}/   # 특정 커리큘럼 상세
```

### 응답 형식

```json
{
  "success": true,
  "data": {
    "meta": { ... },
    "hero": { ... },
    "courseInfo": [ ... ],
    "curriculum": { ... },
    "cta": { ... }
  }
}
```

---

## ✅ 체크리스트: 기존 커리큘럼 마이그레이션

### 1단계: JSON 파일 생성
- [ ] `public/curriculum/{category}.json` 파일 생성
- [ ] 기존 데이터를 새 형식으로 변환
- [ ] 필수 필드 확인 (meta, hero, cta)

### 2단계: 페이지 리팩토링
- [ ] 기존 `page.tsx` 백업
- [ ] `CurriculumLayout`으로 감싸기
- [ ] 공통 컴포넌트로 교체
- [ ] 커스텀 컴포넌트는 `children` 슬롯 활용

### 3단계: 타입 확인
- [ ] TypeScript 오류 없는지 확인
- [ ] `pnpm run build` 성공 확인

### 4단계: 테스트
- [ ] 로컬에서 페이지 확인
- [ ] 데이터 로딩 확인
- [ ] 모든 섹션 렌더링 확인

---

## 🎨 커스터마이징

### 커스텀 섹션 추가

```tsx
<CurriculumLayout category={CurriculumCategory.AI_CODING}>
  {(data) => (
    <>
      <CurriculumHeroSection data={data.hero} />
      
      {/* 커스텀 섹션 */}
      <section className="py-16">
        <div className="curriculum-container">
          <h2>커스텀 섹션</h2>
          {/* 커스텀 콘텐츠 */}
        </div>
      </section>
      
      <CurriculumModulesSection data={data.curriculum} />
      <CurriculumCTA data={data.cta} />
    </>
  )}
</CurriculumLayout>
```

### 컴포넌트 스타일 오버라이드

```tsx
<CurriculumModulesSection
  data={data.curriculum}
  defaultTabId="advanced"
  activeTabClass="bg-red-600 text-white"
/>
```

---

## 🐛 트러블슈팅

### 데이터 로딩 안 됨
```
1. JSON 파일 경로 확인: public/curriculum/{category}.json
2. 파일 형식 확인: 올바른 JSON 형식인지
3. 브라우저 콘솔에서 네트워크 요청 확인
```

### 타입 오류
```
1. types.ts에서 타입 정의 확인
2. 선택적 필드는 ?로 표시
3. JSON 데이터와 타입 일치 여부 확인
```

### 캐시 문제
```
1. 개발자 도구 → Application → Clear storage
2. React Query Devtools로 캐시 상태 확인
3. Hard refresh (Cmd+Shift+R / Ctrl+Shift+R)
```

---

## 📞 문의

- **이슈**: GitHub Issues
- **문서 개선**: Pull Request 환영

---

**최종 업데이트**: 2025-01-07  
**버전**: 1.0.0

