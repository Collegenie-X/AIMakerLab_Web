/**
 * Gallery 설정 관리 Hook
 * 
 * JSON 파일에서 갤러리 페이지의 텍스트 설정을 불러옵니다.
 */

import { useState, useEffect } from 'react'

// 타입 정의
export type GalleryFormField = {
  label: string
  emoji: string
  placeholder: string
  uploadPlaceholder?: string
  uploadHint?: string
  options?: string[]
}

export type GalleryFormConfig = {
  title: string
  emoji: string
  fields: {
    image: GalleryFormField
    title: GalleryFormField
    category: GalleryFormField & { options: string[] }
    rating?: GalleryFormField
    description: GalleryFormField
    details: GalleryFormField
    author: GalleryFormField
    tags: GalleryFormField
  }
}

export type GalleryConfig = {
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
  form: GalleryFormConfig
}

/**
 * Gallery 설정을 불러오는 Hook
 */
export function useGalleryConfig(type: 'reviews' | 'works') {
  const [config, setConfig] = useState<GalleryConfig | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/gallery/${type}-config.json`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setConfig(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load gallery config'))
        console.error(`Gallery ${type} 설정 로딩 실패:`, err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchConfig()
  }, [type])

  return { config, isLoading, error }
}

