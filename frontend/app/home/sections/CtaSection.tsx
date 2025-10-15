import Link from "next/link";
import { Button } from "@/components/ui/buttons/button";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 py-20 text-white">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/home/abstract-tech-pattern.png')] bg-cover bg-center" />
      </div>
      <div className="container relative mx-auto px-4 text-center">
        <h2 className="mb-4 text-4xl font-bold">지금 바로 시작하세요</h2>
        <p className="mb-8 text-xl text-blue-100">무료 상담을 통해 자녀에게 맞는 최적의 교육 과정을 찾아드립니다</p>
        <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
          <Link href="/inquiry/online">
            무료 상담 신청
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}


