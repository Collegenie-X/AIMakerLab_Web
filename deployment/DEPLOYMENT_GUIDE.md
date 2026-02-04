# 배포 가이드

## 아키텍처 개요

```
[클라이언트] → [Nginx:443] → [Next.js:3000] → [Django:8000 (Gunicorn)]
                    ↓
              [Static/Media Files]
```

### 핵심 원리

1. **Next.js Rewrite**: 클라이언트의 `/api/*` 요청을 Next.js가 받아서 Django로 프록시
2. **백엔드 URL 숨김**: 실제 Django URL은 환경 변수(`BACKEND_URL`)로만 존재, 클라이언트에 노출되지 않음
3. **CORS 불필요**: Next.js가 같은 도메인에서 프록시하므로 CORS 문제 없음

---

## 1. 환경 구성

### 개발 환경

```env
# frontend/.env.development
BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_DATA_SOURCE=json
```

```bash
# Terminal 1: Django
cd backend
python manage.py runserver

# Terminal 2: Next.js
cd frontend
npm run dev
```

### 프로덕션 환경

```env
# frontend/.env.production
BACKEND_URL=http://127.0.0.1:8000
NEXT_PUBLIC_DATA_SOURCE=api
NEXT_PUBLIC_USE_API_INQUIRY=true
NEXT_PUBLIC_USE_API_PRODUCTS=true
NEXT_PUBLIC_USE_API_GALLERY=true
```

---

## 2. Django (Gunicorn) 설정

### Gunicorn 설치

```bash
cd backend
pip install gunicorn
```

### Gunicorn 실행

```bash
# 개발
gunicorn config.wsgi:application --bind 127.0.0.1:8000

# 프로덕션
gunicorn config.wsgi:application \
  --bind 127.0.0.1:8000 \
  --workers 4 \
  --threads 2 \
  --timeout 60 \
  --access-logfile /var/log/gunicorn/access.log \
  --error-logfile /var/log/gunicorn/error.log \
  --log-level info \
  --daemon
```

### Systemd 서비스 파일

`/etc/systemd/system/gunicorn.service`:

```ini
[Unit]
Description=Gunicorn daemon for AIMakerLab Django
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/aimakerlab/backend
Environment="PATH=/var/www/aimakerlab/venv/bin"
ExecStart=/var/www/aimakerlab/venv/bin/gunicorn \
  --bind 127.0.0.1:8000 \
  --workers 4 \
  --threads 2 \
  config.wsgi:application

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable gunicorn
sudo systemctl start gunicorn
sudo systemctl status gunicorn
```

---

## 3. Next.js 배포

### 빌드

```bash
cd frontend
npm run build
```

### PM2로 실행 (권장)

```bash
# PM2 설치
npm install -g pm2

# 실행
pm2 start npm --name "nextjs-frontend" -- start

# 자동 시작 설정
pm2 startup
pm2 save
```

### Systemd 서비스 파일

`/etc/systemd/system/nextjs.service`:

```ini
[Unit]
Description=Next.js frontend for AIMakerLab
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/aimakerlab/frontend
Environment="NODE_ENV=production"
Environment="BACKEND_URL=http://127.0.0.1:8000"
ExecStart=/usr/bin/npm start

[Install]
WantedBy=multi-user.target
```

---

## 4. Nginx 설정

### 설치

```bash
sudo apt update
sudo apt install nginx
```

### 설정 복사

```bash
sudo cp deployment/nginx.conf /etc/nginx/sites-available/aimakerlab
sudo ln -s /etc/nginx/sites-available/aimakerlab /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### SSL 인증서 (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d aimakerlab.com -d www.aimakerlab.com
```

---

## 5. Django 설정

### settings.py 업데이트

```python
# backend/config/settings.py

# 프로덕션 설정
DEBUG = False
ALLOWED_HOSTS = ['aimakerlab.com', 'www.aimakerlab.com', '127.0.0.1']

# HTTPS 설정
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# Static/Media 파일
STATIC_ROOT = '/var/www/aimakerlab/backend/staticfiles'
MEDIA_ROOT = '/var/www/aimakerlab/backend/media'
```

### Static 파일 수집

```bash
cd backend
python manage.py collectstatic --noinput
```

---

## 6. 보안 체크리스트

### Django
- [ ] `DEBUG = False`
- [ ] `SECRET_KEY` 환경 변수로 관리
- [ ] `ALLOWED_HOSTS` 설정
- [ ] HTTPS 강제 (`SECURE_SSL_REDIRECT`)
- [ ] CSRF 보호 활성화
- [ ] SQL Injection 방어 (ORM 사용)

### Next.js
- [ ] `BACKEND_URL`은 서버 사이드에서만 사용
- [ ] 클라이언트에 민감한 정보 노출 금지
- [ ] 환경 변수 검증

### Nginx
- [ ] SSL/TLS 설정
- [ ] 보안 헤더 추가
- [ ] Rate limiting 설정 (선택)
- [ ] 업로드 크기 제한

---

## 7. 모니터링

### 로그 확인

```bash
# Nginx
sudo tail -f /var/log/nginx/aimakerlab_access.log
sudo tail -f /var/log/nginx/aimakerlab_error.log

# Gunicorn
sudo tail -f /var/log/gunicorn/access.log
sudo tail -f /var/log/gunicorn/error.log

# PM2 (Next.js)
pm2 logs nextjs-frontend
```

### 상태 확인

```bash
# Nginx
sudo systemctl status nginx

# Gunicorn
sudo systemctl status gunicorn

# PM2
pm2 status
```

---

## 8. 트러블슈팅

### CORS 에러

**원인**: Next.js rewrite가 제대로 작동하지 않음

**해결**:
1. `next.config.mjs`의 `rewrites()` 함수 확인
2. `BACKEND_URL` 환경 변수 확인
3. Next.js 재시작: `pm2 restart nextjs-frontend`

### 502 Bad Gateway

**원인**: Django/Gunicorn이 실행되지 않음

**해결**:
```bash
sudo systemctl status gunicorn
sudo systemctl restart gunicorn
```

### Static 파일 404

**원인**: Static 파일이 수집되지 않음

**해결**:
```bash
cd backend
python manage.py collectstatic --noinput
sudo chown -R www-data:www-data /var/www/aimakerlab/backend/staticfiles
```

### API 응답 없음

**원인**: Next.js가 백엔드 URL을 찾지 못함

**해결**:
1. `.env.production` 파일에 `BACKEND_URL` 확인
2. Django가 `127.0.0.1:8000`에서 실행 중인지 확인
3. `curl http://127.0.0.1:8000/api/` 테스트

---

## 9. Docker Compose (선택)

### docker-compose.yml

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    command: gunicorn config.wsgi:application --bind 0.0.0.0:8000
    volumes:
      - ./backend:/app
      - static_volume:/app/staticfiles
      - media_volume:/app/media
    environment:
      - DEBUG=False
      - DATABASE_URL=postgresql://user:password@db:5432/aimakerlab
    depends_on:
      - db

  frontend:
    build: ./frontend
    command: npm start
    volumes:
      - ./frontend:/app
      - /app/node_modules
      - /app/.next
    environment:
      - BACKEND_URL=http://backend:8000
      - NEXT_PUBLIC_DATA_SOURCE=api
    depends_on:
      - backend

  nginx:
    image: nginx:latest
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./deployment/nginx.conf:/etc/nginx/conf.d/default.conf
      - static_volume:/var/www/staticfiles
      - media_volume:/var/www/media
    depends_on:
      - frontend
      - backend

  db:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=aimakerlab
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password

volumes:
  postgres_data:
  static_volume:
  media_volume:
```

---

## 10. 성능 최적화

### Next.js

```bash
# ISR (Incremental Static Regeneration) 활용
# revalidate 옵션 설정
```

### Django

```bash
# Redis 캐싱
pip install django-redis

# settings.py
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
    }
}
```

### Nginx

```nginx
# Gzip 압축
gzip on;
gzip_types text/plain text/css application/json application/javascript;

# 캐싱
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m;
```

---

## 요약

1. **Next.js rewrite**로 모든 API 요청을 프록시
2. **BACKEND_URL**은 환경 변수로만 존재 (클라이언트에 노출 안 됨)
3. **Nginx**는 SSL/TLS와 정적 파일만 담당
4. **CORS 불필요** - 같은 도메인에서 요청

이 구조로 백엔드 URL을 완벽하게 숨기고 CORS 문제도 해결됩니다!
