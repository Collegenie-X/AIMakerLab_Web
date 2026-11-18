/**
 * 대시보드 통계 카드 컴포넌트
 */

"use client"

import { Card } from "@/components/ui/data-display/card"
import { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: number | string
  icon: LucideIcon
  description: string
  color: string
  onClick?: () => void
}

/**
 * 통계 정보를 표시하는 카드 컴포넌트
 */
export function StatCard({ title, value, icon: Icon, description, color, onClick }: StatCardProps) {
  return (
    <Card
      className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-1">{value}</h3>
      <p className="text-sm font-medium text-gray-700 mb-1">{title}</p>
      <p className="text-xs text-gray-500">{description}</p>
    </Card>
  )
}

