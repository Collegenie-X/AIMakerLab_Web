# AI Maker Lab Backend API

Django + Django REST Framework 기반의 AI Maker Lab 백엔드 API 서버입니다.

## 📚 문서 가이드

### 🚀 빠른 시작
1. **[API_GUIDE.md](API_GUIDE.md)** - Django 설정 및 기본 사용법
2. **[API_CRUD_GUIDE.md](API_CRUD_GUIDE.md)** - 전체 REST API curl 명령어 모음 ⭐
3. **[POSTMAN_GUIDE.md](POSTMAN_GUIDE.md)** - Postman 테스트 완벽 가이드
4. **[QUICK_START_API_TESTING.md](QUICK_START_API_TESTING.md)** - 5분 API 테스트

### 📦 Postman Collection
- **[AIMakerLab_API.postman_collection.json](AIMakerLab_API.postman_collection.json)** - Import하여 즉시 테스트 가능

### 🎨 Django Admin 강화 (NEW!)
- **[ADMIN_ENHANCEMENT_COMPLETE.md](ADMIN_ENHANCEMENT_COMPLETE.md)** - Admin 전체 강화 완료 ⭐
  - ✅ 이미지 미리보기 (10개 모델)
  - ✅ 관계형 데이터 inline 관리 (8개)
  - ✅ 시각적 배지 및 컬러 코딩 (50+)
  - ✅ Bulk actions 일괄 작업 (33개)
  - ✅ CSV 내보내기 (한글 지원)
  - ✅ **모든 변수명/함수명 영문, 주석 한글** 🌟

### 📊 통합 대시보드 (NEW! 🔥)
- **[DASHBOARD_GUIDE.md](DASHBOARD_GUIDE.md)** - 대시보드 완벽 가이드 ⭐⭐⭐
  - ✅ **통합 대시보드** - 전체 CRUD 현황 한눈에 보기
  - ✅ **일별/월별 통계** - 기간별 활동 추이 분석
  - ✅ **차트 시각화** - Chart.js 기반 그래프
  - ✅ **모델별 데이터 현황** - 27개 모델 통계
  - ✅ **최근 활동 내역** - 실시간 활동 로그
  - ✅ **상세 통계** - 앱별/카테고리별 상세 분석

### 📖 추가 문서
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - 백엔드 구현 요약
- **[IMAGE_GUIDE.md](IMAGE_GUIDE.md)** - 이미지 업로드 가이드
- **[REQUIREMENTS_GUIDE.md](REQUIREMENTS_GUIDE.md)** - 패키지 설치 완벽 가이드 ⭐

---

## 📋 목차

- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [설치 및 실행](#설치-및-실행)
- [이미지 및 동영상 관리](#이미지-및-동영상-관리)
- [API 엔드포인트](#api-엔드포인트)
- [테스트 계정](#테스트-계정)
- [주요 기능](#주요-기능)

## 🛠 기술 스택

### 핵심 프레임워크
- **Django 5.0.1** - 웹 프레임워크
- **Django REST Framework 3.14.0** - REST API 프레임워크

### 인증 및 보안
- **djangorestframework-simplejwt** - JWT 인증
- **django-allauth** - 소셜 로그인 (카카오, 구글)
- **dj-rest-auth** - REST API 인증

### 기타
- **django-cors-headers** - CORS 처리
- **django-filter** - 필터링 및 검색
- **drf-yasg** - API 문서화 (Swagger)
- **python-decouple** - 환경 변수 관리

### 데이터베이스
- **SQLite3** - 개발 환경 데이터베이스

## 📁 프로젝트 구조

```
backend/
├── config/                    # Django 프로젝트 설정
│   ├── settings.py           # 메인 설정 파일
│   ├── urls.py               # URL 라우팅
│   └── wsgi.py
│
├── accounts/                  # 사용자 인증 앱
│   ├── models.py             # User, EmailVerification 모델
│   ├── serializers.py        # 사용자 Serializers
│   ├── views.py              # 인증 Views
│   ├── admin.py              # Admin 설정
│   └── urls.py               # 인증 URLs
│
├── curriculum/                # 커리큘럼 앱
│   ├── models.py             # 커리큘럼 관련 모델
│   ├── serializers.py        # 커리큘럼 Serializers
│   ├── views.py              # 커리큘럼 ViewSets
│   ├── admin.py              # Admin 설정
│   └── urls.py               # 커리큘럼 URLs
│
├── products/                  # 제품(교육 키트) 앱
│   ├── models.py             # 제품, 리뷰, 견적 모델
│   ├── serializers.py        # 제품 Serializers
│   ├── views.py              # 제품 ViewSets
│   ├── admin.py              # Admin 설정
│   └── urls.py               # 제품 URLs
│
├── gallery/                   # 갤러리 앱
│   ├── models.py             # 학생 작품, 수업 후기 모델
│   ├── serializers.py        # 갤러리 Serializers
│   ├── views.py              # 갤러리 ViewSets
│   ├── admin.py              # Admin 설정
│   └── urls.py               # 갤러리 URLs
│
├── inquiry/                   # 문의 앱
│   ├── models.py             # 수업 문의, 일정 모델
│   ├── serializers.py        # 문의 Serializers
│   ├── views.py              # 문의 ViewSets
│   ├── admin.py              # Admin 설정
│   └── urls.py               # 문의 URLs
│
├── home/                      # 홈페이지 앱
│   ├── models.py             # 히어로 슬라이드, 특징 등 모델
│   ├── serializers.py        # 홈페이지 Serializers
│   ├── views.py              # 홈페이지 ViewSets
│   ├── admin.py              # Admin 설정
│   └── urls.py               # 홈페이지 URLs
│
├── media/                     # 업로드된 미디어 파일
│   ├── home/                 # 홈페이지 이미지
│   ├── curriculum/           # 커리큘럼 이미지
│   ├── products/             # 제품 이미지
│   └── gallery/              # 갤러리 이미지
│
├── static/                    # 정적 파일 (CSS, JS)
├── create_mock_data.py        # Mock 데이터 생성 스크립트
├── create_home_mock_data.py   # 홈페이지 Mock 데이터 생성
├── requirements.txt           # 의존성 패키지 목록
├── .env                       # 환경 변수 (비공개)
├── IMAGE_GUIDE.md             # 이미지 및 동영상 관리 가이드
└── README.md                  # 이 문서
```

## 🚀 설치 및 실행

### 1. 가상환경 생성 및 활성화

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

### 2. 의존성 패키지 설치

```bash
pip install -r requirements.txt
```

### 3. 환경 변수 설정

`.env` 파일을 생성하고 필요한 환경 변수를 설정합니다:

```bash
cp .env.example .env
# .env 파일 편집
```

### 4. 데이터베이스 마이그레이션

```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Mock 데이터 생성

```bash
python create_mock_data.py
```

### 6. 개발 서버 실행

```bash
python manage.py runserver
```

서버가 `http://localhost:8000`에서 실행됩니다.

## 🖼️ 이미지 및 동영상 관리

### 이미지 업로드

모든 이미지 필드는 `ImageField`를 사용하여 실제 파일 업로드를 지원합니다.

#### 업로드 경로

```
media/
├── home/
│   ├── hero_slides/              # 히어로 슬라이드
│   └── curriculum_highlights/     # 커리큘럼 하이라이트
├── curriculum/
│   └── projects/                 # 프로젝트 이미지
├── products/
│   ├── main/                     # 제품 메인 이미지
│   ├── quote_items/              # 견적 상품
│   ├── video_thumbnails/         # 영상 썸네일
│   ├── classroom_photos/         # 수업 사진
│   └── related_classes/          # 관련 수업
└── gallery/
    ├── works/                    # 학생 작품
    └── reviews/                  # 수업 후기
```

#### Django Admin을 통한 업로드

1. http://localhost:8000/admin/ 접속
2. 해당 모델 선택 (예: 홈 > 히어로 슬라이드)
3. 이미지 필드에서 파일 선택 및 업로드
4. 저장

#### API를 통한 업로드

```bash
# 이미지 파일 업로드 예시
curl -X POST http://localhost:8000/api/home/hero-slides/ \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "title=앱 인벤터 코딩" \
  -F "description=블록 코딩으로 나만의 앱 만들기" \
  -F "cta_label=자세히 보기" \
  -F "cta_href=/curriculum/app-inventor" \
  -F "order=1" \
  -F "image=@/path/to/image.jpg"
```

#### 이미지 접근

업로드된 이미지는 다음 URL로 접근:
```
http://localhost:8000/media/{upload_path}/{filename}
```

**예시**: `http://localhost:8000/media/home/hero_slides/hero_slide_1.jpg`

### 동영상 관리

동영상은 **YouTube URL**로 저장됩니다 (파일 업로드 없음).

#### YouTube 임베드 URL 형식

```
https://www.youtube.com/embed/{VIDEO_ID}
```

#### 모델별 동영상 필드

- **IntroVideo** (`home` 앱): `youtube_embed_url`
- **Video** (`products` 앱): `video_url` + `thumbnail` (이미지)

#### 동영상 추가 예시

```python
# 소개 영상 추가
{
  "heading": "AI Maker Lab 소개",
  "subheading": "영상으로 만나보는 우리의 교육 철학",
  "youtube_title": "AI Make Lab Introduction",
  "youtube_embed_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "is_active": true
}
```

### 자세한 가이드

이미지 및 동영상 관리에 대한 자세한 정보는 [IMAGE_GUIDE.md](IMAGE_GUIDE.md)를 참고하세요.

## 📚 API 엔드포인트

### API 문서

- **Swagger UI**: http://localhost:8000/swagger/
- **ReDoc**: http://localhost:8000/redoc/

### 주요 엔드포인트

#### 인증 (Accounts)
- `POST /api/accounts/register/` - 회원가입
- `POST /api/accounts/token/` - JWT 토큰 발급 (로그인)
- `POST /api/accounts/token/refresh/` - JWT 토큰 갱신
- `GET /api/accounts/profile/` - 프로필 조회 (인증 필요)
- `PUT /api/accounts/profile/` - 프로필 수정 (인증 필요)
- `POST /api/accounts/verify-email/` - 이메일 인증
- `POST /api/accounts/logout/` - 로그아웃

#### 커리큘럼 (Curriculum)
- `GET /api/curriculum/` - 커리큘럼 목록
- `GET /api/curriculum/{id}/` - 커리큘럼 상세
- `GET /api/curriculum/category/{category}/` - 카테고리별 조회

#### 제품 (Products)
- `GET /api/products/products/` - 제품 목록
- `GET /api/products/products/{id}/` - 제품 상세
- `GET /api/products/reviews/` - 리뷰 목록
- `GET /api/products/quote-items/` - 견적 상품 목록
- `GET /api/products/videos/` - 교구 영상 목록
- `GET /api/products/classroom-photos/` - 수업 사진 목록
- `GET /api/products/related-classes/` - 관련 수업 목록

#### 갤러리 (Gallery)
- `GET /api/gallery/` - 갤러리 목록
- `GET /api/gallery/{id}/` - 갤러리 상세
- 필터링: `?category=reviews` 또는 `?category=works`

#### 문의 (Inquiry)
- `GET /api/inquiry/inquiries/` - 문의 목록
- `GET /api/inquiry/inquiries/{id}/` - 문의 상세
- `POST /api/inquiry/inquiries/` - 문의 생성
- `GET /api/inquiry/schedules/` - 수업 일정 목록
- `GET /api/inquiry/schedules/{id}/` - 일정 상세

#### 홈페이지 (Home)
- `GET /api/home/data/` - 홈페이지 전체 데이터 (한 번에)
- `GET /api/home/config/` - 홈페이지 설정
- `GET /api/home/hero-slides/` - 히어로 슬라이드 목록
- `GET /api/home/intro-videos/` - 소개 영상 목록
- `GET /api/home/features/` - 특징 목록
- `GET /api/home/curriculum-highlights/` - 커리큘럼 하이라이트 목록
- `GET /api/home/outreach-stats/` - 출강 통계 목록
- `GET /api/home/quick-links/` - 빠른 링크 목록

### 필터링 & 검색

대부분의 목록 API는 다음 기능을 지원합니다:

```bash
# 필터링
GET /api/products/products/?category=아두이노
GET /api/gallery/?category=reviews

# 검색
GET /api/products/products/?search=로봇

# 정렬
GET /api/products/products/?ordering=-sold_count
GET /api/gallery/?ordering=-likes

# 페이지네이션
GET /api/products/products/?page=2
```

## 🔑 테스트 계정

Mock 데이터 생성 후 다음 계정으로 로그인할 수 있습니다:

### 관리자 계정
- **이메일**: `admin@aimakerlab.com`
- **비밀번호**: `admin1234`
- **권한**: 슈퍼유저 (Admin 페이지 접근 가능)

### 일반 사용자
- **이메일**: `user@example.com`
- **비밀번호**: `user1234`
- **권한**: 일반 사용자

### Admin 페이지

http://localhost:8000/admin/

## ✨ 주요 기능

### 1. 사용자 인증
- ✅ 이메일 기반 회원가입/로그인
- ✅ JWT 토큰 인증
- ✅ 이메일 인증 (토큰 기반)
- ✅ 소셜 로그인 (카카오, 구글) - 설정 필요
- ✅ 비밀번호 변경
- ✅ 프로필 관리

### 2. 커리큘럼 관리
- ✅ 5가지 커리큘럼 (AI교육, 앱인벤터, 아두이노, 라즈베리파이, 과학교육)
- ✅ 과정 정보 (기간, 인원, 방식 등)
- ✅ 학습 목표 및 기대 효과
- ✅ 학년별 프로젝트 (3시간, 6시간, 12시간 과정)
- ✅ 학년별 추천
- ✅ 교육 조건
- ✅ 수업 자료 다운로드

### 3. 제품 관리
- ✅ 교육 키트 제품 목록
- ✅ 제품 상세 정보 (가격, 할인, 평점 등)
- ✅ 제품 리뷰
- ✅ 견적 상품 관리
- ✅ 교구 사용 영상
- ✅ 수업 현장 사진
- ✅ 관련 수업 추천

### 4. 갤러리
- ✅ 학생 작품 (works)
- ✅ 수업 후기 (reviews)
- ✅ 조회수, 좋아요, 평점
- ✅ 카테고리별 필터링

### 5. 문의 및 일정
- ✅ 수업 문의 생성
- ✅ 문의 상태 관리 (접수대기, 검토중, 견적발송, 확정, 완료)
- ✅ 수업 일정 조회
- ✅ 주중/주말 일정 구분
- ✅ 정원 관리

### 6. 홈페이지 관리
- ✅ 히어로 슬라이드 (캐러셀)
- ✅ 소개 영상
- ✅ 특징 (6가지)
- ✅ 커리큘럼 하이라이트
- ✅ 출강 통계 (6가지 메트릭)
- ✅ 빠른 링크
- ✅ 전역 설정 관리 (Singleton 패턴)
- ✅ 전체 데이터 한 번에 가져오기 API

### 7. Admin 기능
- ✅ 모든 모델 CRUD 관리
- ✅ 인라인 편집 (관련 모델 함께 편집)
- ✅ 필터링 및 검색
- ✅ 한글 인터페이스

## 🔧 개발 팁

### Mock 데이터 재생성

```bash
# DB 초기화
rm db.sqlite3
python manage.py migrate

# Mock 데이터 생성
python create_mock_data.py
python create_home_mock_data.py
```

### API 테스트

```bash
# curl 사용
curl http://localhost:8000/api/products/products/

# httpie 사용 (설치: pip install httpie)
http GET http://localhost:8000/api/products/products/

# JWT 토큰으로 인증
http POST http://localhost:8000/api/accounts/token/ email=user@example.com password=user1234
http GET http://localhost:8000/api/accounts/profile/ "Authorization: Bearer {access_token}"
```

### 새로운 앱 추가

```bash
# 앱 생성
python manage.py startapp myapp

# settings.py의 INSTALLED_APPS에 추가
# models.py 작성 후 마이그레이션
python manage.py makemigrations
python manage.py migrate
```

## 📝 라이센스

이 프로젝트는 AI Maker Lab의 소유입니다.

## 👥 개발자

AI Maker Lab 개발팀

---

**최종 업데이트**: 2025-10-24

