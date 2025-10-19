// 비디오 단계별 학습 스텝
export type VideoStep = {
  stepNumber: number
  stepTitle: string
  stepDescription: string
  youtubeTimestamp?: string // 예: "0m30s" 또는 "1m15s"
}

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

export const videosConfig = {
  pageTitle: "교구 사용 영상",
  pageDescription: "교육용 키트 사용법과 시연 영상을 모아두었습니다.",
  // 다이얼로그 사이즈 설정 (적당한 크기로)
  dialog: {
    contentClass: "!max-w-5xl w-[92vw]",
  },
}


