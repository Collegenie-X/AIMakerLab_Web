"""
갤러리 Views
"""

from rest_framework import viewsets, permissions, filters, status
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import GalleryItem
from .serializers import (
    GalleryItemListSerializer,
    GalleryItemDetailSerializer,
    GalleryItemCreateSerializer,
)
from .data_source_utils import get_data_source_config, load_json_file, save_json_file


class GalleryItemViewSet(viewsets.ModelViewSet):
    """
    갤러리 ViewSet (CRUD)
    
    - list: 갤러리 목록 조회 (필터링, 검색 지원)
    - retrieve: 갤러리 상세 조회
    - create: 갤러리 생성
    - update: 갤러리 수정 (관리자 또는 작성자)
    - delete: 갤러리 삭제 (관리자 또는 작성자)
    """
    
    queryset = GalleryItem.objects.filter(is_published=True)
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'rating']
    search_fields = ['title', 'description', 'author', 'tags']
    ordering_fields = ['date', 'views', 'likes', 'rating']
    ordering = ['-date']
    
    def get_serializer_class(self):
        """액션에 따라 다른 Serializer 사용"""
        if self.action == 'create':
            return GalleryItemCreateSerializer
        elif self.action == 'list':
            return GalleryItemListSerializer
        return GalleryItemDetailSerializer
    
    def list(self, request, *args, **kwargs):
        """갤러리 목록 조회 (JSON 또는 DB)"""
        category = request.query_params.get('category')
        
        # category에 따라 데이터 소스 선택
        if category == 'works':
            use_json = get_data_source_config('works')
            json_file = 'works.json'
        elif category == 'reviews':
            use_json = get_data_source_config('reviews')
            json_file = 'reviews.json'
        else:
            use_json = False
            json_file = None
        
        if use_json and json_file:
            data = load_json_file(json_file)
            if data:
                return Response(data)
        
        # DB에서 조회
        return super().list(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        """갤러리 생성"""
        category = request.data.get('category', 'works')
        
        if category == 'works':
            use_json = get_data_source_config('works')
            json_file = 'works.json'
        else:
            use_json = get_data_source_config('reviews')
            json_file = 'reviews.json'
        
        if use_json:
            # JSON 파일에 추가
            data = load_json_file(json_file) or []
            new_item = request.data
            new_item['id'] = len(data) + 1
            new_item['item_id'] = len(data) + 1
            new_item['views'] = 0
            new_item['likes'] = 0
            data.append(new_item)
            save_json_file(json_file, data)
            return Response(new_item, status=status.HTTP_201_CREATED)
        
        # DB에 저장
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # 사용자 연결 (로그인한 경우)
        if request.user.is_authenticated:
            # 다음 item_id 생성
            last_item = GalleryItem.objects.order_by('-item_id').first()
            item_id = (last_item.item_id + 1) if last_item else 1
            
            gallery_item = serializer.save(user=request.user, item_id=item_id)
        else:
            last_item = GalleryItem.objects.order_by('-item_id').first()
            item_id = (last_item.item_id + 1) if last_item else 1
            
            gallery_item = serializer.save(item_id=item_id)
        
        return Response(
            GalleryItemDetailSerializer(gallery_item).data,
            status=status.HTTP_201_CREATED
        )
    
    def update(self, request, *args, **kwargs):
        """갤러리 수정"""
        instance = self.get_object()
        category = instance.category
        
        if category == 'works':
            use_json = get_data_source_config('works')
            json_file = 'works.json'
        else:
            use_json = get_data_source_config('reviews')
            json_file = 'reviews.json'
        
        if use_json:
            data = load_json_file(json_file) or []
            item_id = int(kwargs.get('pk'))
            
            for i, item in enumerate(data):
                if item.get('id') == item_id or item.get('item_id') == item_id:
                    data[i] = {**item, **request.data}
                    save_json_file(json_file, data)
                    return Response(data[i])
            
            return Response({'error': '항목을 찾을 수 없습니다.'}, status=status.HTTP_404_NOT_FOUND)
        
        # DB에서 수정
        return super().update(request, *args, **kwargs)
    
    def destroy(self, request, *args, **kwargs):
        """갤러리 삭제"""
        instance = self.get_object()
        category = instance.category
        
        if category == 'works':
            use_json = get_data_source_config('works')
            json_file = 'works.json'
        else:
            use_json = get_data_source_config('reviews')
            json_file = 'reviews.json'
        
        if use_json:
            data = load_json_file(json_file) or []
            item_id = int(kwargs.get('pk'))
            
            data = [item for item in data if item.get('id') != item_id and item.get('item_id') != item_id]
            save_json_file(json_file, data)
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        # DB에서 삭제
        return super().destroy(request, *args, **kwargs)
