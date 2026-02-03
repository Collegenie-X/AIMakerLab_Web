"use client"

import { Button } from "@/components/ui/buttons/button"
import { Send } from "lucide-react"
import { InquiryList } from "../../components/InquiryList"
import { inquiryConfig } from "../../config"
import { labels, inquiryButtonGradient } from "../config"

type InquiryListSectionProps = {
  onOpenInquiry: () => void
}

/**
 * 문의 목록 섹션 컴포넌트
 * 
 * config.ts에서 텍스트와 스타일을 관리합니다.
 * 
 * @param onOpenInquiry - 문의 작성 다이얼로그 열기 함수
 */
export function InquiryListSection({ onOpenInquiry }: InquiryListSectionProps) {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          {/* 헤더 */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {labels.list.title}
            </h2>
            <Button 
              onClick={onOpenInquiry}
              className={`bg-gradient-to-r ${inquiryButtonGradient}`}
            >
              <Send className="mr-2 h-4 w-4" />
              {labels.list.buttonText}
            </Button>
          </div>

          {/* 문의 목록 */}
          <InquiryList initialItems={inquiryConfig.items} />
        </div>
      </div>
    </section>
  )
}
