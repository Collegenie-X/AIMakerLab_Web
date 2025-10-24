"""
홈페이지 URLs
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = "home"

router = DefaultRouter()
router.register(r"hero-slides", views.HeroSlideViewSet, basename="hero-slide")
router.register(r"intro-videos", views.IntroVideoViewSet, basename="intro-video")
router.register(r"features", views.FeatureViewSet, basename="feature")
router.register(
    r"curriculum-highlights",
    views.CurriculumHighlightViewSet,
    basename="curriculum-highlight",
)
router.register(
    r"outreach-stats", views.OutreachStatsViewSet, basename="outreach-stats"
)
router.register(r"quick-links", views.QuickLinkViewSet, basename="quick-link")

urlpatterns = [
    # 홈페이지 전체 데이터
    path("data/", views.homepage_data, name="homepage-data"),
    path("config/", views.homepage_config, name="homepage-config"),
    # 개별 리소스
    path("", include(router.urls)),
]
