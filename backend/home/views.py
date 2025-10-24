"""
홈페이지 Views
"""

from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import (
    HeroSlide,
    IntroVideo,
    Feature,
    CurriculumHighlight,
    OutreachStats,
    QuickLink,
    HomepageConfig,
)
from .serializers import (
    HeroSlideSerializer,
    IntroVideoSerializer,
    FeatureSerializer,
    CurriculumHighlightSerializer,
    OutreachStatsSerializer,
    QuickLinkSerializer,
    HomepageConfigSerializer,
    HomePageSerializer,
)


class HeroSlideViewSet(viewsets.ReadOnlyModelViewSet):
    """히어로 슬라이드 ViewSet"""

    queryset = HeroSlide.objects.filter(is_active=True)
    serializer_class = HeroSlideSerializer
    permission_classes = [permissions.AllowAny]
    ordering = ["order"]


class IntroVideoViewSet(viewsets.ReadOnlyModelViewSet):
    """소개 영상 ViewSet"""

    queryset = IntroVideo.objects.filter(is_active=True)
    serializer_class = IntroVideoSerializer
    permission_classes = [permissions.AllowAny]


class FeatureViewSet(viewsets.ReadOnlyModelViewSet):
    """특징 ViewSet"""

    queryset = Feature.objects.filter(is_active=True)
    serializer_class = FeatureSerializer
    permission_classes = [permissions.AllowAny]
    ordering = ["order"]


class CurriculumHighlightViewSet(viewsets.ReadOnlyModelViewSet):
    """커리큘럼 하이라이트 ViewSet"""

    queryset = CurriculumHighlight.objects.filter(is_active=True)
    serializer_class = CurriculumHighlightSerializer
    permission_classes = [permissions.AllowAny]
    ordering = ["order"]


class OutreachStatsViewSet(viewsets.ReadOnlyModelViewSet):
    """출강 통계 ViewSet"""

    queryset = OutreachStats.objects.filter(is_active=True)
    serializer_class = OutreachStatsSerializer
    permission_classes = [permissions.AllowAny]
    ordering = ["order"]


class QuickLinkViewSet(viewsets.ReadOnlyModelViewSet):
    """빠른 링크 ViewSet"""

    queryset = QuickLink.objects.filter(is_active=True)
    serializer_class = QuickLinkSerializer
    permission_classes = [permissions.AllowAny]
    ordering = ["order"]


@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def homepage_data(request):
    """
    홈페이지 전체 데이터 한 번에 가져오기

    GET /api/home/data/

    모든 홈페이지 데이터를 한 번의 요청으로 가져옵니다.
    """

    # 설정
    config = HomepageConfig.get_config()

    # 활성화된 데이터만 가져오기
    hero_slides = HeroSlide.objects.filter(is_active=True).order_by("order")
    intro_video = IntroVideo.objects.filter(is_active=True).first()
    features = Feature.objects.filter(is_active=True).order_by("order")
    curriculum_highlights = CurriculumHighlight.objects.filter(is_active=True).order_by(
        "order"
    )
    outreach_stats = OutreachStats.objects.filter(is_active=True).order_by("order")
    quick_links = QuickLink.objects.filter(is_active=True).order_by("order")

    data = {
        "config": HomepageConfigSerializer(config).data,
        "hero_slides": HeroSlideSerializer(hero_slides, many=True).data,
        "intro_video": IntroVideoSerializer(intro_video).data if intro_video else None,
        "features": FeatureSerializer(features, many=True).data,
        "curriculum_highlights": CurriculumHighlightSerializer(
            curriculum_highlights, many=True
        ).data,
        "outreach_stats": OutreachStatsSerializer(outreach_stats, many=True).data,
        "quick_links": QuickLinkSerializer(quick_links, many=True).data,
    }

    serializer = HomePageSerializer(data)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def homepage_config(request):
    """
    홈페이지 설정 가져오기

    GET /api/home/config/
    """

    config = HomepageConfig.get_config()
    serializer = HomepageConfigSerializer(config)
    return Response(serializer.data)
