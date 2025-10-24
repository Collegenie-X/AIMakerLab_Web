"""
사용자 관리 Admin
"""

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model
from .models import EmailVerification

User = get_user_model()


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """사용자 Admin"""
    
    list_display = [
        'email',
        'name',
        'email_verified',
        'social_provider',
        'is_active',
        'is_staff',
        'date_joined',
    ]
    list_filter = [
        'is_active',
        'is_staff',
        'is_superuser',
        'email_verified',
        'social_provider',
        'date_joined',
    ]
    search_fields = ['email', 'name', 'phone']
    ordering = ['-date_joined']
    
    fieldsets = (
        ('기본 정보', {
            'fields': ('email', 'password', 'name', 'phone')
        }),
        ('인증 정보', {
            'fields': ('email_verified', 'social_provider', 'social_id')
        }),
        ('권한', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')
        }),
        ('중요 날짜', {
            'fields': ('last_login', 'date_joined')
        }),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'name', 'phone'),
        }),
    )
    
    readonly_fields = ['date_joined', 'last_login']


@admin.register(EmailVerification)
class EmailVerificationAdmin(admin.ModelAdmin):
    """이메일 인증 Admin"""
    
    list_display = [
        'user',
        'token_preview',
        'created_at',
        'expires_at',
        'is_used',
    ]
    list_filter = ['is_used', 'created_at', 'expires_at']
    search_fields = ['user__email', 'token']
    ordering = ['-created_at']
    
    readonly_fields = ['user', 'token', 'created_at', 'expires_at']
    
    def token_preview(self, obj):
        """토큰 미리보기 (앞 20자만)"""
        return f'{obj.token[:20]}...'
    token_preview.short_description = '토큰'
    
    def has_add_permission(self, request):
        """생성 권한 없음 (자동 생성만)"""
        return False
