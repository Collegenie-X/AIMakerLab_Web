"use client"

import { Calendar } from "lucide-react"
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
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-20">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-400 to-purple-400 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          {/* 상단 배지 */}
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-sm font-medium text-white shadow-lg">
              <Calendar className="h-4 w-4" />
              <span>📚 오프라인 정규 수업</span>
            </div>
          </div>

          {/* 아이콘 */}
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-4 shadow-xl">
              <Calendar className="h-12 w-12 text-white" />
            </div>
          </div>

          {/* 제목 */}
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
            {texts.heroTitle}
          </h1>

          {/* 부제목 */}
          <p className="text-lg text-gray-700 md:text-xl" style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.05)' }}>
            {texts.heroSubtitle}
          </p>
        </div>
      </div>
    </section>
  )
}


