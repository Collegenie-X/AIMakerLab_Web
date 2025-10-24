"""
홈페이지 Admin
"""

from django.contrib import admin
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
    """히어로 슬라이드 Admin"""

    list_display = ["title", "cta_label", "is_active", "order"]
    list_filter = ["is_active", "created_at"]
    search_fields = ["title", "description"]
    ordering = ["order"]

    fieldsets = (
        ("기본 정보", {"fields": ("title", "description", "image")}),
        ("버튼", {"fields": ("cta_label", "cta_href")}),
        ("설정", {"fields": ("is_active", "order")}),
    )


@admin.register(IntroVideo)
class IntroVideoAdmin(admin.ModelAdmin):
    """소개 영상 Admin"""

    list_display = ["heading", "youtube_title", "is_active"]
    list_filter = ["is_active", "created_at"]
    search_fields = ["heading", "subheading", "youtube_title"]

    fieldsets = (
        ("기본 정보", {"fields": ("heading", "subheading", "youtube_title")}),
        ("영상", {"fields": ("youtube_embed_url",)}),
        ("설정", {"fields": ("is_active",)}),
    )


@admin.register(Feature)
class FeatureAdmin(admin.ModelAdmin):
    """특징 Admin"""

    list_display = ["title", "icon", "is_active", "order"]
    list_filter = ["is_active", "created_at"]
    search_fields = ["title", "description"]
    ordering = ["order"]

    fieldsets = (
        ("기본 정보", {"fields": ("icon", "title", "description")}),
        ("설정", {"fields": ("is_active", "order")}),
    )


@admin.register(CurriculumHighlight)
class CurriculumHighlightAdmin(admin.ModelAdmin):
    """커리큘럼 하이라이트 Admin"""

    list_display = ["title", "level_badge", "duration", "size", "is_active", "order"]
    list_filter = ["level_badge", "is_active", "created_at"]
    search_fields = ["title", "description"]
    ordering = ["order"]

    fieldsets = (
        ("기본 정보", {"fields": ("title", "description", "image", "href")}),
        ("상세 정보", {"fields": ("level_badge", "duration", "size")}),
        ("설정", {"fields": ("is_active", "order")}),
    )


@admin.register(OutreachStats)
class OutreachStatsAdmin(admin.ModelAdmin):
    """출강 통계 Admin"""

    list_display = ["caption", "value", "metric_icon", "is_active", "order"]
    list_filter = ["is_active", "created_at"]
    search_fields = ["caption", "value"]
    ordering = ["order"]

    fieldsets = (
        ("기본 정보", {"fields": ("metric_icon", "value", "caption")}),
        ("설정", {"fields": ("is_active", "order")}),
    )


@admin.register(QuickLink)
class QuickLinkAdmin(admin.ModelAdmin):
    """빠른 링크 Admin"""

    list_display = ["title", "category", "icon", "is_active", "order"]
    list_filter = ["category", "is_active", "created_at"]
    search_fields = ["title", "description"]
    ordering = ["order"]

    fieldsets = (
        ("기본 정보", {"fields": ("category", "title", "description", "icon")}),
        ("링크", {"fields": ("href",)}),
        ("설정", {"fields": ("is_active", "order")}),
    )


@admin.register(HomepageConfig)
class HomepageConfigAdmin(admin.ModelAdmin):
    """홈페이지 설정 Admin"""

    def has_add_permission(self, request):
        """추가 권한 없음 (Singleton)"""
        return not HomepageConfig.objects.exists()

    def has_delete_permission(self, request, obj=None):
        """삭제 권한 없음"""
        return False

    fieldsets = (
        ("사이트 정보", {"fields": ("site_name",)}),
        (
            "Hero 섹션",
            {
                "fields": (
                    "hero_heading",
                    "hero_subheading",
                    "carousel_autoplay",
                    "carousel_interval_ms",
                    "carousel_indicators",
                    "carousel_pause_on_hover",
                )
            },
        ),
        ("Features 섹션", {"fields": ("features_heading", "features_subheading")}),
        (
            "Curriculum 섹션",
            {
                "fields": (
                    "curriculum_section_badge",
                    "curriculum_heading",
                    "curriculum_subheading",
                    "curriculum_view_all_label",
                )
            },
        ),
        (
            "Outreach 섹션",
            {
                "fields": (
                    "outreach_heading",
                    "outreach_subheading",
                    "outreach_grades",
                    "outreach_image",
                    "outreach_card_title",
                    "outreach_card_lines",
                    "outreach_hashtags",
                )
            },
        ),
    )
