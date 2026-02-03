"use client"

import { useOnlineContent } from "../hooks/useOnlineContent"
import { Card, CardContent } from "@/components/ui/data-display/card"
import { infoCardStyles, labels } from "../config"

/**
 * JSON 기반 안내 섹션 컴포넌트
 * 
 * online-content.json 파일에서 안내 정보를 로드하여 표시합니다.
 * 컨텐츠 수정은 JSON 파일에서만 하면 되므로 유지보수가 편리합니다.
 */
export function InfoOnlineSection() {
  const { content, loading, error } = useOnlineContent()

  // 로딩 중일 때
  if (loading) {
    return (
      <section className="bg-gradient-to-br from-blue-50/50 to-purple-50/50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="animate-pulse space-y-6">
              <div className="h-10 bg-gray-200 rounded w-1/3 mx-auto"></div>
              <div className="grid gap-6 md:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded"></div>
                ))}
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
      <section className="bg-gradient-to-br from-blue-50/50 to-purple-50/50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl text-center text-red-500">
            컨텐츠를 불러오는데 실패했습니다.
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-gradient-to-br from-blue-50/50 to-purple-50/50 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 text-center text-3xl font-bold text-gray-900">
            {labels.info.title}
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {content.info.cards.map((card, index) => {
              const style = infoCardStyles[index % infoCardStyles.length]
              
              return (
                <Card 
                  key={index} 
                  className={`${style.border} bg-white/80 shadow-sm transition-shadow hover:shadow-md`}
                >
                  <CardContent className="p-6">
                    <h3 className={`mb-3 flex items-center gap-2 text-lg font-semibold ${style.titleColor}`}>
                      {card.emoji} {card.title}
                    </h3>
                    <p className="leading-relaxed text-gray-700 whitespace-pre-line">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
