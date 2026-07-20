"use client"

import { GalleryListSection } from "../../components/GalleryListSection"
import type { WorkSource } from "@/lib/gallery"
import { contentBg } from "../config"

type Props = {
  selectedSource: WorkSource | "all"
}

/**
 * Works 컨텐츠 섹션 컴포넌트
 *
 * 작품 목록을 표시합니다.
 * config.ts에서 배경 스타일을 관리합니다.
 * 작품 구분(학생 작품/내부 작품)은 상위(Hero)에서 제어되어 내려받습니다.
 */
export function WorksContentSection({ selectedSource }: Props) {
  return (
    <section className={`py-16 bg-gradient-to-br ${contentBg}`}>
      <div className="container mx-auto px-4">
        <GalleryListSection type="works" sourceFilter={selectedSource} />
      </div>
    </section>
  )
}
