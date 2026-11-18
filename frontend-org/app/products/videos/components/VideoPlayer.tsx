/**
 * 비디오 플레이어 컴포넌트
 * 
 * UI 로직: YouTube 임베드 또는 일반 비디오 재생
 */

"use client"

import type { VideoItem, VideoStep } from "@/lib/products/videos"
import { buildYoutubeEmbedUrl, isYoutubeUrl } from "@/lib/products/videos"

type VideoPlayerProps = {
  video: VideoItem
  currentStep?: VideoStep
  stepIndex: number // iframe 리로드를 위한 키
}

/**
 * YouTube 또는 일반 비디오 플레이어
 * 단계에 따라 타임스탬프가 적용됩니다
 */
export function VideoPlayer({ video, currentStep, stepIndex }: VideoPlayerProps) {
  // YouTube URL인 경우 타임스탬프 적용
  const videoSrc = isYoutubeUrl(video.src)
    ? buildYoutubeEmbedUrl(video.src, currentStep?.youtubeTimestamp)
    : video.src

  return (
    <div 
      className="relative w-full bg-black" 
      style={{ height: '50vh', maxHeight: '500px' }}
    >
      {isYoutubeUrl(video.src) ? (
        <iframe
          key={stepIndex} // 스텝 변경 시 iframe 리로드
          src={videoSrc}
          title={video.title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <video 
          src={videoSrc} 
          controls 
          className="w-full h-full object-contain" 
        />
      )}
    </div>
  )
}

