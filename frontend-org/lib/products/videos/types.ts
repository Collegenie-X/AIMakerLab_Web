/**
 * 교구 영상 타입 정의
 * 
 * 비디오 데이터의 구조를 정의합니다.
 * JSON 데이터와 API 응답에서 사용됩니다.
 */

// 비디오 단계별 학습 스텝
export type VideoStep = {
  stepNumber: number
  stepTitle: string
  stepDescription: string
  youtubeTimestamp?: string // 예: "0m30s" 또는 "1m15s"
}

// 비디오 아이템
export type VideoItem = {
  id: string
  title: string
  description: string
  thumbnail: string
  src: string // youtube embed url (권장)
  steps: VideoStep[] // 제작 단계별 설명
  duration?: string // 예: "5:30"
  difficulty?: "초급" | "중급" | "고급"
}

// API 응답 타입
export type VideosResponse = VideoItem[]

// 비디오 필터 타입
export type VideoFilter = {
  difficulty?: "초급" | "중급" | "고급"
  searchQuery?: string
}

