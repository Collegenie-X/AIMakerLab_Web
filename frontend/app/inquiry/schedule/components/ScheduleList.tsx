"use client"

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
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <ScheduleDetailDialog 
          key={item.id} 
          item={item} 
          texts={texts}
          trigger={<div><ScheduleCard item={item} texts={texts} /></div>} 
        />
      ))}
    </div>
  )
}


