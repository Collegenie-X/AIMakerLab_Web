"use client"

/**
 * 갤러리 Hero 섹션 컴포넌트
 * - 페이지 상단 타이틀 영역
 */
export function GalleryHeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-black to-gray-950 py-16">
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 text-6xl">🎨</div>
          <h1 className="mb-4 text-4xl font-bold text-white text-balance">갤러리</h1>
          <p className="text-lg text-gray-400 text-pretty">
            학생들의 멋진 작품과 학부모님들의 생생한 후기를 만나보세요
          </p>
        </div>
      </div>
    </section>
  )
}
