"use client"

import { Button } from "@/components/ui/buttons/button"
import { Input } from "@/components/ui/forms/input"
import { Label } from "@/components/ui/forms/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/forms/select"
import { Card, CardContent } from "@/components/ui/data-display/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/data-display/table"
import { Plus, Trash2 } from "lucide-react"
import type { QuoteItem } from "../config"
import { quoteFormOptions } from "../config"
import { useQuoteItems } from "../hooks/useQuoteItems"

export type ItemsTableSectionProps = {
  items: QuoteItem[]
  onChange: (next: QuoteItem[]) => void
}

export function ItemsTableSection({ items, onChange }: ItemsTableSectionProps) {
  const { items: catalog } = useQuoteItems()

  const update = (index: number, patch: Partial<QuoteItem>) => {
    const next = items.map((it, i) => (i === index ? { ...it, ...patch } : it))
    onChange(next)
  }

  const addRow = () => {
    onChange([
      ...items,
      {
        id: `item-${Date.now()}`,
        name: quoteFormOptions.defaultItem.name,
        unitPrice: 0,
        quantity: 1,
        taxType: "과세",
      },
    ])
  }

  const removeRow = (index: number) => {
    const next = items.filter((_, i) => i !== index)
    onChange(next)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-3">
          <Label className="text-base">품목 목록</Label>
          <Button size="sm" variant="secondary" onClick={addRow}>
            <Plus className="h-4 w-4 mr-1" /> 행 추가
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[28%]">품목명</TableHead>
              <TableHead>설명</TableHead>
              <TableHead className="w-[12%] text-right">단가</TableHead>
              <TableHead className="w-[10%] text-right">수량</TableHead>
              <TableHead className="w-[10%] text-right">공급가</TableHead>
              <TableHead className="w-[10%] text-right">세액</TableHead>
              <TableHead className="w-[10%]">과세구분</TableHead>
              <TableHead className="w-[6%]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((it, idx) => {
              const supply = Math.max(0, (it.unitPrice || 0) * (it.quantity || 0))
              const tax = it.taxType === "과세" ? Math.floor(supply * 0.1) : 0
              return (
                <TableRow key={it.id}>
                  <TableCell>
                    <Select
                      value={it.name}
                      onValueChange={(v) => {
                        const selected = catalog.find((c) => c.name === v)
                        update(idx, { name: v, unitPrice: selected ? selected.unitPrice : it.unitPrice })
                      }}
                    >
                      <SelectTrigger><SelectValue placeholder="품목 선택" /></SelectTrigger>
                      <SelectContent>
                        {catalog.map((c) => (
                          <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input value={it.description || ""} onChange={(e) => update(idx, { description: e.target.value })} placeholder="옵션/설명" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Input type="number" value={it.unitPrice} onChange={(e) => update(idx, { unitPrice: Number(e.target.value || 0) })} className="text-right" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Input type="number" value={it.quantity} onChange={(e) => update(idx, { quantity: Number(e.target.value || 0) })} className="text-right" />
                  </TableCell>
                  <TableCell className="text-right">{supply.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{tax.toLocaleString()}</TableCell>
                  <TableCell>
                    <Select value={it.taxType} onValueChange={(v) => update(idx, { taxType: v as any })}>
                      <SelectTrigger><SelectValue placeholder="구분" /></SelectTrigger>
                      <SelectContent>
                        {quoteFormOptions.taxTypes.map((t) => (
                          <SelectItem key={t} value={t as string}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="icon" variant="ghost" onClick={() => removeRow(idx)} aria-label="행 삭제">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}


