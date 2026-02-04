# 🚀 API 테스트 빠른 시작

Postman으로 5분 안에 API 테스트를 시작하세요!

---

## 📦 준비물

- [Postman](https://www.postman.com/downloads/) 설치
- Django 서버 실행 중 (`python manage.py runserver`)

---

## 1️⃣ Postman Collection Import (1분)

### 방법 1: JSON 파일 Import ⭐ 추천

```
1. Postman 실행
2. 좌측 상단 "Import" 버튼 클릭
3. "AIMakerLab_API.postman_collection.json" 파일 선택
4. "Import" 클릭
```

### 방법 2: curl 명령어 사용

`API_CRUD_GUIDE.md`에서 원하는 curl 명령어 복사 → Postman에서 Import → From cURL

---

## 2️⃣ Environment 설정 (30초)

```
1. Postman 좌측 "Environments" 클릭
2. "+" 버튼으로 새 환경 생성
3. 이름: "AIMakerLab Local"
4. 변수 추가:
   - base_url: http://localhost:8000
   - token: (비워둠 - 로그인 시 자동 설정)
5. Save
6. 우측 상단에서 "AIMakerLab Local" 선택
```

---

## 3️⃣ Django 서버 실행 (10초)

```bash
cd backend
python manage.py runserver
```

서버: http://localhost:8000

---

## 4️⃣ API 테스트 시작! (3분)

### Step 1: 회원가입

```
Collection: 1. Authentication → Register
클릭 → Send

응답 확인:
✅ 201 Created
✅ JSON 데이터 (user, token)
```

### Step 2: 로그인

```
Collection: 1. Authentication → Login (Get Token)
클릭 → Send

자동 실행:
✅ token 환경 변수에 자동 저장
✅ 콘솔에 "Token saved" 메시지
```

### Step 3: 출강 문의 생성

```
Collection: 3. Inquiry → Outreach → POST Create Outreach
클릭 → Send

응답 확인:
✅ 201 Created
✅ 생성된 출강 문의 ID 확인
```

### Step 4: 출강 문의 목록 조회

```
Collection: 3. Inquiry → Outreach → GET Outreach List
클릭 → Send

응답 확인:
✅ 200 OK
✅ 방금 생성한 데이터 포함
```

---

## 🎯 완료!

이제 다음 작업을 할 수 있습니다:

### ✅ 전체 CRUD 테스트
- **C**reate: POST 요청
- **R**ead: GET 요청 (List, Detail)
- **U**pdate: PATCH/PUT 요청
- **D**elete: DELETE 요청

### ✅ 각 기능별 테스트
- **Accounts**: 프로필, 나의 강의
- **Inquiry**: 수업 문의, 출강 문의, 일정
- **Products**: 제품, 견적 문의, 영상
- **Gallery**: 학생 작품, 수업 후기
- **Curriculum**: 커리큘럼

---

## 📚 자세한 가이드

### 전체 API 목록
👉 **[API_CRUD_GUIDE.md](API_CRUD_GUIDE.md)** - 모든 API curl 명령어

### Postman 고급 기능
👉 **[POSTMAN_GUIDE.md](POSTMAN_GUIDE.md)** - 자동화, 스크립트, 문제 해결

### Django 설정
👉 **[API_GUIDE.md](API_GUIDE.md)** - 데이터 소스 설정, Admin 사용법

---

## 💡 Tips

### Tip 1: 요청 순서
```
1. Register (회원가입)
2. Login (로그인 → token 자동 저장)
3. 이후 모든 API 자유롭게 테스트
```

### Tip 2: 환경 변수 사용
```
URL: {{base_url}}/api/...
Authorization: Bearer {{token}}
```

### Tip 3: 에러 발생 시
```
1. Django 콘솔 로그 확인
2. Postman 응답 본문 확인
3. POSTMAN_GUIDE.md의 "문제 해결" 섹션 참고
```

---

## 🔗 주요 링크

| 문서 | 설명 |
|------|------|
| **API_CRUD_GUIDE.md** | 전체 REST API curl 명령어 모음 |
| **POSTMAN_GUIDE.md** | Postman 테스트 완벽 가이드 |
| **API_GUIDE.md** | Django 설정 및 기본 사용법 |
| **AIMakerLab_API.postman_collection.json** | Postman Collection 파일 |

---

## ❓ FAQ

### Q: 토큰이 자동 저장 안 됨
**A**: Login 요청의 Tests 탭 확인 → 스크립트 있는지 확인

### Q: 401 Unauthorized 에러
**A**: 
1. Login 먼저 실행
2. token 환경 변수 확인
3. Collection Authorization 설정 확인

### Q: 404 Not Found 에러
**A**: URL 끝에 `/` 확인 (예: `/api/inquiry/outreach/`)

---

**작성일**: 2025-02-04  
**버전**: 1.0.0

**Happy Testing! 🚀**
