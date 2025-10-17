import Link from 'next/link'
import { GraduationCap, MessageSquare, Calendar } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/data-display/card'

/**
 * 수업 방식 카드 컴포넌트 (방문, 온라인, 주말)
 */
export function ClassTypeCards() {
  const classTypes = [
    {
      id: 'visit',
      title: '방문 수업',
      icon: GraduationCap,
      color: 'teal',
      description: '전문 강사가 학교로 직접 방문하여 수업을 진행합니다',
      features: ['교구 대여 포함', '커리큘럼 맞춤', '20-30명 수업'],
      link: '/inquiry/method'
    },
    {
      id: 'online',
      title: '온라인 수업',
      icon: MessageSquare,
      color: 'blue',
      description: 'Zoom을 활용한 실시간 온라인 수업으로 전국 어디서나 가능',
      features: ['키트 택배 발송', '실시간 지도', '녹화 영상 제공'],
      link: '/inquiry/online'
    },
    {
      id: 'weekend',
      title: '주말 특강',
      icon: Calendar,
      color: 'purple',
      description: '주말을 활용한 집중 수업으로 프로젝트를 완성합니다',
      features: ['토요일 2시간 × 3주', '소규모 그룹', '개인 프로젝트'],
      link: '/inquiry/weekend-schedule'
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3 mb-8">
      {classTypes.map((type) => {
        const Icon = type.icon
        const bgColor = {
          teal: 'bg-teal-100',
          blue: 'bg-blue-100',
          purple: 'bg-purple-100'
        }[type.color]
        const iconColor = {
          teal: 'text-teal-600',
          blue: 'text-blue-600',
          purple: 'text-purple-600'
        }[type.color]
        const borderColor = {
          teal: 'border-teal-200',
          blue: 'border-blue-200',
          purple: 'border-purple-200'
        }[type.color]

        return (
          <Link key={type.id} href={type.link}>
            <Card className={`border-2 ${borderColor} transition-all hover:shadow-lg cursor-pointer h-full`}>
              <CardContent className="p-5">
                <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full ${bgColor}`}>
                  <Icon className={`h-6 w-6 ${iconColor}`} />
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">{type.title}</h3>
                <p className="mb-3 text-sm text-gray-600 leading-relaxed">
                  {type.description}
                </p>
                <ul className="space-y-1">
                  {type.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                      <span className={iconColor}>•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}

