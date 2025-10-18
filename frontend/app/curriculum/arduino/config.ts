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
  },

  // 그라데이션 스타일
  gradients: {
    hero: "from-orange-500 to-red-600",
    cta: "bg-orange-600",
  },

  // 탭 관련 설정
  tabs: {
    defaultTabId: "3hours",
    activeTabClass: "bg-orange-600 text-white shadow-sm",
    inactiveTabClass: "text-gray-600 hover:text-gray-900 hover:bg-white",
  },
} as const;

export type ArduinoConfig = typeof ARDUINO_CONFIG;

