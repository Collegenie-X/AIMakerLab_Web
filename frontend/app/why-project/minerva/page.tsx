import type { Metadata } from "next"
import { ArrowRight, Bot, Check, ChevronRight, User } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Highlight as H } from "../components/Highlight"
import { CompareLists, CtaBlock, Figure, NumberedCards, PageHero, SectionHeader, Takeaway, WhyProjectTabs } from "../components/blocks"
import { minervaContent } from "./content"
import { CaseExplorer, CityExplorer } from "./interactive"
import { CityRouteSvg, LensHexSvg, SeminarSvg } from "./visuals"

export const metadata: Metadata = {
  title: "미네르바 스쿨 | 왜 프로젝트인가",
  description:
    "읽고 와서 토론하는 세미나, 6개 렌즈로 해부하는 실제 기업 문제, 세계 도시 기업과 연계한 학년별 프로젝트 — 테크 기업과 AI 시대가 미네르바 졸업생을 주목하는 이유",
}

const { hero, diff, seminar, lenses, cases, years, cities, hiring, ai, admission, outcome, link, source, cta } = minervaContent

export default function MinervaPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-100">
      <Header />
      <main className="flex-1">
        <PageHero {...hero} />
        <WhyProjectTabs current="/why-project/minerva" />

        {/* 01 Diff */}
        <section id={diff.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...diff} />
            <CompareLists before={diff.before} after={diff.after} />
          </div>
        </section>

        {/* 02 Seminar — 읽고 와서 토론 */}
        <section id={seminar.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...seminar} />
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

        {/* 03 Six lenses */}
        <section id={lenses.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...lenses} />
            <Figure caption="Cornerstone 4과목 + 윤리 + 맥락 = 프로젝트를 통과시키는 여섯 관문"><LensHexSvg items={lenses.items} /></Figure>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {lenses.items.map((l) => (
                <div key={l.key} className="flex flex-col rounded-2xl border bg-gray-950/60 p-6" style={{ borderColor: `${l.color}55` }}>
                  <div className="mb-1 flex items-baseline gap-2">
                    <span className="text-sm font-bold" style={{ color: l.color }}>{l.no}</span>
                    <h3 className="text-xl font-bold" style={{ color: l.color }}>{l.title}</h3>
                    <span className="text-xs text-gray-500">{l.en}</span>
                  </div>
                  <p className="mb-4 mt-2 font-semibold leading-relaxed text-white break-keep">“{l.question}”</p>
                  <dl className="mt-auto space-y-2 text-xs leading-relaxed">
                    <div className="flex gap-2"><dt className="w-14 shrink-0 text-gray-500">인문학 뿌리</dt><dd className="text-gray-300 break-keep">{l.roots}</dd></div>
                    <div className="flex gap-2"><dt className="w-14 shrink-0 text-gray-500">실전 도구</dt><dd className="text-gray-300 break-keep">{l.tools}</dd></div>
                    <div className="flex gap-2"><dt className="w-14 shrink-0 text-gray-500">막는 함정</dt><dd className="text-rose-300/80 break-keep">{l.trap}</dd></div>
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 04 Real company cases */}
        <section id={cases.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...cases} />
            <CaseExplorer cases={cases.items} lenses={lenses.items} />
            <Takeaway text={cases.note} />
          </div>
        </section>

        {/* 05 Years */}
        <section id={years.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...years} />
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
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: y.color }} />{l}
                      </li>
                    ))}
                  </ul>
                  <div className="mb-1 text-[11px] font-bold tracking-widest text-gray-500">프로젝트</div>
                  <p className="mb-4 text-sm leading-relaxed text-gray-400 break-keep"><H text={y.project} /></p>
                  <div className="mt-auto rounded-xl bg-white/[0.04] px-3 py-2 text-xs text-gray-300 break-keep">
                    <span className="text-gray-500">산출물 · </span>{y.output}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 06 Cities × companies */}
        <section id={cities.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...cities} />
            <Figure caption="Class of 2029부터 적용되는 도시 로테이션"><CityRouteSvg /></Figure>
            <CityExplorer cities={cities.list} />
            <p className="mt-6 text-center text-xs text-gray-500 break-keep">{cities.note}</p>
          </div>
        </section>

        {/* 07 Why tech companies hire */}
        <section id={hiring.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...hiring} />
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

        {/* 08 AI era */}
        <section id={ai.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
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
            <div className="mb-14 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
                <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-gray-400"><Bot className="h-5 w-5" />{ai.compare.ai.title}</h3>
                <ul className="space-y-3">
                  {ai.compare.ai.items.map((it) => (
                    <li key={it} className="flex items-center gap-3 text-gray-400"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gray-500" />{it}</li>
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

        {/* 09 Admission */}
        <section id={admission.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...admission} />
            <div className="mb-14 flex flex-col gap-3 md:flex-row md:items-center">
              {admission.steps.map((s, i) => (
                <div key={s.title} className="flex flex-1 items-center gap-3">
                  <div className="flex-1 rounded-2xl border border-violet-500/30 bg-violet-500/[0.05] p-5 text-center">
                    <div className="mb-1 text-xs font-bold text-violet-400">STEP {i + 1}</div>
                    <div className="mb-1 font-bold text-white break-keep">{s.title}</div>
                    <p className="text-xs text-gray-400 break-keep">{s.desc}</p>
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

        {/* 10 Outcome */}
        <section id={outcome.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader label={outcome.label} title={outcome.title} />
            <div className="mb-8 grid gap-4 md:grid-cols-3">
              {outcome.items.map((o) => (
                <div key={o.label} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center">
                  <div className="text-4xl font-extrabold text-white">{o.value}</div>
                  <div className="mt-2 text-sm text-gray-400 break-keep">{o.label}</div>
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
                  <p className="text-sm leading-relaxed text-gray-300 break-keep">{k.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 11 Link */}
        <section id={link.id} className="scroll-mt-32 py-24">
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
