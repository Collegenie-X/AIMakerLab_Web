"use client"

import { Badge } from "@/components/ui/data-display/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/data-display/card"
import { Button } from "@/components/ui/buttons/button"
import { Calendar, Clock, Star, Users, Send, DollarSign } from "lucide-react"
import { useRouter } from "next/navigation"
import type { ScheduleItem, ScheduleTexts } from "../config"
import { useState } from "react"

type Props = {
  item: ScheduleItem
  texts: ScheduleTexts
  onViewDetail?: (item: ScheduleItem) => void
}

/**
 * 가격 계산 함수
 */
function calculatePrice(
  studentCount: number,
  hours: number,
  materialsPerKit: number,
  studentsPerKit: number,
  instructorFeePerHour: number
) {
  const kitCount = Math.ceil(studentCount / studentsPerKit)
  const materialsTotal = kitCount * materialsPerKit
  const instructorTotal = hours * instructorFeePerHour
  return materialsTotal + instructorTotal
}

/**
 * 수업 카드 컴포넌트 (출강 교육 커리큘럼용)
 * @param item - 수업 정보
 * @param texts - 표시할 텍스트 설정
 * @param onViewDetail - 상세보기 핸들러
 */
export function ScheduleCard({ item, texts, onViewDetail }: Props) {
  const router = useRouter()
  
  // JSON에서 기본값 가져오기 (없으면 폴백)
  const defaultStudents = item.pricingInfo?.defaultStudents || 12
  const [selectedStudents, setSelectedStudents] = useState(defaultStudents)
  
  const isClosed = item.capacity ? item.enrolled >= item.capacity : false

  // 출강 수업 문의하기 핸들러
  const handleOutreachInquiry = (e: React.MouseEvent) => {
    e.stopPropagation()
    const params = new URLSearchParams({
      course: item.title,
      instructor: item.instructor,
      duration: item.duration,
      level: item.level,
    })
    router.push(`/inquiry/online?${params.toString()}`)
  }

  // 카드 클릭 핸들러
  const handleCardClick = () => {
    if (onViewDetail) {
      onViewDetail(item)
    }
  }

  return (
    <Card
      className="group cursor-pointer overflow-hidden transition-all hover:shadow-xl border-white/10 bg-gray-900"
      onClick={handleCardClick}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-gray-900">
        {(item.videoUrl || item.videoId) ? (
          <iframe
            className="h-full w-full"
            src={item.videoUrl ? item.videoUrl : `https://www.youtube.com/embed/${item.videoId}`}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-white">{item.title}</div>
        )}
        <div className="absolute right-2 top-2">
          <Badge variant={isClosed ? "destructive" : "default"}>
            {isClosed ? texts.labels.closed : texts.labels.recruiting}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="mb-2 flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {item.level}
          </Badge>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{item.rating}</span>
            <span className="text-gray-500">({item.reviews})</span>
          </div>
        </div>
        <CardTitle className="line-clamp-2 text-lg text-white group-hover:text-blue-400">{item.title}</CardTitle>
        {/* 강사 표시는 제거 */}
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="line-clamp-2 text-sm text-gray-400">{item.description}</p>

        {/* 수업 시간 표시 */}
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-blue-400" />
          <span className="font-semibold text-gray-300">{item.duration}</span>
          <span className="text-gray-500">커리큘럼</span>
        </div>

        {/* 가격 정보 - 출강 수업용 */}
        {item.pricingInfo ? (
          <div className="space-y-2 rounded-lg bg-gray-800 border border-white/10 p-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-200">
              <DollarSign className="h-4 w-4 text-blue-400" />
              <span>인원별 예상 비용</span>
            </div>

            {/* 인원 선택 슬라이더 */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>수강 인원</span>
                <span className="font-bold text-blue-400">{selectedStudents}명</span>
              </div>
              <input
                type="range"
                min={item.pricingInfo.minStudents}
                max={item.pricingInfo.maxStudents}
                step={item.pricingInfo.studentStep}
                value={selectedStudents}
                onChange={(e) => {
                  e.stopPropagation()
                  setSelectedStudents(Number(e.target.value))
                }}
                className="w-full"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{item.pricingInfo.minStudents}명</span>
                <span>{item.pricingInfo.maxStudents}명</span>
              </div>
            </div>

            {/* 비용 계산 결과 */}
            <div className="space-y-1 border-t border-white/10 pt-2 text-xs">
              <div className="flex justify-between text-gray-400">
                <span>재료비 ({Math.ceil(selectedStudents / item.pricingInfo.studentsPerKit)}세트 × {item.pricingInfo.materialsPerKit.toLocaleString()}원)</span>
                <span className="font-semibold">
                  {(Math.ceil(selectedStudents / item.pricingInfo.studentsPerKit) * item.pricingInfo.materialsPerKit).toLocaleString()}원
                </span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>강사료 ({item.durationHours}시간 × {item.pricingInfo.instructorFeePerHour.toLocaleString()}원)</span>
                <span className="font-semibold">
                  {(item.durationHours * item.pricingInfo.instructorFeePerHour).toLocaleString()}원
                </span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-1 text-sm font-bold text-blue-400">
                <span>총 예상 비용</span>
                <span>
                  {calculatePrice(
                    selectedStudents,
                    item.durationHours,
                    item.pricingInfo.materialsPerKit,
                    item.pricingInfo.studentsPerKit,
                    item.pricingInfo.instructorFeePerHour
                  ).toLocaleString()}원
                </span>
              </div>
              <div className="space-y-0.5">
                <p className="text-xs text-gray-500">
                  * {item.pricingInfo.studentsPerKit}인 1조 기준, {item.pricingInfo.minHours}시간부터 가능
                </p>
                {item.pricingInfo.rentalPerKit && (
                  <p className="text-xs font-semibold text-green-400">
                    💡 교구재 대여 가능 (교구 1개당 {item.pricingInfo.rentalPerKit.toLocaleString()}원)
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : item.price ? (
          /* 고정 가격 (주말반용) */
          <div className="rounded-lg bg-gray-800 border border-white/10 p-3">
            <div className="text-xl font-bold text-blue-400">{item.price}</div>
          </div>
        ) : null}

        {/* 버튼 영역 */}
        <div className="flex gap-2 border-t border-white/10 pt-3">
          <Button 
            variant="outline" 
            className="flex-1"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              if (onViewDetail) onViewDetail(item)
            }}
          >
            {texts.labels.seeDetail}
          </Button>
          <Button 
            className="flex-1"
            variant="default"
            size="sm"
            onClick={handleOutreachInquiry}
          >
            <Send className="mr-1 h-4 w-4" />
            문의하기
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}


