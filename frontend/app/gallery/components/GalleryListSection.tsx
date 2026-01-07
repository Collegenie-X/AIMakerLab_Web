"use client"

import { useState, useMemo } from "react"
import { useGalleryItems, useUserGalleryItems, type GalleryType } from "@/lib/gallery"
import { extractCategories, filterByCategory, sortGalleryItems } from "@/lib/gallery"
import { Button } from "@/components/ui/buttons/button"
import { Plus } from "lucide-react"
import { GalleryCard } from "./GalleryCard"
import { GalleryDetailDialog } from "./GalleryDetailDialog"
import { GalleryCategoryFilter } from "./GalleryCategoryFilter"
import { GalleryEmptyState } from "./GalleryEmptyState"
import { GalleryFormDialog } from "./GalleryFormDialog"
import type { GalleryItem } from "@/lib/gallery"

type Props = {
  type: GalleryType
}

/**
 * 갤러리 리스트 섹션
 * - React Query로 데이터 로딩
 * - 카테고리 필터링 및 정렬
 */
export function GalleryListSection({ type }: Props) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "views">("latest")
  const [showFormDialog, setShowFormDialog] = useState(false)
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)

  // React Query로 데이터 로딩
  const { data: publicItems = [], isLoading, error } = useGalleryItems(type)
  const { data: userItems = [] } = useUserGalleryItems(type)
  
  // 공개 아이템 + 사용자 아이템 합치기
  const items = useMemo(() => [...publicItems, ...userItems], [publicItems, userItems])

  // 카테고리 목록 추출
  const categories = useMemo(() => extractCategories(items), [items])

  // 필터링 및 정렬된 아이템
  const filteredAndSortedItems = useMemo(() => {
    const filtered = filterByCategory(items, selectedCategory)
    return sortGalleryItems(filtered, sortBy)
  }, [items, selectedCategory, sortBy])

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="mb-4 text-5xl animate-bounce">⏳</div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  // 에러 상태
  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="mb-4 text-5xl">❌</div>
          <p className="text-red-600 font-semibold mb-2">데이터를 불러오는데 실패했습니다</p>
          <p className="text-gray-600 text-sm">{error.message}</p>
        </div>
      </div>
    )
  }

  // 등록/수정 핸들러
  const handleCreate = () => {
    setEditingItem(null)
    setShowFormDialog(true)
  }

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item)
    setShowFormDialog(true)
  }

  const handleFormClose = () => {
    setShowFormDialog(false)
    setEditingItem(null)
  }

  // 빈 상태
  if (filteredAndSortedItems.length === 0) {
    return (
      <>
        <GalleryEmptyState type={type} />
        
        {/* 등록 플로팅 버튼 */}
        <Button
          onClick={handleCreate}
          className="fixed bottom-8 right-8 h-16 w-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-2xl hover:from-purple-600 hover:to-pink-600 hover:scale-110 transition-transform z-50"
        >
          <Plus className="h-8 w-8" />
        </Button>

        {/* 등록/수정 폼 */}
        <GalleryFormDialog
          type={type}
          open={showFormDialog}
          onClose={handleFormClose}
          editingItem={editingItem}
        />
      </>
    )
  }

  return (
    <>
      {/* 카테고리 필터 */}
      <GalleryCategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        itemCount={filteredAndSortedItems.length}
        type={type}
      />

      {/* 갤러리 그리드 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAndSortedItems.map((item) => (
          <GalleryCard
            key={item.id}
            item={item}
            onClick={() => setSelectedItem(item)}
            showRating={type === "reviews"}
          />
        ))}
      </div>

      {/* 등록 플로팅 버튼 */}
      <Button
        onClick={handleCreate}
        className="fixed bottom-8 right-8 h-16 w-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-2xl hover:from-purple-600 hover:to-pink-600 hover:scale-110 transition-transform z-50"
      >
        <Plus className="h-8 w-8" />
      </Button>

      {/* 상세 다이얼로그 */}
      {selectedItem && (
        <GalleryDetailDialog
          item={selectedItem}
          type={type}
          open={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          onEdit={handleEdit}
        />
      )}

      {/* 등록/수정 폼 */}
      <GalleryFormDialog
        type={type}
        open={showFormDialog}
        onClose={handleFormClose}
        editingItem={editingItem}
      />
    </>
  )
}

