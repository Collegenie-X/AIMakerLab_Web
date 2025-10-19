import { useState, useEffect } from "react";

// Raspberry Pi hooks를 참고하여 동일한 구조 사용
// 공통 인터페이스 재사용
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

// 학습 단계 구조도 (Science에서 재사용)
import type {
  LearningPathData,
  LearningPathsData,
} from "../../science/hooks/useScienceCurriculumData";

/**
 * AI 교육 커리큘럼 데이터 타입 정의
 */

// 히어로 섹션
export interface AIEducationHeroData {
  badge: string;
  title: string;
  description: string;
}

// AI 교육 학습 경로 (학년별 트랙)
export interface AILearningPathsData {
  elementary?: LearningPathData; // 초등 4-6학년
  middleSchool?: LearningPathData; // 중학 1-2학년
  highSchool?: LearningPathData; // 중3, 고1-2학년
}

// 전체 커리큘럼 데이터
export interface AIEducationCurriculumData {
  hero: AIEducationHeroData;
  courseInfo: CourseInfoItem[];
  courseDescription: CourseDescriptionData;
  learningPath?: AILearningPathsData;
  learningGoals: LearningGoalsData;
  curriculum: CurriculumData;
  gradeRecommendation: GradeRecommendationData;
  educationRequirements: EducationRequirementsData;
  materials: MaterialsData;
  classGallery?: ClassGalleryData;
  cta: CtaData;
}

/**
 * AI 교육 커리큘럼 데이터 Hook
 * JSON 파일에서 데이터를 가져와 상태로 관리합니다
 */
export function useAIEducationCurriculumData() {
  const [data, setData] = useState<AIEducationCurriculumData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Early return: 데이터 중복 로딩 방지
    if (data) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/curriculum/ai-education.json");

        // Early return: 응답 실패 시
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.error("AI 교육 커리큘럼 데이터 로딩 실패:", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [data]);

  return { data, loading, error };
}

