# Django Backend 구현 완료 요약

## 구현 완료 항목

### 1. 계정 (Accounts) ✅

#### 모델
- `User`: 커스텀 사용자 모델 (이메일 기반 로그인)
- `UserProfile`: 사용자 프로필 추가 정보
- `UserCourseEnrollment`: 사용자 수강 과정 (나의 강의)
- `EmailVerification`: 이메일 인증 토큰

#### API 엔드포인트
- 회원가입, 로그인, 로그아웃
- 이메일 인증
- 프로필 조회/수정
- 나의 강의 CRUD
- 소셜 로그인 (Google, Kakao)

#### Admin 페이지
- 사용자 관리
- 프로필 관리 (알림 설정, 통계)
- 수강 과정 관리

---

### 2. 문의 (Inquiry) ✅

#### 모델
- `Inquiry`: 수업 문의
- `Schedule`: 수업 일정 (주중/주말)
- `OutreachInquiry`: 출강 수업 문의 (신규 추가)

#### API 엔드포인트
- 수업 문의 CRUD
- 출강 문의 CRUD
- 일정 조회

#### Admin 페이지
- 문의 상태 관리 (접수대기 → 검토중 → 견적발송 → 확정)
- 출강 문의 관리 (기관 정보, 상세 정보)
- 일정 관리 (정원 관리, 수강 가능 여부)
- 일괄 작업 (상태 변경)

---

### 3. 제품 (Products) ✅

#### 모델
- `Product`: 교육 제품
- `ProductReview`: 제품 리뷰
- `QuoteItem`: 견적 상품
- `QuoteInquiry`: 견적 문의 (신규 추가)
- `Video`: 교구 제작 영상
- `ClassroomPhoto`: 수업 사진
- `RelatedClass`: 관련 수업

#### API 엔드포인트
- 제품 목록/상세 조회
- 견적 상품 조회
- 견적 문의 CRUD
- 영상 목록 조회
- 수업 사진 조회

#### Admin 페이지
- 제품 관리 (가격, 할인, 이미지)
- 견적 문의 관리 (견적서 파일 업로드)
- 견적 상품 관리
- 영상 관리
- 수업 사진 관리
- 일괄 작업 (상태 변경)

---

### 4. 갤러리 (Gallery) ✅

#### 모델
- `GalleryItem`: 갤러리 아이템 (작품/후기)
  - 사용자 관계 추가
  - 공개/비공개 설정 추가

#### API 엔드포인트
- 갤러리 CRUD
- 카테고리별 필터링 (작품/후기)

#### Admin 페이지
- 갤러리 관리 (공개/비공개)
- 일괄 공개/비공개 처리
- 사용자별 갤러리 조회

---

### 5. 데이터 소스 관리 시스템 ✅

#### 기능
- 페이지별 JSON/DB 선택 가능
- 환경 변수로 간편하게 전환
- 동일한 API 엔드포인트 사용

#### 설정 파일
- `config/settings.py`: 데이터 소스 설정
- 각 앱별 `data_source_utils.py`: JSON/DB 전환 로직

#### 지원 범위
- **Accounts**: 프로필, 수강 과정
- **Inquiry**: 문의, 출강 문의, 일정
- **Products**: 제품, 영상, 견적 문의
- **Gallery**: 작품, 후기

---

## 파일 구조

```
backend/
├── accounts/
│   ├── models.py           # User, UserProfile, UserCourseEnrollment 모델
│   ├── serializers.py      # 각종 Serializers
│   ├── views.py            # ViewSets 및 API Views
│   ├── admin.py            # Admin 페이지 설정
│   ├── urls.py             # URL 라우팅
│   └── data_source_utils.py # 데이터 소스 전환 유틸리티
│
├── inquiry/
│   ├── models.py           # Inquiry, Schedule, OutreachInquiry 모델
│   ├── serializers.py      # 각종 Serializers
│   ├── views.py            # ViewSets
│   ├── admin.py            # Admin 페이지 설정 (일괄 작업 포함)
│   ├── urls.py             # URL 라우팅
│   └── data_source_utils.py
│
├── products/
│   ├── models.py           # Product, QuoteInquiry 등 모델
│   ├── serializers.py      # 각종 Serializers
│   ├── views.py            # ViewSets
│   ├── admin.py            # Admin 페이지 설정
│   ├── urls.py             # URL 라우팅
│   └── data_source_utils.py
│
├── gallery/
│   ├── models.py           # GalleryItem 모델
│   ├── serializers.py      # 각종 Serializers
│   ├── views.py            # ViewSets
│   ├── admin.py            # Admin 페이지 설정
│   ├── urls.py             # URL 라우팅
│   └── data_source_utils.py
│
├── config/
│   ├── settings.py         # Django 설정 (데이터 소스 설정 포함)
│   └── urls.py             # 메인 URL 라우팅
│
├── API_GUIDE.md            # API 사용 가이드
├── IMPLEMENTATION_SUMMARY.md # 구현 요약 (이 파일)
└── requirements.txt        # Python 패키지 목록
```

---

## 주요 기능

### 1. CRUD 완벽 지원
- Create (생성)
- Read (조회)
- Update (수정)
- Delete (삭제)

모든 주요 모델에 대해 완벽한 CRUD API 제공

### 2. Admin 페이지
- 직관적인 UI
- 일괄 작업 (Bulk Actions)
- 필터링 및 검색
- 상태 관리

### 3. 데이터 소스 전환
- 환경 변수로 JSON/DB 선택
- 코드 변경 없이 전환 가능
- 동일한 API 사용

### 4. 인증 및 권한
- JWT 토큰 인증
- 소셜 로그인 (Google, Kakao)
- 이메일 인증
- 사용자별 접근 제어

### 5. 필터링 및 검색
- 카테고리별 필터링
- 상태별 필터링
- 전문 검색
- 날짜 범위 검색

---

## 환경 변수 설정 예시

`.env` 파일:

```env
# Django 기본 설정
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# 데이터 소스 설정 (True: JSON, False: DB)
USE_JSON_USER_PROFILE=False
USE_JSON_USER_COURSES=False
USE_JSON_INQUIRIES=False
USE_JSON_SCHEDULES=False
USE_JSON_OUTREACH=False
USE_JSON_PRODUCTS=False
USE_JSON_VIDEOS=False
USE_JSON_QUOTE_ITEMS=False
USE_JSON_QUOTE_INQUIRIES=False
USE_JSON_REVIEWS=False
USE_JSON_GALLERY_WORKS=False
USE_JSON_GALLERY_REVIEWS=False
```

---

## 다음 단계

### 1. 마이그레이션 실행
```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```

### 2. 슈퍼유저 생성
```bash
python manage.py createsuperuser
```

### 3. 서버 실행
```bash
python manage.py runserver
```

### 4. Admin 페이지 접속
```
http://localhost:8000/admin/
```

### 5. API 문서 확인
```
http://localhost:8000/api/swagger/
```

---

## API 테스트 예시

### 1. 출강 문의 생성
```bash
curl -X POST http://localhost:8000/api/inquiry/outreach/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "서울 초등학교 AI 교육",
    "institution": "강남초등학교",
    "institution_type": "elementary",
    "requester_name": "김선생",
    "requester_email": "teacher@school.com",
    "requester_contact": "010-1234-5678",
    "course": "블록코딩",
    "grade": "초등 3-4학년",
    "participant_count": "21-30명",
    "target_audience": "student",
    "location": "서울시 강남구",
    "address": "서울시 강남구 테헤란로 123",
    "budget": "200만원",
    "content": "3-4학년 대상 블록코딩 교육 문의드립니다."
  }'
```

### 2. 견적 문의 생성
```bash
curl -X POST http://localhost:8000/api/products/quote-inquiries/ \
  -H "Content-Type: application/json" \
  -d '{
    "requester_name": "홍길동",
    "requester_email": "hong@example.com",
    "requester_phone": "010-1234-5678",
    "institution_name": "테스트 학교",
    "quote_items": [
      {"item_id": "smart-farm", "name": "스마트 팜", "quantity": 10, "price": 57000}
    ],
    "total_amount": 570000,
    "message": "빠른 납품 부탁드립니다."
  }'
```

### 3. 갤러리 생성
```bash
curl -X POST http://localhost:8000/api/gallery/ \
  -H "Content-Type: application/json" \
  -F "category=works" \
  -F "title=AI 로봇 작품" \
  -F "description=중학생이 만든 AI 로봇" \
  -F "author=김학생" \
  -F "date=2025-02-04" \
  -F "image=@/path/to/image.jpg"
```

---

## 주요 특징

### 1. 모듈화된 구조
- 앱별로 명확하게 분리
- 재사용 가능한 유틸리티
- 유지보수 용이

### 2. 한글 주석 및 문서화
- 모든 코드에 한글 주석
- 상세한 API 가이드
- 구현 요약 문서

### 3. Django Best Practices
- Class-Based Views (ViewSets)
- Serializers를 통한 데이터 검증
- DRY 원칙 준수

### 4. 확장성
- 쉽게 추가 가능한 모델
- 플러그 가능한 데이터 소스
- 유연한 권한 시스템

---

## 문의 및 지원

구현 완료된 백엔드 시스템은 다음을 완벽히 지원합니다:

✅ **1. Account 부분**: 로그인, 나의 강의, 나의 문의, 나의 갤러리, 프로필 설정
✅ **2. 수업 문의**: 출강 커리큘럼, 출강 문의하기 (Admin에서 직접 관리)
✅ **3. 교육 제품**: 코딩/AI 제품, 교구 제작 영상, 견적 문의
✅ **4. 갤러리**: 작품, 수업 후기

모든 기능은 JSON과 Database 간 전환이 가능하며, Admin 페이지에서 편리하게 관리할 수 있습니다.

---

**구현 완료일**: 2025-02-04  
**버전**: 1.0.0  
**프레임워크**: Django 5.0.1 + Django REST Framework 3.14.0
