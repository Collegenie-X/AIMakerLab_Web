"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GalleryQueryProvider } from "@/lib/gallery/query-provider"
import { GalleryListSection } from "../components/GalleryListSection"

/**
 * 수업 후기 페이지
 * - React Query 기반 데이터 관리
 */
function ReviewsPageContent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-100 via-cyan-100 to-purple-100 py-16">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 text-6xl">💬</div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 text-balance">수업 후기</h1>
            <p className="text-lg text-gray-600 text-pretty">
              학부모님과 학생들의 생생한 수업 후기를 확인하세요
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <GalleryListSection type="reviews" />
        </div>
      </section>

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
