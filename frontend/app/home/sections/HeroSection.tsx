"use client";
import { Button } from "@/components/ui/buttons/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { HomeTextConfig } from "../config";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/data-display/carousel";
import { useEffect, useState } from "react";

type HeroSectionProps = {
  text: HomeTextConfig["hero"];
};

export function HeroSection({ text }: HeroSectionProps) {
  const slides = text.slides ?? [];
  const carouselCfg = text.carousel ?? { autoplay: true, intervalMs: 4000, indicators: true, pauseOnHover: true };
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    onSelect();
    return () => {
      api.off("select", onSelect as any);
    };
  }, [api]);

  useEffect(() => {
    if (!api || !carouselCfg.autoplay) return;
    let raf: number;
    let timeout: NodeJS.Timeout;
    const play = () => {
      timeout = setTimeout(() => {
        api.scrollNext();
        raf = requestAnimationFrame(play);
      }, Math.max(1000, carouselCfg.intervalMs || 4000));
    };
    play();
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [api, carouselCfg.autoplay, carouselCfg.intervalMs]);
  return (
    <section className="relative overflow-hidden bg-gray-900">
      <Carousel className="relative" opts={{ loop: true }} setApi={setApi as any}>
        <CarouselContent>
          {slides.map((s, idx) => (
            <CarouselItem key={s.img + idx}>
              <div className="relative h-[60vh] min-h-[420px] w-full">
                <img src={s.img} alt={s.title} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative z-10 flex h-full items-center">
                  <div className="container mx-auto px-4">
                    <div className="max-w-2xl">
                      <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">{s.title}</h1>
                      <p className="mb-6 text-lg text-white/90 md:text-xl">{s.description}</p>
                      {s.ctaHref && s.ctaLabel && (
                        <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100" asChild>
                          <Link href={s.ctaHref}>
                            {s.ctaLabel}
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white" />
        <CarouselNext className="right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white" />
      </Carousel>
      {carouselCfg.indicators && (
        <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`h-2 rounded-full transition-all ${
                  selectedIndex === i ? 'w-6 bg-blue-500' : 'w-2 bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      )}
      <div className="absolute -bottom-1 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}


