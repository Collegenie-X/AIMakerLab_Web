"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useViveCodingCurriculumData } from "./hooks/useAICodingCurriculumData";
import { VIVE_CODING_CONFIG } from "./config";
import {
  HeroSection,
  CourseInfoSection,
  CourseDescriptionSection,
  LearningPathSection,
  LearningGoalsSection,
  ProjectCurriculumSection,
  GradeRecommendationTable,
  EducationRequirementsSection,
  ClassGallerySection,
  MaterialsDownloadSection,
  CtaSection,
} from "../components";
import { BookOpen, Factory, Target, Search, Cog } from "lucide-react";

/**
 * 바이브 코딩 프로그램 메인 페이지
 * IoT 제작 & 바이브 코딩 서비스 개발
 */
export default function ViveCodingCurriculumPage() {
  const { data, loading, error } = useViveCodingCurriculumData();

  // 로딩 상태
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-orange-600 border-t-transparent mx-auto"></div>
          <p className="text-gray-600">바이브 코딩 과정 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">데이터를 불러오는 중 오류가 발생했습니다.</p>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  // Early return: 데이터가 없으면 빈 상태 표시
  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">데이터를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const { gradients, layout, iconColors, tabs } = VIVE_CODING_CONFIG;

  // 아이콘 문자열을 실제 아이콘 컴포넌트로 매핑
  const iconMap: Record<string, any> = {
    BookOpen,
    Factory,
    Target,
    Search,
    Cog,
  };

  // JSON 데이터의 features를 실제 아이콘 컴포넌트와 매핑
  const heroFeatures = data.hero.features?.map((feature) => ({
    icon: iconMap[feature.icon] || BookOpen,
    label: feature.label,
  })) || [];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* 히어로 섹션 */}
        <HeroSection
          badge={data.hero.badge}
          badgeIcon={BookOpen}
          title={data.hero.title}
          description={data.hero.description}
          gradientClass={gradients.hero}
          containerClass={layout.containerClass}
          features={heroFeatures}
        />

        {/* 과정 정보 */}
        <CourseInfoSection
          data={data.courseInfo}
          iconColors={iconColors}
          containerClass={layout.containerClass}
        />

  

        {/* 과정 소개 */}
        <CourseDescriptionSection
          title={data.courseDescription.title}
          paragraphs={data.courseDescription.paragraphs}
          images={data.courseDescription.images}
          containerClass={layout.containerClass}
        />

              {/* 학년별 추천 */}
              {data.gradeRecommendation && (
          <GradeRecommendationTable
            title={data.gradeRecommendation.title}
            description={data.gradeRecommendation.description}
            programName={data.gradeRecommendation.programName}
            headers={data.gradeRecommendation.headers}
            courses={data.gradeRecommendation.courses}
            legend={data.gradeRecommendation.legend}
            containerClass={layout.containerClass}
            primaryColor="orange"
          />
        )}

        {/* 학습 목표 */}
        <LearningGoalsSection
          title={data.learningGoals.title}
          description={data.learningGoals.description}
          goals={data.learningGoals.goals}
          achievements={data.learningGoals.achievements}
          containerClass={layout.containerClass}
          primaryColor="orange"
          gradientClass="from-orange-600 to-red-600"
        />

        {/* 학습 단계 구조도 - 1단계 */}
        {data.learningPath?.stage1 && (
          <LearningPathSection
            title={data.learningPath.stage1.title}
            description={data.learningPath.stage1.description}
            steps={data.learningPath.stage1.steps}
            containerClass={layout.containerClass}
            primaryColor="orange"
          />
        )}

        {/* 학습 단계 구조도 - 2단계 */}
        {data.learningPath?.stage2 && (
          <LearningPathSection
            title={data.learningPath.stage2.title}
            description={data.learningPath.stage2.description}
            steps={data.learningPath.stage2.steps}
            containerClass={layout.containerClass}
            primaryColor="orange"
          />
        )}

        {/* 커리큘럼 - 독립적인 2단계 과정 */}
        <ProjectCurriculumSection
          title="장인 vs 공장 커리큘럼"
          description="1단계: 수동 제작 장인 (중학생) | 2단계: 자동 생성 공장 (고등학생)"
          projects={data.curriculum.projects}
          containerClass={layout.containerClass}
          projectTabActiveClass="bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg"
          projectTabInactiveClass="bg-gray-100 text-gray-700 hover:bg-gray-200"
          durationTabActiveClass="bg-orange-600 text-white shadow-md"
          durationTabInactiveClass="bg-gray-100 text-gray-600 hover:bg-gray-200"
          primaryColor="orange"
        />

        {/* 교육 조건 */}
        <EducationRequirementsSection
          title={data.educationRequirements.title}
          subtitle="바이브 코딩을 위한 준비 사항"
          items={data.educationRequirements.items}
          iconColors={iconColors}
          containerClass={layout.containerClass}
          primaryColor="orange"
        />

        {/* 수업 현장 및 학생 작품 */}
        {data.classGallery && (
          <ClassGallerySection
            title={data.classGallery.title}
            description={data.classGallery.description}
            tabs={data.classGallery.tabs}
            containerClass={layout.containerClass}
            activeTabClass={tabs.activeTabClass}
            inactiveTabClass={tabs.inactiveTabClass}
            primaryColor="orange"
          />
        )}

        {/* 수업 자료 다운로드 */}
        {data.materials && (
          <MaterialsDownloadSection
            title={data.materials.title}
            description={data.materials.description}
            categories={data.materials.categories}
            containerClass={layout.containerClass}
            primaryColor="orange"
          />
        )}

        {/* CTA */}
        <CtaSection
          title={data.cta.title}
          description={data.cta.description}
          buttonText={data.cta.buttonText}
          buttonLink={data.cta.buttonLink}
          bgClass={gradients.cta}
          containerClass={layout.containerClass}
        />
      </main>
      
      <Footer />
    </div>
  );
}

