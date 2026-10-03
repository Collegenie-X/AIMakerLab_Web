import type { Metadata } from "next"
import { ArrowRight, Check } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Highlight as H } from "../components/Highlight"
import { CompareLists, CtaBlock, Figure, NumberedCards, PageHero, SectionHeader, Takeaway, WhyProjectTabs } from "../components/blocks"
import { minervaContent } from "./content"
import { CityRouteSvg, CompetencySvg, SeminarSvg } from "./visuals"

export const metadata: Metadata = {
  title: "미네르바 스쿨 | 왜 프로젝트인가",
  description: "강의 없는 토론 세미나, 세계 도시 기반 프로젝트, 점수 대신 성취로 뽑는 입학 — 미네르바 대학교가 보여주는 프로젝트 교육",
}

const { hero, diff, seminar, competency, cities, years, admission, outcome, link, source, cta } = minervaContent

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

        {/* 02 Seminar */}
        <section id={seminar.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...seminar} />
            <Figure><SeminarSvg /></Figure>
            <NumberedCards items={seminar.points} />
          </div>
        </section>

        {/* 03 Competency */}
        <section id={competency.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...competency} />
            <Figure caption="1학년 Cornerstone — 생각하는 방법을 배우는 네 과목"><CompetencySvg items={competency.items} /></Figure>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {competency.items.map((c) => (
                <div key={c.title} className="rounded-2xl border bg-gray-950/60 p-6" style={{ borderColor: `${c.color}55` }}>
                  <h3 className="font-bold" style={{ color: c.color }}>{c.title}</h3>
                  <div className="mb-3 text-xs text-gray-500">{c.en}</div>
                  <p className="text-sm leading-relaxed text-gray-400 break-keep">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 04 Cities */}
        <section id={cities.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...cities} />
            <Figure caption="Class of 2029부터 적용되는 도시 로테이션"><CityRouteSvg /></Figure>
            <div className="flex flex-wrap justify-center gap-2">
              {cities.list.map((c) => (
                <span key={c.city} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-200">
                  {c.city} <span className="ml-1 text-xs text-gray-500">{c.year}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 05 Years */}
        <section id={years.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader label={years.label} title={years.title} />
            <NumberedCards items={years.items} cols={4} />
          </div>
        </section>

        {/* 06 Admission */}
        <section id={admission.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
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

        {/* 07 Outcome */}
        <section id={outcome.id} className="scroll-mt-32 py-24">
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

        {/* 08 Link */}
        <section id={link.id} className="scroll-mt-32 border-t border-white/5 bg-white/[0.015] py-24">
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
