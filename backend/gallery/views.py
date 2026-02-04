"""
갤러리 Views (학생 작품 & 수업 후기)
"""

from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import StudentWork, ClassReview
from .serializers import (
    StudentWorkListSerializer,
    StudentWorkDetailSerializer,
    ClassReviewListSerializer,
    ClassReviewDetailSerializer,
)


# ============================================
# 학생 작품 ViewSet
# ============================================


class StudentWorkViewSet(viewsets.ReadOnlyModelViewSet):
    """
    학생 작품 ViewSet

    - list: 작품 목록 조회 (필터링, 검색 지원)
    - retrieve: 작품 상세 조회
    """

    queryset = StudentWork.objects.filter(is_published=True)
    permission_classes = [permissions.AllowAny]
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    # 필터링
    filterset_fields = [
        "difficulty",  # 난이도
        "student_grade",  # 학년
        "is_featured",  # 추천 작품
    ]

    # 검색
    search_fields = [
        "title",  # 제목
        "description",  # 설명
        "student_name",  # 학생명
        "technologies",  # 사용 기술
        "tools",  # 사용 도구
        "tags",  # 태그
    ]

    # 정렬
    ordering_fields = [
        "created_date",  # 제작일
        "views",  # 조회수
        "likes",  # 좋아요
        "order",  # 정렬 순서
    ]
    ordering = ["-is_featured", "order", "-created_date"]

    def get_serializer_class(self):
        """액션에 따라 다른 Serializer 사용"""
        if self.action == "list":
            return StudentWorkListSerializer
        return StudentWorkDetailSerializer


# ============================================
# 수업 후기 ViewSet
# ============================================


class ClassReviewViewSet(viewsets.ReadOnlyModelViewSet):
    """
    수업 후기 ViewSet

    - list: 후기 목록 조회 (필터링, 검색 지원)
    - retrieve: 후기 상세 조회
    """

    queryset = ClassReview.objects.filter(is_published=True)
    permission_classes = [permissions.AllowAny]
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    # 필터링
    filterset_fields = [
        "author_type",  # 작성자 구분 (학생/학부모)
        "course_name",  # 수강 과정
        "instructor",  # 강사명
        "overall_rating",  # 종합 만족도
        "recommend",  # 추천 여부
        "is_featured",  # 추천 후기
    ]

    # 검색
    search_fields = [
        "title",  # 제목
        "content",  # 내용
        "author_name",  # 작성자
        "course_name",  # 과정명
        "pros",  # 좋았던 점
    ]

    # 정렬
    ordering_fields = [
        "review_date",  # 작성일
        "overall_rating",  # 종합 만족도
        "views",  # 조회수
        "helpful_count",  # 도움됨 수
        "order",  # 정렬 순서
    ]
    ordering = ["-is_featured", "order", "-review_date"]

    def get_serializer_class(self):
        """액션에 따라 다른 Serializer 사용"""
        if self.action == "list":
            return ClassReviewListSerializer
        return ClassReviewDetailSerializer
