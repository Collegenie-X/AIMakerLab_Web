/**
 * 제품(Products) 유틸리티 함수
 * - 가격 포맷팅, 할인율 계산 등 공통 로직
 */

import type { Product, ProductReview } from './types'

// ============================================================================
// 가격 관련 유틸리티
// ============================================================================

/**
 * 가격 포맷팅 (원화)
 * @example formatPrice("57200") => "57,200원"
 */
export function formatPrice(price: string | number): string {
  const numPrice = typeof price === 'string' ? parseInt(price, 10) : price
  
  if (isNaN(numPrice)) {
    return '0원'
  }
  
  return `${numPrice.toLocaleString('ko-KR')}원`
}

/**
 * 할인가 계산
 */
export function calculateDiscountPrice(originalPrice: string, discount: number): number {
  const price = parseInt(originalPrice, 10)
  return Math.round(price * (1 - discount / 100))
}

/**
 * 할인율 표시
 * @example formatDiscount(16) => "16% 할인"
 */
export function formatDiscount(discount: number): string {
  return `${discount}% 할인`
}

/**
 * 제품 가격 정보 계산
 */
export function getProductPriceInfo(product: Product): {
  currentPrice: number
  originalPrice: number
  discount: number
  discountAmount: number
  formattedCurrentPrice: string
  formattedOriginalPrice: string
  formattedDiscount: string
} {
  const currentPrice = parseInt(product.price, 10)
  const originalPrice = product.originalPrice
    ? parseInt(product.originalPrice, 10)
    : currentPrice
  const discount = product.discount || 0
  const discountAmount = originalPrice - currentPrice

  return {
    currentPrice,
    originalPrice,
    discount,
    discountAmount,
    formattedCurrentPrice: formatPrice(currentPrice),
    formattedOriginalPrice: formatPrice(originalPrice),
    formattedDiscount: formatDiscount(discount),
  }
}

// ============================================================================
// 필터 및 정렬 유틸리티
// ============================================================================

/**
 * 카테고리 필터링
 */
export function filterByCategory(
  products: Product[],
  category: string
): Product[] {
  if (category === 'all' || !category) {
    return products
  }
  return products.filter((p) => p.category === category)
}

/**
 * 학년 필터링
 */
export function filterByGrade(products: Product[], grade: string): Product[] {
  if (grade === 'all' || !grade) {
    return products
  }
  return products.filter((p) => p.targetGrade.includes(grade))
}

/**
 * 가격 범위 필터링
 */
export function filterByPriceRange(
  products: Product[],
  minPrice?: number,
  maxPrice?: number
): Product[] {
  return products.filter((p) => {
    const price = parseInt(p.price, 10)
    if (minPrice !== undefined && price < minPrice) return false
    if (maxPrice !== undefined && price > maxPrice) return false
    return true
  })
}

/**
 * 제품 정렬
 */
export function sortProducts(
  products: Product[],
  sortBy: 'recommended' | 'popular' | 'price-low' | 'price-high' | 'newest'
): Product[] {
  const sorted = [...products]

  switch (sortBy) {
    case 'popular':
      return sorted.sort((a, b) => b.soldCount - a.soldCount)
    case 'price-low':
      return sorted.sort(
        (a, b) => parseInt(a.price, 10) - parseInt(b.price, 10)
      )
    case 'price-high':
      return sorted.sort(
        (a, b) => parseInt(b.price, 10) - parseInt(a.price, 10)
      )
    case 'newest':
      // ID가 최신순이라고 가정 (실제로는 createdAt 필드 사용)
      return sorted.reverse()
    case 'recommended':
    default:
      // 추천순 = 평점 * 판매량 조합
      return sorted.sort((a, b) => {
        const scoreA = a.rating * Math.log(a.soldCount + 1)
        const scoreB = b.rating * Math.log(b.soldCount + 1)
        return scoreB - scoreA
      })
  }
}

/**
 * 복합 필터링 및 정렬
 */
export function filterAndSortProducts(
  products: Product[],
  options: {
    category?: string
    grade?: string
    minPrice?: number
    maxPrice?: number
    sortBy?: 'recommended' | 'popular' | 'price-low' | 'price-high' | 'newest'
  }
): Product[] {
  let filtered = products

  // 필터링
  if (options.category) {
    filtered = filterByCategory(filtered, options.category)
  }
  if (options.grade) {
    filtered = filterByGrade(filtered, options.grade)
  }
  if (options.minPrice !== undefined || options.maxPrice !== undefined) {
    filtered = filterByPriceRange(filtered, options.minPrice, options.maxPrice)
  }

  // 정렬
  if (options.sortBy) {
    filtered = sortProducts(filtered, options.sortBy)
  }

  return filtered
}

// ============================================================================
// 리뷰 관련 유틸리티
// ============================================================================

/**
 * 평점 포맷팅
 * @example formatRating(4.8) => "4.8"
 */
export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

/**
 * 리뷰 수 포맷팅
 * @example formatReviewCount(127) => "127개 리뷰"
 */
export function formatReviewCount(count: number): string {
  return `${count.toLocaleString('ko-KR')}개 리뷰`
}

/**
 * 리뷰 날짜 포맷팅
 * @example formatReviewDate("2024-11-15") => "2024년 11월 15일"
 */
export function formatReviewDate(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}년 ${month}월 ${day}일`
}

/**
 * 평균 평점 계산
 */
export function calculateAverageRating(reviews: ProductReview[]): number {
  if (reviews.length === 0) return 0
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
  return Math.round((sum / reviews.length) * 10) / 10
}

/**
 * 평점 분포 계산
 */
export function calculateRatingDistribution(
  reviews: ProductReview[]
): Record<number, number> {
  const distribution: Record<number, number> = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  }

  reviews.forEach((review) => {
    distribution[review.rating] = (distribution[review.rating] || 0) + 1
  })

  return distribution
}

/**
 * 평점 분포 퍼센트 계산
 */
export function calculateRatingPercentages(
  reviews: ProductReview[]
): Record<number, number> {
  const distribution = calculateRatingDistribution(reviews)
  const total = reviews.length

  if (total === 0) {
    return { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  }

  return {
    5: Math.round((distribution[5] / total) * 100),
    4: Math.round((distribution[4] / total) * 100),
    3: Math.round((distribution[3] / total) * 100),
    2: Math.round((distribution[2] / total) * 100),
    1: Math.round((distribution[1] / total) * 100),
  }
}

// ============================================================================
// 검색 유틸리티
// ============================================================================

/**
 * 제품 검색 (키워드 매칭)
 */
export function searchProducts(products: Product[], query: string): Product[] {
  if (!query || query.trim().length === 0) {
    return products
  }

  const lowercaseQuery = query.toLowerCase().trim()

  return products.filter((product) => {
    return (
      product.title.toLowerCase().includes(lowercaseQuery) ||
      product.shortDescription.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery) ||
      product.badges.some((badge) =>
        badge.toLowerCase().includes(lowercaseQuery)
      ) ||
      product.features.some((feature) =>
        feature.toLowerCase().includes(lowercaseQuery)
      )
    )
  })
}

/**
 * 하이라이트 텍스트 생성 (검색 결과용)
 */
export function highlightSearchText(text: string, query: string): string {
  if (!query) return text

  const regex = new RegExp(`(${query})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}

// ============================================================================
// 뱃지 및 태그 유틸리티
// ============================================================================

/**
 * 뱃지 색상 매핑
 */
export function getBadgeColor(badge: string): string {
  const colorMap: Record<string, string> = {
    Arduino: 'blue',
    IoT: 'green',
    Python: 'yellow',
    AI: 'purple',
    Entry: 'pink',
    Blockly: 'indigo',
    'App Inventor': 'teal',
    Mobile: 'cyan',
    Linux: 'orange',
    Beginner: 'gray',
  }

  return colorMap[badge] || 'gray'
}

// ============================================================================
// 날짜 및 시간 유틸리티
// ============================================================================

/**
 * 상대적 시간 표시 (예: "3일 전")
 */
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) {
    return '오늘'
  } else if (diffInDays === 1) {
    return '어제'
  } else if (diffInDays < 7) {
    return `${diffInDays}일 전`
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7)
    return `${weeks}주 전`
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30)
    return `${months}개월 전`
  } else {
    const years = Math.floor(diffInDays / 365)
    return `${years}년 전`
  }
}

// ============================================================================
// URL 및 라우팅 유틸리티
// ============================================================================

/**
 * 제품 상세 페이지 URL 생성
 */
export function getProductDetailUrl(productId: string): string {
  return `/products/coding-ai/${productId}`
}

/**
 * 카테고리 URL 생성
 */
export function getCategoryUrl(category: string): string {
  return `/products/coding-ai?category=${encodeURIComponent(category)}`
}

// ============================================================================
// 교육적 가치 유틸리티
// ============================================================================

/**
 * 학년 레벨 숫자 변환 (정렬용)
 */
export function getGradeLevel(grade: string): number {
  const gradeMap: Record<string, number> = {
    '초등 저학년': 1,
    '초등 고학년': 2,
    '초등학생': 1.5,
    '초등 전학년': 1.5,
    '중학생': 3,
    '고등학생': 4,
  }

  return gradeMap[grade] || 0
}

/**
 * 수업 차시 숫자 추출
 * @example extractClassHours("8차시") => 8
 */
export function extractClassHours(classTime: string): number {
  const match = classTime.match(/\d+/)
  return match ? parseInt(match[0], 10) : 0
}

/**
 * 그룹 크기 숫자 추출
 * @example extractGroupSize("6-8명") => [6, 8]
 */
export function extractGroupSize(groupSize: string): [number, number] | null {
  const match = groupSize.match(/(\d+)-(\d+)/)
  if (match) {
    return [parseInt(match[1], 10), parseInt(match[2], 10)]
  }

  const singleMatch = groupSize.match(/(\d+)/)
  if (singleMatch) {
    const num = parseInt(singleMatch[1], 10)
    return [num, num]
  }

  return null
}

