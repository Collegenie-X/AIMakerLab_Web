/**
 * 바이브 코딩 페이지의 캐릭터 · 장면 일러스트.
 * 캐릭터는 로컬 좌표계(가로 중심 x=0, 발끝 y=0, 위쪽이 음수)로 그려
 * 어느 장면에서든 x · y · s(배율)로 배치합니다.
 */

const font = { fontFamily: "inherit" }
const BG = "#0b0b12"
const SKIN = "#fcd9b6"
const INK = "#1f2937"
const halo = { paintOrder: "stroke" as const }

type Arm = "down" | "wave" | "cheer" | "point"
type KidProps = { x: number; y: number; s?: number; color?: string; hair?: string; arm?: Arm; mood?: "smile" | "flat" | "wow"; gray?: boolean; flip?: boolean }

/** 학생 캐릭터 */
export function Kid({ x, y, s = 1, color = "#a78bfa", hair = "#f59e0b", arm = "down", mood = "smile", gray = false, flip = false }: KidProps) {
  const skin = gray ? "#9ca3af" : SKIN
  const top = gray ? "#4b5563" : color
  const hr = gray ? "#374151" : hair
  const R = arm === "down" ? "M13 -40 L18 -22" : arm === "point" ? "M13 -38 L31 -42" : "M13 -40 L25 -58"
  const L = arm === "cheer" ? "M-13 -40 L-25 -58" : "M-13 -40 L-18 -22"
  const hand = (d: string) => {
    const [px, py] = d.split("L")[1].trim().split(" ").map(Number)
    return <circle cx={px} cy={py} r="4" fill={skin} />
  }
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <rect x="-10" y="-18" width="8" height="18" rx="3" fill={gray ? "#374151" : "#475569"} />
      <rect x="2" y="-18" width="8" height="18" rx="3" fill={gray ? "#374151" : "#475569"} />
      <ellipse cx="-7" cy="0" rx="6.5" ry="3" fill={gray ? "#6b7280" : "#e5e7eb"} />
      <ellipse cx="7" cy="0" rx="6.5" ry="3" fill={gray ? "#6b7280" : "#e5e7eb"} />
      <path d={L} stroke={top} strokeWidth="7" strokeLinecap="round" />
      <path d={R} stroke={top} strokeWidth="7" strokeLinecap="round" />
      {hand(L)}
      {hand(R)}
      <rect x="-14" y="-46" width="28" height="32" rx="11" fill={top} />
      <path d="M-6 -24 H6" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />
      <circle cx="0" cy="-60" r="15" fill={skin} />
      <path d="M-15.5 -60 C-18 -82, 18 -82, 15.5 -60 C10 -70, -4 -73, -15.5 -60 Z" fill={hr} />
      <circle cx="-5" cy="-58" r="1.9" fill={INK} />
      <circle cx="5" cy="-58" r="1.9" fill={INK} />
      {!gray && <circle cx="-10" cy="-54" r="2.6" fill="#fb7185" opacity="0.55" />}
      {!gray && <circle cx="10" cy="-54" r="2.6" fill="#fb7185" opacity="0.55" />}
      {mood === "smile" && <path d="M-5 -52 Q0 -47 5 -52" stroke={INK} strokeWidth="1.7" fill="none" strokeLinecap="round" />}
      {mood === "flat" && <path d="M-4 -51 H4" stroke={INK} strokeWidth="1.7" strokeLinecap="round" />}
      {mood === "wow" && <ellipse cx="0" cy="-51" rx="2.6" ry="3.2" fill={INK} />}
    </g>
  )
}

/** AI 로봇 캐릭터 — 살짝 떠서 둥실거린다 */
export function Robo({ x, y, s = 1, color = "#38bdf8", arm = "out", flip = false }: { x: number; y: number; s?: number; color?: string; arm?: "out" | "down" | "cheer"; flip?: boolean }) {
  const r = arm === "down" ? "M15 -30 q8 2 9 11" : "M15 -30 L30 -41"
  const l = arm === "cheer" ? "M-15 -30 L-30 -41" : "M-15 -30 q-8 2 -9 11"
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx="0" cy="2" rx="15" ry="3.5" fill={color} opacity="0.22" />
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="3s" repeatCount="indefinite" />
        <path d="M-5 -10 Q0 4 5 -10 Z" fill="#fbbf24">
          <animate attributeName="opacity" values="1;0.4;1" dur="0.5s" repeatCount="indefinite" />
        </path>
        <rect x="-8" y="-14" width="16" height="6" rx="3" fill="#c7d2fe" />
        <path d={l} stroke="#c7d2fe" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d={r} stroke="#c7d2fe" strokeWidth="5" strokeLinecap="round" fill="none" />
        <rect x="-15" y="-38" width="30" height="26" rx="10" fill="#e0e7ff" />
        <circle cx="0" cy="-25" r="4.5" fill={color}>
          <animate attributeName="opacity" values="1;0.35;1" dur="1.6s" repeatCount="indefinite" />
        </circle>
        <line x1="0" y1="-70" x2="0" y2="-79" stroke="#c7d2fe" strokeWidth="2.5" />
        <circle cx="0" cy="-82" r="4" fill="#fbbf24">
          <animate attributeName="r" values="3.5;5;3.5" dur="1.6s" repeatCount="indefinite" />
        </circle>
        <rect x="-24" y="-62" width="5" height="12" rx="2.5" fill={color} />
        <rect x="19" y="-62" width="5" height="12" rx="2.5" fill={color} />
        <rect x="-20" y="-71" width="40" height="31" rx="12" fill="#eef2ff" />
        <rect x="-15" y="-66" width="30" height="21" rx="8" fill="#1e1b4b" />
        {[-7, 7].map((ex) => (
          <ellipse key={ex} cx={ex} cy="-57" rx="3" ry="3.6" fill={color}>
            <animate attributeName="ry" values="3.6;3.6;0.4;3.6" keyTimes="0;0.9;0.95;1" dur="4s" repeatCount="indefinite" />
          </ellipse>
        ))}
        <path d="M-4 -50 Q0 -47 4 -50" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </g>
    </g>
  )
}

/** 위를 향한 로켓 (중심 원점) */
function Rocket({ color = "#a78bfa" }: { color?: string }) {
  return (
    <g>
      <path d="M-5 15 Q0 36 5 15 Z" fill="#fbbf24">
        <animate attributeName="d" values="M-5 15 Q0 36 5 15 Z;M-5 15 Q0 26 5 15 Z;M-5 15 Q0 36 5 15 Z" dur="0.4s" repeatCount="indefinite" />
      </path>
      <path d="M-8 6 L-18 19 L-8 16 Z M8 6 L18 19 L8 16 Z" fill="#f472b6" />
      <path d="M0 -27 C13 -14, 12 8, 8 16 H-8 C-12 8, -13 -14, 0 -27 Z" fill="#eef2ff" />
      <path d="M0 -27 C6 -21, 8.6 -15, 9.6 -10 H-9.6 C-8.6 -15, -6 -21, 0 -27 Z" fill={color} />
      <circle cx="0" cy="-1" r="5" fill="#38bdf8" stroke="#1e1b4b" strokeWidth="1.5" />
    </g>
  )
}

function Heart({ x, y, s = 1, color = "#f472b6", delay = 0 }: { x: number; y: number; s?: number; color?: string; delay?: number }) {
  return (
    <path transform={`translate(${x} ${y}) scale(${s})`} d="M0 6 C-12 -3, -6 -12, 0 -5 C6 -12, 12 -3, 0 6 Z" fill={color}>
      <animate attributeName="opacity" values="0.15;1;0.15" dur="2.4s" begin={`${delay}s`} repeatCount="indefinite" />
    </path>
  )
}

function Spark({ x, y, color = "#f0abfc", delay = 0, s = 1 }: { x: number; y: number; color?: string; delay?: number; s?: number }) {
  return (
    <path transform={`translate(${x} ${y}) scale(${s})`} d="M0 -8 l2.6 5.4 5.4 2.6 -5.4 2.6 -2.6 5.4 -2.6 -5.4 -5.4 -2.6 5.4 -2.6 z" fill={color}>
      <animate attributeName="opacity" values="0.1;1;0.1" dur="1.8s" begin={`${delay}s`} repeatCount="indefinite" />
    </path>
  )
}

function Stars({ pts }: { pts: number[][] }) {
  return (
    <>
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.3" fill="#ffffff">
          <animate attributeName="opacity" values="0.15;0.9;0.15" dur={`${2 + (i % 3)}s`} begin={`${i * 0.35}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </>
  )
}

/** 히어로 — 학생이 말하면 AI 로봇이 화면을 조립한다 */
export function HeroSceneSvg() {
  const drop = (at: number) => (
    <>
      <animate attributeName="opacity" values="0;0;1;1;0" keyTimes={`0;${at};${at + 0.07};0.93;1`} dur="7s" repeatCount="indefinite" />
      <animateTransform attributeName="transform" type="translate" values="0 -22;0 -22;0 0;0 0" keyTimes={`0;${at};${at + 0.07};1`} dur="7s" repeatCount="indefinite" />
    </>
  )
  return (
    <svg viewBox="0 0 720 320" className="h-auto w-full" style={font} role="img" aria-label="학생이 만들고 싶은 앱을 말로 설명하면 AI 로봇이 화면을 조립하고, 학생이 결과를 보며 다시 다듬는 장면">
      <defs>
        <marker id="hs-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="#c4b5fd" />
        </marker>
        <radialGradient id="hs-floor" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.35" />
          <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <Stars pts={[[40, 150], [300, 60], [392, 96], [20, 30], [404, 200], [700, 30], [274, 150]]} />
      <ellipse cx="360" cy="268" rx="340" ry="26" fill="url(#hs-floor)" />

      {/* loop */}
      <path d="M560 50 C500 6, 320 6, 266 44" fill="none" stroke="#c4b5fd" strokeWidth="1.8" strokeDasharray="5 6" markerEnd="url(#hs-arrow)">
        <animate attributeName="stroke-dashoffset" from="0" to="-110" dur="3s" repeatCount="indefinite" />
      </path>
      <text x="412" y="14" textAnchor="middle" fontSize="12" fontWeight="700" fill="#ddd6fe">될 때까지 반복 — 이것이 ‘바이브’</text>

      {/* kid + bubble */}
      <path d="M36 52 a18 18 0 0 1 18 -18 H246 a18 18 0 0 1 18 18 V84 a18 18 0 0 1 -18 18 H150 L128 124 L130 102 H54 a18 18 0 0 1 -18 -18 Z" fill="#a78bfa" fillOpacity="0.16" stroke="#a78bfa" strokeWidth="1.6" />
      <text x="150" y="62" textAnchor="middle" fontSize="14" fontWeight="800" fill="#ffffff">“수업 목록 앱 만들어 줘!”</text>
      <text x="150" y="84" textAnchor="middle" fontSize="12" fill="#ddd6fe">버튼은 보라색으로, 크게</text>
      <Kid x={112} y={264} s={1.5} arm="wave" />

      {/* robo */}
      <Robo x={330} y={258} s={1.55} />
      <path d="M380 190 Q410 170 438 160" fill="none" stroke="#7dd3fc" strokeWidth="2.5" strokeDasharray="3 7" strokeLinecap="round">
        <animate attributeName="stroke-dashoffset" from="20" to="0" dur="0.8s" repeatCount="indefinite" />
      </path>
      <Spark x={398} y={160} delay={0} />
      <Spark x={420} y={186} delay={0.5} color="#7dd3fc" s={0.8} />
      <Spark x={372} y={144} delay={1} color="#fde68a" s={0.7} />

      {/* window being built */}
      <rect x="440" y="52" width="252" height="196" rx="16" fill={BG} stroke="#38bdf8" strokeWidth="1.8" />
      <rect x="440" y="52" width="252" height="26" rx="13" fill="#38bdf8" fillOpacity="0.14" />
      {["#f87171", "#fbbf24", "#34d399"].map((c, i) => <circle key={c} cx={456 + i * 12} cy="65" r="3.6" fill={c} />)}
      <rect x="500" y="57" width="150" height="16" rx="8" fill="#ffffff" fillOpacity="0.08" />
      <text x="575" y="69" textAnchor="middle" fontSize="9.5" fill="#bae6fd">my-app.vercel.app</text>
      <g opacity="0">
        {drop(0.1)}
        <rect x="456" y="90" width="220" height="40" rx="10" fill="#a78bfa" fillOpacity="0.35" />
        <rect x="468" y="102" width="96" height="8" rx="4" fill="#ffffff" fillOpacity="0.85" />
        <rect x="468" y="115" width="60" height="5" rx="2.5" fill="#ffffff" fillOpacity="0.4" />
      </g>
      {[0, 1, 2].map((i) => (
        <g key={i} opacity="0">
          {drop(0.24 + i * 0.12)}
          <rect x={456 + i * 75} y="140" width="68" height="60" rx="10" fill="#ffffff" fillOpacity="0.06" stroke="#ffffff" strokeOpacity="0.14" />
          <rect x={463 + i * 75} y="147" width="54" height="26" rx="6" fill={["#f472b6", "#38bdf8", "#fbbf24"][i]} fillOpacity="0.45" />
          <rect x={463 + i * 75} y="180" width="38" height="5" rx="2.5" fill="#e5e7eb" fillOpacity="0.7" />
          <rect x={463 + i * 75} y="189" width="24" height="4" rx="2" fill="#6b7280" />
        </g>
      ))}
      <g opacity="0">
        {drop(0.62)}
        <rect x="516" y="210" width="100" height="26" rx="13" fill="#8b5cf6" />
        <text x="566" y="227" textAnchor="middle" fontSize="11" fontWeight="800" fill="#ffffff">수강 신청</text>
      </g>
      <Heart x={676} y={222} delay={0.4} />

      {/* captions */}
      {[
        { x: 112, t: "① 말로 설명", c: "#c4b5fd" },
        { x: 330, t: "② AI가 만든다", c: "#7dd3fc" },
        { x: 566, t: "③ 보고 다듬는다", c: "#6ee7b7" },
      ].map((l) => (
        <g key={l.t}>
          <rect x={l.x - 62} y="286" width="124" height="28" rx="14" fill={BG} stroke={l.c} strokeOpacity="0.6" />
          <text x={l.x} y="305" textAnchor="middle" fontSize="13" fontWeight="800" fill={l.c}>{l.t}</text>
        </g>
      ))}
    </svg>
  )
}

/** 02 — 외우고 시험 보던 책상 vs 만들고 런칭하는 책상 */
export function ShiftSceneSvg() {
  const books = [
    { w: 74, c: "#4b5563", t: "문법" },
    { w: 64, c: "#374151", t: "자료구조" },
    { w: 78, c: "#52525b", t: "알고리즘" },
    { w: 60, c: "#3f3f46", t: "기출" },
    { w: 70, c: "#4b5563", t: "암기" },
  ]
  return (
    <svg viewBox="0 0 720 290" className="h-auto w-full" style={font} role="img" aria-label="AI 이전에는 책 더미 뒤에서 문법을 외우고 시험을 봤지만, AI 이후에는 직접 만든 앱을 런칭하고 사람들의 반응을 얻는다">
      {/* before */}
      <text x="170" y="28" textAnchor="middle" fontSize="14" fontWeight="800" fill="#9ca3af">AI 이전 — 외우고, 시험 보고</text>
      <path d="M232 72 a12 12 0 0 1 12 -12 H316 a12 12 0 0 1 12 12 V98 a12 12 0 0 1 -12 12 H244 a12 12 0 0 1 -12 -12 Z" fill="#ffffff" fillOpacity="0.05" stroke="#6b7280" />
      <text x="280" y="83" textAnchor="middle" fontSize="10" fill="#9ca3af" style={{ fontFamily: "ui-monospace, monospace" }}>for(i=0;i&lt;n;</text>
      <text x="280" y="99" textAnchor="middle" fontSize="10" fill="#9ca3af" style={{ fontFamily: "ui-monospace, monospace" }}>i++) {"{ ?? }"}</text>
      <circle cx="232" cy="122" r="5" fill="#6b7280" opacity="0.6" />
      <circle cx="220" cy="134" r="3" fill="#6b7280" opacity="0.6" />
      <Kid x={196} y={252} s={1.35} gray mood="flat" />
      <rect x="28" y="206" width="290" height="50" rx="8" fill="#1f2937" />
      <rect x="28" y="200" width="290" height="8" rx="4" fill="#374151" />
      {books.map((b, i) => (
        <g key={b.t}>
          <rect x={48 + (i % 2) * 6} y={184 - i * 17} width={b.w} height="15" rx="3" fill={b.c} stroke="#6b7280" strokeOpacity="0.6" />
          <text x={56 + (i % 2) * 6} y={195 - i * 17} fontSize="8.5" fill="#d1d5db">{b.t}</text>
        </g>
      ))}
      <g transform="rotate(8 270 170)">
        <rect x="250" y="142" width="46" height="58" rx="4" fill="#e5e7eb" fillOpacity="0.85" />
        <text x="273" y="166" textAnchor="middle" fontSize="15" fontWeight="800" fill="#ef4444">92</text>
        <path d="M258 176 H288 M258 184 H288 M258 192 H278" stroke="#9ca3af" strokeWidth="2" />
      </g>
      <text x="170" y="278" textAnchor="middle" fontSize="12" fill="#6b7280">지식량 · 스펙 · 취업</text>

      {/* arrow */}
      <circle cx="360" cy="150" r="22" fill={BG} stroke="#a78bfa" strokeWidth="1.8" />
      <path d="M350 150 H368 M362 143 L370 150 L362 157" stroke="#c4b5fd" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* after */}
      <text x="552" y="28" textAnchor="middle" fontSize="14" fontWeight="800" fill="#ddd6fe">AI 이후 — 만들고, 런칭하고</text>
      <Stars pts={[[420, 60], [700, 70], [500, 110], [690, 180]]} />
      <path d="M404 64 a14 14 0 0 1 14 -14 H524 a14 14 0 0 1 14 14 V78 a14 14 0 0 1 -14 14 H480 L466 108 L468 92 H418 a14 14 0 0 1 -14 -14 Z" fill="#a78bfa" fillOpacity="0.18" stroke="#a78bfa" strokeWidth="1.4" />
      <text x="471" y="76" textAnchor="middle" fontSize="12" fontWeight="800" fill="#ffffff">“내가 만든 앱이야!”</text>
      <Kid x={470} y={252} s={1.35} arm="cheer" />
      <rect x="534" y="206" width="166" height="50" rx="8" fill="#1e1b4b" />
      <rect x="534" y="200" width="166" height="8" rx="4" fill="#4c1d95" />
      <rect x="570" y="140" width="96" height="60" rx="8" fill={BG} stroke="#a78bfa" strokeWidth="1.8" />
      <rect x="560" y="198" width="116" height="6" rx="3" fill="#c4b5fd" />
      <rect x="580" y="150" width="76" height="8" rx="4" fill="#a78bfa" fillOpacity="0.5" />
      <rect x="580" y="164" width="34" height="26" rx="5" fill="#38bdf8" fillOpacity="0.4" />
      <rect x="620" y="164" width="36" height="26" rx="5" fill="#f472b6" fillOpacity="0.4" />
      <g transform="translate(618 96)">
        <animateTransform attributeName="transform" type="translate" values="618 100;618 88;618 100" dur="2.2s" repeatCount="indefinite" />
        <Rocket />
      </g>
      <Heart x={566} y={96} delay={0} />
      <Heart x={676} y={118} delay={0.8} s={0.8} color="#fb7185" />
      <Heart x={548} y={132} delay={1.5} s={0.7} color="#c084fc" />
      <text x="552" y="278" textAnchor="middle" fontSize="12" fill="#c4b5fd">문제 정의력 · 포트폴리오 · 창직</text>
    </svg>
  )
}

/** 03 — 거북이(전통 방식) vs 로켓(바이브 코딩) 레이스 */
export function RaceSvg({ tasks }: { tasks: { name: string; before: number; after: number; tool: string }[] }) {
  const x0 = 66
  const x1 = 646
  const seg = (x1 - x0) / tasks.length
  const fmt = (m: number) => (m >= 60 ? `${m / 60}시간` : `${m}분`)
  const sum = (k: "before" | "after") => tasks.reduce((a, t) => a + t[k], 0)
  return (
    <svg viewBox="0 0 720 260" className="h-auto w-full" style={font} role="img" aria-label={`MVP까지의 레이스. 전통 방식은 거북이처럼 합계 ${fmt(sum("before"))}, 바이브 코딩은 로켓처럼 합계 ${fmt(sum("after"))}`}>
      <text x={x0} y="34" fontSize="14" fontWeight="800" fill="#9ca3af">전통 방식 · 합계 {fmt(sum("before"))}</text>
      <text x={x0} y="246" fontSize="14" fontWeight="800" fill="#c4b5fd">바이브 코딩 · 합계 {fmt(sum("after"))}</text>

      {[96, 206].map((y, i) => (
        <g key={y}>
          <path d={`M${x0} ${y} H${x1}`} stroke={i ? "#a78bfa" : "#ffffff"} strokeOpacity={i ? 0.5 : 0.14} strokeWidth="4" strokeLinecap="round" />
          {tasks.map((_, k) => <circle key={k} cx={x0 + seg * (k + 1)} cy={y} r="5" fill={BG} stroke={i ? "#a78bfa" : "#6b7280"} strokeWidth="2" />)}
        </g>
      ))}
      {tasks.map((t, k) => {
        const mx = x0 + seg * (k + 0.5)
        return (
          <g key={t.name}>
            <text x={mx} y="126" textAnchor="middle" fontSize="11" fill="#9ca3af">{fmt(t.before)}</text>
            <text x={mx} y="146" textAnchor="middle" fontSize="13" fontWeight="800" fill="#f3f4f6">{t.name}</text>
            <text x={mx} y="165" textAnchor="middle" fontSize="11" fontWeight="700" fill="#c4b5fd">{fmt(t.after)} · {t.tool}</text>
          </g>
        )
      })}

      {/* finish */}
      <path d="M662 44 V214" stroke="#e5e7eb" strokeWidth="3" strokeLinecap="round" />
      {[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => (
        <rect key={`${r}${c}`} x={664 + c * 10} y={44 + r * 10} width="10" height="10" fill={(r + c) % 2 ? "#111827" : "#f9fafb"} />
      )))}
      <text x="684" y="92" textAnchor="middle" fontSize="12" fontWeight="800" fill="#f9fafb">MVP</text>

      {/* turtle */}
      <g>
        <animateTransform attributeName="transform" type="translate" from="92 96" to="210 96" dur="18s" repeatCount="indefinite" />
        <rect x="-17" y="-4" width="9" height="7" rx="3" fill="#94a3b8" />
        <rect x="8" y="-4" width="9" height="7" rx="3" fill="#94a3b8" />
        <path d="M-24 -6 l-7 3 7 2 z" fill="#94a3b8" />
        <circle cx="27" cy="-12" r="8" fill="#94a3b8" />
        <circle cx="30" cy="-14" r="1.6" fill={INK} />
        <path d="M-23 -3 A23 20 0 0 1 23 -3 Z" fill="#64748b" stroke="#94a3b8" strokeWidth="1.5" />
        <path d="M-10 -3 L-6 -18 M10 -3 L6 -18 M-14 -12 H14" stroke="#94a3b8" strokeWidth="1.2" fill="none" />
        <path d="M38 -26 q3 5 0 7 q-3 -2 0 -7 z" fill="#7dd3fc">
          <animate attributeName="opacity" values="0;1;0" dur="1.6s" repeatCount="indefinite" />
        </path>
      </g>

      {/* rocket */}
      <g>
        <animateMotion dur="3.4s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.7;1" calcMode="linear" path={`M${x0 + 20} 192 H${x1 - 22}`} />
        <path d="M-70 0 H-34" stroke="#fde68a" strokeWidth="3" strokeDasharray="4 6" strokeLinecap="round" />
        <g transform="rotate(90)"><Rocket /></g>
      </g>
    </svg>
  )
}

/** 09 — 나만 타 본 종이배(데모) vs 낯선 사람을 태우는 배(서비스) */
export function BoatVsShipSvg() {
  const buoys = [
    { x: 434, t: "예외 처리" },
    { x: 501, t: "보안 · 권한" },
    { x: 568, t: "에러 기록" },
    { x: 635, t: "백업 · 운영" },
  ]
  const wave = (x: number, y: number, n: number) => `M${x} ${y} ${Array.from({ length: n }, () => "q10 -5 20 0 t20 0").join(" ")}`
  return (
    <svg viewBox="0 0 720 320" className="h-auto w-full" style={font} role="img" aria-label="데모는 혼자 타 본 종이배이고, 서비스는 구명튜브와 항해 일지를 갖추고 낯선 승객을 태우는 배다. 그 사이에 백 번의 질문이 있다">
      <defs>
        <marker id="bs-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="#6ee7b7" />
        </marker>
        <clipPath id="bs-sea"><rect x="340" y="0" width="372" height="320" rx="18" /></clipPath>
      </defs>

      {/* demo */}
      <text x="150" y="30" textAnchor="middle" fontSize="15" fontWeight="800" fill="#d1d5db">데모 — 나만 타 본 종이배</text>
      <text x="150" y="50" textAnchor="middle" fontSize="11.5" fill="#9ca3af">질문 5~10회 · “일단 떠요”</text>
      <ellipse cx="170" cy="232" rx="128" ry="34" fill="#38bdf8" fillOpacity="0.14" stroke="#38bdf8" strokeOpacity="0.35" />
      <g>
        <animateTransform attributeName="transform" type="rotate" values="-3 180 220;3 180 220;-3 180 220" dur="4s" repeatCount="indefinite" />
        <path d="M180 150 V206 H140 Z" fill="#f3f4f6" />
        <path d="M180 150 L220 206 H180 Z" fill="#cbd5e1" />
        <path d="M118 206 H242 L220 232 H140 Z" fill="#e5e7eb" />
        <path d="M118 206 H242" stroke="#94a3b8" strokeWidth="1.5" />
      </g>
      <path d="M150 240 q3 6 0 9 q-3 -3 0 -9 z" fill="#7dd3fc">
        <animate attributeName="opacity" values="0;1;0" dur="1.8s" repeatCount="indefinite" />
      </path>
      <text x="196" y="254" fontSize="11" fill="#7dd3fc">물이 새도 아무도 모른다</text>
      <Kid x={46} y={266} s={1.05} arm="wave" />

      {/* 100 questions */}
      <path d="M262 150 C290 110, 320 110, 344 140" fill="none" stroke="#6ee7b7" strokeWidth="2" strokeDasharray="5 6" markerEnd="url(#bs-arrow)">
        <animate attributeName="stroke-dashoffset" from="22" to="0" dur="1.2s" repeatCount="indefinite" />
      </path>
      <rect x="250" y="80" width="104" height="26" rx="13" fill={BG} stroke="#6ee7b7" strokeOpacity="0.7" />
      <text x="302" y="97" textAnchor="middle" fontSize="12" fontWeight="800" fill="#a7f3d0">100번의 질문</text>

      {/* service */}
      <text x="530" y="30" textAnchor="middle" fontSize="15" fontWeight="800" fill="#6ee7b7">서비스 — 낯선 사람을 태우는 배</text>
      <text x="530" y="50" textAnchor="middle" fontSize="11.5" fill="#9ca3af">질문 100회+ · “문제가 생기면 제가 고칩니다”</text>
      <g clipPath="url(#bs-sea)">
        <rect x="340" y="226" width="372" height="94" fill="#38bdf8" fillOpacity="0.12" />
        <path d={wave(300, 228, 12)} fill="none" stroke="#7dd3fc" strokeOpacity="0.7" strokeWidth="2">
          <animateTransform attributeName="transform" type="translate" from="0 0" to="40 0" dur="2.6s" repeatCount="indefinite" />
        </path>
      </g>
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="3.4s" repeatCount="indefinite" />
        {/* smoke */}
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={476 - i * 10} cy={86 - i * 10} r={6 + i * 2} fill="#9ca3af" opacity="0.35">
            <animate attributeName="opacity" values="0.05;0.45;0.05" dur="2.4s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
          </circle>
        ))}
        <rect x="470" y="98" width="20" height="36" rx="3" fill="#f472b6" />
        <rect x="470" y="104" width="20" height="7" fill="#fdf2f8" />
        {/* flag */}
        <path d="M640 92 V192" stroke="#e5e7eb" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M640 94 H688 L678 108 L688 122 H640 Z" fill="#34d399" />
        <text x="661" y="113" textAnchor="middle" fontSize="12" fontWeight="800" fill="#052e1a">책임</text>
        {/* bridge with captain */}
        <rect x="508" y="100" width="76" height="40" rx="8" fill="#eef2ff" />
        <rect x="518" y="108" width="56" height="26" rx="6" fill="#1e1b4b" />
        <circle cx="546" cy="126" r="9" fill={SKIN} />
        <path d="M535 119 H557 L554 111 H538 Z" fill="#f9fafb" stroke="#1e1b4b" />
        <circle cx="543" cy="126" r="1.3" fill={INK} /><circle cx="549" cy="126" r="1.3" fill={INK} />
        <path d="M543 130 Q546 132.5 549 130" stroke={INK} strokeWidth="1.2" fill="none" />
        {/* cabin with passengers */}
        <rect x="448" y="138" width="170" height="52" rx="8" fill="#e0e7ff" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <circle cx={474 + i * 40} cy="164" r="13" fill="#1e1b4b" stroke="#a5b4fc" strokeWidth="2" />
            <circle cx={474 + i * 40} cy="166" r="7.5" fill={["#fcd9b6", "#f1c27d", "#fde2c8", "#e0ac69"][i]} />
            <circle cx={471.5 + i * 40} cy="165" r="1.1" fill={INK} /><circle cx={476.5 + i * 40} cy="165" r="1.1" fill={INK} />
          </g>
        ))}
        {/* hull */}
        <path d="M394 190 H676 L646 244 H424 Z" fill="#1e293b" stroke="#34d399" strokeWidth="2" strokeLinejoin="round" />
        <path d="M401 202 H669" stroke="#34d399" strokeOpacity="0.5" strokeWidth="2" />
        {buoys.map((b) => (
          <g key={b.t}>
            <circle cx={b.x} cy="220" r="10" fill="none" stroke="#f9fafb" strokeWidth="5" />
            <circle cx={b.x} cy="220" r="10" fill="none" stroke="#ef4444" strokeWidth="5" strokeDasharray="7.85 7.85" />
          </g>
        ))}
      </g>
      {buoys.map((b) => (
        <g key={b.t}>
          <path d={`M${b.x} 234 V270`} stroke="#f9fafb" strokeOpacity="0.5" strokeDasharray="3 4" />
          <rect x={b.x - 31} y="270" width="62" height="24" rx="12" fill={BG} stroke="#fca5a5" strokeOpacity="0.7" />
          <text x={b.x} y="286" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#fecaca">{b.t}</text>
        </g>
      ))}
      <text x="530" y="312" textAnchor="middle" fontSize="10.5" fill="#9ca3af">구명튜브 하나하나가 AI에게 다시 묻고 검증한 흔적</text>
    </svg>
  )
}

function StepIcon({ i, c }: { i: number; c: string }) {
  const s = { fill: "none", stroke: c, strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
  if (i === 0) return <g {...s}><circle cx="-3" cy="-3" r="9" fill={c} fillOpacity="0.15" /><path d="M4 4 L12 12" strokeWidth="3.5" /><path d="M-6 -6 q3 -4 6 0 q0 3 -3 4 M-3 2 v0.5" strokeWidth="1.8" /></g>
  if (i === 1) return <g {...s}><rect x="-12" y="-11" width="24" height="22" rx="3" fill={c} fillOpacity="0.15" /><path d="M-12 -3 H12 M-4 -11 V11 M2 3 H8 M2 7 H6" strokeWidth="1.6" /></g>
  if (i === 2) return <g {...s}><path d="M-12 -10 H12 V5 H-2 L-8 11 V5 H-12 Z" fill={c} fillOpacity="0.15" /><path d="M0 -7 l1.6 3.2 3.2 1.6 -3.2 1.6 -1.6 3.2 -1.6 -3.2 -3.2 -1.6 3.2 -1.6 z" fill={c} stroke="none" /></g>
  if (i === 3) return <g {...s}><rect x="-10" y="-10" width="20" height="14" rx="2" fill={c} fillOpacity="0.15" /><path d="M-14 9 H14 L11 4 H-11 Z" /><path d="M-4 -3 l3 3 5 -6" strokeWidth="1.8" /></g>
  if (i === 4) return <g {...s}><circle cx="-6" cy="-5" r="4.5" fill={c} fillOpacity="0.15" /><circle cx="7" cy="-5" r="4.5" fill={c} fillOpacity="0.15" /><path d="M-13 10 q7 -10 13 0 M0 10 q7 -10 13 0" /></g>
  return <g transform="scale(0.62) rotate(35)"><Rocket color={c} /></g>
}

/** 11 — 6단계 여정 지도 */
export function JourneyMapSvg({ steps }: { steps: { title: string; week: string; output: string }[] }) {
  const colors = ["#c084fc", "#a78bfa", "#818cf8", "#38bdf8", "#2dd4bf", "#34d399"]
  const pts = [[84, 236], [196, 176], [310, 214], [424, 136], [540, 170], [644, 84]]
  const road = [[20, 262], ...pts].reduce((d, [x, y], i, arr) => {
    if (i === 0) return `M${x} ${y}`
    const [px, py] = arr[i - 1]
    const h = (x - px) / 2
    return `${d} C${px + h} ${py}, ${x - h} ${y}, ${x} ${y}`
  }, "")
  return (
    <svg viewBox="0 0 720 320" className="h-auto w-full" style={font} role="img" aria-label="문제 정의에서 시작해 기획, AI 프롬프팅, 프로토타입, 테스트를 거쳐 배포와 발표에 이르는 6단계 여정 지도">
      <defs>
        <linearGradient id="jm-road" x1="0" x2="1">
          {colors.map((c, i) => <stop key={c} offset={i / 5} stopColor={c} />)}
        </linearGradient>
      </defs>
      <Stars pts={[[60, 60], [150, 30], [270, 80], [360, 40], [500, 50], [330, 290], [600, 260], [690, 200]]} />
      {/* hills */}
      <path d="M0 320 V286 Q120 240 240 286 T480 270 T720 250 V320 Z" fill="#ffffff" fillOpacity="0.03" />
      <path d={road} fill="none" stroke="#1f2937" strokeWidth="20" strokeLinecap="round" />
      <path d={road} fill="none" stroke="url(#jm-road)" strokeWidth="20" strokeLinecap="round" strokeOpacity="0.22" />
      <path d={road} fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2" strokeDasharray="8 10">
        <animate attributeName="stroke-dashoffset" from="36" to="0" dur="1.6s" repeatCount="indefinite" />
      </path>
      <g>
        <animateMotion dur="12s" repeatCount="indefinite" path={road} />
        <circle r="6" fill="#fde68a" />
        <circle r="11" fill="#fde68a" opacity="0.25" />
      </g>
      <Kid x={30} y={262} s={0.72} arm="wave" />
      {steps.map((st, i) => {
        const [x, y] = pts[i]
        const c = colors[i]
        return (
          <g key={st.title}>
            <circle cx={x} cy={y} r="27" fill={BG} stroke={c} strokeWidth="2.5" />
            <g transform={`translate(${x} ${y})`}><StepIcon i={i} c={c} /></g>
            <circle cx={x - 20} cy={y - 20} r="10" fill={c} />
            <text x={x - 20} y={y - 16} textAnchor="middle" fontSize="11" fontWeight="800" fill="#0b0b12">{i + 1}</text>
            <text x={x} y={y + 46} textAnchor="middle" fontSize="13" fontWeight="800" fill="#f9fafb" stroke={BG} strokeWidth="5" style={halo}>{st.title}</text>
            <text x={x} y={y + 62} textAnchor="middle" fontSize="10.5" fill={c} stroke={BG} strokeWidth="4" style={halo}>{st.week} · {st.output}</text>
          </g>
        )
      })}
      <path d="M676 84 V40" stroke="#e5e7eb" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M676 42 H708 L700 52 L708 62 H676 Z" fill="#34d399" />
      <text x="690" y="56" textAnchor="middle" fontSize="9" fontWeight="800" fill="#052e1a">런칭</text>
      <Spark x={612} y={40} color="#6ee7b7" />
      <Spark x={702} y={96} color="#fde68a" delay={0.7} s={0.8} />
    </svg>
  )
}

/** 14 — 데모데이: 내 서비스를 발표하고, 사람들이 직접 접속해 본다 */
export function DemoDaySvg() {
  const crowd = [
    { x: 226, c: "#f1c27d", h: "#7c3aed" }, { x: 282, c: "#fcd9b6", h: "#0ea5e9" }, { x: 338, c: "#e0ac69", h: "#f59e0b" },
    { x: 394, c: "#fde2c8", h: "#ec4899" }, { x: 450, c: "#fcd9b6", h: "#10b981" }, { x: 506, c: "#f1c27d", h: "#f97316" },
  ]
  return (
    <svg viewBox="0 0 720 320" className="h-auto w-full" style={font} role="img" aria-label="데모데이. 학생이 큰 화면에 자신이 배포한 서비스를 띄워 발표하고, 관객들은 휴대폰으로 직접 접속해 하트를 보낸다. 옆에는 세특과 포트폴리오 폴더가 쌓인다">
      <defs>
        <linearGradient id="dd-light" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#a78bfa" stopOpacity="0.28" />
          <stop offset="1" stopColor="#a78bfa" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M300 0 L190 250 H530 L420 0 Z" fill="url(#dd-light)" />
      {/* screen */}
      <rect x="216" y="26" width="288" height="168" rx="14" fill={BG} stroke="#a78bfa" strokeWidth="2" />
      <rect x="216" y="26" width="288" height="26" rx="13" fill="#a78bfa" fillOpacity="0.16" />
      <rect x="262" y="31" width="170" height="16" rx="8" fill="#ffffff" fillOpacity="0.08" />
      <text x="347" y="43" textAnchor="middle" fontSize="10" fontWeight="700" fill="#ddd6fe">my-app.vercel.app</text>
      <rect x="448" y="31" width="44" height="16" rx="8" fill="#ef4444" />
      <circle cx="458" cy="39" r="3" fill="#ffffff"><animate attributeName="opacity" values="1;0.2;1" dur="1.2s" repeatCount="indefinite" /></circle>
      <text x="475" y="43" textAnchor="middle" fontSize="9" fontWeight="800" fill="#ffffff">LIVE</text>
      <rect x="232" y="64" width="256" height="40" rx="10" fill="#a78bfa" fillOpacity="0.3" />
      <rect x="246" y="76" width="110" height="9" rx="4.5" fill="#ffffff" fillOpacity="0.85" />
      <rect x="246" y="90" width="70" height="5" rx="2.5" fill="#ffffff" fillOpacity="0.4" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={232 + i * 88} y="114" width="80" height="66" rx="10" fill="#ffffff" fillOpacity="0.06" stroke="#ffffff" strokeOpacity="0.14" />
          <rect x={240 + i * 88} y="122" width="64" height="30" rx="6" fill={["#f472b6", "#38bdf8", "#fbbf24"][i]} fillOpacity="0.45" />
          <rect x={240 + i * 88} y="160" width="44" height="5" rx="2.5" fill="#e5e7eb" fillOpacity="0.7" />
          <rect x={240 + i * 88} y="169" width="28" height="4" rx="2" fill="#6b7280" />
        </g>
      ))}
      <path d="M350 194 V214 M370 194 V214 M330 216 H390" stroke="#6b7280" strokeWidth="3" strokeLinecap="round" />

      {/* stage */}
      <path d="M40 250 H680" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="2" />
      <Kid x={150} y={250} s={1.5} arm="point" />
      <path d="M52 150 a12 12 0 0 1 12 -12 H148 a12 12 0 0 1 12 12 V160 a12 12 0 0 1 -12 12 H130 L122 184 L120 172 H64 a12 12 0 0 1 -12 -12 Z" fill="#a78bfa" fillOpacity="0.18" stroke="#a78bfa" strokeWidth="1.3" transform="translate(-20 -36)" />
      <text x="86" y="124" textAnchor="middle" fontSize="11" fontWeight="800" fill="#ffffff">“지금 접속해 보세요”</text>
      <Robo x={566} y={244} s={1.15} arm="cheer" flip />

      {/* portfolio folder */}
      <g transform="translate(608 96)">
        <rect x="6" y="-16" width="62" height="50" rx="4" fill="#f9fafb" transform="rotate(-8 37 9)" />
        <rect x="14" y="-12" width="62" height="50" rx="4" fill="#e0e7ff" transform="rotate(5 45 13)" />
        <path d="M0 4 H30 L38 12 H88 V64 H0 Z" fill="#fbbf24" />
        <path d="M0 22 H88 V64 H0 Z" fill="#f59e0b" />
        <text x="44" y="42" textAnchor="middle" fontSize="12" fontWeight="800" fill="#451a03">세특</text>
        <text x="44" y="57" textAnchor="middle" fontSize="10" fontWeight="700" fill="#451a03">포트폴리오</text>
      </g>
      <Spark x={612} y={84} color="#fde68a" />

      {/* crowd */}
      {crowd.map((p, i) => (
        <g key={p.x}>
          <path d={`M${p.x - 26} 324 q26 -44 52 0 z`} fill="#1e1b4b" stroke="#4c1d95" />
          <circle cx={p.x} cy="278" r="17" fill={p.c} />
          <path d={`M${p.x - 17.5} 278 C${p.x - 20} 252, ${p.x + 20} 252, ${p.x + 17.5} 278 C${p.x + 10} 264, ${p.x - 10} 264, ${p.x - 17.5} 278 Z`} fill={p.h} />
          {i % 2 === 1 && (
            <g>
              <rect x={p.x + 18} y="262" width="16" height="28" rx="4" fill="#0b0b12" stroke="#c4b5fd" strokeWidth="1.5" />
              <rect x={p.x + 21} y="266" width="10" height="14" rx="2" fill="#a78bfa" fillOpacity="0.7" />
            </g>
          )}
          <Heart x={p.x + (i % 2 ? 26 : 0)} y={240 - (i % 3) * 6} s={0.8} delay={i * 0.4} color={["#f472b6", "#fb7185", "#c084fc"][i % 3]} />
        </g>
      ))}
    </svg>
  )
}
