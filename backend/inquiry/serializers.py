"""
문의 Serializers
"""

from rest_framework import serializers
from .models import Inquiry, Schedule

# from .models import OutreachInquiry  # TODO: 모델 생성 후 활성화


class InquiryListSerializer(serializers.ModelSerializer):
    """문의 목록 Serializer"""

    class Meta:
        model = Inquiry
        fields = [
            "id",
            "inquiry_id",
            "title",
            "category",
            "status",
            "date",
            "requester_name",
            "course",
            "grade",
            "location",
        ]


class InquiryDetailSerializer(serializers.ModelSerializer):
    """문의 상세 Serializer"""

    class Meta:
        model = Inquiry
        fields = "__all__"


class InquiryCreateSerializer(serializers.ModelSerializer):
    """문의 생성 Serializer"""

    class Meta:
        model = Inquiry
        fields = [
            "title",
            "category",
            "requester_name",
            "requester_contact",
            "requester_email",
            "course",
            "grade",
            "participant_count",
            "location",
            "budget",
            "preferred_date",
            "preferred_time",
            "duration",
            "content",
        ]


class ScheduleSerializer(serializers.ModelSerializer):
    """수업 일정 Serializer"""

    is_full = serializers.ReadOnlyField()

    class Meta:
        model = Schedule
        fields = "__all__"


# ============================================
# 향후 확장: 출강 문의 Serializers
# ============================================
# OutreachInquiry 모델 생성 후 활성화

# class OutreachInquiryListSerializer(serializers.ModelSerializer):
#     """출강 문의 목록 Serializer"""
#     status_display = serializers.CharField(source='get_status_display', read_only=True)
#
#     class Meta:
#         model = OutreachInquiry
#         fields = ['id', 'title', 'institution', 'status', ...]

# class OutreachInquiryDetailSerializer(serializers.ModelSerializer):
#     """출강 문의 상세 Serializer"""
#     class Meta:
#         model = OutreachInquiry
#         fields = '__all__'

# class OutreachInquiryCreateSerializer(serializers.ModelSerializer):
#     """출강 문의 생성 Serializer"""
#     class Meta:
#         model = OutreachInquiry
#         fields = ['title', 'institution', 'course', ...]
