"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useAIEducationCurriculumData } from "./hooks/useAIEducationCurriculumData";
import { AI_EDUCATION_CONFIG } from "./config";
import {
  HeroSection,
  CourseInfoSection,
  CourseDescriptionSection,
  LearningPathSection,
  LearningGoalsSection,
  ProjectCurriculumSection,
  CompactGradeTable,
  EducationRequirementsSection,
  ClassGallerySection,
  MaterialsDownloadSection,
  CtaSection,
} from "../components";

/**
 * AI 교육 프로그램 메인 페이지
 * DancingwithAI, TeachableMachine, ChatGPT 활용 교육
 */
export default function AIEducationCurriculumPage() {
  const { data, loading, error } = useAIEducationCurriculumData();

  // 로딩 상태
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-purple-600 border-t-transparent mx-auto"></div>
          <p className="text-gray-600">AI 교육 과정 정보를 불러오는 중...</p>
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

  const { gradients, layout, iconColors, tabs } = AI_EDUCATION_CONFIG;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* 히어로 섹션 */}
        <HeroSection
          badge={data.hero.badge}
          title={data.hero.title}
          description={data.hero.description}
          gradientClass={gradients.hero}
          containerClass={layout.containerClass}
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

        {/* 학습 목표 */}
        <LearningGoalsSection
          title={data.learningGoals.title}
          description={data.learningGoals.description}
          goals={data.learningGoals.goals}
          achievements={data.learningGoals.achievements}
          containerClass={layout.containerClass}
          primaryColor="purple"
          gradientClass="from-purple-600 to-indigo-600"
        />

        {/* 학습 단계 구조도 - 초등 */}
        {data.learningPath?.elementary && (
          <LearningPathSection
            title={data.learningPath.elementary.title}
            description={data.learningPath.elementary.description}
            steps={data.learningPath.elementary.steps}
            containerClass={layout.containerClass}
            primaryColor="purple"
          />
        )}

        {/* 학습 단계 구조도 - 중등 */}
        {data.learningPath?.middleSchool && (
          <LearningPathSection
            title={data.learningPath.middleSchool.title}
            description={data.learningPath.middleSchool.description}
            steps={data.learningPath.middleSchool.steps}
            containerClass={layout.containerClass}
            primaryColor="purple"
          />
        )}

        {/* 학습 단계 구조도 - 고등 */}
        {data.learningPath?.highSchool && (
          <LearningPathSection
            title={data.learningPath.highSchool.title}
            description={data.learningPath.highSchool.description}
            steps={data.learningPath.highSchool.steps}
            containerClass={layout.containerClass}
            primaryColor="purple"
          />
        )}

        {/* 커리큘럼 - 학년별 프로젝트 탭 */}
        <ProjectCurriculumSection
          title="학년별 AI 교육 커리큘럼"
          description="학년에 맞는 AI 교육 프로그램을 선택하세요"
          projects={data.curriculum.projects}
          containerClass={layout.containerClass}
          projectTabActiveClass="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
          projectTabInactiveClass="bg-gray-100 text-gray-700 hover:bg-gray-200"
          durationTabActiveClass="bg-purple-600 text-white shadow-md"
          durationTabInactiveClass="bg-gray-100 text-gray-600 hover:bg-gray-200"
          primaryColor="purple"
        />

        {/* 학년별 추천 (컴팩트 2행 레이아웃) */}
        <CompactGradeTable
          title={data.gradeRecommendation.title}
          description={data.gradeRecommendation.description}
          programName={data.gradeRecommendation.programName}
          headers={data.gradeRecommendation.headers}
          courses={data.gradeRecommendation.courses}
          legend={data.gradeRecommendation.legend}
          containerClass={layout.containerClass}
          primaryColor="purple"
        />

        {/* 교육 조건 */}
        <EducationRequirementsSection
          title={data.educationRequirements.title}
          subtitle="효과적인 AI 교육을 위한 필수 조건들을 확인하세요"
          items={data.educationRequirements.items}
          iconColors={iconColors}
          containerClass={layout.containerClass}
          primaryColor="purple"
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
            primaryColor="purple"
          />
        )}

        {/* 수업 자료 다운로드 */}
        {data.materials && (
          <MaterialsDownloadSection
            title={data.materials.title}
            description={data.materials.description}
            categories={data.materials.categories}
            containerClass={layout.containerClass}
            primaryColor="purple"
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

