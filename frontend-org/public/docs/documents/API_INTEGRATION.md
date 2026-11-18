# AI Maker Lab - 완전한 API 연동 가이드

## 📋 개요

이 문서는 AI Maker Lab 웹 서비스의 **완전한 데이터베이스 설계**, **REST API 스펙**, **프론트엔드-백엔드 연동 방법**을 설명합니다.

### 현재 상태 (2026-01-08 업데이트)

**⚠️ 현재 프로젝트는 JSON Mock Data 기반으로 개발되었습니다.**

- ✅ **프론트엔드**: Next.js 15 + React 19 완성
- ✅ **UI 컴포넌트**: 60+ Shadcn/ui 기반 컴포넌트
- ✅ **페이지**: 30+ 페이지 구현
- ✅ **Mock Data**: `public/` 폴더의 JSON 파일 완비
- ✅ **DB 설계**: PostgreSQL 기반 완전한 ERD 완성
- ✅ **API 스펙**: RESTful API 전체 엔드포인트 설계
- ⏳ **백엔드 구현**: Django REST Framework + PostgreSQL 구축 예정

---

## 📊 데이터베이스 설계 (PostgreSQL)

### ERD (Entity Relationship Diagram)

### 주요 엔티티 관계

| 관계 | 카디널리티 | 설명 |
|------|------------|------|
| User ↔ Enrollment | 1:N | 한 사용자가 여러 강좌 수강 |
| Curriculum ↔ Enrollment | 1:N | 한 커리큘럼에 여러 수강생 |
| Schedule ↔ Instructor | N:1 | 여러 강좌를 한 강사가 담당 |
| Product ↔ Quote | N:M (through QuoteItem) | 제품과 견적은 다대다 관계 |
| Gallery | Works/Reviews 타입별 단일 테이블 | 작품과 후기를 하나의 테이블로 관리 |

---

## 🗄️ 데이터베이스 스키마

### 1. accounts_user (사용자)

사용자 계정 및 인증 정보를 관리합니다.

```sql
CREATE TABLE accounts_user (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,  -- Django의 make_password()로 해싱
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    profile_image VARCHAR(500),
    
    -- 역할
    role VARCHAR(20) DEFAULT 'student',  -- student, teacher, admin
    
    -- 인증 관련
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,  -- 이메일 인증 여부
    email_verification_token VARCHAR(100),
    email_verified_at TIMESTAMP,
    
    -- 비밀번호 재설정
    password_reset_token VARCHAR(100),
    password_reset_expires_at TIMESTAMP,
    
    -- 추가 정보
    birth_date DATE,
    gender VARCHAR(10),  -- male, female, other
    address TEXT,
    school_name VARCHAR(200),
    grade VARCHAR(50),  -- 학년
    
    -- 시스템
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP,
    deleted_at TIMESTAMP  -- Soft Delete
);

-- 인덱스
CREATE INDEX idx_user_email ON accounts_user(email);
CREATE INDEX idx_user_phone ON accounts_user(phone);
CREATE INDEX idx_user_role ON accounts_user(role);
CREATE INDEX idx_user_deleted_at ON accounts_user(deleted_at);
```

**필드 설명:**
- `password_hash`: Django의 `make_password()`로 암호화 (PBKDF2)
- `is_verified`: 이메일 인증 완료 여부
- `role`: 권한 관리 (학생/강사/관리자)
- `deleted_at`: Soft Delete (삭제 시 타임스탬프 기록)

---

### 2. curriculum (커리큘럼/과정)

교육 과정의 메타 정보를 저장합니다.

```sql
CREATE TABLE curriculum (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,  -- URL용 (e.g., 'ai-coding')
    category VARCHAR(50) NOT NULL,  -- 과정 카테고리
    
    -- 기본 정보
    title VARCHAR(200) NOT NULL,
    subtitle VARCHAR(300),
    description TEXT,
    badge VARCHAR(50),  -- 과정 뱃지 (예: "AI 융합 과정")
    
    -- 메타 정보
    gradient_class VARCHAR(100),  -- CSS 그라디언트 클래스
    cta_gradient VARCHAR(100),
    meta_title VARCHAR(200),
    meta_description TEXT,
    display_order INTEGER DEFAULT 0,
    
    -- 과정 상세
    duration VARCHAR(50),  -- "3개월 (12주)"
    capacity VARCHAR(50),  -- "4-6명 소규모 수업"
    method VARCHAR(100),  -- "프로젝트 기반 실습"
    total_hours VARCHAR(50),  -- "48시간"
    
    -- 대상
    target_grade VARCHAR(100),  -- "중학생 이상"
    difficulty VARCHAR(20),  -- elementary, intermediate, advanced
    
    -- 요구사항
    requirements JSONB,  -- ["개인 노트북", "Python 기초"]
    
    -- 학습 목표
    learning_goals JSONB,  -- [{category, title, description, skills[]}]
    achievements TEXT[],  -- 기대 성과 배열
    
    -- 커리큘럼 구조
    curriculum_projects JSONB,  -- 프로젝트 상세 정보
    
    -- 이미지
    hero_image VARCHAR(500),
    thumbnail_image VARCHAR(500),
    
    -- 상태
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    
    -- 시스템
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_curriculum_slug ON curriculum(slug);
CREATE INDEX idx_curriculum_category ON curriculum(category);
CREATE INDEX idx_curriculum_display_order ON curriculum(display_order);
CREATE INDEX idx_curriculum_is_active ON curriculum(is_active);
```

**JSONB 예시:**

```json
// learning_goals
[
  {
    "id": "planning",
    "category": "기획 능력",
    "title": "문제 발견 및 정의",
    "description": "실생활의 문제를 발견하고 AI로 해결할 수 있는 방법을 기획합니다",
    "skills": ["문제 분석 및 정의", "요구사항 도출", "기획서 작성"]
  }
]

// requirements
["개인 노트북", "Python 기초 지식", "메모리 8GB 이상"]
```

---

### 3. curriculum_module (커리큘럼 모듈)

커리큘럼을 구성하는 개별 모듈(주차별 수업)을 저장합니다.

```sql
CREATE TABLE curriculum_module (
    id SERIAL PRIMARY KEY,
    curriculum_id INTEGER NOT NULL REFERENCES curriculum(id) ON DELETE CASCADE,
    
    -- 모듈 정보
    module_order INTEGER NOT NULL,  -- 순서 (1, 2, 3...)
    title VARCHAR(200) NOT NULL,
    duration VARCHAR(50),  -- "4시간", "2주"
    description TEXT,
    
    -- 학습 내용
    topics TEXT[],  -- 주제 배열
    objectives TEXT[],  -- 학습 목표
    
    -- 실습/과제
    exercises TEXT[],  -- 실습 내용
    homework TEXT,  -- 과제
    
    -- 자료
    materials JSONB,  -- [{title, url, type}]
    
    -- 시스템
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(curriculum_id, module_order)
);

-- 인덱스
CREATE INDEX idx_module_curriculum ON curriculum_module(curriculum_id);
CREATE INDEX idx_module_order ON curriculum_module(curriculum_id, module_order);
```

---

### 4. instructor (강사)

강사 정보를 저장합니다.

```sql
CREATE TABLE instructor (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES accounts_user(id) ON DELETE SET NULL,
    
    -- 기본 정보
    name VARCHAR(100) NOT NULL,
    title VARCHAR(100),  -- "AI/데이터 사이언스 전문가"
    profile_image VARCHAR(500),
    
    -- 경력
    experience VARCHAR(50),  -- "7년차"
    specialization TEXT,  -- "머신러닝, 딥러닝, 데이터 분석"
    education VARCHAR(200),
    previous_company VARCHAR(200),  -- 이전 직장
    
    -- 소개
    introduction TEXT,  -- 자기소개
    achievements TEXT[],  -- 주요 경력/수상
    
    -- 통계
    total_students INTEGER DEFAULT 0,  -- 누적 수강생 수
    total_hours INTEGER DEFAULT 0,  -- 누적 강의 시간
    average_rating DECIMAL(3,2) DEFAULT 0.0,  -- 평균 평점
    
    -- 연락처
    email VARCHAR(255),
    phone VARCHAR(20),
    
    -- 상태
    is_active BOOLEAN DEFAULT TRUE,
    
    -- 시스템
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_instructor_user ON instructor(user_id);
CREATE INDEX idx_instructor_is_active ON instructor(is_active);
```

---

### 5. schedule (강좌/스케줄)

실제 개설된 강좌 스케줄을 저장합니다.

```sql
CREATE TABLE schedule (
    id SERIAL PRIMARY KEY,
    curriculum_id INTEGER NOT NULL REFERENCES curriculum(id) ON DELETE CASCADE,
    instructor_id INTEGER NOT NULL REFERENCES instructor(id) ON DELETE RESTRICT,
    
    -- 강좌 정보
    title VARCHAR(200) NOT NULL,
    description TEXT,
    
    -- 일정
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    schedule_time VARCHAR(100),  -- "화/목 19:00 - 21:00"
    month VARCHAR(7),  -- "2025-03" (필터링용)
    
    -- 수강
    capacity INTEGER NOT NULL,  -- 정원
    enrolled_count INTEGER DEFAULT 0,  -- 현재 수강 인원
    level VARCHAR(20),  -- elementary, intermediate, advanced
    duration VARCHAR(50),  -- "8주 과정 (16회)"
    
    -- 장소
    location VARCHAR(200),
    location_detail VARCHAR(500),
    
    -- 가격
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    discount_rate INTEGER DEFAULT 0,
    
    -- 후기/평가
    rating DECIMAL(3,2) DEFAULT 0.0,
    review_count INTEGER DEFAULT 0,
    
    -- 영상
    video_id VARCHAR(50),  -- YouTube ID
    
    -- 학습 내용
    learning_objectives TEXT[],
    expected_outcomes TEXT[],
    curriculum_detail JSONB,  -- 주차별 상세 커리큘럼
    student_projects JSONB,  -- 학생 프로젝트 예시
    requirements TEXT[],
    faqs JSONB,  -- [{question, answer}]
    
    -- 상태
    status VARCHAR(20) DEFAULT 'upcoming',  -- upcoming, ongoing, completed, cancelled
    is_featured BOOLEAN DEFAULT FALSE,
    
    -- 시스템
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_schedule_curriculum ON schedule(curriculum_id);
CREATE INDEX idx_schedule_instructor ON schedule(instructor_id);
CREATE INDEX idx_schedule_month ON schedule(month);
CREATE INDEX idx_schedule_status ON schedule(status);
CREATE INDEX idx_schedule_start_date ON schedule(start_date);
```

---

### 6. enrollment (수강 신청)

사용자의 강좌 수강 신청 및 진행 상황을 저장합니다.

```sql
CREATE TABLE enrollment (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES accounts_user(id) ON DELETE CASCADE,
    schedule_id INTEGER NOT NULL REFERENCES schedule(id) ON DELETE CASCADE,
    
    -- 수강 정보
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'enrolled',  -- enrolled, in_progress, completed, dropped, cancelled
    
    -- 진행률
    progress INTEGER DEFAULT 0,  -- 0-100
    completed_modules INTEGER DEFAULT 0,  -- 완료한 모듈 수
    total_modules INTEGER,  -- 전체 모듈 수
    
    -- 결제
    payment_status VARCHAR(20) DEFAULT 'pending',  -- pending, paid, refunded
    payment_amount DECIMAL(10,2),
    payment_method VARCHAR(50),
    payment_date TIMESTAMP,
    payment_reference VARCHAR(100),  -- 결제 번호
    
    -- 증명서
    certificate_issued BOOLEAN DEFAULT FALSE,
    certificate_url VARCHAR(500),
    certificate_issued_at TIMESTAMP,
    
    -- 평가
    final_score DECIMAL(5,2),  -- 최종 점수
    attendance_rate DECIMAL(5,2),  -- 출석률
    
    -- 시스템
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(user_id, schedule_id)
);

-- 인덱스
CREATE INDEX idx_enrollment_user ON enrollment(user_id);
CREATE INDEX idx_enrollment_schedule ON enrollment(schedule_id);
CREATE INDEX idx_enrollment_status ON enrollment(status);
CREATE INDEX idx_enrollment_payment_status ON enrollment(payment_status);
```

---

### 7. product (제품/교육 키트)

판매하는 교육 키트 제품을 저장합니다.

```sql
CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    
    -- 기본 정보
    category VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    short_description TEXT,
    description TEXT,
    
    -- 교육 가치
    educational_value TEXT,
    classroom_use TEXT,
    
    -- 가격
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    discount_rate INTEGER DEFAULT 0,
    
    -- 대상
    target_grade VARCHAR(50),
    grade_detail VARCHAR(100),
    class_time VARCHAR(50),
    group_size VARCHAR(50),
    
    -- 평가
    rating DECIMAL(3,2) DEFAULT 0.0,
    review_count INTEGER DEFAULT 0,
    sold_count INTEGER DEFAULT 0,
    
    -- 뱃지/특징
    badges TEXT[],
    features TEXT[],
    
    -- 이미지
    main_image VARCHAR(500),
    
    -- 재고
    stock_quantity INTEGER DEFAULT 0,
    is_available BOOLEAN DEFAULT TRUE,
    
    -- SEO
    meta_title VARCHAR(200),
    meta_description TEXT,
    
    -- 상태
    is_featured BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,
    
    -- 시스템
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_product_slug ON product(slug);
CREATE INDEX idx_product_category ON product(category);
CREATE INDEX idx_product_is_available ON product(is_available);
CREATE INDEX idx_product_display_order ON product(display_order);
```

---

### 8. product_image (제품 이미지)

제품의 추가 이미지들을 저장합니다.

```sql
CREATE TABLE product_image (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES product(id) ON DELETE CASCADE,
    
    image_url VARCHAR(500) NOT NULL,
    image_order INTEGER DEFAULT 0,
    alt_text VARCHAR(200),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_product_image_product ON product_image(product_id);
CREATE INDEX idx_product_image_order ON product_image(product_id, image_order);
```

---

### 9. product_component (제품 구성품)

제품 키트에 포함된 구성품을 저장합니다.

```sql
CREATE TABLE product_component (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES product(id) ON DELETE CASCADE,
    
    component_name VARCHAR(200) NOT NULL,
    quantity INTEGER DEFAULT 1,
    specification VARCHAR(500),
    purpose VARCHAR(200),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_product_component_product ON product_component(product_id);
```

---

### 10. product_review (제품 후기)

제품에 대한 사용자 후기를 저장합니다.

```sql
CREATE TABLE product_review (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES product(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES accounts_user(id) ON DELETE SET NULL,
    
    -- 작성자 정보 (익명 가능)
    author_name VARCHAR(100) NOT NULL,
    author_role VARCHAR(100),  -- "초등학교 교사"
    author_school VARCHAR(200),
    
    -- 후기 내용
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    content TEXT NOT NULL,
    
    -- 이미지
    photos TEXT[],
    
    -- 통계
    likes_count INTEGER DEFAULT 0,
    helpful_count INTEGER DEFAULT 0,
    
    -- 시스템
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_product_review_product ON product_review(product_id);
CREATE INDEX idx_product_review_user ON product_review(user_id);
CREATE INDEX idx_product_review_rating ON product_review(product_id, rating);
```

---

### 11. quote (견적 요청)

제품 견적 요청을 저장합니다.

```sql
CREATE TABLE quote (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES accounts_user(id) ON DELETE SET NULL,
    
    -- 요청자 정보
    requester_name VARCHAR(100) NOT NULL,
    requester_phone VARCHAR(20) NOT NULL,
    requester_email VARCHAR(255),
    organization VARCHAR(200),  -- 기관명
    
    -- 견적 정보
    total_amount DECIMAL(10,2) DEFAULT 0,
    message TEXT,
    
    -- 상태
    status VARCHAR(20) DEFAULT 'pending',  -- pending, processing, sent, accepted, rejected, cancelled
    
    -- 관리자 메모
    admin_note TEXT,
    quote_pdf_url VARCHAR(500),  -- 견적서 PDF
    
    -- 시스템
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP  -- 처리 완료 시간
);

-- 인덱스
CREATE INDEX idx_quote_user ON quote(user_id);
CREATE INDEX idx_quote_status ON quote(status);
CREATE INDEX idx_quote_created_at ON quote(created_at DESC);
```

---

### 12. quote_item (견적 항목)

견적에 포함된 개별 제품 항목을 저장합니다.

```sql
CREATE TABLE quote_item (
    id SERIAL PRIMARY KEY,
    quote_id INTEGER NOT NULL REFERENCES quote(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES product(id) ON DELETE SET NULL,
    
    -- 제품 정보 (제품 삭제 시에도 유지)
    product_name VARCHAR(200) NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    subtotal DECIMAL(10,2) NOT NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_quote_item_quote ON quote_item(quote_id);
CREATE INDEX idx_quote_item_product ON quote_item(product_id);
```

---

### 13. video (교육 영상)

교구 사용법 영상을 저장합니다.

```sql
CREATE TABLE video (
    id SERIAL PRIMARY KEY,
    
    -- 영상 정보
    title VARCHAR(200) NOT NULL,
    description TEXT,
    thumbnail_url VARCHAR(500),
    video_url VARCHAR(500) NOT NULL,  -- YouTube embed URL
    video_id VARCHAR(50),  -- YouTube ID
    duration VARCHAR(20),  -- "8:45"
    
    -- 분류
    difficulty VARCHAR(20),  -- elementary, intermediate, advanced
    category VARCHAR(50),
    
    -- 조회수
    view_count INTEGER DEFAULT 0,
    
    -- 상태
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,
    
    -- 시스템
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_video_category ON video(category);
CREATE INDEX idx_video_difficulty ON video(difficulty);
CREATE INDEX idx_video_display_order ON video(display_order);
```

---

### 14. video_step (영상 제작 단계)

영상의 단계별 설명을 저장합니다.

```sql
CREATE TABLE video_step (
    id SERIAL PRIMARY KEY,
    video_id INTEGER NOT NULL REFERENCES video(id) ON DELETE CASCADE,
    
    step_number INTEGER NOT NULL,
    step_title VARCHAR(200) NOT NULL,
    step_description TEXT,
    youtube_timestamp VARCHAR(20),  -- "1m30s"
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(video_id, step_number)
);

-- 인덱스
CREATE INDEX idx_video_step_video ON video_step(video_id);
CREATE INDEX idx_video_step_number ON video_step(video_id, step_number);
```

---

### 15. gallery_work (학생 작품)

학생들이 만든 작품을 관리합니다. (Admin 또는 학생이 등록, Admin 승인 필요)

```sql
CREATE TABLE gallery_work (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES accounts_user(id) ON DELETE SET NULL,
    
    -- 기본 정보
    title VARCHAR(200) NOT NULL,
    summary VARCHAR(500),
    description TEXT,
    category VARCHAR(50),  -- IoT, 앱개발, 로보틱스, AI 등
    
    -- 작성자 정보
    author_name VARCHAR(100),
    author_grade VARCHAR(50),
    
    -- 이미지
    main_image VARCHAR(500),
    
    -- 프로젝트 상세
    project_details TEXT,
    tags TEXT[],
    tech_stack TEXT[],
    tools TEXT[],
    difficulty VARCHAR(20),  -- beginner, intermediate, advanced
    duration VARCHAR(50),  -- "2주", "1개월" 등
    features TEXT[],  -- 주요 기능 목록
    challenges TEXT,  -- 어려웠던 점
    learnings TEXT,  -- 배운 점
    
    -- 통계
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    
    -- 상태
    status VARCHAR(20) DEFAULT 'pending',  -- pending, approved, rejected
    is_featured BOOLEAN DEFAULT FALSE,  -- 추천 작품 여부
    
    -- 시스템
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_gallery_work_user ON gallery_work(user_id);
CREATE INDEX idx_gallery_work_status ON gallery_work(status);
CREATE INDEX idx_gallery_work_category ON gallery_work(category);
CREATE INDEX idx_gallery_work_is_featured ON gallery_work(is_featured);
CREATE INDEX idx_gallery_work_created_at ON gallery_work(created_at DESC);
```

**설명:**
- 학생 작품 전용 테이블
- 프로젝트 상세, 기술 스택, 난이도 등 작품 관련 정보
- Admin 승인 후 공개 (`status = 'approved'`)

---

### 16. gallery_work_image (작품 이미지)

학생 작품의 추가 이미지를 저장합니다.

```sql
CREATE TABLE gallery_work_image (
    id SERIAL PRIMARY KEY,
    gallery_work_id INTEGER NOT NULL REFERENCES gallery_work(id) ON DELETE CASCADE,
    
    image_url VARCHAR(500) NOT NULL,
    image_order INTEGER DEFAULT 0,
    caption VARCHAR(500),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_gallery_work_image ON gallery_work_image(gallery_work_id);
CREATE INDEX idx_gallery_work_image_order ON gallery_work_image(gallery_work_id, image_order);
```

---

### 17. gallery_review (수업 후기 갤러리)

수강생들의 상세한 수업 후기를 관리합니다. (학생이 등록, Admin 승인 필요)

```sql
CREATE TABLE gallery_review (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES accounts_user(id) ON DELETE SET NULL,
    schedule_id INTEGER REFERENCES schedule(id) ON DELETE SET NULL,  -- 수강한 강좌
    
    -- 기본 정보
    title VARCHAR(200) NOT NULL,
    summary VARCHAR(500),
    content TEXT NOT NULL,
    category VARCHAR(50),  -- 강좌 카테고리
    
    -- 작성자 정보
    main_image VARCHAR(500),
    author_name VARCHAR(100),
    student_grade VARCHAR(50),
    
    -- 평가
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    course_type VARCHAR(100),  -- 강좌명
    course_duration VARCHAR(50),  -- 수강 기간
    class_type VARCHAR(50),  -- 소규모반, 출장수업, 온라인 등
    
    -- 만족도 (JSONB)
    satisfaction JSONB,  -- {curriculum: 5, instructor: 5, facility: 4, management: 5}
    would_recommend BOOLEAN,  -- 추천 의향
    target_audience TEXT[],  -- 추천 대상
    achievements TEXT[],  -- 성과/배운 점
    improvements TEXT[],  -- 개선되었으면 하는 부분
    
    -- 통계
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    
    -- 상태
    status VARCHAR(20) DEFAULT 'pending',  -- pending, approved, rejected
    is_featured BOOLEAN DEFAULT FALSE,  -- 추천 후기 여부
    
    -- 시스템
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_gallery_review_user ON gallery_review(user_id);
CREATE INDEX idx_gallery_review_schedule ON gallery_review(schedule_id);
CREATE INDEX idx_gallery_review_status ON gallery_review(status);
CREATE INDEX idx_gallery_review_rating ON gallery_review(rating);
CREATE INDEX idx_gallery_review_is_featured ON gallery_review(is_featured);
CREATE INDEX idx_gallery_review_created_at ON gallery_review(created_at DESC);
```

**설명:**
- 수업 후기 전용 테이블
- `schedule_id`로 수강한 강좌와 연결
- 상세한 만족도 평가 (커리큘럼, 강사, 시설, 운영)
- Admin 승인 후 공개

---

### 18. gallery_review_image (후기 이미지)

수업 후기의 추가 이미지를 저장합니다.

```sql
CREATE TABLE gallery_review_image (
    id SERIAL PRIMARY KEY,
    gallery_review_id INTEGER NOT NULL REFERENCES gallery_review(id) ON DELETE CASCADE,
    
    image_url VARCHAR(500) NOT NULL,
    image_order INTEGER DEFAULT 0,
    caption VARCHAR(500),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_gallery_review_image ON gallery_review_image(gallery_review_id);
CREATE INDEX idx_gallery_review_image_order ON gallery_review_image(gallery_review_id, image_order);
```

---

### 17. inquiry (문의 - 일반/출장 통합)

일반 문의와 출장 강의 문의를 하나의 테이블로 관리합니다.

```sql
CREATE TABLE inquiry (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES accounts_user(id) ON DELETE SET NULL,
    
    -- 문의 타입
    inquiry_type VARCHAR(20) NOT NULL,  -- online (온라인), outreach (출장), general (일반)
    
    -- 기본 정보
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    
    -- 문의자 정보
    requester_name VARCHAR(100) NOT NULL,
    requester_contact VARCHAR(20) NOT NULL,
    requester_email VARCHAR(255),
    requester_position VARCHAR(100),  -- 직책
    
    -- 기관 정보 (출장 문의)
    institution VARCHAR(200),
    institution_type VARCHAR(50),  -- 초등학교, 중학교, 고등학교, 대학교, 기업, 도서관, 복지관 등
    
    -- 강좌 정보
    course VARCHAR(100),
    grade VARCHAR(50),
    participant_count VARCHAR(50),
    target_audience VARCHAR(50),  -- 학생, 교사, 임직원, 학부모 등
    
    -- 일정
    preferred_date DATE,
    preferred_time VARCHAR(50),
    duration VARCHAR(50),
    session_count VARCHAR(50),
    
    -- 장소 (출장)
    location VARCHAR(200),
    address VARCHAR(500),
    transportation TEXT,
    
    -- 예산 및 장비
    budget VARCHAR(100),
    equipment_provided BOOLEAN DEFAULT FALSE,
    equipment_needed TEXT[],
    additional_requests TEXT,
    
    -- 카테고리 (빠른 필터링)
    category VARCHAR(50),
    
    -- 상태
    status VARCHAR(20) DEFAULT 'pending',  -- pending, reviewing, quoted, confirmed, completed, cancelled
    
    -- 관리자 응답
    admin_response TEXT,
    admin_note TEXT,
    
    -- 시스템
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_inquiry_type ON inquiry(inquiry_type);
CREATE INDEX idx_inquiry_user ON inquiry(user_id);
CREATE INDEX idx_inquiry_status ON inquiry(status);
CREATE INDEX idx_inquiry_created_at ON inquiry(created_at DESC);
CREATE INDEX idx_inquiry_category ON inquiry(category);
```

**설명:**
- `inquiry_type`으로 온라인/출장/일반 문의 구분
- 출장 문의 시 `institution`, `location`, `address` 등 추가 정보 입력
- 온라인 문의 시 해당 필드는 NULL

---

### 18. review (수강 후기)

강좌 수강 후기를 저장합니다.

```sql
CREATE TABLE review (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES accounts_user(id) ON DELETE SET NULL,
    schedule_id INTEGER NOT NULL REFERENCES schedule(id) ON DELETE CASCADE,
    enrollment_id INTEGER REFERENCES enrollment(id) ON DELETE SET NULL,
    
    -- 작성자 정보
    student_name VARCHAR(100) NOT NULL,
    
    -- 후기 내용
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    
    -- 시스템
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_review_user ON review(user_id);
CREATE INDEX idx_review_schedule ON review(schedule_id);
CREATE INDEX idx_review_enrollment ON review(enrollment_id);
CREATE INDEX idx_review_created_at ON review(created_at DESC);
```

---

### 19. comment (댓글/질문)

강좌에 대한 질문과 답변을 저장합니다.

```sql
CREATE TABLE comment (
    id SERIAL PRIMARY KEY,
    schedule_id INTEGER NOT NULL REFERENCES schedule(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES accounts_user(id) ON DELETE SET NULL,
    parent_comment_id INTEGER REFERENCES comment(id) ON DELETE CASCADE,  -- 답글
    
    -- 작성자 정보
    user_name VARCHAR(100) NOT NULL,
    user_type VARCHAR(20),  -- student, instructor, admin
    
    -- 댓글 내용
    question TEXT,  -- 질문
    content TEXT,  -- 답변 또는 일반 댓글
    
    -- 통계
    likes_count INTEGER DEFAULT 0,
    
    -- 시스템
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_comment_schedule ON comment(schedule_id);
CREATE INDEX idx_comment_user ON comment(user_id);
CREATE INDEX idx_comment_parent ON comment(parent_comment_id);
CREATE INDEX idx_comment_created_at ON comment(created_at DESC);
```

---

### 20. home_content (홈 콘텐츠)

홈페이지의 동적 콘텐츠를 저장합니다.

```sql
CREATE TABLE home_content (
    id SERIAL PRIMARY KEY,
    content_key VARCHAR(50) UNIQUE NOT NULL,  -- 'hero_slides', 'features', 'metrics' 등
    
    content_data JSONB NOT NULL,
    
    -- 시스템
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_home_content_key ON home_content(content_key);
```

**JSONB 예시:**

```json
// hero_slides
{
  "slides": [
    {
      "img": "/home/images/raspberry-pi-computer-iot.jpg",
      "title": "라즈베리파이 IoT",
      "description": "임베디드와 IoT로 만드는 실전 프로젝트",
      "ctaLabel": "과정 보기",
      "ctaHref": "/curriculum/raspberry-pi"
    }
  ],
  "autoplay": true,
  "intervalMs": 4000
}
```

---

### 21. about_content (소개 콘텐츠)

회사 소개 페이지의 콘텐츠를 저장합니다.

```sql
CREATE TABLE about_content (
    id SERIAL PRIMARY KEY,
    content_key VARCHAR(50) UNIQUE NOT NULL,  -- 'philosophy', 'methodology', 'history' 등
    
    content_data JSONB NOT NULL,
    
    -- 시스템
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_about_content_key ON about_content(content_key);
```

---

### 22. policy (정책 문서)

이용약관, 개인정보처리방침 등을 저장합니다.

```sql
CREATE TABLE policy (
    id SERIAL PRIMARY KEY,
    policy_type VARCHAR(50) UNIQUE NOT NULL,  -- 'terms', 'privacy', 'email-policy'
    
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    version VARCHAR(20) DEFAULT '1.0',
    
    -- 상태
    is_active BOOLEAN DEFAULT TRUE,
    effective_date DATE NOT NULL,
    
    -- 시스템
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_policy_type ON policy(policy_type);
CREATE INDEX idx_policy_is_active ON policy(is_active);
```

---

## 🔗 REST API 엔드포인트 설계

### Base URL

```
# 개발 환경
http://localhost:8000/api/v1

# 프로덕션 환경
https://api.aimakerlab.com/api/v1
```

### 공통 응답 형식

#### 성공 응답

```json
{
  "success": true,
  "data": { ... },
  "message": "성공 메시지",
  "timestamp": "2026-01-08T10:30:00Z"
}
```

#### 에러 응답

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "에러 메시지",
    "details": { ... }
  },
  "timestamp": "2026-01-08T10:30:00Z"
}
```

#### 페이지네이션 응답

```json
{
  "success": true,
  "data": {
    "items": [ ... ],
    "pagination": {
      "total": 150,
      "page": 1,
      "page_size": 20,
      "total_pages": 8,
      "has_next": true,
      "has_prev": false
    }
  }
}
```

---

## 📝 API 엔드포인트 목록

### 1. 인증 (Authentication)

#### 1.1 회원가입

```
POST /api/v1/auth/register
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "password_confirm": "SecurePass123!",
  "name": "홍길동",
  "phone": "010-1234-5678",
  "birth_date": "2005-05-15",
  "grade": "중2"
}
```

**Response: 201 Created**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": 123,
      "email": "user@example.com",
      "name": "홍길동",
      "phone": "010-1234-5678",
      "role": "student",
      "is_verified": false
    },
    "tokens": {
      "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  },
  "message": "회원가입이 완료되었습니다. 이메일 인증을 진행해주세요."
}
```

---

#### 1.2 로그인

```
POST /api/v1/auth/login
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response: 200 OK**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": 123,
      "email": "user@example.com",
      "name": "홍길동",
      "role": "student",
      "is_verified": true
    },
    "tokens": {
      "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  },
  "message": "로그인 성공"
}
```

---

#### 1.3 로그아웃

```
POST /api/v1/auth/logout
Authorization: Bearer {access_token}
```

**Response: 200 OK**

```json
{
  "success": true,
  "message": "로그아웃되었습니다."
}
```

---

#### 1.4 토큰 갱신

```
POST /api/v1/auth/refresh
```

**Request Body:**

```json
{
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response: 200 OK**

```json
{
  "success": true,
  "data": {
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

#### 1.5 이메일 인증 요청

```
POST /api/v1/auth/verify-email/request
Authorization: Bearer {access_token}
```

**Response: 200 OK**

```json
{
  "success": true,
  "message": "인증 이메일이 발송되었습니다."
}
```

---

#### 1.6 이메일 인증 확인

```
POST /api/v1/auth/verify-email/confirm
```

**Request Body:**

```json
{
  "token": "abc123xyz789"
}
```

**Response: 200 OK**

```json
{
  "success": true,
  "message": "이메일 인증이 완료되었습니다."
}
```

---

#### 1.7 비밀번호 재설정 요청

```
POST /api/v1/auth/password-reset/request
```

**Request Body:**

```json
{
  "email": "user@example.com"
}
```

**Response: 200 OK**

```json
{
  "success": true,
  "message": "비밀번호 재설정 이메일이 발송되었습니다."
}
```

---

#### 1.8 비밀번호 재설정

```
POST /api/v1/auth/password-reset/confirm
```

**Request Body:**

```json
{
  "token": "reset_token_here",
  "password": "NewSecurePass123!",
  "password_confirm": "NewSecurePass123!"
}
```

**Response: 200 OK**

```json
{
  "success": true,
  "message": "비밀번호가 재설정되었습니다."
}
```

---

### 2. 사용자 프로필

#### 2.1 프로필 조회

```
GET /api/v1/users/profile
Authorization: Bearer {access_token}
```

**Response: 200 OK**

```json
{
  "success": true,
  "data": {
    "id": 123,
    "email": "user@example.com",
    "name": "홍길동",
    "phone": "010-1234-5678",
    "profile_image": "/media/profiles/user123.jpg",
    "birth_date": "2005-05-15",
    "grade": "중2",
    "school_name": "서울중학교",
    "address": "서울시 강남구",
    "created_at": "2025-01-01T00:00:00Z"
  }
}
```

---

#### 2.2 프로필 수정

```
PUT /api/v1/users/profile
Authorization: Bearer {access_token}
```

**Request Body (multipart/form-data):**

```
name: 홍길동
phone: 010-1234-5678
birth_date: 2005-05-15
grade: 중3
school_name: 서울중학교
address: 서울시 강남구
profile_image: (파일)
```

**Response: 200 OK**

```json
{
  "success": true,
  "data": {
    "id": 123,
    "email": "user@example.com",
    "name": "홍길동",
    "profile_image": "/media/profiles/user123.jpg",
    ...
  },
  "message": "프로필이 수정되었습니다."
}
```

---

### 3. 커리큘럼 (Curriculum)

#### 3.1 커리큘럼 목록 조회

```
GET /api/v1/curriculum
```

**Query Parameters:**
- `category` (optional): 카테고리 필터 (ai-coding, arduino, raspberry-pi 등)
- `difficulty` (optional): 난이도 (elementary, intermediate, advanced)
- `is_featured` (optional): 추천 과정 여부 (true/false)
- `page` (optional): 페이지 번호 (기본값: 1)
- `page_size` (optional): 페이지 크기 (기본값: 20)

**Response: 200 OK**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "slug": "ai-coding",
        "category": "ai-coding",
        "title": "AI 심화 제작 코딩",
        "subtitle": "기획부터 실행까지",
        "description": "IoT 제작과 AI 서비스 개발을 통한 실전 프로젝트",
        "badge": "AI 융합 과정",
        "duration": "3개월 (12주)",
        "capacity": "4-6명 소규모 수업",
        "total_hours": "48시간",
        "target_grade": "중학생 이상",
        "difficulty": "advanced",
        "thumbnail_image": "/curriculum/ai-coding-thumb.jpg",
        "is_featured": true,
        "created_at": "2025-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "total": 6,
      "page": 1,
      "page_size": 20,
      "total_pages": 1,
      "has_next": false,
      "has_prev": false
    }
  }
}
```

---

#### 3.2 커리큘럼 상세 조회

```
GET /api/v1/curriculum/{slug}
```

**Response: 200 OK**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "slug": "ai-coding",
    "category": "ai-coding",
    "title": "AI 심화 제작 코딩",
    "subtitle": "기획부터 실행까지",
    "description": "IoT 제작과 AI 서비스 개발을 통한 실전 프로젝트",
    "badge": "AI 융합 과정",
    "duration": "3개월 (12주)",
    "capacity": "4-6명 소규모 수업",
    "total_hours": "48시간",
    "target_grade": "중학생 이상",
    "difficulty": "advanced",
    "requirements": ["개인 노트북", "Python 기초"],
    "learning_goals": [
      {
        "id": "planning",
        "category": "기획 능력",
        "title": "문제 발견 및 정의",
        "description": "실생활의 문제를 발견하고 AI로 해결할 수 있는 방법을 기획합니다",
        "skills": ["문제 분석 및 정의", "요구사항 도출"]
      }
    ],
    "achievements": ["실전 프로젝트로 포트폴리오 완성"],
    "modules": [
      {
        "id": 10,
        "module_order": 1,
        "title": "문제 발견 및 기획",
        "duration": "6시간",
        "description": "전문적인 문제 분석 및 기획",
        "topics": ["문제 발견", "시장 조사", "기획서"]
      }
    ],
    "created_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### 4. 스케줄/강좌 (Schedule)

#### 4.1 강좌 목록 조회

```
GET /api/v1/schedules
```

**Query Parameters:**
- `curriculum_id` (optional): 커리큘럼 ID
- `instructor_id` (optional): 강사 ID
- `status` (optional): 강좌 상태 (upcoming, ongoing, completed)
- `level` (optional): 난이도
- `month` (optional): 월 필터 (2025-03)
- `page`, `page_size`

**Response: 200 OK**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "curriculum": {
          "id": 1,
          "slug": "app-inventor",
          "title": "앱 인벤터 코딩"
        },
        "instructor": {
          "id": 1,
          "name": "김지훈",
          "title": "앱 개발 전문 강사",
          "profile_image": "/instructors/kim.jpg"
        },
        "title": "앱 인벤터 초급 코딩 주중반",
        "start_date": "2025-03-03",
        "end_date": "2025-04-28",
        "schedule_time": "화/목 19:00 - 21:00",
        "capacity": 12,
        "enrolled_count": 8,
        "level": "elementary",
        "duration": "8주 과정 (16회)",
        "location": "AI Maker Lab 본관",
        "price": 480000,
        "original_price": 550000,
        "discount_rate": 13,
        "rating": 4.8,
        "review_count": 24,
        "status": "upcoming",
        "is_featured": false
      }
    ],
    "pagination": { ... }
  }
}
```

---

#### 4.2 강좌 상세 조회

```
GET /api/v1/schedules/{id}
```

**Response: 200 OK**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "curriculum": { ... },
    "instructor": {
      "id": 1,
      "name": "김지훈",
      "title": "앱 개발 전문 강사",
      "experience": "8년차",
      "specialization": "앱 인벤터, 모바일 앱 개발",
      "education": "KAIST 컴퓨터공학 석사",
      "introduction": "구글 앱 인벤터 마스터 트레이너로...",
      "profile_image": "/instructors/kim.jpg"
    },
    "title": "앱 인벤터 초급 코딩 주중반",
    "description": "앱 인벤터를 처음 접하는 학생들을 위한 기초 과정입니다...",
    "start_date": "2025-03-03",
    "end_date": "2025-04-28",
    "schedule_time": "화/목 19:00 - 21:00",
    "capacity": 12,
    "enrolled_count": 8,
    "level": "elementary",
    "duration": "8주 과정 (16회)",
    "location": "AI Maker Lab 본관",
    "location_detail": "서울시 강남구 테헤란로 123",
    "price": 480000,
    "original_price": 550000,
    "rating": 4.8,
    "review_count": 24,
    "video_id": "X4cGXFJnAeY",
    "learning_objectives": ["블록 코딩을 통한 프로그래밍 기초 개념 이해"],
    "expected_outcomes": ["실제로 작동하는 안드로이드 앱 5개 이상 제작"],
    "curriculum_detail": [
      {
        "week": "1주차",
        "title": "앱 인벤터 시작하기",
        "topics": ["앱 인벤터 개발 환경 설정"],
        "duration": "2시간 × 2회"
      }
    ],
    "requirements": ["노트북 지참"],
    "faqs": [
      {
        "question": "프로그래밍을 전혀 모르는데 수강할 수 있나요?",
        "answer": "네, 가능합니다..."
      }
    ],
    "reviews": [
      {
        "id": 1,
        "student_name": "김민준",
        "rating": 5,
        "comment": "처음 프로그래밍을 배우는데...",
        "created_at": "2025-02-15T00:00:00Z"
      }
    ],
    "comments": [
      {
        "id": 1,
        "user_name": "송민지",
        "user_type": "student",
        "question": "프로그래밍을 전혀 해본 적이 없는데...",
        "likes_count": 12,
        "answer": {
          "user_name": "김지훈 강사",
          "user_type": "instructor",
          "content": "네, 전혀 걱정하지 않으셔도 됩니다!",
          "created_at": "2025-02-20T10:30:00Z"
        },
        "created_at": "2025-02-20T09:15:00Z"
      }
    ],
    "status": "upcoming",
    "created_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### 5. 수강 신청 (Enrollment)

#### 5.1 수강 신청

```
POST /api/v1/enrollments
Authorization: Bearer {access_token}
```

**Request Body:**

```json
{
  "schedule_id": 1,
  "payment_method": "card",
  "payment_reference": "PAY202601080001"
}
```

**Response: 201 Created**

```json
{
  "success": true,
  "data": {
    "id": 50,
    "user_id": 123,
    "schedule_id": 1,
    "status": "enrolled",
    "progress": 0,
    "payment_status": "paid",
    "payment_amount": 480000,
    "enrolled_at": "2026-01-08T10:30:00Z"
  },
  "message": "수강 신청이 완료되었습니다."
}
```

---

#### 5.2 내 수강 목록 조회

```
GET /api/v1/users/enrollments
Authorization: Bearer {access_token}
```

**Query Parameters:**
- `status` (optional): enrolled, in_progress, completed, dropped

**Response: 200 OK**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 50,
        "schedule": {
          "id": 1,
          "title": "앱 인벤터 초급 코딩 주중반",
          "curriculum": {
            "title": "앱 인벤터 코딩"
          },
          "instructor": {
            "name": "김지훈"
          },
          "start_date": "2025-03-03",
          "end_date": "2025-04-28"
        },
        "status": "in_progress",
        "progress": 65,
        "completed_modules": 6,
        "total_modules": 8,
        "enrolled_at": "2026-01-08T10:30:00Z"
      }
    ]
  }
}
```

---

### 6. 제품 (Product)

#### 6.1 제품 목록 조회

```
GET /api/v1/products
```

**Query Parameters:**
- `category` (optional): 카테고리
- `target_grade` (optional): 대상 학년
- `min_price`, `max_price` (optional): 가격 범위
- `search` (optional): 검색어
- `sort` (optional): price_asc, price_desc, popular, recent

**Response: 200 OK**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "slug": "smart-farm-kit",
        "category": "아두이노",
        "title": "스마트팜 만들기 키트 (아두이노)",
        "short_description": "IoT와 농업을 결합한 미래형 교육 키트",
        "main_image": "/products/smart-farm.jpg",
        "price": 57200,
        "original_price": 68000,
        "discount_rate": 16,
        "target_grade": "초등학생",
        "grade_detail": "4-6학년",
        "rating": 4.9,
        "review_count": 203,
        "sold_count": 1247,
        "badges": ["Arduino", "IoT"],
        "features": ["실습 중심", "STEAM 교육"],
        "is_available": true
      }
    ],
    "pagination": { ... }
  }
}
```

---

#### 6.2 제품 상세 조회

```
GET /api/v1/products/{slug}
```

**Response: 200 OK**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "slug": "smart-farm-kit",
    "category": "아두이노",
    "title": "스마트팜 만들기 키트 (아두이노)",
    "short_description": "IoT와 농업을 결합한 미래형 교육 키트",
    "description": "센서 활용, 데이터 수집, 자동화 시스템 구현을 통해...",
    "educational_value": "센서 활용, 데이터 수집...",
    "classroom_use": "실생활 문제 해결 프로젝트...",
    "main_image": "/products/smart-farm.jpg",
    "images": [
      {
        "id": 1,
        "image_url": "/products/smart-farm-1.jpg",
        "alt_text": "스마트팜 키트 전체 구성"
      }
    ],
    "price": 57200,
    "original_price": 68000,
    "discount_rate": 16,
    "target_grade": "초등학생",
    "grade_detail": "4-6학년",
    "class_time": "3차시",
    "group_size": "2-4명",
    "rating": 4.9,
    "review_count": 203,
    "sold_count": 1247,
    "stock_quantity": 50,
    "badges": ["Arduino", "IoT"],
    "features": ["실습 중심", "STEAM 교육"],
    "components": [
      {
        "id": 1,
        "component_name": "아두이노 UNO 호환보드",
        "quantity": 1,
        "specification": "ATmega328P, 16MHz",
        "purpose": "메인 컨트롤러"
      }
    ],
    "reviews": [
      {
        "id": 1,
        "author_name": "김선생",
        "author_role": "초등학교 교사",
        "author_school": "서울 OO초등학교",
        "rating": 5,
        "content": "6학년 실과 수업에 활용했습니다...",
        "photos": ["/products/classroom-photos/smart-farm-1.jpg"],
        "likes_count": 24,
        "created_at": "2024-11-15T00:00:00Z"
      }
    ],
    "is_available": true,
    "created_at": "2025-01-01T00:00:00Z"
  }
}
```

---

#### 6.3 제품 후기 등록

```
POST /api/v1/products/{product_id}/reviews
Authorization: Bearer {access_token}
```

**Request Body (multipart/form-data):**

```
author_name: 김선생
author_role: 초등학교 교사
author_school: 서울 OO초등학교
rating: 5
content: 6학년 실과 수업에 활용했습니다...
photos[]: (파일)
photos[]: (파일)
```

**Response: 201 Created**

```json
{
  "success": true,
  "data": {
    "id": 100,
    "product_id": 1,
    "author_name": "김선생",
    "rating": 5,
    "content": "6학년 실과 수업에 활용했습니다...",
    "photos": ["/products/reviews/photo1.jpg"],
    "created_at": "2026-01-08T10:30:00Z"
  },
  "message": "후기가 등록되었습니다."
}
```

---

### 7. 견적 요청 (Quote)

#### 7.1 견적 요청

```
POST /api/v1/quotes
```

**Request Body:**

```json
{
  "requester_name": "김선생",
  "requester_phone": "010-1234-5678",
  "requester_email": "teacher@school.kr",
  "organization": "서울 강남초등학교",
  "message": "3학년 수업용으로 30세트 구매 희망합니다.",
  "items": [
    {
      "product_id": 1,
      "quantity": 30
    },
    {
      "product_id": 2,
      "quantity": 30
    }
  ]
}
```

**Response: 201 Created**

```json
{
  "success": true,
  "data": {
    "id": 50,
    "requester_name": "김선생",
    "requester_phone": "010-1234-5678",
    "organization": "서울 강남초등학교",
    "total_amount": 1716000,
    "items": [
      {
        "id": 100,
        "product_name": "스마트팜 만들기 키트",
        "unit_price": 57200,
        "quantity": 30,
        "subtotal": 1716000
      }
    ],
    "status": "pending",
    "created_at": "2026-01-08T10:30:00Z"
  },
  "message": "견적 요청이 접수되었습니다. 영업일 기준 1-2일 내에 연락드리겠습니다."
}
```

---

#### 7.2 견적 목록 조회 (관리자)

```
GET /api/v1/admin/quotes
Authorization: Bearer {admin_access_token}
```

**Query Parameters:**
- `status` (optional): pending, processing, sent, accepted, rejected
- `page`, `page_size`

**Response: 200 OK**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 50,
        "requester_name": "김선생",
        "organization": "서울 강남초등학교",
        "total_amount": 1716000,
        "status": "pending",
        "created_at": "2026-01-08T10:30:00Z"
      }
    ],
    "pagination": { ... }
  }
}
```

---

### 8. 갤러리 (Gallery) - 작품/후기 분리

#### 8.1 학생 작품 목록 조회

```
GET /api/v1/gallery/works
```

**Query Parameters:**
- `category` (optional): IoT, 앱개발, 로보틱스, AI 등
- `difficulty` (optional): beginner, intermediate, advanced
- `is_featured` (optional): true, false
- `status` (optional): approved만 공개 (관리자는 pending 포함)
- `page`, `page_size`

**Response: 200 OK**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "title": "스마트 홈 IoT 시스템",
        "summary": "라즈베리파이로 만든 음성 인식 스마트 홈 제어 시스템",
        "category": "IoT",
        "main_image": "/gallery/smart-home.jpg",
        "author_name": "김민준",
        "author_grade": "고1",
        "tags": ["라즈베리파이", "IoT", "음성인식"],
        "tech_stack": ["Python", "Raspberry Pi", "Google Assistant API"],
        "difficulty": "intermediate",
        "duration": "3개월",
        "view_count": 234,
        "like_count": 45,
        "is_featured": true,
        "created_at": "2025-02-15T00:00:00Z"
      }
    ],
    "pagination": { ... }
  }
}
```

---

#### 8.2 학생 작품 상세 조회

```
GET /api/v1/gallery/works/{id}
```

**Response: 200 OK**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "스마트 홈 IoT 시스템",
    "summary": "라즈베리파이로 만든 음성 인식 스마트 홈 제어 시스템",
    "description": "라즈베리파이와 다양한 센서를 활용하여...",
    "category": "IoT",
    "main_image": "/gallery/smart-home.jpg",
    "images": [
      {
        "id": 1,
        "image_url": "/gallery/smart-home-1.jpg",
        "caption": "전체 시스템 구성"
      }
    ],
    "author_name": "김민준",
    "author_grade": "고1",
    "project_details": "라즈베리파이와 다양한 센서를 활용하여 음성으로...",
    "tags": ["라즈베리파이", "IoT", "음성인식", "스마트홈"],
    "tech_stack": ["Python", "Raspberry Pi", "Google Assistant API", "MQTT"],
    "tools": ["Raspbian OS", "VS Code", "Home Assistant"],
    "difficulty": "intermediate",
    "duration": "3개월",
    "features": [
      "음성 명령으로 조명/온도/습도 제어",
      "모바일 앱 원격 제어"
    ],
    "challenges": "여러 센서를 동시에 제어하고 음성 인식의 정확도를 높이는 것이 어려웠습니다.",
    "learnings": "IoT 통신 프로토콜(MQTT)과 API 연동 방법을 배웠고...",
    "view_count": 234,
    "like_count": 45,
    "status": "approved",
    "is_featured": true,
    "created_at": "2025-02-15T00:00:00Z"
  }
}
```

---

#### 8.3 학생 작품 등록

```
POST /api/v1/gallery/works
Authorization: Bearer {access_token}
```

**Request Body (multipart/form-data):**

```
title: 스마트 홈 IoT 시스템
summary: 라즈베리파이로 만든 음성 인식 스마트 홈 제어 시스템
description: 라즈베리파이와 다양한 센서를 활용하여...
category: IoT
main_image: (파일)
images[]: (파일)
images[]: (파일)
tags[]: 라즈베리파이
tags[]: IoT
tech_stack[]: Python
tech_stack[]: Raspberry Pi
difficulty: intermediate
duration: 3개월
features[]: 음성 명령으로 조명 제어
challenges: 여러 센서를 동시에 제어하고...
learnings: IoT 통신 프로토콜을 배웠고...
```

**Response: 201 Created**

```json
{
  "success": true,
  "data": {
    "id": 100,
    "title": "스마트 홈 IoT 시스템",
    "status": "pending",
    "created_at": "2026-01-08T10:30:00Z"
  },
  "message": "작품이 등록되었습니다. 관리자 승인 후 공개됩니다."
}
```

---

#### 8.4 학생 작품 수정

```
PUT /api/v1/gallery/works/{id}
Authorization: Bearer {access_token}
```

**권한**: 작성자 본인만 가능 (status=pending인 경우에만)

**Request Body**: 8.3과 동일

**Response**: 200 OK

---

#### 8.5 학생 작품 삭제

```
DELETE /api/v1/gallery/works/{id}
Authorization: Bearer {access_token}
```

**권한**: 작성자 본인만 가능

**Response**: 200 OK

---

#### 8.6 학생 작품 좋아요

```
POST /api/v1/gallery/works/{id}/like
Authorization: Bearer {access_token}
```

**Response**: 200 OK (like_count 증가)

---

#### 8.7 수업 후기 목록 조회

```
GET /api/v1/gallery/reviews
```

**Query Parameters:**
- `schedule_id` (optional): 특정 강좌의 후기만 조회
- `rating` (optional): 1-5
- `is_featured` (optional): true, false
- `page`, `page_size`

**Response: 200 OK**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "title": "3개월 동안 로봇코딩을 배우며",
        "summary": "처음에는 어려웠지만 선생님께서 친절하게 가르쳐주셔서...",
        "category": "로보틱스",
        "main_image": "/gallery/review-1.jpg",
        "author_name": "박지민",
        "student_grade": "중1",
        "rating": 5,
        "course_type": "로봇코딩 정규반",
        "would_recommend": true,
        "view_count": 123,
        "like_count": 34,
        "is_featured": true,
        "created_at": "2025-03-10T00:00:00Z"
      }
    ],
    "pagination": { ... }
  }
}
```

---

#### 8.8 수업 후기 상세 조회

```
GET /api/v1/gallery/reviews/{id}
```

**Response: 200 OK**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "3개월 동안 로봇코딩을 배우며",
    "summary": "처음에는 어려웠지만 선생님께서 친절하게 가르쳐주셔서...",
    "content": "3개월 동안 로봇코딩 정규반을 수강하면서 많은 것을 배웠습니다...",
    "category": "로보틱스",
    "main_image": "/gallery/review-1.jpg",
    "images": [
      {
        "id": 1,
        "image_url": "/gallery/review-1-1.jpg",
        "caption": "수업 중 모습"
      }
    ],
    "author_name": "박지민",
    "student_grade": "중1",
    "rating": 5,
    "course_type": "로봇코딩 정규반",
    "course_duration": "3개월",
    "class_type": "소규모반",
    "satisfaction": {
      "curriculum": 5,
      "instructor": 5,
      "facility": 4,
      "management": 5
    },
    "would_recommend": true,
    "target_audience": ["중학생", "코딩 입문자"],
    "achievements": [
      "자율주행 로봇 제작",
      "센서 활용 프로젝트 완성",
      "팀 프로젝트 발표"
    ],
    "improvements": [],
    "schedule": {
      "id": 10,
      "title": "로봇코딩 정규반"
    },
    "view_count": 123,
    "like_count": 34,
    "is_featured": true,
    "created_at": "2025-03-10T00:00:00Z"
  }
}
```

---

#### 8.9 수업 후기 등록

```
POST /api/v1/gallery/reviews
Authorization: Bearer {access_token}
```

**권한**: 해당 강좌를 수강한 학생만 가능

**Request Body (multipart/form-data):**

```
schedule_id: 10
title: 3개월 동안 로봇코딩을 배우며
summary: 처음에는 어려웠지만 선생님께서 친절하게...
content: 3개월 동안 로봇코딩 정규반을 수강하면서...
category: 로보틱스
main_image: (파일)
images[]: (파일)
rating: 5
course_type: 로봇코딩 정규반
course_duration: 3개월
class_type: 소규모반
satisfaction[curriculum]: 5
satisfaction[instructor]: 5
satisfaction[facility]: 4
satisfaction[management]: 5
would_recommend: true
target_audience[]: 중학생
target_audience[]: 코딩 입문자
achievements[]: 자율주행 로봇 제작
```

**Response: 201 Created**

```json
{
  "success": true,
  "data": {
    "id": 50,
    "title": "3개월 동안 로봇코딩을 배우며",
    "status": "pending",
    "created_at": "2026-01-08T10:30:00Z"
  },
  "message": "후기가 등록되었습니다. 관리자 승인 후 공개됩니다."
}
```

---

#### 8.10 수업 후기 수정

```
PUT /api/v1/gallery/reviews/{id}
Authorization: Bearer {access_token}
```

**권한**: 작성자 본인만 가능

---

#### 8.11 수업 후기 삭제

```
DELETE /api/v1/gallery/reviews/{id}
Authorization: Bearer {access_token}
```

**권한**: 작성자 본인만 가능

---

#### 8.12 수업 후기 좋아요

```
POST /api/v1/gallery/reviews/{id}/like
Authorization: Bearer {access_token}
```

---

#### 8.13 관리자 - 작품 목록 조회 (승인 대기 포함)

```
GET /api/v1/admin/gallery/works
Authorization: Bearer {admin_access_token}
```

**Query Parameters:**
- `status` (optional): pending, approved, rejected
- `page`, `page_size`

---

#### 8.14 관리자 - 작품 승인/거절

```
PUT /api/v1/admin/gallery/works/{id}
Authorization: Bearer {admin_access_token}
```

**Request Body:**

```json
{
  "status": "approved",
  "is_featured": true
}
```

---

#### 8.15 관리자 - 작품 직접 등록

```
POST /api/v1/admin/gallery/works
Authorization: Bearer {admin_access_token}
```

**Note**: 관리자가 직접 등록하는 경우 승인 없이 바로 공개 (`status = 'approved'`)

---

#### 8.16 관리자 - 후기 목록 조회

```
GET /api/v1/admin/gallery/reviews
Authorization: Bearer {admin_access_token}
```

---

#### 8.17 관리자 - 후기 승인/거절

```
PUT /api/v1/admin/gallery/reviews/{id}
Authorization: Bearer {admin_access_token}
```

---

#### 8.18 관리자 - 후기 직접 등록

```
POST /api/v1/admin/gallery/reviews
Authorization: Bearer {admin_access_token}
```

**Note**: 관리자가 직접 등록하는 경우 승인 없이 바로 공개

---

### 9. 문의 (Inquiry)

#### 9.1 문의 등록

```
POST /api/v1/inquiries
```

**Request Body:**

```json
{
  "inquiry_type": "outreach",
  "title": "서울 강남초등학교 AI 교육 출강 요청",
  "content": "3-4학년 학생들을 대상으로 블록코딩 교육을 진행하고자 합니다...",
  "requester_name": "김선생",
  "requester_contact": "010-1234-5678",
  "requester_email": "teacher@school.kr",
  "requester_position": "방과후 담당 교사",
  "institution": "강남초등학교",
  "institution_type": "초등학교",
  "course": "블록코딩 (엔트리/스크래치)",
  "grade": "초등 3-4학년",
  "participant_count": "21-30명",
  "target_audience": "학생",
  "location": "서울시 강남구",
  "address": "서울시 강남구 테헤란로 123",
  "preferred_date": "2025-02-15",
  "preferred_time": "14:00-16:00",
  "duration": "2시간",
  "session_count": "4회",
  "budget": "200만원",
  "equipment_provided": true,
  "equipment_needed": ["노트북 30대", "프로젝터"],
  "additional_requests": "학생들이 처음 접하는 코딩 교육이므로 쉽고 재미있게...",
  "category": "초등학교"
}
```

**Response: 201 Created**

```json
{
  "success": true,
  "data": {
    "id": 50,
    "inquiry_type": "outreach",
    "title": "서울 강남초등학교 AI 교육 출강 요청",
    "requester_name": "김선생",
    "status": "pending",
    "created_at": "2026-01-08T10:30:00Z"
  },
  "message": "문의가 접수되었습니다. 빠른 시일 내에 답변드리겠습니다."
}
```

---

#### 9.2 문의 목록 조회 (내 문의)

```
GET /api/v1/users/inquiries
Authorization: Bearer {access_token}
```

**Response: 200 OK**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 50,
        "inquiry_type": "outreach",
        "title": "서울 강남초등학교 AI 교육 출강 요청",
        "status": "processing",
        "created_at": "2026-01-08T10:30:00Z",
        "processed_at": null
      }
    ]
  }
}
```

---

### 10. 영상 (Video)

#### 10.1 영상 목록 조회

```
GET /api/v1/videos
```

**Query Parameters:**
- `category` (optional): 카테고리
- `difficulty` (optional): elementary, intermediate, advanced
- `page`, `page_size`

**Response: 200 OK**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "title": "스마트 팜 키트 제작하기",
        "description": "토양 습도 센서와 자동 급수 시스템을 활용한...",
        "thumbnail_url": "/videos/smart-farm-thumb.jpg",
        "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "video_id": "dQw4w9WgXcQ",
        "duration": "8:45",
        "difficulty": "intermediate",
        "category": "아두이노",
        "view_count": 1250,
        "created_at": "2025-01-01T00:00:00Z"
      }
    ],
    "pagination": { ... }
  }
}
```

---

#### 10.2 영상 상세 조회

```
GET /api/v1/videos/{id}
```

**Response: 200 OK**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "스마트 팜 키트 제작하기",
    "description": "토양 습도 센서와 자동 급수 시스템을 활용한 스마트 팜을 만들어봅니다...",
    "thumbnail_url": "/videos/smart-farm-thumb.jpg",
    "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "video_id": "dQw4w9WgXcQ",
    "duration": "8:45",
    "difficulty": "intermediate",
    "category": "아두이노",
    "view_count": 1250,
    "steps": [
      {
        "id": 1,
        "step_number": 1,
        "step_title": "부품 준비 및 확인",
        "step_description": "아두이노 보드, 토양 습도 센서, 워터 펌프...",
        "youtube_timestamp": "0m15s"
      }
    ],
    "created_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### 11. 홈 콘텐츠 (Home Content)

#### 11.1 홈 콘텐츠 조회

```
GET /api/v1/home
```

**Response: 200 OK**

```json
{
  "success": true,
  "data": {
    "hero": {
      "slides": [
        {
          "img": "/home/images/raspberry-pi-computer-iot.jpg",
          "title": "라즈베리파이 IoT",
          "description": "임베디드와 IoT로 만드는 실전 프로젝트",
          "ctaLabel": "과정 보기",
          "ctaHref": "/curriculum/raspberry-pi"
        }
      ],
      "carousel": {
        "autoplay": true,
        "intervalMs": 4000
      }
    },
    "features": {
      "heading": "왜 AI Maker Lab인가요?",
      "subheading": "체계적인 커리큘럼과 실습 중심 교육으로 실력을 키웁니다",
      "items": [
        {
          "icon": "BookOpen",
          "title": "체계적인 커리큘럼",
          "desc": "기초부터 심화까지 단계별로 설계된 교육 과정"
        }
      ]
    },
    "outreach": {
      "heading": "AI Maker Lab의 찾아가는 코딩 수업!",
      "metrics": [
        {
          "icon": "GraduationCap",
          "value": "2,959개교",
          "caption": "AIMaker Lab 수업한 학교 수"
        }
      ]
    }
  }
}
```

---

### 12. 소개 콘텐츠 (About Content)

#### 12.1 소개 콘텐츠 조회

```
GET /api/v1/about
```

**Response: 200 OK**

```json
{
  "success": true,
  "data": {
    "hero": {
      "title": "AI Maker Lab",
      "subtitle": "AI 시대를 주도하는 창의적 기업가 양성소",
      "descriptions": [
        "2019년 설립한 AI Maker Lab은 AI 리터러시를 기반으로..."
      ]
    },
    "philosophy": {
      "heading": "우리의 교육 철학",
      "items": [
        {
          "id": "creative",
          "topLabelEn": "AI LITERACY",
          "topLabelKo": "AI 리터러시",
          "title": "AI 리터러시와 구조적 이해",
          "description": "AI 시대에 필수적인 능력(AI 리터러시)을...",
          "color": "blue"
        }
      ]
    },
    "history": {
      "heading": "만랩 HISTORY",
      "items": [
        {
          "year": 2025,
          "bullets": [
            "한국 로봇 SW교육 사업 교육제품 납품 협약"
          ]
        }
      ]
    }
  }
}
```

---

### 13. 정책 문서 (Policy)

#### 13.1 정책 문서 조회

```
GET /api/v1/policies/{policy_type}
```

**Path Parameters:**
- `policy_type`: terms, privacy, email-policy

**Response: 200 OK**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "policy_type": "privacy",
    "title": "개인정보 처리방침",
    "content": "제1조 (개인정보의 처리 목적)...",
    "version": "1.0",
    "effective_date": "2025-01-01",
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-01T00:00:00Z"
  }
}
```

---

## 🔒 인증 (Authentication)

### JWT 토큰 방식

#### Access Token
- **유효 기간**: 1시간
- **용도**: API 요청 시 사용
- **Header**: `Authorization: Bearer {access_token}`

#### Refresh Token
- **유효 기간**: 14일
- **용도**: Access Token 갱신
- **저장 위치**: HttpOnly Cookie (권장) 또는 LocalStorage

### 인증이 필요한 엔드포인트

| 엔드포인트 | 인증 필요 | 권한 |
|-----------|----------|------|
| `POST /api/v1/enrollments` | ✅ | student |
| `GET /api/v1/users/profile` | ✅ | all |
| `POST /api/v1/gallery` | ✅ | all |
| `POST /api/v1/products/{id}/reviews` | ✅ | all |
| `GET /api/v1/admin/*` | ✅ | admin |

---

## 🚨 에러 코드

| 코드 | HTTP 상태 | 설명 |
|------|-----------|------|
| `AUTH_001` | 401 | 인증 토큰이 유효하지 않습니다 |
| `AUTH_002` | 401 | 토큰이 만료되었습니다 |
| `AUTH_003` | 403 | 권한이 없습니다 |
| `VALIDATION_001` | 400 | 필수 필드가 누락되었습니다 |
| `VALIDATION_002` | 400 | 입력값이 유효하지 않습니다 |
| `NOT_FOUND_001` | 404 | 리소스를 찾을 수 없습니다 |
| `DUPLICATE_001` | 409 | 이미 존재하는 데이터입니다 |
| `SERVER_001` | 500 | 서버 내부 오류가 발생했습니다 |

---

## 📦 Django 모델 예시

```python
# accounts/models.py
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('이메일은 필수입니다')
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    """사용자 모델"""
    email = models.EmailField(unique=True, verbose_name='이메일')
    name = models.CharField(max_length=100, verbose_name='이름')
    phone = models.CharField(max_length=20, blank=True, null=True, verbose_name='전화번호')
    profile_image = models.ImageField(upload_to='profiles/', blank=True, null=True, verbose_name='프로필 이미지')
    
    ROLE_CHOICES = [
        ('student', '학생'),
        ('teacher', '강사'),
        ('admin', '관리자'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='student', verbose_name='역할')
    
    is_active = models.BooleanField(default=True, verbose_name='활성 상태')
    is_verified = models.BooleanField(default=False, verbose_name='이메일 인증 여부')
    email_verification_token = models.CharField(max_length=100, blank=True, null=True)
    email_verified_at = models.DateTimeField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='가입일')
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(blank=True, null=True, verbose_name='삭제일')
    
    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']
    
    class Meta:
        db_table = 'accounts_user'
        verbose_name = '사용자'
        verbose_name_plural = '사용자'
    
    def __str__(self):
        return f"{self.name} ({self.email})"
```

---

## 🔧 Django REST Framework ViewSet 예시

```python
# curriculum/views.py
from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from .models import Curriculum, CurriculumModule
from .serializers import CurriculumListSerializer, CurriculumDetailSerializer

class CurriculumViewSet(viewsets.ReadOnlyModelViewSet):
    """커리큘럼 ViewSet"""
    queryset = Curriculum.objects.filter(is_active=True, deleted_at__isnull=True)
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'difficulty', 'is_featured']
    search_fields = ['title', 'description']
    ordering_fields = ['display_order', 'created_at']
    ordering = ['display_order']
    lookup_field = 'slug'
    
    def get_serializer_class(self):
        if self.action == 'list':
            return CurriculumListSerializer
        return CurriculumDetailSerializer
    
    def retrieve(self, request, slug=None):
        """커리큘럼 상세 조회"""
        curriculum = self.get_object()
        serializer = self.get_serializer(curriculum)
        return Response({
            'success': True,
            'data': serializer.data
        })
    
    def list(self, request):
        """커리큘럼 목록 조회"""
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'success': True,
            'data': {
                'items': serializer.data
            }
        })
```

---

## 📚 추가 리소스

### Django REST Framework
- [공식 문서](https://www.django-rest-framework.org/)
- [JWT 인증](https://django-rest-framework-simplejwt.readthedocs.io/)
- [필터링](https://django-filter.readthedocs.io/)

### PostgreSQL
- [공식 문서](https://www.postgresql.org/docs/)
- [Django-PostgreSQL 연동](https://docs.djangoproject.com/en/5.0/ref/databases/#postgresql-notes)

### API 테스트
- [Postman](https://www.postman.com/)
- [Thunder Client (VS Code)](https://www.thunderclient.com/)

---

**최종 업데이트**: 2026-01-08  
**작성자**: AI Maker Lab 개발팀  
**프로젝트 상태**: DB 설계 및 REST API 스펙 완성, 백엔드 구현 대기 중
