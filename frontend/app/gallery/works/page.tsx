"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GalleryQueryProvider } from "@/lib/gallery/query-provider"
import { GalleryListSection } from "../components/GalleryListSection"

/**
 * 작품 갤러리 페이지
 * - React Query 기반 데이터 관리
 */
function WorksPageContent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 py-16">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 text-6xl">🎨</div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 text-balance">학생 작품</h1>
            <p className="text-lg text-gray-600 text-pretty">
              학생들이 직접 만든 창의적이고 멋진 프로젝트를 만나보세요
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <GalleryListSection type="works" />
        </div>
      </section>

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
