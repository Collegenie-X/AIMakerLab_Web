"use client";
import Link from "next/link";
import { Button } from "@/components/ui/buttons/button";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const orbs = [
  { size: 300, top: "-10%", left: "-5%",  delay: "0s",   dur: "8s"  },
  { size: 200, top: "60%",  left: "80%",  delay: "1s",   dur: "10s" },
  { size: 150, top: "20%",  left: "70%",  delay: "2s",   dur: "7s"  },
  { size: 100, top: "70%",  left: "10%",  delay: "0.5s", dur: "9s"  },
];

export function CtaSection() {
  const { ref, visible } = useScrollReveal(0.2);

  return (
    <section ref={ref as any} className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-violet-950 to-gray-950 py-28 text-white">
      {orbs.map((o, i) => (
        <div
          key={i}
          className="cta-orb absolute rounded-full bg-gradient-to-br from-violet-400/20 to-cyan-300/20 blur-3xl"
          style={{
            width: o.size,
            height: o.size,
            top: o.top,
            left: o.left,
            animationDelay: o.delay,
            animationDuration: o.dur,
          }}
        />
      ))}

      <div className="ai-grid-bg absolute inset-0 opacity-40" />

      <div className="container relative mx-auto px-4 text-center">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="ai-chip mb-6 border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
            <span className="ai-blink h-1.5 w-1.5 rounded-full bg-cyan-300" />
            📞 무료 상담 진행 중
          </div>

          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            지금 바로 <span className="ai-gradient-text">AI 바이브 코딩</span>을 시작하세요 🚀
          </h2>
          <p className="mb-10 text-xl text-white/60">
            무료 상담을 통해 맞춤형 AI 바이브 코딩 교육 과정을 안내해드립니다 💬
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="group bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400 text-white shadow-xl shadow-violet-900/40 hover:shadow-violet-500/40 px-8"
              asChild
            >
              <Link href="/inquiry/online">
                ✉️ 무료 상담 신청
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="ai-glass border-white/20 text-white hover:bg-white/10 px-8"
              asChild
            >
              <Link href="/curriculum/vive-coding">
                📚 커리큘럼 보기
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
