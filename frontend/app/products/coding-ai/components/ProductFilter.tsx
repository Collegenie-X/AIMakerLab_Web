'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/forms/select'
import { LABELS, CATEGORIES, GRADES } from '../config'

/**
 * 제품 필터 컴포넌트 Props
 */
interface ProductFilterProps {
  selectedCategory: string
  selectedGrade: string
  onCategoryChange: (value: string) => void
  onGradeChange: (value: string) => void
}

/**
 * 제품 필터 컴포넌트
 * 카테고리와 학년별 필터 드롭다운을 제공합니다.
 */
export function ProductFilter({
  selectedCategory,
  selectedGrade,
  onCategoryChange,
  onGradeChange,
}: ProductFilterProps) {
  return (
    <section className="border-b bg-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          {/* 카테고리 드롭다운 */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-gray-700 whitespace-nowrap">
              {LABELS.filter.categoryLabel}
            </label>
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={LABELS.filter.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 학년별 드롭다운 */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-gray-700 whitespace-nowrap">
              {LABELS.filter.gradeLabel}
            </label>
            <Select value={selectedGrade} onValueChange={onGradeChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={LABELS.filter.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {GRADES.map((grade) => (
                  <SelectItem key={grade.id} value={grade.id}>
                    {grade.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </section>
  )
}

