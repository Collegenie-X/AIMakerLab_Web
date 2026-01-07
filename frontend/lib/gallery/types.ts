/**
 * Gallery 타입 정의
 * - 작품(Work)과 후기(Review)를 별도 타입으로 분리
 */

// ============================================================================
// 공통 기본 타입
// ============================================================================

/**
 * 기본 메타데이터 (공통)
 */
type BaseMetadata = {
  id: number
  title: string
  emoji: string
  author: string
  date: string
  views: number
  likes: number
  images: string[]
  tags: string[]
}

// ============================================================================
// 작품 (Work) 타입
// ============================================================================

/**
 * 학생 작품 아이템
 * - 기술 중심의 프로젝트
 */
export type WorkItem = BaseMetadata & {
  type: 'work'
  description: string // 한 줄 소개
  category: string // 기술 카테고리 (IoT, AI, 로보틱스, 앱 개발 등)
  image: string // 대표 이미지
  
  // 작품 전용 필드
  projectDetails: string // 프로젝트 상세 설명
  techStack?: string[] // 사용 기술 (Python, 아두이노, 라즈베리파이 등)
  tools?: string[] // 사용 도구/플랫폼
  difficulty?: '입문' | '초급' | '중급' | '고급' // 난이도
  duration?: string // 제작 기간 (예: "3개월", "6주")
  features?: string[] // 주요 기능
  challenges?: string // 어려웠던 점
  learnings?: string // 배운 점
  grade?: string // 학년 (초6, 중2, 고1 등)
}

// ============================================================================
// 수업 후기 (Review) 타입
// ============================================================================

/**
 * 수업 후기 아이템
 * - 수업 경험 및 만족도 중심
 */
export type ReviewItem = BaseMetadata & {
  type: 'review'
  summary: string // 한 줄 요약
  category: string // 수업 유형 (주중 강의, 주말 강의, 출장 강의 등)
  image: string // 대표 이미지
  
  // 후기 전용 필드 (필수)
  rating: number // 평점 (1-5)
  reviewContent: string // 후기 상세 내용
  
  // 수업 정보
  courseType?: string // 수업 과정 (앱인벤터, 아두이노, AI 등)
  courseDuration?: string // 수강 기간 (예: "6개월", "3개월")
  studentGrade?: string // 학생 학년
  classType?: '개인' | '소규모' | '그룹' | '출장' // 수업 형태
  
  // 평가 항목
  satisfaction?: {
    curriculum?: number // 커리큘럼 만족도 (1-5)
    instructor?: number // 강사 만족도 (1-5)
    facility?: number // 시설 만족도 (1-5)
    management?: number // 운영 관리 만족도 (1-5)
  }
  
  // 추천 관련
  wouldRecommend?: boolean // 추천 여부
  targetAudience?: string[] // 추천 대상 (초등학생, 중학생, 코딩 입문자 등)
  
  // 성과
  achievements?: string[] // 수강 후 성과 (대회 수상, 자격증 등)
  improvements?: string[] // 향상된 부분 (창의력, 논리력 등)
}

// ============================================================================
// 통합 타입
// ============================================================================

/**
 * 갤러리 아이템 (Union Type)
 */
export type GalleryItem = WorkItem | ReviewItem

/**
 * 갤러리 타입 구분자
 */
export type GalleryType = 'works' | 'reviews'

// ============================================================================
// 갤러리 설정 타입
// ============================================================================

/**
 * 폼 필드 설정
 */
export type GalleryFormField = {
  label: string
  emoji: string
  placeholder: string
  uploadPlaceholder?: string
  uploadHint?: string
  options?: string[]
}

/**
 * 폼 설정
 */
export type GalleryFormConfig = {
  title: string
  emoji: string
  fields: {
    image: GalleryFormField
    title: GalleryFormField
    category: GalleryFormField & { options: string[] }
    rating?: GalleryFormField
    description: GalleryFormField
    details: GalleryFormField
    author: GalleryFormField
    tags: GalleryFormField
  }
}

/**
 * 갤러리 설정 (Hero, 액션, 폼 등)
 */
export type GalleryConfig = {
  hero: {
    emoji: string
    title: string
    subtitle: string
  }
  categoryAll: string
  itemCountSuffix: string
  emptyState: {
    emoji: string
    title: string
    message: string
  }
  actions: {
    like: string
    share: string
    create: string
    cancel: string
    submit: string
  }
  form: GalleryFormConfig
}

// ============================================================================
// API 응답 타입
// ============================================================================

/**
 * API 에러 타입
 */
export type ApiError = {
  message: string
  code?: string
  details?: unknown
}

/**
 * 갤러리 통합 응답
 */
export type GalleryResponse = {
  items: GalleryItem[]
  config: GalleryConfig
}

/**
 * 좋아요/조회수 업데이트 요청
 */
export type UpdateStatsRequest = {
  itemId: number
  type: 'like' | 'view'
}

/**
 * 좋아요/조회수 업데이트 응답
 */
export type UpdateStatsResponse = {
  success: boolean
  item: GalleryItem
}

// ============================================================================
// 필터 & 검색 타입
// ============================================================================

/**
 * 갤러리 필터 옵션
 */
export type GalleryFilterOptions = {
  category?: string
  sortBy?: 'latest' | 'popular' | 'views' | 'rating'
  searchQuery?: string
  minRating?: number // 후기 전용
  difficulty?: WorkItem['difficulty'] // 작품 전용
}

// ============================================================================
// Type Guard 함수
// ============================================================================

/**
 * WorkItem 타입 가드
 */
export function isWorkItem(item: GalleryItem): item is WorkItem {
  return item.type === 'work'
}

/**
 * ReviewItem 타입 가드
 */
export function isReviewItem(item: GalleryItem): item is ReviewItem {
  return item.type === 'review'
}
