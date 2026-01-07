/**
 * 교구 사용 영상 페이지
 * 
 * React Query를 사용한 데이터 관리
 * 비즈니스 로직과 UI 로직 분리
 */

"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/data-display/badge"
import { PlayCircle, BookOpen, Sparkles, Video, Wrench } from "lucide-react"
import { useVideos } from "@/lib/products/videos"
import { VideoGrid } from "./components/VideoGrid"

export default function VideosPage() {
  // React Query로 비디오 데이터 조회 (1분 캐싱)
  const { data: videos = [], isLoading, error } = useVideos()

  // 통계 계산
  const totalSteps = videos.reduce((sum, video) => sum + video.steps.length, 0)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero 섹션 */}
        <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 py-12 text-white">
          <div className="absolute inset-0 bg-[url('/home/abstract-tech-pattern.png')] opacity-10" />
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              {/* 상단 뱃지 */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold">
                <Video className="w-4 h-4" />
                단계별 제작 가이드
              </div>

              {/* 제목 */}
              <h1 
                className="mb-4 text-4xl font-bold md:text-5xl" 
                style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}
              >
                교구 사용 영상
              </h1>

              {/* 설명 */}
              <p 
                className="text-xl text-white/95 mb-8" 
                style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}
              >
                교육용 키트 사용법과 시연 영상을 모아두었습니다.
              </p>
              
              {/* 통계 카드 */}
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 min-w-[140px]">
                  <BookOpen className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-xs text-white/80">전체 영상</div>
                    <div className="text-lg font-bold">{videos.length}개</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 min-w-[140px]">
                  <Sparkles className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-xs text-white/80">학습 단계</div>
                    <div className="text-lg font-bold">{totalSteps}단계</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
                  <Wrench className="w-5 h-5" />
                  <span className="text-sm font-medium">실습 중심</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 비디오 그리드 섹션 */}
        <section className="mx-auto max-w-6xl px-4 py-10">
          {/* 로딩 상태 */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">영상을 불러오는 중...</p>
            </div>
          )}

          {/* 에러 상태 */}
          {error && (
            <div className="text-center py-12">
              <PlayCircle className="w-16 h-16 mx-auto text-destructive mb-4" />
              <p className="text-lg text-destructive">영상 로딩 중 오류가 발생했습니다.</p>
              <p className="text-sm text-muted-foreground mt-2">
                {error instanceof Error ? error.message : "알 수 없는 오류"}
              </p>
            </div>
          )}

          {/* 데이터 없음 */}
          {!isLoading && !error && videos.length === 0 && (
            <div className="text-center py-12">
              <PlayCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">아직 등록된 영상이 없습니다.</p>
            </div>
          )}

          {/* 비디오 그리드 */}
          {!isLoading && !error && videos.length > 0 && (
            <VideoGrid videos={videos} />
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
