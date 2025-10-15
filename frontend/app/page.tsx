import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { homeTextConfig } from "./home/config";
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

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <HeroSection text={homeTextConfig.hero} />
      {/* <IntroVideoSection text={homeTextConfig.introVideo} /> */}
      <FeaturesSection text={homeTextConfig.features} />
      {/* <QuickLinksSection /> */}
      <CurriculumSection text={homeTextConfig.curriculum} />
      <RecommendedKitsSection />
      <RecentInquiriesSection />
      <GallerySection />
      <OutreachStatsSection text={homeTextConfig.outreach} />
      <CtaSection />
      
      <Footer />
    </div>
  );
}
