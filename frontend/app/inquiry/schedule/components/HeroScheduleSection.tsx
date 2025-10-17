"use client"

import type { ScheduleTexts } from "../config"

type HeroScheduleSectionProps = {
  texts: ScheduleTexts
}

/**
 * 수업 일정 히어로 섹션 컴포넌트
 * @param texts - 표시할 텍스트 설정
 */
export function HeroScheduleSection({ texts }: HeroScheduleSectionProps) {
  return (
    <section className="w-full bg-gradient-to-r from-blue-600 to-blue-800 py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-2 text-4xl font-bold text-white">{texts.heroTitle}</h1>
          <p className="text-base text-blue-100">{texts.heroSubtitle}</p>
        </div>
      </div>
    </section>
  )
}


