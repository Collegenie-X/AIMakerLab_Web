# Debug 모드 사용 가이드

## 개요

페이지별로 debug 모드를 `true`/`false`로 설정하여 데이터 소스를 제어할 수 있습니다.

- **`debug = true`**: JSON 파일 사용 (개발/테스트)
- **`debug = false`**: Django API 사용 (프로덕션)

---

## 환경 변수 설정

### .env.local

```env
# 출강 문의만 API 사용 (debug = false)
NEXT_PUBLIC_DEBUG_INQUIRY_OUTREACH=false

# 나머지는 JSON 사용 (debug = true)
NEXT_PUBLIC_DEBUG_INQUIRY_INQUIRIES=true
NEXT_PUBLIC_DEBUG_INQUIRY_SCHEDULES=true
NEXT_PUBLIC_DEBUG_PRODUCTS_PRODUCTS=true
NEXT_PUBLIC_DEBUG_GALLERY_WORKS=true
```

### 개발 환경 (.env.development)

모든 페이지 JSON 사용:

```env
NEXT_PUBLIC_DEBUG_INQUIRY_OUTREACH=true
NEXT_PUBLIC_DEBUG_PRODUCTS_PRODUCTS=true
NEXT_PUBLIC_DEBUG_GALLERY_WORKS=true
# ... (모두 true)
```

### 프로덕션 환경 (.env.production)

모든 페이지 API 사용:

```env
NEXT_PUBLIC_DEBUG_INQUIRY_OUTREACH=false
NEXT_PUBLIC_DEBUG_PRODUCTS_PRODUCTS=false
NEXT_PUBLIC_DEBUG_GALLERY_WORKS=false
# ... (모두 false)
```

---

## 코드에서 사용

### 1. 자동 모드 (권장)

환경 변수에 따라 자동으로 데이터 소스 선택:

```typescript
import { fetchOutreachInquiries } from '@/lib/api';

export default async function Page() {
  // 환경 변수에 따라 자동으로 JSON 또는 API 선택
  const inquiries = await fetchOutreachInquiries();
  
  return <div>{/* ... */}</div>;
}
```

### 2. 명시적 debug 설정

```typescript
import { fetchOutreachInquiries } from '@/lib/api';

export default async function Page() {
  // 강제로 JSON 사용
  const inquiries = await fetchOutreachInquiries({ debug: true });
  
  // 또는 강제로 API 사용
  const inquiries2 = await fetchOutreachInquiries({ debug: false });
  
  return <div>{/* ... */}</div>;
}
```

### 3. 조건부 debug 모드

```typescript
import { fetchOutreachInquiries } from '@/lib/api';

export default async function Page({ searchParams }: any) {
  // URL 쿼리로 debug 모드 제어
  // /page?debug=true
  const useDebug = searchParams.debug === 'true';
  
  const inquiries = await fetchOutreachInquiries({ debug: useDebug });
  
  return <div>{/* ... */}</div>;
}
```

---

## Debug 설정 확인

### 콘솔에서 확인

```typescript
import { logDebugConfig, getDebugStats } from '@/lib/api';

// 전체 debug 설정 출력
logDebugConfig();

// 통계 확인
const stats = getDebugStats();
console.log(stats);
// {
//   total: 14,
//   jsonMode: 10,
//   apiMode: 4,
//   percentage: { json: 71, api: 29 }
// }
```

개발 모드에서 자동으로 로그 출력:

```bash
npm run dev

# 콘솔 출력:
🐛 Debug Configuration:
──────────────────────────────────────────────────
📁 INQUIRY:
  - inquiries: JSON 📄
  - schedules: JSON 📄
  - outreach: API 🌐

📁 PRODUCTS:
  - products: JSON 📄
  - videos: JSON 📄
  ...
```

---

## 페이지별 설정 목록

### Accounts
- `NEXT_PUBLIC_DEBUG_ACCOUNTS_PROFILE` - 프로필
- `NEXT_PUBLIC_DEBUG_ACCOUNTS_COURSES` - 나의 강의

### Inquiry
- `NEXT_PUBLIC_DEBUG_INQUIRY_INQUIRIES` - 수업 문의
- `NEXT_PUBLIC_DEBUG_INQUIRY_SCHEDULES` - 일정
- `NEXT_PUBLIC_DEBUG_INQUIRY_OUTREACH` - 출강 문의

### Products
- `NEXT_PUBLIC_DEBUG_PRODUCTS_PRODUCTS` - 제품 목록
- `NEXT_PUBLIC_DEBUG_PRODUCTS_VIDEOS` - 영상
- `NEXT_PUBLIC_DEBUG_PRODUCTS_QUOTE_ITEMS` - 견적 상품
- `NEXT_PUBLIC_DEBUG_PRODUCTS_QUOTE_INQUIRIES` - 견적 문의
- `NEXT_PUBLIC_DEBUG_PRODUCTS_REVIEWS` - 리뷰

### Gallery
- `NEXT_PUBLIC_DEBUG_GALLERY_WORKS` - 학생 작품
- `NEXT_PUBLIC_DEBUG_GALLERY_REVIEWS` - 수업 후기

### Curriculum
- `NEXT_PUBLIC_DEBUG_CURRICULUM_CURRICULUMS` - 커리큘럼

### Home
- `NEXT_PUBLIC_DEBUG_HOME_CONTENT` - 홈 콘텐츠

---

## 실전 예제

### 예제 1: 개발 중 특정 페이지만 API 테스트

```env
# .env.local

# 출강 문의만 API로 테스트
NEXT_PUBLIC_DEBUG_INQUIRY_OUTREACH=false

# 나머지는 JSON으로 빠른 개발
NEXT_PUBLIC_DEBUG_INQUIRY_INQUIRIES=true
NEXT_PUBLIC_DEBUG_PRODUCTS_PRODUCTS=true
NEXT_PUBLIC_DEBUG_GALLERY_WORKS=true
```

### 예제 2: 점진적 API 전환

```env
# Week 1: 출강 문의만 API
NEXT_PUBLIC_DEBUG_INQUIRY_OUTREACH=false

# Week 2: 제품도 API 추가
NEXT_PUBLIC_DEBUG_PRODUCTS_PRODUCTS=false

# Week 3: 갤러리도 API 추가
NEXT_PUBLIC_DEBUG_GALLERY_WORKS=false
```

### 예제 3: 컴포넌트에서 토글

```typescript
'use client';

import { useState } from 'react';
import { fetchOutreachInquiries } from '@/lib/api';

export default function InquiryList() {
  const [debug, setDebug] = useState(true);
  const [data, setData] = useState([]);
  
  const loadData = async () => {
    const result = await fetchOutreachInquiries({ debug });
    setData(result);
  };
  
  return (
    <div>
      <button onClick={() => setDebug(!debug)}>
        Mode: {debug ? 'JSON 📄' : 'API 🌐'}
      </button>
      
      <button onClick={loadData}>Load Data</button>
      
      {data.map(item => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
}
```

---

## 시나리오별 설정

### 시나리오 1: 로컬 개발 (JSON)

```env
# 모든 페이지 JSON 사용
NEXT_PUBLIC_DEBUG_INQUIRY_OUTREACH=true
NEXT_PUBLIC_DEBUG_PRODUCTS_PRODUCTS=true
NEXT_PUBLIC_DEBUG_GALLERY_WORKS=true
# ... (모두 true)
```

**장점**: 백엔드 없이 빠른 개발

### 시나리오 2: API 통합 테스트

```env
# 테스트할 페이지만 false
NEXT_PUBLIC_DEBUG_INQUIRY_OUTREACH=false
NEXT_PUBLIC_DEBUG_PRODUCTS_QUOTE_INQUIRIES=false

# 나머지는 true
NEXT_PUBLIC_DEBUG_INQUIRY_INQUIRIES=true
NEXT_PUBLIC_DEBUG_PRODUCTS_PRODUCTS=true
```

**장점**: 일부만 API 테스트

### 시나리오 3: 스테이징 환경

```env
# 모든 페이지 API 사용
NEXT_PUBLIC_DEBUG_INQUIRY_OUTREACH=false
NEXT_PUBLIC_DEBUG_PRODUCTS_PRODUCTS=false
NEXT_PUBLIC_DEBUG_GALLERY_WORKS=false
# ... (모두 false)
```

**장점**: 프로덕션과 동일한 환경

---

## 트러블슈팅

### 문제: 환경 변수가 적용 안 됨

**해결**:
```bash
# 1. 서버 재시작
npm run dev

# 2. .env 파일 확인
cat .env.local

# 3. 캐시 삭제
rm -rf .next
npm run dev
```

### 문제: Debug 모드가 항상 true

**원인**: 환경 변수 기본값이 true

**해결**:
```env
# false로 명시적 설정
NEXT_PUBLIC_DEBUG_INQUIRY_OUTREACH=false
```

### 문제: 일부 페이지만 작동 안 함

**확인**:
```typescript
import { logDebugConfig } from '@/lib/api';

// 페이지에서 실행
logDebugConfig();
```

---

## Best Practices

### 1. 개발 환경
- ✅ 모든 페이지 `debug = true` (JSON)
- ✅ 빠른 개발 및 프로토타이핑

### 2. 테스트 환경
- ✅ 일부 페이지만 `debug = false` (API)
- ✅ 점진적 API 통합 테스트

### 3. 스테이징 환경
- ✅ 모든 페이지 `debug = false` (API)
- ✅ 프로덕션과 동일한 환경

### 4. 프로덕션 환경
- ✅ 모든 페이지 `debug = false` (API)
- ✅ 실시간 데이터 사용

---

## 요약

| Debug Mode | 데이터 소스 | 사용 시기 |
|------------|------------|-----------|
| `true` | JSON 파일 | 개발, 프로토타이핑 |
| `false` | Django API | 테스트, 프로덕션 |

**핵심**: 환경 변수 하나로 페이지별 데이터 소스를 자유롭게 전환!

---

**작성일**: 2025-02-04  
**버전**: 1.0.0
