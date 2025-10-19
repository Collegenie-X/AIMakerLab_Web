"use client"

import { useMemo, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/data-display/card"
import { Button } from "@/components/ui/buttons/button"
import { Separator } from "@/components/ui/layout/separator"
import { useToast } from "@/hooks/use-toast"
import { CustomerInfoSection } from "./components/CustomerInfoSection"
import { InvoiceInfoSection } from "./components/InvoiceInfoSection"
import { ItemsTableSection } from "./components/ItemsTableSection"
import { DeliveryAndAgreementSection } from "./components/DeliveryAndAgreementSection"
import { quoteFormInitialData, quoteFormOptions, quoteText, calculateTotals, validateQuoteForm } from "./config"
import type { QuoteFormData } from "./config"

export default function ProductsInquiryPage() {
  const [data, setData] = useState<QuoteFormData>(quoteFormInitialData)
  const { toast } = useToast()

  // 배송비 고정 옵션 적용
  const fixedShipping = quoteFormOptions.shipping.fixed ? quoteFormOptions.shipping.amount : data.extra.shippingFee
  const totals = useMemo(
    () => calculateTotals(data.items, fixedShipping, data.extra.discount, { discountMode: quoteFormOptions.discount.mode }),
    [data, fixedShipping]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errors = validateQuoteForm(data)
    if (errors.length > 0) {
      toast({ title: "입력값을 확인해 주세요.", description: errors.join("\n") })
      return
    }

    // 실제 환경: 백엔드 API로 전송. 여기서는 콘솔로 확인
    console.log("QUOTE_SUBMIT", data)
    toast({ title: "견적 요청이 접수되었습니다.", description: "담당자가 확인 후 연락드리겠습니다." })
    setData(quoteFormInitialData)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-4 py-10">
          <h1 className="text-2xl font-bold mb-2">{quoteText.pageTitle}</h1>
          <p className="text-muted-foreground mb-6">{quoteText.pageDescription}</p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>고객/학교 정보</CardTitle>
              </CardHeader>
              <CardContent>
                <CustomerInfoSection
                  value={data.customer}
                  requesterTypes={quoteFormOptions.requesterTypes as unknown as string[]}
                  onChange={(next) => setData((prev) => ({ ...prev, customer: next }))}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>세금계산서 정보</CardTitle>
              </CardHeader>
              <CardContent>
                <InvoiceInfoSection value={data.invoice} onChange={(next) => setData((prev) => ({ ...prev, invoice: next }))} />
              </CardContent>
            </Card>

            <ItemsTableSection items={data.items} onChange={(next) => setData((prev) => ({ ...prev, items: next }))} />

            <Card>
              <CardHeader>
                <CardTitle>배송/비고 및 동의</CardTitle>
              </CardHeader>
              <CardContent>
                <DeliveryAndAgreementSection
                  value={{ ...data.extra, shippingFee: fixedShipping }}
                  onChange={(next) => setData((prev) => ({ ...prev, extra: { ...next, shippingFee: fixedShipping } }))}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="space-y-1">
                    <div className="flex justify-between"><span>공급가 합계</span><strong>{totals.supplyAmount.toLocaleString()}원</strong></div>
                    <div className="flex justify-between"><span>세액(VAT)</span><strong>{totals.taxAmount.toLocaleString()}원</strong></div>
                    <Separator />
                    <div className="flex justify-between"><span>품목 합계</span><strong>{totals.itemsTotal.toLocaleString()}원</strong></div>
                    <div className="flex justify-between"><span>배송비</span><strong>{fixedShipping.toLocaleString()}원</strong></div>
                    <div className="flex justify-between"><span>{quoteText.discountTotalLabel}</span><strong>-{totals.discountAmount.toLocaleString()}원</strong></div>
                  </div>
                  <div className="flex items-end justify-end">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground mb-1">{quoteText.grandTotalLabel}</div>
                      <div className="text-3xl font-bold">{totals.grandTotal.toLocaleString()}원</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <p className="text-sm text-muted-foreground">{quoteText.discountNotice}</p>

            <div className="flex justify-end mt-4">
              <Button type="submit" size="lg">{quoteText.submitButton}</Button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  )
}


