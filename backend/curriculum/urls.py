"""
커리큘럼 URLs
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'curriculum'

router = DefaultRouter()
router.register(r'', views.CurriculumViewSet, basename='curriculum')

urlpatterns = [
    path('', include(router.urls)),
]

