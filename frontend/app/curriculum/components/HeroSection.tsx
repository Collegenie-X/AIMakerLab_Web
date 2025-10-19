import { Badge } from "@/components/ui/data-display/badge";
import { CurriculumSectionContainer } from "./CurriculumSectionContainer";

/**
 * 공통 히어로 섹션 컴포넌트
 * 모든 커리큘럼 페이지에서 사용
 */
interface HeroSectionProps {
  badge: string;
  title: string;
  description: string;
  gradientClass: string;
  textColorClass?: string;
  containerClass: string;
}

export function HeroSection({
  badge,
  title,
  description,
  gradientClass,
  textColorClass = "text-white",
  containerClass,
}: HeroSectionProps) {
  return (
    <CurriculumSectionContainer
      className={`bg-gradient-to-br ${gradientClass} py-20 ${textColorClass}`}
      containerClass={`${containerClass} text-center`}
    >
      <Badge className="mb-4 bg-white/20 text-white">{badge}</Badge>
      <h1 className="mb-4 text-4xl font-bold">{title}</h1>
      <p className="mb-8 text-xl opacity-90">{description}</p>
    </CurriculumSectionContainer>
  );
}

