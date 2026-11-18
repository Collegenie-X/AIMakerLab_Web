const font = { fontFamily: "inherit" }
const BG = "#0b0b12"

type Phase = { key: string; name: string; period: string; color: string; steps: { title: string; sub: string }[] }

/** 실무 2단계 파이프라인 — 프론트 퍼스트 루프 → 확정 게이트 → Django 백엔드 → 웹·앱 */
export function TwoPhaseSvg({ phases }: { phases: Phase[] }) {
  const [front, back] = phases
  const xs = [100, 273, 446, 619]
  const nodeW = 144
  const lane = (p: Phase, y: number, offset: number, loop: boolean) => (
    <g>
      <rect x="16" y={y} width="688" height="150" rx="22" fill={p.color} fillOpacity="0.05" stroke={p.color} strokeOpacity="0.3" />
      <text x="36" y={y + 26} fontSize="12" fontWeight="800" letterSpacing="1.5" fill={p.color}>{p.name}</text>
      <text x="684" y={y + 26} textAnchor="end" fontSize="11" fill="#9ca3af">{p.period}</text>
      {p.steps.map((s, i) => {
        const cx = xs[i]
        return (
          <g key={s.title}>
            {i < 3 && (
              <path d={`M${cx + nodeW / 2 + 4} ${y + 74} H${xs[i + 1] - nodeW / 2 - 8}`} stroke={p.color} strokeWidth="2" markerEnd={`url(#tp-arrow-${p.key})`} />
            )}
            <rect x={cx - nodeW / 2} y={y + 44} width={nodeW} height="60" rx="14" fill={BG} stroke={p.color} strokeWidth="1.6" />
            <circle cx={cx - nodeW / 2 + 20} cy={y + 74} r="11" fill={p.color} fillOpacity="0.18" />
            <text x={cx - nodeW / 2 + 20} y={y + 78} textAnchor="middle" fontSize="11" fontWeight="800" fill={p.color}>{offset + i + 1}</text>
            <text x={cx + 12} y={y + 70} textAnchor="middle" fontSize="13" fontWeight="700" fill="#f3f4f6">{s.title}</text>
            <text x={cx + 12} y={y + 88} textAnchor="middle" fontSize="10.5" fill="#9ca3af">{s.sub}</text>
          </g>
        )
      })}
      {loop && (
        <g>
          <path id="tp-loop" d={`M${xs[3]} ${y + 106} C${xs[3]} ${y + 140}, ${xs[0]} ${y + 140}, ${xs[0]} ${y + 108}`} fill="none" stroke={p.color} strokeWidth="1.8" strokeDasharray="5 6" markerEnd={`url(#tp-arrow-${p.key})`}>
            <animate attributeName="stroke-dashoffset" from="0" to="-110" dur="3s" repeatCount="indefinite" />
          </path>
          <circle r="4.5" fill="#f5f3ff">
            <animateMotion dur="3s" repeatCount="indefinite" path={`M${xs[3]} ${y + 106} C${xs[3]} ${y + 140}, ${xs[0]} ${y + 140}, ${xs[0]} ${y + 108}`} />
          </circle>
          <rect x="268" y={y + 120} width="184" height="22" rx="11" fill={BG} stroke={p.color} strokeOpacity="0.5" />
          <text x="360" y={y + 135} textAnchor="middle" fontSize="11" fontWeight="700" fill="#ddd6fe">피드백 → 다시 프롬프트 · 하루 N회</text>
        </g>
      )}
    </g>
  )

  return (
    <svg viewBox="0 0 720 520" className="h-auto w-full" style={font} role="img" aria-label="프론트 퍼스트 4단계를 피드백으로 반복한 뒤 화면을 확정하고, JSON 스키마를 바탕으로 Django 백엔드 4단계를 거쳐 웹과 앱으로 출시하는 흐름">
      <defs>
        {phases.map((p) => (
          <marker key={p.key} id={`tp-arrow-${p.key}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill={p.color} />
          </marker>
        ))}
        <linearGradient id="tp-gate" x1="0" x2="1">
          <stop offset="0" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#34d399" />
        </linearGradient>
      </defs>

      {lane(front, 10, 0, true)}

      {/* 확정 게이트 + JSON 이 아래로 내려감 */}
      <path d="M360 160 V290" stroke="url(#tp-gate)" strokeWidth="2" strokeDasharray="4 5" />
      <rect x="196" y="198" width="328" height="56" rx="28" fill={BG} stroke="url(#tp-gate)" strokeWidth="2" />
      <text x="360" y="222" textAnchor="middle" fontSize="14" fontWeight="800" fill="#ffffff">✓ 화면 · 흐름 확정 (Freeze)</text>
      <text x="360" y="241" textAnchor="middle" fontSize="11" fill="#d1d5db">다듬어진 JSON 구조 = Django 모델 설계도</text>
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0; 0 96; 0 96" keyTimes="0;0.7;1" dur="3.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.75;1" dur="3.5s" repeatCount="indefinite" />
        <rect x="560" y="166" width="58" height="30" rx="6" fill="#fbbf24" fillOpacity="0.15" stroke="#fbbf24" />
        <text x="589" y="186" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fde68a">{"{ JSON }"}</text>
      </g>

      {lane(back, 290, 4, false)}

      {/* 출시 */}
      <path d={`M${xs[3]} 440 V470 H556`} stroke="#34d399" strokeWidth="1.6" fill="none" markerEnd="url(#tp-arrow-back)" />
      {[
        { x: 236, label: "🌐 웹 서비스 · Vercel", c: "#e5e7eb" },
        { x: 400, label: "📱 앱 · React Native", c: "#f472b6" },
      ].map((b) => (
        <g key={b.label}>
          <rect x={b.x} y="455" width="150" height="30" rx="15" fill={BG} stroke={b.c} strokeOpacity="0.6" />
          <text x={b.x + 75} y="475" textAnchor="middle" fontSize="12" fontWeight="700" fill={b.c}>{b.label}</text>
        </g>
      ))}
      <text x="220" y="475" textAnchor="end" fontSize="12" fontWeight="700" fill="#9ca3af">출시</text>
      <text x="360" y="510" textAnchor="middle" fontSize="11" fill="#6b7280">각 단계는 AI와 수십 번 대화하며 검증 — 서비스 수준까지 약 100회</text>
    </svg>
  )
}

/** Vercel 브랜치별 프리뷰 URL — git 그래프 */
export function PreviewBranchSvg() {
  const branches = [
    { from: 70, to: 220, name: "feat-hero", note: "v1 · 피드백 4건", color: "#a78bfa" },
    { from: 270, to: 420, name: "feat-filter", note: "v2 · 피드백 2건", color: "#38bdf8" },
    { from: 470, to: 620, name: "feat-favorite", note: "v3 · 피드백 0건 ✓", color: "#34d399" },
  ]
  const mainY = 222
  const brY = 140
  return (
    <svg viewBox="0 0 720 270" className="h-auto w-full" style={font} role="img" aria-label="기능마다 브랜치를 만들어 push하면 Vercel이 프리뷰 URL을 만들고, 피드백이 끝나면 main에 합쳐 운영에 반영되는 흐름">
      <path d={`M30 ${mainY} H690`} stroke="#e5e7eb" strokeOpacity="0.5" strokeWidth="3" />
      <circle r="5" fill="#ffffff"><animateMotion dur="6s" repeatCount="indefinite" path={`M30 ${mainY} H690`} /></circle>
      <text x="30" y={mainY + 30} fontSize="12" fontWeight="800" fill="#e5e7eb">main</text>
      <text x="690" y={mainY + 30} textAnchor="end" fontSize="11" fill="#9ca3af">merge → 운영 도메인 자동 반영</text>

      {branches.map((b) => {
        const d = `M${b.from} ${mainY} C${b.from + 30} ${mainY}, ${b.from + 20} ${brY}, ${b.from + 50} ${brY} H${b.to - 50} C${b.to - 20} ${brY}, ${b.to - 30} ${mainY}, ${b.to} ${mainY}`
        const mid = (b.from + b.to) / 2
        return (
          <g key={b.name}>
            <path d={d} fill="none" stroke={b.color} strokeWidth="2.4" />
            {[b.from + 50, mid, b.to - 50].map((x) => (
              <circle key={x} cx={x} cy={brY} r="6" fill={BG} stroke={b.color} strokeWidth="2" />
            ))}
            <circle cx={b.from} cy={mainY} r="5" fill="#e5e7eb" />
            <circle cx={b.to} cy={mainY} r="7" fill={b.color} />
            {/* preview bubble */}
            <path d={`M${mid} ${brY - 8} V${brY - 30}`} stroke={b.color} strokeDasharray="3 3" />
            <rect x={mid - 74} y="34" width="148" height="56" rx="12" fill={BG} stroke={b.color} strokeOpacity="0.7" />
            <rect x={mid - 74} y="34" width="148" height="16" rx="8" fill={b.color} fillOpacity="0.18" />
            {[0, 1, 2].map((i) => <circle key={i} cx={mid - 64 + i * 8} cy="42" r="2.4" fill={b.color} />)}
            <text x={mid} y="67" textAnchor="middle" fontSize="11" fontWeight="700" fill="#f3f4f6">{b.name}.vercel.app</text>
            <text x={mid} y="82" textAnchor="middle" fontSize="10" fill={b.color}>{b.note}</text>
            <text x={b.from + 50} y={brY + 24} textAnchor="middle" fontSize="10" fill="#6b7280">push</text>
          </g>
        )
      })}
      <text x="360" y="18" textAnchor="middle" fontSize="11" fill="#9ca3af">push 할 때마다 Vercel이 접속 가능한 프리뷰 URL을 자동 생성</text>
    </svg>
  )
}

/** 서버 없이 테스트 — 화면 → repo.ts → JSON / localStorage, 나중에 Django */
export function ServerlessArchSvg() {
  return (
    <svg viewBox="0 0 720 340" className="h-auto w-full" style={font} role="img" aria-label="브라우저 안의 화면 컴포넌트가 repo.ts를 통해 JSON 파일과 localStorage에서 데이터를 읽고 쓰며, 나중에 스위치를 바꾸면 Django API로 연결되는 구조">
      <defs>
        <marker id="sa-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="#a78bfa" />
        </marker>
      </defs>
      {/* browser */}
      <rect x="16" y="16" width="452" height="308" rx="18" fill={BG} stroke="#ffffff" strokeOpacity="0.18" />
      <rect x="16" y="16" width="452" height="34" rx="17" fill="#ffffff" fillOpacity="0.04" />
      {["#f87171", "#fbbf24", "#34d399"].map((c, i) => <circle key={c} cx={38 + i * 14} cy="33" r="4.5" fill={c} opacity="0.8" />)}
      <rect x="96" y="24" width="250" height="18" rx="9" fill="#ffffff" fillOpacity="0.06" />
      <text x="108" y="37" fontSize="10.5" fill="#9ca3af">localhost:3000 · 브라우저 안에서 전부 동작</text>
      <rect x="370" y="23" width="84" height="20" rx="10" fill="#34d399" fillOpacity="0.15" stroke="#34d399" strokeOpacity="0.6" />
      <text x="412" y="37" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#6ee7b7">서버 0대</text>

      {/* UI */}
      <rect x="40" y="64" width="404" height="74" rx="12" fill="#ffffff" fillOpacity="0.03" stroke="#ffffff" strokeOpacity="0.12" />
      <text x="56" y="84" fontSize="11" fontWeight="700" fill="#e5e7eb">page.tsx · 화면</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={56 + i * 128} y="94" width="116" height="34" rx="8" fill="#ffffff" fillOpacity="0.05" />
          <rect x={64 + i * 128} y="104" width="60" height="6" rx="3" fill="#6b7280" />
          <rect x={64 + i * 128} y="115" width="40" height="5" rx="2.5" fill="#4b5563" />
          <text x={158 + i * 128} y="117" textAnchor="end" fontSize="13" fill={i === 1 ? "#f472b6" : "#4b5563"}>♥</text>
        </g>
      ))}

      {/* repo.ts */}
      <path d="M242 140 V164" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#sa-arrow)" />
      <rect x="120" y="168" width="244" height="50" rx="14" fill="#a78bfa" fillOpacity="0.1" stroke="#a78bfa" strokeWidth="1.8" />
      <text x="140" y="190" fontSize="13" fontWeight="800" fill="#ddd6fe">lib/repo.ts</text>
      <text x="140" y="207" fontSize="10.5" fill="#c4b5fd">데이터 출입구 — 화면은 여기만 부름</text>
      {/* switch */}
      <rect x="296" y="182" width="52" height="22" rx="11" fill={BG} stroke="#a78bfa" />
      <circle cx="308" cy="193" r="7" fill="#fbbf24">
        <animate attributeName="cx" values="308;308;336;336;308" keyTimes="0;0.4;0.5;0.9;1" dur="6s" repeatCount="indefinite" />
        <animate attributeName="fill" values="#fbbf24;#fbbf24;#34d399;#34d399;#fbbf24" keyTimes="0;0.4;0.5;0.9;1" dur="6s" repeatCount="indefinite" />
      </circle>
      <text x="322" y="176" textAnchor="middle" fontSize="9" fill="#9ca3af">json · api</text>

      {/* JSON + localStorage */}
      <path d="M190 220 V250" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#sa-arrow)" />
      <path d="M300 250 V220" stroke="#38bdf8" strokeWidth="2" />
      <path d="M300 220 V222" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#sa-arrow)" />
      <g>
        <path d="M60 254 h120 l14 14 v42 h-134 z" fill="#fbbf24" fillOpacity="0.08" stroke="#fbbf24" strokeWidth="1.6" />
        <text x="74" y="276" fontSize="12" fontWeight="800" fill="#fde68a">/data/*.json</text>
        <text x="74" y="294" fontSize="10.5" fill="#d1d5db">읽기 · 시드 데이터</text>
      </g>
      <g>
        <rect x="236" y="254" width="200" height="56" rx="10" fill="#38bdf8" fillOpacity="0.08" stroke="#38bdf8" strokeWidth="1.6" />
        <text x="252" y="276" fontSize="12" fontWeight="800" fill="#bae6fd">localStorage</text>
        <text x="252" y="294" fontSize="10.5" fill="#d1d5db">쓰기 · {"favs: [2]"}</text>
        <rect x="380" y="266" width="44" height="32" rx="6" fill="#38bdf8" fillOpacity="0.15" />
        <text x="402" y="287" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7dd3fc">5MB</text>
      </g>

      {/* Django later */}
      <path d="M366 193 H520" stroke="#34d399" strokeWidth="2" strokeDasharray="6 6">
        <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1.2s" repeatCount="indefinite" />
      </path>
      <rect x="520" y="120" width="184" height="146" rx="18" fill="#34d399" fillOpacity="0.04" stroke="#34d399" strokeDasharray="6 6" />
      <text x="612" y="148" textAnchor="middle" fontSize="11" fontWeight="800" letterSpacing="1" fill="#34d399">PHASE 2</text>
      <text x="612" y="178" textAnchor="middle" fontSize="16" fontWeight="800" fill="#d1fae5">Django API</text>
      <text x="612" y="198" textAnchor="middle" fontSize="11" fill="#9ca3af">+ Admin + DB</text>
      <rect x="538" y="218" width="148" height="30" rx="8" fill={BG} stroke="#34d399" strokeOpacity="0.4" />
      <text x="612" y="237" textAnchor="middle" fontSize="9.5" fill="#6ee7b7">DATA_SOURCE=api 로 전환</text>
      <text x="612" y="296" textAnchor="middle" fontSize="11" fill="#9ca3af">화면 코드 수정 0줄</text>
    </svg>
  )
}

/** JSON → models.py → Django Admin 화면 */
export function DjangoAdminSvg() {
  const rows = [
    { t: "AI 동화책", g: "중1~2", h: "3", on: true },
    { t: "화상 영어 AI 튜터", g: "중3~고1", h: "6", on: true },
    { t: "감정 방탈출 게임", g: "고2~3", h: "12", on: true },
    { t: "V0 + Cursor 심화", g: "심화", h: "16", on: false },
  ]
  return (
    <svg viewBox="0 0 720 320" className="h-auto w-full" style={font} role="img" aria-label="JSON 파일을 AI가 Django 모델로 바꾸고, admin.py에 등록하면 검색·필터·수정이 되는 관리자 페이지가 생기는 과정">
      <defs>
        <marker id="da-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="#9ca3af" />
        </marker>
      </defs>
      {/* JSON */}
      <path d="M16 70 h110 l16 16 v130 h-126 z" fill="#fbbf24" fillOpacity="0.07" stroke="#fbbf24" strokeWidth="1.6" />
      <text x="28" y="92" fontSize="11.5" fontWeight="800" fill="#fde68a">courses.json</text>
      {['[{', '  "title": …,', '  "grade": …,', '  "hours": 3', '}, …]'].map((l, i) => (
        <text key={i} x="28" y={116 + i * 18} fontSize="10.5" fill="#d1d5db" style={{ fontFamily: "ui-monospace, monospace" }}>{l}</text>
      ))}
      <text x="79" y="244" textAnchor="middle" fontSize="10.5" fill="#9ca3af">프론트에서 검증 완료</text>

      <path d="M148 150 H178" stroke="#9ca3af" strokeWidth="1.8" markerEnd="url(#da-arrow)" />
      <text x="163" y="138" textAnchor="middle" fontSize="10" fontWeight="700" fill="#c4b5fd">AI</text>

      {/* models.py */}
      <rect x="184" y="70" width="150" height="146" rx="12" fill={BG} stroke="#34d399" strokeWidth="1.6" />
      <text x="196" y="92" fontSize="11.5" fontWeight="800" fill="#6ee7b7">models.py</text>
      {["class Course:", "  title = Char", "  grade = Char", "  hours = Int", "  is_open = Bool"].map((l, i) => (
        <text key={i} x="196" y={116 + i * 18} fontSize="10.5" fill={i === 0 ? "#a7f3d0" : "#d1d5db"} style={{ fontFamily: "ui-monospace, monospace" }}>{l}</text>
      ))}
      <rect x="196" y="226" width="126" height="22" rx="11" fill="#34d399" fillOpacity="0.15" />
      <text x="259" y="241" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#6ee7b7">admin.register ✓</text>

      <path d="M338 150 H368" stroke="#9ca3af" strokeWidth="1.8" markerEnd="url(#da-arrow)" />
      <text x="353" y="138" textAnchor="middle" fontSize="10" fontWeight="700" fill="#6ee7b7">즉시</text>

      {/* Admin mock */}
      <g>
        <rect x="374" y="20" width="330" height="268" rx="14" fill="#f8fafc" />
        <rect x="374" y="20" width="330" height="34" rx="14" fill="#0c4b33" />
        <rect x="374" y="40" width="330" height="14" fill="#0c4b33" />
        <text x="390" y="42" fontSize="12" fontWeight="800" fill="#f0fdf4">Django 관리</text>
        <text x="690" y="42" textAnchor="end" fontSize="10" fill="#bbf7d0">admin · 로그아웃</text>
        <rect x="374" y="54" width="330" height="20" fill="#417690" />
        <text x="390" y="68" fontSize="10" fill="#e0f2fe">홈 › Courses › 수업</text>

        <text x="390" y="94" fontSize="13" fontWeight="800" fill="#1f2937">변경할 수업 선택</text>
        <rect x="622" y="81" width="68" height="20" rx="10" fill="#417690" />
        <text x="656" y="95" textAnchor="middle" fontSize="10" fontWeight="700" fill="#ffffff">수업 추가 +</text>

        <rect x="390" y="106" width="180" height="20" rx="4" fill="#ffffff" stroke="#cbd5e1" />
        <text x="398" y="120" fontSize="10" fill="#94a3b8">🔍 제목 검색</text>
        {/* filter panel */}
        <rect x="586" y="106" width="104" height="168" rx="6" fill="#f1f5f9" stroke="#e2e8f0" />
        <text x="596" y="124" fontSize="10" fontWeight="800" fill="#334155">필터</text>
        <text x="596" y="142" fontSize="9.5" fontWeight="700" fill="#64748b">학년별</text>
        {["전체", "중1~2", "중3~고1", "고2~3"].map((g, i) => (
          <text key={g} x="602" y={158 + i * 15} fontSize="9.5" fill={i === 0 ? "#417690" : "#475569"} fontWeight={i === 0 ? 700 : 400}>{g}</text>
        ))}
        <text x="596" y="232" fontSize="9.5" fontWeight="700" fill="#64748b">공개 여부</text>
        <text x="602" y="248" fontSize="9.5" fill="#475569">예 · 아니오</text>

        {/* table */}
        <rect x="390" y="134" width="186" height="18" fill="#e2e8f0" />
        {["제목", "학년", "시간", "공개"].map((h, i) => (
          <text key={h} x={[408, 500, 534, 556][i]} y="147" fontSize="9.5" fontWeight="800" fill="#334155">{h}</text>
        ))}
        {rows.map((r, i) => {
          const y = 152 + i * 26
          return (
            <g key={r.t}>
              <rect x="390" y={y} width="186" height="26" fill={i % 2 ? "#f8fafc" : "#ffffff"} />
              <rect x="394" y={y + 8} width="9" height="9" rx="2" fill="none" stroke="#94a3b8" />
              <text x="408" y={y + 17} fontSize="9.5" fontWeight="700" fill="#417690">{r.t.length > 9 ? `${r.t.slice(0, 9)}…` : r.t}</text>
              <text x="500" y={y + 17} fontSize="9.5" fill="#334155">{r.g}</text>
              <text x="536" y={y + 17} fontSize="9.5" fill="#334155">{r.h}</text>
              <circle cx="562" cy={y + 13} r="5" fill={r.on ? "#22c55e" : "#ef4444"} />
            </g>
          )
        })}
        <rect x="390" y="262" width="80" height="18" rx="4" fill="#ffffff" stroke="#cbd5e1" />
        <text x="398" y="275" fontSize="9" fill="#475569">선택 항목 삭제 ▾</text>
        <text x="576" y="276" textAnchor="end" fontSize="9" fill="#64748b">4개 수업</text>
      </g>
      <text x="539" y="310" textAnchor="middle" fontSize="11" fill="#9ca3af">검색 · 필터 · 추가 · 수정 · 삭제 · 권한 — 코드 10줄로 완성</text>
    </svg>
  )
}

/** 질문 횟수 vs 서비스 완성도 — 빠른 구간과 책임의 구간 */
export function HundredAsksSvg({ milestones }: { milestones: { asks: number; title: string; desc: string }[] }) {
  const x0 = 70
  const x1 = 680
  const yTop = 64
  const yBot = 240
  const X = (a: number) => x0 + (a / 100) * (x1 - x0)
  // 완성도: 처음 10회에 금방 60%까지 올라 보이지만, 실제 서비스 기준(100%)까지는 나머지 90회
  const Y = (a: number) => yBot - (yBot - yTop) * (a <= 10 ? (a / 10) * 0.55 : 0.55 + 0.45 * (1 - Math.exp(-(a - 10) / 30)) / (1 - Math.exp(-3)))
  const pts = Array.from({ length: 101 }, (_, a) => `${X(a).toFixed(1)},${Y(a).toFixed(1)}`)
  const path = `M${pts.join(" L")}`
  return (
    <svg viewBox="0 0 720 300" className="h-auto w-full" style={font} role="img" aria-label="AI에게 묻는 횟수에 따른 서비스 완성도. 처음 10회는 빠르게 데모 수준에 오르지만 서비스 수준까지는 약 100회의 질문과 검증이 필요하다">
      <defs>
        <linearGradient id="ha-line" x1="0" x2="1">
          <stop offset="0" stopColor="#a78bfa" />
          <stop offset="0.12" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#34d399" />
        </linearGradient>
        <linearGradient id="ha-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#34d399" stopOpacity="0.18" />
          <stop offset="1" stopColor="#34d399" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* zones */}
      <rect x={x0} y={yTop - 14} width={X(10) - x0} height={yBot - yTop + 14} fill="#a78bfa" fillOpacity="0.1" />
      <rect x={X(10)} y={yTop - 14} width={x1 - X(10)} height={yBot - yTop + 14} fill="#34d399" fillOpacity="0.04" />
      <text x={(x0 + X(10)) / 2} y={yTop - 20} textAnchor="middle" fontSize="11" fontWeight="800" fill="#c4b5fd">빠른 테스트</text>
      <text x={(X(10) + x1) / 2} y={yTop - 20} textAnchor="middle" fontSize="11" fontWeight="800" fill="#6ee7b7">묻고 · 검증하고 · 책임지는 구간</text>

      {/* axes */}
      <path d={`M${x0} ${yTop - 14} V${yBot} H${x1 + 10}`} stroke="#ffffff" strokeOpacity="0.25" fill="none" />
      {[0, 25, 50, 75, 100].map((a) => (
        <text key={a} x={X(a)} y={yBot + 18} textAnchor="middle" fontSize="10" fill="#6b7280">{a}</text>
      ))}
      <text x={(x0 + x1) / 2} y={yBot + 38} textAnchor="middle" fontSize="11" fill="#9ca3af">AI에게 묻고 검증한 횟수</text>
      <text x="20" y={(yTop + yBot) / 2} fontSize="11" fill="#9ca3af" transform={`rotate(-90 20 ${(yTop + yBot) / 2})`} textAnchor="middle">서비스 완성도</text>
      <path d={`M${x0} ${Y(55)} H${x1}`} stroke="#ffffff" strokeOpacity="0.06" />
      <path d={`M${x0} ${yTop} H${x1}`} stroke="#34d399" strokeOpacity="0.35" strokeDasharray="4 5" />
      <text x={x0 + 6} y={yTop - 4} fontSize="9.5" fill="#6ee7b7">서비스 기준선</text>

      <path d={`${path} L${x1} ${yBot} L${x0} ${yBot} Z`} fill="url(#ha-area)" />
      <path d={path} fill="none" stroke="url(#ha-line)" strokeWidth="3" strokeLinecap="round" strokeDasharray="1400" strokeDashoffset="1400">
        <animate attributeName="stroke-dashoffset" from="1400" to="0" dur="2.4s" fill="freeze" />
      </path>

      {milestones.map((m, i) => {
        const cx = X(m.asks)
        const cy = Y(m.asks)
        const c = i === 0 ? "#a78bfa" : i === milestones.length - 1 ? "#34d399" : "#38bdf8"
        const last = i === milestones.length - 1
        // 곡선과 겹치지 않도록: 첫 점은 오른쪽 아래, 마지막 점은 왼쪽 아래, 가운데는 위·아래 번갈아
        const lx = i === 0 ? cx + 14 : last ? cx - 6 : cx
        const ly = i === 0 ? cy + 18 : last ? cy + 30 : i % 2 === 1 ? cy - 30 : cy + 26
        const anchor = i === 0 ? "start" : last ? "end" : "middle"
        return (
          <g key={m.asks}>
            <circle cx={cx} cy={cy} r="7" fill={BG} stroke={c} strokeWidth="2.5" />
            <text x={lx} y={ly} textAnchor={anchor} fontSize="12" fontWeight="800" fill={c}>{m.asks}회 · {m.title}</text>
            <text x={lx} y={ly + 15} textAnchor={anchor} fontSize="10" fill="#9ca3af">{m.desc}</text>
          </g>
        )
      })}
    </svg>
  )
}

/** Next.js(Vercel) 웹과 React Native 앱이 같은 코어를 공유 */
export function WebToAppSvg() {
  return (
    <svg viewBox="0 0 720 320" className="h-auto w-full" style={font} role="img" aria-label="Vercel에 배포한 Next.js 웹과 React Native 앱이 같은 React 문법, repo.ts 데이터 로직, Django API를 공유하는 구조">
      {/* browser */}
      <g>
        <rect x="16" y="50" width="230" height="170" rx="14" fill={BG} stroke="#e5e7eb" strokeOpacity="0.5" />
        <rect x="16" y="50" width="230" height="24" rx="12" fill="#ffffff" fillOpacity="0.05" />
        {[0, 1, 2].map((i) => <circle key={i} cx={30 + i * 11} cy="62" r="3.5" fill="#9ca3af" opacity="0.6" />)}
        <text x="140" y="66" textAnchor="middle" fontSize="9.5" fill="#9ca3af">myservice.vercel.app</text>
        {[0, 1].map((r) => [0, 1, 2].map((c) => (
          <rect key={`${r}${c}`} x={30 + c * 70} y={88 + r * 58} width="62" height="48" rx="8" fill="#ffffff" fillOpacity="0.05" stroke="#a78bfa" strokeOpacity="0.3" />
        )))}
        <text x="131" y="246" textAnchor="middle" fontSize="13" fontWeight="800" fill="#f3f4f6">🌐 Next.js 웹</text>
        <text x="131" y="264" textAnchor="middle" fontSize="10.5" fill="#9ca3af">Vercel 배포 · 지금 바로 검증</text>
      </g>

      {/* phone */}
      <g>
        <rect x="530" y="20" width="130" height="228" rx="24" fill={BG} stroke="#f472b6" strokeWidth="1.8" />
        <rect x="574" y="30" width="42" height="8" rx="4" fill="#f472b6" fillOpacity="0.35" />
        {[0, 1, 2].map((i) => (
          <rect key={i} x="544" y={52 + i * 54} width="102" height="46" rx="10" fill="#ffffff" fillOpacity="0.05" stroke="#f472b6" strokeOpacity="0.3" />
        ))}
        <rect x="544" y="218" width="102" height="16" rx="8" fill="#f472b6" fillOpacity="0.2" />
        <text x="595" y="272" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fbcfe8">📱 React Native 앱</text>
        <text x="595" y="290" textAnchor="middle" fontSize="10.5" fill="#9ca3af">Expo · iOS / Android</text>
      </g>

      {/* shared core */}
      <g>
        <rect x="288" y="44" width="200" height="216" rx="18" fill="#a78bfa" fillOpacity="0.05" stroke="#a78bfa" strokeOpacity="0.4" strokeDasharray="5 5" />
        <text x="388" y="68" textAnchor="middle" fontSize="11" fontWeight="800" letterSpacing="1" fill="#c4b5fd">공유 코어 — 그대로 재사용</text>
        {[
          { t: "React 문법 · 컴포넌트 구조", c: "#38bdf8" },
          { t: "lib/repo.ts 데이터 로직", c: "#a78bfa" },
          { t: "JSON 스키마 · TS 타입", c: "#fbbf24" },
          { t: "Django API · Admin", c: "#34d399" },
        ].map((b, i) => (
          <g key={b.t}>
            <rect x="304" y={82 + i * 42} width="168" height="32" rx="10" fill={BG} stroke={b.c} strokeOpacity="0.8" />
            <text x="388" y={102 + i * 42} textAnchor="middle" fontSize="11" fontWeight="700" fill="#f3f4f6">{b.t}</text>
          </g>
        ))}
      </g>

      {/* connectors */}
      {[
        { d: "M246 135 H288", c: "#a78bfa" },
        { d: "M488 135 H530", c: "#f472b6" },
      ].map((l) => (
        <g key={l.d}>
          <path d={l.d} stroke={l.c} strokeWidth="2.4" strokeDasharray="5 5">
            <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1s" repeatCount="indefinite" />
          </path>
        </g>
      ))}
      <text x="388" y="290" textAnchor="middle" fontSize="11" fill="#9ca3af">바뀌는 것은 겉모습(태그·스타일·라우팅)뿐</text>
      <text x="388" y="20" textAnchor="middle" fontSize="11" fill="#6b7280">웹으로 검증한 서비스 → 같은 코어로 앱 출시</text>
    </svg>
  )
}
