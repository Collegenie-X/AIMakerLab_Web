/**
 * AI 코딩 커리큘럼 페이지 - 새 시스템 예시
 * 
 * 기존 복잡한 구조를 새로운 통합 시스템으로 마이그레이션한 예시
 */

"use client";

import { CurriculumCategory } from "@/lib/curriculum/types";
import {
  CurriculumLayout,
  CurriculumHeroSection,
  CurriculumInfoCards,
  CurriculumModulesSection,
  CurriculumLearningGoals,
  CurriculumCTA,
} from "@/lib/curriculum/components";

/**
 * AI 코딩 커리큘럼 메인 페이지
 * 
 * 특징:
 * - 비즈니스 로직과 UI 로직 완전 분리
 * - 공통 컴포넌트로 유지보수 용이
 * - 데이터는 JSON 파일에서 자동 로드
 * - 30분 캐시로 성능 최적화
 */
export default function AICodingCurriculumPage() {
  return (
    <CurriculumLayout category={CurriculumCategory.AI_CODING}>
      {(data) => (
        <>
          {/* 
            히어로 섹션 
            - 페이지 최상단 섹션
            - 배지, 제목, 설명, Features 표시
          */}
          <CurriculumHeroSection
            data={data.hero}
            gradientClass={data.meta.gradientClass}
          />

          {/* 
            과정 정보 카드
            - 수업 기간, 인원, 방식, 시간 등
            - 아이콘 + 라벨 + 값 형식
          */}
          {data.courseInfo && (
            <CurriculumInfoCards
              items={data.courseInfo}
              title="과정 정보"
              subtitle="이 과정의 주요 정보를 확인하세요"
            />
          )}

          {/* 
            학습 목표 섹션
            - 카테고리별 학습 목표
            - 각 목표별 스킬 목록
          */}
          {data.learningGoals && (
            <CurriculumLearningGoals data={data.learningGoals} />
          )}

          {/* 
            커리큘럼 모듈 섹션
            - 탭 기반 커리큘럼 표시
            - 모듈별 학습 내용, 시간, 주제
          */}
          {data.curriculum && (
            <CurriculumModulesSection
              data={data.curriculum}
              defaultTabId="iot-track"
            />
          )}

          {/* 
            CTA 섹션
            - 수업 신청 유도
            - Primary + Secondary 버튼
          */}
          <CurriculumCTA
            data={data.cta}
            gradientClass={data.meta.ctaGradient}
          />
        </>
      )}
    </CurriculumLayout>
  );
}

