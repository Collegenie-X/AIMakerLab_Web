import { useState, useEffect } from "react";

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

/**
 * 심화 교육 커리큘럼 데이터 타입 정의
 */

// 히어로 섹션 Feature 아이템
export interface HeroFeatureItem {
  icon: string; // 아이콘 이름 (예: "Rocket", "Cog")
  label: string; // 라벨 텍스트
}

// 히어로 섹션
export interface ScienceHeroData {
  badge: string;
  title: string;
  description: string;
  features?: HeroFeatureItem[]; // 선택적 features 배열
}

// 학습 단계 구조도
export interface LearningStep {
  id: string;
  title: string;
  description: string;
  duration?: string;
  emphasis?: boolean;
}

export interface LearningPathData {
  title: string;
  description?: string;
  steps: LearningStep[];
}

export interface LearningPathsData {
  iot?: LearningPathData;
  vibe?: LearningPathData;
}

// 전체 커리큘럼 데이터
export interface ScienceCurriculumData {
  hero: ScienceHeroData;
  courseInfo: CourseInfoItem[];
  courseDescription: CourseDescriptionData;
  learningPath?: LearningPathsData;
  learningGoals: LearningGoalsData;
  curriculum: CurriculumData;
  gradeRecommendation: GradeRecommendationData;
  educationRequirements: EducationRequirementsData;
  materials: MaterialsData;
  classGallery?: ClassGalleryData;
  cta: CtaData;
}

/**
 * 심화 교육 커리큘럼 데이터 Hook
 * JSON 파일에서 데이터를 가져와 상태로 관리합니다
 */
export function useScienceCurriculumData() {
  const [data, setData] = useState<ScienceCurriculumData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Early return: 데이터 중복 로딩 방지
    if (data) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/curriculum/science.json");

        // Early return: 응답 실패 시
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.error("심화 교육 커리큘럼 데이터 로딩 실패:", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [data]);

  return { data, loading, error };
}

