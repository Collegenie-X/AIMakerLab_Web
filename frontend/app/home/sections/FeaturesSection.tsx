import { Card, CardContent } from "@/components/ui/data-display/card";
import type { HomeTextConfig } from "../config";
import { BookOpen, Code, Cpu, Lightbulb, Users, Award } from "lucide-react";

const iconMap = {
  BookOpen,
  Code,
  Cpu,
  Lightbulb,
  Users,
  Award,
} as const;

type FeaturesSectionProps = {
  text: HomeTextConfig["features"];
};

export function FeaturesSection({ text }: FeaturesSectionProps) {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">{text.heading}</h2>
          <p className="text-lg text-gray-600">{text.subheading}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {text.items.map((item, index) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <Card className="transition-all hover:shadow-lg" key={index}>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    {Icon ? <Icon className="h-6 w-6 text-blue-600" /> : null}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}


