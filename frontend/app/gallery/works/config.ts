/**
 * Works 페이지 설정 파일
 * 
 * 색상, 아이콘, 라벨 등 모든 설정을 중앙에서 관리합니다.
 * JSON 데이터는 컨텐츠만 담당하고, UI 설정은 이 파일에서 관리합니다.
 */

import {
  Palette,
  Sparkles,
  Award,
  type LucideIcon,
} from "lucide-react"

// ========================================
// 색상 테마 설정
// ========================================

/**
 * Hero 섹션 그라디언트
 */
export const heroGradient = 'from-purple-100 via-pink-100 to-blue-100'

/**
 * 컨텐츠 섹션 배경 그라디언트
 */
export const contentBg = 'from-blue-50 via-purple-50 to-pink-50'

// ========================================
// 아이콘 매핑
// ========================================

/**
 * Hero 섹션 아이콘
 */
export const heroIcon: LucideIcon = Palette

/**
 * 기본 emoji
 */
export const defaultEmoji = "🎨"

// ========================================
// 라벨 및 텍스트 상수
// ========================================

/**
 * 페이지 라벨
 */
export const labels = {
  hero: {
    emoji: defaultEmoji,
    title: "학생 작품",
    subtitle: "학생들이 직접 만든 창의적이고 멋진 프로젝트를 만나보세요",
  },
  loading: "로딩 중...",
  error: "컨텐츠를 불러오는데 실패했습니다.",
}

/**
 * 작품 구분(전체/학생 작품/내부 작품)별 Hero 문구
 * - 탭 선택에 따라 상단 Hero 영역의 제목/부제가 함께 바뀝니다
 */
export const heroBySource: Record<"all" | "student" | "internal", { emoji: string; title: string; subtitle: string }> = {
  all: {
    emoji: "🎨",
    title: "작품 갤러리",
    subtitle: "학생들의 창의적인 프로젝트와 AI Maker Lab의 작품을 만나보세요",
  },
  student: {
    emoji: "🎨",
    title: "학생 작품",
    subtitle: "학생들이 직접 만든 창의적이고 멋진 프로젝트를 만나보세요",
  },
  internal: {
    emoji: "🏢",
    title: "내부 작품",
    subtitle: "AI Maker Lab이 직접 제작한 시연 및 샘플 프로젝트를 만나보세요",
  },
}

// ========================================
// 타입 정의
// ========================================

/**
 * 작품 폼 텍스트 타입
 */
export type WorksFormTexts = {
  title: string
  emoji: string
  fields: {
    image: {
      label: string
      emoji: string
      uploadPlaceholder: string
      uploadHint: string
    }
    title: {
      label: string
      emoji: string
      placeholder: string
    }
    category: {
      label: string
      emoji: string
      placeholder: string
      options: string[]
    }
    description: {
      label: string
      emoji: string
      placeholder: string
    }
    details: {
      label: string
      emoji: string
      placeholder: string
    }
    author: {
      label: string
      emoji: string
      placeholder: string
    }
    tags: {
      label: string
      emoji: string
      placeholder: string
    }
  }
}

/**
 * 기본 폼 텍스트 (JSON에서 로드 실패 시 사용)
 */
export const defaultWorksFormTexts: WorksFormTexts = {
  title: "새 작품 등록하기",
  emoji: "✨",
  fields: {
    image: {
      label: "작품 이미지 (여러 장 가능)",
      emoji: "🖼️",
      uploadPlaceholder: "클릭하여 업로드",
      uploadHint: "PNG, JPG (최대 10MB, 여러 장 선택 가능)",
    },
    title: {
      label: "작품 제목",
      emoji: "📝",
      placeholder: "예: 스마트 홈 IoT 시스템",
    },
    category: {
      label: "카테고리",
      emoji: "🗂️",
      placeholder: "카테고리 선택",
      options: ["IoT", "앱 개발", "로보틱스", "AI"],
    },
    description: {
      label: "간단한 설명",
      emoji: "💡",
      placeholder: "작품에 대한 간단한 설명을 입력하세요",
    },
    details: {
      label: "상세 설명",
      emoji: "📖",
      placeholder: "작품의 제작 과정, 사용한 기술, 배운 점 등을 자세히 작성해주세요",
    },
    author: {
      label: "작성자",
      emoji: "👤",
      placeholder: "예: 김민준 (고1)",
    },
    tags: {
      label: "태그",
      emoji: "🔖",
      placeholder: "태그를 쉼표로 구분하여 입력하세요 (예: 라즈베리파이, IoT, 음성인식)",
    },
  },
}

// ========================================
// 섹션 설정
// ========================================

/**
 * 섹션 키 타입
 */
export type SectionKey = 'hero' | 'content'

/**
 * 섹션 순서 및 표시 여부 설정
 */
export const sectionsConfig: Array<{
  key: SectionKey
  enabled: boolean
  order: number
}> = [
  { key: 'hero', enabled: true, order: 1 },
  { key: 'content', enabled: true, order: 2 },
]

/**
 * 활성화된 섹션만 순서대로 정렬하여 반환
 */
export function getEnabledSections() {
  return sectionsConfig
    .filter(section => section.enabled)
    .sort((a, b) => a.order - b.order)
}

// 하위 호환성을 위한 export
export const worksFormTexts = defaultWorksFormTexts

