"use client"

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useHomeContent } from "./home/hooks/useHomeContent";
import { HeroSection } from "./home/sections/HeroSection";
import { ImpactStatsSection } from "./home/sections/ImpactStatsSection";
import { PhilosophySection } from "./home/sections/PhilosophySection";
import { LearningPathSection } from "./home/sections/LearningPathSection";
import { ComparisonSection } from "./home/sections/ComparisonSection";
import { PhysicalAiSection } from "./home/sections/PhysicalAiSection";
import { FeaturesSection } from "./home/sections/FeaturesSection";
import { DevProcessSection } from "./home/sections/DevProcessSection";
import { CurriculumSection } from "./home/sections/CurriculumSection";
import { OutsourcingSection } from "./home/sections/OutsourcingSection";
import { RecommendedKitsSection } from "./home/sections/RecommendedKitsSection";
import { CtaSection } from "./home/sections/CtaSection";

export default function HomePage() {
  const { content, isLoading, error } = useHomeContent();

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-950">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-white/50">로딩 중...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-950">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-400">오류: {error?.message || '컨텐츠를 불러올 수 없습니다'}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-950">
      <Header />

      <HeroSection />
      <ImpactStatsSection />
      <PhysicalAiSection />
      <PhilosophySection />
      <LearningPathSection />
      <FeaturesSection text={content.features} />
      <DevProcessSection />
      <ComparisonSection />
      <CurriculumSection text={content.curriculum} />
      <OutsourcingSection />
      <RecommendedKitsSection />
      <CtaSection />

      <Footer />
    </div>
  );
}
