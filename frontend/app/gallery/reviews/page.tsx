"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/buttons/button"
import { Plus } from "lucide-react"
import { useGalleryItems } from "../hooks/useGalleryItems"
import { galleryDataUrls, reviewsTexts } from "../config"
import { reviewsFormTexts } from "./config"
import { GalleryHeroSection } from "../components/GalleryHeroSection"
import { GalleryCategoryFilter } from "../components/GalleryCategoryFilter"
import { GalleryFormDialog } from "../components/GalleryFormDialog"
import { GalleryEmptyState } from "../components/GalleryEmptyState"
import { ReviewListItem } from "./components/ReviewListItem"
import { ReviewDetailDialog } from "./components/ReviewDetailDialog"
import type { GalleryItem } from "../config"

export default function ReviewsPage() {
  const { items, loading, error, categories } = useGalleryItems({ sourceUrl: galleryDataUrls.reviews })
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>(reviewsTexts.categoryAll)

  const filteredReviews = useMemo(
    () =>
      selectedCategory === reviewsTexts.categoryAll ? items : items.filter((item) => item.category === selectedCategory),
    [items, selectedCategory],
  )

  if (error) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-500">오류: {error}</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <GalleryHeroSection
        emoji={reviewsTexts.hero.emoji}
        title={reviewsTexts.hero.title}
        subtitle={reviewsTexts.hero.subtitle}
      />

      <GalleryCategoryFilter
        categories={categories}
        selected={selectedCategory}
        onChange={setSelectedCategory}
        allLabel={reviewsTexts.categoryAll}
        totalCount={filteredReviews.length}
        countSuffix={reviewsTexts.itemCountSuffix}
      />

      {/* 후기 리스트 */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-[60vh]">
        <div className="container mx-auto px-4 max-w-5xl">
          {loading ? (
            <div className="text-center py-16 text-gray-500">로딩 중...</div>
          ) : filteredReviews.length > 0 ? (
            <div className="space-y-4">
              {filteredReviews.map((item) => (
                <ReviewListItem key={item.id} item={item} onClick={() => setSelectedItem(item)} />
              ))}
            </div>
          ) : (
            <GalleryEmptyState
              emoji={reviewsTexts.emptyState.emoji}
              title={reviewsTexts.emptyState.title}
              message={reviewsTexts.emptyState.message}
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
        likeLabel={reviewsTexts.actions.like}
      />

      {/* 등록 폼 다이얼로그 */}
      <GalleryFormDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        showRating
        config={{
          ...reviewsFormTexts,
          submitLabel: reviewsTexts.actions.submit,
          cancelLabel: reviewsTexts.actions.cancel,
        }}
      />

      <Footer />
    </div>
  )
}
