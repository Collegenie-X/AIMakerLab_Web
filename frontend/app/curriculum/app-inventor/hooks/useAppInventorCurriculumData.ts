import { useState, useEffect } from "react";

/**
 * 앱 인벤터 커리큘럼 데이터 타입 정의
 */

// 히어로 섹션 Feature 아이템
export interface HeroFeatureItem {
  icon: string; // 아이콘 이름 (예: "Blocks", "Smartphone")
  label: string; // 라벨 텍스트
}

export interface AppInventorHeroData {
  badge: string;
  title: string;
  description: string;
  imageUrl: string;
  features?: HeroFeatureItem[]; // 선택적 features 배열
}

export interface CourseInfoItem {
  id: string;
  icon: string;
  iconColor: string;
  label: string;
  value: string;
}

export interface CourseDescriptionData {
  title: string;
  paragraphs: string[];
}

export interface CurriculumModule {
  id: string;
  title: string;
  duration: string;
  topics: string[];
  detailDescription?: string;
}

export interface CurriculumTab {
  id: string;
  label: string;
  duration: string;
  description: string;
  modules: CurriculumModule[];
}

export interface CurriculumData {
  title: string;
  tabs: CurriculumTab[];
}

export interface EducationRequirementItem {
  id: string;
  icon: string;
  iconColor: string;
  title: string;
  description: string;
  details: string[];
}

export interface EducationRequirementsData {
  title: string;
  items: EducationRequirementItem[];
}

export interface LearningGoal {
  id: string;
  category: string;
  title: string;
  description: string;
  skills: string[];
}

export interface LearningGoalsData {
  title: string;
  description: string;
  goals: LearningGoal[];
  achievements: string[];
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  date?: string;
  tags: string[];
  student?: string;
  features?: string[];
  content?: string;
  author?: string;
  rating?: number;
}

export interface GalleryTab {
  id: string;
  label: string;
  items: GalleryItem[];
}

export interface GalleryData {
  title: string;
  description: string;
  tabs: GalleryTab[];
}

export interface CtaData {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export interface MaterialItem {
  id: string;
  title: string;
  description: string;
  format: string;
  size: string;
  pages: string;
  downloadUrl: string;
  icon: string;
}

export interface MaterialCategory {
  id: string;
  title: string;
  description: string;
  items: MaterialItem[];
}

export interface MaterialsData {
  title: string;
  description: string;
  categories: MaterialCategory[];
}

export interface GradeRecommendation {
  "elementary-mid": string | null;
  "elementary-high": string | null;
  "middle-low": string | null; // 중1-2
  "middle-high": string | null; // 중3
  "high": string | null;
}

export interface Course {
  id: string;
  courseName: string;
  duration: string;
  difficulty: string;
  recommendedGrades: GradeRecommendation;
  description: string;
}

export interface GradeRecommendationData {
  title: string;
  description: string;
  programName: string;
  headers: string[];
  courses: Course[];
  legend: {
    recommended: string;
    optional: string;
    challenge: string;
  };
}

export interface AppInventorCurriculumData {
  hero: AppInventorHeroData;
  courseInfo: CourseInfoItem[];
  description: CourseDescriptionData;
  educationRequirements: EducationRequirementsData;
  learningGoals: LearningGoalsData;
  gradeRecommendation: GradeRecommendationData;
  curriculum: CurriculumData;
  gallery: GalleryData;
  materials: MaterialsData;
  cta: CtaData;
}

/**
 * 앱 인벤터 커리큘럼 데이터를 가져오는 커스텀 훅
 * JSON 파일에서 데이터를 로드하고 상태로 관리합니다.
 */
export function useAppInventorCurriculumData() {
  const [data, setData] = useState<AppInventorCurriculumData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // 데이터 로드 함수
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/curriculum/app-inventor.json");
        
        if (!response.ok) {
          throw new Error(`데이터를 불러오는데 실패했습니다: ${response.status}`);
        }

        const jsonData = await response.json();
        setData(jsonData);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err : new Error("알 수 없는 오류가 발생했습니다");
        setError(errorMessage);
        console.error("앱 인벤터 데이터 로드 실패:", errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    data,
    isLoading,
    error,
  };
}

