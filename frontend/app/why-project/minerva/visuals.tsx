const font = { fontFamily: "inherit" }

/** 강의형 vs 세미나형 — 발언 흐름 비교 */
export function SeminarSvg() {
  const seats = Array.from({ length: 12 }, (_, i) => {
    const a = ((i / 12) * 360 * Math.PI) / 180
    return { x: 540 + Math.cos(a) * 110, y: 115 + Math.sin(a) * 70 }
  })
  const talk = [[0, 5], [3, 9], [7, 1], [10, 4], [2, 8], [6, 11]]
  return (
    <svg viewBox="0 0 720 240" className="h-auto w-full" style={font} role="img" aria-label="교수 한 명이 말하는 강의와 모든 학생이 서로 토론하는 세미나 비교">
      {/* lecture */}
      <rect x="120" y="30" width="60" height="30" rx="6" fill="#1f2937" stroke="#6b7280" />
      <text x="150" y="50" textAnchor="middle" fontSize="11" fill="#d1d5db">교수</text>
      {Array.from({ length: 4 }).map((_, r) =>
        Array.from({ length: 6 }).map((_, c) => {
          const x = 60 + c * 36
          const y = 100 + r * 26
          return (
            <g key={`${r}-${c}`}>
              <line x1="150" y1="60" x2={x} y2={y} stroke="#6b7280" strokeOpacity="0.15" />
              <circle cx={x} cy={y} r="7" fill="#111827" stroke="#4b5563" />
            </g>
          )
        }),
      )}
      <text x="150" y="228" textAnchor="middle" fontSize="14" fontWeight="700" fill="#9ca3af">강의 — 한 명이 말하고 모두가 듣는다</text>

      <path d="M335 120 H395" stroke="#a78bfa" strokeWidth="3" />
      <path d="M388 112 l9 8 -9 8" fill="none" stroke="#a78bfa" strokeWidth="3" />

      {/* seminar */}
      <ellipse cx="540" cy="115" rx="70" ry="38" fill="#8b5cf6" opacity="0.12" />
      <text x="540" y="120" textAnchor="middle" fontSize="12" fontWeight="700" fill="#c4b5fd">≤ 20명</text>
      {talk.map(([a, b], i) => (
        <line key={i} x1={seats[a].x} y1={seats[a].y} x2={seats[b].x} y2={seats[b].y} stroke="#e879f9" strokeWidth="1.5" strokeOpacity="0.2">
          <animate attributeName="stroke-opacity" values="0.1;0.9;0.1" dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
        </line>
      ))}
      {seats.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r="12" fill="#1e1035" stroke="#c4b5fd" strokeWidth="1.5">
          <animate attributeName="r" values="12;14;12" dur="3s" begin={`${(i % 6) * 0.5}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <text x="540" y="228" textAnchor="middle" fontSize="14" fontWeight="700" fill="#e9d5ff">세미나 — 모두가 말하고 증명한다</text>
    </svg>
  )
}

/** 6개 렌즈 — 하나의 문제를 둘러싼 여섯 관문 */
export function LensHexSvg({ items }: { items: { title: string; en: string; color: string }[] }) {
  const cx = 360
  const cy = 170
  const pts = items.map((_, i) => {
    const a = ((-90 + i * 60) * Math.PI) / 180
    return { x: cx + Math.cos(a) * 230, y: cy + Math.sin(a) * 118 }
  })
  return (
    <svg viewBox="0 0 720 345" className="h-auto w-full" style={font} role="img" aria-label="실증, 이론, 소통, 시스템, 윤리, 맥락 여섯 렌즈가 하나의 문제를 둘러싼 구조">
      <defs><filter id="lens-glow"><feGaussianBlur stdDeviation="12" /></filter></defs>
      <polygon points={pts.map((p) => `${p.x},${p.y}`).join(" ")} fill="none" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1.5" />
      {pts.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={items[i].color} strokeOpacity="0.4" strokeWidth="2" strokeDasharray="5 6">
          <animate attributeName="stroke-dashoffset" from="0" to="44" dur="2s" repeatCount="indefinite" />
        </line>
      ))}
      <circle cx={cx} cy={cy} r="54" fill="#d946ef" opacity="0.3" filter="url(#lens-glow)" />
      <circle cx={cx} cy={cy} r="48" fill="#160b1f" stroke="#f0abfc" strokeWidth="2" />
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize="14" fontWeight="800" fill="#fdf4ff">실제 문제</text>
      <text x={cx} y={cy + 15} textAnchor="middle" fontSize="11" fill="#f0abfc">기업 · 도시 · 사회</text>
      {items.map((it, i) => {
        const p = pts[i]
        return (
          <g key={it.title}>
            <circle cx={p.x} cy={p.y} r="30" fill="#0b0b12" stroke={it.color} strokeWidth="2">
              <animate attributeName="stroke-opacity" values="1;0.4;1" dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
            </circle>
            <text x={p.x} y={p.y + 5} textAnchor="middle" fontSize="15" fontWeight="800" fill={it.color}>{it.title}</text>
            <text x={p.x} y={p.y + (i === 0 ? -40 : 48)} textAnchor="middle" fontSize="11" fill="#9ca3af">{it.en}</text>
          </g>
        )
      })}
    </svg>
  )
}

/** 글로벌 도시 로테이션 */
export function CityRouteSvg() {
  const cities = [
    { x: 80, y: 120, t: "샌프란시스코", c: "#a78bfa", main: true },
    { x: 620, y: 110, t: "도쿄", c: "#38bdf8", main: true },
    { x: 330, y: 70, t: "베를린", c: "#fbbf24" },
    { x: 220, y: 240, t: "부에노스아이레스", c: "#fbbf24" },
    { x: 470, y: 170, t: "하이데라바드", c: "#fbbf24" },
    { x: 580, y: 60, t: "서울", c: "#f472b6" },
    { x: 560, y: 190, t: "타이베이", c: "#fbbf24" },
  ]
  const route = "M80 120 Q350 -10 620 110"
  return (
    <svg viewBox="0 0 720 280" className="h-auto w-full" style={font} role="img" aria-label="샌프란시스코에서 도쿄, 이후 선택 도시로 이어지는 미네르바 도시 로테이션">
      {[...Array(9)].map((_, r) => (
        <line key={r} x1="20" x2="700" y1={20 + r * 30} y2={20 + r * 30} stroke="#ffffff" strokeOpacity="0.03" />
      ))}
      <path d={route} fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeDasharray="6 7">
        <animate attributeName="stroke-dashoffset" from="130" to="0" dur="3s" repeatCount="indefinite" />
      </path>
      <circle r="5" fill="#f5f3ff">
        <animateMotion dur="4s" repeatCount="indefinite" path={route} />
      </circle>
      {cities.slice(2).map((c) => (
        <path key={c.t} d={`M620 110 Q${(620 + c.x) / 2} ${(110 + c.y) / 2 + 40} ${c.x} ${c.y}`} fill="none" stroke={c.c} strokeOpacity="0.3" strokeDasharray="3 5" />
      ))}
      {cities.map((c) => (
        <g key={c.t}>
          {c.main && (
            <circle cx={c.x} cy={c.y} r="10" fill="none" stroke={c.c}>
              <animate attributeName="r" values="10;24" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0" dur="2.4s" repeatCount="indefinite" />
            </circle>
          )}
          <circle cx={c.x} cy={c.y} r={c.main ? 9 : 6} fill={c.c} />
          <text x={c.x} y={c.y + (c.main ? 30 : 22)} textAnchor="middle" fontSize={c.main ? 14 : 12} fontWeight="700" fill={c.c}>{c.t}</text>
        </g>
      ))}
      <text x="80" y="170" textAnchor="middle" fontSize="11" fill="#9ca3af">1학년</text>
      <text x="620" y="160" textAnchor="middle" fontSize="11" fill="#9ca3af">2학년</text>
    </svg>
  )
}

/** 뒤집힌 교실 — 읽기 → 토론 → 피드백, 그리고 수업 시간 사용 비교 */
export function FlippedFlowSvg() {
  return (
    <svg viewBox="0 0 720 290" className="h-auto w-full" style={font} role="img" aria-label="수업 전 읽기, 수업 중 토론, 수업 후 피드백으로 이어지는 흐름과 전통 수업 대비 수업 시간 사용 비교">
      {/* book */}
      <g fill="#0b1220" stroke="#38bdf8" strokeWidth="2" strokeLinejoin="round">
        <path d="M120 50 Q95 40 68 50 V104 Q95 94 120 104 Z" />
        <path d="M120 50 Q145 40 172 50 V104 Q145 94 120 104 Z" />
      </g>
      {[62, 74, 86].map((y) => (
        <g key={y} stroke="#38bdf8" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round">
          <path d={`M80 ${y} Q95 ${y - 5} 110 ${y}`} fill="none" />
          <path d={`M130 ${y} Q145 ${y - 5} 160 ${y}`} fill="none" />
        </g>
      ))}
      {/* debate */}
      <g>
        <path d="M296 46 h58 a10 10 0 0 1 10 10 v18 a10 10 0 0 1 -10 10 h-34 l-12 12 v-12 h-12 a10 10 0 0 1 -10 -10 v-18 a10 10 0 0 1 10 -10 Z" fill="#1e1035" stroke="#a78bfa" strokeWidth="2" />
        <path d="M366 68 h58 a10 10 0 0 1 10 10 v18 a10 10 0 0 1 -10 10 h-12 v12 l-12 -12 h-34 a10 10 0 0 1 -10 -10 v-18 a10 10 0 0 1 10 -10 Z" fill="#2a0f2e" stroke="#e879f9" strokeWidth="2" />
        <text x="325" y="71" textAnchor="middle" fontSize="13" fontWeight="800" fill="#c4b5fd">주장</text>
        <text x="395" y="93" textAnchor="middle" fontSize="13" fontWeight="800" fill="#f0abfc">반박</text>
        <path d="M360 34 l4 9 9 2 -7 6 2 9 -8 -5 -8 5 2 -9 -7 -6 9 -2 Z" fill="#fde047">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="1.8s" repeatCount="indefinite" />
        </path>
      </g>
      {/* rubric */}
      <rect x="562" y="42" width="76" height="72" rx="10" fill="#07140f" stroke="#34d399" strokeWidth="2" />
      <rect x="584" y="36" width="32" height="12" rx="4" fill="#34d399" />
      {[62, 80, 98].map((y, i) => (
        <g key={y}>
          <path d={`M572 ${y} l4 4 7 -8`} fill="none" stroke="#34d399" strokeWidth="2.2" strokeLinecap="round" />
          <rect x="590" y={y - 4} width="38" height="6" rx="3" fill="#34d399" opacity="0.2" />
          <rect x="590" y={y - 4} height="6" rx="3" fill="#34d399">
            <animate attributeName="width" values={`0;${[38, 26, 32][i]}`} dur="1.6s" begin={`${i * 0.3}s`} fill="freeze" />
          </rect>
        </g>
      ))}
      {/* arrows */}
      {[200, 462].map((x) => (
        <g key={x} stroke="#6b7280" strokeWidth="2.5" fill="none">
          <path d={`M${x} 78 h60`} strokeDasharray="5 6">
            <animate attributeName="stroke-dashoffset" from="22" to="0" dur="1s" repeatCount="indefinite" />
          </path>
          <path d={`M${x + 54} 71 l8 7 -8 7`} />
        </g>
      ))}
      {[
        { x: 120, c: "#38bdf8", t: "수업 전 — 읽고 온다", s: "교과서 · 논문 · 케이스" },
        { x: 365, c: "#c4b5fd", t: "수업 중 — 토론한다", s: "주장 · 반박 · 적용" },
        { x: 600, c: "#34d399", t: "수업 후 — 피드백", s: "사고 습관별 루브릭" },
      ].map((l) => (
        <g key={l.x}>
          <text x={l.x} y="142" textAnchor="middle" fontSize="15" fontWeight="800" fill={l.c}>{l.t}</text>
          <text x={l.x} y="162" textAnchor="middle" fontSize="12" fill="#9ca3af">{l.s}</text>
        </g>
      ))}
      {/* time bars */}
      <text x="20" y="214" fontSize="13" fontWeight="700" fill="#9ca3af">전통 수업 90분</text>
      <rect x="140" y="198" width="448" height="24" rx="6" fill="#374151" />
      <rect x="592" y="198" width="108" height="24" rx="6" fill="#4b5563" opacity="0.5" />
      <text x="364" y="215" textAnchor="middle" fontSize="12" fontWeight="700" fill="#d1d5db">교수 강의 80%</text>
      <text x="646" y="215" textAnchor="middle" fontSize="12" fill="#d1d5db">질문 20%</text>
      <text x="20" y="258" fontSize="13" fontWeight="700" fill="#e9d5ff">미네르바 90분</text>
      <defs>
        <linearGradient id="ff-bar" x1="0" x2="1"><stop offset="0" stopColor="#8b5cf6" /><stop offset="1" stopColor="#d946ef" /></linearGradient>
      </defs>
      <rect x="140" y="242" height="24" rx="6" fill="url(#ff-bar)">
        <animate attributeName="width" values="0;560" dur="1.4s" fill="freeze" />
      </rect>
      <text x="420" y="259" textAnchor="middle" fontSize="12" fontWeight="800" fill="#ffffff">토론 · 문제 해결 · 적용 100% (강의 0분)</text>
    </svg>
  )
}

/** 빙산 — 보이는 기술과 수면 아래의 6개 렌즈 */
export function IcebergSvg({ items }: { items: { title: string; color: string }[] }) {
  const chips = [
    { x: 110, y: 160 }, { x: 90, y: 205 }, { x: 110, y: 250 },
    { x: 610, y: 160 }, { x: 630, y: 205 }, { x: 610, y: 250 },
  ]
  return (
    <svg viewBox="0 0 720 300" className="h-auto w-full" style={font} role="img" aria-label="수면 위에는 기술만 보이고, 수면 아래에는 여섯 렌즈로 봐야 하는 사람과 사회에 대한 이해가 숨어 있는 빙산">
      <defs>
        <linearGradient id="ice-deep" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8b5cf6" stopOpacity="0.45" /><stop offset="1" stopColor="#8b5cf6" stopOpacity="0.08" /></linearGradient>
      </defs>
      <rect x="0" y="112" width="720" height="188" fill="#38bdf8" opacity="0.04" />
      <polygon points="360,34 404,112 316,112" fill="#e5e7eb" opacity="0.9" />
      <polygon points="300,112 420,112 505,200 435,284 285,284 215,200" fill="url(#ice-deep)" stroke="#a78bfa" strokeOpacity="0.6" strokeWidth="1.5" />
      <path d="M0 112 Q30 104 60 112 T120 112 T180 112 T240 112 T300 112 T360 112 T420 112 T480 112 T540 112 T600 112 T660 112 T720 112 T780 112" fill="none" stroke="#38bdf8" strokeWidth="2" strokeOpacity="0.7">
        <animateTransform attributeName="transform" type="translate" values="0 0;-60 0;0 0" dur="6s" repeatCount="indefinite" />
      </path>
      <path d="M410 70 H450" stroke="#9ca3af" strokeDasharray="3 4" />
      <text x="458" y="66" fontSize="14" fontWeight="800" fill="#e5e7eb">보이는 것 10%</text>
      <text x="458" y="86" fontSize="12" fill="#9ca3af">기술 · 기능 · 성능</text>
      <text x="360" y="186" textAnchor="middle" fontSize="16" fontWeight="800" fill="#f5f3ff">보이지 않는 것 90%</text>
      <text x="360" y="208" textAnchor="middle" fontSize="12" fill="#c4b5fd">사람 · 사회 · 맥락</text>
      <text x="360" y="246" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fda4af">실패는 여기서 시작됩니다</text>
      {items.map((it, i) => {
        const p = chips[i]
        const left = i < 3
        return (
          <g key={it.title}>
            <line x1={p.x + (left ? 44 : -44)} y1={p.y} x2={left ? 250 + i * 12 : 470 - (i - 3) * 12} y2={p.y} stroke={it.color} strokeOpacity="0.45" strokeDasharray="3 5" />
            <rect x={p.x - 44} y={p.y - 16} width="88" height="32" rx="16" fill="#0b0b12" stroke={it.color} strokeWidth="1.6" />
            <text x={p.x} y={p.y + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill={it.color}>{it.title} 렌즈</text>
          </g>
        )
      })}
    </svg>
  )
}

/** 학년별 계단 — 교실 안 케이스에서 실제 세계의 문제로 */
export function YearStairSvg({ items }: { items: { tag: string; city: string; color: string }[] }) {
  const steps = [
    { x: 60, top: 196, t: "생각하는 법", s: "교실 케이스" },
    { x: 210, top: 156, t: "전공의 언어", s: "산업 케이스" },
    { x: 360, top: 116, t: "기업 프로젝트", s: "현지 기업 과제" },
    { x: 510, top: 76, t: "캡스톤", s: "나만의 해답" },
  ]
  const path = "M135 196 L285 156 L435 116 L585 76"
  return (
    <svg viewBox="0 0 720 290" className="h-auto w-full" style={font} role="img" aria-label="1학년 생각하는 법에서 4학년 캡스톤까지 문제의 실제성이 계단처럼 높아지는 구조">
      {steps.map((s, i) => {
        const c = items[i].color
        return (
          <g key={s.t}>
            <rect x={s.x} y={s.top} width="150" height={236 - s.top} rx="8" fill={c} fillOpacity="0.12" stroke={c} strokeOpacity="0.7" strokeWidth="1.5" />
            <text x={s.x + 75} y={s.top - 30} textAnchor="middle" fontSize="12" fontWeight="700" fill={c}>{items[i].tag} · {items[i].city}</text>
            <text x={s.x + 75} y={s.top - 11} textAnchor="middle" fontSize="15" fontWeight="800" fill="#ffffff">{s.t}</text>
            <text x={s.x + 75} y={s.top + 24} textAnchor="middle" fontSize="12" fill="#d1d5db">{s.s}</text>
          </g>
        )
      })}
      <path d={path} fill="none" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="4 6" />
      <circle r="6" fill="#f5f3ff">
        <animateMotion dur="5s" repeatCount="indefinite" path={path} />
      </circle>
      <path d="M60 262 H652" stroke="#6b7280" strokeWidth="2" />
      <path d="M646 255 l8 7 -8 7" fill="none" stroke="#6b7280" strokeWidth="2" />
      <text x="60" y="282" fontSize="12" fill="#9ca3af">교실 안 연습</text>
      <text x="660" y="282" textAnchor="end" fontSize="12" fontWeight="700" fill="#e5e7eb">실제 세계의 문제</text>
    </svg>
  )
}

/** 문제 정의 구간 vs 문제 풀이 구간 */
export function ProblemFunnelSvg() {
  return (
    <svg viewBox="0 0 720 240" className="h-auto w-full" style={font} role="img" aria-label="모호한 현실 문제를 여섯 렌즈로 명확한 문제로 정의하는 구간은 사람이, 정의된 문제를 푸는 구간은 AI가 잘한다는 비교">
      {/* tangled */}
      <path d="M48 95 C52 45 122 55 102 100 C86 134 56 112 78 84 C100 58 144 80 128 112 C116 134 88 128 94 102 C100 80 132 86 120 100" fill="none" stroke="#fb7185" strokeWidth="2.5" strokeLinecap="round">
        <animate attributeName="stroke-opacity" values="1;0.5;1" dur="2.5s" repeatCount="indefinite" />
      </path>
      <text x="60" y="52" fontSize="16" fontWeight="800" fill="#fb7185">?</text>
      <text x="132" y="62" fontSize="13" fontWeight="800" fill="#fb7185">?</text>
      <text x="90" y="150" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fda4af">모호한 현실 문제</text>
      {/* lens hex */}
      <polygon points="260,52 298,74 298,118 260,140 222,118 222,74" fill="#160b1f" stroke="#e879f9" strokeWidth="2" />
      <text x="260" y="93" textAnchor="middle" fontSize="13" fontWeight="800" fill="#f0abfc">6개</text>
      <text x="260" y="110" textAnchor="middle" fontSize="13" fontWeight="800" fill="#f0abfc">렌즈</text>
      {/* defined */}
      <rect x="368" y="70" width="124" height="52" rx="12" fill="#1e1035" stroke="#a78bfa" strokeWidth="2" />
      <text x="430" y="101" textAnchor="middle" fontSize="14" fontWeight="800" fill="#e9d5ff">명확한 문제</text>
      {/* solved */}
      <rect x="566" y="70" width="114" height="52" rx="12" fill="#111827" stroke="#6b7280" strokeWidth="2" />
      <path d="M584 96 l6 6 11 -13" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" />
      <text x="638" y="101" textAnchor="middle" fontSize="14" fontWeight="700" fill="#d1d5db">해결안</text>
      {[[150, 208, "#e879f9"], [306, 358, "#a78bfa"], [500, 556, "#6b7280"]].map(([a, b, c]) => (
        <g key={a} stroke={c as string} strokeWidth="2.5" fill="none">
          <path d={`M${a} 96 H${b}`} strokeDasharray="5 6">
            <animate attributeName="stroke-dashoffset" from="22" to="0" dur="1s" repeatCount="indefinite" />
          </path>
          <path d={`M${(b as number) - 7} 89 l8 7 -8 7`} />
        </g>
      ))}
      {/* brackets */}
      <path d="M40 172 v8 H492 v-8" fill="none" stroke="#e879f9" strokeWidth="2" />
      <text x="266" y="203" textAnchor="middle" fontSize="14" fontWeight="800" fill="#f0abfc">사람이 해야 하는 구간 — 문제를 정의한다</text>
      <text x="266" y="223" textAnchor="middle" fontSize="12" fill="#c4b5fd">미네르바가 4년 동안 훈련하는 곳</text>
      <path d="M512 172 v8 H690 v-8" fill="none" stroke="#6b7280" strokeWidth="2" />
      <text x="601" y="203" textAnchor="middle" fontSize="14" fontWeight="700" fill="#9ca3af">AI가 잘하는 구간</text>
      <text x="601" y="223" textAnchor="middle" fontSize="12" fill="#6b7280">정의된 문제를 푼다</text>
    </svg>
  )
}

/** AI 등장 이후 — 지식의 가치와 판단의 가치 교차 */
export function ValueCrossSvg() {
  return (
    <svg viewBox="0 0 720 290" className="h-auto w-full" style={font} role="img" aria-label="생성형 AI 등장 이후 외운 지식의 가치는 내려가고 질문과 판단의 가치는 올라가는 교차 그래프">
      <rect x="362" y="40" width="318" height="200" fill="#d946ef" opacity="0.05" />
      <path d="M80 40 V240 H680" fill="none" stroke="#4b5563" strokeWidth="2" />
      <text x="70" y="48" textAnchor="end" fontSize="12" fill="#9ca3af">가치</text>
      <path d="M362 40 V240" stroke="#fde047" strokeOpacity="0.6" strokeDasharray="4 5" />
      <text x="362" y="28" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fde047">생성형 AI 등장</text>
      <path d="M80 70 C300 80 380 200 680 225" fill="none" stroke="#9ca3af" strokeWidth="3" strokeLinecap="round" />
      <path d="M80 220 C320 215 420 90 680 55" fill="none" stroke="#e879f9" strokeWidth="3.5" strokeLinecap="round" />
      <circle r="5" fill="#f5d0fe">
        <animateMotion dur="4s" repeatCount="indefinite" path="M80 220 C320 215 420 90 680 55" />
      </circle>
      <circle cx="362" cy="146" r="6" fill="#fde047" />
      <circle cx="362" cy="146" r="6" fill="none" stroke="#fde047">
        <animate attributeName="r" values="6;20" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x="96" y="62" fontSize="13" fontWeight="700" fill="#d1d5db">외운 지식의 가치</text>
      <text x="672" y="212" textAnchor="end" fontSize="12" fill="#9ca3af">AI가 대신한다</text>
      <text x="676" y="36" textAnchor="end" fontSize="14" fontWeight="800" fill="#f0abfc">질문 · 판단 · 맥락의 가치</text>
      <text x="220" y="266" textAnchor="middle" fontSize="13" fill="#9ca3af">‘무엇을 아는가’의 시대</text>
      <text x="520" y="266" textAnchor="middle" fontSize="13" fontWeight="800" fill="#f0abfc">‘무엇을 묻는가’의 시대</text>
    </svg>
  )
}
