# Gallery 마이그레이션 스크립트 📋

## 🚀 빠른 마이그레이션 (5분)

### 1단계: 기존 마이그레이션 삭제

```bash
cd /Users/kimjongphil/Documents/GitHub/AIMakerLab_Web/backend

# 기존 gallery 마이그레이션 파일 삭제
rm -f gallery/migrations/0*.py

# __pycache__ 정리
rm -rf gallery/migrations/__pycache__
rm -rf gallery/__pycache__
```

### 2단계: DB에서 기존 테이블 삭제

```bash
# SQLite DB 직접 삭제 및 재생성 (가장 간단)
rm db.sqlite3

# 모든 앱 마이그레이션
python manage.py migrate
```

**또는** 특정 테이블만 삭제:

```bash
python manage.py dbshell
```

```sql
-- SQLite에서 실행
DROP TABLE IF EXISTS gallery_items;
DELETE FROM django_migrations WHERE app = 'gallery';
.quit
```

### 3단계: 새 마이그레이션 생성

```bash
# 마이그레이션 파일 생성
python manage.py makemigrations gallery

# 출력:
# Migrations for 'gallery':
#   gallery/migrations/0001_initial.py
#     - Create model StudentWork
#     - Create model ClassReview
```

### 4단계: 마이그레이션 적용

```bash
python manage.py migrate gallery

# 출력:
# Running migrations:
#   Applying gallery.0001_initial... OK
```

### 5단계: 슈퍼유저 생성 (DB 재생성 시만)

```bash
# DB를 삭제한 경우에만 필요
python manage.py createsuperuser

# 입력:
# Email: admin@aimakerlab.com
# Name: 관리자
# Password: (비밀번호 입력)
```

### 6단계: 서버 실행 및 확인

```bash
python manage.py runserver

# Admin 접속
# http://localhost:8000/admin/

# Gallery 메뉴 확인
# - Student Works (학생 작품 목록)
# - Class Reviews (수업 후기 목록)
```

---

## 📋 마이그레이션 확인

### 테이블 생성 확인

```bash
python manage.py dbshell
```

```sql
.tables
-- gallery_student_works
-- gallery_class_reviews

-- 스키마 확인
.schema gallery_student_works
.schema gallery_class_reviews

.quit
```

### Django Shell에서 확인

```bash
python manage.py shell
```

```python
from gallery.models import StudentWork, ClassReview

# 모델 확인
print(StudentWork._meta.db_table)  # gallery_student_works
print(ClassReview._meta.db_table)  # gallery_class_reviews

# 필드 확인
print([f.name for f in StudentWork._meta.get_fields()])
print([f.name for f in ClassReview._meta.get_fields()])

exit()
```

---

## 🧪 테스트 데이터 추가

### Admin에서 수동 추가

```
http://localhost:8000/admin/gallery/studentwork/add/
http://localhost:8000/admin/gallery/classreview/add/
```

### Shell에서 추가

```bash
python manage.py shell
```

```python
from gallery.models import StudentWork, ClassReview
from datetime import date

# 학생 작품 추가
work = StudentWork.objects.create(
    work_id=1,
    title="AI 로봇 만들기",
    description="인공지능을 활용한 로봇 프로젝트",
    student_name="김철수",
    student_grade="초등 5학년",
    student_age=11,
    technologies=["Python", "AI", "센서"],
    tools=["micro:bit", "서보모터"],
    difficulty="elementary",
    project_period="2주",
    created_date=date.today(),
    is_featured=True,
)
print(f"작품 추가: {work}")

# 수업 후기 추가
review = ClassReview.objects.create(
    review_id=1,
    title="정말 재미있는 수업이었어요",
    content="아이가 AI에 대해 쉽게 이해할 수 있었습니다.",
    author_name="이영희",
    author_type="parent",
    course_name="AI 기초 과정",
    course_period="2024.01 ~ 2024.02",
    instructor="김선생님",
    overall_rating=5,
    teaching_quality=5,
    curriculum_quality=5,
    learning_effect=5,
    recommend=True,
    review_date=date.today(),
    is_featured=True,
)
print(f"후기 추가: {review}")

exit()
```

---

## 🎯 완료!

이제 다음을 확인하세요:

### ✅ Admin 페이지
```
http://localhost:8000/admin/

Gallery
├── Student Works (학생 작품) ← 새로 생성됨
└── Class Reviews (수업 후기) ← 새로 생성됨
```

### ✅ API 엔드포인트
```bash
# 작품 목록
curl http://localhost:8000/api/gallery/works/

# 후기 목록
curl http://localhost:8000/api/gallery/reviews/
```

---

**작성일**: 2026-02-04  
**상태**: 마이그레이션 준비 완료
