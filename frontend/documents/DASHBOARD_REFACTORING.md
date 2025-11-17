# 대시보드 페이지 리팩토링 문서

## 개요

대시보드 페이지들을 유지보수가 쉬운 구조로 리팩토링하였습니다. 비즈니스 로직과 UI 로직을 분리하고, 재사용 가능한 컴포넌트를 만들고, 설정과 데이터를 외부 파일로 관리하도록 개선했습니다.

## 리팩토링 원칙

1. **폴더 및 파일명으로 구분하여 컴포넌트 작성** - 각 페이지는 `components` 폴더를 가지고 있으며, 작은 단위의 컴포넌트로 분리
2. **비즈니스 로직과 UI 로직 분리** - `hooks` 폴더에 커스텀 훅으로 비즈니스 로직 분리
3. **map 함수 사용** - 반복되는 UI 요소는 배열과 map 함수로 처리
4. **config.ts로 label, text 관리** - 모든 텍스트는 `config.ts`에서 중앙 관리
5. **JSON 파일로 컨텐츠 관리** - 목업 데이터는 `public/dashboard/*.json` 파일로 관리

## 파일 구조

```
frontend/
├── app/
│   └── dashboard/
│       ├── config.ts                    # 대시보드 공통 설정 및 텍스트
│       ├── layout.tsx                   # 대시보드 레이아웃
│       ├── page.tsx                     # 대시보드 홈
│       ├── components/
│       │   ├── dashboard-sidebar.tsx    # 사이드바 네비게이션
│       │   ├── stat-card.tsx            # 통계 카드 컴포넌트
│       │   └── empty-state.tsx          # 빈 상태 컴포넌트
│       ├── courses/
│       │   ├── page.tsx                 # 나의 강의 페이지
│       │   └── components/
│       │       └── course-card.tsx      # 강의 카드 컴포넌트
│       ├── comments/
│       │   ├── page.tsx                 # 댓글 관리 페이지
│       │   └── components/
│       │       └── comment-card.tsx     # 댓글 카드 컴포넌트
│       ├── gallery/
│       │   ├── page.tsx                 # 갤러리 관리 페이지
│       │   └── components/
│       │       └── gallery-item-card.tsx # 갤러리 아이템 카드
│       └── profile/
│           ├── page.tsx                 # 프로필 페이지
│           └── components/
│               ├── profile-form.tsx     # 프로필 정보 폼
│               └── security-form.tsx    # 보안 설정 폼
├── hooks/
│   ├── use-auth-guard.ts                # 인증 체크 훅
│   ├── use-dashboard-data.ts            # 대시보드 데이터 훅
│   └── use-profile.ts                   # 프로필 관리 훅
└── public/
    └── dashboard/
        ├── courses-mock.json            # 강의 목록 데이터
        ├── comments-mock.json           # 댓글 목록 데이터
        ├── gallery-mock.json            # 갤러리 아이템 데이터
        └── stats-mock.json              # 통계 데이터
```

## 주요 개선 사항

### 1. 공통 설정 관리 (`config.ts`)

모든 텍스트와 설정이 한 곳에서 관리됩니다:

```typescript
// 네비게이션 메뉴 설정
export const dashboardNavItems = [...]

// 페이지별 텍스트
export const dashboardTexts = {
  layout: { title: "내 대시보드" },
  home: { title: "대시보드", ... },
  profile: { title: "프로필 설정", ... },
  courses: { title: "나의 강의", ... },
  comments: { title: "댓글 관리", ... },
  gallery: { title: "갤러리 관리", ... },
}

// 상태별 배지 색상 매핑
export const statusBadgeVariants = {
  course: { 진행중: "default", ... },
  gallery: { 공개: "default", ... },
  comment: { 작품: "default", ... },
}
```

### 2. 비즈니스 로직 분리 (Hooks)

#### `use-auth-guard.ts`
```typescript
// 인증 체크 및 리다이렉트를 담당
export function useAuthGuard() {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  // ... 로직
  return { userEmail, isLoading }
}
```

#### `use-dashboard-data.ts`
```typescript
// 각종 대이터 페칭 및 관리
export function useCourses() { /* 강의 목록 */ }
export function useComments() { /* 댓글 목록 */ }
export function useGallery() { /* 갤러리 아이템 */ }
export function useDashboardStats() { /* 통계 */ }
```

#### `use-profile.ts`
```typescript
// 프로필 및 비밀번호 변경 로직
export function useProfileUpdate(userEmail: string) { /* 프로필 업데이트 */ }
export function usePasswordChange(userEmail: string) { /* 비밀번호 변경 */ }
```

### 3. 재사용 가능한 컴포넌트

#### `EmptyState` 컴포넌트
```typescript
<EmptyState
  icon={BookOpen}
  title="수강 중인 강의가 없습니다"
  description="새로운 강의를 신청해보세요!"
  actionLabel="강의 둘러보기"
  onAction={() => router.push("/curriculum/ai-education")}
/>
```

#### `StatCard` 컴포넌트
```typescript
<StatCard
  title="수강 중인 강의"
  value={stats.coursesCount}
  icon={BookOpen}
  description="현재 진행 중인 강의 수"
  color="text-blue-600 bg-blue-50"
  onClick={() => router.push("/dashboard/courses")}
/>
```

### 4. 페이지별 컴포넌트 분리

각 페이지는 작은 단위의 컴포넌트로 구성됩니다:

- **CourseCard**: 개별 강의 정보 표시
- **CommentCard**: 댓글 표시 및 수정/삭제 기능
- **GalleryItemCard**: 갤러리 아이템 표시
- **ProfileForm**: 프로필 정보 폼
- **SecurityForm**: 비밀번호 변경 폼

### 5. JSON 데이터 분리

목업 데이터는 별도 JSON 파일로 관리:

```json
// courses-mock.json
[
  {
    "id": "1",
    "title": "AI 바이브 코딩 기초",
    "instructor": "김선생님",
    "startDate": "2024-01-15",
    "endDate": "2024-03-15",
    "status": "진행중",
    "progress": 65,
    "category": "AI 교육"
  }
]
```

## 코드 개선 예시

### Before (리팩토링 전)

```typescript
export default function MyCoursesPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const router = useRouter()

  useEffect(() => {
    const email = getCurrentUser()
    if (!email) {
      router.push("/")
      return
    }
    setUserEmail(email)

    // 인라인 목업 데이터
    const mockCourses: Course[] = [...]
    setCourses(mockCourses)
  }, [router])

  // 200줄 이상의 JSX...
}
```

### After (리팩토링 후)

```typescript
export default function MyCoursesPage() {
  const { userEmail } = useAuthGuard()                    // 인증 로직 분리
  const { courses, isLoading } = useCourses()            // 데이터 로직 분리
  const router = useRouter()

  if (!userEmail || isLoading) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {dashboardTexts.courses.title}                  // config에서 텍스트 가져오기
        </h1>
        <p className="text-gray-600">
          {dashboardTexts.courses.description}
        </p>
      </div>

      {courses.length === 0 ? (
        <EmptyState                                       // 재사용 컴포넌트
          icon={BookOpen}
          title={dashboardTexts.courses.emptyTitle}
          description={dashboardTexts.courses.emptyDescription}
          actionLabel={dashboardTexts.courses.browseButton}
          onAction={() => router.push("/curriculum/ai-education")}
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (                      // map으로 반복 처리
            <CourseCard key={course.id} course={course} /> // 작은 컴포넌트
          ))}
        </div>
      )}
    </div>
  )
}
```

## map 함수 사용 예시

### 통계 카드 렌더링

```typescript
// 설정 배열
const statCards = [
  { title: "수강 중인 강의", value: stats.coursesCount, icon: BookOpen, ... },
  { title: "작성한 댓글", value: stats.commentsCount, icon: MessageSquare, ... },
  { title: "갤러리 항목", value: stats.galleryCount, icon: Images, ... },
  { title: "학습 진행률", value: `${stats.averageProgress}%`, icon: TrendingUp, ... },
]

// map으로 렌더링
{statCards.map((stat, index) => (
  <StatCard
    key={index}
    title={stat.title}
    value={stat.value}
    icon={stat.icon}
    description={stat.description}
    color={stat.color}
    onClick={() => router.push(stat.link)}
  />
))}
```

### 네비게이션 메뉴 렌더링

```typescript
// config.ts에서 정의
export const dashboardNavItems = [
  { label: "대시보드 홈", href: "/dashboard", icon: Home },
  { label: "프로필", href: "/dashboard/profile", icon: User },
  // ...
]

// map으로 렌더링
{dashboardNavItems.map((item) => {
  const Icon = item.icon
  const isActive = pathname === item.href
  return (
    <Link key={item.href} href={item.href} className={...}>
      <Icon className="h-5 w-5" />
      <span>{item.label}</span>
    </Link>
  )
})}
```

### 필터 버튼 렌더링

```typescript
const filters = [
  { label: dashboardTexts.gallery.filters.all, value: "전체" as const },
  { label: dashboardTexts.gallery.filters.works, value: "작품" as const },
  { label: dashboardTexts.gallery.filters.reviews, value: "후기" as const },
]

{filters.map((f) => (
  <Button
    key={f.value}
    variant={filter === f.value ? "default" : "outline"}
    size="sm"
    onClick={() => setFilter(f.value)}
  >
    {f.label}
  </Button>
))}
```

## 타입 안정성

모든 데이터 타입이 명확하게 정의되어 있습니다:

```typescript
// hooks/use-dashboard-data.ts
export interface Course {
  id: string
  title: string
  instructor: string
  startDate: string
  endDate: string
  status: "진행중" | "예정" | "완료"
  progress: number
  category: string
  thumbnail?: string
}

export interface Comment { /* ... */ }
export interface GalleryItem { /* ... */ }
export interface DashboardStats { /* ... */ }
```

## 백엔드 API 연동 준비

각 hooks에는 백엔드 API 연동을 위한 TODO 주석이 있습니다:

```typescript
export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // TODO: 백엔드 API로 변경
        // const response = await fetch("/api/users/me/courses")
        const response = await fetch("/dashboard/courses-mock.json")
        const data = await response.json()
        setCourses(data)
      } catch (error) {
        console.error("강의 목록 로딩 실패:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourses()
  }, [])

  return { courses, isLoading }
}
```

## 이점

### 1. 유지보수성
- 텍스트 변경은 `config.ts`만 수정
- 컴포넌트가 작아서 이해하기 쉬움
- 비즈니스 로직이 분리되어 테스트 용이

### 2. 재사용성
- `EmptyState`, `StatCard` 등은 다른 페이지에서도 사용 가능
- 커스텀 훅은 다른 컴포넌트에서도 활용 가능

### 3. 확장성
- 새로운 페이지 추가 시 동일한 패턴 적용
- JSON 데이터 구조만 맞추면 쉽게 확장

### 4. 타입 안정성
- TypeScript로 모든 타입 정의
- 컴파일 시점에 에러 발견 가능

### 5. 성능
- 작은 컴포넌트로 분리하여 React 최적화 가능
- 필요한 부분만 리렌더링

## 마이그레이션 가이드

기존 코드를 이 패턴으로 마이그레이션하려면:

1. **텍스트 추출**: 모든 하드코딩된 텍스트를 `config.ts`로 이동
2. **데이터 분리**: 목업 데이터를 JSON 파일로 분리
3. **로직 추출**: useState, useEffect 등의 로직을 커스텀 훅으로 이동
4. **컴포넌트 분할**: 50줄 이상의 JSX는 별도 컴포넌트로 분리
5. **map 적용**: 반복되는 JSX는 배열과 map 함수로 변경

## 참고 자료

- [React 커스텀 훅 가이드](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [컴포넌트 분할 모범 사례](https://react.dev/learn/thinking-in-react)
- [TypeScript + React 타입 정의](https://react-typescript-cheatsheet.netlify.app/)

