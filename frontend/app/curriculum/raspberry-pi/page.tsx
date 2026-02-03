"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useRaspberryPiCurriculumData } from "./hooks/useRaspberryPiCurriculumData";
import { RASPBERRY_PI_CONFIG } from "./config";
import {
  HeroSection,
  CourseInfoSection,
  CourseDescriptionSection,
  LearningPathSection,
  LearningGoalsSection,
  CurriculumSection,
  GradeRecommendationTable,
  EducationRequirementsSection,
  ClassGallerySection,
  MaterialsDownloadSection,
  CtaSection,
} from "../components";
import { Server, Sprout, Car, Wifi } from "lucide-react";

/**
 * Raspberry Pi 코딩 과정 메인 페이지
 * 스마트 팜과 자율 주행차 프로젝트 소개
 */
export default function RaspberryPiCurriculumPage() {
  const { data, loading, error } = useRaspberryPiCurriculumData();

  // 로딩 상태
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent mx-auto"></div>
          <p className="text-gray-600">Raspberry Pi 과정 정보를 불러오는 중...</p>
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

  const { gradients, layout, iconColors, tabs } = RASPBERRY_PI_CONFIG;

  // 아이콘 문자열을 실제 아이콘 컴포넌트로 매핑
  const iconMap: Record<string, any> = {
    Server,
    Sprout,
    Car,
    Wifi,
  };

  // JSON 데이터의 features를 실제 아이콘 컴포넌트와 매핑
  const heroFeatures = data.hero.features?.map((feature) => ({
    icon: iconMap[feature.icon] || Server,
    label: feature.label,
  })) || [];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
      {/* 히어로 섹션 */}
      <HeroSection
        badge={data.hero.badge}
        badgeIcon={Server}
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
        primaryColor="green"
        gradientClass="from-green-600 to-emerald-600"
      />

      {/* 학습 단계 구조도 */}
      {data.learningPath?.methodology && (
        <LearningPathSection
          title={data.learningPath.methodology.title}
          description={data.learningPath.methodology.description}
          steps={data.learningPath.methodology.steps}
          containerClass={layout.containerClass}
          primaryColor="green"
        />
      )}

      {/* 학년별 추천 */}
      <GradeRecommendationTable
        title={data.gradeRecommendation.title}
        description={data.gradeRecommendation.description}
        programName={data.gradeRecommendation.programName}
        headers={data.gradeRecommendation.headers}
        courses={data.gradeRecommendation.courses}
        legend={data.gradeRecommendation.legend}
        containerClass={layout.containerClass}
        primaryColor="green"
      />

      {/* 커리큘럼 - 프로젝트별 */}
      {data.curriculum.projects.map((project) => (
        <CurriculumSection
          key={project.id}
          title={`${project.title} 커리큘럼`}
          tabs={project.tabs}
          containerClass={layout.containerClass}
          activeTabClass={tabs.activeTabClass}
          inactiveTabClass={tabs.inactiveTabClass}
          primaryColor="green"
        />
      ))}

      {/* 교육 조건 */}
      <EducationRequirementsSection
        title={data.educationRequirements.title}
        subtitle="효과적인 Raspberry Pi 교육을 위한 필수 조건들을 확인하세요"
        items={data.educationRequirements.items}
        iconColors={iconColors}
        containerClass={layout.containerClass}
        primaryColor="green"
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
          primaryColor="green"
        />
      )}

      {/* 수업 자료 다운로드 */}
      {data.materials && (
        <MaterialsDownloadSection
          title={data.materials.title}
          description={data.materials.description}
          categories={data.materials.categories}
          containerClass={layout.containerClass}
          primaryColor="green"
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
