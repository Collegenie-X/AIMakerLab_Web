"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/data-display/badge"
import { Button } from "@/components/ui/buttons/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/overlays/dialog"
import { Calendar, ChevronLeft, ChevronRight, Eye, Heart, Star, User } from "lucide-react"
import type { GalleryItem } from "../config"
import { getDefaultImage } from "../config"

type Props = {
  item: GalleryItem | null
  open: boolean
  onOpenChange: (v: boolean) => void
  onLike?: () => void
  onShare?: () => void
  showRating?: boolean
  likeLabel?: string
  shareLabel?: string
}

/**
 * 갤러리 상세 보기 다이얼로그
 */
export function GalleryDetailDialog({
  item,
  open,
  onOpenChange,
  onLike,
  onShare,
  showRating = false,
  likeLabel = "좋아요",
  shareLabel = "공유하기",
}: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!item) return null

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % item.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full sm:max-w-[95vw] md:max-w-5xl lg:max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <span className="text-4xl">{item.emoji}</span>
            {item.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 이미지 슬라이더 */}
          <div className="relative">
            <div className="overflow-hidden rounded-lg">
              <img
                src={item.images[currentImageIndex] || getDefaultImage(item.category)}
                alt={`${item.title} ${currentImageIndex + 1}`}
                className="w-full h-auto max-h-[60vh] object-contain bg-gray-100"
              />
            </div>

            {/* 이미지 네비게이션 */}
            {item.images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
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
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    nextImage()
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {item.images.length}
                </div>
              </>
            )}
          </div>

          {/* 썸네일 스트립 */}
          {item.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {item.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === currentImageIndex ? "border-purple-500 scale-110" : "border-gray-300"
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

          {/* 정보 */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <Badge className="bg-purple-100 text-purple-700">{item.category}</Badge>
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {item.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {item.date}
            </span>
            {showRating && item.rating && (
              <span className="flex items-center gap-1 text-yellow-500">
                <Star className="h-4 w-4 fill-yellow-500" />
                {item.rating}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {item.views}회
            </span>
            <span className="flex items-center gap-1 text-pink-500">
              <Heart className="h-4 w-4 fill-pink-500" />
              {item.likes}
            </span>
          </div>

          {/* 상세 설명 */}
          <div className="rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 p-6">
            <p className="text-gray-700 leading-relaxed">{item.details}</p>
          </div>

          {/* 태그 */}
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag, idx) => (
              <Badge key={idx} variant="outline" className="border-purple-300 text-purple-700">
                #{tag}
              </Badge>
            ))}
          </div>

          {/* 액션 버튼 */}
          <div className="flex gap-3">
            <Button
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              onClick={onLike}
            >
              <Heart className="mr-2 h-4 w-4" />
              {likeLabel}
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent" onClick={onShare}>
              {shareLabel}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

