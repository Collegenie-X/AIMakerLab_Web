# Debug 모드 시스템 구축 완료 ✅

## 구현 완료 내용

### ✅ 1. Debug Config 시스템
- 페이지별 독립적인 debug 설정
- 환경 변수 기반 자동 전환
- `true`: JSON 파일 사용
- `false`: Django API 사용

### ✅ 2. 유연한 제어 방식
- **자동 모드**: 환경 변수에 따라 자동 선택
- **명시적 모드**: 코드에서 `debug` 옵션 지정
- **강제 모드**: `forceSource` 옵션

### ✅ 3. 개발자 도구
- `logDebugConfig()`: 전체 설정 확인
- `getDebugStats()`: 통계 조회
- `isDebugMode()`: 특정 페이지 모드 확인
- `getDataSource()`: 데이터 소스 확인

### ✅ 4. 완벽한 문서화
- `DEBUG_MODE_GUIDE.md`: 상세 사용 가이드
- `debug-mode-example.tsx`: 10가지 실전 예제
- 환경 변수 템플릿 (.env 파일들)

---

## 핵심 기능

### 페이지별 독립 설정

```env
# 출강 문의만 API 사용
NEXT_PUBLIC_DEBUG_INQUIRY_OUTREACH=false

# 나머지는 JSON 사용
NEXT_PUBLIC_DEBUG_INQUIRY_INQUIRIES=true
NEXT_PUBLIC_DEBUG_PRODUCTS_PRODUCTS=true
NEXT_PUBLIC_DEBUG_GALLERY_WORKS=true
```

### 자동 모드 (권장)

```typescript
import { fetchOutreachInquiries } from '@/lib/api';

// 환경 변수에 따라 자동으로 JSON 또는 API 선택
const inquiries = await fetchOutreachInquiries();
```

### 명시적 모드

```typescript
// 강제로 JSON 사용
const jsonData = await fetchOutreachInquiries({ debug: true });

// 강제로 API 사용
const apiData = await fetchOutreachInquiries({ debug: false });
```

---

## 파일 구조

```
frontend/
├── lib/api/
│   ├── debug-config.ts          ✅ Debug 설정 관리
│   ├── data-fetcher.ts          ✅ Debug 모드 지원 추가
│   ├── config.ts                ✅ 기존 설정
│   ├── client.ts                ✅ HTTP 클라이언트
│   └── index.ts                 ✅ 진입점 (debug-config export)
│
├── app/examples/
│   └── debug-mode-example.tsx   ✅ 10가지 사용 예제
│
├── .env.local.example           ✅ 환경 변수 템플릿
├── .env.development             ✅ 개발 환경 (모두 true)
├── .env.production              ✅ 프로덕션 (모두 false)
│
└── DEBUG_MODE_GUIDE.md          ✅ 상세 사용 가이드
```

---

## 환경 변수 목록

### Accounts (2개)
```env
NEXT_PUBLIC_DEBUG_ACCOUNTS_PROFILE=true
NEXT_PUBLIC_DEBUG_ACCOUNTS_COURSES=true
```

### Inquiry (3개)
```env
NEXT_PUBLIC_DEBUG_INQUIRY_INQUIRIES=true
NEXT_PUBLIC_DEBUG_INQUIRY_SCHEDULES=true
NEXT_PUBLIC_DEBUG_INQUIRY_OUTREACH=true
```

### Products (5개)
```env
NEXT_PUBLIC_DEBUG_PRODUCTS_PRODUCTS=true
NEXT_PUBLIC_DEBUG_PRODUCTS_VIDEOS=true
NEXT_PUBLIC_DEBUG_PRODUCTS_QUOTE_ITEMS=true
NEXT_PUBLIC_DEBUG_PRODUCTS_QUOTE_INQUIRIES=true
NEXT_PUBLIC_DEBUG_PRODUCTS_REVIEWS=true
```

### Gallery (2개)
```env
NEXT_PUBLIC_DEBUG_GALLERY_WORKS=true
NEXT_PUBLIC_DEBUG_GALLERY_REVIEWS=true
```

### Curriculum (1개)
```env
NEXT_PUBLIC_DEBUG_CURRICULUM_CURRICULUMS=true
```

### Home (1개)
```env
NEXT_PUBLIC_DEBUG_HOME_CONTENT=true
```

**총 14개 페이지 독립 제어 가능**

---

## 사용 예시

### 1. 로컬 개발 (모두 JSON)

```env
# .env.development
NEXT_PUBLIC_DEBUG_INQUIRY_OUTREACH=true
NEXT_PUBLIC_DEBUG_PRODUCTS_PRODUCTS=true
# ... (모두 true)
```

```typescript
// 자동으로 JSON 사용
const data = await fetchOutreachInquiries();
```

### 2. API 통합 테스트 (일부만 API)

```env
# .env.local
NEXT_PUBLIC_DEBUG_INQUIRY_OUTREACH=false  # API 테스트
NEXT_PUBLIC_DEBUG_PRODUCTS_PRODUCTS=true  # JSON 유지
```

```typescript
// 출강 문의: API 사용
const inquiries = await fetchOutreachInquiries();

// 제품: JSON 사용
const products = await fetchProducts();
```

### 3. 프로덕션 (모두 API)

```env
# .env.production
NEXT_PUBLIC_DEBUG_INQUIRY_OUTREACH=false
NEXT_PUBLIC_DEBUG_PRODUCTS_PRODUCTS=false
# ... (모두 false)
```

### 4. 동적 토글 (Client Component)

```typescript
'use client';

export default function Page() {
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
      {/* ... */}
    </div>
  );
}
```

---

## Debug 설정 확인

### 콘솔 로그

```typescript
import { logDebugConfig } from '@/lib/api';

// 개발 모드에서 실행
logDebugConfig();
```

**출력 예시:**

```
🐛 Debug Configuration:
──────────────────────────────────────────────────

📁 INQUIRY:
  - inquiries: JSON 📄
  - schedules: JSON 📄
  - outreach: API 🌐

📁 PRODUCTS:
  - products: JSON 📄
  - videos: JSON 📄
  - quoteItems: JSON 📄
  - quoteInquiries: API 🌐
  - reviews: JSON 📄

📁 GALLERY:
  - works: JSON 📄
  - reviews: JSON 📄

──────────────────────────────────────────────────
💡 Tip: true = JSON, false = API
```

### 통계 확인

```typescript
import { getDebugStats } from '@/lib/api';

const stats = getDebugStats();
console.log(stats);
```

**출력 예시:**

```javascript
{
  total: 14,
  jsonMode: 10,
  apiMode: 4,
  percentage: {
    json: 71,  // 71%가 JSON 모드
    api: 29    // 29%가 API 모드
  }
}
```

---

## 장점

### 1. 유연성
- ✅ 페이지별 독립 제어
- ✅ 환경별 자동 전환
- ✅ 런타임 동적 변경

### 2. 개발 속도
- ✅ JSON으로 빠른 프로토타이핑
- ✅ 백엔드 없이 개발 가능
- ✅ 실시간 토글 가능

### 3. 안전한 배포
- ✅ 점진적 API 전환
- ✅ 롤백 용이
- ✅ A/B 테스트 가능

### 4. 디버깅
- ✅ 명확한 로그
- ✅ 통계 확인
- ✅ 문제 추적 용이

---

## 실전 시나리오

### Scenario 1: 로컬 개발
```env
# 모두 JSON (빠른 개발)
NEXT_PUBLIC_DEBUG_*=true
```

### Scenario 2: 출강 문의 API 테스트
```env
NEXT_PUBLIC_DEBUG_INQUIRY_OUTREACH=false  # API
NEXT_PUBLIC_DEBUG_INQUIRY_INQUIRIES=true   # JSON
NEXT_PUBLIC_DEBUG_PRODUCTS_PRODUCTS=true   # JSON
```

### Scenario 3: 스테이징 환경
```env
# 모두 API (프로덕션과 동일)
NEXT_PUBLIC_DEBUG_*=false
```

### Scenario 4: 프로덕션 + Hotfix
```env
# 문제 있는 페이지만 JSON으로 임시 전환
NEXT_PUBLIC_DEBUG_INQUIRY_OUTREACH=true   # 임시 JSON
NEXT_PUBLIC_DEBUG_PRODUCTS_PRODUCTS=false # API 유지
```

---

## API Reference

### Functions

#### `isDebugMode(category, page)`
특정 페이지의 debug 모드 확인

```typescript
const isDebug = isDebugMode('inquiry', 'outreach');
// true: JSON, false: API
```

#### `getDataSource(category, page)`
데이터 소스 확인

```typescript
const source = getDataSource('inquiry', 'outreach');
// 'json' | 'api'
```

#### `logDebugConfig()`
전체 debug 설정 출력

```typescript
logDebugConfig();
// 콘솔에 설정 표시
```

#### `getDebugStats()`
통계 조회

```typescript
const stats = getDebugStats();
// { total, jsonMode, apiMode, percentage }
```

---

## 10가지 사용 예제

파일: `app/examples/debug-mode-example.tsx`

1. **자동 모드**: 환경 변수에 따라 자동 선택
2. **명시적 debug**: 코드에서 직접 지정
3. **조건부 모드**: URL 쿼리로 제어
4. **여러 페이지**: 각각 독립적인 설정
5. **설정 확인**: debug 설정 로깅
6. **Client 토글**: 실시간 전환
7. **환경별 설정**: 개발/프로덕션 자동 분기
8. **에러 처리**: API 실패 시 JSON 폴백
9. **성능 비교**: JSON vs API 속도 측정
10. **A/B 테스트**: 사용자별 다른 소스

---

## 마이그레이션 가이드

### 기존 코드
```typescript
// 이전 방식 (DATA_SOURCE_CONFIG 사용)
const data = await DataFetcher.fetchList(
  'inquiry',
  '/inquiry/outreach.json',
  '/api/inquiry/outreach/'
);
```

### 새로운 코드
```typescript
// 새로운 방식 (debug 모드 지원)
const data = await fetchOutreachInquiries();
// 또는
const data = await fetchOutreachInquiries({ debug: true });
```

**변경 사항:**
- `page` 파라미터 추가
- Debug 모드 자동 감지
- 더 간결한 함수 호출

---

## 트러블슈팅

### Q: 환경 변수가 적용 안 됨
```bash
# 서버 재시작
npm run dev

# 캐시 삭제
rm -rf .next
npm run dev
```

### Q: 항상 JSON만 사용됨
```env
# false로 명시적 설정
NEXT_PUBLIC_DEBUG_INQUIRY_OUTREACH=false
```

### Q: 특정 페이지만 안 됨
```typescript
// 콘솔에서 확인
import { logDebugConfig } from '@/lib/api';
logDebugConfig();
```

---

## 체크리스트

### 설정
- [x] `lib/api/debug-config.ts` 생성
- [x] `data-fetcher.ts` 업데이트
- [x] 환경 변수 파일 업데이트
- [x] Export 추가 (`index.ts`)

### 테스트
- [ ] `.env.local` 설정
- [ ] 자동 모드 테스트
- [ ] 명시적 모드 테스트
- [ ] 콘솔 로그 확인
- [ ] 통계 확인

### 문서
- [x] `DEBUG_MODE_GUIDE.md` 작성
- [x] 사용 예제 작성
- [x] 완료 요약 (이 파일)

---

## 관련 문서

1. **DEBUG_MODE_GUIDE.md** - 상세 사용 가이드
2. **debug-mode-example.tsx** - 10가지 실전 예제
3. **FRONTEND_URL_SETUP_COMPLETE.md** - URL 설정
4. **CORS_AND_URL_SECURITY_COMPLETE.md** - CORS 설정

---

## 요약

| 항목 | 내용 |
|------|------|
| **설정 방법** | 환경 변수 (`NEXT_PUBLIC_DEBUG_*`) |
| **true** | JSON 파일 사용 |
| **false** | Django API 사용 |
| **페이지 수** | 14개 독립 제어 |
| **제어 방식** | 자동/명시적/강제 |
| **개발 도구** | log, stats, isDebug 함수 |

---

**구현 완료일**: 2025-02-04  
**버전**: 1.0.0  
**Total Pages**: 14개

🎉 **페이지별 Debug 모드 시스템 구축 완료!**

이제 각 페이지마다 `debug = true`/`false`로 JSON과 Django API를 자유롭게 전환할 수 있습니다!
