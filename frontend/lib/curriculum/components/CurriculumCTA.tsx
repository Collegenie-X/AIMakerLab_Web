/**
 * CTA (Call to Action) 섹션 컴포넌트
 */

"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { CtaData } from "../types";

interface CurriculumCTAProps {
  data: CtaData;
  gradientClass: string;
}

export function CurriculumCTA({ data, gradientClass }: CurriculumCTAProps) {
  return (
    <section className={`bg-gradient-to-br ${gradientClass} text-white`}>
      <div className="curriculum-container py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">{data.title}</h2>
          <p className="mb-8 text-lg text-white/90">{data.description}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-gray-900 hover:bg-gray-100"
              asChild
            >
              <a href={data.primaryButton.link}>
                {data.primaryButton.text}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>

            {data.secondaryButton && (
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                asChild>
                <a href={data.secondaryButton.link}>
                  {data.secondaryButton.text}
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

