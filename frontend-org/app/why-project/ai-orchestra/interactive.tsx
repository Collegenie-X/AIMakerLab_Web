"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Check, Clock, Copy, FileOutput, MessageSquare, User } from "lucide-react"
import { Highlight as H } from "../components/Highlight"
import { ToolChip } from "./tool-ui"
import { StageScene } from "./scenes"
import type { OrchestraContent } from "./content"

type Stage = OrchestraContent["process"]["stages"][number]
type CampaignStep = OrchestraContent["campaign"]["steps"][number]
type Level = OrchestraContent["agent"]["levels"][number]

export function CopyButton({ text, label = "복사" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setDone(true)
      setTimeout(() => setDone(false), 1500)
    } catch {
      /* 클립보드 권한이 없으면 무시 */
    }
  }
  return (
    <button
      onClick={copy}
      className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-gray-300 transition hover:border-white/30 hover:text-white"
    >
      {done ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
      {done ? "복사됨" : label}
    </button>
  )
}

function PromptBox({ text, color, title = "AI에게 이렇게 입력" }: { text: string; color: string; title?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-widest" style={{ color }}>
          <MessageSquare className="h-3.5 w-3.5" /> {title}
        </div>
        <CopyButton text={text} />
      </div>
      <p className="text-sm leading-relaxed text-gray-200 break-keep">{text}</p>
    </div>
  )
}

/** 7단계 프로세스 탐색기 — 사용 순서 · 프롬프트 · 산출물 · 통과 기준 */
export function ProcessExplorer({ stages }: { stages: Stage[] }) {
  const [active, setActive] = useState(0)
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const s = stages[active]
  const passed = s.gate.filter((g) => checked[`${s.step}-${g}`]).length

  return (
    <div>
      <div role="tablist" aria-label="프로세스 단계" className="mb-4 grid grid-cols-4 gap-2 md:grid-cols-7">
        {stages.map((x, i) => {
          const on = i === active
          return (
            <button
              key={x.step}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(i)}
              className={`rounded-2xl border p-3 text-left transition ${on ? "bg-white/[0.06]" : "border-white/10 bg-white/[0.02] hover:border-white/25"}`}
              style={on ? { borderColor: `${x.color}aa` } : undefined}
            >
              <div className="text-xs font-extrabold" style={{ color: x.color }}>{x.step}</div>
              <div className={`text-base font-bold ${on ? "text-white" : "text-gray-300"}`}>{x.name}</div>
            </button>
          )
        })}
      </div>

      <div role="tabpanel" className="rounded-3xl border bg-gray-950/70 p-5 md:p-8" style={{ borderColor: `${s.color}55` }}>
        <div className="mb-6 grid items-center gap-5 md:grid-cols-[1fr_300px]">
          <div>
            <div className="text-xs font-bold tracking-widest" style={{ color: s.color }}>STEP {s.step} · {s.en.toUpperCase()}</div>
            <h3 className="mt-1 text-2xl font-extrabold text-white break-keep">{s.name} — {s.goal}</h3>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs text-gray-300">
              <Clock className="h-3.5 w-3.5" /> 예상 {s.time}
            </span>
          </div>
          <StageScene key={s.step} index={active} color={s.color} />
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-bold text-gray-500">이 단계의 연주자</span>
          {s.tools.map((id) => <ToolChip key={id} id={id} />)}
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <div>
            <div className="mb-3 text-xs font-bold tracking-widest text-gray-400">이렇게 진행합니다</div>
            <ol className="space-y-2.5">
              {s.how.map((h, i) => (
                <li key={h} className="flex gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold text-gray-950" style={{ background: s.color }}>{i + 1}</span>
                  <span className="text-sm leading-relaxed text-gray-200 break-keep"><H text={h} /></span>
                </li>
              ))}
            </ol>
          </div>
          <div className="space-y-4">
            <PromptBox text={s.prompt} color={s.color} title="예시 프롬프트" />
            <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <FileOutput className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
              <div>
                <div className="text-[11px] font-bold tracking-widest text-sky-300">산출물 — 이게 있어야 끝</div>
                <div className="text-sm text-gray-200 break-keep"><H text={s.output} /></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.04] p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-[11px] font-bold tracking-widest text-emerald-300">통과 기준 — 직접 체크해 보세요</div>
              <span className="text-xs text-emerald-300">{passed}/{s.gate.length}</span>
            </div>
            <ul className="space-y-2">
              {s.gate.map((g) => {
                const key = `${s.step}-${g}`
                return (
                  <li key={g}>
                    <label className="flex cursor-pointer items-start gap-2.5 text-sm text-gray-200 break-keep">
                      <input
                        type="checkbox"
                        checked={!!checked[key]}
                        onChange={(e) => setChecked((c) => ({ ...c, [key]: e.target.checked }))}
                        className="mt-0.5 h-4 w-4 shrink-0 accent-emerald-500"
                      />
                      <span><H text={g} /></span>
                    </label>
                  </li>
                )
              })}
            </ul>
            <p className="mt-3 text-xs text-gray-500">
              {passed === s.gate.length ? "✓ 다음 단계로 넘어가도 됩니다." : "모두 체크되기 전에는 다음 단계로 가지 않습니다."}
            </p>
          </div>
          <div className="flex gap-3 rounded-2xl bg-violet-500/[0.08] p-4">
            <User className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
            <div>
              <div className="text-[11px] font-bold tracking-widest text-violet-300">지휘자(학생)의 몫</div>
              <div className="text-sm text-gray-200 break-keep"><H text={s.human} /></div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button disabled={active === 0} onClick={() => setActive(active - 1)} className="inline-flex items-center gap-1.5 text-sm text-gray-400 transition hover:text-white disabled:opacity-30">
            <ArrowLeft className="h-4 w-4" /> 이전 단계
          </button>
          <button disabled={active === stages.length - 1} onClick={() => setActive(active + 1)} className="inline-flex items-center gap-1.5 text-sm text-gray-400 transition hover:text-white disabled:opacity-30">
            다음 단계 <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

/** 홍보 캠페인 9단계 따라 하기 */
export function CampaignWalkthrough({ steps }: { steps: CampaignStep[] }) {
  const [active, setActive] = useState(0)
  const s = steps[active]
  const color = "#fbbf24"
  return (
    <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
      <ol className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0 [scrollbar-width:none]">
        {steps.map((x, i) => {
          const on = i === active
          const done = i < active
          return (
            <li key={x.no} className="shrink-0">
              <button
                onClick={() => setActive(i)}
                aria-current={on ? "step" : undefined}
                className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition ${on ? "border-amber-400/60 bg-amber-500/10" : "border-white/10 bg-white/[0.02] hover:border-white/25"}`}
              >
                <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold ${done ? "bg-emerald-500 text-gray-950" : on ? "bg-amber-400 text-gray-950" : "bg-white/10 text-gray-400"}`}>
                  {done ? <Check className="h-3.5 w-3.5" /> : x.no}
                </span>
                <span className={`whitespace-nowrap text-sm ${on ? "font-bold text-white" : "text-gray-300"}`}>{x.title}</span>
              </button>
            </li>
          )
        })}
      </ol>

      <div className="rounded-3xl border border-amber-500/30 bg-gray-950/70 p-5 md:p-7">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold tracking-widest text-amber-300">STEP {s.no} / {steps.length}</div>
            <h3 className="text-xl font-extrabold text-white">{s.title}</h3>
          </div>
          <ToolChip id={s.tool} size="md" />
        </div>
        <p className="mb-5 text-sm leading-relaxed text-gray-300 break-keep"><H text={s.do} /></p>
        <div className="space-y-4">
          <PromptBox text={s.input} color={color} title="이렇게 입력 / 설정" />
          <div className="flex gap-3 rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.05] p-4">
            <FileOutput className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
            <div>
              <div className="text-[11px] font-bold tracking-widest text-emerald-300">받는 결과</div>
              <div className="text-sm text-gray-200 break-keep"><H text={s.result} /></div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <button disabled={active === 0} onClick={() => setActive(active - 1)} className="inline-flex items-center gap-1.5 text-sm text-gray-400 transition hover:text-white disabled:opacity-30">
            <ArrowLeft className="h-4 w-4" /> 이전
          </button>
          <button disabled={active === steps.length - 1} onClick={() => setActive(active + 1)} className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-4 py-1.5 text-sm font-bold text-gray-950 transition hover:bg-amber-300 disabled:opacity-30">
            다음 단계 <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

/** 자동화 레벨 L0 ~ L3 비교 */
export function AutomationLevels({ levels }: { levels: Level[] }) {
  const [active, setActive] = useState(0)
  const l = levels[active]
  const humanShare = [100, 70, 30, 10][active]
  return (
    <div className="rounded-3xl border border-white/10 bg-gray-950/70 p-5 md:p-8">
      <div role="tablist" aria-label="자동화 레벨" className="mb-6 grid grid-cols-4 gap-1 rounded-2xl bg-white/[0.03] p-1">
        {levels.map((x, i) => {
          const on = i === active
          return (
            <button
              key={x.level}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(i)}
              className={`rounded-xl px-2 py-2.5 text-sm transition ${on ? "font-bold text-gray-950" : "text-gray-300 hover:text-white"}`}
              style={on ? { background: x.color } : undefined}
            >
              {x.level} <span className="hidden sm:inline">· {x.name}</span>
            </button>
          )
        })}
      </div>

      <div className="mb-6">
        <div className="mb-2 flex justify-between text-xs">
          <span className="font-bold text-violet-300">사람이 직접 {humanShare}%</span>
          <span className="font-bold text-amber-300">AI · 에이전트 {100 - humanShare}%</span>
        </div>
        <div className="flex h-3 overflow-hidden rounded-full bg-amber-400/50">
          <div className="h-full rounded-full bg-violet-400 transition-all duration-500" style={{ width: `${humanShare}%` }} />
        </div>
      </div>

      <div role="tabpanel" className="grid gap-3 sm:grid-cols-2">
        {[
          { k: "시작 방식", v: l.who },
          { k: "AI가 하는 일", v: l.ai },
          { k: "사람이 하는 일", v: l.human },
          { k: "숏츠 1편 사람 작업 시간", v: l.time },
        ].map((r) => (
          <div key={r.k} className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
            <div className="mb-1 text-[11px] font-bold tracking-widest" style={{ color: l.color }}>{r.k}</div>
            <div className="text-sm text-gray-200 break-keep"><H text={r.v} /></div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-400 break-keep">
        <span className="font-bold text-white">언제 이 레벨?</span> {l.when}
      </p>
    </div>
  )
}
