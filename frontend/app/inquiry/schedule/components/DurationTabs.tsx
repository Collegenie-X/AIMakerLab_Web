"use client"

import { Button } from "@/components/ui/buttons/button"
import { Clock } from "lucide-react"

type DurationTabsProps = {
  durations: string[]
  selected: string
  onChange: (duration: string) => void
}

/**
 * 수업 시간 필터 탭 컴포넌트
 * @param durations - 시간 목록 (예: ["전체", "3시간", "6시간", "12시간"])
 * @param selected - 선택된 시간
 * @param onChange - 선택 변경 핸들러
 */
export function DurationTabs({ durations, selected, onChange }: DurationTabsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {durations.map((duration) => (
        <Button
          key={duration}
          variant={selected === duration ? "default" : "outline"}
          onClick={() => onChange(duration)}
          className={`min-w-[120px] h-12 text-base font-semibold transition-all ${
            selected === duration
              ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg"
              : "border-2 border-gray-300 hover:border-purple-400 hover:bg-purple-50"
          }`}
        >
          {duration !== "전체" && <Clock className="mr-2 h-5 w-5" />}
          {duration}
        </Button>
      ))}
    </div>
  )
}
