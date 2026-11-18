"use client"

import { statusStyles, type InquiryStatus } from "../config"

type StatusBadgeProps = {
  status: InquiryStatus
}

/**
 * 문의 상태 배지 컴포넌트
 * 
 * config.ts에서 상태별 스타일과 아이콘을 관리합니다.
 * 
 * @param status - 문의 상태
 */
export function StatusBadge({ status }: StatusBadgeProps) {
  const style = statusStyles[status]
  const Icon = style.icon

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${style.badge}`}>
      <Icon className="h-3.5 w-3.5" />
      {status}
    </span>
  )
}
