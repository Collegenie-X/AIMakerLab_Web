"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GalleryQueryProvider } from "@/lib/gallery/query-provider"
import { HeroWorksSection, WorksContentSection } from "./components"

/**
 * 작품 갤러리 페이지
 * 
 * config.ts에서 모든 설정을 관리하여 유지보수성을 향상시킵니다.
 * - 색상 테마: config.ts의 heroGradient, contentBg
 * - 텍스트: works-config.json
 * - 섹션 순서: 필요시 config.ts의 sectionsConfig 활용 가능
 * - React Query 기반 데이터 관리
 */
function WorksPageContent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero 섹션 - JSON 기반 */}
        <HeroWorksSection />

        {/* 작품 목록 섹션 */}
        <WorksContentSection />
      </main>

      <Footer />
    </div>
  )
}

/**
 * 작품 페이지 (Provider로 감싸기)
 */
export default function WorksPage() {
  return (
    <GalleryQueryProvider>
      <WorksPageContent />
    </GalleryQueryProvider>
  )
}
