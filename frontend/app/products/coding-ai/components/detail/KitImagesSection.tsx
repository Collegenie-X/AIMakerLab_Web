import { Package, Box } from 'lucide-react'

/**
 * 키트 이미지 타입
 */
interface KitImage {
  type: 'package' | 'assembled'
  image: string
  title: string
  description: string
  size: string
}

interface KitImagesSectionProps {
  images: KitImage[]
}

/**
 * 키트 구성품 사진 섹션
 * 제품 패키지와 완성품 사진을 보여줍니다.
 */
export function KitImagesSection({ images }: KitImagesSectionProps) {
  if (!images || images.length === 0) return null

  return (
    <section className="border-t border-gray-700 bg-gray-950 py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-600">
              <Box className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mb-2 text-3xl font-bold text-white">키트 구성품은 어떻게 되나요?</h2>
          <p className="text-gray-400">제품 패키지부터 완성품까지 한눈에 확인하세요</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {images.map((kitImage, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border-2 border-gray-700 bg-gray-900 shadow-lg transition-all hover:shadow-2xl"
            >
              {/* 이미지 */}
              <div className="aspect-square overflow-hidden bg-gray-800 p-8">
                <img
                  src={kitImage.image || '/placeholder.svg'}
                  alt={kitImage.title}
                  className="h-full w-full object-contain"
                />
              </div>

              {/* 정보 */}
              <div className="p-6">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600">
                    {kitImage.type === 'package' ? (
                      <Package className="h-5 w-5 text-white" />
                    ) : (
                      <Box className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white">{kitImage.title}</h3>
                </div>

                <p className="mb-3 text-gray-300">{kitImage.description}</p>

                <div className="inline-block rounded-lg bg-teal-900/50 px-4 py-2">
                  <p className="text-sm font-semibold text-teal-300">{kitImage.size}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 추가 안내 */}
        <div className="mt-8 rounded-xl border border-teal-800 bg-teal-950/30 p-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600">
                <span className="text-xl">📦</span>
              </div>
            </div>
            <div>
              <h4 className="mb-2 font-bold text-teal-300">안전한 패키징</h4>
              <p className="text-sm text-teal-300/80 leading-relaxed">
                모든 부품은 충격 방지 포장으로 안전하게 배송되며,
                체계적으로 분류되어 있어 수업 준비가 쉽습니다.
                교사용 매뉴얼과 학생용 워크북도 함께 제공됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
