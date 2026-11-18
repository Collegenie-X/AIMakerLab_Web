import { Package } from 'lucide-react'

/**
 * 부품 구성 항목 타입
 */
interface ComponentTableItem {
  name: string
  quantity: number
  specification: string
  purpose: string
}

interface ProductComponentsTableProps {
  components: ComponentTableItem[]
}

/**
 * 제품 부품 구성 표 컴포넌트
 * 제품에 포함된 모든 부품을 표 형태로 보여줍니다.
 */
export function ProductComponentsTable({ components }: ProductComponentsTableProps) {
  if (!components || components.length === 0) return null

  return (
    <section className="border-t bg-gray-900 py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
              <Package className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mb-2 text-3xl font-bold text-white">제품 구성품 목록</h2>
          <p className="text-gray-400">키트에 포함된 모든 부품과 사양을 확인하세요</p>
        </div>

        <div className="overflow-hidden rounded-2xl border-2 border-gray-700 bg-gray-800 shadow-lg">
          {/* 모바일 뷰 - 카드 형태 */}
          <div className="block md:hidden">
            {components.map((component, index) => (
              <div
                key={index}
                className={`p-4 ${
                  index !== components.length - 1 ? 'border-b border-gray-700' : ''
                }`}
              >
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="font-bold text-white">{component.name}</h3>
                  <span className="ml-2 flex-shrink-0 rounded-full bg-teal-900/50 px-2.5 py-0.5 text-sm font-semibold text-teal-300">
                    {component.quantity}개
                  </span>
                </div>
                <p className="mb-2 text-sm text-gray-400">{component.specification}</p>
                <p className="text-sm font-medium text-blue-400">{component.purpose}</p>
              </div>
            ))}
          </div>

          {/* 데스크톱 뷰 - 테이블 형태 */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-700 bg-gray-700">
                  <th className="px-6 py-4 text-left text-sm font-bold text-white">
                    부품명
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-white">
                    수량
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white">
                    사양
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white">
                    용도
                  </th>
                </tr>
              </thead>
              <tbody>
                {components.map((component, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-800/50'
                    } transition-colors hover:bg-gray-700`}
                  >
                    <td className="px-6 py-4 text-sm font-semibold text-white">
                      {component.name}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block rounded-full bg-teal-900/50 px-3 py-1 text-sm font-bold text-teal-300">
                        {component.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {component.specification}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-blue-400">
                      {component.purpose}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 추가 안내 */}
        <div className="mt-6 rounded-xl border border-blue-800 bg-blue-950/30 p-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                <span className="text-xl">💡</span>
              </div>
            </div>
            <div>
              <h4 className="mb-2 font-bold text-blue-300">구성품 안내</h4>
              <p className="text-sm text-blue-300/80 leading-relaxed">
                모든 구성품은 교육용으로 검증된 고품질 제품입니다.
                부품 불량이나 누락 시 즉시 교환해 드립니다.
                추가 구매가 필요한 경우 별도 문의 주시기 바랍니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
