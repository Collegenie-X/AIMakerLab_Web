"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/buttons/button"
import { Plus } from "lucide-react"
import { useGalleryItems } from "../hooks/useGalleryItems"
import { useGalleryConfig } from "../hooks/useGalleryConfig"
import { galleryDataUrls } from "../config"
import { GalleryHeroSection } from "../components/GalleryHeroSection"
import { GalleryCategoryFilter } from "../components/GalleryCategoryFilter"
import { GalleryFormDialog } from "../components/GalleryFormDialog"
import { GalleryEmptyState } from "../components/GalleryEmptyState"
import { ReviewListItem } from "./components/ReviewListItem"
import { ReviewDetailDialog } from "./components/ReviewDetailDialog"
import type { GalleryItem } from "../config"

/**
 * 수업 후기 페이지
 * JSON 파일에서 데이터와 설정을 불러옵니다.
 */
export default function ReviewsPage() {
  const { items, loading, error, categories } = useGalleryItems({ sourceUrl: galleryDataUrls.reviews })
  const { config, isLoading: configLoading, error: configError } = useGalleryConfig('reviews')
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("전체")

  const filteredReviews = useMemo(
    () =>
      selectedCategory === (config?.categoryAll || "전체") ? items : items.filter((item) => item.category === selectedCategory),
    [items, selectedCategory, config],
  )

  // 로딩 상태
  if (loading || configLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">로딩 중...</p>
        </div>
        <Footer />
      </div>
    )
  }

  // 에러 상태
  if (error || configError || !config) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-500">오류: {error || configError?.message || '설정을 불러올 수 없습니다'}</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <GalleryHeroSection
        emoji={config.hero.emoji}
        title={config.hero.title}
        subtitle={config.hero.subtitle}
      />

      <GalleryCategoryFilter
        categories={categories}
        selected={selectedCategory}
        onChange={setSelectedCategory}
        allLabel={config.categoryAll}
        totalCount={filteredReviews.length}
        countSuffix={config.itemCountSuffix}
      />

      {/* 후기 리스트 */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-[60vh]">
        <div className="container mx-auto px-4 max-w-5xl">
          {filteredReviews.length > 0 ? (
            <div className="space-y-4">
              {filteredReviews.map((item) => (
                <ReviewListItem key={item.id} item={item} onClick={() => setSelectedItem(item)} />
              ))}
            </div>
          ) : (
            <GalleryEmptyState
              emoji={config.emptyState.emoji}
              title={config.emptyState.title}
              message={config.emptyState.message}
            />
          )}
        </div>
      </section>

      {/* 등록 플로팅 버튼 */}
      <Button
        onClick={() => setShowCreateDialog(true)}
        className="fixed bottom-8 right-8 h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-2xl hover:from-blue-600 hover:to-cyan-600 hover:scale-110 transition-transform z-50"
      >
        <Plus className="h-8 w-8" />
      </Button>

      {/* 상세 다이얼로그 */}
      <ReviewDetailDialog
        item={selectedItem}
        open={!!selectedItem}
        onOpenChange={() => setSelectedItem(null)}
        likeLabel={config.actions.like}
      />

      {/* 등록 폼 다이얼로그 */}
      <GalleryFormDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        showRating
        config={{
          title: config.form.title,
          emoji: config.form.emoji,
          fields: config.form.fields,
          submitLabel: config.actions.submit,
          cancelLabel: config.actions.cancel,
        }}
      />

      <Footer />
    </div>
  )
}
