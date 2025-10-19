import { Target, CheckCircle2, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/data-display/card";
import { Badge } from "@/components/ui/data-display/badge";
import { CurriculumSectionContainer } from "./CurriculumSectionContainer";

interface LearningGoal {
  id: string;
  category: string;
  title: string;
  description: string;
  skills: string[];
}

/**
 * 공통 학습 목표 섹션 컴포넌트
 */
interface LearningGoalsSectionProps {
  title: string;
  description: string;
  goals: LearningGoal[];
  achievements?: string[];
  containerClass: string;
  primaryColor?: string;
  gradientClass?: string;
}

export function LearningGoalsSection({
  title,
  description,
  goals,
  achievements = [],
  containerClass,
  primaryColor = "blue",
  gradientClass = "from-blue-600 to-purple-600",
}: LearningGoalsSectionProps) {
  if (!goals || goals.length === 0) {
    return null;
  }

  return (
    <CurriculumSectionContainer className="py-16 bg-white" containerClass={containerClass}>
      {/* 제목 및 설명 */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4">
          <Target className={`h-8 w-8 text-${primaryColor}-600`} />
          <h2 className="text-3xl font-bold">{title}</h2>
        </div>
        <p className="text-gray-600 max-w-3xl mx-auto">{description}</p>
      </div>

      {/* 학습 목표 카드 */}
      <div className="grid gap-6 md:grid-cols-2 mb-12">
        {goals.map((goal) => (
          <Card key={goal.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Badge className={`mb-3 bg-${primaryColor}-100 text-${primaryColor}-700 hover:bg-${primaryColor}-100`}>
                {goal.category}
              </Badge>
              <h3 className="text-xl font-bold mb-2">{goal.title}</h3>
              <p className="text-gray-600 mb-4 text-sm">{goal.description}</p>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-700 mb-2">핵심 역량</p>
                <ul className="grid grid-cols-1 gap-2">
                  {goal.skills.map((skill, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className={`h-4 w-4 text-${primaryColor}-600 mt-0.5 flex-shrink-0`} />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 기대 성과 */}
      {achievements.length > 0 && (
        <div className={`bg-gradient-to-r ${gradientClass} rounded-2xl p-8 text-white`}>
          <div className="flex items-center gap-3 mb-6">
            <Award className="h-8 w-8" />
            <h3 className="text-2xl font-bold">과정 완료 후 기대 성과</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start gap-3 bg-white/10 rounded-lg p-4">
                <CheckCircle2 className="h-5 w-5 text-yellow-300 mt-0.5 flex-shrink-0" />
                <span className="text-white/95">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </CurriculumSectionContainer>
  );
}

