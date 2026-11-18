"use client"

import { useState, useEffect } from "react"

/**
 * Reviews 페이지 컨텐츠 타입
 */
export type ReviewsContentData = {
  hero: {
    emoji: string
    title: string
    subtitle: string
  }
  categoryAll: string
  itemCountSuffix: string
  emptyState: {
    emoji: string
    title: string
    message: string
  }
  actions: {
    like: string
    share: string
    create: string
    cancel: string
    submit: string
  }
  form: {
    title: string
    emoji: string
    fields: {
      image: {
        label: string
        emoji: string
        uploadPlaceholder: string
        uploadHint: string
      }
      title: {
        label: string
        emoji: string
        placeholder: string
      }
      category: {
        label: string
        emoji: string
        placeholder: string
        options: string[]
      }
      rating: {
        label: string
        emoji: string
      }
      description: {
        label: string
        emoji: string
        placeholder: string
      }
      details: {
        label: string
        emoji: string
        placeholder: string
      }
      author: {
        label: string
        emoji: string
        placeholder: string
      }
      tags: {
        label: string
        emoji: string
        placeholder: string
      }
    }
  }
}

/**
 * Reviews 페이지 컨텐츠를 로드하는 Hook
 * 
 * @returns 컨텐츠 데이터, 로딩 상태, 에러 메시지
 */
export function useReviewsContent() {
  const [content, setContent] = useState<ReviewsContentData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true)
        const response = await fetch("/gallery/reviews-config.json")
        
        if (!response.ok) {
          throw new Error(`Failed to fetch content: ${response.status}`)
        }
        
        const data = await response.json()
        setContent(data)
        setError(null)
      } catch (err) {
        console.error("Error loading reviews content:", err)
        setError(err instanceof Error ? err.message : "Failed to load content")
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])

  return { content, loading, error }
}
