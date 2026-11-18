"use client"

import { Button } from "@/components/ui/buttons/button"
import type { WorkSource } from "@/lib/gallery"
import { heroGradient, heroBySource } from "../config"

type Props = {
  selectedSource: WorkSource | "all"
  onSourceChange: (source: WorkSource | "all") => void
}

const SOURCE_TABS = [
  { value: "all", label: "전체" },
  { value: "student", label: "🧑‍🎓 학생 작품" },
  { value: "internal", label: "🏢 내부 작품" },
] as const

/**
 * Works 페이지 Hero 섹션 컴포넌트
 *
 * 최상단에 작품 구분(전체/학생 작품/내부 작품) 탭을 표시하고,
 * 선택된 구분에 따라 제목/부제를 함께 전환합니다.
 */
export function HeroWorksSection({ selectedSource, onSourceChange }: Props) {
  const heroData = heroBySource[selectedSource]

  return (
    <section className={`relative overflow-hidden bg-gradient-to-br ${heroGradient} py-16`}>
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          {/* Emoji */}
          <div className="mb-4 text-6xl">
            {heroData.emoji}
          </div>

          {/* 타이틀 */}
          <h1 className="mb-4 text-4xl font-bold text-white text-balance">
            {heroData.title}
          </h1>

          {/* 서브타이틀 */}
          <p className="mb-8 text-lg text-gray-400 text-pretty">
            {heroData.subtitle}
          </p>

          {/* 작품 구분 탭 */}
          <div className="flex flex-wrap justify-center gap-2">
            {SOURCE_TABS.map((tab) => (
              <Button
                key={tab.value}
                variant={selectedSource === tab.value ? "default" : "outline"}
                onClick={() => onSourceChange(tab.value)}
                className={
                  selectedSource === tab.value
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                }
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
