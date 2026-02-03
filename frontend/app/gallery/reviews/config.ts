/**
 * Reviews 페이지 설정 파일
 * 
 * 색상, 아이콘, 라벨 등 모든 설정을 중앙에서 관리합니다.
 * JSON 데이터는 컨텐츠만 담당하고, UI 설정은 이 파일에서 관리합니다.
 */

import {
  MessageSquare,
  Star,
  ThumbsUp,
  type LucideIcon,
} from "lucide-react"

// ========================================
// 색상 테마 설정
// ========================================

/**
 * Hero 섹션 그라디언트
 */
export const heroGradient = 'from-blue-100 via-cyan-100 to-purple-100'

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
export const heroIcon: LucideIcon = MessageSquare

/**
 * 기본 emoji
 */
export const defaultEmoji = "💬"

// ========================================
// 라벨 및 텍스트 상수
// ========================================

/**
 * 페이지 라벨
 */
export const labels = {
  hero: {
    emoji: defaultEmoji,
    title: "수업 후기",
    subtitle: "학부모님과 학생들의 생생한 수업 후기를 확인하세요",
  },
  loading: "로딩 중...",
  error: "컨텐츠를 불러오는데 실패했습니다.",
}

// ========================================
// 타입 정의
// ========================================

/**
 * 후기 폼 텍스트 타입
 */
export type ReviewsFormTexts = {
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
    rating: {
      label: string
      emoji: string
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
export const defaultReviewsFormTexts: ReviewsFormTexts = {
  title: "새 후기 작성하기",
  emoji: "✍️",
  fields: {
    image: {
      label: "수업 사진 (여러 장 가능)",
      emoji: "📸",
      uploadPlaceholder: "클릭하여 업로드",
      uploadHint: "PNG, JPG (최대 10MB, 여러 장 선택 가능)",
    },
    title: {
      label: "후기 제목",
      emoji: "📝",
      placeholder: "예: 아이가 코딩에 푹 빠졌어요!",
    },
    category: {
      label: "수업 종류",
      emoji: "🗂️",
      placeholder: "수업 선택",
      options: ["주중 강의", "주말 강의", "출장 강의"],
    },
    rating: {
      label: "만족도",
      emoji: "⭐",
    },
    description: {
      label: "간단한 후기",
      emoji: "💡",
      placeholder: "한 줄로 요약한 후기를 입력하세요",
    },
    details: {
      label: "상세 후기",
      emoji: "📖",
      placeholder: "수업에 대한 자세한 후기를 작성해주세요. 어떤 점이 좋았는지, 아이가 어떻게 변화했는지 등을 자유롭게 작성해주세요.",
    },
    author: {
      label: "작성자",
      emoji: "👤",
      placeholder: "예: 김OO 학부모",
    },
    tags: {
      label: "태그",
      emoji: "🔖",
      placeholder: "태그를 쉼표로 구분하여 입력하세요 (예: 초등학생, 만족, 추천)",
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
export const reviewsFormTexts = defaultReviewsFormTexts

