"use client";
import { Card, CardContent } from "@/components/ui/data-display/card";
import type { HomeTextConfig } from "../types";
import { BookOpen, Code, Cpu, Lightbulb, Users, Award, Sparkles, Rocket } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const iconMap = {
  BookOpen,
  Code,
  Cpu,
  Lightbulb,
  Users,
  Award,
  Sparkles,
  Rocket,
} as const;

const emojiMap: Record<string, string> = {
  Sparkles: "✨",
  Code: "💻",
  Cpu: "🔌",
  Lightbulb: "💡",
  Users: "👥",
  Award: "🏆",
  BookOpen: "📖",
  Rocket: "🚀",
};

const iconGradients = [
  "from-indigo-500 to-cyan-400",
  "from-violet-500 to-fuchsia-400",
  "from-cyan-500 to-blue-400",
  "from-emerald-500 to-teal-400",
  "from-indigo-500 to-purple-400",
  "from-fuchsia-500 to-rose-400",
];

type FeaturesSectionProps = {
  text: HomeTextConfig["features"];
};

export function FeaturesSection({ text }: FeaturesSectionProps) {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section ref={ref as any} className="relative overflow-hidden bg-gray-900 py-24">
      <div className="ai-dot-bg pointer-events-none absolute inset-0 opacity-20" />
      <div className="ai-glow pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-indigo-500/10 blur-[100px]" />
      <div className="ai-glow pointer-events-none absolute -right-32 top-0 h-72 w-72 rounded-full bg-cyan-500/8 blur-[80px]" style={{ animationDelay: "2s" }} />

      {/* Decorative SVG waves */}
      <svg viewBox="0 0 1200 100" className="pointer-events-none absolute left-0 top-0 w-full opacity-[0.04]" preserveAspectRatio="none">
        <path d="M0 50 Q300 0 600 50 T1200 50 V0 H0Z" fill="#818cf8" />
      </svg>

      <div className="container relative mx-auto px-4">
        <div className={`mb-14 text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="ai-chip mb-4 border-indigo-400/30 bg-indigo-500/10 text-indigo-300">
            🎓 WHY AI MAKER LAB
          </div>
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">{text.heading} 🤔</h2>
          <p className="text-lg text-white/50">{text.subheading}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {text.items.map((item, index) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            const emoji = emojiMap[item.icon] || "✨";
            const gradient = iconGradients[index % iconGradients.length];
            return (
              <div
                key={index}
                className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: visible ? `${index * 100}ms` : "0ms" }}
              >
                <Card className="ai-card-hover group relative h-full overflow-hidden rounded-2xl border-white/10 bg-white/5 backdrop-blur-sm">
                  <CardContent className="relative pt-6">
                    <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-lg shadow-indigo-500/20 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                      <span className="text-2xl">{emoji}</span>
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-white transition-colors group-hover:text-violet-400">{item.title}</h3>
                    <p className="text-white/50">{item.desc}</p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
