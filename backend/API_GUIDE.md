# AIMakerLab Django REST API 가이드

## 목차
1. [개요](#개요)
2. [설치 및 실행](#설치-및-실행)
3. [데이터 소스 설정 (JSON vs Database)](#데이터-소스-설정)
4. [API 엔드포인트](#api-엔드포인트)
5. [Admin 페이지](#admin-페이지)

---

## 개요

AIMakerLab 백엔드는 Django REST Framework를 사용하여 구축된 RESTful API입니다.
각 페이지/기능별로 JSON 파일 또는 Database를 선택하여 데이터를 관리할 수 있습니다.

### 주요 기능
- **계정 관리**: 회원가입, 로그인, 프로필, 나의 강의
- **문의 관리**: 수업 문의, 출강 문의, 일정 관리
- **제품 관리**: 제품, 영상, 견적 문의
- **갤러리 관리**: 학생 작품, 수업 후기

---

## 설치 및 실행

### 1. 가상 환경 설정
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

### 2. 패키지 설치
```bash
pip install -r requirements.txt
```

### 3. 환경 변수 설정
`.env` 파일을 생성하고 다음 내용을 추가합니다:

```env
# Django 설정
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# 데이터베이스 (SQLite 기본)
DATABASE_URL=sqlite:///db.sqlite3

# 이메일 설정
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-password

# 소셜 로그인 (선택)
GOOGLE_CLIENT_ID=
GOOGLE_SECRET_KEY=
KAKAO_CLIENT_ID=
KAKAO_SECRET_KEY=
```

### 4. 데이터베이스 마이그레이션
```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. 슈퍼유저 생성 (Admin 페이지 접근용)
```bash
python manage.py createsuperuser
```

### 6. 서버 실행
```bash
python manage.py runserver
```

서버가 `http://localhost:8000`에서 실행됩니다.

---

## 데이터 소스 설정

각 페이지/기능별로 JSON 파일 또는 Database를 선택할 수 있습니다.

### 설정 방법

`.env` 파일에 다음 환경 변수를 추가합니다:

```env
# True: JSON 파일 사용, False: Database 사용 (기본값: False)

# 계정
USE_JSON_USER_PROFILE=False
USE_JSON_USER_COURSES=False

# 문의
USE_JSON_INQUIRIES=False
USE_JSON_SCHEDULES=False
USE_JSON_OUTREACH=False

# 제품
USE_JSON_PRODUCTS=False
USE_JSON_VIDEOS=False
USE_JSON_QUOTE_ITEMS=False
USE_JSON_QUOTE_INQUIRIES=False
USE_JSON_REVIEWS=False

# 갤러리
USE_JSON_GALLERY_WORKS=False
USE_JSON_GALLERY_REVIEWS=False

# 커리큘럼
USE_JSON_CURRICULUMS=False

# 홈
USE_JSON_HOME_CONTENT=False
```

### 예시

#### 출강 문의만 JSON으로 관리하고 나머지는 DB 사용
```env
USE_JSON_OUTREACH=True
```

#### 갤러리는 JSON, 나머지는 DB 사용
```env
USE_JSON_GALLERY_WORKS=True
USE_JSON_GALLERY_REVIEWS=True
```

### JSON 파일 위치
- JSON 파일은 `frontend/public/` 디렉토리에 위치합니다
- 예: `frontend/public/inquiry/outreach-inquiries.json`

---

## API 엔드포인트

### 1. 계정 (Accounts)

#### 인증
```
POST   /api/accounts/token/              # JWT 토큰 발급
POST   /api/accounts/token/refresh/      # 토큰 갱신
POST   /api/accounts/register/           # 회원가입
POST   /api/accounts/verify-email/       # 이메일 인증
POST   /api/accounts/logout/             # 로그아웃
```

#### 프로필
```
GET    /api/accounts/profile/            # 프로필 조회
PUT    /api/accounts/profile/            # 프로필 수정
```

#### 나의 강의
```
GET    /api/accounts/user-courses/       # 수강 과정 목록
POST   /api/accounts/user-courses/       # 수강 과정 추가
GET    /api/accounts/user-courses/{id}/  # 수강 과정 상세
PUT    /api/accounts/user-courses/{id}/  # 수강 과정 수정
DELETE /api/accounts/user-courses/{id}/  # 수강 과정 삭제
```

### 2. 문의 (Inquiry)

#### 수업 문의
```
GET    /api/inquiry/inquiries/           # 문의 목록
POST   /api/inquiry/inquiries/           # 문의 생성
GET    /api/inquiry/inquiries/{id}/      # 문의 상세
PUT    /api/inquiry/inquiries/{id}/      # 문의 수정
DELETE /api/inquiry/inquiries/{id}/      # 문의 삭제
```

#### 출강 문의
```
GET    /api/inquiry/outreach/            # 출강 문의 목록
POST   /api/inquiry/outreach/            # 출강 문의 생성
GET    /api/inquiry/outreach/{id}/       # 출강 문의 상세
PUT    /api/inquiry/outreach/{id}/       # 출강 문의 수정
DELETE /api/inquiry/outreach/{id}/       # 출강 문의 삭제
```

#### 일정
```
GET    /api/inquiry/schedules/           # 일정 목록
GET    /api/inquiry/schedules/{id}/      # 일정 상세
```

### 3. 제품 (Products)

#### 제품
```
GET    /api/products/products/           # 제품 목록
GET    /api/products/products/{id}/      # 제품 상세
```

#### 견적 문의
```
GET    /api/products/quote-inquiries/    # 견적 문의 목록
POST   /api/products/quote-inquiries/    # 견적 문의 생성
GET    /api/products/quote-inquiries/{id}/  # 견적 문의 상세
PUT    /api/products/quote-inquiries/{id}/  # 견적 문의 수정
DELETE /api/products/quote-inquiries/{id}/  # 견적 문의 삭제
```

#### 견적 상품
```
GET    /api/products/quote-items/        # 견적 상품 목록
```

#### 영상
```
GET    /api/products/videos/             # 영상 목록
GET    /api/products/videos/{id}/        # 영상 상세
```

### 4. 갤러리 (Gallery)

```
GET    /api/gallery/?category=works      # 학생 작품 목록
GET    /api/gallery/?category=reviews    # 수업 후기 목록
POST   /api/gallery/                     # 갤러리 생성
GET    /api/gallery/{id}/                # 갤러리 상세
PUT    /api/gallery/{id}/                # 갤러리 수정
DELETE /api/gallery/{id}/                # 갤러리 삭제
```

---

## Admin 페이지

### 접속
```
http://localhost:8000/admin/
```

### 주요 기능

#### 1. 계정 관리
- **사용자**: 이메일, 이름, 권한 관리
- **사용자 프로필**: 자기소개, 알림 설정, 통계
- **사용자 수강 과정**: 나의 강의 관리

#### 2. 문의 관리
- **수업 문의**: 상태 변경, 내용 확인
- **출강 문의**: 기관별 문의 관리, 상태 변경 일괄 처리
- **수업 일정**: 주중/주말 일정 관리, 정원 관리

#### 3. 제품 관리
- **제품**: 가격, 재고, 이미지 관리
- **견적 문의**: 견적서 파일 업로드, 상태 관리
- **견적 상품**: 카테고리별 상품 관리
- **영상**: YouTube 영상 관리
- **수업 사진**: 수업 현장 사진 관리

#### 4. 갤러리 관리
- **갤러리 항목**: 작품/후기 공개/비공개 설정
- 일괄 공개/비공개 처리

### Admin 페이지 특징

1. **일괄 작업 (Bulk Actions)**
   - 상태 변경 (접수대기 → 검토중 → 견적발송 → 확정)
   - 공개/비공개 전환

2. **필터링**
   - 날짜, 카테고리, 상태별 필터

3. **검색**
   - 이름, 이메일, 제목, 내용 검색

4. **정렬**
   - 생성일, 수정일, 조회수 등

---

## 사용 예시

### 1. 출강 문의 생성 (JSON 모드)

```bash
# .env 파일
USE_JSON_OUTREACH=True
```

```javascript
// Frontend에서 API 호출
const response = await fetch('http://localhost:8000/api/inquiry/outreach/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: '서울 강남초등학교 AI 교육 출강 요청',
    institution: '강남초등학교',
    institution_type: 'elementary',
    requester_name: '김선생',
    requester_email: 'teacher@school.com',
    requester_contact: '010-1234-5678',
    course: '블록코딩',
    grade: '초등 3-4학년',
    // ... 기타 정보
  }),
});
```

데이터는 `frontend/public/inquiry/outreach-inquiries.json`에 저장됩니다.

### 2. 견적 문의 관리 (Database 모드)

```bash
# .env 파일
USE_JSON_QUOTE_INQUIRIES=False
```

Admin 페이지에서 직접 관리하거나 API를 통해 CRUD 작업 수행.

---

## 추가 정보

### Migration 생성
```bash
python manage.py makemigrations accounts inquiry products gallery
```

### Mock 데이터 생성
```bash
python manage.py loaddata fixtures/initial_data.json
```

### API 문서
```
http://localhost:8000/api/swagger/      # Swagger UI
http://localhost:8000/api/redoc/        # ReDoc
```

---

## 문제 해결

### 1. CORS 에러
`config/settings.py`에서 CORS 설정 확인:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
```

### 2. JSON 파일을 찾을 수 없음
`settings.py`에서 FRONTEND_PUBLIC_PATH 확인:
```python
FRONTEND_PUBLIC_PATH = BASE_DIR.parent / 'frontend' / 'public'
```

### 3. Migration 충돌
```bash
python manage.py migrate --fake
python manage.py migrate
```

---

## 라이센스

Copyright © 2025 AIMakerLab. All rights reserved.
