import { useAboutSectionContent } from "../hooks/useAboutContent"
import { themeText, themeColors } from "@/theme"
import { sectionBackgrounds, sectionDividers } from "../config"

/**
 * 연혁 섹션
 * JSON 파일에서 컨텐츠를 불러오고, config.ts에서 스타일 설정을 가져옵니다.
 */
export function HistorySection() {
  const { content, isLoading, error } = useAboutSectionContent('history')

  if (isLoading || !content) return null
  if (error) {
    console.error('History 섹션 컨텐츠 로딩 실패:', error)
    return null
  }
  
  return (
    <section className={`${sectionBackgrounds.history} py-24`}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h2 className={`mb-4 text-center ${themeText.h3} ${themeColors.heading}`}>
            {content.heading}
          </h2>
          <div className={`mb-12 h-1 w-24 bg-gradient-to-r ${sectionDividers.history} mx-auto`}></div>

          <div className="space-y-12">
            {content.items.map((item) => (
              <div key={item.year} className="flex gap-8">
                <div className="flex-shrink-0">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-blue-300 bg-gradient-to-br from-blue-100 to-blue-200 text-2xl font-bold text-blue-700 shadow-lg">
                    {String(item.year).slice(2)}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className={`mb-4 ${themeText.h3} ${themeColors.heading}`}>
                    {item.year}
                  </h3>
                  <ul className={`space-y-2 ${themeColors.body}`}>
                    {item.bullets.map((b, idx) => (
                      <li key={idx}>• {b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

