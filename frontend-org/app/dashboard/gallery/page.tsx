"use client"

import { useState } from "react"
import { useAuthGuard } from "@/hooks/use-auth-guard"
import { useGallery } from "@/hooks/use-dashboard-data"
import { useRouter } from "next/navigation"
import { Images, Plus } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import { GalleryItemCard } from "./components/gallery-item-card"
import { EmptyState } from "../components/empty-state"
import { dashboardTexts } from "../config"

/**
 * 갤러리 관리 페이지
 * 사용자가 업로드한 작품/후기를 관리
 */
export default function MyGalleryPage() {
  const { userEmail } = useAuthGuard()
  const [filter, setFilter] = useState<"전체" | "작품" | "후기">("전체")
  const { items, isLoading, deleteItem } = useGallery(filter)
  const router = useRouter()

  const handleView = (id: string, category: "작품" | "후기") => {
    const basePath = category === "작품" ? "/gallery/works" : "/gallery/reviews"
    router.push(`${basePath}?id=${id}`)
  }

  const handleEdit = (id: string) => {
    router.push(`/dashboard/gallery/edit/${id}`)
  }

  const filters = [
    { label: dashboardTexts.gallery.filters.all, value: "전체" as const },
    { label: dashboardTexts.gallery.filters.works, value: "작품" as const },
    { label: dashboardTexts.gallery.filters.reviews, value: "후기" as const },
  ]

  if (!userEmail || isLoading) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{dashboardTexts.gallery.title}</h1>
            <p className="text-gray-600">{dashboardTexts.gallery.description}</p>
          </div>
          <Button onClick={() => router.push("/dashboard/gallery/new")}>
            <Plus className="mr-2 h-4 w-4" />
            {dashboardTexts.gallery.addNewButton}
          </Button>
        </div>

        {/* 필터 버튼 */}
        <div className="flex gap-2">
          {filters.map((f) => (
            <Button
              key={f.value}
              variant={filter === f.value ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </Button>
          ))}
        </div>
      </div>

      {/* 갤러리 아이템 목록 또는 빈 상태 */}
      {items.length === 0 ? (
        <EmptyState
          icon={Images}
          title={dashboardTexts.gallery.emptyTitle(filter)}
          description={dashboardTexts.gallery.emptyDescription}
          actionLabel={dashboardTexts.gallery.addNewButton}
          onAction={() => router.push("/dashboard/gallery/new")}
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <GalleryItemCard
              key={item.id}
              item={item}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={deleteItem}
            />
          ))}
        </div>
      )}
    </div>
  )
}
