import Link from "next/link";
import { Search, GraduationCap, FileText, BookOpen, Code, HelpCircle } from "lucide-react";

export function QuickLinksSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">🚀 AI Make Lab 교구재 바로가기</h2>
        </div>

        <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          <Link href="/curriculum" className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-blue-300 hover:bg-blue-50">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <Search className="h-6 w-6 text-gray-600" />
            </div>
            <span className="text-center text-xs font-medium text-gray-700">전체 학년별 커리큘럼</span>
          </Link>

          <Link href="/products" className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-blue-300 hover:bg-blue-50">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <GraduationCap className="h-6 w-6 text-gray-600" />
            </div>
            <span className="text-center text-xs font-medium text-gray-700">교육키트 바로가기</span>
          </Link>

          <Link href="/resources/teaching-plans" className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-blue-300 hover:bg-blue-50">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <FileText className="h-6 w-6 text-gray-600" />
            </div>
            <span className="text-center text-xs font-medium text-gray-700">수업 지도계획서 다운로드</span>
          </Link>

          <Link href="/resources/lesson-plans" className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-blue-300 hover:bg-blue-50">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <BookOpen className="h-6 w-6 text-gray-600" />
            </div>
            <span className="text-center text-xs font-medium text-gray-700">수업 교안(PDF)다운로드</span>
          </Link>

          <Link href="/resources/source-code" className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-blue-300 hover:bg-blue-50">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <Code className="h-6 w-6 text-gray-600" />
            </div>
            <span className="text-center text-xs font-medium text-gray-700">소스코드 다운로드</span>
          </Link>

          <Link href="/faq" className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-blue-300 hover:bg-blue-50">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <HelpCircle className="h-6 w-6 text-gray-600" />
            </div>
            <span className="text-center text-xs font-medium text-gray-700">자주묻는질문</span>
          </Link>
        </div>
      </div>
    </section>
  );
}


