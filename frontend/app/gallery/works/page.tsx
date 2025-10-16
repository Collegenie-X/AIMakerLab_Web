"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/buttons/button"
import { Plus } from "lucide-react"
import { useGalleryItems } from "../hooks/useGalleryItems"
import { galleryDataUrls, worksTexts } from "../config"
import { worksFormTexts } from "./config"
import { GalleryHeroSection } from "../components/GalleryHeroSection"
import { GalleryCategoryFilter } from "../components/GalleryCategoryFilter"
import { GalleryCard } from "../components/GalleryCard"
import { GalleryDetailDialog } from "../components/GalleryDetailDialog"
import { GalleryFormDialog } from "../components/GalleryFormDialog"
import { GalleryEmptyState } from "../components/GalleryEmptyState"
import type { GalleryItem } from "../config"

export default function WorksPage() {
  const { items, loading, error, categories } = useGalleryItems({ sourceUrl: galleryDataUrls.works })
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>(worksTexts.categoryAll)

  const filteredWorks = useMemo(
    () => (selectedCategory === worksTexts.categoryAll ? items : items.filter((item) => item.category === selectedCategory)),
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

      <GalleryHeroSection emoji={worksTexts.hero.emoji} title={worksTexts.hero.title} subtitle={worksTexts.hero.subtitle} />

      <GalleryCategoryFilter
        categories={categories}
        selected={selectedCategory}
        onChange={setSelectedCategory}
        allLabel={worksTexts.categoryAll}
        totalCount={filteredWorks.length}
        countSuffix={worksTexts.itemCountSuffix}
      />

      {/* 작품 갤러리 그리드 */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-16 text-gray-500">로딩 중...</div>
          ) : filteredWorks.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredWorks.map((item) => (
                <GalleryCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
              ))}
            </div>
          ) : (
            <GalleryEmptyState
              emoji={worksTexts.emptyState.emoji}
              title={worksTexts.emptyState.title}
              message={worksTexts.emptyState.message}
            />
          )}
        </div>
      </section>

      {/* 등록 플로팅 버튼 */}
      <Button
        onClick={() => setShowCreateDialog(true)}
        className="fixed bottom-8 right-8 h-16 w-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-2xl hover:from-purple-600 hover:to-pink-600 hover:scale-110 transition-transform z-50"
      >
        <Plus className="h-8 w-8" />
      </Button>

      {/* 상세 다이얼로그 */}
      <GalleryDetailDialog
        item={selectedItem}
        open={!!selectedItem}
        onOpenChange={() => setSelectedItem(null)}
        likeLabel={worksTexts.actions.like}
        shareLabel={worksTexts.actions.share}
      />

      {/* 등록 폼 다이얼로그 */}
      <GalleryFormDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        config={{
          ...worksFormTexts,
          submitLabel: worksTexts.actions.submit,
          cancelLabel: worksTexts.actions.cancel,
        }}
      />

      <Footer />
    </div>
  )
}
