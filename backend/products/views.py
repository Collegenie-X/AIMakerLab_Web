"""
제품 Views
"""

from rest_framework import viewsets, permissions, filters, status
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import (
    Product,
    ProductReview,
    QuoteItem,
    Video,
    ClassroomPhoto,
    RelatedClass,
    QuoteInquiry
)
from .serializers import (
    ProductListSerializer,
    ProductDetailSerializer,
    ProductReviewSerializer,
    QuoteItemSerializer,
    VideoSerializer,
    ClassroomPhotoSerializer,
    RelatedClassSerializer,
    QuoteInquiryListSerializer,
    QuoteInquiryDetailSerializer,
    QuoteInquiryCreateSerializer,
)
from .data_source_utils import get_data_source_config, load_json_file, save_json_file


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


class QuoteInquiryViewSet(viewsets.ModelViewSet):
    """
    견적 문의 ViewSet (CRUD)
    
    - list: 견적 문의 목록 조회
    - retrieve: 견적 문의 상세 조회
    - create: 견적 문의 생성
    - update: 견적 문의 수정 (관리자만)
    - delete: 견적 문의 삭제 (관리자만)
    """
    
    queryset = QuoteInquiry.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'institution_type']
    search_fields = ['requester_name', 'requester_email', 'institution_name', 'message']
    ordering_fields = ['created_at', 'total_amount']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        """액션에 따라 다른 Serializer 사용"""
        if self.action == 'create':
            return QuoteInquiryCreateSerializer
        elif self.action == 'list':
            return QuoteInquiryListSerializer
        return QuoteInquiryDetailSerializer
    
    def list(self, request, *args, **kwargs):
        """견적 문의 목록 조회 (JSON 또는 DB)"""
        use_json = get_data_source_config('quote_inquiries')
        
        if use_json:
            data = load_json_file('quote-inquiries.json')
            if data:
                return Response(data)
        
        # DB에서 조회
        return super().list(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        """견적 문의 생성"""
        use_json = get_data_source_config('quote_inquiries')
        
        if use_json:
            # JSON 파일에 추가
            data = load_json_file('quote-inquiries.json') or []
            new_item = request.data
            new_item['id'] = len(data) + 1
            new_item['status'] = 'pending'
            data.append(new_item)
            save_json_file('quote-inquiries.json', data)
            return Response(new_item, status=status.HTTP_201_CREATED)
        
        # DB에 저장
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # 사용자 연결 (로그인한 경우)
        if request.user.is_authenticated:
            inquiry = serializer.save(user=request.user)
        else:
            inquiry = serializer.save()
        
        return Response(
            QuoteInquiryDetailSerializer(inquiry).data,
            status=status.HTTP_201_CREATED
        )
    
    def update(self, request, *args, **kwargs):
        """견적 문의 수정"""
        use_json = get_data_source_config('quote_inquiries')
        
        if use_json:
            data = load_json_file('quote-inquiries.json') or []
            item_id = int(kwargs.get('pk'))
            
            for i, item in enumerate(data):
                if item.get('id') == item_id:
                    data[i] = {**item, **request.data}
                    save_json_file('quote-inquiries.json', data)
                    return Response(data[i])
            
            return Response({'error': '항목을 찾을 수 없습니다.'}, status=status.HTTP_404_NOT_FOUND)
        
        # DB에서 수정
        return super().update(request, *args, **kwargs)
    
    def destroy(self, request, *args, **kwargs):
        """견적 문의 삭제"""
        use_json = get_data_source_config('quote_inquiries')
        
        if use_json:
            data = load_json_file('quote-inquiries.json') or []
            item_id = int(kwargs.get('pk'))
            
            data = [item for item in data if item.get('id') != item_id]
            save_json_file('quote-inquiries.json', data)
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        # DB에서 삭제
        return super().destroy(request, *args, **kwargs)
