"""
갤러리 Serializers
"""

from rest_framework import serializers
from .models import GalleryItem


class GalleryItemListSerializer(serializers.ModelSerializer):
    """갤러리 목록 Serializer"""
    
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    
    class Meta:
        model = GalleryItem
        fields = [
            'id',
            'item_id',
            'category',
            'category_display',
            'title',
            'description',
            'image',
            'emoji',
            'author',
            'date',
            'views',
            'likes',
            'rating',
            'is_published',
        ]


class GalleryItemDetailSerializer(serializers.ModelSerializer):
    """갤러리 상세 Serializer"""
    
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    user_email = serializers.EmailField(source='user.email', read_only=True, allow_null=True)
    
    class Meta:
        model = GalleryItem
        fields = '__all__'


class GalleryItemCreateSerializer(serializers.ModelSerializer):
    """갤러리 생성 Serializer"""
    
    class Meta:
        model = GalleryItem
        fields = [
            'category',
            'title',
            'description',
            'image',
            'emoji',
            'author',
            'date',
            'details',
            'images',
            'tags',
        ]

