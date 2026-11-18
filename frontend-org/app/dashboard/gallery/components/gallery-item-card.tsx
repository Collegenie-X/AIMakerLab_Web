/**
 * 갤러리 아이템 카드 컴포넌트
 */

"use client"

import { Card } from "@/components/ui/data-display/card"
import { Badge } from "@/components/ui/data-display/badge"
import { Button } from "@/components/ui/buttons/button"
import { Eye, Edit, Trash2 } from "lucide-react"
import Image from "next/image"
import type { GalleryItem } from "@/hooks/use-dashboard-data"
import { dashboardTexts, statusBadgeVariants } from "../../config"

interface GalleryItemCardProps {
  item: GalleryItem
  onView: (id: string, category: "작품" | "후기") => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

/**
 * 개별 갤러리 아이템을 표시하는 카드 컴포넌트
 */
export function GalleryItemCard({ item, onView, onEdit, onDelete }: GalleryItemCardProps) {
  const handleDelete = () => {
    if (confirm(dashboardTexts.gallery.confirmDelete)) {
      onDelete(item.id)
    }
  }

  const getStatusBadgeVariant = (status: GalleryItem["status"]) => {
    return statusBadgeVariants.gallery[status] as "default" | "secondary" | "outline"
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-gray-200">
        <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge>{item.category}</Badge>
          <Badge variant={getStatusBadgeVariant(item.status)}>{item.status}</Badge>
        </div>

        <h3 className="text-lg font-bold mb-2">{item.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {item.views}
          </span>
          <span>❤️ {item.likes}</span>
          <span className="ml-auto">{item.createdAt}</span>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={() => onView(item.id, item.category)}
          >
            <Eye className="mr-1 h-4 w-4" />
            {dashboardTexts.gallery.buttons.view}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={() => onEdit(item.id)}
          >
            <Edit className="mr-1 h-4 w-4" />
            {dashboardTexts.gallery.buttons.edit}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-red-600 hover:text-red-700"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

