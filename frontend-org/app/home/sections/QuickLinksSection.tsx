import Link from "next/link";
import { Search, GraduationCap, FileText, BookOpen, Code, HelpCircle } from "lucide-react";

const links = [
  { href: "/curriculum", icon: Search, label: "전체 학년별 커리큘럼" },
  { href: "/products", icon: GraduationCap, label: "교육키트 바로가기" },
  { href: "/resources/teaching-plans", icon: FileText, label: "수업 지도계획서 다운로드" },
  { href: "/resources/lesson-plans", icon: BookOpen, label: "수업 교안(PDF)다운로드" },
  { href: "/resources/source-code", icon: Code, label: "소스코드 다운로드" },
  { href: "/faq", icon: HelpCircle, label: "자주묻는질문" },
];

export function QuickLinksSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <div className="ai-chip mb-4">QUICK ACCESS</div>
          <h2 className="text-2xl font-bold text-gray-900">🚀 AI Make Lab 교구재 바로가기</h2>
        </div>

        <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {links.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="ai-card-hover group flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/10 to-cyan-400/10 transition-colors group-hover:from-indigo-500 group-hover:to-cyan-400">
                <Icon className="h-6 w-6 text-indigo-500 transition-colors group-hover:text-white" />
              </div>
              <span className="text-center text-xs font-medium text-gray-700">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


