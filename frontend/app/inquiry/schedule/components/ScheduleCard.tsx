"use client"

import { Badge } from "@/components/ui/data-display/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/data-display/card"
import { Button } from "@/components/ui/buttons/button"
import { Calendar, Clock, Star, Users, Send } from "lucide-react"
import { useRouter } from "next/navigation"
import type { ScheduleItem, ScheduleTexts } from "../config"

type Props = {
  item: ScheduleItem
  texts: ScheduleTexts
  onViewDetail?: (item: ScheduleItem) => void
}

/**
 * 수업 카드 컴포넌트
 * @param item - 수업 정보
 * @param texts - 표시할 텍스트 설정
 * @param onViewDetail - 상세보기 핸들러
 */
export function ScheduleCard({ item, texts, onViewDetail }: Props) {
  const router = useRouter()
  const isClosed = item.enrolled >= item.capacity

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
      className="group cursor-pointer overflow-hidden transition-all hover:shadow-xl"
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
        <CardTitle className="line-clamp-2 text-lg group-hover:text-blue-600">{item.title}</CardTitle>
        {/* 강사 표시는 제거 */}
      </CardHeader>

      <CardContent className="space-y-2">
        <p className="line-clamp-2 text-sm text-gray-600">{item.description}</p>

        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-600" />
            <span>{item.date}</span>
          </div>
          <div className="flex items-center gap-2 justify-end">
            <Clock className="h-4 w-4 text-blue-600" />
            <span>{item.time}</span>
          </div>
        </div>

        <div className="rounded-lg bg-blue-50 p-2">
          <div className="mb-1 flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
              <Users className="h-4 w-4 text-blue-600" />
              수강 인원
            </div>
            <span className="text-xs text-gray-600">
              {item.capacity - item.enrolled > 0 ? `${item.capacity - item.enrolled}${texts.labels.remain}` :
                texts.labels.closed}
            </span>
          </div>
          {/* 좌: 현재 인원, 가운데: 진행바, 우: 총 정원 */}
          <div className="mt-1 flex items-center gap-3">
            <span className="text-sm font-semibold text-blue-600">{item.enrolled}명</span>
            <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
              <div
                className="absolute left-0 top-0 h-2 rounded-full bg-blue-600 transition-all"
                style={{ width: `${(item.enrolled / item.capacity) * 100}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-gray-700">{item.capacity}명</span>
          </div>
        </div>

        <div className="space-y-2 border-t pt-3">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-blue-600">{item.price}</div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                if (onViewDetail) onViewDetail(item)
              }}
            >
              {texts.labels.seeDetail}
            </Button>
          </div>
          <Button 
            className="w-full"
            variant="secondary"
            size="sm"
            onClick={handleOutreachInquiry}
          >
            <Send className="mr-2 h-4 w-4" />
            출강 수업 문의하기
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}


