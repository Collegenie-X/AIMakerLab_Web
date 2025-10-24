import { Lightbulb, Rocket, Award } from "lucide-react"
import { useAboutSectionContent } from "../hooks/useAboutContent"
import { themeText, themeColors } from "@/theme"

/**
 * About 페이지 히어로 섹션
 * JSON 파일에서 컨텐츠를 불러옵니다.
 */
export function HeroAboutSection() {
  const { content, isLoading, error } = useAboutSectionContent('hero')

  // 로딩 상태
  if (isLoading) {
    return (
      <section className="relative bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-32">
        <div className="container relative z-5 mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="animate-pulse">
              <div className="mb-8 h-24 w-full bg-gray-200 rounded"></div>
              <div className="mb-6 h-12 w-3/4 mx-auto bg-gray-200 rounded"></div>
              <div className="mb-4 h-6 w-2/3 mx-auto bg-gray-200 rounded"></div>
              <div className="h-6 w-full bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // 에러 상태
  if (error || !content) {
    console.error('Hero 섹션 컨텐츠 로딩 실패:', error)
    return null
  }

  return (
    <section className="relative bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-32">
      <div className="container relative z-5 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center gap-6">
            <div className="animate-bounce">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-yellow-200 shadow-lg">
                <Lightbulb className="h-14 w-14 text-yellow-600" />
              </div>
            </div>
            <div className="animate-bounce delay-100">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-200 shadow-lg">
                <Rocket className="h-14 w-14 text-blue-600" />
              </div>
            </div>
            <div className="animate-bounce delay-200">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-200 shadow-lg">
                <Award className="h-14 w-14 text-green-600" />
              </div>
            </div>
          </div>
          <h1 className={`mb-6 ${themeText.h1} ${themeColors.heading}`}>{content.title}</h1>
          <p className={`mb-4 ${themeText.lead} ${themeColors.subheading}`}>{content.subtitle}</p>
          <p className={`${themeText.body} leading-relaxed ${themeColors.body}`}>
            {content.descriptions[0]}
            <br />
            {content.descriptions[1]}
          </p>
        </div>
      </div>
    </section>
  )
}


