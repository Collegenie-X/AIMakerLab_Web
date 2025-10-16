"use client"

import { Button } from "@/components/ui/buttons/button"

type Props = {
  categories: string[]
  selected: string
  onChange: (category: string) => void
  allLabel?: string
  totalCount: number
  countSuffix?: string
}

/**
 * 갤러리 카테고리 필터 섹션
 */
export function GalleryCategoryFilter({
  categories,
  selected,
  onChange,
  allLabel = "전체",
  totalCount,
  countSuffix = "개",
}: Props) {
  const fullCategories = [allLabel, ...categories]

  return (
    <section className="py-8 bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50 border-b border-blue-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {fullCategories.map((category) => (
            <Button
              key={category}
              onClick={() => onChange(category)}
              variant={selected === category ? "default" : "outline"}
              className={
                selected === category
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600"
                  : "border-blue-300 text-blue-700 hover:bg-blue-50"
              }
            >
              {category}
            </Button>
          ))}
        </div>
        <div className="mt-4 text-center text-sm text-gray-600">
          총 <span className="font-bold text-blue-600">{totalCount}</span>
          {countSuffix}
        </div>
      </div>
    </section>
  )
}

