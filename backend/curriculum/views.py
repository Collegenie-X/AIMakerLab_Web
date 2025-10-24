"""
커리큘럼 Views
"""

from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Curriculum
from .serializers import CurriculumListSerializer, CurriculumDetailSerializer


class CurriculumViewSet(viewsets.ReadOnlyModelViewSet):
    """
    커리큘럼 ViewSet
    
    - list: 커리큘럼 목록 조회
    - retrieve: 커리큘럼 상세 조회
    - by_category: 카테고리별 커리큘럼 조회
    """
    
    queryset = Curriculum.objects.all().prefetch_related(
        'course_info_items',
        'learning_goals',
        'projects__tabs__modules',
        'grade_recommendations',
        'education_requirements',
        'materials',
    )
    permission_classes = [permissions.AllowAny]
    
    def get_serializer_class(self):
        """액션에 따라 다른 serializer 사용"""
        if self.action == 'list':
            return CurriculumListSerializer
        return CurriculumDetailSerializer
    
    @action(detail=False, methods=['get'], url_path='category/(?P<category>[^/.]+)')
    def by_category(self, request, category=None):
        """카테고리별 커리큘럼 조회"""
        try:
            curriculum = self.get_queryset().get(category=category)
            serializer = CurriculumDetailSerializer(curriculum)
            return Response(serializer.data)
        except Curriculum.DoesNotExist:
            return Response({
                'error': '해당 커리큘럼을 찾을 수 없습니다.'
            }, status=404)
