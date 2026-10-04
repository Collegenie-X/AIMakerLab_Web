import type { Metadata } from "next"
import { ArrowRight, Check, CircleAlert, Smartphone } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Highlight as H } from "../components/Highlight"
import { CompareLists, CtaBlock, Figure, NumberedCards, PageHero, SectionHeader, Takeaway, WhyProjectTabs } from "../components/blocks"
import { vibeContent } from "./content"
import { HundredAsksSvg, ServerlessArchSvg } from "./workflow-visuals"
import { AdminMockSvg, DevtoolsSvg, PipelineSvg, StudioMockSvg, VercelDeploySvg, WebAppMockSvg } from "./mockups"
import { CodeWindow } from "./code-window"
import { DjangoSteps, FavoriteDemo } from "./interactive"
import { BoatVsShipSvg, DemoDaySvg, HeroSceneSvg, JourneyMapSvg, RaceSvg, ShiftSceneSvg } from "./scenes"
import { Glyph, GrowthArt, PrincipleArt } from "./glyphs"
import { IcebergSvg, LearningPathSvg, OneModelSvg, ProjectArt, RolesCycleSvg } from "./illustrations"

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
        <PageHero {...hero}><HeroSceneSvg /></PageHero>
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
            <Figure caption="같은 책상, 다른 결과 — ==외운 것==이 아니라 ==만든 것==이 남는다"><ShiftSceneSvg /></Figure>
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
            <Figure caption="MVP까지의 레이스 — 같은 네 구간을 ==7시간== 대 ==35분==에 달린다 (AI Maker Lab 수업 기준)"><RaceSvg tasks={speed.tasks} /></Figure>
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
              <PipelineSvg phases={workflow.phases} />
            </Figure>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {workflow.principles.map((p, i) => (
                <div key={p.title} className="rounded-3xl border bg-gray-950/60 p-4 transition hover:-translate-y-1" style={{ borderColor: `${p.color}55` }}>
                  <PrincipleArt i={i} color={p.color} />
                  <h3 className="mb-2 mt-4 px-2 text-lg font-bold text-white break-keep">{p.title}</h3>
                  <p className="px-2 pb-2 text-sm leading-relaxed text-gray-400 break-keep"><H text={p.desc} /></p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 06 Front-first */}
        <section id={frontFirst.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...frontFirst} />
            <Figure caption="AI 스튜디오 — ==말 한 줄==이 코드가 되고, 옆에서 바로 화면으로 확인한다"><StudioMockSvg /></Figure>
            <div className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {frontFirst.studios.map((t) => (
                <div key={t.name} className="rounded-2xl border bg-gray-950/70 p-5" style={{ borderColor: `${t.color}44` }}>
                  <div className="mb-3 flex items-center gap-3">
                    <Glyph kind={t.icon} color={t.color} />
                    <div className="font-bold" style={{ color: t.color }}>{t.name}</div>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-400 break-keep"><H text={t.desc} /></p>
                </div>
              ))}
            </div>
            <div className="[&>figure]:mb-0"><Figure caption="배포 대시보드 — 브랜치마다 ==프리뷰 URL==이 생기고, 화면 위에 바로 피드백이 달린다"><VercelDeploySvg /></Figure></div>
          </div>
        </section>

        {/* 07 Serverless */}
        <section id={serverless.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...serverless} />
            <Figure caption="개발자 도구로 본 실제 모습 — 하트를 누르면 ==Local Storage에 저장==되고, 서버 요청은 0건"><DevtoolsSvg /></Figure>
            <div className="mb-10 grid gap-3 md:grid-cols-3">
              {serverless.layers.map((l) => (
                <div key={l.name} className="rounded-2xl border bg-gray-950/70 p-5" style={{ borderColor: `${l.color}55` }}>
                  <div className="flex items-center gap-4">
                    <Glyph kind={l.icon} color={l.color} size={52} />
                    <div>
                      <div className="font-mono text-sm font-bold" style={{ color: l.color }}>{l.name}</div>
                      <div className="mt-1 text-gray-200"><H text={l.role} /></div>
                      <div className="mt-1 text-sm text-gray-500">{l.examples}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mb-10 grid items-start gap-4 lg:grid-cols-[1fr_1.6fr]">
              <CodeWindow file="data/courses.json" code={serverless.code.json} accent="#fbbf24" />
              <CodeWindow file="lib/repo.ts" code={serverless.code.repo} accent="#a78bfa" />
            </div>
            <Figure caption="모든 데이터 호출을 repo.ts로 모으면, 나중에 Django로 바꿀 때 ==스위치 하나만== 바꾼다"><ServerlessArchSvg /></Figure>
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
            <Figure caption="admin.py ==10줄==이 관리자 화면의 어느 부분이 되는지 — 번호와 색으로 짝지어 보세요"><AdminMockSvg /></Figure>
            <DjangoSteps steps={backend.steps} />
            <Figure caption="==모델 하나==를 정의하면 관리자 화면 · API · DB가 함께 생긴다"><OneModelSvg /></Figure>
            <div className="grid gap-3 md:grid-cols-3">
              {backend.why.map((w) => (
                <div key={w.title} className="rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.04] p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <Glyph kind={w.icon} color="#34d399" />
                    <div className="font-bold text-emerald-300 break-keep">{w.title}</div>
                  </div>
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
            <Figure caption="데모는 ==나만 타 본 종이배==, 서비스는 ==낯선 사람을 태우는 배== — 그 사이에 100번의 질문이 있다"><BoatVsShipSvg /></Figure>
            <Figure caption="돌아가는 화면은 ==빙산의 일각== — 서비스는 수면 아래 90%를 묻고 검증하는 일"><IcebergSvg /></Figure>
            <Figure caption="처음 10번의 질문은 데모를 만들고, ==나머지 90번이 서비스==를 만든다"><HundredAsksSvg milestones={service.milestones} /></Figure>
            <h3 className="mb-6 text-center text-xl font-bold text-white">서비스로 가기 위해 AI에게 반드시 묻는 질문들</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {service.questions.map((q) => (
                <div key={q.area} className="rounded-2xl border bg-gray-950/70 p-5" style={{ borderColor: `${q.color}44` }}>
                  <div className="mb-4 flex items-center gap-3">
                    <Glyph kind={q.icon} color={q.color} />
                    <div className="font-bold" style={{ color: q.color }}>{q.area}</div>
                  </div>
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
            <Figure caption="Vercel 웹과 React Native 앱은 ==같은 코어를 공유==한다"><WebAppMockSvg /></Figure>
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
            <div className="[&>figure]:mb-0"><Figure caption="문제 하나를 들고 출발해 ==런칭 깃발==까지 — 정거장마다 결과물이 남는다"><JourneyMapSvg steps={process.steps} /></Figure></div>
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
              {projects.tracks.map((t, i) => (
                <div key={t.grade} className="rounded-2xl border border-white/10 bg-gray-950/60 p-5 text-center">
                  <GrowthArt level={i} />
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
                  <div className="mb-4 flex items-center gap-3">
                    <Glyph kind={g.icon} color={g.color} />
                    <h3 className="font-bold" style={{ color: g.color }}>{g.name}</h3>
                  </div>
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
            <Figure caption="데모데이 — 관객이 ==직접 접속해 써 보는== 순간, 과제는 서비스가 된다"><DemoDaySvg /></Figure>
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
