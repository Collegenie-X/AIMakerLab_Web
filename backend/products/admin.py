"""
제품 Admin
"""

from django.contrib import admin
from .models import Product, ProductReview, QuoteItem, Video, ClassroomPhoto, RelatedClass


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    """제품 Admin"""
    
    list_display = [
        'title',
        'category',
        'price',
        'discount',
        'rating',
        'sold_count',
        'target_grade',
        'order',
    ]
    list_filter = ['category', 'target_grade', 'created_at']
    search_fields = ['title', 'short_description', 'product_id']
    ordering = ['order', '-sold_count']
    
    fieldsets = (
        ('기본 정보', {
            'fields': ('product_id', 'category', 'title', 'short_description')
        }),
        ('교육 정보', {
            'fields': ('educational_value', 'classroom_use')
        }),
        ('이미지', {
            'fields': ('main_image', 'images')
        }),
        ('가격', {
            'fields': ('price', 'original_price', 'discount')
        }),
        ('대상 및 수업', {
            'fields': ('target_grade', 'grade_detail', 'class_time', 'group_size')
        }),
        ('통계', {
            'fields': ('rating', 'reviews', 'sold_count')
        }),
        ('추가 정보', {
            'fields': ('badges', 'features', 'order')
        }),
    )


@admin.register(ProductReview)
class ProductReviewAdmin(admin.ModelAdmin):
    """제품 리뷰 Admin"""
    
    list_display = ['title', 'product', 'author', 'rating', 'date', 'helpful_count']
    list_filter = ['rating', 'date']
    search_fields = ['title', 'content', 'author']
    ordering = ['-date']


@admin.register(QuoteItem)
class QuoteItemAdmin(admin.ModelAdmin):
    """견적 상품 Admin"""
    
    list_display = ['name', 'category', 'price', 'unit', 'min_quantity', 'order']
    list_filter = ['category']
    search_fields = ['name', 'description']
    ordering = ['category', 'order']


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    """교구 영상 Admin"""
    
    list_display = ['title', 'category', 'duration', 'views', 'order']
    list_filter = ['category', 'created_at']
    search_fields = ['title', 'description']
    ordering = ['order', '-views']


@admin.register(ClassroomPhoto)
class ClassroomPhotoAdmin(admin.ModelAdmin):
    """수업 사진 Admin"""
    
    list_display = ['title', 'category', 'date', 'order']
    list_filter = ['category', 'date']
    search_fields = ['title', 'description']
    ordering = ['order', '-date']


@admin.register(RelatedClass)
class RelatedClassAdmin(admin.ModelAdmin):
    """관련 수업 Admin"""
    
    list_display = ['title', 'difficulty', 'duration', 'order']
    list_filter = ['difficulty']
    search_fields = ['title', 'description']
    ordering = ['order']
