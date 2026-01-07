"""
커리큘럼 Serializer

프론트엔드 타입 구조와 일치하도록 설계
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


# ============================================================================
# 기본 Serializer
# ============================================================================


class CourseInfoSerializer(serializers.ModelSerializer):
    """과정 정보 Serializer"""

    class Meta:
        model = CourseInfo
        fields = [
            "info_id",
            "icon",
            "icon_color",
            "label",
            "value",
            "order",
        ]


class LearningGoalSerializer(serializers.ModelSerializer):
    """학습 목표 Serializer"""

    class Meta:
        model = LearningGoal
        fields = [
            "goal_id",
            "category",
            "title",
            "description",
            "skills",
            "order",
        ]


class ModuleSerializer(serializers.ModelSerializer):
    """수업 모듈 Serializer"""

    class Meta:
        model = Module
        fields = [
            "module_id",
            "title",
            "duration",
            "detail_description",
            "topics",
            "order",
        ]


class CurriculumTabSerializer(serializers.ModelSerializer):
    """커리큘럼 탭 Serializer"""

    modules = ModuleSerializer(many=True, read_only=True)

    class Meta:
        model = ProjectTab
        fields = [
            "tab_id",
            "label",
            "duration",
            "description",
            "modules",
            "order",
        ]


class ProjectSerializer(serializers.ModelSerializer):
    """프로젝트 Serializer"""

    tabs = CurriculumTabSerializer(many=True, read_only=True)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = CurriculumProject
        fields = [
            "project_id",
            "title",
            "description",
            "image_url",
            "difficulty",
            "university",
            "order",
            "tabs",
        ]

    def get_image_url(self, obj):
        """이미지 URL 반환"""
        if obj.image:
            request = self.context.get("request")
            if request:
                return request.build_absolute_uri(obj.image.url)
        return None


class GradeRecommendationSerializer(serializers.ModelSerializer):
    """학년별 추천 Serializer"""

    class Meta:
        model = GradeRecommendation
        fields = [
            "course_id",
            "course_name",
            "description",
            "difficulty",
            "duration",
            "elementary_mid",
            "elementary_high",
            "middle_low",
            "middle_high",
            "high",
            "order",
        ]


class EducationRequirementSerializer(serializers.ModelSerializer):
    """교육 조건 Serializer"""

    class Meta:
        model = EducationRequirement
        fields = [
            "requirement_id",
            "icon",
            "icon_color",
            "title",
            "description",
            "details",
            "order",
        ]


class MaterialSerializer(serializers.ModelSerializer):
    """수업 자료 Serializer"""

    class Meta:
        model = Material
        fields = [
            "material_id",
            "title",
            "description",
            "icon",
            "format",
            "pages",
            "size",
            "download_url",
            "order",
        ]


# ============================================================================
# 중첩 Serializer
# ============================================================================


class MaterialCategorySerializer(serializers.Serializer):
    """자료 카테고리 Serializer (그룹화용)"""

    id = serializers.CharField()
    title = serializers.CharField()
    materials = MaterialSerializer(many=True)


class HeroDataSerializer(serializers.Serializer):
    """히어로 섹션 Serializer"""

    badge = serializers.CharField()
    title = serializers.CharField()
    subtitle = serializers.CharField(required=False, allow_null=True)
    description = serializers.CharField()
    features = serializers.ListField(
        child=serializers.DictField(), required=False, allow_null=True
    )


class CourseDescriptionDataSerializer(serializers.Serializer):
    """과정 설명 Serializer"""

    title = serializers.CharField()
    subtitle = serializers.CharField(required=False, allow_null=True)
    description = serializers.CharField()
    highlights = serializers.ListField(
        child=serializers.CharField(), required=False, allow_null=True
    )


class LearningGoalsDataSerializer(serializers.Serializer):
    """학습 목표 데이터 Serializer"""

    title = serializers.CharField()
    subtitle = serializers.CharField(required=False, allow_null=True)
    goals = LearningGoalSerializer(many=True)


class CurriculumDataSerializer(serializers.Serializer):
    """커리큘럼 데이터 Serializer"""

    title = serializers.CharField()
    subtitle = serializers.CharField(required=False, allow_null=True)
    tabs = CurriculumTabSerializer(many=True)


class ProjectsDataSerializer(serializers.Serializer):
    """프로젝트 데이터 Serializer"""

    title = serializers.CharField()
    subtitle = serializers.CharField(required=False, allow_null=True)
    projects = ProjectSerializer(many=True)


class GradeRecommendationDataSerializer(serializers.Serializer):
    """학년별 추천 데이터 Serializer"""

    title = serializers.CharField()
    subtitle = serializers.CharField(required=False, allow_null=True)
    items = GradeRecommendationSerializer(many=True)


class EducationRequirementsDataSerializer(serializers.Serializer):
    """교육 조건 데이터 Serializer"""

    title = serializers.CharField()
    subtitle = serializers.CharField(required=False, allow_null=True)
    requirements = EducationRequirementSerializer(many=True)


class MaterialsDataSerializer(serializers.Serializer):
    """수업 자료 데이터 Serializer"""

    title = serializers.CharField()
    subtitle = serializers.CharField(required=False, allow_null=True)
    categories = MaterialCategorySerializer(many=True)


class CtaDataSerializer(serializers.Serializer):
    """CTA 데이터 Serializer"""

    title = serializers.CharField()
    description = serializers.CharField()
    primary_button = serializers.DictField()
    secondary_button = serializers.DictField(required=False, allow_null=True)


class CurriculumMetaSerializer(serializers.ModelSerializer):
    """커리큘럼 메타 정보 Serializer"""

    class Meta:
        model = Curriculum
        fields = [
            "category",
            "title",
            "description",
            "badge",
            "gradient_class",
            "meta_title",
            "meta_description",
            "order",
            "created_at",
            "updated_at",
        ]


# ============================================================================
# 전체 커리큘럼 Serializer
# ============================================================================


class CurriculumFullSerializer(serializers.Serializer):
    """
    전체 커리큘럼 데이터 Serializer
    
    프론트엔드 CurriculumFullData 타입과 일치
    """

    meta = CurriculumMetaSerializer()
    hero = HeroDataSerializer()
    course_info = CourseInfoSerializer(many=True, required=False, allow_null=True)
    course_description = CourseDescriptionDataSerializer(
        required=False, allow_null=True
    )
    learning_goals = LearningGoalsDataSerializer(required=False, allow_null=True)
    learning_paths = serializers.DictField(required=False, allow_null=True)
    curriculum = CurriculumDataSerializer(required=False, allow_null=True)
    projects = ProjectsDataSerializer(required=False, allow_null=True)
    grade_recommendation = GradeRecommendationDataSerializer(
        required=False, allow_null=True
    )
    education_requirements = EducationRequirementsDataSerializer(
        required=False, allow_null=True
    )
    materials = MaterialsDataSerializer(required=False, allow_null=True)
    class_gallery = serializers.DictField(required=False, allow_null=True)
    cta = CtaDataSerializer()
