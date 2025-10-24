"""
제품 Views
"""

from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Product, ProductReview, QuoteItem, Video, ClassroomPhoto, RelatedClass
from .serializers import (
    ProductListSerializer,
    ProductDetailSerializer,
    ProductReviewSerializer,
    QuoteItemSerializer,
    VideoSerializer,
    ClassroomPhotoSerializer,
    RelatedClassSerializer,
)


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    제품 ViewSet
    
    - list: 제품 목록 조회 (필터링, 검색, 정렬 지원)
    - retrieve: 제품 상세 조회
    """
    
    queryset = Product.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'target_grade']
    search_fields = ['title', 'short_description', 'category']
    ordering_fields = ['price', 'rating', 'sold_count', 'created_at']
    ordering = ['-sold_count']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ProductListSerializer
        return ProductDetailSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # 카테고리 필터링
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category__icontains=category)
        
        return queryset


class ProductReviewViewSet(viewsets.ReadOnlyModelViewSet):
    """제품 리뷰 ViewSet"""
    
    queryset = ProductReview.objects.all()
    serializer_class = ProductReviewSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['product', 'rating']
    ordering_fields = ['date', 'rating', 'helpful_count']
    ordering = ['-date']


class QuoteItemViewSet(viewsets.ReadOnlyModelViewSet):
    """견적 상품 ViewSet"""
    
    queryset = QuoteItem.objects.all()
    serializer_class = QuoteItemSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category']
    search_fields = ['name', 'description']
    ordering = ['category', 'order']


class VideoViewSet(viewsets.ReadOnlyModelViewSet):
    """교구 영상 ViewSet"""
    
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category']
    search_fields = ['title', 'description', 'tags']
    ordering_fields = ['views', 'created_at']
    ordering = ['-views']


class ClassroomPhotoViewSet(viewsets.ReadOnlyModelViewSet):
    """수업 사진 ViewSet"""
    
    queryset = ClassroomPhoto.objects.all()
    serializer_class = ClassroomPhotoSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['category']
    ordering_fields = ['date', 'order']
    ordering = ['-date']


class RelatedClassViewSet(viewsets.ReadOnlyModelViewSet):
    """관련 수업 ViewSet"""
    
    queryset = RelatedClass.objects.all()
    serializer_class = RelatedClassSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['difficulty', 'order']
    ordering = ['order']
