"""
사용자 인증 URLs
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

app_name = 'accounts'

# Router 설정
router = DefaultRouter()
router.register(r'user-profiles', views.UserProfileViewSet, basename='user-profile')
router.register(r'user-courses', views.UserCourseEnrollmentViewSet, basename='user-course')

urlpatterns = [
    # JWT 토큰
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # 회원가입 및 인증
    path('register/', views.UserRegistrationView.as_view(), name='register'),
    path('verify-email/', views.verify_email, name='verify_email'),
    path('resend-verification/', views.resend_verification_email, name='resend_verification'),
    
    # 프로필
    path('profile/', views.UserProfileView.as_view(), name='profile'),
    
    # 비밀번호
    path('password/change/', views.PasswordChangeView.as_view(), name='password_change'),
    
    # 로그아웃
    path('logout/', views.logout_view, name='logout'),
    
    # Router URLs (나의 강의, 나의 프로필 등)
    path('', include(router.urls)),
    
    # dj-rest-auth (소셜 로그인 포함)
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
    path('auth/social/', include('allauth.socialaccount.urls')),
]

