"use client"

import { scheduleTexts } from "../config"

export function HeroScheduleSection() {
  return (
    <section className="w-full bg-gradient-to-r from-blue-600 to-blue-800 py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-2 text-4xl font-bold text-white">{scheduleTexts.heroTitle}</h1>
          <p className="text-base text-blue-100">{scheduleTexts.heroSubtitle}</p>
        </div>
      </div>
    </section>
  )
}


