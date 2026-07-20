"use client"

import type { GalleryType } from "@/lib/gallery"

type Props = {
  type: GalleryType
}

/**
 * 갤러리 빈 상태 컴포넌트
 */
export function GalleryEmptyState({ type }: Props) {
  const config = {
    works: {
      emoji: "🔍",
      title: "작품이 없습니다",
      message: "선택한 카테고리에 해당하는 작품이 아직 없습니다.",
    },
    reviews: {
      emoji: "🔍",
      title: "후기가 없습니다",
      message: "선택한 카테고리에 해당하는 후기가 아직 없습니다.",
    },
  }

  const { emoji, title, message } = config[type]

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="mb-6 text-8xl">{emoji}</div>
      <h3 className="mb-2 text-2xl font-bold text-white">{title}</h3>
      <p className="text-gray-400 text-center max-w-md">{message}</p>
    </div>
  )
}
