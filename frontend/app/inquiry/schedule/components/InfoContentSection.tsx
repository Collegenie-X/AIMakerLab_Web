"use client"

import { useScheduleContent } from "../hooks/useScheduleContent"

/**
 * JSON 기반 안내 섹션 컴포넌트
 * 
 * schedule-content.json 파일에서 안내 정보를 로드하여 표시합니다.
 * 컨텐츠 수정은 JSON 파일에서만 하면 되므로 유지보수가 편리합니다.
 */
export function InfoContentSection() {
  const { content, loading, error } = useScheduleContent()

  // 로딩 중일 때
  if (loading) {
    return (
      <section className="w-full bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="space-y-3">
                <div className="h-24 bg-gray-200 rounded"></div>
                <div className="h-24 bg-gray-200 rounded"></div>
                <div className="h-24 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // 에러 발생 시
  if (error || !content) {
    return (
      <section className="w-full bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center text-red-500">
            컨텐츠를 불러오는데 실패했습니다.
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-2xl font-bold">{content.info.title}</h2>
          <div className="space-y-4 text-gray-600">
            {content.info.sections.map((section, index) => (
              <div key={index} className="rounded-lg bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="mb-2 font-semibold text-gray-900">
                  {section.emoji} {section.title}
                </h3>
                <p className="text-sm leading-relaxed">{section.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
