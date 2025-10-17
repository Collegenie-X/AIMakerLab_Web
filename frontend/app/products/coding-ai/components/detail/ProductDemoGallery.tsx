import { Play, Image as ImageIcon } from 'lucide-react'
import { useState } from 'react'

/**
 * 제품 데모 아이템 타입
 */
interface ProductDemo {
  type: 'video' | 'image'
  url: string
  thumbnail?: string
  title: string
  description: string
}

interface ProductDemoGalleryProps {
  demos: ProductDemo[]
}

/**
 * 제품 동작 갤러리 컴포넌트
 * 제품이 실제로 작동하는 영상과 사진을 보여줍니다.
 */
export function ProductDemoGallery({ demos }: ProductDemoGalleryProps) {
  const [selectedDemo, setSelectedDemo] = useState<ProductDemo | null>(null)

  if (!demos || demos.length === 0) return null

  return (
    <section className="border-t bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600">
              <Play className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mb-2 text-3xl font-bold text-gray-900">이렇게 동작합니다</h2>
          <p className="text-gray-600">제품의 다양한 기능을 영상과 사진으로 확인하세요</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {demos.map((demo, index) => (
            <div
              key={index}
              className="group cursor-pointer overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-2xl"
              onClick={() => {
                if (demo.type === 'video') {
                  setSelectedDemo(demo)
                }
              }}
            >
              {/* 썸네일 */}
              <div className="relative aspect-video overflow-hidden bg-gray-100">
                <img
                  src={demo.type === 'video' ? demo.thumbnail : demo.url}
                  alt={demo.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                />
                
                {/* 비디오 재생 아이콘 */}
                {demo.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-all group-hover:bg-black/40">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-110">
                      <Play className="h-8 w-8 fill-blue-600 text-blue-600" />
                    </div>
                  </div>
                )}

                {/* 타입 배지 */}
                <div className="absolute right-3 top-3">
                  <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 backdrop-blur-sm ${
                    demo.type === 'video' 
                      ? 'bg-blue-600/90' 
                      : 'bg-purple-600/90'
                  }`}>
                    {demo.type === 'video' ? (
                      <Play className="h-3 w-3 text-white" />
                    ) : (
                      <ImageIcon className="h-3 w-3 text-white" />
                    )}
                    <span className="text-xs font-semibold text-white">
                      {demo.type === 'video' ? '영상' : '사진'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 설명 */}
              <div className="p-5">
                <h3 className="mb-2 text-lg font-bold text-gray-900">{demo.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{demo.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 비디오 모달 */}
        {selectedDemo && selectedDemo.type === 'video' && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setSelectedDemo(null)}
          >
            <div
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -right-4 -top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 hover:bg-gray-100"
                onClick={() => setSelectedDemo(null)}
              >
                ✕
              </button>
              <div className="aspect-video overflow-hidden rounded-xl bg-black">
                <iframe
                  src={selectedDemo.url.replace('watch?v=', 'embed/')}
                  title={selectedDemo.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

