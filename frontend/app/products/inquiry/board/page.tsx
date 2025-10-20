"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { QuoteBoardList } from "../components/QuoteBoardList"
import { ClipboardList, Search } from "lucide-react"

export default function QuoteBoardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-600 py-12 text-white">
          <div className="absolute inset-0 bg-[url('/home/abstract-tech-pattern.png')] opacity-10" />
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold">
                <ClipboardList className="w-4 h-4" />
                관리자 전용
              </div>
              <h1 className="mb-4 text-4xl font-bold md:text-5xl" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}>
                견적 문의 게시판
              </h1>
              <p className="text-lg text-white/90 md:text-xl" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}>
                접수된 견적 문의를 목록으로 관리합니다. 항목은 로컬 상태에서 수정/삭제됩니다.
              </p>
              
              {/* 특징 아이콘 */}
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Search className="w-5 h-5" />
                  <span className="text-sm font-medium">문의 검색</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <ClipboardList className="w-5 h-5" />
                  <span className="text-sm font-medium">실시간 관리</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Board List Section */}
        <section className="mx-auto max-w-5xl px-4 py-10">
          <QuoteBoardList />
        </section>
      </main>
      <Footer />
    </div>
  )
}


