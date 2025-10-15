"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import type { InquiryItem } from "../config"

export type UseInquiriesOptions = {
  initial?: InquiryItem[]
  sourceUrl?: string
}

export function useInquiries({ initial = [], sourceUrl = "/inquiry/inquiries.json" }: UseInquiriesOptions) {
  const [items, setItems] = useState<InquiryItem[]>(initial)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(sourceUrl, { cache: "no-store" })
        if (!res.ok) throw new Error(`Failed to fetch inquiries: ${res.status}`)
        const data: InquiryItem[] = await res.json()
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

  const upsert = useCallback((item: InquiryItem) => {
    setItems((prev) => {
      const exists = prev.some((p) => p.id === item.id)
      if (exists) return prev.map((p) => (p.id === item.id ? item : p))
      return [item, ...prev]
    })
  }, [])

  const remove = useCallback((id: number) => {
    setItems((prev) => prev.filter((p) => p.id !== id))
  }, [])

  return useMemo(() => ({ items, loading, error, upsert, remove }), [items, loading, error, upsert, remove])
}


