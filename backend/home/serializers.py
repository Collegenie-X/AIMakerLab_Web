"""
홈페이지 Serializers
"""

from rest_framework import serializers
from .models import (
    HeroSlide,
    IntroVideo,
    Feature,
    CurriculumHighlight,
    OutreachStats,
    QuickLink,
    HomepageConfig,
)


class HeroSlideSerializer(serializers.ModelSerializer):
    """히어로 슬라이드 Serializer"""

    class Meta:
        model = HeroSlide
        fields = [
            "id",
            "title",
            "description",
            "image",
            "cta_label",
            "cta_href",
            "order",
        ]


class IntroVideoSerializer(serializers.ModelSerializer):
    """소개 영상 Serializer"""

    class Meta:
        model = IntroVideo
        fields = ["id", "heading", "subheading", "youtube_title", "youtube_embed_url"]


class FeatureSerializer(serializers.ModelSerializer):
    """특징 Serializer"""

    class Meta:
        model = Feature
        fields = ["id", "icon", "title", "description", "order"]


class CurriculumHighlightSerializer(serializers.ModelSerializer):
    """커리큘럼 하이라이트 Serializer"""

    class Meta:
        model = CurriculumHighlight
        fields = [
            "id",
            "title",
            "description",
            "image",
            "href",
            "level_badge",
            "duration",
            "size",
            "order",
        ]


class OutreachStatsSerializer(serializers.ModelSerializer):
    """출강 통계 Serializer"""

    class Meta:
        model = OutreachStats
        fields = ["id", "metric_icon", "value", "caption", "order"]


class QuickLinkSerializer(serializers.ModelSerializer):
    """빠른 링크 Serializer"""

    class Meta:
        model = QuickLink
        fields = ["id", "category", "title", "description", "icon", "href", "order"]


class HomepageConfigSerializer(serializers.ModelSerializer):
    """홈페이지 설정 Serializer"""

    class Meta:
        model = HomepageConfig
        exclude = ["created_at", "updated_at"]


class HomePageSerializer(serializers.Serializer):
    """홈페이지 전체 데이터 Serializer"""

    config = HomepageConfigSerializer()
    hero_slides = HeroSlideSerializer(many=True)
    intro_video = IntroVideoSerializer()
    features = FeatureSerializer(many=True)
    curriculum_highlights = CurriculumHighlightSerializer(many=True)
    outreach_stats = OutreachStatsSerializer(many=True)
    quick_links = QuickLinkSerializer(many=True)
