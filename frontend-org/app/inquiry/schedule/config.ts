/**
 * Schedule 페이지 설정 파일
 * 
 * 색상, 아이콘, 라벨 등 모든 설정을 중앙에서 관리합니다.
 * JSON 데이터는 컨텐츠만 담당하고, UI 설정은 이 파일에서 관리합니다.
 */

import {
  Calendar,
  Users,
  Clock,
  MapPin,
  BookOpen,
  Target,
  Award,
  GraduationCap,
  Zap,
  type LucideIcon,
} from "lucide-react"

// ========================================
// 타입 정의
// ========================================

/**
 * 강사 정보 타입
 */
export type InstructorInfo = {
  name: string
  title: string
  experience: string
  specialization: string
  education: string
  introduction: string
}

/**
 * 커리큘럼 모듈 타입
 */
export type CurriculumModule = {
  week: string
  title: string
  topics: string[]
  duration: string
  image?: string  // 차시별 이미지 경로
  imageAlt?: string  // 이미지 설명
}

/**
 * 학생 프로젝트 타입
 */
export type StudentProject = {
  title: string
  description: string
  image: string
}

/**
 * FAQ 타입
 */
export type FAQ = {
  question: string
  answer: string
}

/**
 * 리뷰 타입
 */
export type Review = {
  id: number
  studentName: string
  rating: number
  date: string
  comment: string
  course?: string
}

/**
 * 댓글/질문 타입
 */
export type Comment = {
  id: number
  userName: string
  userType?: "student" | "instructor" | "admin"
  date: string
  question: string
  likes?: number
  answer?: {
    userName: string
    userType?: "instructor" | "admin"
    date: string
    content: string
  }
}

/**
 * 가격 정보 타입 (출강 수업용)
 */
export type PricingInfo = {
  materialsPerKit: number  // 키트당 재료비 (예: 55000)
  studentsPerKit: number   // 키트당 학생 수 (예: 4)
  instructorFeePerHour: number  // 시간당 강사료 (예: 50000)
  minHours: number  // 최소 수업 시간 (예: 2)
  defaultHours: number  // 기본 수업 시간 (예: 3)
  minStudents: number  // 최소 수강 인원 (예: 10)
  maxStudents: number  // 최대 수강 인원 (예: 30)
  defaultStudents: number  // 기본 수강 인원 (예: 12)
  studentStep: number  // 인원 증가 단위 (예: 2 또는 4)
  rentalPerKit?: number  // 키트당 대여비 (예: 20000, 선택)
}

/**
 * 교구재 정보 타입
 */
export type EducationKit = {
  name: string  // 교구재 이름
  description: string  // 교구재 설명
  image?: string  // 교구재 이미지
  videoId?: string  // 유튜브 동영상 ID
  productUrl?: string  // 교육 제품 페이지 URL
  purchasePrice?: number  // 구매 가격
  rentalPrice?: number  // 대여 가격
}

/**
 * 스케줄 아이템 타입
 */
export type ScheduleItem = {
  id: number
  title: string
  instructor: string
  instructorInfo?: InstructorInfo
  date?: string  // 출강 수업은 날짜가 유동적
  time?: string  // 출강 수업은 시간이 유동적
  location?: string  // 출강 수업은 위치가 유동적
  capacity?: number
  enrolled?: number
  level: string
  duration: string  // "3시간", "6시간", "12시간"
  durationHours: number  // 숫자로 시간 (3, 6, 12)
  month?: string
  rating: number
  reviews: number
  videoUrl?: string
  videoId?: string
  description: string
  learningObjectives?: string[]
  expectedOutcomes?: string[]
  curriculum: CurriculumModule[]  // 이미지 포함을 위해 객체 배열만 사용
  studentProjects?: StudentProject[]
  requirements: string[]
  faqs?: FAQ[]
  reviewList?: Review[]
  commentList?: Comment[]
  price?: string  // 기존 고정 가격 (주말반용)
  pricingInfo?: PricingInfo  // 유연한 가격 정보 (출강 수업용)
  educationKit?: EducationKit  // 교구재 정보
  gallery?: { type: "image" | "video"; src: string; alt?: string }[]
}

/**
 * 스케줄 텍스트 설정 타입
 */
export type ScheduleTexts = {
  heroTitle: string
  heroSubtitle: string
  heroDescription?: string
  monthPrefix: string
  monthSuffix: string
  listEmpty: string
  info: {
    title: string
    refundTitle: string
    refundDesc: string
    capacityTitle: string
    capacityDesc: string
    contactTitle: string
    contactDesc: string
  }
  labels: {
    openingDate: string
    classTime: string
    place: string
    capacity: string
    enrolled: string
    remain: string
    closed: string
    recruiting: string
    level: string
    instructor: string
    instructorInfo: string
    rating: string
    reviews: string
    price: string
    duration: string
    seeDetail: string
    apply: string
    closedFull: string
    intro: string
    learningObjectives: string
    expectedOutcomes: string
    curriculum: string
    curriculumDetail: string
    studentProjects: string
    requirements: string
    faqs: string
    reviewsTab: string
    qnaTab: string
    mediaGallery: string
    overview: string
    instructorTab: string
    week: string
    noReviews: string
    helpfulReview: string
    noComments: string
    writeComment: string
    commentPlaceholder: string
    submitComment: string
    reply: string
    answered: string
    unanswered: string
    educationKit: string
    kitPurchase: string
    kitRental: string
    kitDescription: string
    viewProduct: string
  }
}

// ========================================
// 색상 테마 설정
// ========================================

/**
 * 색상 타입
 */
export type ThemeColor = 'purple' | 'blue' | 'green' | 'orange' | 'pink' | 'cyan'

/**
 * 색상별 그라디언트 클래스 매핑
 */
export const gradientClasses: Record<ThemeColor, string> = {
  purple: 'from-purple-500 via-indigo-600 to-blue-700',
  blue: 'from-cyan-500 via-blue-600 to-indigo-700',
  green: 'from-green-500 via-emerald-600 to-teal-700',
  orange: 'from-orange-500 via-amber-600 to-yellow-700',
  pink: 'from-pink-500 via-rose-600 to-red-700',
  cyan: 'from-cyan-400 via-sky-500 to-blue-600',
}

/**
 * 색상별 배경 그라디언트 클래스 매핑
 */
export const bgGradientClasses: Record<string, string> = {
  filter: 'bg-gray-950',
  list: 'bg-gray-950',
  info: 'bg-gray-900',
}

// ========================================
// 아이콘 매핑
// ========================================

/**
 * Hero 섹션 특징 아이콘 매핑
 */
export const heroFeatureIcons: Array<{
  Icon: LucideIcon
  label: string
  bgColor: string
  iconColor: string
}> = [
  { Icon: Clock, label: '3시간 / 6시간 / 12시간', bgColor: 'bg-white/20', iconColor: 'text-white' },
  { Icon: Users, label: '학교 · 기업 · 기관', bgColor: 'bg-white/20', iconColor: 'text-white' },
  { Icon: Calendar, label: '맞춤형 일정', bgColor: 'bg-white/20', iconColor: 'text-white' },
  { Icon: MapPin, label: '전국 출강 가능', bgColor: 'bg-white/20', iconColor: 'text-white' },
]

/**
 * Info 섹션 아이콘 매핑
 */
export const infoIcons: Record<string, LucideIcon> = {
  refund: Target,
  capacity: MapPin,
  contact: Users,
}

// ========================================
// 섹션 설정
// ========================================

/**
 * 섹션 키 타입
 */
export type SectionKey = 'hero' | 'filter' | 'list' | 'info'

/**
 * 섹션 순서 및 표시 여부 설정
 */
export const sectionsConfig: Array<{
  key: SectionKey
  enabled: boolean
  order: number
}> = [
  { key: 'hero', enabled: true, order: 1 },
  { key: 'filter', enabled: true, order: 2 },
  { key: 'list', enabled: true, order: 3 },
  { key: 'info', enabled: true, order: 4 },
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
// 페이지 설정
// ========================================

/**
 * 페이지별 색상 테마 설정
 */
export const pageThemes: Record<ScheduleType, ThemeColor> = {
  weekday: 'purple',
  weekend: 'blue',
}

/**
 * 페이지별 타이틀과 설명
 */
export const pageTitles = {
  filterTitle: '수업 시간을 선택하세요',
  filterDescription: '3시간, 6시간, 12시간 중 기관 상황에 맞는 커리큘럼을 찾아보세요. 인원수에 따라 유연하게 가격이 조정됩니다.',
  listTitle: (duration: string) => duration !== '전체' ? `${duration} 커리큘럼` : '전체 커리큘럼',
  listCount: (count: number) => `총 ${count}개의 커리큘럼`,
  listHelper: "마음에 드는 커리큘럼을 찾으셨나요? '문의하기' 버튼을 클릭하면 바로 견적을 받아보실 수 있습니다!",
  loading: '로딩 중...',
}

// ========================================
// Duration 필터 설정
// ========================================

/**
 * Duration 카테고리 매핑 함수
 */
export function getDurationCategory(duration: string): string {
  // 정확한 시간 매칭 (3시간, 6시간, 12시간)
  if (duration === "3시간" || duration.includes("3시간")) return "3시간"
  if (duration === "6시간" || duration.includes("6시간")) return "6시간"
  if (duration === "12시간" || duration.includes("12시간")) return "12시간"
  return "기타"
}

/**
 * Duration 옵션 추출 함수
 */
/**
 * Duration 옵션을 추출하고 시간 순서대로 정렬
 * "전체", "3시간", "6시간", "12시간" 순서로 반환
 */
export function extractDurationOptions(items: ScheduleItem[]): string[] {
  const durationSet = new Set<string>()
  items.forEach(item => {
    const category = getDurationCategory(item.duration)
    if (category !== "기타") {
      durationSet.add(category)
    }
  })
  
  // 시간 순서대로 정렬 (3시간 → 6시간 → 12시간)
  const sortedDurations = Array.from(durationSet).sort((a, b) => {
    const aNum = parseInt(a.replace("시간", ""))
    const bNum = parseInt(b.replace("시간", ""))
    return aNum - bNum
  })
  
  return ["전체", ...sortedDurations]
}

// ========================================
// 수업 타입 및 데이터 로드
// ========================================

/**
 * 수업 타입 정의
 */
export type ScheduleType = "weekday" | "weekend"

/**
 * 수업 타입에 따라 텍스트 설정 반환
 * @param type - 수업 타입 (주중/주말)
 * @returns 해당 타입에 맞는 텍스트 설정
 */
export function getScheduleTexts(type: ScheduleType): ScheduleTexts {
  const baseLabels = {
    openingDate: "개강일",
    classTime: "수업 시간",
    place: "장소",
    capacity: "정원",
    enrolled: "명 /",
    remain: "석 남음",
    closed: "마감",
    recruiting: "모집중",
    level: "레벨",
    instructor: "강사",
    instructorInfo: "강사 소개",
    rating: "평점",
    reviews: "개 리뷰",
    price: "수강료",
    duration: "과정 기간",
    seeDetail: "자세히 보기",
    apply: "수강 신청",
    closedFull: "마감되었습니다",
    intro: "수업 소개",
    learningObjectives: "학습 목표",
    expectedOutcomes: "기대 효과",
    curriculum: "커리큘럼",
    curriculumDetail: "상세 커리큘럼",
    studentProjects: "학생 작품",
    requirements: "준비사항",
    faqs: "자주 묻는 질문",
    reviewsTab: "수강평",
    qnaTab: "질문/댓글",
    mediaGallery: "미디어 갤러리",
    overview: "개요",
    instructorTab: "강사",
    week: "주차",
    noReviews: "아직 수강평이 없습니다.",
    helpfulReview: "이 수강평이 도움이 되었나요?",
    noComments: "아직 질문이 없습니다. 첫 번째 질문을 남겨보세요!",
    writeComment: "질문 작성하기",
    commentPlaceholder: "커리큘럼에 대해 궁금한 점을 자유롭게 질문해주세요...",
    submitComment: "질문 등록",
    reply: "답변",
    answered: "답변 완료",
    unanswered: "답변 대기",
    educationKit: "교구재 정보",
    kitPurchase: "구매",
    kitRental: "대여",
    kitDescription: "교구재 설명",
    viewProduct: "제품 상세보기",
  }

  const baseInfo = {
    title: "출강 수업 안내",
    refundTitle: "🎯 간편한 문의 방법",
    refundDesc: "마음에 드는 커리큘럼을 찾으셨나요? 각 수업 카드의 '문의하기' 버튼을 클릭하면 해당 수업 정보가 자동으로 입력된 문의 폼이 열립니다. 3시간/6시간/12시간 중에서 기관 상황에 맞는 시간을 선택하시면 됩니다!",
    capacityTitle: "💰 유연한 가격 구성",
    capacityDesc: "가격은 '재료비 + 강사료'로 구성됩니다. 재료비는 4인 1조 기준 55,000원, 강사료는 시간당 50,000원입니다. 기본 3시간 이상(2시간도 가능)이며, 인원수에 따라 비용이 달라집니다. 예를 들어 12명이 3시간 수업을 받으면 재료비 165,000원 + 강사료 150,000원 = 총 315,000원입니다. 재료비와 강사료를 분리하여 유연하게 조정할 수 있습니다.",
    contactTitle: "📍 출강 가능 지역",
    contactDesc: "서울, 경기는 기본 출강 지역이며 전국 어디든 방문 가능합니다. 학교, 기업, 도서관, 복지관 등 어디든 찾아갑니다. 최소 인원 10명부터 최대 30명까지 진행 가능하며, 인원과 장소에 따라 맞춤 견적을 제공해드립니다.",
  }

  // 출강 교육 커리큘럼
  if (type === "weekday") {
    return {
      heroTitle: "출강 교육 커리큘럼",
      heroSubtitle: "우리 기관에 딱 맞는 AI 메이커 교육을 찾고 계신가요?",
      heroDescription: "3시간, 6시간, 12시간 중 선택하세요. 재료비와 강사료가 분리되어 유연하게 운영할 수 있습니다. 인원수에 따라 견적이 달라지며, 각 커리큘럼에는 실습 이미지가 포함되어 있습니다!",
      monthPrefix: "",
      monthSuffix: " 추천 커리큘럼",
      listEmpty: "해당 시간대 커리큘럼을 준비 중입니다.",
      info: baseInfo,
      labels: baseLabels,
    }
  }

  // 주말 수업 텍스트
  return {
    heroTitle: "주말 오프라인 수업 일정",
    heroSubtitle:
      "전문 강사와 함께하는 실습 중심 교육! 주말에 여유롭게 소규모 정예 수업으로 확실한 학습 효과를 경험하세요.",
    monthPrefix: "",
    monthSuffix: " 개강 수업",
    listEmpty: "해당 월에 예정된 주말 수업이 없습니다.",
    info: baseInfo,
    labels: baseLabels,
  }
}

/**
 * 수업 타입에 따라 데이터 URL 반환
 * @param type - 수업 타입 (주중/주말)
 * @returns 해당 타입의 JSON 데이터 URL
 */
export function getScheduleDataUrl(type: ScheduleType): string {
  return type === "weekday" ? "/inquiry/schedules-weekday.json" : "/inquiry/schedules-weekend.json"
}

// 하위 호환성을 위한 기본 export (주중 수업)
export const scheduleTexts = getScheduleTexts("weekday")
export const scheduleDataUrl = getScheduleDataUrl("weekday")


