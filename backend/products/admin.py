"""
제품 관리 Admin
Enhanced with image preview, inline reviews, and advanced filtering
"""

from django.contrib import admin
from django.utils.html import format_html
from django.db.models import Avg, Count
from .models import (
    Product,
    ProductReview,
    ProductImage,
    QuoteItem,
    Video,
    ClassroomPhoto,
    RelatedClass,
)


class ProductImageInline(admin.TabularInline):
    """제품 이미지 인라인 (Product Image Inline)"""

    model = ProductImage
    extra = 1
    fields = ["image", "image_preview", "caption", "order"]
    readonly_fields = ["image_preview"]

    def image_preview(self, obj):
        """이미지 미리보기"""
        if obj.image:
            return format_html(
                '<img src="{}" style="max-width: 150px; max-height: 150px; '
                'border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />',
                obj.image.url,
            )
        return "이미지 없음"

    image_preview.short_description = "미리보기"


class ProductReviewInline(admin.TabularInline):
    """제품 리뷰 인라인 (Product Review Inline)"""

    model = ProductReview
    extra = 0
    fields = ["author", "rating", "title", "date", "helpful_count"]
    readonly_fields = ["date"]
    can_delete = True


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    """제품 관리 (Product Management Admin)"""

    list_display = [
        "product_id",
        "image_preview",
        "title",
        "category",
        "price_display",
        "discount_badge",
        "rating_display",
        "sold_count_badge",
        "target_grade",
        "order",
    ]

    list_filter = [
        "category",
        "target_grade",
        "discount",
        "created_at",
    ]

    search_fields = [
        "title",
        "short_description",
        "product_id",
        "educational_value",
    ]

    ordering = ["order", "-sold_count"]

    list_editable = ["order"]

    list_per_page = 30

    inlines = [ProductImageInline, ProductReviewInline]

    fieldsets = (
        (
            "기본 정보 (Basic Info)",
            {
                "fields": ("product_id", "category", "title", "short_description"),
                "classes": ("wide",),
            },
        ),
        (
            "교육 정보 (Educational Info)",
            {
                "fields": ("educational_value", "classroom_use"),
                "classes": ("collapse",),
            },
        ),
        (
            "이미지 (Images)",
            {
                "fields": ("main_image", "main_image_preview", "images"),
                "classes": ("wide",),
            },
        ),
        (
            "가격 (Pricing)",
            {
                "fields": ("price", "original_price", "discount"),
                "classes": ("wide",),
            },
        ),
        (
            "대상 및 수업 (Target & Class)",
            {
                "fields": ("target_grade", "grade_detail", "class_time", "group_size"),
                "classes": ("wide",),
            },
        ),
        (
            "통계 (Statistics)",
            {
                "fields": ("rating", "reviews", "sold_count"),
                "classes": ("collapse",),
            },
        ),
        (
            "추가 정보 (Additional Info)",
            {
                "fields": ("badges", "features", "order"),
                "classes": ("collapse",),
            },
        ),
    )

    readonly_fields = ["main_image_preview", "created_at", "updated_at"]

    # Custom display methods
    def image_preview(self, obj):
        """이미지 미리보기"""
        if obj.main_image:
            return format_html(
                '<img src="{}" style="width: 50px; height: 50px; object-fit: cover; '
                'border-radius: 5px; border: 2px solid #ddd;" />',
                obj.main_image.url,
            )
        return format_html('<span style="color: #ccc;">No Image</span>')

    image_preview.short_description = "이미지"

    def main_image_preview(self, obj):
        """메인 이미지 미리보기 (상세 페이지)"""
        if obj.main_image:
            return format_html(
                '<img src="{}" style="max-width: 300px; max-height: 300px; '
                'border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />',
                obj.main_image.url,
            )
        return "이미지 없음"

    main_image_preview.short_description = "메인 이미지 미리보기"

    def price_display(self, obj):
        """가격 표시"""
        if obj.discount > 0 and obj.original_price:
            original_formatted = f"{int(obj.original_price):,}"
            price_formatted = f"{int(obj.price):,}"
            return format_html(
                "<div>"
                '<span style="text-decoration: line-through; color: #999; font-size: 12px;">'
                "{}원</span><br>"
                '<strong style="color: #dc3545; font-size: 14px;">{}원</strong>'
                "</div>",
                original_formatted,
                price_formatted,
            )
        price_formatted = f"{int(obj.price):,}"
        return format_html("<strong>{}원</strong>", price_formatted)

    price_display.short_description = "가격"

    def discount_badge(self, obj):
        """할인율 배지"""
        if obj.discount > 0:
            return format_html(
                '<span style="background-color: #dc3545; color: white; padding: 3px 8px; '
                'border-radius: 3px; font-weight: bold;">{}% OFF</span>',
                obj.discount,
            )
        return "-"

    discount_badge.short_description = "할인"

    def rating_display(self, obj):
        """평점 표시 (별 아이콘)"""
        full_stars = int(obj.rating)
        half_star = (obj.rating - full_stars) >= 0.5
        stars = "⭐" * full_stars
        if half_star:
            stars += "½"
        return format_html(
            '{} <span style="color: #666; font-size: 12px;">({:.1f})</span>',
            stars,
            obj.rating,
        )

    rating_display.short_description = "평점"

    def sold_count_badge(self, obj):
        """판매 수 배지"""
        if obj.sold_count >= 100:
            color = "#28a745"  # 초록 (베스트셀러)
        elif obj.sold_count >= 50:
            color = "#007bff"  # 파랑 (인기)
        elif obj.sold_count >= 20:
            color = "#ffc107"  # 노랑 (판매 중)
        else:
            color = "#6c757d"  # 회색 (신제품)

        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 8px; '
            'border-radius: 3px; font-size: 11px;">🛒 {}</span>',
            color,
            obj.sold_count,
        )

    sold_count_badge.short_description = "판매 수"

    # Custom actions
    actions = [
        "apply_discount_10",
        "apply_discount_20",
        "remove_discount",
        "mark_bestseller",
    ]

    def apply_discount_10(self, request, queryset):
        """10% 할인 적용"""
        for product in queryset:
            if not product.original_price:
                product.original_price = product.price
            product.discount = 10
            product.price = product.original_price * 0.9
            product.save()
        self.message_user(
            request, f"{queryset.count()}개 제품에 10% 할인을 적용했습니다."
        )

    apply_discount_10.short_description = "💰 10% 할인 적용"

    def apply_discount_20(self, request, queryset):
        """20% 할인 적용"""
        for product in queryset:
            if not product.original_price:
                product.original_price = product.price
            product.discount = 20
            product.price = product.original_price * 0.8
            product.save()
        self.message_user(
            request, f"{queryset.count()}개 제품에 20% 할인을 적용했습니다."
        )

    apply_discount_20.short_description = "💰 20% 할인 적용"

    def remove_discount(self, request, queryset):
        """할인 제거"""
        for product in queryset:
            if product.original_price:
                product.price = product.original_price
                product.discount = 0
                product.save()
        self.message_user(request, f"{queryset.count()}개 제품의 할인을 제거했습니다.")

    remove_discount.short_description = "✗ 할인 제거"

    def mark_bestseller(self, request, queryset):
        """베스트셀러로 표시 (판매 수 100 설정)"""
        updated = queryset.update(sold_count=100)
        self.message_user(request, f"{updated}개 제품을 베스트셀러로 표시했습니다.")

    mark_bestseller.short_description = "🏆 베스트셀러로 표시"


@admin.register(ProductReview)
class ProductReviewAdmin(admin.ModelAdmin):
    """제품 리뷰 관리 (Product Review Admin)"""

    list_display = [
        "title",
        "product",
        "author",
        "rating_stars",
        "date",
        "helpful_count",
    ]

    list_filter = [
        "rating",
        "date",
        "product__category",
    ]

    search_fields = [
        "title",
        "content",
        "author",
        "product__title",
    ]

    ordering = ["-date"]

    date_hierarchy = "date"

    list_per_page = 50

    fieldsets = (
        (
            "기본 정보 (Basic Info)",
            {
                "fields": ("product", "author", "rating", "date"),
            },
        ),
        (
            "리뷰 내용 (Review Content)",
            {
                "fields": ("title", "content"),
            },
        ),
        (
            "통계 (Statistics)",
            {
                "fields": ("helpful_count",),
            },
        ),
    )

    # Custom display methods
    def rating_stars(self, obj):
        """평점 별 표시"""
        stars = "⭐" * obj.rating
        return format_html("{} {}점", stars, obj.rating)

    rating_stars.short_description = "평점"

    # Custom actions
    actions = ["reset_helpful_count"]

    def reset_helpful_count(self, request, queryset):
        """도움됨 수 초기화"""
        updated = queryset.update(helpful_count=0)
        self.message_user(request, f"{updated}개 리뷰의 도움됨 수를 초기화했습니다.")

    reset_helpful_count.short_description = "🔄 도움됨 수 초기화"


@admin.register(QuoteItem)
class QuoteItemAdmin(admin.ModelAdmin):
    """견적 상품 관리 (Quote Item Admin)"""

    list_display = [
        "item_id",
        "image_preview",
        "name",
        "category",
        "price_display",
        "unit",
        "min_quantity",
        "order",
    ]

    list_filter = ["category"]

    search_fields = ["name", "description", "item_id"]

    ordering = ["category", "order"]

    list_editable = ["order"]

    fieldsets = (
        (
            "기본 정보 (Basic Info)",
            {
                "fields": ("item_id", "category", "name", "description"),
            },
        ),
        (
            "이미지 (Image)",
            {
                "fields": ("image", "image_preview"),
            },
        ),
        (
            "가격 및 수량 (Price & Quantity)",
            {
                "fields": ("price", "unit", "min_quantity"),
            },
        ),
        (
            "정렬 (Order)",
            {
                "fields": ("order",),
            },
        ),
    )

    readonly_fields = ["image_preview"]

    # Custom display methods
    def image_preview(self, obj):
        """이미지 미리보기"""
        if obj.image:
            return format_html(
                '<img src="{}" style="width: 60px; height: 60px; object-fit: cover; '
                'border-radius: 5px; border: 2px solid #ddd;" />',
                obj.image.url,
            )
        return "No Image"

    image_preview.short_description = "이미지"

    def price_display(self, obj):
        """가격 표시"""
        price_formatted = f"{int(obj.price):,}"
        return format_html("<strong>{}원</strong> / {}", price_formatted, obj.unit)

    price_display.short_description = "가격"


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    """교구 영상 관리 (Video Admin)"""

    list_display = [
        "video_id",
        "thumbnail_preview",
        "title",
        "category",
        "duration",
        "views_badge",
        "order",
    ]

    list_filter = ["category", "created_at"]

    search_fields = ["title", "description", "video_id"]

    ordering = ["order", "-views"]

    list_editable = ["order"]

    fieldsets = (
        (
            "기본 정보 (Basic Info)",
            {
                "fields": ("video_id", "title", "description", "category"),
            },
        ),
        (
            "영상 정보 (Video Info)",
            {
                "fields": ("video_url", "duration"),
            },
        ),
        (
            "썸네일 (Thumbnail)",
            {
                "fields": ("thumbnail", "thumbnail_preview"),
            },
        ),
        (
            "추가 정보 (Additional Info)",
            {
                "fields": ("tags", "views", "order"),
            },
        ),
    )

    readonly_fields = ["thumbnail_preview"]

    # Custom display methods
    def thumbnail_preview(self, obj):
        """썸네일 미리보기"""
        if obj.thumbnail:
            return format_html(
                '<img src="{}" style="max-width: 200px; border-radius: 8px; '
                'box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />',
                obj.thumbnail.url,
            )
        return "썸네일 없음"

    thumbnail_preview.short_description = "썸네일 미리보기"

    def views_badge(self, obj):
        """조회수 배지"""
        views_formatted = f"{obj.views:,}"
        if obj.views >= 1000:
            return format_html(
                '<span style="background-color: #dc3545; color: white; padding: 3px 8px; '
                'border-radius: 3px;">🔥 {}</span>',
                views_formatted,
            )
        elif obj.views >= 500:
            return format_html(
                '<span style="background-color: #ffc107; color: white; padding: 3px 8px; '
                'border-radius: 3px;">👁️ {}</span>',
                views_formatted,
            )
        else:
            return format_html(
                '<span style="color: #666;">👁️ {}</span>', views_formatted
            )

    views_badge.short_description = "조회수"

    # Custom actions
    actions = ["reset_views", "increment_views"]

    def reset_views(self, request, queryset):
        """조회수 초기화"""
        updated = queryset.update(views=0)
        self.message_user(request, f"{updated}개 영상의 조회수를 초기화했습니다.")

    reset_views.short_description = "🔄 조회수 초기화"

    def increment_views(self, request, queryset):
        """조회수 100 증가"""
        for video in queryset:
            video.views += 100
            video.save()
        self.message_user(
            request, f"{queryset.count()}개 영상의 조회수를 100 증가시켰습니다."
        )

    increment_views.short_description = "➕ 조회수 +100"


@admin.register(ClassroomPhoto)
class ClassroomPhotoAdmin(admin.ModelAdmin):
    """수업 사진 관리 (Classroom Photo Admin)"""

    list_display = [
        "photo_id",
        "image_preview",
        "title",
        "category",
        "date",
        "order",
    ]

    list_filter = ["category", "date"]

    search_fields = ["title", "description", "photo_id"]

    ordering = ["order", "-date"]

    list_editable = ["order"]

    date_hierarchy = "date"

    fieldsets = (
        (
            "기본 정보 (Basic Info)",
            {
                "fields": ("photo_id", "title", "description", "category", "date"),
            },
        ),
        (
            "이미지 (Image)",
            {
                "fields": ("image", "image_preview"),
            },
        ),
        (
            "정렬 (Order)",
            {
                "fields": ("order",),
            },
        ),
    )

    readonly_fields = ["image_preview"]

    # Custom display methods
    def image_preview(self, obj):
        """이미지 미리보기"""
        if obj.image:
            return format_html(
                '<img src="{}" style="width: 80px; height: 60px; object-fit: cover; '
                'border-radius: 5px; box-shadow: 0 1px 3px rgba(0,0,0,0.2);" />',
                obj.image.url,
            )
        return "No Image"

    image_preview.short_description = "이미지"


@admin.register(RelatedClass)
class RelatedClassAdmin(admin.ModelAdmin):
    """관련 수업 관리 (Related Class Admin)"""

    list_display = [
        "class_id",
        "image_preview",
        "title",
        "difficulty_badge",
        "duration",
        "order",
    ]

    list_filter = ["difficulty"]

    search_fields = ["title", "description", "class_id"]

    ordering = ["order"]

    list_editable = ["order"]

    fieldsets = (
        (
            "기본 정보 (Basic Info)",
            {
                "fields": ("class_id", "title", "description"),
            },
        ),
        (
            "이미지 (Image)",
            {
                "fields": ("image", "image_preview"),
            },
        ),
        (
            "수업 정보 (Class Info)",
            {
                "fields": ("duration", "difficulty", "link"),
            },
        ),
        (
            "정렬 (Order)",
            {
                "fields": ("order",),
            },
        ),
    )

    readonly_fields = ["image_preview"]

    # Custom display methods
    def image_preview(self, obj):
        """이미지 미리보기"""
        if obj.image:
            return format_html(
                '<img src="{}" style="width: 80px; height: 60px; object-fit: cover; '
                'border-radius: 5px; box-shadow: 0 1px 3px rgba(0,0,0,0.2);" />',
                obj.image.url,
            )
        return "No Image"

    image_preview.short_description = "이미지"

    def difficulty_badge(self, obj):
        """난이도 배지"""
        colors = {
            "입문": "#28a745",  # 초록
            "초급": "#007bff",  # 파랑
            "중급": "#ffc107",  # 노랑
            "고급": "#dc3545",  # 빨강
        }
        color = colors.get(obj.difficulty, "#6c757d")
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 8px; '
            'border-radius: 3px; font-size: 11px;">{}</span>',
            color,
            obj.difficulty,
        )

    difficulty_badge.short_description = "난이도"
