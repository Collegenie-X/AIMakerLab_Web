/**
 * 제품(Products) Hooks - ReactQuery 기반
 * - 기존 hooks를 ReactQuery로 마이그레이션
 * - 5분 캐시 및 자동 재검증
 */

'use client'

// 타입 및 hooks를 lib에서 import
export type { Product } from '@/lib/products/types'
export { useProducts, useProduct, useProductDetail, useProductDetailPage } from '@/lib/products/hooks'

