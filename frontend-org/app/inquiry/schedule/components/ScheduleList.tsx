"use client"

import { useState } from "react"
import { ScheduleCard } from "./ScheduleCard"
import { ScheduleDetailDialog } from "./ScheduleDetailDialog"
import type { ScheduleItem, ScheduleTexts } from "../config"

type ScheduleListProps = {
  items: ScheduleItem[]
  texts: ScheduleTexts
}

/**
 * 수업 목록 컴포넌트
 * @param items - 수업 목록
 * @param texts - 표시할 텍스트 설정
 */
export function ScheduleList({ items, texts }: ScheduleListProps) {
  const [selectedItem, setSelectedItem] = useState<ScheduleItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleViewDetail = (item: ScheduleItem) => {
    setSelectedItem(item)
    setIsDialogOpen(true)
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ScheduleCard 
            key={item.id} 
            item={item} 
            texts={texts}
            onViewDetail={handleViewDetail}
          />
        ))}
      </div>

      {selectedItem && (
        <ScheduleDetailDialog
          item={selectedItem}
          texts={texts}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      )}
    </>
  )
}


