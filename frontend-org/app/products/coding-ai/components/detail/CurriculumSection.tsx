import { Clock, Target, Users, BookOpen } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/data-display/card'

/**
 * 커리큘럼 타입
 */
interface CurriculumSession {
  session: number
  title: string
  duration: string
  objectives: string[]
  activities: Array<{
    time: string
    activity: string
    description: string
  }>
  materials: string[]
  teachingTips: string
}

interface CurriculumSectionProps {
  curriculum: CurriculumSession[]
}

/**
 * 교육 커리큘럼 상세 컴포넌트 (3차시)
 */
export function CurriculumSection({ curriculum }: CurriculumSectionProps) {
  if (!curriculum || curriculum.length === 0) return null

  return (
    <section className="border-t bg-gradient-to-br from-blue-50 to-purple-50 py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">교육 커리큘럼</h2>
          <p className="text-gray-600">
            {curriculum.length}차시 완성형 수업 계획 - 선생님을 위한 상세 가이드
          </p>
        </div>

        <div className="space-y-6">
          {curriculum.map((session) => (
            <Card key={session.session} className="border-2 border-blue-200 overflow-hidden">
              {/* 헤더 */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-2xl font-bold">
                      {session.session}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{session.title}</h3>
                      <div className="mt-1 flex items-center gap-2 text-sm text-blue-100">
                        <Clock className="h-4 w-4" />
                        <span>{session.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 학습 목표 */}
                <div className="rounded-lg bg-white/10 backdrop-blur-sm p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <Target className="h-4 w-4" />
                    <span>학습 목표</span>
                  </div>
                  <ul className="space-y-1">
                    {session.objectives.map((objective, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="mt-1">•</span>
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <CardContent className="p-6">
                {/* 수업 활동 */}
                <div className="mb-6">
                  <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    수업 활동 (단계별)
                  </h4>
                  <div className="space-y-3">
                    {session.activities.map((activity, idx) => (
                      <div key={idx} className="rounded-lg border-2 border-gray-200 bg-gray-50 p-4">
                        <div className="mb-2 flex items-center gap-3">
                          <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                            {activity.time}
                          </span>
                          <span className="font-semibold text-gray-900">{activity.activity}</span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">{activity.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 준비물 & 교수 팁 */}
                <div className="grid gap-4 md:grid-cols-2">
                  {/* 준비물 */}
                  <div className="rounded-lg border-2 border-teal-200 bg-teal-50 p-4">
                    <h5 className="mb-3 flex items-center gap-2 font-semibold text-teal-900">
                      <Users className="h-4 w-4" />
                      준비물
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {session.materials.map((material, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-white px-3 py-1 text-sm text-teal-800"
                        >
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 교수 팁 */}
                  <div className="rounded-lg border-2 border-yellow-200 bg-yellow-50 p-4">
                    <h5 className="mb-2 font-semibold text-yellow-900">💡 교수 팁</h5>
                    <p className="text-sm text-yellow-800 leading-relaxed">{session.teachingTips}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 커리큘럼 다운로드 안내 */}
        <div className="mt-8 rounded-xl border-2 border-blue-200 bg-white p-6 text-center shadow-lg">
          <h4 className="mb-2 text-xl font-bold text-gray-900">
            상세 교사용 지도서 다운로드
          </h4>
          <p className="mb-4 text-gray-600">
            차시별 PPT, 학생 워크북, 평가 자료가 포함된 완전한 수업 패키지를 제공합니다
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700">
              교사용 지도서 다운로드
            </button>
            <button className="rounded-lg border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50">
              학생 워크북 다운로드
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

