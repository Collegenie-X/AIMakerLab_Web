import { Play } from 'lucide-react'

/**
 * 제품 사용 동영상 컴포넌트
 */
interface ProductVideoProps {
  videoUrl?: string
  thumbnailUrl?: string
  title: string
}

export function ProductVideo({ videoUrl, thumbnailUrl, title }: ProductVideoProps) {
  if (!videoUrl) return null

  return (
    <section className="border-t bg-gray-50 py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">제품 사용 동영상</h2>
          <p className="text-gray-600">실제 수업에서 어떻게 활용되는지 영상으로 확인하세요</p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="relative aspect-video overflow-hidden rounded-2xl border-2 border-gray-200 bg-black shadow-2xl">
            {/* 동영상 썸네일 */}
            <img
              src={thumbnailUrl || '/placeholder.jpg'}
              alt={title}
              className="h-full w-full object-cover"
            />
            
            {/* 재생 버튼 오버레이 */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity hover:bg-black/40">
              <button className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-transform hover:scale-110 hover:bg-white">
                <Play className="h-10 w-10 text-teal-600 fill-teal-600 ml-1" />
              </button>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              ⏱️ 실제 수업 활용 사례와 제품 조립 방법을 확인할 수 있습니다
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

