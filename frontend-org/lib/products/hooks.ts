/**
 * 제품(Products) ReactQuery Hooks
 * - 5분 캐시 설정
 * - 자동 재검증 및 에러 처리
 */

'use client'

import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import type {
  Product,
  ProductDetail,
  ProductReview,
  RelatedClass,
  ClassroomPhoto,
  ProductDetailResponse,
  ApiError,
} from './types'
import * as api from './api'

// ============================================================================
// Query Keys
// ============================================================================

/**
 * Query Key Factory
 * - 일관된 키 관리로 캐시 무효화 및 프리페칭 용이
 */
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) =>
    [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
  reviews: (id: string) => [...productKeys.all, 'reviews', id] as const,
  reviewStats: (id: string) => [...productKeys.all, 'reviewStats', id] as const,
  relatedClasses: (category?: string) =>
    [...productKeys.all, 'relatedClasses', category] as const,
  classroomPhotos: (id: string) =>
    [...productKeys.all, 'classroomPhotos', id] as const,
  detailPage: (id: string) => [...productKeys.all, 'detailPage', id] as const,
  search: (query: string) => [...productKeys.all, 'search', query] as const,
}

// ============================================================================
// Query Options (5분 캐시)
// ============================================================================

/**
 * 기본 Query 옵션
 * - staleTime: 5분 (300초) - 데이터가 stale 상태가 되기 전 시간
 * - gcTime: 10분 (600초) - 캐시 메모리 유지 시간
 * - retry: 1 - 실패시 1번만 재시도
 * - refetchOnWindowFocus: false - 윈도우 포커스시 재fetch 안함
 */
const DEFAULT_QUERY_OPTIONS = {
  staleTime: 5 * 60 * 1000, // 5분
  gcTime: 10 * 60 * 1000, // 10분 (기존 cacheTime)
  retry: 1,
  refetchOnWindowFocus: false,
} as const

// ============================================================================
// Products Hooks
// ============================================================================

/**
 * 전체 제품 목록 조회
 */
export function useProducts(options?: Omit<UseQueryOptions<Product[], ApiError>, 'queryKey' | 'queryFn'>) {
  return useQuery({
    queryKey: productKeys.lists(),
    queryFn: () => api.fetchProducts(),
    ...DEFAULT_QUERY_OPTIONS,
    ...options,
  })
}

/**
 * 특정 제품 조회
 */
export function useProduct(
  productId: string,
  options?: Omit<UseQueryOptions<Product | null, ApiError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: productKeys.detail(productId),
    queryFn: () => api.fetchProductById(productId),
    ...DEFAULT_QUERY_OPTIONS,
    enabled: !!productId, // productId가 있을 때만 실행
    ...options,
  })
}

/**
 * 카테고리별 제품 조회
 */
export function useProductsByCategory(
  category: string,
  options?: Omit<UseQueryOptions<Product[], ApiError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: productKeys.list({ category }),
    queryFn: () => api.fetchProductsByCategory(category),
    ...DEFAULT_QUERY_OPTIONS,
    ...options,
  })
}

// ============================================================================
// Product Detail Hooks
// ============================================================================

/**
 * 제품 상세 정보 조회
 */
export function useProductDetail(
  productId: string,
  options?: Omit<UseQueryOptions<ProductDetail, ApiError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: productKeys.detail(productId),
    queryFn: () => api.fetchProductDetail(productId),
    ...DEFAULT_QUERY_OPTIONS,
    enabled: !!productId,
    ...options,
  })
}

/**
 * 제품 상세 페이지 통합 데이터 조회
 * - 제품, 리뷰, 관련 수업, 수업 사진을 한번에 로드
 */
export function useProductDetailPage(
  productId: string,
  options?: Omit<UseQueryOptions<ProductDetailResponse, ApiError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: productKeys.detailPage(productId),
    queryFn: () => api.fetchProductDetailPage(productId),
    ...DEFAULT_QUERY_OPTIONS,
    enabled: !!productId,
    ...options,
  })
}

// ============================================================================
// Reviews Hooks
// ============================================================================

/**
 * 제품 리뷰 조회
 */
export function useProductReviews(
  productId: string,
  options?: Omit<UseQueryOptions<ProductReview[], ApiError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: productKeys.reviews(productId),
    queryFn: () => api.fetchProductReviews(productId),
    ...DEFAULT_QUERY_OPTIONS,
    enabled: !!productId,
    ...options,
  })
}

/**
 * 리뷰 통계 조회
 */
export function useReviewStats(
  productId: string,
  options?: Omit<
    UseQueryOptions<
      {
        averageRating: number
        totalReviews: number
        ratingDistribution: Record<number, number>
      },
      ApiError
    >,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: productKeys.reviewStats(productId),
    queryFn: () => api.fetchReviewStats(productId),
    ...DEFAULT_QUERY_OPTIONS,
    enabled: !!productId,
    ...options,
  })
}

// ============================================================================
// Related Classes Hooks
// ============================================================================

/**
 * 관련 수업 조회
 */
export function useRelatedClasses(
  category?: string,
  options?: Omit<UseQueryOptions<RelatedClass[], ApiError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: productKeys.relatedClasses(category),
    queryFn: () => api.fetchRelatedClasses(category),
    ...DEFAULT_QUERY_OPTIONS,
    ...options,
  })
}

// ============================================================================
// Classroom Photos Hooks
// ============================================================================

/**
 * 수업 현장 사진 조회
 */
export function useClassroomPhotos(
  productId: string,
  options?: Omit<UseQueryOptions<ClassroomPhoto[], ApiError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: productKeys.classroomPhotos(productId),
    queryFn: () => api.fetchClassroomPhotos(productId),
    ...DEFAULT_QUERY_OPTIONS,
    enabled: !!productId,
    ...options,
  })
}

// ============================================================================
// Search Hooks
// ============================================================================

/**
 * 제품 검색
 */
export function useProductSearch(
  query: string,
  options?: Omit<UseQueryOptions<Product[], ApiError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: productKeys.search(query),
    queryFn: () => api.searchProducts(query),
    ...DEFAULT_QUERY_OPTIONS,
    enabled: query.length >= 2, // 최소 2글자 이상일 때만 검색
    ...options,
  })
}

