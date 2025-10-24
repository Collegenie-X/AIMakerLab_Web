"""
문의 Admin
"""

from django.contrib import admin
from .models import Inquiry, Schedule


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
