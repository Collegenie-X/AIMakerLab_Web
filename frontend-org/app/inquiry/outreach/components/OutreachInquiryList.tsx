/**
 * 출강 수업 문의 목록 컴포넌트
 * UI 로직: 문의 카드 목록 렌더링
 */

'use client'

import { OutreachInquiryItem } from '../config'
import { OutreachInquiryCard } from './OutreachInquiryCard'

type OutreachInquiryListProps = {
  items: OutreachInquiryItem[]
  onViewDetail: (item: OutreachInquiryItem) => void
}

/**
 * 출강 수업 문의 목록
 */
export function OutreachInquiryList({ items, onViewDetail }: OutreachInquiryListProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <OutreachInquiryCard key={item.id} item={item} onViewDetail={onViewDetail} />
      ))}
    </div>
  )
}

