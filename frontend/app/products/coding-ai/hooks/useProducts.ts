'use client'

import { useState, useEffect } from 'react'
import { PRODUCTS_JSON_PATH } from '../config'

/**
 * 제품 데이터 타입 정의
 */
export interface Product {
  id: string
  category: string
  title: string
  shortDescription: string
  educationalValue: string
  classroomUse: string
  image: string
  images?: string[]  // 여러 이미지 슬라이드용
  price: string
  originalPrice?: string
  discount: number
  targetGrade: string
  gradeDetail: string
  classTime: string
  groupSize: string
  rating: number
  reviews: number
  soldCount: number
  badges: string[]
  features: string[]
}

/**
 * 제품 목록을 JSON 파일에서 로드하는 커스텀 훅
 */
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // 제품 데이터 로드
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch(PRODUCTS_JSON_PATH)
        
        if (!response.ok) {
          throw new Error(`제품 데이터를 불러오는데 실패했습니다: ${response.status}`)
        }

        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('알 수 없는 오류가 발생했습니다'))
        console.error('제품 데이터 로딩 오류:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, isLoading, error }
}

/**
 * ID로 특정 제품을 가져오는 커스텀 훅
 */
export function useProduct(productId: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // 제품 데이터 로드
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch(PRODUCTS_JSON_PATH)
        
        if (!response.ok) {
          throw new Error(`제품 데이터를 불러오는데 실패했습니다: ${response.status}`)
        }

        const data: Product[] = await response.json()
        const foundProduct = data.find(p => p.id === productId)
        
        if (!foundProduct) {
          throw new Error(`제품을 찾을 수 없습니다: ${productId}`)
        }

        setProduct(foundProduct)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('알 수 없는 오류가 발생했습니다'))
        console.error('제품 데이터 로딩 오류:', err)
      } finally {
        setIsLoading(false)
      }
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId])

  return { product, isLoading, error }
}

