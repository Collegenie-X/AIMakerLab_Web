"use client"

import { Button } from "@/components/ui/buttons/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/forms/select"
import type { GalleryType } from "@/lib/gallery"

type Props = {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  sortBy: "latest" | "popular" | "views"
  onSortChange: (sortBy: "latest" | "popular" | "views") => void
  itemCount: number
  type: GalleryType
}

/**
 * 갤러리 카테고리 필터 컴포넌트
 * - 카테고리 선택 버튼
 * - 정렬 옵션
 */
export function GalleryCategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  itemCount,
  type,
}: Props) {
  const itemLabel = type === "works" ? "작품" : "후기"

  return (
    <div className="mb-8 space-y-4">
      {/* 카테고리 버튼 */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          onClick={() => onCategoryChange("all")}
          className={
            selectedCategory === "all"
              ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              : ""
          }
        >
          전체
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => onCategoryChange(category)}
            className={
              selectedCategory === category
                ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                : ""
            }
          >
            {category}
          </Button>
        ))}
      </div>

      {/* 정렬 및 카운트 */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          총 <span className="font-bold text-purple-600">{itemCount}</span>개의 {itemLabel}
        </p>

        <Select value={sortBy} onValueChange={(v) => onSortChange(v as typeof sortBy)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="정렬" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">최신순</SelectItem>
            <SelectItem value="popular">인기순 (좋아요)</SelectItem>
            <SelectItem value="views">조회수순</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
