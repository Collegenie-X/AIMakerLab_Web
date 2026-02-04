# Django Admin 강화 완료 ✅

## 개요

모든 backend admin.py 파일을 강화하여 **이미지 미리보기**, **관계형 데이터 inline 관리**, **고급 필터링**, **bulk actions**, **시각적 배지** 등을 추가했습니다.

### 🎯 핵심 개선 사항
- ✅ **모든 변수명/함수명은 영문으로 작성**
- ✅ **모든 주석은 한글로 작성**
- ✅ 이미지 미리보기 기능 추가
- ✅ ForeignKey 관계형 데이터 inline 관리
- ✅ JSONField, 배열 처리 개선
- ✅ 시각적 배지 및 컬러 코딩
- ✅ Bulk actions (일괄 작업)
- ✅ 고급 필터링 및 검색
- ✅ CSV 내보내기
- ✅ 통계 및 집계 정보

---

## 1. Accounts Admin (계정 관리)

### 파일: `backend/accounts/admin.py`

### 강화 내용

#### UserAdmin
- **시각적 배지**
  - `email_verified_badge()`: 이메일 인증 상태 (✓/✗)
  - `social_provider_display()`: 소셜 로그인 아이콘 표시
  
- **Bulk Actions**
  - `verify_email`: 선택한 사용자 이메일 인증
  - `unverify_email`: 이메일 인증 취소
  - `activate_users`: 사용자 활성화
  - `deactivate_users`: 사용자 비활성화

- **추가 필드**
  - `enrollment_count`: 수강 과정 수 표시
  - `date_hierarchy`: 가입일 기준 계층 필터

#### EmailVerificationAdmin
- **시각적 배지**
  - `status_badge()`: 인증 상태 (사용완료/유효/만료)
  - `time_remaining()`: 남은 시간 표시
  
- **Custom 메서드**
  - `is_expired()`: 만료 여부 boolean 필드
  - `token_preview()`: 토큰 앞 20자만 표시

- **Bulk Actions**
  - `mark_as_used`: 사용완료로 표시
  - `mark_as_unused`: 미사용으로 변경

### 영문 변수명 예시
```python
def email_verified_badge(self, obj):  # ✅ 영문 함수명
    """이메일 인증 상태 배지"""  # ✅ 한글 주석
    if obj.email_verified:
        return format_html(...)
```

---

## 2. Inquiry Admin (문의 관리)

### 파일: `backend/inquiry/admin.py`

### 강화 내용

#### InquiryAdmin
- **시각적 배지**
  - `status_badge()`: 상태별 컬러 코딩 (⏳/🔍/💰/✓/✅)
  - `requester_info()`: 문의자 정보 포맷팅
  - `budget_display()`: 예산 표시
  - `days_since_inquiry()`: 경과 일수 (컬러 경고)

- **Bulk Actions**
  - `mark_as_reviewing`: 검토중으로 변경
  - `mark_as_quoted`: 견적발송으로 변경
  - `mark_as_confirmed`: 확정으로 변경
  - `mark_as_completed`: 완료로 변경
  - `export_to_csv`: CSV 내보내기 (한글 포함)

#### ScheduleAdmin
- **시각적 요소**
  - `schedule_type_badge()`: 주중/주말 배지
  - `time_range()`: 시간대 표시
  - `occupancy_bar()`: 정원 현황 프로그레스 바
  - `availability_badge()`: 수강 가능 여부

- **Bulk Actions**
  - `make_available`: 수강 가능으로 변경
  - `make_unavailable`: 수강 불가로 변경
  - `reset_occupancy`: 현재 인원 초기화
  - `mark_as_full`: 만석으로 표시

### 정원 현황 바 예시
```python
def occupancy_bar(self, obj):
    """정원 현황 바"""
    percentage = (obj.current_students / obj.max_students * 100)
    # 100px 프로그레스 바, 색상 자동 변경
    return format_html('<div style="width: 100px; ...">')
```

---

## 3. Products Admin (제품 관리)

### 파일: `backend/products/admin.py`

### 강화 내용

#### ProductAdmin
- **이미지 미리보기**
  - `image_preview()`: 리스트 뷰 썸네일 (50x50px)
  - `main_image_preview()`: 상세 페이지 (300x300px)

- **시각적 배지**
  - `price_display()`: 할인가 표시 (취소선 + 할인가)
  - `discount_badge()`: 할인율 배지
  - `rating_display()`: 별 아이콘 평점
  - `sold_count_badge()`: 판매 수 (베스트셀러 강조)

- **Inline Relations**
  - `ProductReviewInline`: 제품 리뷰 인라인 편집

- **Bulk Actions**
  - `apply_discount_10`: 10% 할인 적용
  - `apply_discount_20`: 20% 할인 적용
  - `remove_discount`: 할인 제거
  - `mark_bestseller`: 베스트셀러로 표시

#### ProductReviewAdmin
- `rating_stars()`: 평점 별 표시
- `reset_helpful_count`: 도움됨 수 초기화

#### QuoteItemAdmin
- `image_preview()`: 견적 상품 이미지 (60x60px)
- `price_display()`: 가격/단위 표시

#### VideoAdmin
- `thumbnail_preview()`: 영상 썸네일 (200px)
- `views_badge()`: 조회수 배지 (🔥 1000+, 👁️ 500+)
- `reset_views`: 조회수 초기화
- `increment_views`: 조회수 +100

#### ClassroomPhotoAdmin
- `image_preview()`: 수업 사진 (80x60px)
- `date_hierarchy`: 촬영일 기준 계층 필터

#### RelatedClassAdmin
- `difficulty_badge()`: 난이도 배지 (입문/초급/중급/고급)

---

## 4. Gallery Admin (갤러리 관리)

### 파일: `backend/gallery/admin.py`

### 강화 내용

#### GalleryItemAdmin
- **이미지 미리보기**
  - `image_preview()`: 리스트 뷰 (60x60px, 둥근 모서리)
  - `main_image_preview()`: 상세 페이지 (400x400px)

- **시각적 배지**
  - `category_badge()`: 작품(🎨)/후기(💬)
  - `engagement_stats()`: 조회수 + 좋아요 통계
  - `rating_stars()`: 평점 별 표시

- **Bulk Actions**
  - `reset_views`: 조회수 초기화
  - `reset_likes`: 좋아요 초기화
  - `increment_engagement`: 참여도 증가 (+50 조회, +10 좋아요)
  - `set_rating_5`: 평점 5점 설정
  - `duplicate_items`: 항목 복제
  - `export_to_csv`: CSV 내보내기

- **자동 설정**
  - `save_model()`: 이모지 없으면 카테고리별 기본 이모지 자동 설정

---

## 5. Curriculum Admin (커리큘럼 관리)

### 파일: `backend/curriculum/admin.py`

### 강화 내용 (관계형 데이터 집중)

#### 계층 구조
```
Curriculum (커리큘럼)
├── CourseInfo (과정 정보) - Inline
├── LearningGoal (학습 목표) - Inline
├── GradeRecommendation (학년별 추천) - Inline
├── EducationRequirement (교육 조건) - Inline
└── CurriculumProject (프로젝트)
    └── ProjectTab (탭: 3시간/6시간/12시간) - Inline
        └── Module (수업 모듈) - Inline
```

#### CurriculumAdmin
- **4개 Inline 관계**
  - `CourseInfoInline`: 과정 정보 (TabularInline)
  - `LearningGoalInline`: 학습 목표 (StackedInline)
  - `GradeRecommendationInline`: 학년별 추천
  - `EducationRequirementInline`: 교육 조건

- **시각적 배지**
  - `category_badge()`: 카테고리별 컬러 (AI/앱인벤터/아두이노/라즈베리/과학)
  - `badge_display()`: 배지 텍스트
  - `related_counts()`: 관련 항목 수 (과정정보/학습목표/프로젝트)

#### CurriculumProjectAdmin
- **이미지 미리보기**
  - `image_preview()`: 프로젝트 이미지 (300x300px)
  
- **Inline Relations**
  - `ProjectTabInline`: 3/6/12시간 과정 탭

- **배지**
  - `difficulty_badge()`: 난이도 (입문/초급/중급/고급)
  - `university_display()`: 대학 연계 표시
  - `tab_count()`: 탭 수

#### ProjectTabAdmin
- **Inline Relations**
  - `ModuleInline`: 수업 모듈 (topics JSONField 포함)

- `module_count()`: 모듈 수 (5+ 초록, 3+ 파랑, 그 외 노랑)

#### ModuleAdmin
- **JSONField 처리**
  - `topics`: 주제 목록 배열
  - `topics_count()`: 주제 수 표시

#### MaterialAdmin
- **배지**
  - `format_badge()`: 파일 형식 (PDF/PPT/DOC/ZIP)
  - `download_link()`: 다운로드 링크 버튼

### JSONField 예시
```python
class LearningGoalInline(admin.StackedInline):
    """학습 목표 인라인"""
    model = LearningGoal
    fields = ['skills']  # JSONField
    help_texts = {
        'skills': '배열 형식: ["기술1", "기술2"]',  # 한글 도움말
    }
```

---

## 6. Home Admin (홈페이지 관리)

### 파일: `backend/home/admin.py`

### 강화 내용

#### HeroSlideAdmin
- **이미지 미리보기**
  - `image_preview()`: 히어로 슬라이드 이미지 (500x300px)

- **배지**
  - `active_badge()`: 활성/비활성 상태

- **Bulk Actions**
  - `activate_slides`: 슬라이드 활성화
  - `deactivate_slides`: 슬라이드 비활성화

#### IntroVideoAdmin
- **YouTube 미리보기**
  - `video_preview()`: iframe으로 YouTube 영상 임베드

#### FeatureAdmin
- **간결한 표시**
  - `active_badge()`: ✓/✗ 체크 표시

#### CurriculumHighlightAdmin
- **이미지 미리보기**
  - `image_preview()`: 커리큘럼 하이라이트 이미지 (300x200px)

- **정보 표시**
  - `info_display()`: 기간 + 인원 정보

#### HomepageConfigAdmin (Singleton)
- **단일 설정 패턴**
  - `has_add_permission()`: 추가 권한 제한
  - `has_delete_permission()`: 삭제 권한 없음
  - `change_view()`: 경고 메시지 표시

- **JSONField 처리**
  - `outreach_grades`: 대상 학년 배열
  - `outreach_card_lines`: 출강 카드 내용 배열
  - `outreach_hashtags`: 해시태그 배열

---

## 🎨 시각적 개선 사항

### 1. 컬러 코딩 시스템

#### 상태 배지
- **초록 (#28a745)**: 완료, 활성, 정상
- **파랑 (#007bff)**: 진행중, 주중, 정보
- **노랑 (#ffc107)**: 대기, 경고, 주의
- **빨강 (#dc3545)**: 만료, 비활성, 긴급
- **회색 (#6c757d)**: 기본, 비활성

#### 배지 스타일
```python
format_html(
    '<span style="background-color: {}; color: white; padding: 3px 10px; '
    'border-radius: 3px; font-weight: bold;">{}</span>',
    color, text
)
```

### 2. 이미지 미리보기

#### 리스트 뷰 썸네일
```python
def image_preview(self, obj):
    """이미지 미리보기 (리스트)"""
    return format_html(
        '<img src="{}" style="width: 60px; height: 60px; '
        'object-fit: cover; border-radius: 8px;" />',
        obj.image.url
    )
```

#### 상세 페이지 프리뷰
```python
def main_image_preview(self, obj):
    """이미지 미리보기 (상세)"""
    return format_html(
        '<img src="{}" style="max-width: 400px; '
        'border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />',
        obj.image.url
    )
```

### 3. 프로그레스 바 (정원 현황)

```python
def occupancy_bar(self, obj):
    """정원 현황 바 (Progress Bar)"""
    percentage = (obj.current_students / obj.max_students * 100)
    color = '#dc3545' if percentage >= 100 else '#28a745'
    
    return format_html(
        '<div style="width: 100px; background-color: #e9ecef;">'
        '<div style="width: {}%; background-color: {};">{}/{}</div>'
        '</div>',
        min(percentage, 100), color, obj.current_students, obj.max_students
    )
```

---

## 📊 Bulk Actions (일괄 작업)

### 공통 패턴

```python
def bulk_action_example(self, request, queryset):
    """선택한 항목 일괄 처리"""
    updated = queryset.update(field=value)
    self.message_user(request, f'{updated}개 항목을 처리했습니다.')

bulk_action_example.short_description = '선택한 항목 처리'
```

### 전체 Bulk Actions 목록

#### Accounts
- 이메일 인증/취소, 사용자 활성화/비활성화

#### Inquiry
- 상태 변경 (5가지), CSV 내보내기

#### Products
- 할인 적용/제거, 베스트셀러 표시, 조회수 관리

#### Gallery
- 참여도 관리, 평점 설정, 복제, CSV 내보내기

#### Home
- 활성화/비활성화 일괄 처리

---

## 🔗 관계형 데이터 (ForeignKey) 관리

### Inline 유형

#### TabularInline (테이블 형태)
- 간단한 필드가 많을 때
- 예: `CourseInfoInline`, `GradeRecommendationInline`

```python
class CourseInfoInline(admin.TabularInline):
    model = CourseInfo
    extra = 1  # 빈 폼 1개 추가
    fields = ['icon', 'label', 'value', 'order']
    ordering = ['order']
```

#### StackedInline (세로 형태)
- 복잡한 필드, TextField가 있을 때
- 예: `LearningGoalInline`, `ModuleInline`

```python
class LearningGoalInline(admin.StackedInline):
    model = LearningGoal
    extra = 1
    fields = ['category', 'title', 'description', 'skills']
```

### 계층 구조 예시

```
ProductAdmin
└── ProductReviewInline (리뷰 인라인 편집)

CurriculumAdmin
├── CourseInfoInline
├── LearningGoalInline
├── GradeRecommendationInline
└── EducationRequirementInline

CurriculumProjectAdmin
└── ProjectTabInline
    └── ModuleInline (중첩 가능)
```

---

## 📋 JSONField 처리

### 배열 형태 필드

```python
# Model
images = models.JSONField('이미지 목록', default=list)
tags = models.JSONField('태그', default=list)
topics = models.JSONField('주제 목록', default=list)

# Admin 입력 예시
["이미지1.jpg", "이미지2.jpg"]
["Python", "Django", "REST API"]
```

### 객체 형태 필드

```python
# Model
quote_items = models.JSONField('견적 상품', default=list)

# Admin 입력 예시
[
  {"item_id": "dwai-001", "quantity": 10, "unit_price": 50000},
  {"item_id": "arduino-001", "quantity": 5, "unit_price": 25000}
]
```

---

## 🔍 고급 필터링

### 다중 필터
```python
list_filter = [
    'status',           # 상태
    'category',         # 카테고리
    'created_at',       # 생성일
    'is_active',        # 활성 여부
]
```

### 계층 필터 (Hierarchy)
```python
date_hierarchy = 'date'  # 날짜 기준 계층 네비게이션
```

### 검색 필드
```python
search_fields = [
    'title',
    'description',
    'author__name',      # 관계 필드 검색
    'tags',              # JSONField 검색
]
```

---

## 📈 통계 및 집계

### 카운트 표시
```python
def related_counts(self, obj):
    """관련 항목 수"""
    count = obj.related_items.count()
    return format_html('<strong>{}</strong> 개', count)
```

### 경과 일수
```python
def days_since_inquiry(self, obj):
    """문의 후 경과 일수"""
    days = (timezone.now().date() - obj.date).days
    if days <= 3:
        return format_html('<span style="color: #ffc107;">{} 일 전</span>', days)
```

---

## 💾 CSV 내보내기

### 한글 인코딩 지원
```python
def export_to_csv(self, request, queryset):
    """CSV로 내보내기 (한글 지원)"""
    import csv
    from django.http import HttpResponse
    
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="data.csv"'
    response.write('\ufeff')  # UTF-8 BOM (Excel 한글 지원)
    
    writer = csv.writer(response)
    writer.writerow(['ID', '제목', '날짜'])  # 한글 헤더
    
    for obj in queryset:
        writer.writerow([obj.id, obj.title, obj.date])
    
    return response
```

---

## 🎯 Best Practices

### 1. 변수명/함수명 규칙
```python
# ✅ 올바른 예시 (영문)
def status_badge(self, obj):
    """상태 배지"""  # ✅ 한글 주석
    return format_html(...)

# ❌ 잘못된 예시 (한글)
def 상태배지(self, obj):
    """상태 배지"""
    return format_html(...)
```

### 2. 이미지 미리보기 패턴
```python
readonly_fields = ['image_preview']

def image_preview(self, obj):
    """이미지 미리보기"""
    if obj.image:
        return format_html('<img src="{}" style="..." />', obj.image.url)
    return '이미지 없음'
image_preview.short_description = '이미지 미리보기'
```

### 3. Inline 최적화
```python
# 성능 개선: extra = 0 (필요시에만 추가)
class ReviewInline(admin.TabularInline):
    model = Review
    extra = 0  # 빈 폼 없음
    can_delete = True
```

### 4. Bulk Actions 메시지
```python
def bulk_action(self, request, queryset):
    """일괄 작업"""
    count = queryset.update(field=value)
    self.message_user(
        request,
        f'{count}개 항목을 처리했습니다.',
        level=messages.SUCCESS
    )
```

---

## 📚 요약

### 강화된 Admin 파일 목록

| 파일 | 모델 수 | Inline 수 | Bulk Actions | 이미지 미리보기 |
|------|---------|-----------|--------------|-----------------|
| `accounts/admin.py` | 2 | 0 | 4 | ✗ |
| `inquiry/admin.py` | 2 | 0 | 9 | ✗ |
| `products/admin.py` | 6 | 1 | 8 | ✅ (5개) |
| `gallery/admin.py` | 1 | 0 | 6 | ✅ (1개) |
| `curriculum/admin.py` | 9 | 7 | 0 | ✅ (1개) |
| `home/admin.py` | 7 | 0 | 6 | ✅ (3개) |
| **Total** | **27** | **8** | **33** | **10개 모델** |

### 주요 개선 통계

- ✅ **27개 모델** Admin 강화
- ✅ **8개 Inline** 관계 관리
- ✅ **33개 Bulk Actions** 추가
- ✅ **10개 이미지 미리보기** 구현
- ✅ **50+ 시각적 배지** 추가
- ✅ **100% 영문 변수명/함수명**
- ✅ **100% 한글 주석 및 description**

---

## 🚀 사용 방법

### 1. Migration 실행
```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```

### 2. Admin 접속
```bash
python manage.py runserver
# http://localhost:8000/admin/
```

### 3. 기능 테스트
- 이미지 업로드 → 미리보기 확인
- Inline 편집 → 관계 데이터 추가
- Bulk Actions → 일괄 작업 실행
- 필터링 → 검색 및 정렬

---

## 📝 추가 개선 가능 사항

### 향후 확장
1. **더 많은 Inline 관계** 추가
2. **Chart.js 통계** 대시보드
3. **Ajax 기반 Inline** 추가/삭제
4. **파일 업로드 진행 바**
5. **드래그 앤 드롭 정렬**

### 성능 최적화
1. `select_related()` / `prefetch_related()` 추가
2. 리스트 페이지 쿼리 최적화
3. 캐싱 전략 도입

---

**작성일**: 2026-02-04  
**버전**: 3.0.0  
**코딩 규칙**: 변수명/함수명 영문, 주석 한글

---

## 🔥 NEW! 통합 대시보드 추가

### 📊 대시보드 기능
- ✅ **통합 대시보드** - 전체 CRUD 현황 한눈에 보기
- ✅ **일별 통계** - 7일~90일 활동 추이 (Chart.js)
- ✅ **월별 통계** - 3~24개월 트렌드 분석
- ✅ **모델별 현황** - 27개 모델 데이터 요약
- ✅ **최근 활동** - 실시간 활동 내역 (최근 10건)
- ✅ **차트 시각화** - Line/Bar 차트

### 📁 추가된 파일
```
config/
├── admin_dashboard.py    # 대시보드 통계 로직
├── custom_admin.py       # 커스텀 AdminSite
└── admin_init.py         # 모델 등록

templates/admin/
├── dashboard.html        # 메인 대시보드
├── dashboard_daily.html  # 일별 통계
├── dashboard_monthly.html # 월별 통계
└── dashboard_stats.html  # 상세 통계
```

### 🎯 사용 방법
```bash
python manage.py runserver
# http://localhost:8000/admin/
```

### 📚 상세 가이드
👉 **[DASHBOARD_GUIDE.md](DASHBOARD_GUIDE.md)** - 대시보드 완벽 가이드

---

🎉 **모든 Django Admin이 강화되었습니다!**
