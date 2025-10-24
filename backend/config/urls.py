"""
AI Maker Lab Backend URL Configuration
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# API 문서화 스키마
schema_view = get_schema_view(
    openapi.Info(
        title="AI Maker Lab API",
        default_version="v1",
        description="AI Maker Lab 백엔드 API 문서",
        terms_of_service="https://www.aimakerlab.com/terms/",
        contact=openapi.Contact(email="contact@aimakerlab.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    # Admin
    path("admin/", admin.site.urls),
    # API 문서화 (Swagger)
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    # API 엔드포인트
    path("api/accounts/", include("accounts.urls")),
    path("api/curriculum/", include("curriculum.urls")),
    path("api/products/", include("products.urls")),
    path("api/gallery/", include("gallery.urls")),
    path("api/inquiry/", include("inquiry.urls")),
    path("api/home/", include("home.urls")),
]

# 미디어 파일 서빙 (개발 환경)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Admin 사이트 커스터마이징
admin.site.site_header = "AI Maker Lab 관리자"
admin.site.site_title = "AI Maker Lab Admin"
admin.site.index_title = "AI Maker Lab 관리 시스템"
