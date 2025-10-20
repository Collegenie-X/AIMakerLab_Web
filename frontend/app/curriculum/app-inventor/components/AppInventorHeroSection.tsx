import { Badge } from "@/components/ui/data-display/badge";
import { APP_INVENTOR_CONFIG } from "../config";
import { CurriculumSectionContainer } from "../../components";
import type { AppInventorHeroData } from "../hooks/useAppInventorCurriculumData";
import { Smartphone, Code, Blocks, Zap } from "lucide-react";

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
    <section className={`relative overflow-hidden bg-gradient-to-br ${gradients.hero} py-12 text-white`}>
      <div className="absolute inset-0 bg-[url('/home/abstract-tech-pattern.png')] opacity-10" />
      <div className="container relative mx-auto px-4">
        <div className={`${layout.containerClass} mx-auto text-center`}>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold">
            <Smartphone className="w-4 h-4" />
            {badge}
          </div>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}>
            {title}
          </h1>
          <p className="text-xl text-white/95 mb-8 max-w-3xl mx-auto" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}>
            {description}
          </p>
          
          {/* 주요 특징 */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <Blocks className="w-5 h-5" />
              <span className="text-sm font-medium">블록 코딩</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <Smartphone className="w-5 h-5" />
              <span className="text-sm font-medium">안드로이드 앱</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <Code className="w-5 h-5" />
              <span className="text-sm font-medium">MIT 개발</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <Zap className="w-5 h-5" />
              <span className="text-sm font-medium">즉시 실행</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

