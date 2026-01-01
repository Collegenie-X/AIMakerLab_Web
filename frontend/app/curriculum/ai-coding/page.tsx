"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useAICodingCurriculumData } from "./hooks/useAICodingCurriculumData";
import { AI_CODING_CONFIG } from "./config";
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
import { Rocket, Cog, Code2, Award, MessageSquare } from "lucide-react";

/**
 * AI 심화 제작 코딩 프로그램 메인 페이지 (UI 로직)
 * 
 * 구조:
 * 1. 데이터 로딩 (useAICodingCurriculumData Hook)
 * 2. 로딩/에러 상태 처리
 * 3. 섹션별 컴포넌트 렌더링
 * 
 * 특징:
 * - IoT 컴퓨터 비전 프로젝트 (하드웨어 + AI)
 * - 바이브 코딩 서비스 개발 (최신 AI 도구 활용)
 * - 기획부터 실행까지 실전 프로젝트
 * - 포트폴리오 완성
 */
export default function AICodingCurriculumPage() {
  const { data, loading, error } = useAICodingCurriculumData();

  // 로딩 상태
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent mx-auto"></div>
          <p className="text-gray-600">AI 코딩 과정 정보를 불러오는 중...</p>
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

  const { gradients, layout, iconColors, tabs } = AI_CODING_CONFIG;

  // 아이콘 문자열을 실제 아이콘 컴포넌트로 매핑
  const iconMap: Record<string, any> = {
    Rocket,
    Cog,
    Code2,
    Award,
    MessageSquare,
  };

  // JSON 데이터의 features를 실제 아이콘 컴포넌트와 매핑
  const heroFeatures = data.hero.features?.map((feature) => ({
    icon: iconMap[feature.icon] || Rocket,
    label: feature.label,
  })) || [];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* 히어로 섹션 */}
        <HeroSection
          badge={data.hero.badge}
          badgeIcon={Rocket}
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

        {/* 학습 목표 */}
        <LearningGoalsSection
          title={data.learningGoals.title}
          description={data.learningGoals.description}
          goals={data.learningGoals.goals}
          achievements={data.learningGoals.achievements}
          containerClass={layout.containerClass}
          primaryColor="emerald"
          gradientClass="from-emerald-600 to-teal-600"
        />

        {/* 학습 단계 구조도 - IoT 컴퓨터 비전 */}
        {data.learningPath?.iot && (
          <LearningPathSection
            title={data.learningPath.iot.title}
            description={data.learningPath.iot.description}
            steps={data.learningPath.iot.steps}
            containerClass={layout.containerClass}
            primaryColor="emerald"
          />
        )}

        {/* 학습 단계 구조도 - 바이브 코딩 */}
        {data.learningPath?.vibe && (
          <LearningPathSection
            title={data.learningPath.vibe.title}
            description={data.learningPath.vibe.description}
            steps={data.learningPath.vibe.steps}
            containerClass={layout.containerClass}
            primaryColor="emerald"
          />
        )}

        {/* 커리큘럼 - 트랙별 프로젝트 탭 */}
        <ProjectCurriculumSection
          title={data.curriculum.title || "트랙별 커리큘럼"}
          description={data.curriculum.description || "IoT 제작과 바이브 코딩 두 트랙으로 구성됩니다"}
          projects={data.curriculum.projects}
          containerClass={layout.containerClass}
          projectTabActiveClass="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
          projectTabInactiveClass="bg-gray-100 text-gray-700 hover:bg-gray-200"
          durationTabActiveClass="bg-emerald-600 text-white shadow-md"
          durationTabInactiveClass="bg-gray-100 text-gray-600 hover:bg-gray-200"
          primaryColor="emerald"
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
          primaryColor="emerald"
        />

        {/* 교육 조건 */}
        <EducationRequirementsSection
          title={data.educationRequirements.title}
          subtitle="심화 프로젝트를 위한 준비 사항"
          items={data.educationRequirements.items}
          iconColors={iconColors}
          containerClass={layout.containerClass}
          primaryColor="emerald"
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
            primaryColor="emerald"
          />
        )}

        {/* 수업 자료 다운로드 */}
        {data.materials && (
          <MaterialsDownloadSection
            title={data.materials.title}
            description={data.materials.description}
            categories={data.materials.categories}
            containerClass={layout.containerClass}
            primaryColor="emerald"
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

