import { Badge } from "@/components/ui/data-display/badge";
import { ARDUINO_CONFIG } from "../config";
import type { ArduinoHeroData } from "../hooks/useArduinoCurriculumData";

/**
 * 아두이노 과정 히어로 섹션 컴포넌트
 * 과정의 메인 소개를 표시합니다.
 */
interface ArduinoHeroSectionProps {
  data: ArduinoHeroData;
}

export function ArduinoHeroSection({ data }: ArduinoHeroSectionProps) {
  // Early return: 데이터가 없으면 렌더링하지 않음
  if (!data) {
    return null;
  }

  const { badge, title, description } = data;
  const { gradients } = ARDUINO_CONFIG;

  return (
    <section className={`bg-gradient-to-br ${gradients.hero} py-20 text-white`}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="mb-4 bg-white/20 text-white">{badge}</Badge>
          <h1 className="mb-4 text-4xl font-bold">{title}</h1>
          <p className="mb-8 text-xl text-orange-100">{description}</p>
        </div>
      </div>
    </section>
  );
}

