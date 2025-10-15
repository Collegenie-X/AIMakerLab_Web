import { Card } from "@/components/ui/data-display/card";
import { GraduationCap, Clock, Users, Package, Building2, PlayCircle, Check } from "lucide-react";
import type { HomeTextConfig } from "../config";

const iconMap = {
  GraduationCap,
  Clock,
  Users,
  Package,
  Building2,
  PlayCircle,
};

type OutreachProps = {
  text: HomeTextConfig["outreach"];
};

export function OutreachStatsSection({ text }: OutreachProps) {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 md:items-stretch">
          {/* Left panel */}
          <div className="flex h-full flex-col p-6 md:p-8">
            <div className="mb-6">
              <h2 className="mb-2 text-4xl font-bold text-gray-900">{text.heading}</h2>
              <p className="text-gray-600">{text.subheading}</p>
            </div>

            <div className="mb-6 flex flex-wrap gap-6 text-gray-700 mt-5">
              {text.grades.map((g) => (
                <div key={g} className="inline-flex items-center gap-2">
                  <Check className="h-10 w-10 text-blue-300" />
                  <span>{g}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 mt-1">
              {text.metrics.map((m, idx) => {
                const Icon = iconMap[m.icon as keyof typeof iconMap] || Users;
                return (
                  <div key={idx} className="flex flex-col items-center justify-center rounded-xl bg-white p-4">
                    <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-blue-500">
                      <Icon className="h-10 w-10 text-blue-100" />
                    </div>
                    <div className="text-2xl font-extrabold text-gray-900">{m.value}</div>
                    <div className="text-sm text-gray-500">{m.caption}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right image with overlay card */}
          <div className="relative mx-auto w-full sm:w-11/12 lg:w-11/12 xl:w-9/12 overflow-hidden rounded-xl aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9]">
            <img src={text.right.img} alt="outreach" className="h-full w-full object-cover" />
            <div className="absolute bottom-4 left-4 right-4 rounded-md bg-white/90 p-4 shadow">
              <div className="font-semibold text-gray-900">{text.right.cardTitle}</div>
              {text.right.cardLines.map((l, i) => (
                <div key={i} className="text-sm text-gray-600">{l}</div>
              ))}
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
                {text.right.hashtags.map((t) => (
                  <span key={t}>#{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


