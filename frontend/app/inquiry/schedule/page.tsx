"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useMemo, useEffect } from "react"
import { HeroScheduleSection } from "./components/HeroScheduleSection"
import { MonthTabs } from "./components/MonthTabs"
import { ScheduleList } from "./components/ScheduleList"
import { InfoSection } from "./components/InfoSection"
import { useSchedules } from "./hooks/useSchedules"
import { scheduleTexts } from "./config"

export default function SchedulePage() {
  const { items, months, loading, error } = useSchedules()
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
        <HeroScheduleSection />

        <section className="w-full py-8">
          <div className="mx-auto max-w-7xl px-4">
            <MonthTabs months={months} selected={selectedMonth} onChange={setSelectedMonth} />

            <div className="mb-4">
              <h2 className="mb-1 text-2xl font-bold">
                {new Date((selectedMonth || months[0] || "2025-02") + "-01").toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                })}
                {scheduleTexts.monthSuffix}
              </h2>
              <p className="text-gray-600 text-sm">총 {filtered.length}개의 수업이 있습니다</p>
            </div>

            {loading ? (
              <div className="py-12 text-center text-gray-500">로딩 중...</div>
            ) : error ? (
              <div className="py-12 text-center text-red-500">{error}</div>
            ) : filtered.length > 0 ? (
              <ScheduleList items={filtered} />
            ) : (
              <div className="py-12 text-center">
                <p className="text-gray-500">{scheduleTexts.listEmpty}</p>
              </div>
            )}
          </div>
        </section>

        <InfoSection />
      </main>
      <Footer />
    </div>
  )
}
