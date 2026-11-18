import { LABELS } from '../config'
import { GraduationCap, BookOpen, Users, Award } from 'lucide-react'

/**
 * 제품 페이지 Hero 섹션 컴포넌트
 * 페이지 상단의 타이틀과 설명을 표시합니다.
 */
export function HeroProductSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-500 via-cyan-600 to-blue-600 py-12 text-white">
      <div className="absolute inset-0 bg-[url('/home/abstract-tech-pattern.png')] opacity-10" />
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold">
            <GraduationCap className="w-4 h-4" />
            전문 교육 키트
          </div>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}>
            {LABELS.hero.title}
          </h1>
          <p className="text-xl text-white/95 mb-2" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}>
            {LABELS.hero.subtitle}
          </p>
          <p className="text-lg text-white/85 mb-8" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}>
            {LABELS.hero.description}
          </p>
          
          {/* 특징 아이콘 */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <BookOpen className="w-5 h-5" />
              <span className="text-sm font-medium">체계적 커리큘럼</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">교사용 지도서</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <Award className="w-5 h-5" />
              <span className="text-sm font-medium">실전 검증 완료</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

