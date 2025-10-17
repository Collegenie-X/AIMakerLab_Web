'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

/**
 * 수업 활용 사진 타입
 */
interface ClassroomPhoto {
  id: string
  title: string
  description: string
  image: string
  school: string
  grade: string
  subject: string
}

interface ClassroomPhotosGalleryProps {
  photos: ClassroomPhoto[]
}

/**
 * 수업 활용 사진 갤러리 컴포넌트
 */
export function ClassroomPhotosGallery({ photos }: ClassroomPhotosGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<ClassroomPhoto | null>(null)

  if (!photos || photos.length === 0) return null

  return (
    <>
      <section className="border-t bg-white py-10">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold text-gray-900">실제 수업 활용 사진</h2>
            <p className="text-gray-600">전국 학교에서 이 제품으로 수업하는 모습을 확인하세요</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {photos.map((photo) => (
              <button
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative aspect-square overflow-hidden rounded-xl border-2 border-gray-200 transition-all hover:border-teal-500 hover:shadow-lg"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                />
                
                {/* 오버레이 정보 */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <p className="text-sm font-semibold text-white line-clamp-2">{photo.title}</p>
                  <p className="text-xs text-gray-300 mt-1">{photo.school} · {photo.grade}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 사진 확대 모달 */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 backdrop-blur-sm transition-colors hover:bg-white/20"
            onClick={() => setSelectedPhoto(null)}
          >
            <X className="h-6 w-6 text-white" />
          </button>

          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedPhoto.image}
              alt={selectedPhoto.title}
              className="w-full rounded-lg"
            />
            <div className="mt-4 rounded-lg bg-white/10 backdrop-blur-sm p-6">
              <h3 className="mb-2 text-xl font-bold text-white">{selectedPhoto.title}</h3>
              <p className="mb-3 text-gray-200">{selectedPhoto.description}</p>
              <div className="flex gap-4 text-sm text-gray-300">
                <span>🏫 {selectedPhoto.school}</span>
                <span>📚 {selectedPhoto.subject}</span>
                <span>👥 {selectedPhoto.grade}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

