"use client"

import { useAboutSectionContent } from "../hooks/useAboutContent"
import { useScrollReveal } from "../hooks/useScrollReveal"
import { themeText, themeColors } from "@/theme"
import { aboutColors, themeStyles, sectionBackgrounds, sectionDividers } from "../config"
import { AiVsHumanDiagram } from "./AiVsHumanDiagram"
import { philosophyVisuals, visualPalette } from "./PhilosophyVisuals"

/**
 * 교육 철학 섹션
 * JSON 파일에서 컨텐츠를 불러오고, config.ts에서 스타일 설정을 가져옵니다.
 *
 * 각 역량 카드는 인라인 SVG 일러스트를 쓰며, 스크롤 진입 시점에
 * 원형 게이지가 그려지고 일러스트가 순차적으로 나타납니다.
 */
export function PhilosophySection() {
  const { content, isLoading, error } = useAboutSectionContent("philosophy")

  if (isLoading || !content) return null
  if (error) {
    console.error("Philosophy 섹션 컨텐츠 로딩 실패:", error)
    return null
  }

  return (
    <section className={`${sectionBackgrounds.philosophy} py-24`}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className={`mb-4 text-center ${themeText.h2} ${aboutColors.heading}`}>
            {content.heading}
          </h2>
          {content.subheading && (
            <p className="mb-4 text-center text-lg text-gray-300">{content.subheading}</p>
          )}
          <div
            className={`mb-16 mx-auto h-1 w-24 bg-gradient-to-r ${sectionDividers.philosophy}`}
          />

          {content.aiVsHuman && <AiVsHumanDiagram {...content.aiVsHuman} />}

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {content.items.map((item, index) => (
              <CapabilityCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/** 역량 카드 1개 — 원형 게이지 + SVG 일러스트 */
function CapabilityCard({
  item,
  index,
}: {
  item: {
    id: string
    topLabelEn: string
    topLabelKo: string
    title: string
    description: string
    color: keyof typeof themeStyles
  }
  index: number
}) {
  const { ref, visible } = useScrollReveal(0.3)
  const theme = themeStyles[item.color]
  const palette = visualPalette[item.color] ?? visualPalette.blue
  const Visual = philosophyVisuals[item.id]

  // 원형 게이지 둘레 (r=76)
  const circumference = 2 * Math.PI * 76

  return (
    <div ref={ref} className="group text-center">
      <div className="mb-6 flex justify-center">
        <div className="relative h-44 w-44">
          {/* 배경 원 */}
          <div
            className={`absolute inset-2 rounded-full bg-gradient-to-br ${theme.ring} transition-transform duration-300 group-hover:scale-105`}
          />
          {/* 진입 시 그려지는 테두리 게이지 */}
          <svg viewBox="0 0 176 176" className="absolute inset-0 h-full w-full -rotate-90">
            <circle
              cx="88"
              cy="88"
              r="76"
              fill="none"
              stroke={palette.stroke}
              strokeWidth="6"
              strokeLinecap="round"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: visible ? 0 : circumference,
                transition: `stroke-dashoffset 1.3s cubic-bezier(0.4,0,0.2,1) ${index * 0.12}s`,
              }}
            />
          </svg>
          {/* 일러스트 + 라벨 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {Visual && (
              <Visual visible={visible} stroke={palette.stroke} fill={palette.fill} />
            )}
            <div className={`-mt-1 text-[11px] font-semibold uppercase tracking-wide ${theme.text}`}>
              {item.topLabelEn}
            </div>
            <div className={`text-xl font-bold ${theme.textDark}`}>{item.topLabelKo}</div>
          </div>
        </div>
      </div>
      <h3 className="mb-3 text-xl font-bold text-white">{item.title}</h3>
      <p className="text-sm leading-relaxed text-gray-300">{item.description}</p>
    </div>
  )
}
