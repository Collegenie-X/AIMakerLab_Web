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
    border: 'border-blue-400/30',
    bg: 'bg-blue-500/10',
    bgGradient: 'from-blue-500/15 to-blue-400/5',
    text: 'text-blue-300',
    textDark: 'text-blue-200',
    textLight: 'text-blue-300',
    icon: 'text-blue-300',
    badge: 'bg-blue-500/25 text-blue-100',
    circleBg: 'bg-blue-500/30',
    ring: 'border-blue-400/40 from-blue-500/20 to-blue-900/10',
  },
  purple: {
    border: 'border-purple-400/30',
    bg: 'bg-purple-500/10',
    bgGradient: 'from-purple-500/15 to-purple-400/5',
    text: 'text-purple-300',
    textDark: 'text-purple-200',
    textLight: 'text-purple-300',
    icon: 'text-purple-300',
    badge: 'bg-purple-500/25 text-purple-100',
    circleBg: 'bg-purple-500/30',
    ring: 'border-purple-400/40 from-purple-500/20 to-purple-900/10',
  },
  green: {
    border: 'border-green-400/30',
    bg: 'bg-green-500/10',
    bgGradient: 'from-green-500/15 to-green-400/5',
    text: 'text-green-300',
    textDark: 'text-green-200',
    textLight: 'text-green-300',
    icon: 'text-green-300',
    badge: 'bg-green-500/25 text-green-100',
    circleBg: 'bg-green-500/30',
    ring: 'border-green-400/40 from-green-500/20 to-green-900/10',
  },
  yellow: {
    border: 'border-yellow-400/30',
    bg: 'bg-yellow-500/10',
    bgGradient: 'from-yellow-500/15 to-yellow-400/5',
    text: 'text-yellow-300',
    textDark: 'text-yellow-200',
    textLight: 'text-yellow-300',
    icon: 'text-yellow-300',
    badge: 'bg-yellow-500/25 text-yellow-100',
    circleBg: 'bg-yellow-500/30',
    ring: 'border-yellow-400/40 from-yellow-500/20 to-yellow-900/10',
  },
  pink: {
    border: 'border-pink-400/30',
    bg: 'bg-pink-500/10',
    bgGradient: 'from-pink-500/15 to-pink-400/5',
    text: 'text-pink-300',
    textDark: 'text-pink-200',
    textLight: 'text-pink-300',
    icon: 'text-pink-300',
    badge: 'bg-pink-500/25 text-pink-100',
    circleBg: 'bg-pink-500/30',
    ring: 'border-pink-400/40 from-pink-500/20 to-pink-900/10',
  },
  orange: {
    border: 'border-orange-400/30',
    bg: 'bg-orange-500/10',
    bgGradient: 'from-orange-500/15 to-orange-400/5',
    text: 'text-orange-300',
    textDark: 'text-orange-200',
    textLight: 'text-orange-300',
    icon: 'text-orange-300',
    badge: 'bg-orange-500/25 text-orange-100',
    circleBg: 'bg-orange-500/30',
    ring: 'border-orange-400/40 from-orange-500/20 to-orange-900/10',
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
  persona: Heart,
  experience: Target,
  confidence: Brain,
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
  { Icon: Lightbulb, bgColor: 'bg-yellow-500/20 ring-1 ring-yellow-400/40', iconColor: 'text-yellow-300', delay: '' },
  { Icon: Rocket, bgColor: 'bg-blue-500/20 ring-1 ring-blue-400/40', iconColor: 'text-blue-300', delay: 'delay-100' },
  { Icon: Award, bgColor: 'bg-green-500/20 ring-1 ring-green-400/40', iconColor: 'text-green-300', delay: 'delay-200' },
]

// ========================================
// 섹션 설정
// ========================================

/**
 * 섹션별 배경 그라디언트 설정
 */
export const sectionBackgrounds = {
  hero: 'bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950',
  philosophy: 'bg-gradient-to-br from-slate-950 to-purple-950/60',
  methodology: 'bg-gradient-to-br from-slate-950 to-slate-900',
  comparison: 'bg-slate-950',
  era: 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950',
  projects: 'bg-gradient-to-br from-slate-950 to-cyan-950/50',
  brand: 'bg-gradient-to-br from-purple-950/60 to-slate-950',
  facility: 'bg-gradient-to-br from-slate-950 to-emerald-950/50',
  history: 'bg-gradient-to-br from-slate-950 to-amber-950/40',
}

/**
 * About 페이지 전용 다크 테마 텍스트 색상.
 * 전역 themeColors는 밝은 배경 기준이라 다른 페이지에 영향을 주지 않도록 별도로 둡니다.
 */
export const aboutColors = {
  heading: 'text-white',
  subheading: 'text-purple-300',
  body: 'text-gray-300',
  muted: 'text-gray-400',
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
  | 'era' 
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
  { key: 'era', enabled: true, order: 5 },
  { key: 'projects', enabled: true, order: 6 },
  { key: 'brand', enabled: true, order: 7 },
  { key: 'facility', enabled: true, order: 8 },
  { key: 'history', enabled: true, order: 9 },
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
  header: 'bg-gradient-to-r from-purple-900/70 to-pink-900/60',
  headerText: 'text-purple-200',
  border: 'border border-white/10',
  rowBorder: 'border-b border-white/10',
  highlightCell: 'bg-purple-500/10 text-purple-200 font-semibold',
}
