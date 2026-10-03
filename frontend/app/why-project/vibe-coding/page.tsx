import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Highlight as H } from "../components/Highlight"
import { CompareLists, CtaBlock, Figure, NumberedCards, PageHero, SectionHeader, Takeaway, WhyProjectTabs } from "../components/blocks"
import { vibeContent } from "./content"
import { SixStepSvg, SpeedBarsSvg, VibeLoopSvg } from "./visuals"

export const metadata: Metadata = {
  title: "바이브 코딩 | 왜 프로젝트인가",
  description: "AI에게 말로 설명하고 다듬으며 실제 서비스를 만드는 바이브 코딩 — 역할, 6단계 개발 프로세스, 대표 프로젝트와 도구",
}

const { hero, what, shift, speed, roles, process, projects, tools, outcome, cta } = vibeContent

export default function VibeCodingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-100">
      <Header />
      <main className="flex-1">
        <PageHero {...hero}><VibeLoopSvg /></PageHero>
        <WhyProjectTabs current="/why-project/vibe-coding" />

        {/* 01 What */}
        <section id={what.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...what} />
            <CompareLists before={what.before} after={what.after} />
          </div>
        </section>

        {/* 02 Shift */}
        <section id={shift.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-4xl px-4">
            <SectionHeader {...shift} />
            <div className="overflow-hidden rounded-3xl border border-white/10">
              <div className="grid grid-cols-[1fr_auto_1fr] bg-white/[0.03] px-6 py-3 text-xs font-bold tracking-widest">
                <span className="text-gray-500">AI 이전</span><span />
                <span className="text-right text-violet-300">AI 이후</span>
              </div>
              {shift.rows.map((r) => (
                <div key={r.bg} className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-t border-white/5 px-6 py-4">
                  <span className="text-sm text-gray-500 line-through decoration-rose-400/40 break-keep">{r.bg}</span>
                  <ArrowRight className="h-4 w-4 text-violet-400" />
                  <span className="text-right text-sm font-semibold text-white break-keep">{r.ag}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 03 Speed */}
        <section id={speed.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...speed} />
            <Figure caption="MVP 제작 단계별 소요 시간 비교 (AI Maker Lab 수업 기준)"><SpeedBarsSvg tasks={speed.tasks} /></Figure>
          </div>
        </section>

        {/* 04 Roles */}
        <section id={roles.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...roles} />
            <NumberedCards items={roles.items} cols={4} />
          </div>
        </section>

        {/* 05 Process */}
        <section id={process.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...process} />
            <Figure><SixStepSvg steps={process.steps} /></Figure>
            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
              {process.steps.map((s, i) => (
                <li key={s.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="mb-2 text-xs font-bold text-violet-400">STEP {i + 1} · {s.week}</div>
                  <div className="mb-2 font-bold text-white">{s.title}</div>
                  <span className="inline-block rounded-md bg-white/5 px-2 py-1 text-[11px] text-gray-300">→ {s.output}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 06 Projects */}
        <section id={projects.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader label={projects.label} title={projects.title} />
            <div className="mb-14 grid gap-4 md:grid-cols-3">
              {projects.items.map((p) => (
                <div key={p.title} className="rounded-3xl border bg-gray-950/70 p-7" style={{ borderColor: `${p.color}55` }}>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-4xl">{p.emoji}</span>
                    <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ color: p.color, background: `${p.color}1f` }}>{p.level}</span>
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-white">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-400 break-keep"><H text={p.desc} /></p>
                </div>
              ))}
            </div>
            <h3 className="mb-6 text-center text-xl font-bold text-white">학년별 과정</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {projects.tracks.map((t) => (
                <div key={t.grade} className="rounded-2xl border border-white/10 bg-gray-950/60 p-5 text-center">
                  <div className="text-sm text-gray-500">{t.grade}</div>
                  <div className="my-1 text-2xl font-extrabold text-violet-300">{t.hours}</div>
                  <div className="text-sm text-gray-300 break-keep">{t.output}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 07 Tools */}
        <section id={tools.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader label={tools.label} title={tools.title} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {tools.groups.map((g) => (
                <div key={g.name} className="rounded-2xl border bg-gray-950/60 p-6" style={{ borderColor: `${g.color}55` }}>
                  <h3 className="mb-4 font-bold" style={{ color: g.color }}>{g.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((it) => (
                      <span key={it} className="rounded-lg bg-white/5 px-3 py-1.5 text-sm text-gray-200">{it}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 08 Outcome */}
        <section id={outcome.id} className="scroll-mt-32 border-t border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader label={outcome.label} title={outcome.title} />
            <NumberedCards items={outcome.items} />
            <Takeaway text={outcome.quote} />
          </div>
        </section>

        <CtaBlock {...cta} />
      </main>
      <Footer />
    </div>
  )
}
