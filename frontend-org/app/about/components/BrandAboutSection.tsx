import { useAboutSectionContent } from "../hooks/useAboutContent"
import { themeText, themeColors } from "@/theme"
import { aboutColors, sectionBackgrounds } from "../config"

/**
 * 브랜드 소개 섹션
 * JSON 파일에서 컨텐츠를 불러오고, config.ts에서 스타일 설정을 가져옵니다.
 */
export function BrandAboutSection() {
  const { content, isLoading, error } = useAboutSectionContent('brand')

  if (isLoading || !content) return null
  if (error) {
    console.error('Brand 섹션 컨텐츠 로딩 실패:', error)
    return null
  }
  
  return (
    <section className={`${sectionBackgrounds.brand} py-12`}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="rounded-lg border border-purple-400/30 bg-white/5 p-8  shadow-xl">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-purple-300">AI Maker</span>
                <span className="text-3xl font-bold text-pink-400">Lab</span>
              </div>
            </div>
          </div>
          <h2 className={`mb-6 ${themeText.h3} ${aboutColors.heading}`}>
            {content.heading}
          </h2>
          <div className={`space-y-4 ${themeText.body} leading-relaxed ${aboutColors.body}`}>
            {content.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

