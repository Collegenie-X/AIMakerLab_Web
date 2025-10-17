import { Phone, Mail, Download, BookOpen, GraduationCap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/data-display/card'
import { Button } from '@/components/ui/buttons/button'
import { LABELS, CONTACT_INFO } from '../config'

/**
 * 연락처 정보 섹션 컴포넌트
 * 견적문의, 수업문의, 카탈로그 다운로드 등을 표시합니다.
 */
export function ContactInfoSection() {
  return (
    <section className="bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* 견적 문의 */}
          <Card className="border-teal-200">
            <CardContent className="pt-5 pb-5">
              <div className="mb-3 flex items-center gap-2">
                <Phone className="h-5 w-5 text-teal-600" />
                <h3 className="font-semibold text-sm">견적 문의</h3>
              </div>
              <p className="text-lg font-bold text-teal-600 mb-1">{CONTACT_INFO.sales.phone}</p>
              <p className="text-xs text-gray-500">{CONTACT_INFO.sales.email}</p>
            </CardContent>
          </Card>

          {/* 수업 문의 */}
          <Card className="border-blue-200">
            <CardContent className="pt-5 pb-5">
              <div className="mb-3 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-sm">수업 문의</h3>
              </div>
              <p className="text-lg font-bold text-blue-600 mb-1">{CONTACT_INFO.education.phone}</p>
              <p className="text-xs text-gray-500">{CONTACT_INFO.education.email}</p>
            </CardContent>
          </Card>

          {/* 카탈로그 */}
          <Card className="bg-teal-50 border-teal-200">
            <CardContent className="pt-5 pb-5">
              <div className="mb-3 flex items-center gap-2">
                <Download className="h-5 w-5 text-teal-600" />
                <h3 className="font-semibold text-sm text-teal-900">제품 카탈로그</h3>
              </div>
              <Button className="w-full bg-teal-600 hover:bg-teal-700 text-sm" size="sm">
                PDF 다운로드
              </Button>
            </CardContent>
          </Card>

          {/* 교사 자료 */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-5 pb-5">
              <div className="mb-3 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-sm text-blue-900">교사 지도서</h3>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-sm" size="sm">
                PDF 다운로드
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

