/**
 * 빈 상태를 표시하는 컴포넌트
 */

"use client"

import { Card } from "@/components/ui/data-display/card"
import { Button } from "@/components/ui/buttons/button"
import { LucideIcon } from "lucide-react"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

/**
 * 데이터가 없을 때 표시되는 빈 상태 컴포넌트
 */
export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <Card className="p-12 text-center">
      <Icon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </Card>
  )
}

