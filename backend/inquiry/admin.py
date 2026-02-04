"""
문의 Admin
"""

from django.contrib import admin
from .models import Inquiry, Schedule, OutreachInquiry


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    """문의 Admin"""
    
    list_display = [
        'title',
        'category',
        'status',
        'requester_name',
        'course',
        'date',
        'created_at',
    ]
    list_filter = ['status', 'category', 'course', 'date']
    search_fields = ['title', 'requester_name', 'requester_email', 'content']
    ordering = ['-date']
    
    fieldsets = (
        ('기본 정보', {
            'fields': ('inquiry_id', 'title', 'category', 'status', 'date')
        }),
        ('문의자 정보', {
            'fields': ('requester_name', 'requester_contact', 'requester_email')
        }),
        ('수업 정보', {
            'fields': ('course', 'grade', 'participant_count', 'location', 'budget')
        }),
        ('희망 일정', {
            'fields': ('preferred_date', 'preferred_time', 'duration')
        }),
        ('문의 내용', {
            'fields': ('content',)
        }),
    )
    
    readonly_fields = ['inquiry_id', 'created_at', 'updated_at']


@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    """수업 일정 Admin"""
    
    list_display = [
        'title',
        'schedule_type',
        'course',
        'date',
        'start_time',
        'instructor',
        'current_students',
        'max_students',
        'is_available',
    ]
    list_filter = ['schedule_type', 'course', 'target_grade', 'is_available', 'date']
    search_fields = ['title', 'course', 'instructor', 'location']
    ordering = ['date', 'start_time']
    
    fieldsets = (
        ('기본 정보', {
            'fields': ('schedule_id', 'schedule_type', 'title', 'course', 'instructor')
        }),
        ('일정 정보', {
            'fields': ('date', 'start_time', 'end_time', 'duration')
        }),
        ('수업 정보', {
            'fields': ('target_grade', 'max_students', 'current_students', 'location')
        }),
        ('추가 정보', {
            'fields': ('description', 'requirements', 'is_available', 'order')
        }),
    )
    
    readonly_fields = ['schedule_id']


@admin.register(OutreachInquiry)
class OutreachInquiryAdmin(admin.ModelAdmin):
    """출강 수업 문의 Admin"""
    
    list_display = [
        'institution',
        'course',
        'status',
        'institution_type',
        'requester_name',
        'preferred_date',
        'budget',
        'created_at',
    ]
    list_filter = [
        'status',
        'institution_type',
        'target_audience',
        'category',
        'equipment_provided',
        'created_at',
    ]
    search_fields = [
        'title',
        'institution',
        'requester_name',
        'requester_email',
        'course',
        'content',
    ]
    ordering = ['-created_at']
    
    fieldsets = (
        ('기본 정보', {
            'fields': ('user', 'title', 'category', 'status', 'date')
        }),
        ('기관 정보', {
            'fields': ('institution', 'institution_type')
        }),
        ('문의자 정보', {
            'fields': ('requester_name', 'requester_position', 'requester_contact', 'requester_email')
        }),
        ('수업 정보', {
            'fields': ('course', 'grade', 'participant_count', 'target_audience')
        }),
        ('장소 및 일정', {
            'fields': ('location', 'address', 'preferred_date', 'preferred_time', 'duration', 'session_count')
        }),
        ('예산 및 장비', {
            'fields': ('budget', 'equipment_provided', 'equipment_needed')
        }),
        ('추가 정보', {
            'fields': ('additional_requests', 'transportation', 'content')
        }),
        ('관리자', {
            'fields': ('admin_notes',),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ['date', 'created_at', 'updated_at']
    
    actions = ['mark_as_reviewing', 'mark_as_quoted', 'mark_as_confirmed']
    
    def mark_as_reviewing(self, request, queryset):
        """검토중으로 상태 변경"""
        updated = queryset.update(status='reviewing')
        self.message_user(request, f'{updated}개의 문의를 검토중으로 변경했습니다.')
    mark_as_reviewing.short_description = '선택된 문의를 검토중으로 변경'
    
    def mark_as_quoted(self, request, queryset):
        """견적발송으로 상태 변경"""
        updated = queryset.update(status='quoted')
        self.message_user(request, f'{updated}개의 문의를 견적발송으로 변경했습니다.')
    mark_as_quoted.short_description = '선택된 문의를 견적발송으로 변경'
    
    def mark_as_confirmed(self, request, queryset):
        """확정으로 상태 변경"""
        updated = queryset.update(status='confirmed')
        self.message_user(request, f'{updated}개의 문의를 확정으로 변경했습니다.')
    mark_as_confirmed.short_description = '선택된 문의를 확정으로 변경'
