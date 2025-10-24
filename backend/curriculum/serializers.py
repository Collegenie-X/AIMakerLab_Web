"""
커리큘럼 Serializers
"""

from rest_framework import serializers
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


class CourseInfoSerializer(serializers.ModelSerializer):
    """과정 정보 Serializer"""
    
    class Meta:
        model = CourseInfo
        fields = ['info_id', 'icon', 'icon_color', 'label', 'value', 'order']


class LearningGoalSerializer(serializers.ModelSerializer):
    """학습 목표 Serializer"""
    
    class Meta:
        model = LearningGoal
        fields = ['goal_id', 'category', 'title', 'description', 'skills', 'order']


class ModuleSerializer(serializers.ModelSerializer):
    """모듈 Serializer"""
    
    class Meta:
        model = Module
        fields = ['module_id', 'title', 'duration', 'detail_description', 'topics', 'order']


class ProjectTabSerializer(serializers.ModelSerializer):
    """프로젝트 탭 Serializer"""
    
    modules = ModuleSerializer(many=True, read_only=True)
    
    class Meta:
        model = ProjectTab
        fields = ['tab_id', 'label', 'duration', 'description', 'modules', 'order']


class CurriculumProjectSerializer(serializers.ModelSerializer):
    """커리큘럼 프로젝트 Serializer"""
    
    tabs = ProjectTabSerializer(many=True, read_only=True)
    
    class Meta:
        model = CurriculumProject
        fields = [
            'project_id',
            'title',
            'description',
            'image',
            'difficulty',
            'university',
            'tabs',
            'order',
        ]


class GradeRecommendationSerializer(serializers.ModelSerializer):
    """학년별 추천 Serializer"""
    
    class Meta:
        model = GradeRecommendation
        fields = [
            'course_id',
            'course_name',
            'description',
            'difficulty',
            'duration',
            'elementary_mid',
            'elementary_high',
            'middle_low',
            'middle_high',
            'high',
            'order',
        ]


class EducationRequirementSerializer(serializers.ModelSerializer):
    """교육 조건 Serializer"""
    
    class Meta:
        model = EducationRequirement
        fields = [
            'requirement_id',
            'icon',
            'icon_color',
            'title',
            'description',
            'details',
            'order',
        ]


class MaterialSerializer(serializers.ModelSerializer):
    """수업 자료 Serializer"""
    
    class Meta:
        model = Material
        fields = [
            'category_id',
            'category_title',
            'material_id',
            'title',
            'description',
            'icon',
            'format',
            'pages',
            'size',
            'download_url',
            'order',
        ]


class CurriculumListSerializer(serializers.ModelSerializer):
    """커리큘럼 목록 Serializer (간단한 정보만)"""
    
    class Meta:
        model = Curriculum
        fields = [
            'id',
            'category',
            'title',
            'description',
            'badge',
            'gradient_class',
            'order',
        ]


class CurriculumDetailSerializer(serializers.ModelSerializer):
    """커리큘럼 상세 Serializer (모든 관련 데이터 포함)"""
    
    course_info_items = CourseInfoSerializer(many=True, read_only=True)
    learning_goals = LearningGoalSerializer(many=True, read_only=True)
    projects = CurriculumProjectSerializer(many=True, read_only=True)
    grade_recommendations = GradeRecommendationSerializer(many=True, read_only=True)
    education_requirements = EducationRequirementSerializer(many=True, read_only=True)
    materials = MaterialSerializer(many=True, read_only=True)
    
    class Meta:
        model = Curriculum
        fields = [
            'id',
            'category',
            'title',
            'description',
            'badge',
            'gradient_class',
            'meta_title',
            'meta_description',
            'course_info_items',
            'learning_goals',
            'projects',
            'grade_recommendations',
            'education_requirements',
            'materials',
            'order',
            'created_at',
            'updated_at',
        ]

