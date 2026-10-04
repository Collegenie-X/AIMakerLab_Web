"use client"

import { useEffect, useState } from "react"
import { Heart, MessageSquare, RotateCcw } from "lucide-react"
import { Highlight as H } from "../components/Highlight"
import type { VibeContent } from "./content"

type DemoItem = VibeContent["serverless"]["demo"][number]
type DjangoStep = VibeContent["backend"]["steps"][number]

const KEY = "vibe-demo-favs"

function readFavs(): number[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? "[]")
    return Array.isArray(v) ? v : []
  } catch {
    return []
  }
}

/** 이 페이지에서 실제로 동작하는 localStorage 즐겨찾기 데모 */
export function FavoriteDemo({ items }: { items: DemoItem[] }) {
  const [favs, setFavs] = useState<number[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setFavs(readFavs())
    setReady(true)
  }, [])

  const save = (next: number[]) => {
    setFavs(next)
    try {
      localStorage.setItem(KEY, JSON.stringify(next))
    } catch {
      /* 시크릿 모드 등에서는 저장되지 않음 */
    }
  }
  const toggle = (id: number) => save(favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id])

  return (
    <div className="rounded-3xl border border-sky-500/30 bg-sky-500/[0.04] p-6 md:p-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs font-bold tracking-widest text-sky-300">직접 해 보기 · 서버 없이 동작</div>
          <p className="mt-1 text-sm text-gray-400 break-keep">하트를 누르고 새로고침해 보세요. 브라우저 localStorage에 저장되어 그대로 남습니다.</p>
        </div>
        <button
          onClick={() => save([])}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-gray-300 transition hover:border-sky-400/50 hover:text-white"
        >
          <RotateCcw className="h-3.5 w-3.5" /> 초기화
        </button>
      </div>
      <ul className="mb-5 grid gap-3 sm:grid-cols-3">
        {items.map((it) => {
          const on = favs.includes(it.id)
          return (
            <li key={it.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-gray-950/70 p-4">
              <div className="min-w-0">
                <div className="truncate font-bold text-white">{it.title}</div>
                <div className="text-xs text-gray-500">{it.grade} · {it.hours}시간</div>
              </div>
              <button
                onClick={() => toggle(it.id)}
                aria-pressed={on}
                aria-label={`${it.title} 즐겨찾기`}
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition ${
                  on ? "border-pink-400/60 bg-pink-500/20 text-pink-300" : "border-white/10 text-gray-500 hover:text-pink-300"
                }`}
              >
                <Heart className={`h-4 w-4 ${on ? "fill-current" : ""}`} />
              </button>
            </li>
          )
        })}
      </ul>
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-xs text-gray-300">
        <span className="text-gray-500">localStorage.getItem(</span>
        <span className="text-amber-300">&quot;{KEY}&quot;</span>
        <span className="text-gray-500">) → </span>
        <span className="text-sky-300">{ready ? JSON.stringify(favs) : "…"}</span>
      </div>
    </div>
  )
}

/** Django 4단계 — 프롬프트 · 파일 · 코드 */
export function DjangoSteps({ steps }: { steps: DjangoStep[] }) {
  const [active, setActive] = useState(0)
  const s = steps[active]
  return (
    <div className="mb-10">
      <div role="tablist" aria-label="Django 단계" className="mb-4 grid grid-cols-2 gap-2 md:grid-cols-4">
        {steps.map((x, i) => {
          const on = i === active
          return (
            <button
              key={x.title}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(i)}
              className={`rounded-2xl border p-4 text-left transition ${on ? "bg-white/[0.06]" : "border-white/10 bg-white/[0.02] hover:border-white/25"}`}
              style={on ? { borderColor: `${x.color}99` } : undefined}
            >
              <div className="text-lg font-extrabold" style={{ color: x.color }}>{x.no}</div>
              <div className={`text-sm font-bold ${on ? "text-white" : "text-gray-300"}`}>{x.title}</div>
            </button>
          )
        })}
      </div>
      <div role="tabpanel" className="grid gap-4 md:grid-cols-[1fr_1.4fr]">
        <div className="rounded-3xl border bg-gray-950/70 p-6" style={{ borderColor: `${s.color}55` }}>
          <div className="mb-3 flex items-center gap-2 text-xs font-bold tracking-widest" style={{ color: s.color }}>
            <MessageSquare className="h-4 w-4" /> AI에게 이렇게 묻기
          </div>
          <p className="text-base font-semibold leading-relaxed text-white break-keep">{s.prompt}</p>
          <p className="mt-4 text-xs leading-relaxed text-gray-500 break-keep">
            <H text="한 번에 끝나지 않습니다. 결과를 읽고 “왜 이 필드 타입이야?”, “빈 값이면?”처럼 ==다시 묻는 것==이 실력입니다." />
          </p>
        </div>
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/50">
          <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3 text-xs text-gray-400">
            <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
            {s.file}
          </div>
          <pre className="overflow-x-auto p-5 text-[13px] leading-relaxed text-gray-200"><code>{s.code}</code></pre>
        </div>
      </div>
    </div>
  )
}
