"""
갤러리 모델 (학생 작품, 수업 후기)
"""

from django.db import models
from django.conf import settings


def gallery_image_path(instance, filename):
    """갤러리 이미지 업로드 경로"""
    category = instance.category
    return f"gallery/{category}/{filename}"


class GalleryItem(models.Model):
    """갤러리 아이템 (작품 또는 후기)"""

    CATEGORY_CHOICES = [
        ("works", "학생 작품"),
        ("reviews", "수업 후기"),
    ]

    # 사용자 (선택 - 비회원도 작성 가능)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='gallery_items',
        verbose_name='사용자'
    )

    item_id = models.IntegerField("아이템 ID", unique=True)
    category = models.CharField("카테고리", max_length=50, choices=CATEGORY_CHOICES)
    title = models.CharField("제목", max_length=200)
    description = models.TextField("설명")
    image = models.ImageField("이미지", upload_to=gallery_image_path)
    emoji = models.CharField("이모지", max_length=10, blank=True)

    # 작성자 정보
    author = models.CharField("작성자", max_length=100)
    date = models.DateField("작성일")

    # 통계
    views = models.IntegerField("조회수", default=0)
    likes = models.IntegerField("좋아요", default=0)
    rating = models.IntegerField("평점", default=5)

    # 추가 정보
    details = models.TextField("상세 내용", blank=True)
    images = models.JSONField("이미지 목록", default=list)
    tags = models.JSONField("태그", default=list)

    # 순서
    order = models.PositiveIntegerField("정렬 순서", default=0)
    
    # 공개 여부
    is_published = models.BooleanField("공개", default=True)

    # 타임스탬프
    created_at = models.DateTimeField("생성일", auto_now_add=True)
    updated_at = models.DateTimeField("수정일", auto_now=True)

    class Meta:
        db_table = "gallery_items"
        verbose_name = "갤러리 아이템"
        verbose_name_plural = "갤러리 아이템 목록"
        ordering = ["category", "order", "-date"]

    def __str__(self):
        return f"{self.get_category_display()} - {self.title}"
