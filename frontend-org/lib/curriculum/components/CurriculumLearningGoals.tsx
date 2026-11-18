/**
 * 학습 목표 섹션 컴포넌트
 */

"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui";
import { CheckCircle2 } from "lucide-react";
import type { LearningGoalsData } from "../types";
import { sortLearningGoals } from "../utils/curriculum-helpers";

interface CurriculumLearningGoalsProps {
  data: LearningGoalsData;
}

export function CurriculumLearningGoals({
  data,
}: CurriculumLearningGoalsProps) {
  const sortedGoals = sortLearningGoals(data.goals);

  return (
    <section className="curriculum-container py-16 md:py-20">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">{data.title}</h2>
        {data.subtitle && (
          <p className="text-lg text-muted-foreground">{data.subtitle}</p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {sortedGoals.map((goal) => (
          <Card key={goal.id}>
            <CardHeader>
              <Badge variant="outline" className="mb-2 w-fit">
                {goal.category}
              </Badge>
              <CardTitle>{goal.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">{goal.description}</p>
              <ul className="space-y-2">
                {goal.skills.map((skill, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

