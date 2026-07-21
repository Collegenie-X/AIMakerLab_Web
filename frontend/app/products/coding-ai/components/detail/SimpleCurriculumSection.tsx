import { Calendar, ChevronRight, Lock, FileDown } from 'lucide-react'

/**
 * 간단 커리큘럼 아이템 타입
 */
interface SimpleCurriculumItem {
  session: number
  title: string
  summary: string
  icon: string
}

interface SimpleCurriculumSectionProps {
  curriculum: SimpleCurriculumItem[]
  /** 구매 고객 여부 - true일 때만 PDF 다운로드 활성화 */
  isPurchased?: boolean
  /** 수업 자료 PDF 경로 */
  pdfUrl?: string
}

/**
 * 간단 수업 과정 섹션
 * 메이커 형식의 간단한 수업 과정을 보여줍니다.
 */
export function SimpleCurriculumSection({ curriculum, isPurchased = false, pdfUrl }: SimpleCurriculumSectionProps) {
  if (!curriculum || curriculum.length === 0) return null

  return (
    <section className="border-t border-gray-700 bg-gray-900 py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-600">
              <Calendar className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mb-2 text-3xl font-bold text-white">수업 과정 ({curriculum.length}차시)</h2>
          <p className="text-gray-400">단계별로 체계적인 메이커 교육 과정</p>
        </div>

        <div className="space-y-6">
          {curriculum.map((item, index) => (
            <div key={index}>
              <div
                className={`group relative overflow-hidden rounded-2xl border-2 bg-gray-800 p-6 shadow-lg transition-all hover:shadow-xl ${
                  index === 0
                    ? 'border-green-800'
                    : index === 1
                    ? 'border-blue-800'
                    : 'border-purple-800'
                }`}
              >
                <div className="flex items-start gap-6">
                  {/* 아이콘 및 차시 */}
                  <div className="flex-shrink-0">
                    <div
                      className={`flex h-20 w-20 items-center justify-center rounded-2xl text-4xl ${
                        index === 0
                          ? 'bg-green-900/50'
                          : index === 1
                          ? 'bg-blue-900/50'
                          : 'bg-purple-900/50'
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div
                      className={`mt-2 text-center text-sm font-bold ${
                        index === 0
                          ? 'text-green-400'
                          : index === 1
                          ? 'text-blue-400'
                          : 'text-purple-400'
                      }`}
                    >
                      {item.session}차시
                    </div>
                  </div>

                  {/* 내용 */}
                  <div className="flex-1">
                    <h3 className="mb-3 text-2xl font-bold text-white">{item.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{item.summary}</p>
                  </div>

                  {/* 화살표 */}
                  <div className="flex-shrink-0">
                    <ChevronRight
                      className={`h-8 w-8 transition-transform group-hover:translate-x-1 ${
                        index === 0
                          ? 'text-green-400'
                          : index === 1
                          ? 'text-blue-400'
                          : 'text-purple-400'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* 연결선 (마지막 항목 제외) */}
              {index < curriculum.length - 1 && (
                <div className="flex justify-center py-2">
                  <div className="h-8 w-0.5 bg-gradient-to-b from-gray-600 to-gray-700"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 추가 정보 */}
        <div className="mt-8 rounded-xl border border-green-800 bg-green-950/30 p-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600">
                <span className="text-xl">💡</span>
              </div>
            </div>
            <div>
              <h4 className="mb-2 font-bold text-green-300">교육 시간 안내</h4>
              <p className="text-sm text-green-300/80 leading-relaxed">
                각 차시는 80분 기준으로 구성되어 있으며,
                학교 환경에 따라 유연하게 조정 가능합니다.
                상세한 차시별 교육 계획은 아래 커리큘럼 섹션에서 확인하실 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 구매 고객 전용 PDF 다운로드 */}
        <div className="mt-6 rounded-xl border-2 border-emerald-800 bg-gray-800 p-6 shadow-sm">
          <div className="flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-900/50">
                {isPurchased ? (
                  <FileDown className="h-5 w-5 text-emerald-400" />
                ) : (
                  <Lock className="h-5 w-5 text-emerald-400" />
                )}
              </div>
              <div>
                <h4 className="font-bold text-white">수업 자료 PDF 다운로드</h4>
                <p className="text-sm text-gray-400">
                  {isPurchased
                    ? '교사용 지도서 · 활동지 · 차시별 PPT 요약본 포함'
                    : '구매 고객 전용 기능입니다. 로그인/주문 확인 후 이용 가능합니다.'}
                </p>
              </div>
            </div>

            {isPurchased && pdfUrl ? (
              <a
                href={pdfUrl}
                download
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-emerald-700"
              >
                <FileDown className="h-5 w-5" /> PDF 내려받기
              </a>
            ) : (
              <button
                type="button"
                aria-disabled
                className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg bg-gray-700 px-5 py-3 font-semibold text-gray-500"
                title="구매 고객 전용"
              >
                <Lock className="h-5 w-5" /> 접근 제한됨
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
