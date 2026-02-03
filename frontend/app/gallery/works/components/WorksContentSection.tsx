"use client"

import { GalleryListSection } from "../../components/GalleryListSection"
import { contentBg } from "../config"

/**
 * Works 컨텐츠 섹션 컴포넌트
 * 
 * 작품 목록을 표시합니다.
 * config.ts에서 배경 스타일을 관리합니다.
 */
export function WorksContentSection() {
  return (
    <section className={`py-16 bg-gradient-to-br ${contentBg}`}>
      <div className="container mx-auto px-4">
        <GalleryListSection type="works" />
      </div>
    </section>
  )
}
