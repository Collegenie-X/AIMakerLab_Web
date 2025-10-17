import { LABELS } from '../config'

/**
 * 제품 페이지 Hero 섹션 컴포넌트
 * 페이지 상단의 타이틀과 설명을 표시합니다.
 */
export function HeroProductSection() {
  return (
    <section className="bg-gradient-to-r from-teal-500 to-cyan-600 py-10 text-white">
      <div className="container mx-auto px-4">
        <h1 className="mb-2 text-4xl font-bold">{LABELS.hero.title}</h1>
        <p className="text-lg text-teal-50">{LABELS.hero.subtitle}</p>
      </div>
    </section>
  )
}

