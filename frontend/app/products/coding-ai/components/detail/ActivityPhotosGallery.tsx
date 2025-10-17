import { Camera, ZoomIn } from 'lucide-react'
import { useState } from 'react'

/**
 * 활동 사진 타입
 */
interface ActivityPhoto {
  image: string
  title: string
  description: string
}

interface ActivityPhotosGalleryProps {
  photos: ActivityPhoto[]
}

/**
 * 실제 활동 사진 갤러리 컴포넌트
 * 수업 중 학생들의 실제 활동 모습을 보여줍니다.
 */
export function ActivityPhotosGallery({ photos }: ActivityPhotosGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<ActivityPhoto | null>(null)

  if (!photos || photos.length === 0) return null

  return (
    <section className="border-t bg-white py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-600">
              <Camera className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mb-2 text-3xl font-bold text-gray-900">실제 수업 활동 사진</h2>
          <p className="text-gray-600">학생들이 직접 만들고 배우는 생생한 현장</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="group cursor-pointer overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-md transition-all hover:scale-[1.03] hover:shadow-xl"
              onClick={() => setSelectedPhoto(photo)}
            >
              {/* 이미지 */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={photo.image || '/placeholder.svg'}
                  alt={photo.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                />
                
                {/* 오버레이 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">자세히 보기</span>
                      <ZoomIn className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* 번호 배지 */}
                <div className="absolute left-3 top-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-sm font-bold text-white shadow-lg">
                    {index + 1}
                  </div>
                </div>
              </div>

              {/* 설명 */}
              <div className="p-4">
                <h3 className="mb-2 font-bold text-gray-900">{photo.title}</h3>
                <p className="line-clamp-2 text-sm text-gray-600">{photo.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 이미지 확대 모달 */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -right-4 -top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 hover:bg-gray-100"
                onClick={() => setSelectedPhoto(null)}
              >
                ✕
              </button>
              <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="max-h-[70vh] w-full object-contain"
                />
                <div className="border-t bg-gray-50 p-6">
                  <h3 className="mb-2 text-xl font-bold text-gray-900">{selectedPhoto.title}</h3>
                  <p className="text-gray-700">{selectedPhoto.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 추가 안내 */}
        <div className="mt-8 rounded-xl border border-orange-200 bg-orange-50 p-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-600">
                <span className="text-xl">📸</span>
              </div>
            </div>
            <div>
              <h4 className="mb-2 font-bold text-orange-900">실제 교육 현장</h4>
              <p className="text-sm text-orange-800 leading-relaxed">
                위 사진들은 전국 초중고 교육 현장에서 실제로 촬영된 것입니다. 
                학생들이 직접 만들고, 프로그래밍하고, 문제를 해결하는 
                살아있는 배움의 순간을 담았습니다. 
                여러분의 교실에서도 이런 즐거운 배움이 펼쳐집니다!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

