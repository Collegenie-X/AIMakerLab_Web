"use client"

import { Calendar, Users, Clock, MapPin } from "lucide-react"
import type { ScheduleTexts } from "../config"

type HeroScheduleSectionProps = {
  texts: ScheduleTexts
  /**
   * Tailwind 그라데이션 클래스 (예: "from-green-600 via-emerald-600 to-teal-600")
   * 전달되지 않으면 기본 파랑 계열이 적용됩니다.
   */
  gradientClass?: string
}

/**
 * 수업 일정 히어로 섹션 컴포넌트
 * @param texts - 표시할 텍스트 설정
 */
export function HeroScheduleSection({ texts, gradientClass }: HeroScheduleSectionProps) {
  return (
    <section className={`relative overflow-hidden bg-gradient-to-br ${
      gradientClass ?? 'from-cyan-500 via-blue-600 to-indigo-700'
    } py-12 text-white`}>
      <div className="absolute inset-0 bg-[url('/home/abstract-tech-pattern.png')] opacity-10" />
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold">
            <Calendar className="w-4 h-4" />
            오프라인 정규 수업
          </div>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}>
            {texts.heroTitle}
          </h1>
          <p className="text-xl text-white/95 mb-8 mx-auto" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}>
            {texts.heroSubtitle}
          </p>
          
          {/* 주요 특징 */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-medium">월별 일정</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">소수 정예</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium">정규 수업</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <MapPin className="w-5 h-5" />
              <span className="text-sm font-medium">오프라인</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


