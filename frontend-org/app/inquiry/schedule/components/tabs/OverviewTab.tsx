"use client"

import { CheckCircle2, Target, TrendingUp, Award, BookOpen } from "lucide-react"
import type { ScheduleItem, ScheduleTexts } from "../../config"
import { ScheduleMediaGallery } from "../ScheduleMediaGallery"

type Props = {
  item: ScheduleItem
  texts: ScheduleTexts
}

/**
 * 개요 탭 컴포넌트
 */
export function OverviewTab({ item, texts }: Props) {
  return (
    <div className="space-y-6 mt-0">
      {/* 수업 소개 */}
      <div>
        <h3 className="mb-3 flex items-center gap-2 text-xl font-bold">
          <BookOpen className="h-5 w-5 text-blue-400" />
          {texts.labels.intro}
        </h3>
        <p className="text-gray-300 leading-relaxed">{item.description}</p>
      </div>

      {/* 학습 목표 */}
      {item.learningObjectives && item.learningObjectives.length > 0 && (
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-xl font-bold">
            <Target className="h-5 w-5 text-green-400" />
            {texts.labels.learningObjectives}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {item.learningObjectives.map((objective, i) => (
              <div key={i} className="flex gap-3 rounded-lg border border-gray-700 bg-green-950/30 p-3">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-400 mt-0.5" />
                <span className="text-sm text-gray-300">{objective}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 기대 효과 */}
      {item.expectedOutcomes && item.expectedOutcomes.length > 0 && (
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-xl font-bold">
            <TrendingUp className="h-5 w-5 text-purple-400" />
            {texts.labels.expectedOutcomes}
          </h3>
          <div className="space-y-2">
            {item.expectedOutcomes.map((outcome, i) => (
              <div key={i} className="flex gap-3 rounded-lg border border-gray-700 bg-purple-950/30 p-3">
                <Award className="h-5 w-5 flex-shrink-0 text-purple-400 mt-0.5" />
                <span className="text-sm font-medium text-gray-300">{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 학생 작품 */}
      {item.studentProjects && item.studentProjects.length > 0 && (
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-xl font-bold">
            <Award className="h-5 w-5 text-orange-400" />
            {texts.labels.studentProjects}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {item.studentProjects.map((project, i) => (
              <div key={i} className="overflow-hidden rounded-lg border border-gray-700 bg-gray-900 shadow-sm transition-shadow hover:shadow-md">
                <div className="aspect-video w-full overflow-hidden bg-gray-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-white mb-1">{project.title}</h4>
                  <p className="text-xs text-gray-400">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 준비사항 */}
      <div>
        <h3 className="mb-3 text-xl font-bold">{texts.labels.requirements}</h3>
        <div className="space-y-2">
          {item.requirements.map((req, i) => (
            <div key={i} className="flex gap-3 rounded-lg border border-gray-700 p-3">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-400" />
              <span className="text-sm text-gray-300">{req}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 미디어 갤러리 */}
      {item.gallery && item.gallery.length > 0 && (
        <div>
          <h3 className="mb-3 text-xl font-bold">{texts.labels.mediaGallery}</h3>
          <ScheduleMediaGallery items={item.gallery} />
        </div>
      )}
    </div>
  )
}
