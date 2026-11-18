const RULES = /(\/\/.*$|#.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|\b(const|let|export|async|function|return|await|import|from|if|class|def|default|python)\b|(@[\w.]+)|\b(\d+)\b|([A-Za-z_]\w*)(?=\()/gm
const COLORS = ["text-gray-500 italic", "text-emerald-300", "text-violet-300", "text-amber-200", "text-orange-300", "text-sky-300"]

function highlight(line: string) {
  const out: React.ReactNode[] = []
  let last = 0
  for (const m of line.matchAll(RULES)) {
    const i = m.index ?? 0
    if (i > last) out.push(line.slice(last, i))
    const group = m.slice(1).findIndex((g) => g !== undefined)
    out.push(<span key={i} className={COLORS[group]}>{m[0]}</span>)
    last = i + m[0].length
  }
  if (last < line.length) out.push(line.slice(last))
  return out
}

function markdown(line: string) {
  if (/^---/.test(line)) return <span className="text-gray-600">{line}</span>
  if (/^#+ /.test(line)) return <span className="font-bold text-violet-300">{line}</span>
  const kv = line.match(/^(\w+)(:)(.*)$/)
  if (kv) return <><span className="text-sky-300">{kv[1]}</span>{kv[2]}<span className="text-emerald-300">{kv[3]}</span></>
  const item = line.match(/^(\s*)(\d+\.|- \[ \]|-)(\s)(.*)$/)
  if (item) return <>{item[1]}<span className="text-amber-300">{item[2]}</span>{item[3]}{item[4]}</>
  return line
}

/** 에디터 창 모양의 코드 블록 — 줄 번호 · 문법 강조 */
export function CodeWindow({
  file, code, accent = "#a78bfa", className = "", lang = "code", action, maxHeight,
}: {
  file: string
  code: string
  accent?: string
  className?: string
  lang?: "code" | "md"
  action?: React.ReactNode
  maxHeight?: number
}) {
  const lines = code.split("\n")
  return (
    <div className={`overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c14] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)] ${className}`}>
      <div className="flex items-center gap-2 border-b border-white/10 bg-gradient-to-b from-[#2a2a3d] to-[#191926] px-4 py-2.5">
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-400" />
        <span className="ml-3 min-w-0 truncate rounded-md bg-black/40 px-2.5 py-1 font-mono text-[11px] text-gray-300" style={{ boxShadow: `inset 0 -2px 0 ${accent}` }}>{file}</span>
        {action && <span className="ml-auto shrink-0">{action}</span>}
      </div>
      <pre className="overflow-auto py-4 font-mono text-[13px] leading-6 text-gray-200" style={maxHeight ? { maxHeight } : undefined}>
        <code>
          {lines.map((l, i) => (
            <div key={i} className="flex px-4 hover:bg-white/[0.03]">
              <span className="mr-4 w-5 shrink-0 select-none text-right text-gray-600">{i + 1}</span>
              <span className="whitespace-pre">{lang === "md" ? markdown(l) : highlight(l)}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  )
}
