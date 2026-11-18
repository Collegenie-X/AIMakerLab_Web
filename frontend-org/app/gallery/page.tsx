"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/navigation/tabs"
import { Button } from "@/components/ui/buttons/button"
import { BookOpen } from "lucide-react"
import { GalleryQueryProvider } from "@/lib/gallery/query-provider"
import { GalleryListSection } from "./components/GalleryListSection"
import { GalleryHeroSection } from "./components/GalleryHeroSection"

/**
 * 갤러리 메인 페이지
 * - 작품과 후기 탭으로 구성
 * - React Query로 데이터 관리 (1분 캐시)
 */
function GalleryPageContent() {
  const [activeTab, setActiveTab] = useState<"works" | "reviews">("works")

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <GalleryHeroSection />

      {/* Gallery Content */}
      <section className="py-16 bg-gradient-to-br from-gray-950 via-gray-900 to-black">
        <div className="container mx-auto px-4">
          {/* 교육 게시판 링크 */}
          <div className="flex justify-end mb-8">
            <Link href="/docs">
              <Button variant="outline" size="lg" className="gap-2 bg-white/10 backdrop-blur hover:bg-white/20 border-white/20 text-white">
                <BookOpen className="w-5 h-5" />
                <span>교육 게시판 보러가기</span>
              </Button>
            </Link>
          </div>

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "works" | "reviews")} className="w-full">
            <TabsList className="mx-auto mb-12 grid w-full max-w-md grid-cols-2 bg-white/10 backdrop-blur">
              <TabsTrigger value="works" className="text-base text-gray-300 data-[state=active]:bg-purple-500/30 data-[state=active]:text-white">
                🎨 작품
              </TabsTrigger>
              <TabsTrigger value="reviews" className="text-base text-gray-300 data-[state=active]:bg-blue-500/30 data-[state=active]:text-white">
                💬 수업 후기
              </TabsTrigger>
            </TabsList>

            {/* 작품 탭 */}
            <TabsContent value="works">
              <GalleryListSection type="works" />
            </TabsContent>

            {/* 후기 탭 */}
            <TabsContent value="reviews">
              <GalleryListSection type="reviews" />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  )
}

/**
 * 갤러리 페이지 (Provider로 감싸기)
 */
export default function GalleryPage() {
  return (
    <GalleryQueryProvider>
      <GalleryPageContent />
    </GalleryQueryProvider>
  )
}
