import { useAboutSectionContent } from "../hooks/useAboutContent"
import { themeText, themeColors } from "@/theme"

/**
 * 브랜드 소개 섹션
 * JSON 파일에서 컨텐츠를 불러옵니다.
 */
export function BrandAboutSection() {
  const { content, isLoading, error } = useAboutSectionContent('brand')

  if (isLoading || !content) return null
  if (error) {
    console.error('Brand 섹션 컨텐츠 로딩 실패:', error)
    return null
  }
  return (
    <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="rounded-lg border-4 border-purple-300 bg-white p-8  shadow-xl">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-purple-600">AI Maker</span>
                <span className="text-3xl font-bold text-pink-600">Lab</span>
              </div>
            </div>
          </div>
          <h2 className={`mb-6 ${themeText.h3} ${themeColors.heading}`}>{content.heading}</h2>
          <div className={`space-y-4 ${themeText.body} leading-relaxed ${themeColors.body}`}>
            {content.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


