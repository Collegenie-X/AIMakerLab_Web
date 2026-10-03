import Link from "next/link"
import type { Metadata } from "next"
import {
  ArrowRight, Bot, Check, Hammer, MessageCircleQuestion, Network, Quote, Sparkles,
  type LucideIcon,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import content from "./content.json"
import { Highlight as H } from "./components/Highlight"
import { CompareLists, Figure, SectionHeader, WhyProjectTabs } from "./components/blocks"
import {
  ActivitiesFlowSvg, AgentTeamSvg, CareerLadderSvg, JobCreationSvg, CompeteVsCommandSvg, ConnectionGrowthSvg, ExperienceStairsSvg, ExamShiftSvg, FiveLensHubSvg, HeroOrbitSvg,
  IterationDepthSvg, KnowledgeToArgumentSvg, OecdCompassSvg, ProcessLoopSvg,
  ProjectIllustration, QuestionConnectCreateSvg, SetukRecordSvg, SkillShiftSvg,
} from "./components/visuals"

export const metadata: Metadata = {
  title: "왜 프로젝트인가",
  description: "AI 시대 질문하는 능력, OECD 인재상, 글로벌 입시 변화와 세특, 공모전·캠프·봉사, AI 시대 취업까지 — 프로젝트 교육이 필요한 이유",
}

const { hero, aiEra, persistence, global, korea, activities, career, essay, process, outcomes, cta } = content

const icons: Record<string, LucideIcon> = { MessageCircleQuestion, Network, Bot, Hammer }

type ProjectKind = "paper" | "research" | "campaign" | "service" | "product"

const navSections = [aiEra, persistence, global, korea, activities, career, essay, process, outcomes]

export default function WhyProjectPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-100">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/5">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.25),transparent_60%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
          <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-20 text-center md:pt-24">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-violet-300">
              <Sparkles className="h-3.5 w-3.5" /> {hero.eyebrow}
            </span>
            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white md:text-6xl break-keep">
              {hero.title[0]}
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-sky-400 bg-clip-text text-transparent">{hero.title[1]}</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg break-keep"><H text={hero.description} /></p>
            <div className="mb-10"><HeroOrbitSvg /></div>
            <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4">
              {hero.stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
                  <div className="text-2xl font-bold text-white md:text-3xl">{s.value}</div>
                  <div className="mt-1 text-xs text-gray-400 md:text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <WhyProjectTabs current="/why-project" sticky={false} />

        {/* In-page nav */}
        <nav className="sticky top-16 z-[5] border-b border-white/5 bg-gray-950/85 backdrop-blur">
          <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none]">
            {navSections.map((s) => {
              const [num, name] = s.label.split(" · ")
              return (
                <a key={s.id} href={`#${s.id}`} className="shrink-0 rounded-full border border-white/10 px-4 py-1.5 text-sm text-gray-300 transition hover:border-violet-400/50 hover:text-white">
                  <span className="mr-1.5 text-violet-400">{num}</span>{name}
                </a>
              )
            })}
          </div>
        </nav>

        {/* 01 AI era */}
        <section id={aiEra.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...aiEra} />
            <Figure><QuestionConnectCreateSvg /></Figure>
            <CompareLists before={aiEra.before} after={aiEra.after} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {aiEra.pillars.map((p) => {
                const Icon = icons[p.icon]
                return (
                  <div key={p.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:-translate-y-1 hover:border-violet-400/40">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300"><Icon className="h-5 w-5" /></div>
                    <h3 className="mb-2 font-bold text-white">{p.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-400 break-keep"><H text={p.desc} /></p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* 02 Persistence */}
        <section id={persistence.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...persistence} />
            <Figure caption={persistence.chartTitle}><IterationDepthSvg /></Figure>
            <CompareLists before={persistence.shallow} after={persistence.deep} accent="emerald" />

            <h3 className="mb-6 text-center text-xl font-bold text-white">{persistence.trailTitle}</h3>
            <ol className="relative mx-auto mb-16 max-w-3xl space-y-3 border-l border-violet-500/30 pl-8">
              {persistence.trail.map((t, i) => (
                <li key={t.n} className="relative">
                  <span
                    className="absolute -left-[3.15rem] top-2 flex h-9 w-9 items-center justify-center rounded-full border text-[11px] font-bold"
                    style={{
                      borderColor: `rgba(167,139,250,${0.3 + i * 0.12})`,
                      background: `rgba(139,92,246,${0.08 + i * 0.1})`,
                      color: "#ede9fe",
                    }}
                  >
                    #{t.n}
                  </span>
                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-gray-950/70 px-5 py-3" style={{ marginLeft: `${i * 6}px` }}>
                    <span className="shrink-0 rounded-md bg-violet-500/15 px-2 py-0.5 text-[11px] text-violet-300">{t.tag}</span>
                    <span className="text-sm text-gray-200 break-keep">{t.q}</span>
                  </div>
                </li>
              ))}
            </ol>

            <Figure caption={persistence.growthTitle}><ConnectionGrowthSvg /></Figure>
            <blockquote className="mx-auto max-w-3xl text-center text-xl font-bold leading-relaxed text-gray-200 md:text-2xl break-keep">
              “<H text={persistence.quote} />”
            </blockquote>
          </div>
        </section>

        {/* 03 Global */}
        <section id={global.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader label={global.label} title={global.title} />
            <Figure caption={global.shiftTitle}><ExamShiftSvg /></Figure>

            <div className="mb-14 grid items-center gap-8 rounded-3xl border border-sky-500/20 bg-gradient-to-br from-sky-500/[0.07] to-violet-500/[0.05] p-8 md:p-12 lg:grid-cols-2">
              <div>
                <h3 className="mb-4 text-2xl font-bold text-white">{global.oecd.title}</h3>
                <p className="mb-6 leading-relaxed text-gray-300 break-keep"><H text={global.oecd.desc} /></p>
                <div className="grid gap-3">
                  {global.oecd.competencies.map((c, i) => (
                    <div key={c.title} className="flex gap-4 rounded-2xl border border-white/10 bg-gray-950/60 p-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-500/20 font-bold text-sky-300">{i + 1}</div>
                      <div>
                        <div className="font-bold text-white">{c.title} <span className="ml-1 text-xs font-normal text-gray-500">{c.en}</span></div>
                        <div className="mt-1 text-sm text-gray-400"><H text={c.desc} /></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <OecdCompassSvg />
            </div>

            <div className="mb-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {global.countries.map((c) => (
                <div key={c.region} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-sky-400/30 bg-sky-500/10 text-xs font-bold text-sky-300">{c.code}</span>
                    <h3 className="font-bold text-white">{c.region}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-400 break-keep"><H text={c.desc} /></p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10">
              <h3 className="mb-6 text-xl font-bold text-white break-keep">{global.ib.title}</h3>
              <ul className="grid gap-4 md:grid-cols-3">
                {global.ib.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm leading-relaxed text-gray-300 break-keep">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" /><span><H text={p} /></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 04 Korea */}
        <section id={korea.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...korea} />
            <div className="mb-16 grid items-center gap-8 lg:grid-cols-2">
              <SetukRecordSvg />
              <div className="grid gap-4">
                {korea.setuk.map((s) => (
                  <div key={s.title} className="rounded-2xl border border-fuchsia-500/25 bg-fuchsia-500/[0.05] p-6">
                    <h3 className="mb-2 text-lg font-bold text-fuchsia-200">{s.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-300 break-keep"><H text={s.desc} /></p>
                  </div>
                ))}
              </div>
            </div>
            <h3 className="mb-8 text-center text-xl font-bold text-white">대한민국 교육과정도 같은 방향으로</h3>
            <div className="relative grid gap-4 md:grid-cols-4">
              <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent md:block" />
              {korea.reforms.map((r) => (
                <div key={r.title} className="relative">
                  <div className="relative mx-auto mb-4 flex h-12 w-fit min-w-12 items-center justify-center rounded-full border border-violet-500/40 bg-gray-950 px-4 text-sm font-bold text-violet-300">{r.year}</div>
                  <div className="rounded-2xl border border-white/10 bg-gray-950/60 p-5 text-center">
                    <div className="mb-2 font-bold text-white">{r.title}</div>
                    <p className="text-sm leading-relaxed text-gray-400 break-keep"><H text={r.desc} /></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 05 Activities */}
        <section id={activities.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...activities} />
            <Figure><ActivitiesFlowSvg /></Figure>
            <div className="mb-10 grid gap-4 md:grid-cols-3">
              {activities.items.map((a) => (
                <div key={a.title} className="rounded-2xl border bg-white/[0.02] p-6" style={{ borderColor: `${a.color}55` }}>
                  <h3 className="mb-3 text-lg font-bold" style={{ color: a.color }}>{a.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-gray-300 break-keep"><H text={a.desc} /></p>
                  <div className="flex flex-wrap gap-2">
                    {a.examples.map((e) => (
                      <span key={e} className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-400">{e}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mb-6 grid gap-4 md:grid-cols-2">
              {activities.admissions.map((a) => (
                <div key={a.stage} className="rounded-3xl border border-fuchsia-500/30 bg-fuchsia-500/[0.05] p-7">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="rounded-lg bg-fuchsia-500/20 px-3 py-1 text-sm font-bold text-fuchsia-200">{a.stage}</span>
                    <h3 className="font-bold text-white">{a.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-300 break-keep"><H text={a.desc} /></p>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-gray-500 break-keep">{activities.note}</p>
          </div>
        </section>

        {/* 06 Career */}
        <section id={career.id} className="scroll-mt-32 border-t border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...career} />
            <Figure caption={career.skillTitle}><SkillShiftSvg /></Figure>
            <CompareLists before={career.before} after={career.after} />
            <div className="mb-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {career.skills.map((s) => (
                <div key={s.title} className="rounded-2xl border bg-gray-950/60 p-6" style={{ borderColor: `${s.color}55` }}>
                  <h3 className="mb-2 font-bold" style={{ color: s.color }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-400 break-keep"><H text={s.desc} /></p>
                </div>
              ))}
            </div>
            <Figure caption={career.agentTitle}><AgentTeamSvg /></Figure>

            <div className="mx-auto mb-8 max-w-3xl text-center">
              <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl break-keep">{career.senior.title}</h3>
              <p className="leading-relaxed text-gray-400 break-keep"><H text={career.senior.desc} /></p>
            </div>
            <Figure caption={career.senior.caption}><CompeteVsCommandSvg /></Figure>
            <div className="mb-16 grid gap-4 md:grid-cols-3">
              {career.senior.abilities.map((s, i) => (
                <div key={s.title} className="rounded-2xl border bg-gray-950/60 p-6" style={{ borderColor: `${s.color}55` }}>
                  <div className="mb-2 text-sm font-bold" style={{ color: s.color }}>0{i + 1}</div>
                  <h4 className="mb-2 text-lg font-bold text-white">{s.title}</h4>
                  <p className="text-sm leading-relaxed text-gray-400 break-keep"><H text={s.desc} /></p>
                </div>
              ))}
            </div>

            <div className="mx-auto mb-8 max-w-3xl text-center">
              <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl break-keep">{career.advice.title}</h3>
              <p className="leading-relaxed text-gray-400 break-keep"><H text={career.advice.desc} /></p>
            </div>
            <Figure caption={career.advice.caption}><ExperienceStairsSvg /></Figure>
            <CompareLists before={career.advice.dont} after={career.advice.do} accent="emerald" />

            <div className="mx-auto mb-8 mt-16 max-w-3xl text-center">
              <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl break-keep">{career.ladder.title}</h3>
              <p className="leading-relaxed text-gray-400 break-keep"><H text={career.ladder.desc} /></p>
            </div>
            <div className="mb-16 overflow-x-auto">
              <Figure caption={career.ladder.caption}>
                <div className="min-w-[640px]"><CareerLadderSvg levels={career.ladder.levels} /></div>
              </Figure>
            </div>

            <div className="mx-auto mb-8 max-w-3xl text-center">
              <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl break-keep">{career.jobCreation.title}</h3>
              <p className="leading-relaxed text-gray-400 break-keep"><H text={career.jobCreation.desc} /></p>
            </div>
            <Figure caption={career.jobCreation.caption}><JobCreationSvg /></Figure>
            <div className="mb-8 grid gap-4 md:grid-cols-3">
              {career.jobCreation.points.map((pt) => (
                <div key={pt.title} className="rounded-2xl border border-amber-400/30 bg-amber-400/[0.04] p-6">
                  <h4 className="mb-2 font-bold text-amber-200">{pt.title}</h4>
                  <p className="text-sm leading-relaxed text-gray-400 break-keep"><H text={pt.desc} /></p>
                </div>
              ))}
            </div>
            <p className="mx-auto mb-14 max-w-3xl text-center text-xl font-bold leading-relaxed text-gray-200 md:text-2xl break-keep"><H text={career.jobCreation.conclusion} /></p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-rose-500/30 bg-rose-500/[0.05] p-7 text-sm leading-relaxed text-gray-300 break-keep"><H text={career.warning} /></div>
              <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/[0.05] p-7 text-sm leading-relaxed text-gray-300 break-keep"><H text={career.link} /></div>
            </div>
          </div>
        </section>

        {/* 07 Essay */}
        <section id={essay.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...essay} />
            <Figure><KnowledgeToArgumentSvg /></Figure>
            <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {essay.reasons.map((r, i) => (
                <div key={r.title} className="rounded-2xl border border-white/10 bg-gray-950/60 p-6">
                  <div className="mb-3 text-sm font-bold text-violet-400">0{i + 1}</div>
                  <h3 className="mb-2 font-bold text-white">{r.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-400 break-keep"><H text={r.desc} /></p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-500/[0.08] to-transparent p-8 md:p-12">
              <h3 className="mb-4 text-center text-2xl font-bold text-white md:text-3xl break-keep">{essay.whyFiveTitle}</h3>
              <p className="mx-auto mb-10 max-w-3xl text-center leading-relaxed text-gray-300 break-keep"><H text={essay.whyFiveDesc} /></p>
              <div className="grid gap-3 md:grid-cols-5">
                {essay.mapping.map((m, i) => (
                  <div key={m.essay} className="relative rounded-2xl border bg-gray-950/70 p-5 text-center" style={{ borderColor: `${m.color}66` }}>
                    <div className="mb-1 text-xs text-gray-500">논·서술 {i + 1}단계</div>
                    <div className="mb-3 text-2xl font-extrabold" style={{ color: m.color }}>{m.essay}</div>
                    <svg viewBox="0 0 20 24" className="mx-auto mb-3 h-5 w-4" aria-hidden="true">
                      <path d="M10 0 V20 M3 13 l7 8 7 -8" fill="none" stroke={m.color} strokeWidth="2.5" />
                    </svg>
                    <div className="font-bold text-white">{m.project}</div>
                    <div className="mt-1 text-xs text-gray-400">{m.lang}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 08 Process */}
        <section id={process.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...process} />
            <Figure><ProcessLoopSvg steps={process.steps} /></Figure>
            <CompareLists before={process.bad} after={process.good} accent="emerald" />
            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
              {process.steps.map((s, i) => (
                <li key={s.step} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold ${i === 5 ? "bg-emerald-500 text-gray-950" : "bg-violet-500/20 text-violet-300"}`}>{s.step}</div>
                  <div className="mb-1 font-bold text-white">{s.title}</div>
                  <p className="mb-3 text-xs leading-relaxed text-gray-400 break-keep">{s.desc}</p>
                  <span className="inline-block rounded-md bg-white/5 px-2 py-1 text-[11px] text-gray-300">→ {s.output}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 09 Outcomes */}
        <section id={outcomes.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...outcomes} />
            <div className="mb-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {outcomes.projects.map((p) => (
                <div key={p.kind} className="overflow-hidden rounded-2xl border bg-gray-950/70 p-5" style={{ borderColor: `${p.color}40` }}>
                  <ProjectIllustration kind={p.kind as ProjectKind} color={p.color} />
                  <h3 className="mb-2 mt-3 font-bold" style={{ color: p.color }}>{p.title}</h3>
                  <p className="mb-2 text-sm text-gray-200 break-keep">초안: {p.draft}</p>
                  <p className="text-xs text-gray-500 break-keep">{p.parts}</p>
                </div>
              ))}
            </div>
            <Figure caption="예시 — 하나의 탐구 질문이 다섯 가지 결과물로 완성됩니다">
              <FiveLensHubSvg items={outcomes.projects} />
            </Figure>
            <CompareLists before={outcomes.compareBefore} after={outcomes.compareAfter} />
            <div className="relative overflow-hidden rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-transparent p-8 md:p-12">
              <Quote className="absolute right-8 top-8 h-16 w-16 text-violet-500/15" />
              <p className="mb-2 text-sm font-semibold text-violet-300">{outcomes.example.title}</p>
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300">{outcomes.example.subject}</span>
                <span className="font-bold text-white">{outcomes.example.project}</span>
              </div>
              <p className="leading-loose text-gray-300 break-keep"><H text={outcomes.example.text} /></p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 py-24">
          <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-sky-600 p-[1px]">
            <div className="rounded-3xl bg-gray-950 px-6 py-14 text-center md:px-16">
              <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl break-keep">{cta.title}</h2>
              <p className="mx-auto mb-8 max-w-2xl text-gray-400 break-keep"><H text={cta.description} /></p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Link href={cta.primary.href} className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-500 px-6 py-3 font-semibold text-white transition hover:bg-violet-400">
                  {cta.primary.label} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href={cta.secondary.href} className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3 font-semibold text-gray-200 transition hover:bg-white/5">
                  {cta.secondary.label}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
