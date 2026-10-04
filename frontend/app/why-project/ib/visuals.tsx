const font = { fontFamily: "inherit" }

/** PYP → MYP → DP 연속 과정 */
export function IbContinuumSvg() {
  const steps = [
    { x: 120, code: "PYP", t: "초등 · 3~12세", c: "#c084fc" },
    { x: 360, code: "MYP", t: "중등 · 11~16세", c: "#38bdf8" },
    { x: 600, code: "DP", t: "고등 · 16~19세", c: "#34d399" },
  ]
  return (
    <svg viewBox="0 0 720 200" className="h-auto w-full" style={font} role="img" aria-label="IB 초등 PYP, 중등 MYP, 고등 DP로 이어지는 탐구 과정">
      <defs>
        <linearGradient id="ibc-line" x1="0" x2="1">
          <stop offset="0" stopColor="#c084fc" />
          <stop offset="0.5" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#34d399" />
        </linearGradient>
        <filter id="ibc-glow"><feGaussianBlur stdDeviation="10" /></filter>
      </defs>
      <path d="M120 90 H600" stroke="url(#ibc-line)" strokeWidth="3" strokeDasharray="6 8">
        <animate attributeName="stroke-dashoffset" from="140" to="0" dur="4s" repeatCount="indefinite" />
      </path>
      <circle r="4" fill="#f5f3ff">
        <animateMotion dur="4s" repeatCount="indefinite" path="M120 90 H600" />
      </circle>
      {steps.map((s, i) => (
        <g key={s.code}>
          <circle cx={s.x} cy="90" r={46 + i * 6} fill={s.c} opacity="0.22" filter="url(#ibc-glow)" />
          <circle cx={s.x} cy="90" r={36 + i * 6} fill="#0b0b12" stroke={s.c} strokeWidth="2" />
          <text x={s.x} y="97" textAnchor="middle" fontSize={20 + i * 2} fontWeight="800" fill={s.c}>{s.code}</text>
          <text x={s.x} y="172" textAnchor="middle" fontSize="13" fontWeight="600" fill="#d1d5db">{s.t}</text>
        </g>
      ))}
      <text x="360" y="24" textAnchor="middle" fontSize="13" fill="#9ca3af">하나의 철학 — ‘개념 기반 탐구’</text>
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
      <text x="360" y="352" textAnchor="middle" fontSize="13" fill="#fde68a">+ 언어 구술 · TOK 발표 · EE 면담까지 — 객관식 0%</text>
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
        <linearGradient id="ms-line" x1="0" x2="1">
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
        <linearGradient id="pw-line" x1="0" x2="1">
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
