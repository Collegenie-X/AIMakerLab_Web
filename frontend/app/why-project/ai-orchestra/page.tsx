import type { Metadata } from "next"
import { ArrowRight, ArrowUpRight, Bot, Check, ChevronDown, Hand, NotebookPen, Target } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Highlight as H } from "../components/Highlight"
import { CompareLists, CtaBlock, Figure, NumberedCards, PageHero, SectionHeader, Takeaway, WhyProjectTabs } from "../components/blocks"
import { orchestraContent } from "./content"
import { tools } from "./tools"
import { ToolChip, ToolIcon } from "./tool-ui"
import { AutomationFlowSvg, CycleSvg, OrchestraSvg, ProcessMapSvg, RunToAgentSvg, ShortsStoryboardSvg } from "./visuals"
import { CampaignPipelineSvg, FunnelSvg, GlossaryIcon, HookAbTestSvg, SoloVsOrchestraSvg } from "./scenes"
import { AutomationLevels, CampaignWalkthrough, CopyButton, ProcessExplorer } from "./interactive"

export const metadata: Metadata = {
  title: "AI 오케스트라 | 왜 프로젝트인가",
  description: "지휘자는 사람, 연주자는 AI — 7단계 서비스 프로세스로 기획부터 출시·숏폼 홍보까지 완주하고, 한 번 돌린 프로세스를 AI 에이전트로 자동화하는 방법과 도구별 사용법",
}

const { hero, concept, process, campaign, agent, toolbox, cycle, proof, course, cta } = orchestraContent

export default function AiOrchestraPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-100">
      <Header />
      <main className="flex-1">
        <PageHero {...hero}><OrchestraSvg stages={process.stages} /></PageHero>
        <WhyProjectTabs current="/why-project/ai-orchestra" />

        {/* 01 Concept */}
        <section id={concept.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...concept} />
            <Figure caption="같은 AI라도 ‘통째로 맡기기’와 ‘나눠서 지휘하기’는 결과가 다릅니다.">
              <SoloVsOrchestraSvg />
            </Figure>
            <NumberedCards items={concept.roles} />
            <div className="mb-14 rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="mb-5 text-center text-xs font-bold tracking-widest text-gray-400">오케스트라로 이해하기 — 이 페이지의 용어</div>
              <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {concept.analogy.map((a) => (
                  <div key={a.term} className="rounded-2xl border border-white/5 bg-gray-950/60 p-4">
                    <dt className="mb-1 text-lg font-extrabold" style={{ color: a.color }}>{a.term}</dt>
                    <dd className="text-sm leading-relaxed text-gray-300 break-keep"><H text={a.meaning} /></dd>
                  </div>
                ))}
              </dl>
            </div>
            <CompareLists before={concept.before} after={concept.after} />
          </div>
        </section>

        {/* 02 Process */}
        <section id={process.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...process} />
            <Figure caption="◇ 표시마다 사람이 ‘통과 기준’을 확인합니다. 마지막 개선 단계가 끝나면 다음 버전으로 다시 처음부터.">
              <ProcessMapSvg stages={process.stages} />
            </Figure>
            <p className="mb-5 flex items-center justify-center gap-2 text-center text-sm text-gray-400 break-keep">
              <Target className="h-4 w-4 shrink-0 text-violet-400" /> {process.example}
            </p>
            <ProcessExplorer stages={process.stages} />
          </div>
        </section>

        {/* 03 Campaign */}
        <section id={campaign.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...campaign} />
            <dl className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {campaign.brief.map((b) => (
                <div key={b.k} className="rounded-2xl border border-amber-500/25 bg-amber-500/[0.04] p-4">
                  <dt className="text-[11px] font-bold tracking-widest text-amber-300">{b.k}</dt>
                  <dd className="mt-1 text-sm font-semibold text-gray-100 break-keep">{b.v}</dd>
                </div>
              ))}
            </dl>
            <Figure caption="Claude가 쓴 4컷 스토리보드를 Freepik · Higgsfield · Kling으로 장면화하고, CapCut에서 20초로 묶습니다.">
              <ShortsStoryboardSvg cuts={campaign.storyboard} />
            </Figure>
            <div className="mb-14 overflow-x-auto rounded-3xl border border-white/10">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-white/[0.04] text-xs text-gray-400">
                  <tr>
                    <th className="px-4 py-3 font-semibold">시간</th>
                    <th className="px-4 py-3 font-semibold">화면</th>
                    <th className="px-4 py-3 font-semibold">자막</th>
                    <th className="px-4 py-3 font-semibold">내레이션</th>
                  </tr>
                </thead>
                <tbody>
                  {campaign.storyboard.map((c) => (
                    <tr key={c.t} className="border-t border-white/5">
                      <td className="whitespace-nowrap px-4 py-3 font-bold" style={{ color: c.color }}>{c.t} · {c.label}</td>
                      <td className="px-4 py-3 text-gray-300 break-keep">{c.visual}</td>
                      <td className="px-4 py-3 font-semibold text-white break-keep">{c.caption}</td>
                      <td className="px-4 py-3 text-gray-400 break-keep">{c.voice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="mb-5 text-center text-xl font-bold text-white">도구에서 도구로 — 제작 릴레이</h3>
            <Figure>
              <CampaignPipelineSvg />
            </Figure>

            <h3 className="mb-5 text-center text-xl font-bold text-white">9단계 따라 하기 — 단계를 눌러 보세요</h3>
            <div className="mb-14">
              <CampaignWalkthrough steps={campaign.steps} />
            </div>

            <h3 className="mb-5 text-center text-xl font-bold text-white">훅은 감이 아니라 숫자로 고릅니다</h3>
            <Figure>
              <HookAbTestSvg />
            </Figure>

            <h3 className="mb-5 text-center text-xl font-bold text-white">올린 뒤에는 이 4가지 숫자를 봅니다</h3>
            <Figure caption="왼쪽에서 오른쪽으로 갈수록 사람이 줄어듭니다. 어디서 가장 많이 빠지는지가 다음에 고칠 곳입니다.">
              <FunnelSvg />
            </Figure>
            <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {campaign.metrics.map((m) => (
                <div key={m.name} className="rounded-2xl border bg-gray-950/70 p-5" style={{ borderColor: `${m.color}55` }}>
                  <div className="mb-1 font-bold text-white">{m.name}</div>
                  <p className="mb-3 text-xs leading-relaxed text-gray-400 break-keep"><H text={m.desc} /></p>
                  <div className="text-xs text-gray-500">예시 목표 <span className="text-base font-extrabold" style={{ color: m.color }}>{m.target}</span></div>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500 break-keep"><H text={campaign.metricsNote} /></p>
          </div>
        </section>

        {/* 04 Agent */}
        <section id={agent.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...agent} />

            <div className="mb-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {agent.glossary.map((g, i) => (
                <div key={g.term} className="rounded-2xl border bg-gray-950/70 p-5" style={{ borderColor: `${g.color}55` }}>
                  <GlossaryIcon index={i} color={g.color} />
                  <div className="mb-2 flex items-baseline gap-2">
                    <span className="text-lg font-extrabold" style={{ color: g.color }}>{g.term}</span>
                    <span className="text-xs text-gray-500">{g.en}</span>
                  </div>
                  <p className="mb-3 text-sm leading-relaxed text-gray-300 break-keep"><H text={g.desc} /></p>
                  <span className="inline-block rounded-md bg-white/5 px-2 py-1 text-[11px] text-gray-400">비유: {g.example}</span>
                </div>
              ))}
            </div>

            <Figure>
              <RunToAgentSvg steps={agent.evolution} />
            </Figure>
            <ol className="mb-14 grid gap-3 md:grid-cols-4">
              {agent.evolution.map((e) => (
                <li key={e.no} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <div className="mb-1 text-xs font-bold" style={{ color: e.color }}>STEP {e.no} · {e.sub}</div>
                  <div className="mb-2 font-bold text-white">{e.title}</div>
                  <p className="text-sm leading-relaxed text-gray-400 break-keep"><H text={e.desc} /></p>
                </li>
              ))}
            </ol>

            <div className="mb-14 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
              <div className="rounded-3xl border border-violet-500/30 bg-violet-500/[0.05] p-6 md:p-7">
                <div className="mb-1 flex items-center gap-2 text-xs font-bold tracking-widest text-violet-300">
                  <NotebookPen className="h-4 w-4" /> 첫 완주 때 반드시 기록할 5가지
                </div>
                <p className="mb-5 text-sm text-gray-400 break-keep"><H text="이 기록이 없으면 에이전트를 만들 수 없습니다. 잘 된 결과보다 ==왜 골랐는지==가 더 중요합니다." /></p>
                <ol className="space-y-3">
                  {agent.record.map((r, i) => (
                    <li key={r.title} className="flex gap-3">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-violet-400 text-xs font-bold text-gray-950">{i + 1}</span>
                      <div>
                        <div className="text-sm font-bold text-white">{r.title}</div>
                        <div className="text-sm text-gray-400 break-keep"><H text={r.desc} /></div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/50">
                <div className="flex items-center justify-between gap-2 border-b border-white/10 px-5 py-3">
                  <div className="flex min-w-0 items-center gap-2 text-xs text-gray-400">
                    <ToolIcon glyph="terminal" color={tools.claudeCode.color} size={14} />
                    <span className="truncate">{agent.skill.file}</span>
                  </div>
                  <CopyButton text={agent.skill.code} />
                </div>
                <pre className="max-h-[460px] overflow-auto p-5 text-[12.5px] leading-relaxed text-gray-200"><code>{agent.skill.code}</code></pre>
                <div className="border-t border-white/10 px-5 py-3 text-xs text-gray-400 break-keep">
                  기록을 이 형식으로 옮기면 <span className="font-semibold text-white">Claude Code 스킬</span>이 됩니다. 이후 터미널에서 “이번 주 숏츠 만들어”라고만 하면 위 단계를 에이전트가 수행합니다.
                </div>
              </div>
            </div>

            <h3 className="mb-5 text-center text-xl font-bold text-white">자동화 레벨 — 한 단계씩 올립니다</h3>
            <div className="mb-3">
              <AutomationLevels levels={agent.levels} />
            </div>
            <p className="mb-14 text-center text-sm text-gray-500 break-keep"><H text={agent.levelsNote} /></p>

            <h3 className="mb-5 text-center text-xl font-bold text-white">L3 자동화 파이프라인 예시</h3>
            <Figure>
              <AutomationFlowSvg flow={agent.flow} />
            </Figure>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-amber-500/30 bg-amber-500/[0.04] p-6">
                <div className="mb-4 flex items-center gap-2 font-bold text-amber-300"><Bot className="h-5 w-5" /> 에이전트에게 맡길 일</div>
                <ul className="space-y-2.5">
                  {agent.automate.map((a) => (
                    <li key={a} className="flex items-start gap-2 text-sm text-gray-200 break-keep"><Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" /><span><H text={a} /></span></li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-violet-500/40 bg-violet-500/[0.07] p-6">
                <div className="mb-4 flex items-center gap-2 font-bold text-violet-300"><Hand className="h-5 w-5" /> 끝까지 사람이 할 일</div>
                <ul className="space-y-2.5">
                  {agent.keepHuman.map((a) => (
                    <li key={a} className="flex items-start gap-2 text-sm text-gray-200 break-keep"><Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" /><span><H text={a} /></span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 05 Toolbox */}
        <section id={toolbox.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...toolbox} />
            <div className="space-y-10">
              {toolbox.groups.map((g) => (
                <div key={g.title}>
                  <h3 className="mb-4 text-sm font-bold tracking-widest text-gray-400">{g.title}</h3>
                  <div className="grid items-start gap-3 md:grid-cols-2">
                    {g.ids.map((id) => {
                      const t = tools[id]
                      return (
                        <details key={id} className="group rounded-2xl border border-white/10 bg-gray-950/70 open:border-white/25">
                          <summary className="flex cursor-pointer list-none items-start gap-4 p-5 [&::-webkit-details-marker]:hidden">
                            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border" style={{ borderColor: `${t.color}55`, background: `${t.color}14` }}>
                              <ToolIcon glyph={t.glyph} color={t.color} size={22} />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="flex flex-wrap items-center gap-2">
                                <span className="font-bold text-white">{t.name}</span>
                                <span className="text-xs text-gray-500">{t.company}</span>
                                <span className="rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] text-gray-400">{t.category}</span>
                              </span>
                              <span className="mt-1 block text-sm text-gray-400 break-keep">{t.desc}</span>
                              <span className="mt-2 inline-block rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-300">{t.start}</span>
                            </span>
                            <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" />
                          </summary>
                          <div className="border-t border-white/5 px-5 pb-5 pt-4">
                            <div className="mb-2 text-[11px] font-bold tracking-widest" style={{ color: t.color }}>처음 쓰는 순서</div>
                            <ol className="mb-4 space-y-1.5">
                              {t.howTo.map((h, i) => (
                                <li key={h} className="flex gap-2 text-sm text-gray-200 break-keep">
                                  <span className="w-4 shrink-0 font-bold text-gray-500">{i + 1}.</span><span><H text={h} /></span>
                                </li>
                              ))}
                            </ol>
                            <div className="mb-4 rounded-xl border border-white/10 bg-black/40 p-3">
                              <div className="mb-1.5 flex items-center justify-between gap-2">
                                <span className="text-[11px] font-bold tracking-widest text-gray-400">첫 실습 — 그대로 넣어 보기</span>
                                <CopyButton text={t.tryIt} />
                              </div>
                              <p className="text-sm leading-relaxed text-gray-300 break-keep">{t.tryIt}</p>
                            </div>
                            <a href={t.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white underline-offset-4 hover:underline">
                              {t.name} 공식 홈페이지 <ArrowUpRight className="h-4 w-4" />
                            </a>
                          </div>
                        </details>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-xs text-gray-500 break-keep">{toolbox.note}</p>
          </div>
        </section>

        {/* 06 Cycle */}
        <section id={cycle.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
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

        {/* 07 Proof */}
        <section id={proof.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...proof} />
            <div className="grid gap-4 md:grid-cols-3">
              {proof.services.map((s) => {
                const external = s.href.startsWith("http")
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group rounded-3xl border bg-gray-950/70 p-7 transition hover:-translate-y-1"
                    style={{ borderColor: `${s.color}55` }}
                  >
                    <div className="mb-4 h-1.5 w-12 rounded-full" style={{ background: s.color }} />
                    <h3 className="mb-3 text-lg font-bold text-white">{s.name}</h3>
                    <p className="mb-5 text-sm leading-relaxed text-gray-400 break-keep"><H text={s.desc} /></p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: s.color }}>
                      {external ? "서비스 바로가기" : "홈으로"} {external ? <ArrowUpRight className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                    </span>
                  </a>
                )
              })}
            </div>
          </div>
        </section>

        {/* 08 Course */}
        <section id={course.id} className="scroll-mt-32 border-t border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader label={course.label} title={course.title} />
            <NumberedCards items={course.items} />
            <div className="mb-14 flex flex-wrap justify-center gap-2">
              {(Object.keys(tools) as (keyof typeof tools)[]).map((id) => <ToolChip key={id} id={id} />)}
            </div>
            <Takeaway text={course.quote} />
          </div>
        </section>

        <CtaBlock {...cta} />
      </main>
      <Footer />
    </div>
  )
}
