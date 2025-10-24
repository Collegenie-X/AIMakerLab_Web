"""
갤러리 URLs
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'gallery'

router = DefaultRouter()
router.register(r'', views.GalleryItemViewSet, basename='gallery')

urlpatterns = [
    path('', include(router.urls)),
]

