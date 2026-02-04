"""
커리큘럼 관리 Admin
Enhanced with nested inline relations, image preview, and comprehensive filtering
"""

from django.contrib import admin
from django.utils.html import format_html
from .models import (
    Curriculum,
    CourseInfo,
    LearningGoal,
    CurriculumProject,
    ProjectTab,
    Module,
    GradeRecommendation,
    EducationRequirement,
    Material,
)


# ============================================
# Inline Admin Classes (관계형 데이터 관리)
# ============================================


class CourseInfoInline(admin.TabularInline):
    """과정 정보 인라인 (Course Info Inline)"""

    model = CourseInfo
    extra = 1
    fields = ["info_id", "icon", "icon_color", "label", "value", "order"]
    ordering = ["order"]
    verbose_name = "과정 정보"
    verbose_name_plural = "과정 정보 목록"


class LearningGoalInline(admin.StackedInline):
    """학습 목표 인라인 (Learning Goal Inline)"""

    model = LearningGoal
    extra = 1
    fields = ["goal_id", "category", "title", "description", "skills", "order"]
    ordering = ["order"]
    verbose_name = "학습 목표"
    verbose_name_plural = "학습 목표 목록"

    # JSONField 도움말
    help_texts = {
        "skills": '배열 형식으로 입력: ["기술1", "기술2", "기술3"]',
    }


class GradeRecommendationInline(admin.TabularInline):
    """학년별 추천 인라인 (Grade Recommendation Inline)"""

    model = GradeRecommendation
    extra = 1
    fields = [
        "course_id",
        "course_name",
        "difficulty",
        "duration",
        "elementary_mid",
        "elementary_high",
        "middle_low",
        "middle_high",
        "high",
        "order",
    ]
    ordering = ["order"]
    verbose_name = "학년별 추천"
    verbose_name_plural = "학년별 추천 목록"


class EducationRequirementInline(admin.StackedInline):
    """교육 조건 인라인 (Education Requirement Inline)"""

    model = EducationRequirement
    extra = 1
    fields = [
        "requirement_id",
        "icon",
        "icon_color",
        "title",
        "description",
        "details",
        "order",
    ]
    ordering = ["order"]
    verbose_name = "교육 조건"
    verbose_name_plural = "교육 조건 목록"


class ProjectTabInline(admin.StackedInline):
    """프로젝트 탭 인라인 (Project Tab Inline)"""

    model = ProjectTab
    extra = 1
    fields = ["tab_id", "label", "duration", "description", "order"]
    ordering = ["order"]
    verbose_name = "프로젝트 탭"
    verbose_name_plural = "프로젝트 탭 목록"


class ModuleInline(admin.StackedInline):
    """수업 모듈 인라인 (Module Inline)"""

    model = Module
    extra = 1
    fields = ["module_id", "title", "duration", "detail_description", "topics", "order"]
    ordering = ["order"]
    verbose_name = "수업 모듈"
    verbose_name_plural = "수업 모듈 목록"


# ============================================
# Main Admin Classes (주요 Admin 클래스)
# ============================================


@admin.register(Curriculum)
class CurriculumAdmin(admin.ModelAdmin):
    """커리큘럼 관리 (Curriculum Management Admin)"""

    list_display = [
        "title",
        "category_badge",
        "badge_display",
        "related_counts",
        "order",
        "updated_at",
    ]

    list_filter = [
        "category",
        "created_at",
        "updated_at",
    ]

    search_fields = [
        "title",
        "description",
        "meta_title",
        "meta_description",
    ]

    ordering = ["order", "category"]

    list_editable = ["order"]

    fieldsets = (
        (
            "기본 정보 (Basic Info)",
            {
                "fields": (
                    "category",
                    "title",
                    "description",
                    "badge",
                    "gradient_class",
                    "order",
                ),
                "classes": ("wide",),
            },
        ),
        (
            "메타 정보 (Meta Info)",
            {
                "fields": ("meta_title", "meta_description"),
                "classes": ("collapse",),
            },
        ),
        (
            "날짜 정보 (Date Info)",
            {
                "fields": ("created_at", "updated_at"),
                "classes": ("collapse",),
            },
        ),
    )

    readonly_fields = ["created_at", "updated_at"]

    inlines = [
        CourseInfoInline,
        LearningGoalInline,
        GradeRecommendationInline,
        EducationRequirementInline,
    ]

    # Custom display methods
    def category_badge(self, obj):
        """카테고리 배지"""
        colors = {
            "ai-education": "#dc3545",  # 빨강
            "app-inventor": "#28a745",  # 초록
            "arduino": "#007bff",  # 파랑
            "raspberry-pi": "#6f42c1",  # 보라
            "science": "#fd7e14",  # 주황
        }
        color = colors.get(obj.category, "#6c757d")
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 10px; '
            'border-radius: 3px; font-weight: bold;">{}</span>',
            color,
            obj.get_category_display(),
        )

    category_badge.short_description = "카테고리"

    def badge_display(self, obj):
        """배지 표시"""
        if obj.badge:
            return format_html(
                '<span style="background-color: #ffc107; color: #000; padding: 2px 8px; '
                'border-radius: 3px; font-size: 11px;">{}</span>',
                obj.badge,
            )
        return "-"

    badge_display.short_description = "배지"

    def related_counts(self, obj):
        """관련 항목 수"""
        course_info_count = obj.course_info_items.count()
        goals_count = obj.learning_goals.count()
        projects_count = obj.projects.count()

        return format_html(
            '<div style="font-size: 11px;">'
            "<div>📋 과정정보: {}</div>"
            "<div>🎯 학습목표: {}</div>"
            "<div>📁 프로젝트: {}</div>"
            "</div>",
            course_info_count,
            goals_count,
            projects_count,
        )

    related_counts.short_description = "관련 항목"


@admin.register(CurriculumProject)
class CurriculumProjectAdmin(admin.ModelAdmin):
    """커리큘럼 프로젝트 관리 (Curriculum Project Admin)"""

    list_display = [
        "project_id",
        "image_preview",
        "title",
        "curriculum",
        "difficulty_badge",
        "university_display",
        "tab_count",
        "order",
    ]

    list_filter = [
        "curriculum",
        "difficulty",
    ]

    search_fields = [
        "title",
        "description",
        "project_id",
        "university",
    ]

    ordering = ["curriculum", "order"]

    list_editable = ["order"]

    fieldsets = (
        (
            "기본 정보 (Basic Info)",
            {
                "fields": ("curriculum", "project_id", "title", "description"),
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
                "fields": ("difficulty", "university", "order"),
                "classes": ("wide",),
            },
        ),
    )

    readonly_fields = ["image_preview"]

    inlines = [ProjectTabInline]

    # Custom display methods
    def image_preview(self, obj):
        """이미지 미리보기"""
        if obj.image:
            return format_html(
                '<img src="{}" style="max-width: 300px; max-height: 300px; '
                'border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />',
                obj.image.url,
            )
        return "이미지 없음"

    image_preview.short_description = "이미지 미리보기"

    def difficulty_badge(self, obj):
        """난이도 배지"""
        colors = {
            "입문": "#28a745",
            "초급": "#007bff",
            "중급": "#ffc107",
            "고급": "#dc3545",
        }
        color = colors.get(obj.difficulty, "#6c757d")
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 10px; '
            'border-radius: 3px; font-weight: bold;">{}</span>',
            color,
            obj.difficulty,
        )

    difficulty_badge.short_description = "난이도"

    def university_display(self, obj):
        """대학 연계 표시"""
        if obj.university:
            return format_html("🎓 {}", obj.university)
        return "-"

    university_display.short_description = "대학 연계"

    def tab_count(self, obj):
        """탭 수"""
        count = obj.tabs.count()
        return format_html("<strong>{}</strong> 개", count)

    tab_count.short_description = "탭 수"


@admin.register(ProjectTab)
class ProjectTabAdmin(admin.ModelAdmin):
    """프로젝트 탭 관리 (Project Tab Admin)"""

    list_display = [
        "tab_id",
        "label",
        "project",
        "duration",
        "module_count",
        "order",
    ]

    list_filter = [
        "project__curriculum",
        "project",
    ]

    search_fields = [
        "label",
        "description",
        "tab_id",
    ]

    ordering = ["project", "order"]

    list_editable = ["order"]

    fieldsets = (
        (
            "기본 정보 (Basic Info)",
            {
                "fields": ("project", "tab_id", "label", "duration"),
            },
        ),
        (
            "설명 (Description)",
            {
                "fields": ("description",),
            },
        ),
        (
            "정렬 (Order)",
            {
                "fields": ("order",),
            },
        ),
    )

    inlines = [ModuleInline]

    # Custom display methods
    def module_count(self, obj):
        """모듈 수"""
        count = obj.modules.count()
        if count >= 5:
            color = "#28a745"
        elif count >= 3:
            color = "#007bff"
        else:
            color = "#ffc107"

        return format_html(
            '<span style="background-color: {}; color: white; padding: 2px 8px; '
            'border-radius: 3px; font-size: 11px;">{} 개</span>',
            color,
            count,
        )

    module_count.short_description = "모듈 수"


@admin.register(Module)
class ModuleAdmin(admin.ModelAdmin):
    """수업 모듈 관리 (Module Admin)"""

    list_display = [
        "module_id",
        "title",
        "tab",
        "duration",
        "topics_count",
        "order",
    ]

    list_filter = [
        "tab__project__curriculum",
        "tab__project",
    ]

    search_fields = [
        "title",
        "detail_description",
        "module_id",
    ]

    ordering = ["tab", "order"]

    list_editable = ["order"]

    fieldsets = (
        (
            "기본 정보 (Basic Info)",
            {
                "fields": ("tab", "module_id", "title", "duration"),
            },
        ),
        (
            "설명 (Description)",
            {
                "fields": ("detail_description",),
            },
        ),
        (
            "주제 (Topics)",
            {
                "fields": ("topics",),
                "description": '배열 형식: ["주제1", "주제2", "주제3"]',
            },
        ),
        (
            "정렬 (Order)",
            {
                "fields": ("order",),
            },
        ),
    )

    # Custom display methods
    def topics_count(self, obj):
        """주제 수"""
        count = len(obj.topics) if obj.topics else 0
        return format_html("📝 <strong>{}</strong> 개", count)

    topics_count.short_description = "주제 수"


@admin.register(Material)
class MaterialAdmin(admin.ModelAdmin):
    """수업 자료 관리 (Material Admin)"""

    list_display = [
        "material_id",
        "title",
        "curriculum",
        "category_title",
        "format_badge",
        "pages",
        "size",
        "download_link",
        "order",
    ]

    list_filter = [
        "curriculum",
        "format",
    ]

    search_fields = [
        "title",
        "description",
        "category_title",
        "material_id",
    ]

    ordering = ["curriculum", "order"]

    list_editable = ["order"]

    fieldsets = (
        (
            "기본 정보 (Basic Info)",
            {
                "fields": (
                    "curriculum",
                    "material_id",
                    "category_id",
                    "category_title",
                ),
            },
        ),
        (
            "자료 정보 (Material Info)",
            {
                "fields": ("title", "description", "icon"),
            },
        ),
        (
            "파일 정보 (File Info)",
            {
                "fields": ("format", "pages", "size", "download_url"),
            },
        ),
        (
            "정렬 (Order)",
            {
                "fields": ("order",),
            },
        ),
    )

    # Custom display methods
    def format_badge(self, obj):
        """파일 형식 배지"""
        colors = {
            "PDF": "#dc3545",
            "PPT": "#fd7e14",
            "DOC": "#007bff",
            "ZIP": "#6c757d",
        }
        color = colors.get(obj.format, "#28a745")
        return format_html(
            '<span style="background-color: {}; color: white; padding: 2px 8px; '
            'border-radius: 3px; font-size: 11px; font-weight: bold;">{}</span>',
            color,
            obj.format,
        )

    format_badge.short_description = "형식"

    def download_link(self, obj):
        """다운로드 링크"""
        if obj.download_url:
            return format_html(
                '<a href="{}" target="_blank" style="color: #007bff; text-decoration: none;">'
                "📥 다운로드</a>",
                obj.download_url,
            )
        return "-"

    download_link.short_description = "링크"
