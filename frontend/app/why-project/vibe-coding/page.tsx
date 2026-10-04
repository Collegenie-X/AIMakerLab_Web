import type { Metadata } from "next"
import { ArrowRight, Check, CircleAlert, ShieldCheck, Smartphone } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Highlight as H } from "../components/Highlight"
import { CompareLists, CtaBlock, Figure, NumberedCards, PageHero, SectionHeader, Takeaway, WhyProjectTabs } from "../components/blocks"
import { vibeContent } from "./content"
import { SixStepSvg, SpeedBarsSvg, VibeLoopSvg } from "./visuals"
import { DjangoAdminSvg, HundredAsksSvg, PreviewBranchSvg, ServerlessArchSvg, TwoPhaseSvg, WebToAppSvg } from "./workflow-visuals"
import { DjangoSteps, FavoriteDemo } from "./interactive"
import { IcebergSvg, LearningPathSvg, OneModelSvg, ProjectArt, PromptToScreenSvg, RolesCycleSvg } from "./illustrations"

export const metadata: Metadata = {
  title: "바이브 코딩 | 왜 프로젝트인가",
  description: "AI 스튜디오 → Vercel 프리뷰 → JSON·localStorage 서버리스 테스트 → Django 백엔드·Admin → React Native 앱까지, 서비스 수준의 바이브 코딩 실무 프로세스",
}

const { hero, what, shift, speed, roles, workflow, frontFirst, serverless, backend, service, native, process, projects, tools, outcome, cta } = vibeContent

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
            <Figure caption="전통 방식은 ==마지막에야== 결과물이 나오고, 바이브 코딩은 ==첫날부터== 작동하는 것이 남는다"><LearningPathSvg /></Figure>
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
            <Figure caption="네 역할은 한 번으로 끝나지 않고 ==프로젝트가 완성될 때까지 순환==한다"><RolesCycleSvg roles={roles.items} /></Figure>
            <NumberedCards items={roles.items} cols={4} />
          </div>
        </section>

        {/* 05 Workflow */}
        <section id={workflow.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...workflow} />
            <Figure caption="현업 바이브 코딩 파이프라인 — ==화면으로 먼저 검증==하고, 확정된 JSON 구조로 백엔드를 만든다">
              <TwoPhaseSvg phases={workflow.phases} />
            </Figure>
            <NumberedCards items={workflow.principles} cols={4} />
          </div>
        </section>

        {/* 06 Front-first */}
        <section id={frontFirst.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...frontFirst} />
            <Figure caption="==말 한 줄==이 약 30초 만에 화면이 된다 — 마음에 안 들면 다시 말하면 된다"><PromptToScreenSvg /></Figure>
            <div className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {frontFirst.studios.map((t) => (
                <div key={t.name} className="rounded-2xl border bg-gray-950/70 p-5" style={{ borderColor: `${t.color}44` }}>
                  <div className="mb-2 font-bold" style={{ color: t.color }}>{t.name}</div>
                  <p className="text-sm leading-relaxed text-gray-400 break-keep"><H text={t.desc} /></p>
                </div>
              ))}
            </div>
            <Figure caption="기능마다 브랜치 → ==프리뷰 URL 공유== → 피드백 반영 → main 병합"><PreviewBranchSvg /></Figure>
            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {frontFirst.loop.map((l, i) => (
                <li key={l.title} className="relative rounded-2xl border border-white/10 bg-gray-950/60 p-5">
                  <div className="mb-1 text-xs font-bold text-violet-400">LOOP {i + 1}</div>
                  <div className="mb-2 font-bold text-white">{l.title}</div>
                  <p className="text-sm text-gray-400 break-keep"><H text={l.desc} /></p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 07 Serverless */}
        <section id={serverless.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...serverless} />
            <Figure caption="모든 데이터 호출을 repo.ts로 모으면, 나중에 Django로 바꿀 때 ==스위치 하나만== 바꾼다"><ServerlessArchSvg /></Figure>
            <div className="mb-10 grid gap-3 md:grid-cols-3">
              {serverless.layers.map((l) => (
                <div key={l.name} className="rounded-2xl border bg-gray-950/70 p-5" style={{ borderColor: `${l.color}55` }}>
                  <div className="font-mono text-sm font-bold" style={{ color: l.color }}>{l.name}</div>
                  <div className="mt-1 text-gray-200"><H text={l.role} /></div>
                  <div className="mt-1 text-sm text-gray-500">{l.examples}</div>
                </div>
              ))}
            </div>
            <div className="mb-10 grid gap-4 lg:grid-cols-[1fr_1.6fr]">
              {[serverless.code.json, serverless.code.repo].map((c) => (
                <pre key={c.slice(0, 20)} className="overflow-x-auto rounded-3xl border border-white/10 bg-black/50 p-5 text-[13px] leading-relaxed text-gray-200"><code>{c}</code></pre>
              ))}
            </div>
            <FavoriteDemo items={serverless.demo} />
            <ul className="mt-6 grid gap-3 md:grid-cols-3">
              {serverless.limits.map((t) => (
                <li key={t} className="flex gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-4 text-sm text-gray-300 break-keep">
                  <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" /><span><H text={t} /></span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 08 Django */}
        <section id={backend.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...backend} />
            <Figure caption="프론트에서 검증된 JSON → Django 모델 → ==관리자 페이지 자동 생성=="><DjangoAdminSvg /></Figure>
            <DjangoSteps steps={backend.steps} />
            <Figure caption="==모델 하나==를 정의하면 관리자 화면 · API · DB가 함께 생긴다"><OneModelSvg /></Figure>
            <div className="grid gap-3 md:grid-cols-3">
              {backend.why.map((w) => (
                <div key={w.title} className="rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.04] p-5">
                  <div className="mb-2 font-bold text-emerald-300">{w.title}</div>
                  <p className="text-sm leading-relaxed text-gray-400 break-keep"><H text={w.desc} /></p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 09 Service */}
        <section id={service.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...service} />
            <Figure caption="돌아가는 화면은 ==빙산의 일각== — 서비스는 수면 아래 90%를 묻고 검증하는 일"><IcebergSvg /></Figure>
            <Figure caption="처음 10번의 질문은 데모를 만들고, ==나머지 90번이 서비스==를 만든다"><HundredAsksSvg milestones={service.milestones} /></Figure>
            <div className="mb-12 grid gap-4 md:grid-cols-2">
              {[
                { d: service.compare.demo, on: false },
                { d: service.compare.service, on: true },
              ].map(({ d, on }) => (
                <div key={d.title} className={`rounded-3xl border p-7 ${on ? "border-emerald-500/40 bg-emerald-500/[0.06]" : "border-white/10 bg-white/[0.02]"}`}>
                  <div className="mb-5 flex items-center justify-between">
                    <h3 className={`text-lg font-bold ${on ? "text-emerald-300" : "text-gray-400"}`}>{d.title}</h3>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${on ? "bg-emerald-500/20 text-emerald-200" : "bg-white/5 text-gray-400"}`}>{d.asks}</span>
                  </div>
                  <ul className="space-y-3">
                    {d.items.map((it) => (
                      <li key={it} className={`flex gap-3 text-sm break-keep ${on ? "text-gray-200" : "text-gray-500"}`}>
                        {on ? <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> : <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-600" />}
                        <span><H text={it} /></span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <h3 className="mb-6 text-center text-xl font-bold text-white">서비스로 가기 위해 AI에게 반드시 묻는 질문들</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {service.questions.map((q) => (
                <div key={q.area} className="rounded-2xl border bg-gray-950/70 p-5" style={{ borderColor: `${q.color}44` }}>
                  <div className="mb-3 text-sm font-bold" style={{ color: q.color }}>{q.area}</div>
                  <ul className="space-y-2.5">
                    {q.items.map((it) => (
                      <li key={it} className="flex gap-2 text-sm text-gray-300 break-keep">
                        <span className="font-bold" style={{ color: q.color }}>Q.</span>{it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-14"><Takeaway text={service.quote} /></div>
          </div>
        </section>

        {/* 10 Web → App */}
        <section id={native.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...native} />
            <Figure caption="Vercel 웹과 React Native 앱은 ==같은 코어를 공유==한다"><WebToAppSvg /></Figure>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-3xl border border-violet-500/30 bg-violet-500/[0.05] p-6">
                <h3 className="mb-4 font-bold text-violet-300">그대로 가져가는 것</h3>
                <ul className="space-y-3">
                  {native.reuse.map((r) => (
                    <li key={r.what} className="flex gap-3 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                      <span className="break-keep"><span className="font-semibold text-white">{r.what}</span> <span className="text-gray-400">— <H text={r.how} /></span></span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="overflow-hidden rounded-3xl border border-pink-500/30">
                <div className="grid grid-cols-[1fr_auto_1fr] bg-white/[0.03] px-5 py-3 text-xs font-bold tracking-widest">
                  <span className="text-gray-400">웹 (Next.js)</span><span />
                  <span className="flex items-center justify-end gap-1.5 text-pink-300"><Smartphone className="h-3.5 w-3.5" />앱 (React Native)</span>
                </div>
                {native.swap.map((r) => (
                  <div key={r.web} className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-t border-white/5 px-5 py-3 text-sm">
                    <span className="font-mono text-gray-400 break-keep">{r.web}</span>
                    <ArrowRight className="h-4 w-4 text-pink-400" />
                    <span className="text-right font-mono text-white break-keep">{r.app}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 11 Process */}
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

        {/* 12 Projects */}
        <section id={projects.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader label={projects.label} title={projects.title} />
            <div className="mb-14 grid gap-4 md:grid-cols-3">
              {projects.items.map((p) => (
                <div key={p.title} className="rounded-3xl border bg-gray-950/70 p-7" style={{ borderColor: `${p.color}55` }}>
                  <div className="mb-5"><ProjectArt kind={p.art} color={p.color} /></div>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold text-white">{p.title}</h3>
                    <span className="shrink-0 rounded-full px-3 py-1 text-xs font-bold" style={{ color: p.color, background: `${p.color}1f` }}>{p.level}</span>
                  </div>
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

        {/* 13 Tools */}
        <section id={tools.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader label={tools.label} title={tools.title} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

        {/* 14 Outcome */}
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
