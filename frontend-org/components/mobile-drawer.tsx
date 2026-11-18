"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, ChevronDown, ChevronRight, User, LogOut, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/overlays/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/layout/collapsible"
import { Separator } from "@/components/ui/layout/separator"
import { getCurrentUser, logout } from "@/lib/auth/email-verification"
import { LoginDialog } from "@/components/login-dialog"

interface MenuItem {
  title: string
  items: { label: string; href: string }[]
}

const menuItems: MenuItem[] = [
  {
    title: "왜 프로젝트인가",
    items: [
      { label: "왜 프로젝트인가", href: "/why-project" },
      { label: "IB 학교", href: "/why-project/ib" },
      { label: "미네르바 스쿨", href: "/why-project/minerva" },
      { label: "바이브 코딩", href: "/why-project/vibe-coding" },
      { label: "AI 오케스트라", href: "/why-project/ai-orchestra" },
    ],
  },
  {
    title: "교육 커리큘럼",
    items: [
      { label: "앱 인벤터 코딩", href: "/curriculum/app-inventor" },
      { label: "아두이노 코딩", href: "/curriculum/arduino" },
      { label: "Raspberry Pi 코딩", href: "/curriculum/raspberry-pi" },
      { label: "AI 교육 프로그램", href: "/curriculum/ai-education" },
      { label: "심화 교육 프로그램", href: "/curriculum/science" },
    ],
  },
  {
    title: "수업 문의",
    items: [
      { label: "출장 수업 문의", href: "/inquiry/online" },
      { label: "수업 일정", href: "/inquiry/schedule" },
      { label: "교육 소식 받기", href: "/inquiry/method" },
    ],
  },
  {
    title: "교육 제품(KIT)",
    items: [
      { label: "코딩 /AI 제품", href: "/products/coding-ai" },
      { label: "AI교육 프로그램", href: "/products/ai-program" },
      { label: "견적 문의", href: "/products/inquiry" },
      { label: "교구 사용 영상", href: "/products/videos" },
    ],
  },
  {
    title: "갤러리",
    items: [
      { label: "작품", href: "/gallery/works" },
      { label: "수업 후기", href: "/gallery/reviews" },
    ],
  },
  {
    title: "AI Maker 소개",
    items: [
      { label: "AI Maker 소개", href: "/about" },
      { label: "오시는 길", href: "/about/location" },
    ],
  },
]

export function MobileDrawer() {
  const [open, setOpen] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    // 로그인 상태 확인
    setUserEmail(getCurrentUser())
  }, [])

  const handleLogout = () => {
    logout()
    setOpen(false)
    window.location.reload()
  }

  // 내 학습 메뉴 (로그인한 사용자용)
  const myLearningMenu: MenuItem = {
    title: "내 학습",
    items: [
      { label: "나의 강의", href: "/my-courses" },
      { label: "나의 문의", href: "/my-inquiries" },
      { label: "나의 갤러리", href: "/my-gallery" },
      { label: "프로필 설정", href: "/my-profile" },
    ],
  }

  // 하단 고정 영역의 '왜 프로젝트인가' 바로가기 (로그인 버튼과 같은 높이·모양)
  const whyProjectLink = (
    <Link
      href="/why-project"
      onClick={() => setOpen(false)}
      className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full border border-purple-500/40 bg-purple-950/40 px-4 text-sm font-medium text-purple-200 hover:bg-purple-900/50 transition-colors whitespace-nowrap"
    >
      <Lightbulb className="h-4 w-4 text-purple-300" />
      왜 프로젝트인가?
    </Link>
  )

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">메뉴 열기</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] flex flex-col p-0 bg-black border-gray-800">
        {/* 상단 헤더 */}
        <div className="flex-shrink-0 p-6 pb-4">
          <SheetHeader>
            <SheetTitle className="text-left">
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center space-x-2">
                <span className="text-xl font-bold text-red-500">AI Maker</span>
                <span className="text-xl font-bold text-gray-300">Lab</span>
              </Link>
            </SheetTitle>
          </SheetHeader>
        </div>

        <Separator className="bg-gray-800" />

        {/* 스크롤 가능한 메뉴 영역 */}
        <nav className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
          {/* 로그인한 사용자는 내 학습 메뉴 먼저 표시 */}
          {userEmail && (
            <>
              <Collapsible>
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left font-semibold text-blue-400 bg-blue-950/50 hover:bg-blue-900/50 transition-colors">
                  {myLearningMenu.title}
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-1 space-y-1 pl-4">
                  {myLearningMenu.items.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm text-gray-400 hover:bg-gray-800 hover:text-gray-200 transition-colors"
                    >
                      <ChevronRight className="h-3 w-3" />
                      {item.label}
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
              <Separator className="my-2 bg-gray-800" />
            </>
          )}

          {/* 일반 메뉴 */}
          {menuItems.map((menu, index) => (
            <Collapsible key={index}>
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left font-semibold text-gray-200 hover:bg-gray-800 transition-colors">
                {menu.title}
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-1 space-y-1 pl-4">
                {menu.items.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm text-gray-400 hover:bg-gray-800 hover:text-gray-200 transition-colors"
                  >
                    <ChevronRight className="h-3 w-3" />
                    {item.label}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </nav>

        {/* 하단 고정 로그인/로그아웃 영역 */}
        <div className="flex-shrink-0 border-t border-gray-800 bg-gray-950">
          <div className="p-4">
            {userEmail ? (
              <div className="space-y-3">
                {whyProjectLink}
                <div className="p-4 bg-gray-900 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-medium text-gray-200 truncate">
                      {userEmail}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    로그아웃
                  </Button>
                </div>
              </div>
            ) : (
              // 비로그인: 왜 프로젝트인가 · 로그인 좌우 배치
              <div className="flex items-center gap-2">
                {whyProjectLink}
                <LoginDialog />
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
