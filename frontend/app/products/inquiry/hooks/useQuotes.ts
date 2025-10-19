"use client"

import { useEffect, useMemo, useState, useCallback } from "react"

export type QuoteBoardItem = {
  id: number
  title: string
  requester: string
  phone: string
  email: string
  createdAt: string
  status: "접수" | "응대중" | "완료"
}

export type UseQuotesOptions = {
  initial?: QuoteBoardItem[]
  sourceUrl?: string
}

const defaultSource = "/products/quotes.json"

export function useQuotes({ initial = [], sourceUrl = defaultSource }: UseQuotesOptions = {}) {
  const [items, setItems] = useState<QuoteBoardItem[]>(initial)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(sourceUrl, { cache: "no-store" })
        if (!res.ok) throw new Error(`Failed to fetch quotes: ${res.status}`)
        const data: QuoteBoardItem[] = await res.json()
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

  const upsert = useCallback((item: QuoteBoardItem) => {
    setItems((prev) => {
      const exists = prev.some((p) => p.id === item.id)
      if (exists) return prev.map((p) => (p.id === item.id ? item : p))
      return [item, ...prev]
    })
  }, [])

  const remove = useCallback((id: number) => setItems((prev) => prev.filter((p) => p.id !== id)), [])

  return useMemo(() => ({ items, loading, error, upsert, remove }), [items, loading, error, upsert, remove])
}


