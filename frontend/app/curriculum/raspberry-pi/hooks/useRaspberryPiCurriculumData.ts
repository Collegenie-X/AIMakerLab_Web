import { useState, useEffect } from "react";

/**
 * Raspberry Pi 커리큘럼 데이터 타입 정의
 */

// 히어로 섹션
export interface RaspberryPiHeroData {
  badge: string;
  title: string;
  description: string;
}

// 과정 정보 카드
export interface CourseInfoItem {
  id: string;
  icon: string;
  iconColor: string;
  label: string;
  value: string;
}

// 과정 소개
export interface CourseDescriptionData {
  title: string;
  paragraphs: string[];
  images?: {
    src: string;
    alt: string;
  }[];
}

// 학습 목표
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

// 프로젝트
export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  iconColor: string;
  difficulty: string;
  university: string;
  technologies: string[];
  features: string[];
}

export interface ProjectsData {
  title: string;
  description: string;
  items: ProjectItem[];
}

// 커리큘럼 모듈
export interface CurriculumModule {
  id: string;
  title: string;
  duration: string;
  detailDescription: string;
  topics: string[];
}

export interface CurriculumTab {
  id: string;
  label: string;
  duration: string;
  description: string;
  modules: CurriculumModule[];
}

export interface CurriculumProject {
  id: string;
  title: string;
  difficulty: string;
  university: string;
  tabs: CurriculumTab[];
}

export interface CurriculumData {
  title: string;
  description: string;
  projects: CurriculumProject[];
}

// 학년별 추천
export interface GradeRecommendation {
  "elementary-mid": string | null;
  "elementary-high": string | null;
  "middle-low": string | null;
  "middle-high": string | null;
  high: string | null;
}

export interface GradeCourse {
  id: string;
  courseName: string;
  description: string;
  difficulty: string;
  duration: string;
  recommendedGrades: GradeRecommendation;
}

export interface GradeRecommendationData {
  title: string;
  description: string;
  programName: string;
  headers: string[];
  courses: GradeCourse[];
  legend: {
    recommended: string;
    optional: string;
    challenge: string;
  };
}

// 교육 조건
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

// 수업 자료
export interface MaterialItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  format: string;
  pages: string;
  size: string;
  downloadUrl: string;
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

// 갤러리 섹션
export interface GalleryImage {
  src: string;
  alt: string;
  category?: string;
}

export interface GalleryData {
  title: string;
  description?: string;
  images: GalleryImage[];
}

// 클래스 갤러리 섹션 (탭 버전)
export interface ClassGalleryItem {
  src: string;
  alt: string;
  description: string;
}

export interface ClassGalleryTab {
  id: string;
  label: string;
  items: ClassGalleryItem[];
}

export interface ClassGalleryData {
  title: string;
  description?: string;
  tabs: ClassGalleryTab[];
}

// CTA 섹션
export interface CtaData {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

// 전체 커리큘럼 데이터
export interface RaspberryPiCurriculumData {
  hero: RaspberryPiHeroData;
  courseInfo: CourseInfoItem[];
  courseDescription: CourseDescriptionData;
  learningGoals: LearningGoalsData;
  projects: ProjectsData;
  curriculum: CurriculumData;
  gradeRecommendation: GradeRecommendationData;
  educationRequirements: EducationRequirementsData;
  materials: MaterialsData;
  gallery?: GalleryData;
  classGallery?: ClassGalleryData;
  cta: CtaData;
}

/**
 * Raspberry Pi 커리큘럼 데이터 Hook
 * JSON 파일에서 데이터를 가져와 상태로 관리합니다
 */
export function useRaspberryPiCurriculumData() {
  const [data, setData] = useState<RaspberryPiCurriculumData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Early return: 데이터 중복 로딩 방지
    if (data) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/curriculum/raspberry-pi.json");

        // Early return: 응답 실패 시
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.error("Raspberry Pi 커리큘럼 데이터 로딩 실패:", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [data]);

  return { data, loading, error };
}

