"use client"

import { Calendar, Clock, Star, Users, DollarSign, Send } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import type { ScheduleItem, ScheduleTexts } from "../../config"

type Props = {
  item: ScheduleItem
  texts: ScheduleTexts
  isClosed: boolean
  onOutreachInquiry: () => void
}

/**
 * 사이드바 가격 정보 컴포넌트
 */
export function PricingSidebar({ item, texts, isClosed, onOutreachInquiry }: Props) {
  return (
    <aside className="space-y-4 lg:sticky lg:top-4 lg:h-fit">
      <div className="rounded-lg border border-gray-700 bg-gray-900 p-4 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-400">{texts.labels.instructor}</div>
            <div className="font-semibold text-white">{item.instructor}</div>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="text-lg font-bold">{item.rating}</span>
            <span className="text-sm text-gray-400">({item.reviews})</span>
          </div>
        </div>

        <div className="mb-4 grid gap-3">
          {/* 날짜 (있는 경우만 표시) */}
          {item.date && (
            <div className="flex items-center gap-3 rounded-lg border border-gray-700 p-3">
              <Calendar className="h-5 w-5 text-blue-400" />
              <div className="flex-1">
                <div className="text-xs text-gray-400">{texts.labels.openingDate}</div>
                <div className="font-semibold text-sm text-white">{item.date}</div>
              </div>
            </div>
          )}
          
          {/* 수업 시간 */}
          <div className="flex items-center gap-3 rounded-lg border border-gray-700 p-3">
            <Clock className="h-5 w-5 text-blue-400" />
            <div className="flex-1">
              <div className="text-xs text-gray-400">{texts.labels.duration}</div>
              <div className="font-semibold text-sm text-white">{item.duration}</div>
              {item.time && <div className="text-xs text-gray-400 mt-1">{item.time}</div>}
            </div>
          </div>
          
          {/* 수강 인원 (있는 경우만 표시) */}
          {item.capacity && item.enrolled !== undefined && (
            <div className="rounded-lg border border-gray-700 p-3">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm font-medium text-gray-300">
                  <Users className="h-4 w-4 text-blue-400" />
                  수강 인원
                </div>
                <span className="text-xs text-gray-400">
                  {item.capacity - item.enrolled > 0
                    ? `${item.capacity - item.enrolled}${texts.labels.remain}`
                    : texts.labels.closed}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-blue-400">{item.enrolled}명</span>
                <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-gray-700">
                  <div
                    className="absolute left-0 top-0 h-2 rounded-full bg-blue-500 transition-all"
                    style={{ width: `${(item.enrolled / item.capacity) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-300">{item.capacity}명</span>
              </div>
            </div>
          )}
        </div>

        {/* 가격 정보 */}
        <div className="rounded-lg bg-gray-800 p-4 shadow-sm border border-gray-700 mb-4">
          {item.pricingInfo ? (
            /* 출강 수업용 유연한 가격 */
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-blue-400" />
                <h4 className="font-bold text-white">가격 구성</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>재료비 (4인 1세트)</span>
                  <span className="font-semibold">{item.pricingInfo.materialsPerKit.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>강사료 (시간당)</span>
                  <span className="font-semibold">{item.pricingInfo.instructorFeePerHour.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between border-t border-gray-600 pt-2 text-blue-400 font-bold">
                  <span>{item.durationHours}시간 기준</span>
                  <span>
                    {(item.pricingInfo.materialsPerKit + 
                      item.durationHours * item.pricingInfo.instructorFeePerHour).toLocaleString()}원~
                  </span>
                </div>
              </div>
              <div className="border-t border-gray-600 pt-2 space-y-1">
                <p className="text-xs text-gray-400">
                  * 인원수({item.pricingInfo.minStudents}~{item.pricingInfo.maxStudents}명)와 장소에 따라 견적이 달라집니다.
                </p>
                <p className="text-xs text-gray-400">
                  * 최소 {item.pricingInfo.minHours}시간부터 진행 가능
                </p>
                {item.pricingInfo.rentalPerKit && (
                  <p className="text-xs font-semibold text-green-400 mt-2">
                    💡 교구재 대여 가능: 교구 1개당 {item.pricingInfo.rentalPerKit.toLocaleString()}원
                  </p>
                )}
              </div>
            </div>
          ) : item.price ? (
            /* 고정 가격 (주말반용) */
            <div className="space-y-2">
              <div className="text-sm text-gray-400">{texts.labels.price}</div>
              <div className="text-3xl font-bold text-blue-400">{item.price}</div>
              <div className="text-sm text-gray-400">{item.duration}</div>
            </div>
          ) : null}
        </div>

        {/* 액션 버튼 */}
        <div className="flex flex-col gap-3">
          {item.capacity && item.enrolled !== undefined && (
            <Button 
              size="lg" 
              disabled={isClosed}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all w-full"
            >
              {isClosed ? texts.labels.closedFull : texts.labels.apply}
            </Button>
          )}
          
          <Button 
            size="lg"
            variant="outline"
            onClick={onOutreachInquiry}
            className="border-2 border-purple-500 text-purple-400 hover:bg-purple-950 px-8 py-6 text-base font-semibold w-full"
          >
            <Send className="mr-2 h-5 w-5" />
            출강 수업 문의하기
          </Button>
        </div>
      </div>
    </aside>
  )
}
