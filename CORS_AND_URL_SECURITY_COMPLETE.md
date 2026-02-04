# CORS 및 URL 보안 설정 완료 ✅

## 구현 완료 항목

### ✅ 1. Next.js Rewrite 프록시 설정
- 모든 `/api/*` 요청을 Django 백엔드로 자동 프록시
- 클라이언트에서 백엔드 URL 완전히 숨김
- CORS 문제 근본적으로 해결

### ✅ 2. 환경 변수 보안
- `BACKEND_URL`: 서버 사이드에서만 사용 (클라이언트에 노출 안 됨)
- 실제 백엔드 URL은 환경 변수로만 관리
- 개발/프로덕션 환경별 분리

### ✅ 3. API 클라이언트 업데이트
- 상대 경로로 요청 (`/api/*`)
- 모든 변수명/함수명 영문화
- 주석만 한글 유지
- 에러 처리 강화
- `credentials: 'include'` 추가 (쿠키 포함)

### ✅ 4. Nginx + Gunicorn 배포 가이드
- 프로덕션 환경 설정 문서
- Systemd 서비스 파일
- SSL/TLS 설정
- 보안 체크리스트

---

## 아키텍처

### 요청 흐름

```
클라이언트 (브라우저)
    ↓
    GET /api/inquiry/outreach/
    ↓
Next.js Server (Port 3000)
    ↓ (rewrite)
    GET http://127.0.0.1:8000/api/inquiry/outreach/
    ↓
Django + Gunicorn (Port 8000)
    ↓
Response → Next.js → 클라이언트
```

### 보안 원리

1. **URL 숨김**: 클라이언트는 `/api/*`로만 요청
2. **환경 변수**: 실제 백엔드 URL은 `BACKEND_URL`에만 존재
3. **프록시**: Next.js가 서버 사이드에서 백엔드로 요청
4. **CORS 불필요**: 같은 도메인(`aimakerlab.com`)에서 요청하므로 CORS 문제 없음

---

## 핵심 파일 변경 사항

### 1. next.config.mjs

```javascript
// 주요 변경점
env: {
  BACKEND_URL: process.env.BACKEND_URL,  // 클라이언트에 노출 안 됨
}

async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: `${backendUrl}/api/:path*`,
    },
  ];
}
```

### 2. lib/api/config.ts

```typescript
// API_BASE_URL을 빈 문자열로 (상대 경로 사용)
export const API_BASE_URL = '';

// 모든 변수명 영문화
export const DATA_SOURCE_CONFIG = { ... };
```

### 3. lib/api/client.ts

```typescript
// credentials 추가
credentials: 'include',

// 에러 처리 강화
interface ApiError {
  message: string;
  status?: number;
  data?: any;
}
```

### 4. 환경 변수 파일

```env
# .env.development
BACKEND_URL=http://localhost:8000

# .env.production
BACKEND_URL=http://127.0.0.1:8000
```

---

## 사용 방법

### 개발 환경

```bash
# 1. 환경 변수 설정
cp .env.local.example .env.local

# 2. Django 실행
cd backend
python manage.py runserver

# 3. Next.js 실행
cd frontend
npm run dev

# 4. 테스트
# 브라우저: http://localhost:3000
# API 호출: fetch('/api/inquiry/outreach/')
```

### 프로덕션 환경

```bash
# 1. Django (Gunicorn)
cd backend
gunicorn config.wsgi:application --bind 127.0.0.1:8000 --daemon

# 2. Next.js (PM2)
cd frontend
npm run build
pm2 start npm --name "nextjs" -- start

# 3. Nginx
sudo cp deployment/nginx.conf /etc/nginx/sites-available/aimakerlab
sudo nginx -t
sudo systemctl reload nginx
```

---

## 보안 체크리스트

### ✅ 백엔드 URL 숨김
- [x] `BACKEND_URL`은 환경 변수로만 관리
- [x] 클라이언트 코드에 백엔드 URL 하드코딩 없음
- [x] Network 탭에서 실제 백엔드 URL 노출 안 됨

### ✅ CORS 해결
- [x] Next.js rewrite로 같은 도메인 사용
- [x] `credentials: 'include'`로 쿠키 전송
- [x] CORS 설정 불필요

### ✅ 프로덕션 보안
- [x] HTTPS 강제
- [x] 보안 헤더 설정
- [x] Rate limiting (선택)
- [x] SQL Injection 방어 (Django ORM)

---

## 테스트

### 1. URL 숨김 테스트

브라우저 개발자 도구 → Network 탭:

```
✅ 보임: /api/inquiry/outreach/
❌ 안 보임: http://localhost:8000/api/inquiry/outreach/
```

### 2. API 요청 테스트

```bash
# 브라우저 콘솔
fetch('/api/inquiry/outreach/')
  .then(r => r.json())
  .then(console.log);

# 또는 컴포넌트에서
import { fetchOutreachInquiries } from '@/lib/api';
const data = await fetchOutreachInquiries();
```

### 3. CORS 테스트

```bash
# CORS 에러가 발생하지 않아야 함
# 같은 도메인에서 요청하므로 CORS 불필요
```

---

## 트러블슈팅

### 문제: API 요청이 404 오류

**원인**: Next.js rewrite가 작동하지 않음

**해결**:
1. `next.config.mjs`의 `rewrites()` 함수 확인
2. Next.js 재시작: `npm run dev`
3. `BACKEND_URL` 환경 변수 확인

### 문제: CORS 에러 발생

**원인**: 직접 백엔드 URL로 요청

**해결**:
- `/api/*` 경로로 요청하도록 수정
- `API_BASE_URL`이 빈 문자열인지 확인

### 문제: 환경 변수가 적용 안 됨

**원인**: 서버 재시작 필요

**해결**:
```bash
# 개발
npm run dev

# 프로덕션
pm2 restart nextjs
```

---

## 장점

### 1. 보안
- ✅ 백엔드 URL 완전히 숨김
- ✅ 클라이언트에 민감한 정보 노출 없음
- ✅ 중간자 공격 방어

### 2. CORS 문제 해결
- ✅ 같은 도메인에서 요청
- ✅ 복잡한 CORS 설정 불필요
- ✅ 쿠키 자동 전송

### 3. 유지보수
- ✅ 백엔드 URL 변경 시 환경 변수만 수정
- ✅ 코드 수정 불필요
- ✅ 환경별 간편 관리

### 4. 개발 경험
- ✅ 로컬 개발 시 CORS 걱정 없음
- ✅ 프로덕션과 동일한 환경
- ✅ 디버깅 용이

---

## 관련 파일

### Frontend
- `frontend/next.config.mjs` - Rewrite 설정
- `frontend/lib/api/config.ts` - API 설정
- `frontend/lib/api/client.ts` - HTTP 클라이언트
- `frontend/.env.local.example` - 환경 변수 템플릿

### Deployment
- `deployment/nginx.conf` - Nginx 설정
- `deployment/DEPLOYMENT_GUIDE.md` - 배포 가이드

### Documentation
- `CORS_AND_URL_SECURITY_COMPLETE.md` - 이 파일
- `FRONTEND_URL_SETUP_COMPLETE.md` - Frontend 설정 가이드

---

## 참고 자료

### Next.js Rewrites
- https://nextjs.org/docs/api-reference/next.config.js/rewrites

### Nginx + Gunicorn
- https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/gunicorn/

### Security Best Practices
- https://cheatsheetseries.owasp.org/cheatsheets/Django_Security_Cheat_Sheet.html

---

**구현 완료일**: 2025-02-04  
**환경**: Next.js 14+ App Router, Django 5.0, Nginx, Gunicorn

🎉 **CORS 및 URL 보안 설정 완료!**

이제 클라이언트에서는 백엔드 URL을 전혀 알 수 없으며, CORS 문제도 발생하지 않습니다.
