"use client"

import { useEffect, useState } from "react"
import type { VideoItem } from "../config"

export function useVideos(source: string = "/products/videos.json") {
  const [items, setItems] = useState<VideoItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        setLoading(true)
        const res = await fetch(source, { cache: "no-store" })
        if (!res.ok) throw new Error(`Failed to fetch videos: ${res.status}`)
        const data: VideoItem[] = await res.json()
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

  return { items, loading, error }
}


