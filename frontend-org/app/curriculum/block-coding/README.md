# AI 교육 프로그램

DancingwithAI, TeachableMachine, ChatGPT를 활용한 학년별 맞춤 AI 교육 프로그램입니다.

## 과정 개요

### 📌 학년별 과정

#### 초등 4-6학년: 컴퓨터 비전 게임 제작
- **도구**: DancingwithAI + TeachableMachine
- **내용**: 컴퓨터 비전의 원리 체험
- **결과물**: AI 인식 게임

#### 중1-2학년: ChatGPT 컨텐츠 제작
- **도구**: ChatGPT
- **내용**: 프롬프트 엔지니어링 및 컨텐츠 기획
- **결과물**: 
  - 그림 동화책
  - 유튜브 시나리오
  - 방탈출 게임 기획서

#### 중3-고1-2학년: AI 에이전트 서비스
- **도구**: ChatGPT API + 바이브 코딩
- **내용**: 웹 서비스 프로토타입 제작
- **결과물**: 실제 배포 가능한 AI 서비스

### 🎯 난이도
- **입문**: 3시간 과정 - AI 기초 체험
- **기초**: 6시간 과정 - 프로젝트 제작
- **심화**: 12시간 과정 - 실전 서비스 개발

### 👥 대상
- 초등 4~6학년 (컴퓨터 비전)
- 중학생 1~2학년 (ChatGPT 컨텐츠)
- 중3~고2 (AI 에이전트 개발)

## 파일 구조

```
ai-education/
├── config.ts                      # 설정 파일 (색상, 라벨, 링크 등)
├── hooks/
│   └── useAIEducationCurriculumData.ts  # 데이터 로딩 Hook
├── page.tsx                       # 메인 페이지
└── README.md                      # 이 파일
```

## 데이터 구조

데이터는 `/public/curriculum/ai-education.json`에 저장됩니다.

### 주요 섹션
1. **hero**: 페이지 상단 히어로 섹션
2. **courseInfo**: 수업 기간, 인원, 방식 정보
3. **courseDescription**: 과정 소개 텍스트
4. **learningGoals**: 학년별 학습 목표 및 기대 효과
5. **curriculum**: 3개 레벨 × 3/6/12시간 커리큘럼
6. **gradeRecommendation**: 학년별 추천 과정 (9개 과정)
7. **educationRequirements**: 교육 조건 (인원, 교구재, 환경 등)
8. **classGallery**: 수업 현장/학생 작품/수업 후기 (탭 3개)
9. **materials**: 수업 자료 다운로드 (3개 카테고리)
10. **cta**: 수업 일정 보기 버튼

## 사용 기술

### 초등 4-6학년
- **DancingwithAI**: 인터랙티브 AI 게임
- **TeachableMachine**: Google의 머신러닝 도구
- **Scratch**: 비주얼 프로그래밍

### 중1-2학년
- **ChatGPT**: 대화형 AI
- **프롬프트 엔지니어링**: 효과적인 질문 기법
- **컨텐츠 기획**: 스토리텔링, UX 설계

### 중3-고1-2학년
- **ChatGPT API**: OpenAI API 연동
- **바이브 코딩**: 노코드/로우코드 웹 개발
- **프로토타이핑**: 실제 서비스 제작

## 특징

### 학년별 맞춤 교육
- 각 학년의 수준에 맞는 도구와 난이도
- 점진적 학습 곡선
- 실전 프로젝트 중심

### 최신 AI 도구 활용
- Google TeachableMachine
- OpenAI ChatGPT
- 실무에서 사용하는 최신 도구

### 창의력 & 문제해결
- 단순 사용을 넘어 직접 창작
- 프로젝트 기반 학습
- 팀 협업 경험

## 개발 가이드

### 컴포넌트 수정
공통 컴포넌트(`/app/curriculum/components/`)를 사용합니다.

### 데이터 수정
`/public/curriculum/ai-education.json` 파일을 수정하면 페이지 내용이 즉시 반영됩니다.

### 스타일 수정
`config.ts`에서 색상, 그라데이션 등을 조정할 수 있습니다:
- Primary Color: Purple
- Gradient: from-purple-500 to-indigo-600

### 레이아웃 너비 조절
`config.ts`의 `layout.containerClass`를 변경하세요:
- `curriculum-container`: max-w-5xl
- `curriculum-container-6xl`: max-w-6xl (현재)
- `curriculum-container-7xl`: max-w-7xl

## 교육 목표

### 초등학생
- AI의 기본 원리 이해
- 창의적 사고 능력
- 컴퓨터 비전 체험

### 중학생 (저학년)
- 프롬프트 엔지니어링
- 컨텐츠 기획 능력
- 구조적 사고력

### 중학생 (고학년) & 고등학생
- AI API 활용 능력
- 웹 서비스 개발 경험
- 실전 포트폴리오 구축

## 문의

교육 과정 관련 문의: [수업 일정 보기](/inquiry/schedule)

