import type { Metadata } from "next"
import { AlertTriangle, ArrowRight, ChevronDown, MapPin } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Highlight as H } from "../components/Highlight"
import { CompareLists, CtaBlock, Figure, NumberedCards, PageHero, SectionHeader, Takeaway, WhyProjectTabs } from "../components/blocks"
import { ibContent } from "./content"
import {
  IbContinuumSvg, IbHexagonSvg, IbInquiryCycleSvg, IbMindsetShiftSvg, IbPyoseonPathwaySvg,
  IbScoreCompareSvg, IbScoreSvg, IbWritingVolumeSvg, IbYearsCoachingSvg,
} from "./visuals"

export const metadata: Metadata = {
  title: "IB 학교 | 왜 프로젝트인가",
  description: "에세이·탐구 보고서·구술로 평가하는 국제 바칼로레아(IB) — DP 구조, TOK·EE·CAS 코어, 한국 공교육 IB 도입과 입시 영향",
}

const { hero, what, dp, core, assess, korea, pyoseon, admission, link, source, cta } = ibContent

const pyoseonVisuals: Record<string, () => React.ReactElement> = {
  cycle: IbInquiryCycleSvg,
  writing: IbWritingVolumeSvg,
  mindset: IbMindsetShiftSvg,
  years: IbYearsCoachingSvg,
  compare: IbScoreCompareSvg,
  pathway: IbPyoseonPathwaySvg,
}

export default function IbPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-100">
      <Header />
      <main className="flex-1">
        <PageHero {...hero} />
        <WhyProjectTabs current="/why-project/ib" />

        {/* 01 What */}
        <section id={what.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...what} />
            <CompareLists before={what.before} after={what.after} />
            <Figure caption="PYP · MYP · DP — 초등부터 고등까지 이어지는 탐구 벨트"><IbContinuumSvg /></Figure>
            <div className="grid gap-4 md:grid-cols-3">
              {what.programs.map((p) => (
                <div key={p.code} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <div className="mb-3 flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-violet-300">{p.code}</span>
                    <span className="font-bold text-white">{p.name}</span>
                  </div>
                  <div className="mb-2 text-xs text-gray-500">{p.age}</div>
                  <p className="text-sm leading-relaxed text-gray-400 break-keep">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 02 DP */}
        <section id={dp.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...dp} />
            <Figure><IbHexagonSvg groups={dp.groups} /></Figure>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {dp.groups.map((g) => (
                <div key={g.name} className="rounded-2xl border bg-gray-950/60 p-5" style={{ borderColor: `${g.color}55` }}>
                  <h3 className="mb-1 font-bold" style={{ color: g.color }}>{g.name}</h3>
                  <p className="mb-3 text-sm text-gray-300">{g.ex}</p>
                  <p className="flex items-center gap-1.5 text-xs text-gray-500">
                    <ArrowRight className="h-3 w-3" /> {g.major}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 03 Core */}
        <section id={core.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...core} />
            <div className="grid gap-4 md:grid-cols-3">
              {core.items.map((c) => (
                <div key={c.code} className="relative overflow-hidden rounded-3xl border bg-gray-950/70 p-7" style={{ borderColor: `${c.color}55` }}>
                  <div className="pointer-events-none absolute -right-6 -top-8 text-8xl font-black opacity-10" style={{ color: c.color }}>{c.code}</div>
                  <div className="mb-1 text-3xl font-extrabold" style={{ color: c.color }}>{c.code}</div>
                  <div className="mb-4 font-bold text-white">{c.name}</div>
                  <span className="mb-4 inline-block rounded-md bg-white/5 px-2.5 py-1 text-xs text-gray-300">{c.spec}</span>
                  <p className="text-sm leading-relaxed text-gray-400 break-keep"><H text={c.desc} /></p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 04 Assessment */}
        <section id={assess.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...assess} />
            <Figure caption="IB DP 점수 체계"><IbScoreSvg /></Figure>
            <NumberedCards items={assess.rules} />
          </div>
        </section>

        {/* 05 Korea */}
        <section id={korea.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...korea} />
            <div className="relative mb-16 grid gap-4 md:grid-cols-4">
              <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent md:block" />
              {korea.timeline.map((t) => (
                <div key={t.year} className="relative">
                  <div className="relative mx-auto mb-4 flex h-12 w-fit min-w-12 items-center justify-center rounded-full border border-violet-500/40 bg-gray-950 px-4 text-sm font-bold text-violet-300">{t.year}</div>
                  <div className="rounded-2xl border border-white/10 bg-gray-950/60 p-5 text-center">
                    <div className="mb-2 font-bold text-white">{t.title}</div>
                    <p className="text-sm leading-relaxed text-gray-400 break-keep">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="mb-6 text-center text-xl font-bold text-white">IB 인증 3단계</h3>
            <div className="mb-16 flex flex-col items-stretch gap-3 md:flex-row md:items-center">
              {korea.stages.map((s, i) => (
                <div key={s.name} className="flex flex-1 items-center gap-3">
                  <div className="flex-1 rounded-2xl border p-5 text-center" style={{ borderColor: `rgba(167,139,250,${0.25 + i * 0.25})`, background: `rgba(139,92,246,${0.04 + i * 0.06})` }}>
                    <div className="mb-1 font-bold text-white">{s.name}</div>
                    <p className="text-xs text-gray-400 break-keep">{s.desc}</p>
                  </div>
                  {i < korea.stages.length - 1 && <ArrowRight className="hidden h-5 w-5 shrink-0 text-violet-400 md:block" />}
                </div>
              ))}
            </div>

            <h3 className="mb-6 text-center text-xl font-bold text-white">공개된 국내 공립·일반고 IB 성과</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {korea.results.map((r) => (
                <div key={r.school} className="rounded-2xl border border-sky-500/25 bg-sky-500/[0.05] p-6">
                  <div className="mb-2 font-bold text-sky-200">{r.school}</div>
                  <p className="text-sm leading-relaxed text-gray-300 break-keep">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 06 Pyoseon — 표선고로 보는 IB (펼침 패널) */}
        <section id={pyoseon.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...pyoseon} />
            <div className="mb-10 grid grid-cols-2 gap-3 md:grid-cols-4">
              {pyoseon.profile.map((p) => (
                <div key={p.label} className="rounded-2xl border border-sky-500/25 bg-sky-500/[0.05] p-5 text-center">
                  <div className="text-xl font-bold text-white md:text-2xl">{p.value}</div>
                  <div className="mt-1 text-xs text-gray-400 break-keep">{p.label}</div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {pyoseon.panels.map((p, i) => {
                const Visual = pyoseonVisuals[p.key]
                return (
                  <details
                    key={p.key}
                    open={i === 0}
                    className="group rounded-3xl border bg-gray-950/60 transition open:bg-white/[0.02]"
                    style={{ borderColor: `${p.color}40` }}
                  >
                    <summary className="flex cursor-pointer list-none items-center gap-4 p-5 md:p-6 [&::-webkit-details-marker]:hidden">
                      <span className="text-lg font-extrabold md:text-xl" style={{ color: p.color }}>{p.no}</span>
                      <span className="flex-1">
                        <span className="block font-bold text-white md:text-lg break-keep [&_mark]:font-bold"><H text={p.title} /></span>
                        <span className="mt-1 block text-sm text-gray-400 break-keep">{p.summary}</span>
                      </span>
                      <span className="hidden shrink-0 text-xs text-gray-500 md:inline group-open:hidden">펼치기</span>
                      <span className="hidden shrink-0 text-xs text-gray-500 md:group-open:inline">접기</span>
                      <ChevronDown className="h-5 w-5 shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="border-t border-white/5 px-5 pb-6 pt-6 md:px-8">
                      {Visual && (
                        <div className="mb-6 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02] p-3 md:p-6">
                          <div className="mx-auto min-w-[600px] max-w-3xl md:min-w-0">
                            <Visual />
                          </div>
                        </div>
                      )}
                      <div className="grid gap-4 lg:grid-cols-5">
                        <ul className="space-y-3 lg:col-span-3">
                          {p.points.map((pt) => (
                            <li key={pt} className="flex gap-3 text-sm leading-relaxed text-gray-300 break-keep">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: p.color }} />
                              <span><H text={pt} /></span>
                            </li>
                          ))}
                        </ul>
                        <div className="rounded-2xl border border-sky-500/30 bg-sky-500/[0.06] p-5 lg:col-span-2">
                          <div className="mb-2 flex items-center gap-1.5 text-sm font-bold text-sky-200">
                            <MapPin className="h-4 w-4" /> 표선고에서는
                          </div>
                          <p className="text-sm leading-relaxed text-gray-300 break-keep"><H text={p.example} /></p>
                        </div>
                      </div>
                    </div>
                  </details>
                )
              })}
            </div>
          </div>
        </section>

        {/* 07 Admission */}
        <section id={admission.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader label={admission.label} title={admission.title} />
            <NumberedCards items={admission.items} />
            <div className="flex gap-4 rounded-3xl border border-amber-400/30 bg-amber-400/[0.05] p-7">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
              <p className="text-sm leading-relaxed text-gray-300 break-keep"><H text={admission.caution} /></p>
            </div>
          </div>
        </section>

        {/* 08 Link */}
        <section id={link.id} className="scroll-mt-32 border-t border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...link} />
            <div className="mb-14 grid gap-3 md:grid-cols-4">
              {link.mapping.map((m) => (
                <div key={m.ib} className="rounded-2xl border bg-gray-950/70 p-5 text-center" style={{ borderColor: `${m.color}66` }}>
                  <div className="mb-1 text-2xl font-extrabold" style={{ color: m.color }}>{m.ib}</div>
                  <div className="mb-3 text-xs text-gray-500">{m.ibDesc}</div>
                  <svg viewBox="0 0 20 24" className="mx-auto mb-3 h-5 w-4" aria-hidden="true">
                    <path d="M10 0 V20 M3 13 l7 8 7 -8" fill="none" stroke={m.color} strokeWidth="2.5" />
                  </svg>
                  <div className="font-bold text-white break-keep">{m.ours}</div>
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
