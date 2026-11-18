// 배송 정보 및 동의 입력 섹션 컴포넌트

"use client"

import { Input } from "@/components/ui/forms/input"
import { Label } from "@/components/ui/forms/label"
import { Textarea } from "@/components/ui/forms/textarea"
import { Checkbox } from "@/components/ui/forms/checkbox"
import type { QuoteExtraInfo } from "../types"
import { QUOTE_FORM_OPTIONS, QUOTE_TEXT } from "../constants"

/**
 * 배송 및 동의 섹션 Props
 */
export type DeliveryAndAgreementSectionProps = {
  value: QuoteExtraInfo
  onChange: (next: QuoteExtraInfo) => void
}

/**
 * 배송 정보 및 동의 입력 섹션
 * 배송비, 할인율, 배송 메모, 개인정보 동의를 입력받습니다
 */
export function DeliveryAndAgreementSection({ value, onChange }: DeliveryAndAgreementSectionProps) {
  /**
   * 숫자 필드 변경 핸들러
   */
  const handleNumberFieldChange = <K extends keyof QuoteExtraInfo>(key: K) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const numValue = Number(e.target.value || 0)
      onChange({ ...value, [key]: numValue } as QuoteExtraInfo)
    }

  /**
   * 텍스트 필드 변경 핸들러
   */
  const handleTextFieldChange = <K extends keyof QuoteExtraInfo>(key: K) => 
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange({ ...value, [key]: e.target.value } as QuoteExtraInfo)
    }

  /**
   * 체크박스 변경 핸들러
   */
  const handleCheckboxChange = (checked: boolean | string) => {
    onChange({ ...value, agreePrivacy: Boolean(checked) })
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* 배송비 */}
      <div>
        <Label htmlFor="shippingFee">배송비</Label>
        <Input
          id="shippingFee"
          type="number"
          value={value.shippingFee}
          onChange={handleNumberFieldChange("shippingFee")}
          className="text-right"
          disabled={QUOTE_FORM_OPTIONS.shipping.fixed}
        />
        {QUOTE_FORM_OPTIONS.shipping.fixed && (
          <p className="mt-1 text-xs text-muted-foreground">
            배송비는 고정 {QUOTE_FORM_OPTIONS.shipping.amount.toLocaleString()}원입니다.
          </p>
        )}
      </div>

      {/* 할인율 */}
      <div>
        <Label htmlFor="discount">{QUOTE_TEXT.discountInputLabel}</Label>
        <Input 
          id="discount" 
          type="number" 
          value={value.discount} 
          onChange={handleNumberFieldChange("discount")} 
          className="text-right" 
          min={0} 
          max={100} 
        />
        <p className="mt-1 text-xs text-muted-foreground">
          {QUOTE_TEXT.discountInputHint}
        </p>
      </div>

      {/* 배송/비고 */}
      <div className="md:col-span-2">
        <Label htmlFor="deliveryMemo">배송/비고</Label>
        <Textarea 
          id="deliveryMemo" 
          value={value.deliveryMemo || ""} 
          onChange={handleTextFieldChange("deliveryMemo")} 
          placeholder="납품기한, 수취인/주소, 전자계산서 요청사항 등" 
        />
      </div>

      {/* 개인정보 동의 */}
      <div className="md:col-span-2 flex items-start gap-3">
        <Checkbox 
          id="agreePrivacy" 
          checked={value.agreePrivacy} 
          onCheckedChange={handleCheckboxChange} 
        />
        <Label htmlFor="agreePrivacy" className="leading-6">
          개인정보 수집·이용에 동의합니다. (문의 응대 목적)
        </Label>
      </div>
    </div>
  )
}


