/**
 * 비디오 카드 컴포넌트
 * 
 * UI 로직: 개별 비디오 썸네일 및 정보 표시
 */

"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/data-display/card"
import { Badge } from "@/components/ui/data-display/badge"
import { Clock, BarChart3, BookOpen } from "lucide-react"
import type { VideoItem } from "@/lib/products/videos"
import { getDifficultyColor } from "@/lib/products/videos"

type VideoCardProps = {
  video: VideoItem
  onClick: () => void
}

/**
 * 개별 비디오 카드
 * 썸네일, 제목, 설명, 메타데이터를 표시합니다
 */
export function VideoCard({ video, onClick }: VideoCardProps) {
  return (
    <button 
      onClick={onClick} 
      className="text-left transition-transform hover:scale-[1.02] w-full"
    >
      <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
        {/* 썸네일 영역 */}
        <div className="relative w-full aspect-video">
          <Image 
            src={video.thumbnail} 
            alt={video.title} 
            fill 
            className="object-cover" 
          />
          
          {/* 상단 우측: 재생 시간 */}
          <div className="absolute top-2 right-2 flex gap-2">
            {video.duration && (
              <Badge variant="secondary" className="bg-black/70 text-white">
                <Clock className="w-3 h-3 mr-1" />
                {video.duration}
              </Badge>
            )}
          </div>
          
          {/* 하단 좌측: 난이도 및 단계 수 */}
          <div className="absolute bottom-2 left-2 flex gap-2">
            {video.difficulty && (
              <Badge 
                variant="secondary" 
                className={getDifficultyColor(video.difficulty)}
              >
                <BarChart3 className="w-3 h-3 mr-1" />
                {video.difficulty}
              </Badge>
            )}
            <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
              <BookOpen className="w-3 h-3 mr-1" />
              총 {video.steps.length}단계
            </Badge>
          </div>
        </div>

        {/* 정보 영역 */}
        <CardHeader>
          <CardTitle className="text-lg line-clamp-2">
            {video.title}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {video.description}
          </CardDescription>
        </CardHeader>
      </Card>
    </button>
  )
}

