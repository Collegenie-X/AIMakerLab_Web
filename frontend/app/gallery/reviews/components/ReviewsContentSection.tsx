"use client"

import { GalleryListSection } from "../../components/GalleryListSection"
import { contentBg } from "../config"

/**
 * Reviews 컨텐츠 섹션 컴포넌트
 * 
 * 후기 목록을 표시합니다.
 * config.ts에서 배경 스타일을 관리합니다.
 */
export function ReviewsContentSection() {
  return (
    <section className={`py-16 bg-gradient-to-br ${contentBg}`}>
      <div className="container mx-auto px-4">
        <GalleryListSection type="reviews" />
      </div>
    </section>
  )
}
