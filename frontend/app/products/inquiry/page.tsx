// 견적 문의 메인 페이지

"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/data-display/card"
import { Button } from "@/components/ui/buttons/button"
import { Separator } from "@/components/ui/layout/separator"
import { CustomerInfoSection } from "./components/CustomerInfoSection"
import { InvoiceInfoSection } from "./components/InvoiceInfoSection"
import { ItemsTableSection } from "./components/ItemsTableSection"
import { DeliveryAndAgreementSection } from "./components/DeliveryAndAgreementSection"
import { useQuoteForm } from "./hooks/useQuoteForm"
import { QUOTE_FORM_OPTIONS, QUOTE_TEXT } from "./constants"
import { FileText, ShoppingCart, Sparkles } from "lucide-react"

/**
 * 견적 문의 페이지
 * 학교/기관 대량 구매 및 교구재 견적, 세금계산서 발행 요청을 접수합니다
 */
export default function ProductsInquiryPage() {
  // 폼 상태 및 비즈니스 로직 관리
  const {
    formData,
    totals,
    updateCustomerInfo,
    updateInvoiceInfo,
    updateItems,
    updateExtraInfo,
    submitForm,
  } = useQuoteForm()

  // 배송비 (고정 옵션 적용)
  const fixedShipping = QUOTE_FORM_OPTIONS.shipping.fixed 
    ? QUOTE_FORM_OPTIONS.shipping.amount 
    : formData.extra.shippingFee

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 py-12 text-white">
          <div className="absolute inset-0 bg-[url('/home/abstract-tech-pattern.png')] opacity-10" />
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              {/* 배지 */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold">
                <FileText className="w-4 h-4" />
                대량 구매 견적
              </div>

              {/* 제목 */}
              <h1 className="mb-4 text-4xl font-bold md:text-5xl" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}>
                {QUOTE_TEXT.pageTitle}
              </h1>

              {/* 설명 */}
              <p className="text-lg text-white/90 md:text-xl mb-6" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}>
                {QUOTE_TEXT.pageDescription}
              </p>
              
              {/* 특징 아이콘 */}
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="text-sm font-medium">10개 이상 할인</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <FileText className="w-5 h-5" />
                  <span className="text-sm font-medium">세금계산서 발행</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm font-medium">교육 자료 제공</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="mx-auto max-w-5xl px-4 py-10">
          <form onSubmit={submitForm} className="space-y-8">
            {/* 고객/학교 정보 */}
            <Card>
              <CardHeader>
                <CardTitle>고객/학교 정보</CardTitle>
              </CardHeader>
              <CardContent>
                <CustomerInfoSection
                  value={formData.customer}
                  requesterTypes={QUOTE_FORM_OPTIONS.requesterTypes}
                  onChange={updateCustomerInfo}
                />
              </CardContent>
            </Card>

            {/* 세금계산서 정보 */}
            <Card>
              <CardHeader>
                <CardTitle>세금계산서 정보</CardTitle>
              </CardHeader>
              <CardContent>
                <InvoiceInfoSection 
                  value={formData.invoice} 
                  onChange={updateInvoiceInfo} 
                />
              </CardContent>
            </Card>

            {/* 품목 목록 */}
            <ItemsTableSection 
              items={formData.items} 
              onChange={updateItems} 
            />

            {/* 배송/비고 및 동의 */}
            <Card>
              <CardHeader>
                <CardTitle>배송/비고 및 동의</CardTitle>
              </CardHeader>
              <CardContent>
                <DeliveryAndAgreementSection
                  value={{ ...formData.extra, shippingFee: fixedShipping }}
                  onChange={(next) => updateExtraInfo({ ...next, shippingFee: fixedShipping })}
                />
              </CardContent>
            </Card>

            {/* 합계 정보 */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-2 md:grid-cols-2">
                  {/* 상세 금액 */}
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>공급가 합계</span>
                      <strong>{totals.supplyAmount.toLocaleString()}원</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>세액(VAT)</span>
                      <strong>{totals.taxAmount.toLocaleString()}원</strong>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span>품목 합계</span>
                      <strong>{totals.itemsTotal.toLocaleString()}원</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>배송비</span>
                      <strong>{fixedShipping.toLocaleString()}원</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>{QUOTE_TEXT.discountTotalLabel}</span>
                      <strong>-{totals.discountAmount.toLocaleString()}원</strong>
                    </div>
                  </div>

                  {/* 총 금액 */}
                  <div className="flex items-end justify-end">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground mb-1">
                        {QUOTE_TEXT.grandTotalLabel}
                      </div>
                      <div className="text-3xl font-bold">
                        {totals.grandTotal.toLocaleString()}원
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 할인 안내 */}
            <p className="text-sm text-muted-foreground">
              {QUOTE_TEXT.discountNotice}
            </p>

            {/* 제출 버튼 */}
            <div className="flex justify-end mt-4">
              <Button type="submit" size="lg">
                {QUOTE_TEXT.submitButton}
              </Button>
            </div>
          </form>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}


