import { Lightbulb } from 'lucide-react'

/**
 * 조립 단계 타입
 */
interface AssemblyStep {
  step: number
  title: string
  description: string
  image: string
  tips: string
}

interface AssemblyGuideProps {
  steps: AssemblyStep[]
}

/**
 * 제품 조립 가이드 컴포넌트
 */
export function AssemblyGuide({ steps }: AssemblyGuideProps) {
  if (!steps || steps.length === 0) return null

  return (
    <section className="border-t bg-gray-50 py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">조립 가이드</h2>
          <p className="text-gray-600">
            단계별로 따라하면 누구나 쉽게 조립할 수 있습니다
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {steps.map((step) => (
            <div
              key={step.step}
              className="rounded-xl border-2 border-gray-200 bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
            >
              {/* 단계 번호 */}
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 text-xl font-bold text-white shadow-lg">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
              </div>

              {/* 이미지 */}
              <div className="mb-4 overflow-hidden rounded-lg border">
                <img
                  src={step.image || '/placeholder.svg'}
                  alt={step.title}
                  className="h-48 w-full object-cover"
                />
              </div>

              {/* 설명 */}
              <p className="mb-4 text-gray-700 leading-relaxed">{step.description}</p>

              {/* 팁 */}
              <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-3">
                <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-yellow-900">
                  <Lightbulb className="h-4 w-4" />
                  <span>조립 팁</span>
                </div>
                <p className="text-sm text-yellow-800">{step.tips}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 조립 영상 안내 */}
        <div className="mt-8 rounded-xl border-2 border-teal-200 bg-white p-6 text-center shadow-md">
          <h4 className="mb-2 text-lg font-bold text-gray-900">
            🎥 조립 영상이 필요하신가요?
          </h4>
          <p className="mb-4 text-gray-600">
            단계별 조립 영상을 보면서 따라하면 더욱 쉽게 완성할 수 있습니다
          </p>
          <button className="rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-teal-700">
            조립 영상 보러가기
          </button>
        </div>
      </div>
    </section>
  )
}

