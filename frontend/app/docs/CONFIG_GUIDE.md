# 📝 Config.ts 가이드

## 개요

`config.ts` 파일에서 **모든 라벨, 텍스트, 스타일, 순서**를 중앙 관리합니다.  
하드코딩된 값을 없애고 유지보수성을 극대화했습니다!

---

## 🎯 주요 설정 항목

### 1️⃣ **PAGE_CONFIG** - 페이지 기본 정보

```typescript
export const PAGE_CONFIG = {
  title: 'AI 교육 가이드',          // 페이지 제목
  description: '...',                // 메인 설명
  subtitle: '...',                   // 서브 설명
};
```

**사용처**: `PageHeader` 컴포넌트

---

### 2️⃣ **CATEGORY_ORDER** - 카테고리 순서

```typescript
export const CATEGORY_ORDER = [
  'Terminology',   // 교육 용어
  'Methodology',   // 교육 방법론
  'Guide',         // 수업 진행 가이드
  'Curriculum',    // 커리큘럼
] as const;
```

**사용처**: `DocumentsList` 컴포넌트  
**효과**: 이 순서대로 카테고리가 표시됩니다

---

### 3️⃣ **MESSAGES** - 메시지 텍스트

```typescript
export const MESSAGES = {
  loading: {
    text: '문서를 불러오는 중...',
  },
  error: {
    title: '문서를 불러올 수 없습니다',
    description: '...',
  },
  empty: {
    title: '교육 자료를 준비 중입니다',
    description: '...',
  },
  stats: {
    documents: '개 교육 자료',
    categories: '개 카테고리',
    total: '총',
  },
};
```

**사용처**: 
- `LoadingState` - 로딩 메시지
- `ErrorState` - 에러 메시지
- `EmptyState` - 빈 상태 메시지
- `StatsDisplay` - 통계 라벨

---

### 4️⃣ **BUTTON_LABELS** - 버튼 라벨

```typescript
export const BUTTON_LABELS = {
  download: '📥 다운로드',
  backToList: '목록으로',
  backToGuide: '교육 가이드 목록으로',
};
```

**사용처**:
- `DocHeader` - 뒤로가기 버튼
- `DocFooter` - 목록으로 버튼
- `CategorySection` - 다운로드 버튼

---

### 5️⃣ **BREADCRUMB_LABELS** - Breadcrumb 라벨

```typescript
export const BREADCRUMB_LABELS = {
  home: '홈',
  docs: '교육 가이드',
};
```

**사용처**: `DocHeader` - Breadcrumb 네비게이션

---

### 6️⃣ **ICONS** - 아이콘 설정

```typescript
export const ICONS = {
  page: 'BookOpen',
  stats: {
    documents: 'FileText',
    categories: 'BookOpen',
  },
  loading: 'Loader2',
  empty: 'BookOpen',
  date: 'Calendar',
  lines: 'FileText',
};
```

**사용처**: 모든 컴포넌트  
**주의**: Lucide React 아이콘 이름을 문자열로 지정

---

### 7️⃣ **STYLES** - 스타일 설정

```typescript
export const STYLES = {
  pageBackground: 'bg-gradient-to-b from-purple-50 via-white to-gray-50',
  cardHover: 'hover:shadow-xl transition-all duration-300',
  badge: {
    primary: 'bg-purple-100 text-purple-800 border-purple-300',
  },
  button: {
    primary: 'border-2 border-purple-400 text-purple-600 hover:bg-purple-50',
  },
};
```

**사용처**:
- `DocsPageClient` - 페이지 배경
- `DocHeader`, `DocFooter` - 버튼 스타일

---

### 8️⃣ **LAYOUT** - 레이아웃 설정

```typescript
export const LAYOUT = {
  container: 'container mx-auto px-4',
  maxWidth: {
    content: 'max-w-5xl',
    text: 'max-w-4xl',
  },
  padding: {
    section: 'py-16',
    card: 'p-8 md:p-12',
  },
};
```

**사용처**: `DocsPageClient` - 레이아웃

---

### 9️⃣ **FORMAT** - 포맷 설정

```typescript
export const FORMAT = {
  date: {
    locale: 'ko-KR',
    options: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
  },
};
```

**사용처**: `DocHeader`, `CategorySection` - 날짜 포맷

---

### 🔟 **ROUTES** - URL 경로

```typescript
export const ROUTES = {
  home: '/',
  docs: '/docs',
  docDetail: (slug: string) => `/docs/${slug}`,
  docDownload: (filename: string) => `/docs/${filename}`,
};
```

**사용처**: 모든 Link 컴포넌트

---

### 1️⃣1️⃣ **FEATURES** - 기능 설정

```typescript
export const FEATURES = {
  searchEnabled: false,      // 검색 활성화
  filterEnabled: false,      // 필터 활성화
  maxVisibleTags: 3,         // 태그 최대 표시 개수
  descriptionLines: 3,       // Description 최대 줄 수
};
```

**사용처**: 향후 기능 추가 시 사용

---

## 🚀 사용 예시

### 컴포넌트에서 config 사용하기

```typescript
import { DOCS_CONFIG } from '../config';

export function MyComponent() {
  return (
    <div>
      <h1>{DOCS_CONFIG.page.title}</h1>
      <p>{DOCS_CONFIG.page.description}</p>
      <button>{DOCS_CONFIG.buttons.download}</button>
    </div>
  );
}
```

---

## ✏️ 수정 방법

### 1. 페이지 제목 변경

```typescript
// config.ts
export const PAGE_CONFIG = {
  title: 'AI 교육 리소스',  // ← 여기만 수정!
  // ...
};
```

→ 모든 페이지에 자동 반영됩니다!

### 2. 카테고리 순서 변경

```typescript
// config.ts
export const CATEGORY_ORDER = [
  'Guide',         // ← 순서 변경
  'Curriculum',
  'Terminology',
  'Methodology',
] as const;
```

→ 페이지에서 이 순서대로 표시됩니다!

### 3. 버튼 라벨 변경

```typescript
// config.ts
export const BUTTON_LABELS = {
  download: '⬇️ 파일 받기',  // ← 변경
  backToList: '← 리스트',     // ← 변경
};
```

→ 모든 버튼에 자동 적용됩니다!

### 4. 아이콘 변경

```typescript
// config.ts
export const ICONS = {
  page: 'FileText',  // ← BookOpen → FileText
  // ...
};
```

→ Lucide React 아이콘 이름을 사용하세요!

---

## 📊 Before vs After

### Before (하드코딩)
```typescript
// DocsPageClient.tsx
<PageHeader
  title="AI 교육 가이드"                              // ❌ 하드코딩
  description="AI Maker Lab의 교육 철학과 방법론..."   // ❌ 하드코딩
/>

<Button>목록으로</Button>                              // ❌ 하드코딩

const categoryOrder = ['Terminology', 'Methodology', ...];  // ❌ 하드코딩
```

**문제점**:
- 텍스트 수정 시 여러 파일 수정 필요
- 일관성 유지 어려움
- 오타 발생 가능성 ⬆️

### After (config 사용)
```typescript
// DocsPageClient.tsx
import { DOCS_CONFIG } from './config';

<PageHeader
  title={DOCS_CONFIG.page.title}                    // ✅ config
  description={DOCS_CONFIG.page.description}        // ✅ config
/>

<Button>{DOCS_CONFIG.buttons.backToList}</Button>  // ✅ config

const categoryOrder = DOCS_CONFIG.categories;       // ✅ config
```

**장점**:
- config.ts 한 곳만 수정하면 끝!
- 일관성 100% 보장
- 타입 안전성 확보
- 찾기/수정 쉬움

---

## 🎨 전체 구조

```
config.ts (중앙 관리)
    ↓
    ├─→ DocsPageClient.tsx (페이지 제목, 레이아웃)
    ├─→ PageHeader.tsx (제목, 설명)
    ├─→ StatsDisplay.tsx (통계 라벨)
    ├─→ LoadingState.tsx (로딩 메시지)
    ├─→ ErrorState.tsx (에러 메시지)
    ├─→ EmptyState.tsx (빈 상태 메시지)
    ├─→ DocHeader.tsx (Breadcrumb, 버튼 라벨)
    └─→ DocFooter.tsx (네비게이션 버튼)
```

---

## 💡 팁

### 1. 다국어 지원 준비
```typescript
// config.ts
export const MESSAGES_KO = { ... };
export const MESSAGES_EN = { ... };

export const MESSAGES = MESSAGES_KO;  // 기본 언어
```

### 2. 테마별 스타일 관리
```typescript
// config.ts
const PURPLE_THEME = {
  primary: 'purple-600',
  bg: 'purple-50',
};

const BLUE_THEME = {
  primary: 'blue-600',
  bg: 'blue-50',
};

export const THEME = PURPLE_THEME;  // 테마 선택
```

### 3. 환경별 설정
```typescript
// config.ts
const isDev = process.env.NODE_ENV === 'development';

export const FEATURES = {
  searchEnabled: isDev ? true : false,  // 개발 환경에서만 활성화
};
```

---

## 🔍 트러블슈팅

### Q: config 수정했는데 반영 안 됨
A: 서버 재시작 필요
```bash
npm run dev
```

### Q: 아이콘이 안 보임
A: Lucide React 아이콘 이름 확인  
https://lucide.dev/icons/

### Q: TypeScript 타입 에러
A: `as const` 추가
```typescript
export const CATEGORY_ORDER = [...] as const;
```

---

## 📚 참고

- **config.ts 위치**: `/frontend/app/docs/config.ts`
- **사용 컴포넌트**: `/frontend/app/docs/components/`
- **메인 가이드**: `README.md`

---

**이제 모든 텍스트와 설정을 config.ts에서 관리하세요!** 🎉
