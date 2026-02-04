"""
문의 URLs
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = "inquiry"

router = DefaultRouter()
router.register(r"inquiries", views.InquiryViewSet, basename="inquiry")
router.register(r"schedules", views.ScheduleViewSet, basename="schedule")
# TODO: OutreachInquiry 모델 생성 후 활성화
# router.register(r'outreach', views.OutreachInquiryViewSet, basename='outreach')

urlpatterns = [
    path("", include(router.urls)),
]
