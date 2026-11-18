"use client";

/** 톱니 개수만큼 이가 달린 기어 path를 만든다. */
function gearPath(cx: number, cy: number, rOut: number, rIn: number, teeth: number) {
  const step = Math.PI / teeth;
  const pts: string[] = [];
  for (let i = 0; i < teeth * 2; i++) {
    const r = i % 2 === 0 ? rOut : rIn;
    const a = i * step - Math.PI / 2;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
}

function Gear({
  cx,
  cy,
  r,
  teeth,
  color,
  reverse,
  duration,
}: {
  cx: number;
  cy: number;
  r: number;
  teeth: number;
  color: string;
  reverse?: boolean;
  duration: number;
}) {
  return (
    <g
      className={reverse ? "ai-spin-reverse" : "ai-spin-slow"}
      style={{
        transformBox: "view-box",
        transformOrigin: `${cx}px ${cy}px`,
        animationDuration: `${duration}s`,
      }}
    >
      <path d={gearPath(cx, cy, r, r * 0.78, teeth)} fill={color} fillOpacity="0.14" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx={cx} cy={cy} r={r * 0.3} fill="none" stroke={color} strokeWidth="1.6" />
    </g>
  );
}

/**
 * 히어로 중심 씬: 메이커(보드·기어)에서 만든 신호가
 * 회로를 타고 흘러 AI 코어로 이어지는 흐름을 보여준다.
 */
export function MakerAiSceneSVG() {
  const VIOLET = "#a78bfa";
  const CYAN = "#22d3ee";
  const INDIGO = "#818cf8";
  const AMBER = "#fbbf24";

  return (
    <svg
      viewBox="46 26 812 222"
      className="w-full"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="메이커 보드에서 만든 신호가 회로를 타고 AI 코어로 흐르는 모습"
    >
      <defs>
        <linearGradient id="scene-trace" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor={VIOLET} />
          <stop offset="1" stopColor={CYAN} />
        </linearGradient>
        <radialGradient id="scene-core">
          <stop stopColor={CYAN} stopOpacity="0.9" />
          <stop offset="0.6" stopColor={INDIGO} stopOpacity="0.35" />
          <stop offset="1" stopColor={INDIGO} stopOpacity="0" />
        </radialGradient>
        <clipPath id="scene-wave-clip">
          <rect x="280" y="206" width="340" height="42" />
        </clipPath>
        <filter id="scene-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── 왼쪽: 메이커 보드 ── */}
      <g className="ai-bob">
        {/* 보드 본체 */}
        <rect x="70" y="96" width="180" height="104" rx="10" fill={VIOLET} fillOpacity="0.1" stroke={VIOLET} strokeOpacity="0.5" strokeWidth="2" />
        {/* 마이크로컨트롤러 칩 */}
        <rect x="124" y="128" width="66" height="44" rx="4" fill={INDIGO} fillOpacity="0.28" stroke={INDIGO} strokeWidth="1.5" />
        <text x="157" y="155" textAnchor="middle" fill="#c7d2fe" fontSize="12" fontFamily="monospace">
          MCU
        </text>

        {/* 핀 헤더 */}
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={`pt-${i}`} x={82 + i * 14} y="102" width="7" height="7" rx="1.5" fill={VIOLET} fillOpacity="0.55" />
        ))}
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={`pb-${i}`} x={82 + i * 14} y="187" width="7" height="7" rx="1.5" fill={CYAN} fillOpacity="0.5" />
        ))}

        {/* 상태 LED — 순서대로 깜빡인다 */}
        {[
          { x: 96, c: AMBER, d: "0s" },
          { x: 96, c: "#34d399", d: "0.55s" },
          { x: 96, c: CYAN, d: "1.1s" },
        ].map((led, i) => (
          <circle
            key={led.d}
            cx={led.x}
            cy={132 + i * 16}
            r="4.5"
            fill={led.c}
            className="ai-led"
            style={{ animationDelay: led.d }}
            filter="url(#scene-glow)"
          />
        ))}
      </g>

      {/* 보드 위 기어 — 메이커의 손 */}
      <Gear cx={214} cy={62} r={30} teeth={10} color={VIOLET} duration={16} />
      <Gear cx={262} cy={92} r={20} teeth={8} color={CYAN} reverse duration={11} />

      {/* ── 가운데: 회로 트레이스 + 흐르는 전류 ── */}
      <g fill="none" strokeLinecap="round">
        {/* 배경 트레이스 */}
        <path d="M250 130 H330 Q346 130 346 114 V84 H430" stroke="url(#scene-trace)" strokeOpacity="0.18" strokeWidth="2.5" />
        <path d="M250 148 H470" stroke="url(#scene-trace)" strokeOpacity="0.18" strokeWidth="2.5" />
        <path d="M250 166 H330 Q346 166 346 182 V212 H430" stroke="url(#scene-trace)" strokeOpacity="0.18" strokeWidth="2.5" />

        {/* 흐르는 전류 */}
        <path
          d="M250 130 H330 Q346 130 346 114 V84 H430"
          stroke={VIOLET}
          strokeWidth="2.5"
          className="ai-dash-flow"
          style={{ ["--flow-dash" as string]: "5 13", ["--flow-len" as string]: "18", animationDuration: "1.3s" }}
        />
        <path
          d="M250 148 H470"
          stroke={CYAN}
          strokeWidth="2.5"
          className="ai-dash-flow"
          style={{ ["--flow-dash" as string]: "6 12", ["--flow-len" as string]: "18", animationDuration: "0.9s" }}
        />
        <path
          d="M250 166 H330 Q346 166 346 182 V212 H430"
          stroke={INDIGO}
          strokeWidth="2.5"
          className="ai-dash-flow"
          style={{ ["--flow-dash" as string]: "5 13", ["--flow-len" as string]: "18", animationDuration: "1.6s" }}
        />

        {/* 분기점 */}
        {[
          [346, 114],
          [346, 182],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" fill={CYAN} stroke="none" />
        ))}
      </g>

      {/* 신호 파형 — 오실로스코프 느낌. 한 주기(60)의 배수만큼 이동해 이음매가 없다. */}
      <g clipPath="url(#scene-wave-clip)">
        <g className="ai-wave" style={{ animationDuration: "3s" }}>
          <path
            d={`M280 232 q15 -16 30 0 ${"t30 0 ".repeat(16).trim()}`}
            fill="none"
            stroke={CYAN}
            strokeOpacity="0.35"
            strokeWidth="2"
          />
        </g>
      </g>

      {/* 데이터 패킷 */}
      {[
        { y: 148, delay: "0s", color: CYAN },
        { y: 148, delay: "1.2s", color: VIOLET },
      ].map((p, i) => (
        <circle
          key={`${p.delay}-${i}`}
          cx="256"
          cy={p.y}
          r="4"
          fill={p.color}
          className="ai-packet"
          filter="url(#scene-glow)"
          style={{ ["--packet-dist" as string]: "210px", animationDelay: p.delay, animationDuration: "2.4s" }}
        />
      ))}

      {/* ── 오른쪽: AI 코어 ── */}
      <g>
        {/* 확산하는 링 */}
        {["0s", "0.9s", "1.8s"].map((d) => (
          <circle
            key={d}
            cx="700"
            cy="148"
            r="52"
            fill="none"
            stroke={CYAN}
            strokeOpacity="0.5"
            strokeWidth="1.5"
            className="ai-pulse-ring"
            style={{ transformBox: "view-box", transformOrigin: "700px 148px", animationDelay: d }}
          />
        ))}

        {/* 코어 글로우 */}
        <circle cx="700" cy="148" r="70" fill="url(#scene-core)" className="ai-glow" />

        {/* 육각 코어 */}
        <g className="ai-spin-slow" style={{ transformBox: "view-box", transformOrigin: "700px 148px", animationDuration: "22s" }}>
          <path
            d="M700 106 L736 127 V169 L700 190 L664 169 V127 Z"
            fill={INDIGO}
            fillOpacity="0.16"
            stroke="url(#scene-trace)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </g>

        {/* 신경망 노드 */}
        <g>
          {[
            [700, 148, 7],
            [676, 132, 4],
            [724, 132, 4],
            [676, 164, 4],
            [724, 164, 4],
          ].map(([x, y, r], i) => (
            <circle
              key={`n-${i}`}
              cx={x}
              cy={y}
              r={r}
              fill={i === 0 ? CYAN : INDIGO}
              className="ai-blink"
              style={{ animationDelay: `${i * 0.3}s`, animationDuration: "2.4s" }}
              filter={i === 0 ? "url(#scene-glow)" : undefined}
            />
          ))}
          {[
            "M700 148 L676 132",
            "M700 148 L724 132",
            "M700 148 L676 164",
            "M700 148 L724 164",
          ].map((d) => (
            <path key={d} d={d} stroke={INDIGO} strokeOpacity="0.5" strokeWidth="1.2" fill="none" />
          ))}
        </g>

        {/* 궤도를 도는 입자 */}
        <g className="ai-spin-slow" style={{ transformBox: "view-box", transformOrigin: "700px 148px", animationDuration: "9s" }}>
          <circle cx="700" cy="60" r="4.5" fill={VIOLET} filter="url(#scene-glow)" />
        </g>
        <g className="ai-spin-reverse" style={{ transformBox: "view-box", transformOrigin: "700px 148px", animationDuration: "13s" }}>
          <circle cx="700" cy="236" r="3.5" fill={CYAN} filter="url(#scene-glow)" />
        </g>
      </g>

      {/* ── 라벨 ── */}
      <text x="160" y="228" textAnchor="middle" fill="#ddd6fe" fontSize="13" fontFamily="monospace" letterSpacing="2">
        MAKER
      </text>
      <text x="700" y="238" textAnchor="middle" fill="#a5f3fc" fontSize="13" fontFamily="monospace" letterSpacing="2">
        AI
      </text>
    </svg>
  );
}
