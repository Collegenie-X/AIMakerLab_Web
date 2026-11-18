/**
 * 출강 수업 필터 바 컴포넌트
 * UI 로직: 상태 및 카테고리 필터링, 검색
 */

'use client'

import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { OutreachPageTexts, outreachFormOptions } from '../config'
import { Search } from 'lucide-react'

type OutreachFilterBarProps = {
  texts: OutreachPageTexts
  selectedStatus: string
  selectedCategory: string
  searchQuery: string
  onStatusChange: (status: string) => void
  onCategoryChange: (category: string) => void
  onSearchChange: (query: string) => void
}

/**
 * 출강 수업 필터 바
 */
export function OutreachFilterBar({
  texts,
  selectedStatus,
  selectedCategory,
  searchQuery,
  onStatusChange,
  onCategoryChange,
  onSearchChange,
}: OutreachFilterBarProps) {
  const statusOptions = [
    { value: '전체', label: texts.status.all },
    { value: '접수대기', label: texts.status.pending },
    { value: '검토중', label: texts.status.reviewing },
    { value: '견적발송', label: texts.status.quoted },
    { value: '확정', label: texts.status.confirmed },
    { value: '완료', label: texts.status.completed },
  ]

  return (
    <div className="mb-6 space-y-4">
      {/* 필터 선택 */}
      <div className="flex flex-col gap-4 md:flex-row">
        {/* 상태 필터 */}
        <Select value={selectedStatus} onValueChange={onStatusChange}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="상태 선택" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* 카테고리 필터 */}
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="기관 유형 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="전체">전체 기관</SelectItem>
            {outreachFormOptions.institutionTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* 검색 */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="기관명, 담당자명, 지역으로 검색..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* 필터 초기화 버튼 */}
      {(selectedStatus !== '전체' || selectedCategory !== '전체' || searchQuery) && (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onStatusChange('전체')
              onCategoryChange('전체')
              onSearchChange('')
            }}
          >
            필터 초기화
          </Button>
        </div>
      )}
    </div>
  )
}

