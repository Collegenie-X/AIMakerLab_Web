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
        'date',
        'views',
        'likes',
        'rating',
        'order',
    ]
    list_filter = ['category', 'rating', 'date']
    search_fields = ['title', 'description', 'author']
    ordering = ['category', 'order', '-date']
    
    fieldsets = (
        ('기본 정보', {
            'fields': ('item_id', 'category', 'title', 'description', 'emoji')
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
