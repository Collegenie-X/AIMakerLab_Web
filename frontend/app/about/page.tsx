"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroAboutSection } from "./components/HeroAboutSection"
import { PhilosophySection } from "./components/PhilosophySection"
import { MethodologySection } from "./components/MethodologySection"
import { ComparisonSection } from "./components/ComparisonSection"
import { ProjectsGallerySection } from "./components/ProjectsGallerySection"
import { BrandAboutSection } from "./components/BrandAboutSection"
import { FacilitySection } from "./components/FacilitySection"
import { HistorySection } from "./components/HistorySection"

/**
 * About 페이지
 * 각 섹션 컴포넌트는 JSON 파일에서 컨텐츠를 불러옵니다.
 */
export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <HeroAboutSection />
        <PhilosophySection />
        <MethodologySection />
        <ComparisonSection />
        <ProjectsGallerySection />
        <BrandAboutSection />
        <FacilitySection />
        <HistorySection />
      </main>

      <Footer />
    </div>
  )
}
