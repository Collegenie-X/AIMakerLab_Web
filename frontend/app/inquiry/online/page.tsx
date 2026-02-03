"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { InquiryDialog } from "../components/InquiryDialog"
import { type InquiryItem } from "../config"
import {
  HeroOnlineSection,
  InquiryListSection,
  InfoOnlineSection,
} from "./components"
import { labels } from "./config"

/**
 * 출강 수업 문의 페이지
 * 
 * config.ts에서 모든 설정을 관리하여 유지보수성을 향상시킵니다.
 * - 색상 테마: config.ts의 heroGradient, statusStyles
 * - 텍스트: config.ts의 labels
 * - 컨텐츠: online-content.json
 * - 섹션 순서: 필요시 config.ts의 sectionsConfig 활용 가능
 */
export default function OnlineInquiryPage() {
  const searchParams = useSearchParams()
  const [isInquiryDialogOpen, setIsInquiryDialogOpen] = useState(false)
  const [initialInquiryData, setInitialInquiryData] = useState<InquiryItem | undefined>(undefined)

  // URL 파라미터로 전달된 수업 정보 처리
  useEffect(() => {
    const course = searchParams.get('course')
    const instructor = searchParams.get('instructor')
    const duration = searchParams.get('duration')
    const level = searchParams.get('level')

    if (course) {
      // 수업 정보가 있으면 자동으로 문의 Dialog 열기
      setInitialInquiryData({
        id: Date.now(),
        title: `${course} 출강 문의`,
        category: '출강 수업',
        status: '검토중',
        date: new Date().toISOString().slice(0, 10),
        course: course,
        instructor: instructor || undefined,
        duration: duration || undefined,
        grade: level || undefined,
      })
      setIsInquiryDialogOpen(true)
    }
  }, [searchParams])

  // 문의 작성 열기
  const handleOpenInquiry = () => {
    setInitialInquiryData(undefined)
    setIsInquiryDialogOpen(true)
  }

  // 문의 저장
  const handleSaveInquiry = (item: InquiryItem) => {
    console.log('문의 저장:', item)
    alert(labels.inquiry.successMessage)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero 섹션 */}
        <HeroOnlineSection />

        {/* 문의 목록 섹션 */}
        <InquiryListSection onOpenInquiry={handleOpenInquiry} />

        {/* 안내 섹션 - JSON 기반 */}
        <InfoOnlineSection />
      </main>

      <Footer />

      {/* 문의 작성 다이얼로그 */}
      <InquiryDialog
        open={isInquiryDialogOpen}
        onOpenChange={setIsInquiryDialogOpen}
        initial={initialInquiryData}
        onSave={handleSaveInquiry}
      />
    </div>
  )
}
