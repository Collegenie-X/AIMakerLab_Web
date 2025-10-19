"use client"

import { useEffect, useMemo, useState } from "react"

export type QuoteCatalogItem = {
  id: string
  name: string
  unitPrice: number
}

export function useQuoteItems(source: string = "/products/quote-items.json") {
  const [items, setItems] = useState<QuoteCatalogItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        setLoading(true)
        const res = await fetch(source, { cache: "no-store" })
        if (!res.ok) throw new Error(`Failed to fetch quote-items: ${res.status}`)
        const data: QuoteCatalogItem[] = await res.json()
        if (!cancelled) setItems(data)
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Unknown error")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [source])

  const mapById = useMemo(() => Object.fromEntries(items.map((it) => [it.id, it])), [items])

  return { items, mapById, loading, error }
}


