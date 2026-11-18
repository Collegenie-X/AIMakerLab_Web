"use client"

import type { ScheduleTexts } from "../config"

type InfoSectionProps = {
  texts: ScheduleTexts
}

/**
 * 수강 신청 안내 섹션 컴포넌트
 * @param texts - 표시할 텍스트 설정
 */
export function InfoSection({ texts }: InfoSectionProps) {
  return (
    <section className="w-full bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-2xl font-bold">{texts.info.title}</h2>
          <div className="space-y-4 text-gray-600">
            <div className="rounded-lg bg-white p-4">
              <h3 className="mb-2 font-semibold text-gray-900">{texts.info.refundTitle}</h3>
              <p className="text-sm">{texts.info.refundDesc}</p>
            </div>
            <div className="rounded-lg bg-white p-4">
              <h3 className="mb-2 font-semibold text-gray-900">{texts.info.capacityTitle}</h3>
              <p className="text-sm">{texts.info.capacityDesc}</p>
            </div>
            <div className="rounded-lg bg-white p-4">
              <h3 className="mb-2 font-semibold text-gray-900">{texts.info.contactTitle}</h3>
              <p className="text-sm">{texts.info.contactDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


