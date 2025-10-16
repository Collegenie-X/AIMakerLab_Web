"use client"

import { ScheduleCard } from "./ScheduleCard"
import { ScheduleDetailDialog } from "./ScheduleDetailDialog"
import type { ScheduleItem } from "../config"

export function ScheduleList({ items }: { items: ScheduleItem[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <ScheduleDetailDialog key={item.id} item={item} trigger={<div><ScheduleCard item={item} /></div>} />
      ))}
    </div>
  )
}


