"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/overlays/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/layout/collapsible"

interface MenuItem {
  title: string
  items: { label: string; href: string }[]
}

const menuItems: MenuItem[] = [
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

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">메뉴 열기</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-left">
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center space-x-2">
              <span className="text-xl font-bold text-red-600">AI Make</span>
              <span className="text-xl font-bold text-gray-900">Lab</span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col space-y-2">
          {menuItems.map((menu, index) => (
            <Collapsible key={index}>
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left font-semibold text-gray-900 hover:bg-gray-100 transition-colors">
                {menu.title}
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-1 space-y-1 pl-4">
                {menu.items.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  >
                    <ChevronRight className="h-3 w-3" />
                    {item.label}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
