# 📚 Docs 폴더 구조 및 설명

교육 가이드 페이지의 코드를 **섹션별 컴포넌트**로 분리하여 유지보수성을 향상시켰습니다.

## 📁 폴더 구조

```
app/docs/
├── components/                    # 문서 목록 페이지 컴포넌트
│   ├── PageHeader.tsx            # 📄 헤더 섹션 (제목, 설명)
│   ├── StatsDisplay.tsx          # 📊 통계 섹션 (문서 개수, 카테고리)
│   ├── DocumentsList.tsx         # 📚 문서 목록 섹션
│   ├── LoadingState.tsx          # ⏳ 로딩 상태
│   ├── ErrorState.tsx            # ❌ 에러 상태
│   ├── EmptyState.tsx            # 📭 빈 상태
│   └── index.ts                  # Export 관리
│
├── [slug]/                        # 문서 상세 페이지
│   ├── components/               # 문서 상세 페이지 컴포넌트
│   │   ├── DocHeader.tsx        # 📄 문서 헤더 (breadcrumb, 제목, 다운로드)
│   │   ├── DocContent.tsx       # 📝 문서 본문 (마크다운 렌더링)
│   │   ├── DocFooter.tsx        # 🔽 문서 하단 네비게이션
│   │   └── index.ts             # Export 관리
│   │
│   ├── utils.ts                 # 🛠️ 유틸 함수 (문서 로드, 경로 생성)
│   ├── MarkdownRenderer.tsx     # 📖 마크다운 렌더러
│   └── page.tsx                 # ⚡ 메인 페이지 (40줄)
│
├── DocsPageClient.tsx            # ⚡ 메인 클라이언트 컴포넌트 (50줄)
├── page.tsx                      # 🏠 서버 컴포넌트 (데이터 로드)
└── README.md                     # 📖 이 파일

```

---

## 🎯 각 컴포넌트 설명

### 1️⃣ 문서 목록 페이지 (`/docs`)

#### `components/PageHeader.tsx`
**역할**: 페이지 상단 헤더
- 아이콘 + 제목 표시
- 메인 설명 문구
- 서브 설명 문구

**Props**:
```typescript
interface PageHeaderProps {
  title: string;          // 메인 제목
  description: string;    // 메인 설명
  subtitle?: string;      // 서브 설명 (선택)
}
```

#### `components/StatsDisplay.tsx`
**역할**: 통계 정보 표시
- 총 문서 개수
- 카테고리 개수
- 귀여운 배지 스타일

**Props**:
```typescript
interface StatsDisplayProps {
  documentCount: number;  // 문서 개수
  categoryCount: number;  // 카테고리 개수
}
```

#### `components/DocumentsList.tsx`
**역할**: 카테고리별 문서 목록
- 카테고리 순서대로 표시
- `CategorySection` 컴포넌트 사용
- 빈 카테고리 자동 필터링

**Props**:
```typescript
interface DocumentsListProps {
  categories: Record<string, DocInfo[]>;  // 카테고리별 문서
  categoryOrder: string[];                // 카테고리 순서
  config: any;                            // 설정 정보
}
```

#### `components/LoadingState.tsx`
**역할**: 로딩 상태 UI
- 스피너 애니메이션
- Header + Footer 포함

#### `components/ErrorState.tsx`
**역할**: 에러 상태 UI
- 에러 메시지 표시
- Header + Footer 포함

**Props**:
```typescript
interface ErrorStateProps {
  message?: string;  // 커스텀 에러 메시지 (선택)
}
```

#### `components/EmptyState.tsx`
**역할**: 빈 상태 UI
- 문서가 없을 때 표시
- 친근한 안내 메시지

---

### 2️⃣ 문서 상세 페이지 (`/docs/[slug]`)

#### `[slug]/components/DocHeader.tsx`
**역할**: 문서 헤더
- Breadcrumb 네비게이션
- 카테고리 배지
- 문서 제목
- 수정일
- 다운로드 버튼

**Props**:
```typescript
interface DocHeaderProps {
  category: string;       // 카테고리
  title: string;          // 제목
  updatedAt: Date;        // 수정일
  filename: string;       // 파일명
  source: string;         // 파일 소스 (documents | public)
}
```

#### `[slug]/components/DocContent.tsx`
**역할**: 문서 본문
- 마크다운 렌더링
- 깔끔한 카드 스타일

**Props**:
```typescript
interface DocContentProps {
  content: string;  // 마크다운 콘텐츠
}
```

#### `[slug]/components/DocFooter.tsx`
**역할**: 하단 네비게이션
- 목록으로 돌아가기 버튼

#### `[slug]/utils.ts`
**역할**: 유틸리티 함수
- `docMetadata`: 문서 메타데이터 맵
- `generateStaticParams()`: 정적 경로 생성
- `getDocument(slug)`: 문서 가져오기

**주요 함수**:
```typescript
// 문서 가져오기
function getDocument(slug: string): Document | null

// 정적 경로 생성
async function generateStaticParams(): Promise<{ slug: string }[]>
```

---

## 🚀 사용 방법

### 새 컴포넌트 추가
```typescript
// 1. 컴포넌트 생성
// components/NewSection.tsx
export function NewSection({ data }: NewSectionProps) {
  return <div>{data}</div>;
}

// 2. index.ts에 export 추가
export { NewSection } from './NewSection';

// 3. 메인 컴포넌트에서 사용
import { NewSection } from './components';
```

### 문서 메타데이터 추가
```typescript
// [slug]/utils.ts
export const docMetadata: Record<string, DocMetadata> = {
  'new-doc-slug': { 
    category: 'Guide', 
    title: '새 문서 제목' 
  },
};
```

---

## ✨ 장점

### 1. **유지보수성 ⬆️**
- 각 섹션이 독립적인 파일
- 버그 수정 시 해당 파일만 수정
- 코드 찾기 쉬움

### 2. **재사용성 ⬆️**
- 컴포넌트를 다른 페이지에서도 사용 가능
- 일관된 UI/UX

### 3. **테스트 용이**
- 각 컴포넌트를 개별 테스트 가능
- 작은 단위로 테스트

### 4. **코드 가독성 ⬆️**
- 파일 크기 축소 (125줄 → 50줄, 266줄 → 40줄)
- 명확한 책임 분리
- Props 타입 명시

### 5. **협업 친화적**
- 여러 개발자가 동시 작업 가능
- 충돌 최소화

---

## 📊 Before vs After

### 문서 목록 페이지
```
Before: DocsPageClient.tsx (125줄)
After:  DocsPageClient.tsx (50줄)
        + components/ (6개 파일, 각 20~30줄)
```

### 문서 상세 페이지
```
Before: [slug]/page.tsx (266줄)
After:  [slug]/page.tsx (40줄)
        + components/ (3개 파일, 각 20~40줄)
        + utils.ts (150줄)
```

---

## 🎨 컴포넌트 트리

```
DocsPageClient
├── LoadingState (로딩 중)
├── ErrorState (에러 발생)
└── 정상 렌더링
    ├── Header
    ├── PageHeader
    ├── StatsDisplay
    ├── DocumentsList
    │   └── CategorySection (반복)
    ├── EmptyState (문서 없음)
    └── Footer

DocPage ([slug])
├── Header
├── DocHeader
│   ├── Breadcrumb
│   └── 다운로드 버튼
├── DocContent
│   └── MarkdownRenderer
├── DocFooter
└── Footer
```

---

## 🔧 트러블슈팅

### Q: 컴포넌트가 렌더링 안 됨
A: `components/index.ts`에 export 추가했는지 확인

### Q: Props 타입 에러
A: 인터페이스 정의 확인 및 필수 props 전달 여부 확인

### Q: 문서가 404 에러
A: `utils.ts`의 `docMetadata`에 slug 추가했는지 확인

---

## 📚 참고 자료

- React 컴포넌트 설계: https://react.dev/learn/thinking-in-react
- TypeScript Props: https://www.typescriptlang.org/docs/handbook/react.html
- Next.js 서버/클라이언트 컴포넌트: https://nextjs.org/docs/app/building-your-application/rendering

---

**문의**: 각 컴포넌트 파일에 상세 주석 포함되어 있습니다! 🚀
