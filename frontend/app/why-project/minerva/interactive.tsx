"use client"

import { useState } from "react"
import { Lightbulb, MapPin } from "lucide-react"
import { Highlight as H } from "../components/Highlight"
import type { MinervaContent } from "./content"

type Lens = MinervaContent["lenses"]["items"][number]
type Case = MinervaContent["cases"]["items"][number]
type City = MinervaContent["cities"]["list"][number]

/** 실제 기업 케이스 × 6개 렌즈 */
export function CaseExplorer({ cases, lenses }: { cases: Case[]; lenses: Lens[] }) {
  const [active, setActive] = useState(cases[0].key)
  const c = cases.find((x) => x.key === active) ?? cases[0]
  return (
    <div className="mb-10">
      <div role="tablist" aria-label="기업 케이스" className="mb-6 grid grid-cols-2 gap-2 md:grid-cols-4">
        {cases.map((x) => {
          const on = x.key === active
          return (
            <button
              key={x.key}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(x.key)}
              className={`rounded-2xl border p-4 text-left transition ${
                on ? "border-violet-400/60 bg-violet-500/15" : "border-white/10 bg-white/[0.02] hover:border-violet-400/40"
              }`}
            >
              <div className="text-xs text-gray-500">{x.company} · {x.year}</div>
              <div className={`mt-1 text-sm font-bold break-keep ${on ? "text-white" : "text-gray-300"}`}>{x.title}</div>
            </button>
          )
        })}
      </div>

      <div role="tabpanel" className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
        <div className="mb-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-start">
          <p className="text-sm leading-relaxed text-gray-400 break-keep">{c.summary}</p>
          <div className="rounded-xl border border-fuchsia-500/30 bg-fuchsia-500/[0.07] px-4 py-3 text-sm font-semibold text-fuchsia-200 break-keep md:max-w-xs">
            Q. {c.question}
          </div>
        </div>
        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {lenses.map((l) => (
            <div key={l.key} className="rounded-2xl border bg-gray-950/70 p-5" style={{ borderColor: `${l.color}44` }}>
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xs font-bold" style={{ color: l.color }}>{l.no}</span>
                <span className="text-sm font-bold" style={{ color: l.color }}>{l.title} 렌즈</span>
              </div>
              <p className="text-sm leading-relaxed text-gray-300 break-keep">
                <H text={c.lenses[l.key as keyof Case["lenses"]]} />
              </p>
            </div>
          ))}
        </div>
        <div className="flex gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] p-5">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
          <div>
            <div className="mb-1 text-xs font-bold tracking-widest text-emerald-400">우리라면 이렇게 — 토론 결론 예시</div>
            <p className="text-sm leading-relaxed text-gray-200 break-keep"><H text={c.answer} /></p>
          </div>
        </div>
      </div>
    </div>
  )
}

/** 도시별 산업 · 협업 기관 · 과제 */
export function CityExplorer({ cities }: { cities: City[] }) {
  const [active, setActive] = useState(cities[0].city)
  const c = cities.find((x) => x.city === active) ?? cities[0]
  return (
    <div className="grid gap-4 md:grid-cols-[220px_1fr]">
      <div role="tablist" aria-label="도시" className="flex gap-2 overflow-x-auto pb-1 md:flex-col md:overflow-visible md:pb-0 [scrollbar-width:none]">
        {cities.map((x) => {
          const on = x.city === active
          return (
            <button
              key={x.city}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(x.city)}
              className={`flex shrink-0 items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${
                on ? "bg-white/[0.06] font-bold text-white" : "border-white/10 text-gray-400 hover:text-white"
              }`}
              style={on ? { borderColor: `${x.color}99` } : undefined}
            >
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: x.color }} />
                {x.city}
              </span>
              <span className="hidden text-[11px] font-normal text-gray-500 md:inline">{x.year}</span>
            </button>
          )
        })}
      </div>

      <div role="tabpanel" className="rounded-3xl border bg-gray-950/70 p-6 md:p-8" style={{ borderColor: `${c.color}55` }}>
        <div className="mb-6 flex flex-wrap items-baseline gap-3">
          <MapPin className="h-5 w-5 self-center" style={{ color: c.color }} />
          <h3 className="text-2xl font-extrabold text-white">{c.city}</h3>
          <span className="text-sm text-gray-500">{c.en}</span>
          <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: `${c.color}22`, color: c.color }}>{c.year}</span>
        </div>
        <dl className="mb-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <dt className="mb-1 text-xs font-bold tracking-widest text-gray-500">도시의 산업</dt>
            <dd className="text-sm text-gray-200 break-keep">{c.industry}</dd>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <dt className="mb-1 text-xs font-bold tracking-widest text-gray-500">협업 기관 유형</dt>
            <dd className="text-sm text-gray-200 break-keep">{c.partners}</dd>
          </div>
        </dl>
        <div className="rounded-2xl p-5" style={{ background: `${c.color}12`, border: `1px solid ${c.color}44` }}>
          <div className="mb-2 text-xs font-bold tracking-widest" style={{ color: c.color }}>예시 프로젝트 과제</div>
          <p className="mb-3 text-base font-semibold leading-relaxed text-white break-keep"><H text={c.challenge} /></p>
          <div className="text-xs text-gray-400">핵심 렌즈 · <span className="font-semibold text-gray-200">{c.lens}</span></div>
        </div>
      </div>
    </div>
  )
}
