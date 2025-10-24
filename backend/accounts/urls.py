"""
사용자 인증 URLs
"""

from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

app_name = 'accounts'

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
    
    # dj-rest-auth (소셜 로그인 포함)
    path('', include('dj_rest_auth.urls')),
    path('registration/', include('dj_rest_auth.registration.urls')),
    path('social/', include('allauth.socialaccount.urls')),
]

