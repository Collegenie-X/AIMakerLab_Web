"""
커리큘럼 ViewSet

RESTful API 엔드포인트 제공
"""

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
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
from .serializers import (
    CurriculumMetaSerializer,
    CurriculumFullSerializer,
)


class CurriculumViewSet(viewsets.ReadOnlyModelViewSet):
    """
    커리큘럼 ViewSet (읽기 전용)
    
    Endpoints:
    - GET /api/curriculum/ : 전체 커리큘럼 목록
    - GET /api/curriculum/{category}/ : 특정 커리큘럼 상세 (전체 데이터)
    """

    queryset = Curriculum.objects.all()
    serializer_class = CurriculumMetaSerializer
    lookup_field = "category"

    def retrieve(self, request, category=None):
        """
        특정 커리큘럼의 전체 데이터 반환
        
        프론트엔드의 CurriculumFullData 구조와 일치
        """
        curriculum = get_object_or_404(Curriculum, category=category)

        # 전체 데이터 구성
        data = self._build_full_curriculum_data(curriculum, request)

        return Response(
            {
                "success": True,
                "data": data,
            }
        )

    def list(self, request):
        """커리큘럼 목록 반환 (메타 정보만)"""
        curriculums = self.get_queryset()
        serializer = self.get_serializer(curriculums, many=True)

        return Response(
            {
                "success": True,
                "data": serializer.data,
            }
        )

    def _build_full_curriculum_data(self, curriculum, request):
        """
        전체 커리큘럼 데이터 구성
        
        비즈니스 로직: DB 데이터를 프론트엔드 구조로 변환
        """
        # 메타 정보
        meta_data = CurriculumMetaSerializer(curriculum).data

        # 히어로 데이터
        hero_data = {
            "badge": curriculum.badge,
            "title": curriculum.title,
            "description": curriculum.description,
        }

        # 과정 정보
        course_info = CourseInfo.objects.filter(curriculum=curriculum).order_by(
            "order"
        )
        course_info_data = [
            {
                "id": item.info_id,
                "icon": item.icon,
                "iconColor": item.icon_color,
                "label": item.label,
                "value": item.value,
                "order": item.order,
            }
            for item in course_info
        ]

        # 학습 목표
        learning_goals = LearningGoal.objects.filter(curriculum=curriculum).order_by(
            "order"
        )
        learning_goals_data = None
        if learning_goals.exists():
            learning_goals_data = {
                "title": "학습 목표",
                "goals": [
                    {
                        "id": goal.goal_id,
                        "category": goal.category,
                        "title": goal.title,
                        "description": goal.description,
                        "skills": goal.skills,
                        "order": goal.order,
                    }
                    for goal in learning_goals
                ],
            }

        # 커리큘럼 (프로젝트 -> 탭 -> 모듈)
        projects = CurriculumProject.objects.filter(curriculum=curriculum).order_by(
            "order"
        )
        curriculum_data = None
        if projects.exists():
            # 첫 번째 프로젝트의 탭들을 커리큘럼 탭으로 사용
            first_project = projects.first()
            tabs = ProjectTab.objects.filter(project=first_project).order_by("order")

            curriculum_data = {
                "title": "커리큘럼",
                "tabs": [
                    {
                        "id": tab.tab_id,
                        "label": tab.label,
                        "duration": tab.duration,
                        "description": tab.description,
                        "modules": [
                            {
                                "id": module.module_id,
                                "title": module.title,
                                "duration": module.duration,
                                "description": module.detail_description or "",
                                "detailDescription": module.detail_description,
                                "topics": module.topics,
                                "order": module.order,
                            }
                            for module in Module.objects.filter(tab=tab).order_by(
                                "order"
                            )
                        ],
                        "order": tab.order,
                    }
                    for tab in tabs
                ],
            }

        # 학년별 추천
        grade_recommendations = GradeRecommendation.objects.filter(
            curriculum=curriculum
        ).order_by("order")
        grade_recommendation_data = None
        if grade_recommendations.exists():
            grade_recommendation_data = {
                "title": "학년별 추천",
                "items": [
                    {
                        "id": gr.course_id,
                        "courseName": gr.course_name,
                        "description": gr.description,
                        "difficulty": gr.difficulty,
                        "duration": gr.duration,
                        "elementaryMid": gr.elementary_mid,
                        "elementaryHigh": gr.elementary_high,
                        "middleLow": gr.middle_low,
                        "middleHigh": gr.middle_high,
                        "high": gr.high,
                        "order": gr.order,
                    }
                    for gr in grade_recommendations
                ],
            }

        # 교육 조건
        education_requirements = EducationRequirement.objects.filter(
            curriculum=curriculum
        ).order_by("order")
        education_requirements_data = None
        if education_requirements.exists():
            education_requirements_data = {
                "title": "교육 조건",
                "requirements": [
                    {
                        "id": req.requirement_id,
                        "icon": req.icon,
                        "iconColor": req.icon_color,
                        "title": req.title,
                        "description": req.description,
                        "details": req.details,
                        "order": req.order,
                    }
                    for req in education_requirements
                ],
            }

        # 수업 자료
        materials = Material.objects.filter(curriculum=curriculum).order_by("order")
        materials_data = None
        if materials.exists():
            # 카테고리별로 그룹화
            categories = {}
            for material in materials:
                if material.category_id not in categories:
                    categories[material.category_id] = {
                        "id": material.category_id,
                        "title": material.category_title,
                        "materials": [],
                    }
                categories[material.category_id]["materials"].append(
                    {
                        "id": material.material_id,
                        "title": material.title,
                        "description": material.description,
                        "icon": material.icon,
                        "format": material.format,
                        "pages": material.pages,
                        "size": material.size,
                        "downloadUrl": material.download_url,
                        "order": material.order,
                    }
                )

            materials_data = {
                "title": "수업 자료",
                "categories": list(categories.values()),
            }

        # CTA
        cta_data = {
            "title": "지금 바로 시작하세요!",
            "description": "AI 메이커랩과 함께 미래를 준비하세요.",
            "primaryButton": {"text": "수업 신청하기", "link": "/inquiry"},
            "secondaryButton": {"text": "일정 보기", "link": "/inquiry/schedule"},
        }

        # 전체 데이터 조합
        return {
            "meta": meta_data,
            "hero": hero_data,
            "courseInfo": course_info_data if course_info_data else None,
            "curriculum": curriculum_data,
            "learningGoals": learning_goals_data,
            "gradeRecommendation": grade_recommendation_data,
            "educationRequirements": education_requirements_data,
            "materials": materials_data,
            "cta": cta_data,
        }
