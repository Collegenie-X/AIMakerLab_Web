"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { scheduleDataUrl, type ScheduleItem } from "../config"

export type UseSchedulesOptions = {
  initial?: ScheduleItem[]
  sourceUrl?: string
}

export function useSchedules({ initial = [], sourceUrl = scheduleDataUrl }: UseSchedulesOptions = {}) {
  const [items, setItems] = useState<ScheduleItem[]>(initial)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(sourceUrl, { cache: "no-store" })
        if (!res.ok) throw new Error(`Failed to fetch schedules: ${res.status}`)
        const data: ScheduleItem[] = await res.json()
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

  const upsert = useCallback((item: ScheduleItem) => {
    setItems((prev) => {
      const exists = prev.some((p) => p.id === item.id)
      if (exists) return prev.map((p) => (p.id === item.id ? item : p))
      return [item, ...prev]
    })
  }, [])

  const remove = useCallback((id: number) => {
    setItems((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const months = useMemo(() => Array.from(new Set(items.map((s) => s.month))).sort(), [items])

  return useMemo(
    () => ({ items, loading, error, upsert, remove, months }),
    [items, loading, error, upsert, remove, months],
  )
}


