import Link from "next/link"
import { ArrowRight, Check, Sparkles, X } from "lucide-react"
import { Highlight as H } from "./Highlight"

export const whyProjectPages = [
  { href: "/why-project", label: "왜 프로젝트인가" },
  { href: "/why-project/ib", label: "IB 학교" },
  { href: "/why-project/minerva", label: "미네르바 스쿨" },
  { href: "/why-project/vibe-coding", label: "바이브 코딩" },
  { href: "/why-project/ai-orchestra", label: "AI 오케스트라" },
] as const

export function SectionHeader({ label, title, description }: { label: string; title: string; description?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <p className="mb-4 text-sm font-semibold tracking-widest text-violet-400">{label}</p>
      <h2 className="mb-5 text-3xl font-bold leading-tight text-white md:text-4xl break-keep">{title}</h2>
      {description && (
        <p className="text-base leading-relaxed text-gray-400 md:text-lg break-keep"><H text={description} /></p>
      )}
    </div>
  )
}

export function Figure({ children, caption }: { children: React.ReactNode; caption?: string }) {
  return (
    <figure className="mb-14 rounded-3xl border border-white/10 bg-white/[0.02] p-4 md:p-8">
      {children}
      {caption && <figcaption className="mt-4 text-center text-sm text-gray-500">{caption}</figcaption>}
    </figure>
  )
}

export function CompareLists({
  before, after, accent = "violet",
}: {
  before: { title: string; items: string[] }
  after: { title: string; items: string[] }
  accent?: "violet" | "emerald"
}) {
  const on = accent === "violet"
    ? { box: "border-violet-500/40 bg-violet-500/[0.07]", title: "text-violet-300", icon: "text-violet-400" }
    : { box: "border-emerald-500/40 bg-emerald-500/[0.06]", title: "text-emerald-300", icon: "text-emerald-400" }
  return (
    <div className="mb-14 grid gap-4 md:grid-cols-2">
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
        <h3 className="mb-5 text-lg font-bold text-gray-400">{before.title}</h3>
        <ul className="space-y-3">
          {before.items.map((it) => (
            <li key={it} className="flex items-center gap-3 text-gray-500">
              <X className="h-4 w-4 shrink-0 text-rose-400/70" />{it}
            </li>
          ))}
        </ul>
      </div>
      <div className={`rounded-3xl border p-8 ${on.box}`}>
        <h3 className={`mb-5 text-lg font-bold ${on.title}`}>{after.title}</h3>
        <ul className="space-y-3">
          {after.items.map((it) => (
            <li key={it} className="flex items-center gap-3 text-gray-200">
              <Check className={`h-4 w-4 shrink-0 ${on.icon}`} /><span><H text={it} /></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** 서브페이지 공통 히어로 */
export function PageHero({
  eyebrow, title, description, stats, children,
}: {
  eyebrow: string
  title: string[]
  description: string
  stats?: { value: string; label: string }[]
  children?: React.ReactNode
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.25),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-20 text-center md:pt-24">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-violet-300">
          <Sparkles className="h-3.5 w-3.5" /> {eyebrow}
        </span>
        <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white md:text-6xl break-keep">
          {title[0]}
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-sky-400 bg-clip-text text-transparent">{title[1]}</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg break-keep"><H text={description} /></p>
        {children && <div className="mb-10">{children}</div>}
        {stats && (
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
                <div className="text-2xl font-bold text-white md:text-3xl">{s.value}</div>
                <div className="mt-1 text-xs text-gray-400 md:text-sm break-keep">{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

/** 왜 프로젝트인가 하위 페이지 간 이동 탭 */
export function WhyProjectTabs({ current, sticky = true }: { current: string; sticky?: boolean }) {
  return (
    <nav className={`${sticky ? "sticky top-16 z-[5]" : ""} border-b border-white/5 bg-gray-950/85 backdrop-blur`}>
      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none]">
        {whyProjectPages.map((p) => {
          const active = p.href === current
          return (
            <Link
              key={p.href}
              href={p.href}
              aria-current={active ? "page" : undefined}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition ${
                active
                  ? "border-violet-400/60 bg-violet-500/20 font-semibold text-white"
                  : "border-white/10 text-gray-300 hover:border-violet-400/50 hover:text-white"
              }`}
            >
              {p.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export function CtaBlock({
  title, description, primary, secondary,
}: {
  title: string
  description: string
  primary: { label: string; href: string }
  secondary: { label: string; href: string }
}) {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-sky-600 p-[1px]">
        <div className="rounded-3xl bg-gray-950 px-6 py-14 text-center md:px-16">
          <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl break-keep">{title}</h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-400 break-keep"><H text={description} /></p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={primary.href} className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-500 px-6 py-3 font-semibold text-white transition hover:bg-violet-400">
              {primary.label} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={secondary.href} className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3 font-semibold text-gray-200 transition hover:bg-white/5">
              {secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/** 결론 인용 블록 */
export function Takeaway({ text }: { text: string }) {
  return (
    <blockquote className="mx-auto max-w-3xl text-center text-xl font-bold leading-relaxed text-gray-200 md:text-2xl break-keep">
      “<H text={text} />”
    </blockquote>
  )
}

/** 번호 카드 그리드 */
export function NumberedCards({
  items, cols = 3, color = "#a78bfa",
}: {
  items: { title: string; desc: string; tag?: string; color?: string }[]
  cols?: 2 | 3 | 4
  color?: string
}) {
  const grid = { 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[cols]
  return (
    <div className={`mb-14 grid gap-4 ${grid}`}>
      {items.map((it, i) => {
        const c = it.color ?? color
        return (
          <div key={it.title} className="rounded-2xl border bg-gray-950/60 p-6 transition hover:-translate-y-1" style={{ borderColor: `${c}55` }}>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-sm font-bold" style={{ color: c }}>{String(i + 1).padStart(2, "0")}</span>
              {it.tag && <span className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-gray-400">{it.tag}</span>}
            </div>
            <h3 className="mb-2 text-lg font-bold text-white break-keep">{it.title}</h3>
            <p className="text-sm leading-relaxed text-gray-400 break-keep"><H text={it.desc} /></p>
          </div>
        )
      })}
    </div>
  )
}
