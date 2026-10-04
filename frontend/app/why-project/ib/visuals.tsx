const font = { fontFamily: "inherit" }

/** 학생 캐릭터 (발끝 기준 좌표) */
function Student({ x, y, s, c, kind }: { x: number; y: number; s: number; c: string; kind: "pyp" | "myp" | "dp" }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <ellipse cx="0" cy="2" rx="30" ry="6" fill={c} opacity="0.25" />
      {/* 다리 */}
      <rect x="-15" y="-52" width="11" height="52" rx="5" fill="#1f2937" stroke={c} strokeOpacity="0.5" />
      <rect x="4" y="-52" width="11" height="52" rx="5" fill="#1f2937" stroke={c} strokeOpacity="0.5" />
      {/* 가방 (PYP) */}
      {kind === "pyp" && <rect x="-34" y="-102" width="16" height="40" rx="6" fill={c} opacity="0.55" />}
      {/* 몸통 */}
      <rect x="-24" y="-108" width="48" height="62" rx="16" fill={c} opacity="0.9" />
      {kind === "dp" && <path d="M0 -106 l-6 10 l6 26 l6 -26 z" fill="#0b0b12" opacity="0.7" />}
      {kind === "myp" && <rect x="-10" y="-96" width="20" height="4" rx="2" fill="#0b0b12" opacity="0.5" />}
      {/* 팔 */}
      <path d="M-22 -98 q-14 20 -8 40" stroke={c} strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M22 -98 q16 6 22 -4" stroke={c} strokeWidth="9" strokeLinecap="round" fill="none" />
      {/* 머리 */}
      <circle cx="0" cy="-130" r="21" fill="#f1e4d8" />
      <path d={kind === "pyp" ? "M-21 -134 a21 21 0 0 1 42 0 q-10 -8 -21 -6 q-12 -2 -21 6 z" : "M-21 -132 a21 21 0 0 1 42 0 q-14 -12 -42 0 z"} fill="#2a1d14" />
      <circle cx="-7" cy="-128" r="2.3" fill="#1f2937" />
      <circle cx="7" cy="-128" r="2.3" fill="#1f2937" />
      <path d="M-6 -119 q6 5 12 0" stroke="#1f2937" strokeWidth="2" fill="none" strokeLinecap="round" />
      {kind === "dp" && (
        <g fill="none" stroke="#1f2937" strokeWidth="1.8">
          <circle cx="-7" cy="-128" r="6" />
          <circle cx="7" cy="-128" r="6" />
          <line x1="-1" y1="-128" x2="1" y2="-128" />
        </g>
      )}
      {/* 손에 든 도구 */}
      {kind === "pyp" && (
        <g>
          <circle cx="52" cy="-112" r="11" fill="#0b0b12" fillOpacity="0.6" stroke="#f5f3ff" strokeWidth="3" />
          <line x1="45" y1="-104" x2="40" y2="-96" stroke="#f5f3ff" strokeWidth="4" strokeLinecap="round" />
        </g>
      )}
      {kind === "myp" && (
        <g>
          <rect x="38" y="-128" width="40" height="30" rx="5" fill="#0b0b12" stroke="#f5f3ff" strokeWidth="2.5" />
          <rect x="45" y="-110" width="6" height="8" fill={c} />
          <rect x="55" y="-116" width="6" height="14" fill={c} />
          <rect x="65" y="-122" width="6" height="20" fill={c} />
        </g>
      )}
      {kind === "dp" && (
        <g>
          <rect x="36" y="-130" width="30" height="38" rx="3" fill="#f5f3ff" />
          <rect x="36" y="-130" width="6" height="38" rx="2" fill={c} />
          <line x1="46" y1="-120" x2="60" y2="-120" stroke="#6b7280" strokeWidth="2" />
          <line x1="46" y1="-113" x2="60" y2="-113" stroke="#6b7280" strokeWidth="2" />
          <line x1="46" y1="-106" x2="56" y2="-106" stroke="#6b7280" strokeWidth="2" />
        </g>
      )}
    </g>
  )
}

/** PYP → MYP → DP — 자라나는 학생과 단계별 특징 */
export function IbContinuumSvg() {
  const steps = [
    { x: 120, s: 0.72, code: "PYP", t: "초등 · 3~12세", q: "왜 그럴까?", c: "#c084fc", kind: "pyp" as const,
      f: ["6개 초학문적 주제", "놀이·주제 중심 탐구 단원", "졸업 전시회 (Exhibition)"] },
    { x: 360, s: 0.86, code: "MYP", t: "중등 · 11~16세", q: "어떻게 만들까?", c: "#38bdf8", kind: "myp" as const,
      f: ["8개 교과군 + 융합 단원", "기준별 1~8점 평가", "개인 · 커뮤니티 프로젝트"] },
    { x: 600, s: 1, code: "DP", t: "고등 · 16~19세", q: "그 근거는?", c: "#34d399", kind: "dp" as const,
      f: ["6과목 (HL 3 + SL 3)", "TOK · EE · CAS 코어", "45점 국제 공인 점수"] },
  ]
  const ground = 205
  return (
    <svg viewBox="0 0 720 380" className="h-auto w-full" style={font} role="img" aria-label="돋보기를 든 초등 PYP 학생, 프로젝트 결과물을 든 중등 MYP 학생, 논문을 든 고등 DP 학생으로 자라나는 IB 탐구 과정">
      <defs>
        <linearGradient id="ibc-line" gradientUnits="userSpaceOnUse" x1="40" y1="0" x2="680" y2="0">
          <stop offset="0" stopColor="#c084fc" />
          <stop offset="0.5" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#34d399" />
        </linearGradient>
        <filter id="ibc-glow"><feGaussianBlur stdDeviation="16" /></filter>
      </defs>
      <text x="360" y="20" textAnchor="middle" fontSize="13" fill="#9ca3af">하나의 철학 — ‘개념 기반 탐구’ · 질문이 점점 깊어집니다</text>
      <path d={`M40 ${ground} H680`} stroke="url(#ibc-line)" strokeWidth="3" strokeDasharray="6 8">
        <animate attributeName="stroke-dashoffset" from="140" to="0" dur="4s" repeatCount="indefinite" />
      </path>
      <path d={`M672 ${ground - 6} l8 6 l-8 6`} fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle r="4" fill="#f5f3ff">
        <animateMotion dur="5s" repeatCount="indefinite" path={`M40 ${ground} H680`} />
      </circle>
      {steps.map((st) => {
        const headY = ground - 130 * st.s
        return (
          <g key={st.code}>
            <circle cx={st.x} cy={ground - 75 * st.s} r={60 * st.s} fill={st.c} opacity="0.18" filter="url(#ibc-glow)" />
            <Student x={st.x} y={ground} s={st.s} c={st.c} kind={st.kind} />
            <g transform={`translate(${st.x - 30 * st.s - 96},${headY - 34})`}>
              <rect width="90" height="28" rx="14" fill="#f5f3ff" />
              <path d="M78 26 l10 10 l-2 -12 z" fill="#f5f3ff" />
              <text x="45" y="19" textAnchor="middle" fontSize="12" fontWeight="800" fill="#4c1d95">{st.q}</text>
            </g>
            <text x={st.x} y={ground + 36} textAnchor="middle" fontSize="22" fontWeight="800" fill={st.c}>{st.code}</text>
            <text x={st.x} y={ground + 56} textAnchor="middle" fontSize="13" fontWeight="600" fill="#d1d5db">{st.t}</text>
            {st.f.map((f, j) => (
              <g key={f}>
                <rect x={st.x - 92} y={ground + 70 + j * 32} width="184" height="24" rx="12" fill={st.c} fillOpacity="0.1" stroke={st.c} strokeOpacity="0.45" />
                <text x={st.x} y={ground + 86 + j * 32} textAnchor="middle" fontSize="12" fill="#e5e7eb">{f}</text>
              </g>
            ))}
          </g>
        )
      })}
    </svg>
  )
}

/** 6개 과목군이 코어(TOK·EE·CAS)를 감싸는 구조 */
export function IbHexagonSvg({ groups }: { groups: { name: string; color: string }[] }) {
  const cx = 360
  const cy = 200
  const R = 150
  return (
    <svg viewBox="0 0 720 400" className="mx-auto h-auto w-full max-w-2xl" style={font} role="img" aria-label="IB DP 6개 과목군과 TOK, EE, CAS 코어 구조">
      <defs><filter id="ibh-glow"><feGaussianBlur stdDeviation="12" /></filter></defs>
      <circle cx={cx} cy={cy} r={R + 30} fill="none" stroke="#a78bfa" strokeOpacity="0.15" strokeDasharray="4 8">
        <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="60s" repeatCount="indefinite" />
      </circle>
      {groups.map((g, i) => {
        const a = ((-90 + i * 60) * Math.PI) / 180
        const x = cx + Math.cos(a) * R
        const y = cy + Math.sin(a) * R
        return (
          <g key={g.name}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke={g.color} strokeOpacity="0.3" />
            <circle cx={x} cy={y} r="44" fill="#0b0b12" stroke={g.color} strokeWidth="1.8" />
            <text x={x} y={y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={g.color}>{g.name}</text>
          </g>
        )
      })}
      <circle cx={cx} cy={cy} r="74" fill="#8b5cf6" opacity="0.35" filter="url(#ibh-glow)" />
      <circle cx={cx} cy={cy} r="70" fill="#130d24" stroke="#c4b5fd" strokeWidth="2" />
      <text x={cx} y={cy - 22} textAnchor="middle" fontSize="11" fill="#a78bfa" letterSpacing="2">CORE</text>
      <text x={cx} y={cy + 2} textAnchor="middle" fontSize="16" fontWeight="800" fill="#f5f3ff">TOK · EE</text>
      <text x={cx} y={cy + 24} textAnchor="middle" fontSize="16" fontWeight="800" fill="#f5f3ff">CAS</text>
    </svg>
  )
}

/** 6과목 × 7점 + 코어 3점 = 45점 */
export function IbScoreSvg() {
  const colors = ["#c084fc", "#f472b6", "#fbbf24", "#4ade80", "#38bdf8", "#fb923c"]
  const unit = 13
  const x0 = 40
  return (
    <svg viewBox="0 0 720 170" className="h-auto w-full" style={font} role="img" aria-label="6과목 각 7점에 코어 보너스 3점을 더해 45점 만점, 24점 이상 디플로마">
      {colors.map((c, i) => (
        <g key={c}>
          <rect x={x0 + i * 7 * unit} y="50" width={7 * unit - 3} height="40" rx="6" fill={c} opacity="0.85">
            <animate attributeName="opacity" values="0.45;0.9;0.45" dur="3s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
          </rect>
          <text x={x0 + i * 7 * unit + (7 * unit) / 2} y="76" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0b0b12">7점</text>
        </g>
      ))}
      <rect x={x0 + 42 * unit} y="50" width={3 * unit + 20} height="40" rx="6" fill="#f5f3ff" />
      <text x={x0 + 42 * unit + (3 * unit + 20) / 2} y="76" textAnchor="middle" fontSize="12" fontWeight="800" fill="#4c1d95">+3</text>
      <text x={x0} y="36" fontSize="13" fill="#9ca3af">6개 과목 × 7점 = 42점</text>
      <text x={x0 + 42 * unit + 4} y="36" fontSize="13" fill="#c4b5fd">코어</text>
      <line x1={x0 + 24 * unit} y1="42" x2={x0 + 24 * unit} y2="108" stroke="#fb7185" strokeWidth="2" strokeDasharray="4 4" />
      <text x={x0 + 24 * unit} y="128" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fda4af">24점 — 디플로마 기준</text>
      <text x="690" y="150" textAnchor="end" fontSize="22" fontWeight="800" fill="#f5f3ff">만점 45점</text>
    </svg>
  )
}

/* ───────── 06 · 표선고로 보는 IB — 펼침 패널용 도식 ───────── */

const card = "#0b0b12"

/** 01 · 탐구 단원 6단계 사이클 */
export function IbInquiryCycleSvg() {
  const cx = 360
  const cy = 215
  const nodes = [
    { x: 360, y: 65, t: "① 탐구 질문", s: "정답이 여럿인 질문", c: "#a78bfa" },
    { x: 490, y: 140, t: "② 조사·실험", s: "자료·데이터 수집", c: "#38bdf8" },
    { x: 490, y: 290, t: "③ 토론·협업", s: "근거 비교·반론", c: "#34d399" },
    { x: 360, y: 365, t: "④ 산출물", s: "에세이·보고서·발표", c: "#fbbf24" },
    { x: 230, y: 290, t: "⑤ 피드백", s: "루브릭·1:1 면담", c: "#fb923c" },
    { x: 230, y: 140, t: "⑥ 성찰·수정", s: "초안 → 최종본", c: "#f472b6" },
  ]
  const chevrons = [
    [435, 85, 30], [510, 215, 90], [435, 345, 150], [285, 345, 210], [210, 215, 270], [285, 85, 330],
  ]
  return (
    <svg viewBox="0 0 720 430" className="h-auto w-full" style={font} role="img" aria-label="탐구 질문, 조사, 토론, 산출물, 피드백, 성찰과 수정으로 이어지는 IB 탐구 단원 사이클">
      <defs><filter id="ic-glow"><feGaussianBlur stdDeviation="14" /></filter></defs>
      <circle cx={cx} cy={cy} r="150" fill="none" stroke="#a78bfa" strokeOpacity="0.25" strokeWidth="8" strokeDasharray="10 12">
        <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="40s" repeatCount="indefinite" />
      </circle>
      {chevrons.map(([x, y, r]) => (
        <path key={`${x}-${y}`} d="M-7,-7 L5,0 L-7,7" transform={`translate(${x},${y}) rotate(${r})`} fill="none" stroke="#c4b5fd" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      ))}
      <circle cx={cx} cy={cy} r="74" fill="#8b5cf6" opacity="0.3" filter="url(#ic-glow)" />
      <circle cx={cx} cy={cy} r="70" fill="#130d24" stroke="#c4b5fd" strokeWidth="2" />
      <text x={cx} y={cy - 14} textAnchor="middle" fontSize="9" fill="#a78bfa" letterSpacing="1.5">UNIT OF INQUIRY</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontSize="20" fontWeight="800" fill="#f5f3ff">탐구 단원</text>
      <text x={cx} y={cy + 34} textAnchor="middle" fontSize="13" fill="#c4b5fd">3~6주</text>
      {nodes.map((n) => (
        <g key={n.t}>
          <rect x={n.x - 78} y={n.y - 30} width="156" height="60" rx="14" fill={card} stroke={n.c} strokeWidth="1.8" />
          <text x={n.x} y={n.y - 4} textAnchor="middle" fontSize="15" fontWeight="800" fill={n.c}>{n.t}</text>
          <text x={n.x} y={n.y + 17} textAnchor="middle" fontSize="12" fill="#d1d5db">{n.s}</text>
        </g>
      ))}
    </svg>
  )
}

/** 02 · 논·서술형 — 쓰는 양 비교 */
export function IbWritingVolumeSvg() {
  const rows = [
    { label: "IA 내부평가", n: 6, w: 34, c: "#38bdf8", tag: "6편" },
    { label: "EE 소논문", n: 1, w: 150, c: "#fbbf24", tag: "1편 · 12~18개월" },
    { label: "TOK", n: 2, w: 34, c: "#a78bfa", tag: "전시 + 에세이" },
    { label: "과목 에세이", n: 10, w: 16, c: "#34d399", tag: "수십 편" },
  ]
  return (
    <svg viewBox="0 0 720 360" className="h-auto w-full" style={font} role="img" aria-label="일반고와 IB DP의 가장 긴 글과 2년간 장문 과제 비교">
      <text x="30" y="34" fontSize="15" fontWeight="800" fill="#f5f3ff">가장 긴 글 (한국어 환산)</text>
      <text x="30" y="68" fontSize="13" fill="#9ca3af">일반고 수행평가</text>
      <rect x="190" y="54" width="500" height="20" rx="10" fill="#ffffff" fillOpacity="0.05" />
      <rect x="190" y="54" width="140" height="20" rx="10" fill="#6b7280" />
      <text x="340" y="69" fontSize="13" fontWeight="700" fill="#d1d5db">약 3,000자</text>
      <text x="30" y="106" fontSize="13" fill="#9ca3af">IB DP · EE 4,000단어</text>
      <rect x="190" y="92" width="500" height="20" rx="10" fill="#ffffff" fillOpacity="0.05" />
      <rect x="190" y="92" width="0" height="20" rx="10" fill="#fbbf24">
        <animate attributeName="width" from="0" to="500" dur="1.6s" fill="freeze" />
      </rect>
      <text x="680" y="107" textAnchor="end" fontSize="13" fontWeight="800" fill="#0b0b12">1만 자 이상</text>

      <text x="30" y="160" fontSize="15" fontWeight="800" fill="#f5f3ff">2년간 필수 장문 과제</text>
      {rows.map((r, i) => (
        <g key={r.label}>
          <text x="30" y={198 + i * 38} fontSize="13" fill="#d1d5db">{r.label}</text>
          {Array.from({ length: r.n }).map((_, j) => (
            <rect key={j} x={190 + j * (r.w + 6)} y={184 + i * 38} width={r.w} height="20" rx="5" fill={r.c} opacity="0.85">
              <animate attributeName="opacity" values="0.35;0.9;0.35" dur="3s" begin={`${(i + j) * 0.15}s`} repeatCount="indefinite" />
            </rect>
          ))}
          <text x={190 + r.n * (r.w + 6) + 8} y={198 + i * 38} fontSize="13" fontWeight="700" fill={r.c}>{r.tag}</text>
        </g>
      ))}
      <rect x="30" y="326" width="660" height="1" fill="#ffffff" fillOpacity="0.08" />
      <text x="360" y="352" textAnchor="middle" fontSize="13" fill="#fde68a">+ 언어 구술 · TOK 전시 · EE 면담까지 — 성적 대부분이 서술·구술</text>
    </svg>
  )
}

/** 03 · 사고관의 전환 */
export function IbMindsetShiftSvg() {
  const before = ["주어진 문제 → 정답은?", "외우고 빨리 푼다", "틀리면 감점, 실패는 끝", "AI 답을 받아 적는다"]
  const after = ["내가 만든 탐구 질문", "근거·방법으로 검증", "반론·한계 → 다음 초안", "AI는 점검용, 논증은 직접"]
  return (
    <svg viewBox="0 0 720 340" className="h-auto w-full" style={font} role="img" aria-label="결과 중심 사고에서 프로세스 중심 사고로의 전환">
      <defs>
        <linearGradient id="ms-line" gradientUnits="userSpaceOnUse" x1="318" y1="0" x2="402" y2="0">
          <stop offset="0" stopColor="#fb7185" />
          <stop offset="1" stopColor="#34d399" />
        </linearGradient>
      </defs>
      <text x="140" y="28" textAnchor="middle" fontSize="14" fontWeight="800" fill="#fda4af">BEFORE · 결과 중심</text>
      <text x="580" y="28" textAnchor="middle" fontSize="14" fontWeight="800" fill="#6ee7b7">AFTER · 프로세스 중심</text>
      {before.map((t, i) => (
        <g key={t}>
          <rect x="10" y={46 + i * 66} width="260" height="50" rx="12" fill={card} stroke="#fb7185" strokeOpacity="0.45" />
          <text x="140" y={77 + i * 66} textAnchor="middle" fontSize="14" fill="#fecdd3">{t}</text>
        </g>
      ))}
      {after.map((t, i) => (
        <g key={t}>
          <rect x="450" y={46 + i * 66} width="260" height="50" rx="12" fill={card} stroke="#34d399" strokeOpacity="0.6" />
          <text x="580" y={77 + i * 66} textAnchor="middle" fontSize="14" fontWeight="700" fill="#d1fae5">{t}</text>
        </g>
      ))}
      <rect x="300" y="120" width="120" height="100" rx="50" fill="#130d24" stroke="#c4b5fd" strokeWidth="2" />
      <text x="360" y="162" textAnchor="middle" fontSize="20" fontWeight="800" fill="#f5f3ff">IB 2년</text>
      <path d="M318 190 H402" stroke="url(#ms-line)" strokeWidth="3" strokeDasharray="6 6">
        <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1s" repeatCount="indefinite" />
      </path>
      <path d="M396 184 L404 190 L396 196" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="360" y="320" textAnchor="middle" fontSize="13" fill="#9ca3af">세특에 남는 문장 = 질문 → 방법 → 한계 → 수정</text>
    </svg>
  )
}

/** 04 · IB 연차 = 코칭의 깊이 */
export function IbYearsCoachingSvg() {
  const steps = [
    { x: 20, h: 70, c: "#fb7185", t: "후보학교", s: ["디플로마 미발급"] },
    { x: 195, h: 120, c: "#fbbf24", t: "인증 1~2년차", s: ["졸업생 없음", "죽산고 · 동탄국제고 등"] },
    { x: 370, h: 175, c: "#38bdf8", t: "4~6년차", s: ["실적 공개 시작", "표선고 · 포산고", "경북대사대부고 · 대구외고"] },
    { x: 545, h: 235, c: "#34d399", t: "10년차 +", s: ["경기외고 (2011~)", "평균 38.87점", "디플로마 97.78%"] },
  ]
  const base = 290
  const assets = ["산출물 아카이브", "채점 조정 피드백", "채점관 교사", "대입 노하우", "선배 네트워크"]
  const level = [
    [1, 2, 3, 4],
    [1, 2, 3, 4],
    [1, 1, 2, 4],
    [1, 2, 3, 4],
    [1, 1, 3, 4],
  ]
  const r = [3, 5, 8, 11]
  const cols = [320, 430, 540, 650]
  return (
    <svg viewBox="0 0 720 520" className="h-auto w-full" style={font} role="img" aria-label="IB 인증 연차가 쌓일수록 코칭 노하우가 누적되는 구조">
      <path d="M60 205 L690 30" stroke="#34d399" strokeWidth="3" strokeDasharray="3 9" strokeLinecap="round">
        <animate attributeName="stroke-dashoffset" from="48" to="0" dur="2s" repeatCount="indefinite" />
      </path>
      <text x="300" y="98" fontSize="13" fontWeight="800" fill="#6ee7b7" transform="rotate(-15 300 98)">코칭 노하우 누적</text>
      {steps.map((s, i) => (
        <g key={s.t}>
          <rect x={s.x} y={base - s.h} width="160" height={s.h} rx="12" fill={s.c} fillOpacity={i === 2 ? 0.16 : 0.08} stroke={s.c} strokeOpacity="0.6" strokeWidth={i === 2 ? 2.5 : 1.2} />
          <text x={s.x + 80} y={base - s.h + 26} textAnchor="middle" fontSize="15" fontWeight="800" fill={s.c}>{s.t}</text>
          {s.s.map((line, j) => (
            <text key={line} x={s.x + 80} y={base - s.h + 50 + j * 20} textAnchor="middle" fontSize="12" fill="#d1d5db">{line}</text>
          ))}
        </g>
      ))}
      <text x="450" y={base + 22} textAnchor="middle" fontSize="12" fontWeight="700" fill="#7dd3fc">▲ 표선고 위치</text>

      <rect x="20" y="326" width="685" height="186" rx="16" fill="#ffffff" fillOpacity="0.02" stroke="#ffffff" strokeOpacity="0.08" />
      {["후보", "1~2년", "4~6년", "10년+"].map((h, j) => (
        <text key={h} x={cols[j]} y="352" textAnchor="middle" fontSize="12" fontWeight="700" fill={steps[j].c}>{h}</text>
      ))}
      {assets.map((a, i) => (
        <g key={a}>
          <text x="40" y={382 + i * 27} fontSize="13" fill="#d1d5db">{a}</text>
          {level[i].map((lv, j) => (
            <circle key={j} cx={cols[j]} cy={377 + i * 27} r={r[lv - 1]} fill={steps[j].c} opacity={lv === 1 ? 0.3 : 0.9} />
          ))}
        </g>
      ))}
    </svg>
  )
}

/** 05 · 경기외고 vs 표선고 — 평균 점수 눈금 */
export function IbScoreCompareSvg() {
  const x0 = 40
  const w = 640
  const px = (v: number) => x0 + (v / 45) * w
  return (
    <svg viewBox="0 0 720 300" className="h-auto w-full" style={font} role="img" aria-label="45점 만점 기준 표선고 29점, 세계 평균 약 29.7점, 경기외고 38.87점 비교">
      <text x={x0} y="30" fontSize="15" fontWeight="800" fill="#f5f3ff">IB DP 평균 점수 (45점 만점)</text>
      <rect x={x0} y="110" width={w} height="16" rx="8" fill="#ffffff" fillOpacity="0.06" />
      <rect x={x0} y="110" width={px(24) - x0} height="16" rx="8" fill="#fb7185" fillOpacity="0.35" />
      <text x={px(24)} y="150" textAnchor="middle" fontSize="12" fill="#fda4af">24 · 디플로마 기준</text>
      <text x={x0} y="150" fontSize="12" fill="#6b7280">0</text>
      <text x={x0 + w} y="150" textAnchor="end" fontSize="12" fill="#6b7280">45</text>

      <line x1={px(29.7)} y1="100" x2={px(29.7)} y2="178" stroke="#9ca3af" strokeDasharray="3 4" />
      <text x={px(29.7) + 6} y="176" fontSize="12" fill="#9ca3af">세계 평균 ≈ 29.7</text>

      <circle cx={px(29)} cy="118" r="11" fill="#38bdf8" />
      <line x1={px(29)} y1="64" x2={px(29)} y2="106" stroke="#38bdf8" strokeWidth="2" />
      <text x={px(29)} y="58" textAnchor="end" fontSize="14" fontWeight="800" fill="#7dd3fc">표선고 1기 29점</text>

      <circle cx={px(38.87)} cy="118" r="11" fill="#34d399">
        <animate attributeName="r" values="11;15;11" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <line x1={px(38.87)} y1="64" x2={px(38.87)} y2="106" stroke="#34d399" strokeWidth="2" />
      <text x={px(38.87)} y="58" textAnchor="middle" fontSize="14" fontWeight="800" fill="#6ee7b7">경기외고 38.87점</text>

      <g fontSize="13">
        <rect x="40" y="206" width="310" height="80" rx="14" fill="#38bdf8" fillOpacity="0.08" stroke="#38bdf8" strokeOpacity="0.4" />
        <text x="60" y="234" fontWeight="800" fill="#7dd3fc">표선고 · 하한선 돌파</text>
        <text x="60" y="258" fill="#d1d5db">공립 일반고 · 한국어 DP · 내신 100%</text>
        <text x="60" y="276" fill="#d1d5db">선발 없이 서울대 2년 연속</text>
        <rect x="370" y="206" width="310" height="80" rx="14" fill="#34d399" fillOpacity="0.08" stroke="#34d399" strokeOpacity="0.4" />
        <text x="390" y="234" fontWeight="800" fill="#6ee7b7">경기외고 · 상한선</text>
        <text x="390" y="258" fill="#d1d5db">선발 + 15년 연차 + 영어 DP·기숙</text>
        <text x="390" y="276" fill="#d1d5db">디플로마 97.78% · 40점+ 33%</text>
      </g>
    </svg>
  )
}

/** 06 · 표선고 — 수능 없이 대학까지 */
export function IbPyoseonPathwaySvg() {
  const tl = [
    { x: 60, t: "중3 12월", s: "내신 100% 입학", c: "#9ca3af" },
    { x: 180, t: "고1", s: "Pre-DP 적응", c: "#38bdf8" },
    { x: 300, t: "고2 · DP1", s: "EE·CAS 시작", c: "#a78bfa" },
    { x: 420, t: "고3 9월", s: "수시 원서", c: "#fbbf24" },
    { x: 540, t: "고3 11월", s: "IB 외부평가", c: "#f472b6" },
    { x: 660, t: "1월", s: "IB 점수 발표", c: "#34d399" },
  ]
  const flow = [
    { x: 20, t: "IB 수업·평가", s: ["IA · EE · TOK · CAS", "학교 내신"], c: "#a78bfa" },
    { x: 195, t: "학생부", s: ["세특에 탐구 과정", "질문→방법→수정"], c: "#38bdf8" },
    { x: 370, t: "학생부종합", s: ["수능 최저 없음", "+ 면접"], c: "#34d399", strong: true },
    { x: 545, t: "합격", s: ["서울대 · 연고대", "KAIST · UNIST"], c: "#fbbf24" },
  ]
  return (
    <svg viewBox="0 0 720 340" className="h-auto w-full" style={font} role="img" aria-label="표선고 입학부터 수시 원서, IB 외부평가, 학생부종합전형 합격까지의 경로">
      <defs>
        <linearGradient id="pw-line" gradientUnits="userSpaceOnUse" x1="60" y1="0" x2="660" y2="0">
          <stop offset="0" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#34d399" />
        </linearGradient>
      </defs>
      <path d="M60 70 H660" stroke="url(#pw-line)" strokeWidth="3" strokeDasharray="6 8">
        <animate attributeName="stroke-dashoffset" from="140" to="0" dur="4s" repeatCount="indefinite" />
      </path>
      <circle r="4" fill="#f5f3ff">
        <animateMotion dur="4s" repeatCount="indefinite" path="M60 70 H660" />
      </circle>
      {tl.map((p) => (
        <g key={p.t}>
          <circle cx={p.x} cy="70" r="10" fill={card} stroke={p.c} strokeWidth="3" />
          <text x={p.x} y="42" textAnchor="middle" fontSize="13" fontWeight="800" fill={p.c}>{p.t}</text>
          <text x={p.x} y="102" textAnchor="middle" fontSize="12" fill="#d1d5db">{p.s}</text>
        </g>
      ))}
      <rect x="360" y="114" width="120" height="24" rx="12" fill="#fbbf24" fillOpacity="0.15" stroke="#fbbf24" strokeOpacity="0.5" />
      <text x="420" y="131" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fde68a">IB 점수 아직 없음</text>

      {flow.map((f, i) => (
        <g key={f.t}>
          <rect x={f.x} y="180" width="155" height="120" rx="16" fill={f.strong ? f.c : card} fillOpacity={f.strong ? 0.18 : 1} stroke={f.c} strokeWidth={f.strong ? 2.5 : 1.5} />
          <text x={f.x + 77} y="216" textAnchor="middle" fontSize="15" fontWeight="800" fill={f.c}>{f.t}</text>
          {f.s.map((line, j) => (
            <text key={line} x={f.x + 77} y={246 + j * 22} textAnchor="middle" fontSize="12" fill="#e5e7eb">{line}</text>
          ))}
          {i < flow.length - 1 && (
            <path d={`M${f.x + 160} 240 h12 m-6 -6 l6 6 l-6 6`} fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
          )}
        </g>
      ))}
    </svg>
  )
}

/* ───────── Hero · 시험 문제 · 토론과 발표 ───────── */

/** Hero — 토론식(근거로 대화하는 교실) + 프로젝트식(IB 학습 사이클: 탐구 → 행동 → 성찰) */
export function IbHeroSvg() {
  const talk = [
    { side: "L", tag: "① 주장", text: "AI가 준 답은 믿을 만해", c: "#c084fc" },
    { side: "R", tag: "② 근거", text: "출처까지 확인했거든", c: "#38bdf8" },
    { side: "L", tag: "③ 반론", text: "그 출처도 틀릴 수 있잖아?", c: "#f472b6" },
    { side: "R", tag: "④ 재반박", text: "두 출처로 교차 검증하자", c: "#34d399" },
  ]
  const cx = 550
  const cy = 182
  const R = 96
  const nodes = [
    { x: cx, y: cy - R, t: "탐구", s: "질문 · 조사 · 실험", c: "#38bdf8" },
    { x: cx + 83, y: cy + 48, t: "행동", s: "결과물 · 발표 · 실천", c: "#34d399" },
    { x: cx - 83, y: cy + 48, t: "성찰", s: "피드백 · 고쳐 쓰기", c: "#f472b6" },
  ]
  const chevrons = [
    [cx + 83, cy - 48, 60],
    [cx, cy + R, 180],
    [cx - 83, cy - 48, 300],
  ]
  return (
    <svg viewBox="0 0 720 320" className="mx-auto h-auto w-full max-w-3xl" style={font} role="img" aria-label="탐구 질문을 두고 주장, 근거, 반론, 재반박으로 대화하는 토론 수업과, 탐구, 행동, 성찰로 이어지는 IB 학습 사이클">
      <defs>
        <filter id="hero-glow"><feGaussianBlur stdDeviation="14" /></filter>
      </defs>

      {/* 왼쪽 · 토론식 */}
      <text x="170" y="24" textAnchor="middle" fontSize="13" fontWeight="800" fill="#c4b5fd" letterSpacing="1">토론식 · 근거로 대화하는 교실</text>
      <rect x="70" y="40" width="200" height="54" rx="14" fill="#8b5cf6" opacity="0.25" filter="url(#hero-glow)" />
      <rect x="70" y="40" width="200" height="54" rx="14" fill="#130d24" stroke="#c4b5fd" strokeWidth="1.5" />
      <text x="170" y="60" textAnchor="middle" fontSize="11" fill="#a78bfa" letterSpacing="1">탐구 질문</text>
      <text x="170" y="82" textAnchor="middle" fontSize="15" fontWeight="800" fill="#f5f3ff">어떻게 확신할 수 있을까?</text>
      <line x1="170" y1="94" x2="170" y2="274" stroke="#c4b5fd" strokeOpacity="0.2" strokeDasharray="3 5" />
      {talk.map((b, i) => {
        const y = 108 + i * 44
        const left = b.side === "L"
        const ax = left ? 30 : 318
        const bx = left ? 50 : 74
        const a = (i * 0.16).toFixed(2)
        const z = (i * 0.16 + 0.06).toFixed(2)
        return (
          <g key={b.tag} opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;0" keyTimes={`0;${a};${z};0.92;1`} dur="9s" repeatCount="indefinite" />
            <circle cx={ax} cy={y + 17} r="13" fill="#0b0b12" stroke={b.c} strokeWidth="2" />
            <circle cx={ax} cy={y + 14} r="3.5" fill={b.c} />
            <path d={`M${ax - 6} ${y + 25} a6 5 0 0 1 12 0`} fill={b.c} />
            <rect x={bx} y={y} width="224" height="34" rx="12" fill="#0b0b12" stroke={b.c} strokeOpacity="0.7" />
            <text x={bx + 12} y={y + 22} fontSize="11" fontWeight="800" fill={b.c}>{b.tag}</text>
            <text x={bx + 66} y={y + 22} fontSize="12" fill="#e5e7eb">{b.text}</text>
          </g>
        )
      })}
      <rect x="40" y="286" width="260" height="26" rx="13" fill="#ffffff" fillOpacity="0.04" stroke="#ffffff" strokeOpacity="0.1" />
      <text x="170" y="303" textAnchor="middle" fontSize="11" fill="#d1d5db">교사 = 진행자 · “그 근거는 어디서 왔나요?”</text>

      {/* 가운데 연결 */}
      <circle cx="362" cy="176" r="15" fill="#0b0b12" stroke="#9ca3af" strokeOpacity="0.5" />
      <text x="362" y="181" textAnchor="middle" fontSize="14" fontWeight="800" fill="#e5e7eb">⇄</text>
      <text x="362" y="208" textAnchor="middle" fontSize="10" fill="#9ca3af">서로를</text>
      <text x="362" y="221" textAnchor="middle" fontSize="10" fill="#9ca3af">깊게</text>

      {/* 오른쪽 · 프로젝트식 */}
      <text x={cx} y="24" textAnchor="middle" fontSize="13" fontWeight="800" fill="#7dd3fc" letterSpacing="1">프로젝트식 · IB 학습 사이클</text>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#38bdf8" strokeOpacity="0.25" strokeWidth="6" strokeDasharray="8 10">
        <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="40s" repeatCount="indefinite" />
      </circle>
      <circle r="4" fill="#f5f3ff">
        <animateMotion dur="7s" repeatCount="indefinite" path={`M${cx} ${cy - R} a${R} ${R} 0 1 1 0 ${R * 2} a${R} ${R} 0 1 1 0 ${-R * 2}`} />
      </circle>
      {chevrons.map(([x, y, r]) => (
        <path key={`${x}-${y}`} d="M-6,-6 L5,0 L-6,6" transform={`translate(${x},${y}) rotate(${r})`} fill="none" stroke="#7dd3fc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      ))}
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize="12" fill="#9ca3af">↻ 다음 탐구로</text>
      <text x={cx} y={cy + 14} textAnchor="middle" fontSize="10" fill="#6b7280">Inquiry · Action · Reflection</text>
      {nodes.map((n) => (
        <g key={n.t}>
          <rect x={n.x - 66} y={n.y - 28} width="132" height="56" rx="14" fill="#0b0b12" stroke={n.c} strokeWidth="1.8" />
          <text x={n.x} y={n.y - 4} textAnchor="middle" fontSize="16" fontWeight="800" fill={n.c}>{n.t}</text>
          <text x={n.x} y={n.y + 16} textAnchor="middle" fontSize="11" fill="#d1d5db">{n.s}</text>
        </g>
      ))}
    </svg>
  )
}

/** 명령어 사다리 AO1 → AO4 */
export function IbCommandLadderSvg({ ladder }: { ladder: { ao: string; name: string; terms: string; color: string }[] }) {
  const base = 290
  return (
    <svg viewBox="0 0 720 320" className="mx-auto h-auto w-full max-w-3xl" style={font} role="img" aria-label="정의하라에서 평가하라까지 IB 명령어의 사고 수준 4단계">
      <path d="M30 150 L330 40" stroke="#f472b6" strokeOpacity="0.5" strokeWidth="2.5" strokeDasharray="3 9" strokeLinecap="round">
        <animate attributeName="stroke-dashoffset" from="48" to="0" dur="2s" repeatCount="indefinite" />
      </path>
      <text x="120" y="96" fontSize="13" fontWeight="800" fill="#f9a8d4" transform="rotate(-20 120 96)">사고 수준 · 배점 ↑</text>
      {ladder.map((l, i) => {
        const h = 112 + i * 52
        const x = 20 + i * 172
        return (
          <g key={l.ao}>
            <rect x={x} y={base - h} width="160" height={h} rx="12" fill={l.color} fillOpacity={0.06 + i * 0.04} stroke={l.color} strokeOpacity="0.6" strokeWidth={i === 3 ? 2.5 : 1.2} />
            <text x={x + 80} y={base - h + 28} textAnchor="middle" fontSize="18" fontWeight="800" fill={l.color}>{l.ao}</text>
            <text x={x + 80} y={base - h + 50} textAnchor="middle" fontSize="14" fontWeight="700" fill="#f5f3ff">{l.name}</text>
            {l.terms.split(" · ").map((t, j) => (
              <text key={t} x={x + 80} y={base - h + 72 + j * 17} textAnchor="middle" fontSize="12" fill="#d1d5db">{t}</text>
            ))}
          </g>
        )
      })}
      <text x="20" y="314" fontSize="12" fill="#9ca3af">2~4점 짧은 문항</text>
      <text x="700" y="314" textAnchor="end" fontSize="12" fontWeight="700" fill="#f9a8d4">10~15점 논술 문항은 대부분 AO3~AO4</text>
    </svg>
  )
}

/** 고득점 답안이 쌓이는 구조 + 밴드 */
export function IbAnswerBuildSvg() {
  const blocks = [
    { t: "정의", s: "핵심 개념", c: "#38bdf8" },
    { t: "이론", s: "모형 · 도표", c: "#38bdf8" },
    { t: "사례", s: "실제 데이터", c: "#34d399" },
    { t: "분석", s: "원인 → 결과", c: "#fbbf24" },
    { t: "반론", s: "한계 · 다른 관점", c: "#f472b6" },
    { t: "평가", s: "조건부 결론", c: "#f472b6" },
  ]
  const bands = [
    { n: 2, label: "하위 · 정의와 설명만", c: "#38bdf8" },
    { n: 4, label: "중위 · 분석까지", c: "#fbbf24" },
    { n: 6, label: "상위 · 반론을 저울질해 결론", c: "#f472b6" },
  ]
  const w = 104
  const gap = 10
  const x0 = 23
  return (
    <svg viewBox="0 0 720 270" className="mx-auto h-auto w-full max-w-3xl" style={font} role="img" aria-label="정의, 이론, 사례, 분석, 반론, 평가로 쌓이는 고득점 논술 답안 구조와 채점 밴드">
      {blocks.map((b, i) => (
        <g key={b.t}>
          <rect x={x0 + i * (w + gap)} y="20" width={w} height="74" rx="12" fill="#0b0b12" stroke={b.c} strokeWidth="1.8" />
          <text x={x0 + i * (w + gap) + w / 2} y="52" textAnchor="middle" fontSize="16" fontWeight="800" fill={b.c}>{b.t}</text>
          <text x={x0 + i * (w + gap) + w / 2} y="75" textAnchor="middle" fontSize="11" fill="#d1d5db">{b.s}</text>
          {i < blocks.length - 1 && <text x={x0 + i * (w + gap) + w + gap / 2} y="61" textAnchor="middle" fontSize="12" fill="#6b7280">›</text>}
        </g>
      ))}
      {bands.map((b, i) => {
        const len = b.n * (w + gap) - gap
        return (
          <g key={b.label}>
            <rect x={x0} y={122 + i * 46} width={len} height="30" rx="15" fill={b.c} fillOpacity="0.14" stroke={b.c} strokeOpacity="0.55" />
            <rect x={x0} y={122 + i * 46} width="0" height="30" rx="15" fill={b.c} fillOpacity="0.25">
              <animate attributeName="width" from="0" to={len} dur={`${1 + i * 0.4}s`} fill="freeze" />
            </rect>
            <text x={x0 + 16} y={142 + i * 46} fontSize="13" fontWeight="700" fill="#f5f3ff">{b.label}</text>
          </g>
        )
      })}
    </svg>
  )
}

/** 3단계 발표 무대 — PYP · MYP · DP */
export function IbPresentationStagesSvg() {
  const stages = [
    { x: 30, w: 190, h: 60, code: "PYP", t: "전시회 발표", s: "학부모 · 지역 앞에서", aud: 6, q: 1, c: "#c084fc" },
    { x: 265, w: 190, h: 95, code: "MYP", t: "개인 프로젝트", s: "결과물 + 과정 설명", aud: 9, q: 2, c: "#38bdf8" },
    { x: 500, w: 190, h: 130, code: "DP", t: "개인 구술 · TOK 전시", s: "10분 발표 + 5분 질의", aud: 12, q: 3, c: "#34d399" },
  ]
  const floor = 250
  return (
    <svg viewBox="0 0 720 300" className="mx-auto h-auto w-full max-w-3xl" style={font} role="img" aria-label="초등 PYP 전시회, 중등 MYP 개인 프로젝트, 고등 DP 개인 구술로 커지는 발표 무대">
      <defs><filter id="ps-glow"><feGaussianBlur stdDeviation="10" /></filter></defs>
      {stages.map((s) => {
        const top = floor - s.h
        const cx = s.x + s.w / 2
        return (
          <g key={s.code}>
            <ellipse cx={cx} cy={top - 40} rx="40" ry="26" fill={s.c} opacity="0.18" filter="url(#ps-glow)" />
            <rect x={s.x} y={top} width={s.w} height={s.h} rx="10" fill={s.c} fillOpacity="0.1" stroke={s.c} strokeOpacity="0.6" />
            <circle cx={cx} cy={top - 50} r="9" fill={s.c} />
            <path d={`M${cx - 14} ${top} v-18 a14 12 0 0 1 28 0 v18 z`} fill={s.c} />
            <rect x={cx + 22} y={top - 70} width="44" height="28" rx="6" fill="#0b0b12" stroke={s.c} strokeOpacity="0.7" />
            {[8, 13, 18].map((bh, j) => (
              <rect key={bh} x={cx + 30 + j * 10} y={top - 46 - bh} width="6" height={bh} rx="1.5" fill={s.c} opacity="0.75" />
            ))}
            {Array.from({ length: s.q }).map((_, j) => (
              <text key={j} x={cx - 34 - j * 16} y={top - 56} textAnchor="middle" fontSize="16" fontWeight="800" fill="#f5f3ff">
                ?
                <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" begin={`${j * 0.4}s`} repeatCount="indefinite" />
              </text>
            ))}
            <text x={cx} y={top + 26} textAnchor="middle" fontSize="18" fontWeight="800" fill={s.c}>{s.code}</text>
            <text x={cx} y={top + 46} textAnchor="middle" fontSize="13" fontWeight="700" fill="#f5f3ff">{s.t}</text>
            {s.h > 70 && <text x={cx} y={top + 66} textAnchor="middle" fontSize="11" fill="#d1d5db">{s.s}</text>}
            {Array.from({ length: s.aud }).map((_, j) => (
              <circle key={j} cx={s.x + 12 + (j % 12) * ((s.w - 24) / 11)} cy={floor + 18} r="5" fill="#9ca3af" opacity="0.55" />
            ))}
          </g>
        )
      })}
      <text x="125" y="292" textAnchor="middle" fontSize="12" fill="#9ca3af">학부모 · 지역 주민 · 학생 발표 대상</text>
      <text x="595" y="292" textAnchor="middle" fontSize="12" fill="#86efac">? = 질의응답의 날카로움</text>
    </svg>
  )
}
