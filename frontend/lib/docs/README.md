# 📚 문서 시스템 구조

문서 시스템의 UI 로직과 비즈니스 로직을 분리한 구조입니다.

## 📂 폴더 구조

```
lib/docs/                     # 비즈니스 로직
├── types.ts                  # TypeScript 타입 정의
├── api.ts                    # API 함수들 (데이터 가져오기)
├── hooks.ts                  # React Query 훅들
└── README.md                 # 이 문서

components/docs/              # UI 컴포넌트
└── CategorySection.tsx       # 카테고리 섹션 컴포넌트

app/docs/                     # 페이지
├── page.tsx                  # 서버 컴포넌트 (초기 데이터 로드)
├── DocsPageClient.tsx        # 클라이언트 컴포넌트 (UI)
└── [slug]/page.tsx           # 문서 상세 페이지

app/api/docs/                 # API 라우트
└── route.ts                  # GET /api/docs

public/docs/                  # 정적 파일
└── docs-config.json          # 문서 메타데이터 설정
```

---

## 🎯 설계 원칙

### 1️⃣ UI 로직과 비즈니스 로직 분리

**비즈니스 로직** (`lib/docs/`)
- 데이터 가져오기
- 상태 관리
- API 호출

**UI 로직** (`components/`, `app/`)
- 레이아웃
- 스타일링
- 사용자 인터랙션

### 2️⃣ React Query로 캐시 관리

```typescript
// 10분간 캐시 유지
staleTime: 10 * 60 * 1000
gcTime: 10 * 60 * 1000
```

### 3️⃣ JSON 파일로 설정 관리

`public/docs/docs-config.json`에서 모든 메타데이터 관리:
- 카테고리 정보
- 문서 메타데이터
- 아이콘, 색상, 태그 등

---

## 📝 주요 파일 설명

### `types.ts` - 타입 정의
```typescript
export interface DocInfo {
  filename: string;
  slug: string;
  source: 'documents' | 'public';
  title: string;
  description: string;
  category: DocCategory;
  // ...
}
```

### `api.ts` - API 함수
```typescript
// 서버: 파일 시스템에서 문서 읽기
export function getDocumentsServer(config: DocsConfig): DocInfo[]

// 클라이언트: API 엔드포인트 호출
export async function fetchDocuments(): Promise<DocInfo[]>

// 설정 가져오기
export async function fetchDocsConfig(): Promise<DocsConfig>
```

### `hooks.ts` - React Query 훅
```typescript
// 문서 설정 (10분 캐시)
export function useDocsConfig()

// 문서 목록 (10분 캐시)
export function useDocuments()

// 카테고리별 그룹화
export function useDocumentsByCategory()
```

---

## 🔄 데이터 흐름

### 서버 사이드 (초기 로드)
```
1. app/docs/page.tsx (서버 컴포넌트)
   ↓
2. fetchDocsConfig() → docs-config.json 읽기
   ↓
3. getDocumentsServer() → 파일 시스템에서 문서 읽기
   ↓
4. DocsPageClient로 초기 데이터 전달
```

### 클라이언트 사이드 (캐시 갱신)
```
1. DocsPageClient (클라이언트 컴포넌트)
   ↓
2. useDocsConfig() → React Query 캐시 확인
   ↓
3. 캐시 miss 시 fetchDocsConfig() 호출
   ↓
4. 10분간 캐시 유지
```

---

## 🚀 사용 방법

### 1. 새 문서 추가

1. `public/docs/` 또는 `documents/`에 `.md` 파일 추가
2. `public/docs/docs-config.json`에 메타데이터 추가:

```json
{
  "metadata": {
    "new_document.md": {
      "title": "새 문서",
      "description": "설명",
      "category": "Education",
      "icon": "BookOpen",
      "color": "green",
      "tags": ["태그1", "태그2"]
    }
  }
}
```

### 2. 카테고리 추가

`docs-config.json`의 `categories`에 추가:

```json
{
  "categories": {
    "NewCategory": {
      "id": "NewCategory",
      "label": "새 카테고리",
      "description": "설명",
      "icon": "IconName",
      "color": "purple-600",
      "bgColor": "bg-purple-100",
      "textColor": "text-purple-800",
      "borderColor": "border-purple-300"
    }
  }
}
```

### 3. 캐시 무효화

```typescript
import { useQueryClient } from '@tanstack/react-query';

const queryClient = useQueryClient();

// 문서 목록 캐시 무효화
queryClient.invalidateQueries({ queryKey: ['docs', 'list'] });

// 설정 캐시 무효화
queryClient.invalidateQueries({ queryKey: ['docs', 'config'] });
```

---

## 🎨 UI 커스터마이징

### CategorySection 컴포넌트

`components/docs/CategorySection.tsx`에서 카테고리 섹션 UI 수정:
- 카드 레이아웃
- 호버 효과
- 태그 표시
- 메타 정보

### DocsPageClient 컴포넌트

`app/docs/DocsPageClient.tsx`에서 페이지 전체 UI 수정:
- 헤더
- 카테고리 순서
- 빈 상태 표시

---

## 🔧 백엔드 연동

### API 엔드포인트

`app/api/docs/route.ts`를 수정하여 실제 백엔드 API 연동:

```typescript
export async function GET() {
  // Django API 호출
  const response = await fetch('https://api.example.com/docs');
  const data = await response.json();
  
  return NextResponse.json(data);
}
```

### 환경 변수

`.env.local`:
```
NEXT_PUBLIC_API_URL=https://api.example.com
```

---

## ✅ 체크리스트

- [x] UI/비즈니스 로직 분리
- [x] React Query 10분 캐시
- [x] JSON 파일로 설정 관리
- [x] 타입 안전성 (TypeScript)
- [x] 섹션별 구분 (카테고리)
- [x] 반응형 디자인
- [ ] 백엔드 API 연동 (TODO)

---

## 📚 참고

- [React Query 문서](https://tanstack.com/query/latest)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Server & Client Components](https://nextjs.org/docs/app/building-your-application/rendering)

