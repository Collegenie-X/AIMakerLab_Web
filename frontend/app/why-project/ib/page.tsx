import type { Metadata } from "next"
import { AlertTriangle, ArrowRight, Check, ChevronDown, MapPin, Mic, Quote, X } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Highlight as H } from "../components/Highlight"
import { CompareLists, CtaBlock, Figure, NumberedCards, PageHero, SectionHeader, Takeaway, WhyProjectTabs } from "../components/blocks"
import { ibContent } from "./content"
import {
  IbAnswerBuildSvg, IbCommandLadderSvg, IbContinuumSvg, IbHexagonSvg, IbInquiryCycleSvg,
  IbMindsetShiftSvg, IbPresentationStagesSvg, IbPyoseonPathwaySvg, IbScoreCompareSvg,
  IbWritingVolumeSvg, IbYearsCoachingSvg,
} from "./visuals"
import { CoreTrioSvg, ExamPapersSvg, IbSeminarSceneSvg, ScoreReportSvg } from "./mockups"

export const metadata: Metadata = {
  title: "IB 학교 | 왜 프로젝트인가",
  description: "에세이·탐구 보고서·구술로 평가하는 국제 바칼로레아(IB) — DP 구조, TOK·EE·CAS 코어, 한국 공교육 IB 도입과 입시 영향",
}

const { hero, what, dp, core, assess, exam, present, practice, korea, pyoseon, admission, link, source, cta } = ibContent

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
        <PageHero {...hero}>
          <div className="mx-auto max-w-4xl">
            <IbSeminarSceneSvg />
          </div>
        </PageHero>
        <WhyProjectTabs current="/why-project/ib" />

        {/* 01 What */}
        <section id={what.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...what} />
            <CompareLists before={what.before} after={what.after} />
            <Figure caption="PYP · MYP · DP — 초등부터 고등까지 ==하나로 이어지는 탐구 벨트=="><IbContinuumSvg /></Figure>
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
            <Figure caption="6개 과목군이 코어를 둘러싼 구조 — ==HL 3과목의 조합==이 전공 방향을 말해 준다"><IbHexagonSvg groups={dp.groups} /></Figure>
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
            <Figure caption="세 코어는 모두 ==손에 잡히는 산출물==로 남는다 — 에세이와 전시, 소논문, 포트폴리오"><CoreTrioSvg items={core.items} /></Figure>
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
            <Figure caption="IB DP 점수 체계 — 6과목 42점에 코어 3점, ==24점 이상==이면 디플로마 (성적은 가상 예시)"><ScoreReportSvg /></Figure>
            <NumberedCards items={assess.rules} />
          </div>
        </section>

        {/* 05 Exam — 시험 문제 */}
        <section id={exam.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...exam} />
            <Figure caption="명령어(Command Term)가 정하는 사고 수준 — ==배점이 클수록 위쪽 단계=="><IbCommandLadderSvg ladder={exam.ladder} /></Figure>
            <div className="mb-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {exam.ladder.map((l) => (
                <div key={l.ao} className="rounded-2xl border bg-gray-950/60 p-5" style={{ borderColor: `${l.color}55` }}>
                  <div className="mb-1 text-xs font-bold" style={{ color: l.color }}>{l.ao} · {l.name}</div>
                  <div className="mb-3 text-sm text-gray-300 break-keep">{l.terms}</div>
                  <p className="rounded-lg bg-white/[0.04] px-3 py-2 text-xs leading-relaxed text-gray-400 break-keep">예) {l.ex}</p>
                </div>
              ))}
            </div>

            <h3 className="mb-6 text-center text-xl font-bold text-white">같은 주제, 다른 시험</h3>
            <Figure caption="같은 최저임금 주제 — 한쪽은 ==답을 고르고==, 한쪽은 ==답을 논증한다== (형식 이해를 위한 재구성)"><ExamPapersSvg blocks={practice.answer.good} /></Figure>
            <div className="mb-16 grid gap-4 md:grid-cols-2">
              {[{ d: exam.compare.suneung, on: false }, { d: exam.compare.ib, on: true }].map(({ d, on }) => (
                <div key={d.tag} className={`rounded-3xl border p-7 ${on ? "border-fuchsia-400/40 bg-fuchsia-500/[0.06]" : "border-white/10 bg-white/[0.02]"}`}>
                  <span className={`mb-3 inline-block rounded-md px-2.5 py-1 text-xs font-semibold ${on ? "bg-fuchsia-500/20 text-fuchsia-200" : "bg-white/5 text-gray-400"}`}>{d.tag}</span>
                  <h4 className={`mb-4 font-bold ${on ? "text-white" : "text-gray-400"}`}>{d.title}</h4>
                  <p className={`mb-5 rounded-2xl border px-4 py-4 text-sm leading-relaxed break-keep ${on ? "border-fuchsia-400/30 bg-gray-950/70 text-gray-100" : "border-white/10 bg-gray-950/50 text-gray-400"}`}>Q. {d.q}</p>
                  <ul className="space-y-2">
                    {d.points.map((pt) => (
                      <li key={pt} className={`flex items-start gap-2.5 text-sm break-keep ${on ? "text-gray-200" : "text-gray-500"}`}>
                        {on ? <Check className="mt-0.5 h-4 w-4 shrink-0 text-fuchsia-300" /> : <X className="mt-0.5 h-4 w-4 shrink-0 text-rose-400/70" />}
                        <span><H text={pt} /></span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <h3 className="mb-2 text-center text-xl font-bold text-white">과목별 시험 문제 펼쳐 보기</h3>
            <p className="mb-6 text-center text-sm text-gray-500">문제를 누르면 시험 형식과 고득점 포인트가 열립니다</p>
            <div className="mb-16 grid items-start gap-3 md:grid-cols-2">
              {exam.papers.map((p, i) => (
                <details key={p.subject} open={i === 0} className="group rounded-2xl border bg-gray-950/60 open:bg-white/[0.02]" style={{ borderColor: `${p.color}45` }}>
                  <summary className="flex cursor-pointer list-none items-start gap-3 p-5 [&::-webkit-details-marker]:hidden">
                    <span className="flex-1">
                      <span className="block text-xs font-bold" style={{ color: p.color }}>{p.subject} · {p.paper}</span>
                      <span className="mt-2 block text-sm font-semibold leading-relaxed text-gray-100 break-keep">Q. {p.q}</span>
                    </span>
                    <ChevronDown className="mt-1 h-5 w-5 shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="border-t border-white/5 px-5 pb-5 pt-4">
                    <div className="mb-3 text-xs text-gray-500">⏱ {p.time}</div>
                    <div className="mb-2 text-xs font-bold text-gray-300">채점자가 보는 것</div>
                    <ul className="space-y-1.5">
                      {p.look.map((l) => (
                        <li key={l} className="flex items-center gap-2 text-sm text-gray-400 break-keep">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: p.color }} />{l}
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
            </div>

            <h3 className="mb-6 text-center text-xl font-bold text-white">15점 논술 답안은 이렇게 쌓입니다</h3>
            <Figure caption="==블록을 어디까지 쌓았느냐==가 채점 밴드를 정합니다 (이해를 돕기 위한 단순화)"><IbAnswerBuildSvg /></Figure>
            <div className="grid gap-3 md:grid-cols-3">
              {exam.bands.map((b) => (
                <div key={b.band} className="rounded-2xl border bg-gray-950/60 p-5" style={{ borderColor: `${b.color}55` }}>
                  <div className="mb-2 font-bold" style={{ color: b.color }}>{b.band}</div>
                  <p className="text-sm leading-relaxed text-gray-400 break-keep"><H text={b.desc} /></p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-xs text-gray-600 break-keep">{exam.note}</p>
          </div>
        </section>

        {/* 06 Present — 토론과 발표 (PYP · MYP · DP) */}
        <section id={present.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...present} />
            <div className="mb-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {present.formats.map((f) => (
                <div key={f.name} className="rounded-2xl border bg-gray-950/60 p-5" style={{ borderColor: `${f.color}55` }}>
                  <h3 className="mb-2 font-bold" style={{ color: f.color }}>{f.name}</h3>
                  <p className="text-sm leading-relaxed text-gray-400 break-keep"><H text={f.desc} /></p>
                </div>
              ))}
            </div>

            <Figure caption="학교급이 올라갈수록 ==무대는 커지고 질문은 날카로워집니다=="><IbPresentationStagesSvg /></Figure>

            <div className="mb-16 space-y-3">
              {present.stages.map((st, i) => (
                <details key={st.code} open={i === 2} className="group rounded-3xl border bg-gray-950/60 open:bg-white/[0.02]" style={{ borderColor: `${st.color}45` }}>
                  <summary className="flex cursor-pointer list-none items-center gap-4 p-5 md:p-6 [&::-webkit-details-marker]:hidden">
                    <span className="w-14 text-2xl font-extrabold" style={{ color: st.color }}>{st.code}</span>
                    <span className="flex-1">
                      <span className="block font-bold text-white md:text-lg break-keep">{st.name}</span>
                      <span className="mt-1 block text-sm text-gray-400">{st.age} · 키우는 힘: {st.skill}</span>
                    </span>
                    <ChevronDown className="h-5 w-5 shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="grid gap-3 border-t border-white/5 p-5 sm:grid-cols-2 md:p-6 lg:grid-cols-3">
                    {st.items.map((it) => (
                      <div key={it.name} className="rounded-2xl border border-white/10 bg-gray-950/70 p-5">
                        <div className="mb-2 flex items-center gap-2 font-bold text-white break-keep">
                          <Mic className="h-4 w-4 shrink-0" style={{ color: st.color }} />{it.name}
                        </div>
                        <p className="text-sm leading-relaxed text-gray-400 break-keep"><H text={it.desc} /></p>
                      </div>
                    ))}
                  </div>
                </details>
              ))}
            </div>

            <h3 className="mb-6 text-center text-xl font-bold text-white">{present.io.title}</h3>
            <div className="relative mb-14 grid gap-4 md:grid-cols-4">
              <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent md:block" />
              {present.io.steps.map((s, i) => (
                <div key={s.t} className="relative">
                  <div className="relative mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-emerald-400/40 bg-gray-950 text-sm font-bold text-emerald-300">{i + 1}</div>
                  <div className="rounded-2xl border border-white/10 bg-gray-950/60 p-5 text-center">
                    <div className="mb-2 font-bold text-white">{s.t}</div>
                    <p className="text-sm leading-relaxed text-gray-400 break-keep"><H text={s.d} /></p>
                  </div>
                </div>
              ))}
            </div>
            <Takeaway text={present.quote} />
          </div>
        </section>

        {/* 07 Practice — 실전 예시 */}
        <section id={practice.id} className="scroll-mt-32 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader {...practice} />

            {/* 가상 학생의 2년 */}
            <div className="mb-6 text-center">
              <h3 className="text-xl font-bold text-white">{practice.journey.title}</h3>
              <p className="mt-2 text-sm text-gray-400 break-keep">{practice.journey.profile}</p>
              <p className="mt-1 text-xs text-gray-600 break-keep">{practice.journey.disclaimer}</p>
            </div>
            <ol className="relative mb-8 space-y-4 border-l border-white/10 pl-6 md:ml-4">
              {practice.journey.steps.map((st) => (
                <li key={st.title} className="relative">
                  <span className="absolute -left-[31px] top-5 h-3.5 w-3.5 rounded-full ring-4 ring-gray-950" style={{ background: st.color }} />
                  <div className="grid gap-4 rounded-2xl border bg-gray-950/60 p-5 md:grid-cols-5" style={{ borderColor: `${st.color}40` }}>
                    <div className="md:col-span-3">
                      <div className="mb-1 text-xs font-bold" style={{ color: st.color }}>{st.when}</div>
                      <h4 className="mb-2 font-bold text-white">{st.title}</h4>
                      <p className="mb-3 text-sm leading-relaxed text-gray-400 break-keep">{st.what}</p>
                      <span className="inline-block rounded-md bg-white/5 px-2.5 py-1 text-xs text-gray-300">산출물 · {st.output}</span>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 md:col-span-2">
                      <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-gray-300"><Quote className="h-3.5 w-3.5" /> 세특에 남는 문장 (예시)</div>
                      <p className="text-sm leading-relaxed text-gray-300 break-keep"><H text={st.record} /></p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mb-20 rounded-3xl border border-fuchsia-400/30 bg-fuchsia-500/[0.05] p-6 md:p-8">
              <h4 className="mb-4 font-bold text-fuchsia-200">면접에서 나올 수 있는 질문</h4>
              <ul className="space-y-3">
                {practice.journey.interview.map((q, i) => (
                  <li key={q} className="flex gap-3 text-sm leading-relaxed text-gray-200 break-keep">
                    <span className="font-bold text-fuchsia-300">Q{i + 1}</span>{q}
                  </li>
                ))}
              </ul>
            </div>

            {/* 수업 시나리오 */}
            <h3 className="mb-2 text-center text-xl font-bold text-white">교실 수업 시나리오 4가지</h3>
            <p className="mb-6 text-center text-sm text-gray-500">수업을 누르면 시간대별 진행이 열립니다</p>
            <div className="mb-20 grid items-start gap-3 md:grid-cols-2">
              {practice.lessons.map((l, i) => (
                <details key={l.key} open={i === 0} className="group rounded-2xl border bg-gray-950/60 open:bg-white/[0.02]" style={{ borderColor: `${l.color}45` }}>
                  <summary className="flex cursor-pointer list-none items-start gap-3 p-5 [&::-webkit-details-marker]:hidden">
                    <span className="flex-1">
                      <span className="block text-xs font-bold" style={{ color: l.color }}>{l.subject}</span>
                      <span className="mt-1 block font-bold text-white break-keep">{l.title}</span>
                    </span>
                    <ChevronDown className="mt-1 h-5 w-5 shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="border-t border-white/5 px-5 pb-5 pt-4">
                    <ol className="mb-4 space-y-3">
                      {l.flow.map((f) => (
                        <li key={f.t} className="flex gap-3 text-sm">
                          <span className="w-20 shrink-0 font-semibold" style={{ color: l.color }}>{f.t}</span>
                          <span className="leading-relaxed text-gray-400 break-keep"><H text={f.d} /></span>
                        </li>
                      ))}
                    </ol>
                    <p className="rounded-xl bg-white/[0.04] px-4 py-3 text-sm leading-relaxed text-gray-300 break-keep"><H text={l.point} /></p>
                  </div>
                </details>
              ))}
            </div>

            {/* 논술 답안 예시 */}
            <h3 className="mb-2 text-center text-xl font-bold text-white">15점 논술 답안, 이렇게 씁니다</h3>
            <p className="mx-auto mb-6 max-w-3xl text-center text-sm text-gray-300 break-keep">Q. {practice.answer.q}</p>
            <div className="mb-4 grid gap-4 lg:grid-cols-5">
              <div className="rounded-3xl border border-fuchsia-400/30 bg-fuchsia-500/[0.04] p-6 lg:col-span-3">
                <div className="mb-4 text-sm font-bold text-fuchsia-200">상위 밴드 답안 (뼈대)</div>
                <ol className="space-y-3">
                  {practice.answer.good.map((g) => (
                    <li key={g.tag} className="flex gap-3 text-sm leading-relaxed text-gray-200 break-keep">
                      <span className="h-fit shrink-0 rounded-md px-2 py-0.5 text-xs font-bold" style={{ color: g.color, background: `${g.color}1f` }}>{g.tag}</span>
                      <span>{g.text}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 lg:col-span-2">
                <div className="mb-4 text-sm font-bold text-gray-400">하위 밴드 답안</div>
                <p className="mb-5 rounded-2xl border border-white/10 bg-gray-950/60 p-4 text-sm leading-relaxed text-gray-400 break-keep">{practice.answer.weak.text}</p>
                <ul className="space-y-2">
                  {practice.answer.weak.why.map((w) => (
                    <li key={w} className="flex items-start gap-2 text-sm text-gray-400 break-keep">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-rose-400/70" /><span><H text={w} /></span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mb-20 text-center text-xs text-gray-600 break-keep">{practice.answer.note}</p>

            {/* 세미나 채점표 */}
            <h3 className="mb-6 text-center text-xl font-bold text-white">{practice.rubric.title}</h3>
            <div className="mb-8 overflow-x-auto rounded-3xl border border-white/10">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="bg-white/[0.04] text-gray-300">
                  <tr>
                    <th className="px-5 py-3 font-semibold">기준</th>
                    <th className="px-5 py-3 font-semibold text-emerald-300">탁월</th>
                    <th className="px-5 py-3 font-semibold text-rose-300/80">미흡</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {practice.rubric.rows.map((r) => (
                    <tr key={r.c}>
                      <td className="px-5 py-3 font-bold text-white">{r.c}</td>
                      <td className="px-5 py-3 text-gray-300 break-keep">{r.top}</td>
                      <td className="px-5 py-3 text-gray-500 break-keep">{r.low}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Takeaway text={practice.rubric.point} />
          </div>
        </section>

        {/* 08 Korea */}
        <section id={korea.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
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

        {/* 09 Pyoseon — 표선고로 보는 IB (펼침 패널) */}
        <section id={pyoseon.id} className="scroll-mt-32 py-24">
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

        {/* 10 Admission */}
        <section id={admission.id} className="scroll-mt-32 border-y border-white/5 bg-white/[0.015] py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader label={admission.label} title={admission.title} />
            <NumberedCards items={admission.items} />
            <div className="flex gap-4 rounded-3xl border border-amber-400/30 bg-amber-400/[0.05] p-7">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
              <p className="text-sm leading-relaxed text-gray-300 break-keep"><H text={admission.caution} /></p>
            </div>
          </div>
        </section>

        {/* 11 Link */}
        <section id={link.id} className="scroll-mt-32 py-24">
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
