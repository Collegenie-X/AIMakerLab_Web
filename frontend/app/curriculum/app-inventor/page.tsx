"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useAppInventorCurriculumData } from "./hooks/useAppInventorCurriculumData";
import {
  AppInventorHeroSection,
  CourseInfoSection,
  CourseDescriptionSection,
  EducationRequirementsSection,
  LearningGoalsSection,
  GradeRecommendationTable,
  CurriculumSection,
  ClassGallerySection,
  MaterialsDownloadSection,
  CtaSection,
} from "./components";

/**
 * 앱 인벤터 과정 페이지
 * JSON 데이터 기반으로 구성된 모듈형 페이지입니다.
 */
export default function AppInventorPage() {
  const { data, isLoading, error } = useAppInventorCurriculumData();

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">데이터를 불러오는 중...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="text-red-600 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">데이터를 불러올 수 없습니다</h2>
            <p className="text-gray-600">{error.message}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // 데이터가 없는 경우 처리
  if (!data) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">데이터가 없습니다.</p>
        </main>
        <Footer />
      </div>
    );
  }

  // 정상 렌더링
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* 히어로 섹션 */}
        <AppInventorHeroSection data={data.hero} />

        {/* 과정 정보 섹션 */}
        <CourseInfoSection data={data.courseInfo} />


        {/* 과정 소개 섹션 */}
        <CourseDescriptionSection data={data.description} />

      

        {/* 교육 조건 섹션 */}
        <EducationRequirementsSection data={data.educationRequirements} />

        {/* 학습 목표 및 기대 효과 섹션 */}
        <LearningGoalsSection data={data.learningGoals} />


        {/* 커리큘럼 상세 섹션 */}
        <CurriculumSection data={data.curriculum} />

        {/* 학년별 추천 커리큘럼 테이블 */}
        <GradeRecommendationTable data={data.gradeRecommendation} />    

        {/* 수업 현장 및 학생 작품 갤러리 */}
        <ClassGallerySection data={data.gallery} />

        {/* 수업 자료 다운로드 섹션 */}
        <MaterialsDownloadSection data={data.materials} />

        {/* CTA 섹션 */}
        {/* <CtaSection data={data.cta} /> */}
      </main>

      <Footer />
    </div>
  );
}
