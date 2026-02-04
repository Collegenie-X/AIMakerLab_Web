# Deployment Files

This directory contains deployment configuration files for AIMakerLab.

## Files

### nginx.conf
Nginx configuration file for production deployment.

**Features:**
- SSL/TLS configuration
- Proxy to Next.js (Port 3000)
- Proxy to Django (Port 8000)
- Static/Media file serving
- Security headers
- Gzip compression

### DEPLOYMENT_GUIDE.md
Complete deployment guide with step-by-step instructions.

**Contents:**
- Environment setup
- Django + Gunicorn configuration
- Next.js deployment with PM2
- Nginx setup
- SSL certificate (Let's Encrypt)
- Security checklist
- Monitoring and troubleshooting
- Docker Compose option

## Quick Start

### Development

```bash
# Backend
cd backend
python manage.py runserver

# Frontend
cd frontend
npm run dev
```

### Production

```bash
# 1. Backend (Gunicorn)
cd backend
gunicorn config.wsgi:application --bind 127.0.0.1:8000 --daemon

# 2. Frontend (PM2)
cd frontend
npm run build
pm2 start npm --name "nextjs-frontend" -- start

# 3. Nginx
sudo cp nginx.conf /etc/nginx/sites-available/aimakerlab
sudo ln -s /etc/nginx/sites-available/aimakerlab /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Architecture

```
[Client] → [Nginx:443] → [Next.js:3000] → [Django:8000 (Gunicorn)]
               ↓
          [Static/Media]
```

## Security

- Backend URL is hidden from clients
- All API requests go through Next.js rewrite
- No CORS issues (same domain)
- HTTPS enforced in production

## Support

See `DEPLOYMENT_GUIDE.md` for detailed instructions.
