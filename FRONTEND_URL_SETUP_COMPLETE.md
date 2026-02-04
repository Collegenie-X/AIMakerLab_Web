# Frontend URL 관리 시스템 구축 완료 ✅

## 구현 완료 항목

### ✅ 1. next.config.mjs 설정
- 환경 변수 자동 주입
- API 프록시 설정 (CORS 회피)
- 헤더 설정

### ✅ 2. 환경 변수 파일
- `.env.local.example`: 환경 변수 템플릿
- `.env.development`: 개발 환경 설정
- `.env.production`: 프로덕션 환경 설정

### ✅ 3. API 라이브러리 (`lib/api/`)
- `config.ts`: API URL, 엔드포인트, JSON 경로 중앙 관리
- `client.ts`: HTTP 요청 클라이언트 (GET, POST, PUT, DELETE, 파일 업로드)
- `data-fetcher.ts`: JSON/API 자동 전환 인터페이스
- `index.ts`: 모듈 진입점

### ✅ 4. 문서화
- `URL_MANAGEMENT_GUIDE.md`: 상세 사용 가이드
- `QUICK_START.md`: 빠른 시작 가이드
- `lib/api/README.md`: API 라이브러리 문서

---

## 주요 기능

### 1. 중앙 집중식 URL 관리

모든 API URL과 JSON 경로를 한 곳에서 관리:

```typescript
// lib/api/config.ts
export const API_ENDPOINTS = {
  inquiry: {
    outreach: '/api/inquiry/outreach/',
  },
  products: {
    quoteInquiries: '/api/products/quote-inquiries/',
  },
  // ...
};

export const JSON_PATHS = {
  inquiry: {
    outreach: '/inquiry/outreach-inquiries.json',
  },
  // ...
};
```

### 2. 환경별 자동 전환

환경 변수로 JSON/API 자동 전환:

```env
# 개발: JSON 사용
NEXT_PUBLIC_USE_API_INQUIRY=false

# 프로덕션: API 사용
NEXT_PUBLIC_USE_API_INQUIRY=true
```

### 3. 간편한 데이터 페칭

```typescript
import { fetchOutreachInquiries } from '@/lib/api';

// 환경 변수에 따라 자동으로 JSON 또는 API 선택
const inquiries = await fetchOutreachInquiries();
```

### 4. 완벽한 CRUD 지원

```typescript
import { DataFetcher, API_ENDPOINTS } from '@/lib/api';

// Create
await DataFetcher.create(API_ENDPOINTS.inquiry.outreach, data);

// Read
await fetchOutreachInquiries();

// Update
await DataFetcher.update(API_ENDPOINTS.inquiry.outreach, id, data);

// Delete
await DataFetcher.delete(API_ENDPOINTS.inquiry.outreach, id);
```

### 5. 유연한 소스 선택

```typescript
// 강제로 JSON 사용
const inquiries = await DataFetcher.fetchList(
  'inquiry',
  jsonPath,
  apiEndpoint,
  { forceSource: 'json' }
);

// 강제로 API 사용
const inquiries = await DataFetcher.fetchList(
  'inquiry',
  jsonPath,
  apiEndpoint,
  { forceSource: 'api' }
);
```

---

## 파일 구조

```
frontend/
├── next.config.mjs              # ✅ Next.js 설정 (환경 변수, 프록시)
├── .env.local.example           # ✅ 환경 변수 템플릿
├── .env.development             # ✅ 개발 환경
├── .env.production              # ✅ 프로덕션 환경
├── .gitignore                   # ✅ 업데이트 (.env.local 무시)
│
├── lib/
│   └── api/
│       ├── config.ts            # ✅ API 설정 (URL, 엔드포인트)
│       ├── client.ts            # ✅ HTTP 클라이언트
│       ├── data-fetcher.ts      # ✅ 데이터 페처
│       ├── index.ts             # ✅ 진입점
│       └── README.md            # ✅ 라이브러리 문서
│
├── URL_MANAGEMENT_GUIDE.md      # ✅ 상세 가이드
├── QUICK_START.md               # ✅ 빠른 시작 가이드
└── FRONTEND_URL_SETUP_COMPLETE.md # ✅ 이 파일
```

---

## 사용 방법

### 1. 환경 설정

```bash
# 환경 변수 파일 생성
cp .env.local.example .env.local

# 필요에 따라 수정
nano .env.local
```

### 2. 개발 모드 (JSON)

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_USE_API_INQUIRY=false
```

```bash
npm run dev
```

### 3. 프로덕션 모드 (API)

```env
NEXT_PUBLIC_API_BASE_URL=https://api.aimakerlab.com
NEXT_PUBLIC_USE_API_INQUIRY=true
```

```bash
npm run build
npm start
```

---

## 실제 사용 예시

### Server Component

```typescript
// app/inquiry/outreach/page.tsx
import { fetchOutreachInquiries } from '@/lib/api';

export default async function OutreachPage() {
  const inquiries = await fetchOutreachInquiries();
  
  return (
    <div>
      <h1>출강 수업 문의</h1>
      {inquiries.map((inquiry) => (
        <div key={inquiry.id}>
          <h2>{inquiry.title}</h2>
          <p>{inquiry.institution}</p>
          <span>{inquiry.status}</span>
        </div>
      ))}
    </div>
  );
}
```

### Client Component (Form)

```typescript
'use client';

import { useState } from 'react';
import { DataFetcher, API_ENDPOINTS } from '@/lib/api';

export default function OutreachForm() {
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = {
        title: '서울 초등학교 AI 교육',
        institution: '강남초등학교',
        requester_name: '김선생',
        // ...
      };
      
      const result = await DataFetcher.create(
        API_ENDPOINTS.inquiry.outreach,
        formData
      );
      
      alert('문의가 등록되었습니다!');
    } catch (error) {
      alert('오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* 폼 필드 */}
      <button type="submit" disabled={loading}>
        {loading ? '전송 중...' : '문의하기'}
      </button>
    </form>
  );
}
```

---

## API 엔드포인트 목록

### 문의 (Inquiry)
- `GET /api/inquiry/inquiries/` - 수업 문의 목록
- `POST /api/inquiry/inquiries/` - 수업 문의 생성
- `GET /api/inquiry/outreach/` - 출강 문의 목록
- `POST /api/inquiry/outreach/` - 출강 문의 생성
- `GET /api/inquiry/schedules/` - 일정 목록

### 제품 (Products)
- `GET /api/products/products/` - 제품 목록
- `GET /api/products/quote-items/` - 견적 상품 목록
- `POST /api/products/quote-inquiries/` - 견적 문의 생성
- `GET /api/products/videos/` - 영상 목록

### 갤러리 (Gallery)
- `GET /api/gallery/?category=works` - 학생 작품
- `GET /api/gallery/?category=reviews` - 수업 후기
- `POST /api/gallery/` - 갤러리 생성

### 계정 (Accounts)
- `POST /api/accounts/token/` - 로그인 (JWT)
- `POST /api/accounts/register/` - 회원가입
- `GET /api/accounts/user-courses/` - 나의 강의

---

## 환경 변수 상세

### 필수 환경 변수

```env
# Django 백엔드 API 서버 URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

### 선택 환경 변수 (페이지별 데이터 소스)

```env
# true: API 사용, false: JSON 사용 (기본값: false)
NEXT_PUBLIC_USE_API_ACCOUNTS=false
NEXT_PUBLIC_USE_API_INQUIRY=false
NEXT_PUBLIC_USE_API_PRODUCTS=false
NEXT_PUBLIC_USE_API_GALLERY=false
NEXT_PUBLIC_USE_API_CURRICULUM=false
NEXT_PUBLIC_USE_API_HOME=false
```

---

## 장점

### 1. 개발 속도 향상
- JSON 파일로 빠른 프로토타이핑
- 백엔드 없이 프론트엔드 개발 가능

### 2. 유연한 전환
- 환경 변수로 간편하게 전환
- 코드 변경 없이 JSON ↔ API 전환

### 3. 점진적 마이그레이션
- 페이지별로 하나씩 API로 전환 가능
- 리스크 최소화

### 4. 중앙 관리
- 모든 URL과 경로를 한 곳에서 관리
- 변경 시 한 곳만 수정

### 5. 타입 안정성
- TypeScript 지원
- 컴파일 타임 오류 검출

---

## 개발 워크플로우

### Phase 1: 프로토타이핑 (JSON)
```env
NEXT_PUBLIC_USE_API_INQUIRY=false
```
- `public/inquiry/outreach-inquiries.json` 생성
- UI 개발 및 디자인 작업
- 빠른 반복 개발

### Phase 2: API 연동 테스트
```env
NEXT_PUBLIC_USE_API_INQUIRY=true
```
- Django 백엔드 연동
- CRUD 기능 테스트
- 오류 처리 구현

### Phase 3: 프로덕션 배포
```env
# .env.production
NEXT_PUBLIC_API_BASE_URL=https://api.aimakerlab.com
NEXT_PUBLIC_USE_API_INQUIRY=true
NEXT_PUBLIC_USE_API_PRODUCTS=true
NEXT_PUBLIC_USE_API_GALLERY=true
```
- 모든 페이지 API 활성화
- 성능 최적화
- 모니터링 설정

---

## 다음 단계

### 즉시 적용 가능
1. ✅ 환경 변수 설정
2. ✅ 개발 서버 실행
3. ✅ 데이터 페칭 테스트

### 추가 개선 (선택)
1. React Query 또는 SWR 통합
2. 에러 바운더리 구현
3. 로딩 스켈레톤 추가
4. 캐싱 전략 구현
5. TypeScript 타입 생성 자동화

---

## 체크리스트

### 설정
- [x] `next.config.mjs` 업데이트
- [x] 환경 변수 파일 생성
- [x] `.gitignore` 업데이트
- [x] API 라이브러리 구현

### 문서
- [x] 상세 가이드 작성
- [x] 빠른 시작 가이드 작성
- [x] API 라이브러리 문서 작성
- [x] 완료 요약 문서 작성 (이 파일)

### 테스트 (사용자가 진행)
- [ ] `.env.local` 파일 생성
- [ ] 개발 서버 실행 확인
- [ ] JSON 모드 테스트
- [ ] API 모드 테스트
- [ ] CRUD 작업 테스트

---

## 관련 문서

1. **Frontend**
   - `QUICK_START.md` - 빠른 시작 가이드
   - `URL_MANAGEMENT_GUIDE.md` - 상세 사용 가이드
   - `lib/api/README.md` - API 라이브러리 문서

2. **Backend**
   - `backend/API_GUIDE.md` - Django API 가이드
   - `backend/IMPLEMENTATION_SUMMARY.md` - 백엔드 구현 요약

---

## 문의 및 지원

문제가 발생하면 다음을 확인하세요:

1. **환경 변수**: `.env.local` 파일 확인
2. **서버 재시작**: 환경 변수 변경 후 `npm run dev` 재실행
3. **Django 백엔드**: `http://localhost:8000/admin/` 접속 확인
4. **디버그 로그**: `logApiConfig()` 함수 사용
5. **문서 참고**: `URL_MANAGEMENT_GUIDE.md`

---

**구현 완료일**: 2025-02-04  
**버전**: 1.0.0  
**프레임워크**: Next.js 14+ App Router

🎉 **Frontend URL 관리 시스템 구축 완료!**
