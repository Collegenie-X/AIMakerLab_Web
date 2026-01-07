"use client"

/**
 * 갤러리 Hero 섹션 컴포넌트
 * - 페이지 상단 타이틀 영역
 */
export function GalleryHeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 py-16">
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 text-6xl">🎨</div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 text-balance">갤러리</h1>
          <p className="text-lg text-gray-600 text-pretty">
            학생들의 멋진 작품과 학부모님들의 생생한 후기를 만나보세요
          </p>
        </div>
      </div>
    </section>
  )
}
