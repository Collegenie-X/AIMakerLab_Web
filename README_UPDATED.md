# 🤖 AIMakerLab Web

AI 메이커랩 웹사이트 - Django REST API + Next.js 14

## 🎯 프로젝트 개요

AI 교육 플랫폼을 위한 풀스택 웹 애플리케이션입니다.

### 주요 기능
- **계정 관리**: 회원가입, 로그인, 프로필, 나의 강의
- **문의 시스템**: 수업 문의, 출강 문의, 일정 관리
- **제품 관리**: 교육 키트, 영상, 견적 문의
- **갤러리**: 학생 작품, 수업 후기

---

## 🏗️ 기술 스택

### Backend
- **Django 5.0** - 웹 프레임워크
- **Django REST Framework** - RESTful API
- **Gunicorn** - WSGI 서버
- **PostgreSQL/SQLite** - 데이터베이스

### Frontend
- **Next.js 14** - React 프레임워크 (App Router)
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 스타일링

### Deployment
- **Nginx** - 리버스 프록시
- **PM2** - Node.js 프로세스 관리
- **Let's Encrypt** - SSL/TLS

---

## 🚀 빠른 시작

### 1. 저장소 클론

```bash
git clone https://github.com/your-username/AIMakerLab_Web.git
cd AIMakerLab_Web
```

### 2. 백엔드 설정

```bash
cd backend

# 가상 환경 생성
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 패키지 설치
pip install -r requirements.txt

# 환경 변수 설정
cp .env.example .env
# .env 파일 편집

# 마이그레이션
python manage.py makemigrations
python manage.py migrate

# 슈퍼유저 생성
python manage.py createsuperuser

# 서버 실행
python manage.py runserver
```

**Admin 페이지**: http://localhost:8000/admin/

### 3. 프론트엔드 설정

```bash
cd frontend

# 패키지 설치
npm install

# 환경 변수 설정
cp .env.local.example .env.local
# .env.local 파일 편집

# 개발 서버 실행
npm run dev
```

**웹사이트**: http://localhost:3000

---

## ⚙️ Debug 모드 설정

### 개발 환경 (JSON 모드)

```env
# frontend/.env.local

BACKEND_URL=http://localhost:8000

# 모든 페이지 JSON 사용 (debug = true)
NEXT_PUBLIC_DEBUG_INQUIRY_OUTREACH=true
NEXT_PUBLIC_DEBUG_PRODUCTS_PRODUCTS=true
NEXT_PUBLIC_DEBUG_GALLERY_WORKS=true
```

**장점**: 백엔드 없이 빠른 개발 가능

### 프로덕션 환경 (API 모드)

```env
# frontend/.env.production

BACKEND_URL=http://127.0.0.1:8000

# 모든 페이지 API 사용 (debug = false)
NEXT_PUBLIC_DEBUG_INQUIRY_OUTREACH=false
NEXT_PUBLIC_DEBUG_PRODUCTS_PRODUCTS=false
NEXT_PUBLIC_DEBUG_GALLERY_WORKS=false
```

**장점**: 실시간 데이터, 완전한 CRUD

---

## 📋 페이지별 Debug 설정

| 카테고리 | 페이지 | 환경 변수 | 기본값 |
|----------|--------|-----------|--------|
| Accounts | Profile | `NEXT_PUBLIC_DEBUG_ACCOUNTS_PROFILE` | true |
| | Courses | `NEXT_PUBLIC_DEBUG_ACCOUNTS_COURSES` | true |
| Inquiry | Inquiries | `NEXT_PUBLIC_DEBUG_INQUIRY_INQUIRIES` | true |
| | Schedules | `NEXT_PUBLIC_DEBUG_INQUIRY_SCHEDULES` | true |
| | **Outreach** | `NEXT_PUBLIC_DEBUG_INQUIRY_OUTREACH` | true |
| Products | Products | `NEXT_PUBLIC_DEBUG_PRODUCTS_PRODUCTS` | true |
| | Videos | `NEXT_PUBLIC_DEBUG_PRODUCTS_VIDEOS` | true |
| | Quote Items | `NEXT_PUBLIC_DEBUG_PRODUCTS_QUOTE_ITEMS` | true |
| | **Quote Inquiries** | `NEXT_PUBLIC_DEBUG_PRODUCTS_QUOTE_INQUIRIES` | true |
| | Reviews | `NEXT_PUBLIC_DEBUG_PRODUCTS_REVIEWS` | true |
| Gallery | **Works** | `NEXT_PUBLIC_DEBUG_GALLERY_WORKS` | true |
| | **Reviews** | `NEXT_PUBLIC_DEBUG_GALLERY_REVIEWS` | true |
| Curriculum | Curriculums | `NEXT_PUBLIC_DEBUG_CURRICULUM_CURRICULUMS` | true |
| Home | Content | `NEXT_PUBLIC_DEBUG_HOME_CONTENT` | true |

**총 14개 페이지 독립 제어**

---

## 💻 코드 예시

### Server Component

```typescript
import { fetchOutreachInquiries } from '@/lib/api';

export default async function OutreachPage() {
  // 환경 변수에 따라 자동으로 JSON 또는 API 선택
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

### Client Component

```typescript
'use client';

import { DataFetcher, API_ENDPOINTS } from '@/lib/api';

export default function OutreachForm() {
  const handleSubmit = async (data) => {
    await DataFetcher.create(
      API_ENDPOINTS.inquiry.outreach,
      data
    );
  };
  
  return <form onSubmit={handleSubmit}>{/* ... */}</form>;
}
```

---

## 🔐 보안 특징

### 1. URL 보안
- ✅ 백엔드 URL 완전히 숨김
- ✅ Next.js rewrite 프록시
- ✅ 클라이언트는 `/api/*`로만 요청

### 2. CORS 해결
- ✅ 같은 도메인에서 요청
- ✅ Next.js가 서버에서 프록시
- ✅ CORS 설정 불필요

### 3. 환경 변수
- ✅ `BACKEND_URL`은 서버에만 존재
- ✅ 민감한 정보 클라이언트 노출 안 됨
- ✅ 환경별 분리 (dev/prod)

---

## 📚 문서

### 시작 가이드
- **QUICK_START.md** - 5분 안에 시작하기
- **DEBUG_MODE_GUIDE.md** - Debug 모드 완벽 가이드

### 개발 가이드
- **API_GUIDE.md** - Django API 상세 문서
- **URL_MANAGEMENT_GUIDE.md** - URL 관리 가이드

### 배포 가이드
- **DEPLOYMENT_GUIDE.md** - Nginx + Gunicorn 배포
- **CORS_AND_URL_SECURITY_COMPLETE.md** - 보안 설정

### 완료 요약
- **COMPLETE_SYSTEM_SUMMARY.md** - 전체 시스템 요약
- **IMPLEMENTATION_SUMMARY.md** - 백엔드 구현 요약

---

## 📂 프로젝트 구조

```
AIMakerLab_Web/
├── backend/              # Django 백엔드
│   ├── accounts/         # 계정 관리
│   ├── inquiry/          # 문의 시스템
│   ├── products/         # 제품 관리
│   ├── gallery/          # 갤러리
│   ├── curriculum/       # 커리큘럼
│   └── config/           # Django 설정
│
├── frontend/             # Next.js 프론트엔드
│   ├── app/              # App Router 페이지
│   ├── lib/api/          # API 라이브러리
│   ├── components/       # React 컴포넌트
│   └── public/           # 정적 파일 (JSON 포함)
│
├── deployment/           # 배포 설정
│   ├── nginx.conf        # Nginx 설정
│   └── docker-compose.yml # Docker 설정
│
└── documents/            # 문서 및 가이드
```

---

## 🔄 개발 워크플로우

### Phase 1: 프로토타이핑
```env
# debug = true (모든 페이지)
```
- JSON 파일로 빠른 개발
- UI/UX 완성
- 백엔드 불필요

### Phase 2: API 통합
```env
# debug = false (일부 페이지)
```
- 페이지별로 API 연동
- CRUD 기능 테스트
- 에러 처리 구현

### Phase 3: 배포
```env
# debug = false (모든 페이지)
```
- 프로덕션 환경 설정
- Nginx + Gunicorn 배포
- 모니터링 설정

---

## 📊 API 엔드포인트

### Inquiry (문의)
```
GET/POST   /api/inquiry/inquiries/        # 수업 문의
GET/POST   /api/inquiry/outreach/         # 출강 문의
GET        /api/inquiry/schedules/        # 일정
```

### Products (제품)
```
GET        /api/products/products/        # 제품 목록
GET/POST   /api/products/quote-inquiries/ # 견적 문의
GET        /api/products/videos/          # 영상
```

### Gallery (갤러리)
```
GET/POST   /api/gallery/?category=works   # 학생 작품
GET/POST   /api/gallery/?category=reviews # 수업 후기
```

---

## 🛠️ 개발 도구

### Backend
```bash
# Admin 페이지
http://localhost:8000/admin/

# API 문서 (Swagger)
http://localhost:8000/api/swagger/

# Database 관리
python manage.py dbshell
```

### Frontend
```bash
# Debug 설정 확인
import { logDebugConfig } from '@/lib/api';
logDebugConfig();

# 통계 확인
import { getDebugStats } from '@/lib/api';
const stats = getDebugStats();
```

---

## 📦 의존성

### Backend
```bash
Django==5.0.1
djangorestframework==3.14.0
djangorestframework-simplejwt==5.3.1
django-cors-headers==4.3.1
gunicorn==21.2.0
Pillow>=10.4.0
```

### Frontend
```bash
next: 14.x
react: 18.x
typescript: 5.x
tailwindcss: 3.x
```

---

## 🧪 테스트

### Backend
```bash
cd backend
python manage.py test
```

### Frontend
```bash
cd frontend
npm run test
npm run type-check
npm run lint
```

---

## 📄 라이센스

Copyright © 2025 AIMakerLab. All rights reserved.

---

## 👥 기여

문의: info@aimakerlab.com

---

## 📌 Quick Links

- **빠른 시작**: [QUICK_START.md](frontend/QUICK_START.md)
- **API 가이드**: [API_GUIDE.md](backend/API_GUIDE.md)
- **Debug 모드**: [DEBUG_MODE_GUIDE.md](frontend/DEBUG_MODE_GUIDE.md)
- **배포 가이드**: [DEPLOYMENT_GUIDE.md](deployment/DEPLOYMENT_GUIDE.md)
- **전체 요약**: [COMPLETE_SYSTEM_SUMMARY.md](COMPLETE_SYSTEM_SUMMARY.md)

---

**Version**: 1.0.0  
**Last Updated**: 2025-02-04
