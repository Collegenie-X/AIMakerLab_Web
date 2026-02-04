# Postman 테스트 가이드

AIMakerLab API를 Postman에서 테스트하는 완벽한 가이드

---

## 목차
1. [Postman Collection 설치](#1-postman-collection-설치)
2. [환경 변수 설정](#2-환경-변수-설정)
3. [인증 흐름](#3-인증-흐름)
4. [API 테스트 시나리오](#4-api-테스트-시나리오)
5. [자동화 스크립트](#5-자동화-스크립트)
6. [문제 해결](#6-문제-해결)

---

## 1. Postman Collection 설치

### 방법 1: JSON 파일 Import

1. Postman 실행
2. 좌측 상단 **Import** 버튼 클릭
3. `AIMakerLab_API.postman_collection.json` 파일 선택
4. **Import** 클릭

### 방법 2: 수동 생성

Postman에서 새 Collection을 만들고 API_CRUD_GUIDE.md의 curl 명령어를 복사하여 사용

---

## 2. 환경 변수 설정

### Environment 생성

1. Postman 좌측 **Environments** 클릭
2. **+** 버튼으로 새 환경 생성
3. 환경 이름: **AIMakerLab Local**

### 변수 설정

| Variable | Type | Initial Value | Current Value |
|----------|------|---------------|---------------|
| `base_url` | default | `http://localhost:8000` | `http://localhost:8000` |
| `token` | secret | (비워둠) | (로그인 후 자동 설정) |
| `refresh_token` | secret | (비워둠) | (로그인 후 자동 설정) |
| `user_id` | default | (비워둠) | (로그인 후 사용) |

### 프로덕션 환경

추가로 **AIMakerLab Production** 환경 생성:

| Variable | Initial Value |
|----------|---------------|
| `base_url` | `https://api.aimakerlab.com` |

---

## 3. 인증 흐름

### 3.1 회원가입

**Request**: `POST {{base_url}}/api/accounts/register/`

**Body**:
```json
{
  "email": "test@example.com",
  "password": "Test123!",
  "password2": "Test123!",
  "name": "테스트 사용자",
  "phone": "010-1234-5678"
}
```

**응답**:
```json
{
  "user": {
    "id": 1,
    "email": "test@example.com",
    "name": "테스트 사용자"
  },
  "token": {
    "access": "eyJ0eXAiOiJKV1Q...",
    "refresh": "eyJ0eXAiOiJKV1Q..."
  }
}
```

### 3.2 로그인 (JWT 토큰 발급)

**Request**: `POST {{base_url}}/api/accounts/token/`

**Body**:
```json
{
  "email": "test@example.com",
  "password": "Test123!"
}
```

**Tests Script** (자동 토큰 저장):
```javascript
if (pm.response.code === 200) {
    var jsonData = pm.response.json();
    pm.environment.set("token", jsonData.access);
    pm.environment.set("refresh_token", jsonData.refresh);
    console.log("✅ Token saved!");
}
```

### 3.3 Collection 레벨 인증 설정

Collection 설정에서 **Authorization** 탭:

1. **Type**: Bearer Token
2. **Token**: `{{token}}`

이제 모든 요청에 자동으로 Authorization 헤더가 추가됩니다.

---

## 4. API 테스트 시나리오

### 시나리오 1: 회원가입 → 로그인 → 프로필 조회

```
1. POST /api/accounts/register/
   → 새 계정 생성

2. POST /api/accounts/token/
   → 로그인, 토큰 자동 저장

3. GET /api/accounts/profile/
   → 프로필 조회 (인증 필요)
```

### 시나리오 2: 출강 문의 전체 CRUD

```
1. POST /api/inquiry/outreach/
   → 출강 문의 생성
   → 응답에서 id 확인 (예: 1)

2. GET /api/inquiry/outreach/
   → 목록 조회

3. GET /api/inquiry/outreach/1/
   → 상세 조회

4. PATCH /api/inquiry/outreach/1/
   → 상태 업데이트
   Body: {"status": "confirmed"}

5. DELETE /api/inquiry/outreach/1/
   → 삭제
```

### 시나리오 3: 견적 문의

```
1. GET /api/products/quote-items/
   → 견적 상품 목록 조회
   → item_id 확인

2. POST /api/products/quote-inquiries/
   → 견적 문의 생성
   Body: {
     "requester_name": "테스트",
     "requester_email": "test@example.com",
     "quote_items": [
       {"item_id": "dwai-001", "quantity": 10}
     ]
   }

3. GET /api/products/quote-inquiries/
   → 견적 문의 목록

4. PATCH /api/products/quote-inquiries/1/
   → 상태 업데이트
```

### 시나리오 4: 갤러리 작품 등록

```
1. POST /api/accounts/token/
   → 로그인 필수

2. POST /api/gallery/
   → 작품 등록
   Body: {
     "title": "AI 프로젝트",
     "category": "works",
     "author": "김학생"
   }

3. GET /api/gallery/?category=works
   → 작품 목록

4. PATCH /api/gallery/1/
   → 공개/비공개 전환
```

---

## 5. 자동화 스크립트

### Collection Pre-request Script

Collection 레벨에 추가하여 모든 요청에 적용:

```javascript
// 타임스탬프 로깅
console.log("📅 Request Time:", new Date().toISOString());

// base_url 확인
if (!pm.environment.get("base_url")) {
    console.error("❌ base_url not set!");
}
```

### Tests Script (공통)

모든 성공 응답 확인:

```javascript
// 상태 코드 확인
pm.test("Status code is 200 or 201", function () {
    pm.expect(pm.response.code).to.be.oneOf([200, 201]);
});

// JSON 응답 확인
pm.test("Response is JSON", function () {
    pm.response.to.be.json;
});

// 응답 시간 확인
pm.test("Response time < 1000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(1000);
});
```

### 로그인 자동화

로그인 요청의 Tests 탭:

```javascript
if (pm.response.code === 200) {
    var jsonData = pm.response.json();
    
    // 토큰 저장
    pm.environment.set("token", jsonData.access);
    pm.environment.set("refresh_token", jsonData.refresh);
    
    // 사용자 정보 저장
    if (jsonData.user) {
        pm.environment.set("user_id", jsonData.user.id);
        pm.environment.set("user_email", jsonData.user.email);
    }
    
    console.log("✅ Login successful!");
    console.log("📧 Email:", jsonData.user.email);
    console.log("🔑 Token:", jsonData.access.substring(0, 20) + "...");
} else {
    console.error("❌ Login failed!");
}
```

### ID 자동 저장

CREATE 요청의 Tests 탭:

```javascript
if (pm.response.code === 201) {
    var jsonData = pm.response.json();
    
    // 생성된 리소스 ID 저장
    pm.environment.set("last_created_id", jsonData.id);
    
    console.log("✅ Created resource ID:", jsonData.id);
}
```

사용:
```
GET {{base_url}}/api/inquiry/outreach/{{last_created_id}}/
```

### 토큰 만료 시 자동 갱신

401 응답 시 자동으로 토큰 갱신:

```javascript
if (pm.response.code === 401) {
    console.warn("⚠️ Token expired, refreshing...");
    
    pm.sendRequest({
        url: pm.environment.get("base_url") + "/api/accounts/token/refresh/",
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: {
            mode: "raw",
            raw: JSON.stringify({
                refresh: pm.environment.get("refresh_token")
            })
        }
    }, function (err, res) {
        if (!err && res.code === 200) {
            var newToken = res.json().access;
            pm.environment.set("token", newToken);
            console.log("✅ Token refreshed!");
        }
    });
}
```

---

## 6. 문제 해결

### 문제 1: CORS 에러

**증상**:
```
Access to XMLHttpRequest at 'http://localhost:8000/api/...' 
from origin 'http://localhost:3000' has been blocked by CORS policy
```

**해결**:
- Django `settings.py`에서 CORS 설정 확인
- Postman은 브라우저가 아니므로 CORS 영향 없음
- 브라우저 테스트 시에만 발생

### 문제 2: 401 Unauthorized

**증상**:
```json
{
  "detail": "Authentication credentials were not provided."
}
```

**해결**:
```
1. 로그인하여 토큰 발급
2. Environment에 token 변수 확인
3. Collection Authorization 설정 확인
4. 개별 요청 Authorization이 "Inherit from parent" 인지 확인
```

### 문제 3: 404 Not Found

**증상**:
```json
{
  "detail": "Not found."
}
```

**해결**:
```
1. URL 끝에 / 있는지 확인
   ✅ /api/inquiry/outreach/
   ❌ /api/inquiry/outreach

2. ID가 정확한지 확인
   GET /api/inquiry/outreach/999/ (존재하지 않는 ID)

3. base_url 확인
   {{base_url}} = http://localhost:8000
```

### 문제 4: 500 Internal Server Error

**증상**:
```json
{
  "error": "Internal server error"
}
```

**해결**:
```
1. Django 콘솔 로그 확인
2. 필수 필드 누락 여부 확인
3. 데이터 타입 확인 (string vs number)
4. Database 마이그레이션 확인
```

### 문제 5: 토큰이 저장되지 않음

**해결**:
```javascript
// Tests 탭에 다음 스크립트 추가
console.log("Response:", pm.response.json());
console.log("Token:", pm.response.json().access);

// 환경 변수 확인
console.log("Saved token:", pm.environment.get("token"));
```

---

## 추가 팁

### 1. 요청 순서 자동화

Postman Runner 사용:

1. Collection 선택
2. **Run** 버튼 클릭
3. 실행할 요청 순서 선택
4. **Run AIMakerLab API** 클릭

### 2. 데이터 파일 사용

CSV 파일로 여러 테스트 데이터 준비:

**test_data.csv**:
```csv
email,password,name
user1@test.com,Pass123!,사용자1
user2@test.com,Pass123!,사용자2
user3@test.com,Pass123!,사용자3
```

Runner에서 데이터 파일 선택하여 반복 테스트

### 3. Newman (CLI)

Postman Collection을 커맨드라인에서 실행:

```bash
# Newman 설치
npm install -g newman

# Collection 실행
newman run AIMakerLab_API.postman_collection.json \
  --environment AIMakerLab_Local.postman_environment.json

# HTML 리포트 생성
newman run AIMakerLab_API.postman_collection.json \
  --reporters html \
  --reporter-html-export report.html
```

### 4. 환경별 테스트

```bash
# 로컬 환경
base_url = http://localhost:8000

# 개발 환경
base_url = http://dev.aimakerlab.com

# 프로덕션 환경
base_url = https://api.aimakerlab.com
```

환경을 전환하여 동일한 Collection으로 모든 환경 테스트

---

## 체크리스트

### 초기 설정
- [ ] Postman Collection Import
- [ ] Environment 생성 (Local, Production)
- [ ] base_url 설정
- [ ] Django 서버 실행 확인

### 인증 테스트
- [ ] 회원가입 성공
- [ ] 로그인 성공
- [ ] token 환경 변수 자동 저장 확인
- [ ] 인증 필요한 API 호출 성공

### CRUD 테스트
- [ ] CREATE - 201 Created
- [ ] READ List - 200 OK
- [ ] READ Detail - 200 OK
- [ ] UPDATE - 200 OK
- [ ] DELETE - 204 No Content

### 에러 처리
- [ ] 400 Bad Request (잘못된 데이터)
- [ ] 401 Unauthorized (토큰 없음)
- [ ] 404 Not Found (존재하지 않는 리소스)

---

## 빠른 시작 가이드

### 1분 안에 시작하기

```
1. Import Collection
   └─ AIMakerLab_API.postman_collection.json

2. Create Environment
   └─ base_url = http://localhost:8000

3. Django 서버 실행
   └─ python manage.py runserver

4. 테스트 시작!
   └─ 1. Register
   └─ 2. Login (토큰 자동 저장)
   └─ 3. Create Outreach
   └─ 4. GET Outreach List
```

---

## 참고 자료

- **API_CRUD_GUIDE.md** - 전체 curl 명령어
- **API_GUIDE.md** - API 전체 가이드
- **Django 콘솔** - 에러 로그 확인
- **Postman 공식 문서** - https://learning.postman.com/

---

**작성일**: 2025-02-04  
**버전**: 1.0.0

**Happy Testing! 🚀**
