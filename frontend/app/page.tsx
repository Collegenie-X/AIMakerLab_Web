"use client"

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useHomeContent } from "./home/hooks/useHomeContent";
import { HeroSection } from "./home/sections/HeroSection";
import { IntroVideoSection } from "./home/sections/IntroVideoSection";
import { FeaturesSection } from "./home/sections/FeaturesSection";
import { CurriculumSection } from "./home/sections/CurriculumSection";
import { QuickLinksSection } from "./home/sections/QuickLinksSection";
import { RecommendedKitsSection } from "./home/sections/RecommendedKitsSection";
import { RecentInquiriesSection } from "./home/sections/RecentInquiriesSection";
import { GallerySection } from "./home/sections/GallerySection";
import { CtaSection } from "./home/sections/CtaSection";
import { OutreachStatsSection } from "./home/sections/OutreachStatsSection";

/**
 * 홈페이지
 * JSON 파일에서 컨텐츠를 불러와 표시합니다.
 */
export default function HomePage() {
  const { content, isLoading, error } = useHomeContent();

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">로딩 중...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // 에러 상태
  if (error || !content) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-500">오류: {error?.message || '컨텐츠를 불러올 수 없습니다'}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <HeroSection text={content.hero} />
      {/* <IntroVideoSection text={content.introVideo} /> */}
      <FeaturesSection text={content.features} />
      {/* <QuickLinksSection /> */}
      <CurriculumSection text={content.curriculum} />
      <RecommendedKitsSection />
      <RecentInquiriesSection />
      <GallerySection />
      <OutreachStatsSection text={content.outreach} />
      <CtaSection />
      
      <Footer />
    </div>
  );
}
