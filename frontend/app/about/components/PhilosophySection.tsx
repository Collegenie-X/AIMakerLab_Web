import { Lightbulb, Target, Heart } from "lucide-react"
import { useAboutSectionContent } from "../hooks/useAboutContent"
import { themeText, themeColors } from "@/theme"

const iconById = {
  creative: Lightbulb,
  experience: Target,
  confidence: Heart,
}

/**
 * 교육 철학 섹션
 * JSON 파일에서 컨텐츠를 불러옵니다.
 */
export function PhilosophySection() {
  const { content, isLoading, error } = useAboutSectionContent('philosophy')

  if (isLoading || !content) return null
  if (error) {
    console.error('Philosophy 섹션 컨텐츠 로딩 실패:', error)
    return null
  }
  return (
    <section className="bg-gradient-to-br from-pink-50 to-purple-50 py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className={`mb-4 text-center ${themeText.h2} ${themeColors.heading}`}>{content.heading}</h2>
          <div className="mb-16 mx-auto h-1 w-24 bg-gradient-to-r from-pink-400 to-purple-400"></div>

          <div className="grid gap-12 md:grid-cols-3">
            {content.items.map((item) => {
              const Icon = iconById[item.id]
              const colorRing = item.color === 'blue' ? 'border-blue-300 from-blue-100 to-blue-50' : item.color === 'green' ? 'border-green-300 from-green-100 to-green-50' : item.color === 'pink' ? 'border-pink-300 from-pink-100 to-pink-50' : 'border-purple-300 from-purple-100 to-purple-50'
              const colorIcon = item.color === 'blue' ? 'text-blue-500' : item.color === 'green' ? 'text-green-500' : item.color === 'pink' ? 'text-pink-500' : 'text-purple-500'
              const colorUpper = item.color === 'blue' ? 'text-blue-600' : item.color === 'green' ? 'text-green-600' : item.color === 'pink' ? 'text-pink-600' : 'text-purple-600'
              const colorKo = item.color === 'blue' ? 'text-blue-700' : item.color === 'green' ? 'text-green-700' : item.color === 'pink' ? 'text-pink-700' : 'text-purple-700'
              return (
                <div key={item.id} className="group text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="relative">
                      <div className="absolute -inset-4 animate-pulse rounded-full bg-blue-200/50"></div>
                      <div className={`relative flex h-56 w-56 items-center justify-center rounded-full border-8 bg-gradient-to-br ${colorRing} shadow-xl transition-transform group-hover:scale-105`}>
                        <div className="text-center">
                          <Icon className={`mx-auto mb-3 h-16 w-16 ${colorIcon}`} />
                          <div className={`text-sm font-semibold uppercase ${colorUpper}`}>{item.topLabelEn}</div>
                          <div className={`text-3xl font-bold ${colorKo}`}>{item.topLabelKo}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-gray-800">{item.title}</h3>
                  <p className="leading-relaxed text-gray-600">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}


