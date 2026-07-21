"use client"

import { Award, Clock, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import type { EducationKit, ScheduleTexts } from "../../config"

type Props = {
  educationKit?: EducationKit
  texts: ScheduleTexts
}

/**
 * 교구재 탭 컴포넌트
 */
export function EducationKitTab({ educationKit, texts }: Props) {
  if (!educationKit) {
    return (
      <div className="rounded-lg border border-dashed border-gray-700 p-12 text-center">
        <Award className="mx-auto h-12 w-12 text-gray-600 mb-3" />
        <p className="text-gray-400">교구재 정보가 준비 중입니다.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 교구재 헤더 */}
      <div className="rounded-lg border border-gray-700 bg-gray-900 p-6">
        <h3 className="text-2xl font-bold text-white mb-2">
          {educationKit.name}
        </h3>
        <p className="text-gray-300">{educationKit.description}</p>
      </div>

      {/* 교구재 미디어 */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* 이미지 */}
        {educationKit.image && (
          <div className="rounded-lg overflow-hidden border border-gray-700 bg-gray-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={educationKit.image} 
              alt={educationKit.name}
              className="w-full h-auto object-cover"
            />
          </div>
        )}
        
        {/* 동영상 */}
        {educationKit.videoId && (
          <div className="aspect-video rounded-lg overflow-hidden bg-gray-900">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${educationKit.videoId}`}
              title={educationKit.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </div>

      {/* 가격 정보 */}
      <div className="rounded-lg border border-gray-700 bg-gray-900 p-6">
        <h4 className="text-lg font-bold text-white mb-4">교구재 옵션</h4>
        <div className="grid gap-4 md:grid-cols-2">
          {/* 구매 옵션 */}
          {educationKit.purchasePrice && (
            <div className="rounded-lg border-2 border-blue-800 bg-blue-950/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-5 w-5 text-blue-400" />
                <span className="font-semibold text-gray-200">{texts.labels.kitPurchase}</span>
              </div>
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {educationKit.purchasePrice.toLocaleString()}원
              </div>
              <p className="text-sm text-gray-400">4인 1조 기준</p>
            </div>
          )}

          {/* 대여 옵션 */}
          {educationKit.rentalPrice && (
            <div className="rounded-lg border-2 border-green-800 bg-green-950/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-green-400" />
                <span className="font-semibold text-gray-200">{texts.labels.kitRental} 가능</span>
              </div>
              <div className="text-2xl font-bold text-green-400 mb-1">
                {educationKit.rentalPrice.toLocaleString()}원
              </div>
              <p className="text-sm text-gray-400">교구 1개당 대여비</p>
            </div>
          )}
        </div>
        
        {/* 대여 안내 */}
        {educationKit.rentalPrice && (
          <div className="mt-4 rounded-lg bg-amber-950/30 border border-amber-800 p-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-900/50">
                  <span className="text-lg">💡</span>
                </div>
              </div>
              <div className="flex-1">
                <h5 className="font-semibold text-amber-300 mb-1">대여 서비스</h5>
                <p className="text-sm text-amber-200/80 leading-relaxed">
                  교구재 구매 부담 없이 대여로 진행 가능합니다. 
                  수업 후 회수하는 방식으로 비용 절감 효과가 있습니다.
                  <span className="block mt-1">
                    <strong>대여비: </strong>
                    교구 1개당 {educationKit.rentalPrice.toLocaleString()}원
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 제품 상세보기 버튼 */}
      {educationKit.productUrl && (
        <div className="text-center">
          <Button
            size="lg"
            onClick={() => window.open(educationKit.productUrl, '_blank')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <BookOpen className="mr-2 h-5 w-5" />
            {texts.labels.viewProduct}
          </Button>
        </div>
      )}
    </div>
  )
}
