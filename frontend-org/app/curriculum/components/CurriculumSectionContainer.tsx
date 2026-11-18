import { ReactNode } from "react";

/**
 * 커리큘럼 섹션 컨테이너 공통 컴포넌트
 * 모든 커리큘럼 섹션의 레이아웃 일관성을 유지합니다.
 */
interface CurriculumSectionContainerProps {
  /** 섹션 배경 클래스 (예: "bg-gray-50", "bg-white") */
  className?: string;
  /** 컨테이너 최대 너비 클래스 (config.layout.containerClass) */
  containerClass: string;
  /** 섹션 내부 컨텐츠 */
  children: ReactNode;
}

/**
 * 커리큘럼 섹션 컨테이너
 * - 일관된 패딩과 너비를 제공
 * - config에서 containerClass를 받아 적용
 */
export function CurriculumSectionContainer({
  className = "",
  containerClass,
  children,
}: CurriculumSectionContainerProps) {
  return (
    <section className={className}>
      <div className={containerClass}>
        {children}
      </div>
    </section>
  );
}

