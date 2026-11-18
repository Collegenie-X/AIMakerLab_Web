/**
 * 아두이노 AI 코딩 과정 페이지 설정 파일
 * 텍스트, 라벨, 버튼 텍스트 등을 관리합니다.
 */

export const ARDUINO_CONFIG = {
  // 메타 정보
  meta: {
    title: "아두이노 AI 코딩 | AI메이커랩",
    description: "ESP32 + 카메라로 AI 연계 IoT 프로젝트를 만들어보세요. 아두이노 AI 코딩 과정",
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
  },

  // 링크
  links: {
    schedule: "/inquiry/schedule",
  },

  // 색상 매핑
  iconColors: {
    blue: {
      bg: "bg-blue-900/30",
      text: "text-blue-400",
    },
    purple: {
      bg: "bg-purple-900/30",
      text: "text-purple-400",
    },
    green: {
      bg: "bg-green-900/30",
      text: "text-green-400",
    },
    orange: {
      bg: "bg-orange-900/30",
      text: "text-orange-400",
    },
    indigo: {
      bg: "bg-indigo-900/30",
      text: "text-indigo-400",
    },
    cyan: {
      bg: "bg-cyan-900/30",
      text: "text-cyan-400",
    },
    red: {
      bg: "bg-red-900/30",
      text: "text-red-400",
    },
    yellow: {
      bg: "bg-yellow-900/30",
      text: "text-yellow-400",
    },
    rose: {
      bg: "bg-rose-900/30",
      text: "text-rose-400",
    },
    teal: {
      bg: "bg-teal-900/30",
      text: "text-teal-400",
    },
    emerald: {
      bg: "bg-emerald-900/30",
      text: "text-emerald-400",
    },
  },

  // 그라데이션 스타일
  gradients: {
    hero: "from-blue-500 via-sky-600 to-blue-700", // PETER RIVER - 아두이노
    cta: "bg-blue-600",
  },

  // 탭 관련 설정
  tabs: {
    defaultTabId: "3hours",
    activeTabClass: "bg-orange-600 text-white shadow-sm",
    inactiveTabClass: "text-gray-400 hover:text-white hover:bg-gray-800",
  },

  // 레이아웃 설정
  layout: {
    // 섹션별 컨테이너 클래스 (globals.css에 정의됨)
    containerClass: "curriculum-container-6xl", // curriculum-container (5xl) | curriculum-container-6xl | curriculum-container-7xl
  },
} as const;

export type ArduinoConfig = typeof ARDUINO_CONFIG;

