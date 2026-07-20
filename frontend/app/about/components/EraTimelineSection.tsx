"use client"

import { useAboutSectionContent } from "../hooks/useAboutContent"
import { useScrollReveal } from "../hooks/useScrollReveal"
import { aboutColors, sectionBackgrounds, themeStyles } from "../config"
import { eraIcons } from "./EraVisuals"
import { visualPalette } from "./PhilosophyVisuals"
import type { EraItem } from "../hooks/useAboutContent"

/**
 * 시대 변화 타임라인 섹션.
 *
 * AI Maker Lab 연혁(2019~현재)을 축으로, 각 시점마다
 * "시대가 이렇게 바뀌었다 → 그래서 이렇게 가르친다" 를 대비시켜 보여줍니다.
 * 세로 축이 스크롤에 따라 그려지고, 각 항목이 순차적으로 나타납니다.
 */
export function EraTimelineSection() {
  const { content, isLoading, error } = useAboutSectionContent("era")

  if (isLoading || !content) return null
  if (error) {
    console.error("Era 섹션 컨텐츠 로딩 실패:", error)
    return null
  }

  return (
    <section className={`${sectionBackgrounds.era} py-24`}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <h2 className={`mb-4 text-center text-3xl font-bold md:text-4xl ${aboutColors.heading}`}>
            {content.heading}
          </h2>
          <p className={`mb-16 text-center ${aboutColors.muted}`}>{content.subheading}</p>

          <div className="relative">
            {/* 세로 타임라인 축 — 모바일은 왼쪽, 데스크톱은 가운데 */}
            <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-blue-500/60 via-purple-500/60 to-orange-500/60 md:left-1/2" />

            <div className="space-y-14">
              {content.items.map((item, i) => (
                <EraRow key={item.id} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** 타임라인 한 칸 — 연도 노드 + 시대 변화 / 우리의 대응 카드 */
function EraRow({ item, index }: { item: EraItem; index: number }) {
  const { ref, visible } = useScrollReveal(0.2)
  const theme = themeStyles[item.color]
  const palette = visualPalette[item.color] ?? visualPalette.blue
  const Icon = eraIcons[item.icon]
  const alignRight = index % 2 === 1

  return (
    <div
      ref={ref}
      className="relative pl-16 md:grid md:grid-cols-2 md:gap-12 md:pl-0"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      {/* 연도 노드 (축 위의 점) */}
      <div className="absolute left-0 top-2 flex h-12 w-12 items-center justify-center md:left-1/2 md:-translate-x-1/2">
        <span
          className={`absolute h-12 w-12 rounded-full ${theme.bg}`}
          style={{
            transform: visible ? "scale(1)" : "scale(0.4)",
            opacity: visible ? 1 : 0,
            transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.1s, opacity 0.4s ease",
          }}
        />
        <span
          className={`relative rounded-full border px-2 py-1 text-xs font-bold ${theme.border} ${theme.textDark} bg-slate-950`}
        >
          {item.year}
        </span>
      </div>

      {/* 시대 변화 (왼쪽 열) */}
      <div className={alignRight ? "md:order-2 md:pl-12" : "md:order-1 md:pr-12 md:text-right"}>
        <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
          시대의 변화
        </div>
        <h3 className="mb-2 text-lg font-bold text-gray-200">{item.eraTitle}</h3>
        <p className="text-sm leading-relaxed text-gray-400">{item.eraBody}</p>
      </div>

      {/* 우리의 대응 (오른쪽 열) */}
      <div className={alignRight ? "md:order-1 md:pr-12 md:text-right" : "md:order-2 md:pl-12"}>
        <div
          className={`mt-6 rounded-2xl border bg-white/5 p-5 backdrop-blur-sm md:mt-0 ${theme.border}`}
        >
          <div className={`mb-3 flex items-center gap-3 ${alignRight ? "md:flex-row-reverse" : ""}`}>
            {Icon && <Icon visible={visible} stroke={palette.stroke} fill={palette.fill} />}
            <div className={`text-xs font-semibold uppercase tracking-widest ${theme.text}`}>
              AI Maker Lab의 대응
            </div>
          </div>
          <h3 className={`mb-2 text-lg font-bold ${theme.textDark}`}>{item.responseTitle}</h3>
          <p className="mb-4 text-sm leading-relaxed text-gray-300">{item.responseBody}</p>
          <div className={`flex flex-wrap gap-2 ${alignRight ? "md:justify-end" : ""}`}>
            {item.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${theme.badge}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
