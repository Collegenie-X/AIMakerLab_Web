/**
 * Gallery 유틸리티 함수
 * - 공통 로직 및 헬퍼 함수
 */

import type { GalleryItem, WorkItem, ReviewItem, GalleryType, isWorkItem, isReviewItem } from './types'

// ============================================================================
// 카테고리 관련
// ============================================================================

/**
 * 갤러리 아이템에서 카테고리 목록 추출
 */
export function extractCategories(items: GalleryItem[]): string[] {
  const categories = Array.from(new Set(items.map((item) => item.category)))
  return categories.sort()
}

/**
 * 카테고리별 기본 이미지 매핑
 */
export function getDefaultImage(category: string): string {
  const defaultImages: Record<string, string> = {
    IoT: '/gallery/images/smart-home-iot-device.jpg',
    '앱 개발': '/gallery/images/mobile-app-interface.png',
    '로보틱스': '/gallery/images/student-robot-project.jpg',
    AI: '/gallery/images/ai-neural-network.png',
    '앱 인벤터': '/gallery/images/app-inventor-coding-blocks.jpg',
    '아두이노': '/gallery/images/arduino-electronics-circuit.jpg',
    '라즈베리파이': '/gallery/images/raspberry-pi-computer-iot.jpg',
    'AI 교육': '/gallery/images/ai-neural-network.png',
    '주중 강의': '/gallery/images/app-inventor-coding-blocks.jpg',
    '주말 강의': '/gallery/images/student-robot-project.jpg',
    '출장 강의': '/gallery/images/ai-neural-network.png',
  }
  return defaultImages[category] || '/coding-project.png'
}

// ============================================================================
// 정렬 관련
// ============================================================================

/**
 * 갤러리 아이템 정렬
 */
export function sortGalleryItems(
  items: GalleryItem[],
  sortBy: 'latest' | 'popular' | 'views'
): GalleryItem[] {
  const sorted = [...items]

  switch (sortBy) {
    case 'latest':
      // 날짜순 (최신순)
      return sorted.sort((a, b) => {
        const dateA = new Date(a.date.replace(/\./g, '-'))
        const dateB = new Date(b.date.replace(/\./g, '-'))
        return dateB.getTime() - dateA.getTime()
      })

    case 'popular':
      // 좋아요순
      return sorted.sort((a, b) => b.likes - a.likes)

    case 'views':
      // 조회수순
      return sorted.sort((a, b) => b.views - a.views)

    default:
      return sorted
  }
}

// ============================================================================
// 필터링 관련
// ============================================================================

/**
 * 카테고리로 필터링
 */
export function filterByCategory(items: GalleryItem[], category: string): GalleryItem[] {
  if (!category || category === 'all') {
    return items
  }
  return items.filter((item) => item.category === category)
}

/**
 * 검색어로 필터링
 */
export function filterBySearch(items: GalleryItem[], query: string): GalleryItem[] {
  if (!query || query.trim() === '') {
    return items
  }

  const lowercaseQuery = query.toLowerCase().trim()

  return items.filter((item) => {
    return (
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.description.toLowerCase().includes(lowercaseQuery) ||
      item.details.toLowerCase().includes(lowercaseQuery) ||
      item.category.toLowerCase().includes(lowercaseQuery) ||
      item.author.toLowerCase().includes(lowercaseQuery) ||
      item.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
    )
  })
}

// ============================================================================
// 포맷팅 관련
// ============================================================================

/**
 * 숫자를 K, M 단위로 포맷팅
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }
  return num.toString()
}

/**
 * 날짜 포맷팅
 */
export function formatDate(dateString: string): string {
  // "2025.02.15" 형식을 "2025년 2월 15일"로 변환
  const parts = dateString.split('.')
  if (parts.length !== 3) return dateString

  const [year, month, day] = parts
  return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`
}

/**
 * 상대 시간 포맷팅 (예: "3일 전")
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString.replace(/\./g, '-'))
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return '오늘'
  if (diffDays === 1) return '어제'
  if (diffDays < 7) return `${diffDays}일 전`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}주 전`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}개월 전`
  return `${Math.floor(diffDays / 365)}년 전`
}

// ============================================================================
// 로컬 스토리지 관련
// ============================================================================

/**
 * 좋아요 상태 확인
 */
export function isItemLiked(type: GalleryType, itemId: number): boolean {
  if (typeof window === 'undefined') return false

  const storageKey = `gallery_likes_${type}`
  const likedItems = JSON.parse(localStorage.getItem(storageKey) || '[]') as number[]
  return likedItems.includes(itemId)
}

/**
 * 조회 이력 확인
 */
export function isItemViewed(type: GalleryType, itemId: number): boolean {
  if (typeof window === 'undefined') return false

  const storageKey = `gallery_views_${type}`
  const viewedItems = JSON.parse(localStorage.getItem(storageKey) || '[]') as number[]
  return viewedItems.includes(itemId)
}

// ============================================================================
// 통계 관련
// ============================================================================

/**
 * 평균 평점 계산 (후기용)
 */
export function calculateAverageRating(items: GalleryItem[]): number {
  const itemsWithRating = items.filter((item) => item.rating !== undefined)
  
  if (itemsWithRating.length === 0) return 0

  const sum = itemsWithRating.reduce((acc, item) => acc + (item.rating || 0), 0)
  return Math.round((sum / itemsWithRating.length) * 10) / 10
}

/**
 * 평점 분포 계산 (후기용)
 */
export function calculateRatingDistribution(items: GalleryItem[]): Record<number, number> {
  const distribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }

  items.forEach((item) => {
    if (item.rating) {
      distribution[item.rating] = (distribution[item.rating] || 0) + 1
    }
  })

  return distribution
}

