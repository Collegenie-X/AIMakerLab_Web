'use client'

import { useState, useMemo } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { HeroProductSection } from './components/HeroProductSection'
import { ProductFilter } from './components/ProductFilter'
import { ContactInfoSection } from './components/ContactInfoSection'
import { ProductCard } from './components/ProductCard'
import { ProductEmptyState } from './components/ProductEmptyState'
import { useProducts } from './hooks/useProducts'
import { LABELS, CATEGORY_MAP, GRADE_MAP } from './config'

/**
 * 코딩(SW.AI) 교육제품 목록 페이지
 */
export default function CodingAIProductsPage() {
  // 제품 데이터 로드
  const { products, isLoading, error } = useProducts()

  // 필터 상태 관리
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedGrade, setSelectedGrade] = useState<string>('all')

  // 제품 필터링 로직
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 카테고리 필터
      const categoryMatch =
        selectedCategory === 'all' || product.category === CATEGORY_MAP[selectedCategory]

      // 학년 필터
      const gradeMatch =
        selectedGrade === 'all' || product.targetGrade.includes(GRADE_MAP[selectedGrade])

      return categoryMatch && gradeMatch
    })
  }, [products, selectedCategory, selectedGrade])

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-teal-600 border-t-transparent mx-auto"></div>
            <p className="text-gray-600">제품 정보를 불러오는 중...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // 에러 상태 처리
  if (error) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-2">제품 정보를 불러오는데 실패했습니다.</p>
            <p className="text-gray-500 text-sm">{error.message}</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <HeroProductSection />

      {/* Filter Section */}
      <ProductFilter
        selectedCategory={selectedCategory}
        selectedGrade={selectedGrade}
        onCategoryChange={setSelectedCategory}
        onGradeChange={setSelectedGrade}
      />

      {/* Contact Information */}
      <ContactInfoSection />

      {/* Products List */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              전체 {filteredProducts.length}개 제품
            </h2>
            <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm">
              <option>{LABELS.productList.sortOptions.recommended}</option>
              <option>{LABELS.productList.sortOptions.popular}</option>
              <option>{LABELS.productList.sortOptions.priceLow}</option>
              <option>{LABELS.productList.sortOptions.priceHigh}</option>
              <option>{LABELS.productList.sortOptions.newest}</option>
            </select>
          </div>

          {filteredProducts.length === 0 ? (
            <ProductEmptyState />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
