import { BookOpen, GraduationCap, Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/data-display/card'
import { LABELS } from '../config'

/**
 * 교육 키트 장점 소개 섹션 컴포넌트
 */
export function BenefitsSection() {
  return (
    <section className="border-t bg-gradient-to-br from-blue-50 to-teal-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
          {LABELS.benefits.title}
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {/* 체계적인 커리큘럼 */}
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
                  <BookOpen className="h-8 w-8 text-teal-600" />
                </div>
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                {LABELS.benefits.curriculum.title}
              </h3>
              <p className="text-sm text-gray-600">
                {LABELS.benefits.curriculum.description}
              </p>
            </CardContent>
          </Card>

          {/* 교사 지원 자료 */}
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <GraduationCap className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                {LABELS.benefits.teacherSupport.title}
              </h3>
              <p className="text-sm text-gray-600">
                {LABELS.benefits.teacherSupport.description}
              </p>
            </CardContent>
          </Card>

          {/* 실전 수업 검증 */}
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                {LABELS.benefits.verified.title}
              </h3>
              <p className="text-sm text-gray-600">
                {LABELS.benefits.verified.description}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

