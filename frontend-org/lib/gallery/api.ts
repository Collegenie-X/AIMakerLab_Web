/**
 * Gallery API 함수
 * - JSON 파일 기반 데이터 로딩 (추후 Backend API로 전환 가능)
 * - 모든 비동기 데이터 요청 로직을 중앙화합니다
 */

import type {
  GalleryItem,
  WorkItem,
  ReviewItem,
  GalleryConfig,
  GalleryType,
  GalleryResponse,
  UpdateStatsRequest,
  UpdateStatsResponse,
  ApiError,
} from './types'

// ============================================================================
// 설정
// ============================================================================

/**
 * JSON 파일 경로 설정
 */
const API_BASE_PATH = '/gallery'

const API_ENDPOINTS = {
  works: `${API_BASE_PATH}/works.json`,
  reviews: `${API_BASE_PATH}/reviews.json`,
  worksConfig: `${API_BASE_PATH}/works-config.json`,
  reviewsConfig: `${API_BASE_PATH}/reviews-config.json`,
} as const

// ============================================================================
// 유틸리티 함수
// ============================================================================

/**
 * JSON 파일 fetch 헬퍼 함수
 * - 1분 캐시 (사용자 요구사항)
 */
async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    next: { revalidate: 60 }, // 1분 캐시
    cache: 'no-store', // 항상 최신 데이터
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
// 갤러리 아이템 API
// ============================================================================

/**
 * 갤러리 아이템 목록 조회
 */
export async function fetchGalleryItems(type: GalleryType): Promise<GalleryItem[]> {
  try {
    const endpoint = type === 'works' ? API_ENDPOINTS.works : API_ENDPOINTS.reviews
    
    if (type === 'works') {
      const items = await fetchJson<WorkItem[]>(endpoint)
      return items
    } else {
      const items = await fetchJson<ReviewItem[]>(endpoint)
      return items
    }
  } catch (error) {
    console.error(`[API Error] fetchGalleryItems(${type}):`, error)
    throw handleApiError(error)
  }
}

/**
 * 특정 갤러리 아이템 조회 (ID 기반)
 */
export async function fetchGalleryItemById(
  type: GalleryType,
  itemId: number
): Promise<GalleryItem | null> {
  try {
    const items = await fetchGalleryItems(type)
    const item = items.find((i) => i.id === itemId)
    
    if (!item) {
      const error: ApiError = {
        message: `아이템을 찾을 수 없습니다: ${itemId}`,
        code: 'ITEM_NOT_FOUND',
      }
      throw error
    }
    
    return item
  } catch (error) {
    console.error(`[API Error] fetchGalleryItemById(${type}, ${itemId}):`, error)
    throw handleApiError(error)
  }
}

/**
 * 카테고리별 갤러리 아이템 필터링
 */
export async function fetchGalleryItemsByCategory(
  type: GalleryType,
  category: string
): Promise<GalleryItem[]> {
  try {
    const items = await fetchGalleryItems(type)
    
    if (category === 'all' || !category) {
      return items
    }
    
    return items.filter((item) => item.category === category)
  } catch (error) {
    console.error(`[API Error] fetchGalleryItemsByCategory(${type}, ${category}):`, error)
    throw handleApiError(error)
  }
}

// ============================================================================
// 갤러리 설정 API
// ============================================================================

/**
 * 갤러리 설정 조회
 */
export async function fetchGalleryConfig(type: GalleryType): Promise<GalleryConfig> {
  try {
    const endpoint = type === 'works' ? API_ENDPOINTS.worksConfig : API_ENDPOINTS.reviewsConfig
    const config = await fetchJson<GalleryConfig>(endpoint)
    return config
  } catch (error) {
    console.error(`[API Error] fetchGalleryConfig(${type}):`, error)
    throw handleApiError(error)
  }
}

// ============================================================================
// 통합 API
// ============================================================================

/**
 * 갤러리 페이지에 필요한 모든 데이터 한번에 조회
 */
export async function fetchGalleryPage(type: GalleryType): Promise<GalleryResponse> {
  try {
    // 병렬로 아이템과 설정 fetch
    const [items, config] = await Promise.all([
      fetchGalleryItems(type),
      fetchGalleryConfig(type),
    ])
    
    return {
      items,
      config,
    }
  } catch (error) {
    console.error(`[API Error] fetchGalleryPage(${type}):`, error)
    throw handleApiError(error)
  }
}

// ============================================================================
// 검색 API
// ============================================================================

/**
 * 갤러리 아이템 검색
 */
export async function searchGalleryItems(
  type: GalleryType,
  query: string
): Promise<GalleryItem[]> {
  try {
    const items = await fetchGalleryItems(type)
    const lowercaseQuery = query.toLowerCase()
    
    return items.filter((item) => {
      // 공통 필드 검색
      const commonMatch = 
        item.title.toLowerCase().includes(lowercaseQuery) ||
        item.category.toLowerCase().includes(lowercaseQuery) ||
        item.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
      
      // 타입별 필드 검색
      if (item.type === 'work') {
        return commonMatch ||
          item.description.toLowerCase().includes(lowercaseQuery) ||
          item.projectDetails.toLowerCase().includes(lowercaseQuery)
      } else {
        return commonMatch ||
          item.summary.toLowerCase().includes(lowercaseQuery) ||
          item.reviewContent.toLowerCase().includes(lowercaseQuery)
      }
    })
  } catch (error) {
    console.error(`[API Error] searchGalleryItems(${type}, ${query}):`, error)
    throw handleApiError(error)
  }
}

// ============================================================================
// CRUD API (좋아요, 조회수)
// ============================================================================

/**
 * 좋아요 토글
 * - 실제로는 backend에 요청하겠지만, 현재는 로컬 스토리지 활용
 */
export async function toggleLike(
  type: GalleryType,
  itemId: number
): Promise<UpdateStatsResponse> {
  try {
    // 로컬 스토리지에서 좋아요 상태 확인
    const storageKey = `gallery_likes_${type}`
    const likedItems = JSON.parse(localStorage.getItem(storageKey) || '[]') as number[]
    
    const isLiked = likedItems.includes(itemId)
    
    // 좋아요 토글
    let updatedLikes: number[]
    if (isLiked) {
      updatedLikes = likedItems.filter((id) => id !== itemId)
    } else {
      updatedLikes = [...likedItems, itemId]
    }
    
    localStorage.setItem(storageKey, JSON.stringify(updatedLikes))
    
    // 아이템 조회 (업데이트된 좋아요 수 반영)
    const item = await fetchGalleryItemById(type, itemId)
    
    if (!item) {
      throw new Error('아이템을 찾을 수 없습니다')
    }
    
    // 좋아요 수 업데이트 (실제로는 서버에서 처리)
    const updatedItem: GalleryItem = {
      ...item,
      likes: isLiked ? item.likes - 1 : item.likes + 1,
    }
    
    return {
      success: true,
      item: updatedItem,
    }
  } catch (error) {
    console.error(`[API Error] toggleLike(${type}, ${itemId}):`, error)
    throw handleApiError(error)
  }
}

/**
 * 조회수 증가
 * - 실제로는 backend에 요청
 */
export async function incrementViews(
  type: GalleryType,
  itemId: number
): Promise<UpdateStatsResponse> {
  try {
    // 로컬 스토리지에서 조회 이력 확인 (중복 방지)
    const storageKey = `gallery_views_${type}`
    const viewedItems = JSON.parse(localStorage.getItem(storageKey) || '[]') as number[]
    
    const alreadyViewed = viewedItems.includes(itemId)
    
    // 아이템 조회
    const item = await fetchGalleryItemById(type, itemId)
    
    if (!item) {
      throw new Error('아이템을 찾을 수 없습니다')
    }
    
    // 이미 조회한 경우 조회수 증가 안함
    if (alreadyViewed) {
      return {
        success: true,
        item,
      }
    }
    
    // 조회 이력 저장
    const updatedViews = [...viewedItems, itemId]
    localStorage.setItem(storageKey, JSON.stringify(updatedViews))
    
    // 조회수 증가 (실제로는 서버에서 처리)
    const updatedItem: GalleryItem = {
      ...item,
      views: item.views + 1,
    }
    
    return {
      success: true,
      item: updatedItem,
    }
  } catch (error) {
    console.error(`[API Error] incrementViews(${type}, ${itemId}):`, error)
    throw handleApiError(error)
  }
}

/**
 * 좋아요 상태 확인
 */
export function checkLikeStatus(type: GalleryType, itemId: number): boolean {
  if (typeof window === 'undefined') return false
  
  const storageKey = `gallery_likes_${type}`
  const likedItems = JSON.parse(localStorage.getItem(storageKey) || '[]') as number[]
  return likedItems.includes(itemId)
}

// ============================================================================
// CRUD API (작품/후기 생성, 수정, 삭제)
// ============================================================================

/**
 * 새 갤러리 아이템 생성
 * - 실제로는 backend에 POST 요청
 * - 현재는 로컬 스토리지에 저장
 */
export async function createGalleryItem(
  type: GalleryType,
  item: Omit<GalleryItem, 'id' | 'views' | 'likes' | 'date'>
): Promise<GalleryItem> {
  try {
    // 기존 아이템 가져오기
    const items = await fetchGalleryItems(type)
    
    // 새 ID 생성 (기존 최대 ID + 1)
    const maxId = items.reduce((max, item) => Math.max(max, item.id), 0)
    const newId = maxId + 1
    
    // 새 아이템 생성
    const newItem: GalleryItem = {
      ...item,
      id: newId,
      views: 0,
      likes: 0,
      date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
    } as GalleryItem
    
    // 로컬 스토리지에 저장 (실제로는 backend API 호출)
    const storageKey = `gallery_${type}_user_items`
    const userItems = JSON.parse(localStorage.getItem(storageKey) || '[]') as GalleryItem[]
    userItems.push(newItem)
    localStorage.setItem(storageKey, JSON.stringify(userItems))
    
    return newItem
  } catch (error) {
    console.error(`[API Error] createGalleryItem(${type}):`, error)
    throw handleApiError(error)
  }
}

/**
 * 갤러리 아이템 수정
 * - 실제로는 backend에 PUT 요청
 */
export async function updateGalleryItem(
  type: GalleryType,
  itemId: number,
  updates: Partial<GalleryItem>
): Promise<GalleryItem> {
  try {
    // 로컬 스토리지에서 수정 (실제로는 backend API 호출)
    const storageKey = `gallery_${type}_user_items`
    const userItems = JSON.parse(localStorage.getItem(storageKey) || '[]') as GalleryItem[]
    
    const itemIndex = userItems.findIndex((item) => item.id === itemId)
    if (itemIndex === -1) {
      throw new Error('아이템을 찾을 수 없습니다')
    }
    
    // 아이템 업데이트
    const updatedItem = {
      ...userItems[itemIndex],
      ...updates,
      id: itemId, // ID는 변경 불가
    } as GalleryItem
    
    userItems[itemIndex] = updatedItem
    localStorage.setItem(storageKey, JSON.stringify(userItems))
    
    return updatedItem
  } catch (error) {
    console.error(`[API Error] updateGalleryItem(${type}, ${itemId}):`, error)
    throw handleApiError(error)
  }
}

/**
 * 갤러리 아이템 삭제
 * - 실제로는 backend에 DELETE 요청
 */
export async function deleteGalleryItem(
  type: GalleryType,
  itemId: number
): Promise<{ success: boolean; itemId: number }> {
  try {
    // 로컬 스토리지에서 삭제 (실제로는 backend API 호출)
    const storageKey = `gallery_${type}_user_items`
    const userItems = JSON.parse(localStorage.getItem(storageKey) || '[]') as GalleryItem[]
    
    const filteredItems = userItems.filter((item) => item.id !== itemId)
    
    if (filteredItems.length === userItems.length) {
      throw new Error('아이템을 찾을 수 없습니다')
    }
    
    localStorage.setItem(storageKey, JSON.stringify(filteredItems))
    
    return {
      success: true,
      itemId,
    }
  } catch (error) {
    console.error(`[API Error] deleteGalleryItem(${type}, ${itemId}):`, error)
    throw handleApiError(error)
  }
}

/**
 * 사용자가 작성한 아이템인지 확인
 * - 실제로는 backend에서 user_id로 확인
 * - 현재는 로컬 스토리지에서 확인
 */
export function isUserOwnedItem(type: GalleryType, itemId: number): boolean {
  if (typeof window === 'undefined') return false
  
  const storageKey = `gallery_${type}_user_items`
  const userItems = JSON.parse(localStorage.getItem(storageKey) || '[]') as GalleryItem[]
  return userItems.some((item) => item.id === itemId)
}

/**
 * 사용자가 작성한 모든 아이템 조회
 */
export async function fetchUserGalleryItems(type: GalleryType): Promise<GalleryItem[]> {
  try {
    if (typeof window === 'undefined') return []
    
    const storageKey = `gallery_${type}_user_items`
    const userItems = JSON.parse(localStorage.getItem(storageKey) || '[]') as GalleryItem[]
    return userItems
  } catch (error) {
    console.error(`[API Error] fetchUserGalleryItems(${type}):`, error)
    return []
  }
}

