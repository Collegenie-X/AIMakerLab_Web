"use client"

import { useCallback, useEffect, useState } from "react"

/**
 * 요소가 뷰포트에 들어오면 한 번만 visible=true 로 전환합니다.
 * SVG 애니메이션(stroke-dashoffset, 카운트업 등)의 시작 트리거로 사용합니다.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.2) {
  const [node, setNode] = useState<T | null>(null)
  const [visible, setVisible] = useState(false)

  const ref = useCallback((el: T | null) => {
    setNode(el)
  }, [])

  useEffect(() => {
    if (!node) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(node)
        }
      },
      { threshold }
    )
    observer.observe(node)

    const fallback = window.setTimeout(() => setVisible(true), 2000)

    return () => {
      observer.disconnect()
      window.clearTimeout(fallback)
    }
  }, [threshold, node])

  return { ref, visible }
}
