/**
 * About 페이지 설정 파일
 * 
 * 색상, 아이콘, 라벨 등 모든 설정을 중앙에서 관리합니다.
 * JSON 데이터는 컨텐츠만 담당하고, UI 설정은 이 파일에서 관리합니다.
 */

import {
  Lightbulb,
  Target,
  Heart,
  BookOpen,
  Code,
  Rocket,
  Cpu,
  Brain,
  Sparkles,
  Bot,
  Smartphone,
  Home,
  Music,
  Gamepad2,
  Zap,
  Users,
  Award,
  type LucideIcon,
} from "lucide-react"

// ========================================
// 색상 테마 매핑
// ========================================

export type ThemeColor = 'blue' | 'purple' | 'green' | 'yellow' | 'pink' | 'orange'

/**
 * 색상별 스타일 클래스 매핑
 */
export const themeStyles: Record<ThemeColor, {
  // 카드 스타일
  border: string
  bg: string
  bgGradient: string
  
  // 텍스트 색상
  text: string
  textDark: string
  textLight: string
  
  // 아이콘 색상
  icon: string
  
  // 뱃지 스타일
  badge: string
  
  // 원형 배경
  circleBg: string
  
  // 링 스타일
  ring: string
}> = {
  blue: {
    border: 'border-blue-200',
    bg: 'bg-blue-50',
    bgGradient: 'from-blue-50 to-blue-100',
    text: 'text-blue-600',
    textDark: 'text-blue-700',
    textLight: 'text-blue-500',
    icon: 'text-blue-500',
    badge: 'bg-blue-200 text-blue-700',
    circleBg: 'bg-blue-200',
    ring: 'border-blue-300 from-blue-100 to-blue-50',
  },
  purple: {
    border: 'border-purple-200',
    bg: 'bg-purple-50',
    bgGradient: 'from-purple-50 to-purple-100',
    text: 'text-purple-600',
    textDark: 'text-purple-700',
    textLight: 'text-purple-500',
    icon: 'text-purple-500',
    badge: 'bg-purple-200 text-purple-700',
    circleBg: 'bg-purple-200',
    ring: 'border-purple-300 from-purple-100 to-purple-50',
  },
  green: {
    border: 'border-green-200',
    bg: 'bg-green-50',
    bgGradient: 'from-green-50 to-green-100',
    text: 'text-green-600',
    textDark: 'text-green-700',
    textLight: 'text-green-500',
    icon: 'text-green-500',
    badge: 'bg-green-200 text-green-700',
    circleBg: 'bg-green-200',
    ring: 'border-green-300 from-green-100 to-green-50',
  },
  yellow: {
    border: 'border-yellow-200',
    bg: 'bg-yellow-50',
    bgGradient: 'from-yellow-50 to-yellow-100',
    text: 'text-yellow-600',
    textDark: 'text-yellow-700',
    textLight: 'text-yellow-500',
    icon: 'text-yellow-600',
    badge: 'bg-yellow-200 text-yellow-700',
    circleBg: 'bg-yellow-200',
    ring: 'border-yellow-300 from-yellow-100 to-yellow-50',
  },
  pink: {
    border: 'border-pink-200',
    bg: 'bg-pink-50',
    bgGradient: 'from-pink-50 to-pink-100',
    text: 'text-pink-600',
    textDark: 'text-pink-700',
    textLight: 'text-pink-500',
    icon: 'text-pink-500',
    badge: 'bg-pink-200 text-pink-700',
    circleBg: 'bg-pink-200',
    ring: 'border-pink-300 from-pink-100 to-pink-50',
  },
  orange: {
    border: 'border-orange-200',
    bg: 'bg-orange-50',
    bgGradient: 'from-orange-50 to-orange-100',
    text: 'text-orange-600',
    textDark: 'text-orange-700',
    textLight: 'text-orange-500',
    icon: 'text-orange-500',
    badge: 'bg-orange-200 text-orange-700',
    circleBg: 'bg-orange-200',
    ring: 'border-orange-300 from-orange-100 to-orange-50',
  },
}

// ========================================
// 아이콘 매핑
// ========================================

/**
 * Philosophy 섹션 아이콘 매핑
 */
export const philosophyIcons: Record<string, LucideIcon> = {
  creative: Lightbulb,
  experience: Target,
  confidence: Heart,
}

/**
 * Methodology 섹션 아이콘 매핑 (단계별)
 */
export const methodologyIcons: Record<number, LucideIcon> = {
  1: BookOpen,      // 그림자 프로젝트
  2: Target,        // 진짜 문제 찾기
  3: Rocket,        // 프로젝트 실행
  4: Sparkles,      // 바이브 코딩
}

/**
 * Projects 섹션 아이콘 매핑
 */
export const projectIcons: Record<string, LucideIcon> = {
  bot: Bot,
  smartphone: Smartphone,
  home: Home,
  music: Music,
  brain: Brain,
  gamepad: Gamepad2,
}

/**
 * Facility 섹션 통계 아이콘 매핑
 */
export const facilityStatIcons: Record<ThemeColor, LucideIcon> = {
  blue: Cpu,
  purple: Zap,
  green: Users,
  pink: Award,
  yellow: Sparkles,
  orange: Rocket,
}

/**
 * Hero 섹션 아이콘 설정
 */
export const heroIcons = [
  { Icon: Lightbulb, bgColor: 'bg-yellow-200', iconColor: 'text-yellow-600', delay: '' },
  { Icon: Rocket, bgColor: 'bg-blue-200', iconColor: 'text-blue-600', delay: 'delay-100' },
  { Icon: Award, bgColor: 'bg-green-200', iconColor: 'text-green-600', delay: 'delay-200' },
]

// ========================================
// 섹션 설정
// ========================================

/**
 * 섹션별 배경 그라디언트 설정
 */
export const sectionBackgrounds = {
  hero: 'bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100',
  philosophy: 'bg-gradient-to-br from-pink-50 to-purple-50',
  methodology: 'bg-gradient-to-br from-gray-50 to-orange-50',
  comparison: 'bg-white',
  projects: 'bg-gradient-to-br from-cyan-50 to-blue-10',
  brand: 'bg-gradient-to-br from-purple-50 to-pink-50',
  facility: 'bg-gradient-to-br from-green-50 to-cyan-50',
  history: 'bg-gradient-to-br from-yellow-50 to-orange-50',
}

/**
 * 섹션별 구분선 그라디언트 설정
 */
export const sectionDividers = {
  philosophy: 'from-pink-400 to-purple-400',
  methodology: 'from-yellow-400 to-orange-400',
  projects: 'from-cyan-400 to-blue-400',
  facility: 'from-green-400 to-cyan-400',
  history: 'from-yellow-400 to-orange-400',
}

// ========================================
// 섹션 순서 및 표시 설정
// ========================================

export type SectionKey = 
  | 'hero' 
  | 'philosophy' 
  | 'methodology' 
  | 'comparison' 
  | 'projects' 
  | 'brand' 
  | 'facility' 
  | 'history'

/**
 * 섹션 순서 및 표시 여부 설정
 * enabled를 false로 설정하면 해당 섹션이 페이지에 표시되지 않습니다.
 */
export const sectionsConfig: Array<{
  key: SectionKey
  enabled: boolean
  order: number
}> = [
  { key: 'hero', enabled: true, order: 1 },
  { key: 'philosophy', enabled: true, order: 2 },
  { key: 'methodology', enabled: true, order: 3 },
  { key: 'comparison', enabled: true, order: 4 },
  { key: 'projects', enabled: true, order: 5 },
  { key: 'brand', enabled: true, order: 6 },
  { key: 'facility', enabled: true, order: 7 },
  { key: 'history', enabled: true, order: 8 },
]

/**
 * 활성화된 섹션만 순서대로 정렬하여 반환
 */
export function getEnabledSections() {
  return sectionsConfig
    .filter(section => section.enabled)
    .sort((a, b) => a.order - b.order)
}

// ========================================
// 라벨 및 텍스트 상수
// ========================================

/**
 * 공통 라벨
 */
export const labels = {
  loading: '로딩 중...',
  error: '콘텐츠를 불러오는데 실패했습니다.',
  noContent: '콘텐츠가 없습니다.',
}

/**
 * 비교표 헤더 스타일
 */
export const comparisonTableStyles = {
  header: 'bg-gradient-to-r from-purple-200 to-pink-200',
  headerText: 'text-purple-800',
  border: 'border-2 border-purple-200',
  rowBorder: 'border-b border-purple-100',
  highlightCell: 'bg-blue-50 text-blue-700 font-semibold',
}
