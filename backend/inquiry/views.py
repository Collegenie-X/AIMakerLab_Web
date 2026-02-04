"""
문의 Views
"""

from rest_framework import viewsets, permissions, filters, status
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from .models import Inquiry, Schedule, OutreachInquiry
from .serializers import (
    InquiryListSerializer,
    InquiryDetailSerializer,
    InquiryCreateSerializer,
    ScheduleSerializer,
    OutreachInquiryListSerializer,
    OutreachInquiryDetailSerializer,
    OutreachInquiryCreateSerializer,
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
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'status', 'course']
    search_fields = ['title', 'requester_name', 'content']
    ordering_fields = ['date', 'created_at']
    ordering = ['-date']
    
    def get_serializer_class(self):
        if self.action == 'create':
            return InquiryCreateSerializer
        elif self.action == 'list':
            return InquiryListSerializer
        return InquiryDetailSerializer
    
    def create(self, request, *args, **kwargs):
        """문의 생성"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # inquiry_id 자동 생성
        last_inquiry = Inquiry.objects.order_by('-inquiry_id').first()
        inquiry_id = (last_inquiry.inquiry_id + 1) if last_inquiry else 1
        
        inquiry = serializer.save(
            inquiry_id=inquiry_id,
            date=serializer.validated_data.get('preferred_date') or timezone.now().date()
        )
        
        return Response(
            InquiryDetailSerializer(inquiry).data,
            status=status.HTTP_201_CREATED
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
    filterset_fields = ['schedule_type', 'course', 'target_grade', 'is_available']
    ordering_fields = ['date', 'start_time']
    ordering = ['date', 'start_time']
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # 날짜 범위 필터링
        start_date = self.request.query_params.get('start_date', None)
        end_date = self.request.query_params.get('end_date', None)
        
        if start_date:
            queryset = queryset.filter(date__gte=start_date)
        if end_date:
            queryset = queryset.filter(date__lte=end_date)
        
        return queryset
    
    def list(self, request, *args, **kwargs):
        """일정 목록 조회 (JSON 또는 DB)"""
        use_json = get_data_source_config('schedules')
        
        if use_json:
            # schedule_type에 따라 다른 파일 로드
            schedule_type = request.query_params.get('schedule_type')
            if schedule_type == 'weekday':
                data = load_json_file('schedules-weekday.json')
            elif schedule_type == 'weekend':
                data = load_json_file('schedules-weekend.json')
            else:
                weekday_data = load_json_file('schedules-weekday.json') or []
                weekend_data = load_json_file('schedules-weekend.json') or []
                data = weekday_data + weekend_data
            
            if data:
                return Response(data)
        
        # DB에서 조회
        return super().list(request, *args, **kwargs)


class OutreachInquiryViewSet(viewsets.ModelViewSet):
    """
    출강 수업 문의 ViewSet (CRUD)
    
    - list: 출강 문의 목록 조회
    - retrieve: 출강 문의 상세 조회
    - create: 출강 문의 생성
    - update: 출강 문의 수정 (관리자만)
    - delete: 출강 문의 삭제 (관리자만)
    """
    
    queryset = OutreachInquiry.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'institution_type', 'category', 'target_audience']
    search_fields = ['title', 'institution', 'requester_name', 'course', 'content']
    ordering_fields = ['date', 'created_at']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        """액션에 따라 다른 Serializer 사용"""
        if self.action == 'create':
            return OutreachInquiryCreateSerializer
        elif self.action == 'list':
            return OutreachInquiryListSerializer
        return OutreachInquiryDetailSerializer
    
    def list(self, request, *args, **kwargs):
        """출강 문의 목록 조회 (JSON 또는 DB)"""
        use_json = get_data_source_config('outreach')
        
        if use_json:
            data = load_json_file('outreach-inquiries.json')
            if data:
                return Response(data)
        
        # DB에서 조회
        return super().list(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        """출강 문의 생성"""
        use_json = get_data_source_config('outreach')
        
        if use_json:
            # JSON 파일에 추가
            data = load_json_file('outreach-inquiries.json') or []
            new_item = request.data
            new_item['id'] = len(data) + 1
            new_item['date'] = timezone.now().strftime('%Y.%m.%d')
            new_item['status'] = 'pending'
            data.append(new_item)
            save_json_file('outreach-inquiries.json', data)
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
            OutreachInquiryDetailSerializer(inquiry).data,
            status=status.HTTP_201_CREATED
        )
    
    def update(self, request, *args, **kwargs):
        """출강 문의 수정"""
        use_json = get_data_source_config('outreach')
        
        if use_json:
            data = load_json_file('outreach-inquiries.json') or []
            item_id = int(kwargs.get('pk'))
            
            for i, item in enumerate(data):
                if item.get('id') == item_id:
                    data[i] = {**item, **request.data}
                    save_json_file('outreach-inquiries.json', data)
                    return Response(data[i])
            
            return Response({'error': '항목을 찾을 수 없습니다.'}, status=status.HTTP_404_NOT_FOUND)
        
        # DB에서 수정
        return super().update(request, *args, **kwargs)
    
    def destroy(self, request, *args, **kwargs):
        """출강 문의 삭제"""
        use_json = get_data_source_config('outreach')
        
        if use_json:
            data = load_json_file('outreach-inquiries.json') or []
            item_id = int(kwargs.get('pk'))
            
            data = [item for item in data if item.get('id') != item_id]
            save_json_file('outreach-inquiries.json', data)
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        # DB에서 삭제
        return super().destroy(request, *args, **kwargs)
