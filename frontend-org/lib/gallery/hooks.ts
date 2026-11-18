/**
 * Gallery ReactQuery Hooks
 * - 1분 캐시 설정 (사용자 요구사항)
 * - CRUD 작업 시 즉시 반영
 */

'use client'

import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
  type UseMutationOptions,
} from '@tanstack/react-query'
import type {
  GalleryItem,
  GalleryConfig,
  GalleryType,
  GalleryResponse,
  UpdateStatsResponse,
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
export const galleryKeys = {
  all: ['gallery'] as const,
  lists: (type: GalleryType) => [...galleryKeys.all, type, 'list'] as const,
  list: (type: GalleryType, filters?: Record<string, unknown>) =>
    [...galleryKeys.lists(type), filters] as const,
  details: (type: GalleryType) => [...galleryKeys.all, type, 'detail'] as const,
  detail: (type: GalleryType, id: number) => [...galleryKeys.details(type), id] as const,
  config: (type: GalleryType) => [...galleryKeys.all, type, 'config'] as const,
  page: (type: GalleryType) => [...galleryKeys.all, type, 'page'] as const,
  search: (type: GalleryType, query: string) => [...galleryKeys.all, type, 'search', query] as const,
}

// ============================================================================
// Query Options (1분 캐시 - 사용자 요구사항)
// ============================================================================

/**
 * 기본 Query 옵션
 * - staleTime: 1분 (60초) - 데이터가 stale 상태가 되기 전 시간
 * - gcTime: 5분 (300초) - 캐시 메모리 유지 시간
 * - retry: 1 - 실패시 1번만 재시도
 * - refetchOnWindowFocus: false - 윈도우 포커스시 재fetch 안함
 */
const DEFAULT_QUERY_OPTIONS = {
  staleTime: 1 * 60 * 1000, // 1분
  gcTime: 5 * 60 * 1000, // 5분
  retry: 1,
  refetchOnWindowFocus: false,
} as const

// ============================================================================
// Gallery Items Hooks
// ============================================================================

/**
 * 갤러리 아이템 목록 조회
 */
export function useGalleryItems(
  type: GalleryType,
  options?: Omit<UseQueryOptions<GalleryItem[], ApiError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: galleryKeys.lists(type),
    queryFn: () => api.fetchGalleryItems(type),
    ...DEFAULT_QUERY_OPTIONS,
    ...options,
  })
}

/**
 * 특정 갤러리 아이템 조회
 */
export function useGalleryItem(
  type: GalleryType,
  itemId: number,
  options?: Omit<UseQueryOptions<GalleryItem | null, ApiError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: galleryKeys.detail(type, itemId),
    queryFn: () => api.fetchGalleryItemById(type, itemId),
    ...DEFAULT_QUERY_OPTIONS,
    enabled: !!itemId, // itemId가 있을 때만 실행
    ...options,
  })
}

/**
 * 카테고리별 갤러리 아이템 조회
 */
export function useGalleryItemsByCategory(
  type: GalleryType,
  category: string,
  options?: Omit<UseQueryOptions<GalleryItem[], ApiError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: galleryKeys.list(type, { category }),
    queryFn: () => api.fetchGalleryItemsByCategory(type, category),
    ...DEFAULT_QUERY_OPTIONS,
    ...options,
  })
}

// ============================================================================
// Gallery Config Hooks
// ============================================================================

/**
 * 갤러리 설정 조회
 */
export function useGalleryConfig(
  type: GalleryType,
  options?: Omit<UseQueryOptions<GalleryConfig, ApiError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: galleryKeys.config(type),
    queryFn: () => api.fetchGalleryConfig(type),
    ...DEFAULT_QUERY_OPTIONS,
    ...options,
  })
}

// ============================================================================
// Gallery Page Hooks
// ============================================================================

/**
 * 갤러리 페이지 통합 데이터 조회
 * - 아이템 + 설정을 한번에 로드
 */
export function useGalleryPage(
  type: GalleryType,
  options?: Omit<UseQueryOptions<GalleryResponse, ApiError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: galleryKeys.page(type),
    queryFn: () => api.fetchGalleryPage(type),
    ...DEFAULT_QUERY_OPTIONS,
    ...options,
  })
}

// ============================================================================
// Search Hooks
// ============================================================================

/**
 * 갤러리 아이템 검색
 */
export function useGallerySearch(
  type: GalleryType,
  query: string,
  options?: Omit<UseQueryOptions<GalleryItem[], ApiError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: galleryKeys.search(type, query),
    queryFn: () => api.searchGalleryItems(type, query),
    ...DEFAULT_QUERY_OPTIONS,
    enabled: query.length >= 2, // 최소 2글자 이상일 때만 검색
    ...options,
  })
}

// ============================================================================
// Mutation Hooks (CRUD - 즉시 반영)
// ============================================================================

/**
 * 좋아요 토글 Mutation
 * - 성공 시 캐시 즉시 업데이트 (Optimistic Update)
 */
export function useToggleLike(
  type: GalleryType,
  options?: UseMutationOptions<UpdateStatsResponse, ApiError, number>
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (itemId: number) => api.toggleLike(type, itemId),
    // Optimistic Update
    onMutate: async (itemId) => {
      // 진행 중인 refetch 취소
      await queryClient.cancelQueries({ queryKey: galleryKeys.lists(type) })
      await queryClient.cancelQueries({ queryKey: galleryKeys.detail(type, itemId) })

      // 이전 데이터 스냅샷
      const previousItems = queryClient.getQueryData<GalleryItem[]>(galleryKeys.lists(type))
      const previousItem = queryClient.getQueryData<GalleryItem>(galleryKeys.detail(type, itemId))

      // 좋아요 상태 확인
      const isLiked = api.checkLikeStatus(type, itemId)

      // Optimistic Update - 리스트
      if (previousItems) {
        queryClient.setQueryData<GalleryItem[]>(
          galleryKeys.lists(type),
          previousItems.map((item) =>
            item.id === itemId
              ? { ...item, likes: isLiked ? item.likes - 1 : item.likes + 1 }
              : item
          )
        )
      }

      // Optimistic Update - 상세
      if (previousItem) {
        queryClient.setQueryData<GalleryItem>(galleryKeys.detail(type, itemId), {
          ...previousItem,
          likes: isLiked ? previousItem.likes - 1 : previousItem.likes + 1,
        })
      }

      return { previousItems, previousItem }
    },
    // 에러 발생 시 롤백
    onError: (error, itemId, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(galleryKeys.lists(type), context.previousItems)
      }
      if (context?.previousItem) {
        queryClient.setQueryData(galleryKeys.detail(type, itemId), context.previousItem)
      }
    },
    // 성공 시 최신 데이터로 갱신
    onSuccess: (data, itemId) => {
      queryClient.setQueryData(galleryKeys.detail(type, itemId), data.item)
      queryClient.invalidateQueries({ queryKey: galleryKeys.lists(type) })
    },
    ...options,
  })
}

/**
 * 조회수 증가 Mutation
 * - 성공 시 캐시 즉시 업데이트
 */
export function useIncrementViews(
  type: GalleryType,
  options?: UseMutationOptions<UpdateStatsResponse, ApiError, number>
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (itemId: number) => api.incrementViews(type, itemId),
    onSuccess: (data, itemId) => {
      // 상세 데이터 업데이트
      queryClient.setQueryData(galleryKeys.detail(type, itemId), data.item)
      
      // 리스트 데이터 업데이트
      const previousItems = queryClient.getQueryData<GalleryItem[]>(galleryKeys.lists(type))
      if (previousItems) {
        queryClient.setQueryData<GalleryItem[]>(
          galleryKeys.lists(type),
          previousItems.map((item) => (item.id === itemId ? data.item : item))
        )
      }
    },
    ...options,
  })
}

// ============================================================================
// CRUD Mutation Hooks (작품/후기 생성, 수정, 삭제)
// ============================================================================

/**
 * 갤러리 아이템 생성 Mutation
 * - 성공 시 캐시에 즉시 추가
 */
export function useCreateGalleryItem(
  type: GalleryType,
  options?: UseMutationOptions<
    GalleryItem,
    ApiError,
    Omit<GalleryItem, 'id' | 'views' | 'likes' | 'date'>
  >
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newItem) => api.createGalleryItem(type, newItem),
    onSuccess: (data) => {
      // 리스트 캐시에 새 아이템 추가
      queryClient.setQueryData<GalleryItem[]>(galleryKeys.lists(type), (old) => {
        if (!old) return [data]
        return [data, ...old]
      })
      
      // 캐시 무효화 (최신 데이터 재요청)
      queryClient.invalidateQueries({ queryKey: galleryKeys.lists(type) })
    },
    ...options,
  })
}

/**
 * 갤러리 아이템 수정 Mutation
 * - 성공 시 캐시 즉시 업데이트
 */
export function useUpdateGalleryItem(
  type: GalleryType,
  options?: UseMutationOptions<
    GalleryItem,
    ApiError,
    { itemId: number; updates: Partial<GalleryItem> }
  >
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ itemId, updates }) => api.updateGalleryItem(type, itemId, updates),
    onSuccess: (data, { itemId }) => {
      // 상세 캐시 업데이트
      queryClient.setQueryData(galleryKeys.detail(type, itemId), data)
      
      // 리스트 캐시 업데이트
      queryClient.setQueryData<GalleryItem[]>(galleryKeys.lists(type), (old) => {
        if (!old) return [data]
        return old.map((item) => (item.id === itemId ? data : item))
      })
    },
    ...options,
  })
}

/**
 * 갤러리 아이템 삭제 Mutation
 * - 성공 시 캐시에서 즉시 제거
 */
export function useDeleteGalleryItem(
  type: GalleryType,
  options?: UseMutationOptions<
    { success: boolean; itemId: number },
    ApiError,
    number
  >
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (itemId) => api.deleteGalleryItem(type, itemId),
    onSuccess: (data, itemId) => {
      // 상세 캐시 제거
      queryClient.removeQueries({ queryKey: galleryKeys.detail(type, itemId) })
      
      // 리스트 캐시에서 제거
      queryClient.setQueryData<GalleryItem[]>(galleryKeys.lists(type), (old) => {
        if (!old) return []
        return old.filter((item) => item.id !== itemId)
      })
    },
    ...options,
  })
}

/**
 * 사용자가 작성한 갤러리 아이템 조회
 */
export function useUserGalleryItems(
  type: GalleryType,
  options?: Omit<UseQueryOptions<GalleryItem[], ApiError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: [...galleryKeys.all, type, 'user'] as const,
    queryFn: () => api.fetchUserGalleryItems(type),
    ...DEFAULT_QUERY_OPTIONS,
    ...options,
  })
}

