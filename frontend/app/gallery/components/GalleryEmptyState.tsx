"use client"

type Props = {
  emoji: string
  title: string
  message: string
}

/**
 * 갤러리 빈 상태 표시
 */
export function GalleryEmptyState({ emoji, title, message }: Props) {
  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">{emoji}</div>
      <h3 className="text-xl font-bold text-gray-700 mb-2">{title}</h3>
      <p className="text-gray-500">{message}</p>
    </div>
  )
}

