# Django REST API CRUD 완전 가이드 (curl)

Postman 테스트를 위한 전체 API curl 명령어 모음

---

## 목차
1. [기본 설정](#기본-설정)
2. [인증 (Authentication)](#1-인증-authentication)
3. [계정 (Accounts)](#2-계정-accounts)
4. [문의 (Inquiry)](#3-문의-inquiry)
5. [제품 (Products)](#4-제품-products)
6. [갤러리 (Gallery)](#5-갤러리-gallery)
7. [커리큘럼 (Curriculum)](#6-커리큘럼-curriculum)
8. [홈 (Home)](#7-홈-home)

---

## 기본 설정

### 서버 URL
```bash
BASE_URL="http://localhost:8000"
```

### 인증 토큰 설정
```bash
# 로그인 후 받은 토큰
TOKEN="your-jwt-token-here"

# Authorization 헤더
AUTH_HEADER="Authorization: Bearer ${TOKEN}"
```

---

## 1. 인증 (Authentication)

### 1.1 회원가입 (Register)

```bash
curl -X POST "${BASE_URL}/api/accounts/register/" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!",
    "password2": "SecurePass123!",
    "name": "홍길동",
    "phone": "010-1234-5678"
  }'
```

**응답 예시:**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "홍길동"
  },
  "token": {
    "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
  }
}
```

### 1.2 로그인 (Login - JWT Token)

```bash
curl -X POST "${BASE_URL}/api/accounts/token/" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!"
  }'
```

**응답 예시:**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

### 1.3 토큰 갱신 (Refresh Token)

```bash
curl -X POST "${BASE_URL}/api/accounts/token/refresh/" \
  -H "Content-Type: application/json" \
  -d '{
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
  }'
```

### 1.4 이메일 인증

```bash
curl -X POST "${BASE_URL}/api/accounts/verify-email/" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "code": "123456"
  }'
```

### 1.5 로그아웃

```bash
curl -X POST "${BASE_URL}/api/accounts/logout/" \
  -H "${AUTH_HEADER}" \
  -H "Content-Type: application/json" \
  -d '{
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
  }'
```

---

## 2. 계정 (Accounts)

### 2.1 프로필 (Profile)

#### READ - 프로필 조회
```bash
curl -X GET "${BASE_URL}/api/accounts/profile/" \
  -H "${AUTH_HEADER}"
```

#### UPDATE - 프로필 수정
```bash
curl -X PUT "${BASE_URL}/api/accounts/profile/" \
  -H "${AUTH_HEADER}" \
  -H "Content-Type: application/json" \
  -d '{
    "bio": "안녕하세요, AI 교육에 관심이 많은 학생입니다.",
    "interests": ["블록코딩", "ChatGPT", "로봇"],
    "notification_email": true,
    "notification_sms": false
  }'
```

#### UPDATE - 프로필 부분 수정 (PATCH)
```bash
curl -X PATCH "${BASE_URL}/api/accounts/profile/" \
  -H "${AUTH_HEADER}" \
  -H "Content-Type: application/json" \
  -d '{
    "bio": "새로운 소개"
  }'
```

### 2.2 나의 강의 (User Courses)

#### CREATE - 수강 과정 추가
```bash
curl -X POST "${BASE_URL}/api/accounts/user-courses/" \
  -H "${AUTH_HEADER}" \
  -H "Content-Type: application/json" \
  -d '{
    "course_title": "블록코딩 기초",
    "course_category": "블록코딩",
    "instructor": "김강사",
    "start_date": "2025-03-01",
    "end_date": "2025-04-30",
    "total_sessions": 16,
    "status": "enrolled"
  }'
```

#### READ - 수강 과정 목록
```bash
curl -X GET "${BASE_URL}/api/accounts/user-courses/" \
  -H "${AUTH_HEADER}"
```

#### READ - 수강 과정 상세
```bash
curl -X GET "${BASE_URL}/api/accounts/user-courses/1/" \
  -H "${AUTH_HEADER}"
```

#### UPDATE - 수강 과정 수정
```bash
curl -X PUT "${BASE_URL}/api/accounts/user-courses/1/" \
  -H "${AUTH_HEADER}" \
  -H "Content-Type: application/json" \
  -d '{
    "course_title": "블록코딩 기초",
    "course_category": "블록코딩",
    "instructor": "김강사",
    "start_date": "2025-03-01",
    "end_date": "2025-04-30",
    "total_sessions": 16,
    "completed_sessions": 8,
    "progress": 50,
    "status": "in_progress"
  }'
```

#### UPDATE - 수강 과정 부분 수정
```bash
curl -X PATCH "${BASE_URL}/api/accounts/user-courses/1/" \
  -H "${AUTH_HEADER}" \
  -H "Content-Type: application/json" \
  -d '{
    "completed_sessions": 10,
    "progress": 62.5
  }'
```

#### DELETE - 수강 과정 삭제
```bash
curl -X DELETE "${BASE_URL}/api/accounts/user-courses/1/" \
  -H "${AUTH_HEADER}"
```

---

## 3. 문의 (Inquiry)

### 3.1 수업 문의 (Inquiries)

#### CREATE - 수업 문의 생성
```bash
curl -X POST "${BASE_URL}/api/inquiry/inquiries/" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "홍길동",
    "email": "hong@example.com",
    "phone": "010-1234-5678",
    "subject": "블록코딩 수업 문의",
    "message": "초등학교 3학년 학생입니다. 블록코딩 수업을 듣고 싶어요.",
    "inquiry_type": "course",
    "preferred_contact": "phone"
  }'
```

#### READ - 수업 문의 목록
```bash
curl -X GET "${BASE_URL}/api/inquiry/inquiries/" \
  -H "${AUTH_HEADER}"
```

#### READ - 수업 문의 상세
```bash
curl -X GET "${BASE_URL}/api/inquiry/inquiries/1/" \
  -H "${AUTH_HEADER}"
```

#### UPDATE - 수업 문의 수정
```bash
curl -X PUT "${BASE_URL}/api/inquiry/inquiries/1/" \
  -H "${AUTH_HEADER}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "홍길동",
    "email": "hong@example.com",
    "phone": "010-1234-5678",
    "subject": "블록코딩 수업 문의 (수정)",
    "message": "수업 일정이 변경되었습니다.",
    "inquiry_type": "course",
    "preferred_contact": "email",
    "status": "replied"
  }'
```

#### DELETE - 수업 문의 삭제
```bash
curl -X DELETE "${BASE_URL}/api/inquiry/inquiries/1/" \
  -H "${AUTH_HEADER}"
```

### 3.2 출강 문의 (Outreach Inquiries)

#### CREATE - 출강 문의 생성
```bash
curl -X POST "${BASE_URL}/api/inquiry/outreach/" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "서울 강남초등학교 AI 교육 출강 요청",
    "institution": "강남초등학교",
    "institution_type": "elementary",
    "institution_address": "서울시 강남구 테헤란로 123",
    "requester_name": "김선생",
    "requester_email": "teacher@school.com",
    "requester_contact": "010-1234-5678",
    "requester_position": "담당교사",
    "course": "블록코딩",
    "grade": "초등 3-4학년",
    "student_count": 30,
    "preferred_schedule": "주중 오전",
    "preferred_start_date": "2025-03-01",
    "duration": "3개월",
    "session_count": 12,
    "budget": "협의 필요",
    "has_equipment": false,
    "additional_requests": "프로젝터와 노트북이 필요합니다.",
    "status": "pending"
  }'
```

#### READ - 출강 문의 목록
```bash
curl -X GET "${BASE_URL}/api/inquiry/outreach/"
```

#### READ - 출강 문의 필터링 (상태별)
```bash
curl -X GET "${BASE_URL}/api/inquiry/outreach/?status=pending"
curl -X GET "${BASE_URL}/api/inquiry/outreach/?status=reviewing"
curl -X GET "${BASE_URL}/api/inquiry/outreach/?status=quoted"
curl -X GET "${BASE_URL}/api/inquiry/outreach/?status=confirmed"
```

#### READ - 출강 문의 필터링 (기관 유형별)
```bash
curl -X GET "${BASE_URL}/api/inquiry/outreach/?institution_type=elementary"
curl -X GET "${BASE_URL}/api/inquiry/outreach/?institution_type=middle"
curl -X GET "${BASE_URL}/api/inquiry/outreach/?institution_type=high"
```

#### READ - 출강 문의 상세
```bash
curl -X GET "${BASE_URL}/api/inquiry/outreach/1/"
```

#### UPDATE - 출강 문의 수정
```bash
curl -X PUT "${BASE_URL}/api/inquiry/outreach/1/" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "서울 강남초등학교 AI 교육 출강 요청 (수정)",
    "institution": "강남초등학교",
    "institution_type": "elementary",
    "institution_address": "서울시 강남구 테헤란로 123",
    "requester_name": "김선생",
    "requester_email": "teacher@school.com",
    "requester_contact": "010-1234-5678",
    "requester_position": "담당교사",
    "course": "블록코딩",
    "grade": "초등 3-4학년",
    "student_count": 35,
    "preferred_schedule": "주중 오전",
    "preferred_start_date": "2025-03-15",
    "duration": "3개월",
    "session_count": 12,
    "budget": "월 200만원",
    "has_equipment": true,
    "equipment_details": "프로젝터, 노트북 30대 보유",
    "additional_requests": "주차 공간 제공 가능합니다.",
    "status": "reviewing"
  }'
```

#### UPDATE - 출강 문의 부분 수정
```bash
curl -X PATCH "${BASE_URL}/api/inquiry/outreach/1/" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "confirmed",
    "admin_notes": "견적 승인, 2025-03-15 시작 확정"
  }'
```

#### DELETE - 출강 문의 삭제
```bash
curl -X DELETE "${BASE_URL}/api/inquiry/outreach/1/"
```

### 3.3 일정 (Schedules)

#### READ - 일정 목록 (전체)
```bash
curl -X GET "${BASE_URL}/api/inquiry/schedules/"
```

#### READ - 일정 목록 (주중)
```bash
curl -X GET "${BASE_URL}/api/inquiry/schedules/?schedule_type=weekday"
```

#### READ - 일정 목록 (주말)
```bash
curl -X GET "${BASE_URL}/api/inquiry/schedules/?schedule_type=weekend"
```

#### READ - 일정 상세
```bash
curl -X GET "${BASE_URL}/api/inquiry/schedules/1/"
```

---

## 4. 제품 (Products)

### 4.1 제품 (Products)

#### READ - 제품 목록
```bash
curl -X GET "${BASE_URL}/api/products/products/"
```

#### READ - 제품 필터링 (카테고리별)
```bash
curl -X GET "${BASE_URL}/api/products/products/?category=coding"
curl -X GET "${BASE_URL}/api/products/products/?category=ai"
curl -X GET "${BASE_URL}/api/products/products/?category=robot"
```

#### READ - 제품 상세
```bash
curl -X GET "${BASE_URL}/api/products/products/1/"
```

### 4.2 견적 문의 (Quote Inquiries)

#### CREATE - 견적 문의 생성
```bash
curl -X POST "${BASE_URL}/api/products/quote-inquiries/" \
  -H "Content-Type: application/json" \
  -d '{
    "requester_name": "홍길동",
    "requester_email": "hong@example.com",
    "requester_phone": "010-1234-5678",
    "institution": "강남초등학교",
    "institution_type": "school",
    "quote_items": [
      {
        "item_id": "dwai-001",
        "item_name": "DWAI 키트",
        "quantity": 30,
        "unit_price": 50000
      },
      {
        "item_id": "arduino-001",
        "item_name": "아두이노 우노 R3",
        "quantity": 30,
        "unit_price": 25000
      }
    ],
    "total_amount": 2250000,
    "message": "교육용으로 사용할 예정입니다. 할인 가능한가요?",
    "delivery_address": "서울시 강남구 테헤란로 123",
    "delivery_request": "학교 정문 경비실로 배송 부탁드립니다."
  }'
```

#### READ - 견적 문의 목록
```bash
curl -X GET "${BASE_URL}/api/products/quote-inquiries/" \
  -H "${AUTH_HEADER}"
```

#### READ - 견적 문의 필터링 (상태별)
```bash
curl -X GET "${BASE_URL}/api/products/quote-inquiries/?status=pending"
curl -X GET "${BASE_URL}/api/products/quote-inquiries/?status=processing"
curl -X GET "${BASE_URL}/api/products/quote-inquiries/?status=quoted"
```

#### READ - 견적 문의 상세
```bash
curl -X GET "${BASE_URL}/api/products/quote-inquiries/1/"
```

#### UPDATE - 견적 문의 수정
```bash
curl -X PUT "${BASE_URL}/api/products/quote-inquiries/1/" \
  -H "Content-Type: application/json" \
  -d '{
    "requester_name": "홍길동",
    "requester_email": "hong@example.com",
    "requester_phone": "010-1234-5678",
    "institution": "강남초등학교",
    "institution_type": "school",
    "quote_items": [
      {
        "item_id": "dwai-001",
        "item_name": "DWAI 키트",
        "quantity": 35,
        "unit_price": 50000
      }
    ],
    "total_amount": 1750000,
    "message": "수량 변경 요청",
    "delivery_address": "서울시 강남구 테헤란로 123",
    "status": "processing"
  }'
```

#### UPDATE - 견적 문의 부분 수정
```bash
curl -X PATCH "${BASE_URL}/api/products/quote-inquiries/1/" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "quoted",
    "admin_notes": "견적서 발송 완료"
  }'
```

#### DELETE - 견적 문의 삭제
```bash
curl -X DELETE "${BASE_URL}/api/products/quote-inquiries/1/"
```

### 4.3 견적 상품 (Quote Items)

#### READ - 견적 상품 목록
```bash
curl -X GET "${BASE_URL}/api/products/quote-items/"
```

#### READ - 견적 상품 필터링 (카테고리별)
```bash
curl -X GET "${BASE_URL}/api/products/quote-items/?category=coding"
curl -X GET "${BASE_URL}/api/products/quote-items/?category=ai"
curl -X GET "${BASE_URL}/api/products/quote-items/?category=robot"
```

#### READ - 견적 상품 상세
```bash
curl -X GET "${BASE_URL}/api/products/quote-items/1/"
```

### 4.4 영상 (Videos)

#### READ - 영상 목록
```bash
curl -X GET "${BASE_URL}/api/products/videos/"
```

#### READ - 영상 필터링 (카테고리별)
```bash
curl -X GET "${BASE_URL}/api/products/videos/?category=coding"
curl -X GET "${BASE_URL}/api/products/videos/?category=ai"
```

#### READ - 영상 상세
```bash
curl -X GET "${BASE_URL}/api/products/videos/1/"
```

---

## 5. 갤러리 (Gallery)

### 5.1 학생 작품 (Works)

#### CREATE - 작품 등록
```bash
curl -X POST "${BASE_URL}/api/gallery/" \
  -H "${AUTH_HEADER}" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "나만의 AI 챗봇 만들기",
    "description": "ChatGPT API를 활용한 맞춤형 챗봇 프로젝트",
    "category": "works",
    "author": "김학생",
    "grade": "초등 5학년",
    "course": "ChatGPT 크리에이터",
    "tags": ["ChatGPT", "AI", "챗봇"],
    "is_published": true
  }'
```

#### CREATE - 이미지 포함 작품 등록
```bash
curl -X POST "${BASE_URL}/api/gallery/" \
  -H "${AUTH_HEADER}" \
  -F "title=나만의 AI 챗봇 만들기" \
  -F "description=ChatGPT API를 활용한 맞춤형 챗봇 프로젝트" \
  -F "category=works" \
  -F "author=김학생" \
  -F "grade=초등 5학년" \
  -F "image=@/path/to/image.jpg"
```

#### READ - 작품 목록
```bash
curl -X GET "${BASE_URL}/api/gallery/?category=works"
```

#### READ - 작품 상세
```bash
curl -X GET "${BASE_URL}/api/gallery/1/"
```

#### UPDATE - 작품 수정
```bash
curl -X PUT "${BASE_URL}/api/gallery/1/" \
  -H "${AUTH_HEADER}" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "나만의 AI 챗봇 만들기 (수정)",
    "description": "ChatGPT API를 활용한 맞춤형 챗봇 프로젝트 - 기능 추가",
    "category": "works",
    "author": "김학생",
    "grade": "초등 5학년",
    "course": "ChatGPT 크리에이터",
    "tags": ["ChatGPT", "AI", "챗봇", "음성인식"],
    "is_published": true
  }'
```

#### UPDATE - 작품 부분 수정
```bash
curl -X PATCH "${BASE_URL}/api/gallery/1/" \
  -H "${AUTH_HEADER}" \
  -H "Content-Type: application/json" \
  -d '{
    "is_published": false
  }'
```

#### DELETE - 작품 삭제
```bash
curl -X DELETE "${BASE_URL}/api/gallery/1/" \
  -H "${AUTH_HEADER}"
```

### 5.2 수업 후기 (Reviews)

#### CREATE - 후기 등록
```bash
curl -X POST "${BASE_URL}/api/gallery/" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "블록코딩 수업 후기",
    "description": "아이가 너무 재미있어했어요. 다음 수업도 기대됩니다!",
    "category": "reviews",
    "author": "학부모 이OO",
    "course": "블록코딩 기초",
    "rating": 5,
    "is_published": true
  }'
```

#### READ - 후기 목록
```bash
curl -X GET "${BASE_URL}/api/gallery/?category=reviews"
```

#### READ - 후기 상세
```bash
curl -X GET "${BASE_URL}/api/gallery/2/"
```

#### UPDATE - 후기 수정
```bash
curl -X PUT "${BASE_URL}/api/gallery/2/" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "블록코딩 수업 후기 (추가)",
    "description": "아이가 너무 재미있어했어요. 집에서도 계속 연습하고 있습니다!",
    "category": "reviews",
    "author": "학부모 이OO",
    "course": "블록코딩 기초",
    "rating": 5,
    "is_published": true
  }'
```

#### DELETE - 후기 삭제
```bash
curl -X DELETE "${BASE_URL}/api/gallery/2/"
```

---

## 6. 커리큘럼 (Curriculum)

### 6.1 커리큘럼 프로젝트

#### READ - 커리큘럼 목록
```bash
curl -X GET "${BASE_URL}/api/curriculum/projects/"
```

#### READ - 커리큘럼 필터링 (카테고리별)
```bash
curl -X GET "${BASE_URL}/api/curriculum/projects/?category=block_coding"
curl -X GET "${BASE_URL}/api/curriculum/projects/?category=chatgpt"
curl -X GET "${BASE_URL}/api/curriculum/projects/?category=vibe_coding"
curl -X GET "${BASE_URL}/api/curriculum/projects/?category=physical"
```

#### READ - 커리큘럼 필터링 (레벨별)
```bash
curl -X GET "${BASE_URL}/api/curriculum/projects/?level=beginner"
curl -X GET "${BASE_URL}/api/curriculum/projects/?level=intermediate"
curl -X GET "${BASE_URL}/api/curriculum/projects/?level=advanced"
```

#### READ - 커리큘럼 상세
```bash
curl -X GET "${BASE_URL}/api/curriculum/projects/1/"
```

---

## 7. 홈 (Home)

### 7.1 커리큘럼 하이라이트

#### READ - 커리큘럼 하이라이트 목록
```bash
curl -X GET "${BASE_URL}/api/home/curriculum-highlights/"
```

#### READ - 커리큘럼 하이라이트 상세
```bash
curl -X GET "${BASE_URL}/api/home/curriculum-highlights/1/"
```

### 7.2 제품 하이라이트

#### READ - 제품 하이라이트 목록
```bash
curl -X GET "${BASE_URL}/api/home/product-highlights/"
```

#### READ - 제품 하이라이트 상세
```bash
curl -X GET "${BASE_URL}/api/home/product-highlights/1/"
```

---

## Postman 사용 팁

### 1. Environment 변수 설정

Postman에서 다음 환경 변수를 설정하세요:

```
base_url = http://localhost:8000
token = (로그인 후 받은 access token)
```

사용 예시:
```
{{base_url}}/api/inquiry/outreach/
Authorization: Bearer {{token}}
```

### 2. Collection 구조

```
AIMakerLab API/
├── 1. Authentication/
│   ├── Register
│   ├── Login
│   ├── Refresh Token
│   └── Logout
├── 2. Accounts/
│   ├── Profile/
│   │   ├── GET Profile
│   │   ├── PUT Profile
│   │   └── PATCH Profile
│   └── User Courses/
│       ├── POST Create
│       ├── GET List
│       ├── GET Detail
│       ├── PUT Update
│       ├── PATCH Partial Update
│       └── DELETE Delete
├── 3. Inquiry/
│   ├── Inquiries/
│   ├── Outreach/
│   └── Schedules/
├── 4. Products/
│   ├── Products/
│   ├── Quote Inquiries/
│   ├── Quote Items/
│   └── Videos/
├── 5. Gallery/
│   ├── Works/
│   └── Reviews/
└── 6. Curriculum/
    └── Projects/
```

### 3. Pre-request Script

자동으로 Authorization 헤더를 추가하는 스크립트:

```javascript
// Collection 레벨에 추가
pm.request.headers.add({
    key: 'Authorization',
    value: 'Bearer ' + pm.environment.get('token')
});
```

### 4. Tests Script

응답 확인 스크립트:

```javascript
// 상태 코드 확인
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// JSON 응답 확인
pm.test("Response is JSON", function () {
    pm.response.to.be.json;
});

// 토큰 저장 (로그인 시)
if (pm.response.json().access) {
    pm.environment.set("token", pm.response.json().access);
}
```

---

## 테스트 시나리오

### 시나리오 1: 회원가입 ~ 출강 문의

```bash
# 1. 회원가입
curl -X POST "${BASE_URL}/api/accounts/register/" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","password2":"Test123!","name":"테스트"}'

# 2. 로그인
TOKEN=$(curl -X POST "${BASE_URL}/api/accounts/token/" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}' \
  | jq -r '.access')

# 3. 출강 문의 생성
curl -X POST "${BASE_URL}/api/inquiry/outreach/" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "테스트 출강 문의",
    "institution": "테스트 학교",
    "institution_type": "elementary",
    "requester_name": "테스트",
    "requester_email": "test@example.com",
    "requester_contact": "010-0000-0000"
  }'

# 4. 출강 문의 목록 확인
curl -X GET "${BASE_URL}/api/inquiry/outreach/" \
  -H "Authorization: Bearer ${TOKEN}"
```

### 시나리오 2: 견적 문의

```bash
# 1. 견적 상품 목록 조회
curl -X GET "${BASE_URL}/api/products/quote-items/"

# 2. 견적 문의 생성
curl -X POST "${BASE_URL}/api/products/quote-inquiries/" \
  -H "Content-Type: application/json" \
  -d '{
    "requester_name": "테스트",
    "requester_email": "test@example.com",
    "requester_phone": "010-0000-0000",
    "institution": "테스트 학교",
    "quote_items": [
      {"item_id": "dwai-001", "quantity": 10, "unit_price": 50000}
    ],
    "total_amount": 500000
  }'

# 3. 견적 문의 조회
curl -X GET "${BASE_URL}/api/products/quote-inquiries/1/"
```

### 시나리오 3: 갤러리 작품 등록

```bash
# 1. 로그인 (토큰 필요)
TOKEN=$(curl -X POST "${BASE_URL}/api/accounts/token/" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}' \
  | jq -r '.access')

# 2. 작품 등록
curl -X POST "${BASE_URL}/api/gallery/" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "테스트 작품",
    "description": "테스트 작품입니다",
    "category": "works",
    "author": "테스트",
    "grade": "초등 3학년"
  }'

# 3. 작품 목록 조회
curl -X GET "${BASE_URL}/api/gallery/?category=works"
```

---

## 에러 응답

### 400 Bad Request
```json
{
  "error": "Invalid input",
  "details": {
    "email": ["This field is required."],
    "password": ["This field is required."]
  }
}
```

### 401 Unauthorized
```json
{
  "detail": "Authentication credentials were not provided."
}
```

### 403 Forbidden
```json
{
  "detail": "You do not have permission to perform this action."
}
```

### 404 Not Found
```json
{
  "detail": "Not found."
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "An unexpected error occurred."
}
```

---

## 추가 정보

### 페이지네이션
```bash
# 기본 (page 1, 10개씩)
curl -X GET "${BASE_URL}/api/inquiry/outreach/"

# 특정 페이지
curl -X GET "${BASE_URL}/api/inquiry/outreach/?page=2"

# 페이지 크기 변경
curl -X GET "${BASE_URL}/api/inquiry/outreach/?page_size=20"
```

### 정렬
```bash
# 생성일 기준 오름차순
curl -X GET "${BASE_URL}/api/inquiry/outreach/?ordering=created_at"

# 생성일 기준 내림차순
curl -X GET "${BASE_URL}/api/inquiry/outreach/?ordering=-created_at"
```

### 검색
```bash
# 제목 검색
curl -X GET "${BASE_URL}/api/inquiry/outreach/?search=강남초등학교"

# 복합 검색 (제목, 기관명, 요청자 이름)
curl -X GET "${BASE_URL}/api/inquiry/outreach/?search=AI교육"
```

---

**작성일**: 2025-02-04  
**버전**: 1.0.0  
**테스트 환경**: Django 5.0 + DRF 3.14
