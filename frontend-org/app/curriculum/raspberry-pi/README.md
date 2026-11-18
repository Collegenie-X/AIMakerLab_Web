# Raspberry Pi 코딩 과정

Raspberry Pi를 활용한 IoT 및 자율 주행 프로젝트 교육 프로그램입니다.

## 과정 개요

### 📌 프로젝트
- **스마트 팜** (전북대학교 협력)
  - IoT 센서 기반 자동화 농업 시스템
  - 환경 데이터 수집, 자동 관수, 웹 모니터링
  - AI 기반 작물 관리 예측

- **자율 주행차** (가천대학교 협력)
  - 카메라 비전 기반 차선 인식
  - 장애물 감지 및 회피
  - 딥러닝 객체 인식 (고급)

### 🎯 난이도
- **입문**: 3시간 과정 - 센서/모터 제어 기초
- **기초**: 6시간 과정 - 자동화 시스템 구현
- **심화**: 12시간 과정 - AI 통합 고급 프로젝트

### 👥 대상
- 초등 5~6학년 (3시간 과정)
- 중학생 1~3학년 (6시간 과정)
- 고등학생 (12시간 과정)

## 파일 구조

```
raspberry-pi/
├── config.ts                      # 설정 파일 (색상, 라벨, 링크 등)
├── hooks/
│   └── useRaspberryPiCurriculumData.ts  # 데이터 로딩 Hook
├── components/
│   ├── RaspberryPiHeroSection.tsx      # 히어로 섹션
│   ├── CourseInfoSection.tsx           # 과정 정보 (기간, 인원, 방식)
│   ├── CourseDescriptionSection.tsx    # 과정 소개
│   ├── LearningGoalsSection.tsx        # 학습 목표
│   ├── ProjectsSection.tsx             # 프로젝트 소개
│   ├── CtaSection.tsx                  # CTA 버튼
│   └── index.ts                        # 컴포넌트 내보내기
├── page.tsx                       # 메인 페이지
└── README.md                      # 이 파일
```

## 데이터 구조

데이터는 `/public/curriculum/raspberry-pi.json`에 저장됩니다.

### 주요 섹션
1. **hero**: 페이지 상단 히어로 섹션
2. **courseInfo**: 수업 기간, 인원, 방식 정보
3. **courseDescription**: 과정 소개 텍스트
4. **learningGoals**: 학습 목표 및 기대 효과
5. **projects**: 스마트 팜, 자율 주행차 프로젝트 상세
6. **curriculum**: 프로젝트별 3/6/12시간 커리큘럼
7. **gradeRecommendation**: 학년별 추천 과정
8. **educationRequirements**: 교육 조건 (인원, 교구재, 환경 등)
9. **materials**: 수업 자료 다운로드
10. **cta**: 수업 일정 보기 버튼

## 사용 기술

- **하드웨어**: Raspberry Pi 4, 센서 키트, 카메라
- **소프트웨어**: Python, OpenCV, Flask, TensorFlow Lite
- **프로토콜**: MQTT, GPIO, I2C

## 개발 가이드

### 컴포넌트 수정
각 섹션 컴포넌트는 독립적으로 작동합니다. `components/` 폴더에서 원하는 섹션을 수정하세요.

### 데이터 수정
`/public/curriculum/raspberry-pi.json` 파일을 수정하면 페이지 내용이 즉시 반영됩니다.

### 스타일 수정
`config.ts`에서 색상, 그라데이션 등을 조정할 수 있습니다.

### 레이아웃 너비 조절
`config.ts`의 `layout.containerClass`를 변경하세요:
- `curriculum-container`: max-w-5xl (기본)
- `curriculum-container-6xl`: max-w-6xl (넓음)
- `curriculum-container-7xl`: max-w-7xl (최대)

## 협력 대학

- **전북대학교**: 스마트 팜 커리큘럼
- **가천대학교**: 자율 주행차 커리큘럼

## 문의

교육 과정 관련 문의: [수업 일정 보기](/inquiry/schedule)

