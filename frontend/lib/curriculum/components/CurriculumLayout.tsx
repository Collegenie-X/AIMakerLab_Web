/**
 * 커리큘럼 페이지 레이아웃 컴포넌트
 * 
 * 공통 레이아웃과 로딩/에러 처리
 */

"use client";

import React from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui";
import type { CurriculumCategory } from "../types";
import { useCurriculum } from "../hooks/useCurriculum";

// ============================================================================
// Props 인터페이스
// ============================================================================

interface CurriculumLayoutProps {
  category: CurriculumCategory;
  children: (data: ReturnType<typeof useCurriculum>["data"]) => React.ReactNode;
}

// ============================================================================
// 컴포넌트
// ============================================================================

/**
 * 커리큘럼 페이지 레이아웃
 * 
 * 데이터 페칭, 로딩, 에러 처리를 자동으로 관리
 * 
 * @example
 * ```tsx
 * <CurriculumLayout category={CurriculumCategory.AI_CODING}>
 *   {(data) => (
 *     <>
 *       <CurriculumHeroSection data={data.hero} />
 *       <CurriculumModulesSection data={data.curriculum} />
 *     </>
 *   )}
 * </CurriculumLayout>
 * ```
 */
export function CurriculumLayout({
  category,
  children,
}: CurriculumLayoutProps) {
  const { data, isLoading, error } = useCurriculum(category);

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-lg text-muted-foreground">
            커리큘럼을 불러오는 중...
          </p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="curriculum-container py-20">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>오류가 발생했습니다</AlertTitle>
          <AlertDescription>
            커리큘럼 데이터를 불러오는 중 문제가 발생했습니다.
            <br />
            {error.message}
            <br />
            <button
              onClick={() => window.location.reload()}
              className="mt-4 underline"
            >
              페이지 새로고침
            </button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // 데이터 없음
  if (!data) {
    return (
      <div className="curriculum-container py-20">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>데이터 없음</AlertTitle>
          <AlertDescription>
            커리큘럼 데이터를 찾을 수 없습니다.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // 정상 렌더링
  return <>{children(data)}</>;
}

