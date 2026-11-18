# 📚 문서 시스템 리팩토링 가이드

## ✅ 완료된 작업

### 1. **UI/비즈니스 로직 분리**

```
Before (모두 혼재):
app/docs/page.tsx (300+ lines)
  - UI 렌더링
  - 데이터 가져오기
  - 상태 관리
  - 타입 정의
  - 스타일링

After (분리됨):
lib/docs/          → 비즈니스 로직
components/docs/   → UI 컴포넌트
app/docs/          → 페이지 조합
```

### 2. **React Query 캐시 (10분)**

```typescript
// lib/docs/hooks.ts
export function useDocsConfig() {
  return useQuery<DocsConfig>({
    queryKey: ['docs', 'config'],
    queryFn: fetchDocsConfig,
    staleTime: 10 * 60 * 1000, // 10분
    gcTime: 10 * 60 * 1000,
  });
}
```

### 3. **JSON 파일로 설정 관리**

```json
// public/docs/docs-config.json
{
  "categories": {...},
  "metadata": {...}
}
```

### 4. **섹션별 구분 UI**

각 카테고리마다:
- 헤더 (아이콘, 제목, 설명)
- 문서 카드 그리드
- 태그, 메타 정보

---

## 🚀 설치 필요 패키지

```bash
cd frontend
npm install @tanstack/react-query
```

---

## 📂 생성된 파일

### 비즈니스 로직
```
lib/docs/
├── types.ts           # 타입 정의
├── api.ts             # API 함수들
├── hooks.ts           # React Query 훅들
└── README.md          # 상세 문서
```

### UI 컴포넌트
```
components/docs/
└── CategorySection.tsx  # 카테고리 섹션
```

### 페이지
```
app/docs/
├── page.tsx             # 서버 컴포넌트
├── DocsPageClient.tsx   # 클라이언트 컴포넌트
└── [slug]/page.tsx      # 상세 페이지 (기존)
```

### API 라우트
```
app/api/docs/
└── route.ts             # GET /api/docs
```

### 설정
```
public/docs/
└── docs-config.json     # 메타데이터 설정
```

---

## 🔧 설정 방법

### 1. React Query Provider 추가

`app/layout.tsx`에서:

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="ko">
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
```

### 2. 새 문서 추가

1. `.md` 파일을 `public/docs/` 또는 `documents/`에 추가
2. `public/docs/docs-config.json`에 메타데이터 추가:

```json
{
  "metadata": {
    "new_document.md": {
      "title": "새 문서 제목",
      "description": "문서 설명",
      "category": "Education",
      "icon": "BookOpen",
      "color": "green",
      "tags": ["태그1", "태그2"]
    }
  }
}
```

### 3. 새 카테고리 추가

`docs-config.json`의 `categories`에 추가:

```json
{
  "categories": {
    "NewCategory": {
      "id": "NewCategory",
      "label": "새 카테고리",
      "description": "카테고리 설명",
      "icon": "Rocket",
      "color": "purple-600",
      "bgColor": "bg-purple-100",
      "textColor": "text-purple-800",
      "borderColor": "border-purple-300"
    }
  }
}
```

---

## 📊 데이터 흐름

### 초기 로드 (서버 사이드)
```
1. GET /docs
   ↓
2. app/docs/page.tsx (서버)
   - fetchDocsConfig()
   - getDocumentsServer()
   ↓
3. DocsPageClient (props)
   - initialDocuments
```

### 캐시 갱신 (클라이언트)
```
1. DocsPageClient 마운트
   ↓
2. useDocsConfig() 호출
   ↓
3. React Query 캐시 확인
   - Hit → 캐시 사용 (10분)
   - Miss → fetchDocsConfig() 호출
   ↓
4. 데이터 표시
```

---

## 🎨 UI 커스터마이징

### CategorySection 수정
`components/docs/CategorySection.tsx`:
- 카드 레이아웃
- 호버 효과
- 색상 테마

### DocsPageClient 수정
`app/docs/DocsPageClient.tsx`:
- 헤더
- 카테고리 순서
- 전체 레이아웃

---

## 🔌 백엔드 연동

### Django API 엔드포인트

```python
# Django views.py
from django.http import JsonResponse

def docs_config(request):
    """문서 설정 반환"""
    config = load_config_from_db()
    return JsonResponse(config)

def docs_list(request):
    """문서 목록 반환"""
    docs = Document.objects.all()
    return JsonResponse(list(docs.values()))
```

### Next.js API 수정

`app/api/docs/route.ts`:

```typescript
export async function GET() {
  // Django API 호출
  const response = await fetch(`${process.env.DJANGO_API_URL}/docs`);
  const data = await response.json();
  return NextResponse.json(data);
}
```

---

## ✅ 테스트

1. 서버 시작:
```bash
npm run dev
```

2. 브라우저:
```
http://localhost:3000/docs
```

3. 확인 사항:
- [ ] 카테고리별 섹션 표시
- [ ] 문서 카드 클릭 → 상세 페이지
- [ ] 태그 표시
- [ ] 호버 애니메이션
- [ ] 10분 캐시 작동

---

## 🐛 트러블슈팅

### React Query 에러
```bash
npm install @tanstack/react-query
```

### 타입 에러
```typescript
// tsconfig.json에 paths 추가
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 빌드 에러
```bash
rm -rf .next
npm run build
```

---

## 📚 참고 문서

- [lib/docs/README.md](./lib/docs/README.md) - 상세 구조
- [React Query 문서](https://tanstack.com/query/latest)
- [Next.js App Router](https://nextjs.org/docs/app)

---

## 🎯 다음 단계

1. **Django 백엔드 개발**
   - `GET /api/docs/config`
   - `GET /api/docs`
   - `POST /api/docs` (Admin)

2. **Admin 페이지**
   - 문서 추가/수정/삭제
   - 메타데이터 관리
   - 카테고리 관리

3. **검색 기능**
   - 문서 제목/내용 검색
   - 태그 필터링
   - 카테고리 필터링

4. **분석**
   - 문서 조회수
   - 인기 문서
   - 검색 키워드

---

완료! 🎉

