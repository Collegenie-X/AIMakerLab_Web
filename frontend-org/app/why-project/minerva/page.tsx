import type { Metadata } from "next"
import { ArrowRight, Bot, Check, ChevronRight, User } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Highlight as H } from "../components/Highlight"
import { CompareLists, CtaBlock, Figure, NumberedCards, PageHero, SectionHeader, Takeaway, WhyProjectTabs } from "../components/blocks"
import { minervaContent } from "./content"
import { CaseExplorer, CityExplorer, LensExplorer } from "./interactive"
import { CampusVsWorldSvg, CityPanoramaSvg, LensIcon, ProjectCycleSvg } from "./scenes"
import { FlippedFlowSvg, IcebergSvg, LensHexSvg, ProblemFunnelSvg, SeminarSvg, ValueCrossSvg, YearStairSvg } from "./visuals"

export const metadata: Metadata = {
  title: "미네르바 스쿨 | 왜 프로젝트인가",
  description:
    "읽고 와서 토론하는 세미나, 6개 렌즈로 해부하는 실제 기업 문제, 세계 도시 기업과 연계한 학년별 프로젝트 — 테크 기업과 AI 시대가 미네르바 졸업생을 주목하는 이유",
}

const { hero, diff, seminar, lenses, lensDetails, project, cases, years, cities, hiring, ai, admission, outcome, link, source, cta } = minervaContent

export default function MinervaPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-100">
      <Header />
      <main className="flex-1">
        <PageHero {...hero}>
          <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none]">
            <CityPanoramaSvg cities={cities.list} />
          </div>
          <p className="mt-2 text-xs text-gray-500 md:hidden">← 옆으로 밀어 7개 도시 보기 →</p>
        </PageHero>
        <WhyProjectTabs current="/why-project/minerva" />

        {/* 01 Diff */}
        <section id={diff.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...diff} />
            <Figure caption="한 건물에서 보내는 4년 vs 네 대륙 7개 도시에서 살아 보는 4년"><CampusVsWorldSvg cities={cities.list} /></Figure>
            <CompareLists before={diff.before} after={diff.after} />
          </div>
        </section>

        {/* 02 Cities — 캠퍼스 대신 7개 도시 */}
        <section id={cities.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...cities} />
            <CityExplorer cities={cities.list} />
            <p className="mt-6 text-center text-xs text-gray-500 break-keep">{cities.note}</p>
          </div>
        </section>

        {/* 03 Seminar — 읽고 와서 토론 */}
        <section id={seminar.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...seminar} />
            <Figure caption="같은 90분 — 듣는 시간이 아니라 꺼내 쓰는 시간"><FlippedFlowSvg /></Figure>
            <div className="mb-14 grid gap-4 md:grid-cols-3">
              {seminar.flow.map((f, i) => (
                <div key={f.phase} className="relative rounded-2xl border bg-gray-950/70 p-6" style={{ borderColor: `${f.color}55` }}>
                  <div className="mb-1 text-xs font-bold tracking-widest" style={{ color: f.color }}>STEP {i + 1} · {f.phase}</div>
                  <h3 className="mb-4 text-lg font-bold text-white break-keep">{f.title}</h3>
                  <ul className="space-y-2.5">
                    {f.items.map((it) => (
                      <li key={it} className="flex gap-2 text-sm leading-relaxed text-gray-300 break-keep">
                        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0" style={{ color: f.color }} />
                        <span><H text={it} /></span>
                      </li>
                    ))}
                  </ul>
                  {i < seminar.flow.length - 1 && (
                    <ArrowRight className="absolute -right-3.5 top-1/2 z-[1] hidden h-5 w-5 -translate-y-1/2 text-gray-500 md:block" />
                  )}
                </div>
              ))}
            </div>
            <Figure caption="수업 시간에는 교과서를 다시 설명하지 않습니다 — 읽은 것을 꺼내 부딪힙니다"><SeminarSvg /></Figure>
            <NumberedCards items={seminar.points} />
          </div>
        </section>

        {/* 04 Six lenses */}
        <section id={lenses.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...lenses} />
            <Figure caption="Cornerstone 4과목 + 윤리 + 맥락 = 프로젝트를 통과시키는 여섯 관문"><LensHexSvg items={lenses.items} /></Figure>
            <LensExplorer lenses={lenses.items} details={lensDetails} />
          </div>
        </section>

        {/* 05 Project-based learning */}
        <section id={project.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...project} />
            <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-sky-500/30 bg-sky-500/[0.05] p-5 md:flex-row md:items-center">
              <span className="shrink-0 rounded-full bg-sky-500/20 px-3 py-1 text-xs font-bold text-sky-300">{project.example.city} · {project.example.partner}</span>
              <p className="font-semibold text-white break-keep">파트너의 요청 — {project.example.brief}</p>
            </div>
            <Figure caption="한 바퀴를 돌 때마다 서로 다른 렌즈가 켜집니다 (점 색 = 사용하는 렌즈)">
              <ProjectCycleSvg steps={project.steps} lensColors={Object.fromEntries(lenses.items.map((l) => [l.key, l.color]))} />
            </Figure>
            <ol className="mb-14 space-y-3">
              {project.steps.map((st, i) => (
                <li key={st.title} className="grid gap-4 rounded-2xl border border-white/10 bg-gray-950/60 p-5 md:grid-cols-[200px_1fr_1.4fr] md:items-start">
                  <div>
                    <div className="mb-1 text-xs font-bold text-violet-400">STEP {String(i + 1).padStart(2, "0")} · {st.en}</div>
                    <div className="mb-2 text-lg font-bold text-white">{st.title}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {st.lenses.map((k) => {
                        const l = lenses.items.find((x) => x.key === k)!
                        return (
                          <span key={k} className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold" style={{ background: `${l.color}1f`, color: l.color }}>
                            <LensIcon kind={k} color={l.color} size={14} />{l.title}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-300 break-keep"><H text={st.what} /></p>
                  <div className="rounded-xl border-l-2 border-sky-400/60 bg-sky-500/[0.05] px-4 py-3 text-sm leading-relaxed text-gray-200 break-keep">
                    <span className="mr-1 text-xs font-bold text-sky-300">도쿄 예시</span><H text={st.example} />
                  </div>
                </li>
              ))}
            </ol>
            <Takeaway text={project.quote} />
          </div>
        </section>

        {/* 06 Real company cases */}
        <section id={cases.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...cases} />
            <CaseExplorer cases={cases.items} lenses={lenses.items} />
            <Figure caption="네 케이스 모두 수면 위(기술)는 완벽했습니다 — 문제는 수면 아래에 있었습니다"><IcebergSvg items={lenses.items} /></Figure>
            <Takeaway text={cases.note} />
          </div>
        </section>

        {/* 07 Years */}
        <section id={years.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...years} />
            <Figure caption="학년이 오를수록 문제는 더 낯설고, 더 실제에 가까워집니다"><YearStairSvg items={years.items} /></Figure>
            <div className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {years.items.map((y) => (
                <div key={y.tag} className="flex flex-col rounded-2xl border bg-gray-950/60 p-6" style={{ borderColor: `${y.color}55` }}>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-md px-2 py-0.5 text-xs font-bold" style={{ background: `${y.color}22`, color: y.color }}>{y.tag}</span>
                    <span className="text-xs text-gray-500">{y.city}</span>
                  </div>
                  <h3 className="mb-4 text-lg font-bold text-white break-keep">{y.title}</h3>
                  <div className="mb-1 text-[11px] font-bold tracking-widest text-gray-500">배우는 것</div>
                  <ul className="mb-4 space-y-1.5">
                    {y.learn.map((l) => (
                      <li key={l} className="flex gap-2 text-sm text-gray-300 break-keep">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: y.color }} /><span><H text={l} /></span>
                      </li>
                    ))}
                  </ul>
                  <div className="mb-1 text-[11px] font-bold tracking-widest text-gray-500">프로젝트</div>
                  <p className="mb-4 text-sm leading-relaxed text-gray-400 break-keep"><H text={y.project} /></p>
                  <div className="mt-auto rounded-xl bg-white/[0.04] px-3 py-2 text-xs text-gray-300 break-keep">
                    <span className="text-gray-500">산출물 · </span><H text={y.output} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 08 Why tech companies hire */}
        <section id={hiring.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...hiring} />
            <Figure caption="AI가 풀이를 맡을수록, ‘문제를 정의하는 사람’이 귀해집니다"><ProblemFunnelSvg /></Figure>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {hiring.items.map((h, i) => (
                <div key={h.title} className="rounded-2xl border bg-gray-950/60 p-6 transition hover:-translate-y-1" style={{ borderColor: `${h.color}55` }}>
                  <div className="mb-3 text-3xl font-extrabold" style={{ color: h.color }}>{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="mb-2 font-bold text-white break-keep">{h.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-400 break-keep"><H text={h.desc} /></p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 09 AI era */}
        <section id={ai.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...ai} />
            <div className="mb-12 flex flex-col items-stretch gap-2 md:flex-row md:items-center">
              {ai.chain.map((step, i) => (
                <div key={step} className="flex flex-1 items-center gap-2">
                  <div
                    className={`flex-1 rounded-xl border px-3 py-3 text-center text-sm font-semibold break-keep ${
                      i === ai.chain.length - 1
                        ? "border-fuchsia-400/60 bg-fuchsia-500/15 text-white"
                        : "border-white/10 bg-white/[0.03] text-gray-300"
                    }`}
                  >
                    {step}
                  </div>
                  {i < ai.chain.length - 1 && <ArrowRight className="hidden h-4 w-4 shrink-0 text-fuchsia-400 md:block" />}
                </div>
              ))}
            </div>
            <Figure caption="AI가 등장한 뒤, 두 가치의 방향이 엇갈렸습니다"><ValueCrossSvg /></Figure>
            <div className="mb-14 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
                <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-gray-400"><Bot className="h-5 w-5" />{ai.compare.ai.title}</h3>
                <ul className="space-y-3">
                  {ai.compare.ai.items.map((it) => (
                    <li key={it} className="flex items-center gap-3 text-gray-400"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gray-500" /><span><H text={it} /></span></li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-fuchsia-500/40 bg-fuchsia-500/[0.06] p-8">
                <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-fuchsia-300 break-keep"><User className="h-5 w-5 shrink-0" />{ai.compare.human.title}</h3>
                <ul className="space-y-3">
                  {ai.compare.human.items.map((it) => (
                    <li key={it} className="flex items-center gap-3 text-gray-200"><Check className="h-4 w-4 shrink-0 text-fuchsia-400" /><span><H text={it} /></span></li>
                  ))}
                </ul>
              </div>
            </div>
            <NumberedCards items={ai.points} color="#e879f9" />
          </div>
        </section>

        {/* 10 Admission */}
        <section id={admission.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...admission} />
            <div className="mb-14 flex flex-col gap-3 md:flex-row md:items-center">
              {admission.steps.map((s, i) => (
                <div key={s.title} className="flex flex-1 items-center gap-3">
                  <div className="flex-1 rounded-2xl border border-violet-500/30 bg-violet-500/[0.05] p-5 text-center">
                    <div className="mb-1 text-xs font-bold text-violet-400">STEP {i + 1}</div>
                    <div className="mb-1 font-bold text-white break-keep">{s.title}</div>
                    <p className="text-xs text-gray-400 break-keep"><H text={s.desc} /></p>
                  </div>
                  {i < admission.steps.length - 1 && <ArrowRight className="hidden h-5 w-5 shrink-0 text-violet-400 md:block" />}
                </div>
              ))}
            </div>
            <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/[0.05] p-8">
              <h3 className="mb-5 text-lg font-bold text-emerald-300">{admission.prep.title}</h3>
              <ul className="grid gap-3 md:grid-cols-2">
                {admission.prep.items.map((it) => (
                  <li key={it} className="flex gap-3 text-sm text-gray-200 break-keep">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /><span><H text={it} /></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 11 Outcome */}
        <section id={outcome.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader label={outcome.label} title={outcome.title} />
            <div className="mb-8 grid gap-4 md:grid-cols-3">
              {outcome.items.map((o) => (
                <div key={o.label} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center">
                  <div className="text-4xl font-extrabold text-white">{o.value}</div>
                  <div className="mt-2 text-sm text-gray-400 break-keep"><H text={o.label} /></div>
                </div>
              ))}
            </div>
            <div className="mb-16 flex flex-wrap justify-center gap-2">
              {outcome.careers.map((c) => (
                <span key={c} className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-gray-300">{c}</span>
              ))}
            </div>
            <h3 className="mb-6 text-center text-xl font-bold text-white">{outcome.korea.title}</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {outcome.korea.items.map((k) => (
                <div key={k.name} className="rounded-2xl border border-sky-500/25 bg-sky-500/[0.05] p-6">
                  <div className="mb-2 font-bold text-sky-200">{k.name}</div>
                  <p className="text-sm leading-relaxed text-gray-300 break-keep"><H text={k.desc} /></p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 12 Link */}
        <section id={link.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...link} />
            <div className="mb-14 grid gap-3 md:grid-cols-4">
              {link.mapping.map((m) => (
                <div key={m.mv} className="rounded-2xl border bg-gray-950/70 p-5 text-center" style={{ borderColor: `${m.color}66` }}>
                  <div className="mb-3 font-bold break-keep" style={{ color: m.color }}>{m.mv}</div>
                  <svg viewBox="0 0 20 24" className="mx-auto mb-3 h-5 w-4" aria-hidden="true">
                    <path d="M10 0 V20 M3 13 l7 8 7 -8" fill="none" stroke={m.color} strokeWidth="2.5" />
                  </svg>
                  <div className="text-sm font-bold text-white break-keep">{m.ours}</div>
                </div>
              ))}
            </div>
            <Takeaway text={link.quote} />
            <p className="mt-12 text-center text-xs text-gray-600 break-keep">{source}</p>
          </div>
        </section>

        <CtaBlock {...cta} />
      </main>
      <Footer />
    </div>
  )
}
