"use client"

import { useState, useEffect } from "react"

/**
 * 스케줄 페이지 컨텐츠 타입
 */
export type ScheduleContentData = {
  pageTitle: string
  pageDescription: string
  hero: {
    badge: string
    title: string
    subtitle: string
    description: string
  }
  filter: {
    title: string
    description: string
    allOption: string
  }
  list: {
    titleTemplate: string
    allTitle: string
    countTemplate: string
    helper: string
    emptyMessage: string
  }
  info: {
    title: string
    sections: Array<{
      emoji: string
      title: string
      description: string
    }>
  }
  features: Array<{
    icon: string
    label: string
  }>
  meta: {
    lastUpdated: string
    version: string
  }
}

/**
 * 스케줄 페이지 컨텐츠를 로드하는 Hook
 * 
 * @returns 컨텐츠 데이터, 로딩 상태, 에러 메시지
 */
export function useScheduleContent() {
  const [content, setContent] = useState<ScheduleContentData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true)
        // 개발 환경에서 캐시 방지를 위해 timestamp 추가
        const timestamp = process.env.NODE_ENV === 'development' ? `?t=${Date.now()}` : ''
        const response = await fetch(`/inquiry/schedule-content.json${timestamp}`, {
          cache: 'no-store', // 캐시 사용 안 함
        })
        
        if (!response.ok) {
          throw new Error(`Failed to fetch content: ${response.status}`)
        }
        
        const data = await response.json()
        setContent(data)
        setError(null)
      } catch (err) {
        console.error("Error loading schedule content:", err)
        setError(err instanceof Error ? err.message : "Failed to load content")
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])

  return { content, loading, error }
}
