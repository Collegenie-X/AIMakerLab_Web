"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useMemo, useEffect } from "react"
import { HeroScheduleSection } from "../schedule/components/HeroScheduleSection"
import { MonthTabs } from "../schedule/components/MonthTabs"
import { ScheduleList } from "../schedule/components/ScheduleList"
import { InfoSection } from "../schedule/components/InfoSection"
import { useSchedules } from "../schedule/hooks/useSchedules"
import { getScheduleTexts, getScheduleDataUrl } from "../schedule/config"

/**
 * 주말 오프라인 수업 일정 페이지
 * 주중 수업과 동일한 레이아웃을 사용하며 데이터만 다름
 */
export default function WeekendSchedulePage() {
  // 주말 수업 텍스트 및 데이터 설정
  const texts = getScheduleTexts("weekend")
  const dataUrl = getScheduleDataUrl("weekend")
  
  const { items, months, loading, error } = useSchedules({ sourceUrl: dataUrl })
  const [selectedMonth, setSelectedMonth] = useState(months[0] ?? "")

  // 비동기 로딩 후 기본 월 자동 선택
  useEffect(() => {
    if (!selectedMonth && months.length > 0) {
      setSelectedMonth(months[0])
    }
    if (selectedMonth && months.length > 0 && !months.includes(selectedMonth)) {
      setSelectedMonth(months[0])
    }
  }, [months, selectedMonth])

  const filtered = useMemo(() => items.filter((s) => s.month === selectedMonth), [items, selectedMonth])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* 주말: 초록 계열 적용 */}
        <HeroScheduleSection texts={texts} gradientClass="from-green-600 via-emerald-600 to-teal-600" />

        <section className="w-full py-8">
          <div className="mx-auto max-w-7xl px-4">
            <MonthTabs months={months} selected={selectedMonth} onChange={setSelectedMonth} />

            <div className="mb-4">
              <h2 className="mb-1 text-2xl font-bold">
                {new Date((selectedMonth || months[0] || "2025-02") + "-01").toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                })}
                {texts.monthSuffix}
              </h2>
              <p className="text-gray-600 text-sm">총 {filtered.length}개의 수업이 있습니다</p>
            </div>

            {loading ? (
              <div className="py-12 text-center text-gray-500">로딩 중...</div>
            ) : error ? (
              <div className="py-12 text-center text-red-500">{error}</div>
            ) : filtered.length > 0 ? (
              <ScheduleList items={filtered} texts={texts} />
            ) : (
              <div className="py-12 text-center">
                <p className="text-gray-500">{texts.listEmpty}</p>
              </div>
            )}
          </div>
        </section>

        <InfoSection texts={texts} />
      </main>
      <Footer />
    </div>
  )
}

