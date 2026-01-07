/**
 * Gallery 라이브러리 통합 Export
 * - 한 곳에서 모든 Gallery 관련 기능을 import 가능
 */

// 타입
export type {
  GalleryItem,
  WorkItem,
  ReviewItem,
  GalleryType,
  GalleryConfig,
  GalleryFormConfig,
  GalleryFormField,
  GalleryResponse,
  UpdateStatsRequest,
  UpdateStatsResponse,
  ApiError,
  GalleryFilterOptions,
} from './types'

// Type Guards
export { isWorkItem, isReviewItem } from './types'

// API 함수
export {
  fetchGalleryItems,
  fetchGalleryItemById,
  fetchGalleryItemsByCategory,
  fetchGalleryConfig,
  fetchGalleryPage,
  searchGalleryItems,
  toggleLike,
  incrementViews,
  checkLikeStatus,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  isUserOwnedItem,
  fetchUserGalleryItems,
} from './api'

// React Query Hooks
export {
  useGalleryItems,
  useGalleryItem,
  useGalleryItemsByCategory,
  useGalleryConfig,
  useGalleryPage,
  useGallerySearch,
  useToggleLike,
  useIncrementViews,
  useCreateGalleryItem,
  useUpdateGalleryItem,
  useDeleteGalleryItem,
  useUserGalleryItems,
  galleryKeys,
} from './hooks'

// 유틸리티 함수
export {
  extractCategories,
  getDefaultImage,
  sortGalleryItems,
  filterByCategory,
  filterBySearch,
  formatNumber,
  formatDate,
  formatRelativeTime,
  isItemLiked,
  isItemViewed,
  calculateAverageRating,
  calculateRatingDistribution,
} from './utils'

// Query Provider는 별도 export
export { GalleryQueryProvider } from './query-provider'

