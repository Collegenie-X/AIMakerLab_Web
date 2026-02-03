"use client"

import { labels, heroGradient } from "../config"

/**
 * Online 페이지 Hero 섹션 컴포넌트
 * 
 * config.ts에서 텍스트와 스타일을 관리하여 유지보수성을 향상시킵니다.
 */
export function HeroOnlineSection() {
  return (
    <section className={`relative overflow-hidden bg-gradient-to-br ${heroGradient} py-12 text-white`}>
      {/* 배경 패턴 */}
      <div className="absolute inset-0 bg-[url('/home/abstract-tech-pattern.png')] opacity-10" />
      
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* 배지 */}
          <div className="mb-4 inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
            {labels.hero.badge}
          </div>
          
          {/* 타이틀 */}
          <h1 
            className="mb-4 text-4xl font-bold md:text-5xl" 
            style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}
          >
            {labels.hero.title}
          </h1>
          
          {/* 서브타이틀 */}
          <p className="text-xl text-white/95">
            {labels.hero.subtitle}
          </p>
        </div>
      </div>
    </section>
  )
}
