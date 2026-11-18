// 견적 게시판 관리 훅

"use client"

import { useEffect, useMemo, useState, useCallback } from "react"
import type { QuoteBoardItem } from "../types"

/**
 * 견적 게시판 훅 옵션
 */
export type UseQuotesOptions = {
  initial?: QuoteBoardItem[]
  sourceUrl?: string
}

const DEFAULT_SOURCE = "/products/quotes.json"

/**
 * 견적 게시판 관리 훅
 * 게시판 아이템 목록을 불러오고 CRUD 기능을 제공합니다
 * 
 * @param options - 옵션 (initial: 초기값, sourceUrl: JSON 파일 경로)
 * @returns 게시판 아이템, 로딩 상태, 에러, CRUD 함수들
 */
export function useQuotes(options: UseQuotesOptions = {}) {
  const { initial = [], sourceUrl = DEFAULT_SOURCE } = options
  
  const [items, setItems] = useState<QuoteBoardItem[]>(initial)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    
    const loadQuotes = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const res = await fetch(sourceUrl, { cache: "no-store" })
        
        // Early return: 응답 실패
        if (!res.ok) {
          throw new Error(`견적 목록 로딩 실패: ${res.status}`)
        }
        
        const data: QuoteBoardItem[] = await res.json()
        
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
    
    loadQuotes()
    
    return () => {
      cancelled = true
    }
  }, [sourceUrl])

  /**
   * 아이템 추가 또는 업데이트
   */
  const upsert = useCallback((item: QuoteBoardItem) => {
    setItems((prev) => {
      const exists = prev.some((p) => p.id === item.id)
      
      // 기존 아이템 업데이트
      if (exists) {
        return prev.map((p) => (p.id === item.id ? item : p))
      }
      
      // 새 아이템 추가 (맨 앞에)
      return [item, ...prev]
    })
  }, [])

  /**
   * 아이템 삭제
   */
  const remove = useCallback((id: number) => {
    setItems((prev) => prev.filter((p) => p.id !== id))
  }, [])

  return useMemo(
    () => ({ items, loading, error, upsert, remove }), 
    [items, loading, error, upsert, remove]
  )
}


