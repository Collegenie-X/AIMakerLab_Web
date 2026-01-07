// 견적 품목 카탈로그 로딩 훅

"use client"

import { useEffect, useMemo, useState } from "react"
import type { QuoteCatalogItem } from "../types"

/**
 * 견적 품목 카탈로그 훅 옵션
 */
export type UseQuoteItemsOptions = {
  source?: string
}

/**
 * 견적 품목 카탈로그 로딩 훅
 * JSON 파일에서 품목 목록을 불러옵니다
 * 
 * @param options - 옵션 (source: JSON 파일 경로)
 * @returns 품목 목록, ID 맵, 로딩 상태, 에러
 */
export function useQuoteItems(options: UseQuoteItemsOptions = {}) {
  const { source = "/products/quote-items.json" } = options
  
  const [items, setItems] = useState<QuoteCatalogItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    
    const loadItems = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const res = await fetch(source, { cache: "no-store" })
        
        // Early return: 응답 실패
        if (!res.ok) {
          throw new Error(`품목 목록 로딩 실패: ${res.status}`)
        }
        
        const data: QuoteCatalogItem[] = await res.json()
        
        if (!cancelled) {
          setItems(data)
        }
      } catch (e: any) {
        if (!cancelled) {
          setError(e?.message ?? "알 수 없는 에러")
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }
    
    loadItems()
    
    return () => { 
      cancelled = true 
    }
  }, [source])

  // ID로 빠른 조회를 위한 맵 생성
  const mapById = useMemo(
    () => Object.fromEntries(items.map((item) => [item.id, item])), 
    [items]
  )

  return { items, mapById, loading, error }
}


