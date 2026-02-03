"use client"

import { useReviewsContent } from "../hooks/useReviewsContent"
import { heroGradient, labels } from "../config"

/**
 * Reviews 페이지 Hero 섹션 컴포넌트
 * 
 * JSON 파일에서 컨텐츠를 로드하여 표시합니다.
 * 스타일은 config.ts에서 관리합니다.
 */
export function HeroReviewsSection() {
  const { content, loading } = useReviewsContent()

  // 로딩 중일 때는 기본값 사용
  const heroData = loading ? labels.hero : (content?.hero || labels.hero)

  return (
    <section className={`relative overflow-hidden bg-gradient-to-br ${heroGradient} py-16`}>
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          {/* Emoji */}
          <div className="mb-4 text-6xl">
            {heroData.emoji}
          </div>
          
          {/* 타이틀 */}
          <h1 className="mb-4 text-4xl font-bold text-gray-900 text-balance">
            {heroData.title}
          </h1>
          
          {/* 서브타이틀 */}
          <p className="text-lg text-gray-600 text-pretty">
            {heroData.subtitle}
          </p>
        </div>
      </div>
    </section>
  )
}
