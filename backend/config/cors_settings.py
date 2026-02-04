"""
CORS 설정 파일

프론트엔드와 백엔드 간의 CORS(Cross-Origin Resource Sharing) 설정을 관리합니다.
보안을 강화하고 허용된 도메인만 접근할 수 있도록 설정합니다.
"""

from decouple import config

# CORS 허용 도메인 설정
# 환경 변수에서 쉼표로 구분된 도메인 목록을 가져옵니다.
CORS_ALLOWED_ORIGINS_STRING = config(
    'CORS_ALLOWED_ORIGINS',
    default='http://localhost:3000,http://127.0.0.1:3000'
)

# 쉼표로 구분된 문자열을 리스트로 변환
CORS_ALLOWED_ORIGINS = [
    origin.strip() 
    for origin in CORS_ALLOWED_ORIGINS_STRING.split(',') 
    if origin.strip()
]

# CORS 설정
CORS_SETTINGS = {
    # 허용된 Origin 목록
    'CORS_ALLOWED_ORIGINS': CORS_ALLOWED_ORIGINS,
    
    # 모든 Origin 허용 (개발 환경에서만 사용, 프로덕션에서는 False)
    'CORS_ALLOW_ALL_ORIGINS': config('CORS_ALLOW_ALL_ORIGINS', default=False, cast=bool),
    
    # 쿠키를 포함한 요청 허용
    'CORS_ALLOW_CREDENTIALS': True,
    
    # 허용할 HTTP 메서드
    'CORS_ALLOW_METHODS': [
        'DELETE',
        'GET',
        'OPTIONS',
        'PATCH',
        'POST',
        'PUT',
    ],
    
    # 허용할 HTTP 헤더
    'CORS_ALLOW_HEADERS': [
        'accept',
        'accept-encoding',
        'authorization',
        'content-type',
        'dnt',
        'origin',
        'user-agent',
        'x-csrftoken',
        'x-requested-with',
    ],
    
    # Preflight 요청 결과를 캐시할 시간 (초)
    'CORS_PREFLIGHT_MAX_AGE': 86400,  # 24시간
    
    # 브라우저에 노출할 헤더
    'CORS_EXPOSE_HEADERS': [
        'Content-Type',
        'X-CSRFToken',
    ],
}

# 개발 환경에서 추가 허용 도메인
if config('DEBUG', default=False, cast=bool):
    # 로컬 개발 환경
    CORS_SETTINGS['CORS_ALLOWED_ORIGINS'].extend([
        'http://localhost:3000',
        'http://localhost:3001',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:3001',
    ])
    # 중복 제거
    CORS_SETTINGS['CORS_ALLOWED_ORIGINS'] = list(set(CORS_SETTINGS['CORS_ALLOWED_ORIGINS']))

# CSRF 신뢰 도메인 설정
CSRF_TRUSTED_ORIGINS = CORS_SETTINGS['CORS_ALLOWED_ORIGINS'].copy()

# 프로덕션 도메인 추가 (HTTPS)
PRODUCTION_DOMAINS = config(
    'PRODUCTION_DOMAINS',
    default=''
)

if PRODUCTION_DOMAINS:
    production_list = [
        domain.strip() 
        for domain in PRODUCTION_DOMAINS.split(',') 
        if domain.strip()
    ]
    CSRF_TRUSTED_ORIGINS.extend(production_list)
    # 중복 제거
    CSRF_TRUSTED_ORIGINS = list(set(CSRF_TRUSTED_ORIGINS))

# 보안 헤더 설정
SECURE_SETTINGS = {
    # HTTPS 관련 설정 (프로덕션)
    'SECURE_SSL_REDIRECT': config('SECURE_SSL_REDIRECT', default=False, cast=bool),
    'SESSION_COOKIE_SECURE': config('SESSION_COOKIE_SECURE', default=False, cast=bool),
    'CSRF_COOKIE_SECURE': config('CSRF_COOKIE_SECURE', default=False, cast=bool),
    
    # SameSite 쿠키 설정
    'SESSION_COOKIE_SAMESITE': 'Lax',
    'CSRF_COOKIE_SAMESITE': 'Lax',
    
    # 쿠키 도메인 설정 (프로덕션)
    'SESSION_COOKIE_DOMAIN': config('SESSION_COOKIE_DOMAIN', default=None),
    'CSRF_COOKIE_DOMAIN': config('CSRF_COOKIE_DOMAIN', default=None),
    
    # HTTP Only 쿠키
    'SESSION_COOKIE_HTTPONLY': True,
    'CSRF_COOKIE_HTTPONLY': False,  # JavaScript에서 접근 가능해야 함
    
    # 보안 헤더
    'SECURE_BROWSER_XSS_FILTER': True,
    'SECURE_CONTENT_TYPE_NOSNIFF': True,
    'X_FRAME_OPTIONS': 'DENY',
}

# API 속도 제한 설정 (선택사항)
RATE_LIMIT_SETTINGS = {
    # IP당 요청 제한
    'DEFAULT_THROTTLE_RATES': {
        'anon': config('THROTTLE_RATE_ANON', default='100/hour'),
        'user': config('THROTTLE_RATE_USER', default='1000/hour'),
    }
}


def get_cors_settings():
    """CORS 설정 반환"""
    return CORS_SETTINGS


def get_csrf_trusted_origins():
    """CSRF 신뢰 도메인 반환"""
    return CSRF_TRUSTED_ORIGINS


def get_secure_settings():
    """보안 설정 반환"""
    return SECURE_SETTINGS


def get_rate_limit_settings():
    """속도 제한 설정 반환"""
    return RATE_LIMIT_SETTINGS


def print_cors_config():
    """CORS 설정 출력 (디버깅용)"""
    print("=" * 80)
    print("CORS Configuration")
    print("=" * 80)
    print(f"CORS_ALLOWED_ORIGINS: {CORS_SETTINGS['CORS_ALLOWED_ORIGINS']}")
    print(f"CORS_ALLOW_ALL_ORIGINS: {CORS_SETTINGS['CORS_ALLOW_ALL_ORIGINS']}")
    print(f"CORS_ALLOW_CREDENTIALS: {CORS_SETTINGS['CORS_ALLOW_CREDENTIALS']}")
    print(f"CSRF_TRUSTED_ORIGINS: {CSRF_TRUSTED_ORIGINS}")
    print("=" * 80)
