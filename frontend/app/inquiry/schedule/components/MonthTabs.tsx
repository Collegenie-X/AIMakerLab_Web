"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/navigation/tabs"

type Props = {
  months: string[]
  selected: string
  onChange: (value: string) => void
}

export function MonthTabs({ months, selected, onChange }: Props) {
  return (
    <Tabs value={selected} onValueChange={onChange} className="mb-8">
      <TabsList className="grid w-full max-w-md grid-cols-3">
        {months.map((month) => {
          const [year, monthNum] = month.split("-")
          const monthName = new Date(Number.parseInt(year), Number.parseInt(monthNum) - 1).toLocaleDateString(
            "ko-KR",
            { year: "numeric", month: "long" },
          )
          return (
            <TabsTrigger key={month} value={month}>
              {monthName}
            </TabsTrigger>
          )
        })}
      </TabsList>
    </Tabs>
  )
}


