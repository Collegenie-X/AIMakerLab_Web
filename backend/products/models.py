"""
제품 (교육 키트) 모델
"""

from django.db import models
from django.conf import settings


def product_image_path(instance, filename):
    """제품 이미지 업로드 경로"""
    return f"products/main/{filename}"


def quote_item_image_path(instance, filename):
    """견적 상품 이미지 업로드 경로"""
    return f"products/quote_items/{filename}"


def video_thumbnail_path(instance, filename):
    """영상 썸네일 업로드 경로"""
    return f"products/video_thumbnails/{filename}"


def classroom_photo_path(instance, filename):
    """수업 사진 업로드 경로"""
    return f"products/classroom_photos/{filename}"


def related_class_image_path(instance, filename):
    """관련 수업 이미지 업로드 경로"""
    return f"products/related_classes/{filename}"


def product_gallery_image_path(instance, filename):
    """제품 갤러리 이미지 업로드 경로"""
    return f"products/gallery/{filename}"


class Product(models.Model):
    """교육 제품 (키트)"""

    product_id = models.CharField("제품 ID", max_length=100, unique=True)
    category = models.CharField("카테고리", max_length=100)
    title = models.CharField("제목", max_length=200)
    short_description = models.TextField("짧은 설명")
    educational_value = models.TextField("교육적 가치")
    classroom_use = models.TextField("수업 활용")

    # 이미지
    main_image = models.ImageField("메인 이미지", upload_to=product_image_path)
    images = models.JSONField(
        "이미지 목록", default=list, help_text="추가 이미지 URL 목록"
    )

    # 가격
    price = models.DecimalField("가격", max_digits=10, decimal_places=2)
    original_price = models.DecimalField(
        "원가", max_digits=10, decimal_places=2, null=True, blank=True
    )
    discount = models.IntegerField("할인율", default=0)

    # 대상 및 수업 정보
    target_grade = models.CharField("대상 학년", max_length=100)
    grade_detail = models.CharField("학년 상세", max_length=100)
    class_time = models.CharField("수업 시간", max_length=100)
    group_size = models.CharField("그룹 크기", max_length=100)

    # 통계
    rating = models.DecimalField("평점", max_digits=3, decimal_places=2, default=0.0)
    reviews = models.IntegerField("리뷰 수", default=0)
    sold_count = models.IntegerField("판매 수", default=0)

    # 배지 및 특징
    badges = models.JSONField("배지 목록", default=list)
    features = models.JSONField("특징 목록", default=list)

    # 순서
    order = models.PositiveIntegerField("정렬 순서", default=0)

    # 타임스탬프
    created_at = models.DateTimeField("생성일", auto_now_add=True)
    updated_at = models.DateTimeField("수정일", auto_now=True)

    class Meta:
        db_table = "products"
        verbose_name = "제품"
        verbose_name_plural = "제품 목록"
        ordering = ["order", "-created_at"]

    def __str__(self):
        return self.title


class ProductReview(models.Model):
    """제품 리뷰"""

    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="product_reviews"
    )
    author = models.CharField("작성자", max_length=100)
    rating = models.IntegerField("평점")
    title = models.CharField("제목", max_length=200)
    content = models.TextField("내용")
    date = models.DateField("작성일")
    helpful_count = models.IntegerField("도움됨 수", default=0)

    class Meta:
        db_table = "product_reviews"
        verbose_name = "제품 리뷰"
        verbose_name_plural = "제품 리뷰 목록"
        ordering = ["-date"]

    def __str__(self):
        return f"{self.product.title} - {self.author}"


class QuoteItem(models.Model):
    """견적 상품"""

    item_id = models.CharField("상품 ID", max_length=100, unique=True)
    category = models.CharField("카테고리", max_length=100)
    name = models.CharField("상품명", max_length=200)
    description = models.TextField("설명")
    price = models.DecimalField("가격", max_digits=10, decimal_places=2)
    image = models.ImageField("이미지", upload_to=quote_item_image_path)
    unit = models.CharField("단위", max_length=50, default="개")
    min_quantity = models.IntegerField("최소 수량", default=1)

    order = models.PositiveIntegerField("정렬 순서", default=0)
    created_at = models.DateTimeField("생성일", auto_now_add=True)
    updated_at = models.DateTimeField("수정일", auto_now=True)

    class Meta:
        db_table = "quote_items"
        verbose_name = "견적 상품"
        verbose_name_plural = "견적 상품 목록"
        ordering = ["category", "order"]

    def __str__(self):
        return self.name


class Video(models.Model):
    """교구 사용 영상"""

    video_id = models.CharField("영상 ID", max_length=100, unique=True)
    title = models.CharField("제목", max_length=200)
    description = models.TextField("설명")
    thumbnail = models.ImageField("썸네일", upload_to=video_thumbnail_path)
    video_url = models.URLField(
        "YouTube 영상 URL", max_length=500, help_text="YouTube 임베드 URL"
    )
    duration = models.CharField("재생 시간", max_length=50)
    category = models.CharField("카테고리", max_length=100)
    tags = models.JSONField("태그", default=list)
    views = models.IntegerField("조회수", default=0)

    order = models.PositiveIntegerField("정렬 순서", default=0)
    created_at = models.DateTimeField("생성일", auto_now_add=True)
    updated_at = models.DateTimeField("수정일", auto_now=True)

    class Meta:
        db_table = "videos"
        verbose_name = "교구 영상"
        verbose_name_plural = "교구 영상 목록"
        ordering = ["order", "-created_at"]

    def __str__(self):
        return self.title


class ClassroomPhoto(models.Model):
    """수업 현장 사진"""

    photo_id = models.CharField("사진 ID", max_length=100, unique=True)
    title = models.CharField("제목", max_length=200)
    description = models.TextField("설명")
    image = models.ImageField("이미지", upload_to=classroom_photo_path)
    category = models.CharField("카테고리", max_length=100)
    date = models.DateField("촬영일")

    order = models.PositiveIntegerField("정렬 순서", default=0)
    created_at = models.DateTimeField("생성일", auto_now_add=True)

    class Meta:
        db_table = "classroom_photos"
        verbose_name = "수업 사진"
        verbose_name_plural = "수업 사진 목록"
        ordering = ["order", "-date"]

    def __str__(self):
        return self.title


class RelatedClass(models.Model):
    """관련 수업"""

    class_id = models.CharField("수업 ID", max_length=100, unique=True)
    title = models.CharField("제목", max_length=200)
    description = models.TextField("설명")
    image = models.ImageField("이미지", upload_to=related_class_image_path)
    duration = models.CharField("기간", max_length=100)
    difficulty = models.CharField("난이도", max_length=50)
    link = models.CharField("링크", max_length=500)

    order = models.PositiveIntegerField("정렬 순서", default=0)
    created_at = models.DateTimeField("생성일", auto_now_add=True)

    class Meta:
        db_table = "related_classes"
        verbose_name = "관련 수업"
        verbose_name_plural = "관련 수업 목록"
        ordering = ["order"]

    def __str__(self):
        return self.title


class QuoteInquiry(models.Model):
    """견적 문의"""

    STATUS_CHOICES = [
        ("pending", "접수대기"),
        ("reviewing", "검토중"),
        ("quoted", "견적발송"),
        ("confirmed", "확정"),
        ("cancelled", "취소"),
    ]

    # 사용자 (선택 - 비회원 문의 가능)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="quote_inquiries",
        verbose_name="사용자",
    )

    # 기본 정보
    title = models.CharField("제목", max_length=200, default="견적 문의")
    status = models.CharField(
        "상태", max_length=50, choices=STATUS_CHOICES, default="pending"
    )

    # 문의자 정보
    requester_name = models.CharField("이름", max_length=100)
    requester_email = models.EmailField("이메일")
    requester_phone = models.CharField("연락처", max_length=50)

    # 기관 정보
    institution_name = models.CharField("기관명", max_length=200, blank=True)
    institution_type = models.CharField("기관 유형", max_length=100, blank=True)

    # 견적 항목 (JSON 형태로 저장)
    quote_items = models.JSONField(
        "견적 항목", default=list, help_text="[{item_id, name, quantity, price}]"
    )

    # 총액
    total_amount = models.DecimalField(
        "총 견적 금액", max_digits=12, decimal_places=2, default=0
    )

    # 추가 요청사항
    message = models.TextField("추가 메시지", blank=True)
    delivery_address = models.CharField("배송지 주소", max_length=500, blank=True)
    preferred_delivery_date = models.DateField("희망 납품일", null=True, blank=True)

    # 관리자 메모
    admin_notes = models.TextField("관리자 메모", blank=True)
    admin_quote_file = models.FileField(
        "견적서 파일", upload_to="quotes/", blank=True, null=True
    )

    # 타임스탬프
    created_at = models.DateTimeField("생성일", auto_now_add=True)
    updated_at = models.DateTimeField("수정일", auto_now=True)

    class Meta:
        db_table = "quote_inquiries"
        verbose_name = "견적 문의"
        verbose_name_plural = "견적 문의 목록"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.requester_name} - {self.total_amount}원 ({self.get_status_display()})"


# ============================================
# 제품 이미지 모델
# ============================================


class ProductImage(models.Model):
    """제품 추가 이미지"""

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="gallery_images",
        verbose_name="제품",
    )
    image = models.ImageField("이미지", upload_to=product_gallery_image_path)
    caption = models.CharField(
        "설명", max_length=200, blank=True, help_text="이미지 설명 (선택사항)"
    )
    order = models.PositiveIntegerField("정렬 순서", default=0)
    created_at = models.DateTimeField("등록일", auto_now_add=True)

    class Meta:
        db_table = "product_images"
        verbose_name = "제품 이미지"
        verbose_name_plural = "제품 이미지 목록"
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.product.title} - 이미지 {self.order}"
