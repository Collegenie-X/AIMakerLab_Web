/**
 * 제품(Products) 비즈니스 모델 타입 정의
 * - 모든 제품 관련 데이터 구조를 정의합니다
 * - Backend API 응답 형식과 일치하도록 설계되었습니다
 */

// ============================================================================
// 기본 제품 타입
// ============================================================================

/**
 * 제품 목록 아이템 (리스트용)
 */
export interface Product {
  id: string
  category: string
  title: string
  shortDescription: string
  educationalValue: string
  classroomUse: string
  image: string
  images?: string[]
  price: string
  originalPrice?: string
  discount: number
  targetGrade: string
  gradeDetail: string
  classTime: string
  groupSize: string
  rating: number
  reviews: number
  soldCount: number
  badges: string[]
  features: string[]
}

/**
 * 제품 상세 정보
 */
export interface ProductDetail extends Product {
  // 키트 이미지
  kitImages?: KitImage[]
  
  // 시연 영상/이미지
  productDemos?: ProductDemo[]
  
  // 간단한 커리큘럼 (3차시 요약)
  simpleCurriculum?: SimpleCurriculumItem[]
  
  // 수업 활동 사진
  activityPhotos?: ActivityPhoto[]
  
  // 구성품 테이블
  componentsTable?: ComponentTableItem[]
  
  // 기술 설명
  technologies?: Technology[]
  
  // 상세 구성품
  components?: Component[]
  
  // 상세 커리큘럼
  curriculum?: CurriculumSession[]
  
  // 조립 가이드
  assemblySteps?: AssemblyStep[]
}

// ============================================================================
// 제품 상세 관련 타입
// ============================================================================

/**
 * 키트 이미지 (패키지, 조립 완성품)
 */
export interface KitImage {
  type: 'package' | 'assembled'
  image: string
  title: string
  description: string
  size?: string
}

/**
 * 제품 시연 (영상/이미지)
 */
export interface ProductDemo {
  type: 'video' | 'image'
  url: string
  thumbnail?: string
  title: string
  description: string
}

/**
 * 간단한 커리큘럼 아이템 (3차시 요약용)
 */
export interface SimpleCurriculumItem {
  session: number
  title: string
  summary: string
  icon: string
}

/**
 * 수업 활동 사진
 */
export interface ActivityPhoto {
  image: string
  title: string
  description: string
}

/**
 * 구성품 테이블 아이템
 */
export interface ComponentTableItem {
  name: string
  quantity: number
  specification: string
  purpose: string
}

/**
 * 기술 설명
 */
export interface Technology {
  title: string
  description: string
  image: string
  keywords: string[]
}

/**
 * 상세 구성품
 */
export interface Component {
  name: string
  description: string
  image: string
  educationalValue: string
  features: string[]
}

/**
 * 상세 커리큘럼 세션
 */
export interface CurriculumSession {
  session: number
  title: string
  duration: string
  objectives: string[]
  activities: CurriculumActivity[]
  materials: string[]
  teachingTips: string
}

/**
 * 커리큘럼 활동
 */
export interface CurriculumActivity {
  time: string
  activity: string
  description: string
}

/**
 * 조립 가이드 단계
 */
export interface AssemblyStep {
  step: number
  title: string
  description: string
  image: string
  tips: string
}

// ============================================================================
// 리뷰 관련 타입
// ============================================================================

/**
 * 제품 리뷰
 */
export interface ProductReview {
  id: string
  productId: string
  authorName: string
  authorRole: string
  authorSchool: string
  rating: number
  date: string
  content: string
  photos: string[]
  likes: number
  helpful: number
}

// ============================================================================
// 수업/클래스 관련 타입
// ============================================================================

/**
 * 관련 수업 (방문 수업, 온라인 수업)
 */
export interface RelatedClass {
  id: string
  title: string
  type: string
  category: string
  image: string
  description: string
  duration: string
  targetGrade: string
  classSize: string
  includedKit: string
  link: string
}

/**
 * 수업 현장 사진
 */
export interface ClassroomPhoto {
  id: string
  productId: string
  title: string
  description: string
  image: string
  school: string
  grade: string
  subject: string
}

// ============================================================================
// 필터 및 카테고리 타입
// ============================================================================

/**
 * 카테고리
 */
export interface Category {
  id: string
  name: string
}

/**
 * 학년
 */
export interface Grade {
  id: string
  name: string
}

/**
 * 정렬 옵션
 */
export interface SortOption {
  value: string
  label: string
}

/**
 * 제품 필터 파라미터
 */
export interface ProductFilterParams {
  category?: string
  grade?: string
  minPrice?: number
  maxPrice?: number
  sortBy?: string
}

// ============================================================================
// API 응답 타입
// ============================================================================

/**
 * 제품 목록 API 응답
 */
export interface ProductsResponse {
  products: Product[]
  total: number
  page: number
  pageSize: number
}

/**
 * 제품 상세 API 응답
 */
export interface ProductDetailResponse {
  product: ProductDetail
  reviews: ProductReview[]
  relatedClasses: RelatedClass[]
  classroomPhotos: ClassroomPhoto[]
}

/**
 * API 에러 응답
 */
export interface ApiError {
  message: string
  code?: string
  details?: unknown
}

