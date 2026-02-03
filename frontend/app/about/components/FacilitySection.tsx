import { Card } from "@/components/ui/data-display/card"
import { Sparkles, CheckCircle2 } from "lucide-react"
import { useAboutSectionContent } from "../hooks/useAboutContent"
import { themeText, themeColors } from "@/theme"
import { 
  facilityStatIcons, 
  themeStyles, 
  sectionBackgrounds, 
  sectionDividers,
  type ThemeColor 
} from "../config"

/**
 * 교육 시설 섹션
 * JSON 파일에서 컨텐츠를 불러오고, config.ts에서 스타일 설정을 가져옵니다.
 */
export function FacilitySection() {
  const { content, isLoading, error } = useAboutSectionContent('facility')

  if (isLoading || !content) return null
  if (error) {
    console.error('Facility 섹션 컨텐츠 로딩 실패:', error)
    return null
  }
  
  return (
    <section className={`${sectionBackgrounds.facility} py-24`}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className={`mb-4 text-center ${themeText.h2} ${themeColors.heading}`}>
            {content.heading}
          </h2>
          <div className={`mb-16 mx-auto h-1 w-30 bg-gradient-to-r ${sectionDividers.facility}`}></div>

          <div className="mb-12 grid gap-8 md:grid-cols-2 md:items-center">
            <div className="flex aspect-video items-center justify-center rounded-lg border-4 border-cyan-200 bg-gradient-to-br from-cyan-100 to-blue-100 shadow-xl">
              <div className="text-center">
                <Sparkles className="mx-auto mb-4 h-32 w-32 text-cyan-500" />                
              </div>
            </div>
            <div>
              <h3 className="mb-6 text-3xl font-bold text-gray-800">
                {content.subheading.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i === 0 && <br />}
                  </span>
                ))}
              </h3>
              <p className={`mb-6 leading-relaxed ${themeText.body} ${themeColors.body}`}>
                {content.description}
              </p>

              <div className="space-y-4">
                {content.features.map((f) => (
                  <div key={f.title} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-6 w-6 flex-shrink-0 text-green-500" />
                    <div>
                      <span className="font-semibold text-gray-800">{f.title}</span>
                      <p className="text-sm text-gray-600">{f.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {content.stats.map((s) => {
              const Icon = facilityStatIcons[s.theme]
              const theme = themeStyles[s.theme]
              
              return (
                <Card 
                  key={s.label} 
                  className={`border-2 bg-gradient-to-br p-4 text-center shadow-lg ${theme.border} ${theme.bgGradient}`}
                >
                  <Icon className={`mx-auto my-2 h-12 w-12 ${theme.icon}`} />
                  <div className={`text-3xl mb-[-20px] font-bold ${theme.textDark}`}>
                    {s.value}
                  </div>
                  <div className={`mb-1 text-lg ${theme.text}`}>{s.label}</div>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

