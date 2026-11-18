import Link from "next/link";
import { Badge } from "@/components/ui/data-display/badge";
import { Card, CardContent } from "@/components/ui/data-display/card";
import { Button } from "@/components/ui/buttons/button";
import { ArrowRight, Clock, Users } from "lucide-react";
import type { HomeTextConfig } from "../types";

const courseEmojis = ["📱", "🔌", "🖥️", "🌐"];

type CurriculumSectionProps = {
  text: HomeTextConfig["curriculum"];
};

export function CurriculumSection({ text }: CurriculumSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gray-950 py-20">
      <div className="ai-grid-bg pointer-events-none absolute inset-0 opacity-20" />
      <div className="ai-glow pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-violet-500/10 blur-[100px]" />
      <div className="container relative mx-auto px-4">
        <div className="mb-12 text-center">
          <div className="ai-chip mb-4 border-violet-400/30 bg-violet-500/10 text-violet-300">
            📚 {text.sectionBadge}
          </div>
          <h2 className="mb-4 text-3xl font-bold text-white">{text.heading} 🎯</h2>
          <p className="text-lg text-white/50">{text.subheading}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {text.items.map((item, idx) => (
            <Link href={item.href} className="group" key={idx}>
              <Card className="ai-card-hover h-full overflow-hidden rounded-2xl border-white/10 bg-white/5">
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-gradient-to-r from-violet-600 to-indigo-500 text-white">🤖 {item.levelBadge}</Badge>
                  </div>
                  <div className="absolute top-3 left-3 text-3xl">
                    {courseEmojis[idx % courseEmojis.length]}
                  </div>
                </div>
                <CardContent className="pt-4">
                  <h3 className="mb-2 text-lg font-semibold text-white group-hover:text-violet-400 transition-colors">{item.title}</h3>
                  <p className="mb-3 text-sm text-white/50">{item.desc}</p>
                  <div className="flex items-center gap-4 text-xs text-white/40">
                    <span className="flex items-center gap-1">
                      🕐 {item.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      👥 {item.size}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" className="bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400 text-white shadow-lg shadow-violet-500/25" asChild>
            <Link href="/curriculum/app-inventor">
              📋 {text.viewAllLabel}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
