import type { Metadata } from "next"
import { ArrowRight, Check, User } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Highlight as H } from "../components/Highlight"
import { CompareLists, CtaBlock, Figure, NumberedCards, PageHero, SectionHeader, Takeaway, WhyProjectTabs } from "../components/blocks"
import { orchestraContent } from "./content"
import { CycleSvg, OrchestraSvg } from "./visuals"

export const metadata: Metadata = {
  title: "AI 오케스트라 | 왜 프로젝트인가",
  description: "지휘자는 사람, 연주자는 AI — 정하기·그리기·만들기·고치기·알리기 5단계로 기획부터 배포·홍보까지 완주하는 AI 오케스트라 프로젝트",
}

const { hero, concept, stages, cycle, promo, proof, course, cta } = orchestraContent

export default function AiOrchestraPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-100">
      <Header />
      <main className="flex-1">
        <PageHero {...hero}><OrchestraSvg stages={stages.items} /></PageHero>
        <WhyProjectTabs current="/why-project/ai-orchestra" />

        {/* 01 Concept */}
        <section id={concept.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...concept} />
            <NumberedCards items={concept.roles} />
            <CompareLists before={concept.before} after={concept.after} />
          </div>
        </section>

        {/* 02 Stages */}
        <section id={stages.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...stages} />
            <div className="space-y-4">
              {stages.items.map((s) => (
                <div key={s.step} className="grid gap-5 rounded-3xl border bg-gray-950/70 p-6 md:grid-cols-[180px_1fr_240px] md:items-center md:p-7" style={{ borderColor: `${s.color}44` }}>
                  <div>
                    <div className="text-sm font-bold" style={{ color: s.color }}>STEP {s.step}</div>
                    <div className="text-2xl font-extrabold text-white">{s.name}</div>
                    <div className="mt-1 text-xs text-gray-500 break-keep">{s.goal}</div>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {s.ai.map((a) => (
                      <div key={a.tool} className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
                        <div className="text-sm font-bold" style={{ color: s.color }}>{a.tool}</div>
                        <div className="text-xs text-gray-400 break-keep">{a.role}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3 rounded-xl bg-violet-500/[0.08] px-4 py-3">
                    <User className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
                    <div>
                      <div className="text-[11px] font-bold tracking-widest text-violet-300">지휘자의 몫</div>
                      <div className="text-sm text-gray-200 break-keep">{s.human}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 03 Cycle */}
        <section id={cycle.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...cycle} />
            <Figure><CycleSvg steps={cycle.steps} /></Figure>
            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
              {cycle.steps.map((s, i) => (
                <li key={s.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="mb-2 text-xs font-bold text-violet-400">0{i + 1}</div>
                  <div className="mb-1 font-bold text-white">{s.title}</div>
                  <p className="mb-3 text-xs leading-relaxed text-gray-400 break-keep">{s.desc}</p>
                  <span className="inline-block rounded-md bg-white/5 px-2 py-1 text-[11px] text-gray-300">강사: {s.coach}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 04 Promo */}
        <section id={promo.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...promo} />
            <div className="mb-10 flex flex-col gap-3 lg:flex-row lg:items-stretch">
              {promo.pipeline.map((p, i) => (
                <div key={p.title} className="flex flex-1 items-center gap-3">
                  <div className="h-full flex-1 rounded-2xl border bg-gray-950/70 p-5" style={{ borderColor: `${p.color}55` }}>
                    <div className="mb-1 text-xs font-bold" style={{ color: p.color }}>0{i + 1} · {p.title}</div>
                    <div className="mb-2 font-bold text-white">{p.tool}</div>
                    <p className="text-xs leading-relaxed text-gray-400 break-keep">{p.desc}</p>
                  </div>
                  {i < promo.pipeline.length - 1 && <ArrowRight className="hidden h-5 w-5 shrink-0 text-violet-400 lg:block" />}
                </div>
              ))}
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {promo.why.map((w) => (
                <li key={w} className="flex items-center gap-2 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.05] px-4 py-3 text-sm text-gray-200 break-keep">
                  <Check className="h-4 w-4 shrink-0 text-emerald-400" />{w}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 05 Proof */}
        <section id={proof.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...proof} />
            <div className="grid gap-4 md:grid-cols-3">
              {proof.services.map((s) => (
                <div key={s.name} className="rounded-3xl border bg-gray-950/70 p-7" style={{ borderColor: `${s.color}55` }}>
                  <div className="mb-4 h-1.5 w-12 rounded-full" style={{ background: s.color }} />
                  <h3 className="mb-3 text-lg font-bold text-white">{s.name}</h3>
                  <p className="text-sm leading-relaxed text-gray-400 break-keep"><H text={s.desc} /></p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 06 Course */}
        <section id={course.id} className="scroll-mt-32 border-t border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader label={course.label} title={course.title} />
            <NumberedCards items={course.items} />
            <Takeaway text={course.quote} />
          </div>
        </section>

        <CtaBlock {...cta} />
      </main>
      <Footer />
    </div>
  )
}
