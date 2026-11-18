/**
 * 커리큘럼 비즈니스 로직 헬퍼 함수들
 * 
 * UI와 독립적인 순수 함수들로 구성
 * 테스트하기 쉽고 재사용 가능
 */

import type {
  CurriculumFullData,
  CourseInfoItem,
  ModuleItem,
  GradeRecommendationItem,
  RecommendationLevel,
  CurriculumTab,
  LearningGoalItem,
  MaterialCategory,
} from "../types";

// ============================================================================
// 데이터 필터링 및 정렬
// ============================================================================

/**
 * 과정 정보를 순서대로 정렬
 */
export function sortCourseInfo(items: CourseInfoItem[]): CourseInfoItem[] {
  return [...items].sort((a, b) => a.order - b.order);
}

/**
 * 모듈을 순서대로 정렬
 */
export function sortModules(modules: ModuleItem[]): ModuleItem[] {
  return [...modules].sort((a, b) => a.order - b.order);
}

/**
 * 커리큘럼 탭을 순서대로 정렬
 */
export function sortCurriculumTabs(tabs: CurriculumTab[]): CurriculumTab[] {
  return [...tabs].sort((a, b) => a.order - b.order);
}

/**
 * 학습 목표를 순서대로 정렬
 */
export function sortLearningGoals(goals: LearningGoalItem[]): LearningGoalItem[] {
  return [...goals].sort((a, b) => a.order - b.order);
}

// ============================================================================
// 학년별 추천 로직
// ============================================================================

/**
 * 학년별 추천 수준에 따른 배지 클래스 반환
 */
export function getRecommendationBadgeClass(
  level: RecommendationLevel
): string {
  switch (level) {
    case "선택":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "권장":
      return "bg-green-100 text-green-700 border-green-200";
    case "도전":
      return "bg-orange-100 text-orange-700 border-orange-200";
    default:
      return "bg-gray-100 text-gray-400 border-gray-200";
  }
}

/**
 * 학년별 추천 수준에 따른 텍스트 반환
 */
export function getRecommendationText(level: RecommendationLevel): string {
  if (!level) return "-";
  return level;
}

/**
 * 특정 학년에 권장되는 과정 필터링
 */
export function filterRecommendedCourses(
  items: GradeRecommendationItem[],
  gradeKey: keyof Pick<
    GradeRecommendationItem,
    "elementaryMid" | "elementaryHigh" | "middleLow" | "middleHigh" | "high"
  >
): GradeRecommendationItem[] {
  return items.filter(
    (item) => item[gradeKey] === "권장" || item[gradeKey] === "도전"
  );
}

// ============================================================================
// 시간 계산 로직
// ============================================================================

/**
 * 총 학습 시간 계산 (모듈 시간 합산)
 */
export function calculateTotalDuration(modules: ModuleItem[]): string {
  let totalMinutes = 0;

  modules.forEach((module) => {
    const match = module.duration.match(/(\d+)분/);
    if (match) {
      totalMinutes += parseInt(match[1], 10);
    }
  });

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0 && minutes > 0) {
    return `${hours}시간 ${minutes}분`;
  } else if (hours > 0) {
    return `${hours}시간`;
  } else {
    return `${minutes}분`;
  }
}

/**
 * 커리큘럼 탭별 총 시간 계산
 */
export function calculateTabDuration(tab: CurriculumTab): string {
  return calculateTotalDuration(tab.modules);
}

// ============================================================================
// 텍스트 포맷팅
// ============================================================================

/**
 * 난이도 텍스트에 따른 색상 클래스 반환
 */
export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case "초급":
      return "text-green-600";
    case "중급":
      return "text-blue-600";
    case "고급":
      return "text-orange-600";
    case "심화":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
}

/**
 * 난이도 배지 클래스 반환
 */
export function getDifficultyBadgeClass(difficulty: string): string {
  switch (difficulty) {
    case "초급":
      return "bg-green-100 text-green-700 border-green-200";
    case "중급":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "고급":
      return "bg-orange-100 text-orange-700 border-orange-200";
    case "심화":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

/**
 * 파일 크기를 사람이 읽기 쉬운 형식으로 변환
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

// ============================================================================
// 데이터 검증
// ============================================================================

/**
 * 커리큘럼 데이터 유효성 검사
 */
export function validateCurriculumData(
  data: CurriculumFullData
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // 필수 필드 검사
  if (!data.meta) errors.push("메타 정보가 없습니다.");
  if (!data.hero) errors.push("히어로 섹션이 없습니다.");
  if (!data.cta) errors.push("CTA 섹션이 없습니다.");

  // 메타 정보 검증
  if (data.meta) {
    if (!data.meta.title) errors.push("제목이 없습니다.");
    if (!data.meta.category) errors.push("카테고리가 없습니다.");
  }

  // 히어로 섹션 검증
  if (data.hero) {
    if (!data.hero.title) errors.push("히어로 제목이 없습니다.");
    if (!data.hero.description) errors.push("히어로 설명이 없습니다.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * 데이터가 비어있는지 확인
 */
export function isEmptyData(data: any): boolean {
  if (data === null || data === undefined) return true;
  if (Array.isArray(data)) return data.length === 0;
  if (typeof data === "object") return Object.keys(data).length === 0;
  return false;
}

// ============================================================================
// 검색 및 필터링
// ============================================================================

/**
 * 키워드로 모듈 검색
 */
export function searchModules(
  modules: ModuleItem[],
  keyword: string
): ModuleItem[] {
  const lowerKeyword = keyword.toLowerCase();
  return modules.filter(
    (module) =>
      module.title.toLowerCase().includes(lowerKeyword) ||
      module.description.toLowerCase().includes(lowerKeyword) ||
      module.topics?.some((topic) => topic.toLowerCase().includes(lowerKeyword))
  );
}

/**
 * 난이도로 과정 필터링
 */
export function filterByDifficulty(
  items: GradeRecommendationItem[],
  difficulty: string
): GradeRecommendationItem[] {
  return items.filter((item) => item.difficulty === difficulty);
}

// ============================================================================
// 통계 계산
// ============================================================================

/**
 * 커리큘럼 통계 계산
 */
export function calculateCurriculumStats(data: CurriculumFullData) {
  const stats = {
    totalModules: 0,
    totalDuration: "",
    totalProjects: 0,
    totalMaterials: 0,
    difficultyLevels: new Set<string>(),
  };

  // 모듈 수 계산
  if (data.curriculum) {
    data.curriculum.tabs.forEach((tab) => {
      stats.totalModules += tab.modules.length;
    });
  }

  // 프로젝트 수
  if (data.projects) {
    stats.totalProjects = data.projects.projects.length;
  }

  // 자료 수
  if (data.materials) {
    data.materials.categories.forEach((category) => {
      stats.totalMaterials += category.materials.length;
    });
  }

  // 난이도 레벨
  if (data.gradeRecommendation) {
    data.gradeRecommendation.items.forEach((item) => {
      stats.difficultyLevels.add(item.difficulty);
    });
  }

  return stats;
}

// ============================================================================
// 자료 다운로드 헬퍼
// ============================================================================

/**
 * 자료 카테고리별 그룹화
 */
export function groupMaterialsByCategory(
  categories: MaterialCategory[]
): Record<string, MaterialCategory> {
  return categories.reduce(
    (acc, category) => {
      acc[category.id] = category;
      return acc;
    },
    {} as Record<string, MaterialCategory>
  );
}

/**
 * 다운로드 가능한 자료만 필터링
 */
export function filterDownloadableMaterials(categories: MaterialCategory[]) {
  return categories.map((category) => ({
    ...category,
    materials: category.materials.filter((material) => material.downloadUrl),
  }));
}

// ============================================================================
// URL 헬퍼
// ============================================================================

/**
 * 커리큘럼 상세 페이지 URL 생성
 */
export function getCurriculumUrl(category: string): string {
  return `/curriculum/${category}`;
}

/**
 * 문의 페이지 URL 생성
 */
export function getInquiryUrl(): string {
  return "/inquiry";
}

/**
 * 일정 보기 URL 생성
 */
export function getScheduleUrl(): string {
  return "/inquiry/schedule";
}

