// 세금계산서 정보 입력 섹션 컴포넌트

"use client"

import { Input } from "@/components/ui/forms/input"
import { Label } from "@/components/ui/forms/label"
import { Switch } from "@/components/ui/forms/switch"
import type { QuoteInvoiceInfo } from "../types"
import { createFieldChangeHandler, createCheckboxChangeHandler } from "../utils/formHelpers"

/**
 * 세금계산서 정보 섹션 Props
 */
export type InvoiceInfoSectionProps = {
  value: QuoteInvoiceInfo
  onChange: (next: QuoteInvoiceInfo) => void
}

/**
 * 세금계산서 정보 입력 섹션
 * 세금계산서 발행 요청 시 필요한 정보를 입력받습니다
 */
export function InvoiceInfoSection({ value, onChange }: InvoiceInfoSectionProps) {
  // 공통 핸들러 생성
  const handleFieldChange = createFieldChangeHandler(value, onChange)
  const handleCheckboxChange = createCheckboxChangeHandler(value, onChange)

  return (
    <div className="space-y-4">
      {/* 세금계산서 발행 요청 스위치 */}
      <div className="flex items-center gap-3">
        <Switch 
          id="needTaxInvoice" 
          checked={value.needTaxInvoice} 
          onCheckedChange={handleCheckboxChange("needTaxInvoice")} 
        />
        <Label htmlFor="needTaxInvoice">세금계산서 발행 요청</Label>
      </div>

      {/* 세금계산서 정보 입력 (요청 시에만 표시) */}
      {value.needTaxInvoice && (
        <div className="grid gap-4 md:grid-cols-2">
          {/* 상호(회사명) */}
          <div>
            <Label htmlFor="companyName">상호(회사명)</Label>
            <Input 
              id="companyName" 
              value={value.companyName || ""} 
              onChange={handleFieldChange("companyName")} 
            />
          </div>

          {/* 사업자등록번호 */}
          <div>
            <Label htmlFor="businessNumber">사업자등록번호</Label>
            <Input 
              id="businessNumber" 
              value={value.businessNumber || ""} 
              onChange={handleFieldChange("businessNumber")} 
              placeholder="000-00-00000" 
            />
          </div>

          {/* 대표자명 */}
          <div>
            <Label htmlFor="representativeName">대표자명</Label>
            <Input 
              id="representativeName" 
              value={value.representativeName || ""} 
              onChange={handleFieldChange("representativeName")} 
            />
          </div>

          {/* 세금계산서 이메일 */}
          <div>
            <Label htmlFor="taxEmail">세금계산서 이메일</Label>
            <Input 
              id="taxEmail" 
              type="email" 
              value={value.taxEmail || ""} 
              onChange={handleFieldChange("taxEmail")} 
            />
          </div>

          {/* 사업장 주소 */}
          <div className="md:col-span-2">
            <Label htmlFor="address">사업장 주소</Label>
            <Input 
              id="address" 
              value={value.address || ""} 
              onChange={handleFieldChange("address")} 
            />
          </div>
        </div>
      )}
    </div>
  )
}


