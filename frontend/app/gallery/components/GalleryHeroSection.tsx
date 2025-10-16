"use client"

type Props = {
  emoji: string
  title: string
  subtitle: string
}

/**
 * 갤러리 상단 히어로 섹션
 */
export function GalleryHeroSection({ emoji, title, subtitle }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 py-16">
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 text-6xl">{emoji}</div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 text-balance">{title}</h1>
          <p className="text-lg text-gray-600 text-pretty">{subtitle}</p>
        </div>
      </div>
    </section>
  )
}

