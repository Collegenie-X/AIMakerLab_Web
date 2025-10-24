/**
 * 갤러리 공통 타입 및 텍스트 설정
 * 
 * @deprecated 텍스트 설정(worksTexts, reviewsTexts)은 더 이상 사용되지 않습니다.
 * 설정은 /public/gallery/works-config.json 및 reviews-config.json 파일로 이동되었습니다.
 * 데이터를 불러오려면 useGalleryConfig hooks를 사용하세요.
 * 
 * @see /app/gallery/hooks/useGalleryConfig.ts
 * @see /public/gallery/works-config.json
 * @see /public/gallery/reviews-config.json
 * 
 * 타입 정의(GalleryItem 등)는 계속 사용됩니다.
 */

export type GalleryItem = {
  id: number
  title: string
  description: string
  category: string
  image: string
  emoji: string
  author: string
  date: string
  views: number
  likes: number
  rating?: number
  details: string
  images: string[]
  tags: string[]
}

export type GalleryTexts = {
  hero: {
    emoji: string
    title: string
    subtitle: string
  }
  categoryAll: string
  itemCountSuffix: string
  emptyState: {
    emoji: string
    title: string
    message: string
  }
  actions: {
    like: string
    share: string
    create: string
    cancel: string
    submit: string
  }
}

// 작품 갤러리 텍스트
export const worksTexts: GalleryTexts = {
  hero: {
    emoji: "🎨",
    title: "학생 작품",
    subtitle: "학생들이 직접 만든 창의적이고 멋진 프로젝트를 만나보세요",
  },
  categoryAll: "전체",
  itemCountSuffix: "개의 작품",
  emptyState: {
    emoji: "🔍",
    title: "작품이 없습니다",
    message: "선택한 카테고리에 해당하는 작품이 아직 없습니다.",
  },
  actions: {
    like: "좋아요",
    share: "공유하기",
    create: "새 작품 등록하기",
    cancel: "취소",
    submit: "작품 등록하기",
  },
}

// 후기 갤러리 텍스트
export const reviewsTexts: GalleryTexts = {
  hero: {
    emoji: "💬",
    title: "수업 후기",
    subtitle: "학부모님과 학생들의 생생한 수업 후기를 확인하세요",
  },
  categoryAll: "전체",
  itemCountSuffix: "개의 후기",
  emptyState: {
    emoji: "🔍",
    title: "후기가 없습니다",
    message: "선택한 카테고리에 해당하는 후기가 아직 없습니다.",
  },
  actions: {
    like: "도움됨",
    share: "공유하기",
    create: "새 후기 작성하기",
    cancel: "취소",
    submit: "후기 등록하기",
  },
}

// JSON 데이터 URL
export const galleryDataUrls = {
  works: "/gallery/works.json",
  reviews: "/gallery/reviews.json",
} as const

// 카테고리별 기본 이미지 맵핑
export const getDefaultImage = (category: string): string => {
  const defaultImages: Record<string, string> = {
    IoT: "/gallery/smart-home-iot-device.jpg",
    "앱 개발": "/gallery/mobile-app-interface.png",
    로보틱스: "/gallery/student-robot-project.jpg",
    AI: "/gallery/ai-neural-network.png",
    "앱 인벤터": "/gallery/app-inventor-coding-blocks.jpg",
    아두이노: "/gallery/arduino-electronics-circuit.jpg",
    라즈베리파이: "/gallery/raspberry-pi-computer-iot.jpg",
    "AI 교육": "/gallery/ai-neural-network.png",
  }
  return defaultImages[category] || "/coding-project.png"
}

