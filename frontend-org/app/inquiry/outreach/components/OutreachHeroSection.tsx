/**
 * 출강 수업 히어로 섹션 컴포넌트
 * UI 로직: 페이지 상단 타이틀 및 설명 표시
 */

'use client'

import { OutreachPageTexts } from '../config'

type OutreachHeroSectionProps = {
  texts: OutreachPageTexts
  gradientClass?: string
}

/**
 * 출강 수업 페이지 히어로 섹션
 */
export function OutreachHeroSection({
  texts,
  gradientClass = 'from-purple-500 via-indigo-600 to-blue-700',
}: OutreachHeroSectionProps) {
  return (
    <section className={`w-full bg-gradient-to-r ${gradientClass} py-16 text-white`}>
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">{texts.heroTitle}</h1>
        <p className="max-w-3xl text-lg text-white/90 md:text-xl">{texts.heroSubtitle}</p>
      </div>
    </section>
  )
}

