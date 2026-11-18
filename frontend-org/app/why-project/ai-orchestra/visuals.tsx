import { ToolIcon } from "./tool-ui"
import { tools, type ToolId } from "./tools"

const font = { fontFamily: "inherit" }
const BG = "#0b0b12"

/** 지휘자(사람)와 7개 파트(AI)로 구성된 오케스트라 */
export function OrchestraSvg({ stages }: { stages: { name: string; color: string; tools: ToolId[] }[] }) {
  const cx = 360
  const cy = 280
  const R = 210
  return (
    <svg viewBox="0 0 720 340" className="mx-auto h-auto w-full max-w-3xl" style={font} role="img" aria-label="가운데 지휘자인 사람이 일곱 단계의 AI 연주자를 지휘하는 그림">
      <defs><filter id="or-glow"><feGaussianBlur stdDeviation="12" /></filter></defs>
      {[R, R - 70].map((r, i) => (
        <path key={r} d={`M${cx - r} ${cy} A${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="#a78bfa" strokeOpacity={0.12 + i * 0.08} strokeDasharray="4 8" />
      ))}
      {stages.map((s, i) => {
        const a = Math.PI - (i * Math.PI) / (stages.length - 1)
        const x = cx + Math.cos(a) * R
        const y = cy - Math.sin(a) * R * 0.95
        return (
          <g key={s.name}>
            <line x1={cx} y1={cy - 30} x2={x} y2={y} stroke={s.color} strokeOpacity="0.25" strokeWidth="1.5">
              <animate attributeName="stroke-opacity" values="0.1;0.8;0.1" dur="3.5s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
            </line>
            <circle r="3.5" fill={s.color}>
              <animateMotion dur="3.5s" begin={`${i * 0.5}s`} repeatCount="indefinite" path={`M${cx} ${cy - 30} L${x} ${y}`} />
            </circle>
            <circle cx={x} cy={y} r="42" fill={BG} stroke={s.color} strokeWidth="2" />
            <text x={x} y={y - 4} textAnchor="middle" fontSize="15" fontWeight="800" fill={s.color}>{s.name}</text>
            <text x={x} y={y + 14} textAnchor="middle" fontSize="9.5" fill="#9ca3af">{tools[s.tools[0]].name}</text>
          </g>
        )
      })}
      <circle cx={cx} cy={cy - 20} r="50" fill="#8b5cf6" opacity="0.4" filter="url(#or-glow)" />
      <circle cx={cx} cy={cy - 20} r="42" fill="#130d24" stroke="#f5f3ff" strokeWidth="2" />
      <g stroke="#f5f3ff" strokeWidth="3" strokeLinecap="round">
        <line x1={cx - 12} y1={cy - 10} x2={cx + 16} y2={cy - 44}>
          <animateTransform attributeName="transform" type="rotate" values={`-12 ${cx - 12} ${cy - 10};14 ${cx - 12} ${cy - 10};-12 ${cx - 12} ${cy - 10}`} dur="1.6s" repeatCount="indefinite" />
        </line>
      </g>
      <text x={cx} y={cy + 8} textAnchor="middle" fontSize="11" fontWeight="700" fill="#e9d5ff">사람</text>
      <text x={cx} y={cy + 46} textAnchor="middle" fontSize="15" fontWeight="800" fill="#f5f3ff">지휘자 — 의도 · 선택 · 반복</text>
    </svg>
  )
}

/** 7단계 서비스 프로세스 지도 — 단계 사이의 통과 게이트와 산출물, 다음 회차 루프 */
export function ProcessMapSvg({ stages }: { stages: { step: string; name: string; en: string; color: string }[] }) {
  const outputs = ["기획 요약", "와이어프레임", "동작하는 앱", "해결된 Issue", "실서비스 URL", "숏폼 광고", "지표 · 레시피"]
  const xs = stages.map((_, i) => 62 + i * 106)
  const y = 96
  const first = xs[0]
  const last = xs[xs.length - 1]
  const loop = `M${first} ${y} H${last} V230 H${first} Z`
  return (
    <svg viewBox="0 0 760 300" className="h-auto w-full" style={font} role="img" aria-label="정하기부터 개선까지 7단계가 이어지고, 단계 사이마다 사람이 판단하는 통과 기준이 있으며, 각 단계는 산출물을 남기고, 마지막 개선 단계는 다시 처음으로 돌아가는 프로세스 지도">
      <defs>
        <marker id="pm-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="#a78bfa" />
        </marker>
      </defs>

      {/* 범례 */}
      <g fontSize="11" fill="#9ca3af">
        <rect x="236" y="20" width="10" height="10" transform="rotate(45 241 25)" fill={BG} stroke="#f5f3ff" />
        <text x="254" y="29">통과 기준 (사람이 판단)</text>
        <rect x="420" y="18" width="22" height="14" rx="7" fill="none" stroke="#6b7280" strokeDasharray="3 3" />
        <text x="450" y="29">산출물</text>
      </g>

      {/* 메인 라인 + 루프 */}
      <path d={`M${first} ${y} H${last}`} stroke="#a78bfa" strokeOpacity="0.35" strokeWidth="2" />
      <path d={`M${last} 168 V230 H${first} V176`} fill="none" stroke="#f472b6" strokeOpacity="0.6" strokeWidth="1.8" strokeDasharray="5 6" markerEnd="url(#pm-arrow)">
        <animate attributeName="stroke-dashoffset" from="0" to="-110" dur="4s" repeatCount="indefinite" />
      </path>
      <circle r="5" fill="#f5f3ff">
        <animateMotion dur="9s" repeatCount="indefinite" path={loop} />
      </circle>
      <rect x="215" y="217" width="330" height="26" rx="13" fill={BG} stroke="#f472b6" strokeOpacity="0.5" />
      <text x="380" y="234" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#fbcfe8">다음 버전 · 회차마다 레시피가 쌓이고 에이전트가 된다</text>

      {stages.map((s, i) => {
        const x = xs[i]
        return (
          <g key={s.step}>
            {i < stages.length - 1 && (
              <g>
                <rect x={x + 53 - 7} y={y - 7} width="14" height="14" transform={`rotate(45 ${x + 53} ${y})`} fill={BG} stroke="#f5f3ff" strokeWidth="1.5" />
                <path d={`M${x + 49} ${y} l3 3 l5 -6`} fill="none" stroke="#34d399" strokeWidth="1.6" strokeLinecap="round" />
              </g>
            )}
            <rect x={x - 42} y={y - 38} width="84" height="76" rx="14" fill={BG} stroke={s.color} strokeWidth="1.8" />
            <text x={x} y={y - 16} textAnchor="middle" fontSize="10.5" fontWeight="800" fill={s.color}>{s.step}</text>
            <text x={x} y={y + 6} textAnchor="middle" fontSize="15" fontWeight="800" fill="#f9fafb">{s.name}</text>
            <text x={x} y={y + 23} textAnchor="middle" fontSize="9.5" fill="#9ca3af">{s.en}</text>
            <line x1={x} y1={y + 38} x2={x} y2="144" stroke={s.color} strokeOpacity="0.5" strokeDasharray="2 3" />
            <rect x={x - 46} y="144" width="92" height="24" rx="12" fill={s.color} fillOpacity="0.08" stroke={s.color} strokeOpacity="0.45" strokeDasharray="3 3" />
            <text x={x} y="160" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#e5e7eb">{outputs[i]}</text>
          </g>
        )
      })}
      <text x="380" y="282" textAnchor="middle" fontSize="11.5" fill="#6b7280">통과 기준을 넘지 못하면 다음 단계로 가지 않는다 — 그래서 결과가 ‘서비스 수준’이 된다</text>
    </svg>
  )
}

/** 20초 숏폼 4컷 스토리보드 + 타임라인 */
export function ShortsStoryboardSvg({ cuts }: { cuts: { t: string; label: string; caption: string; color: string }[] }) {
  const xs = [34, 206, 378, 550]
  const durations = [2, 5, 8, 5]
  const total = 20
  const W = 648
  let acc = 34
  const segs = durations.map((d) => {
    const s = { x: acc, w: (d / total) * W }
    acc += s.w
    return s
  })

  const scene = (i: number, cx: number, cy: number) => {
    if (i === 0)
      return (
        <g>
          <g transform={`rotate(-6 ${cx} ${cy})`}>
            <rect x={cx - 36} y={cy - 46} width="72" height="92" rx="4" fill="#f3f4f6" />
            {[0, 1, 2, 3, 4].map((r) => (
              <rect key={r} x={cx - 28} y={cy - 34 + r * 16} width="40" height="4" rx="2" fill="#9ca3af" />
            ))}
            {[0, 1, 3].map((r) => (
              <path key={r} d={`M${cx + 16} ${cy - 38 + r * 16} l10 10 M${cx + 26} ${cy - 38 + r * 16} l-10 10`} stroke="#ef4444" strokeWidth="2.6" strokeLinecap="round" strokeDasharray="30" strokeDashoffset="30">
                <animate attributeName="stroke-dashoffset" values="30;0;0;30" keyTimes="0;0.2;0.85;1" dur="3s" begin={`${r * 0.3}s`} repeatCount="indefinite" />
              </path>
            ))}
          </g>
        </g>
      )
    if (i === 1)
      return (
        <g>
          <rect x={cx - 34} y={cy - 48} width="68" height="38" rx="6" fill="#1f2937" stroke="#fb923c" />
          <rect x={cx - 34} y={cy - 48} width="68" height="11" rx="5" fill="#fb923c" />
          <text x={cx} y={cy - 17} textAnchor="middle" fontSize="14" fontWeight="800" fill="#fed7aa">D+3</text>
          {[0, 1, 2].map((k) => (
            <g key={k} opacity={1 - k * 0.35}>
              <rect x={cx - 40 + k * 28} y={cy + 2} width="24" height="32" rx="4" fill="#374151" stroke="#9ca3af" strokeOpacity="0.6" />
              <rect x={cx - 35 + k * 28} y={cy + 12} width="14" height="3" rx="1.5" fill="#d1d5db" />
              <animate attributeName="opacity" values={`${1 - k * 0.35};${0.15};${1 - k * 0.35}`} dur="3s" begin={`${k * 0.4}s`} repeatCount="indefinite" />
            </g>
          ))}
          <text x={cx} y={cy + 52} textAnchor="middle" fontSize="10" fill="#9ca3af">기억 70% ↓</text>
        </g>
      )
    if (i === 2)
      return (
        <g>
          <rect x={cx - 34} y={cy - 54} width="68" height="18" rx="6" fill="#fbbf24" fillOpacity="0.2" stroke="#fbbf24" />
          <text x={cx} y={cy - 41} textAnchor="middle" fontSize="9" fontWeight="700" fill="#fde68a">🔔 복습할 시간!</text>
          <g transform={`translate(${cx} ${cy + 4})`}>
            <g>
              <animateTransform attributeName="transform" type="scale" values="1 1;0.02 1;1 1;1 1" keyTimes="0;0.2;0.4;1" dur="3s" repeatCount="indefinite" />
              <rect x="-32" y="-26" width="64" height="52" rx="8" fill="#111827" stroke="#fbbf24" strokeWidth="1.5" />
              <text x="0" y="-2" textAnchor="middle" fontSize="13" fontWeight="800" fill="#f9fafb">apple</text>
              <text x="0" y="15" textAnchor="middle" fontSize="10" fill="#fbbf24">사과</text>
            </g>
          </g>
          <circle cx={cx} cy={cy + 50} r="10" fill="#34d399" />
          <path d={`M${cx - 4} ${cy + 50} l3 3 l6 -6`} fill="none" stroke={BG} strokeWidth="2" strokeLinecap="round" />
        </g>
      )
    return (
      <g>
        <circle cx={cx} cy={cy - 22} r="24" fill="#34d399" fillOpacity="0.18" stroke="#34d399" strokeWidth="2" />
        <text x={cx} y={cy - 14} textAnchor="middle" fontSize="22" fontWeight="900" fill="#34d399">V</text>
        <text x={cx} y={cy + 20} textAnchor="middle" fontSize="15" fontWeight="800" fill="#f9fafb">보카핏</text>
        <rect x={cx - 38} y={cy + 32} width="76" height="22" rx="11" fill="#34d399">
          <animate attributeName="opacity" values="1;0.55;1" dur="1.4s" repeatCount="indefinite" />
        </rect>
        <text x={cx} y={cy + 47} textAnchor="middle" fontSize="10" fontWeight="800" fill={BG}>무료로 시작 →</text>
      </g>
    )
  }

  return (
    <svg viewBox="0 0 720 370" className="h-auto w-full" style={font} role="img" aria-label="20초 세로 광고의 4컷 스토리보드: 0에서 2초 훅, 2에서 7초 문제, 7에서 15초 시연, 15에서 20초 행동 유도">
      <defs>
        {cuts.map((c, i) => (
          <linearGradient key={i} id={`sb-bg-${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={c.color} stopOpacity="0.22" />
            <stop offset="1" stopColor={BG} stopOpacity="1" />
          </linearGradient>
        ))}
      </defs>
      {cuts.map((c, i) => {
        const x = xs[i]
        const cx = x + 66
        return (
          <g key={c.t}>
            <rect x={x} y="14" width="132" height="240" rx="20" fill="#18181b" stroke="#3f3f46" strokeWidth="2" />
            <rect x={x + 6} y="20" width="120" height="228" rx="15" fill={`url(#sb-bg-${i})`} />
            <rect x={cx - 16} y="26" width="32" height="6" rx="3" fill="#27272a" />
            <rect x={x + 14} y="40" width="48" height="18" rx="9" fill={c.color} fillOpacity="0.2" stroke={c.color} strokeOpacity="0.7" />
            <text x={x + 38} y="53" textAnchor="middle" fontSize="10" fontWeight="800" fill={c.color}>{String(i + 1).padStart(2, "0")} {c.label}</text>
            {scene(i, cx, 128)}
            <rect x={x + 9} y="198" width="114" height="26" rx="6" fill="#000" fillOpacity="0.55" />
            <text x={cx} y="215" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#ffffff">{c.caption}</text>
            <text x={cx} y="278" textAnchor="middle" fontSize="12" fontWeight="700" fill="#d1d5db">{c.t}</text>
          </g>
        )
      })}
      {segs.map((s, i) => (
        <g key={i}>
          <rect x={s.x + 1} y="296" width={s.w - 2} height="14" rx="4" fill={cuts[i].color} fillOpacity="0.75" />
        </g>
      ))}
      <g>
        <rect x="33" y="290" width="3" height="26" rx="1.5" fill="#fff">
          <animate attributeName="x" values="33;680" dur="10s" repeatCount="indefinite" />
        </rect>
      </g>
      {[0, 5, 10, 15, 20].map((t) => (
        <text key={t} x={34 + (t / total) * W} y="330" textAnchor="middle" fontSize="10" fill="#6b7280">{t}s</text>
      ))}
      <text x="360" y="358" textAnchor="middle" fontSize="11.5" fill="#9ca3af">총 20초 · 세로 9:16 · 소리 없이도 이해되도록 자막 필수 · 컷 하나는 3~8초</text>
    </svg>
  )
}

/** 수동 완주 → 레시피 → 에이전트 → 자동화, 그리고 사람 몫의 변화 */
export function RunToAgentSvg({ steps }: { steps: { title: string; sub: string; color: string }[] }) {
  const xs = [90, 270, 450, 630]
  const human = [1, 0.7, 0.3, 0.1]
  const times = ["3시간", "1시간", "20분", "5분"]
  const iconY = 78

  const icon = (i: number, cx: number, c: string) => {
    if (i === 0)
      return (
        <g fill="none" stroke={c} strokeWidth="2" strokeLinecap="round">
          <circle cx={cx - 18} cy={iconY - 18} r="9" />
          <path d={`M${cx - 34} ${iconY + 16} c0 -14 8 -22 16 -22 s16 8 16 22`} />
          {[0, 1, 2].map((k) => (
            <rect key={k} x={cx + 8} y={iconY - 30 + k * 18} width="22" height="14" rx="3" strokeOpacity={0.5 + k * 0.2}>
              <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="2.4s" begin={`${k * 0.8}s`} repeatCount="indefinite" />
            </rect>
          ))}
        </g>
      )
    if (i === 1)
      return (
        <g fill="none" stroke={c} strokeWidth="2" strokeLinecap="round">
          <path d={`M${cx - 24} ${iconY - 34} h34 l14 14 v52 h-48 z`} />
          <path d={`M${cx + 10} ${iconY - 34} v14 h14`} />
          {[0, 1, 2].map((k) => (
            <g key={k}>
              <rect x={cx - 16} y={iconY - 12 + k * 13} width="8" height="8" rx="2" />
              <path d={`M${cx - 2} ${iconY - 8 + k * 13} h20`} strokeOpacity="0.7" />
            </g>
          ))}
        </g>
      )
    if (i === 2)
      return (
        <g>
          <g>
            <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${iconY}`} to={`360 ${cx} ${iconY}`} dur="6s" repeatCount="indefinite" />
            <circle cx={cx} cy={iconY} r="38" fill="none" stroke={c} strokeOpacity="0.5" strokeDasharray="4 6" />
            {[0, 1, 2].map((k) => {
              const a = (k * 2 * Math.PI) / 3 - Math.PI / 2
              return <circle key={k} cx={cx + Math.cos(a) * 38} cy={iconY + Math.sin(a) * 38} r="4.5" fill={c} />
            })}
          </g>
          <rect x={cx - 18} y={iconY - 16} width="36" height="30" rx="9" fill={BG} stroke={c} strokeWidth="2" />
          <circle cx={cx - 7} cy={iconY - 2} r="3" fill={c} />
          <circle cx={cx + 7} cy={iconY - 2} r="3" fill={c} />
          <path d={`M${cx} ${iconY - 16} v-7`} stroke={c} strokeWidth="2" />
          <circle cx={cx} cy={iconY - 25} r="2.5" fill={c} />
        </g>
      )
    return (
      <g fill="none" stroke={c} strokeWidth="2" strokeLinecap="round">
        <circle cx={cx} cy={iconY} r="28" />
        <path d={`M${cx} ${iconY} v-17`}>
          <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${iconY}`} to={`360 ${cx} ${iconY}`} dur="4s" repeatCount="indefinite" />
        </path>
        <path d={`M${cx} ${iconY} h11`} />
        <path d={`M${cx + 30} ${iconY - 30} a40 40 0 0 1 6 40`} strokeOpacity="0.6" />
        <path d={`M${cx + 31} ${iconY + 4} l5 7 l5 -8`} strokeOpacity="0.6" />
      </g>
    )
  }

  return (
    <svg viewBox="0 0 720 340" className="h-auto w-full" style={font} role="img" aria-label="수동 완주, 레시피화, 에이전트화, 자동화 네 단계로 갈수록 사람이 직접 하는 일은 줄고 AI가 하는 일은 늘지만, 판단 게이트는 끝까지 사람에게 남는 그림">
      <defs>
        <marker id="ra-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="#6b7280" />
        </marker>
      </defs>
      {steps.map((s, i) => {
        const x = xs[i]
        return (
          <g key={s.title}>
            {i < 3 && <path d={`M${x + 78} 92 H${xs[i + 1] - 80}`} stroke="#6b7280" strokeWidth="1.6" markerEnd="url(#ra-arrow)" />}
            <rect x={x - 76} y="14" width="152" height="170" rx="18" fill={BG} stroke={s.color} strokeOpacity="0.6" strokeWidth="1.6" />
            {icon(i, x, s.color)}
            <text x={x} y="148" textAnchor="middle" fontSize="15" fontWeight="800" fill="#f9fafb">{i + 1}. {s.title}</text>
            <text x={x} y="168" textAnchor="middle" fontSize="11" fill={s.color}>{s.sub}</text>

            {/* 사람 vs AI 비중 */}
            <rect x={x - 60} y="206" width="120" height="16" rx="4" fill="#fbbf24" fillOpacity="0.55" />
            <rect x={x - 60} y="206" width={120 * human[i]} height="16" rx="4" fill="#a78bfa" />
            <text x={x} y="240" textAnchor="middle" fontSize="12" fontWeight="700" fill="#e5e7eb">사람 직접 작업 {times[i]}</text>
          </g>
        )
      })}
      <g fontSize="11" fill="#9ca3af">
        <rect x="236" y="256" width="12" height="10" rx="2" fill="#a78bfa" />
        <text x="254" y="265">사람이 직접 하는 일</text>
        <rect x="380" y="256" width="12" height="10" rx="2" fill="#fbbf24" fillOpacity="0.55" />
        <text x="398" y="265">AI · 에이전트가 하는 일</text>
      </g>
      <path d="M20 296 H700" stroke="#f5f3ff" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="6 5" />
      {xs.map((x) => (
        <g key={x}>
          <rect x={x - 7} y="289" width="14" height="14" transform={`rotate(45 ${x} 296)`} fill={BG} stroke="#f5f3ff" strokeWidth="1.5" />
        </g>
      ))}
      <text x="360" y="328" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#f5f3ff">그러나 판단 게이트(◇)는 처음부터 끝까지 사람의 몫</text>
    </svg>
  )
}

/** 자동화 파이프라인 — 트리거 → 에이전트 → 사람 승인 → 제작 → 최종 승인 */
export function AutomationFlowSvg({ flow }: { flow: { title: string; sub: string; tool: ToolId | null; color: string }[] }) {
  const xs = flow.map((_, i) => 72 + i * 144)
  const y = 86
  return (
    <svg viewBox="0 0 720 200" className="h-auto w-full" style={font} role="img" aria-label="매주 월요일 트리거가 에이전트를 실행하고, 사람이 훅을 승인하면 제작 단계를 거쳐, 마지막으로 사람이 게시를 결정하는 자동화 흐름">
      <defs>
        <marker id="af-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="#9ca3af" />
        </marker>
      </defs>
      <path d={`M${xs[0]} ${y} H${xs[xs.length - 1]}`} stroke="#4b5563" strokeWidth="2" />
      <circle r="5" fill="#fbbf24">
        <animateMotion dur="5s" repeatCount="indefinite" path={`M${xs[0]} ${y} H${xs[xs.length - 1]}`} />
      </circle>
      {/* 승인 게이트에서 '다시' 되돌림 */}
      <path d={`M${xs[2]} ${y - 34} C${xs[2]} 28, ${xs[1]} 28, ${xs[1]} ${y - 36}`} fill="none" stroke="#f472b6" strokeWidth="1.6" strokeDasharray="4 5" markerEnd="url(#af-arrow)" />
      <text x={(xs[1] + xs[2]) / 2} y="18" textAnchor="middle" fontSize="11" fontWeight="700" fill="#f9a8d4">“다시” → 에이전트가 수정</text>
      {flow.map((f, i) => {
        const x = xs[i]
        const isHuman = f.tool === null
        return (
          <g key={f.title}>
            {isHuman ? (
              <g>
                <path d={`M${x} ${y - 34} L${x + 56} ${y} L${x} ${y + 34} L${x - 56} ${y} Z`} fill="#1e1b2e" stroke="#f5f3ff" strokeWidth="1.8" />
                <circle cx={x} cy={y - 12} r="6" fill="none" stroke="#f5f3ff" strokeWidth="1.8" />
                <path d={`M${x - 10} ${y + 6} c0 -8 4 -11 10 -11 s10 3 10 11`} fill="none" stroke="#f5f3ff" strokeWidth="1.8" />
                <text x={x} y={y + 22} textAnchor="middle" fontSize="11" fontWeight="800" fill="#f5f3ff">{f.title}</text>
              </g>
            ) : (
              <g>
                <rect x={x - 58} y={y - 32} width="116" height="64" rx="14" fill={BG} stroke={f.color} strokeWidth="1.8" />
                <g transform={`translate(${x - 9} ${y - 25})`}>
                  <ToolIcon glyph={tools[f.tool as ToolId].glyph} color={f.color} size={18} />
                </g>
                <text x={x} y={y + 10} textAnchor="middle" fontSize="13" fontWeight="800" fill="#f9fafb">{f.title}</text>
                <text x={x} y={y + 25} textAnchor="middle" fontSize="9.5" fill="#9ca3af">{tools[f.tool as ToolId].name}</text>
              </g>
            )}
            <text x={x} y={y + 56} textAnchor="middle" fontSize="11" fill={isHuman ? "#e9d5ff" : "#9ca3af"}>{f.sub}</text>
          </g>
        )
      })}
      <text x="360" y="186" textAnchor="middle" fontSize="11.5" fill="#6b7280">에이전트는 ‘초안’까지 · 외부에 올리는 마지막 버튼은 사람이 누른다</text>
    </svg>
  )
}

/** 상용화 6단계 순환 */
export function CycleSvg({ steps }: { steps: { title: string }[] }) {
  const cx = 360
  const cy = 170
  const R = 125
  const colors = ["#c084fc", "#a78bfa", "#38bdf8", "#2dd4bf", "#fbbf24", "#f472b6"]
  return (
    <svg viewBox="0 0 720 340" className="mx-auto h-auto w-full max-w-2xl" style={font} role="img" aria-label="문제 발굴, 기획, 제작, 출시, 홍보, 반응과 개선으로 순환하는 상용화 사이클">
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#a78bfa" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="6 8">
        <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="40s" repeatCount="indefinite" />
      </circle>
      <circle r="5" fill="#f5f3ff">
        <animateMotion dur="8s" repeatCount="indefinite" path={`M${cx} ${cy - R} A${R} ${R} 0 1 1 ${cx - 0.1} ${cy - R}`} />
      </circle>
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize="16" fontWeight="800" fill="#f5f3ff">상용화</text>
      <text x={cx} y={cy + 18} textAnchor="middle" fontSize="12" fill="#a78bfa">한 바퀴 완주</text>
      {steps.map((s, i) => {
        const a = ((-90 + i * 60) * Math.PI) / 180
        const x = cx + Math.cos(a) * R
        const y = cy + Math.sin(a) * R
        return (
          <g key={s.title}>
            <circle cx={x} cy={y} r="34" fill={BG} stroke={colors[i]} strokeWidth="2" />
            <text x={x} y={y - 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#6b7280">{i + 1}</text>
            <text x={x} y={y + 12} textAnchor="middle" fontSize="12" fontWeight="800" fill={colors[i]}>{s.title}</text>
          </g>
        )
      })}
    </svg>
  )
}
