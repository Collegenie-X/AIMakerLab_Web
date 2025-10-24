"""
갤러리 Views
"""

from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import GalleryItem
from .serializers import GalleryItemListSerializer, GalleryItemDetailSerializer


class GalleryItemViewSet(viewsets.ReadOnlyModelViewSet):
    """
    갤러리 ViewSet
    
    - list: 갤러리 목록 조회 (필터링, 검색 지원)
    - retrieve: 갤러리 상세 조회
    """
    
    queryset = GalleryItem.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category']
    search_fields = ['title', 'description', 'author', 'tags']
    ordering_fields = ['date', 'views', 'likes', 'rating']
    ordering = ['-date']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return GalleryItemListSerializer
        return GalleryItemDetailSerializer
