/**
 * 수업 자료 다운로드 섹션 컴포넌트
 */

"use client";

import React from "react";
import { Card, CardContent, Button } from "@/components/ui";
import { Download, FileText } from "lucide-react";
import type { MaterialsData } from "../types";

interface CurriculumMaterialsProps {
  data: MaterialsData;
}

export function CurriculumMaterials({ data }: CurriculumMaterialsProps) {
  return (
    <section className="curriculum-container py-16 md:py-20 bg-gray-50">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">{data.title}</h2>
        {data.subtitle && (
          <p className="text-lg text-muted-foreground">{data.subtitle}</p>
        )}
      </div>

      <div className="space-y-8">
        {data.categories.map((category) => (
          <div key={category.id}>
            <h3 className="mb-4 text-xl font-semibold">{category.title}</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {category.materials.map((material) => (
                <Card key={material.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <FileText className="h-8 w-8 text-primary flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold">{material.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {material.description}
                        </p>
                        <div className="mt-2 flex gap-2 text-xs text-muted-foreground">
                          <span>{material.format}</span>
                          <span>•</span>
                          <span>{material.size}</span>
                          {material.pages && (
                            <>
                              <span>•</span>
                              <span>{material.pages}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <a
                          href={material.downloadUrl}
                          download
                          className="flex-shrink-0"
                        >
                          <Download className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

