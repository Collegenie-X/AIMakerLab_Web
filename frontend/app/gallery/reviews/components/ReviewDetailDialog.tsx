"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/data-display/badge"
import { Button } from "@/components/ui/buttons/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/overlays/dialog"
import { Calendar, ChevronLeft, ChevronRight, Eye, Heart, Star, User } from "lucide-react"
import type { GalleryItem } from "../../config"
import { getDefaultImage } from "../../config"

type Props = {
  item: GalleryItem | null
  open: boolean
  onOpenChange: (v: boolean) => void
  onLike?: () => void
  likeLabel?: string
}

/**
 * 후기 상세 보기 다이얼로그 - 텍스트 중심
 */
export function ReviewDetailDialog({ item, open, onOpenChange, onLike, likeLabel = "도움됨" }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!item) return null

  // 별점 이모티콘 생성
  const getRatingStars = (rating: number) => {
    const filled = Math.floor(rating)
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= filled ? "⭐" : "☆")
    }
    return stars.join("")
  }

  const nextImage = () => {
    if (item.images) {
      setCurrentImageIndex((prev) => (prev + 1) % item.images.length)
    }
  }

  const prevImage = () => {
    if (item.images) {
      setCurrentImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full sm:max-w-[95vw] md:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <span className="text-4xl">{item.emoji}</span>
            {item.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 이미지 갤러리 */}
          {item.images && item.images.length > 0 && (
            <div className="relative">
              <div className="overflow-hidden rounded-lg border-2 border-blue-200">
                <img
                  src={item.images[currentImageIndex] || getDefaultImage(item.category)}
                  alt={`${item.title} ${currentImageIndex + 1}`}
                  className="w-full h-auto max-h-[400px] object-contain bg-gradient-to-br from-blue-50 to-cyan-50"
                />
              </div>

              {/* 이미지 네비게이션 */}
              {item.images.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-blue-300"
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage()
                    }}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-blue-300"
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage()
                    }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {currentImageIndex + 1} / {item.images.length}
                  </div>
                </>
              )}

              {/* 썸네일 스트립 */}
              {item.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 mt-3">
                  {item.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        idx === currentImageIndex ? "border-blue-500 scale-110" : "border-gray-300"
                      }`}
                    >
                      <img
                        src={img || getDefaultImage(item.category)}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 카테고리 & 평점 */}
          <div className="flex flex-wrap items-center gap-4">
            <Badge className="bg-blue-100 text-blue-700 text-base px-4 py-1">{item.category}</Badge>
            {item.rating && (
              <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-2 rounded-lg border border-blue-200">
                <span className="text-2xl">{getRatingStars(item.rating)}</span>
                <span className="text-lg font-bold text-blue-600">{item.rating}</span>
                <span className="text-sm text-gray-600">/5</span>
              </div>
            )}
          </div>

          {/* 한 줄 요약 */}
          <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-4 border-l-4 border-blue-500">
            <p className="text-lg font-semibold text-blue-900">{item.description}</p>
          </div>

          {/* 상세 후기 */}
          <div className="bg-white rounded-lg border-2 border-blue-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>📝</span>
              상세 후기
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{item.details}</p>
          </div>

          {/* 메타 정보 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 text-center border border-blue-200">
              <User className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <p className="text-xs text-gray-600 mb-1">작성자</p>
              <p className="font-semibold text-gray-900">{item.author}</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-50 to-sky-50 rounded-lg p-4 text-center border border-cyan-200">
              <Calendar className="h-6 w-6 mx-auto mb-2 text-cyan-600" />
              <p className="text-xs text-gray-600 mb-1">작성일</p>
              <p className="font-semibold text-gray-900">{item.date}</p>
            </div>
            <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-lg p-4 text-center border border-sky-200">
              <Eye className="h-6 w-6 mx-auto mb-2 text-sky-600" />
              <p className="text-xs text-gray-600 mb-1">조회수</p>
              <p className="font-semibold text-gray-900">{item.views}회</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 text-center border border-blue-200">
              <Heart className="h-6 w-6 mx-auto mb-2 text-blue-600 fill-blue-600" />
              <p className="text-xs text-gray-600 mb-1">도움됨</p>
              <p className="font-semibold text-gray-900">{item.likes}명</p>
            </div>
          </div>

          {/* 태그 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span>🏷️</span>
              태그
            </h3>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, idx) => (
                <Badge key={idx} variant="outline" className="border-blue-300 text-blue-700 text-sm">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              onClick={onLike}
            >
              <Heart className="mr-2 h-4 w-4" />
              {likeLabel}
            </Button>
            <Button variant="outline" className="flex-1 border-blue-300" onClick={() => onOpenChange(false)}>
              닫기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

