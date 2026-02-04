"""
갤러리 Serializers (학생 작품 & 수업 후기)
"""

from rest_framework import serializers
from .models import StudentWork, ClassReview


# ============================================
# 학생 작품 Serializers
# ============================================


class StudentWorkListSerializer(serializers.ModelSerializer):
    """학생 작품 목록 Serializer"""

    class Meta:
        model = StudentWork
        fields = [
            "id",
            "work_id",
            "title",
            "description",
            "image",
            "student_name",
            "student_grade",
            "difficulty",
            "technologies",
            "tools",
            "views",
            "likes",
            "tags",
            "is_featured",
            "created_date",
        ]


class StudentWorkDetailSerializer(serializers.ModelSerializer):
    """학생 작품 상세 Serializer"""

    class Meta:
        model = StudentWork
        fields = "__all__"


# ============================================
# 수업 후기 Serializers
# ============================================


class ClassReviewListSerializer(serializers.ModelSerializer):
    """수업 후기 목록 Serializer"""

    average_rating = serializers.ReadOnlyField()

    class Meta:
        model = ClassReview
        fields = [
            "id",
            "review_id",
            "title",
            "content",
            "image",
            "author_name",
            "author_type",
            "course_name",
            "course_period",
            "overall_rating",
            "average_rating",
            "recommend",
            "views",
            "helpful_count",
            "is_featured",
            "review_date",
        ]


class ClassReviewDetailSerializer(serializers.ModelSerializer):
    """수업 후기 상세 Serializer"""

    average_rating = serializers.ReadOnlyField()

    class Meta:
        model = ClassReview
        fields = "__all__"
