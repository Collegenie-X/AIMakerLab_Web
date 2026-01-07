/**
 * 커리큘럼 데이터 Hook (React-Query 사용)
 * 
 * 기능:
 * - JSON 파일 또는 API에서 커리큘럼 데이터 페칭
 * - 30분 캐시 유지
 * - 로딩 및 에러 상태 관리
 * - 자동 재시도
 */

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import type {
  CurriculumFullData,
  CurriculumCategory,
  CurriculumApiResponse,
} from "../types";

// ============================================================================
// 설정
// ============================================================================

/**
 * React-Query 캐시 설정
 */
const QUERY_CONFIG = {
  staleTime: 30 * 60 * 1000, // 30분 (데이터가 fresh 상태 유지)
  cacheTime: 30 * 60 * 1000, // 30분 (캐시 보관 시간)
  retry: 2, // 실패 시 2번 재시도
  refetchOnWindowFocus: false, // 창 포커스 시 재요청 안 함
};

/**
 * API 엔드포인트 설정
 */
const API_CONFIG = {
  // 개발 환경: JSON 파일 사용
  useMockData: process.env.NODE_ENV === "development",
  jsonBasePath: "/curriculum",
  // 프로덕션 환경: 백엔드 API 사용
  apiBasePath: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api",
};

// ============================================================================
// 데이터 페칭 함수
// ============================================================================

/**
 * JSON 파일에서 커리큘럼 데이터 가져오기
 */
async function fetchCurriculumFromJson(
  category: CurriculumCategory
): Promise<CurriculumFullData> {
  const url = `${API_CONFIG.jsonBasePath}/${category}.json`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

/**
 * 백엔드 API에서 커리큘럼 데이터 가져오기
 */
async function fetchCurriculumFromApi(
  category: CurriculumCategory
): Promise<CurriculumFullData> {
  const url = `${API_CONFIG.apiBasePath}/curriculum/${category}/`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const apiResponse: CurriculumApiResponse = await response.json();

  if (!apiResponse.success) {
    throw new Error(apiResponse.error || "API 오류");
  }

  return apiResponse.data;
}

/**
 * 통합 데이터 페칭 함수
 * 환경에 따라 JSON 또는 API에서 데이터 가져오기
 */
async function fetchCurriculum(
  category: CurriculumCategory
): Promise<CurriculumFullData> {
  if (API_CONFIG.useMockData) {
    return fetchCurriculumFromJson(category);
  } else {
    return fetchCurriculumFromApi(category);
  }
}

// ============================================================================
// React-Query Hook
// ============================================================================

/**
 * 커리큘럼 데이터 Hook
 * 
 * @param category - 커리큘럼 카테고리
 * @returns React-Query 결과 객체
 * 
 * @example
 * ```tsx
 * const { data, isLoading, error } = useCurriculum(CurriculumCategory.AI_CODING);
 * 
 * if (isLoading) return <div>로딩 중...</div>;
 * if (error) return <div>에러: {error.message}</div>;
 * 
 * return <div>{data.hero.title}</div>;
 * ```
 */
export function useCurriculum(
  category: CurriculumCategory
): UseQueryResult<CurriculumFullData, Error> {
  return useQuery<CurriculumFullData, Error>({
    queryKey: ["curriculum", category],
    queryFn: () => fetchCurriculum(category),
    ...QUERY_CONFIG,
  });
}

// ============================================================================
// 추가 유틸리티 Hook
// ============================================================================

/**
 * 특정 섹션만 가져오는 Hook
 * 
 * @example
 * ```tsx
 * const heroData = useCurriculumSection(CurriculumCategory.AI_CODING, 'hero');
 * ```
 */
export function useCurriculumSection<K extends keyof CurriculumFullData>(
  category: CurriculumCategory,
  section: K
): UseQueryResult<CurriculumFullData[K], Error> {
  const query = useCurriculum(category);

  return {
    ...query,
    data: query.data?.[section],
  } as UseQueryResult<CurriculumFullData[K], Error>;
}

/**
 * 여러 커리큘럼을 한 번에 가져오는 Hook
 * 
 * @example
 * ```tsx
 * const queries = useCurriculums([
 *   CurriculumCategory.AI_CODING,
 *   CurriculumCategory.ARDUINO
 * ]);
 * ```
 */
export function useCurriculums(
  categories: CurriculumCategory[]
): UseQueryResult<CurriculumFullData, Error>[] {
  return categories.map((category) => useCurriculum(category));
}

// ============================================================================
// Prefetch Hook (페이지 전환 전에 데이터 미리 로드)
// ============================================================================

/**
 * 커리큘럼 데이터 Prefetch Hook
 * 
 * @example
 * ```tsx
 * function CurriculumCard() {
 *   const prefetch = usePrefetchCurriculum();
 *   
 *   return (
 *     <Link
 *       href="/curriculum/ai-coding"
 *       onMouseEnter={() => prefetch(CurriculumCategory.AI_CODING)}
 *     >
 *       AI 코딩
 *     </Link>
 *   );
 * }
 * ```
 */
export function usePrefetchCurriculum() {
  const queryClient = useQueryClient();

  return (category: CurriculumCategory) => {
    queryClient.prefetchQuery({
      queryKey: ["curriculum", category],
      queryFn: () => fetchCurriculum(category),
      ...QUERY_CONFIG,
    });
  };
}

// React-Query의 useQueryClient import 추가
import { useQueryClient } from "@tanstack/react-query";

