# AI Maker Lab Web

AI 교육 플랫폼을 위한 웹 애플리케이션입니다. Next.js와 TypeScript를 기반으로 구축되었으며, 모던하고 반응형인 UI를 제공합니다.

## 🚀 주요 기능

### 1. 사용자 인증
- 이메일/비밀번호 기반 회원가입 및 로그인
- 소셜 로그인 (Google, Kakao)
- 이메일 인증 시스템
- 약관 동의 프로세스

### 2. 교육 콘텐츠
- 커리큘럼 소개 및 상세 정보
- 교육 제품(KIT) 카탈로그
- 갤러리 (작품, 수업 후기)
- 문의 및 상담 시스템

### 3. UI/UX
- 모듈형 컴포넌트 구조
- 반응형 디자인
- 접근성 고려 (Radix UI 기반)
- 다크 모드 지원 예정

## 🛠 기술 스택

- **Frontend Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: 
  - Radix UI
  - Shadcn UI
  - Lucide Icons
- **상태 관리**: React Hooks
- **빌드 도구**: PNPM

## 📁 프로젝트 구조

```
frontend/
├── app/                    # Next.js 14 App Router 페이지
├── components/             # 리액트 컴포넌트
│   ├── header/            # 헤더 관련 컴포넌트
│   ├── footer/            # 푸터 관련 컴포넌트
│   └── ui/               # UI 컴포넌트 (모듈형)
│       ├── buttons/      # 버튼 관련
│       ├── forms/        # 폼 요소
│       ├── overlays/     # 모달, 팝업 등
│       ├── navigation/   # 네비게이션 요소
│       ├── data-display/ # 데이터 표시
│       ├── feedback/     # 알림, 토스트 등
│       ├── layout/       # 레이아웃 요소
│       └── utilities/    # 유틸리티
├── lib/                   # 유틸리티 함수
├── styles/                # 전역 스타일
└── public/                # 정적 파일
```

## 🚀 시작하기

### 필수 조건
- Node.js v22.2.1 이상
- PNPM 패키지 매니저

### 설치 및 실행

1. Node.js 버전 설정
```bash
nvm list
nvm use v22.2.1
```

2. PNPM 설치
```bash
npm install -g pnpm
```

3. 의존성 설치
```bash
pnpm install
```

4. 개발 서버 실행
```bash
pnpm run dev
```

## 🔄 개발 워크플로우

1. 컴포넌트 개발
   - UI 컴포넌트는 `/components/ui` 하위 적절한 카테고리에 배치
   - 설정값은 `config.ts`로 분리하여 관리
   - 타입 정의 철저

2. 페이지 구현
   - App Router 기반 페이지 구성
   - 레이아웃 일관성 유지
   - SEO 최적화

3. 스타일링
   - Tailwind CSS 클래스 활용
   - 반응형 디자인 필수
   - 테마 변수 활용

## 📝 문서화 규칙

- 컴포넌트 props 타입 정의
- 주요 함수 JSDoc 주석
- README 업데이트
- 변경사항 CHANGELOG 관리

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 👥 팀

- 김종필 - 프로젝트 리드 & 개발