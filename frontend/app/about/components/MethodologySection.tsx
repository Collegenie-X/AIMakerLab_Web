import { Card } from "@/components/ui/data-display/card"
import { ArrowRight } from "lucide-react"
import { useAboutSectionContent } from "../hooks/useAboutContent"
import { themeText, themeColors } from "@/theme"
import { 
  methodologyIcons, 
  themeStyles, 
  sectionBackgrounds, 
  sectionDividers,
  type ThemeColor 
} from "../config"

/**
 * 교육 방법론 섹션
 * JSON 파일에서 컨텐츠를 불러오고, config.ts에서 스타일 설정을 가져옵니다.
 */
export function MethodologySection() {
  const { content, isLoading, error } = useAboutSectionContent('methodology')

  if (isLoading || !content) return null
  if (error) {
    console.error('Methodology 섹션 컨텐츠 로딩 실패:', error)
    return null
  }
  
  return (
    <section className={`${sectionBackgrounds.methodology} py-24`}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          <h2 className={`mb-4 text-center ${themeText.h2} ${themeColors.heading}`}>
            {content.heading}
          </h2>
          <div className={`mb-16 mx-auto h-1 w-24 bg-gradient-to-r ${sectionDividers.methodology}`}></div>

          {/* 모바일: 세로 스택, 태블릿 이상: 가로 한 줄 */}
          <div className="mb-12">
            {/* 작은 화면: 세로 정렬 */}
            <div className="flex flex-col gap-6 lg:hidden">
              {content.steps.map((step) => {
                const Icon = methodologyIcons[step.order]
                const color = (step.color ?? 'blue') as ThemeColor
                const theme = themeStyles[color]
                
                return (
                  <Card key={step.order} className={`border-2 p-6 text-center shadow-lg ${theme.border} bg-gradient-to-br ${theme.bgGradient}`}>
                    <div className="mb-4 flex justify-center">
                      <div className={`flex h-20 w-20 items-center justify-center rounded-full ${theme.circleBg}`}>
                        <Icon className={`h-10 w-10 ${theme.text}`} />
                      </div>
                    </div>
                    <h3 className={`mb-2 text-lg font-bold ${theme.textDark}`}>
                      {step.order}. {step.title}
                    </h3>
                    <p className={`text-sm ${theme.text}`}>
                      {step.subtitle}
                    </p>
                  </Card>
                )
              })}
            </div>

            {/* 큰 화면: 가로 정렬 (4단계) */}
            <div className="hidden lg:flex items-center justify-center gap-6">
              {content.steps.map((step, idx) => {
                const Icon = methodologyIcons[step.order]
                const color = (step.color ?? 'blue') as ThemeColor
                const theme = themeStyles[color]
                
                return (
                  <div key={step.order} className="flex items-center gap-6">
                    <Card className={`flex-1 min-w-[200px] max-w-[240px] border-2 p-6 text-center shadow-lg ${theme.border} bg-gradient-to-br ${theme.bgGradient}`}>
                      <div className="mb-4 flex justify-center">
                        <div className={`flex h-20 w-20 items-center justify-center rounded-full ${theme.circleBg}`}>
                          <Icon className={`h-10 w-10 ${theme.text}`} />
                        </div>
                      </div>
                      <h3 className={`mb-2 text-lg font-bold ${theme.textDark}`}>
                        {step.order}. {step.title}
                      </h3>
                      <p className={`text-sm ${theme.text}`}>
                        {step.subtitle}
                      </p>
                    </Card>
                    {idx < content.steps.length - 1 && (
                      <ArrowRight className="h-10 w-10 text-purple-400 flex-shrink-0" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

