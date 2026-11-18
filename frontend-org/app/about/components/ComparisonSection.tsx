"use client"

import { Card } from "@/components/ui/data-display/card"
import { useAboutSectionContent } from "../hooks/useAboutContent"
import { useScrollReveal } from "../hooks/useScrollReveal"
import { comparisonTableStyles, sectionBackgrounds } from "../config"

/**
 * 비교표 섹션 (일반 학원 vs AI Maker Lab)
 *
 * 텍스트만 나열하는 대신 각 셀에 ✕ / ✓ SVG 뱃지를 붙여
 * 어느 쪽이 우위인지 한눈에 읽히도록 했고, 스크롤 진입 시
 * 행이 순차적으로 나타납니다. 모바일에서는 카드 형태로 전환됩니다.
 */
export function ComparisonSection() {
  const { content, isLoading, error } = useAboutSectionContent("comparison")
  const { ref, visible } = useScrollReveal(0.15)

  if (isLoading || !content) return null
  if (error) {
    console.error("Comparison 섹션 컨텐츠 로딩 실패:", error)
    return null
  }

  /** 행 등장 애니메이션 스타일 */
  const rowStyle = (i: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(10px)",
    transition: `opacity 0.45s ease ${i * 0.08}s, transform 0.45s ease ${i * 0.08}s`,
  })

  return (
    <section className={`${sectionBackgrounds.comparison} py-24`}>
      <div className="container mx-auto px-4">
        <div ref={ref} className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-3xl font-bold text-white">
            {content.heading}
          </h2>

          {/* 데스크톱: 표 */}
          <Card
            className={`hidden overflow-hidden md:block ${comparisonTableStyles.border} bg-white/5 shadow-xl`}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={comparisonTableStyles.header}>
                    <th className={`p-4 text-left font-bold ${comparisonTableStyles.headerText}`}>
                      {content.columns.base}
                    </th>
                    <th className={`p-4 text-center font-bold ${comparisonTableStyles.headerText}`}>
                      {content.columns.typical}
                    </th>
                    <th className="bg-purple-600 p-4 text-center font-bold text-white">
                      {content.columns.lab}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {content.rows.map((row, i) => (
                    <tr
                      key={row.label}
                      className={comparisonTableStyles.rowBorder}
                      style={rowStyle(i)}
                    >
                      <td className="p-4 font-semibold text-gray-200">{row.label}</td>
                      <td className="p-4 text-gray-400">
                        <span className="flex items-center justify-center gap-2 text-center">
                          <CrossMark />
                          {row.typical}
                        </span>
                      </td>
                      <td className="bg-purple-500/10 p-4 font-medium text-purple-100">
                        <span className="flex items-center justify-center gap-2 text-center">
                          <CheckMark />
                          {row.aimakeLab}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* 모바일: 항목별 카드 */}
          <div className="space-y-4 md:hidden">
            {content.rows.map((row, i) => (
              <Card key={row.label} className="overflow-hidden border-white/10 bg-white/5 text-gray-200 shadow-md" style={rowStyle(i)}>
                <div className="bg-white/10 px-4 py-2 text-sm font-bold text-gray-200">
                  {row.label}
                </div>
                <div className="space-y-3 p-4">
                  <div className="flex items-start gap-2 text-sm text-gray-400">
                    <CrossMark />
                    <span>
                      <span className="mr-1 font-semibold">{content.columns.typical}</span>
                      {row.typical}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 rounded-lg bg-purple-500/15 p-2 text-sm text-purple-100">
                    <CheckMark />
                    <span>
                      <span className="mr-1 font-semibold">{content.columns.lab}</span>
                      {row.aimakeLab}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/** 일반 학원 셀에 붙는 ✕ 뱃지 */
function CrossMark() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="#1e293b" />
      <path
        d="M 7 7 L 13 13 M 13 7 L 7 13"
        stroke="#64748b"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** AI Maker Lab 셀에 붙는 ✓ 뱃지 */
function CheckMark() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="#a855f7" />
      <path
        d="M 6 10.5 L 9 13.5 L 14.5 7"
        fill="none"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
