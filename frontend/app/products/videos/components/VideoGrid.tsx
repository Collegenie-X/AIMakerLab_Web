/**
 * 비디오 그리드 컴포넌트
 * 
 * UI 로직: 비디오 카드 그리드 레이아웃 + 다이얼로그 관리
 */

"use client"

import { useState } from "react"
import type { VideoItem } from "@/lib/products/videos"
import { VideoCard } from "./VideoCard"
import { VideoDialog } from "./VideoDialog"

type VideoGridProps = {
  videos: VideoItem[]
}

/**
 * 비디오 그리드 및 다이얼로그 관리
 * 반응형 그리드 레이아웃으로 비디오 카드를 표시합니다
 */
export function VideoGrid({ videos }: VideoGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  // 비디오 카드 클릭 핸들러
  const handleVideoClick = (video: VideoItem) => {
    setSelectedVideo(video)
    setDialogOpen(true)
  }

  // 다이얼로그 닫기 핸들러
  const handleDialogClose = (open: boolean) => {
    setDialogOpen(open)
    if (!open) {
      // 다이얼로그가 완전히 닫힌 후 비디오 초기화 (애니메이션 이후)
      setTimeout(() => setSelectedVideo(null), 200)
    }
  }

  return (
    <>
      {/* 비디오 그리드 */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onClick={() => handleVideoClick(video)}
          />
        ))}
      </div>

      {/* 상세 다이얼로그 */}
      <VideoDialog
        video={selectedVideo}
        open={dialogOpen}
        onOpenChange={handleDialogClose}
      />
    </>
  )
}
