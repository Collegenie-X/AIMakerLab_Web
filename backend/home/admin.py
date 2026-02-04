"""
홈페이지 관리 Admin
Enhanced with image preview, active/inactive management, and ordering
"""

from django.contrib import admin
from django.utils.html import format_html
from .models import (
    HeroSlide,
    IntroVideo,
    Feature,
    CurriculumHighlight,
    OutreachStats,
    QuickLink,
    HomepageConfig,
)


@admin.register(HeroSlide)
class HeroSlideAdmin(admin.ModelAdmin):
    """히어로 슬라이드 관리 (Hero Slide Admin)"""

    list_display = [
        "order",
        "image_preview",
        "title",
        "cta_label",
        "active_badge",
        "updated_at",
    ]

    list_display_links = ["image_preview", "title"]  # 링크 필드 명시

    list_filter = [
        "is_active",
        "created_at",
    ]

    search_fields = [
        "title",
        "description",
        "cta_label",
    ]

    ordering = ["order"]

    list_editable = ["order"]

    fieldsets = (
        (
            "기본 정보 (Basic Info)",
            {
                "fields": ("title", "description"),
                "classes": ("wide",),
            },
        ),
        (
            "이미지 (Image)",
            {
                "fields": ("image", "image_preview"),
                "classes": ("wide",),
            },
        ),
        (
            "버튼 (Call-to-Action)",
            {
                "fields": ("cta_label", "cta_href"),
                "classes": ("wide",),
            },
        ),
        (
            "설정 (Settings)",
            {
                "fields": ("is_active", "order"),
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

    readonly_fields = ["image_preview", "created_at", "updated_at"]

    # Custom display methods
    def image_preview(self, obj):
        """이미지 미리보기"""
        if obj.image:
            return format_html(
                '<img src="{}" style="max-width: 500px; max-height: 300px; '
                'border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />',
                obj.image.url,
            )
        return "이미지 없음"

    image_preview.short_description = "이미지 미리보기"

    def active_badge(self, obj):
        """활성화 상태 배지"""
        if obj.is_active:
            return format_html(
                '<span style="background-color: #28a745; color: white; padding: 3px 10px; '
                'border-radius: 3px; font-weight: bold;">✓ 활성</span>'
            )
        else:
            return format_html(
                '<span style="background-color: #dc3545; color: white; padding: 3px 10px; '
                'border-radius: 3px; font-weight: bold;">✗ 비활성</span>'
            )

    active_badge.short_description = "상태"

    # Custom actions
    actions = ["activate_slides", "deactivate_slides"]

    def activate_slides(self, request, queryset):
        """선택한 슬라이드 활성화"""
        updated = queryset.update(is_active=True)
        self.message_user(request, f"{updated}개 슬라이드를 활성화했습니다.")

    activate_slides.short_description = "✓ 선택한 슬라이드 활성화"

    def deactivate_slides(self, request, queryset):
        """선택한 슬라이드 비활성화"""
        updated = queryset.update(is_active=False)
        self.message_user(request, f"{updated}개 슬라이드를 비활성화했습니다.")

    deactivate_slides.short_description = "✗ 선택한 슬라이드 비활성화"


@admin.register(IntroVideo)
class IntroVideoAdmin(admin.ModelAdmin):
    """소개 영상 관리 (Intro Video Admin)"""

    list_display = [
        "heading",
        "youtube_title",
        "video_preview",
        "active_badge",
        "updated_at",
    ]

    list_filter = [
        "is_active",
        "created_at",
    ]

    search_fields = [
        "heading",
        "subheading",
        "youtube_title",
    ]

    fieldsets = (
        (
            "기본 정보 (Basic Info)",
            {
                "fields": ("heading", "subheading", "youtube_title"),
                "classes": ("wide",),
            },
        ),
        (
            "영상 (Video)",
            {
                "fields": ("youtube_embed_url", "video_preview"),
                "classes": ("wide",),
            },
        ),
        (
            "설정 (Settings)",
            {
                "fields": ("is_active",),
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

    readonly_fields = ["video_preview", "created_at", "updated_at"]

    # Custom display methods
    def video_preview(self, obj):
        """YouTube 영상 미리보기"""
        if obj.youtube_embed_url:
            return format_html(
                '<iframe width="560" height="315" src="{}" '
                'frameborder="0" allow="accelerometer; autoplay; encrypted-media; '
                'gyroscope; picture-in-picture" allowfullscreen></iframe>',
                obj.youtube_embed_url,
            )
        return "영상 URL 없음"

    video_preview.short_description = "YouTube 영상 미리보기"

    def active_badge(self, obj):
        """활성화 상태 배지"""
        if obj.is_active:
            return format_html(
                '<span style="background-color: #28a745; color: white; padding: 3px 10px; '
                'border-radius: 3px;">✓ 활성</span>'
            )
        else:
            return format_html(
                '<span style="background-color: #dc3545; color: white; padding: 3px 10px; '
                'border-radius: 3px;">✗ 비활성</span>'
            )

    active_badge.short_description = "상태"


@admin.register(Feature)
class FeatureAdmin(admin.ModelAdmin):
    """특징 관리 (Feature Admin)"""

    list_display = [
        "order",
        "icon",
        "title",
        "active_badge",
        "updated_at",
    ]

    list_display_links = ["icon", "title"]  # 링크 필드 명시

    list_filter = [
        "is_active",
        "created_at",
    ]

    search_fields = [
        "title",
        "description",
    ]

    ordering = ["order"]

    list_editable = ["order"]

    fieldsets = (
        (
            "기본 정보 (Basic Info)",
            {
                "fields": ("icon", "title", "description"),
                "classes": ("wide",),
            },
        ),
        (
            "설정 (Settings)",
            {
                "fields": ("is_active", "order"),
                "classes": ("wide",),
            },
        ),
    )

    # Custom display methods
    def active_badge(self, obj):
        """활성화 상태 배지"""
        if obj.is_active:
            return format_html(
                '<span style="color: #28a745; font-weight: bold;">✓</span>'
            )
        else:
            return format_html(
                '<span style="color: #dc3545; font-weight: bold;">✗</span>'
            )

    active_badge.short_description = "상태"

    # Custom actions
    actions = ["activate_features", "deactivate_features"]

    def activate_features(self, request, queryset):
        """선택한 특징 활성화"""
        updated = queryset.update(is_active=True)
        self.message_user(request, f"{updated}개 특징을 활성화했습니다.")

    activate_features.short_description = "✓ 선택한 특징 활성화"

    def deactivate_features(self, request, queryset):
        """선택한 특징 비활성화"""
        updated = queryset.update(is_active=False)
        self.message_user(request, f"{updated}개 특징을 비활성화했습니다.")

    deactivate_features.short_description = "✗ 선택한 특징 비활성화"


@admin.register(CurriculumHighlight)
class CurriculumHighlightAdmin(admin.ModelAdmin):
    """커리큘럼 하이라이트 관리 (Curriculum Highlight Admin)"""

    list_display = [
        "order",
        "image_preview",
        "title",
        "level_badge",
        "info_display",
        "active_badge",
    ]

    list_display_links = ["image_preview", "title"]  # 링크 필드 명시

    list_filter = [
        "level_badge",
        "is_active",
        "created_at",
    ]

    search_fields = [
        "title",
        "description",
    ]

    ordering = ["order"]

    list_editable = ["order"]

    fieldsets = (
        (
            "기본 정보 (Basic Info)",
            {
                "fields": ("title", "description", "href"),
                "classes": ("wide",),
            },
        ),
        (
            "이미지 (Image)",
            {
                "fields": ("image", "image_preview"),
                "classes": ("wide",),
            },
        ),
        (
            "상세 정보 (Details)",
            {
                "fields": ("level_badge", "duration", "size"),
                "classes": ("wide",),
            },
        ),
        (
            "설정 (Settings)",
            {
                "fields": ("is_active", "order"),
                "classes": ("wide",),
            },
        ),
    )

    readonly_fields = ["image_preview"]

    # Custom display methods
    def image_preview(self, obj):
        """이미지 미리보기"""
        if obj.image:
            return format_html(
                '<img src="{}" style="max-width: 300px; max-height: 200px; '
                'border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />',
                obj.image.url,
            )
        return "이미지 없음"

    image_preview.short_description = "이미지 미리보기"

    def info_display(self, obj):
        """정보 표시 (기간, 인원)"""
        return format_html(
            '<div style="font-size: 11px;">'
            "<div>⏰ {}</div>"
            "<div>👥 {}</div>"
            "</div>",
            obj.duration,
            obj.size,
        )

    info_display.short_description = "정보"

    def active_badge(self, obj):
        """활성화 상태 배지"""
        if obj.is_active:
            return format_html('<span style="color: #28a745;">✓</span>')
        else:
            return format_html('<span style="color: #dc3545;">✗</span>')

    active_badge.short_description = "상태"

    # Custom actions
    actions = ["activate_items", "deactivate_items"]

    def activate_items(self, request, queryset):
        """선택한 항목 활성화"""
        updated = queryset.update(is_active=True)
        self.message_user(request, f"{updated}개 항목을 활성화했습니다.")

    activate_items.short_description = "✓ 선택한 항목 활성화"

    def deactivate_items(self, request, queryset):
        """선택한 항목 비활성화"""
        updated = queryset.update(is_active=False)
        self.message_user(request, f"{updated}개 항목을 비활성화했습니다.")

    deactivate_items.short_description = "✗ 선택한 항목 비활성화"


@admin.register(OutreachStats)
class OutreachStatsAdmin(admin.ModelAdmin):
    """출강 통계 관리 (Outreach Stats Admin)"""

    list_display = [
        "order",
        "metric_icon",
        "value",
        "caption",
        "active_badge",
    ]

    list_display_links = ["metric_icon", "caption"]  # 링크 필드 명시

    list_filter = [
        "is_active",
        "created_at",
    ]

    search_fields = [
        "caption",
        "value",
    ]

    ordering = ["order"]

    list_editable = ["order"]

    fieldsets = (
        (
            "기본 정보 (Basic Info)",
            {
                "fields": ("metric_icon", "value", "caption"),
                "classes": ("wide",),
            },
        ),
        (
            "설정 (Settings)",
            {
                "fields": ("is_active", "order"),
                "classes": ("wide",),
            },
        ),
    )

    # Custom display methods
    def active_badge(self, obj):
        """활성화 상태 배지"""
        if obj.is_active:
            return format_html('<span style="color: #28a745;">✓</span>')
        else:
            return format_html('<span style="color: #dc3545;">✗</span>')

    active_badge.short_description = "상태"


@admin.register(QuickLink)
class QuickLinkAdmin(admin.ModelAdmin):
    """빠른 링크 관리 (Quick Link Admin)"""

    list_display = [
        "order",
        "icon",
        "title",
        "category_badge",
        "active_badge",
    ]

    list_display_links = ["icon", "title"]  # 링크 필드 명시

    list_filter = [
        "category",
        "is_active",
        "created_at",
    ]

    search_fields = [
        "title",
        "description",
    ]

    ordering = ["order"]

    list_editable = ["order"]

    fieldsets = (
        (
            "기본 정보 (Basic Info)",
            {
                "fields": ("category", "title", "description", "icon"),
                "classes": ("wide",),
            },
        ),
        (
            "링크 (Link)",
            {
                "fields": ("href",),
                "classes": ("wide",),
            },
        ),
        (
            "설정 (Settings)",
            {
                "fields": ("is_active", "order"),
                "classes": ("wide",),
            },
        ),
    )

    # Custom display methods
    def category_badge(self, obj):
        """카테고리 배지"""
        colors = {
            "inquiry": "#007bff",  # 파랑
            "curriculum": "#28a745",  # 초록
            "products": "#ffc107",  # 노랑
            "about": "#6c757d",  # 회색
        }
        color = colors.get(obj.category, "#6c757d")
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 8px; '
            'border-radius: 3px; font-size: 11px;">{}</span>',
            color,
            obj.get_category_display(),
        )

    category_badge.short_description = "카테고리"

    def active_badge(self, obj):
        """활성화 상태 배지"""
        if obj.is_active:
            return format_html('<span style="color: #28a745;">✓</span>')
        else:
            return format_html('<span style="color: #dc3545;">✗</span>')

    active_badge.short_description = "상태"


@admin.register(HomepageConfig)
class HomepageConfigAdmin(admin.ModelAdmin):
    """홈페이지 설정 관리 (Homepage Config Admin - Singleton)"""

    def has_add_permission(self, request):
        """추가 권한 없음 (단일 설정 객체만 존재)"""
        return not HomepageConfig.objects.exists()

    def has_delete_permission(self, request, obj=None):
        """삭제 권한 없음 (설정 보존)"""
        return False

    fieldsets = (
        (
            "사이트 정보 (Site Info)",
            {
                "fields": ("site_name",),
                "classes": ("wide",),
            },
        ),
        (
            "Hero 섹션 설정 (Hero Section)",
            {
                "fields": (
                    "hero_heading",
                    "hero_subheading",
                    "carousel_autoplay",
                    "carousel_interval_ms",
                    "carousel_indicators",
                    "carousel_pause_on_hover",
                ),
                "classes": ("wide",),
            },
        ),
        (
            "Features 섹션 설정 (Features Section)",
            {
                "fields": (
                    "features_heading",
                    "features_subheading",
                ),
                "classes": ("wide",),
            },
        ),
        (
            "Curriculum 섹션 설정 (Curriculum Section)",
            {
                "fields": (
                    "curriculum_section_badge",
                    "curriculum_heading",
                    "curriculum_subheading",
                    "curriculum_view_all_label",
                ),
                "classes": ("wide",),
            },
        ),
        (
            "Outreach 섹션 설정 (Outreach Section)",
            {
                "fields": (
                    "outreach_heading",
                    "outreach_subheading",
                    "outreach_grades",
                    "outreach_image",
                    "outreach_card_title",
                    "outreach_card_lines",
                    "outreach_hashtags",
                ),
                "classes": ("wide",),
                "description": 'JSONField는 배열 형식으로 입력: ["항목1", "항목2"]',
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

    readonly_fields = ["created_at", "updated_at"]

    # Override change_view to show custom messages
    def change_view(self, request, object_id, form_url="", extra_context=None):
        """설정 변경 뷰 (단일 설정 경고 메시지)"""
        extra_context = extra_context or {}
        extra_context["title"] = "홈페이지 전역 설정 (Singleton)"
        extra_context["subtitle"] = (
            "⚠️ 이 설정은 단 하나만 존재하며, 전체 홈페이지에 적용됩니다."
        )
        return super().change_view(
            request, object_id, form_url, extra_context=extra_context
        )
