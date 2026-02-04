# Requirements 설치 가이드 📦

## 업데이트된 requirements.txt

### 🎯 주요 변경사항

#### ✅ 추가된 패키지

1. **기본 빌드 도구**
   - `setuptools>=70.0.0` - Python 패키지 빌드 도구

2. **데이터베이스**
   - `psycopg2-binary>=2.9.9` - PostgreSQL 드라이버 (프로덕션용)

3. **통계 & 데이터 분석 (대시보드용)**
   - `pandas>=2.1.4` - 데이터 분석 라이브러리
   - `numpy>=1.26.3` - 수치 계산 라이브러리

4. **CSV & 엑셀 처리**
   - `openpyxl>=3.1.2` - Excel 파일 읽기/쓰기
   - `xlsxwriter>=3.1.9` - Excel 파일 생성

5. **캐싱 (성능 최적화)**
   - `django-redis>=5.4.0` - Redis 캐싱 백엔드

6. **보안**
   - `django-ratelimit>=4.1.0` - API Rate Limiting
   - `django-defender>=0.9.7` - 브루트포스 공격 방어

7. **개발 도구**
   - `django-debug-toolbar>=4.2.0` - 디버그 툴바
   - `django-extensions>=3.2.3` - Django 확장 명령어

8. **테스트**
   - `pytest>=7.4.4` - 테스트 프레임워크
   - `pytest-django>=4.7.0` - Django 테스트 플러그인
   - `pytest-cov>=4.1.0` - 코드 커버리지
   - `factory-boy>=3.3.0` - 테스트 데이터 팩토리

9. **프로덕션 서버**
   - `gunicorn>=21.2.0` - WSGI HTTP 서버
   - `whitenoise>=6.6.0` - 정적 파일 서빙

---

## 🚀 설치 방법

### 1. 가상환경 활성화

```bash
cd backend
source ../venv/bin/activate  # macOS/Linux
# 또는
..\venv\Scripts\activate  # Windows
```

### 2. 전체 패키지 설치

```bash
pip install -r requirements.txt
```

### 3. 개별 패키지 설치 (선택사항)

#### 기본 패키지만 설치
```bash
pip install Django==5.0.1 djangorestframework==3.14.0 setuptools
```

#### 개발 환경
```bash
pip install black flake8 django-debug-toolbar django-extensions pytest pytest-django
```

#### 프로덕션 환경
```bash
pip install gunicorn psycopg2-binary django-redis whitenoise
```

---

## 📊 패키지 용도별 분류

### 필수 패키지 (REQUIRED)
```txt
setuptools>=70.0.0
Django==5.0.1
djangorestframework==3.14.0
djangorestframework-simplejwt==5.3.1
django-allauth==0.61.1
django-cors-headers==4.3.1
Pillow>=10.4.0
python-decouple==3.8
```

### 대시보드 관련 (DASHBOARD)
```txt
pandas>=2.1.4
numpy>=1.26.3
openpyxl>=3.1.2
xlsxwriter>=3.1.9
```

### 프로덕션 (PRODUCTION)
```txt
gunicorn>=21.2.0
psycopg2-binary>=2.9.9
django-redis>=5.4.0
whitenoise>=6.6.0
django-ratelimit>=4.1.0
django-defender>=0.9.7
```

### 개발 (DEVELOPMENT)
```txt
black==24.1.1
flake8==7.0.0
django-debug-toolbar>=4.2.0
django-extensions>=3.2.3
pytest>=7.4.4
pytest-django>=4.7.0
factory-boy>=3.3.0
```

---

## 🎯 최소 설치 (개발 시작)

개발을 시작하려면 최소한 다음 패키지만 설치하면 됩니다:

```bash
pip install Django==5.0.1 \
            djangorestframework==3.14.0 \
            setuptools \
            django-cors-headers==4.3.1 \
            python-decouple==3.8 \
            Pillow
```

---

## 🔧 환경별 설치

### 개발 환경 (Development)

```bash
# 1. 가상환경 생성 및 활성화
python -m venv venv
source venv/bin/activate

# 2. 전체 패키지 설치
pip install -r requirements.txt

# 3. 개발 도구 추가 설치
pip install ipython jupyter
```

### 프로덕션 환경 (Production)

```bash
# 1. 필수 패키지만 설치
pip install --no-cache-dir -r requirements.txt

# 2. 불필요한 개발 도구 제외 (선택사항)
# requirements-prod.txt 파일을 별도로 만들어 사용
```

### 테스트 환경 (Testing)

```bash
# 테스트 관련 패키지만 설치
pip install pytest pytest-django pytest-cov factory-boy
```

---

## 📝 requirements 파일 분리 (권장)

### 구조
```
backend/
├── requirements/
│   ├── base.txt        # 공통 패키지
│   ├── dev.txt         # 개발 환경
│   ├── prod.txt        # 프로덕션
│   └── test.txt        # 테스트
└── requirements.txt    # 전체 (현재)
```

### base.txt (공통)
```txt
Django==5.0.1
djangorestframework==3.14.0
setuptools>=70.0.0
...
```

### dev.txt (개발)
```txt
-r base.txt
black==24.1.1
flake8==7.0.0
django-debug-toolbar>=4.2.0
...
```

### prod.txt (프로덕션)
```txt
-r base.txt
gunicorn>=21.2.0
psycopg2-binary>=2.9.9
...
```

---

## 🔍 패키지 상세 설명

### 1. setuptools
- **용도**: Python 패키지 빌드 및 배포
- **필요성**: 다른 패키지 설치 시 필수
- **버전**: >=70.0.0 (최신 버전 권장)

### 2. pandas & numpy
- **용도**: 대시보드 통계 계산
- **사용처**: 
  - 일별/월별 통계 집계
  - CSV 내보내기
  - 데이터 분석

### 3. psycopg2-binary
- **용도**: PostgreSQL 데이터베이스 연결
- **주의**: 개발용으로는 SQLite3 사용 가능
- **프로덕션**: 필수

### 4. django-redis
- **용도**: Redis 캐싱
- **효과**: API 응답 속도 향상
- **설정**: settings.py에 CACHES 설정 필요

### 5. gunicorn
- **용도**: WSGI HTTP 서버
- **프로덕션**: Nginx + Gunicorn 조합 사용
- **개발**: python manage.py runserver 사용

### 6. django-debug-toolbar
- **용도**: SQL 쿼리 분석, 성능 프로파일링
- **주의**: 개발 환경에서만 사용 (DEBUG=True)

---

## ⚠️ 주의사항

### 1. pkg_resources 경고
```
UserWarning: pkg_resources is deprecated as an API
```
**해결**: 최신 setuptools 설치로 경고 감소
```bash
pip install --upgrade setuptools
```

### 2. Pillow 버전
- **최소**: 10.4.0
- **이유**: 보안 취약점 패치

### 3. PostgreSQL 미설치 시
```bash
# psycopg2-binary 설치 실패 시
# SQLite3만 사용하는 경우 주석 처리 가능
# psycopg2-binary>=2.9.9
```

### 4. Redis 미설치 시
```bash
# django-redis 관련 설정 주석 처리
# settings.py의 CACHES 설정 제거
```

---

## 🔄 업데이트 방법

### 전체 패키지 업데이트
```bash
pip install --upgrade -r requirements.txt
```

### 특정 패키지만 업데이트
```bash
pip install --upgrade Django
pip install --upgrade djangorestframework
```

### 현재 설치된 버전 확인
```bash
pip list
pip show Django
```

### 설치된 패키지를 requirements.txt로 내보내기
```bash
pip freeze > requirements-current.txt
```

---

## 🐛 트러블슈팅

### 1. pip 버전 오래된 경우
```bash
pip install --upgrade pip
```

### 2. 패키지 설치 실패
```bash
# 캐시 제거 후 재설치
pip cache purge
pip install -r requirements.txt --no-cache-dir
```

### 3. 의존성 충돌
```bash
# 가상환경 재생성
deactivate
rm -rf venv
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 4. macOS에서 psycopg2 설치 오류
```bash
# PostgreSQL 설치 필요
brew install postgresql
```

### 5. Pillow 설치 오류
```bash
# macOS
brew install libjpeg zlib

# Ubuntu
sudo apt-get install libjpeg-dev zlib1g-dev
```

---

## 📚 추가 리소스

### 공식 문서
- **Django**: https://docs.djangoproject.com/
- **DRF**: https://www.django-rest-framework.org/
- **Gunicorn**: https://docs.gunicorn.org/

### 패키지 저장소
- **PyPI**: https://pypi.org/
- **Django Packages**: https://djangopackages.org/

---

## ✅ 설치 확인

설치가 완료되면 다음 명령어로 확인:

```bash
# Python 버전
python --version

# 설치된 패키지 목록
pip list

# Django 버전
python -m django --version

# 서버 실행 테스트
cd backend
python manage.py check
```

**출력 예시**:
```
System check identified no issues (0 silenced).
```

---

## 🎉 완료!

이제 다음 명령어로 서버를 실행할 수 있습니다:

```bash
cd backend
python manage.py runserver
```

**대시보드 접속**: http://localhost:8000/admin/

---

**작성일**: 2026-02-04  
**버전**: 1.0.0  
**Python**: 3.9+  
**Django**: 5.0.1
