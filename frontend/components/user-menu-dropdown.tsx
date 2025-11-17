"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/buttons/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/navigation/dropdown-menu"
import { getCurrentUser, logout } from "@/lib/auth/email-verification"
import { User, BookOpen, LogOut, FileText, Images } from "lucide-react"
import { useRouter } from "next/navigation"

/**
 * 로그인된 사용자용 드롭다운 메뉴 컴포넌트
 * 사용자 이메일 표시 및 관리 페이지 링크 제공
 */
export function UserMenuDropdown() {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // 클라이언트에서만 실행
    setUserEmail(getCurrentUser())
  }, [])

  // 로그인하지 않은 경우 아무것도 렌더링하지 않음
  if (!userEmail) {
    return null
  }

  const handleLogout = () => {
    logout()
    window.location.reload()
  }

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <User className="h-4 w-4" />
          <span className="hidden md:inline-block max-w-[150px] truncate">
            {userEmail}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-sm text-gray-500">내 계정</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => handleNavigation("/my-courses")} className="gap-3 py-2.5">
          <BookOpen className="h-4 w-4 text-blue-600" />
          <span>나의 강의</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleNavigation("/my-inquiries")} className="gap-3 py-2.5">
          <FileText className="h-4 w-4 text-green-600" />
          <span>나의 문의</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleNavigation("/my-gallery")} className="gap-3 py-2.5">
          <Images className="h-4 w-4 text-purple-600" />
          <span>나의 갤러리</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => handleNavigation("/my-profile")} className="gap-3 py-2.5">
          <User className="h-4 w-4 text-gray-600" />
          <span>프로필 설정</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 gap-3 py-2.5">
          <LogOut className="h-4 w-4" />
          <span>로그아웃</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

