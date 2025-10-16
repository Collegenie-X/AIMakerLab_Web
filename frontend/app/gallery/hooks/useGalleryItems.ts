"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import type { GalleryItem } from "../config"

export type UseGalleryItemsOptions = {
  initial?: GalleryItem[]
  sourceUrl: string
}

/**
 * 갤러리 아이템을 JSON에서 불러와 관리하는 커스텀 훅
 * @param sourceUrl - JSON 데이터 파일 경로
 * @param initial - 초기 데이터 (옵션)
 */
export function useGalleryItems({ initial = [], sourceUrl }: UseGalleryItemsOptions) {
  const [items, setItems] = useState<GalleryItem[]>(initial)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(sourceUrl, { cache: "no-store" })
        if (!res.ok) throw new Error(`Failed to fetch gallery items: ${res.status}`)
        const data: GalleryItem[] = await res.json()
        if (!cancelled) setItems(data)
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Unknown error")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [sourceUrl])

  const upsert = useCallback((item: GalleryItem) => {
    setItems((prev) => {
      const exists = prev.some((p) => p.id === item.id)
      if (exists) return prev.map((p) => (p.id === item.id ? item : p))
      return [item, ...prev]
    })
  }, [])

  const remove = useCallback((id: number) => {
    setItems((prev) => prev.filter((p) => p.id !== id))
  }, [])

  // 카테고리 목록 추출
  const categories = useMemo(() => {
    const uniqueCats = Array.from(new Set(items.map((s) => s.category)))
    return uniqueCats.sort()
  }, [items])

  return useMemo(
    () => ({ items, loading, error, upsert, remove, categories }),
    [items, loading, error, upsert, remove, categories],
  )
}

