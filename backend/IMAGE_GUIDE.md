# 이미지 및 동영상 관리 가이드

## 개요

이 프로젝트는 이미지와 동영상을 효율적으로 관리하기 위해 Django의 `ImageField`와 `URLField`를 사용합니다.

## 폴더 구조

```
backend/
├── media/                              # 업로드된 미디어 파일 저장소
│   ├── home/
│   │   ├── hero_slides/               # 히어로 슬라이드 이미지
│   │   └── curriculum_highlights/      # 커리큘럼 하이라이트 이미지
│   ├── curriculum/
│   │   └── projects/                  # 커리큘럼 프로젝트 이미지
│   ├── products/
│   │   ├── main/                      # 제품 메인 이미지
│   │   ├── quote_items/               # 견적 상품 이미지
│   │   ├── video_thumbnails/          # 영상 썸네일
│   │   ├── classroom_photos/          # 수업 현장 사진
│   │   └── related_classes/           # 관련 수업 이미지
│   └── gallery/
│       ├── works/                     # 학생 작품 이미지
│       └── reviews/                   # 수업 후기 이미지
└── static/                             # 정적 파일 (CSS, JS, 공통 이미지)
```

## 이미지 업로드 방법

### 1. Django Admin을 통한 업로드

1. 관리자 페이지 접속: http://localhost:8000/admin/
2. 원하는 모델 선택 (예: 홈 > 히어로 슬라이드)
3. 새 항목 추가 또는 기존 항목 수정
4. 이미지 필드에서 "파일 선택" 버튼 클릭
5. 이미지 파일 선택 및 저장

**지원 형식**: JPG, JPEG, PNG, GIF, WEBP

### 2. API를 통한 업로드

```python
import requests

# 이미지 파일 업로드 예시
url = "http://localhost:8000/api/home/hero-slides/"
files = {'image': open('hero_slide.jpg', 'rb')}
data = {
    'title': '앱 인벤터 코딩',
    'description': '블록 코딩으로 나만의 앱 만들기',
    'cta_label': '자세히 보기',
    'cta_href': '/curriculum/app-inventor',
    'order': 1
}
headers = {'Authorization': 'Bearer YOUR_JWT_TOKEN'}

response = requests.post(url, files=files, data=data, headers=headers)
print(response.json())
```

### 3. cURL을 통한 업로드

```bash
curl -X POST http://localhost:8000/api/home/hero-slides/ \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "title=앱 인벤터 코딩" \
  -F "description=블록 코딩으로 나만의 앱 만들기" \
  -F "cta_label=자세히 보기" \
  -F "cta_href=/curriculum/app-inventor" \
  -F "order=1" \
  -F "image=@/path/to/hero_slide.jpg"
```

## 동영상 관리

### YouTube URL 저장

동영상은 파일로 업로드하지 않고 YouTube URL을 저장합니다.

#### 모델별 동영상 필드:

1. **IntroVideo** (`home` 앱)
   - `youtube_embed_url`: YouTube 임베드 URL
   
2. **Video** (`products` 앱)
   - `video_url`: YouTube 임베드 URL
   - `thumbnail`: 영상 썸네일 이미지 (ImageField)

### YouTube 임베드 URL 형식

```
https://www.youtube.com/embed/VIDEO_ID
```

**예시**:
- 일반 URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- 임베드 URL: `https://www.youtube.com/embed/dQw4w9WgXcQ`

### Admin에서 동영상 추가

1. 홈 > 소개 영상 또는 제품 > 교구 영상 선택
2. 새 항목 추가
3. `youtube_embed_url` 또는 `video_url` 필드에 YouTube 임베드 URL 입력
4. 썸네일 이미지 업로드 (Video 모델의 경우)
5. 저장

### API를 통한 동영상 추가

```python
import requests

# 소개 영상 추가
url = "http://localhost:8000/api/home/intro-videos/"
data = {
    'heading': 'AI Maker Lab 소개',
    'subheading': '영상으로 만나보는 우리의 교육 철학',
    'youtube_title': 'AI Make Lab Introduction',
    'youtube_embed_url': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'is_active': True
}
headers = {'Authorization': 'Bearer YOUR_JWT_TOKEN'}

response = requests.post(url, json=data, headers=headers)
print(response.json())
```

## 이미지 URL 접근

업로드된 이미지는 다음 형식으로 접근할 수 있습니다:

```
http://localhost:8000/media/{upload_path}/{filename}
```

**예시**:
- 히어로 슬라이드: `http://localhost:8000/media/home/hero_slides/hero_slide_1.jpg`
- 제품 이미지: `http://localhost:8000/media/products/main/product_1.jpg`
- 갤러리 이미지: `http://localhost:8000/media/gallery/works/student_work_1.jpg`

API 응답에서 이미지 URL은 자동으로 포함됩니다:

```json
{
  "id": 1,
  "title": "앱 인벤터 코딩",
  "description": "블록 코딩으로 나만의 앱 만들기",
  "image": "/media/home/hero_slides/hero_slide_1.jpg",
  "cta_label": "자세히 보기",
  "cta_href": "/curriculum/app-inventor",
  "order": 1
}
```

## 모델별 이미지 필드 정리

### Home 앱
- **HeroSlide**: `image` (히어로 슬라이드 이미지)
- **IntroVideo**: `youtube_embed_url` (YouTube URL, 이미지 없음)
- **CurriculumHighlight**: `image` (커리큘럼 하이라이트 이미지)

### Curriculum 앱
- **CurriculumProject**: `image` (프로젝트 이미지, optional)

### Products 앱
- **Product**: `main_image` (메인 이미지), `images` (추가 이미지 URL 목록 - JSONField)
- **QuoteItem**: `image` (견적 상품 이미지)
- **Video**: `thumbnail` (썸네일 이미지), `video_url` (YouTube URL)
- **ClassroomPhoto**: `image` (수업 사진)
- **RelatedClass**: `image` (관련 수업 이미지)

### Gallery 앱
- **GalleryItem**: `image` (메인 이미지), `images` (추가 이미지 URL 목록 - JSONField)

## 개발 환경 설정

### 1. Pillow 설치 확인

이미지 처리를 위해 Pillow 라이브러리가 필요합니다:

```bash
pip install Pillow>=10.4.0
```

### 2. 미디어 파일 서빙 (개발 환경)

`config/urls.py`에 이미 설정되어 있습니다:

```python
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

### 3. 프로덕션 환경

프로덕션에서는 웹 서버(Nginx, Apache)나 CDN을 통해 미디어 파일을 서빙해야 합니다.

**Nginx 설정 예시**:

```nginx
server {
    listen 80;
    server_name example.com;

    location /media/ {
        alias /path/to/backend/media/;
    }

    location /static/ {
        alias /path/to/backend/staticfiles/;
    }
}
```

## 이미지 최적화 권장사항

### 권장 이미지 크기

- **히어로 슬라이드**: 1920x1080px (16:9)
- **제품 이미지**: 800x800px (1:1)
- **커리큘럼 하이라이트**: 1200x800px (3:2)
- **갤러리 이미지**: 1200x900px (4:3)
- **썸네일**: 640x360px (16:9)

### 파일 크기

- 이미지당 최대 5MB 권장
- JPG: 일반 사진
- PNG: 투명 배경이 필요한 이미지
- WEBP: 최적화된 웹 이미지 (권장)

### 이미지 압축 도구

- [TinyPNG](https://tinypng.com/)
- [Squoosh](https://squoosh.app/)
- [ImageOptim](https://imageoptim.com/)

## 백업 및 복원

### 미디어 파일 백업

```bash
# media 폴더 압축
tar -czf media_backup_$(date +%Y%m%d).tar.gz media/

# 백업 파일 복원
tar -xzf media_backup_20240101.tar.gz
```

### 데이터베이스 백업

```bash
# SQLite 백업
cp db.sqlite3 db_backup_$(date +%Y%m%d).sqlite3

# 복원
cp db_backup_20240101.sqlite3 db.sqlite3
```

## 문제 해결

### 이미지가 표시되지 않는 경우

1. `settings.py`의 MEDIA_URL과 MEDIA_ROOT 확인
2. `urls.py`에 media 서빙 설정 확인
3. 파일 권한 확인: `chmod -R 755 media/`
4. 개발 서버 재시작

### 업로드 실패

1. Pillow 설치 확인: `pip list | grep Pillow`
2. 파일 크기 확인 (Django의 기본 업로드 제한: 2.5MB)
3. 디스크 공간 확인
4. media 폴더 쓰기 권한 확인

### 파일 크기 제한 변경

`settings.py`에 추가:

```python
# 최대 업로드 파일 크기 (바이트)
DATA_UPLOAD_MAX_MEMORY_SIZE = 10485760  # 10MB
FILE_UPLOAD_MAX_MEMORY_SIZE = 10485760  # 10MB
```

## 추가 리소스

- [Django File Uploads](https://docs.djangoproject.com/en/stable/topics/http/file-uploads/)
- [Django ImageField](https://docs.djangoproject.com/en/stable/ref/models/fields/#imagefield)
- [Pillow Documentation](https://pillow.readthedocs.io/)

