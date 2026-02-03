import { Card } from "@/components/ui/data-display/card"
import { useAboutSectionContent } from "../hooks/useAboutContent"
import { Star, ExternalLink } from "lucide-react"
import { themeText, themeColors } from "@/theme"
import { 
  projectIcons, 
  themeStyles, 
  sectionBackgrounds, 
  sectionDividers,
  type ThemeColor 
} from "../config"
import Link from "next/link"

/**
 * 학생 작품 갤러리 섹션
 * JSON 파일에서 컨텐츠를 불러오고, config.ts에서 스타일 설정을 가져옵니다.
 * 각 카드를 클릭하면 해당 작품 페이지로 이동합니다.
 */
export function ProjectsGallerySection() {
  const { content, isLoading, error } = useAboutSectionContent('projects')

  if (isLoading || !content) return null
  if (error) {
    console.error('Projects 섹션 컨텐츠 로딩 실패:', error)
    return null
  }
  
  return (
    <section className={`${sectionBackgrounds.projects} py-24`}>
      <div className="container mx-auto px-2">
        <div className="mx-auto max-w-6xl">
          <h2 className={`mb-4 text-center ${themeText.h2} ${themeColors.heading}`}>
            {content.heading}
          </h2>
          <div className={`mb-4 mx-auto h-1 w-24 bg-gradient-to-r ${sectionDividers.projects}`}></div>
          <p className={`mb-16 text-center ${themeText.body} ${themeColors.muted}`}>
            {content.subtitle}
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {content.items.map((proj) => {
              const Icon = projectIcons[proj.icon]
              const theme = themeStyles[proj.theme as ThemeColor]
              
              const CardContent = (
                <>
                  <div className={`flex aspect-video items-center justify-center bg-gradient-to-br ${theme.bgGradient} relative`}>
                    <Icon className={`h-32 w-32 ${theme.icon}`} />
                    {proj.url && (
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className={`h-6 w-6 ${theme.icon}`} />
                      </div>
                    )}
                  </div>
                  <div className="px-6 py-3">
                    <div className={`mb-3 inline-block rounded-full px-3 py-1 text-sm font-semibold ${theme.badge}`}>
                      {proj.categoryBadge}
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-gray-800">{proj.title}</h3>
                    <p className="mb-4 text-sm text-gray-600">{proj.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{proj.student}</span>
                    </div>
                  </div>
                </>
              )
              
              if (proj.url) {
                return (
                  <Link key={proj.id} href={proj.url}>
                    <Card
                      className={`group overflow-hidden border-2 bg-gradient-to-br ${theme.border} from-transparent to-transparent shadow-lg transition-all hover:scale-105 hover:shadow-2xl cursor-pointer`}
                    >
                      {CardContent}
                    </Card>
                  </Link>
                )
              }
              
              return (
                <Card
                  key={proj.id}
                  className={`group overflow-hidden border-2 bg-gradient-to-br ${theme.border} from-transparent to-transparent shadow-lg transition-all hover:scale-105 hover:shadow-2xl`}
                >
                  {CardContent}
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

