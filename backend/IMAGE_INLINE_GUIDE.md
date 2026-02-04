# 이미지/동영상 인라인 연결 가이드 📸

## 🎯 변경 사항

JSONField 배열 형태로 저장되던 이미지들을 별도 테이블로 분리하고 인라인으로 연결했습니다.

### Before (기존 구조)
```python
class StudentWork(models.Model):
    image = models.ImageField(...)  # 메인 이미지
    images = models.JSONField(default=list)  # ["img1.jpg", "img2.jpg"]
```

### After (새로운 구조)
```python
class StudentWork(models.Model):
    image = models.ImageField(...)  # 메인 이미지
    images = models.JSONField(...)  # 하위 호환성 유지 (선택)

class StudentWorkImage(models.Model):
    work = models.ForeignKey(StudentWork, related_name='gallery_images')
    image = models.ImageField(...)
    caption = models.CharField(...)
    order = models.PositiveIntegerField(...)
```

---

## 📋 새로 추가된 모델

### 1. Gallery 앱

#### StudentWorkImage
- **설명**: 학생 작품의 추가 이미지
- **관계**: StudentWork (ForeignKey)
- **테이블**: `gallery_student_work_images`

**필드:**
| 필드 | 타입 | 설명 |
|------|------|------|
| work | ForeignKey | 작품 참조 |
| image | ImageField | 이미지 파일 |
| caption | CharField | 이미지 설명 (선택) |
| order | PositiveIntegerField | 정렬 순서 |
| created_at | DateTimeField | 등록일 |

#### ClassReviewImage
- **설명**: 수업 후기의 추가 이미지
- **관계**: ClassReview (ForeignKey)
- **테이블**: `gallery_class_review_images`

**필드:**
| 필드 | 타입 | 설명 |
|------|------|------|
| review | ForeignKey | 후기 참조 |
| image | ImageField | 이미지 파일 |
| caption | CharField | 이미지 설명 (선택) |
| order | PositiveIntegerField | 정렬 순서 |
| created_at | DateTimeField | 등록일 |

### 2. Products 앱

#### ProductImage
- **설명**: 제품의 추가 이미지
- **관계**: Product (ForeignKey)
- **테이블**: `product_images`

**필드:**
| 필드 | 타입 | 설명 |
|------|------|------|
| product | ForeignKey | 제품 참조 |
| image | ImageField | 이미지 파일 |
| caption | CharField | 이미지 설명 (선택) |
| order | PositiveIntegerField | 정렬 순서 |
| created_at | DateTimeField | 등록일 |

---

## 🚀 마이그레이션 절차

### 1단계: 마이그레이션 생성

```bash
cd backend
python3 manage.py makemigrations

# 출력 예시:
# Migrations for 'gallery':
#   gallery/migrations/0003_studentworkimage_classreviewimage.py
#     - Create model StudentWorkImage
#     - Create model ClassReviewImage
# Migrations for 'products':
#   products/migrations/0003_productimage.py
#     - Create model ProductImage
```

### 2단계: 마이그레이션 적용

```bash
python3 manage.py migrate

# 출력:
# Running migrations:
#   Applying gallery.0003_studentworkimage_classreviewimage... OK
#   Applying products.0003_productimage... OK
```

### 3단계: 기존 데이터 마이그레이션 (선택)

기존 JSONField의 이미지 URL들을 새 테이블로 옮기려면:

```bash
python3 manage.py shell
```

```python
from gallery.models import StudentWork, StudentWorkImage, ClassReview, ClassReviewImage
from products.models import Product, ProductImage

# 학생 작품 이미지 마이그레이션
for work in StudentWork.objects.all():
    if work.images:  # JSONField에 이미지가 있는 경우
        for idx, img_url in enumerate(work.images):
            StudentWorkImage.objects.create(
                work=work,
                image=img_url,  # 또는 실제 파일 경로
                order=idx + 1
            )
        print(f"✓ {work.title}: {len(work.images)}개 이미지 마이그레이션")

# 수업 후기 이미지 마이그레이션
for review in ClassReview.objects.all():
    if review.images:
        for idx, img_url in enumerate(review.images):
            ClassReviewImage.objects.create(
                review=review,
                image=img_url,
                order=idx + 1
            )
        print(f"✓ {review.title}: {len(review.images)}개 이미지 마이그레이션")

# 제품 이미지 마이그레이션
for product in Product.objects.all():
    if product.images:
        for idx, img_url in enumerate(product.images):
            ProductImage.objects.create(
                product=product,
                image=img_url,
                order=idx + 1
            )
        print(f"✓ {product.title}: {len(product.images)}개 이미지 마이그레이션")

exit()
```

---

## 🎨 Admin 페이지에서 사용하기

### 이미지 추가 방법

#### 1. 작품/후기/제품 수정 페이지에서

1. Admin에서 작품/후기/제품을 선택
2. 하단에 **"작품 이미지"** / **"후기 이미지"** / **"제품 이미지"** 섹션 확인
3. **"다른 추가"** 버튼 클릭
4. 이미지 업로드 및 설명 입력
5. 순서 번호 설정 (작을수록 먼저 표시)
6. **저장** 클릭

#### 2. 인라인에서 바로 추가

- 작품/후기/제품 수정 시 같은 페이지에서 여러 이미지 동시 추가 가능
- 미리보기가 자동으로 표시됨
- 드래그로 순서 변경 가능

### 이미지 미리보기

- **Admin 목록**: 150x150px 썸네일로 표시
- **인라인 테이블**: 각 이미지의 미리보기 제공
- **상세 페이지**: 메인 이미지는 400px 크기로 표시

---

## 📊 API에서 사용하기

### Serializer 수정

새 이미지 모델을 API에 포함하려면:

```python
# gallery/serializers.py

class StudentWorkImageSerializer(serializers.ModelSerializer):
    """작품 이미지 Serializer"""
    
    class Meta:
        model = StudentWorkImage
        fields = ['id', 'image', 'caption', 'order']


class StudentWorkDetailSerializer(serializers.ModelSerializer):
    """작품 상세 Serializer"""
    
    gallery_images = StudentWorkImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = StudentWork
        fields = '__all__'
```

### API 응답 예시

```json
{
  "id": 1,
  "title": "AI 감정 인식 게임",
  "image": "/media/gallery/works/main.jpg",
  "gallery_images": [
    {
      "id": 1,
      "image": "/media/gallery/works/gallery/img1.jpg",
      "caption": "프로젝트 시작 단계",
      "order": 1
    },
    {
      "id": 2,
      "image": "/media/gallery/works/gallery/img2.jpg",
      "caption": "완성된 모습",
      "order": 2
    }
  ]
}
```

---

## 🔧 관리 팁

### 1. 이미지 정렬 순서

- `order` 필드로 표시 순서 제어
- 작은 숫자가 먼저 표시됨
- 같은 order인 경우 ID 순서대로 표시

### 2. 이미지 설명 (Caption)

- 선택사항이지만 권장
- SEO 및 접근성 향상
- 이미지 검색 최적화

### 3. 대량 이미지 관리

```python
# 여러 이미지 한번에 추가
from gallery.models import StudentWork, StudentWorkImage

work = StudentWork.objects.get(work_id=1)

image_files = [
    ('step1.jpg', '1단계: 설계'),
    ('step2.jpg', '2단계: 조립'),
    ('step3.jpg', '3단계: 완성'),
]

for idx, (filename, caption) in enumerate(image_files):
    StudentWorkImage.objects.create(
        work=work,
        image=f'gallery/works/gallery/{filename}',
        caption=caption,
        order=idx + 1
    )
```

### 4. 기존 JSONField 제거 (선택)

모든 이미지를 마이그레이션한 후 JSONField 제거 가능:

```python
# models.py에서 제거 후
python3 manage.py makemigrations
python3 manage.py migrate
```

---

## ⚠️ 주의사항

### 1. 파일 업로드 경로

- **StudentWorkImage**: `media/gallery/works/gallery/`
- **ClassReviewImage**: `media/gallery/reviews/gallery/`
- **ProductImage**: `media/products/gallery/`

### 2. 이미지 용량

- 권장 최대 크기: 2MB
- 권장 해상도: 1920x1080px 이하
- 자동 리사이징 필요 시 Pillow 활용

### 3. 삭제 시 주의

- 작품/후기/제품 삭제 시 관련 이미지 자동 삭제 (`on_delete=CASCADE`)
- 이미지 파일은 수동으로 정리 필요할 수 있음

---

## 🎉 완료 체크리스트

- [ ] 마이그레이션 생성 및 적용
- [ ] 기존 데이터 마이그레이션 (필요시)
- [ ] Admin에서 이미지 추가 테스트
- [ ] 이미지 미리보기 확인
- [ ] API Serializer 업데이트 (필요시)
- [ ] 프론트엔드 연동 확인

---

## 📚 관련 파일

**Models:**
- `backend/gallery/models.py`
- `backend/products/models.py`

**Admin:**
- `backend/gallery/admin.py`
- `backend/products/admin.py`

**Serializers:**
- `backend/gallery/serializers.py`
- `backend/products/serializers.py`

---

**작성일**: 2026-02-04  
**버전**: 1.0.0  
**변경 사항**: 이미지 인라인 연결 기능 추가
