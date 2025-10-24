"""
갤러리 Serializers
"""

from rest_framework import serializers
from .models import GalleryItem


class GalleryItemListSerializer(serializers.ModelSerializer):
    """갤러리 목록 Serializer"""
    
    class Meta:
        model = GalleryItem
        fields = [
            'id',
            'item_id',
            'category',
            'title',
            'description',
            'image',
            'emoji',
            'author',
            'date',
            'views',
            'likes',
            'rating',
        ]


class GalleryItemDetailSerializer(serializers.ModelSerializer):
    """갤러리 상세 Serializer"""
    
    class Meta:
        model = GalleryItem
        fields = '__all__'

