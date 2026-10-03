const font = { fontFamily: "inherit" }

function DashFlow({ reverse = false }: { reverse?: boolean }) {
  return <animate attributeName="stroke-dashoffset" from={reverse ? "0" : "360"} to={reverse ? "360" : "0"} dur="24s" repeatCount="indefinite" />
}

function Pulse({ path, color = "#f5f3ff", dur = "3s", begin = "0s", r = 3 }: { path: string; color?: string; dur?: string; begin?: string; r?: number }) {
  return (
    <circle r={r} fill={color}>
      <animateMotion dur={dur} begin={begin} repeatCount="indefinite" path={path} />
    </circle>
  )
}

export function QuestionConnectCreateSvg() {
  const subjects = [
    { x: 330, y: 50, t: "과학" },
    { x: 410, y: 90, t: "수학" },
    { x: 330, y: 150, t: "사회" },
    { x: 250, y: 100, t: "기술" },
    { x: 380, y: 175, t: "국어" },
  ]
  const links = [[0, 1], [1, 2], [2, 3], [3, 0], [0, 2], [1, 4], [2, 4], [3, 4]]
  return (
    <svg viewBox="0 0 720 230" className="h-auto w-full" style={font} role="img" aria-label="질문에서 시작해 지식을 연결하고 결과물을 만드는 흐름">
      <defs>
        <linearGradient id="qcc-arrow" x1="0" x2="1">
          <stop offset="0" stopColor="#a78bfa" stopOpacity="0.2" />
          <stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
        <filter id="qcc-glow"><feGaussianBlur stdDeviation="6" /></filter>
      </defs>

      <circle cx="90" cy="105" r="52" fill="#8b5cf6" opacity="0.35" filter="url(#qcc-glow)" />
      <path d="M50 70 h80 a14 14 0 0 1 14 14 v42 a14 14 0 0 1 -14 14 h-48 l-18 16 v-16 h-14 a14 14 0 0 1 -14 -14 v-42 a14 14 0 0 1 14 -14z" fill="#1e1b2e" stroke="#a78bfa" strokeWidth="2" />
      <text x="90" y="118" textAnchor="middle" fontSize="40" fontWeight="800" fill="#c4b5fd">?</text>
      <text x="90" y="200" textAnchor="middle" fontSize="15" fontWeight="700" fill="#e9d5ff">① 질문하기</text>

      <path d="M160 105 H222" stroke="url(#qcc-arrow)" strokeWidth="3" />
      <Pulse path="M160 105 H222" dur="1.6s" />
      <path d="M216 98 l9 7 -9 7" fill="none" stroke="#a78bfa" strokeWidth="3" />

      {links.map(([a, b], i) => (
        <line key={i} x1={subjects[a].x} y1={subjects[a].y} x2={subjects[b].x} y2={subjects[b].y} stroke="#38bdf8" strokeOpacity="0.45" strokeWidth="1.5">
          <animate attributeName="stroke-opacity" values="0.15;0.9;0.15" dur="3s" begin={`${i * 0.35}s`} repeatCount="indefinite" />
        </line>
      ))}
      {subjects.map((s) => (
        <g key={s.t}>
          <circle cx={s.x} cy={s.y} r="22" fill="#0c1a2b" stroke="#38bdf8" strokeWidth="1.5" />
          <text x={s.x} y={s.y + 4} textAnchor="middle" fontSize="12" fontWeight="600" fill="#bae6fd">{s.t}</text>
        </g>
      ))}
      <text x="330" y="222" textAnchor="middle" fontSize="15" fontWeight="700" fill="#bae6fd">② 융합적으로 연결하기</text>

      <path d="M450 105 H512" stroke="url(#qcc-arrow)" strokeWidth="3" />
      <Pulse path="M450 105 H512" dur="1.6s" begin="0.8s" />
      <path d="M506 98 l9 7 -9 7" fill="none" stroke="#a78bfa" strokeWidth="3" />

      <rect x="540" y="58" width="150" height="100" rx="12" fill="#34d399" opacity="0.25" filter="url(#qcc-glow)" />
      <rect x="540" y="58" width="150" height="100" rx="12" fill="#0b1f19" stroke="#34d399" strokeWidth="2" />
      <line x1="540" y1="78" x2="690" y2="78" stroke="#34d399" strokeOpacity="0.5" />
      <circle cx="553" cy="68" r="3" fill="#34d399" /><circle cx="563" cy="68" r="3" fill="#34d399" /><circle cx="573" cy="68" r="3" fill="#34d399" />
      <rect x="553" y="90" width="50" height="54" rx="5" fill="#34d399" opacity="0.25" />
      <rect x="613" y="92" width="64" height="9" rx="4" fill="#34d399" opacity="0.7" />
      <rect x="613" y="110" width="48" height="9" rx="4" fill="#34d399" opacity="0.45" />
      <rect x="613" y="128" width="58" height="12" rx="6" fill="#34d399" />
      <text x="615" y="200" textAnchor="middle" fontSize="15" fontWeight="700" fill="#a7f3d0">③ 서비스로 만들기</text>
    </svg>
  )
}

export function IterationDepthSvg() {
  const xs = (n: number) => 70 + (n / 150) * 540
  const ys = (d: number) => 270 - d * 2.2
  const shallow = [[0, 0], [2, 18], [5, 26], [10, 30]]
  const deep = [[0, 0], [5, 14], [10, 22], [20, 32], [35, 40], [50, 55], [70, 63], [90, 78], [110, 86], [130, 98], [150, 108]]
  const milestones = [
    { n: 20, d: 32, t: "문제 재정의" },
    { n: 50, d: 55, t: "기능 설계" },
    { n: 90, d: 78, t: "버그와 씨름" },
    { n: 130, d: 98, t: "사용자 피드백" },
  ]
  const toPath = (pts: number[][]) => pts.map(([n, d], i) => `${i ? "L" : "M"}${xs(n)} ${ys(d)}`).join(" ")
  return (
    <svg viewBox="0 0 640 320" className="h-auto w-full" style={font} role="img" aria-label="질문 횟수에 따른 사고의 깊이 비교 그래프">
      <defs>
        <linearGradient id="iter-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.35" />
          <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 25, 50, 75, 100].map((d) => (
        <line key={d} x1="70" x2="610" y1={ys(d)} y2={ys(d)} stroke="#ffffff" strokeOpacity="0.06" />
      ))}
      <line x1="70" y1="270" x2="615" y2="270" stroke="#6b7280" />
      <line x1="70" y1="270" x2="70" y2="20" stroke="#6b7280" />
      {[0, 10, 50, 100, 150].map((n) => (
        <text key={n} x={xs(n)} y="290" textAnchor="middle" fontSize="11" fill="#9ca3af">{n === 150 ? "150+" : n}</text>
      ))}
      <text x="610" y="310" textAnchor="end" fontSize="12" fill="#9ca3af">질문 · 수정 · 재시도 횟수</text>
      <text x="20" y="150" fontSize="12" fill="#9ca3af" transform="rotate(-90 20 150)" textAnchor="middle">사고의 깊이 · 지식 연결</text>

      <rect x={xs(0)} y="20" width={xs(10) - xs(0)} height="250" fill="#f87171" opacity="0.06" />
      <path d={`${toPath(deep)} L${xs(150)} 270 L${xs(0)} 270Z`} fill="url(#iter-fill)" />
      <path d={toPath(deep)} fill="none" stroke="#a78bfa" strokeWidth="3" strokeLinejoin="round" />
      <Pulse path={toPath(deep)} dur="7s" r={5} />
      <path d={toPath(shallow)} fill="none" stroke="#f87171" strokeWidth="3" strokeDasharray="6 4" />
      <circle cx={xs(10)} cy={ys(30)} r="6" fill="#f87171" />
      <text x={xs(10) + 10} y={ys(30) + 26} fontSize="12" fontWeight="700" fill="#fca5a5">10회 이내에서 멈춤</text>
      <text x={xs(10) + 10} y={ys(30) + 42} fontSize="11" fill="#9ca3af">숙제 답만 받고 끝</text>

      {milestones.map((m) => (
        <g key={m.t}>
          <circle cx={xs(m.n)} cy={ys(m.d)} r="5" fill="#0b0b12" stroke="#c4b5fd" strokeWidth="2" />
          <text x={xs(m.n)} y={ys(m.d) - 12} textAnchor="middle" fontSize="11" fill="#ddd6fe">{m.t}</text>
        </g>
      ))}
      <circle cx={xs(150)} cy={ys(108)} r="8" fill="none" stroke="#34d399">
        <animate attributeName="r" values="8;22" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx={xs(150)} cy={ys(108)} r="8" fill="#34d399" />
      <text x={xs(150) - 12} y={ys(108) - 14} textAnchor="end" fontSize="13" fontWeight="800" fill="#6ee7b7">서비스 출시 🚀</text>
    </svg>
  )
}

const brainNodes = [
  { x: 60, y: 40, t: "과학" }, { x: 140, y: 30, t: "수학" }, { x: 200, y: 80, t: "정보" },
  { x: 175, y: 150, t: "사회" }, { x: 100, y: 165, t: "국어" }, { x: 30, y: 115, t: "미술" },
  { x: 110, y: 95, t: "윤리" }, { x: 215, y: 20, t: "영어" },
]
const allEdges: [number, number][] = [
  [0, 1], [1, 2], [0, 6], [2, 3], [3, 4], [4, 5], [5, 0], [6, 2], [6, 3], [6, 4],
  [1, 7], [7, 2], [0, 3], [1, 4], [5, 6], [2, 4], [5, 3], [7, 6], [0, 2], [1, 3],
]

export function ConnectionGrowthSvg() {
  const stages = [
    { label: "프로젝트 1개", edges: 3, active: [0, 1, 2] },
    { label: "프로젝트 3개", edges: 10, active: [0, 1, 2, 3, 4, 6] },
    { label: "프로젝트 5개", edges: 20, active: [0, 1, 2, 3, 4, 5, 6, 7] },
  ]
  return (
    <svg viewBox="0 0 780 240" className="h-auto w-full" style={font} role="img" aria-label="프로젝트를 많이 할수록 교과 간 연결이 늘어나는 모습">
      <defs><filter id="cg-glow"><feGaussianBlur stdDeviation="3" /></filter></defs>
      {stages.map((st, si) => (
        <g key={st.label} transform={`translate(${si * 260 + 10} 10)`}>
          <rect x="0" y="0" width="245" height="215" rx="16" fill="#ffffff" fillOpacity="0.02" stroke="#ffffff" strokeOpacity="0.08" />
          <g transform="translate(5 8)">
            {allEdges.slice(0, st.edges).map(([a, b], i) => (
              <line key={i} x1={brainNodes[a].x} y1={brainNodes[a].y} x2={brainNodes[b].x} y2={brainNodes[b].y}
                stroke={si === 2 ? "#c084fc" : "#a78bfa"} strokeOpacity={0.3 + si * 0.25} strokeWidth={1 + si * 0.6}>
                {si === 2 && <animate attributeName="stroke-opacity" values="0.25;1;0.25" dur="2.4s" begin={`${(i % 6) * 0.3}s`} repeatCount="indefinite" />}
              </line>
            ))}
            {brainNodes.map((n, i) => {
              const on = st.active.includes(i)
              return (
                <g key={n.t}>
                  {on && <circle cx={n.x} cy={n.y} r="14" fill="#a78bfa" opacity={0.2 + si * 0.2} filter="url(#cg-glow)" />}
                  <circle cx={n.x} cy={n.y} r="13" fill={on ? "#2e1065" : "#111118"} stroke={on ? "#c4b5fd" : "#374151"} strokeWidth="1.5" />
                  <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="10" fill={on ? "#ede9fe" : "#6b7280"}>{n.t}</text>
                </g>
              )
            })}
          </g>
          <text x="122" y="205" textAnchor="middle" fontSize="13" fontWeight="700" fill={si === 2 ? "#e9d5ff" : "#9ca3af"}>
            {st.label} · 연결 {st.edges}개
          </text>
        </g>
      ))}
    </svg>
  )
}

export function OecdCompassSvg() {
  const pts = [
    { a: -90, t: "새로운 가치 창출" },
    { a: 30, t: "책임감 갖기" },
    { a: 150, t: "긴장·딜레마 조정" },
  ]
  return (
    <svg viewBox="0 0 300 300" className="mx-auto h-auto w-full max-w-[300px]" style={font} role="img" aria-label="OECD 학습 나침반: 학생 주도성과 세 가지 변혁적 역량">
      <circle cx="150" cy="150" r="120" fill="none" stroke="#38bdf8" strokeOpacity="0.25" />
      <circle cx="150" cy="150" r="85" fill="none" stroke="#38bdf8" strokeOpacity="0.15" strokeDasharray="3 5" />
      {Array.from({ length: 36 }).map((_, i) => {
        const r = (i * 10 * Math.PI) / 180
        return <line key={i} x1={150 + Math.cos(r) * 114} y1={150 + Math.sin(r) * 114} x2={150 + Math.cos(r) * 120} y2={150 + Math.sin(r) * 120} stroke="#38bdf8" strokeOpacity="0.4" />
      })}
      <g>
        <animateTransform attributeName="transform" type="rotate" values="-7 150 150;7 150 150;-7 150 150" dur="5s" repeatCount="indefinite" />
        <path d="M150 40 L165 150 L150 260 L135 150Z" fill="#0ea5e9" opacity="0.18" />
        <path d="M150 40 L165 150 L135 150Z" fill="#38bdf8" />
      </g>
      {pts.map((p) => {
        const r = (p.a * Math.PI) / 180
        const x = 150 + Math.cos(r) * 95
        const y = 150 + Math.sin(r) * 95
        return (
          <g key={p.t}>
            <circle cx={x} cy={y} r="7" fill="#0b1220" stroke="#7dd3fc" strokeWidth="2" />
            <text x={x} y={p.a === -90 ? y - 14 : y + 24} textAnchor="middle" fontSize="12" fontWeight="700" fill="#e0f2fe">{p.t}</text>
          </g>
        )
      })}
      <circle cx="150" cy="150" r="30" fill="#0b1220" stroke="#38bdf8" strokeWidth="2" />
      <text x="150" y="147" textAnchor="middle" fontSize="11" fontWeight="800" fill="#7dd3fc">학생</text>
      <text x="150" y="161" textAnchor="middle" fontSize="11" fontWeight="800" fill="#7dd3fc">주도성</text>
    </svg>
  )
}

export function KnowledgeToArgumentSvg() {
  const dots = [
    { x: 40, y: 50, t: "광합성" }, { x: 120, y: 30, t: "통계" }, { x: 70, y: 120, t: "기후 기사" },
    { x: 150, y: 100, t: "센서 실험" }, { x: 40, y: 190, t: "윤리" }, { x: 130, y: 175, t: "설문 결과" },
  ]
  const lines = [
    { t: "주장", w: 170, c: "#c084fc" },
    { t: "근거 ①", w: 150, c: "#34d399" },
    { t: "근거 ②", w: 160, c: "#34d399" },
    { t: "반론·한계", w: 120, c: "#fbbf24" },
    { t: "나의 결론", w: 140, c: "#60a5fa" },
  ]
  return (
    <svg viewBox="0 0 640 240" className="h-auto w-full" style={font} role="img" aria-label="흩어진 지식이 연결되어 논리적인 설명이 되는 과정">
      <text x="100" y="230" textAnchor="middle" fontSize="13" fontWeight="700" fill="#9ca3af">흩어진 지식</text>
      {dots.map((d) => (
        <g key={d.t}>
          <rect x={d.x - 32} y={d.y - 13} width="64" height="26" rx="13" fill="#18181b" stroke="#3f3f46" />
          <text x={d.x} y={d.y + 4} textAnchor="middle" fontSize="11" fill="#d4d4d8">{d.t}</text>
        </g>
      ))}
      {dots.map((d, i) => (
        <g key={i}>
          <path d={`M${d.x + 32} ${d.y} C 250 ${d.y}, 250 120, 300 120`} fill="none" stroke="#a78bfa" strokeOpacity="0.45" strokeWidth="1.5" />
          <Pulse path={`M${d.x + 32} ${d.y} C 250 ${d.y}, 250 120, 300 120`} color="#e9d5ff" dur="3s" begin={`${i * 0.45}s`} />
        </g>
      ))}
      <circle cx="320" cy="120" r="34" fill="#2e1065" stroke="#a78bfa" strokeWidth="2" />
      <text x="320" y="116" textAnchor="middle" fontSize="12" fontWeight="800" fill="#ede9fe">나의</text>
      <text x="320" y="131" textAnchor="middle" fontSize="12" fontWeight="800" fill="#ede9fe">관점</text>
      <path d="M356 120 H400" stroke="#a78bfa" strokeWidth="2.5" />
      <path d="M394 113 l8 7 -8 7" fill="none" stroke="#a78bfa" strokeWidth="2.5" />
      <rect x="410" y="20" width="215" height="190" rx="12" fill="#ffffff" fillOpacity="0.03" stroke="#ffffff" strokeOpacity="0.12" />
      {lines.map((l, i) => (
        <g key={l.t} transform={`translate(425 ${42 + i * 34})`}>
          <text x="0" y="4" fontSize="11" fontWeight="700" fill={l.c}>{l.t}</text>
          <rect x="62" y="-5" width={l.w - 40} height="9" rx="4.5" fill={l.c} opacity="0.55" />
        </g>
      ))}
      <text x="517" y="230" textAnchor="middle" fontSize="13" fontWeight="700" fill="#e9d5ff">연결된 설명 · 논·서술</text>
    </svg>
  )
}

type ProjectKind = "paper" | "research" | "campaign" | "service" | "product"

export function ProjectIllustration({ kind, color }: { kind: ProjectKind; color: string }) {
  const id = `pg-${kind}`
  return (
    <svg viewBox="0 0 200 110" className="h-28 w-full" aria-hidden="true">
      <defs>
        <radialGradient id={id} cx="0.5" cy="0.5" r="0.6">
          <stop offset="0" stopColor={color} stopOpacity="0.35" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="55" rx="95" ry="55" fill={`url(#${id})`} />
      <g fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {kind === "paper" && (
          <>
            <rect x="65" y="12" width="56" height="80" rx="5" fill="#0b0b12" />
            <circle cx="93" cy="12" r="3" fill={color} />
            {[30, 42, 54, 66, 78].map((y, i) => <line key={y} x1="74" x2={i % 2 ? 104 : 112} y1={y} y2={y} strokeOpacity="0.8" />)}
            <path d="M128 40 L146 50 L128 62Z" />
          </>
        )}
        {kind === "research" && (
          <>
            <path d="M55 15 V92 H150" />
            {[[68, 70], [88, 58], [108, 42], [128, 28]].map(([x, y]) => (
              <rect key={x} x={x} y={y} width="13" height={92 - y} fill={color} fillOpacity="0.75" stroke="none" />
            ))}
            <circle cx="134" cy="24" r="4" fill="#bbf7d0" stroke="none" />
          </>
        )}
        {kind === "campaign" && (
          <>
            <path d="M60 45 L110 22 V88 L60 65Z" fill="#0b0b12" />
            <rect x="48" y="45" width="12" height="20" rx="2" />
            <path d="M64 66 L70 88 H80 L76 68" />
            <path d="M122 42 Q132 55 122 68" /><path d="M132 32 Q148 55 132 78" /><path d="M142 22 Q164 55 142 88" strokeOpacity="0.6" />
          </>
        )}
        {kind === "service" && (
          <>
            <rect x="45" y="14" width="110" height="80" rx="6" fill="#0b0b12" />
            <line x1="45" y1="28" x2="155" y2="28" />
            {[54, 62, 70].map((x) => <circle key={x} cx={x} cy="21" r="2" fill={color} stroke="none" />)}
            <rect x="54" y="38" width="38" height="46" rx="3" fill={color} fillOpacity="0.3" stroke="none" />
            <rect x="100" y="38" width="46" height="8" rx="4" fill={color} fillOpacity="0.7" stroke="none" />
            <rect x="100" y="54" width="36" height="8" rx="4" fill={color} fillOpacity="0.5" stroke="none" />
            <rect x="100" y="70" width="46" height="12" rx="6" fill={color} stroke="none" />
          </>
        )}
        {kind === "product" && (
          <>
            <rect x="72" y="28" width="56" height="50" rx="8" fill="#0b0b12" />
            <rect x="86" y="41" width="28" height="24" rx="4" />
            <circle cx="100" cy="53" r="5" fill="#e0f2fe" stroke="none" />
            <path d="M72 40 H50 V22" strokeDasharray="4 4" /><path d="M128 40 H150 V22" strokeDasharray="4 4" />
            <path d="M72 68 H50 V86" strokeDasharray="4 4" /><path d="M128 68 H150 V86" strokeDasharray="4 4" />
            {[[50, 18], [150, 18], [50, 90], [150, 90]].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill={color} stroke="none" />)}
          </>
        )}
      </g>
    </svg>
  )
}

export function FiveLensHubSvg({ items }: { items: { title: string; color: string; output: string }[] }) {
  const cx = 360
  const cy = 200
  return (
    <svg viewBox="0 0 720 400" className="h-auto w-full" style={font} role="img" aria-label="하나의 탐구 질문을 다섯 가지 프로젝트로 표현하는 구조">
      <defs><filter id="hub-glow"><feGaussianBlur stdDeviation="10" /></filter></defs>
      {items.map((it, i) => {
        const a = ((-90 + i * 72) * Math.PI) / 180
        const x = cx + Math.cos(a) * 250
        const y = cy + Math.sin(a) * 150
        return (
          <g key={it.title}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke={it.color} strokeOpacity="0.6" strokeWidth="2" strokeDasharray="5 5"><DashFlow reverse /></line>
            <rect x={x - 82} y={y - 30} width="164" height="60" rx="14" fill="#0b0b12" stroke={it.color} strokeWidth="1.5" />
            <text x={x} y={y - 6} textAnchor="middle" fontSize="14" fontWeight="800" fill={it.color}>{it.title}</text>
            <text x={x} y={y + 14} textAnchor="middle" fontSize="11" fill="#d1d5db">{it.output}</text>
          </g>
        )
      })}
      <circle cx={cx} cy={cy} r="74" fill="#8b5cf6" opacity="0.35" filter="url(#hub-glow)" />
      <circle cx={cx} cy={cy} r="70" fill="#1e1035" stroke="#c4b5fd" strokeWidth="2" />
      <text x={cx} y={cy - 18} textAnchor="middle" fontSize="11" fill="#c4b5fd">하나의 탐구 질문</text>
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="15" fontWeight="800" fill="#ffffff">우리 교실 공기,</text>
      <text x={cx} y={cy + 24} textAnchor="middle" fontSize="15" fontWeight="800" fill="#ffffff">괜찮을까?</text>
    </svg>
  )
}

export function HeroOrbitSvg() {
  const orbit = [
    { k: "paper" as const, c: "#c084fc", t: "논문" },
    { k: "research" as const, c: "#4ade80", t: "리서치" },
    { k: "campaign" as const, c: "#fbbf24", t: "캠페인" },
    { k: "service" as const, c: "#818cf8", t: "서비스" },
    { k: "product" as const, c: "#22d3ee", t: "제품" },
  ]
  return (
    <svg viewBox="0 0 520 300" className="mx-auto h-auto w-full max-w-xl" style={font} role="img" aria-label="하나의 질문을 중심으로 다섯 가지 프로젝트가 궤도를 도는 그림">
      <defs>
        <filter id="ho-glow"><feGaussianBlur stdDeviation="14" /></filter>
        <linearGradient id="ho-ring" x1="0" x2="1">
          <stop offset="0" stopColor="#a78bfa" stopOpacity="0.1" />
          <stop offset="0.5" stopColor="#e879f9" stopOpacity="0.6" />
          <stop offset="1" stopColor="#38bdf8" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <ellipse cx="260" cy="150" rx="220" ry="110" fill="none" stroke="url(#ho-ring)" strokeWidth="1.5" />
      <ellipse cx="260" cy="150" rx="150" ry="72" fill="none" stroke="#a78bfa" strokeOpacity="0.2" strokeDasharray="4 6" />
      {[[30, 40], [480, 60], [70, 250], [450, 240], [150, 20], [380, 285], [255, 15]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.5" fill="#fff">
          <animate attributeName="opacity" values="0.1;0.9;0.1" dur={`${2 + (i % 3)}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <Pulse path="M40 150 a220 110 0 1 1 440 0 a220 110 0 1 1 -440 0" color="#e879f9" dur="14s" r={4} />
      <Pulse path="M110 150 a150 72 0 1 0 300 0 a150 72 0 1 0 -300 0" color="#7dd3fc" dur="9s" />
      <circle cx="260" cy="150" r="46" fill="none" stroke="#c4b5fd">
        <animate attributeName="r" values="46;78" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="260" cy="150" r="54" fill="#8b5cf6" opacity="0.5" filter="url(#ho-glow)" />
      <circle cx="260" cy="150" r="46" fill="#1e1035" stroke="#c4b5fd" strokeWidth="2" />
      <text x="260" y="168" textAnchor="middle" fontSize="50" fontWeight="800" fill="#f5f3ff">?</text>
      {orbit.map((o, i) => {
        const a = ((-90 + i * 72) * Math.PI) / 180
        const x = 260 + Math.cos(a) * 220
        const y = 150 + Math.sin(a) * 110
        const cls = i % 2 ? "animate-pulse" : ""
        return (
          <g key={o.t} className={cls}>
            <line x1="260" y1="150" x2={x} y2={y} stroke={o.c} strokeOpacity="0.25" />
            <circle cx={x} cy={y} r="30" fill="#0b0b12" stroke={o.c} strokeWidth="1.5" />
            <svg x={x - 24} y={y - 18} width="48" height="27" viewBox="0 0 200 110"><ProjectGlyph kind={o.k} color={o.c} /></svg>
            <text x={x} y={y + 22} textAnchor="middle" fontSize="10" fontWeight="700" fill={o.c}>{o.t}</text>
          </g>
        )
      })}
    </svg>
  )
}

function ProjectGlyph({ kind, color }: { kind: ProjectKind; color: string }) {
  return (
    <g fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
      {kind === "paper" && <><rect x="70" y="10" width="60" height="90" rx="6" />{[35, 55, 75].map((y) => <line key={y} x1="82" x2="118" y1={y} y2={y} />)}</>}
      {kind === "research" && <><path d="M50 10 V100 H150" />{[[70, 65], [95, 45], [120, 25]].map(([x, y]) => <rect key={x} x={x} y={y} width="16" height={100 - y} fill={color} stroke="none" />)}</>}
      {kind === "campaign" && <><path d="M55 40 L110 15 V95 L55 70Z" /><path d="M125 35 Q140 55 125 75" /><path d="M140 22 Q165 55 140 88" /></>}
      {kind === "service" && <><rect x="40" y="12" width="120" height="86" rx="8" /><line x1="40" y1="32" x2="160" y2="32" /><rect x="100" y="50" width="45" height="12" rx="6" fill={color} stroke="none" /></>}
      {kind === "product" && <><rect x="65" y="25" width="70" height="60" rx="8" /><circle cx="100" cy="55" r="10" fill={color} stroke="none" /><path d="M65 40 H40 M135 40 H160 M65 70 H40 M135 70 H160" /></>}
    </g>
  )
}

export function ExamShiftSvg() {
  return (
    <svg viewBox="0 0 720 220" className="h-auto w-full" style={font} role="img" aria-label="객관식에서 논서술형, 프로젝트 평가로의 전환">
      <g transform="translate(40 20)">
        <rect width="150" height="150" rx="10" fill="#111118" stroke="#4b5563" />
        {Array.from({ length: 5 }).map((_, r) => (
          <g key={r}>
            <text x="14" y={34 + r * 24} fontSize="11" fill="#6b7280">{r + 1}</text>
            {Array.from({ length: 5 }).map((__, c) => (
              <ellipse key={c} cx={40 + c * 22} cy={30 + r * 24} rx="7" ry="9" fill={c === (r * 2) % 5 ? "#6b7280" : "none"} stroke="#6b7280" />
            ))}
          </g>
        ))}
        <text x="75" y="185" textAnchor="middle" fontSize="14" fontWeight="700" fill="#9ca3af">5지선다 · 암기</text>
      </g>
      <path d="M210 95 H260" stroke="#a78bfa" strokeWidth="2.5" /><path d="M254 88 l8 7 -8 7" fill="none" stroke="#a78bfa" strokeWidth="2.5" />
      <g transform="translate(285 20)">
        <rect width="150" height="150" rx="10" fill="#140f24" stroke="#a78bfa" />
        <text x="14" y="26" fontSize="11" fontWeight="700" fill="#c4b5fd">Q. 지진에 대해 논하시오</text>
        {[48, 66, 84, 102, 120].map((y, i) => <line key={y} x1="14" x2={i === 4 ? 90 : 136} y1={y} y2={y} stroke="#a78bfa" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" />)}
        <path d="M110 132 l20 -20 6 6 -20 20 -8 2z" fill="#a78bfa" />
        <text x="75" y="185" textAnchor="middle" fontSize="14" fontWeight="700" fill="#ddd6fe">논·서술형 · 논증</text>
      </g>
      <path d="M455 95 H505" stroke="#34d399" strokeWidth="2.5" /><path d="M499 88 l8 7 -8 7" fill="none" stroke="#34d399" strokeWidth="2.5" />
      <g transform="translate(530 20)">
        <rect width="150" height="150" rx="10" fill="#0b1f19" stroke="#34d399" />
        <rect x="20" y="18" width="110" height="64" rx="6" fill="#34d399" fillOpacity="0.12" stroke="#34d399" />
        <path d="M32 70 L52 50 L68 60 L90 34 L118 46" fill="none" stroke="#34d399" strokeWidth="2.5" />
        <circle cx="45" cy="112" r="11" fill="#34d399" fillOpacity="0.3" stroke="#34d399" />
        <path d="M30 140 q15 -16 30 0" fill="none" stroke="#34d399" strokeWidth="2" />
        <circle cx="105" cy="112" r="11" fill="#34d399" fillOpacity="0.3" stroke="#34d399" />
        <path d="M90 140 q15 -16 30 0" fill="none" stroke="#34d399" strokeWidth="2" />
        <text x="75" y="185" textAnchor="middle" fontSize="14" fontWeight="700" fill="#a7f3d0">프로젝트 · 발표</text>
      </g>
    </svg>
  )
}

export function SetukRecordSvg() {
  const rows = [
    { t: "수상경력", off: true },
    { t: "독서활동", off: true },
    { t: "자율동아리", off: true },
    { t: "개인봉사", off: true },
    { t: "교과 세부능력 및 특기사항", off: false },
  ]
  return (
    <svg viewBox="0 0 420 300" className="h-auto w-full" style={font} role="img" aria-label="학생부에서 대입 미반영 항목과 핵심이 된 세특">
      <defs><filter id="sr-glow"><feGaussianBlur stdDeviation="8" /></filter></defs>
      <rect x="40" y="10" width="340" height="280" rx="14" fill="#111118" stroke="#3f3f46" />
      <text x="62" y="42" fontSize="14" fontWeight="800" fill="#e5e7eb">학교생활기록부</text>
      <text x="358" y="42" textAnchor="end" fontSize="10" fill="#6b7280">대입 반영 기준</text>
      {rows.map((r, i) => {
        const y = 62 + i * 40
        if (!r.off) {
          return (
            <g key={r.t}>
              <rect x="56" y={y} width="308" height="64" rx="10" fill="#d946ef" opacity="0.3" filter="url(#sr-glow)">
                <animate attributeName="opacity" values="0.15;0.5;0.15" dur="2.5s" repeatCount="indefinite" />
              </rect>
              <rect x="56" y={y} width="308" height="64" rx="10" fill="#2a0f33" stroke="#e879f9" strokeWidth="2" />
              <text x="72" y={y + 26} fontSize="14" fontWeight="800" fill="#f5d0fe">{r.t}</text>
              <rect x="72" y={y + 38} width="200" height="7" rx="3.5" fill="#e879f9" opacity="0.6" />
              <rect x="72" y={y + 50} width="140" height="7" rx="3.5" fill="#e879f9" opacity="0.35" />
              <text x="350" y={y + 26} textAnchor="end" fontSize="12" fontWeight="800" fill="#f0abfc">핵심 ★</text>
            </g>
          )
        }
        return (
          <g key={r.t} opacity="0.55">
            <rect x="56" y={y} width="308" height="30" rx="8" fill="#18181b" stroke="#27272a" />
            <text x="72" y={y + 20} fontSize="12" fill="#71717a">{r.t}</text>
            <line x1="68" x2={78 + r.t.length * 12} y1={y + 16} y2={y + 16} stroke="#f87171" strokeWidth="1.5" />
            <text x="350" y={y + 20} textAnchor="end" fontSize="11" fill="#f87171">미반영</text>
          </g>
        )
      })}
    </svg>
  )
}

export function ActivitiesFlowSvg() {
  const inputs = [
    { t: "공모전", c: "#fbbf24", y: 50 },
    { t: "캠프", c: "#34d399", y: 130 },
    { t: "봉사활동", c: "#60a5fa", y: 210 },
  ]
  const outs = [
    { t: "고입", s: "자기소개서 · 면접", y: 80 },
    { t: "대입", s: "세특 · 학종 · 면접", y: 180 },
  ]
  return (
    <svg viewBox="0 0 720 260" className="h-auto w-full" style={font} role="img" aria-label="공모전, 캠프, 봉사 경험이 탐구 스토리를 거쳐 고입과 대입으로 연결되는 흐름">
      <defs><filter id="af-glow"><feGaussianBlur stdDeviation="10" /></filter></defs>
      {inputs.map((n) => (
        <g key={n.t}>
          <path d={`M170 ${n.y} C 250 ${n.y}, 250 130, 300 130`} fill="none" stroke={n.c} strokeOpacity="0.6" strokeWidth="2" />
          <Pulse path={`M170 ${n.y} C 250 ${n.y}, 250 130, 300 130`} color={n.c} dur="2.6s" begin={`${n.y / 200}s`} r={4} />
          <rect x="30" y={n.y - 24} width="140" height="48" rx="24" fill="#0b0b12" stroke={n.c} strokeWidth="1.5" />
          {n.t === "공모전" && <path d={`M52 ${n.y - 10} h16 v6 a8 8 0 0 1 -16 0z M60 ${n.y + 4} v6 M54 ${n.y + 12} h12`} fill="none" stroke={n.c} strokeWidth="2" />}
          {n.t === "캠프" && <path d={`M48 ${n.y + 12} L60 ${n.y - 12} L72 ${n.y + 12}Z M60 ${n.y + 12} L60 ${n.y}`} fill="none" stroke={n.c} strokeWidth="2" />}
          {n.t === "봉사활동" && <path d={`M60 ${n.y + 12} C 40 ${n.y - 2}, 50 ${n.y - 16}, 60 ${n.y - 6} C 70 ${n.y - 16}, 80 ${n.y - 2}, 60 ${n.y + 12}Z`} fill="none" stroke={n.c} strokeWidth="2" />}
          <text x="88" y={n.y + 5} fontSize="14" fontWeight="700" fill={n.c}>{n.t}</text>
        </g>
      ))}
      <circle cx="370" cy="130" r="72" fill="#8b5cf6" opacity="0.3" filter="url(#af-glow)" />
      <circle cx="370" cy="130" r="70" fill="#1e1035" stroke="#c4b5fd" strokeWidth="2" />
      <text x="370" y="112" textAnchor="middle" fontSize="11" fill="#c4b5fd">경험을 엮은</text>
      <text x="370" y="134" textAnchor="middle" fontSize="16" fontWeight="800" fill="#fff">나만의</text>
      <text x="370" y="154" textAnchor="middle" fontSize="16" fontWeight="800" fill="#fff">탐구 스토리</text>
      {outs.map((o) => (
        <g key={o.t}>
          <path d={`M440 130 C 490 130, 490 ${o.y}, 540 ${o.y}`} fill="none" stroke="#e879f9" strokeOpacity="0.6" strokeWidth="2" />
          <Pulse path={`M440 130 C 490 130, 490 ${o.y}, 540 ${o.y}`} color="#f5d0fe" dur="2.2s" begin={`${o.y / 150}s`} r={4} />
          <rect x="540" y={o.y - 30} width="160" height="60" rx="14" fill="#2a0f33" stroke="#e879f9" strokeWidth="1.5" />
          <text x="620" y={o.y - 4} textAnchor="middle" fontSize="16" fontWeight="800" fill="#f5d0fe">{o.t}</text>
          <text x="620" y={o.y + 16} textAnchor="middle" fontSize="11" fill="#e9d5ff">{o.s}</text>
        </g>
      ))}
    </svg>
  )
}

export function ProcessLoopSvg({ steps }: { steps: { step: string; title: string }[] }) {
  const w = 720
  const gap = (w - 80) / (steps.length - 1)
  return (
    <svg viewBox={`0 0 ${w} 190`} className="h-auto w-full" style={font} role="img" aria-label="문제 발견부터 서비스 출시와 발표까지, 테스트와 개선을 반복하는 프로젝트 프로세스">
      <defs>
        <linearGradient id="pl-line" x1="0" x2="1">
          <stop offset="0" stopColor="#a78bfa" />
          <stop offset="0.8" stopColor="#34d399" />
          <stop offset="1" stopColor="#34d399" />
        </linearGradient>
      </defs>
      <line x1="40" x2={w - 40} y1="80" y2="80" stroke="url(#pl-line)" strokeWidth="3" />
      <Pulse path={`M40 80 H${w - 40}`} dur="6s" r={5} />
      <path d={`M${40 + gap * 4} 108 C ${40 + gap * 4} 160, ${40 + gap * 2.9} 160, ${40 + gap * 3} 108`} fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="5 4"><DashFlow /></path>
      <path d={`M${40 + gap * 3 - 6} 116 l6 -9 6 9`} fill="none" stroke="#fbbf24" strokeWidth="2" />
      <text x={40 + gap * 3.5} y="172" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fcd34d">될 때까지 반복 ↺</text>
      {steps.map((s, i) => {
        const x = 40 + i * gap
        const launch = i === 5
        return (
          <g key={s.step}>
            <circle cx={x} cy="80" r={launch ? 22 : 18} fill={launch ? "#34d399" : "#0b0b12"} stroke={launch ? "#6ee7b7" : "#a78bfa"} strokeWidth="2" />
            <text x={x} y="85" textAnchor="middle" fontSize="13" fontWeight="800" fill={launch ? "#052e16" : "#ddd6fe"}>{s.step}</text>
            <text x={x} y="40" textAnchor="middle" fontSize="12" fontWeight="700" fill={launch ? "#6ee7b7" : "#e5e7eb"}>{s.title}</text>
          </g>
        )
      })}
    </svg>
  )
}

export function SkillShiftSvg() {
  const down = [
    { t: "알고리즘 암기", from: 85, to: 35 },
    { t: "코드 타이핑 속도", from: 75, to: 20 },
    { t: "자격증 · 스펙", from: 70, to: 30 },
  ]
  const up = [
    { t: "문제 정의 · 기획", from: 35, to: 92 },
    { t: "프롬프트 · 지시 설계", from: 10, to: 85 },
    { t: "시스템 설계", from: 45, to: 88 },
    { t: "결과 검증 · 책임", from: 40, to: 90 },
  ]
  const bar = (rows: typeof down, y0: number, color: string, label: string, arrow: string) => (
    <g>
      <text x="20" y={y0 - 14} fontSize="13" fontWeight="800" fill={color}>{label}</text>
      {rows.map((r, i) => {
        const y = y0 + i * 34
        return (
          <g key={r.t}>
            <text x="20" y={y + 15} fontSize="12" fill="#d1d5db">{r.t}</text>
            <rect x="170" y={y + 4} width="440" height="14" rx="7" fill="#ffffff" fillOpacity="0.04" />
            <rect x="170" y={y + 4} width={r.from * 4.4} height="14" rx="7" fill="#6b7280" fillOpacity="0.35" />
            <rect x="170" y={y + 7} width={r.to * 4.4} height="8" rx="4" fill={color} />
            <text x={176 + Math.max(r.from, r.to) * 4.4} y={y + 16} fontSize="13" fontWeight="800" fill={color}>{arrow}</text>
          </g>
        )
      })}
    </g>
  )
  return (
    <svg viewBox="0 0 660 330" className="h-auto w-full" style={font} role="img" aria-label="채용에서 중요도가 줄어드는 역량과 늘어나는 역량">
      {bar(down, 40, "#f87171", "중요도 ↓ 줄어드는 것", "▼")}
      {bar(up, 175, "#34d399", "중요도 ↑ 커지는 것", "▲")}
      <g transform="translate(470 310)">
        <rect width="14" height="8" rx="4" fill="#6b7280" fillOpacity="0.5" />
        <text x="20" y="8" fontSize="10" fill="#9ca3af">과거</text>
        <rect x="60" width="7" height="8" rx="2" fill="#f87171" /><rect x="67" width="7" height="8" rx="2" fill="#34d399" />
        <text x="80" y="8" fontSize="10" fill="#9ca3af">AI 시대</text>
      </g>
    </svg>
  )
}

export function AgentTeamSvg() {
  const agents = [
    { t: "코드 작성", x: 520, y: 50, c: "#818cf8" },
    { t: "테스트", x: 600, y: 140, c: "#34d399" },
    { t: "자료 조사", x: 520, y: 230, c: "#fbbf24" },
    { t: "디자인 · 문서", x: 400, y: 260, c: "#f472b6" },
  ]
  const human = ["① 문제 정의", "② 기획 · 설계", "③ 프롬프트로 지시", "④ 결과 검증 · 판단"]
  return (
    <svg viewBox="0 0 700 300" className="h-auto w-full" style={font} role="img" aria-label="사람이 기획과 판단을 하고 여러 AI 에이전트가 실행을 맡는 협업 구조">
      <defs><filter id="at-glow"><feGaussianBlur stdDeviation="10" /></filter></defs>
      <rect x="20" y="30" width="250" height="240" rx="18" fill="#1e1035" stroke="#c4b5fd" strokeWidth="2" />
      <circle cx="70" cy="80" r="20" fill="#c4b5fd" fillOpacity="0.25" stroke="#c4b5fd" strokeWidth="2" />
      <path d="M58 76 a12 12 0 0 1 24 0 M54 96 q16 -14 32 0" fill="none" stroke="#c4b5fd" strokeWidth="2" />
      <text x="102" y="76" fontSize="16" fontWeight="800" fill="#fff">사람</text>
      <text x="102" y="94" fontSize="11" fill="#c4b5fd">기획자 · 설계자 · 판단자</text>
      {human.map((h, i) => (
        <g key={h}>
          <rect x="40" y={120 + i * 36} width="210" height="28" rx="8" fill="#2e1065" />
          <text x="54" y={139 + i * 36} fontSize="12" fontWeight="700" fill="#ede9fe">{h}</text>
        </g>
      ))}
      <circle cx="420" cy="150" r="46" fill="#38bdf8" opacity="0.3" filter="url(#at-glow)" />
      <circle cx="420" cy="150" r="42" fill="#0b1a2b" stroke="#38bdf8" strokeWidth="2" />
      <rect x="402" y="132" width="36" height="28" rx="6" fill="none" stroke="#7dd3fc" strokeWidth="2" />
      <circle cx="413" cy="146" r="3" fill="#7dd3fc" /><circle cx="427" cy="146" r="3" fill="#7dd3fc" />
      <line x1="420" y1="124" x2="420" y2="132" stroke="#7dd3fc" strokeWidth="2" />
      <text x="420" y="178" textAnchor="middle" fontSize="11" fontWeight="800" fill="#bae6fd">AI 에이전트</text>
      <path d="M270 135 H372" stroke="#c4b5fd" strokeWidth="2.5" /><Pulse path="M270 135 H372" dur="1.8s" r={4} /><path d="M366 128 l8 7 -8 7" fill="none" stroke="#c4b5fd" strokeWidth="2.5" />
      <text x="320" y="125" textAnchor="middle" fontSize="11" fill="#c4b5fd">지시</text>
      <path d="M374 168 H272" stroke="#34d399" strokeWidth="2.5" strokeDasharray="5 4"><DashFlow reverse /></path><path d="M278 161 l-8 7 8 7" fill="none" stroke="#34d399" strokeWidth="2.5" />
      <text x="320" y="186" textAnchor="middle" fontSize="11" fill="#6ee7b7">결과 · 검증</text>
      {agents.map((a) => (
        <g key={a.t}>
          <line x1="420" y1="150" x2={a.x} y2={a.y} stroke={a.c} strokeOpacity="0.7" strokeDasharray="4 4"><DashFlow reverse /></line>
          <rect x={a.x - 48} y={a.y - 16} width="96" height="32" rx="16" fill="#0b0b12" stroke={a.c} strokeWidth="1.5" />
          <text x={a.x} y={a.y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={a.c}>{a.t}</text>
        </g>
      ))}
    </svg>
  )
}

function Bot({ x, y, color, bug = false }: { x: number; y: number; color: string; bug?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <line x1="0" y1="-22" x2="0" y2="-14" stroke={color} strokeWidth="2" />
      <circle cx="0" cy="-24" r="3" fill={color} />
      <rect x="-20" y="-14" width="40" height="30" rx="8" fill="#0b0b12" stroke={color} strokeWidth="2" />
      <circle cx="-8" cy="0" r="3.5" fill={color} /><circle cx="8" cy="0" r="3.5" fill={color} />
      {bug && (
        <g>
          <circle cx="20" cy="-14" r="9" fill="#7f1d1d" stroke="#f87171" strokeWidth="1.5">
            <animate attributeName="r" values="8;11;8" dur="1.2s" repeatCount="indefinite" />
          </circle>
          <text x="20" y="-10" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fecaca">!</text>
        </g>
      )}
    </g>
  )
}

function Person({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
      <circle cx="0" cy="-10" r="10" fill="#0b0b12" />
      <path d="M-18 24 q18 -26 36 0" fill="#0b0b12" />
    </g>
  )
}

export function CompeteVsCommandSvg() {
  const same = ["문법 암기", "알고리즘 풀이", "단순 구현"]
  const bots = [
    { x: 440, t: "코드 작성", c: "#818cf8" },
    { x: 520, t: "테스트", c: "#38bdf8" },
    { x: 600, t: "문서화", c: "#fbbf24", bug: true },
    { x: 680, t: "배포", c: "#f472b6" },
  ]
  return (
    <svg viewBox="0 0 760 340" className="h-auto w-full" style={font} role="img" aria-label="AI와 같은 일로 경쟁하는 사람과 AI를 지휘하는 5년차 경력직의 비교">
      <defs><filter id="cc-glow"><feGaussianBlur stdDeviation="9" /></filter></defs>

      <rect x="10" y="10" width="330" height="320" rx="18" fill="#f87171" fillOpacity="0.04" stroke="#f87171" strokeOpacity="0.35" />
      <text x="175" y="42" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fca5a5">AI와 경쟁하는 사람</text>
      <Person x={95} y={100} color="#9ca3af" />
      <text x="95" y="146" textAnchor="middle" fontSize="11" fill="#9ca3af">취준생</text>
      <text x="175" y="108" textAnchor="middle" fontSize="20" fontWeight="800" fill="#f87171">VS</text>
      <Bot x={255} y={100} color="#f87171" />
      <text x="255" y="146" textAnchor="middle" fontSize="11" fill="#fca5a5">AI</text>
      {same.map((t, i) => (
        <g key={t}>
          <rect x="40" y={166 + i * 38} width="270" height="28" rx="8" fill="#18181b" stroke="#3f3f46" />
          <text x="56" y={185 + i * 38} fontSize="12" fill="#d4d4d8">{t}</text>
          <rect x="150" y={176 + i * 38} width="60" height="7" rx="3.5" fill="#6b7280" />
          <rect x="150" y={176 + i * 38} width="150" height="7" rx="3.5" fill="#f87171" fillOpacity="0.8">
            <animate attributeName="width" values="20;150;150" dur="2.5s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </rect>
        </g>
      ))}
      <text x="175" y="306" textAnchor="middle" fontSize="13" fontWeight="800" fill="#f87171">같은 일을 하면 → 대체됩니다</text>

      <rect x="370" y="10" width="380" height="320" rx="18" fill="#34d399" fillOpacity="0.04" stroke="#34d399" strokeOpacity="0.4" />
      <text x="560" y="42" textAnchor="middle" fontSize="15" fontWeight="800" fill="#6ee7b7">AI를 지휘하는 사람 · 5년차의 일하는 방식</text>
      <circle cx="560" cy="92" r="34" fill="#a78bfa" opacity="0.35" filter="url(#cc-glow)" />
      <Person x={560} y={88} color="#ddd6fe" />
      {[{ x: 452, t: "설계 · 기획", c: "#c084fc" }, { x: 668, t: "검증 · 디버깅", c: "#34d399" }].map((b) => (
        <g key={b.t}>
          <rect x={b.x - 50} y="76" width="100" height="26" rx="13" fill="#0b0b12" stroke={b.c} />
          <text x={b.x} y="93" textAnchor="middle" fontSize="11" fontWeight="700" fill={b.c}>{b.t}</text>
        </g>
      ))}
      <text x="560" y="140" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7dd3fc">▼ AI 지휘 (프롬프트 · 업무 분배)</text>
      {bots.map((b, i) => (
        <g key={b.t}>
          <path d={`M560 148 C 560 180, ${b.x} 170, ${b.x} 204`} fill="none" stroke={b.c} strokeOpacity="0.6" strokeWidth="1.5" strokeDasharray="4 4"><DashFlow /></path>
          <Pulse path={`M560 148 C 560 180, ${b.x} 170, ${b.x} 204`} color={b.c} dur="2s" begin={`${i * 0.4}s`} />
          <Bot x={b.x} y={232} color={b.c} bug={b.bug} />
          <text x={b.x} y="268" textAnchor="middle" fontSize="11" fill={b.c}>{b.t}</text>
        </g>
      ))}
      <path d="M668 102 C 668 150, 640 170, 624 204" fill="none" stroke="#34d399" strokeWidth="2" />
      <circle cx="622" cy="212" r="11" fill="none" stroke="#34d399" strokeWidth="2.5" />
      <line x1="630" y1="220" x2="640" y2="232" stroke="#34d399" strokeWidth="3" strokeLinecap="round" />
      <text x="560" y="306" textAnchor="middle" fontSize="13" fontWeight="800" fill="#6ee7b7">AI의 오류를 잡고 책임지면 → 대체 불가</text>
    </svg>
  )
}

export function ExperienceStairsSvg() {
  const steps = [
    { t: "기획", c: "#c084fc" },
    { t: "설계", c: "#818cf8" },
    { t: "AI 지휘", c: "#38bdf8" },
    { t: "검증 · 디버깅", c: "#34d399" },
    { t: "출시 · 운영", c: "#fbbf24" },
  ]
  const sx = (i: number) => 60 + i * 120
  const sy = (i: number) => 250 - i * 36
  const climb = steps.map((_, i) => `${i ? "L" : "M"}${sx(i) + 60} ${sy(i) - 14}`).join(" ")
  return (
    <svg viewBox="0 0 760 332" className="h-auto w-full" style={font} role="img" aria-label="서비스 수준 프로젝트를 하나씩 완성할수록 경력직의 역량에 가까워지는 계단">
      <defs>
        <linearGradient id="es-step" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.45" />
          <stop offset="1" stopColor="#8b5cf6" stopOpacity="0.03" />
        </linearGradient>
      </defs>
      <line x1="40" x2="720" y1="30" y2="30" stroke="#34d399" strokeWidth="1.5" strokeDasharray="6 5"><DashFlow /></line>
      <text x="44" y="20" fontSize="12" fontWeight="800" fill="#6ee7b7">기업이 원하는 '5년차의 역량' 라인</text>
      {steps.map((s, i) => (
        <g key={s.t}>
          <rect x={sx(i)} y={sy(i)} width="120" height={300 - sy(i)} fill="url(#es-step)" stroke={s.c} strokeOpacity="0.6" />
          <rect x={sx(i)} y={sy(i)} width="120" height="4" fill={s.c} />
          <text x={sx(i) + 60} y={sy(i) + 24} textAnchor="middle" fontSize="11" fill="#9ca3af">서비스 프로젝트 {i + 1}</text>
          <text x={sx(i) + 60} y={sy(i) + 44} textAnchor="middle" fontSize="13" fontWeight="800" fill={s.c}>+ {s.t}</text>
        </g>
      ))}
      <path d={climb} fill="none" stroke="#f5f3ff" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="3 5" />
      <Pulse path={climb} color="#f5f3ff" dur="5s" r={6} />
      <g transform={`translate(${sx(4) + 60} ${sy(4) - 22})`}>
        <line x1="0" y1="0" x2="0" y2="-34" stroke="#fbbf24" strokeWidth="2.5" />
        <path d="M0 -34 L34 -26 L0 -16Z" fill="#fbbf24">
          <animate attributeName="d" values="M0 -34 L34 -26 L0 -16Z;M0 -34 L30 -22 L0 -16Z;M0 -34 L34 -26 L0 -16Z" dur="1.6s" repeatCount="indefinite" />
        </path>
      </g>
      <text x="646" y="52" fontSize="13" fontWeight="800" fill="#fde68a">경력 같은 신입</text>
      <text x="60" y="324" fontSize="11" fill="#9ca3af">연차가 아니라 '끝까지 만들어 본 횟수'가 역량을 만듭니다</text>
    </svg>
  )
}

type LadderLevel = { name: string; years: string; role: string; skills: string[]; risk: string; color: string }

export function CareerLadderSvg({ levels }: { levels: LadderLevel[] }) {
  const rowH = 78
  const top = 40
  const riskW: Record<string, number> = { "매우 낮음": 12, "낮음": 30, "중간": 60, "높음": 100 }
  return (
    <svg viewBox="0 0 760 400" className="h-auto w-full" style={font} role="img" aria-label="주니어, 미들, 시니어, 프로덕트 리더로 이어지는 계층과 필요 역량, AI 대체 위험도">
      <defs>
        <filter id="cl-glow"><feGaussianBlur stdDeviation="8" /></filter>
        <linearGradient id="cl-ai" x1="0" x2="0" y1="1" y2="0">
          <stop offset="0" stopColor="#f87171" stopOpacity="0.55" />
          <stop offset="1" stopColor="#f87171" stopOpacity="0" />
        </linearGradient>
      </defs>
      <text x="20" y="24" fontSize="12" fontWeight="800" fill="#9ca3af">계층</text>
      <text x="300" y="24" fontSize="12" fontWeight="800" fill="#9ca3af">필요 역량</text>
      <text x="640" y="24" fontSize="12" fontWeight="800" fill="#9ca3af">AI 대체 위험</text>
      <rect x="10" y={top + rowH * 2} width="740" height={rowH * 2} rx="12" fill="url(#cl-ai)">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
      </rect>
      <text x="745" y={top + rowH * 4 - 8} textAnchor="end" fontSize="10" fontWeight="700" fill="#fca5a5">▲ AI가 아래 칸부터 대체</text>
      {levels.map((l, i) => {
        const y = top + i * rowH
        const indent = (levels.length - 1 - i) * 0
        const w = 190
        return (
          <g key={l.name}>
            <rect x={20 + indent} y={y + 6} width={w} height={rowH - 14} rx="12" fill="#0b0b12" stroke={l.color} strokeWidth="2" />
            {i === 0 && <rect x="20" y={y + 6} width={w} height={rowH - 14} rx="12" fill={l.color} opacity="0.25" filter="url(#cl-glow)" />}
            <text x="36" y={y + 32} fontSize="15" fontWeight="800" fill={l.color}>{l.name}</text>
            <text x="36" y={y + 52} fontSize="11" fill="#9ca3af">{l.years} · {l.role}</text>
            {l.skills.map((sk, j) => {
              const sx = 248 + j * 95
              return (
                <g key={sk}>
                  <rect x={sx} y={y + 24} width="92" height="28" rx="14" fill={l.color} fillOpacity="0.12" stroke={l.color} strokeOpacity="0.5" />
                  <text x={sx + 46} y={y + 42} textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#e5e7eb">{sk}</text>
                </g>
              )
            })}
            <rect x="630" y={y + 32} width="110" height="10" rx="5" fill="#ffffff" fillOpacity="0.06" />
            <rect x="630" y={y + 32} width={riskW[l.risk] * 1.1} height="10" rx="5" fill={riskW[l.risk] > 50 ? "#f87171" : riskW[l.risk] > 20 ? "#fbbf24" : "#34d399"} />
            <text x="630" y={y + 60} fontSize="10.5" fill="#d1d5db">{l.risk}</text>
            {i < levels.length - 1 && (
              <path d={`M60 ${y + rowH + 4} v-8`} stroke="#6b7280" strokeWidth="2" />
            )}
          </g>
        )
      })}
      <path id="cl-shortcut" d={`M222 ${top + rowH * 3 + 40} C 240 ${top + rowH * 2}, 240 ${top + rowH}, 222 ${top + 36}`} fill="none" stroke="#34d399" strokeWidth="2.5" strokeDasharray="6 5">
        <animate attributeName="stroke-dashoffset" from="220" to="0" dur="6s" repeatCount="indefinite" />
      </path>
      <circle r="5" fill="#6ee7b7">
        <animateMotion dur="3s" repeatCount="indefinite" path={`M222 ${top + rowH * 3 + 40} C 240 ${top + rowH * 2}, 240 ${top + rowH}, 222 ${top + 36}`} />
      </circle>
      <text x="20" y={top + rowH * 4 + 22} fontSize="11" fontWeight="800" fill="#6ee7b7">┆ 초록 점선 — 서비스 수준 프로젝트 경험은 사다리를 빠르게 오르는 지름길</text>
    </svg>
  )
}

export function JobCreationSvg() {
  const jobs = Array.from({ length: 12 })
  const path = ["프로젝트", "서비스", "사용자", "새로운 일"]
  return (
    <svg viewBox="0 0 760 300" className="h-auto w-full" style={font} role="img" aria-label="줄어드는 기존 일자리와 프로젝트로 새로운 일을 만드는 창직의 길">
      <defs><filter id="jc-glow"><feGaussianBlur stdDeviation="10" /></filter></defs>
      <rect x="10" y="10" width="310" height="280" rx="18" fill="#ffffff" fillOpacity="0.02" stroke="#ffffff" strokeOpacity="0.08" />
      <text x="165" y="40" textAnchor="middle" fontSize="14" fontWeight="800" fill="#fca5a5">기존 일자리</text>
      {jobs.map((_, i) => {
        const x = 50 + (i % 4) * 62
        const y = 64 + Math.floor(i / 4) * 62
        const fade = i >= 5
        return (
          <g key={i}>
            <rect x={x} y={y} width="46" height="46" rx="8" fill="#18181b" stroke={fade ? "#3f3f46" : "#9ca3af"}>
              {fade && <animate attributeName="opacity" values="1;0.15;1" dur="4s" begin={`${(i - 5) * 0.35}s`} repeatCount="indefinite" />}
            </rect>
            <circle cx={x + 23} cy={y + 17} r="7" fill="none" stroke={fade ? "#3f3f46" : "#d1d5db"} strokeWidth="1.5" />
            <path d={`M${x + 11} ${y + 38} q12 -14 24 0`} fill="none" stroke={fade ? "#3f3f46" : "#d1d5db"} strokeWidth="1.5" />
            {fade && <path d={`M${x + 6} ${y + 6} L${x + 40} ${y + 40}`} stroke="#f87171" strokeOpacity="0.6" strokeWidth="1.5" />}
          </g>
        )
      })}
      <text x="165" y="270" textAnchor="middle" fontSize="12" fontWeight="700" fill="#f87171">▼ AI로 점점 줄어드는 자리</text>

      <path d="M330 150 H380" stroke="#a78bfa" strokeWidth="2.5" /><path d="M374 143 l8 7 -8 7" fill="none" stroke="#a78bfa" strokeWidth="2.5" />

      <rect x="390" y="10" width="360" height="280" rx="18" fill="#34d399" fillOpacity="0.04" stroke="#34d399" strokeOpacity="0.4" />
      <text x="570" y="40" textAnchor="middle" fontSize="14" fontWeight="800" fill="#6ee7b7">창직 — 내가 일을 만든다</text>
      {path.map((t, i) => {
        const x = 430 + i * 92
        const y = 230 - i * 45
        const last = i === path.length - 1
        return (
          <g key={t}>
            {i > 0 && <line x1={x - 92} y1={y + 45} x2={x} y2={y} stroke="#34d399" strokeOpacity="0.6" strokeWidth="2" strokeDasharray="5 4"><animate attributeName="stroke-dashoffset" from="90" to="0" dur="3s" repeatCount="indefinite" /></line>}
            {last && <circle cx={x} cy={y} r="34" fill="#fbbf24" opacity="0.35" filter="url(#jc-glow)" />}
            <circle cx={x} cy={y} r={last ? 32 : 26} fill="#0b0b12" stroke={last ? "#fbbf24" : "#34d399"} strokeWidth="2" />
            <text x={x} y={y + 4} textAnchor="middle" fontSize={last ? 11 : 11} fontWeight="800" fill={last ? "#fde68a" : "#a7f3d0"}>{t}</text>
          </g>
        )
      })}
      <circle r="5" fill="#f5f3ff">
        <animateMotion dur="4s" repeatCount="indefinite" path="M430 230 L522 185 L614 140 L706 95" />
      </circle>
      <text x="706" y="48" textAnchor="middle" fontSize="16">✦</text>
      <text x="570" y="270" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6ee7b7">▲ 서비스를 만들어 본 사람만 갈 수 있는 길</text>
    </svg>
  )
}
