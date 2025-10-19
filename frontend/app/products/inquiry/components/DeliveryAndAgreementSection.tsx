"use client"

import { Input } from "@/components/ui/forms/input"
import { Label } from "@/components/ui/forms/label"
import { Textarea } from "@/components/ui/forms/textarea"
import { Checkbox } from "@/components/ui/forms/checkbox"
import type { QuoteExtraInfo } from "../config"
import { quoteFormOptions, quoteText } from "../config"

export type DeliveryAndAgreementSectionProps = {
  value: QuoteExtraInfo
  onChange: (next: QuoteExtraInfo) => void
}

export function DeliveryAndAgreementSection({ value, onChange }: DeliveryAndAgreementSectionProps) {
  const handle = <K extends keyof QuoteExtraInfo>(key: K) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const raw = e.target.value
    const nextVal = key === "shippingFee" || key === "discount" ? Number(raw || 0) : raw
    onChange({ ...value, [key]: nextVal } as QuoteExtraInfo)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <Label htmlFor="shippingFee">배송비</Label>
        <Input
          id="shippingFee"
          type="number"
          value={value.shippingFee}
          onChange={handle("shippingFee")}
          className="text-right"
          disabled={quoteFormOptions.shipping.fixed}
        />
        {quoteFormOptions.shipping.fixed && (
          <p className="mt-1 text-xs text-muted-foreground">배송비는 고정 {quoteFormOptions.shipping.amount.toLocaleString()}원입니다.</p>
        )}
      </div>
      <div>
        <Label htmlFor="discount">{quoteText.discountInputLabel}</Label>
        <Input id="discount" type="number" value={value.discount} onChange={handle("discount")} className="text-right" min={0} max={100} />
        <p className="mt-1 text-xs text-muted-foreground">{quoteText.discountInputHint}</p>
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="deliveryMemo">배송/비고</Label>
        <Textarea id="deliveryMemo" value={value.deliveryMemo || ""} onChange={handle("deliveryMemo")} placeholder="납품기한, 수취인/주소, 전자계산서 요청사항 등" />
      </div>
      <div className="md:col-span-2 flex items-start gap-3">
        <Checkbox id="agreePrivacy" checked={value.agreePrivacy} onCheckedChange={(v) => onChange({ ...value, agreePrivacy: Boolean(v) })} />
        <Label htmlFor="agreePrivacy" className="leading-6">개인정보 수집·이용에 동의합니다. (문의 응대 목적)</Label>
      </div>
    </div>
  )
}


