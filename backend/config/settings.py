"""
Django settings for AI Maker Lab Backend

환경 변수는 .env 파일에서 관리합니다.
"""

from pathlib import Path
from datetime import timedelta
from decouple import config
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# 보안 설정
# ==============================================================================

SECRET_KEY = config("SECRET_KEY", default="django-insecure-change-this-in-production")
DEBUG = config("DEBUG", default=True, cast=bool)
ALLOWED_HOSTS = config("ALLOWED_HOSTS", default="localhost,127.0.0.1").split(",")


# Application definition
# ==============================================================================

INSTALLED_APPS = [
    # Django 기본 앱
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sites",  # django-allauth 필수
    # Third-party 앱
    "rest_framework",
    "rest_framework.authtoken",
    "rest_framework_simplejwt",
    "corsheaders",
    "drf_yasg",  # API 문서화
    "django_filters",  # 필터링
    # django-allauth (소셜 로그인)
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "allauth.socialaccount.providers.google",
    "allauth.socialaccount.providers.kakao",
    # dj-rest-auth (REST API 인증)
    "dj_rest_auth",
    "dj_rest_auth.registration",
    # 프로젝트 앱
    "accounts",
    "curriculum",
    "products",
    "gallery",
    "inquiry",
    "home",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",  # CORS 미들웨어
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "allauth.account.middleware.AccountMiddleware",  # allauth 미들웨어
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"


# Database
# ==============================================================================

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


# Password validation
# ==============================================================================

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# ==============================================================================

LANGUAGE_CODE = "ko-kr"
TIME_ZONE = "Asia/Seoul"
USE_I18N = True
USE_TZ = True


# Static files (CSS, JavaScript, Images)
# ==============================================================================

STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_DIRS = [BASE_DIR / "static"]

MEDIA_URL = "media/"
MEDIA_ROOT = BASE_DIR / "media"


# Default primary key field type
# ==============================================================================

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Custom User Model
# ==============================================================================

AUTH_USER_MODEL = "accounts.User"


# Django Sites Framework
# ==============================================================================

SITE_ID = 1


# CORS 설정
# ==============================================================================
# CORS 설정을 cors_settings.py에서 가져옵니다.
# 보안이 강화된 CORS 설정을 사용합니다.

from .cors_settings import (
    get_cors_settings,
    get_csrf_trusted_origins,
    get_secure_settings,
)

# CORS 설정 적용
_cors_settings = get_cors_settings()
CORS_ALLOWED_ORIGINS = _cors_settings['CORS_ALLOWED_ORIGINS']
CORS_ALLOW_ALL_ORIGINS = _cors_settings['CORS_ALLOW_ALL_ORIGINS']
CORS_ALLOW_CREDENTIALS = _cors_settings['CORS_ALLOW_CREDENTIALS']
CORS_ALLOW_METHODS = _cors_settings['CORS_ALLOW_METHODS']
CORS_ALLOW_HEADERS = _cors_settings['CORS_ALLOW_HEADERS']
CORS_PREFLIGHT_MAX_AGE = _cors_settings['CORS_PREFLIGHT_MAX_AGE']
CORS_EXPOSE_HEADERS = _cors_settings['CORS_EXPOSE_HEADERS']

# CSRF 신뢰 도메인
CSRF_TRUSTED_ORIGINS = get_csrf_trusted_origins()

# 보안 설정
_secure_settings = get_secure_settings()
SECURE_SSL_REDIRECT = _secure_settings['SECURE_SSL_REDIRECT']
SESSION_COOKIE_SECURE = _secure_settings['SESSION_COOKIE_SECURE']
CSRF_COOKIE_SECURE = _secure_settings['CSRF_COOKIE_SECURE']
SESSION_COOKIE_SAMESITE = _secure_settings['SESSION_COOKIE_SAMESITE']
CSRF_COOKIE_SAMESITE = _secure_settings['CSRF_COOKIE_SAMESITE']
SESSION_COOKIE_HTTPONLY = _secure_settings['SESSION_COOKIE_HTTPONLY']
CSRF_COOKIE_HTTPONLY = _secure_settings['CSRF_COOKIE_HTTPONLY']
SECURE_BROWSER_XSS_FILTER = _secure_settings['SECURE_BROWSER_XSS_FILTER']
SECURE_CONTENT_TYPE_NOSNIFF = _secure_settings['SECURE_CONTENT_TYPE_NOSNIFF']
X_FRAME_OPTIONS = _secure_settings['X_FRAME_OPTIONS']

# 쿠키 도메인 설정 (선택사항)
if _secure_settings['SESSION_COOKIE_DOMAIN']:
    SESSION_COOKIE_DOMAIN = _secure_settings['SESSION_COOKIE_DOMAIN']
if _secure_settings['CSRF_COOKIE_DOMAIN']:
    CSRF_COOKIE_DOMAIN = _secure_settings['CSRF_COOKIE_DOMAIN']


# Django REST Framework 설정
# ==============================================================================

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticatedOrReadOnly",
    ],
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 20,
    "DEFAULT_FILTER_BACKENDS": [
        "rest_framework.filters.SearchFilter",
        "rest_framework.filters.OrderingFilter",
    ],
    "DATETIME_FORMAT": "%Y-%m-%d %H:%M:%S",
    "DATE_FORMAT": "%Y-%m-%d",
}


# JWT 설정
# ==============================================================================

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(
        minutes=config("JWT_ACCESS_TOKEN_LIFETIME", default=60, cast=int)
    ),
    "REFRESH_TOKEN_LIFETIME": timedelta(
        minutes=config("JWT_REFRESH_TOKEN_LIFETIME", default=1440, cast=int)
    ),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "UPDATE_LAST_LOGIN": True,
    "ALGORITHM": "HS256",
    "SIGNING_KEY": SECRET_KEY,
    "VERIFYING_KEY": None,
    "AUDIENCE": None,
    "ISSUER": None,
    "JWK_URL": None,
    "LEEWAY": 0,
    "AUTH_HEADER_TYPES": ("Bearer",),
    "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
    "USER_AUTHENTICATION_RULE": "rest_framework_simplejwt.authentication.default_user_authentication_rule",
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    "TOKEN_TYPE_CLAIM": "token_type",
    "TOKEN_USER_CLASS": "rest_framework_simplejwt.models.TokenUser",
    "JTI_CLAIM": "jti",
}


# django-allauth 설정
# ==============================================================================

ACCOUNT_AUTHENTICATION_METHOD = "email"  # 이메일로 로그인
ACCOUNT_EMAIL_REQUIRED = True  # 이메일 필수
ACCOUNT_USERNAME_REQUIRED = False  # 유저네임 불필요
ACCOUNT_EMAIL_VERIFICATION = "mandatory"  # 이메일 인증 필수
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_USER_MODEL_USERNAME_FIELD = None

# 이메일 인증 링크 설정
ACCOUNT_EMAIL_CONFIRMATION_AUTHENTICATED_REDIRECT_URL = "/accounts/email-confirmed/"
ACCOUNT_EMAIL_CONFIRMATION_ANONYMOUS_REDIRECT_URL = "/accounts/email-confirmed/"

# 로그인 리다이렉트
LOGIN_REDIRECT_URL = "/"
ACCOUNT_LOGOUT_REDIRECT_URL = "/"


# 이메일 설정
# ==============================================================================

EMAIL_BACKEND = config(
    "EMAIL_BACKEND",
    default="django.core.mail.backends.console.EmailBackend",  # 개발 환경: 콘솔 출력
)
EMAIL_HOST = config("EMAIL_HOST", default="smtp.gmail.com")
EMAIL_PORT = config("EMAIL_PORT", default=587, cast=int)
EMAIL_USE_TLS = config("EMAIL_USE_TLS", default=True, cast=bool)
EMAIL_HOST_USER = config("EMAIL_HOST_USER", default="")
EMAIL_HOST_PASSWORD = config("EMAIL_HOST_PASSWORD", default="")
DEFAULT_FROM_EMAIL = config("EMAIL_HOST_USER", default="noreply@aimakerlab.com")


# 소셜 로그인 설정
# ==============================================================================

SOCIALACCOUNT_PROVIDERS = {
    "google": {
        "SCOPE": [
            "profile",
            "email",
        ],
        "AUTH_PARAMS": {
            "access_type": "online",
        },
        "APP": {
            "client_id": config("GOOGLE_CLIENT_ID", default=""),
            "secret": config("GOOGLE_SECRET_KEY", default=""),
            "key": "",
        },
    },
    "kakao": {
        "APP": {
            "client_id": config("KAKAO_CLIENT_ID", default=""),
            "secret": config("KAKAO_SECRET_KEY", default=""),
            "key": "",
        }
    },
}


# dj-rest-auth 설정
# ==============================================================================

REST_AUTH = {
    "USE_JWT": True,
    "JWT_AUTH_COOKIE": "auth-token",
    "JWT_AUTH_REFRESH_COOKIE": "refresh-token",
    "JWT_AUTH_HTTPONLY": False,
    "USER_DETAILS_SERIALIZER": "accounts.serializers.UserSerializer",
}


# Logging 설정 (선택사항)
# ==============================================================================

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
        },
        "file": {
            "class": "logging.FileHandler",
            "filename": BASE_DIR / "logs" / "django.log",
        },
    },
    "root": {
        "handlers": ["console"],
        "level": "INFO",
    },
    "loggers": {
        "django": {
            "handlers": ["console", "file"],
            "level": "INFO",
            "propagate": False,
        },
    },
}

# logs 디렉토리 생성
os.makedirs(BASE_DIR / "logs", exist_ok=True)


# 데이터 소스 설정 (JSON vs Database)
# ==============================================================================
# 페이지별로 JSON 또는 DB를 선택할 수 있도록 설정

# True: JSON 파일 사용, False: Database 사용
DATA_SOURCE_CONFIG = {
    # 계정
    'accounts': {
        'user_profile': config('USE_JSON_USER_PROFILE', default=False, cast=bool),
        'user_courses': config('USE_JSON_USER_COURSES', default=False, cast=bool),
    },
    # 문의
    'inquiry': {
        'inquiries': config('USE_JSON_INQUIRIES', default=False, cast=bool),
        'schedules': config('USE_JSON_SCHEDULES', default=False, cast=bool),
        'outreach': config('USE_JSON_OUTREACH', default=False, cast=bool),
    },
    # 제품
    'products': {
        'products': config('USE_JSON_PRODUCTS', default=False, cast=bool),
        'videos': config('USE_JSON_VIDEOS', default=False, cast=bool),
        'quote_items': config('USE_JSON_QUOTE_ITEMS', default=False, cast=bool),
        'quote_inquiries': config('USE_JSON_QUOTE_INQUIRIES', default=False, cast=bool),
        'reviews': config('USE_JSON_REVIEWS', default=False, cast=bool),
    },
    # 갤러리
    'gallery': {
        'works': config('USE_JSON_GALLERY_WORKS', default=False, cast=bool),
        'reviews': config('USE_JSON_GALLERY_REVIEWS', default=False, cast=bool),
    },
    # 커리큘럼
    'curriculum': {
        'curriculums': config('USE_JSON_CURRICULUMS', default=False, cast=bool),
    },
    # 홈
    'home': {
        'content': config('USE_JSON_HOME_CONTENT', default=False, cast=bool),
    },
}

# Frontend의 public 폴더 경로
FRONTEND_PUBLIC_PATH = BASE_DIR.parent / 'frontend' / 'public'
