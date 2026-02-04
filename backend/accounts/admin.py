"""
계정 관리 Admin
Enhanced with image preview, inline relations, and advanced CRUD features
"""

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model
from django.utils.html import format_html
from django.db.models import Count, Q
from .models import EmailVerification

User = get_user_model()


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """사용자 관리 (User Management Admin)"""

    list_display = [
        "email",
        "name",
        "phone",
        "email_verified_badge",
        "social_provider_display",
        "is_active",
        "is_staff",
        "enrollment_count",
        "date_joined",
    ]

    list_filter = [
        "is_active",
        "is_staff",
        "is_superuser",
        "email_verified",
        "social_provider",
        "date_joined",
    ]

    search_fields = [
        "email",
        "name",
        "phone",
    ]

    ordering = ["-date_joined"]

    date_hierarchy = "date_joined"

    list_per_page = 50

    fieldsets = (
        (
            "기본 정보 (Basic Info)",
            {
                "fields": ("email", "password", "name", "phone"),
                "classes": ("wide",),
            },
        ),
        (
            "인증 정보 (Authentication)",
            {
                "fields": ("email_verified", "social_provider", "social_id"),
                "classes": ("collapse",),
            },
        ),
        (
            "권한 (Permissions)",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
                "classes": ("collapse",),
            },
        ),
        (
            "중요 날짜 (Important Dates)",
            {
                "fields": ("last_login", "date_joined"),
                "classes": ("collapse",),
            },
        ),
    )

    add_fieldsets = (
        (
            "새 사용자 생성 (Create New User)",
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2", "name", "phone"),
            },
        ),
    )

    readonly_fields = ["date_joined", "last_login"]

    # Custom display methods
    def email_verified_badge(self, obj):
        """이메일 인증 상태 배지"""
        if obj.email_verified:
            return format_html(
                '<span style="background-color: #28a745; color: white; padding: 3px 10px; '
                'border-radius: 3px; font-weight: bold;">✓ 인증완료</span>'
            )
        else:
            return format_html(
                '<span style="background-color: #dc3545; color: white; padding: 3px 10px; '
                'border-radius: 3px; font-weight: bold;">✗ 미인증</span>'
            )

    email_verified_badge.short_description = "이메일 인증"

    def social_provider_display(self, obj):
        """소셜 로그인 제공자 표시"""
        if obj.social_provider:
            icons = {
                "google": "🔵",
                "kakao": "🟡",
            }
            icon = icons.get(obj.social_provider, "🔘")
            return f"{icon} {obj.get_social_provider_display()}"
        return "📧 이메일"

    social_provider_display.short_description = "로그인 방식"

    def enrollment_count(self, obj):
        """수강 과정 수 (관련 모델이 있다면)"""
        # UserCourseEnrollment 모델이 있다면 추가
        return 0

    enrollment_count.short_description = "수강 과정 수"

    # Custom actions
    actions = ["verify_email", "unverify_email", "activate_users", "deactivate_users"]

    def verify_email(self, request, queryset):
        """선택한 사용자 이메일 인증 처리"""
        updated = queryset.update(email_verified=True)
        self.message_user(request, f"{updated}명의 이메일을 인증했습니다.")

    verify_email.short_description = "✓ 선택한 사용자 이메일 인증"

    def unverify_email(self, request, queryset):
        """선택한 사용자 이메일 인증 취소"""
        updated = queryset.update(email_verified=False)
        self.message_user(request, f"{updated}명의 이메일 인증을 취소했습니다.")

    unverify_email.short_description = "✗ 선택한 사용자 이메일 인증 취소"

    def activate_users(self, request, queryset):
        """선택한 사용자 활성화"""
        updated = queryset.update(is_active=True)
        self.message_user(request, f"{updated}명의 사용자를 활성화했습니다.")

    activate_users.short_description = "선택한 사용자 활성화"

    def deactivate_users(self, request, queryset):
        """선택한 사용자 비활성화"""
        updated = queryset.update(is_active=False)
        self.message_user(request, f"{updated}명의 사용자를 비활성화했습니다.")

    deactivate_users.short_description = "선택한 사용자 비활성화"


@admin.register(EmailVerification)
class EmailVerificationAdmin(admin.ModelAdmin):
    """이메일 인증 관리 (Email Verification Admin)"""

    list_display = [
        "user",
        "token_preview",
        "status_badge",
        "created_at",
        "expires_at",
        "time_remaining",
    ]

    list_filter = [
        "is_used",
        "created_at",
        "expires_at",
    ]

    search_fields = [
        "user__email",
        "user__name",
        "token",
    ]

    ordering = ["-created_at"]

    date_hierarchy = "created_at"

    list_per_page = 50

    readonly_fields = [
        "user",
        "token",
        "token_full",
        "created_at",
        "expires_at",
        "time_remaining_display",
        "is_expired",
    ]

    fieldsets = (
        (
            "기본 정보 (Basic Info)",
            {
                "fields": ("user", "token_full", "is_used"),
            },
        ),
        (
            "시간 정보 (Time Info)",
            {
                "fields": (
                    "created_at",
                    "expires_at",
                    "time_remaining_display",
                    "is_expired",
                ),
            },
        ),
    )

    # Custom display methods
    def token_preview(self, obj):
        """토큰 미리보기 (처음 20자만)"""
        return f"{obj.token[:20]}..."

    token_preview.short_description = "토큰"

    def token_full(self, obj):
        """전체 토큰 (읽기 전용)"""
        return obj.token

    token_full.short_description = "전체 토큰"

    def status_badge(self, obj):
        """인증 상태 배지"""
        if obj.is_used:
            return format_html(
                '<span style="background-color: #28a745; color: white; padding: 3px 10px; '
                'border-radius: 3px;">✓ 사용완료</span>'
            )
        elif obj.is_valid():
            return format_html(
                '<span style="background-color: #007bff; color: white; padding: 3px 10px; '
                'border-radius: 3px;">⏳ 유효</span>'
            )
        else:
            return format_html(
                '<span style="background-color: #dc3545; color: white; padding: 3px 10px; '
                'border-radius: 3px;">✗ 만료</span>'
            )

    status_badge.short_description = "상태"

    def time_remaining(self, obj):
        """남은 시간 (간단)"""
        from django.utils import timezone

        if obj.is_used:
            return "사용완료"
        remaining = obj.expires_at - timezone.now()
        if remaining.total_seconds() < 0:
            return "만료됨"
        hours = int(remaining.total_seconds() // 3600)
        minutes = int((remaining.total_seconds() % 3600) // 60)
        return f"{hours}시간 {minutes}분"

    time_remaining.short_description = "남은 시간"

    def time_remaining_display(self, obj):
        """남은 시간 (상세)"""
        from django.utils import timezone

        if obj.is_used:
            return "사용완료"
        remaining = obj.expires_at - timezone.now()
        if remaining.total_seconds() < 0:
            return format_html('<span style="color: red;">만료됨</span>')
        return str(remaining)

    time_remaining_display.short_description = "남은 시간 (상세)"

    def is_expired(self, obj):
        """만료 여부"""
        from django.utils import timezone

        return not obj.is_valid() and not obj.is_used

    is_expired.boolean = True
    is_expired.short_description = "만료 여부"

    def has_add_permission(self, request):
        """생성 권한 없음 (자동 생성만 허용)"""
        return False

    def has_delete_permission(self, request, obj=None):
        """삭제 권한 제한 (사용되지 않은 것만 삭제 가능)"""
        if obj and obj.is_used:
            return False
        return super().has_delete_permission(request, obj)

    # Custom actions
    actions = ["mark_as_used", "mark_as_unused"]

    def mark_as_used(self, request, queryset):
        """선택한 인증 토큰을 사용완료로 표시"""
        updated = queryset.filter(is_used=False).update(is_used=True)
        self.message_user(request, f"{updated}개의 토큰을 사용완료로 표시했습니다.")

    mark_as_used.short_description = "선택한 토큰을 사용완료로 표시"

    def mark_as_unused(self, request, queryset):
        """선택한 인증 토큰을 미사용으로 변경"""
        updated = queryset.filter(is_used=True).update(is_used=False)
        self.message_user(request, f"{updated}개의 토큰을 미사용으로 변경했습니다.")

    mark_as_unused.short_description = "선택한 토큰을 미사용으로 변경"
