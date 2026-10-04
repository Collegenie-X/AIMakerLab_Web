/**
 * 코딩 · 기능 설명 구간의 제품 목업 일러스트.
 * 실제 도구 화면(AI 스튜디오, 배포 대시보드, 개발자 도구, Django 관리자, 웹·앱)을
 * 창 프레임 · 그림자 · 문법 강조 코드로 재현합니다. (viewBox 가로 960)
 */

const font = { fontFamily: "inherit" }
const mono = { fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", whiteSpace: "pre" as const }
const PANEL = "#0e0e18"

export const C = {
  kw: "#c084fc", fn: "#7dd3fc", str: "#86efac", num: "#fdba74", com: "#6b7280",
  tag: "#f9a8d4", attr: "#fde68a", def: "#e5e7eb", dim: "#9ca3af",
}
export type Seg = string | [string, keyof typeof C]

export function Defs({ id }: { id: string }) {
  return (
    <defs>
      <filter id={`${id}-shadow`} x="-10%" y="-10%" width="120%" height="135%">
        <feDropShadow dx="0" dy="16" stdDeviation="18" floodColor="#000000" floodOpacity="0.6" />
      </filter>
      <filter id={`${id}-soft`} x="-20%" y="-20%" width="140%" height="150%">
        <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000000" floodOpacity="0.5" />
      </filter>
      <filter id={`${id}-blur`}><feGaussianBlur stdDeviation="28" /></filter>
      <linearGradient id={`${id}-bar`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#2a2a3d" />
        <stop offset="1" stopColor="#191926" />
      </linearGradient>
      <linearGradient id={`${id}-brand`} x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#8b5cf6" />
        <stop offset="1" stopColor="#38bdf8" />
      </linearGradient>
      <linearGradient id={`${id}-glass`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#1c1c2b" />
        <stop offset="1" stopColor="#101019" />
      </linearGradient>
    </defs>
  )
}

/** 창 프레임 */
export function Win({ id, x, y, w, h, title, children }: { id: string; x: number; y: number; w: number; h: number; title: string; children?: React.ReactNode }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="12" fill={PANEL} filter={`url(#${id}-shadow)`} />
      <rect x={x} y={y} width={w} height={h} rx="12" fill={PANEL} stroke="#ffffff" strokeOpacity="0.16" />
      <path d={`M${x} ${y + 34} V${y + 12} a12 12 0 0 1 12 -12 H${x + w - 12} a12 12 0 0 1 12 12 V${y + 34} Z`} fill={`url(#${id}-bar)`} />
      <path d={`M${x} ${y + 34} H${x + w}`} stroke="#ffffff" strokeOpacity="0.1" />
      {["#f87171", "#fbbf24", "#34d399"].map((c, i) => <circle key={c} cx={x + 18 + i * 14} cy={y + 17} r="4.5" fill={c} />)}
      <text x={x + w / 2} y={y + 21} textAnchor="middle" fontSize="11" fill="#9ca3af">{title}</text>
      {children}
    </g>
  )
}

export function Code({ x, y, lines, lh = 18, size = 10.5, numbers = true }: { x: number; y: number; lines: Seg[][]; lh?: number; size?: number; numbers?: boolean }) {
  return (
    <g fontSize={size} style={mono}>
      {lines.map((segs, i) => (
        <g key={i}>
          {numbers && <text x={x + 14} y={y + i * lh} textAnchor="end" fill="#4b5563">{i + 1}</text>}
          <text x={x + (numbers ? 28 : 0)} y={y + i * lh} fill={C.def}>
            {segs.map((s, k) => (typeof s === "string" ? s : <tspan key={k} fill={C[s[1]]}>{s[0]}</tspan>))}
          </text>
        </g>
      ))}
    </g>
  )
}

const courses = [
  { t: "AI 동화책", m: "중1~2 · 3시간", c: "#c084fc" },
  { t: "AI 영어 튜터", m: "중3~고1 · 6시간", c: "#38bdf8" },
  { t: "감정 방탈출", m: "고2~3 · 12시간", c: "#f472b6" },
  { t: "AI 작곡가", m: "심화 · 16시간", c: "#fbbf24" },
]

function HeartIcon({ x, y, on, s = 0.62 }: { x: number; y: number; on?: boolean; s?: number }) {
  return (
    <path transform={`translate(${x} ${y}) scale(${s})`} d="M0 7 C-14 -3, -7 -14, 0 -6 C7 -14, 14 -3, 0 7 Z" fill={on ? "#f472b6" : "none"} stroke={on ? "#f472b6" : "#6b7280"} strokeWidth="2.2" />
  )
}

/** 앱 화면의 수업 카드 — 세로형 / 가로형 */
function CourseCard({ x, y, w, h, i, fav = false, row = false }: { x: number; y: number; w: number; h: number; i: number; fav?: boolean; row?: boolean }) {
  const c = courses[i % courses.length]
  const tw = row ? h - 12 : w - 12
  const th = row ? h - 12 : Math.round(h * 0.46)
  const tx = row ? x + tw + 16 : x + 8
  const ty = row ? y + h / 2 - 3 : y + th + 22
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="10" fill="#ffffff" fillOpacity="0.055" stroke="#ffffff" strokeOpacity="0.12" />
      <rect x={x + 6} y={y + 6} width={tw} height={th} rx="7" fill={c.c} fillOpacity="0.38" />
      <circle cx={x + 6 + tw * 0.7} cy={y + 6 + th * 0.55} r={th * 0.28} fill={c.c} fillOpacity="0.55" />
      <path d={`M${x + 6 + tw * 0.14} ${y + 6 + th * 0.8} l${tw * 0.16} ${-th * 0.36} ${tw * 0.14} ${th * 0.2} ${tw * 0.1} ${-th * 0.12} ${tw * 0.14} ${th * 0.28} z`} fill="#ffffff" fillOpacity="0.5" />
      <text x={tx} y={ty} fontSize="10.5" fontWeight="700" fill="#f9fafb">{c.t}</text>
      <text x={tx} y={ty + 14} fontSize="8.5" fill="#9ca3af">{c.m}</text>
      <HeartIcon x={x + w - 14} y={row ? y + h / 2 : y + h - 13} on={fav} />
    </g>
  )
}

function Chips({ x, y, w = 54 }: { x: number; y: number; w?: number }) {
  return (
    <g>
      {["전체", "중1~2", "중3~고1", "고2~3"].map((g, i) => (
        <g key={g}>
          <rect x={x + i * (w + 6)} y={y} width={w} height="20" rx="10" fill={i === 0 ? "#a78bfa" : "#ffffff"} fillOpacity={i === 0 ? 1 : 0.07} />
          <text x={x + i * (w + 6) + w / 2} y={y + 14} textAnchor="middle" fontSize="9.5" fontWeight="700" fill={i === 0 ? "#0b0b12" : "#d1d5db"}>{g}</text>
        </g>
      ))}
    </g>
  )
}

type Phase = { key: string; name: string; period: string; color: string; steps: { title: string; sub: string }[] }

function StepThumb({ i, c }: { i: number; c: string }) {
  const s = { fill: "none", stroke: c, strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
  switch (i) {
    case 0:
      return <g {...s}><path d="M-16 -13 H16 V5 H-3 L-10 12 V5 H-16 Z" fill={c} fillOpacity="0.18" /><path d="M0 -10 l2 4.4 4.4 2 -4.4 2 -2 4.4 -2 -4.4 -4.4 -2 4.4 -2 z" fill={c} stroke="none" /></g>
    case 1:
      return <g {...s}><path d="M-7 -9 L-15 0 L-7 9 M7 -9 L15 0 L7 9 M3 -12 L-3 12" /></g>
    case 2:
      return <g {...s}><path d="M-12 -15 H5 L13 -7 V15 H-12 Z" fill={c} fillOpacity="0.18" /><path d="M-4 -4 q-3 0 -2 3 q0 2 -2 2 q2 0 2 2 q-1 3 2 3 M4 -4 q3 0 2 3 q0 2 2 2 q-2 0 -2 2 q1 3 -2 3" strokeWidth="1.6" /></g>
    case 3:
      return <g {...s}><rect x="-17" y="-13" width="34" height="26" rx="5" fill={c} fillOpacity="0.18" /><path d="M-17 -5 H17" /><path d="M0 0 L7 9 H-7 Z" fill={c} stroke="none" /></g>
    case 4:
      return <g {...s}><rect x="-15" y="-15" width="30" height="30" rx="4" fill={c} fillOpacity="0.18" /><path d="M-15 -6 H15 M-9 1 H7 M-9 8 H3" /><circle cx="-9" cy="-10.5" r="1.6" fill={c} stroke="none" /></g>
    case 5:
      return <g {...s}><rect x="-17" y="-14" width="34" height="28" rx="4" fill={c} fillOpacity="0.18" /><path d="M-17 -6 H17" strokeWidth="4" /><path d="M-11 1 H3 M-11 8 H-1" strokeWidth="1.6" /><circle cx="10" cy="1" r="2" fill={c} stroke="none" /><circle cx="10" cy="8" r="2" fill="#f87171" stroke="none" /></g>
    case 6:
      return (
        <g {...s}>
          <rect x="-17" y="-9" width="34" height="18" rx="9" fill={c} fillOpacity="0.18" />
          <circle cx="-8" cy="0" r="6" fill={c} stroke="none">
            <animate attributeName="cx" values="-8;-8;8;8;-8" keyTimes="0;0.4;0.5;0.9;1" dur="5s" repeatCount="indefinite" />
          </circle>
        </g>
      )
    default:
      return <g {...s}><path d="M0 -17 C8 -10, 9 2, 6 9 H-6 C-9 2, -8 -10, 0 -17 Z" fill={c} fillOpacity="0.18" /><circle cx="0" cy="-4" r="3" /><path d="M-6 5 L-12 13 L-6 11 M6 5 L12 13 L6 11 M-2 13 q2 6 4 0" /></g>
  }
}

/** 05 — 실무 2단계 파이프라인 */
export function PipelineSvg({ phases }: { phases: Phase[] }) {
  const id = "pl"
  const [front, back] = phases
  const xs = [130, 363, 597, 830]
  const NW = 204
  const lane = (p: Phase, y: number, h: number, offset: number, loop: boolean) => (
    <g>
      <rect x="12" y={y} width="936" height={h} rx="24" fill={p.color} fillOpacity="0.045" stroke={p.color} strokeOpacity="0.3" />
      <rect x="32" y={y + 16} width="8" height="18" rx="4" fill={p.color} />
      <text x="50" y={y + 30} fontSize="13" fontWeight="800" letterSpacing="1.5" fill={p.color}>{p.name}</text>
      <text x="928" y={y + 30} textAnchor="end" fontSize="11.5" fill="#9ca3af">{p.period}</text>
      {p.steps.map((s, i) => {
        const cx = xs[i]
        const ny = y + 52
        return (
          <g key={s.title}>
            {i < 3 && <path d={`M${cx + NW / 2 + 3} ${ny + 38} H${xs[i + 1] - NW / 2 - 8}`} stroke={p.color} strokeWidth="2.2" markerEnd={`url(#${id}-arrow-${p.key})`} />}
            <rect x={cx - NW / 2} y={ny} width={NW} height="76" rx="16" fill={`url(#${id}-glass)`} filter={`url(#${id}-soft)`} />
            <rect x={cx - NW / 2} y={ny} width={NW} height="76" rx="16" fill="none" stroke={p.color} strokeWidth="1.6" strokeOpacity="0.9" />
            <rect x={cx - NW / 2 + 10} y={ny + 10} width="56" height="56" rx="12" fill={p.color} fillOpacity="0.1" />
            <g transform={`translate(${cx - NW / 2 + 38} ${ny + 38})`}><StepThumb i={offset + i} c={p.color} /></g>
            <circle cx={cx - NW / 2 + 4} cy={ny + 4} r="11" fill={p.color} />
            <text x={cx - NW / 2 + 4} y={ny + 8} textAnchor="middle" fontSize="11" fontWeight="800" fill="#0b0b12">{offset + i + 1}</text>
            <text x={cx - NW / 2 + 78} y={ny + 34} fontSize="14" fontWeight="800" fill="#f9fafb">{s.title}</text>
            <text x={cx - NW / 2 + 78} y={ny + 53} fontSize="10.5" fill="#9ca3af">{s.sub}</text>
          </g>
        )
      })}
      {loop && (
        <g>
          <path d={`M${xs[3]} ${y + 132} C${xs[3]} ${y + 174}, ${xs[0]} ${y + 174}, ${xs[0]} ${y + 136}`} fill="none" stroke={p.color} strokeWidth="1.8" strokeDasharray="5 6" markerEnd={`url(#${id}-arrow-${p.key})`}>
            <animate attributeName="stroke-dashoffset" from="0" to="-110" dur="3s" repeatCount="indefinite" />
          </path>
          <circle r="4.5" fill="#f5f3ff">
            <animateMotion dur="3.2s" repeatCount="indefinite" path={`M${xs[3]} ${y + 132} C${xs[3]} ${y + 174}, ${xs[0]} ${y + 174}, ${xs[0]} ${y + 136}`} />
          </circle>
          <rect x="372" y={y + 150} width="216" height="24" rx="12" fill="#0b0b12" stroke={p.color} strokeOpacity="0.6" />
          <text x="480" y={y + 166} textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#ddd6fe">피드백 → 다시 프롬프트 · 하루 N회</text>
        </g>
      )}
    </g>
  )
  return (
    <svg viewBox="0 0 960 560" className="h-auto w-full" style={font} role="img" aria-label="프론트 퍼스트 4단계를 피드백으로 반복한 뒤 화면을 확정하고, JSON 스키마를 바탕으로 Django 백엔드 4단계를 거쳐 웹과 앱으로 출시하는 흐름">
      <Defs id={id} />
      <defs>
        {phases.map((p) => (
          <marker key={p.key} id={`${id}-arrow-${p.key}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill={p.color} />
          </marker>
        ))}
        <linearGradient id={`${id}-gate`} x1="0" x2="1">
          <stop offset="0" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#34d399" />
        </linearGradient>
      </defs>
      {lane(front, 10, 190, 0, true)}

      <path d="M480 200 V318" stroke={`url(#${id}-gate)`} strokeWidth="2" strokeDasharray="4 5" />
      <rect x="290" y="226" width="380" height="64" rx="32" fill="#0b0b12" filter={`url(#${id}-soft)`} />
      <rect x="290" y="226" width="380" height="64" rx="32" fill="#0b0b12" stroke={`url(#${id}-gate)`} strokeWidth="2.2" />
      <circle cx="326" cy="258" r="15" fill={`url(#${id}-gate)`} />
      <path d="M319 258 l5 5 9 -11" stroke="#0b0b12" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="354" y="254" fontSize="15" fontWeight="800" fill="#ffffff">화면 · 흐름 확정 (Freeze)</text>
      <text x="354" y="274" fontSize="11.5" fill="#d1d5db">다듬어진 JSON 구조 = Django 모델 설계도</text>
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0; 0 118; 0 118" keyTimes="0;0.7;1" dur="3.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.75;1" dur="3.6s" repeatCount="indefinite" />
        <rect x="720" y="204" width="76" height="32" rx="8" fill="#fbbf24" fillOpacity="0.16" stroke="#fbbf24" />
        <text x="758" y="225" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fde68a" style={mono}>{"{ JSON }"}</text>
      </g>

      {lane(back, 320, 150, 4, false)}

      <path d={`M${xs[3]} 448 V496 H752`} stroke="#34d399" strokeWidth="1.8" fill="none" markerEnd={`url(#${id}-arrow-back)`} />
      <text x="330" y="501" textAnchor="end" fontSize="13" fontWeight="800" fill="#9ca3af">출시</text>
      {[
        { x: 346, label: "웹 서비스 · Vercel", c: "#e5e7eb" },
        { x: 550, label: "앱 · React Native", c: "#f472b6" },
      ].map((b) => (
        <g key={b.label}>
          <rect x={b.x} y="478" width="190" height="36" rx="18" fill={`url(#${id}-glass)`} stroke={b.c} strokeOpacity="0.7" />
          <circle cx={b.x + 22} cy="496" r="5" fill={b.c} />
          <text x={b.x + 104} y="501" textAnchor="middle" fontSize="13" fontWeight="700" fill={b.c}>{b.label}</text>
        </g>
      ))}
      <text x="480" y="546" textAnchor="middle" fontSize="11.5" fill="#6b7280">각 단계는 AI와 수십 번 대화하며 검증 — 서비스 수준까지 약 100회</text>
    </svg>
  )
}

/** 06 — AI 스튜디오: 채팅 · 코드 · 미리보기 3분할 화면 */
export function StudioMockSvg() {
  const id = "st"
  const code: Seg[][] = [
    [["export default function", "kw"], " ", ["Courses", "fn"], "() {"],
    ["  ", ["const", "kw"], " [grade, setGrade] = ", ["useState", "fn"], "(", ["\"전체\"", "str"], ")"],
    ["  ", ["const", "kw"], " list = courses.", ["filter", "fn"], "(", ["byGrade", "fn"], "(grade))"],
    [""],
    ["  ", ["return", "kw"], " ("],
    ["    <", ["main", "tag"], " ", ["className", "attr"], "=", ["\"grid gap-4\"", "str"], ">"],
    ["      <", ["GradeFilter", "tag"], " ", ["value", "attr"], "={grade} />"],
    ["      {list.", ["map", "fn"], "((c) => ("],
    ["        <", ["CourseCard", "tag"], " ", ["key", "attr"], "={c.id} {...c} />"],
    ["      ))}"],
    ["      <", ["Button", "tag"], " ", ["size", "attr"], "=", ["\"lg\"", "str"], " ", ["color", "attr"], "=", ["\"violet\"", "str"], ">"],
    ["        수강 신청"],
    ["      </", ["Button", "tag"], ">"],
    ["    </", ["main", "tag"], ">"],
    ["  )"],
    ["}"],
  ]
  return (
    <svg viewBox="0 0 960 480" className="h-auto w-full" style={font} role="img" aria-label="AI 스튜디오 화면. 왼쪽 채팅에 요청을 쓰면 가운데에 코드가 만들어지고 오른쪽 미리보기에 수업 목록 화면이 바로 나타난다">
      <Defs id={id} />
      <ellipse cx="780" cy="260" rx="170" ry="150" fill="#8b5cf6" opacity="0.28" filter={`url(#${id}-blur)`} />
      <Win id={id} x={16} y={14} w={928} h={446} title="AI Studio — courses-app">
        {/* chat */}
        <path d="M16 48 H296 V448 a0 0 0 0 1 0 0 H28 a12 12 0 0 1 -12 -12 Z" fill="#12121d" />
        <path d="M296 48 V460 M620 48 V460" stroke="#ffffff" strokeOpacity="0.09" />
        <text x="32" y="70" fontSize="10.5" fontWeight="800" letterSpacing="1.2" fill="#6b7280">CHAT</text>
        <rect x="74" y="82" width="206" height="50" rx="14" fill="#8b5cf6" fillOpacity="0.28" stroke="#a78bfa" strokeOpacity="0.5" />
        <text x="88" y="103" fontSize="11.5" fill="#ffffff">수업 목록을 카드형으로 만들고</text>
        <text x="88" y="121" fontSize="11.5" fill="#ffffff">학년 필터도 넣어 줘</text>
        <circle cx="40" cy="158" r="10" fill={`url(#${id}-brand)`} />
        <path d="M40 152 l1.6 3.6 3.6 1.6 -3.6 1.6 -1.6 3.6 -1.6 -3.6 -3.6 -1.6 3.6 -1.6 z" fill="#ffffff" />
        <rect x="58" y="144" width="222" height="106" rx="14" fill="#ffffff" fillOpacity="0.055" stroke="#ffffff" strokeOpacity="0.08" />
        <text x="72" y="165" fontSize="11" fill="#e5e7eb">화면을 만들었어요. 변경 사항:</text>
        {["CourseCard.tsx 생성", "학년 필터 칩 4개 추가", "data/courses.json 연결"].map((t, i) => (
          <g key={t}>
            <circle cx="78" cy={182 + i * 18} r="6" fill="#34d399" fillOpacity="0.2" />
            <path d={`M75 ${182 + i * 18} l2.2 2.2 4 -4.6`} stroke="#34d399" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            <text x="92" y={186 + i * 18} fontSize="10.5" fill="#d1d5db">{t}</text>
          </g>
        ))}
        <text x="72" y="241" fontSize="9.5" fill="#6b7280" style={mono}>3 files changed  <tspan fill="#34d399">+84</tspan> <tspan fill="#f87171">-2</tspan></text>
        <rect x="118" y="262" width="162" height="32" rx="14" fill="#8b5cf6" fillOpacity="0.28" stroke="#a78bfa" strokeOpacity="0.5" />
        <text x="132" y="282" fontSize="11.5" fill="#ffffff">버튼은 보라색으로, 크게</text>
        <circle cx="40" cy="320" r="10" fill={`url(#${id}-brand)`} />
        <path d="M40 314 l1.6 3.6 3.6 1.6 -3.6 1.6 -1.6 3.6 -1.6 -3.6 -3.6 -1.6 3.6 -1.6 z" fill="#ffffff" />
        <rect x="58" y="306" width="132" height="30" rx="14" fill="#ffffff" fillOpacity="0.055" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={74 + i * 11} cy="321" r="3" fill="#c4b5fd">
            <animate attributeName="opacity" values="0.2;1;0.2" dur="1.2s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
          </circle>
        ))}
        <text x="110" y="325" fontSize="10.5" fill="#9ca3af">page.tsx 수정 중</text>
        <rect x="28" y="408" width="256" height="38" rx="19" fill="#ffffff" fillOpacity="0.05" stroke="#ffffff" strokeOpacity="0.14" />
        <text x="46" y="431" fontSize="11" fill="#6b7280">무엇을 바꿀까요?</text>
        <circle cx="262" cy="427" r="13" fill={`url(#${id}-brand)`} />
        <path d="M262 433 V421 M257 426 L262 421 L267 426" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />

        {/* code */}
        <rect x="297" y="48" width="322" height="28" fill="#0a0a12" />
        <rect x="297" y="48" width="92" height="28" fill={PANEL} />
        <rect x="297" y="48" width="92" height="2" fill="#a78bfa" />
        <text x="343" y="66" textAnchor="middle" fontSize="10.5" fill="#f3f4f6" style={mono}>page.tsx</text>
        <text x="448" y="66" textAnchor="middle" fontSize="10.5" fill="#6b7280" style={mono}>CourseCard.tsx</text>
        <rect x="297" y="267" width="322" height="54" fill="#34d399" fillOpacity="0.1" />
        <rect x="297" y="267" width="3" height="54" fill="#34d399" />
        <Code x={304} y={98} lines={code} />
        <rect x="576" y="268" width="2" height="13" fill="#f9fafb">
          <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
        </rect>
        <path d="M297 402 H619" stroke="#ffffff" strokeOpacity="0.09" />
        <text x="310" y="424" fontSize="10" fill="#34d399" style={mono}>▲ Ready in 1.2s</text>
        <text x="310" y="442" fontSize="10" fill="#6b7280" style={mono}>○ Compiled /courses in 214ms</text>

        {/* preview */}
        <rect x="634" y="58" width="296" height="22" rx="11" fill="#ffffff" fillOpacity="0.06" />
        <circle cx="648" cy="69" r="3.5" fill="#34d399" />
        <text x="660" y="73" fontSize="10" fill="#9ca3af" style={mono}>localhost:3000/courses</text>
        <rect x="634" y="90" width="296" height="356" rx="12" fill="#14141f" stroke="#ffffff" strokeOpacity="0.1" />
        <text x="650" y="118" fontSize="15" fontWeight="800" fill="#ffffff">수업 찾기</text>
        <text x="650" y="134" fontSize="9.5" fill="#9ca3af">나에게 맞는 AI 프로젝트를 골라 보세요</text>
        <Chips x={650} y={146} w={60} />
        <CourseCard x={650} y={178} w={126} h={94} i={0} />
        <CourseCard x={788} y={178} w={126} h={94} i={1} fav />
        <CourseCard x={650} y={282} w={126} h={94} i={2} />
        <CourseCard x={788} y={282} w={126} h={94} i={3} />
        <rect x="650" y="390" width="264" height="40" rx="20" fill={`url(#${id}-brand)`}>
          <animate attributeName="opacity" values="1;0.75;1" dur="2s" repeatCount="indefinite" />
        </rect>
        <text x="782" y="415" textAnchor="middle" fontSize="13" fontWeight="800" fill="#ffffff">수강 신청</text>
        <rect x="846" y="376" width="76" height="20" rx="10" fill="#34d399" />
        <text x="884" y="390" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#052e1a">방금 반영됨</text>
      </Win>
    </svg>
  )
}

/** 06 — Vercel 배포 대시보드: 브랜치마다 프리뷰 URL */
export function VercelDeploySvg() {
  const id = "vd"
  const rows = [
    { st: "Ready", sc: "#34d399", env: "Production", br: "main", msg: "merge: 즐겨찾기 기능", url: "courses-app.vercel.app", t: "2분 전", n: 0 },
    { st: "Ready", sc: "#34d399", env: "Preview", br: "feat-favorite", msg: "하트 버튼 + localStorage", url: "…-git-feat-favorite.vercel.app", t: "18분 전", n: 0 },
    { st: "Ready", sc: "#34d399", env: "Preview", br: "feat-filter", msg: "학년 필터 칩 추가", url: "…-git-feat-filter.vercel.app", t: "1시간 전", n: 2 },
    { st: "Ready", sc: "#34d399", env: "Preview", br: "feat-hero", msg: "첫 화면 문구 수정", url: "…-git-feat-hero.vercel.app", t: "3시간 전", n: 4 },
    { st: "Building", sc: "#fbbf24", env: "Preview", br: "feat-search", msg: "검색창 추가", url: "빌드 중…", t: "방금", n: 0 },
  ]
  return (
    <svg viewBox="0 0 960 440" className="h-auto w-full" style={font} role="img" aria-label="배포 대시보드. main 브랜치는 운영 주소로, 기능 브랜치들은 각각 프리뷰 주소로 자동 배포되고, 프리뷰 화면 위에는 팀의 피드백 댓글이 달린다">
      <Defs id={id} />
      <ellipse cx="800" cy="240" rx="150" ry="130" fill="#38bdf8" opacity="0.2" filter={`url(#${id}-blur)`} />
      <Win id={id} x={16} y={14} w={928} h={410} title="courses-app – Deployments">
        <path d="M34 78 L42 64 L50 78 Z" fill="#ffffff" />
        <text x="60" y="76" fontSize="14" fontWeight="800" fill="#ffffff">courses-app</text>
        {["Overview", "Deployments", "Analytics", "Settings"].map((t, i) => (
          <text key={t} x={196 + i * 92} y="76" fontSize="11.5" fontWeight={i === 1 ? 700 : 400} fill={i === 1 ? "#ffffff" : "#6b7280"}>{t}</text>
        ))}
        <rect x="286" y="88" width="76" height="2" fill="#ffffff" />
        <path d="M16 90 H944" stroke="#ffffff" strokeOpacity="0.09" />

        {rows.map((r, i) => {
          const y = 102 + i * 62
          const prod = r.env === "Production"
          return (
            <g key={r.br}>
              <rect x="28" y={y} width="624" height="54" rx="10" fill="#ffffff" fillOpacity={i === 2 ? 0.07 : 0.03} stroke={i === 2 ? "#38bdf8" : "#ffffff"} strokeOpacity={i === 2 ? 0.6 : 0.08} />
              <circle cx="46" cy={y + 22} r="4.5" fill={r.sc}>
                {r.st === "Building" && <animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" />}
              </circle>
              <text x="58" y={y + 26} fontSize="11.5" fontWeight="700" fill="#f3f4f6">{r.st}</text>
              <text x="58" y={y + 42} fontSize="9.5" fill="#6b7280">{r.t}</text>
              <rect x="124" y={y + 16} width="78" height="22" rx="11" fill={prod ? "#f9fafb" : "none"} stroke={prod ? "none" : "#6b7280"} />
              <text x="163" y={y + 31} textAnchor="middle" fontSize="10" fontWeight="700" fill={prod ? "#0b0b12" : "#d1d5db"}>{r.env}</text>
              <g fill="none" stroke="#9ca3af" strokeWidth="1.5">
                <circle cx="224" cy={y + 17} r="3" /><circle cx="224" cy={y + 33} r="3" /><circle cx="234" cy={y + 21} r="3" />
                <path d={`M224 ${y + 20} V${y + 30} M234 ${y + 24} q0 5 -10 6`} />
              </g>
              <text x="246" y={y + 24} fontSize="11" fontWeight="700" fill="#e5e7eb" style={mono}>{r.br}</text>
              <text x="246" y={y + 41} fontSize="10" fill="#9ca3af">{r.msg}</text>
              <text x="416" y={y + 31} fontSize="10" fill={r.st === "Building" ? "#fbbf24" : "#7dd3fc"} style={mono}>{r.url}</text>
              {r.n > 0 && (
                <g>
                  <path d={`M612 ${y + 18} h26 a4 4 0 0 1 4 4 v10 a4 4 0 0 1 -4 4 h-16 l-6 5 v-5 h-4 a4 4 0 0 1 -4 -4 v-10 a4 4 0 0 1 4 -4 z`} fill="#a78bfa" fillOpacity="0.25" stroke="#a78bfa" />
                  <text x="625" y={y + 31} textAnchor="middle" fontSize="10" fontWeight="800" fill="#ddd6fe">{r.n}</text>
                </g>
              )}
            </g>
          )
        })}

        {/* preview with comments */}
        <path d="M652 253 H676" stroke="#38bdf8" strokeOpacity="0.7" strokeDasharray="3 4" />
        <g transform="rotate(1.5 804 250)">
          <rect x="676" y="104" width="252" height="300" rx="14" fill="#14141f" filter={`url(#${id}-soft)`} />
          <rect x="676" y="104" width="252" height="300" rx="14" fill="#14141f" stroke="#38bdf8" strokeOpacity="0.7" strokeWidth="1.5" />
          <text x="692" y="128" fontSize="10.5" fontWeight="800" fill="#7dd3fc">Preview · feat-filter</text>
          <text x="912" y="128" textAnchor="end" fontSize="9.5" fill="#9ca3af">댓글 2</text>
          <path d="M676 138 H928" stroke="#ffffff" strokeOpacity="0.09" />
          <text x="692" y="162" fontSize="13" fontWeight="800" fill="#ffffff">수업 찾기</text>
          <Chips x={692} y={172} w={50} />
          <CourseCard x={692} y={204} w={106} h={86} i={0} />
          <CourseCard x={806} y={204} w={106} h={86} i={1} />
          <rect x="692" y="300" width="220" height="30" rx="15" fill="#8b5cf6" />
          <text x="802" y="320" textAnchor="middle" fontSize="11" fontWeight="800" fill="#ffffff">수강 신청</text>
          {[{ x: 906, y: 176, n: 1 }, { x: 704, y: 302, n: 2 }].map((p) => (
            <g key={p.n}>
              <circle cx={p.x} cy={p.y} r="11" fill="#f472b6" stroke="#ffffff" strokeWidth="2" />
              <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#ffffff">{p.n}</text>
            </g>
          ))}
          <rect x="700" y="340" width="216" height="52" rx="12" fill="#1f1f2e" stroke="#f472b6" strokeOpacity="0.7" />
          <circle cx="718" cy="358" r="8" fill="#fcd9b6" />
          <text x="732" y="362" fontSize="10" fontWeight="700" fill="#f9fafb">선생님 <tspan fill="#6b7280" fontWeight="400">· 방금</tspan></text>
          <text x="712" y="382" fontSize="10.5" fill="#e5e7eb">모바일에서 버튼이 너무 작아요</text>
        </g>
      </Win>
    </svg>
  )
}

/** 07 — 개발자 도구에서 본 localStorage: 서버 없이 저장되는 모습 */
export function DevtoolsSvg() {
  const id = "dt"
  const kv: { k: string; v: Seg[] }[] = [
    { k: "favs", v: ["[", ["2", "num"], "]"] },
    { k: "cart", v: ["[]"] },
    { k: "draft-review", v: ["{", ["\"courseId\"", "attr"], ":", ["2", "num"], ",", ["\"text\"", "attr"], ":", ["\"재밌어요!\"", "str"], "}"] },
    { k: "fake-user", v: ["{", ["\"name\"", "attr"], ":", ["\"테스트 학생\"", "str"], ",", ["\"role\"", "attr"], ":", ["\"student\"", "str"], "}"] },
    { k: "theme", v: [["\"dark\"", "str"]] },
  ]
  return (
    <svg viewBox="0 0 960 470" className="h-auto w-full" style={font} role="img" aria-label="브라우저 개발자 도구의 Application 탭. 수업 카드의 하트를 누르면 Local Storage의 favs 키에 값이 저장되고, 서버로 가는 API 요청은 0건이다">
      <Defs id={id} />
      <Win id={id} x={16} y={14} w={928} h={440} title="수업 찾기 — localhost:3000">
        <rect x="120" y="54" width="640" height="22" rx="11" fill="#ffffff" fillOpacity="0.06" />
        <circle cx="134" cy="65" r="3.5" fill="#34d399" />
        <text x="146" y="69" fontSize="10.5" fill="#d1d5db" style={mono}>localhost:3000/courses</text>
        <path d="M40 65 l-6 0 M34 65 l4 -4 M34 65 l4 4 M62 65 l6 0 M68 65 l-4 -4 M68 65 l-4 4" stroke="#6b7280" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M16 84 H944" stroke="#ffffff" strokeOpacity="0.09" />

        {/* page */}
        <rect x="17" y="85" width="926" height="150" fill="#12121c" />
        <text x="40" y="112" fontSize="15" fontWeight="800" fill="#ffffff">수업 찾기</text>
        <CourseCard x={40} y={124} w={200} h={96} i={0} row />
        <CourseCard x={252} y={124} w={200} h={96} i={1} row fav />
        <CourseCard x={464} y={124} w={200} h={96} i={2} row />
        <circle cx="438" cy="172" r="14" fill="none" stroke="#f472b6" strokeWidth="2">
          <animate attributeName="r" values="10;20;10" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0;0.9" dur="2s" repeatCount="indefinite" />
        </circle>
        <rect x="690" y="104" width="232" height="116" rx="14" fill="#34d399" fillOpacity="0.07" stroke="#34d399" strokeOpacity="0.5" />
        <text x="708" y="128" fontSize="10.5" fontWeight="800" letterSpacing="1" fill="#6ee7b7">NETWORK · API 요청</text>
        <text x="708" y="184" fontSize="50" fontWeight="800" fill="#ffffff">0<tspan fontSize="18" fill="#a7f3d0">건</tspan></text>
        <text x="708" y="206" fontSize="10.5" fill="#9ca3af">서버 없이 브라우저 안에서 동작</text>
        <g fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round">
          <rect x="858" y="150" width="46" height="14" rx="4" /><rect x="858" y="170" width="46" height="14" rx="4" />
          <path d="M850 142 L912 192" stroke="#f87171" strokeWidth="3" />
        </g>

        {/* devtools */}
        <rect x="17" y="235" width="926" height="26" fill="#1a1a27" />
        <path d="M16 235 H944 M16 261 H944" stroke="#ffffff" strokeOpacity="0.1" />
        {["Elements", "Console", "Sources", "Network", "Application", "Performance"].map((t, i) => (
          <text key={t} x={34 + i * 86} y="252" fontSize="10.5" fontWeight={i === 4 ? 700 : 400} fill={i === 4 ? "#7dd3fc" : "#9ca3af"}>{t}</text>
        ))}
        <rect x="372" y="259" width="74" height="2" fill="#38bdf8" />
        <path d="M232 261 V454" stroke="#ffffff" strokeOpacity="0.1" />
        <text x="32" y="282" fontSize="9.5" fontWeight="800" letterSpacing="1" fill="#6b7280">STORAGE</text>
        <text x="32" y="304" fontSize="10.5" fill="#e5e7eb">▾ Local Storage</text>
        <rect x="24" y="312" width="200" height="22" rx="5" fill="#38bdf8" fillOpacity="0.18" />
        <text x="48" y="327" fontSize="10" fill="#bae6fd" style={mono}>http://localhost:3000</text>
        {["▸ Session Storage", "▸ IndexedDB", "▸ Cookies", "▸ Cache Storage"].map((t, i) => (
          <text key={t} x="32" y={354 + i * 22} fontSize="10.5" fill="#9ca3af">{t}</text>
        ))}

        <rect x="233" y="262" width="710" height="24" fill="#ffffff" fillOpacity="0.04" />
        <text x="250" y="278" fontSize="10" fontWeight="700" fill="#9ca3af">Key</text>
        <text x="420" y="278" fontSize="10" fontWeight="700" fill="#9ca3af">Value</text>
        <path d="M404 262 V420" stroke="#ffffff" strokeOpacity="0.08" />
        {kv.map((r, i) => {
          const y = 286 + i * 27
          return (
            <g key={r.k}>
              {i === 0 && (
                <rect x="233" y={y} width="710" height="27" fill="#fbbf24" fillOpacity="0.16">
                  <animate attributeName="fill-opacity" values="0.3;0.08;0.3" dur="2s" repeatCount="indefinite" />
                </rect>
              )}
              <path d={`M233 ${y + 27} H944`} stroke="#ffffff" strokeOpacity="0.06" />
              <text x="250" y={y + 18} fontSize="10.5" fill={i === 0 ? "#fde68a" : "#e5e7eb"} fontWeight={i === 0 ? 700 : 400} style={mono}>{r.k}</text>
              <text x="420" y={y + 18} fontSize="10.5" fill="#e5e7eb" style={mono}>
                {r.v.map((s, k) => (typeof s === "string" ? s : <tspan key={k} fill={C[s[1]]}>{s[0]}</tspan>))}
              </text>
            </g>
          )
        })}
        {/* callout */}
        <path d="M438 190 C438 236, 470 262, 462 290" fill="none" stroke="#fbbf24" strokeWidth="1.8" strokeDasharray="4 5">
          <animate attributeName="stroke-dashoffset" from="18" to="0" dur="1s" repeatCount="indefinite" />
        </path>
        <circle cx="462" cy="294" r="3.5" fill="#fbbf24" />
        <rect x="486" y="288" width="246" height="23" rx="11.5" fill="#0b0b12" stroke="#fbbf24" strokeOpacity="0.8" />
        <text x="609" y="304" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#fde68a">하트를 누르면 여기에 바로 저장된다</text>
        <text x="250" y="442" fontSize="10" fill="#6b7280">새로고침해도 유지 · 이 브라우저에만 저장 · 약 5MB</text>
      </Win>
    </svg>
  )
}

/** 08 — admin.py 몇 줄이 Django 관리자 화면의 어느 부분이 되는지 */
export function AdminMockSvg() {
  const id = "am"
  const code: Seg[][] = [
    [["from", "kw"], " django.contrib ", ["import", "kw"], " admin"],
    [["from", "kw"], " .models ", ["import", "kw"], " Course"],
    [""],
    [["@admin.register", "fn"], "(Course)"],
    [["class", "kw"], " ", ["CourseAdmin", "attr"], "(admin.ModelAdmin):"],
    ["    list_display = [", ["\"title\"", "str"], ", ", ["\"grade\"", "str"], ","],
    ["                    ", ["\"hours\"", "str"], ", ", ["\"is_open\"", "str"], "]"],
    ["    list_filter = [", ["\"grade\"", "str"], ", ", ["\"is_open\"", "str"], "]"],
    ["    search_fields = [", ["\"title\"", "str"], "]"],
    ["    list_editable = [", ["\"is_open\"", "str"], "]"],
  ]
  const marks = [
    { n: 1, c: "#f59e0b", y: 157, h: 38 },
    { n: 2, c: "#ec4899", y: 195, h: 19 },
    { n: 3, c: "#0ea5e9", y: 214, h: 19 },
    { n: 4, c: "#10b981", y: 233, h: 19 },
  ]
  const rows = [
    { t: "AI 동화책", g: "중1~2", h: "3", on: true },
    { t: "화상 영어 AI 튜터", g: "중3~고1", h: "6", on: true },
    { t: "감정 방탈출 게임", g: "고2~3", h: "12", on: true },
    { t: "AI 작곡가", g: "심화", h: "16", on: false },
  ]
  const badge = (x: number, y: number, n: number, c: string) => (
    <g>
      <circle cx={x} cy={y} r="10" fill={c} stroke="#ffffff" strokeWidth="2" />
      <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fontWeight="800" fill="#ffffff">{n}</text>
    </g>
  )
  return (
    <svg viewBox="0 0 960 480" className="h-auto w-full" style={font} role="img" aria-label="admin.py 코드 열 줄과 그 결과로 만들어진 Django 관리자 화면. list_display는 표의 열, list_filter는 오른쪽 필터, search_fields는 검색창, list_editable은 바로 수정하는 체크박스가 된다">
      <Defs id={id} />
      <defs>
        <clipPath id={`${id}-clip`}><rect x="410" y="58" width="534" height="398" rx="0" /></clipPath>
        <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="#34d399" />
        </marker>
      </defs>
      <ellipse cx="680" cy="260" rx="240" ry="160" fill="#34d399" opacity="0.14" filter={`url(#${id}-blur)`} />

      {/* editor */}
      <Win id={id} x={16} y={24} w={372} h={290} title="courses/admin.py">
        {marks.map((m) => (
          <g key={m.n}>
            <rect x="17" y={m.y} width="370" height={m.h} fill={m.c} fillOpacity="0.14" />
            <rect x="17" y={m.y} width="3" height={m.h} fill={m.c} />
            {badge(370, m.y + m.h / 2, m.n, m.c)}
          </g>
        ))}
        <Code x={24} y={76} lines={code} lh={19} />
        <text x="32" y="290" fontSize="10.5" fill="#6b7280">코드 10줄 — AI가 작성, 사람이 검토</text>
      </Win>
      <Win id={id} x={16} y={332} w={372} h={124} title="zsh — runserver">
        <text x="32" y="388" fontSize="10.5" fill="#e5e7eb" style={mono}><tspan fill="#34d399">$</tspan> python manage.py runserver</text>
        <text x="32" y="408" fontSize="10.5" fill="#9ca3af" style={mono}>Starting development server at</text>
        <text x="32" y="428" fontSize="10.5" fill="#7dd3fc" style={mono}>http://127.0.0.1:8000/admin/</text>
        <rect x="32" y="436" width="7" height="12" fill="#e5e7eb">
          <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
        </rect>
      </Win>
      <path d="M388 240 H404" stroke="#34d399" strokeWidth="2.5" markerEnd={`url(#${id}-arrow)`} />

      {/* django admin */}
      <Win id={id} x={410} y={24} w={534} h={432} title="수업 변경 | Django 사이트 관리">
        <g clipPath={`url(#${id}-clip)`}>
          <rect x="410" y="58" width="534" height="398" fill="#f8fafc" />
          <rect x="410" y="58" width="534" height="36" fill="#0c4b33" />
          <text x="426" y="82" fontSize="15" fontWeight="800" fill="#f5dd5d">Django 관리</text>
          <text x="930" y="81" textAnchor="end" fontSize="9.5" fill="#c8f0d8">환영합니다, ADMIN · 사이트 보기 / 로그아웃</text>
          <rect x="410" y="94" width="534" height="22" fill="#417690" />
          <text x="426" y="109" fontSize="10" fill="#e0f2fe">홈 › Courses › 수업</text>

          {/* sidebar */}
          <rect x="410" y="116" width="126" height="340" fill="#eef2f6" />
          <rect x="410" y="124" width="126" height="20" fill="#79aec8" />
          <text x="420" y="138" fontSize="9.5" fontWeight="800" fill="#ffffff">COURSES</text>
          <rect x="410" y="144" width="126" height="22" fill="#ffffcc" />
          <text x="420" y="159" fontSize="10.5" fontWeight="700" fill="#417690">수업</text>
          <text x="526" y="159" textAnchor="end" fontSize="9.5" fill="#417690">+ 추가</text>
          <text x="420" y="181" fontSize="10.5" fill="#417690">수강 신청</text>
          <rect x="410" y="196" width="126" height="20" fill="#79aec8" />
          <text x="420" y="210" fontSize="9.5" fontWeight="800" fill="#ffffff">인증 및 권한</text>
          <text x="420" y="231" fontSize="10.5" fill="#417690">사용자</text>
          <text x="420" y="253" fontSize="10.5" fill="#417690">그룹</text>

          {/* main */}
          <text x="550" y="142" fontSize="15" fontWeight="700" fill="#1f2937">변경할 수업 선택</text>
          <rect x="852" y="126" width="80" height="22" rx="11" fill="#417690" />
          <text x="892" y="141" textAnchor="middle" fontSize="10" fontWeight="700" fill="#ffffff">수업 추가 +</text>

          <rect x="550" y="158" width="186" height="24" rx="4" fill="#ffffff" stroke="#cbd5e1" />
          <circle cx="563" cy="169" r="4" fill="none" stroke="#94a3b8" strokeWidth="1.5" /><path d="M566 172 l3 3" stroke="#94a3b8" strokeWidth="1.5" />
          <text x="576" y="174" fontSize="10" fill="#94a3b8">제목으로 검색</text>
          <rect x="742" y="158" width="44" height="24" rx="4" fill="#ffffff" stroke="#cbd5e1" />
          <text x="764" y="174" textAnchor="middle" fontSize="10" fill="#334155">검색</text>
          <rect x="546" y="154" width="244" height="32" rx="7" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="5 4" />

          <text x="550" y="208" fontSize="10" fill="#475569">액션:</text>
          <rect x="580" y="195" width="112" height="20" rx="4" fill="#ffffff" stroke="#cbd5e1" />
          <text x="588" y="209" fontSize="9.5" fill="#334155">선택된 수업 삭제 ▾</text>
          <text x="704" y="208" fontSize="9.5" fill="#64748b">4개 중 0개 선택</text>

          <rect x="550" y="224" width="252" height="24" fill="#e2e8f0" />
          {["제목", "학년", "시간", "공개"].map((h, i) => (
            <text key={h} x={[574, 690, 738, 772][i]} y="240" fontSize="10" fontWeight="800" fill="#334155">{h}</text>
          ))}
          {rows.map((r, i) => {
            const y = 248 + i * 28
            return (
              <g key={r.t}>
                <rect x="550" y={y} width="252" height="28" fill={i % 2 ? "#f1f5f9" : "#ffffff"} />
                <rect x="556" y={y + 9} width="10" height="10" rx="2" fill="#ffffff" stroke="#94a3b8" />
                <text x="574" y={y + 18} fontSize="10" fontWeight="700" fill="#417690">{r.t}</text>
                <text x="690" y={y + 18} fontSize="10" fill="#334155">{r.g}</text>
                <text x="742" y={y + 18} fontSize="10" fill="#334155">{r.h}</text>
                <rect x="774" y={y + 8} width="12" height="12" rx="2.5" fill={r.on ? "#417690" : "#ffffff"} stroke={r.on ? "#417690" : "#94a3b8"} />
                {r.on && <path d={`M777 ${y + 14} l2.4 2.4 4 -5`} stroke="#ffffff" strokeWidth="1.6" fill="none" strokeLinecap="round" />}
              </g>
            )
          })}
          <rect x="546" y="220" width="216" height="32" rx="7" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 4" />
          <rect x="766" y="220" width="40" height="144" rx="7" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="5 4" />
          <rect x="744" y="372" width="58" height="24" rx="4" fill="#417690" />
          <text x="773" y="388" textAnchor="middle" fontSize="10" fontWeight="700" fill="#ffffff">저장</text>
          <text x="550" y="388" fontSize="9.5" fill="#64748b">4 수업</text>

          {/* filter */}
          <rect x="816" y="158" width="116" height="206" rx="6" fill="#eef2f6" stroke="#e2e8f0" />
          <text x="826" y="178" fontSize="11" fontWeight="800" fill="#334155">필터</text>
          <text x="826" y="198" fontSize="9.5" fontWeight="800" fill="#64748b">학년 별</text>
          {["모두", "중1~2", "중3~고1", "고2~3", "심화"].map((g, i) => (
            <text key={g} x="832" y={215 + i * 16} fontSize="10" fill={i === 0 ? "#417690" : "#475569"} fontWeight={i === 0 ? 800 : 400}>{g}</text>
          ))}
          <text x="826" y="304" fontSize="9.5" fontWeight="800" fill="#64748b">공개 여부 별</text>
          {["모두", "예", "아니오"].map((g, i) => (
            <text key={g} x="832" y={321 + i * 16} fontSize="10" fill={i === 0 ? "#417690" : "#475569"} fontWeight={i === 0 ? 800 : 400}>{g}</text>
          ))}
          <rect x="812" y="154" width="124" height="214" rx="7" fill="none" stroke="#ec4899" strokeWidth="2" strokeDasharray="5 4" />

          <rect x="550" y="410" width="382" height="34" rx="8" fill="#ecfdf5" stroke="#a7f3d0" />
          <text x="741" y="431" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#047857">검색 · 필터 · 추가 · 수정 · 삭제 · 권한 — 따로 만든 화면이 아닙니다</text>
        </g>
        {badge(546, 220, 1, "#f59e0b")}
        {badge(936, 154, 2, "#ec4899")}
        {badge(546, 154, 3, "#0ea5e9")}
        {badge(806, 364, 4, "#10b981")}
      </Win>
    </svg>
  )
}

/** 10 — 같은 코어를 쓰는 웹(브라우저)과 앱(휴대폰) */
export function WebAppMockSvg() {
  const id = "wa"
  const core = [
    { t: "React 컴포넌트 구조", f: "CourseCard · GradeFilter", c: "#38bdf8" },
    { t: "데이터 로직", f: "lib/repo.ts", c: "#a78bfa" },
    { t: "타입 · JSON 스키마", f: "types/course.ts", c: "#fbbf24" },
    { t: "Django API · Admin", f: "/api/courses/", c: "#34d399" },
  ]
  return (
    <svg viewBox="0 0 960 470" className="h-auto w-full" style={font} role="img" aria-label="왼쪽 브라우저의 Next.js 웹과 오른쪽 휴대폰의 React Native 앱이 같은 화면을 보여 준다. 가운데의 컴포넌트 구조, 데이터 로직, 타입, Django API가 두 곳에서 그대로 쓰인다">
      <Defs id={id} />
      <ellipse cx="240" cy="220" rx="200" ry="130" fill="#8b5cf6" opacity="0.2" filter={`url(#${id}-blur)`} />
      <ellipse cx="842" cy="230" rx="110" ry="170" fill="#f472b6" opacity="0.2" filter={`url(#${id}-blur)`} />

      {/* browser */}
      <Win id={id} x={16} y={44} w={440} h={336} title="courses-app.vercel.app">
        <rect x="17" y="79" width="438" height="30" fill="#ffffff" fillOpacity="0.03" />
        <circle cx="38" cy="94" r="7" fill={`url(#${id}-brand)`} />
        <text x="52" y="98" fontSize="11" fontWeight="800" fill="#ffffff">AI 수업</text>
        {["수업", "후기", "내 강의실"].map((t, i) => <text key={t} x={300 + i * 48} y="98" fontSize="10" fill={i ? "#9ca3af" : "#ffffff"}>{t}</text>)}
        <text x="36" y="138" fontSize="16" fontWeight="800" fill="#ffffff">수업 찾기</text>
        <Chips x={36} y={150} w={56} />
        <CourseCard x={36} y={184} w={126} h={110} i={0} />
        <CourseCard x={172} y={184} w={126} h={110} i={1} fav />
        <CourseCard x={308} y={184} w={126} h={110} i={2} />
        <rect x="36" y="310" width="398" height="40" rx="20" fill={`url(#${id}-brand)`} />
        <text x="235" y="335" textAnchor="middle" fontSize="13" fontWeight="800" fill="#ffffff">수강 신청</text>
      </Win>
      <text x="236" y="412" textAnchor="middle" fontSize="15" fontWeight="800" fill="#f3f4f6">Next.js 웹</text>
      <text x="236" y="432" textAnchor="middle" fontSize="11" fill="#9ca3af">Vercel 배포 · 지금 바로 검증</text>

      {/* core */}
      <rect x="520" y="42" width="164" height="26" rx="13" fill="#0b0b12" stroke="#c4b5fd" strokeOpacity="0.6" />
      <text x="602" y="59" textAnchor="middle" fontSize="11" fontWeight="800" letterSpacing="1" fill="#ddd6fe">공유 코어 — 그대로 재사용</text>
      {core.map((k, i) => {
        const y = 86 + i * 68
        return (
          <g key={k.t}>
            <path d={`M456 ${y + 26} H490`} stroke={k.c} strokeWidth="2" strokeDasharray="5 5">
              <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1s" repeatCount="indefinite" />
            </path>
            <path d={`M714 ${y + 26} H748`} stroke={k.c} strokeWidth="2" strokeDasharray="5 5">
              <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1s" repeatCount="indefinite" />
            </path>
            <rect x="490" y={y} width="224" height="52" rx="14" fill={`url(#${id}-glass)`} filter={`url(#${id}-soft)`} />
            <rect x="490" y={y} width="224" height="52" rx="14" fill="none" stroke={k.c} strokeOpacity="0.85" strokeWidth="1.5" />
            <rect x="500" y={y + 10} width="32" height="32" rx="9" fill={k.c} fillOpacity="0.16" />
            <circle cx="516" cy={y + 26} r="6" fill={k.c} />
            <text x="544" y={y + 23} fontSize="12.5" fontWeight="800" fill="#f9fafb">{k.t}</text>
            <text x="544" y={y + 40} fontSize="10" fill={k.c} style={mono}>{k.f}</text>
          </g>
        )
      })}
      <text x="602" y="376" textAnchor="middle" fontSize="11" fill="#9ca3af">바뀌는 것은 겉모습뿐</text>
      <text x="602" y="394" textAnchor="middle" fontSize="11" fill="#6b7280">태그 · 스타일 · 라우팅</text>

      {/* phone */}
      <rect x="750" y="14" width="188" height="388" rx="36" fill="#05050a" filter={`url(#${id}-shadow)`} />
      <rect x="750" y="14" width="188" height="388" rx="36" fill="#05050a" stroke="#f472b6" strokeWidth="2" />
      <rect x="759" y="23" width="170" height="370" rx="28" fill="#12121c" />
      <rect x="816" y="31" width="56" height="14" rx="7" fill="#05050a" />
      <text x="776" y="43" fontSize="9" fontWeight="700" fill="#e5e7eb">9:41</text>
      <text x="772" y="72" fontSize="15" fontWeight="800" fill="#ffffff">수업 찾기</text>
      <g>
        {["전체", "중1~2", "중3~고1"].map((g, i) => (
          <g key={g}>
            <rect x={772 + i * 50} y="82" width="45" height="19" rx="9.5" fill={i === 0 ? "#a78bfa" : "#ffffff"} fillOpacity={i === 0 ? 1 : 0.07} />
            <text x={794.5 + i * 50} y="95" textAnchor="middle" fontSize="9" fontWeight="700" fill={i === 0 ? "#0b0b12" : "#d1d5db"}>{g}</text>
          </g>
        ))}
      </g>
      <CourseCard x={770} y={110} w={148} h={62} i={0} row />
      <CourseCard x={770} y={178} w={148} h={62} i={1} row fav />
      <CourseCard x={770} y={246} w={148} h={62} i={2} row />
      <rect x="770" y="316" width="148" height="30" rx="15" fill={`url(#${id}-brand)`} />
      <text x="844" y="336" textAnchor="middle" fontSize="11" fontWeight="800" fill="#ffffff">수강 신청</text>
      <path d="M759 356 H929" stroke="#ffffff" strokeOpacity="0.1" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={778 + i * 38} y="364" width="16" height="16" rx="5" fill={i === 0 ? "#a78bfa" : "#ffffff"} fillOpacity={i === 0 ? 1 : 0.18} />
      ))}
      <rect x="814" y="386" width="60" height="4" rx="2" fill="#ffffff" fillOpacity="0.5" />
      <text x="844" y="430" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fbcfe8">React Native 앱</text>
      <text x="844" y="450" textAnchor="middle" fontSize="11" fill="#9ca3af">Expo · iOS / Android</text>
    </svg>
  )
}
