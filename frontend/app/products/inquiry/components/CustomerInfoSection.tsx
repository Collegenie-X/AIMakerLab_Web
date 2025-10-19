"use client"

import { Input } from "@/components/ui/forms/input"
import { Label } from "@/components/ui/forms/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/forms/select"
import type { QuoteCustomerInfo } from "../config"

export type CustomerInfoSectionProps = {
  value: QuoteCustomerInfo
  onChange: (next: QuoteCustomerInfo) => void
  requesterTypes: readonly string[]
}

export function CustomerInfoSection({ value, onChange, requesterTypes }: CustomerInfoSectionProps) {
  const handle = <K extends keyof QuoteCustomerInfo>(key: K) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, [key]: e.target.value })
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <Label htmlFor="requesterType">요청 주체</Label>
        <Select value={value.requesterType} onValueChange={(v) => onChange({ ...value, requesterType: v as any })}>
          <SelectTrigger id="requesterType"><SelectValue placeholder="선택" /></SelectTrigger>
          <SelectContent>
            {requesterTypes.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="organizationName">기관/학교명</Label>
        <Input id="organizationName" value={value.organizationName} onChange={handle("organizationName")} placeholder="예: ○○초등학교" />
      </div>
      <div>
        <Label htmlFor="departmentOrClass">부서/학급</Label>
        <Input id="departmentOrClass" value={value.departmentOrClass || ""} onChange={handle("departmentOrClass")} placeholder="예: 과학부 / 5-3" />
      </div>
      <div>
        <Label htmlFor="managerName">담당자명</Label>
        <Input id="managerName" value={value.managerName} onChange={handle("managerName")} />
      </div>
      <div>
        <Label htmlFor="phone">연락처</Label>
        <Input id="phone" value={value.phone} onChange={handle("phone")} placeholder="010-0000-0000" />
      </div>
      <div>
        <Label htmlFor="email">이메일</Label>
        <Input id="email" type="email" value={value.email} onChange={handle("email")} placeholder="teacher@school.kr" />
      </div>
    </div>
  )
}


