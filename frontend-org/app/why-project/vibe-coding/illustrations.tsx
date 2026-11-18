const font = { fontFamily: "inherit" }
const BG = "#0b0b12"
const mono = { fontFamily: "ui-monospace, monospace" }

/** SVG 텍스트 안에서 ==강조== 를 형광 tspan 으로 */
function SvgH({ text, color = "#f0abfc" }: { text: string; color?: string }) {
  return (
    <>
      {text.split(/==(.+?)==/g).map((part, i) =>
        i % 2 ? <tspan key={i} fill={color} fontWeight="800">{part}</tspan> : part,
      )}
    </>
  )
}

/** 01 — 계단을 다 올라야 만드는 전통 방식 vs 첫날부터 만들고 키우는 바이브 코딩 */
export function LearningPathSvg() {
  const stairs = ["문법", "기초", "응용", "프로젝트"]
  const wins = [
    { x: 392, y: 152, w: 72, h: 50, c: "#a78bfa", v: "v1", t: "1일차 · 화면" },
    { x: 492, y: 126, w: 88, h: 76, c: "#38bdf8", v: "v2", t: "테스트 · 수정" },
    { x: 608, y: 94, w: 100, h: 108, c: "#34d399", v: "v3", t: "MVP · 배포" },
  ]
  return (
    <svg viewBox="0 0 720 280" className="h-auto w-full" style={font} role="img" aria-label="전통 코딩 교육은 문법, 기초, 응용 계단을 다 오른 뒤에야 프로젝트를 만들지만, 바이브 코딩은 첫날부터 작동하는 화면을 만들고 버전을 키워 간다">
      <defs>
        <marker id="lp-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="#c4b5fd" />
        </marker>
      </defs>
      {/* 전통 */}
      <text x="176" y="28" textAnchor="middle" fontSize="13" fontWeight="800" fill="#9ca3af">전통 방식 — 계단을 다 올라야 만든다</text>
      {stairs.map((s, i) => {
        const x = 32 + i * 72
        const y = 190 - i * 38
        const last = i === stairs.length - 1
        return (
          <g key={s}>
            <rect x={x} y={y} width="72" height={228 - y} fill="#6b7280" fillOpacity={0.12 + i * 0.05} stroke="#6b7280" strokeOpacity="0.5" />
            <text x={x + 36} y={y + 22} textAnchor="middle" fontSize="12" fontWeight="700" fill={last ? "#e5e7eb" : "#9ca3af"}>{s}</text>
          </g>
        )
      })}
      <circle r="6" fill="#9ca3af">
        <animateMotion dur="7s" repeatCount="indefinite" path="M68 178 H104 V140 H176 V102 H248 V64 H284" />
      </circle>
      <path d="M306 76 V46 l22 8 -22 8" fill="#6b7280" fillOpacity="0.4" stroke="#9ca3af" strokeWidth="1.5" />
      <text x="176" y="268" textAnchor="middle" fontSize="11" fill="#6b7280">몇 달 뒤에야 첫 결과물 · 연습용 코드</text>

      {/* vs */}
      <path d="M360 20 V250" stroke="#ffffff" strokeOpacity="0.1" strokeDasharray="4 6" />
      <circle cx="360" cy="135" r="17" fill={BG} stroke="#ffffff" strokeOpacity="0.2" />
      <text x="360" y="139" textAnchor="middle" fontSize="11" fontWeight="800" fill="#9ca3af">VS</text>

      {/* 바이브 */}
      <text x="548" y="28" textAnchor="middle" fontSize="13" fontWeight="800" fill="#ddd6fe">
        <SvgH text="바이브 코딩 — ==첫날부터 만들고== 키운다" />
      </text>
      {wins.map((w, i) => (
        <g key={w.v}>
          <rect x={w.x} y={w.y} width={w.w} height={w.h} rx="8" fill={BG} stroke={w.c} strokeWidth="1.8" />
          <rect x={w.x} y={w.y} width={w.w} height="12" rx="6" fill={w.c} fillOpacity="0.25" />
          {Array.from({ length: i + 1 }).map((_, r) => (
            <g key={r}>
              <rect x={w.x + 8} y={w.y + 20 + r * 26} width={w.w - 16} height="18" rx="5" fill={w.c} fillOpacity="0.14" />
              <rect x={w.x + 14} y={w.y + 26 + r * 26} width={(w.w - 28) * (0.8 - r * 0.15)} height="5" rx="2.5" fill={w.c} fillOpacity="0.7" />
            </g>
          ))}
          <text x={w.x + w.w / 2} y="222" textAnchor="middle" fontSize="12" fontWeight="800" fill={w.c}>{w.v}</text>
          <text x={w.x + w.w / 2} y="238" textAnchor="middle" fontSize="10.5" fill="#d1d5db">{w.t}</text>
          {i < 2 && <path d={`M${w.x + w.w + 4} 178 H${wins[i + 1].x - 6}`} stroke="#c4b5fd" strokeWidth="2" markerEnd="url(#lp-arrow)" />}
        </g>
      ))}
      <text x="548" y="268" textAnchor="middle" fontSize="11" fill="#9ca3af">매번 ‘작동하는 것’이 남는다</text>
    </svg>
  )
}

type Role = { title: string; tag?: string; color: string }

function RoleIcon({ i, c }: { i: number; c: string }) {
  const s = { fill: "none", stroke: c, strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
  if (i === 0)
    return (
      <g {...s}>
        <rect x="-17" y="-18" width="28" height="36" rx="4" />
        <path d="M-11 -9 H5 M-11 -1 H1 M-11 7 H-3" strokeOpacity="0.6" />
        <path d="M4 14 L20 -4 L24 0 L8 18 L3 19 Z" fill={c} fillOpacity="0.35" />
      </g>
    )
  if (i === 1)
    return (
      <g {...s}>
        <path d="M-19 -17 H19 V9 H-3 L-12 18 V9 H-19 Z" fill={c} fillOpacity="0.12" />
        <path d="M-8 -9 L-13 -4 L-8 1 M8 -9 L13 -4 L8 1 M2 -11 L-2 3" />
      </g>
    )
  if (i === 2)
    return (
      <g {...s}>
        <circle cx="-4" cy="-4" r="13" fill={c} fillOpacity="0.1" />
        <path d="M6 6 L19 19" strokeWidth="3.5" />
        <ellipse cx="-4" cy="-3" rx="4" ry="5.5" fill={c} stroke="none" />
        <path d="M-9 -7 L-12 -9 M1 -7 L4 -9 M-9 0 L-12 2 M1 0 L4 2" strokeWidth="1.5" />
      </g>
    )
  return (
    <g {...s}>
      <path d="M13 -8 A15 15 0 1 0 15 5" />
      <path d="M15 -17 V-7 H5" />
      <circle cx="0" cy="0" r="3.5" fill={c} stroke="none" />
    </g>
  )
}

/** 04 — 네 가지 역할이 한 프로젝트를 돌며 순환 */
export function RolesCycleSvg({ roles }: { roles: Role[] }) {
  const pos = [
    { x: 150, y: 80 },
    { x: 570, y: 80 },
    { x: 570, y: 220 },
    { x: 150, y: 220 },
  ]
  const links = [
    { d: "M254 80 H462", lx: 358, ly: 70, t: "말로 설명", a: "middle" as const },
    { d: "M570 126 V172", lx: 584, ly: 153, t: "직접 써 보기", a: "start" as const },
    { d: "M466 220 H258", lx: 362, ly: 240, t: "원인 찾고 돌아보기", a: "middle" as const },
    { d: "M150 174 V128", lx: 136, ly: 153, t: "다시 기획", a: "end" as const },
  ]
  return (
    <svg viewBox="0 0 720 300" className="h-auto w-full" style={font} role="img" aria-label="기획자, 실행자, 디버거, 성찰자 네 가지 역할이 하나의 프로젝트를 중심으로 순환하는 그림">
      <defs>
        <marker id="rc-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="#c4b5fd" />
        </marker>
        <filter id="rc-glow"><feGaussianBlur stdDeviation="12" /></filter>
      </defs>
      {links.map((l) => (
        <g key={l.t}>
          <path d={l.d} stroke="#c4b5fd" strokeWidth="2" strokeDasharray="6 6" markerEnd="url(#rc-arrow)">
            <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1.4s" repeatCount="indefinite" />
          </path>
          <text x={l.lx} y={l.ly} textAnchor={l.a} fontSize="11" fill="#9ca3af">{l.t}</text>
        </g>
      ))}
      <circle cx="360" cy="150" r="42" fill="#8b5cf6" opacity="0.35" filter="url(#rc-glow)" />
      <circle cx="360" cy="150" r="40" fill={BG} stroke="#c4b5fd" strokeWidth="1.8" />
      <text x="360" y="146" textAnchor="middle" fontSize="12" fontWeight="800" fill="#f5f3ff">하나의</text>
      <text x="360" y="163" textAnchor="middle" fontSize="12" fontWeight="800" fill="#f5f3ff">프로젝트</text>
      {roles.slice(0, 4).map((r, i) => {
        const p = pos[i]
        return (
          <g key={r.title}>
            <rect x={p.x - 100} y={p.y - 42} width="200" height="84" rx="18" fill={BG} stroke={r.color} strokeWidth="1.8" />
            <circle cx={p.x - 60} cy={p.y} r="30" fill={r.color} fillOpacity="0.08" />
            <g transform={`translate(${p.x - 60} ${p.y})`}><RoleIcon i={i} c={r.color} /></g>
            <text x={p.x - 20} y={p.y - 4} fontSize="16" fontWeight="800" fill={r.color}>{r.title}</text>
            <text x={p.x - 20} y={p.y + 16} fontSize="10.5" fill="#9ca3af">{r.tag}</text>
          </g>
        )
      })}
    </svg>
  )
}

/** 06 — 말 한 줄이 화면이 되는 AI 스튜디오 */
export function PromptToScreenSvg() {
  const appear = (at: number) => (
    <animate attributeName="opacity" values="0;0;1;1;0" keyTimes={`0;${at};${at + 0.06};0.94;1`} dur="7s" repeatCount="indefinite" />
  )
  return (
    <svg viewBox="0 0 720 270" className="h-auto w-full" style={font} role="img" aria-label="AI 스튜디오에 말로 요청하면 약 30초 만에 필터와 카드가 있는 화면이 만들어지고, 마음에 들지 않으면 다시 말해 고치는 과정">
      <defs>
        <marker id="ps-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="#c4b5fd" />
        </marker>
        <linearGradient id="ps-beam" x1="0" x2="1">
          <stop offset="0" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#38bdf8" />
        </linearGradient>
      </defs>

      {/* chat */}
      <rect x="16" y="20" width="276" height="196" rx="16" fill={BG} stroke="#a78bfa" strokeWidth="1.6" />
      <text x="34" y="46" fontSize="11" fontWeight="800" letterSpacing="1" fill="#c4b5fd">AI 스튜디오</text>
      <path d="M52 62 H276 a0 0 0 0 1 0 0 V118 a12 12 0 0 1 -12 12 H64 a12 12 0 0 1 -12 -12 Z" fill="#a78bfa" fillOpacity="0.14" stroke="#a78bfa" strokeOpacity="0.5" />
      <text x="66" y="88" fontSize="12.5" fill="#f3f4f6">“수업 목록을 <tspan fill="#f0abfc" fontWeight="800">카드형</tspan>으로,</text>
      <text x="66" y="110" fontSize="12.5" fill="#f3f4f6"><tspan fill="#f0abfc" fontWeight="800">학년 필터</tspan>도 넣어 줘”</text>
      <rect x="32" y="146" width="84" height="30" rx="15" fill="#ffffff" fillOpacity="0.06" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={58 + i * 16} cy="161" r="4" fill="#c4b5fd">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="1.2s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <text x="126" y="165" fontSize="11" fill="#9ca3af">AI가 코드 작성 중…</text>
      <rect x="32" y="188" width="244" height="16" rx="8" fill="#ffffff" fillOpacity="0.04" stroke="#ffffff" strokeOpacity="0.1" />
      <text x="42" y="200" fontSize="9.5" fill="#6b7280">“버튼 더 크게, 색은 보라로” — 다시 말하기</text>

      {/* beam */}
      <path d="M298 118 H398" stroke="url(#ps-beam)" strokeWidth="3" strokeDasharray="7 7" markerEnd="url(#ps-arrow)">
        <animate attributeName="stroke-dashoffset" from="28" to="0" dur="1s" repeatCount="indefinite" />
      </path>
      <rect x="312" y="80" width="72" height="24" rx="12" fill={BG} stroke="url(#ps-beam)" />
      <text x="348" y="96" textAnchor="middle" fontSize="11" fontWeight="800" fill="#e9d5ff">약 30초</text>
      {[{ x: 322, y: 140 }, { x: 356, y: 152 }, { x: 380, y: 136 }].map((p, i) => (
        <path key={i} d={`M${p.x} ${p.y - 6} l2 4 4 2 -4 2 -2 4 -2 -4 -4 -2 4 -2 z`} fill="#f0abfc">
          <animate attributeName="opacity" values="0;1;0" dur="1.6s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
        </path>
      ))}

      {/* generated screen */}
      <rect x="408" y="20" width="296" height="196" rx="14" fill={BG} stroke="#38bdf8" strokeWidth="1.6" />
      <rect x="408" y="20" width="296" height="22" rx="11" fill="#38bdf8" fillOpacity="0.14" />
      {[0, 1, 2].map((i) => <circle key={i} cx={422 + i * 11} cy="31" r="3.2" fill="#38bdf8" opacity="0.8" />)}
      <text x="556" y="35" textAnchor="middle" fontSize="9.5" fill="#7dd3fc">preview — 바로 실행</text>
      <g opacity="0">
        {appear(0.12)}
        {["전체", "중1~2", "중3~고1", "고2~3"].map((g, i) => (
          <g key={g}>
            <rect x={424 + i * 66} y="54" width="58" height="20" rx="10" fill={i === 0 ? "#a78bfa" : "#ffffff"} fillOpacity={i === 0 ? 0.9 : 0.07} />
            <text x={453 + i * 66} y="68" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={i === 0 ? "#0b0b12" : "#d1d5db"}>{g}</text>
          </g>
        ))}
      </g>
      {[0, 1, 2].map((i) => (
        <g key={i} opacity="0">
          {appear(0.26 + i * 0.14)}
          <rect x={424 + i * 90} y="86" width="82" height="116" rx="10" fill="#ffffff" fillOpacity="0.05" stroke="#ffffff" strokeOpacity="0.12" />
          <rect x={432 + i * 90} y="94" width="66" height="44" rx="6" fill={["#a78bfa", "#38bdf8", "#f472b6"][i]} fillOpacity="0.3" />
          <rect x={432 + i * 90} y="148" width="54" height="7" rx="3.5" fill="#e5e7eb" fillOpacity="0.7" />
          <rect x={432 + i * 90} y="162" width="38" height="5" rx="2.5" fill="#6b7280" />
          <rect x={432 + i * 90} y="178" width="66" height="16" rx="8" fill="#a78bfa" fillOpacity="0.8" />
        </g>
      ))}

      {/* loop back */}
      <path d="M556 222 C556 262, 154 262, 154 224" fill="none" stroke="#c4b5fd" strokeWidth="1.8" strokeDasharray="5 6" markerEnd="url(#ps-arrow)" />
      <rect x="262" y="240" width="196" height="22" rx="11" fill={BG} stroke="#c4b5fd" strokeOpacity="0.5" />
      <text x="360" y="255" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ddd6fe">보고 → 다시 말하고 → 다시 보고</text>
    </svg>
  )
}

/** 08 — 모델 하나에서 관리자 화면 · API · DB 가 한꺼번에 */
export function OneModelSvg() {
  const outs = [
    { y: 16, c: "#34d399", title: "관리자 페이지", sub: "admin.py 등록만으로 자동 생성", who: "운영자 · 비개발자" },
    { y: 100, c: "#a78bfa", title: "REST API", sub: "프론트 JSON과 같은 모양으로 응답", who: "Next.js 웹 · 앱" },
    { y: 184, c: "#38bdf8", title: "DB 테이블", sub: "migrate 한 번으로 생성", who: "PostgreSQL" },
  ]
  return (
    <svg viewBox="0 0 720 270" className="h-auto w-full" style={font} role="img" aria-label="Django 모델 하나를 정의하면 관리자 페이지, REST API, DB 테이블 세 가지가 함께 만들어진다">
      {/* model */}
      <rect x="16" y="78" width="196" height="114" rx="16" fill="#fbbf24" fillOpacity="0.07" stroke="#fbbf24" strokeWidth="1.8" />
      <text x="34" y="104" fontSize="12" fontWeight="800" fill="#fde68a">models.py · 6줄</text>
      <text x="34" y="130" fontSize="11.5" fill="#f3f4f6" style={mono}>class Course:</text>
      <text x="34" y="150" fontSize="11" fill="#d1d5db" style={mono}>  title · grade</text>
      <text x="34" y="168" fontSize="11" fill="#d1d5db" style={mono}>  hours · is_open</text>
      <text x="114" y="214" textAnchor="middle" fontSize="11" fill="#9ca3af">모델 하나만 정의하면</text>

      {outs.map((o, i) => {
        const cy = o.y + 35
        return (
          <g key={o.title}>
            <path d={`M212 135 C256 135, 250 ${cy}, 292 ${cy}`} fill="none" stroke={o.c} strokeWidth="2" strokeDasharray="6 6">
              <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1.2s" repeatCount="indefinite" />
            </path>
            <rect x="296" y={o.y} width="408" height="70" rx="16" fill={BG} stroke={o.c} strokeOpacity="0.7" strokeWidth="1.6" />
            {/* pictogram */}
            <g transform={`translate(312 ${o.y + 13})`}>
              <rect width="60" height="44" rx="8" fill={o.c} fillOpacity="0.1" />
              {i === 0 && (
                <g>
                  <rect x="8" y="8" width="44" height="7" rx="2" fill={o.c} fillOpacity="0.8" />
                  {[0, 1, 2].map((r) => (
                    <g key={r}>
                      <rect x="8" y={19 + r * 7} width="30" height="4" rx="2" fill="#e5e7eb" fillOpacity="0.5" />
                      <circle cx="48" cy={21 + r * 7} r="2.4" fill={r === 2 ? "#f87171" : "#4ade80"} />
                    </g>
                  ))}
                </g>
              )}
              {i === 1 && <text x="30" y="29" textAnchor="middle" fontSize="18" fontWeight="800" fill={o.c} style={mono}>{"{ }"}</text>}
              {i === 2 && (
                <g fill="none" stroke={o.c} strokeWidth="2">
                  <ellipse cx="30" cy="12" rx="16" ry="5" fill={o.c} fillOpacity="0.25" />
                  <path d="M14 12 V32 A16 5 0 0 0 46 32 V12" />
                  <path d="M14 22 A16 5 0 0 0 46 22" />
                </g>
              )}
            </g>
            <text x="388" y={o.y + 31} fontSize="15" fontWeight="800" fill="#f9fafb">{o.title}</text>
            <text x="388" y={o.y + 50} fontSize="10.5" fill="#9ca3af">{o.sub}</text>
            <rect x="572" y={o.y + 22} width="120" height="26" rx="13" fill={o.c} fillOpacity="0.14" />
            <text x="632" y={o.y + 39} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={o.c}>{o.who}</text>
          </g>
        )
      })}
    </svg>
  )
}

/** 09 — 데모는 빙산의 일각, 서비스는 수면 아래 90% */
export function IcebergSvg() {
  const left = [
    { t: "예외 처리", q: "데이터가 0개면?" },
    { t: "보안 · 권한", q: "키가 노출되지 않았나?" },
    { t: "에러 기록", q: "어디에 남고, 누가 보나?" },
  ]
  const right = [
    { t: "성능 · 모바일", q: "1,000개여도 빠른가?" },
    { t: "사용자 테스트", q: "낯선 5명이 써 봤나?" },
    { t: "백업 · 운영", q: "데이터를 되살릴 수 있나?" },
  ]
  const wave = `M-60 132 ${Array.from({ length: 14 }, () => "q15 -6 30 0 t30 0").join(" ")}`
  return (
    <svg viewBox="0 0 720 410" className="h-auto w-full" style={font} role="img" aria-label="빙산 그림. 수면 위에 보이는 10퍼센트는 돌아가는 데모이고, 수면 아래 90퍼센트는 예외 처리, 보안, 에러 기록, 성능, 사용자 테스트, 백업과 책임지는 자세다">
      <defs>
        <linearGradient id="ib-water" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#38bdf8" stopOpacity="0.2" />
          <stop offset="1" stopColor="#38bdf8" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="ib-berg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#7dd3fc" stopOpacity="0.32" />
          <stop offset="1" stopColor="#34d399" stopOpacity="0.16" />
        </linearGradient>
        <clipPath id="ib-clip"><rect x="0" y="0" width="720" height="410" rx="18" /></clipPath>
      </defs>
      <g clipPath="url(#ib-clip)">
        <rect x="0" y="132" width="720" height="278" fill="url(#ib-water)" />
        <path d={wave} fill="none" stroke="#7dd3fc" strokeOpacity="0.7" strokeWidth="2">
          <animateTransform attributeName="transform" type="translate" from="0 0" to="60 0" dur="3s" repeatCount="indefinite" />
        </path>
      </g>

      {/* tip */}
      <path d="M360 30 L394 76 L384 92 L424 132 H296 L332 98 L322 82 Z" fill="#e0f2fe" fillOpacity="0.92" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M360 30 L372 84 L352 132 H296 L332 98 L322 82 Z" fill="#bae6fd" fillOpacity="0.6" />
      <path d="M426 84 H470" stroke="#c4b5fd" strokeDasharray="3 4" />
      <text x="478" y="80" fontSize="14" fontWeight="800" fill="#ddd6fe">보이는 10% — 데모</text>
      <text x="478" y="100" fontSize="11" fill="#9ca3af">“일단 돌아가요” · 질문 10회</text>
      <text x="242" y="80" textAnchor="end" fontSize="11" fill="#9ca3af">빠른 건 여기까지</text>
      <path d="M250 76 H316" stroke="#9ca3af" strokeOpacity="0.5" strokeDasharray="3 4" />

      {/* under water */}
      <path d="M262 132 H458 L504 192 L486 250 L522 304 L452 362 L372 388 L288 358 L224 304 L250 238 L210 186 Z" fill="url(#ib-berg)" stroke="#7dd3fc" strokeOpacity="0.7" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M262 132 L330 200 L300 290 L372 388 L288 358 L224 304 L250 238 L210 186 Z" fill="#0ea5e9" fillOpacity="0.08" />
      <text x="362" y="206" textAnchor="middle" fontSize="17" fontWeight="800" fill="#ffffff">보이지 않는 90%</text>
      <text x="362" y="228" textAnchor="middle" fontSize="12" fill="#bae6fd">서비스 · 질문 90회 이상</text>
      <rect x="296" y="268" width="132" height="38" rx="19" fill="#34d399" />
      <text x="362" y="292" textAnchor="middle" fontSize="14" fontWeight="800" fill="#052e1a">책임지는 자세</text>
      <text x="362" y="336" textAnchor="middle" fontSize="11" fill="#a7f3d0">“문제가 생기면 제가 고칩니다”</text>

      {[...left.map((c, i) => ({ ...c, x: 20, lx: 190, tx: [226, 246, 232][i], y: 158 + i * 66 })),
        ...right.map((c, i) => ({ ...c, x: 530, lx: 530, tx: [488, 494, 506][i], y: 158 + i * 66 }))].map((c) => (
        <g key={c.t}>
          <path d={`M${c.lx} ${c.y + 24} H${c.tx}`} stroke="#7dd3fc" strokeOpacity="0.5" strokeDasharray="3 4" />
          <circle cx={c.tx} cy={c.y + 24} r="3" fill="#7dd3fc" />
          <rect x={c.x} y={c.y} width="170" height="48" rx="12" fill={BG} fillOpacity="0.85" stroke="#7dd3fc" strokeOpacity="0.45" />
          <text x={c.x + 14} y={c.y + 20} fontSize="12.5" fontWeight="800" fill="#e0f2fe">{c.t}</text>
          <text x={c.x + 14} y={c.y + 37} fontSize="10.5" fill="#9ca3af">Q. {c.q}</text>
        </g>
      ))}
    </svg>
  )
}

/** 12 — 대표 프로젝트 카드 일러스트 */
export function ProjectArt({ kind, color }: { kind: string; color: string }) {
  const frame = (children: React.ReactNode, label: string) => (
    <svg viewBox="0 0 240 110" className="h-auto w-full" style={font} role="img" aria-label={label}>
      <rect width="240" height="110" rx="14" fill={color} fillOpacity="0.07" />
      {children}
    </svg>
  )
  const spark = (x: number, y: number, d: number) => (
    <path d={`M${x} ${y - 7} l2.4 4.6 4.6 2.4 -4.6 2.4 -2.4 4.6 -2.4 -4.6 -4.6 -2.4 4.6 -2.4 z`} fill={color}>
      <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" begin={`${d}s`} repeatCount="indefinite" />
    </path>
  )
  if (kind === "book")
    return frame(
      <>
        <path d="M120 30 C100 20, 70 20, 52 28 V88 C70 80, 100 80, 120 90 Z" fill={BG} stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M120 30 C140 20, 170 20, 188 28 V88 C170 80, 140 80, 120 90 Z" fill={BG} stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
        {[0, 1, 2, 3].map((i) => <path key={i} d={`M64 ${40 + i * 10} C78 ${36 + i * 10}, 96 ${36 + i * 10}, 110 ${41 + i * 10}`} stroke="#9ca3af" strokeWidth="2" fill="none" strokeLinecap="round" />)}
        <circle cx="166" cy="42" r="7" fill="#fbbf24" />
        <path d="M130 76 L148 52 L160 66 L168 58 L180 74 Z" fill={color} fillOpacity="0.6" />
        {spark(206, 26, 0)}
        {spark(34, 50, 0.6)}
        {spark(212, 78, 1.2)}
      </>,
      "AI가 글과 그림을 만든 동화책",
    )
  if (kind === "tutor")
    return frame(
      <>
        <rect x="26" y="18" width="104" height="74" rx="10" fill={BG} stroke={color} strokeWidth="1.8" />
        <circle cx="78" cy="46" r="13" fill={color} fillOpacity="0.35" />
        <path d="M54 84 C56 66, 100 66, 102 84" fill={color} fillOpacity="0.35" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={36 + i * 6} y="24" width="3" height="8" rx="1.5" fill={color}>
            <animate attributeName="height" values="4;10;4" dur="0.9s" begin={`${i * 0.12}s`} repeatCount="indefinite" />
          </rect>
        ))}
        <path d="M146 24 H206 a8 8 0 0 1 8 8 V44 a8 8 0 0 1 -8 8 H160 L150 60 V52 H146 a0 0 0 0 1 0 0 Z" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.4" />
        <text x="180" y="43" textAnchor="middle" fontSize="11" fontWeight="700" fill="#f3f4f6">How are you?</text>
        <path d="M150 66 H206 a8 8 0 0 1 8 8 V86 a8 8 0 0 1 -8 8 H150 a8 8 0 0 1 -8 -8 V74 a8 8 0 0 1 8 -8 Z" fill="#ffffff" fillOpacity="0.07" />
        <text x="178" y="84" textAnchor="middle" fontSize="11" fill="#d1d5db">I’m great!</text>
      </>,
      "화상 화면과 영어 대화 말풍선",
    )
  return frame(
    <>
      <rect x="30" y="16" width="56" height="80" rx="6" fill={BG} stroke={color} strokeWidth="1.8" />
      <circle cx="74" cy="58" r="4" fill="#fbbf24" />
      <rect x="44" y="28" width="28" height="18" rx="3" fill={color} fillOpacity="0.25" />
      {/* face scan */}
      <g fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
        <path d="M116 30 V22 H124 M156 22 H164 V30 M164 62 V70 H156 M124 70 H116 V62" />
      </g>
      <circle cx="140" cy="46" r="17" fill="#fbbf24" fillOpacity="0.9" />
      <circle cx="134" cy="42" r="2.2" fill="#0b0b12" />
      <circle cx="146" cy="42" r="2.2" fill="#0b0b12" />
      <path d="M132 50 Q140 58 148 50" stroke="#0b0b12" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M114 46 H166" stroke={color} strokeWidth="1.5" strokeOpacity="0.9">
        <animate attributeName="d" values="M114 26 H166;M114 66 H166;M114 26 H166" dur="2.4s" repeatCount="indefinite" />
      </path>
      <text x="140" y="90" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={color}>기쁨 92%</text>
      <rect x="182" y="34" width="38" height="28" rx="6" fill="#34d399" fillOpacity="0.18" stroke="#34d399" />
      <text x="201" y="53" textAnchor="middle" fontSize="12" fontWeight="800" fill="#6ee7b7">OPEN</text>
    </>,
    "표정을 인식하면 문이 열리는 방탈출 게임",
  )
}
