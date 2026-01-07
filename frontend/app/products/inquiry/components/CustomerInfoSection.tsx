// 고객 정보 입력 섹션 컴포넌트

"use client"

import { Input } from "@/components/ui/forms/input"
import { Label } from "@/components/ui/forms/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/forms/select"
import type { QuoteCustomerInfo } from "../types"
import { createFieldChangeHandler, createSelectChangeHandler } from "../utils/formHelpers"

/**
 * 고객 정보 섹션 Props
 */
export type CustomerInfoSectionProps = {
  value: QuoteCustomerInfo
  onChange: (next: QuoteCustomerInfo) => void
  requesterTypes: readonly string[]
}

/**
 * 고객/학교 정보 입력 섹션
 * 요청 주체, 기관명, 담당자 정보 등을 입력받습니다
 */
export function CustomerInfoSection({ value, onChange, requesterTypes }: CustomerInfoSectionProps) {
  // 공통 핸들러 생성
  const handleFieldChange = createFieldChangeHandler(value, onChange)
  const handleSelectChange = createSelectChangeHandler(value, onChange)

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* 요청 주체 */}
      <div>
        <Label htmlFor="requesterType">요청 주체</Label>
        <Select 
          value={value.requesterType} 
          onValueChange={handleSelectChange("requesterType")}
        >
          <SelectTrigger id="requesterType">
            <SelectValue placeholder="선택" />
          </SelectTrigger>
          <SelectContent>
            {requesterTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 기관/학교명 */}
      <div>
        <Label htmlFor="organizationName">기관/학교명</Label>
        <Input 
          id="organizationName" 
          value={value.organizationName} 
          onChange={handleFieldChange("organizationName")} 
          placeholder="예: ○○초등학교" 
        />
      </div>

      {/* 부서/학급 */}
      <div>
        <Label htmlFor="departmentOrClass">부서/학급</Label>
        <Input 
          id="departmentOrClass" 
          value={value.departmentOrClass || ""} 
          onChange={handleFieldChange("departmentOrClass")} 
          placeholder="예: 과학부 / 5-3" 
        />
      </div>

      {/* 담당자명 */}
      <div>
        <Label htmlFor="managerName">담당자명</Label>
        <Input 
          id="managerName" 
          value={value.managerName} 
          onChange={handleFieldChange("managerName")} 
        />
      </div>

      {/* 연락처 */}
      <div>
        <Label htmlFor="phone">연락처</Label>
        <Input 
          id="phone" 
          value={value.phone} 
          onChange={handleFieldChange("phone")} 
          placeholder="010-0000-0000" 
        />
      </div>

      {/* 이메일 */}
      <div>
        <Label htmlFor="email">이메일</Label>
        <Input 
          id="email" 
          type="email" 
          value={value.email} 
          onChange={handleFieldChange("email")} 
          placeholder="teacher@school.kr" 
        />
      </div>
    </div>
  )
}


