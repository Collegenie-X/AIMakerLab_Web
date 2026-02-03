"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useMemo } from "react"
import { HeroScheduleSection } from "./components/HeroScheduleSection"
import { DurationTabs } from "./components/DurationTabs"
import { ScheduleList } from "./components/ScheduleList"
import { InfoSection } from "./components/InfoSection"
import { useSchedules } from "./hooks/useSchedules"
import { getScheduleTexts, getScheduleDataUrl } from "./config"

/**
 * 출강 수업 커리큘럼 페이지
 */
export default function OutreachCurriculumPage() {
  // 출강 수업 텍스트 및 데이터 설정
  const texts = getScheduleTexts("weekday")
  const dataUrl = getScheduleDataUrl("weekday")
  
  const { items, loading, error } = useSchedules({ sourceUrl: dataUrl })
  const [selectedDuration, setSelectedDuration] = useState("전체")

  // Duration 매핑 함수
  const getDurationCategory = (duration: string): string => {
    if (duration.includes("3시간") || duration.includes("3h")) return "3시간"
    if (duration.includes("6시간") || duration.includes("6h")) return "6시간"
    if (duration.includes("12시간") || duration.includes("12h")) return "12시간"
    return "기타"
  }

  // 사용 가능한 duration 추출
  const durations = useMemo(() => {
    const durationSet = new Set<string>()
    items.forEach(item => {
      const category = getDurationCategory(item.duration)
      if (category !== "기타") {
        durationSet.add(category)
      }
    })
    return ["전체", ...Array.from(durationSet).sort()]
  }, [items])

  // Duration 필터링만 적용
  const filtered = useMemo(() => {
    if (selectedDuration === "전체") {
      return items
    }
    return items.filter((s) => getDurationCategory(s.duration) === selectedDuration)
  }, [items, selectedDuration])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroScheduleSection texts={texts} gradientClass="from-purple-500 via-indigo-600 to-blue-700" />

        <section className="w-full py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="mx-auto max-w-7xl px-4">
            {/* Duration 필터 - 메인으로 강조 */}
            <div className="mb-10">
              <h2 className="mb-3 text-center text-3xl font-bold text-gray-900">
                수업 시간을 선택하세요
              </h2>
              <p className="mb-6 text-center text-gray-600">
                3시간, 6시간, 12시간 중 기관 상황에 맞는 커리큘럼을 찾아보세요
              </p>
              <div className="flex justify-center">
                <DurationTabs 
                  durations={durations} 
                  selected={selectedDuration} 
                  onChange={setSelectedDuration} 
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedDuration !== "전체" ? `${selectedDuration} 커리큘럼` : "전체 커리큘럼"}
                </h3>
                <p className="text-gray-600 text-sm">
                  총 {filtered.length}개의 커리큘럼
                </p>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                마음에 드는 커리큘럼을 찾으셨나요? '출강 수업 문의하기' 버튼을 클릭해보세요!
              </p>
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
