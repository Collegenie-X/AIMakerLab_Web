import { Card } from "@/components/ui/data-display/card"
import { useAboutSectionContent } from "../hooks/useAboutContent"
import { Bot, Smartphone, Home, Music, Brain, Gamepad2, Star } from "lucide-react"
import { themeText, themeColors } from "@/theme"

const iconMap = {
  bot: Bot,
  smartphone: Smartphone,
  home: Home,
  music: Music,
  brain: Brain,
  gamepad: Gamepad2,
}

const themeClass = {
  blue: {
    border: 'border-blue-200',
    bg: 'from-blue-50 to-blue-100',
    icon: 'text-blue-500',
    badge: 'bg-blue-200 text-blue-700',
  },
  purple: {
    border: 'border-purple-200',
    bg: 'from-purple-50 to-purple-100',
    icon: 'text-purple-500',
    badge: 'bg-purple-200 text-purple-700',
  },
  green: {
    border: 'border-green-200',
    bg: 'from-green-50 to-green-100',
    icon: 'text-green-500',
    badge: 'bg-green-200 text-green-700',
  },
  yellow: {
    border: 'border-yellow-200',
    bg: 'from-yellow-50 to-yellow-100',
    icon: 'text-yellow-600',
    badge: 'bg-yellow-200 text-yellow-700',
  },
  pink: {
    border: 'border-pink-200',
    bg: 'from-pink-50 to-pink-100',
    icon: 'text-pink-500',
    badge: 'bg-pink-200 text-pink-700',
  },
  orange: {
    border: 'border-orange-200',
    bg: 'from-orange-50 to-orange-100',
    icon: 'text-orange-500',
    badge: 'bg-orange-200 text-orange-700',
  },
}

/**
 * 학생 작품 갤러리 섹션
 * JSON 파일에서 컨텐츠를 불러옵니다.
 */
export function ProjectsGallerySection() {
  const { content, isLoading, error } = useAboutSectionContent('projects')

  if (isLoading || !content) return null
  if (error) {
    console.error('Projects 섹션 컨텐츠 로딩 실패:', error)
    return null
  }
  return (
    <section className="bg-gradient-to-br from-cyan-50 to-blue-10 py-24">
      <div className="container mx-auto px-2">
        <div className="mx-auto max-w-6xl">
          <h2 className={`mb-4 text-center ${themeText.h2} ${themeColors.heading}`}>{content.heading}</h2>
          <div className="mb-4 mx-auto h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-400"></div>
          <p className={`mb-16 text-center ${themeText.body} ${themeColors.muted}`}>{content.subtitle}</p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {content.items.map((proj) => {
              const Icon = iconMap[proj.icon]
              const theme = themeClass[proj.theme]
              return (
                <Card
                  key={proj.id}
                  className={`group overflow-hidden border-2 bg-gradient-to-br ${theme.border} from-transparent to-transparent shadow-lg transition-all hover:scale-105 hover:shadow-2xl`}
                >
                  <div className={`flex aspect-video items-center justify-center bg-gradient-to-br ${theme.bg}`}>
                    <Icon className={`h-32 w-32 ${theme.icon}`} />
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
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}


