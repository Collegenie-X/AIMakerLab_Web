"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/overlays/dialog"
import { useCallback, useState } from "react"
import { Button } from "@/components/ui/buttons/button"
import { Calendar, CheckCircle2, Clock, Star, Users } from "lucide-react"
import type { ScheduleItem, ScheduleTexts } from "../config"
import { ScheduleMediaGallery } from "./ScheduleMediaGallery"

type Props = {
  item: ScheduleItem
  trigger: React.ReactNode
  texts: ScheduleTexts
}

/**
 * 수업 상세 정보 다이얼로그 컴포넌트
 * @param item - 수업 정보
 * @param trigger - 다이얼로그를 여는 트리거 요소
 * @param texts - 표시할 텍스트 설정
 */
export function ScheduleDetailDialog({ item, trigger, texts }: Props) {
  const isClosed = item.enrolled >= item.capacity
  const [open, setOpen] = useState(false)

  const handleTriggerClick = useCallback(() => {
    if (typeof window !== "undefined") {
      try {
        window.scrollTo({ top: 0, behavior: "smooth" })
      } catch {
        window.scrollTo(0, 0)
      }
    }
    window.setTimeout(() => setOpen(true), 200)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div role="button" onClick={handleTriggerClick} aria-label="수업 상세 열기">
        {trigger}
      </div>
      <DialogContent className="h-[90vh] overflow-y-auto sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{item.title}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4">
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-900">
              {(item.videoUrl || item.videoId) ? (
                <iframe
                  className="h-full w-full"
                  src={item.videoUrl ? item.videoUrl : `https://www.youtube.com/embed/${item.videoId}`}
                  title={item.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : null}
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold">{texts.labels.intro}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold">{texts.labels.curriculum}</h3>
              <div className="space-y-1.5">
                {item.curriculum.map((c, i) => (
                  <div key={i} className="flex gap-3 rounded-lg border p-2.5">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-600" />
                    <span className="text-sm text-gray-700">{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {item.gallery && item.gallery.length > 0 ? (
              <div>
                <h3 className="mb-3 text-lg font-semibold">{texts.labels.mediaGallery}</h3>
                <ScheduleMediaGallery items={item.gallery} />
              </div>
            ) : null}
          </div>

          <aside className="space-y-3 lg:pl-2">
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
              <div>
                <div className="text-sm text-gray-500">{texts.labels.instructor}</div>
                <div className="font-semibold">{item.instructor}</div>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-bold">{item.rating}</span>
                <span className="text-gray-500">({item.reviews}{texts.labels.reviews})</span>
              </div>
            </div>

            <div className="grid gap-2.5">
              <div className="flex items-center gap-3 rounded-lg border p-2.5">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-xs text-gray-500">{texts.labels.openingDate}</div>
                  <div className="font-semibold">{item.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border p-2.5">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-xs text-gray-500">{texts.labels.classTime}</div>
                  <div className="font-semibold">{item.time}</div>
                </div>
              </div>
              <div className="rounded-lg border p-2.5">
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
            </div>

            <div className="flex items-center justify-between rounded-lg bg-blue-50 p-3">
              <div>
                <div className="text-sm text-gray-600">{texts.labels.price}</div>
                <div className="text-2xl font-bold text-blue-600">{item.price}</div>
                <div className="text-xs text-gray-500">{item.duration}</div>
              </div>
              <Button size="lg" disabled={isClosed}>
                {isClosed ? texts.labels.closedFull : texts.labels.apply}
              </Button>
            </div>
          </aside>
        </div>
      </DialogContent>
    </Dialog>
  )
}


