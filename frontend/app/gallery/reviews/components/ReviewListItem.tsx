"use client"

import { Badge } from "@/components/ui/data-display/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/data-display/card"
import { Calendar, Eye, Heart, Image as ImageIcon, User } from "lucide-react"
import type { GalleryItem } from "@/lib/gallery"
import { getDefaultImage } from "@/lib/gallery"

type Props = {
  item: GalleryItem
  onClick: () => void
}

/**
 * 후기 리스트 아이템 - 텍스트 중심 레이아웃 + 이미지
 */
export function ReviewListItem({ item, onClick }: Props) {
  // 별점을 이모티콘으로 변환
  const getRatingEmoji = (rating: number) => {
    if (rating >= 5) return "🌟"
    if (rating >= 4) return "⭐"
    if (rating >= 3) return "✨"
    if (rating >= 2) return "💫"
    return "⚡"
  }

  const ratingEmoji = item.rating ? getRatingEmoji(item.rating) : "⭐"

  return (
    <Card
      className="group cursor-pointer transition-all hover:shadow-xl hover:border-blue-400 border-2"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          {/* 이미지 썸네일 */}
          {item.images && item.images.length > 0 && (
            <div className="flex-shrink-0 w-32 h-32 rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-cyan-100 border-2 border-blue-200">
              <img
                src={item.images[0] || getDefaultImage(item.category)}
                alt={item.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              {item.images.length > 1 && (
                <div className="absolute bottom-1 right-1 bg-blue-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <ImageIcon className="h-3 w-3" />
                  {item.images.length}
                </div>
              )}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-3xl">{item.emoji}</span>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {item.category}
              </Badge>
              {item.rating && (
                <div className="flex items-center gap-1 text-sm">
                  <span className="text-xl">{ratingEmoji}</span>
                  <span className="font-bold text-blue-600">{item.rating}</span>
                  <span className="text-gray-500">/5</span>
                </div>
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {item.title}
            </h3>
            <p className="text-sm text-blue-600 font-medium mb-3">{item.description}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* 후기 내용 미리보기 */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-100">
          <p className="text-gray-700 leading-relaxed line-clamp-3">{item.details}</p>
        </div>

        {/* 태그 */}
        <div className="flex flex-wrap gap-2">
          {item.tags.slice(0, 4).map((tag, idx) => (
            <span key={idx} className="text-xs bg-white border border-blue-200 text-blue-700 px-2 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        {/* 메타 정보 */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 pt-3 border-t border-gray-200">
          <span className="flex items-center gap-1">
            <User className="h-4 w-4 text-blue-500" />
            {item.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-blue-500" />
            {item.date}
          </span>
          <div className="flex items-center gap-3 ml-auto">
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {item.views}
            </span>
            <span className="flex items-center gap-1 text-blue-500">
              <Heart className="h-4 w-4 fill-blue-500" />
              {item.likes}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

