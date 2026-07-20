"use client";
import { GraduationCap, Clock, Users, Package, Building2, PlayCircle, Check } from "lucide-react";
import type { HomeTextConfig } from "../types";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useCountUp } from "../hooks/useCountUp";

const iconMap = {
  GraduationCap,
  Clock,
  Users,
  Package,
  Building2,
  PlayCircle,
};

const metricColors = [
  "from-indigo-500 to-cyan-400",
  "from-violet-500 to-indigo-400",
  "from-emerald-500 to-teal-400",
  "from-fuchsia-500 to-violet-400",
  "from-rose-500 to-fuchsia-400",
  "from-cyan-500 to-blue-400",
];

function AnimatedMetric({ icon, value, caption, gradient, visible, delay }: {
  icon: string; value: string; caption: string; gradient: string; visible: boolean; delay: number;
}) {
  const Icon = iconMap[icon as keyof typeof iconMap] || Users;
  const display = useCountUp(value, 1800, visible);

  return (
    <div
      className={`transition-all duration-700 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="ai-card-hover flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className={`mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-md shadow-violet-500/20`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
        <div className="text-xl font-extrabold text-white">{display}</div>
        <div className="text-sm text-white/40 text-center">{caption}</div>
      </div>
    </div>
  );
}

type OutreachProps = {
  text: HomeTextConfig["outreach"];
};

export function OutreachStatsSection({ text }: OutreachProps) {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section ref={ref as any} className="relative overflow-hidden bg-gray-900 py-24">
      <div className="ai-dot-bg pointer-events-none absolute inset-0 opacity-15" />
      <div className="ai-glow pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-indigo-500/10 blur-[100px]" />
      <div className="container relative mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 md:items-stretch">
          <div className="flex h-full flex-col p-6 md:p-8">
            <div className={`mb-6 transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              <div className="ai-chip mb-4 border-cyan-400/30 bg-cyan-500/10 text-cyan-300">DATA · IMPACT</div>
              <h2 className="mb-2 text-4xl font-bold text-white">{text.heading}</h2>
              <p className="text-white/50">{text.subheading}</p>
            </div>

            <div className={`mb-6 flex flex-wrap gap-6 text-white/70 mt-5 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              {text.grades.map((g) => (
                <div key={g} className="inline-flex items-center gap-1">
                  <Check className="h-6 w-6 text-cyan-400" />
                  <span className="font-medium">{g}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 mt-1">
              {text.metrics.map((m, idx) => (
                <AnimatedMetric
                  key={idx}
                  icon={m.icon}
                  value={m.value}
                  caption={m.caption}
                  gradient={metricColors[idx % metricColors.length]}
                  visible={visible}
                  delay={idx * 120}
                />
              ))}
            </div>
          </div>

          <div
            className={`relative mx-auto w-full sm:w-11/12 lg:w-11/12 xl:w-9/12 overflow-hidden rounded-2xl aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            <img src={text.right.img} alt="outreach" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent" />
            <div className="ai-glass absolute bottom-4 left-4 right-4 rounded-xl p-4 shadow-lg">
              <div className="font-semibold text-white">{text.right.cardTitle}</div>
              {text.right.cardLines.map((l, i) => (
                <div key={i} className="text-sm text-white/60">{l}</div>
              ))}
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-violet-300">
                {text.right.hashtags.map((t) => (
                  <span key={t} className="rounded-full bg-violet-500/20 px-2 py-0.5">#{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
