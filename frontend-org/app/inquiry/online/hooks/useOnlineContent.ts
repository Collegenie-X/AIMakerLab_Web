"use client"

import { useState, useEffect } from "react"

/**
 * 온라인 문의 페이지 컨텐츠 타입
 */
export type OnlineContentData = {
  pageTitle: string
  pageDescription: string
  hero: {
    badge: string
    title: string
    subtitle: string
  }
  list: {
    title: string
    buttonText: string
  }
  info: {
    title: string
    cards: Array<{
      emoji: string
      title: string
      description: string
    }>
  }
  inquiry: {
    successMessage: string
  }
  meta: {
    lastUpdated: string
    version: string
  }
}

/**
 * 온라인 문의 페이지 컨텐츠를 로드하는 Hook
 * 
 * @returns 컨텐츠 데이터, 로딩 상태, 에러 메시지
 */
export function useOnlineContent() {
  const [content, setContent] = useState<OnlineContentData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true)
        const response = await fetch("/inquiry/online-content.json")
        
        if (!response.ok) {
          throw new Error(`Failed to fetch content: ${response.status}`)
        }
        
        const data = await response.json()
        setContent(data)
        setError(null)
      } catch (err) {
        console.error("Error loading online content:", err)
        setError(err instanceof Error ? err.message : "Failed to load content")
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])

  return { content, loading, error }
}
