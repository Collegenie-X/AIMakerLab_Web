/**
 * 홈 페이지 일러스트 — 통계 카드 그림, 특징 카드 그림, 세 교실 비교 장면, CTA 장면.
 * 캐릭터는 ‘왜 프로젝트인가’ 페이지와 같은 부품을 씁니다.
 */
import { Kid, Robo } from "../../why-project/vibe-coding/scenes"

const font = { fontFamily: "inherit" }
const BG = "#0b0b12"

function Spark({ x, y, color, delay = 0, s = 1 }: { x: number; y: number; color: string; delay?: number; s?: number }) {
  return (
    <path transform={`translate(${x} ${y}) scale(${s})`} d="M0 -7 l2.2 4.8 4.8 2.2 -4.8 2.2 -2.2 4.8 -2.2 -4.8 -4.8 -2.2 4.8 -2.2 z" fill={color}>
      <animate attributeName="opacity" values="0.15;1;0.15" dur="1.8s" begin={`${delay}s`} repeatCount="indefinite" />
    </path>
  )
}

/* ------------------------------------------------------------------ */
/* 통계 카드 그림 (64×64)                                              */
/* ------------------------------------------------------------------ */
export function StatArt({ kind, color }: { kind: "ladder" | "calendar" | "tracks" | "robot"; color: string }) {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill={color} fillOpacity="0.12" />
      {kind === "ladder" && (
        <g>
          {[0, 1, 2, 3].map((k) => (
            <rect key={k} x={10 + k * 11} y={44 - k * 9} width="11" height={8 + k * 9} rx="2" fill={color} fillOpacity={0.4 + k * 0.18} />
          ))}
          <path d="M52 10 V26" stroke="#f9fafb" strokeWidth="2" strokeLinecap="round" />
          <path d="M52 11 H62 L59 15 L62 19 H52 Z" fill="#fbbf24" />
          <circle cx="16" cy="38" r="3.5" fill="#fcd9b6">
            <animate attributeName="cy" values="38;29;20;11;38" keyTimes="0;0.25;0.5;0.75;1" dur="4s" repeatCount="indefinite" />
            <animate attributeName="cx" values="16;27;38;49;16" keyTimes="0;0.25;0.5;0.75;1" dur="4s" repeatCount="indefinite" />
          </circle>
        </g>
      )}
      {kind === "calendar" && (
        <g>
          <rect x="12" y="14" width="40" height="38" rx="6" fill={BG} stroke={color} strokeWidth="2" />
          <rect x="12" y="14" width="40" height="10" rx="5" fill={color} />
          <path d="M22 10 V18 M42 10 V18" stroke="#f9fafb" strokeWidth="2.5" strokeLinecap="round" />
          {Array.from({ length: 14 }).map((_, k) => (
            <rect key={k} x={16 + (k % 7) * 4.8} y={30 + Math.floor(k / 7) * 9} width="3.4" height="6" rx="1" fill={color}>
              <animate attributeName="fill-opacity" values="0.15;1" dur="0.2s" begin={`${k * 0.15}s`} fill="freeze" />
            </rect>
          ))}
          <circle cx="48" cy="48" r="8" fill="#10b981" />
          <path d="M44.5 48 l2.5 2.5 4.5 -5" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      )}
      {kind === "tracks" && (
        <g>
          <path d="M8 24 C24 24, 26 40, 40 40 H56" stroke="#8b5cf6" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M8 40 C24 40, 26 24, 40 24 H56" stroke="#06b6d4" strokeWidth="5" fill="none" strokeLinecap="round" />
          <circle cx="32" cy="32" r="8" fill={color} />
          <path d="M33 26 L28 33 H32 L31 38 L36 31 H32 Z" fill="#0b0b12" />
          <circle r="2.5" fill="#ffffff"><animateMotion dur="2s" repeatCount="indefinite" path="M8 24 C24 24, 26 40, 40 40 H56" /></circle>
          <circle r="2.5" fill="#ffffff"><animateMotion dur="2s" begin="1s" repeatCount="indefinite" path="M8 40 C24 40, 26 24, 40 24 H56" /></circle>
        </g>
      )}
      {kind === "robot" && (
        <g transform="translate(32 54) scale(0.58)">
          <Robo x={0} y={0} color={color} arm="cheer" />
        </g>
      )}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* 특징 카드 그림 (240×120)                                            */
/* ------------------------------------------------------------------ */
export function FeatureArt({ icon }: { icon: string }) {
  const palette: Record<string, string> = { Sparkles: "#a78bfa", Code: "#38bdf8", Cpu: "#22d3ee", Lightbulb: "#fbbf24", Users: "#34d399", Rocket: "#f472b6" }
  const c = palette[icon] ?? "#a78bfa"
  const labels: Record<string, string> = {
    Sparkles: "말풍선이 화면이 되는 그림", Code: "기획부터 배포까지 진행되는 화면", Cpu: "AI와 연결된 아두이노 보드",
    Lightbulb: "전구 안에서 생각이 정리되는 그림", Users: "코치와 소규모 학생 그룹", Rocket: "미래 역량 나침반과 로켓",
  }
  return (
    <svg viewBox="0 0 240 120" className="h-auto w-full" style={font} role="img" aria-label={labels[icon] ?? ""}>
      <defs>
        <linearGradient id={`fa-${icon}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor={c} stopOpacity="0.22" />
          <stop offset="1" stopColor={c} stopOpacity="0.04" />
        </linearGradient>
      </defs>
      <rect width="240" height="120" rx="16" fill={`url(#fa-${icon})`} />
      {icon === "Sparkles" && (
        <g>
          <path d="M18 26 a10 10 0 0 1 10 -10 H96 a10 10 0 0 1 10 10 V50 a10 10 0 0 1 -10 10 H52 L40 72 L42 60 H28 a10 10 0 0 1 -10 -10 Z" fill={c} fillOpacity="0.25" stroke={c} strokeWidth="1.5" />
          <text x="62" y="35" textAnchor="middle" fontSize="10" fontWeight="800" fill="#ffffff">“버튼 크게,</text>
          <text x="62" y="50" textAnchor="middle" fontSize="10" fontWeight="800" fill="#ffffff">보라색으로”</text>
          <path d="M112 50 H136" stroke={c} strokeWidth="2" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="16" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>
          <rect x="142" y="16" width="82" height="88" rx="10" fill={BG} stroke={c} strokeWidth="1.6" />
          <rect x="142" y="16" width="82" height="13" rx="6.5" fill={c} fillOpacity="0.3" />
          <rect x="152" y="38" width="62" height="20" rx="5" fill="#ffffff" fillOpacity="0.07" />
          <rect x="152" y="64" width="40" height="5" rx="2.5" fill="#6b7280" />
          <rect x="157" y="78" width="52" height="18" rx="9" fill={c}>
            <animate attributeName="width" values="40;56;40" dur="2.4s" repeatCount="indefinite" />
          </rect>
          <Spark x={226} y={14} color="#fde68a" />
          <Spark x={124} y={88} color={c} delay={0.6} s={0.8} />
        </g>
      )}
      {icon === "Code" && (
        <g>
          {["기획", "프롬프트", "개발", "배포"].map((t, k) => (
            <g key={t}>
              <rect x={14 + k * 56} y="18" width="48" height="22" rx="11" fill={k === 3 ? c : "#ffffff"} fillOpacity={k === 3 ? 1 : 0.08} stroke={c} strokeOpacity="0.6" />
              <text x={38 + k * 56} y="33" textAnchor="middle" fontSize="9.5" fontWeight="800" fill={k === 3 ? "#0b0b12" : "#e5e7eb"}>{t}</text>
              {k < 3 && <path d={`M${62 + k * 56} 29 h6`} stroke={c} strokeWidth="2" />}
            </g>
          ))}
          <rect x="14" y="52" width="212" height="56" rx="8" fill="#0c0c14" stroke="#ffffff" strokeOpacity="0.12" />
          {[["const", "app", "= create()"], ["deploy", "(", "'vercel')"], ["// ✓ 배포 완료", "", ""]].map((l, k) => (
            <text key={k} x="26" y={70 + k * 14} fontSize="9.5" style={{ fontFamily: "ui-monospace, monospace" }} fill="#e5e7eb">
              <tspan fill={k === 2 ? "#34d399" : "#c084fc"}>{l[0]}</tspan> <tspan fill="#7dd3fc">{l[1]}</tspan><tspan fill="#86efac">{l[2]}</tspan>
            </text>
          ))}
          <rect x="196" y="58" width="2" height="11" fill="#f9fafb"><animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" /></rect>
        </g>
      )}
      {icon === "Cpu" && (
        <g>
          <rect x="22" y="30" width="110" height="72" rx="8" fill="#064e3b" stroke={c} strokeWidth="1.8" />
          {Array.from({ length: 10 }).map((_, k) => <circle key={k} cx={32 + k * 10} cy="38" r="2" fill="#fbbf24" />)}
          <rect x="34" y="50" width="34" height="26" rx="3" fill="#0b0b12" stroke={c} />
          <text x="51" y="67" textAnchor="middle" fontSize="8" fontWeight="800" fill="#67e8f9">MCU</text>
          <circle cx="98" cy="64" r="10" fill="#e5e7eb" /><circle cx="98" cy="64" r="4" fill="#475569" />
          <circle cx="78" cy="88" r="5" fill="#f87171"><animate attributeName="opacity" values="1;0.2;1" dur="1.2s" repeatCount="indefinite" /></circle>
          <circle cx="94" cy="88" r="5" fill="#34d399" fillOpacity="0.5" />
          <path d="M132 66 C150 66, 150 46, 168 46" stroke={c} strokeWidth="2" fill="none" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="0" to="16" dur="0.8s" repeatCount="indefinite" />
          </path>
          <g transform="translate(196 104) scale(0.62)"><Robo x={0} y={0} color={c} /></g>
          <rect x="164" y="16" width="64" height="20" rx="10" fill={BG} stroke={c} strokeOpacity="0.7" />
          <text x="196" y="30" textAnchor="middle" fontSize="9" fontWeight="800" fill={c}>AI가 제어</text>
        </g>
      )}
      {icon === "Lightbulb" && (
        <g>
          <circle cx="120" cy="52" r="40" fill={c} opacity="0.18">
            <animate attributeName="r" values="34;44;34" dur="3s" repeatCount="indefinite" />
          </circle>
          <path d="M120 18 a28 28 0 0 1 16 51 V80 H104 V69 A28 28 0 0 1 120 18 Z" fill="#fef3c7" stroke={c} strokeWidth="2" />
          <rect x="104" y="84" width="32" height="7" rx="3" fill="#9ca3af" />
          <rect x="108" y="94" width="24" height="7" rx="3" fill="#6b7280" />
          {[0, 1, 2].map((k) => (
            <g key={k}>
              <rect x="106" y={34 + k * 11} width="28" height="7" rx="3.5" fill={["#a78bfa", "#38bdf8", "#34d399"][k]} />
            </g>
          ))}
          {[[44, 30, "누구를?"], [44, 74, "왜?"], [196, 30, "무엇을?"], [196, 74, "어떻게?"]].map(([x, y, t], k) => (
            <g key={t as string}>
              <rect x={(x as number) - 32} y={(y as number) - 12} width="64" height="22" rx="11" fill={BG} stroke={c} strokeOpacity="0.6" />
              <text x={x as number} y={(y as number) + 3} textAnchor="middle" fontSize="10" fontWeight="800" fill="#fde68a">{t}</text>
              <path d={`M${(x as number) + ((x as number) < 120 ? 32 : -32)} ${y} L${(x as number) < 120 ? 100 : 140} ${(y as number) < 52 ? 40 : 60}`} stroke={c} strokeOpacity="0.4" strokeDasharray="3 3" />
              <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" begin={`${k * 0.6}s`} repeatCount="indefinite" />
            </g>
          ))}
        </g>
      )}
      {icon === "Users" && (
        <g>
          <ellipse cx="120" cy="100" rx="96" ry="12" fill={c} fillOpacity="0.15" />
          <Kid x={52} y={104} s={0.82} color="#38bdf8" hair="#7c2d12" arm="down" />
          <Kid x={92} y={104} s={0.82} color="#a78bfa" hair="#f59e0b" arm="wave" />
          <Kid x={148} y={104} s={0.82} color="#f472b6" hair="#1e293b" arm="down" flip />
          <Kid x={188} y={104} s={0.82} color="#fbbf24" hair="#b45309" arm="down" flip />
          <g>
            <rect x="94" y="8" width="52" height="22" rx="11" fill={c} />
            <text x="120" y="23" textAnchor="middle" fontSize="10" fontWeight="800" fill="#052e1a">1 : 4</text>
          </g>
          <path d="M106 34 L92 46 M134 34 L148 46" stroke={c} strokeWidth="1.5" strokeDasharray="3 3" />
        </g>
      )}
      {icon === "Rocket" && (
        <g>
          <circle cx="78" cy="62" r="40" fill={BG} stroke={c} strokeWidth="1.8" />
          <circle cx="78" cy="62" r="28" fill="none" stroke={c} strokeOpacity="0.3" strokeDasharray="3 4" />
          {[["N", 78, 30], ["E", 112, 66], ["S", 78, 100], ["W", 44, 66]].map(([t, x, y]) => (
            <text key={t as string} x={x as number} y={y as number} textAnchor="middle" fontSize="9" fontWeight="800" fill="#9ca3af">{t}</text>
          ))}
          <g>
            <animateTransform attributeName="transform" type="rotate" values="-20 78 62;25 78 62;-20 78 62" dur="4s" repeatCount="indefinite" />
            <path d="M78 36 L86 62 L78 58 L70 62 Z" fill={c} />
            <path d="M78 88 L86 62 L78 66 L70 62 Z" fill="#6b7280" />
          </g>
          <g>
            <animateTransform attributeName="transform" type="translate" values="0 6;0 -6;0 6" dur="2.2s" repeatCount="indefinite" />
            <path d="M176 92 Q180 112 184 92 Z" fill="#fbbf24" />
            <path d="M168 82 L160 96 L170 92 Z M192 82 L200 96 L190 92 Z" fill="#f472b6" />
            <path d="M180 26 C194 40, 194 72, 190 92 H170 C166 72, 166 40, 180 26 Z" fill="#eef2ff" />
            <circle cx="180" cy="58" r="7" fill="#38bdf8" stroke="#1e1b4b" strokeWidth="2" />
          </g>
          <text x="180" y="16" textAnchor="middle" fontSize="9.5" fontWeight="800" fill={c}>OECD 2030</text>
          <Spark x={214} y={40} color="#fde68a" />
          <Spark x={140} y={30} color={c} delay={0.7} s={0.8} />
        </g>
      )}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* 비교 — 세 교실 장면                                                  */
/* ------------------------------------------------------------------ */
export function ThreeClassroomsSvg() {
  return (
    <svg viewBox="0 0 960 330" className="h-auto w-full" style={font} role="img" aria-label="세 교실 비교. 코딩 학원에서는 학생이 화면 속 예제를 따라 치고, 메이커 교실에서는 설명서대로 키트를 조립한다. AI Maker Lab에서는 학생과 AI 로봇이 함께 만든 앱이 실제 장치를 움직이고, 접속 가능한 주소로 공개된다">
      <defs>
        <radialGradient id="tc-spot" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#10b981" stopOpacity="0.35" />
          <stop offset="1" stopColor="#10b981" stopOpacity="0" />
        </radialGradient>
      </defs>
      {[0, 1, 2].map((k) => (
        <rect key={k} x={10 + k * 318} y="10" width="304" height="292" rx="22" fill={k === 2 ? "#052e1a" : "#ffffff"} fillOpacity={k === 2 ? 0.5 : 0.03} stroke={k === 2 ? "#34d399" : "#ffffff"} strokeOpacity={k === 2 ? 0.6 : 0.1} strokeWidth={k === 2 ? 2 : 1} />
      ))}
      {/* coding academy */}
      <text x="162" y="42" textAnchor="middle" fontSize="14" fontWeight="800" fill="#9ca3af">코딩 학원</text>
      <rect x="62" y="70" width="140" height="92" rx="8" fill="#111827" stroke="#4b5563" strokeWidth="2" />
      {["for i in range(10):", "    print(i)", "# 예제 3-2 따라 치기"].map((t, k) => (
        <text key={t} x="74" y={92 + k * 18} fontSize="10" fill={k === 2 ? "#6b7280" : "#9ca3af"} style={{ fontFamily: "ui-monospace, monospace", whiteSpace: "pre" }}>{t}</text>
      ))}
      <path d="M120 162 V176 M100 178 H140" stroke="#4b5563" strokeWidth="3" strokeLinecap="round" />
      <Kid x={226} y={250} s={1.15} gray mood="flat" flip />
      <rect x="40" y="250" width="244" height="10" rx="5" fill="#374151" />
      <text x="162" y="286" textAnchor="middle" fontSize="11.5" fill="#6b7280">화면 안에서 끝난다</text>

      {/* maker class */}
      <text x="480" y="42" textAnchor="middle" fontSize="14" fontWeight="800" fill="#9ca3af">메이커 · 로봇 교실</text>
      <g transform="rotate(-6 420 120)">
        <rect x="370" y="70" width="88" height="110" rx="4" fill="#e5e7eb" fillOpacity="0.8" />
        <text x="414" y="88" textAnchor="middle" fontSize="9" fontWeight="800" fill="#374151">조립 설명서</text>
        {[0, 1, 2, 3].map((k) => (
          <g key={k}>
            <circle cx="384" cy={104 + k * 18} r="5" fill="#9ca3af" />
            <text x="384" y={107 + k * 18} textAnchor="middle" fontSize="7" fontWeight="800" fill="#ffffff">{k + 1}</text>
            <rect x="394" y={101 + k * 18} width={50 - k * 6} height="5" rx="2.5" fill="#9ca3af" />
          </g>
        ))}
      </g>
      <rect x="478" y="200" width="90" height="44" rx="6" fill="#374151" stroke="#6b7280" />
      {[0, 1, 2].map((k) => <rect key={k} x={488 + k * 26} y="210" width="18" height="12" rx="2" fill="#4b5563" />)}
      <circle cx="550" cy="234" r="4" fill="#6b7280" />
      <Kid x={540} y={196} s={0.9} gray mood="flat" arm="point" flip />
      <rect x="358" y="250" width="244" height="10" rx="5" fill="#374151" />
      <text x="480" y="286" textAnchor="middle" fontSize="11.5" fill="#6b7280">학기가 끝나면 분해된다</text>

      {/* AI Maker Lab */}
      <ellipse cx="798" cy="252" rx="140" ry="22" fill="url(#tc-spot)" />
      <text x="798" y="42" textAnchor="middle" fontSize="14" fontWeight="800" fill="#6ee7b7">AI Maker Lab</text>
      <rect x="826" y="60" width="104" height="74" rx="9" fill={BG} stroke="#38bdf8" strokeWidth="1.6" />
      <rect x="826" y="60" width="104" height="14" rx="7" fill="#38bdf8" fillOpacity="0.25" />
      <text x="878" y="70.5" textAnchor="middle" fontSize="7" fill="#bae6fd" style={{ fontFamily: "ui-monospace, monospace" }}>my-ai.vercel.app</text>
      <text x="838" y="96" fontSize="9" fill="#9ca3af">실내 온도</text>
      <text x="838" y="118" fontSize="18" fontWeight="800" fill="#ffffff">27.4°</text>
      <rect x="892" y="104" width="30" height="16" rx="8" fill="#34d399" />
      <text x="907" y="115.5" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#052e1a">팬 ON</text>
      <path d="M878 134 C878 160, 856 170, 840 182" stroke="#34d399" strokeWidth="2" fill="none" strokeDasharray="4 4">
        <animate attributeName="stroke-dashoffset" from="16" to="0" dur="0.8s" repeatCount="indefinite" />
      </path>
      {/* device with spinning fan */}
      <rect x="796" y="182" width="74" height="62" rx="8" fill="#064e3b" stroke="#22d3ee" strokeWidth="1.6" />
      <circle cx="833" cy="212" r="20" fill="#0b0b12" stroke="#22d3ee" />
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 833 212" to="360 833 212" dur="0.8s" repeatCount="indefinite" />
        {[0, 120, 240].map((a) => <ellipse key={a} cx="833" cy="200" rx="5" ry="11" fill="#67e8f9" transform={`rotate(${a} 833 212)`} />)}
      </g>
      <circle cx="833" cy="212" r="3.5" fill="#f9fafb" />
      <Kid x={710} y={250} s={1.15} arm="cheer" />
      <Robo x={770} y={246} s={0.86} color="#34d399" arm="cheer" />
      <rect x="676" y="250" width="244" height="10" rx="5" fill="#065f46" />
      <Spark x={700} y={120} color="#fde68a" />
      <Spark x={940} y={170} color="#6ee7b7" delay={0.6} />
      <text x="798" y="286" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#a7f3d0">접속되는 URL + 작동하는 실물</text>

      {[0, 1].map((k) => (
        <g key={k}>
          <circle cx={320 + k * 318} cy="156" r="14" fill={BG} stroke="#ffffff" strokeOpacity="0.2" />
          <text x={320 + k * 318} y="160" textAnchor="middle" fontSize="10" fontWeight="800" fill="#9ca3af">{k ? "→" : "vs"}</text>
        </g>
      ))}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* CTA — 아이와 로봇이 첫 프로젝트를 쏘아 올린다                        */
/* ------------------------------------------------------------------ */
export function LaunchSceneSvg() {
  return (
    <svg viewBox="0 0 640 220" className="mx-auto h-auto w-full max-w-2xl" style={font} role="img" aria-label="학생과 AI 로봇이 버튼을 눌러 첫 번째 프로젝트 로켓을 쏘아 올리는 장면">
      <defs>
        <linearGradient id="ls-trail" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fbbf24" stopOpacity="0" />
          <stop offset="1" stopColor="#fbbf24" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      {[[60, 40], [140, 20], [520, 30], [590, 70], [460, 12], [30, 120]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.4" fill="#ffffff">
          <animate attributeName="opacity" values="0.15;0.9;0.15" dur={`${2 + (i % 3)}s`} begin={`${i * 0.3}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <path d="M100 206 Q320 186 540 206" stroke="#a78bfa" strokeOpacity="0.4" strokeWidth="2" fill="none" />
      <Kid x={196} y={204} s={1.2} arm="cheer" />
      <Robo x={444} y={200} s={1.05} arm="cheer" color="#22d3ee" flip />
      {/* launch pad */}
      <rect x="286" y="190" width="68" height="14" rx="4" fill="#4c1d95" />
      <rect x="236" y="176" width="34" height="20" rx="6" fill="#ef4444" />
      <rect x="240" y="170" width="26" height="10" rx="5" fill="#fca5a5">
        <animate attributeName="y" values="170;174;170" dur="1.4s" repeatCount="indefinite" />
      </rect>
      <path d="M270 186 H286" stroke="#a78bfa" strokeWidth="2" />
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0;0 -12;0 0" dur="2.4s" repeatCount="indefinite" />
        <rect x="314" y="120" width="12" height="70" rx="6" fill="url(#ls-trail)" />
        <path d="M311 118 Q320 146 329 118 Z" fill="#fbbf24">
          <animate attributeName="d" values="M311 118 Q320 146 329 118 Z;M311 118 Q320 134 329 118 Z;M311 118 Q320 146 329 118 Z" dur="0.4s" repeatCount="indefinite" />
        </path>
        <path d="M304 100 L292 120 L306 114 Z M336 100 L348 120 L334 114 Z" fill="#f472b6" />
        <path d="M320 34 C338 52, 340 92, 334 118 H306 C300 92, 302 52, 320 34 Z" fill="#eef2ff" />
        <path d="M320 34 C328 42, 333 52, 335 62 H305 C307 52, 312 42, 320 34 Z" fill="#8b5cf6" />
        <circle cx="320" cy="80" r="9" fill="#38bdf8" stroke="#1e1b4b" strokeWidth="2.5" />
        <text x="320" y="106" textAnchor="middle" fontSize="8" fontWeight="800" fill="#4c1d95">MY 1st</text>
      </g>
      <Spark x={262} y={60} color="#fde68a" />
      <Spark x={384} y={46} color="#c4b5fd" delay={0.5} />
      <Spark x={360} y={150} color="#67e8f9" delay={1} s={0.8} />
    </svg>
  )
}
