"use client"

import { HelpCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/layout/accordion"
import type { FAQ, ScheduleTexts } from "../../config"

type Props = {
  faqs?: FAQ[]
  texts: ScheduleTexts
}

/**
 * FAQ 탭 컴포넌트
 */
export function FAQTab({ faqs, texts }: Props) {
  if (!faqs || faqs.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-700 p-8 text-center text-gray-400">
        FAQ가 준비 중입니다.
      </div>
    )
  }

  return (
    <div className="space-y-4 mt-0">
      <div className="mb-4 flex items-center gap-2">
        <HelpCircle className="h-6 w-6 text-blue-400" />
        <h3 className="text-xl font-bold">{texts.labels.faqs}</h3>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger className="text-left hover:no-underline">
              <span className="font-semibold text-gray-200">{faq.question}</span>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm leading-relaxed text-gray-400 pl-4 border-l-2 border-blue-700">
                {faq.answer}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
