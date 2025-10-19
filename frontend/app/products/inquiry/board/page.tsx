"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { QuoteBoardList } from "../components/QuoteBoardList"

export default function QuoteBoardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-4 py-10">
          <h1 className="text-2xl font-bold mb-4">견적 문의 게시판</h1>
          <p className="text-muted-foreground mb-6">접수된 견적 문의를 목록으로 관리합니다. 항목은 로컬 상태에서 수정/삭제됩니다.</p>
          <QuoteBoardList />
        </section>
      </main>
      <Footer />
    </div>
  )
}


