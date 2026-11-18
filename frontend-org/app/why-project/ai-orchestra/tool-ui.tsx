import { ArrowUpRight } from "lucide-react"
import { tools, type ToolGlyph, type ToolId } from "./tools"

/** 도구 카테고리를 나타내는 자체 제작 아이콘 (브랜드 로고 아님) */
export function ToolIcon({ glyph, color, size = 20 }: { glyph: ToolGlyph; color: string; size?: number }) {
  const p = { fill: "none", stroke: color, strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
  const shapes: Record<ToolGlyph, React.ReactNode> = {
    spark: <path {...p} d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />,
    search: <><circle {...p} cx="11" cy="11" r="6" /><path {...p} d="M20 20l-4.5-4.5" /></>,
    frame: <path {...p} d="M7 3v18M17 3v18M3 7h18M3 17h18" />,
    image: <><rect {...p} x="3" y="4" width="18" height="16" rx="2" /><circle {...p} cx="9" cy="10" r="2" /><path {...p} d="M3 18l5-5 4 4 3-3 6 6" /></>,
    code: <path {...p} d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />,
    terminal: <><rect {...p} x="3" y="4" width="18" height="16" rx="2" /><path {...p} d="M7 9l3 3-3 3M13 15h4" /></>,
    db: <><ellipse {...p} cx="12" cy="6" rx="7" ry="3" /><path {...p} d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" /></>,
    chip: <><rect {...p} x="7" y="7" width="10" height="10" rx="1.5" /><path {...p} d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4" /></>,
    film: <><rect {...p} x="3" y="5" width="18" height="14" rx="2" /><path {...p} d="M10 9l5 3-5 3z" /></>,
    cut: <><circle {...p} cx="6" cy="6" r="3" /><circle {...p} cx="6" cy="18" r="3" /><path {...p} d="M8.5 7.5L20 18M8.5 16.5L20 6" /></>,
    wave: <path {...p} d="M3 12h1M7 8v8M11 5v14M15 9v6M19 11v2" />,
    rocket: <><path {...p} d="M12 3c3 2 5 6 5 10l-2 3H9l-2-3c0-4 2-8 5-10zM9 16l-2 4M15 16l2 4" /><circle {...p} cx="12" cy="10" r="1.5" /></>,
    flow: <><circle {...p} cx="5" cy="6" r="2" /><circle {...p} cx="19" cy="6" r="2" /><circle {...p} cx="12" cy="18" r="2" /><path {...p} d="M7 6h10M6 8l5 8M18 8l-5 8" /></>,
    branch: <><circle {...p} cx="6" cy="5" r="2" /><circle {...p} cx="6" cy="19" r="2" /><circle {...p} cx="18" cy="7" r="2" /><path {...p} d="M6 7v10M18 9c0 5-12 3-12 8" /></>,
  }
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className="shrink-0">
      {shapes[glyph]}
    </svg>
  )
}

/** 공식 홈페이지로 연결되는 도구 칩 */
export function ToolChip({ id, size = "sm" }: { id: ToolId; size?: "sm" | "md" }) {
  const t = tools[id]
  const md = size === "md"
  return (
    <a
      href={t.url}
      target="_blank"
      rel="noopener noreferrer"
      title={`${t.name} 공식 홈페이지 (${t.company}) — 새 창`}
      className={`group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] font-semibold text-gray-200 transition hover:border-white/30 hover:bg-white/[0.07] hover:text-white ${md ? "px-3.5 py-2 text-sm" : "px-2.5 py-1 text-xs"}`}
    >
      <ToolIcon glyph={t.glyph} color={t.color} size={md ? 16 : 14} />
      {t.name}
      <ArrowUpRight className={`${md ? "h-3.5 w-3.5" : "h-3 w-3"} text-gray-500 transition group-hover:text-white`} />
    </a>
  )
}
