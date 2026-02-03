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
    } py-16 text-white`}>
      <div className="absolute inset-0 bg-[url('/home/abstract-tech-pattern.png')] opacity-10" />
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-5 py-2 text-sm font-semibold">
            <MapPin className="w-4 h-4" />
            어디든 찾아가는 AI 교육
          </div>
          <h1 className="mb-6 text-4xl font-bold md:text-6xl" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}>
            {texts.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-white/95 mb-4 mx-auto max-w-3xl leading-relaxed" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}>
            {texts.heroSubtitle}
          </p>
          <p className="text-base md:text-lg text-white/85 mb-10 mx-auto max-w-2xl" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}>
            {texts.heroDescription}
          </p>
          
          {/* 주요 특징 */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-5 py-3 hover:bg-white/30 transition-all">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium">3시간 / 6시간 / 12시간</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-5 py-3 hover:bg-white/30 transition-all">
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">학교 · 기업 · 기관</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-5 py-3 hover:bg-white/30 transition-all">
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-medium">맞춤형 일정</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-5 py-3 hover:bg-white/30 transition-all">
              <MapPin className="w-5 h-5" />
              <span className="text-sm font-medium">전국 출강 가능</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


