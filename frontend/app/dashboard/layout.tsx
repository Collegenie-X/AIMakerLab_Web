"use client"

import { useAuthGuard } from "@/hooks/use-auth-guard"
import { DashboardSidebar } from "./components/dashboard-sidebar"

/**
 * 대시보드 레이아웃 컴포넌트
 * 사이드바 네비게이션 및 인증 체크 제공
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoading } = useAuthGuard()

  // 로딩 중이거나 로그인하지 않은 경우
  if (isLoading) {
    return null
  }

  return (
    <div className="flex min-h-screen">
      {/* 사이드바 */}
      <DashboardSidebar />

      {/* 메인 콘텐츠 */}
      <main className="flex-1 ml-64 bg-gray-50">
        {children}
      </main>
    </div>
  )
}

