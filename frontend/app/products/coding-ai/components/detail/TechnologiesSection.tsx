import { Cpu, Lightbulb } from 'lucide-react'

/**
 * 기술 정보 타입
 */
interface Technology {
  title: string
  description: string
  image: string
  keywords: string[]
}

interface TechnologiesSectionProps {
  technologies: Technology[]
}

/**
 * 사용 기술 섹션 컴포넌트
 * 제품에서 활용되는 기술과 연계된 교육 내용을 보여줍니다.
 */
export function TechnologiesSection({ technologies }: TechnologiesSectionProps) {
  if (!technologies || technologies.length === 0) return null

  return (
    <section className="border-t bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600">
              <Cpu className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mb-2 text-3xl font-bold text-gray-900">활용 기술 및 학습 내용</h2>
          <p className="text-gray-600">이 키트로 어떤 기술을 배우고 어떻게 연계되나요?</p>
        </div>

        <div className="space-y-6">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className={`grid gap-6 rounded-2xl border-2 bg-white p-6 shadow-lg transition-all hover:shadow-xl lg:grid-cols-2 ${
                index % 2 === 0 
                  ? 'border-purple-200' 
                  : 'border-blue-200'
              }`}
            >
              {/* 이미지 */}
              <div className={`lg:col-span-1 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="overflow-hidden rounded-xl bg-gray-100 shadow-md">
                  <div className="aspect-video max-w-[500px] md:max-w-[600px] mx-auto w-full">
                    <img
                      src={tech.image || '/placeholder.svg'}
                      alt={tech.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* 내용 */}
              <div className={`flex flex-col justify-center lg:col-span-1 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      index % 2 === 0
                        ? 'bg-purple-600'
                        : 'bg-blue-600'
                    } text-lg font-bold text-white`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{tech.title}</h3>
                </div>

                <p className="mb-4 text-gray-700 leading-relaxed">{tech.description}</p>

                {/* 키워드 */}
                <div className="flex items-start gap-2">
                  <div className="mt-1 flex-shrink-0">
                    <Lightbulb className={`h-5 w-5 ${
                      index % 2 === 0 ? 'text-purple-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tech.keywords.map((keyword, i) => (
                      <span
                        key={i}
                        className={`rounded-full px-3 py-1 text-sm font-medium ${
                          index % 2 === 0
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 추가 정보 */}
        <div className="mt-8 rounded-2xl border-2 border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-600">
                <span className="text-2xl">🎓</span>
              </div>
            </div>
            <div>
              <h4 className="mb-2 text-lg font-bold text-teal-900">융합 교육의 힘</h4>
              <p className="text-sm text-teal-800 leading-relaxed">
                이 키트는 단순히 부품을 조립하는 것이 아니라, 사물인터넷(IoT), 임베디드 시스템, 
                센서 공학, 자동화 알고리즘, 데이터 분석, 전기전자 회로 등 다양한 기술 분야를 
                융합적으로 학습할 수 있도록 설계되었습니다. 각 기술은 실제 산업 현장에서 
                사용되는 핵심 기술이며, 학생들의 미래 역량을 키우는 데 도움이 됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

