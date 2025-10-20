/**
 * Raspberry Pi 코딩 과정 페이지 설정 파일
 * 텍스트, 라벨, 버튼 텍스트 등을 관리합니다.
 */

export const RASPBERRY_PI_CONFIG = {
  // 메타 정보
  meta: {
    title: "Raspberry Pi 코딩 | AI메이커랩",
    description: "Raspberry Pi로 스마트 팜과 자율 주행차를 만들어보세요",
  },

  // 버튼 텍스트
  buttons: {
    viewSchedule: "수업 일정 보기",
  },

  // 라벨
  labels: {
    duration: "수업 기간",
    capacity: "수강 인원",
    method: "수업 방식",
    module: "단계",
    totalDuration: "총 학습 시간",
    university: "협력 대학",
  },

  // 링크
  links: {
    schedule: "/inquiry/schedule",
  },

  // 색상 매핑
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
  },

  // 그라데이션 스타일
  gradients: {
    hero: "from-green-600 via-emerald-600 to-teal-600", // NEPHRITIS - 라즈베리파이
    cta: "bg-green-600",
  },

  // 탭 관련 설정
  tabs: {
    defaultTabId: "3hours",
    activeTabClass: "bg-green-600 text-white shadow-sm",
    inactiveTabClass: "text-gray-600 hover:text-gray-900 hover:bg-white",
  },

  // 레이아웃 설정
  layout: {
    // 섹션별 컨테이너 클래스 (globals.css에 정의됨)
    containerClass: "curriculum-container-6xl", // curriculum-container (5xl) | curriculum-container-6xl | curriculum-container-7xl
  },

  // 대학 정보
  universities: {
    jeonbuk: {
      name: "전북대학교",
      logo: "/universities/jeonbuk.png", // 로고 이미지 경로
    },
    gachon: {
      name: "가천대학교",
      logo: "/universities/gachon.png",
    },
  },
} as const;

export type RaspberryPiConfig = typeof RASPBERRY_PI_CONFIG;

