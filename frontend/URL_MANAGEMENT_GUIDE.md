# Frontend URL 및 API 관리 가이드

## 개요

Next.js의 `next.config.mjs`를 통해 Django 백엔드 API URL과 데이터 소스를 중앙에서 관리합니다.

---

## 환경 변수 설정

### 1. 환경 파일 생성

프로젝트 루트에 `.env.local` 파일을 생성합니다:

```bash
cp .env.local.example .env.local
```

### 2. 환경 변수 설정

```env
# Django 백엔드 API URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# 전역 데이터 소스 모드 (json 또는 api)
NEXT_PUBLIC_DATA_SOURCE=json

# 페이지별 데이터 소스 설정 (true: API, false: JSON)
NEXT_PUBLIC_USE_API_ACCOUNTS=false
NEXT_PUBLIC_USE_API_INQUIRY=false
NEXT_PUBLIC_USE_API_PRODUCTS=false
NEXT_PUBLIC_USE_API_GALLERY=false
NEXT_PUBLIC_USE_API_CURRICULUM=false
NEXT_PUBLIC_USE_API_HOME=false
```

---

## 환경별 설정

### 개발 환경 (`.env.development`)

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_DATA_SOURCE=json
NEXT_PUBLIC_USE_API_INQUIRY=false
```

### 프로덕션 환경 (`.env.production`)

```env
NEXT_PUBLIC_API_BASE_URL=https://api.aimakerlab.com
NEXT_PUBLIC_DATA_SOURCE=api
NEXT_PUBLIC_USE_API_INQUIRY=true
NEXT_PUBLIC_USE_API_PRODUCTS=true
NEXT_PUBLIC_USE_API_GALLERY=true
```

---

## API 사용 방법

### 1. 기본 사용 (DataFetcher)

```typescript
import { DataFetcher } from '@/lib/api';

// 출강 문의 목록 가져오기 (JSON 또는 API 자동 선택)
const inquiries = await DataFetcher.fetchList(
  'inquiry',
  '/inquiry/outreach-inquiries.json',
  '/api/inquiry/outreach/'
);

// 제품 목록 가져오기
const products = await DataFetcher.fetchList(
  'products',
  '/products/products.json',
  '/api/products/products/'
);
```

### 2. 강제로 JSON 사용

```typescript
const inquiries = await DataFetcher.fetchList(
  'inquiry',
  '/inquiry/outreach-inquiries.json',
  '/api/inquiry/outreach/',
  { forceSource: 'json' }
);
```

### 3. 강제로 API 사용

```typescript
const inquiries = await DataFetcher.fetchList(
  'inquiry',
  '/inquiry/outreach-inquiries.json',
  '/api/inquiry/outreach/',
  { forceSource: 'api' }
);
```

### 4. 인증 토큰과 함께 사용

```typescript
const token = 'your-jwt-token';

const userCourses = await DataFetcher.fetchList(
  'accounts',
  '/accounts/user-courses.json',
  '/api/accounts/user-courses/',
  { token }
);
```

---

## 간편 함수 사용

`data-fetcher.ts`에서 제공하는 간편 함수를 사용할 수 있습니다:

```typescript
import {
  fetchInquiries,
  fetchOutreachInquiries,
  fetchProducts,
  fetchGalleryWorks,
  fetchSchedules,
} from '@/lib/api';

// 사용 예시
const outreachInquiries = await fetchOutreachInquiries();
const products = await fetchProducts();
const works = await fetchGalleryWorks();
const weekdaySchedules = await fetchSchedules('weekday');
```

---

## CRUD 작업

### Create (생성)

```typescript
import { DataFetcher, API_ENDPOINTS } from '@/lib/api';

// 출강 문의 생성
const newInquiry = await DataFetcher.create(
  API_ENDPOINTS.inquiry.outreach,
  {
    title: '서울 초등학교 AI 교육',
    institution: '강남초등학교',
    requester_name: '김선생',
    requester_email: 'teacher@school.com',
    // ... 기타 필드
  }
);
```

### Read (조회)

```typescript
// 목록 조회
const inquiries = await fetchOutreachInquiries();

// 상세 조회
const inquiry = await DataFetcher.fetchDetail(
  'inquiry',
  1,
  '/inquiry/outreach-inquiries.json',
  '/api/inquiry/outreach/'
);
```

### Update (수정)

```typescript
// 출강 문의 수정
const updated = await DataFetcher.update(
  API_ENDPOINTS.inquiry.outreach,
  1,
  {
    status: 'confirmed',
    admin_notes: '확정되었습니다.'
  },
  { token }
);
```

### Delete (삭제)

```typescript
// 출강 문의 삭제
await DataFetcher.delete(
  API_ENDPOINTS.inquiry.outreach,
  1,
  { token }
);
```

---

## API 클라이언트 직접 사용

세밀한 제어가 필요한 경우 `apiClient`를 직접 사용할 수 있습니다:

```typescript
import { apiClient, API_ENDPOINTS } from '@/lib/api';

// GET 요청
const data = await apiClient.get('/api/inquiry/outreach/');

// POST 요청
const result = await apiClient.post('/api/inquiry/outreach/', {
  title: '문의 제목',
  // ... 데이터
});

// PUT 요청
const updated = await apiClient.put('/api/inquiry/outreach/1/', {
  status: 'confirmed'
});

// DELETE 요청
await apiClient.delete('/api/inquiry/outreach/1/');

// 파일 업로드
const formData = new FormData();
formData.append('image', file);
formData.append('title', '제목');

const uploaded = await apiClient.upload('/api/gallery/', formData);
```

---

## 컴포넌트에서 사용 예시

### Server Component

```typescript
// app/inquiry/outreach/page.tsx
import { fetchOutreachInquiries } from '@/lib/api';

export default async function OutreachPage() {
  const inquiries = await fetchOutreachInquiries();
  
  return (
    <div>
      {inquiries.map((inquiry) => (
        <div key={inquiry.id}>
          <h2>{inquiry.title}</h2>
          <p>{inquiry.institution}</p>
        </div>
      ))}
    </div>
  );
}
```

### Client Component (with SWR)

```typescript
'use client';

import useSWR from 'swr';
import { fetchOutreachInquiries } from '@/lib/api';

export default function OutreachList() {
  const { data, error, isLoading } = useSWR(
    'outreach-inquiries',
    fetchOutreachInquiries
  );
  
  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생</div>;
  
  return (
    <div>
      {data?.map((inquiry) => (
        <div key={inquiry.id}>
          <h2>{inquiry.title}</h2>
        </div>
      ))}
    </div>
  );
}
```

### Client Component (with useState/useEffect)

```typescript
'use client';

import { useState, useEffect } from 'react';
import { fetchOutreachInquiries } from '@/lib/api';

export default function OutreachList() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchOutreachInquiries()
      .then(setInquiries)
      .finally(() => setLoading(false));
  }, []);
  
  if (loading) return <div>로딩 중...</div>;
  
  return (
    <div>
      {inquiries.map((inquiry) => (
        <div key={inquiry.id}>
          <h2>{inquiry.title}</h2>
        </div>
      ))}
    </div>
  );
}
```

---

## 데이터 소스 전환 시나리오

### 시나리오 1: 개발 중에는 JSON, 프로덕션에서는 API

**개발 환경** (`.env.development`):
```env
NEXT_PUBLIC_USE_API_INQUIRY=false
```

**프로덕션** (`.env.production`):
```env
NEXT_PUBLIC_USE_API_INQUIRY=true
```

코드 변경 없이 환경에 따라 자동 전환됩니다!

### 시나리오 2: 특정 기능만 API 사용

```env
# 출강 문의만 API 사용
NEXT_PUBLIC_USE_API_INQUIRY=true

# 나머지는 JSON 사용
NEXT_PUBLIC_USE_API_PRODUCTS=false
NEXT_PUBLIC_USE_API_GALLERY=false
```

### 시나리오 3: 테스트를 위해 일시적으로 JSON 사용

컴포넌트에서 `forceSource` 옵션 사용:

```typescript
// API가 켜져 있어도 강제로 JSON 사용
const inquiries = await DataFetcher.fetchList(
  'inquiry',
  '/inquiry/outreach-inquiries.json',
  '/api/inquiry/outreach/',
  { forceSource: 'json' }
);
```

---

## API Proxy 설정

`next.config.mjs`에 설정된 프록시를 통해 CORS 문제를 해결할 수 있습니다:

```javascript
// Frontend에서
fetch('/api/backend/inquiry/outreach/')

// 자동으로 다음으로 프록시됨
// http://localhost:8000/api/inquiry/outreach/
```

---

## 디버깅

### API 설정 확인

```typescript
import { logApiConfig } from '@/lib/api';

// 개발 환경에서 콘솔에 API 설정 출력
logApiConfig();
```

출력 예시:
```
🔧 API Configuration:
- API Base URL: http://localhost:8000
- Data Source Mode: json
- Data Source Config: {
    accounts: false,
    inquiry: false,
    products: false,
    gallery: false,
    curriculum: false,
    home: false
  }
```

---

## 주요 파일 구조

```
frontend/
├── next.config.mjs          # Next.js 설정 (환경 변수, 프록시)
├── .env.local               # 로컬 환경 변수 (Git 무시)
├── .env.local.example       # 환경 변수 예시
├── .env.development         # 개발 환경 설정
├── .env.production          # 프로덕션 환경 설정
│
└── lib/
    └── api/
        ├── config.ts        # API 설정 (URL, 엔드포인트)
        ├── client.ts        # API 클라이언트 (fetch 래퍼)
        ├── data-fetcher.ts  # 데이터 페처 (JSON/API 통합)
        └── index.ts         # 진입점
```

---

## 체크리스트

### 초기 설정
- [ ] `.env.local` 파일 생성
- [ ] Django 백엔드 URL 설정
- [ ] 데이터 소스 모드 선택
- [ ] Next.js 서버 재시작

### 개발 중
- [ ] 필요한 페이지만 API 활성화
- [ ] JSON 파일로 빠른 프로토타이핑
- [ ] API 연동 후 테스트

### 배포 전
- [ ] `.env.production` 설정 확인
- [ ] 프로덕션 API URL 설정
- [ ] 모든 페이지 API 활성화
- [ ] CORS 설정 확인

---

## 문제 해결

### 1. 환경 변수가 적용되지 않음
```bash
# Next.js 서버 재시작
npm run dev
```

### 2. CORS 에러
- Django `settings.py`의 `CORS_ALLOWED_ORIGINS` 확인
- Next.js 프록시 사용: `/api/backend/` 경로 사용

### 3. JSON 파일을 찾을 수 없음
- `public/` 폴더 경로 확인
- 파일명 대소문자 확인

### 4. API 응답이 없음
```typescript
// API 설정 확인
import { API_BASE_URL } from '@/lib/api';
console.log('API URL:', API_BASE_URL);
```

---

## 팁

1. **개발 속도 향상**: 개발 중에는 JSON 사용
2. **점진적 전환**: 페이지별로 하나씩 API로 전환
3. **테스트**: `forceSource` 옵션으로 유연하게 테스트
4. **디버깅**: `logApiConfig()` 함수 활용

---

## 다음 단계

1. TypeScript 타입 정의 추가
2. React Query 또는 SWR 통합
3. 에러 처리 개선
4. 로딩 상태 관리
5. 캐싱 전략 구현

---

**작성일**: 2025-02-04  
**버전**: 1.0.0
