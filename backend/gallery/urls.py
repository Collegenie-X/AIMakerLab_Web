"""
갤러리 URLs (학생 작품 & 수업 후기)
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = "gallery"

router = DefaultRouter()
router.register(r"works", views.StudentWorkViewSet, basename="student-work")
router.register(r"reviews", views.ClassReviewViewSet, basename="class-review")

urlpatterns = [
    path("", include(router.urls)),
]
