"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/overlays/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/navigation/tabs"
import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/data-display/badge"
import { Star } from "lucide-react"
import type { ScheduleItem, ScheduleTexts } from "../config"

// 탭 컴포넌트 import
import { OverviewTab } from "./tabs/OverviewTab"
import { CurriculumTab } from "./tabs/CurriculumTab"
import { EducationKitTab } from "./tabs/EducationKitTab"
import { InstructorTab } from "./tabs/InstructorTab"
import { QnATab } from "./tabs/QnATab"
import { FAQTab } from "./tabs/FAQTab"
import { PricingSidebar } from "./sidebar/PricingSidebar"

type Props = {
  item: ScheduleItem
  trigger?: React.ReactNode
  texts: ScheduleTexts
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

/**
 * 수업 상세 정보 다이얼로그 컴포넌트
 * 섹션별로 분리된 컴포넌트 구조로 유지보수성 향상
 */
export function ScheduleDetailDialog({ item, trigger, texts, open: controlledOpen, onOpenChange }: Props) {
  const router = useRouter()
  const isClosed = item.capacity && item.enrolled ? item.enrolled >= item.capacity : false
  const [internalOpen, setInternalOpen] = useState(false)

  // 외부 제어와 내부 상태 중 선택
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = onOpenChange !== undefined ? onOpenChange : setInternalOpen

  // 출강 수업 문의하기 핸들러
  const handleOutreachInquiry = () => {
    const params = new URLSearchParams({
      course: item.title,
      instructor: item.instructor,
      duration: item.duration,
      level: item.level,
    })
    router.push(`/inquiry/online?${params.toString()}`)
  }

  // 트리거 클릭 핸들러
  const handleTriggerClick = useCallback(() => {
    if (typeof window !== "undefined") {
      try {
        window.scrollTo({ top: 0, behavior: "smooth" })
      } catch {
        window.scrollTo(0, 0)
      }
    }
    window.setTimeout(() => setOpen(true), 200)
  }, [setOpen])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && (
        <div role="button" onClick={handleTriggerClick} aria-label="수업 상세 열기">
          {trigger}
        </div>
      )}
      
      <DialogContent className="h-[90vh] overflow-y-auto sm:max-w-7xl">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-3xl mb-2">{item.title}</DialogTitle>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{item.level}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{item.rating}</span>
                    <span>({item.reviews}{texts.labels.reviews})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* 왼쪽: 탭 콘텐츠 영역 */}
          <div className="space-y-6">
            {/* 동영상 */}
            {(item.videoUrl || item.videoId) && (
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-900">
                <iframe
                  className="h-full w-full"
                  src={item.videoUrl ? item.videoUrl : `https://www.youtube.com/embed/${item.videoId}`}
                  title={item.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {/* 탭 네비게이션 */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-6 mb-4">
                <TabsTrigger value="overview">{texts.labels.overview}</TabsTrigger>
                <TabsTrigger value="curriculum">{texts.labels.curriculum}</TabsTrigger>
                <TabsTrigger value="kit">{texts.labels.educationKit}</TabsTrigger>
                <TabsTrigger value="instructor">{texts.labels.instructorTab}</TabsTrigger>
                <TabsTrigger value="qna">{texts.labels.qnaTab}</TabsTrigger>
                <TabsTrigger value="faq">{texts.labels.faqs}</TabsTrigger>
              </TabsList>

              {/* 개요 탭 */}
              <TabsContent value="overview">
                <OverviewTab item={item} texts={texts} />
              </TabsContent>

              {/* 커리큘럼 탭 */}
              <TabsContent value="curriculum">
                <CurriculumTab modules={item.curriculum} texts={texts} />
              </TabsContent>

              {/* 교구재 탭 */}
              <TabsContent value="kit">
                <EducationKitTab educationKit={item.educationKit} texts={texts} />
              </TabsContent>

              {/* 강사 탭 */}
              <TabsContent value="instructor">
                <InstructorTab 
                  instructor={item.instructor}
                  instructorInfo={item.instructorInfo}
                  rating={item.rating}
                  reviews={item.reviews}
                  texts={texts}
                />
              </TabsContent>

              {/* 질문/댓글 탭 */}
              <TabsContent value="qna">
                <QnATab commentList={item.commentList} texts={texts} />
              </TabsContent>

              {/* FAQ 탭 */}
              <TabsContent value="faq">
                <FAQTab faqs={item.faqs} texts={texts} />
              </TabsContent>
            </Tabs>
          </div>

          {/* 오른쪽: 사이드바 */}
          <PricingSidebar 
            item={item}
            texts={texts}
            isClosed={isClosed}
            onOutreachInquiry={handleOutreachInquiry}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
