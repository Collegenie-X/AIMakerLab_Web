"use client"

import { useState } from "react"
import { BookOpen, Briefcase, Lightbulb, MapPin, MessageCircle } from "lucide-react"
import { Highlight as H } from "../components/Highlight"
import type { MinervaContent } from "./content"
import { CityScene, LensIcon, type CityKey } from "./scenes"

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
          <p className="text-sm leading-relaxed text-gray-400 break-keep"><H text={c.summary} /></p>
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

/** 7개 도시 — 장면 카드 갤러리 + 상세 패널 */
export function CityExplorer({ cities }: { cities: City[] }) {
  const [active, setActive] = useState(cities[0].key)
  const c = cities.find((x) => x.key === active) ?? cities[0]
  const card = (x: City, big: boolean) => {
    const on = x.key === active
    return (
      <button
        key={x.key}
        role="tab"
        aria-selected={on}
        onClick={() => setActive(x.key)}
        className={`group overflow-hidden rounded-2xl border text-left transition hover:-translate-y-1 ${on ? "" : "border-white/10"}`}
        style={on ? { borderColor: x.color, boxShadow: `0 0 0 2px ${x.color}55, 0 12px 40px -12px ${x.color}88` } : undefined}
      >
        <CityScene city={x.key as CityKey} color={x.color} uid={`card-${x.key}`} />
        <div className="flex items-center justify-between gap-2 bg-gray-950/90 px-4 py-3">
          <div className="min-w-0">
            <div className={`font-bold break-keep ${big ? "text-lg" : "text-sm"}`} style={{ color: x.color }}>{x.city}</div>
            <div className="truncate text-[11px] text-gray-500">{x.landmark}</div>
          </div>
          <span className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ background: `${x.color}22`, color: x.color }}>{x.semester}</span>
        </div>
      </button>
    )
  }
  return (
    <div>
      <div role="tablist" aria-label="도시" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {["1학년", "2학년", "3학년", "4학년"].map((yr, i) => (
          <div key={yr} className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-500/20 text-xs font-extrabold text-violet-300">{i + 1}</span>
              <span className="text-sm font-bold text-white">{yr}</span>
              <span className="text-xs text-gray-500">{i === 0 ? "한 도시에서 1년" : "학기마다 이사"}</span>
            </div>
            {cities.filter((x) => x.year === yr).map((x) => card(x, i === 0))}
          </div>
        ))}
      </div>

      <div role="tabpanel" className="mt-6 grid overflow-hidden rounded-3xl border bg-gray-950/70 md:grid-cols-[1fr_1.3fr]" style={{ borderColor: `${c.color}55` }}>
        <div className="relative">
          <CityScene city={c.key as CityKey} color={c.color} uid="panel" fill />
        </div>
        <div className="p-6 md:p-8">
          <div className="mb-5 flex flex-wrap items-baseline gap-3">
            <MapPin className="h-5 w-5 self-center" style={{ color: c.color }} />
            <h3 className="text-2xl font-extrabold text-white">{c.city}</h3>
            <span className="text-sm text-gray-500">{c.en}</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: `${c.color}22`, color: c.color }}>{c.year} {c.semester}</span>
          </div>
          <div className="mb-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <div className="mb-1 text-xs font-bold tracking-widest text-gray-500">살면서 배우는 문화</div>
            <p className="text-sm leading-relaxed text-gray-200 break-keep"><H text={c.culture} /></p>
          </div>
          <dl className="mb-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <dt className="mb-1 text-xs font-bold tracking-widest text-gray-500">도시의 산업</dt>
              <dd className="text-sm text-gray-200 break-keep"><H text={c.industry} /></dd>
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
    </div>
  )
}

type LensDetail = MinervaContent["lensDetails"][keyof MinervaContent["lensDetails"]]

/** 6개 렌즈 — 수업 · 프로젝트 · 사고 습관 · 읽을거리 */
export function LensExplorer({ lenses, details }: { lenses: Lens[]; details: Record<string, LensDetail> }) {
  const [active, setActive] = useState(lenses[0].key)
  const l = lenses.find((x) => x.key === active) ?? lenses[0]
  const d = details[l.key]
  return (
    <div>
      <div role="tablist" aria-label="렌즈" className="mb-4 grid grid-cols-3 gap-2 md:grid-cols-6">
        {lenses.map((x) => {
          const on = x.key === active
          return (
            <button
              key={x.key}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(x.key)}
              className={`flex flex-col items-center gap-1 rounded-2xl border px-2 py-4 transition hover:-translate-y-0.5 ${on ? "" : "border-white/10 bg-white/[0.02]"}`}
              style={on ? { borderColor: x.color, background: `${x.color}1a` } : undefined}
            >
              <LensIcon kind={x.key} color={on ? x.color : "#6b7280"} size={36} />
              <span className="text-sm font-bold" style={{ color: on ? x.color : "#d1d5db" }}>{x.title}</span>
              <span className="hidden text-[10px] text-gray-500 md:block">{x.en}</span>
            </button>
          )
        })}
      </div>

      <div role="tabpanel" className="rounded-3xl border bg-gray-950/70 p-6 md:p-8" style={{ borderColor: `${l.color}55` }}>
        <div className="mb-6 flex items-start gap-4">
          <div className="shrink-0 rounded-2xl p-2" style={{ background: `${l.color}1a` }}><LensIcon kind={l.key} color={l.color} size={56} /></div>
          <div>
            <div className="text-xs font-bold tracking-widest" style={{ color: l.color }}>LENS {l.no} · {l.en}</div>
            <p className="mt-1 text-xl font-bold leading-snug text-white md:text-2xl break-keep">“<H text={l.question} />”</p>
          </div>
        </div>
        <div className="mb-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <div className="mb-2 flex items-center gap-2 text-xs font-bold tracking-widest text-sky-300"><MessageCircle className="h-4 w-4" />수업에서 — 토론 질문</div>
            <p className="text-sm leading-relaxed text-gray-200 break-keep"><H text={d.classQ} /></p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <div className="mb-2 flex items-center gap-2 text-xs font-bold tracking-widest text-amber-300"><Briefcase className="h-4 w-4" />프로젝트에서 — 기업 과제 적용</div>
            <p className="text-sm leading-relaxed text-gray-200 break-keep"><H text={d.project} /></p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <div className="mb-2 text-xs font-bold tracking-widest text-gray-500">관련 사고 습관(HC) 예</div>
            <div className="flex flex-wrap gap-1.5">
              {d.hcs.map((h) => (
                <span key={h} className="rounded-md px-2 py-1 font-mono text-xs" style={{ background: `${l.color}1a`, color: l.color }}>{h}</span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <div className="mb-2 flex items-center gap-2 text-xs font-bold tracking-widest text-gray-500"><BookOpen className="h-4 w-4" />미리 읽어 오는 책</div>
            <p className="text-sm text-gray-200 break-keep">{d.reading}</p>
            <p className="mt-1 text-xs text-gray-500 break-keep">사상적 뿌리 · {l.roots}</p>
          </div>
          <div className="rounded-2xl border border-rose-500/25 bg-rose-500/[0.05] p-5">
            <div className="mb-2 text-xs font-bold tracking-widest text-rose-300">이 렌즈가 막는 함정</div>
            <p className="text-sm text-gray-200 break-keep"><H text={l.trap} /></p>
            <p className="mt-1 text-xs text-gray-500 break-keep">실전 도구 · {l.tools}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
