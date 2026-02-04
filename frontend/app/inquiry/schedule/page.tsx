"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useMemo } from "react"
import {
  HeroScheduleSection,
  DurationTabs,
  ScheduleList,
  InfoContentSection,
} from "./components"
import { useSchedules } from "./hooks/useSchedules"
import {
  getScheduleTexts,
  getScheduleDataUrl,
  extractDurationOptions,
  getDurationCategory,
  gradientClasses,
  bgGradientClasses,
  pageTitles,
  pageThemes,
} from "./config"

/**
 * 출강 교육 커리큘럼 페이지
 * 
 * 학교, 기업, 기관을 위한 맞춤형 AI/메이커 교육 커리큘럼을 소개합니다.
 * - 3시간, 6시간, 12시간 단위로 구성
 * - 재료비(4인 1조 55,000원) + 강사료(시간당 50,000원)
 * - 인원수(4~20명)에 따라 유연한 가격 산정
 * 
 * config.ts에서 모든 설정을 관리하여 유지보수성을 향상시킵니다.
 * - 색상 테마: config.ts의 gradientClasses
 * - 텍스트: config.ts의 pageTitles와 getScheduleTexts
 * - 가격 정보: JSON의 pricingInfo 객체
 */
export default function OutreachCurriculumPage() {
  // 출강 교육 설정 (weekday)
  const scheduleType = "weekday"
  const texts = getScheduleTexts(scheduleType)
  const dataUrl = getScheduleDataUrl(scheduleType)
  const themeColor = pageThemes[scheduleType]
  
  // 스케줄 데이터 로드
  const { items, loading, error } = useSchedules({ sourceUrl: dataUrl })
  const [selectedDuration, setSelectedDuration] = useState("전체")

  // 사용 가능한 duration 옵션 추출
  const durations = useMemo(() => {
    return extractDurationOptions(items)
  }, [items])

  // Duration 필터링
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
        {/* Hero 섹션 */}
        <HeroScheduleSection 
          texts={texts} 
          gradientClass={gradientClasses[themeColor]} 
        />

        {/* 필터 및 리스트 섹션 */}
        <section className={`w-full py-12 ${bgGradientClasses.filter}`}>
          <div className="mx-auto max-w-7xl px-4">
            {/* Duration 필터 */}
            <div className="mb-10">
              <h2 className="mb-3 text-center text-3xl font-bold text-gray-900">
                {pageTitles.filterTitle}
              </h2>
              <p className="mb-6 text-center text-gray-600">
                {pageTitles.filterDescription}
              </p>
              <div className="flex justify-center">
                <DurationTabs 
                  durations={durations} 
                  selected={selectedDuration} 
                  onChange={setSelectedDuration} 
                />
              </div>
            </div>

            {/* 리스트 헤더 */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  {pageTitles.listTitle(selectedDuration)}
                </h3>
                <p className="text-gray-600 text-sm">
                  {pageTitles.listCount(filtered.length)}
                </p>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                {pageTitles.listHelper}
              </p>
            </div>

            {/* 스케줄 리스트 또는 로딩/에러 */}
            {loading ? (
              <div className="py-12 text-center text-gray-500">
                {pageTitles.loading}
              </div>
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

        {/* 안내 섹션 - JSON 기반 */}
        <InfoContentSection />
      </main>
      
      <Footer />
    </div>
  )
}
