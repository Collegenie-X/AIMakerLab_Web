import { useState, useEffect } from "react";

/**
 * 아두이노 커리큘럼 데이터 타입 정의
 */
export interface ArduinoHeroData {
  badge: string;
  title: string;
  description: string;
  imageUrl: string;
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

export interface ProjectCurriculum {
  id: string;
  title: string;
  difficulty: string;
  tabs: CurriculumTab[];
}

export interface CurriculumData {
  title: string;
  description: string;
  projects: ProjectCurriculum[];
}

export interface LearningStage {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
  color: string;
}

export interface LearningPathData {
  title: string;
  description: string;
  stages: LearningStage[];
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
  "middle-low": string | null;
  "middle-high": string | null;
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

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  iconColor: string;
  description: string;
  technologies: string[];
  features: string[];
  difficulty: string;
  imageUrl: string;
  gradeRecommendation: GradeRecommendation;
}

export interface ProjectCategory {
  id: string;
  title: string;
  difficulty: string;
  description: string;
  recommendedGrades: string[];
  projects: ProjectItem[];
}

export interface ProjectsData {
  title: string;
  description: string;
  categories: ProjectCategory[];
}

export interface ArduinoCurriculumData {
  hero: ArduinoHeroData;
  courseInfo: CourseInfoItem[];
  description: CourseDescriptionData;
  learningPath: LearningPathData;
  educationRequirements: EducationRequirementsData;
  learningGoals: LearningGoalsData;
  projects: ProjectsData;
  curriculum: CurriculumData;
  gallery: GalleryData;
  materials: MaterialsData;
  cta: CtaData;
}

/**
 * 아두이노 커리큘럼 데이터를 가져오는 커스텀 훅
 * JSON 파일에서 데이터를 로드하고 상태로 관리합니다.
 */
export function useArduinoCurriculumData() {
  const [data, setData] = useState<ArduinoCurriculumData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // 데이터 로드 함수
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/curriculum/arduino.json");
        
        if (!response.ok) {
          throw new Error(`데이터를 불러오는데 실패했습니다: ${response.status}`);
        }

        const jsonData = await response.json();
        setData(jsonData);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err : new Error("알 수 없는 오류가 발생했습니다");
        setError(errorMessage);
        console.error("아두이노 데이터 로드 실패:", errorMessage);
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

