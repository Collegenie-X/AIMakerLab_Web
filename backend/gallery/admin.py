"""
갤러리 Admin
"""

from django.contrib import admin
from .models import GalleryItem


@admin.register(GalleryItem)
class GalleryItemAdmin(admin.ModelAdmin):
    """갤러리 아이템 Admin"""
    
    list_display = [
        'title',
        'category',
        'author',
        'user',
        'date',
        'views',
        'likes',
        'rating',
        'is_published',
        'order',
    ]
    list_filter = ['category', 'rating', 'is_published', 'date']
    search_fields = ['title', 'description', 'author', 'user__email']
    ordering = ['category', 'order', '-date']
    
    fieldsets = (
        ('사용자', {
            'fields': ('user',)
        }),
        ('기본 정보', {
            'fields': ('item_id', 'category', 'title', 'description', 'emoji', 'is_published')
        }),
        ('이미지', {
            'fields': ('image', 'images')
        }),
        ('작성자 정보', {
            'fields': ('author', 'date')
        }),
        ('통계', {
            'fields': ('views', 'likes', 'rating')
        }),
        ('추가 정보', {
            'fields': ('details', 'tags', 'order')
        }),
    )
    
    actions = ['publish_items', 'unpublish_items']
    
    def publish_items(self, request, queryset):
        """선택된 항목 공개"""
        updated = queryset.update(is_published=True)
        self.message_user(request, f'{updated}개의 항목을 공개했습니다.')
    publish_items.short_description = '선택된 항목 공개'
    
    def unpublish_items(self, request, queryset):
        """선택된 항목 비공개"""
        updated = queryset.update(is_published=False)
        self.message_user(request, f'{updated}개의 항목을 비공개했습니다.')
    unpublish_items.short_description = '선택된 항목 비공개'
