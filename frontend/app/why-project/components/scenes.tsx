/**
 * ‘왜 프로젝트인가’ 메인 페이지의 장면 · 목업 일러스트.
 * 캐릭터와 그림자 · 그라데이션 정의는 바이브 코딩 페이지의 부품을 함께 씁니다.
 */
import { Kid, Robo } from "../vibe-coding/scenes"
import { Defs } from "../vibe-coding/mockups"

const font = { fontFamily: "inherit" }
const mono = { fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }
const BG = "#0b0b12"
const INK = "#1f2937"
const halo = { paintOrder: "stroke" as const }

type Kind = "paper" | "research" | "campaign" | "service" | "product"

/** 결과물 종류별 작은 그림 (중심 원점, 약 72×52) */
function MiniArtifact({ kind, c }: { kind: Kind; c: string }) {
  if (kind === "paper")
    return (
      <g>
        <rect x="-20" y="-26" width="40" height="52" rx="4" fill="#f8fafc" />
        <rect x="-14" y="-19" width="20" height="5" rx="2.5" fill={c} />
        {[0, 1, 2, 3, 4].map((k) => <rect key={k} x="-14" y={-8 + k * 7} width={[28, 24, 28, 18, 26][k]} height="3" rx="1.5" fill="#cbd5e1" />)}
      </g>
    )
  if (kind === "research")
    return (
      <g>
        <path d="M-26 22 V-24 M-26 22 H28" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" fill="none" />
        {[14, 26, 20, 38].map((h, k) => <rect key={k} x={-18 + k * 12} y={20 - h} width="8" height={h} rx="2" fill={c} fillOpacity={0.55 + k * 0.15} />)}
        <path d="M-18 -4 L-6 -16 L6 -10 L24 -26" stroke="#f9fafb" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    )
  if (kind === "campaign")
    return (
      <g>
        <rect x="-16" y="-27" width="32" height="54" rx="7" fill={BG} stroke={c} strokeWidth="2" />
        <rect x="-12" y="-21" width="24" height="34" rx="3" fill={c} fillOpacity="0.3" />
        <path d="M-4 -11 L7 -4 L-4 3 Z" fill="#ffffff" />
        <rect x="-9" y="17" width="18" height="3.5" rx="1.75" fill={c} />
      </g>
    )
  if (kind === "service")
    return (
      <g>
        <rect x="-30" y="-22" width="60" height="44" rx="6" fill={BG} stroke={c} strokeWidth="2" />
        <rect x="-30" y="-22" width="60" height="10" rx="5" fill={c} fillOpacity="0.35" />
        <rect x="-24" y="-6" width="22" height="20" rx="4" fill={c} fillOpacity="0.4" />
        <rect x="3" y="-6" width="21" height="5" rx="2.5" fill="#e5e7eb" fillOpacity="0.8" />
        <rect x="3" y="3" width="15" height="4" rx="2" fill="#6b7280" />
        <rect x="3" y="10" width="21" height="6" rx="3" fill={c} />
      </g>
    )
  return (
    <g>
      <rect x="-28" y="-18" width="56" height="36" rx="5" fill="#064e3b" stroke={c} strokeWidth="2" />
      <rect x="-20" y="-10" width="18" height="18" rx="2" fill="#0b0b12" stroke={c} />
      {[-14, -8].map((x) => <path key={x} d={`M${x} -18 V-24 M${x} 18 V24`} stroke={c} strokeWidth="2" />)}
      <rect x="4" y="-10" width="18" height="9" rx="2" fill="#0b0b12" />
      <circle cx="18" cy="8" r="4" fill="#f87171">
        <animate attributeName="opacity" values="1;0.2;1" dur="1.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="8" cy="8" r="2.5" fill="#fbbf24" />
    </g>
  )
}

/** 히어로 — 하나의 질문에서 다섯 가지 결과물이 태어난다 */
export function WhyHeroSceneSvg() {
  const items: { k: Kind; t: string; c: string; x: number; y: number }[] = [
    { k: "paper", t: "논문", c: "#c084fc", x: 86, y: 196 },
    { k: "research", t: "리서치", c: "#4ade80", x: 200, y: 92 },
    { k: "campaign", t: "캠페인", c: "#fbbf24", x: 360, y: 50 },
    { k: "service", t: "서비스", c: "#818cf8", x: 520, y: 92 },
    { k: "product", t: "제품", c: "#22d3ee", x: 634, y: 196 },
  ]
  return (
    <svg viewBox="0 0 720 360" className="mx-auto h-auto w-full max-w-4xl" style={font} role="img" aria-label="학생과 AI 로봇이 하나의 질문을 들어 올리고, 그 질문에서 논문, 리서치, 캠페인, 서비스, 제품 다섯 가지 결과물이 뻗어 나오는 장면">
      <defs>
        <radialGradient id="wh-orb" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#c4b5fd" />
          <stop offset="1" stopColor="#6d28d9" />
        </radialGradient>
        <radialGradient id="wh-floor" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.4" />
          <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
        <filter id="wh-glow"><feGaussianBlur stdDeviation="14" /></filter>
      </defs>
      {[[30, 60], [120, 30], [290, 20], [450, 26], [600, 40], [690, 110], [40, 300], [680, 300]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.3" fill="#ffffff">
          <animate attributeName="opacity" values="0.15;0.9;0.15" dur={`${2 + (i % 3)}s`} begin={`${i * 0.3}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <ellipse cx="360" cy="318" rx="250" ry="24" fill="url(#wh-floor)" />

      {items.map((it, i) => (
        <g key={it.k}>
          <path d={`M360 176 Q${(360 + it.x) / 2} ${it.y - 20} ${it.x} ${it.y}`} fill="none" stroke={it.c} strokeWidth="1.6" strokeDasharray="4 6" strokeOpacity="0.7">
            <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1.4s" repeatCount="indefinite" />
          </path>
          <g>
            <animateTransform attributeName="transform" type="translate" values="0 0;0 -6;0 0" dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
            <rect x={it.x - 50} y={it.y - 40} width="100" height="80" rx="18" fill={BG} stroke={it.c} strokeWidth="1.8" />
            <rect x={it.x - 50} y={it.y - 40} width="100" height="80" rx="18" fill={it.c} fillOpacity="0.07" />
            <g transform={`translate(${it.x} ${it.y - 4}) scale(0.92)`}><MiniArtifact kind={it.k} c={it.c} /></g>
            <rect x={it.x - 28} y={it.y + 30} width="56" height="22" rx="11" fill={it.c} />
            <text x={it.x} y={it.y + 45} textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#0b0b12">{it.t}</text>
          </g>
        </g>
      ))}

      {/* question orb */}
      <circle cx="360" cy="176" r="46" fill="#8b5cf6" opacity="0.55" filter="url(#wh-glow)" />
      <circle cx="360" cy="176" r="38" fill="url(#wh-orb)" stroke="#f5f3ff" strokeWidth="2">
        <animate attributeName="r" values="36;40;36" dur="3s" repeatCount="indefinite" />
      </circle>
      <text x="360" y="192" textAnchor="middle" fontSize="44" fontWeight="800" fill="#ffffff">?</text>

      <Kid x={300} y={320} s={1.28} arm="cheer" />
      <Robo x={424} y={314} s={1.12} arm="cheer" />
      <text x="360" y="352" textAnchor="middle" fontSize="14" fontWeight="800" fill="#f5f3ff">하나의 질문 → 다섯 가지 결과물</text>
    </svg>
  )
}

/** 06 — 사람은 기획 · 판단, AI 에이전트 팀은 실행 */
export function AgentTeamSceneSvg() {
  const human = ["문제 정의", "기획 · 설계", "프롬프트로 지시", "결과 검증 · 판단"]
  const agents = [
    { t: "코드 작성", x: 440, y: 132, c: "#818cf8" },
    { t: "테스트", x: 612, y: 132, c: "#34d399" },
    { t: "자료 조사", x: 440, y: 284, c: "#fbbf24" },
    { t: "디자인 · 문서", x: 612, y: 284, c: "#f472b6" },
  ]
  const glyph = (i: number, c: string) => {
    const s = { fill: "none", stroke: c, strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
    if (i === 0) return <path {...s} d="M-5 -6 L-11 0 L-5 6 M5 -6 L11 0 L5 6 M2 -8 L-2 8" />
    if (i === 1) return <path {...s} d="M-8 0 l5 5 10 -11" strokeWidth="2.6" />
    if (i === 2) return <g {...s}><circle cx="-2" cy="-2" r="6" /><path d="M3 3 l6 6" strokeWidth="3" /></g>
    return <g {...s}><path d="M-8 8 L6 -6 L10 -2 L-4 12 L-9 13 Z" fill={c} fillOpacity="0.3" /></g>
  }
  return (
    <svg viewBox="0 0 720 340" className="h-auto w-full" style={font} role="img" aria-label="왼쪽의 학생이 문제 정의, 기획과 설계, 프롬프트 지시, 결과 검증을 맡고, 오른쪽의 AI 로봇 네 대가 코드 작성, 테스트, 자료 조사, 디자인과 문서를 실행하는 협업 장면">
      <defs>
        <marker id="ag-arrow-v" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#c4b5fd" /></marker>
        <marker id="ag-arrow-g" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#34d399" /></marker>
      </defs>
      {/* human */}
      <rect x="16" y="20" width="250" height="300" rx="22" fill="#1e1035" stroke="#c4b5fd" strokeWidth="1.8" />
      <Kid x={70} y={118} s={1.05} arm="point" />
      <text x="116" y="62" fontSize="19" fontWeight="800" fill="#ffffff">사람</text>
      <text x="116" y="82" fontSize="11" fill="#c4b5fd">기획자 · 설계자 · 판단자</text>
      {human.map((h, i) => (
        <g key={h}>
          <rect x="34" y={140 + i * 42} width="214" height="34" rx="10" fill="#2e1065" stroke="#a78bfa" strokeOpacity="0.4" />
          <circle cx="54" cy={157 + i * 42} r="10" fill="#a78bfa" />
          <text x="54" y={161 + i * 42} textAnchor="middle" fontSize="11" fontWeight="800" fill="#0b0b12">{i + 1}</text>
          <text x="74" y={162 + i * 42} fontSize="13" fontWeight="700" fill="#ede9fe">{h}</text>
        </g>
      ))}

      {/* flows */}
      <path d="M270 130 H346" stroke="#c4b5fd" strokeWidth="2.5" markerEnd="url(#ag-arrow-v)" />
      <circle r="4" fill="#f5f3ff"><animateMotion dur="1.6s" repeatCount="indefinite" path="M270 130 H342" /></circle>
      <text x="308" y="120" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#c4b5fd">지시</text>
      <path d="M346 196 H274" stroke="#34d399" strokeWidth="2.5" strokeDasharray="5 5" markerEnd="url(#ag-arrow-g)">
        <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1s" repeatCount="indefinite" />
      </path>
      <text x="310" y="216" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#6ee7b7">결과 · 검증</text>

      {/* agent team */}
      <rect x="352" y="20" width="352" height="300" rx="22" fill="#38bdf8" fillOpacity="0.04" stroke="#38bdf8" strokeOpacity="0.35" strokeDasharray="6 5" />
      <text x="528" y="44" textAnchor="middle" fontSize="11" fontWeight="800" letterSpacing="1.5" fill="#7dd3fc">AI 에이전트 팀 — 실행</text>
      {agents.map((a, i) => (
        <g key={a.t}>
          <Robo x={a.x - 26} y={a.y} s={0.92} color={a.c} arm="out" />
          <rect x={a.x + 10} y={a.y - 70} width="46" height="38" rx="9" fill={BG} stroke={a.c} strokeWidth="1.6" />
          <g transform={`translate(${a.x + 33} ${a.y - 51})`}>{glyph(i, a.c)}</g>
          <rect x={a.x - 62} y={a.y + 8} width="124" height="24" rx="12" fill={BG} stroke={a.c} strokeOpacity="0.7" />
          <text x={a.x} y={a.y + 24.5} textAnchor="middle" fontSize="12" fontWeight="800" fill={a.c}>{a.t}</text>
        </g>
      ))}
    </svg>
  )
}

function StopIcon({ i, c }: { i: number; c: string }) {
  const s = { fill: "none", stroke: c, strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
  if (i === 0) return <g {...s}><circle cx="-3" cy="-3" r="8.5" fill={c} fillOpacity="0.15" /><path d="M4 4 L12 12" strokeWidth="3.5" /></g>
  if (i === 1) return <g {...s}><path d="M0 -8 C-5 -12, -11 -12, -13 -9 V10 C-11 7, -5 7, 0 11 C5 7, 11 7, 13 10 V-9 C11 -12, 5 -12, 0 -8 Z" fill={c} fillOpacity="0.15" /><path d="M0 -8 V11" /></g>
  if (i === 2) return <g {...s}><rect x="-12" y="-11" width="24" height="22" rx="3" fill={c} fillOpacity="0.15" /><path d="M-12 -3 H12 M-4 -11 V11" strokeWidth="1.6" /></g>
  if (i === 3) return <g {...s}><rect x="-9" y="-9" width="18" height="18" rx="2" fill={c} fillOpacity="0.15" /><path d="M-5 -13 V-9 M5 -13 V-9 M-5 9 V13 M5 9 V13 M-13 -4 H-9 M-13 4 H-9 M9 -4 H13 M9 4 H13" strokeWidth="1.8" /></g>
  if (i === 4) return <g {...s}><circle cx="-6" cy="-5" r="4.5" fill={c} fillOpacity="0.15" /><circle cx="7" cy="-5" r="4.5" fill={c} fillOpacity="0.15" /><path d="M-13 10 q7 -10 13 0 M0 10 q7 -10 13 0" /></g>
  if (i === 5) return <g {...s}><path d="M0 -14 C7 -8, 8 3, 5 9 H-5 C-8 3, -7 -8, 0 -14 Z" fill={c} fillOpacity="0.25" /><circle cx="0" cy="-3" r="2.6" /><path d="M-5 5 L-10 12 L-5 10 M5 5 L10 12 L5 10" /></g>
  return <g {...s}><path d="M-10 -12 H5 L11 -6 V12 H-10 Z" fill={c} fillOpacity="0.15" /><path d="M-5 -3 H6 M-5 3 H6 M-5 8 H2" strokeWidth="1.6" /></g>
}

/** 08 — 7단계 프로젝트 여정 지도 */
export function ProcessJourneySvg({ steps }: { steps: { step: string; title: string; output: string }[] }) {
  const colors = ["#c084fc", "#a78bfa", "#818cf8", "#38bdf8", "#2dd4bf", "#34d399", "#fbbf24"]
  const pts = [[82, 250], [176, 186], [274, 226], [372, 152], [470, 190], [568, 110], [660, 150]]
  // 정거장 사이를 수평 접선 베지어로 이어 길이 그림 밖으로 튀지 않게 한다
  const road = [[16, 276], ...pts].reduce((d, [x, y], i, arr) => {
    if (i === 0) return `M${x} ${y}`
    const [px, py] = arr[i - 1]
    const h = (x - px) / 2
    return `${d} C${px + h} ${py}, ${x - h} ${y}, ${x} ${y}`
  }, "")
  return (
    <svg viewBox="0 0 720 330" className="h-auto w-full" style={font} role="img" aria-label="문제 발견, 리서치, 기획과 설계, 프로토타입, 테스트와 개선, 서비스 출시, 보고서와 발표로 이어지는 7단계 여정. 프로토타입과 테스트 사이는 될 때까지 반복한다">
      <defs>
        <linearGradient id="pj-road" x1="0" x2="1">
          {colors.map((c, i) => <stop key={c} offset={i / (colors.length - 1)} stopColor={c} />)}
        </linearGradient>
        <marker id="pj-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#fde68a" /></marker>
      </defs>
      <path d="M0 330 V298 Q120 256 240 298 T480 284 T720 262 V330 Z" fill="#ffffff" fillOpacity="0.03" />
      <path d={road} fill="none" stroke="#1f2937" strokeWidth="20" strokeLinecap="round" />
      <path d={road} fill="none" stroke="url(#pj-road)" strokeWidth="20" strokeLinecap="round" strokeOpacity="0.22" />
      <path d={road} fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2" strokeDasharray="8 10">
        <animate attributeName="stroke-dashoffset" from="36" to="0" dur="1.6s" repeatCount="indefinite" />
      </path>
      <g>
        <animateMotion dur="13s" repeatCount="indefinite" path={road} />
        <circle r="11" fill="#fde68a" opacity="0.25" />
        <circle r="6" fill="#fde68a" />
      </g>
      {/* iterate loop between prototype and test */}
      <path d={`M${pts[4][0]} ${pts[4][1] - 34} C${pts[4][0]} ${pts[4][1] - 96}, ${pts[3][0]} ${pts[3][1] - 80}, ${pts[3][0]} ${pts[3][1] - 34}`} fill="none" stroke="#fde68a" strokeWidth="1.8" strokeDasharray="5 5" markerEnd="url(#pj-arrow)" />
      <rect x="366" y="52" width="110" height="22" rx="11" fill={BG} stroke="#fde68a" strokeOpacity="0.7" />
      <text x="421" y="67" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fde68a">될 때까지 반복</text>

      <Kid x={28} y={278} s={0.7} arm="wave" />
      {steps.map((st, i) => {
        const [x, y] = pts[i]
        const c = colors[i]
        const launch = i === 5
        return (
          <g key={st.step}>
            {launch && (
              <circle cx={x} cy={y} r="30" fill="none" stroke={c} strokeWidth="2">
                <animate attributeName="r" values="28;40;28" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={x} cy={y} r="27" fill={launch ? "#052e1a" : BG} stroke={c} strokeWidth={launch ? 3.5 : 2.5} />
            <g transform={`translate(${x} ${y})`}><StopIcon i={i} c={c} /></g>
            <circle cx={x - 20} cy={y - 20} r="10" fill={c} />
            <text x={x - 20} y={y - 16} textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#0b0b12">{i + 1}</text>
            <text x={x} y={y + 46} textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#f9fafb" stroke={BG} strokeWidth="5" style={halo}>{st.title}</text>
            <text x={x} y={y + 61} textAnchor="middle" fontSize="10" fill={c} stroke={BG} strokeWidth="4" style={halo}>{st.output}</text>
          </g>
        )
      })}
    </svg>
  )
}

type Output = { kind: string; title: string; color: string; output: string }

/** 09 — 하나의 질문에서 나온 다섯 가지 실제 결과물 */
export function FiveOutputsMockSvg({ items }: { items: Output[] }) {
  const id = "fo"
  const W = 172
  const X = (i: number) => 24 + i * 185
  return (
    <svg viewBox="0 0 960 430" className="h-auto w-full" style={font} role="img" aria-label="우리 교실 공기 괜찮을까라는 하나의 탐구 질문에서 소논문, 측정 리포트, 30초 캠페인 영상, 환기 알림 웹 대시보드, 아두이노 이산화탄소 측정기 다섯 가지 결과물이 만들어진 모습">
      <Defs id={id} />
      {/* question */}
      <rect x="290" y="10" width="380" height="54" rx="27" fill={BG} filter={`url(#${id}-soft)`} />
      <rect x="290" y="10" width="380" height="54" rx="27" fill="#8b5cf6" fillOpacity="0.14" stroke={`url(#${id}-brand)`} strokeWidth="2" />
      <text x="480" y="32" textAnchor="middle" fontSize="10.5" fontWeight="800" letterSpacing="1.5" fill="#c4b5fd">하나의 탐구 질문</text>
      <text x="480" y="53" textAnchor="middle" fontSize="16" fontWeight="800" fill="#ffffff">우리 교실 공기, 괜찮을까?</text>
      {items.map((it, i) => {
        const cx = X(i) + W / 2
        return (
          <path key={it.kind} d={`M480 64 C480 92, ${cx} 78, ${cx} 108`} fill="none" stroke={it.color} strokeWidth="1.6" strokeDasharray="4 5" strokeOpacity="0.8">
            <animate attributeName="stroke-dashoffset" from="18" to="0" dur="1.2s" repeatCount="indefinite" />
          </path>
        )
      })}
      {items.map((it, i) => <ellipse key={it.kind} cx={X(i) + W / 2} cy="230" rx="80" ry="90" fill={it.color} opacity="0.13" filter={`url(#${id}-blur)`} />)}

      {/* 1 paper */}
      <g transform={`translate(${X(0)} 112)`}>
        <g transform="rotate(-3 86 115)">
          <rect x="18" y="4" width="136" height="216" rx="6" fill="#f8fafc" filter={`url(#${id}-soft)`} />
          <text x="30" y="26" fontSize="7.5" fontWeight="700" fill="#7c3aed">소논문 · 과학 탐구</text>
          <text x="30" y="44" fontSize="11" fontWeight="800" fill={INK}>교실 CO₂ 농도와</text>
          <text x="30" y="58" fontSize="11" fontWeight="800" fill={INK}>집중도의 관계</text>
          <rect x="30" y="66" width="112" height="1" fill="#cbd5e1" />
          <text x="30" y="80" fontSize="7" fontWeight="800" fill="#64748b">초록</text>
          {[0, 1, 2, 3].map((k) => <rect key={k} x="30" y={86 + k * 8} width={[112, 106, 110, 70][k]} height="3.5" rx="1.75" fill="#cbd5e1" />)}
          <rect x="30" y="124" width="112" height="60" rx="4" fill="#f1f5f9" stroke="#e2e8f0" />
          <path d="M40 176 V132 M40 176 H134" stroke="#94a3b8" />
          {[[52, 142], [62, 150], [74, 148], [86, 158], [98, 160], [110, 168], [122, 166]].map(([x, y], k) => <circle key={k} cx={x} cy={y} r="2.6" fill={items[0].color} />)}
          <path d="M46 138 L128 170" stroke="#7c3aed" strokeWidth="1.2" strokeDasharray="3 2" />
          {[0, 1, 2].map((k) => <rect key={k} x="30" y={192 + k * 8} width={[112, 104, 60][k]} height="3.5" rx="1.75" fill="#cbd5e1" />)}
        </g>
      </g>

      {/* 2 research report */}
      <g transform={`translate(${X(1)} 112)`}>
        <rect x="14" y="6" width="144" height="212" rx="10" fill={`url(#${id}-glass)`} filter={`url(#${id}-soft)`} />
        <rect x="14" y="6" width="144" height="212" rx="10" fill="none" stroke={items[1].color} strokeOpacity="0.7" />
        <text x="26" y="28" fontSize="10" fontWeight="800" fill="#f9fafb">측정 리포트</text>
        <text x="146" y="28" textAnchor="end" fontSize="8.5" fill={items[1].color}>2주 · 3개 학급</text>
        <text x="26" y="48" fontSize="8" fill="#9ca3af">평균 CO₂ (ppm)</text>
        {[["1반", 62, 1180], ["2반", 84, 1420], ["3반", 46, 960]].map(([n, h, v], k) => (
          <g key={n as string}>
            <rect x={36 + k * 40} y={132 - (h as number)} width="24" height={h as number} rx="4" fill={items[1].color} fillOpacity={0.5 + k * 0.15} />
            <text x={48 + k * 40} y={126 - (h as number)} textAnchor="middle" fontSize="8" fontWeight="700" fill="#e5e7eb">{v}</text>
            <text x={48 + k * 40} y="144" textAnchor="middle" fontSize="8.5" fill="#9ca3af">{n}</text>
          </g>
        ))}
        <path d="M26 90 H146" stroke="#f87171" strokeDasharray="3 3" />
        <path d="M104 45 H114" stroke="#f87171" strokeDasharray="3 2" />
        <text x="146" y="48" textAnchor="end" fontSize="7.5" fill="#fca5a5">권고 1,000</text>
        <text x="26" y="164" fontSize="8" fill="#9ca3af">시간대별 변화</text>
        <path d="M26 204 L46 196 L66 184 L86 176 L100 200 L120 188 L146 172" fill="none" stroke={items[1].color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="100" cy="200" r="3" fill="#f9fafb" />
        <text x="100" y="212" textAnchor="middle" fontSize="7" fill="#d1d5db">환기</text>
      </g>

      {/* 3 campaign video */}
      <g transform={`translate(${X(2)} 112)`}>
        <rect x="34" y="0" width="104" height="222" rx="20" fill="#05050a" filter={`url(#${id}-soft)`} />
        <rect x="34" y="0" width="104" height="222" rx="20" fill="none" stroke={items[2].color} strokeWidth="1.8" />
        <rect x="40" y="6" width="92" height="210" rx="15" fill="#1c1917" />
        <rect x="40" y="6" width="92" height="210" rx="15" fill={items[2].color} fillOpacity="0.16" />
        {/* window opening */}
        <rect x="58" y="40" width="56" height="70" rx="3" fill="#7dd3fc" fillOpacity="0.35" stroke="#f9fafb" strokeWidth="2" />
        <path d="M86 40 V110 M58 75 H114" stroke="#f9fafb" strokeWidth="2" />
        {[0, 1, 2].map((k) => (
          <path key={k} d={`M118 ${56 + k * 18} q8 -5 16 0`} fill="none" stroke="#f9fafb" strokeWidth="2" strokeLinecap="round">
            <animate attributeName="opacity" values="0;1;0" dur="1.8s" begin={`${k * 0.3}s`} repeatCount="indefinite" />
          </path>
        ))}
        <circle cx="86" cy="140" r="15" fill="#000000" fillOpacity="0.5" stroke="#ffffff" strokeOpacity="0.6" />
        <path d="M82 133 L93 140 L82 147 Z" fill="#ffffff" />
        <rect x="46" y="166" width="80" height="22" rx="6" fill="#000000" fillOpacity="0.7" />
        <text x="86" y="181" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#ffffff">쉬는 시간, 창문 열기!</text>
        <rect x="48" y="198" width="76" height="3" rx="1.5" fill="#ffffff" fillOpacity="0.25" />
        <rect x="48" y="198" width="30" height="3" rx="1.5" fill={items[2].color} />
        <text x="124" y="24" textAnchor="end" fontSize="8" fontWeight="700" fill="#ffffff" style={mono}>0:30</text>
      </g>

      {/* 4 service dashboard */}
      <g transform={`translate(${X(3)} 112)`}>
        <rect x="4" y="18" width="164" height="188" rx="10" fill="#0e0e18" filter={`url(#${id}-soft)`} />
        <rect x="4" y="18" width="164" height="188" rx="10" fill="none" stroke={items[3].color} strokeOpacity="0.8" />
        <rect x="4" y="18" width="164" height="18" rx="9" fill={items[3].color} fillOpacity="0.25" />
        {[0, 1, 2].map((k) => <circle key={k} cx={15 + k * 9} cy="27" r="2.6" fill={items[3].color} />)}
        <text x="96" y="30.5" textAnchor="middle" fontSize="7.5" fill="#c7d2fe" style={mono}>air-alert.vercel.app</text>
        <text x="16" y="56" fontSize="8.5" fill="#9ca3af">2학년 3반 · 지금</text>
        <text x="16" y="88" fontSize="28" fontWeight="800" fill="#ffffff">1,240<tspan fontSize="10" fill="#fca5a5"> ppm</tspan></text>
        <rect x="16" y="98" width="140" height="7" rx="3.5" fill="#ffffff" fillOpacity="0.1" />
        <rect x="16" y="98" width="104" height="7" rx="3.5" fill="#f87171" />
        <rect x="16" y="116" width="140" height="28" rx="8" fill="#f87171" fillOpacity="0.16" stroke="#f87171" strokeOpacity="0.7">
          <animate attributeName="fill-opacity" values="0.1;0.3;0.1" dur="1.6s" repeatCount="indefinite" />
        </rect>
        <text x="86" y="134" textAnchor="middle" fontSize="10" fontWeight="800" fill="#fecaca">지금 환기하세요</text>
        <path d="M16 190 L40 180 L62 184 L86 168 L110 172 L134 158 L156 162" fill="none" stroke={items[3].color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="16" y="160" fontSize="7.5" fill="#6b7280">오늘 추이</text>
      </g>

      {/* 5 product */}
      <g transform={`translate(${X(4)} 112)`}>
        <rect x="8" y="40" width="156" height="150" rx="10" fill="#064e3b" filter={`url(#${id}-soft)`} />
        <rect x="8" y="40" width="156" height="150" rx="10" fill="none" stroke={items[4].color} strokeWidth="1.8" />
        {Array.from({ length: 12 }).map((_, k) => <circle key={k} cx={22 + k * 11.6} cy="52" r="2" fill="#fbbf24" />)}
        {Array.from({ length: 12 }).map((_, k) => <circle key={k} cx={22 + k * 11.6} cy="178" r="2" fill="#fbbf24" />)}
        <rect x="24" y="66" width="72" height="40" rx="4" fill="#0b0b12" stroke="#22d3ee" />
        <text x="60" y="82" textAnchor="middle" fontSize="7.5" fill="#67e8f9" style={mono}>CO2</text>
        <text x="60" y="98" textAnchor="middle" fontSize="13" fontWeight="800" fill="#ecfeff" style={mono}>1240</text>
        <rect x="108" y="66" width="40" height="40" rx="4" fill="#e5e7eb" />
        <circle cx="128" cy="86" r="12" fill="#94a3b8" />
        <circle cx="128" cy="86" r="5" fill="#475569" />
        <text x="128" y="118" textAnchor="middle" fontSize="7" fill="#a7f3d0">센서</text>
        <rect x="24" y="122" width="56" height="42" rx="3" fill="#1e293b" />
        <text x="52" y="147" textAnchor="middle" fontSize="8" fontWeight="700" fill="#e2e8f0">Arduino</text>
        <circle cx="104" cy="142" r="7" fill="#f87171">
          <animate attributeName="opacity" values="1;0.25;1" dur="1.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="126" cy="142" r="7" fill="#fbbf24" fillOpacity="0.4" />
        <circle cx="148" cy="142" r="7" fill="#34d399" fillOpacity="0.4" />
        <path d="M80 136 C92 120, 100 112, 108 100 M80 150 C90 160, 96 156, 100 148" fill="none" stroke="#f472b6" strokeWidth="1.6" />
      </g>

      {items.map((it, i) => (
        <g key={it.kind}>
          <rect x={X(i) + W / 2 - 62} y="352" width="124" height="26" rx="13" fill={it.color} />
          <text x={X(i) + W / 2} y="370" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#0b0b12">{it.title}</text>
          <text x={X(i) + W / 2} y="400" textAnchor="middle" fontSize="11" fill="#d1d5db">{it.output}</text>
        </g>
      ))}
    </svg>
  )
}
