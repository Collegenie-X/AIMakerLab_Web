"use client"

import { CheckCircle2 } from "lucide-react"
import type { CurriculumModule, ScheduleTexts } from "../../config"

type Props = {
  modules: CurriculumModule[]
  texts: ScheduleTexts
}

/**
 * 커리큘럼 탭 컴포넌트
 * 좌측: 차시 정보 및 학습 내용
 * 우측: 이미지
 */
export function CurriculumTab({ modules, texts }: Props) {
  return (
    <div className="space-y-3 mt-0">
      <h3 className="mb-4 text-xl font-bold">{texts.labels.curriculumDetail}</h3>
      
      <div className="space-y-3">
        {modules.map((module, i) => (
          <div 
            key={i} 
            className="rounded-lg border bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex gap-4 p-4">
              {/* 좌측: 차시 정보 및 학습 내용 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 text-base">
                      {module.week}: {module.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      수업 시간: {module.duration}
                    </div>
                  </div>
                </div>
                
                {/* 학습 내용 */}
                <div className="space-y-1.5 pl-11">
                  <h4 className="text-xs font-semibold text-gray-600 mb-2">학습 내용</h4>
                  {module.topics.map((topic, j) => (
                    <div key={j} className="flex gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-600 mt-0.5" />
                      <span className="leading-tight">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 우측: 이미지 (있는 경우) */}
              {module.image && (
                <div className="flex-shrink-0 w-32">
                  <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={module.image} 
                      alt={module.imageAlt || `${module.week} ${module.title}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
