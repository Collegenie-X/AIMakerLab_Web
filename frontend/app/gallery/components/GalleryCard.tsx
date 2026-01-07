"use client"

import { Badge } from "@/components/ui/data-display/badge"
import { Calendar, Eye, Heart, Star, User } from "lucide-react"
import type { GalleryItem, ReviewItem } from "@/lib/gallery"
import { getDefaultImage, isReviewItem } from "@/lib/gallery"

type Props = {
  item: GalleryItem
  onClick: () => void
  showRating?: boolean
}

/**
 * 갤러리 카드 컴포넌트 - 작품/후기 리스트에 표시
 */
export function GalleryCard({ item, onClick, showRating = false }: Props) {
  // 후기인지 확인
  const isReview = isReviewItem(item)
  
  // 후기일 경우 summary, 작품일 경우 description 사용
  const description = isReview ? item.summary : item.description
  
  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-all hover:shadow-2xl hover:-translate-y-2"
      onClick={onClick}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
        <img
          src={item.image || getDefaultImage(item.category)}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* 이모지 배지 */}
        <div className="absolute top-4 left-4 text-5xl drop-shadow-2xl">{item.emoji}</div>

        {/* 카테고리 배지 */}
        <div className="absolute top-4 right-4">
          <Badge className="bg-white/90 text-purple-700 backdrop-blur-sm">{item.category}</Badge>
        </div>

        {/* 하단 정보 오버레이 */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="mb-2 text-lg font-bold drop-shadow-lg">{item.title}</h3>
          <p className="mb-3 text-sm text-white/90 line-clamp-2 drop-shadow">{description}</p>

          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1">
              <User className="h-3 w-3" />
              {item.author}
            </span>
            <div className="flex items-center gap-3">
              {showRating && isReview && (
                <span className="flex items-center gap-1 text-yellow-300">
                  <Star className="h-3 w-3 fill-yellow-300" />
                  {item.rating}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {item.views}
              </span>
              <span className="flex items-center gap-1 text-pink-300">
                <Heart className="h-3 w-3 fill-pink-300" />
                {item.likes}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

