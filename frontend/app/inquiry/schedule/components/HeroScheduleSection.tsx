"use client"

import { MapPin } from "lucide-react"
import { heroFeatureIcons, type ScheduleTexts } from "../config"

type HeroScheduleSectionProps = {
  texts: ScheduleTexts
  /**
   * Tailwind 그라디언트 클래스 (예: "from-green-600 via-emerald-600 to-teal-600")
   * 전달되지 않으면 기본 파랑 계열이 적용됩니다.
   */
  gradientClass?: string
}

/**
 * 수업 일정 히어로 섹션 컴포넌트
 * config.ts에서 아이콘과 텍스트를 관리하여 유지보수성을 향상시킵니다.
 * 
 * @param texts - 표시할 텍스트 설정
 * @param gradientClass - 배경 그라디언트 클래스 (선택)
 */
export function HeroScheduleSection({ texts, gradientClass }: HeroScheduleSectionProps) {
  return (
    <section className={`relative overflow-hidden bg-gradient-to-br ${
      gradientClass ?? 'from-cyan-500 via-blue-600 to-indigo-700'
    } py-16 text-white`}>
      {/* 배경 패턴 */}
      <div className="absolute inset-0 bg-[url('/home/abstract-tech-pattern.png')] opacity-10" />
      
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-6xl text-center">
          {/* 배지 */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-5 py-2 text-sm font-semibold">
            <MapPin className="w-4 h-4" />
            어디든 찾아가는 AI 교육
          </div>
          
          {/* 타이틀 */}
          <h1 className="mb-6 text-4xl font-bold md:text-6xl" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}>
            {texts.heroTitle}
          </h1>
          
          {/* 서브타이틀 */}
          <p className="text-xl md:text-2xl text-white/95 mb-4 mx-auto max-w-3xl leading-relaxed" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}>
            {texts.heroSubtitle}
          </p>
          
          {/* 설명 */}
          {texts.heroDescription && (
            <p className="text-base md:text-lg text-white/85 mb-10 mx-auto max-w-2xl" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}>
              {texts.heroDescription}
            </p>
          )}
          
          {/* 주요 특징 - config에서 관리 */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {heroFeatureIcons.map(({ Icon, label, bgColor, iconColor }) => (
              <div 
                key={label}
                className={`flex items-center gap-2 ${bgColor} backdrop-blur-sm rounded-lg px-5 py-3 hover:bg-white/30 transition-all`}
              >
                <Icon className={`w-5 h-5 ${iconColor}`} />
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


