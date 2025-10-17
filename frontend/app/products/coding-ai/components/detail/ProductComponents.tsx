import { CheckCircle2 } from 'lucide-react'

/**
 * 제품 구성품 타입
 */
interface Component {
  name: string
  description: string
  image: string
  educationalValue: string
  features: string[]
}

interface ProductComponentsProps {
  components: Component[]
}

/**
 * 제품 구성품 상세 설명 컴포넌트
 */
export function ProductComponents({ components }: ProductComponentsProps) {
  if (!components || components.length === 0) return null

  return (
    <section className="border-t bg-white py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center mb-[50px]">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">제품 구성품 상세</h2>
          <p className="text-gray-600">각 부품으로 무엇을 배우고 어떻게 활용하나요?</p>
        </div>

        <div className="space-y-8">
          {components.map((component, index) => (
            <div
              key={index}
              className={`mb-[80px] grid gap-8 lg:grid-cols-2 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* 이미지 */}
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-gray-50 shadow-lg">
                  <div className="aspect-square p-8 max-w-[350px] mx-auto">
                    <img
                      src={component.image || '/placeholder.svg'}
                      alt={component.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* 내용 */}
              <div className={`flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-xl font-bold text-white">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{component.name}</h3>
                </div>

                <p className="mb-4 text-gray-700 leading-relaxed">{component.description}</p>

                {/* 교육적 가치 */}
                <div className="mb-4 rounded-lg bg-blue-50 border border-blue-200 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-sm font-semibold text-blue-900">📚 학습 포인트</span>
                  </div>
                  <p className="text-sm text-blue-800 leading-relaxed">{component.educationalValue}</p>
                </div>

                {/* 특징 */}
                <div className="flex flex-wrap gap-2">
                  {component.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-teal-600" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

