import { Badge } from "@/components/ui/data-display/badge";
import { APP_INVENTOR_CONFIG } from "../config";
import { CurriculumSectionContainer } from "../../components";
import type { AppInventorHeroData } from "../hooks/useAppInventorCurriculumData";

/**
 * 앱 인벤터 과정 히어로 섹션 컴포넌트
 * 과정의 메인 소개를 표시합니다.
 */
interface AppInventorHeroSectionProps {
  data: AppInventorHeroData;
}

export function AppInventorHeroSection({ data }: AppInventorHeroSectionProps) {
  // Early return: 데이터가 없으면 렌더링하지 않음
  if (!data) {
    return null;
  }

  const { badge, title, description } = data;
  const { gradients, layout } = APP_INVENTOR_CONFIG;

  return (
    <CurriculumSectionContainer
      className={`bg-gradient-to-br ${gradients.hero} py-20 text-white`}
      containerClass={`${layout.containerClass} text-center`}
    >
      <Badge className="mb-4 bg-white/20 text-white">{badge}</Badge>
      <h1 className="mb-4 text-4xl font-bold">{title}</h1>
      <p className="mb-8 text-xl text-blue-100">{description}</p>
    </CurriculumSectionContainer>
  );
}

