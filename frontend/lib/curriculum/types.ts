/**
 * 커리큘럼 통합 타입 정의
 * 
 * 모든 커리큘럼에서 공통으로 사용하는 타입을 정의합니다.
 * 확장성과 유연성을 고려한 설계입니다.
 */

// ============================================================================
// 공통 타입
// ============================================================================

/**
 * 색상 타입 (아이콘 배경 및 텍스트에 사용)
 */
export type IconColorType =
  | "blue"
  | "purple"
  | "green"
  | "orange"
  | "indigo"
  | "cyan"
  | "red"
  | "yellow"
  | "amber"
  | "rose"
  | "teal"
  | "emerald"
  | "pink"
  | "violet"
  | "fuchsia";

/**
 * 난이도 레벨
 */
export type DifficultyLevel = "초급" | "중급" | "고급" | "심화";

/**
 * 학년별 추천 수준
 */
export type RecommendationLevel = "선택" | "권장" | "도전" | null;

// ============================================================================
// 커리큘럼 메타 정보
// ============================================================================

/**
 * 커리큘럼 카테고리
 */
export enum CurriculumCategory {
  AI_CODING = "ai-coding",
  VIBE_CODING = "vibe-coding",
  BLOCK_CODING = "block-coding",
  APP_INVENTOR = "app-inventor",
  ARDUINO = "arduino",
  RASPBERRY_PI = "raspberry-pi",
}

/**
 * 커리큘럼 메타 정보
 */
export interface CurriculumMeta {
  category: CurriculumCategory;
  title: string;
  description: string;
  badge?: string;
  gradientClass: string;
  ctaGradient: string;
  metaTitle: string;
  metaDescription: string;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

// ============================================================================
// 히어로 섹션
// ============================================================================

/**
 * 히어로 Feature 아이템
 */
export interface HeroFeature {
  key: string;
  label: string;
  description: string;
  icon?: string;
}

/**
 * 히어로 섹션 데이터
 */
export interface HeroData {
  badge: string;
  title: string;
  subtitle?: string;
  description: string;
  features?: HeroFeature[];
}

// ============================================================================
// 과정 정보
// ============================================================================

/**
 * 과정 정보 아이템
 */
export interface CourseInfoItem {
  id: string;
  icon: string;
  iconColor: IconColorType;
  label: string;
  value: string;
  order: number;
}

// ============================================================================
// 과정 설명
// ============================================================================

/**
 * 과정 설명 데이터
 */
export interface CourseDescriptionData {
  title: string;
  subtitle?: string;
  description: string;
  highlights?: string[];
}

// ============================================================================
// 학습 목표
// ============================================================================

/**
 * 학습 목표 아이템
 */
export interface LearningGoalItem {
  id: string;
  category: string;
  title: string;
  description: string;
  skills: string[];
  order: number;
}

/**
 * 학습 목표 데이터
 */
export interface LearningGoalsData {
  title: string;
  subtitle?: string;
  goals: LearningGoalItem[];
}

// ============================================================================
// 학습 경로
// ============================================================================

/**
 * 학습 경로 단계
 */
export interface LearningPathStep {
  id: string;
  title: string;
  description: string;
  icon?: string;
  duration?: string;
  order: number;
}

/**
 * 학습 경로 데이터
 */
export interface LearningPathData {
  title: string;
  subtitle?: string;
  description?: string;
  steps: LearningPathStep[];
}

// ============================================================================
// 커리큘럼 (수업 모듈)
// ============================================================================

/**
 * 수업 모듈 아이템
 */
export interface ModuleItem {
  id: string;
  title: string;
  duration: string;
  description: string;
  detailDescription?: string;
  topics?: string[];
  order: number;
}

/**
 * 커리큘럼 탭 (3시간, 6시간, 12시간 등)
 */
export interface CurriculumTab {
  id: string;
  label: string;
  duration: string;
  description?: string;
  modules: ModuleItem[];
  order: number;
}

/**
 * 커리큘럼 데이터
 */
export interface CurriculumData {
  title: string;
  subtitle?: string;
  tabs: CurriculumTab[];
}

// ============================================================================
// 프로젝트
// ============================================================================

/**
 * 프로젝트 아이템
 */
export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  difficulty: DifficultyLevel;
  university?: string;
  duration?: string;
  tags?: string[];
  order: number;
}

/**
 * 프로젝트 데이터
 */
export interface ProjectsData {
  title: string;
  subtitle?: string;
  projects: ProjectItem[];
}

// ============================================================================
// 학년별 추천
// ============================================================================

/**
 * 학년별 추천 아이템
 */
export interface GradeRecommendationItem {
  id: string;
  courseName: string;
  description: string;
  difficulty: DifficultyLevel;
  duration: string;
  elementaryMid?: RecommendationLevel; // 초3-4
  elementaryHigh?: RecommendationLevel; // 초5-6
  middleLow?: RecommendationLevel; // 중1-2
  middleHigh?: RecommendationLevel; // 중3
  high?: RecommendationLevel; // 고등
  order: number;
}

/**
 * 학년별 추천 데이터
 */
export interface GradeRecommendationData {
  title: string;
  subtitle?: string;
  items: GradeRecommendationItem[];
}

// ============================================================================
// 교육 조건
// ============================================================================

/**
 * 교육 조건 아이템
 */
export interface EducationRequirementItem {
  id: string;
  icon: string;
  iconColor: IconColorType;
  title: string;
  description: string;
  details?: string[];
  order: number;
}

/**
 * 교육 조건 데이터
 */
export interface EducationRequirementsData {
  title: string;
  subtitle?: string;
  requirements: EducationRequirementItem[];
}

// ============================================================================
// 수업 자료
// ============================================================================

/**
 * 자료 아이템
 */
export interface MaterialItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  format: string; // PDF, ZIP, etc.
  pages?: string; // "20페이지" or "10파일"
  size: string; // "2.5MB"
  downloadUrl: string;
  order: number;
}

/**
 * 자료 카테고리
 */
export interface MaterialCategory {
  id: string;
  title: string;
  materials: MaterialItem[];
}

/**
 * 수업 자료 데이터
 */
export interface MaterialsData {
  title: string;
  subtitle?: string;
  categories: MaterialCategory[];
}

// ============================================================================
// 갤러리
// ============================================================================

/**
 * 갤러리 탭
 */
export interface GalleryTab {
  id: string;
  label: string;
  images: string[];
}

/**
 * 클래스 갤러리 데이터
 */
export interface ClassGalleryData {
  title: string;
  subtitle?: string;
  tabs: GalleryTab[];
}

// ============================================================================
// CTA (Call to Action)
// ============================================================================

/**
 * CTA 데이터
 */
export interface CtaData {
  title: string;
  description: string;
  primaryButton: {
    text: string;
    link: string;
  };
  secondaryButton?: {
    text: string;
    link: string;
  };
}

// ============================================================================
// 전체 커리큘럼 데이터
// ============================================================================

/**
 * 통합 커리큘럼 데이터 구조
 * 
 * 모든 섹션은 선택적(optional)으로 설정하여
 * 각 커리큘럼의 특성에 맞게 사용 가능
 */
export interface CurriculumFullData {
  meta: CurriculumMeta;
  hero: HeroData;
  courseInfo?: CourseInfoItem[];
  courseDescription?: CourseDescriptionData;
  learningGoals?: LearningGoalsData;
  learningPaths?: Record<string, LearningPathData>; // 여러 경로 지원 (IoT, Vibe 등)
  curriculum?: CurriculumData;
  projects?: ProjectsData;
  gradeRecommendation?: GradeRecommendationData;
  educationRequirements?: EducationRequirementsData;
  materials?: MaterialsData;
  classGallery?: ClassGalleryData;
  cta: CtaData;
}

// ============================================================================
// API 응답 타입
// ============================================================================

/**
 * API 응답 타입
 */
export interface CurriculumApiResponse {
  success: boolean;
  data: CurriculumFullData;
  error?: string;
}

/**
 * API 목록 응답 타입
 */
export interface CurriculumListApiResponse {
  success: boolean;
  data: CurriculumFullData[];
  error?: string;
}

