"""
커리큘럼 Admin
"""

from django.contrib import admin
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


class CourseInfoInline(admin.TabularInline):
    """과정 정보 인라인"""
    model = CourseInfo
    extra = 1
    fields = ['info_id', 'icon', 'icon_color', 'label', 'value', 'order']


class LearningGoalInline(admin.StackedInline):
    """학습 목표 인라인"""
    model = LearningGoal
    extra = 1
    fields = ['goal_id', 'category', 'title', 'description', 'skills', 'order']


class GradeRecommendationInline(admin.TabularInline):
    """학년별 추천 인라인"""
    model = GradeRecommendation
    extra = 1


class EducationRequirementInline(admin.StackedInline):
    """교육 조건 인라인"""
    model = EducationRequirement
    extra = 1


@admin.register(Curriculum)
class CurriculumAdmin(admin.ModelAdmin):
    """커리큘럼 Admin"""
    
    list_display = ['title', 'category', 'order', 'created_at', 'updated_at']
    list_filter = ['category', 'created_at']
    search_fields = ['title', 'description']
    ordering = ['order', 'category']
    
    fieldsets = (
        ('기본 정보', {
            'fields': ('category', 'title', 'description', 'badge', 'gradient_class', 'order')
        }),
        ('메타 정보', {
            'fields': ('meta_title', 'meta_description')
        }),
    )
    
    inlines = [
        CourseInfoInline,
        LearningGoalInline,
        GradeRecommendationInline,
        EducationRequirementInline,
    ]


class ProjectTabInline(admin.StackedInline):
    """프로젝트 탭 인라인"""
    model = ProjectTab
    extra = 1
    fields = ['tab_id', 'label', 'duration', 'description', 'order']


@admin.register(CurriculumProject)
class CurriculumProjectAdmin(admin.ModelAdmin):
    """커리큘럼 프로젝트 Admin"""
    
    list_display = ['title', 'curriculum', 'difficulty', 'order']
    list_filter = ['curriculum', 'difficulty']
    search_fields = ['title', 'description']
    ordering = ['curriculum', 'order']
    
    inlines = [ProjectTabInline]


class ModuleInline(admin.StackedInline):
    """모듈 인라인"""
    model = Module
    extra = 1


@admin.register(ProjectTab)
class ProjectTabAdmin(admin.ModelAdmin):
    """프로젝트 탭 Admin"""
    
    list_display = ['label', 'project', 'duration', 'order']
    list_filter = ['project__curriculum']
    search_fields = ['label', 'description']
    
    inlines = [ModuleInline]


@admin.register(Module)
class ModuleAdmin(admin.ModelAdmin):
    """모듈 Admin"""
    
    list_display = ['title', 'tab', 'duration', 'order']
    list_filter = ['tab__project__curriculum']
    search_fields = ['title', 'detail_description']
    ordering = ['tab', 'order']


@admin.register(Material)
class MaterialAdmin(admin.ModelAdmin):
    """수업 자료 Admin"""
    
    list_display = ['title', 'curriculum', 'category_title', 'format', 'order']
    list_filter = ['curriculum', 'format']
    search_fields = ['title', 'description']
    ordering = ['curriculum', 'order']
