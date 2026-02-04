# Gallery 모델 분리 가이드 📚

## 🎯 변경 사항

### Before (기존 구조)
```python
GalleryItem
├── category: "works" / "reviews"  # 카테고리로만 구분
└── 공통 필드 사용
```

### After (새로운 구조)
```python
StudentWork (학생 작품)
├── 작품 전용 필드
│   ├── student_name, student_grade, student_age
│   ├── technologies, tools, difficulty
│   └── project_period, learning_points

ClassReview (수업 후기)
├── 후기 전용 필드
│   ├── author_name, author_type
│   ├── course_name, course_period, instructor
│   └── overall_rating, teaching_quality, curriculum_quality
```

---

## 🚀 마이그레이션 절차

### 1단계: 기존 데이터 확인

```bash
cd backend
python manage.py shell
```

```python
from gallery.models import GalleryItem
print(f"기존 데이터 수: {GalleryItem.objects.count()}")
```

### 2단계: 기존 마이그레이션 & 테이블 삭제

#### 옵션 A: 데이터 보존 불필요 (권장 - 클린 스타트)

```bash
# 1. 기존 마이그레이션 파일 삭제
rm backend/gallery/migrations/0*.py

# 2. __pycache__ 정리
rm -rf backend/gallery/migrations/__pycache__
rm -rf backend/gallery/__pycache__

# 3. DB에서 gallery 테이블 삭제 (SQLite)
python manage.py dbshell
```

```sql
-- SQLite에서 실행
DROP TABLE IF EXISTS gallery_items;
DROP TABLE IF EXISTS django_migrations WHERE app = 'gallery';
.quit
```

#### 옵션 B: 데이터 백업 필요

```bash
# 1. 기존 데이터 백업
python manage.py dumpdata gallery > gallery_backup.json

# 2. 마이그레이션 초기화 (옵션 A와 동일)

# 3. 나중에 수동으로 데이터 복원
```

### 3단계: 새로운 마이그레이션 생성

```bash
# 1. 마이그레이션 파일 생성
python manage.py makemigrations gallery

# 출력 예시:
# Migrations for 'gallery':
#   gallery/migrations/0001_initial.py
#     - Create model StudentWork
#     - Create model ClassReview
```

### 4단계: 마이그레이션 적용

```bash
python manage.py migrate gallery

# 출력 예시:
# Running migrations:
#   Applying gallery.0001_initial... OK
```

### 5단계: 테이블 생성 확인

```bash
python manage.py dbshell
```

```sql
-- SQLite에서 실행
.tables
-- gallery_student_works
-- gallery_class_reviews

.schema gallery_student_works
.schema gallery_class_reviews
.quit
```

---

## 📊 새로운 API 엔드포인트

### 학생 작품

```bash
# 전체 목록
GET /api/gallery/works/

# 난이도별 필터
GET /api/gallery/works/?difficulty=elementary

# 학년별 필터
GET /api/gallery/works/?student_grade=초등%205학년

# 추천 작품만
GET /api/gallery/works/?is_featured=true

# 검색
GET /api/gallery/works/?search=AI

# 정렬
GET /api/gallery/works/?ordering=-views      # 조회수 많은순
GET /api/gallery/works/?ordering=-likes      # 좋아요 많은순
GET /api/gallery/works/?ordering=-created_date  # 최신순

# 상세 조회
GET /api/gallery/works/{id}/
```

### 수업 후기

```bash
# 전체 목록
GET /api/gallery/reviews/

# 작성자 구분 필터
GET /api/gallery/reviews/?author_type=parent   # 학부모
GET /api/gallery/reviews/?author_type=student  # 학생

# 과정명 필터
GET /api/gallery/reviews/?course_name=AI%20교육

# 평점 필터
GET /api/gallery/reviews/?overall_rating=5

# 추천 여부
GET /api/gallery/reviews/?recommend=true

# 추천 후기만
GET /api/gallery/reviews/?is_featured=true

# 검색
GET /api/gallery/reviews/?search=좋았어요

# 정렬
GET /api/gallery/reviews/?ordering=-overall_rating  # 평점 높은순
GET /api/gallery/reviews/?ordering=-helpful_count   # 도움됨 많은순
GET /api/gallery/reviews/?ordering=-review_date     # 최신순

# 상세 조회
GET /api/gallery/reviews/{id}/
```

---

## 🎨 Admin 페이지

### Admin 메뉴 구조

```
Gallery (갤러리)
├── Student Works (학생 작품 목록)
│   ├── Add Student Work (작품 추가)
│   └── Change Student Work (작품 수정)
│
└── Class Reviews (수업 후기 목록)
    ├── Add Class Review (후기 추가)
    └── Change Class Review (후기 수정)
```

### 학생 작품 Admin

#### 리스트 뷰
- ID, 이미지, 제목, 학생 정보, 난이도
- 사용 기술, 조회수/좋아요, 추천 배지

#### 필터
- 난이도 (입문/초급/중급/고급)
- 학년
- 추천 작품
- 공개/비공개
- 제작 날짜

#### Bulk Actions
- ⭐ 추천 작품으로 표시
- ✗ 추천 해제
- 🔄 참여도 초기화
- ✓ 공개
- ✗ 비공개

### 수업 후기 Admin

#### 리스트 뷰
- ID, 이미지, 제목, 작성자 정보
- 수강 과정, 평점, 추천 여부

#### 필터
- 작성자 구분 (학생/학부모)
- 종합 만족도
- 추천 여부
- 추천 후기
- 공개/비공개
- 작성일

#### Bulk Actions
- ⭐ 추천 후기로 표시
- ✗ 추천 해제
- 🔄 참여도 초기화
- ✓ 공개
- ✗ 비공개
- 📥 CSV 내보내기

---

## 📝 필드 상세 설명

### StudentWork (학생 작품)

| 필드 | 타입 | 설명 | 예시 |
|------|------|------|------|
| work_id | Integer | 작품 ID | 1 |
| title | CharField | 작품명 | "AI 로봇 만들기" |
| description | TextField | 작품 설명 | "인공지능을 활용한..." |
| image | ImageField | 대표 이미지 | work_1.jpg |
| images | JSONField | 추가 이미지 | ["img1.jpg", "img2.jpg"] |
| student_name | CharField | 학생명 | "김철수" |
| student_grade | CharField | 학년 | "초등 5학년" |
| student_age | Integer | 나이 | 11 |
| technologies | JSONField | 사용 기술 | ["Python", "AI"] |
| tools | JSONField | 사용 도구 | ["micro:bit"] |
| difficulty | CharField | 난이도 | "elementary" |
| project_period | CharField | 제작 기간 | "2주" |
| project_description | TextField | 제작 과정 | "먼저 센서를..." |
| learning_points | JSONField | 배운 점 | ["센서 활용"] |
| views | Integer | 조회수 | 150 |
| likes | Integer | 좋아요 | 25 |
| tags | JSONField | 태그 | ["AI", "로봇"] |
| is_featured | Boolean | 추천 작품 | true |
| is_published | Boolean | 공개 | true |

### ClassReview (수업 후기)

| 필드 | 타입 | 설명 | 예시 |
|------|------|------|------|
| review_id | Integer | 후기 ID | 1 |
| title | CharField | 후기 제목 | "아이가 정말 좋아해요" |
| content | TextField | 후기 내용 | "수업이 정말..." |
| image | ImageField | 후기 이미지 | review_1.jpg |
| images | JSONField | 추가 이미지 | ["img1.jpg"] |
| author_name | CharField | 작성자 | "이영희" |
| author_type | CharField | 구분 | "parent" |
| course_name | CharField | 수강 과정 | "AI 기초 과정" |
| course_period | CharField | 수강 기간 | "2024.01~02" |
| instructor | CharField | 강사명 | "김선생님" |
| overall_rating | Integer | 종합 만족도 | 5 |
| teaching_quality | Integer | 강의 품질 | 5 |
| curriculum_quality | Integer | 커리큘럼 | 5 |
| learning_effect | Integer | 학습 효과 | 4 |
| pros | TextField | 좋았던 점 | "친절하고..." |
| cons | TextField | 개선할 점 | "시간이 짧아서..." |
| recommend | Boolean | 추천 여부 | true |
| views | Integer | 조회수 | 200 |
| helpful_count | Integer | 도움됨 수 | 30 |
| is_featured | Boolean | 추천 후기 | true |
| is_published | Boolean | 공개 | true |

---

## 🧪 테스트

### 1. Admin에서 데이터 추가

```bash
# 서버 실행
python manage.py runserver

# Admin 접속
http://localhost:8000/admin/

# 학생 작품 추가
Gallery > Student Works > Add Student Work

# 수업 후기 추가
Gallery > Class Reviews > Add Class Review
```

### 2. API 테스트

```bash
# 작품 목록
curl http://localhost:8000/api/gallery/works/

# 후기 목록
curl http://localhost:8000/api/gallery/reviews/

# 필터링
curl http://localhost:8000/api/gallery/works/?difficulty=elementary
curl http://localhost:8000/api/gallery/reviews/?author_type=parent

# 검색
curl http://localhost:8000/api/gallery/works/?search=AI
curl http://localhost:8000/api/gallery/reviews/?search=좋았어요
```

### 3. Postman Collection

```json
{
  "name": "Gallery API",
  "requests": [
    {
      "name": "List Student Works",
      "method": "GET",
      "url": "http://localhost:8000/api/gallery/works/"
    },
    {
      "name": "List Class Reviews",
      "method": "GET",
      "url": "http://localhost:8000/api/gallery/reviews/"
    },
    {
      "name": "Filter by Difficulty",
      "method": "GET",
      "url": "http://localhost:8000/api/gallery/works/?difficulty=elementary"
    },
    {
      "name": "Filter by Author Type",
      "method": "GET",
      "url": "http://localhost:8000/api/gallery/reviews/?author_type=parent"
    }
  ]
}
```

---

## ⚠️ 주의사항

### 1. 기존 데이터 손실
- 완전히 새로운 구조이므로 기존 GalleryItem 데이터는 사라집니다
- 필요한 경우 백업 후 수동으로 마이그레이션

### 2. 프론트엔드 업데이트 필요
```typescript
// Before
GET /api/gallery/?category=works

// After
GET /api/gallery/works/
```

### 3. 이미지 경로 변경
```
Before: gallery/works/image.jpg
        gallery/reviews/image.jpg

After:  동일 (변경 없음)
```

---

## 🎉 완료 체크리스트

- [ ] 기존 데이터 백업 (필요시)
- [ ] 기존 마이그레이션 삭제
- [ ] 새 마이그레이션 생성
- [ ] 마이그레이션 적용
- [ ] 테이블 생성 확인
- [ ] Admin 페이지 확인
- [ ] API 엔드포인트 테스트
- [ ] 프론트엔드 URL 업데이트

---

**작성일**: 2026-02-04  
**버전**: 2.0.0  
**변경 사항**: 작품/후기 모델 완전 분리
