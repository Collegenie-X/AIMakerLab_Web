/**
 * 제품(Products) API 함수
 * - JSON 파일 기반 데이터 로딩 (추후 Backend API로 전환 가능)
 * - 모든 비동기 데이터 요청 로직을 중앙화합니다
 */

import type {
  Product,
  ProductDetail,
  ProductReview,
  RelatedClass,
  ClassroomPhoto,
  ProductsResponse,
  ProductDetailResponse,
  ApiError,
} from './types'

// ============================================================================
// 설정
// ============================================================================

/**
 * JSON 파일 경로 설정
 * - 추후 환경 변수로 관리 가능
 */
const API_BASE_PATH = '/products'

const API_ENDPOINTS = {
  products: `${API_BASE_PATH}/products.json`,
  productDetail: (id: string) => `${API_BASE_PATH}/details/${id}.json`,
  reviews: `${API_BASE_PATH}/product-reviews.json`,
  relatedClasses: `${API_BASE_PATH}/related-classes.json`,
  classroomPhotos: `${API_BASE_PATH}/classroom-photos.json`,
} as const

// ============================================================================
// 유틸리티 함수
// ============================================================================

/**
 * JSON 파일 fetch 헬퍼 함수
 */
async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    next: { revalidate: 300 }, // 5분 캐시 (Next.js App Router)
  })

  if (!response.ok) {
    const error: ApiError = {
      message: `데이터를 불러오는데 실패했습니다: ${response.status}`,
      code: `HTTP_${response.status}`,
    }
    throw error
  }

  return response.json()
}

/**
 * 에러 핸들링 헬퍼 함수
 */
function handleApiError(error: unknown): ApiError {
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return error as ApiError
  }
  
  return {
    message: '알 수 없는 오류가 발생했습니다',
    details: error,
  }
}

// ============================================================================
// 제품 목록 API
// ============================================================================

/**
 * 전체 제품 목록 조회
 */
export async function fetchProducts(): Promise<Product[]> {
  try {
    const products = await fetchJson<Product[]>(API_ENDPOINTS.products)
    return products
  } catch (error) {
    console.error('[API Error] fetchProducts:', error)
    throw handleApiError(error)
  }
}

/**
 * 특정 제품 조회 (ID 기반)
 */
export async function fetchProductById(productId: string): Promise<Product | null> {
  try {
    const products = await fetchJson<Product[]>(API_ENDPOINTS.products)
    const product = products.find((p) => p.id === productId)
    
    if (!product) {
      const error: ApiError = {
        message: `제품을 찾을 수 없습니다: ${productId}`,
        code: 'PRODUCT_NOT_FOUND',
      }
      throw error
    }
    
    return product
  } catch (error) {
    console.error('[API Error] fetchProductById:', error)
    throw handleApiError(error)
  }
}

/**
 * 카테고리별 제품 필터링
 */
export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  try {
    const products = await fetchProducts()
    
    if (category === 'all' || !category) {
      return products
    }
    
    return products.filter((p) => p.category === category)
  } catch (error) {
    console.error('[API Error] fetchProductsByCategory:', error)
    throw handleApiError(error)
  }
}

// ============================================================================
// 제품 상세 정보 API
// ============================================================================

/**
 * 제품 상세 정보 조회 (개별 details 파일)
 */
export async function fetchProductDetail(productId: string): Promise<ProductDetail> {
  try {
    // 기본 제품 정보
    const product = await fetchProductById(productId)
    
    if (!product) {
      throw new Error(`제품을 찾을 수 없습니다: ${productId}`)
    }
    
    // 상세 정보 (개별 JSON 파일)
    let detail: Partial<ProductDetail> = {}
    
    try {
      detail = await fetchJson<Partial<ProductDetail>>(
        API_ENDPOINTS.productDetail(productId)
      )
    } catch (error) {
      // 상세 정보 파일이 없는 경우 기본 제품 정보만 반환
      console.warn(`[API Warning] 제품 상세 정보 파일을 찾을 수 없습니다: ${productId}`, error)
    }
    
    // 병합
    return {
      ...product,
      ...detail,
    } as ProductDetail
  } catch (error) {
    console.error('[API Error] fetchProductDetail:', error)
    throw handleApiError(error)
  }
}

// ============================================================================
// 리뷰 API
// ============================================================================

/**
 * 제품 리뷰 조회
 */
export async function fetchProductReviews(productId: string): Promise<ProductReview[]> {
  try {
    const allReviews = await fetchJson<ProductReview[]>(API_ENDPOINTS.reviews)
    return allReviews.filter((review) => review.productId === productId)
  } catch (error) {
    console.error('[API Error] fetchProductReviews:', error)
    throw handleApiError(error)
  }
}

/**
 * 리뷰 통계 계산
 */
export async function fetchReviewStats(productId: string): Promise<{
  averageRating: number
  totalReviews: number
  ratingDistribution: Record<number, number>
}> {
  try {
    const reviews = await fetchProductReviews(productId)
    
    const totalReviews = reviews.length
    const averageRating =
      totalReviews > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
        : 0
    
    const ratingDistribution: Record<number, number> = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    }
    
    reviews.forEach((review) => {
      ratingDistribution[review.rating] = (ratingDistribution[review.rating] || 0) + 1
    })
    
    return {
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews,
      ratingDistribution,
    }
  } catch (error) {
    console.error('[API Error] fetchReviewStats:', error)
    throw handleApiError(error)
  }
}

// ============================================================================
// 관련 수업 API
// ============================================================================

/**
 * 관련 수업 조회
 */
export async function fetchRelatedClasses(category?: string): Promise<RelatedClass[]> {
  try {
    const allClasses = await fetchJson<RelatedClass[]>(API_ENDPOINTS.relatedClasses)
    
    if (!category || category === 'all') {
      return allClasses
    }
    
    return allClasses.filter((c) => c.category === category)
  } catch (error) {
    console.error('[API Error] fetchRelatedClasses:', error)
    throw handleApiError(error)
  }
}

// ============================================================================
// 수업 현장 사진 API
// ============================================================================

/**
 * 수업 현장 사진 조회
 */
export async function fetchClassroomPhotos(productId: string): Promise<ClassroomPhoto[]> {
  try {
    const allPhotos = await fetchJson<ClassroomPhoto[]>(API_ENDPOINTS.classroomPhotos)
    return allPhotos.filter((photo) => photo.productId === productId)
  } catch (error) {
    console.error('[API Error] fetchClassroomPhotos:', error)
    throw handleApiError(error)
  }
}

// ============================================================================
// 통합 API (상세 페이지용)
// ============================================================================

/**
 * 제품 상세 페이지에 필요한 모든 데이터 한번에 조회
 */
export async function fetchProductDetailPage(
  productId: string
): Promise<ProductDetailResponse> {
  try {
    // 병렬로 모든 데이터 fetch
    const [product, reviews, classroomPhotos] = await Promise.all([
      fetchProductDetail(productId),
      fetchProductReviews(productId),
      fetchClassroomPhotos(productId),
    ])
    
    // 카테고리 기반 관련 수업 조회
    const relatedClasses = await fetchRelatedClasses(product.category)
    
    return {
      product,
      reviews,
      relatedClasses,
      classroomPhotos,
    }
  } catch (error) {
    console.error('[API Error] fetchProductDetailPage:', error)
    throw handleApiError(error)
  }
}

// ============================================================================
// 검색 API
// ============================================================================

/**
 * 제품 검색
 */
export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const products = await fetchProducts()
    const lowercaseQuery = query.toLowerCase()
    
    return products.filter((product) => {
      return (
        product.title.toLowerCase().includes(lowercaseQuery) ||
        product.shortDescription.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery) ||
        product.badges.some((badge) => badge.toLowerCase().includes(lowercaseQuery))
      )
    })
  } catch (error) {
    console.error('[API Error] searchProducts:', error)
    throw handleApiError(error)
  }
}

