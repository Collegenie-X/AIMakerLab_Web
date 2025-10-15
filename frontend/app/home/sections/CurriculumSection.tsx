import Link from "next/link";
import { Badge } from "@/components/ui/data-display/badge";
import { Card, CardContent } from "@/components/ui/data-display/card";
import { Button } from "@/components/ui/buttons/button";
import { BookOpen, Clock, Users, ArrowRight } from "lucide-react";
import type { HomeTextConfig } from "../config";

type CurriculumSectionProps = {
  text: HomeTextConfig["curriculum"];
};

export function CurriculumSection({ text }: CurriculumSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
            <BookOpen className="h-4 w-4" />
            {text.sectionBadge}
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900">{text.heading}</h2>
          <p className="text-lg text-gray-600">{text.subheading}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {text.items.map((item, idx) => (
            <Link href={item.href} className="group" key={idx}>
              <Card className="h-full overflow-hidden transition-all hover:shadow-xl">
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-blue-600 text-white">{item.levelBadge}</Badge>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <h3 className="mb-2 text-lg font-semibold group-hover:text-blue-600">{item.title}</h3>
                  <p className="mb-3 text-sm text-gray-600">{item.desc}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {item.size}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <Link href="/curriculum/app-inventor">
              {text.viewAllLabel}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}


