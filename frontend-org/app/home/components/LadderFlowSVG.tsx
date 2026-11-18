"use client";
import { useTick } from "../hooks/useTick";

export type LadderNode = {
  id: string;
  emoji: string;
  label: string;
  sub: string;
  color: string;
};

type Props = {
  nodes: LadderNode[];
  activeId: string;
  onSelect: (id: string) => void;
};

/** 초 → 중 → 고 → 대학으로 올라가는 계단형 흐름도. 노드를 클릭하면 해당 과정이 선택된다. */
export function LadderFlowSVG({ nodes, activeId, onSelect }: Props) {
  const { mounted, tick } = useTick(60);

  const W = 860;
  const H = 260;
  const padX = 70;
  const spacing = (W - padX * 2) / Math.max(nodes.length - 1, 1);
  const baseY = 210;
  const rise = 34;

  const pos = nodes.map((n, i) => ({
    x: padX + spacing * i,
    y: baseY - rise * i,
    node: n,
  }));

  if (!mounted) return <div className="h-[260px] w-full" />;

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full min-w-[640px]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="ladder-glow">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="ladder-track" x1="0" y1="1" x2="1" y2="0">
            {nodes.map((n, i) => (
              <stop key={n.id} offset={`${(i / Math.max(nodes.length - 1, 1)) * 100}%`} stopColor={n.color} />
            ))}
          </linearGradient>
        </defs>

        {/* 바닥 기준선 */}
        <line x1={30} y1={baseY + 34} x2={W - 30} y2={baseY + 34} stroke="#ffffff" strokeOpacity={0.07} strokeWidth={1} />

        {/* 계단 연결선 */}
        {pos.slice(0, -1).map((p, i) => {
          const next = pos[i + 1];
          const dashOffset = -((tick % 120) / 120) * 40;
          return (
            <g key={`seg-${p.node.id}`}>
              <path
                d={`M ${p.x} ${p.y} L ${next.x} ${p.y} L ${next.x} ${next.y}`}
                fill="none"
                stroke="url(#ladder-track)"
                strokeOpacity={0.18}
                strokeWidth={3}
              />
              <path
                d={`M ${p.x} ${p.y} L ${next.x} ${p.y} L ${next.x} ${next.y}`}
                fill="none"
                stroke={next.node.color}
                strokeOpacity={0.65}
                strokeWidth={2.5}
                strokeDasharray="12 9"
                strokeDashoffset={dashOffset}
              />
            </g>
          );
        })}

        {/* 선 위를 흐르는 스파크 */}
        {pos.slice(0, -1).map((p, i) => {
          const next = pos[i + 1];
          const t = ((tick + i * 35) % 110) / 110;
          const legX = Math.abs(next.x - p.x);
          const legY = Math.abs(next.y - p.y);
          const total = legX + legY;
          const d = t * total;
          const sx = d < legX ? p.x + d : next.x;
          const sy = d < legX ? p.y : p.y - (d - legX);
          return (
            <circle
              key={`spark-${p.node.id}`}
              cx={sx}
              cy={sy}
              r={3.5}
              fill={next.node.color}
              filter="url(#ladder-glow)"
            />
          );
        })}

        {/* 노드 */}
        {pos.map(({ x, y, node }, i) => {
          const on = node.id === activeId;
          const phase = ((tick + i * 26) % 130) / 130;
          const float = Math.sin(phase * Math.PI * 2) * (on ? 5 : 2.5);
          const pulse = 30 + Math.sin(phase * Math.PI * 2) * (on ? 6 : 2);

          return (
            <g
              key={node.id}
              transform={`translate(0, ${float})`}
              onClick={() => onSelect(node.id)}
              style={{ cursor: "pointer" }}
            >
              <circle cx={x} cy={y} r={pulse} fill={node.color} fillOpacity={on ? 0.16 : 0.06} />
              <circle
                cx={x}
                cy={y}
                r={25}
                fill={node.color}
                fillOpacity={on ? 0.28 : 0.14}
                stroke={node.color}
                strokeOpacity={on ? 0.9 : 0.35}
                strokeWidth={on ? 2.5 : 1.5}
                filter={on ? "url(#ladder-glow)" : undefined}
              />
              <text x={x} y={y + 7} textAnchor="middle" fontSize="20" style={{ userSelect: "none" }}>
                {node.emoji}
              </text>
              <circle cx={x + 19} cy={y - 19} r={9.5} fill="#0B0B16" stroke={node.color} strokeWidth={1.5} />
              <text x={x + 19} y={y - 15} textAnchor="middle" fontSize="9.5" fill={node.color} fontWeight="800">
                {i + 1}
              </text>
              <text
                x={x}
                y={y + 46}
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill="#ffffff"
                fillOpacity={on ? 0.95 : 0.6}
              >
                {node.label}
              </text>
              <text x={x} y={y + 63} textAnchor="middle" fontSize="10.5" fill={node.color} fillOpacity={on ? 0.9 : 0.5}>
                {node.sub}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
