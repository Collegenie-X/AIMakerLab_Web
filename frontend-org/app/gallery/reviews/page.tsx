"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GalleryQueryProvider } from "@/lib/gallery/query-provider"
import { HeroReviewsSection, ReviewsContentSection } from "./components"

/**
 * 수업 후기 페이지
 * 
 * config.ts에서 모든 설정을 관리하여 유지보수성을 향상시킵니다.
 * - 색상 테마: config.ts의 heroGradient, contentBg
 * - 텍스트: reviews-config.json
 * - 섹션 순서: 필요시 config.ts의 sectionsConfig 활용 가능
 * - React Query 기반 데이터 관리
 */
function ReviewsPageContent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero 섹션 - JSON 기반 */}
        <HeroReviewsSection />

        {/* 후기 목록 섹션 */}
        <ReviewsContentSection />
      </main>

      <Footer />
    </div>
  )
}

/**
 * 후기 페이지 (Provider로 감싸기)
 */
export default function ReviewsPage() {
  return (
    <GalleryQueryProvider>
      <ReviewsPageContent />
    </GalleryQueryProvider>
  )
}
