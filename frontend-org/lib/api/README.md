# API 라이브러리 사용법

## 빠른 시작

### 1. 환경 변수 설정

`.env.local` 파일 생성:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_USE_API_INQUIRY=false
```

### 2. 데이터 가져오기

```typescript
import { fetchOutreachInquiries } from '@/lib/api';

const inquiries = await fetchOutreachInquiries();
```

### 3. CRUD 작업

```typescript
import { DataFetcher, API_ENDPOINTS } from '@/lib/api';

// Create
const newInquiry = await DataFetcher.create(
  API_ENDPOINTS.inquiry.outreach,
  { title: '제목', institution: '기관명' }
);

// Read
const inquiries = await fetchOutreachInquiries();

// Update
await DataFetcher.update(
  API_ENDPOINTS.inquiry.outreach,
  1,
  { status: 'confirmed' }
);

// Delete
await DataFetcher.delete(
  API_ENDPOINTS.inquiry.outreach,
  1
);
```

## 파일 설명

- `config.ts`: API URL, 엔드포인트, JSON 경로 설정
- `client.ts`: HTTP 요청 클라이언트 (fetch 래퍼)
- `data-fetcher.ts`: JSON/API 통합 인터페이스
- `index.ts`: 모듈 진입점

## 추가 문서

자세한 내용은 `URL_MANAGEMENT_GUIDE.md`를 참고하세요.
