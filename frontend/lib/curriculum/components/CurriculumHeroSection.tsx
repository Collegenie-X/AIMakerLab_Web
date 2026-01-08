/**
 * 커리큘럼 히어로 섹션 공통 컴포넌트
 * 
 * UI 로직만 담당, 비즈니스 로직은 utils에서 처리
 */

"use client";

import React from "react";
import { Button, Badge } from "@/components/ui";
import type { HeroData } from "../types";
import { getInquiryUrl } from "../utils/curriculum-helpers";

// ============================================================================
// Props 인터페이스
// ============================================================================

interface CurriculumHeroSectionProps {
  data: HeroData;
  gradientClass: string;
  children?: React.ReactNode; // 추가 콘텐츠 슬롯
}

// ============================================================================
// 컴포넌트
// ============================================================================

/**
 * 커리큘럼 히어로 섹션
 * 
 * @example
 * ```tsx
 * <CurriculumHeroSection
 *   data={heroData}
 *   gradientClass="from-blue-500 to-cyan-600"
 * />
 * ```
 */
export function CurriculumHeroSection({
  data,
  gradientClass,
  children,
}: CurriculumHeroSectionProps) {
  return (
    <section className={`relative bg-gradient-to-br ${gradientClass} text-white`}>
      {/* 배경 패턴 */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
      
      {/* 콘텐츠 */}
      <div className="curriculum-container relative py-20 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          {/* 배지 */}
          {data.badge && (
            <Badge
              variant="secondary"
              className="mb-6 bg-white/20 text-white hover:bg-white/30"
            >
              {data.badge}
            </Badge>
          )}

          {/* 제목 */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {data.title}
          </h1>

          {/* 부제목 (선택적) */}
          {data.subtitle && (
            <p className="mb-4 text-xl md:text-2xl font-medium text-white/90">
              {data.subtitle}
            </p>
          )}

          {/* 설명 */}
          <p className="mb-10 text-lg md:text-xl text-white/80">
            {data.description}
          </p>

          {/* Feature 목록 */}
          {data.features && data.features.length > 0 && (
            <div className="mb-10 flex flex-wrap justify-center gap-4">
              {data.features.map((feature) => (
                <div
                  key={feature.key}
                  className="rounded-lg bg-white/10 px-5 py-3 backdrop-blur-sm"
                >
                  <div className="font-semibold">{feature.label}</div>
                  <div className="text-sm text-white/70">{feature.description}</div>
                </div>
              ))}
            </div>
          )}

          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-gray-900 hover:bg-gray-100"
              asChild
            >
              <a href={getInquiryUrl()}>수업 신청하기</a>
            </Button>
          </div>

          {/* 추가 콘텐츠 슬롯 */}
          {children}
        </div>
      </div>
    </section>
  );
}

