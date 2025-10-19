"use client"

import { Input } from "@/components/ui/forms/input"
import { Label } from "@/components/ui/forms/label"
import { Switch } from "@/components/ui/forms/switch"
import type { QuoteInvoiceInfo } from "../config"

export type InvoiceInfoSectionProps = {
  value: QuoteInvoiceInfo
  onChange: (next: QuoteInvoiceInfo) => void
}

export function InvoiceInfoSection({ value, onChange }: InvoiceInfoSectionProps) {
  const handle = <K extends keyof QuoteInvoiceInfo>(key: K) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, [key]: e.target.value })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Switch id="needTaxInvoice" checked={value.needTaxInvoice} onCheckedChange={(checked) => onChange({ ...value, needTaxInvoice: checked })} />
        <Label htmlFor="needTaxInvoice">세금계산서 발행 요청</Label>
      </div>

      {value.needTaxInvoice && (
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="companyName">상호(회사명)</Label>
            <Input id="companyName" value={value.companyName || ""} onChange={handle("companyName")} />
          </div>
          <div>
            <Label htmlFor="businessNumber">사업자등록번호</Label>
            <Input id="businessNumber" value={value.businessNumber || ""} onChange={handle("businessNumber")} placeholder="000-00-00000" />
          </div>
          <div>
            <Label htmlFor="representativeName">대표자명</Label>
            <Input id="representativeName" value={value.representativeName || ""} onChange={handle("representativeName")} />
          </div>
          <div>
            <Label htmlFor="taxEmail">세금계산서 이메일</Label>
            <Input id="taxEmail" type="email" value={value.taxEmail || ""} onChange={handle("taxEmail")} />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="address">사업장 주소</Label>
            <Input id="address" value={value.address || ""} onChange={handle("address")} />
          </div>
        </div>
      )}
    </div>
  )
}


