"use client";
import Link from "next/link";
import { Button } from "@/components/ui/buttons/button";
import { ArrowRight, Sparkles } from "lucide-react";

const tags = [
  { emoji: "🔧", label: "아두이노" },
  { emoji: "📱", label: "앱 인벤터" },
  { emoji: "🍓", label: "라즈베리파이" },
  { emoji: "🤖", label: "AI 바이브 코딩" },
];

function FloatingShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Hexagon - top right */}
      <svg viewBox="0 0 120 120" className="hero-float absolute -right-6 top-[15%] h-32 w-32 opacity-[0.07]" style={{ animationDelay: "0s" }}>
        <path d="M60 10L105 35V85L60 110L15 85V35L60 10Z" stroke="url(#hex1)" strokeWidth="2" fill="none" />
        <path d="M60 25L90 42V78L60 95L30 78V42L60 25Z" stroke="url(#hex1)" strokeWidth="1" fill="url(#hex1)" fillOpacity="0.1" />
        <defs><linearGradient id="hex1" x1="0" y1="0" x2="120" y2="120"><stop stopColor="#a78bfa"/><stop offset="1" stopColor="#22d3ee"/></linearGradient></defs>
      </svg>

      {/* Code brackets - left */}
      <svg viewBox="0 0 100 100" className="hero-float absolute left-[5%] top-[30%] h-24 w-24 opacity-[0.08]" style={{ animationDelay: "1.5s" }}>
        <path d="M35 20L15 50L35 80" stroke="#818cf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M65 20L85 50L65 80" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <line x1="55" y1="15" x2="45" y2="85" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      </svg>

      {/* Circuit pattern - bottom left */}
      <svg viewBox="0 0 160 160" className="hero-float absolute -left-8 bottom-[20%] h-40 w-40 opacity-[0.06]" style={{ animationDelay: "3s" }}>
        <circle cx="40" cy="40" r="4" fill="#818cf8" />
        <circle cx="120" cy="40" r="4" fill="#22d3ee" />
        <circle cx="40" cy="120" r="4" fill="#c084fc" />
        <circle cx="120" cy="120" r="4" fill="#818cf8" />
        <circle cx="80" cy="80" r="6" fill="url(#circ1)" />
        <path d="M44 40h32L80 74M80 86L80 116M80 86l36-42M44 120h32" stroke="url(#circ1)" strokeWidth="1.5" fill="none" opacity="0.6" />
        <defs><linearGradient id="circ1" x1="0" y1="0" x2="160" y2="160"><stop stopColor="#818cf8"/><stop offset="1" stopColor="#22d3ee"/></linearGradient></defs>
      </svg>

      {/* Atom/orbit - right middle */}
      <svg viewBox="0 0 120 120" className="hero-float absolute right-[8%] bottom-[35%] h-28 w-28 opacity-[0.07]" style={{ animationDelay: "2s" }}>
        <ellipse cx="60" cy="60" rx="50" ry="20" stroke="#c084fc" strokeWidth="1.5" fill="none" transform="rotate(-30 60 60)" />
        <ellipse cx="60" cy="60" rx="50" ry="20" stroke="#818cf8" strokeWidth="1.5" fill="none" transform="rotate(30 60 60)" />
        <ellipse cx="60" cy="60" rx="50" ry="20" stroke="#22d3ee" strokeWidth="1.5" fill="none" transform="rotate(90 60 60)" />
        <circle cx="60" cy="60" r="5" fill="url(#atom1)" />
        <defs><radialGradient id="atom1"><stop stopColor="#c084fc"/><stop offset="1" stopColor="#818cf8"/></radialGradient></defs>
      </svg>

      {/* Floating emojis - Maker 중심 */}
      <span className="hero-float absolute left-[18%] top-[15%] text-2xl opacity-20" style={{ animationDelay: "0.5s" }}>🔧</span>
      <span className="hero-float absolute right-[22%] top-[10%] text-xl opacity-15" style={{ animationDelay: "2.5s" }}>🚀</span>
      <span className="hero-float absolute left-[38%] bottom-[18%] text-lg opacity-10" style={{ animationDelay: "4s" }}>⚙️</span>
      <span className="hero-float absolute right-[12%] bottom-[22%] text-xl opacity-15" style={{ animationDelay: "1s" }}>🤖</span>
      <span className="hero-float absolute left-[60%] top-[8%] text-lg opacity-10" style={{ animationDelay: "3s" }}>💡</span>
      <span className="hero-float absolute left-[8%] bottom-[40%] text-xl opacity-10" style={{ animationDelay: "1.8s" }}>🍓</span>
      <span className="hero-float absolute right-[35%] bottom-[12%] text-lg opacity-10" style={{ animationDelay: "3.5s" }}>📱</span>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-gray-950">
      <div className="ai-glow pointer-events-none absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-violet-600/20 blur-[120px]" />
      <div
        className="ai-glow pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-indigo-500/15 blur-[100px]"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="ai-glow pointer-events-none absolute left-1/2 top-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[80px]"
        style={{ animationDelay: "4s" }}
      />
      <div className="ai-grid-bg pointer-events-none absolute inset-0 opacity-30" />
      <div className="star-field pointer-events-none absolute inset-0" />
      <FloatingShapes />

      <div className="container relative mx-auto px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div
            className="hero-slide-up mb-8 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-5 py-2 font-mono text-sm tracking-wide text-violet-300"
          >
            <span className="ai-blink h-1.5 w-1.5 rounded-full bg-violet-400" />
            AI MAKER LAB · 만들면서 배우는 미래 교육 🔧
          </div>

          <h1
            className="hero-slide-up mb-6 text-4xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="ai-gradient-text">만드는 사람</span>이<br />
            AI 시대를 앞서간다 🚀
          </h1>

          <p
            className="hero-slide-up mx-auto mb-10 max-w-2xl break-keep text-lg leading-relaxed text-white/60 md:text-xl"
            style={{ animationDelay: "0.2s" }}
          >
            아두이노·앱 인벤터·라즈베리파이로 <span className="text-white/90 font-medium">직접 만들고</span>,
            <br />
            AI 바이브 코딩으로 <span className="text-white/90 font-medium">더 빠르게 완성</span>합니다.
            <br />
            메이커에 AI가 더해질 때, 진짜 교육이 시작됩니다.
          </p>

          <div
            className="hero-slide-up mb-12 flex flex-wrap justify-center gap-3"
            style={{ animationDelay: "0.3s" }}
          >
            {tags.map(({ emoji, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur-sm"
              >
                <span className="text-base">{emoji}</span>
                {label}
              </span>
            ))}
          </div>

          <div
            className="hero-slide-up flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            style={{ animationDelay: "0.4s" }}
          >
            <Button
              size="lg"
              className="group bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400 px-8 text-white shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50"
              asChild
            >
              <Link href="/curriculum/vive-coding">
                📚 커리큘럼 보기
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 px-8 text-white hover:bg-white/10"
              asChild
            >
              <Link href="/inquiry/online">
                💬 수업 문의하기
              </Link>
            </Button>
          </div>

          <div
            className="hero-slide-up mt-20 text-sm text-white/30"
            style={{ animationDelay: "0.5s" }}
          >
            👇 스크롤하여 더 알아보기
          </div>
        </div>
      </div>

      <div className="absolute -bottom-1 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent" />
    </section>
  );
}
