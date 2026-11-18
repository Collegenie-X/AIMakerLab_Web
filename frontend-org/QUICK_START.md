# Frontend 빠른 시작 가이드

## 1. 환경 설정

### 환경 변수 파일 생성

```bash
cd frontend
cp .env.local.example .env.local
```

### `.env.local` 파일 편집

```env
# Django 백엔드 URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# 데이터 소스 (json 또는 api)
NEXT_PUBLIC_DATA_SOURCE=json

# 페이지별 설정 (true: API, false: JSON)
NEXT_PUBLIC_USE_API_INQUIRY=false
NEXT_PUBLIC_USE_API_PRODUCTS=false
NEXT_PUBLIC_USE_API_GALLERY=false
```

## 2. 개발 서버 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

## 3. 데이터 소스 전환

### JSON 모드 (기본, 빠른 개발)

```env
NEXT_PUBLIC_USE_API_INQUIRY=false
```

- `public/inquiry/outreach-inquiries.json` 사용
- Django 백엔드 없이 개발 가능
- 빠른 프로토타이핑

### API 모드 (프로덕션)

```env
NEXT_PUBLIC_USE_API_INQUIRY=true
```

- Django 백엔드 API 사용
- 실시간 데이터
- CRUD 작업 가능

## 4. 사용 예시

### 컴포넌트에서 데이터 가져오기

```typescript
// app/inquiry/page.tsx
import { fetchOutreachInquiries } from '@/lib/api';

export default async function InquiryPage() {
  // 환경 변수에 따라 JSON 또는 API에서 자동으로 가져옴
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

### 데이터 생성하기

```typescript
'use client';

import { DataFetcher, API_ENDPOINTS } from '@/lib/api';

async function createInquiry(data) {
  const result = await DataFetcher.create(
    API_ENDPOINTS.inquiry.outreach,
    data
  );
  
  return result;
}
```

## 5. 주요 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 타입 체크
npm run type-check

# 린트
npm run lint
```

## 6. 디렉토리 구조

```
frontend/
├── app/                    # Next.js 13+ App Router
│   ├── inquiry/           # 문의 페이지
│   ├── products/          # 제품 페이지
│   └── gallery/           # 갤러리 페이지
│
├── lib/
│   └── api/               # API 유틸리티
│       ├── config.ts      # 설정
│       ├── client.ts      # HTTP 클라이언트
│       └── data-fetcher.ts # 데이터 페처
│
├── public/                # 정적 파일
│   ├── inquiry/           # JSON 데이터
│   ├── products/
│   └── gallery/
│
├── .env.local             # 로컬 환경 변수
├── .env.development       # 개발 환경
└── .env.production        # 프로덕션 환경
```

## 7. 문제 해결

### 환경 변수가 적용되지 않음

```bash
# 서버 재시작
npm run dev
```

### API 연결 오류

1. Django 백엔드 실행 확인: `http://localhost:8000/admin/`
2. CORS 설정 확인
3. API URL 확인: `.env.local`의 `NEXT_PUBLIC_API_BASE_URL`

### JSON 파일을 찾을 수 없음

- `public/` 폴더에 JSON 파일 존재 확인
- 파일 경로 확인 (`lib/api/config.ts`의 `JSON_PATHS`)

## 8. 다음 단계

1. **개발**: JSON 모드로 빠르게 개발
2. **테스트**: 일부 페이지만 API로 전환하여 테스트
3. **배포**: 모든 페이지를 API 모드로 전환

## 추가 문서

- **상세 가이드**: `URL_MANAGEMENT_GUIDE.md`
- **백엔드 가이드**: `../backend/API_GUIDE.md`
- **API 라이브러리**: `lib/api/README.md`

---

**문의**: 문제가 발생하면 위 문서들을 참고하세요.
