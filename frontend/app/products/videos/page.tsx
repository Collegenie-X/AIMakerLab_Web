"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/data-display/badge"
import { videosConfig } from "./config"
import { useVideos } from "./hooks/useVideos"
import { VideoGrid } from "./components/VideoGrid"
import { PlayCircle, BookOpen, Sparkles } from "lucide-react"

export default function VideosPage() {
  const { items, loading } = useVideos()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-b from-background to-muted/20">
        {/* Hero 섹션 */}
        <section className="border-b bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <div className="flex items-center gap-2 mb-4">
              <PlayCircle className="w-8 h-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold">
                {videosConfig.pageTitle}
              </h1>
            </div>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
              {videosConfig.pageDescription}
            </p>
            
            {/* 통계 카드 */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg px-4 py-2 border">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-sm text-muted-foreground">전체 영상</div>
                  <div className="text-xl font-bold">{items.length}개</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg px-4 py-2 border">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <div>
                  <div className="text-sm text-muted-foreground">학습 단계</div>
                  <div className="text-xl font-bold">
                    {items.reduce((sum, item) => sum + item.steps.length, 0)}단계
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 비디오 그리드 섹션 */}
        <section className="mx-auto max-w-6xl px-4 py-10">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">영상을 불러오는 중...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12">
              <PlayCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">아직 등록된 영상이 없습니다.</p>
            </div>
          ) : (
            <VideoGrid items={items} />
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}


