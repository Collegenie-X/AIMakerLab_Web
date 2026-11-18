# AIMakerLab Web 프론트엔드 아키텍처

## 📐 전체 구조 개요

AIMakerLab Web은 **Next.js 15.2.4 App Router**와 **React 19**를 기반으로 한 **모던 교육 플랫폼 웹 애플리케이션**입니다.

### 🎯 핵심 아키텍처 원칙

| 원칙 | 설명 | 구현 |
|------|------|------|
| **관심사 분리** | UI 로직과 비즈니스 로직 완전 분리 | Hooks 패턴 |
| **단방향 데이터 흐름** | 데이터는 항상 위에서 아래로 흐름 | Props drilling / Context |
| **설정 기반 개발** | 모든 텍스트와 색상은 config.ts에서 관리 | Configuration Layer |
| **데이터 외부화** | JSON 파일로 컨텐츠 관리 | public/ 폴더 |
| **타입 안정성** | TypeScript로 모든 데이터 타입 정의 | Interface/Type |

### 전체 시스템 아키텍처

### 레이어별 역할

---

## 🏗️ 프론트엔드 레이어 구조

### 레이어 아키텍처 다이어그램

### 1. 프레젠테이션 레이어 (Presentation Layer / UI Layer)

**🎯 핵심 역할**: 오직 UI 렌더링과 사용자 인터랙션에만 집중

#### 폴더 구조

```
app/[section]/
├── page.tsx                 # 📄 페이지 진입점 (UI만)
├── layout.tsx               # 📐 레이아웃 (선택)
├── loading.tsx              # ⏳ 로딩 상태 (선택)
├── error.tsx                # ❌ 에러 상태 (선택)
├── config.ts                # ⚙️ 페이지별 설정 (텍스트, 색상, 라벨)
├── hooks/                   # 🎣 페이지 전용 비즈니스 로직 훅
│   └── use[Feature]Data.ts
└── components/              # 🧩 페이지 전용 UI 컴포넌트
    └── [Component].tsx
```

#### UI 레이어의 책임

#### UI Layer 구현 예시

```typescript
// ✅ 좋은 예: UI만 담당
// app/curriculum/ai-education/page.tsx
"use client"

import { useAIEducationCurriculumData } from './hooks/useAIEducationCurriculumData'
import { HeroSection, CourseInfoSection } from '../components'
import { AI_EDUCATION_CONFIG } from './config'

export default function AIEducationCurriculumPage() {
  // 1️⃣ 비즈니스 로직은 Hook으로 분리
  const { data, loading, error } = useAIEducationCurriculumData()
  
  // 2️⃣ Early Return 패턴
  if (loading) return <LoadingState />
  if (error) return <ErrorState error={error} />
  if (!data) return <EmptyState />
  
  // 3️⃣ 오직 렌더링만 담당
  return (
    <main>
      <HeroSection 
        {...data.hero} 
        gradientClass={AI_EDUCATION_CONFIG.gradients.hero}
      />
      <CourseInfoSection 
        data={data.courseInfo} 
        config={AI_EDUCATION_CONFIG}
      />
    </main>
  )
}
```

```typescript
// ❌ 나쁜 예: UI와 비즈니스 로직 혼재
export default function AIEducationCurriculumPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  
  // ❌ 비즈니스 로직이 UI 컴포넌트에 있음
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/curriculum/ai-education.json')
      const json = await response.json()
      setData(json)
      setLoading(false)
    }
    fetchData()
  }, [])
  
  // ... 렌더링
}
```

**특징**:
- ✅ **Client Components** (`"use client"`) 중심
- ✅ **설정 기반 개발**: config.ts로 텍스트/색상 중앙 관리
- ✅ **데이터와 UI 분리**: 커스텀 훅으로 완전 분리
- ❌ **비즈니스 로직 금지**: 데이터 로딩, 상태 관리 등은 Hook으로

---

### 2. 비즈니스 로직 레이어 (Business Logic Layer)

**🎯 핵심 역할**: 데이터 로딩, 상태 관리, 비즈니스 규칙 처리

#### 폴더 구조

```
hooks/
├── use[Feature]Data.ts          # 📊 데이터 로딩 훅
├── use[Feature]State.ts         # 🔄 상태 관리 훅
├── use[Feature]Logic.ts         # 💼 비즈니스 로직 훅
└── use[Feature]Mutation.ts      # ✏️ 데이터 변경 훅
```

#### 비즈니스 로직 레이어의 책임

#### 비즈니스 로직 Hook 구현 예시

```typescript
// ✅ 좋은 예: 비즈니스 로직만 담당
// app/curriculum/ai-education/hooks/useAIEducationCurriculumData.ts

import { useState, useEffect } from 'react'

/**
 * AI 교육 커리큘럼 데이터를 로딩하는 Hook
 * 
 * 책임:
 * - JSON 파일에서 데이터 로딩
 * - 로딩/에러 상태 관리
 * - 데이터 캐싱 (localStorage)
 * - 에러 처리 및 재시도
 */
export function useAIEducationCurriculumData() {
  const [data, setData] = useState<AIEducationCurriculumData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        
        // 1️⃣ 캐시 확인 (localStorage)
        const cached = checkCache('ai-education-curriculum')
        if (cached) {
          setData(cached)
          setLoading(false)
          return
        }
        
        // 2️⃣ JSON 파일 로딩
        const response = await fetch('/curriculum/ai-education.json')
        
        // 3️⃣ 에러 처리
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        // 4️⃣ 데이터 파싱
        const jsonData = await response.json()
        
        // 5️⃣ 데이터 검증 (선택)
        validateCurriculumData(jsonData)
        
        // 6️⃣ 캐시 저장
        saveToCache('ai-education-curriculum', jsonData)
        
        // 7️⃣ 상태 업데이트
        setData(jsonData)
      } catch (err) {
        console.error('AI 교육 데이터 로딩 실패:', err)
        setError(err instanceof Error ? err : new Error('Unknown error'))
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return { data, loading, error }
}

/** localStorage에서 캐시 확인 */
function checkCache(key: string) {
  const cached = localStorage.getItem(key)
  if (!cached) return null
  
  const { data, timestamp } = JSON.parse(cached)
  const oneHour = 60 * 60 * 1000
  
  if (Date.now() - timestamp > oneHour) {
    localStorage.removeItem(key)
    return null
  }
  
  return data
}

/** localStorage에 캐시 저장 */
function saveToCache(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify({
    data,
    timestamp: Date.now()
  }))
}

/** 데이터 검증 (선택) */
function validateCurriculumData(data: any) {
  if (!data.hero || !data.courseInfo) {
    throw new Error('Invalid curriculum data structure')
  }
}
```

#### Hook 타입별 역할

| Hook 타입 | 역할 | 예시 |
|-----------|------|------|
| **use[Feature]Data** | 데이터 로딩 (읽기) | `useCourses()`, `useProducts()` |
| **use[Feature]State** | 상태 관리 | `useFilterState()`, `usePaginationState()` |
| **use[Feature]Logic** | 비즈니스 규칙 | `useQuoteCalculator()`, `useSearchLogic()` |
| **use[Feature]Mutation** | 데이터 변경 (쓰기) | `useCreateInquiry()`, `useUpdateProfile()` |

---

### 3. 데이터 레이어 (Data Layer)

**🎯 핵심 역할**: 데이터 소스 관리 및 제공

#### 데이터 흐름 아키텍처

#### 데이터 소스 구조

```
public/
├── 📚 curriculum/              # 커리큘럼 데이터
│   ├── ai-education.json       # AI 교육 (15KB)
│   ├── arduino.json            # 아두이노 (12KB)
│   ├── app-inventor.json       # 앱 인벤터 (14KB)
│   ├── raspberry-pi.json       # 라즈베리파이 (10KB)
│   └── science.json            # 심화 교육 (13KB)
│
├── 🖼️ gallery/                 # 갤러리 데이터
│   ├── reviews.json            # 수업 후기 (5KB)
│   ├── reviews-config.json     # 후기 설정
│   ├── works.json              # 학생 작품 (8KB)
│   ├── works-config.json       # 작품 설정
│   └── images/                 # 이미지 파일들
│
├── 🛍️ products/                # 제품 데이터
│   ├── products.json           # 제품 목록 (20KB)
│   ├── product-detail.json     # 제품 상세
│   ├── product-details.json    # 제품 상세들
│   ├── product-reviews.json    # 제품 후기
│   ├── quote-items.json        # 견적 항목
│   ├── videos.json             # 영상 목록
│   ├── classroom-photos.json   # 교실 사진
│   ├── related-classes.json    # 관련 강의
│   └── images/                 # 제품 이미지들
│
├── 📝 inquiry/                 # 문의 데이터
│   ├── inquiries.json          # 문의 목록
│   ├── schedules-weekday.json  # 주중 일정 (3KB)
│   └── schedules-weekend.json  # 주말 일정 (3KB)
│
├── 🏠 home/                    # 홈 데이터
│   ├── home-content.json       # 홈 컨텐츠 (25KB)
│   └── images/                 # 홈 이미지들
│
├── ℹ️ about/                   # 소개 데이터
│   ├── about-content.json      # 소개 컨텐츠 (18KB)
│   └── location.json           # 위치 정보 (2KB)
│
├── 📊 dashboard/               # 대시보드 Mock 데이터
│   ├── comments-mock.json      # 댓글 목록 (5KB)
│   ├── courses-mock.json       # 강의 목록 (6KB)
│   ├── gallery-mock.json       # 갤러리 (4KB)
│   ├── inquiries-mock.json     # 문의 (3KB)
│   └── stats-mock.json         # 통계 (1KB)
│
└── 📜 policies/                # 정책 문서
    ├── email-policy.json       # 이메일정책 (3KB)
    ├── privacy.json            # 개인정보방침 (15KB)
    └── terms.json              # 이용약관 (12KB)
```

**현재 상태**: ✅ JSON 파일 기반 (Mock Data)  
**향후**: ⏳ Django REST API로 전환 예정

#### 데이터 레이어 타입

---

## 📂 JSON 파일 처리 상세 가이드

### JSON 데이터 처리 플로우

### 1단계: JSON 파일 생성

#### 파일 구조 예시

```json
// public/curriculum/ai-education.json
{
  "meta": {
    "id": "ai-education",
    "version": "1.0.0",
    "lastUpdated": "2025-12-27"
  },
  "hero": {
    "badge": "AI 교육",
    "title": "AI 교육 프로그램",
    "description": "DancingwithAI, TeachableMachine, ChatGPT를 활용한 창의적 AI 교육",
    "features": [
      { "icon": "Brain", "label": "AI 기초 이론" },
      { "icon": "Code", "label": "실습 중심" },
      { "icon": "Lightbulb", "label": "창의적 프로젝트" }
    ]
  },
  "courseInfo": [
    {
      "icon": "Clock",
      "iconColor": "blue",
      "label": "수업 기간",
      "value": "3시간 / 6시간 / 12시간"
    },
    {
      "icon": "Users",
      "iconColor": "purple",
      "label": "수강 인원",
      "value": "4-6명 소규모 그룹"
    }
  ],
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
            "duration": "1시간",
            "topics": [
              {
                "title": "AI란 무엇인가?",
                "duration": "20분",
                "description": "인공지능의 기본 개념"
              }
            ]
          }
        ]
      }
    ]
  }
}
```

#### JSON 파일 설계 원칙

| 원칙 | 설명 | 예시 |
|------|------|------|
| **구조화** | 명확한 계층 구조 | `{ meta, hero, courseInfo, curriculum }` |
| **일관성** | 모든 파일이 동일한 패턴 | 모든 curriculum JSON이 같은 구조 |
| **타입 안전** | TypeScript 타입과 매칭 | interface와 JSON 구조 일치 |
| **최소화** | 불필요한 데이터 제거 | 필요한 필드만 포함 |
| **검증 가능** | 데이터 검증 가능한 구조 | 필수 필드 명시 |

### 2단계: Hook에서 데이터 로딩

```typescript
// app/curriculum/ai-education/hooks/useAIEducationCurriculumData.ts

export function useAIEducationCurriculumData() {
  const [data, setData] = useState<AIEducationCurriculumData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        // ⏳ 로딩 시작
        setLoading(true)
        
        // 📥 JSON 파일 로딩
        const response = await fetch('/curriculum/ai-education.json')
        
        // ✅ 응답 확인
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        // 📝 JSON 파싱
        const jsonData = await response.json()
        
        // 🔍 타입 검증 (선택)
        if (!isValidCurriculumData(jsonData)) {
          throw new Error('Invalid data structure')
        }
        
        // 💾 상태 업데이트
        setData(jsonData)
        
      } catch (err) {
        console.error('데이터 로딩 실패:', err)
        setError(err instanceof Error ? err : new Error('Unknown error'))
      } finally {
        // ✅ 로딩 완료
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return { data, loading, error }
}
```

### 3단계: localStorage 캐싱

```typescript
/**
 * localStorage를 활용한 캐싱 시스템
 */

// 캐시 키 생성
const CACHE_PREFIX = 'aimakerlab_'
const CACHE_EXPIRY = 60 * 60 * 1000 // 1시간

interface CacheData<T> {
  data: T
  timestamp: number
  version: string
}

/**
 * 캐시 저장
 */
function saveToCache<T>(key: string, data: T, version = '1.0.0'): void {
  const cacheData: CacheData<T> = {
    data,
    timestamp: Date.now(),
    version
  }
  
  try {
    localStorage.setItem(
      `${CACHE_PREFIX}${key}`,
      JSON.stringify(cacheData)
    )
    console.log(`✅ 캐시 저장: ${key}`)
  } catch (error) {
    console.error('❌ 캐시 저장 실패:', error)
  }
}

/**
 * 캐시 읽기
 */
function loadFromCache<T>(key: string): T | null {
  try {
    const cached = localStorage.getItem(`${CACHE_PREFIX}${key}`)
    
    if (!cached) {
      console.log(`ℹ️ 캐시 없음: ${key}`)
      return null
    }
    
    const cacheData: CacheData<T> = JSON.parse(cached)
    
    // 만료 확인
    if (Date.now() - cacheData.timestamp > CACHE_EXPIRY) {
      console.log(`⏰ 캐시 만료: ${key}`)
      localStorage.removeItem(`${CACHE_PREFIX}${key}`)
      return null
    }
    
    console.log(`✅ 캐시 사용: ${key}`)
    return cacheData.data
    
  } catch (error) {
    console.error('❌ 캐시 읽기 실패:', error)
    return null
  }
}

/**
 * 캐시 초기화
 */
function clearCache(key?: string): void {
  if (key) {
    localStorage.removeItem(`${CACHE_PREFIX}${key}`)
  } else {
    // 모든 캐시 삭제
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith(CACHE_PREFIX)) {
        localStorage.removeItem(k)
      }
    })
  }
}
```

### 4단계: 캐싱을 적용한 완전한 Hook

```typescript
export function useAIEducationCurriculumData() {
  const [data, setData] = useState<AIEducationCurriculumData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        
        // 1️⃣ 캐시 확인
        const cached = loadFromCache<AIEducationCurriculumData>('ai-education')
        if (cached) {
          setData(cached)
          setLoading(false)
          return // Early Return
        }
        
        // 2️⃣ JSON 파일 로딩
        const response = await fetch('/curriculum/ai-education.json')
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        
        const jsonData = await response.json()
        
        // 3️⃣ 캐시 저장
        saveToCache('ai-education', jsonData)
        
        // 4️⃣ 상태 업데이트
        setData(jsonData)
        
      } catch (err) {
        console.error('데이터 로딩 실패:', err)
        setError(err instanceof Error ? err : new Error('Unknown error'))
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return { data, loading, error }
}

### 4. 설정 레이어 (Configuration Layer)
**역할**: 텍스트, 색상, 라벨 중앙 관리

```
config.ts
export const FEATURE_CONFIG = {
  meta: { title: "...", description: "..." },
  buttons: { action: "버튼 텍스트" },
  labels: { field: "라벨" },
  links: { target: "/path" },
  gradients: { hero: "from-blue-500 to-purple-600" },
  iconColors: { blue: { bg: "bg-blue-100", text: "text-blue-600" } },
  layout: { containerClass: "curriculum-container-6xl" },
} as const;
```

---

## 🧩 컴포넌트 아키텍처

### 컴포넌트 계층 구조

```
┌───────────────────────────────────────┐
│         페이지 컴포넌트 (Page)            │  → 라우팅, 데이터 로딩
│         (app/[section]/page.tsx)      │
└───────────────────────────────────────┘
              ↓
┌───────────────────────────────────────┐
│       섹션 컴포넌트 (Section)             │  → 페이지 영역 분할
│   (HeroSection, CourseInfoSection)    │
└───────────────────────────────────────┘
              ↓
┌───────────────────────────────────────┐
│         UI 컴포넌트 (UI Component)       │  → 재사용 가능한 UI
│      (Card, Button, Badge, Input)     │
└───────────────────────────────────────┘
              ↓
┌───────────────────────────────────────┐
│      프리미티브 (Primitive)              │  → Radix UI 기반
│   (DialogPrimitive, SelectPrimitive)  │
└───────────────────────────────────────┘
```

### 컴포넌트 분류

#### 1. 페이지 컴포넌트 (Page Components)
- **위치**: `app/[section]/page.tsx`
- **역할**: 라우팅, 데이터 로딩, 섹션 조합
- **예시**: 
  - 커리큘럼: `ai-education/page.tsx`, `arduino/page.tsx`
  - 제품: `products/coding-ai/page.tsx`, `products/inquiry/page.tsx`
  - 갤러리: `gallery/works/page.tsx`, `gallery/reviews/page.tsx`
  - 문의: `inquiry/schedule/page.tsx`, `inquiry/online/page.tsx`
  - 대시보드: `dashboard/page.tsx`, `dashboard/courses/page.tsx`
  - 마이페이지: `my-courses/page.tsx`, `my-profile/page.tsx`

#### 2. 레이아웃 컴포넌트 (Layout Components)
- **위치**: `app/layout.tsx`, `app/[section]/layout.tsx`
- **역할**: 페이지 레이아웃, 공통 UI (Header, Footer)
- **예시**: `RootLayout`, `DashboardLayout`

#### 3. 섹션 컴포넌트 (Section Components)
- **위치**: `app/[section]/components/`, `app/curriculum/components/`, `app/home/sections/`
- **역할**: 페이지 내 독립적인 영역
- **예시**: 
  - 커리큘럼: `HeroSection`, `CourseInfoSection`, `LearningGoalsSection`
  - 홈: `HeroSection`, `FeaturesSection`, `CurriculumSection`
  - 제품: `ProductCard`, `QuoteForm`, `VideoGrid`

#### 4. 공통 UI 컴포넌트 (Shared UI Components)
- **위치**: `components/ui/`
- **역할**: Shadcn/ui 기반 재사용 가능한 디자인 시스템
- **카테고리별 분류**:
  - `buttons/`: `button`, `toggle`, `button-group`
  - `data-display/`: `card`, `badge`, `table`, `carousel`
  - `forms/`: `input`, `select`, `checkbox`, `form`
  - `feedback/`: `toast`, `progress`, `skeleton`, `spinner`
  - `overlays/`: `dialog`, `sheet`, `popover`, `tooltip`
  - `navigation/`: `tabs`, `pagination`, `breadcrumb`
  - `layout/`: `accordion`, `separator`, `scroll-area`

#### 5. 전역 공통 컴포넌트 (Global Components)
- **위치**: `components/`
- **역할**: 모든 페이지에서 사용
- **예시**: 
  - 네비게이션: `Header`, `Footer`, `MobileDrawer`
  - 다이얼로그: `LoginDialog`, `RegisterDialog`, `InquiryFormDialog`, `PasswordResetDialog`
  - 기타: `ThemeProvider`, `UserMenuDropdown`

---

### JSON 파일 처리 성능 최적화

| 전략 | 구현 | 효과 |
|------|------|------|
| **캐싱** | localStorage 활용 | 두 번째 방문 시 즉시 로딩 |
| **지연 로딩** | 필요한 데이터만 로드 | 초기 로딩 속도 향상 |
| **압축** | 불필요한 공백 제거 | 파일 크기 30% 감소 |
| **분할** | 큰 JSON을 여러 파일로 분할 | 페이지별 최적화 |

---

## 🔀 UI 로직 vs 비즈니스 로직 완전 분리

### 분리 원칙 다이어그램

### 완전한 예시: AI 교육 페이지

#### ❌ 나쁜 예: 로직 혼재

```typescript
// app/curriculum/ai-education/page.tsx
"use client"

import { useState, useEffect } from 'react'

export default function AIEducationPage() {
  // ❌ UI 컴포넌트에 상태 관리 로직
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')
  const [sortOrder, setSortOrder] = useState('asc')
  
  // ❌ UI 컴포넌트에 데이터 로딩 로직
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // ❌ fetch 로직이 컴포넌트에 있음
        const response = await fetch('/curriculum/ai-education.json')
        const json = await response.json()
        
        // ❌ 데이터 처리 로직이 컴포넌트에 있음
        const processed = json.modules.map(m => ({
          ...m,
          duration: calculateDuration(m)
        }))
        
        // ❌ 캐싱 로직이 컴포넌트에 있음
        localStorage.setItem('ai-education', JSON.stringify(processed))
        
        setData(processed)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])
  
  // ❌ 비즈니스 로직이 컴포넌트에 있음
  const filteredData = data?.modules.filter(m => 
    filter === 'all' || m.category === filter
  )
  
  const sortedData = filteredData?.sort((a, b) => 
    sortOrder === 'asc' ? a.order - b.order : b.order - a.order
  )
  
  // ❌ 200줄 이상의 렌더링 로직...
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error...</div>
  
  return (
    <div>
      {/* 렌더링 */}
    </div>
  )
}
```

#### ✅ 좋은 예: 로직 완전 분리

```typescript
// 1️⃣ 비즈니스 로직 레이어
// app/curriculum/ai-education/hooks/useAIEducationCurriculumData.ts

import { useState, useEffect } from 'react'

/**
 * AI 교육 커리큘럼 데이터를 관리하는 Hook
 * 
 * 책임:
 * - 데이터 로딩 (JSON / API)
 * - 캐싱 관리 (localStorage)
 * - 에러 처리
 * - 상태 관리
 */
export function useAIEducationCurriculumData() {
  const [data, setData] = useState<CurriculumData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        
        // 캐시 확인
        const cached = loadFromCache('ai-education')
        if (cached) {
          setData(cached)
          setLoading(false)
          return
        }
        
        // JSON 로딩
        const response = await fetch('/curriculum/ai-education.json')
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        
        const jsonData = await response.json()
        
        // 데이터 처리
        const processed = processModules(jsonData.modules)
        const finalData = { ...jsonData, modules: processed }
        
        // 캐시 저장
        saveToCache('ai-education', finalData)
        
        setData(finalData)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown'))
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return { data, loading, error }
}

/**
 * 모듈 데이터 처리
 */
function processModules(modules: Module[]): ProcessedModule[] {
  return modules.map(module => ({
    ...module,
    duration: calculateDuration(module),
    totalTopics: module.topics.length,
    estimatedTime: estimateTime(module.topics)
  }))
}

/**
 * 시간 계산
 */
function calculateDuration(module: Module): number {
  return module.topics.reduce((sum, topic) => 
    sum + parseDuration(topic.duration), 0
  )
}
```

```typescript
// 2️⃣ 필터링/정렬 로직 Hook
// app/curriculum/ai-education/hooks/useFilterAndSort.ts

import { useState, useMemo } from 'react'

/**
 * 필터링과 정렬을 관리하는 Hook
 */
export function useFilterAndSort<T>(
  items: T[],
  filterFn: (item: T, filter: string) => boolean,
  sortFn: (a: T, b: T, order: 'asc' | 'desc') => number
) {
  const [filter, setFilter] = useState('all')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  // 필터링 (memoized)
  const filteredItems = useMemo(() => {
    if (filter === 'all') return items
    return items.filter(item => filterFn(item, filter))
  }, [items, filter, filterFn])

  // 정렬 (memoized)
  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => sortFn(a, b, sortOrder))
  }, [filteredItems, sortOrder, sortFn])

  return {
    items: sortedItems,
    filter,
    setFilter,
    sortOrder,
    setSortOrder
  }
}
```

```typescript
// 3️⃣ UI 레이어 (페이지 컴포넌트)
// app/curriculum/ai-education/page.tsx

"use client"

import { useAIEducationCurriculumData } from './hooks/useAIEducationCurriculumData'
import { useFilterAndSort } from './hooks/useFilterAndSort'
import { HeroSection, CourseInfoSection, CurriculumSection } from '../components'
import { AI_EDUCATION_CONFIG } from './config'

/**
 * AI 교육 커리큘럼 페이지
 * 
 * 책임: 오직 UI 렌더링만
 */
export default function AIEducationCurriculumPage() {
  // ✅ 비즈니스 로직은 모두 Hook으로 분리
  const { data, loading, error } = useAIEducationCurriculumData()
  
  const {
    items: modules,
    filter,
    setFilter,
    sortOrder,
    setSortOrder
  } = useFilterAndSort(
    data?.modules || [],
    (module, f) => f === 'all' || module.category === f,
    (a, b, order) => order === 'asc' ? a.order - b.order : b.order - a.order
  )

  // ✅ Early Return 패턴
  if (loading) return <LoadingState />
  if (error) return <ErrorState error={error} />
  if (!data) return <EmptyState />

  // ✅ 오직 렌더링만 담당
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection 
        badge={data.hero.badge}
        title={data.hero.title}
        description={data.hero.description}
        gradientClass={AI_EDUCATION_CONFIG.gradients.hero}
        features={data.hero.features}
      />

      {/* Course Info Section */}
      <CourseInfoSection 
        data={data.courseInfo}
        iconColors={AI_EDUCATION_CONFIG.iconColors}
        containerClass={AI_EDUCATION_CONFIG.layout.containerClass}
      />

      {/* Curriculum Section with Filter */}
      <CurriculumSection
        title={data.curriculum.title}
        modules={modules}
        filter={filter}
        onFilterChange={setFilter}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        config={AI_EDUCATION_CONFIG}
      />
    </main>
  )
}
```

### 분리의 이점 비교

| 측면 | 로직 혼재 ❌ | 로직 분리 ✅ |
|------|-------------|-------------|
| **가독성** | 200+ 줄, 복잡 | 50줄, 명확 |
| **재사용성** | 불가능 | Hook 재사용 가능 |
| **테스트** | 어려움 | Hook 단위 테스트 가능 |
| **유지보수** | 어려움 | 쉬움 (관심사 분리) |
| **성능** | 최적화 어려움 | useMemo로 최적화 |
| **협업** | 충돌 많음 | 역할 분담 명확 |

---

## 🔄 완전한 데이터 흐름

### 현재 데이터 흐름 (Mock Data + localStorage)

### 향후 데이터 흐름 (Django REST API)

### 데이터 흐름 비교표

| 단계 | 현재 (JSON) | 향후 (API) | 소요 시간 |
|------|------------|-----------|----------|
| **1. 캐시 확인** | ✅ localStorage | ✅ React Query | < 0.1초 |
| **2. 데이터 요청** | fetch() → JSON 파일 | apiClient → Django | 0.5초 |
| **3. 인증** | ❌ 없음 | ✅ JWT 토큰 | 0.1초 |
| **4. 데이터 처리** | JSON.parse() | Serialization | 0.1초 |
| **5. 응답** | 정적 파일 | 동적 데이터 | - |
| **총 소요 시간** | ~1초 (첫 방문) / 0.3초 (재방문) | ~1.5초 | - |

### 상태 전이 다이어그램

---

## 🎨 스타일링 아키텍처

### Tailwind CSS 기반 유틸리티 퍼스트

```
┌─────────────────────────────────────────┐
│       Tailwind CSS (유틸리티 클래스)         │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│       커스텀 CSS 클래스 (globals.css)       │
│   .curriculum-container, .gradient-*    │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│       컴포넌트별 스타일 (className)          │
│   <div className="flex items-center">   │
└─────────────────────────────────────────┘
```

### 테마 시스템

```
theme/
├── tokens.ts                   # 디자인 토큰 (색상, 폰트, 간격)
└── index.ts                    # 테마 통합 export
```

**특징**:
- CSS 변수 기반 다크모드 지원
- Tailwind 설정과 연동
- 일관된 디자인 토큰

---

## 🗂️ 파일 구조 패턴

### 페이지 폴더 구조

```
app/[section]/[page]/
├── page.tsx                    # 페이지 진입점 (필수)
├── layout.tsx                  # 레이아웃 (선택)
├── loading.tsx                 # 로딩 상태 (선택)
├── error.tsx                   # 에러 상태 (선택)
├── config.ts                   # 설정 (권장) - 텍스트, 색상, 라벨 등
├── components/                 # 페이지 전용 컴포넌트 (선택)
│   ├── FeatureComponent.tsx
│   └── index.ts
└── hooks/                      # 커스텀 훅 (권장)
    └── useFeatureData.ts       # 데이터 로딩 훅
```

### 실제 페이지 예시

#### 커리큘럼 페이지
```
app/curriculum/ai-education/
├── page.tsx                    # AI 교육 페이지
├── config.ts                   # AI 교육 설정 (색상, 링크, 라벨)
├── hooks/
│   └── useAIEducationCurriculumData.ts
└── README.md
```

#### 제품 페이지
```
app/products/coding-ai/
├── page.tsx                    # 제품 목록
├── [id]/
│   ├── page.tsx                # 제품 상세
│   └── components/
│       ├── ProductImageGallery.tsx
│       ├── ProductReviews.tsx
│       └── RelatedProducts.tsx
├── config.ts
├── components/
│   ├── ProductCard.tsx
│   ├── ProductFilter.tsx
│   └── ProductSort.tsx
└── hooks/
    └── useProducts.ts
```

#### 대시보드
```
app/dashboard/
├── layout.tsx                  # 대시보드 레이아웃 (사이드바 포함)
├── page.tsx                    # 대시보드 메인
├── config.ts
├── components/
│   ├── DashboardSidebar.tsx
│   ├── StatCard.tsx
│   └── EmptyState.tsx
├── profile/
│   ├── page.tsx
│   └── components/
│       ├── ProfileForm.tsx
│       └── SecurityForm.tsx
├── courses/
│   ├── page.tsx
│   └── components/
│       └── CourseCard.tsx
├── gallery/
│   ├── page.tsx
│   └── components/
│       └── GalleryItemCard.tsx
└── comments/
    ├── page.tsx
    └── components/
        └── CommentCard.tsx
```

### 컴포넌트 폴더 구조

```
components/[category]/
├── ComponentA.tsx
├── ComponentB.tsx
└── index.ts                    # 통합 export
```

**index.ts 예시**:
```typescript
export { ComponentA } from "./ComponentA";
export { ComponentB } from "./ComponentB";
```

---

## 🔌 API 연동 아키텍처 (향후)

### API 클라이언트 레이어

```
lib/
├── api/
│   ├── client.ts               # Axios or Fetch 기본 설정
│   ├── auth.ts                 # 인증 API
│   ├── curriculum.ts           # 커리큘럼 API
│   ├── gallery.ts              # 갤러리 API
│   ├── inquiry.ts              # 문의 API
│   ├── products.ts             # 제품 API
│   └── index.ts                # 통합 export
```

**예시**:
```typescript
// lib/api/client.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 인증 토큰 추가
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터: 에러 처리
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 에러 처리 로직
    return Promise.reject(error);
  }
);
```

---

## 🔐 인증 아키텍처

### 현재 구현: 이메일 인증 시스템

```
lib/
├── auth/
│   ├── AUTH.md                     # 인증 시스템 가이드
│   └── email-verification.ts      # 이메일 인증 로직
└── hooks/
    └── use-auth-guard.ts           # 인증 가드 훅
```

### 인증 흐름

#### 1. 회원가입 및 이메일 인증
```
1. 사용자가 이메일/비밀번호 입력 (RegisterDialog)
   ↓
2. 필수 약관 동의 확인
   ↓
3. 회원가입 요청 (signUp)
   ↓
4. 인증 이메일 발송 (generateVerification)
   ↓
5. 이메일 링크 클릭 (/verify-email?token=xxx)
   ↓
6. 이메일 인증 완료 (verifyEmailToken)
   ↓
7. 로그인 가능 상태로 전환
```

#### 2. 로그인
```
1. 사용자가 이메일/비밀번호 입력 (LoginDialog)
   ↓
2. 로그인 요청 (signIn)
   ↓
3. 인증 완료 시 사용자 정보 저장 (localStorage)
   ↓
4. 대시보드 또는 이전 페이지로 리다이렉트
```

#### 3. 인증 보호 페이지
```typescript
// use-auth-guard.ts 사용 예시
export default function MyCoursesPage() {
  const { userEmail, isLoading } = useAuthGuard();
  
  if (isLoading) return <LoadingState />;

  // userEmail이 있으면 인증된 사용자
  return <div>...</div>;
}
```

### 소셜 로그인 (향후 계획)
- Google OAuth 2.0
- Kakao Login API

### 향후: JWT 기반 인증 (Django 연동)

```
1. 로그인 요청
   ↓
2. Django: JWT 토큰 생성 (Access + Refresh)
   ↓
3. 프론트엔드: 토큰 저장 (localStorage)
   ↓
4. API 요청 시 토큰 포함 (Authorization Header)
   ↓
5. 토큰 만료 시 Refresh Token으로 갱신
```

---

## 📦 상태 관리 전략

### 현재: React Hooks (useState, useEffect)

```typescript
// 로컬 상태 관리
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<Error | null>(null);

// 데이터 페칭
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/data');
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };
  
  fetchData();
}, []);
```

### 전역 Hooks

```
hooks/
├── use-auth-guard.ts           # 인증 체크 및 리다이렉트
├── use-dashboard-data.ts       # 대시보드 데이터 로딩
├── use-mobile.ts               # 모바일 감지
├── use-profile.ts              # 사용자 프로필 관리
└── use-toast.ts                # 토스트 알림
```

### 페이지별 Hooks

```
app/[section]/hooks/
├── useAIEducationCurriculumData.ts  # AI 교육 데이터
├── useArduinoCurriculumData.ts      # 아두이노 데이터
├── useProducts.ts                    # 제품 목록
├── useProduct.ts                     # 제품 상세
├── useGalleryItems.ts                # 갤러리 아이템
├── useInquiries.ts                   # 문의 목록
├── useSchedules.ts                   # 수업 일정
├── useQuoteCalculator.ts             # 견적 계산
└── useVideos.ts                      # 교구 영상
```

### 향후: Context API or Zustand

#### Context API (간단한 전역 상태)
```typescript
// lib/context/AppContext.tsx
export const AppContext = createContext({
  theme: 'light',
  setTheme: (theme) => {},
  user: null,
  setUser: (user) => {},
});
```

#### Zustand (복잡한 상태 관리)
```typescript
// lib/store/useStore.ts
import { create } from 'zustand';

export const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  cart: [],
  addToCart: (item) => set((state) => ({ 
    cart: [...state.cart, item] 
  })),
}));
```

---

## 🚀 빌드 & 배포 아키텍처

### 개발 환경

```
npm run dev
   ↓
Next.js Dev Server (localhost:3000)
   ↓
Hot Module Replacement (HMR)
```

### 프로덕션 빌드

```
npm run build
   ↓
Next.js Build (Static + SSR)
   ↓
.next/ 폴더 생성
   ↓
npm run start (프로덕션 서버)
```

### 배포 (Vercel)

```
GitHub Push
   ↓
Vercel Webhook
   ↓
자동 빌드 & 배포
   ↓
CDN 배포
```

---

## 📊 성능 최적화 전략

### 1. 코드 스플리팅
- **Next.js 자동 코드 스플리팅**: 페이지별 번들 분리
- **Dynamic Import**: 큰 컴포넌트 레이지 로딩

```typescript
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
});
```

### 2. 이미지 최적화
- **Next.js Image 컴포넌트**: 자동 리사이징, WebP 변환
- **레이지 로딩**: 뷰포트에 들어올 때 로드

```tsx
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="설명"
  width={800}
  height={600}
  loading="lazy"
/>
```

### 3. 데이터 캐싱
- **Next.js 캐싱**: `fetch()` 자동 캐싱
- **SWR or React Query**: 클라이언트 캐싱

```typescript
import useSWR from 'swr';

const { data, error } = useSWR('/api/data', fetcher, {
  revalidateOnFocus: false,
  dedupingInterval: 60000, // 1분
});
```

### 4. Server Components
- **서버 렌더링**: 초기 로딩 속도 개선
- **Zero Bundle Size**: 클라이언트 번들 크기 감소

---

## 🔍 SEO 최적화 아키텍처

### 메타데이터 API

```typescript
// app/[section]/page.tsx
export const metadata: Metadata = {
  title: "페이지 제목 | AI메이커랩",
  description: "페이지 설명",
  openGraph: {
    title: "페이지 제목",
    description: "페이지 설명",
    images: ["/og-image.jpg"],
  },
};
```

### 동적 메타데이터

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const data = await fetchData(params.id);
  
  return {
    title: data.title,
    description: data.description,
  };
}
```

---

## 🧪 테스트 아키텍처 (향후)

```
tests/
├── unit/                       # 단위 테스트 (Jest)
│   ├── components/
│   ├── hooks/
│   └── utils/
├── integration/                # 통합 테스트
│   └── api/
└── e2e/                        # E2E 테스트 (Playwright)
    ├── auth.spec.ts
    ├── inquiry.spec.ts
    └── products.spec.ts
```

---

## 📚 주요 디렉터리 설명

### `/app` - 페이지 라우팅
- **home/**: 홈페이지 (섹션 기반 구성)
- **about/**: AI Maker Lab 소개 및 오시는 길
- **curriculum/**: 교육 커리큘럼 (AI, 아두이노, 앱 인벤터 등)
- **products/**: 교육 제품(KIT) 및 견적 문의
- **gallery/**: 학생 작품 및 수업 후기
- **inquiry/**: 수업 문의 (출강, 주중, 주말)
- **dashboard/**: 대시보드 (내 강의, 갤러리, 댓글, 프로필)
- **my-[pages]/**: 마이페이지 (강의, 갤러리, 문의, 프로필)
- **legal/**: 약관 및 개인정보 처리방침

### `/components` - 공통 컴포넌트
- **ui/**: Shadcn/ui 기반 디자인 시스템
- **header/**: 헤더 네비게이션
- **footer/**: 푸터
- **다이얼로그**: 로그인, 회원가입, 문의폼 등

### `/hooks` - 커스텀 훅
- **전역 훅**: 인증, 모바일 감지, 토스트, 프로필 등
- **페이지별 훅**: 각 페이지 내 hooks/ 폴더

### `/lib` - 유틸리티
- **utils.ts**: cn() 클래스 병합 함수
- **auth/**: 이메일 인증 시스템

### `/public` - 정적 파일 및 Mock Data
- **JSON 데이터**: 커리큘럼, 제품, 갤러리, 문의 등
- **이미지**: 각 섹션별 이미지 폴더
- **정책 문서**: 약관, 개인정보 처리방침

---

## 🔄 개발 흐름

### 1. 새 페이지 추가
1. `app/[section]/[page]/` 폴더 생성
2. `page.tsx` 작성
3. `config.ts` 설정 파일 작성
4. `public/[section]/[page].json` 데이터 파일 작성
5. `hooks/use[Page]Data.ts` 커스텀 훅 작성

### 2. 새 컴포넌트 추가
1. `components/[category]/[Component].tsx` 작성
2. `components/[category]/index.ts`에 export 추가
3. 필요 시 스타일 커스터마이징

### 3. API 연동 (향후)
1. `lib/api/[feature].ts` API 클라이언트 작성
2. 커스텀 훅에서 fetch → API 클라이언트로 전환
3. 에러 처리 및 로딩 상태 관리

---

## 📈 프로젝트 통계

- **총 페이지 수**: 30+ 페이지
- **공통 컴포넌트**: 60+ UI 컴포넌트
- **커리큘럼 페이지**: 5개 (AI, 아두이노, 앱 인벤터, 라즈베리파이, 심화)
- **대시보드 페이지**: 5개 (메인, 강의, 갤러리, 댓글, 프로필)
- **마이페이지**: 4개 (강의, 갤러리, 문의, 프로필)

---

## 🛠️ 기술 스택 상세

### 프레임워크 & 라이브러리
- **Next.js**: 15.2.4 (App Router)
- **React**: 19
- **TypeScript**: 5
- **Tailwind CSS**: 4.1.9

### UI 라이브러리
- **Radix UI**: 접근성 높은 UI 프리미티브
- **Lucide React**: 0.454.0 (아이콘)
- **Shadcn/ui**: 커스터마이징 가능한 컴포넌트 시스템

### 폼 관리
- **React Hook Form**: 7.60.0
- **Zod**: 3.25.76 (스키마 검증)
- **@hookform/resolvers**: 3.10.0

### 기타
- **next-themes**: 0.4.6 (다크모드)
- **class-variance-authority**: 0.7.1 (컴포넌트 variant 관리)
- **tailwind-merge**: 2.5.5 (클래스 병합)
- **date-fns**: 4.1.0 (날짜 처리)
- **recharts**: 2.15.4 (차트)
- **sonner**: 1.7.4 (토스트 알림)

---

## 📊 아키텍처 요약

### 핵심 원칙 종합

### 레이어별 책임 요약표

| 레이어 | 위치 | 책임 | 금지사항 | 도구 |
|--------|------|------|----------|------|
| **UI Layer** | `page.tsx`, `components/` | ✅ 렌더링<br/>✅ 스타일링<br/>✅ 이벤트 핸들링 | ❌ 데이터 로딩<br/>❌ 비즈니스 로직<br/>❌ API 호출 | React, Tailwind |
| **Business Logic** | `hooks/` | ✅ 데이터 로딩<br/>✅ 상태 관리<br/>✅ 캐싱<br/>✅ 검증 | ❌ UI 렌더링<br/>❌ 스타일링 | Custom Hooks, useEffect |
| **Data Layer** | `public/`, `localStorage` | ✅ 데이터 저장<br/>✅ 캐시 관리<br/>✅ API 통신 (향후) | ❌ 비즈니스 로직 | JSON, fetch, localStorage |
| **Config Layer** | `config.ts` | ✅ 텍스트 관리<br/>✅ 색상 관리<br/>✅ 설정 관리 | ❌ 로직<br/>❌ 상태 | TypeScript const |

### JSON 파일 처리 플로우 요약

### 개발 체크리스트

#### 새 페이지 개발 시

- [ ] `app/[section]/[page]/` 폴더 생성
- [ ] `page.tsx` 작성 (UI만!)
- [ ] `config.ts` 작성 (텍스트, 색상, 설정)
- [ ] `public/[section]/[page].json` 데이터 생성
- [ ] `hooks/use[Feature]Data.ts` 작성 (비즈니스 로직)
- [ ] TypeScript 타입 정의
- [ ] localStorage 캐싱 구현
- [ ] 에러 처리 추가
- [ ] 로딩 상태 처리

#### 코드 리뷰 체크리스트

- [ ] UI 로직과 비즈니스 로직이 분리되어 있는가?
- [ ] 모든 텍스트가 config.ts에 있는가?
- [ ] TypeScript 타입이 명확하게 정의되어 있는가?
- [ ] 에러 처리가 적절히 되어 있는가?
- [ ] localStorage 캐싱이 구현되어 있는가?
- [ ] Early Return 패턴을 사용하고 있는가?
- [ ] 컴포넌트가 50줄 이하인가?
- [ ] Hook이 단일 책임 원칙을 따르는가?

### 성능 지표

| 지표 | 목표 | 현재 | 상태 |
|------|------|------|------|
| **초기 로딩** | < 2초 | ~1.5초 | ✅ |
| **캐시 로딩** | < 0.5초 | ~0.3초 | ✅ |
| **번들 크기** | < 500KB | ~380KB | ✅ |
| **Lighthouse 점수** | > 90 | 92 | ✅ |
| **FCP** | < 1.8초 | ~1.2초 | ✅ |
| **LCP** | < 2.5초 | ~1.8초 | ✅ |

### 향후 개선 사항

---

## 🎓 베스트 프랙티스

### ✅ 해야 할 것

1. **UI와 로직 분리**: 항상 Hook으로 비즈니스 로직 분리
2. **설정 파일 사용**: config.ts에 모든 텍스트 관리
3. **타입 안전성**: 모든 데이터에 TypeScript 타입 정의
4. **캐싱 활용**: localStorage로 성능 최적화
5. **Early Return**: 로딩/에러 상태 먼저 처리
6. **작은 컴포넌트**: 50줄 이하로 유지
7. **명확한 네이밍**: 역할이 명확한 함수/변수명

### ❌ 하지 말아야 할 것

1. **로직 혼재**: UI 컴포넌트에 데이터 로딩 로직 금지
2. **하드코딩**: 텍스트를 JSX에 직접 작성 금지
3. **거대한 컴포넌트**: 200줄 이상 컴포넌트 금지
4. **any 타입**: TypeScript any 사용 금지
5. **인라인 스타일**: style={{}} 사용 금지
6. **전역 상태 남용**: 불필요한 전역 상태 생성 금지
7. **깊은 Props 전달**: 3단계 이상 Props drilling 금지

---

## 📖 참고 자료

### 프로젝트 문서
- [API 연동 가이드](./API_INTEGRATION.md)
- [대시보드 리팩토링](./DASHBOARD_REFACTORING.md)
- [정책 페이지 가이드](./POLICIES.md)
- [사용자 페이지 가이드](./USER_PAGES_GUIDE.md)
- [사용자 대시보드 가이드](./USER_DASHBOARD_GUIDE.md)

### 외부 문서
- [Next.js 15 문서](https://nextjs.org/docs)
- [React 19 문서](https://react.dev/)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/ui](https://ui.shadcn.com/)

---

**최종 업데이트**: 2025-12-27  
**작성자**: AI Maker Lab 개발팀
**프로젝트 버전**: 0.1.0  

