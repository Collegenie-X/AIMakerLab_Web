import { useAboutSectionContent } from "../hooks/useAboutContent"
import { themeText, themeColors } from "@/theme"
import { 
  philosophyIcons, 
  themeStyles, 
  sectionBackgrounds, 
  sectionDividers 
} from "../config"

/**
 * 교육 철학 섹션
 * JSON 파일에서 컨텐츠를 불러오고, config.ts에서 스타일 설정을 가져옵니다.
 */
export function PhilosophySection() {
  const { content, isLoading, error } = useAboutSectionContent('philosophy')

  if (isLoading || !content) return null
  if (error) {
    console.error('Philosophy 섹션 컨텐츠 로딩 실패:', error)
    return null
  }
  
  return (
    <section className={`${sectionBackgrounds.philosophy} py-24`}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className={`mb-4 text-center ${themeText.h2} ${themeColors.heading}`}>
            {content.heading}
          </h2>
          <div className={`mb-16 mx-auto h-1 w-24 bg-gradient-to-r ${sectionDividers.philosophy}`}></div>

          <div className="grid gap-12 md:grid-cols-3">
            {content.items.map((item) => {
              const Icon = philosophyIcons[item.id]
              const theme = themeStyles[item.color]
              
              return (
                <div key={item.id} className="group text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="relative">
                      <div className="absolute -inset-4 animate-pulse rounded-full bg-blue-200/50"></div>
                      <div className={`relative flex h-56 w-56 items-center justify-center rounded-full border-8 bg-gradient-to-br ${theme.ring} shadow-xl transition-transform group-hover:scale-105`}>
                        <div className="text-center">
                          <Icon className={`mx-auto mb-3 h-16 w-16 ${theme.icon}`} />
                          <div className={`text-sm font-semibold uppercase ${theme.text}`}>
                            {item.topLabelEn}
                          </div>
                          <div className={`text-3xl font-bold ${theme.textDark}`}>
                            {item.topLabelKo}
                          </div>
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


