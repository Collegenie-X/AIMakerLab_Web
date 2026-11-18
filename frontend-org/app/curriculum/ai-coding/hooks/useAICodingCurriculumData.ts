import { useState, useEffect } from "react";

/**
 * 공통 인터페이스 재사용 (다른 커리큘럼에서 가져옴)
 */
import type {
  CourseInfoItem,
  CourseDescriptionData,
  LearningGoalsData,
  CurriculumData,
  GradeRecommendationData,
  EducationRequirementsData,
  MaterialsData,
  ClassGalleryData,
  CtaData,
} from "../../raspberry-pi/hooks/useRaspberryPiCurriculumData";

/**
 * 학습 단계 구조도 타입 (Science 커리큘럼에서 재사용)
 */
import type {
  LearningPathData,
} from "../../vive-coding/hooks/useAICodingCurriculumData";

/**
 * AI 코딩 커리큘럼 전용 타입 정의
 */

// 히어로 섹션 Feature 아이템
export interface HeroFeatureItem {
  icon: string; // 아이콘 이름 (예: "MessageSquare", "Brain", "Code")
  label: string; // 라벨 텍스트
}

// 히어로 섹션
export interface AICodingHeroData {
  badge: string;
  title: string;
  description: string;
  features?: HeroFeatureItem[]; // 선택적 features 배열
}

// AI 코딩 학습 경로 (트랙별)
export interface AICodingLearningPathsData {
  iot?: LearningPathData; // IoT 컴퓨터 비전 프로젝트
  vibe?: LearningPathData; // 바이브 코딩 서비스 개발
}

/**
 * AI 코딩 전체 커리큘럼 데이터 인터페이스
 * JSON 파일의 구조와 동일하게 설계
 */
export interface AICodingCurriculumData {
  hero: AICodingHeroData;
  courseInfo: CourseInfoItem[];
  courseDescription: CourseDescriptionData;
  learningPath?: AICodingLearningPathsData;
  learningGoals: LearningGoalsData;
  curriculum: CurriculumData;
  gradeRecommendation: GradeRecommendationData;
  educationRequirements: EducationRequirementsData;
  materials: MaterialsData;
  classGallery?: ClassGalleryData;
  cta: CtaData;
}

/**
 * AI 코딩 커리큘럼 데이터 Hook (비즈니스 로직)
 * 
 * 책임:
 * - JSON 파일에서 데이터를 가져옴
 * - 로딩 상태 관리
 * - 에러 처리
 * 
 * @returns {object} data, loading, error 상태
 */
export function useAICodingCurriculumData() {
  const [data, setData] = useState<AICodingCurriculumData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Early return: 데이터 중복 로딩 방지
    if (data) return;

    /**
     * JSON 데이터 페칭 함수
     * /public/curriculum/ai-coding.json 파일을 가져옴
     */
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/curriculum/ai-coding.json");

        // Early return: 응답 실패 시
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.error("AI 코딩 커리큘럼 데이터 로딩 실패:", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [data]);

  return { data, loading, error };
}

