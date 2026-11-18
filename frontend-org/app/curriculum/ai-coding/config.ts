/**
 * AI 심화 제작 코딩 프로그램 페이지 설정 파일
 * 텍스트, 라벨, 버튼 텍스트 등을 관리합니다.
 */

export const AI_CODING_CONFIG = {
  // 메타 정보
  meta: {
    title: "AI 심화 제작 코딩 | AI메이커랩",
    description: "IoT 제작과 AI 서비스 개발 - 기획부터 실행까지 실전 프로젝트로 포트폴리오 완성",
  },

  // 버튼 텍스트
  buttons: {
    viewSchedule: "수업 일정 보기",
    inquiry: "수업 신청하기",
  },

  // 라벨
  labels: {
    duration: "수업 기간",
    capacity: "수강 인원",
    method: "수업 방식",
    module: "단계",
    totalDuration: "총 학습 시간",
  },

  // 링크
  links: {
    schedule: "/inquiry/schedule",
    inquiry: "/inquiry",
  },

  // 색상 매핑 (아이콘 배경 및 텍스트 색상)
  iconColors: {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
    },
    orange: {
      bg: "bg-orange-100",
      text: "text-orange-600",
    },
    indigo: {
      bg: "bg-indigo-100",
      text: "text-indigo-600",
    },
    cyan: {
      bg: "bg-cyan-100",
      text: "text-cyan-600",
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-600",
    },
    yellow: {
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
    amber: {
      bg: "bg-amber-100",
      text: "text-amber-600",
    },
    rose: {
      bg: "bg-rose-100",
      text: "text-rose-600",
    },
    teal: {
      bg: "bg-teal-100",
      text: "text-teal-600",
    },
    emerald: {
      bg: "bg-emerald-100",
      text: "text-emerald-600",
    },
    pink: {
      bg: "bg-pink-100",
      text: "text-pink-600",
    },
    violet: {
      bg: "bg-violet-100",
      text: "text-violet-600",
    },
    fuchsia: {
      bg: "bg-fuchsia-100",
      text: "text-fuchsia-600",
    },
  },

  // 그라데이션 스타일 (Flat UI Colors - NEPHRITIS)
  gradients: {
    hero: "from-emerald-500 via-teal-600 to-cyan-700", // AI 코딩 - 창의적이고 미래지향적
    cta: "bg-emerald-600",
  },

  // 탭 관련 설정
  tabs: {
    defaultTabId: "class-photos",
    activeTabClass: "bg-emerald-600 text-white shadow-sm",
    inactiveTabClass: "text-gray-600 hover:text-gray-900 hover:bg-white",
  },

  // 레이아웃 설정
  layout: {
    // 섹션별 컨테이너 클래스 (globals.css에 정의됨)
    containerClass: "curriculum-container-6xl", // curriculum-container (5xl) | curriculum-container-6xl | curriculum-container-7xl
  },

  // 주요 특징 (히어로 섹션에서 사용)
  features: [
    {
      key: "planning-to-execution",
      label: "기획부터 실행",
      description: "문제 정의부터 프로젝트 완성까지",
    },
    {
      key: "iot-making",
      label: "IoT 제작",
      description: "하드웨어와 AI를 결합한 제품 개발",
    },
    {
      key: "ai-service",
      label: "AI 서비스",
      description: "최신 AI 도구로 웹 서비스 구축",
    },
    {
      key: "portfolio",
      label: "포트폴리오",
      description: "실전 프로젝트로 포트폴리오 완성",
    },
  ],
} as const;

export type AICodingConfig = typeof AI_CODING_CONFIG;

