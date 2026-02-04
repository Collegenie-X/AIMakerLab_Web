"use client"

import { GraduationCap, Star } from "lucide-react"
import type { InstructorInfo, ScheduleTexts } from "../../config"

type Props = {
  instructor: string
  instructorInfo?: InstructorInfo
  rating: number
  reviews: number
  texts: ScheduleTexts
}

/**
 * 강사 탭 컴포넌트
 */
export function InstructorTab({ instructor, instructorInfo, rating, reviews, texts }: Props) {
  if (!instructorInfo) {
    return (
      <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
        <div>
          <div className="text-sm text-gray-500">{texts.labels.instructor}</div>
          <div className="text-lg font-semibold">{instructor}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="mb-4 flex items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-white">
          <GraduationCap className="h-10 w-10" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{instructorInfo.name}</h3>
          <p className="text-blue-600 font-medium">{instructorInfo.title}</p>
        </div>
      </div>
      
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg bg-white p-3">
          <div className="text-xs text-gray-500">경력</div>
          <div className="font-semibold text-gray-900">{instructorInfo.experience}</div>
        </div>
        <div className="rounded-lg bg-white p-3">
          <div className="text-xs text-gray-500">전문 분야</div>
          <div className="font-semibold text-gray-900">{instructorInfo.specialization}</div>
        </div>
        <div className="rounded-lg bg-white p-3">
          <div className="text-xs text-gray-500">학력</div>
          <div className="font-semibold text-gray-900">{instructorInfo.education}</div>
        </div>
      </div>
      
      <div className="rounded-lg bg-white p-4">
        <h4 className="mb-2 font-semibold text-gray-900">소개</h4>
        <p className="text-sm leading-relaxed text-gray-700">{instructorInfo.introduction}</p>
      </div>
      
      <div className="mt-4 flex items-center gap-3 rounded-lg bg-white p-3">
        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        <span className="text-lg font-bold">{rating}</span>
        <span className="text-gray-600">강사 평점 ({reviews}개 리뷰)</span>
      </div>
    </div>
  )
}
