"""
제품 URLs
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'products'

router = DefaultRouter()
router.register(r'products', views.ProductViewSet, basename='product')
router.register(r'reviews', views.ProductReviewViewSet, basename='review')
router.register(r'quote-items', views.QuoteItemViewSet, basename='quote-item')
router.register(r'videos', views.VideoViewSet, basename='video')
router.register(r'classroom-photos', views.ClassroomPhotoViewSet, basename='classroom-photo')
router.register(r'related-classes', views.RelatedClassViewSet, basename='related-class')

urlpatterns = [
    path('', include(router.urls)),
]

