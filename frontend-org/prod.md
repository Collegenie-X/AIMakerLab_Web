# AIMakerLab Web Frontend 개발 문서

## 📋 목차
1. [프로젝트 개요](#프로젝트-개요)
2. [기술 스택](#기술-스택)
3. [프로젝트 구조](#프로젝트-구조)
4. [개발 원칙](#개발-원칙)
5. [주요 폴더 및 파일](#주요-폴더-및-파일)
6. [핵심 패턴](#핵심-패턴)
7. [컴포넌트 아키텍처](#컴포넌트-아키텍처)
8. [데이터 관리](#데이터-관리)
9. [스타일링 규칙](#스타일링-규칙)
10. [네이밍 컨벤션](#네이밍-컨벤션)

---

## 프로젝트 개요

**AI Maker Lab** 웹사이트는 코딩/AI/메이커 교육 전문 랩의 온라인 플랫폼입니다.

### 주요 기능
- 🎓 **교육 커리큘럼**: 앱 인벤터, 아두이노, 라즈베리파이, AI 교육 프로그램
- 📞 **수업 문의**: 출장/주중/주말 수업 신청 및 일정 관리
- 🛒 **교육 제품(KIT)**: 코딩/AI 교구 판매 및 견적 문의
- 🖼️ **갤러리**: 학생 작품 및 수업 후기
- ℹ️ **소개**: AI Maker Lab 소개 및 오시는 길

---

## 기술 스택

### 핵심 프레임워크
- **Next.js 15.2.4** (App Router)
- **React 19**
- **TypeScript 5**

### UI 라이브러리
- **Tailwind CSS 4.1.9** (유틸리티 기반 스타일링)
- **Radix UI** (접근성 높은 UI 프리미티브)
- **Lucide React** (아이콘)
- **Shadcn/ui** 기반 커스텀 컴포넌트 시스템

### 폼 & 검증
- **React Hook Form 7.60.0**
- **Zod 3.25.76** (스키마 검증)

### 기타
- **next-themes** (다크모드)
- **Vercel Analytics** (분석)
- **date-fns** (날짜 처리)
- **Recharts** (차트)

---

## 프로젝트 구조

```
frontend/
├── app/                          # Next.js App Router 페이지
│   ├── about/                    # AI Maker Lab 소개
│   │   ├── components/           # 소개 페이지 전용 컴포넌트
│   │   ├── config.ts             # 텍스트/설정 관리
│   │   ├── location/             # 오시는 길
│   │   └── page.tsx
│   │
│   ├── curriculum/               # 교육 커리큘럼
│   │   ├── components/           # ✅ 공통 커리큘럼 컴포넌트 (재사용)
│   │   │   ├── HeroSection.tsx
│   │   │   ├── CourseInfoSection.tsx
│   │   │   ├── CourseDescriptionSection.tsx
│   │   │   ├── LearningGoalsSection.tsx
│   │   │   ├── LearningPathSection.tsx
│   │   │   ├── CurriculumSection.tsx
│   │   │   ├── ProjectCurriculumSection.tsx
│   │   │   ├── GradeRecommendationTable.tsx
│   │   │   ├── CompactGradeTable.tsx
│   │   │   ├── EducationRequirementsSection.tsx
│   │   │   ├── ClassGallerySection.tsx
│   │   │   ├── GallerySection.tsx
│   │   │   ├── MaterialsDownloadSection.tsx
│   │   │   ├── CtaSection.tsx
│   │   │   ├── CurriculumSectionContainer.tsx
│   │   │   ├── index.ts
│   │   │   └── README.md         # 컴포넌트 사용 가이드
│   │   │
│   │   ├── ai-education/         # AI 교육 프로그램
│   │   │   ├── config.ts         # 색상, 라벨, 링크 등 설정
│   │   │   ├── hooks/
│   │   │   │   └── useAIEducationCurriculumData.ts
│   │   │   ├── page.tsx
│   │   │   └── README.md
│   │   │
│   │   ├── app-inventor/         # 앱 인벤터 코딩
│   │   │   ├── components/       # (레거시) 개별 컴포넌트
│   │   │   ├── config.ts
│   │   │   ├── hooks/
│   │   │   │   └── useAppInventorCurriculumData.ts
│   │   │   ├── page.tsx
│   │   │   └── README.md
│   │   │
│   │   ├── arduino/              # 아두이노 코딩
│   │   │   ├── components/       # (레거시) 개별 컴포넌트
│   │   │   ├── config.ts
│   │   │   ├── hooks/
│   │   │   │   └── useArduinoCurriculumData.ts
│   │   │   ├── page.tsx
│   │   │   └── README.md
│   │   │
│   │   ├── raspberry-pi/         # 라즈베리파이 코딩
│   │   │   ├── config.ts
│   │   │   ├── hooks/
│   │   │   │   └── useRaspberryPiCurriculumData.ts
│   │   │   ├── page.tsx
│   │   │   └── README.md
│   │   │
│   │   └── science/              # 심화 교육 프로그램
│   │       ├── config.ts
│   │       ├── hooks/
│   │       │   └── useScienceCurriculumData.ts
│   │       ├── page.tsx
│   │       └── README.md
│   │
│   ├── gallery/                  # 갤러리
│   │   ├── components/
│   │   │   ├── GalleryCard.tsx
│   │   │   ├── GalleryCategoryFilter.tsx
│   │   │   ├── GalleryDetailDialog.tsx
│   │   │   ├── GalleryEmptyState.tsx
│   │   │   ├── GalleryFormDialog.tsx
│   │   │   └── GalleryHeroSection.tsx
│   │   ├── config.ts
│   │   ├── hooks/
│   │   │   └── useGalleryItems.ts
│   │   ├── page.tsx
│   │   ├── reviews/              # 수업 후기
│   │   │   ├── components/
│   │   │   ├── config.ts
│   │   │   └── page.tsx
│   │   └── works/                # 학생 작품
│   │       ├── config.ts
│   │       └── page.tsx
│   │
│   ├── home/                     # 홈페이지
│   │   ├── config.ts             # 홈 텍스트 설정
│   │   └── sections/
│   │       ├── HeroSection.tsx
│   │       ├── IntroVideoSection.tsx
│   │       ├── FeaturesSection.tsx
│   │       ├── CurriculumSection.tsx
│   │       ├── QuickLinksSection.tsx
│   │       ├── RecommendedKitsSection.tsx
│   │       ├── RecentInquiriesSection.tsx
│   │       ├── GallerySection.tsx
│   │       ├── OutreachStatsSection.tsx
│   │       └── CtaSection.tsx
│   │
│   ├── inquiry/                  # 수업 문의
│   │   ├── components/
│   │   │   ├── InquiryDialog.tsx
│   │   │   ├── InquiryList.tsx
│   │   │   └── InquiryViewDialog.tsx
│   │   ├── config.ts
│   │   ├── hooks/
│   │   │   └── useInquiries.ts
│   │   ├── method/               # 교육 소식
│   │   │   └── page.tsx
│   │   ├── online/               # 출장 수업
│   │   │   └── page.tsx
│   │   ├── schedule/             # 주중 수업
│   │   │   ├── components/
│   │   │   ├── config.ts
│   │   │   ├── hooks/
│   │   │   │   └── useSchedules.ts
│   │   │   └── page.tsx
│   │   └── weekend-schedule/     # 주말 수업
│   │       └── page.tsx
│   │
│   ├── products/                 # 교육 제품(KIT)
│   │   ├── coding-ai/            # 코딩/AI 제품
│   │   │   ├── [id]/             # 제품 상세 페이지
│   │   │   ├── components/
│   │   │   ├── config.ts
│   │   │   ├── hooks/
│   │   │   │   └── useProducts.ts
│   │   │   └── page.tsx
│   │   │
│   │   ├── inquiry/              # 견적 문의
│   │   │   ├── board/
│   │   │   ├── components/
│   │   │   ├── config.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useQuoteItems.ts
│   │   │   │   ├── useQuotes.ts
│   │   │   │   └── useQuoteCalculator.ts
│   │   │   └── page.tsx
│   │   │
│   │   └── videos/               # 교구 사용 영상
│   │       ├── components/
│   │       │   └── VideoGrid.tsx
│   │       ├── config.ts
│   │       ├── hooks/
│   │       │   └── useVideos.ts
│   │       ├── page.tsx
│   │       └── README.md
│   │
│   ├── globals.css               # 전역 스타일 (Tailwind + 커스텀)
│   ├── layout.tsx                # 루트 레이아웃
│   ├── loading.tsx               # 로딩 상태
│   └── page.tsx                  # 홈페이지 진입점
│
├── components/                   # 전역 공통 컴포넌트
│   ├── header/
│   │   ├── config.ts             # 헤더 네비게이션 설정
│   │   └── index.tsx
│   │
│   ├── footer/
│   │   ├── config.ts             # 푸터 정보 설정
│   │   └── index.tsx
│   │
│   ├── ui/                       # Shadcn/ui 기반 디자인 시스템
│   │   ├── buttons/              # 버튼 관련
│   │   │   ├── button.tsx
│   │   │   ├── button-group.tsx
│   │   │   ├── toggle.tsx
│   │   │   ├── toggle-group.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── data-display/         # 데이터 표시
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── table.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── carousel.tsx
│   │   │   ├── chart.tsx
│   │   │   ├── empty.tsx
│   │   │   ├── item.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── forms/                # 폼 관련
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── select.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── radio-group.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── form.tsx
│   │   │   ├── field.tsx
│   │   │   ├── label.tsx
│   │   │   ├── input-group.tsx
│   │   │   ├── input-otp.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── feedback/             # 피드백 관련
│   │   │   ├── toast.tsx
│   │   │   ├── toaster.tsx
│   │   │   ├── sonner.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── spinner.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── overlays/             # 오버레이 관련
│   │   │   ├── dialog.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── drawer.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── tooltip.tsx
│   │   │   ├── hover-card.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── context-menu.tsx
│   │   │   ├── command.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── navigation/           # 네비게이션 관련
│   │   │   ├── tabs.tsx
│   │   │   ├── navigation-menu.tsx
│   │   │   ├── breadcrumb.tsx
│   │   │   ├── pagination.tsx
│   │   │   ├── menubar.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── layout/               # 레이아웃 관련
│   │   │   ├── accordion.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── collapsible.tsx
│   │   │   ├── resizable.tsx
│   │   │   ├── aspect-ratio.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── utilities/            # 유틸리티
│   │   │   ├── use-toast.ts
│   │   │   ├── use-mobile.tsx
│   │   │   ├── kbd.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── index.ts              # 통합 export
│   │   └── README.md
│   │
│   ├── inquiry-form-dialog.tsx   # 문의 폼 다이얼로그
│   ├── login-dialog.tsx          # 로그인 다이얼로그
│   ├── mobile-drawer.tsx         # 모바일 메뉴 드로어
│   └── theme-provider.tsx        # 테마 프로바이더
│
├── hooks/                        # 전역 커스텀 훅
│   ├── use-mobile.ts             # 모바일 감지
│   └── use-toast.ts              # 토스트 알림
│
├── lib/                          # 유틸리티 라이브러리
│   └── utils.ts                  # cn() - Tailwind 클래스 병합
│
├── theme/                        # 테마 설정
│   ├── index.ts                  # 테마 통합 export
│   └── tokens.ts                 # 디자인 토큰
│
├── public/                       # 정적 파일
│   ├── curriculum/               # 커리큘럼 JSON 데이터
│   │   ├── ai-education.json
│   │   ├── app-inventor.json
│   │   ├── arduino.json
│   │   ├── raspberry-pi.json
│   │   └── science.json
│   │
│   ├── gallery/                  # 갤러리 이미지 & 데이터
│   │   ├── reviews.json
│   │   └── works.json
│   │
│   ├── home/                     # 홈 이미지
│   ├── inquiry/                  # 문의 관련 데이터
│   │   ├── inquiries.json
│   │   ├── schedules.json
│   │   ├── schedules-weekday.json
│   │   └── schedules-weekend.json
│   │
│   ├── products/                 # 제품 이미지 & 데이터
│   │   ├── products.json
│   │   ├── product-details.json
│   │   ├── product-reviews.json
│   │   ├── quote-items.json
│   │   ├── videos.json
│   │   ├── classroom-photos.json
│   │   └── related-classes.json
│   │
│   ├── favicon.png
│   ├── favicon.svg
│   └── site.webmanifest
│
├── styles/
│   └── globals.css               # (중복) 전역 스타일
│
├── package.json                  # 의존성 관리
├── tsconfig.json                 # TypeScript 설정
├── next.config.mjs               # Next.js 설정
├── postcss.config.mjs            # PostCSS 설정
├── components.json               # Shadcn/ui 설정
└── prod.md                       # 📄 이 문서

```

---

## 개발 원칙

### ✅ 1. 설정 기반 개발 (Configuration-Driven)

모든 텍스트, 라벨, 색상, 링크는 **`config.ts`**에서 관리합니다.

```typescript
// ✅ 좋은 예: config.ts에서 관리
export const AI_EDUCATION_CONFIG = {
  meta: {
    title: "AI 교육 프로그램 | AI메이커랩",
    description: "DancingwithAI, TeachableMachine, ChatGPT를 활용한 창의적 AI 교육",
  },
  buttons: {
    viewSchedule: "수업 일정 보기",
  },
  labels: {
    duration: "수업 기간",
    capacity: "수강 인원",
    method: "수업 방식",
  },
  links: {
    schedule: "/inquiry/schedule",
  },
  gradients: {
    hero: "from-red-500 via-rose-600 to-pink-700",
    cta: "bg-red-600",
  },
} as const;
```

```tsx
// ❌ 나쁜 예: 하드코딩
<h1>AI 교육 프로그램</h1>
<Button href="/inquiry/schedule">수업 일정 보기</Button>

// ✅ 좋은 예: config 사용
<h1>{AI_EDUCATION_CONFIG.meta.title}</h1>
<Button href={AI_EDUCATION_CONFIG.links.schedule}>
  {AI_EDUCATION_CONFIG.buttons.viewSchedule}
</Button>
```

### ✅ 2. 데이터와 UI 분리

컨텐츠 데이터는 **JSON 파일**에서 관리하고, 컴포넌트는 데이터를 받아 렌더링만 합니다.

```typescript
// hooks/useAIEducationCurriculumData.ts
export function useAIEducationCurriculumData() {
  const [data, setData] = useState<AIEducationCurriculumData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/curriculum/ai-education.json");
      const jsonData = await response.json();
      setData(jsonData);
    };
    fetchData();
  }, []);

  return { data, loading, error };
}
```

### ✅ 3. 컴포넌트 재사용 (DRY 원칙)

동일한 기능의 컴포넌트를 중복 생성하지 않습니다.

```
❌ 나쁜 예: 각 페이지마다 개별 컴포넌트
app/curriculum/arduino/components/HeroSection.tsx
app/curriculum/app-inventor/components/HeroSection.tsx
app/curriculum/raspberry-pi/components/HeroSection.tsx

✅ 좋은 예: 공통 컴포넌트 재사용
app/curriculum/components/HeroSection.tsx (모든 페이지에서 사용)
```

### ✅ 4. Early Return 패턴

조건 검사 후 빠르게 반환하여 중첩을 줄입니다.

```typescript
// ✅ 좋은 예: Early Return
export default function AIEducationCurriculumPage() {
  const { data, loading, error } = useAIEducationCurriculumData();

  // Early return: 로딩 상태
  if (loading) {
    return <LoadingState />;
  }

  // Early return: 에러 상태
  if (error) {
    return <ErrorState error={error} />;
  }

  // Early return: 데이터 없음
  if (!data) {
    return <EmptyState />;
  }

  // 정상 렌더링
  return (
    <main>
      <HeroSection {...data.hero} />
      {/* ... */}
    </main>
  );
}
```

### ✅ 5. 모듈형 구조

각 기능별로 폴더를 분리하고, `index.ts`로 export를 관리합니다.

```typescript
// components/curriculum/index.ts
export { HeroSection } from "./HeroSection";
export { CourseInfoSection } from "./CourseInfoSection";
export { CourseDescriptionSection } from "./CourseDescriptionSection";
// ...

// 사용 시
import {
  HeroSection,
  CourseInfoSection,
  CourseDescriptionSection,
} from "../components";
```

### ✅ 6. 클린 코드 & 한글 주석

```typescript
/**
 * AI 교육 커리큘럼 데이터 Hook
 * JSON 파일에서 데이터를 가져와 상태로 관리합니다
 */
export function useAIEducationCurriculumData() {
  // Early return: 데이터 중복 로딩 방지
  if (data) return;

  // Early return: 응답 실패 시
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}
```

---

## 주요 폴더 및 파일

### 📁 `app/` - Next.js App Router

| 폴더 | 설명 | 주요 파일 |
|------|------|----------|
| `about/` | AI Maker Lab 소개 | `page.tsx`, `config.ts` |
| `curriculum/` | 교육 커리큘럼 (공통 컴포넌트 기반) | `components/`, `ai-education/`, `arduino/`, `app-inventor/`, `raspberry-pi/`, `science/` |
| `gallery/` | 갤러리 (작품, 후기) | `works/`, `reviews/` |
| `home/` | 홈페이지 섹션 | `sections/`, `config.ts` |
| `inquiry/` | 수업 문의 | `online/`, `schedule/`, `weekend-schedule/`, `method/` |
| `products/` | 교육 제품(KIT) | `coding-ai/`, `inquiry/`, `videos/` |

### 📁 `components/` - 전역 공통 컴포넌트

| 폴더 | 설명 | 주요 컴포넌트 |
|------|------|--------------|
| `header/` | 헤더 네비게이션 | `index.tsx`, `config.ts` |
| `footer/` | 푸터 | `index.tsx`, `config.ts` |
| `ui/buttons/` | 버튼 관련 | `button.tsx`, `toggle.tsx`, `button-group.tsx` |
| `ui/data-display/` | 데이터 표시 | `card.tsx`, `badge.tsx`, `table.tsx`, `carousel.tsx` |
| `ui/forms/` | 폼 관련 | `input.tsx`, `select.tsx`, `checkbox.tsx`, `form.tsx` |
| `ui/feedback/` | 피드백 | `toast.tsx`, `progress.tsx`, `skeleton.tsx`, `spinner.tsx` |
| `ui/overlays/` | 오버레이 | `dialog.tsx`, `sheet.tsx`, `popover.tsx`, `tooltip.tsx` |
| `ui/navigation/` | 네비게이션 | `tabs.tsx`, `navigation-menu.tsx`, `pagination.tsx` |
| `ui/layout/` | 레이아웃 | `accordion.tsx`, `separator.tsx`, `scroll-area.tsx` |

### 📁 `public/` - 정적 파일 & JSON 데이터

| 폴더 | 설명 | 파일 형식 |
|------|------|----------|
| `curriculum/` | 커리큘럼 데이터 | `.json` |
| `gallery/` | 갤러리 이미지 & 데이터 | `.json`, `.png`, `.jpg` |
| `home/` | 홈 이미지 | `.png`, `.jpg` |
| `inquiry/` | 문의 데이터 | `.json` |
| `products/` | 제품 이미지 & 데이터 | `.json`, `.png`, `.jpg` |

---

## 핵심 패턴

### 1️⃣ 페이지 구조 패턴

모든 페이지는 다음 구조를 따릅니다:

```
app/[section]/[page]/
├── components/          # (선택) 페이지 전용 컴포넌트
├── hooks/               # 데이터 로딩 훅
│   └── use[Page]Data.ts
├── config.ts            # 텍스트, 색상, 라벨 설정
├── page.tsx             # 페이지 진입점
└── README.md            # (선택) 문서
```

### 2️⃣ 커스텀 훅 패턴

데이터 로딩은 커스텀 훅으로 분리합니다.

```typescript
// hooks/useAIEducationCurriculumData.ts
export function useAIEducationCurriculumData() {
  const [data, setData] = useState<AIEducationCurriculumData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Early return: 데이터 중복 로딩 방지
    if (data) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/curriculum/ai-education.json");

        // Early return: 응답 실패 시
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.error("데이터 로딩 실패:", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [data]);

  return { data, loading, error };
}
```

### 3️⃣ Config 패턴

모든 텍스트와 설정은 `config.ts`에서 관리합니다.

```typescript
// config.ts
export const PAGE_CONFIG = {
  // 메타 정보
  meta: {
    title: "페이지 제목 | AI메이커랩",
    description: "페이지 설명",
  },

  // 버튼 텍스트
  buttons: {
    viewSchedule: "수업 일정 보기",
    download: "다운로드",
  },

  // 라벨
  labels: {
    duration: "수업 기간",
    capacity: "수강 인원",
  },

  // 링크
  links: {
    schedule: "/inquiry/schedule",
  },

  // 색상 매핑
  iconColors: {
    blue: { bg: "bg-blue-100", text: "text-blue-600" },
    purple: { bg: "bg-purple-100", text: "text-purple-600" },
  },

  // 그라데이션
  gradients: {
    hero: "from-blue-500 to-purple-600",
    cta: "bg-blue-600",
  },

  // 레이아웃
  layout: {
    containerClass: "curriculum-container-6xl",
  },
} as const;

export type PageConfig = typeof PAGE_CONFIG;
```

### 4️⃣ 컴포넌트 Props 패턴

컴포넌트는 명확한 Props 타입을 정의합니다.

```typescript
// HeroSection.tsx
import { LucideIcon } from "lucide-react";

interface HeroFeature {
  icon: LucideIcon;
  label: string;
}

interface HeroSectionProps {
  badge: string;
  badgeIcon?: LucideIcon;
  title: string;
  description: string;
  gradientClass: string;
  containerClass: string;
  features?: HeroFeature[];
}

export function HeroSection({
  badge,
  badgeIcon: BadgeIcon,
  title,
  description,
  gradientClass,
  containerClass,
  features = [],
}: HeroSectionProps) {
  return (
    <section className={`relative py-20 bg-gradient-to-br ${gradientClass}`}>
      <div className={`${containerClass} mx-auto px-4`}>
        {/* ... */}
      </div>
    </section>
  );
}
```

---

## 컴포넌트 아키텍처

### 계층 구조

```
1. 페이지 컴포넌트 (page.tsx)
   ↓
2. 섹션 컴포넌트 (HeroSection, CourseInfoSection, ...)
   ↓
3. UI 컴포넌트 (Card, Button, Badge, ...)
   ↓
4. 프리미티브 (Radix UI)
```

### 공통 커리큘럼 컴포넌트

`app/curriculum/components/`에 있는 공통 컴포넌트는 모든 커리큘럼 페이지에서 재사용됩니다.

| 컴포넌트 | 설명 | Props |
|---------|------|-------|
| `HeroSection` | 페이지 상단 히어로 | `badge`, `title`, `description`, `gradientClass` |
| `CourseInfoSection` | 과정 정보 카드 | `data`, `iconColors`, `containerClass` |
| `CourseDescriptionSection` | 과정 소개 | `title`, `paragraphs`, `images` |
| `LearningGoalsSection` | 학습 목표 | `title`, `goals`, `achievements`, `primaryColor` |
| `LearningPathSection` | 학습 단계 구조도 | `title`, `steps`, `primaryColor` |
| `CurriculumSection` | 커리큘럼 탭 | `title`, `tabs`, `activeTabClass`, `primaryColor` |
| `ProjectCurriculumSection` | 학년별 프로젝트 탭 | `title`, `projects`, `primaryColor` |
| `GradeRecommendationTable` | 학년별 추천 표 | `title`, `headers`, `courses`, `legend` |
| `CompactGradeTable` | 컴팩트 학년별 추천 | `title`, `programName`, `courses` |
| `EducationRequirementsSection` | 교육 조건 | `title`, `items`, `iconColors` |
| `ClassGallerySection` | 수업 현장 갤러리 (탭) | `title`, `tabs`, `activeTabClass` |
| `GallerySection` | 단순 이미지 갤러리 | `title`, `images` |
| `MaterialsDownloadSection` | 수업 자료 다운로드 | `title`, `categories` |
| `CtaSection` | CTA 버튼 | `title`, `buttonText`, `buttonLink`, `bgClass` |
| `CurriculumSectionContainer` | 섹션 래퍼 | `className`, `containerClass` |

### UI 컴포넌트 시스템

Shadcn/ui 기반으로 구축된 디자인 시스템입니다.

#### 버튼 (`ui/buttons/`)
- `button.tsx` - 기본 버튼
- `button-group.tsx` - 버튼 그룹
- `toggle.tsx` - 토글 버튼
- `toggle-group.tsx` - 토글 그룹

#### 데이터 표시 (`ui/data-display/`)
- `card.tsx` - 카드 (CardHeader, CardTitle, CardContent, CardFooter)
- `badge.tsx` - 배지
- `avatar.tsx` - 아바타
- `table.tsx` - 테이블
- `carousel.tsx` - 캐러셀
- `chart.tsx` - 차트

#### 폼 (`ui/forms/`)
- `input.tsx` - 입력 필드
- `textarea.tsx` - 텍스트 영역
- `select.tsx` - 셀렉트 박스
- `checkbox.tsx` - 체크박스
- `radio-group.tsx` - 라디오 그룹
- `switch.tsx` - 스위치
- `slider.tsx` - 슬라이더
- `calendar.tsx` - 캘린더
- `form.tsx` - 폼 (React Hook Form 통합)

#### 피드백 (`ui/feedback/`)
- `toast.tsx` - 토스트 알림
- `progress.tsx` - 프로그레스 바
- `skeleton.tsx` - 스켈레톤 로딩
- `spinner.tsx` - 스피너

#### 오버레이 (`ui/overlays/`)
- `dialog.tsx` - 다이얼로그
- `sheet.tsx` - 시트 (사이드 패널)
- `drawer.tsx` - 드로어
- `popover.tsx` - 팝오버
- `tooltip.tsx` - 툴팁
- `dropdown-menu.tsx` - 드롭다운 메뉴

#### 네비게이션 (`ui/navigation/`)
- `tabs.tsx` - 탭
- `navigation-menu.tsx` - 네비게이션 메뉴
- `pagination.tsx` - 페이지네이션
- `breadcrumb.tsx` - 브레드크럼

#### 레이아웃 (`ui/layout/`)
- `accordion.tsx` - 아코디언
- `separator.tsx` - 구분선
- `scroll-area.tsx` - 스크롤 영역
- `collapsible.tsx` - 접기/펼치기

---

## 데이터 관리

### JSON 데이터 구조

모든 컨텐츠 데이터는 `public/` 폴더의 JSON 파일에서 관리됩니다.

#### 커리큘럼 데이터 예시

```json
// public/curriculum/ai-education.json
{
  "hero": {
    "badge": "AI 교육",
    "title": "AI 교육 프로그램",
    "description": "DancingwithAI, TeachableMachine, ChatGPT 활용"
  },
  "courseInfo": [
    {
      "icon": "Clock",
      "iconColor": "blue",
      "label": "수업 기간",
      "value": "3시간 / 6시간 / 12시간"
    }
  ],
  "courseDescription": {
    "title": "AI 교육이란?",
    "paragraphs": [
      "인공지능의 기본 원리를 배우고...",
      "실제 AI 도구를 활용하여..."
    ],
    "images": [
      { "src": "/curriculum/ai-1.jpg", "alt": "AI 수업 모습" }
    ]
  },
  "learningGoals": {
    "title": "학습 목표",
    "description": "무엇을 배울까요?",
    "goals": [
      {
        "icon": "Brain",
        "iconColor": "purple",
        "title": "AI 이해",
        "description": "인공지능의 기본 개념 이해"
      }
    ],
    "achievements": [
      "AI 도구 활용 능력",
      "창의적 문제 해결"
    ]
  },
  "curriculum": {
    "title": "커리큘럼",
    "tabs": [
      {
        "id": "3hours",
        "label": "3시간 과정",
        "duration": "3시간",
        "modules": [
          {
            "moduleNumber": 1,
            "moduleTitle": "AI 기초",
            "topics": [
              { "title": "AI란 무엇인가?", "duration": "30분" }
            ]
          }
        ]
      }
    ]
  },
  "gradeRecommendation": {
    "title": "학년별 추천",
    "programName": "AI 교육",
    "headers": ["과정", "초3-4", "초5-6", "중1-2", "중3", "고등"],
    "courses": [
      {
        "name": "3시간 과정",
        "grades": ["○", "●", "●", "●", "●"]
      }
    ],
    "legend": [
      { "symbol": "●", "label": "추천", "color": "text-purple-600" },
      { "symbol": "○", "label": "가능", "color": "text-gray-400" }
    ]
  },
  "educationRequirements": {
    "title": "교육 조건",
    "items": [
      {
        "icon": "Users",
        "iconColor": "blue",
        "title": "수강 인원",
        "description": "4-6명 소규모 그룹"
      }
    ]
  },
  "materials": {
    "title": "수업 자료 다운로드",
    "description": "교육에 필요한 자료를 다운로드하세요",
    "categories": [
      {
        "id": "guides",
        "title": "교사용 지도안",
        "items": [
          {
            "id": "guide1",
            "title": "3시간 과정 지도안",
            "description": "기초 과정 가이드",
            "icon": "FileText",
            "format": "PDF",
            "pages": "12페이지",
            "size": "2.5MB",
            "downloadUrl": "/downloads/guide.pdf"
          }
        ]
      }
    ]
  },
  "classGallery": {
    "title": "수업 현장 및 학생 작품",
    "description": "실제 수업 모습과 작품들을 확인해보세요",
    "tabs": [
      {
        "id": "class-scene",
        "label": "수업 현장",
        "items": [
          {
            "src": "/gallery/class-1.jpg",
            "alt": "수업 모습",
            "description": "AI 수업 진행 중"
          }
        ]
      }
    ]
  },
  "cta": {
    "title": "지금 시작하세요",
    "description": "수업 일정을 확인해보세요",
    "buttonText": "수업 일정 보기",
    "buttonLink": "/inquiry/schedule"
  }
}
```

### 데이터 로딩 흐름

```
1. 페이지 로드
   ↓
2. 커스텀 훅 호출 (useAIEducationCurriculumData)
   ↓
3. fetch("/curriculum/ai-education.json")
   ↓
4. JSON 파싱 & 상태 업데이트
   ↓
5. 컴포넌트 렌더링
```

---

## 스타일링 규칙

### Tailwind CSS 사용

모든 스타일은 Tailwind CSS 유틸리티 클래스를 사용합니다.

```tsx
// ✅ 좋은 예
<div className="flex items-center gap-4 p-6 rounded-lg bg-white shadow-md">
  <h2 className="text-2xl font-bold text-gray-900">제목</h2>
</div>

// ❌ 나쁜 예: 인라인 스타일
<div style={{ display: "flex", padding: "24px" }}>
  <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>제목</h2>
</div>
```

### 클래스 병합 유틸리티

`cn()` 함수를 사용하여 조건부 클래스를 병합합니다.

```typescript
import { cn } from "@/lib/utils";

// 사용 예
<div className={cn(
  "base-class",
  isActive && "active-class",
  isPrimary ? "primary-class" : "secondary-class"
)}>
```

### 색상 시스템

Tailwind의 색상 팔레트를 사용합니다.

```typescript
// config.ts
iconColors: {
  blue: { bg: "bg-blue-100", text: "text-blue-600" },
  purple: { bg: "bg-purple-100", text: "text-purple-600" },
  green: { bg: "bg-green-100", text: "text-green-600" },
  orange: { bg: "bg-orange-100", text: "text-orange-600" },
}
```

### 반응형 디자인

모바일 우선 접근 방식을 사용합니다.

```tsx
<div className="
  grid gap-4
  grid-cols-1        /* 모바일 */
  sm:grid-cols-2     /* 태블릿 */
  lg:grid-cols-3     /* 데스크톱 */
">
```

### 커스텀 CSS 클래스

`globals.css`에 정의된 커스텀 클래스를 사용합니다.

```css
/* globals.css */
.curriculum-container {
  @apply mx-auto max-w-5xl px-4 sm:px-6 lg:px-8;
}

.curriculum-container-6xl {
  @apply mx-auto max-w-6xl px-4 sm:px-6 lg:px-8;
}

.curriculum-container-7xl {
  @apply mx-auto max-w-7xl px-4 sm:px-6 lg:px-8;
}
```

---

## 네이밍 컨벤션

### 파일명

| 타입 | 규칙 | 예시 |
|------|------|------|
| 컴포넌트 | PascalCase | `HeroSection.tsx`, `CourseInfoSection.tsx` |
| 훅 | camelCase (use 접두사) | `useAIEducationCurriculumData.ts`, `useProducts.ts` |
| 설정 | camelCase | `config.ts` |
| 유틸리티 | camelCase | `utils.ts` |
| 페이지 | kebab-case (폴더), page.tsx | `ai-education/page.tsx` |

### 변수명

```typescript
// ✅ 좋은 예: 명확하고 구체적
const aiEducationCurriculumData = ...
const isLoadingProducts = ...
const handleSubmitInquiryForm = ...

// ❌ 나쁜 예: 모호함
const data = ...
const loading = ...
const submit = ...
```

### 함수명

```typescript
// ✅ 좋은 예: 동사 + 명사
function fetchAIEducationData() { }
function handleClickScheduleButton() { }
function calculateQuoteTotal() { }

// ❌ 나쁜 예
function data() { }
function click() { }
function total() { }
```

### 컴포넌트명

```typescript
// ✅ 좋은 예: 명확한 역할 표현 (30자 이내)
export function AIEducationHeroSection() { }
export function CourseInfoCardList() { }
export function InquiryFormDialog() { }

// ❌ 나쁜 예: 너무 길거나 모호함
export function AIEducationProgramHeroSectionComponent() { } // 너무 김
export function Section() { } // 너무 모호함
```

### 타입명

```typescript
// ✅ 좋은 예: 명확한 타입 이름
export interface AIEducationCurriculumData { }
export type CourseInfoItem = { }
export type ButtonVariant = "primary" | "secondary";

// ❌ 나쁜 예
export interface Data { }
export type Item = { }
export type Type = "a" | "b";
```

---

## 주요 함수 목록

### 유틸리티 함수

#### `cn()` - 클래스 병합
```typescript
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**사용 예:**
```typescript
cn("base-class", isActive && "active-class")
// → "base-class active-class"
```

### 커스텀 훅

#### `useAIEducationCurriculumData()`
AI 교육 커리큘럼 데이터를 로드합니다.

```typescript
const { data, loading, error } = useAIEducationCurriculumData();
```

#### `useProducts()`
제품 목록을 로드합니다.

```typescript
const { products, isLoading, error } = useProducts();
```

#### `useProduct(productId)`
특정 제품을 로드합니다.

```typescript
const { product, isLoading, error } = useProduct("product-1");
```

#### `useInquiries()`
문의 목록을 로드합니다.

```typescript
const { inquiries, isLoading, error } = useInquiries();
```

#### `useSchedules()`
수업 일정을 로드합니다.

```typescript
const { schedules, isLoading, error } = useSchedules();
```

#### `useGalleryItems()`
갤러리 아이템을 로드합니다.

```typescript
const { items, isLoading, error } = useGalleryItems();
```

#### `useVideos()`
교구 사용 영상을 로드합니다.

```typescript
const { videos, isLoading, error } = useVideos();
```

#### `useQuoteCalculator()`
견적 계산을 처리합니다.

```typescript
const { total, addItem, removeItem, clear } = useQuoteCalculator();
```

---

## 개발 가이드

### 새 페이지 추가하기

1. **폴더 구조 생성**
```bash
mkdir -p app/[section]/[page]/{components,hooks}
```

2. **`config.ts` 작성**
```typescript
export const PAGE_CONFIG = {
  meta: { title: "페이지 제목", description: "설명" },
  buttons: { action: "버튼 텍스트" },
  labels: { field: "라벨" },
  links: { target: "/path" },
  gradients: { hero: "from-blue-500 to-purple-600" },
  layout: { containerClass: "curriculum-container-6xl" },
} as const;
```

3. **JSON 데이터 작성**
```bash
touch public/[section]/[page].json
```

4. **커스텀 훅 작성**
```typescript
// hooks/use[Page]Data.ts
export function use[Page]Data() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/[section]/[page].json");
      const jsonData = await response.json();
      setData(jsonData);
    };
    fetchData();
  }, []);

  return { data, loading, error };
}
```

5. **페이지 작성**
```tsx
// page.tsx
"use client";

import { use[Page]Data } from "./hooks/use[Page]Data";
import { PAGE_CONFIG } from "./config";

export default function [Page]() {
  const { data, loading, error } = use[Page]Data();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;
  if (!data) return <EmptyState />;

  return (
    <main>
      {/* 컴포넌트 렌더링 */}
    </main>
  );
}
```

### 새 컴포넌트 추가하기

1. **컴포넌트 파일 생성**
```tsx
// components/[ComponentName].tsx
interface [ComponentName]Props {
  title: string;
  description: string;
  // ... props
}

export function [ComponentName]({
  title,
  description,
}: [ComponentName]Props) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
```

2. **index.ts에 export 추가**
```typescript
// components/index.ts
export { [ComponentName] } from "./[ComponentName]";
```

### 새 커리큘럼 페이지 추가하기

커리큘럼 페이지는 공통 컴포넌트를 재사용합니다. 자세한 가이드는 `app/curriculum/components/README.md`를 참고하세요.

---

## 주의사항

### ⚠️ 하지 말아야 할 것

1. **하드코딩된 텍스트**
```tsx
// ❌ 나쁜 예
<h1>AI 교육 프로그램</h1>

// ✅ 좋은 예
<h1>{AI_EDUCATION_CONFIG.meta.title}</h1>
```

2. **중복 컴포넌트 생성**
```
❌ app/curriculum/arduino/components/HeroSection.tsx
❌ app/curriculum/app-inventor/components/HeroSection.tsx

✅ app/curriculum/components/HeroSection.tsx (공통 사용)
```

3. **인라인 스타일**
```tsx
// ❌ 나쁜 예
<div style={{ padding: "24px" }}>

// ✅ 좋은 예
<div className="p-6">
```

4. **동적 Tailwind 클래스**
```tsx
// ❌ 작동하지 않음 (빌드 시 감지 안됨)
className={`text-${color}-600`}

// ✅ 조건부 클래스 사용
className={color === "blue" ? "text-blue-600" : "text-purple-600"}
```

5. **타입 없는 데이터**
```typescript
// ❌ 나쁜 예
const data: any = ...

// ✅ 좋은 예
const data: AIEducationCurriculumData = ...
```

---

## 참고 문서

- [Next.js 공식 문서](https://nextjs.org/docs)
- [Tailwind CSS 공식 문서](https://tailwindcss.com/docs)
- [Radix UI 공식 문서](https://www.radix-ui.com/docs)
- [React Hook Form 공식 문서](https://react-hook-form.com/)
- [Zod 공식 문서](https://zod.dev/)
- [커리큘럼 컴포넌트 가이드](app/curriculum/components/README.md)

---

## 버전 정보

- **프로젝트 버전**: 0.1.0
- **Next.js**: 15.2.4
- **React**: 19
- **TypeScript**: 5
- **Tailwind CSS**: 4.1.9

---

## 작성자

AI Maker Lab 개발팀

**최종 업데이트**: 2025-10-19

