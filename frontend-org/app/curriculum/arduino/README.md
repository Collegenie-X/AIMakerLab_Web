# 아두이노 AI 코딩 과정 페이지

ESP32 + 카메라 + AI를 활용한 IoT 프로젝트 중심 교육 과정 페이지입니다.

## 📁 폴더 구조

```
arduino/
├── components/              # UI 컴포넌트
│   ├── ArduinoHeroSection.tsx
│   ├── CourseInfoSection.tsx
│   ├── CourseDescriptionSection.tsx
│   ├── EducationRequirementsSection.tsx
│   ├── LearningGoalsSection.tsx
│   ├── GradeRecommendationTable.tsx
│   ├── ProjectsSection.tsx          # 6대 프로젝트 섹션 (신규)
│   ├── CurriculumSection.tsx
│   ├── ClassGallerySection.tsx
│   ├── MaterialsDownloadSection.tsx
│   ├── CtaSection.tsx
│   └── index.ts
├── hooks/                   # 커스텀 훅
│   └── useArduinoCurriculumData.ts
├── config.ts               # 설정 파일
├── page.tsx               # 메인 페이지
└── README.md

public/curriculum/
└── arduino.json           # 데이터 파일
```

## 🎯 주요 특징

### 1. 6대 프로젝트 주제
- **Smart Home**: AI 보안 카메라 시스템 (CV2, 얼굴인식)
- **Robot Arm**: 자동 물류 적재 로봇 (CV2, 객체인식)
- **Smart Gate**: 무인 출입 관리 시스템 (CV2, OCR)
- **Smart Car**: 자율 주행 RC카 (CV2, 차선인식)
- **Smart Dust**: 음성 제어 청소 로봇 (STT, TTS)
- **Smart Farm**: AI 스마트 농장 관리 (CV2, 식물분석)

### 2. 커리큘럼 구성
- **3시간 과정**: 아두이노 기초 체험
- **6시간 과정**: ESP32-CAM + OpenCV 기본
- **12시간 과정**: AI 연계 심화 프로젝트

### 3. 기술 스택
- ESP32-CAM (마이크로컨트롤러 + 카메라)
- Arduino IDE (펌웨어 개발)
- Python + OpenCV (이미지 처리)
- AI 모델 통합 (얼굴인식, 객체인식 등)
- Wi-Fi/Bluetooth 통신

## 📊 데이터 구조

### arduino.json
```json
{
  "hero": { ... },
  "courseInfo": [ ... ],
  "description": { ... },
  "educationRequirements": { ... },
  "learningGoals": { ... },
  "gradeRecommendation": { ... },
  "projects": {              // 6대 프로젝트 (신규)
    "title": "6대 프로젝트 주제",
    "items": [
      {
        "id": "smart-home",
        "title": "Smart Home",
        "technologies": ["ESP32-CAM", "OpenCV", ...],
        "features": [ ... ],
        ...
      },
      ...
    ]
  },
  "curriculum": { ... },
  "gallery": { ... },
  "materials": { ... },
  "cta": { ... }
}
```

## 🎨 디자인 시스템

### 색상 테마
- **Primary**: Orange (from-orange-500 to-red-600)
- **Accent**: Teal, Cyan, Emerald
- **학년별 컬럼**: Yellow(초3-4), Cyan(초5-6), Teal(중1-2), Cyan-600(중3), Blue(고등)

### 컴포넌트 스타일
- 카드 기반 레이아웃
- Hover 애니메이션 (shadow-xl, -translate-y-1)
- 그라데이션 배경
- 아이콘 + 배지 조합

## 🔧 개발 가이드

### 데이터 추가/수정
1. `public/curriculum/arduino.json` 파일 수정
2. 타입 정의: `hooks/useArduinoCurriculumData.ts`
3. 자동 반영 (빌드 불필요)

### 새 컴포넌트 추가
1. `components/` 폴더에 컴포넌트 생성
2. `components/index.ts`에 export 추가
3. `page.tsx`에서 import 및 사용

### 스타일 커스터마이징
- `config.ts`: 색상, 그라데이션, 라벨 등
- Tailwind CSS 클래스 사용

## 📱 반응형 디자인
- Mobile: 1컬럼 레이아웃
- Tablet: 2컬럼 그리드
- Desktop: 3컬럼 그리드

## 🚀 사용 방법

### 페이지 접근
```
/curriculum/arduino
```

### 로컬 개발
```bash
npm run dev
# http://localhost:3000/curriculum/arduino
```

## 📝 향후 계획
- [ ] 프로젝트별 상세 페이지
- [ ] 실시간 데모 영상 추가
- [ ] 학생 작품 갤러리 확장
- [ ] 온라인 시뮬레이터 연동
- [ ] Backend API 연동 (현재 JSON 파일)

## 🔗 관련 페이지
- 앱 인벤터: `/curriculum/app-inventor`
- 수업 일정: `/inquiry/schedule`
- 제품 상세: `/products/coding-ai`

