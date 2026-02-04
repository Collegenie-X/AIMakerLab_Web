"""
문의 Views
"""

from rest_framework import viewsets, permissions, filters, status
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from .models import Inquiry, Schedule
from .serializers import (
    InquiryListSerializer,
    InquiryDetailSerializer,
    InquiryCreateSerializer,
    ScheduleSerializer,
    # TODO: OutreachInquiry 모델 생성 후 활성화
    # OutreachInquiryListSerializer,
    # OutreachInquiryDetailSerializer,
    # OutreachInquiryCreateSerializer,
)
from .data_source_utils import get_data_source_config, load_json_file, save_json_file


class InquiryViewSet(viewsets.ModelViewSet):
    """
    문의 ViewSet

    - list: 문의 목록 조회
    - retrieve: 문의 상세 조회
    - create: 문의 생성
    - update: 문의 수정 (관리자만)
    - delete: 문의 삭제 (관리자만)
    """

    queryset = Inquiry.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = ["category", "status", "course"]
    search_fields = ["title", "requester_name", "content"]
    ordering_fields = ["date", "created_at"]
    ordering = ["-date"]

    def get_serializer_class(self):
        if self.action == "create":
            return InquiryCreateSerializer
        elif self.action == "list":
            return InquiryListSerializer
        return InquiryDetailSerializer

    def create(self, request, *args, **kwargs):
        """문의 생성"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # inquiry_id 자동 생성
        last_inquiry = Inquiry.objects.order_by("-inquiry_id").first()
        inquiry_id = (last_inquiry.inquiry_id + 1) if last_inquiry else 1

        inquiry = serializer.save(
            inquiry_id=inquiry_id,
            date=serializer.validated_data.get("preferred_date")
            or timezone.now().date(),
        )

        return Response(
            InquiryDetailSerializer(inquiry).data, status=status.HTTP_201_CREATED
        )


class ScheduleViewSet(viewsets.ReadOnlyModelViewSet):
    """
    수업 일정 ViewSet

    - list: 일정 목록 조회
    - retrieve: 일정 상세 조회
    """

    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ["schedule_type", "course", "target_grade", "is_available"]
    ordering_fields = ["date", "start_time"]
    ordering = ["date", "start_time"]

    def get_queryset(self):
        queryset = super().get_queryset()

        # 날짜 범위 필터링
        start_date = self.request.query_params.get("start_date", None)
        end_date = self.request.query_params.get("end_date", None)

        if start_date:
            queryset = queryset.filter(date__gte=start_date)
        if end_date:
            queryset = queryset.filter(date__lte=end_date)

        return queryset

    def list(self, request, *args, **kwargs):
        """일정 목록 조회 (JSON 또는 DB)"""
        use_json = get_data_source_config("schedules")

        if use_json:
            # schedule_type에 따라 다른 파일 로드
            schedule_type = request.query_params.get("schedule_type")
            if schedule_type == "weekday":
                data = load_json_file("schedules-weekday.json")
            elif schedule_type == "weekend":
                data = load_json_file("schedules-weekend.json")
            else:
                weekday_data = load_json_file("schedules-weekday.json") or []
                weekend_data = load_json_file("schedules-weekend.json") or []
                data = weekday_data + weekend_data

            if data:
                return Response(data)

        # DB에서 조회
        return super().list(request, *args, **kwargs)


# ============================================
# 향후 확장: 출강 수업 문의 (OutreachInquiry)
# ============================================
# OutreachInquiry 모델 생성 후 활성화

# class OutreachInquiryViewSet(viewsets.ModelViewSet):
#     """출강 수업 문의 ViewSet (CRUD)"""
#     queryset = OutreachInquiry.objects.all()
#     permission_classes = [permissions.AllowAny]
#
#     def get_serializer_class(self):
#         if self.action == 'create':
#             return OutreachInquiryCreateSerializer
#         elif self.action == 'list':
#             return OutreachInquiryListSerializer
#         return OutreachInquiryDetailSerializer
