"""
문의 관리 Admin
Enhanced with status management, filters, and bulk actions
"""

from django.contrib import admin
from django.utils.html import format_html
from django.db.models import Q
from django.utils import timezone
from .models import Inquiry, Schedule


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    """수업 문의 관리 (Inquiry Management Admin)"""

    list_display = [
        "inquiry_id",
        "title",
        "category",
        "status_badge",
        "requester_info",
        "course",
        "participant_count",
        "budget_display",
        "date",
        "days_since_inquiry",
    ]

    list_filter = [
        "status",
        "category",
        "course",
        "date",
        "created_at",
    ]

    search_fields = [
        "title",
        "requester_name",
        "requester_email",
        "requester_contact",
        "content",
        "location",
    ]

    ordering = ["-date", "-created_at"]

    date_hierarchy = "date"

    list_per_page = 50

    fieldsets = (
        (
            "기본 정보 (Basic Info)",
            {
                "fields": ("inquiry_id", "title", "category", "status", "date"),
                "classes": ("wide",),
            },
        ),
        (
            "문의자 정보 (Requester Info)",
            {
                "fields": ("requester_name", "requester_contact", "requester_email"),
                "classes": ("wide",),
            },
        ),
        (
            "수업 정보 (Class Info)",
            {
                "fields": (
                    "course",
                    "grade",
                    "participant_count",
                    "location",
                    "budget",
                ),
                "classes": ("wide",),
            },
        ),
        (
            "희망 일정 (Preferred Schedule)",
            {
                "fields": ("preferred_date", "preferred_time", "duration"),
                "classes": ("collapse",),
            },
        ),
        (
            "문의 내용 (Inquiry Content)",
            {
                "fields": ("content",),
                "classes": ("wide",),
            },
        ),
        (
            "메타 정보 (Meta Info)",
            {
                "fields": ("created_at", "updated_at"),
                "classes": ("collapse",),
            },
        ),
    )

    readonly_fields = ["inquiry_id", "created_at", "updated_at"]

    # Custom display methods
    def status_badge(self, obj):
        """상태 배지 (컬러)"""
        status_colors = {
            "pending": "#6c757d",  # 회색
            "reviewing": "#007bff",  # 파랑
            "quoted": "#ffc107",  # 노랑
            "confirmed": "#28a745",  # 초록
            "completed": "#17a2b8",  # 청록
        }
        status_icons = {
            "pending": "⏳",
            "reviewing": "🔍",
            "quoted": "💰",
            "confirmed": "✓",
            "completed": "✅",
        }
        color = status_colors.get(obj.status, "#6c757d")
        icon = status_icons.get(obj.status, "●")
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 10px; '
            'border-radius: 3px; font-weight: bold;">{} {}</span>',
            color,
            icon,
            obj.get_status_display(),
        )

    status_badge.short_description = "상태"

    def requester_info(self, obj):
        """문의자 정보 (이름 + 연락처)"""
        return format_html(
            "<strong>{}</strong><br>" "<small>📞 {}</small>",
            obj.requester_name,
            obj.requester_contact,
        )

    requester_info.short_description = "문의자"

    def budget_display(self, obj):
        """예산 표시"""
        if "협의" in obj.budget or "상담" in obj.budget:
            return format_html('<span style="color: #6c757d;">💬 협의</span>')
        return f"💰 {obj.budget}"

    budget_display.short_description = "예산"

    def days_since_inquiry(self, obj):
        """문의 후 경과 일수"""
        days = (timezone.now().date() - obj.date).days
        if days == 0:
            return format_html(
                '<span style="color: #28a745; font-weight: bold;">오늘</span>'
            )
        elif days <= 3:
            return format_html('<span style="color: #ffc107;">{} 일 전</span>', days)
        elif days <= 7:
            return format_html('<span style="color: #fd7e14;">{} 일 전</span>', days)
        else:
            return format_html('<span style="color: #dc3545;">{} 일 전</span>', days)

    days_since_inquiry.short_description = "경과 일수"

    # Custom actions
    actions = [
        "mark_as_reviewing",
        "mark_as_quoted",
        "mark_as_confirmed",
        "mark_as_completed",
        "mark_as_pending",
        "export_to_csv",
    ]

    def mark_as_reviewing(self, request, queryset):
        """선택한 문의를 '검토중' 상태로 변경"""
        updated = queryset.update(status="reviewing")
        self.message_user(request, f"{updated}건의 문의를 검토중으로 변경했습니다.")

    mark_as_reviewing.short_description = "🔍 검토중으로 변경"

    def mark_as_quoted(self, request, queryset):
        """선택한 문의를 '견적발송' 상태로 변경"""
        updated = queryset.update(status="quoted")
        self.message_user(request, f"{updated}건의 문의를 견적발송으로 변경했습니다.")

    mark_as_quoted.short_description = "💰 견적발송으로 변경"

    def mark_as_confirmed(self, request, queryset):
        """선택한 문의를 '확정' 상태로 변경"""
        updated = queryset.update(status="confirmed")
        self.message_user(request, f"{updated}건의 문의를 확정으로 변경했습니다.")

    mark_as_confirmed.short_description = "✓ 확정으로 변경"

    def mark_as_completed(self, request, queryset):
        """선택한 문의를 '완료' 상태로 변경"""
        updated = queryset.update(status="completed")
        self.message_user(request, f"{updated}건의 문의를 완료로 변경했습니다.")

    mark_as_completed.short_description = "✅ 완료로 변경"

    def mark_as_pending(self, request, queryset):
        """선택한 문의를 '접수대기' 상태로 변경"""
        updated = queryset.update(status="pending")
        self.message_user(request, f"{updated}건의 문의를 접수대기로 변경했습니다.")

    mark_as_pending.short_description = "⏳ 접수대기로 변경"

    def export_to_csv(self, request, queryset):
        """CSV로 내보내기"""
        import csv
        from django.http import HttpResponse

        response = HttpResponse(content_type="text/csv")
        response["Content-Disposition"] = 'attachment; filename="inquiries.csv"'
        response.write("\ufeff")  # UTF-8 BOM

        writer = csv.writer(response)
        writer.writerow(
            [
                "문의ID",
                "제목",
                "카테고리",
                "상태",
                "날짜",
                "문의자",
                "연락처",
                "이메일",
                "과정",
                "학년",
                "인원",
                "장소",
                "예산",
            ]
        )

        for obj in queryset:
            writer.writerow(
                [
                    obj.inquiry_id,
                    obj.title,
                    obj.category,
                    obj.get_status_display(),
                    obj.date,
                    obj.requester_name,
                    obj.requester_contact,
                    obj.requester_email,
                    obj.course,
                    obj.grade,
                    obj.participant_count,
                    obj.location,
                    obj.budget,
                ]
            )

        self.message_user(request, f"{queryset.count()}건의 문의를 CSV로 내보냈습니다.")
        return response

    export_to_csv.short_description = "📥 CSV로 내보내기"


@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    """수업 일정 관리 (Schedule Management Admin)"""

    list_display = [
        "schedule_id",
        "title",
        "schedule_type_badge",
        "course",
        "date",
        "time_range",
        "instructor",
        "occupancy_bar",
        "availability_badge",
        "order",
    ]

    list_filter = [
        "schedule_type",
        "course",
        "target_grade",
        "is_available",
        "instructor",
        "date",
    ]

    search_fields = [
        "title",
        "course",
        "instructor",
        "location",
        "description",
    ]

    ordering = ["date", "start_time"]

    date_hierarchy = "date"

    list_per_page = 50

    list_editable = ["order"]

    fieldsets = (
        (
            "기본 정보 (Basic Info)",
            {
                "fields": (
                    "schedule_id",
                    "schedule_type",
                    "title",
                    "course",
                    "instructor",
                ),
                "classes": ("wide",),
            },
        ),
        (
            "일정 정보 (Schedule Info)",
            {
                "fields": ("date", "start_time", "end_time", "duration"),
                "classes": ("wide",),
            },
        ),
        (
            "수업 정보 (Class Info)",
            {
                "fields": (
                    "target_grade",
                    "max_students",
                    "current_students",
                    "location",
                ),
                "classes": ("wide",),
            },
        ),
        (
            "추가 정보 (Additional Info)",
            {
                "fields": ("description", "requirements", "is_available", "order"),
                "classes": ("collapse",),
            },
        ),
        (
            "메타 정보 (Meta Info)",
            {
                "fields": ("created_at", "updated_at"),
                "classes": ("collapse",),
            },
        ),
    )

    readonly_fields = ["schedule_id", "created_at", "updated_at"]

    # Custom display methods
    def schedule_type_badge(self, obj):
        """일정 유형 배지"""
        if obj.schedule_type == "weekday":
            return format_html(
                '<span style="background-color: #007bff; color: white; padding: 3px 8px; '
                'border-radius: 3px;">📅 주중</span>'
            )
        else:
            return format_html(
                '<span style="background-color: #28a745; color: white; padding: 3px 8px; '
                'border-radius: 3px;">📆 주말</span>'
            )

    schedule_type_badge.short_description = "유형"

    def time_range(self, obj):
        """시간대 표시"""
        return format_html(
            '<span style="font-family: monospace;">⏰ {} ~ {}</span>',
            obj.start_time.strftime("%H:%M"),
            obj.end_time.strftime("%H:%M"),
        )

    time_range.short_description = "시간"

    def occupancy_bar(self, obj):
        """정원 현황 바"""
        percentage = (
            (obj.current_students / obj.max_students * 100)
            if obj.max_students > 0
            else 0
        )

        if percentage >= 100:
            color = "#dc3545"  # 빨강 (만석)
        elif percentage >= 80:
            color = "#ffc107"  # 노랑 (거의 만석)
        elif percentage >= 50:
            color = "#28a745"  # 초록 (여유)
        else:
            color = "#007bff"  # 파랑 (충분)

        return format_html(
            '<div style="width: 100px; background-color: #e9ecef; border-radius: 3px; overflow: hidden;">'
            '<div style="width: {}%; background-color: {}; color: white; text-align: center; '
            'padding: 2px 0; font-size: 10px; font-weight: bold;">'
            "{}/{}"
            "</div>"
            "</div>",
            min(percentage, 100),
            color,
            obj.current_students,
            obj.max_students,
        )

    occupancy_bar.short_description = "정원 현황"

    def availability_badge(self, obj):
        """수강 가능 여부 배지"""
        if not obj.is_available:
            return format_html(
                '<span style="background-color: #dc3545; color: white; padding: 3px 8px; '
                'border-radius: 3px;">✗ 불가</span>'
            )
        elif obj.is_full:
            return format_html(
                '<span style="background-color: #ffc107; color: white; padding: 3px 8px; '
                'border-radius: 3px;">⚠ 만석</span>'
            )
        else:
            return format_html(
                '<span style="background-color: #28a745; color: white; padding: 3px 8px; '
                'border-radius: 3px;">✓ 가능</span>'
            )

    availability_badge.short_description = "수강 가능"

    # Custom actions
    actions = [
        "make_available",
        "make_unavailable",
        "reset_occupancy",
        "mark_as_full",
    ]

    def make_available(self, request, queryset):
        """선택한 일정을 수강 가능으로 변경"""
        updated = queryset.update(is_available=True)
        self.message_user(request, f"{updated}개의 일정을 수강 가능으로 변경했습니다.")

    make_available.short_description = "✓ 수강 가능으로 변경"

    def make_unavailable(self, request, queryset):
        """선택한 일정을 수강 불가로 변경"""
        updated = queryset.update(is_available=False)
        self.message_user(request, f"{updated}개의 일정을 수강 불가로 변경했습니다.")

    make_unavailable.short_description = "✗ 수강 불가로 변경"

    def reset_occupancy(self, request, queryset):
        """선택한 일정의 현재 인원을 0으로 초기화"""
        updated = queryset.update(current_students=0)
        self.message_user(request, f"{updated}개의 일정 인원을 초기화했습니다.")

    reset_occupancy.short_description = "🔄 현재 인원 초기화"

    def mark_as_full(self, request, queryset):
        """선택한 일정을 만석으로 표시 (현재 인원 = 최대 인원)"""
        count = 0
        for schedule in queryset:
            schedule.current_students = schedule.max_students
            schedule.save()
            count += 1
        self.message_user(request, f"{count}개의 일정을 만석으로 표시했습니다.")

    mark_as_full.short_description = "⚠ 만석으로 표시"
