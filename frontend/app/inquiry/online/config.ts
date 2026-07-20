/**
 * Online 페이지 설정 파일
 * 
 * 색상, 아이콘, 라벨 등 모든 설정을 중앙에서 관리합니다.
 * JSON 데이터는 컨텐츠만 담당하고, UI 설정은 이 파일에서 관리합니다.
 */

import {
  CheckCircle2,
  Clock,
  Send,
  AlertTriangle,
  MapPin,
  BookOpen,
  Users,
  MessageSquare,
  type LucideIcon,
} from "lucide-react"

// ========================================
// 타입 정의
// ========================================

/**
 * 문의 상태 타입
 */
export type InquiryStatus = "답변완료" | "답변대기" | "확정" | "완료" | "견적발송" | "검토중"

/**
 * 문의 아이템 타입
 */
export type OnlineInquiryItem = {
  id: number
  title: string
  author: string
  date: string
  views: number
  status: InquiryStatus
  category: string
  preview: string
}

// ========================================
// 색상 테마 설정
// ========================================

/**
 * 색상 타입
 */
export type ThemeColor = 'purple' | 'blue' | 'green' | 'pink' | 'orange' | 'indigo'

/**
 * Hero 섹션 그라디언트
 */
export const heroGradient = 'from-purple-600 via-violet-600 to-indigo-700'

/**
 * Info 섹션 배경 그라디언트
 */
export const infoSectionBg = 'from-blue-50/50 to-purple-50/50'

/**
 * 상태별 스타일 매핑
 */
export const statusStyles: Record<InquiryStatus, {
  badge: string
  icon: LucideIcon
}> = {
  "답변완료": {
    badge: "bg-green-100 text-green-700",
    icon: CheckCircle2,
  },
  "답변대기": {
    badge: "bg-gray-100 text-gray-700",
    icon: Clock,
  },
  "확정": {
    badge: "bg-green-100 text-green-700",
    icon: CheckCircle2,
  },
  "완료": {
    badge: "bg-emerald-100 text-emerald-700",
    icon: CheckCircle2,
  },
  "견적발송": {
    badge: "bg-blue-100 text-blue-700",
    icon: Send,
  },
  "검토중": {
    badge: "bg-orange-100 text-orange-700",
    icon: AlertTriangle,
  },
}

/**
 * Info 카드별 색상 설정
 */
export const infoCardStyles = [
  {
    key: 'location',
    border: 'border-blue-500/20',
    titleColor: 'text-blue-400',
  },
  {
    key: 'course',
    border: 'border-purple-500/20',
    titleColor: 'text-purple-400',
  },
  {
    key: 'time',
    border: 'border-green-500/20',
    titleColor: 'text-green-400',
  },
  {
    key: 'contact',
    border: 'border-pink-500/20',
    titleColor: 'text-pink-400',
  },
]

// ========================================
// 아이콘 매핑
// ========================================

/**
 * Info 섹션 아이콘 매핑
 */
export const infoIcons: Record<string, LucideIcon> = {
  location: MapPin,
  course: BookOpen,
  time: Clock,
  contact: MessageSquare,
}

// ========================================
// 라벨 및 텍스트 상수
// ========================================

/**
 * 페이지 라벨
 */
export const labels = {
  hero: {
    badge: "📝 새로운 출강 교육 문의",
    title: "출강 수업 문의",
    subtitle: "학교, 기업, 기관 등 어디든 찾아가는 맞춤형 AI 교육 서비스",
  },
  list: {
    title: "출강 문의 목록",
    buttonText: "출강 수업 문의하기",
  },
  info: {
    title: "출강 수업 안내",
  },
  inquiry: {
    successMessage: "문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.",
  },
}

// ========================================
// 섹션 설정
// ========================================

/**
 * 섹션 키 타입
 */
export type SectionKey = 'hero' | 'list' | 'info'

/**
 * 섹션 순서 및 표시 여부 설정
 */
export const sectionsConfig: Array<{
  key: SectionKey
  enabled: boolean
  order: number
}> = [
  { key: 'hero', enabled: true, order: 1 },
  { key: 'list', enabled: true, order: 2 },
  { key: 'info', enabled: true, order: 3 },
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
// 버튼 스타일
// ========================================

/**
 * 문의 버튼 그라디언트
 */
export const inquiryButtonGradient = 'from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
