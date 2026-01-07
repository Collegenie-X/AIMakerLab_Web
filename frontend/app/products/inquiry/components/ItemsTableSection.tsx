// 품목 목록 테이블 섹션 컴포넌트

"use client"

import { Button } from "@/components/ui/buttons/button"
import { Input } from "@/components/ui/forms/input"
import { Label } from "@/components/ui/forms/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/forms/select"
import { Card, CardContent } from "@/components/ui/data-display/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/data-display/table"
import { Plus, Trash2 } from "lucide-react"
import type { QuoteItem } from "../types"
import { QUOTE_FORM_OPTIONS } from "../constants"
import { useQuoteItems } from "../hooks/useQuoteItems"
import { calculateLineSupplyAmount, calculateLineTaxAmount } from "../lib/calculator"
import { updateArrayItem, addArrayItem, removeArrayItem } from "../utils/formHelpers"

/**
 * 품목 테이블 섹션 Props
 */
export type ItemsTableSectionProps = {
  items: QuoteItem[]
  onChange: (next: QuoteItem[]) => void
}

/**
 * 품목 목록 테이블 섹션
 * 견적서에 포함될 품목들을 입력하고 관리합니다
 */
export function ItemsTableSection({ items, onChange }: ItemsTableSectionProps) {
  // 품목 카탈로그 로딩
  const { items: catalog } = useQuoteItems()

  /**
   * 품목 업데이트 핸들러
   */
  const handleUpdateItem = (index: number, patch: Partial<QuoteItem>) => {
    const updatedItems = updateArrayItem(items, index, patch)
    onChange(updatedItems)
  }

  /**
   * 품목 추가 핸들러
   */
  const handleAddItem = () => {
    const newItem: QuoteItem = {
      id: `item-${Date.now()}`,
      name: QUOTE_FORM_OPTIONS.defaultItem.name,
      unitPrice: 0,
      quantity: 1,
      taxType: "과세",
    }
    const updatedItems = addArrayItem(items, newItem)
    onChange(updatedItems)
  }

  /**
   * 품목 삭제 핸들러
   */
  const handleRemoveItem = (index: number) => {
    const updatedItems = removeArrayItem(items, index)
    onChange(updatedItems)
  }

  /**
   * 카탈로그에서 품목 선택 핸들러
   */
  const handleSelectFromCatalog = (index: number, itemName: string) => {
    const selected = catalog.find((c) => c.name === itemName)
    const patch: Partial<QuoteItem> = {
      name: itemName,
      unitPrice: selected ? selected.unitPrice : items[index].unitPrice,
    }
    handleUpdateItem(index, patch)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-3">
          <Label className="text-base">품목 목록</Label>
          <Button size="sm" variant="secondary" onClick={handleAddItem}>
            <Plus className="h-4 w-4 mr-1" /> 행 추가
          </Button>
        </div>

        {/* 품목 테이블 */}
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
            {items.map((item, index) => {
              // 품목별 계산
              const supply = calculateLineSupplyAmount(item.unitPrice, item.quantity)
              const tax = calculateLineTaxAmount(supply, item.taxType)

              return (
                <TableRow key={item.id}>
                  {/* 품목명 (카탈로그 선택) */}
                  <TableCell>
                    <Select
                      value={item.name}
                      onValueChange={(value) => handleSelectFromCatalog(index, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="품목 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {catalog.map((catalogItem) => (
                          <SelectItem key={catalogItem.id} value={catalogItem.name}>
                            {catalogItem.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>

                  {/* 설명 */}
                  <TableCell>
                    <Input 
                      value={item.description || ""} 
                      onChange={(e) => handleUpdateItem(index, { description: e.target.value })} 
                      placeholder="옵션/설명" 
                    />
                  </TableCell>

                  {/* 단가 */}
                  <TableCell className="text-right">
                    <Input 
                      type="number" 
                      value={item.unitPrice} 
                      onChange={(e) => handleUpdateItem(index, { unitPrice: Number(e.target.value || 0) })} 
                      className="text-right" 
                    />
                  </TableCell>

                  {/* 수량 */}
                  <TableCell className="text-right">
                    <Input 
                      type="number" 
                      value={item.quantity} 
                      onChange={(e) => handleUpdateItem(index, { quantity: Number(e.target.value || 0) })} 
                      className="text-right" 
                    />
                  </TableCell>

                  {/* 공급가 (계산값) */}
                  <TableCell className="text-right">{supply.toLocaleString()}</TableCell>

                  {/* 세액 (계산값) */}
                  <TableCell className="text-right">{tax.toLocaleString()}</TableCell>

                  {/* 과세구분 */}
                  <TableCell>
                    <Select 
                      value={item.taxType} 
                      onValueChange={(value) => handleUpdateItem(index, { taxType: value as "과세" | "면세" })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="구분" />
                      </SelectTrigger>
                      <SelectContent>
                        {QUOTE_FORM_OPTIONS.taxTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>

                  {/* 삭제 버튼 */}
                  <TableCell className="text-right">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={() => handleRemoveItem(index)} 
                      aria-label="행 삭제"
                    >
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


