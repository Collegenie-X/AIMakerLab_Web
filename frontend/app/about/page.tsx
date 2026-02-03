"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  HeroAboutSection,
  PhilosophySection,
  MethodologySection,
  ComparisonSection,
  ProjectsGallerySection,
  BrandAboutSection,
  FacilitySection,
  HistorySection,
} from "./components"
import { getEnabledSections, type SectionKey } from "./config"

/**
 * 섹션 컴포넌트 매핑
 * config.ts에서 정의한 섹션 키와 실제 컴포넌트를 연결합니다.
 */
const sectionComponents: Record<SectionKey, React.ComponentType> = {
  hero: HeroAboutSection,
  philosophy: PhilosophySection,
  methodology: MethodologySection,
  comparison: ComparisonSection,
  projects: ProjectsGallerySection,
  brand: BrandAboutSection,
  facility: FacilitySection,
  history: HistorySection,
}

/**
 * About 페이지
 * 
 * 각 섹션 컴포넌트는 JSON 파일에서 컨텐츠를 불러오고,
 * config.ts에서 스타일 설정 및 섹션 순서를 관리합니다.
 * 
 * 섹션 순서 변경: config.ts의 sectionsConfig에서 order를 수정
 * 섹션 표시/숨김: config.ts의 sectionsConfig에서 enabled를 수정
 */
export default function AboutPage() {
  // config에서 활성화된 섹션 목록을 가져옴
  const enabledSections = getEnabledSections()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {enabledSections.map(({ key }) => {
          const SectionComponent = sectionComponents[key]
          return <SectionComponent key={key} />
        })}
      </main>

      <Footer />
    </div>
  )
}
