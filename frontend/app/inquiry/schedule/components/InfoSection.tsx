"use client"

import { scheduleTexts } from "../config"

export function InfoSection() {
  return (
    <section className="w-full bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-2xl font-bold">{scheduleTexts.info.title}</h2>
          <div className="space-y-4 text-gray-600">
            <div className="rounded-lg bg-white p-4">
              <h3 className="mb-2 font-semibold text-gray-900">{scheduleTexts.info.refundTitle}</h3>
              <p className="text-sm">{scheduleTexts.info.refundDesc}</p>
            </div>
            <div className="rounded-lg bg-white p-4">
              <h3 className="mb-2 font-semibold text-gray-900">{scheduleTexts.info.capacityTitle}</h3>
              <p className="text-sm">{scheduleTexts.info.capacityDesc}</p>
            </div>
            <div className="rounded-lg bg-white p-4">
              <h3 className="mb-2 font-semibold text-gray-900">{scheduleTexts.info.contactTitle}</h3>
              <p className="text-sm">{scheduleTexts.info.contactDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


