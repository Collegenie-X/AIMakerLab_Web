"use client"

import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation/navigation-menu"
import { MobileDrawer } from "@/components/mobile-drawer"
import { LoginDialog } from "@/components/login-dialog"
import { RegisterDialog } from "@/components/register-dialog"
import { UserMenuDropdown } from "@/components/user-menu-dropdown"
import { getCurrentUser } from "@/lib/auth/email-verification"
import { headerBrand, headerNavSections, headerUIConfig } from "@/components/header/config"
import type { HeaderNavItem, HeaderNavSection } from "@/components/header/config"
import { useEffect, useState } from "react"
import { ArrowUp, Code, Cpu, CircuitBoard, Smartphone, Lightbulb, School, CalendarDays, Calendar, Bell, Box, Video, Calculator, Image, MessageSquare, Info, MapPin, BookOpen, HelpCircle, Package, Images, Building, Briefcase, Scale, GraduationCap, FileSearch } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import { themeText, themeColors } from "@/theme"

export function Header() {
  const [showTop, setShowTop] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 240)
    }
    window.addEventListener("scroll", onScroll)
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    // 로그인 상태 확인
    setIsLoggedIn(getCurrentUser() !== null)
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  
  // 아이콘 동적 렌더링 함수
  const renderIcon = (iconName?: string, size: 'sm' | 'md' | 'lg' = 'sm') => {
    if (!iconName) return null
    
    const iconProps = { 
      className: size === 'sm' 
        ? "h-4 w-4 mr-2 flex-shrink-0" 
        : size === 'md'
          ? "h-5 w-5 mr-2 flex-shrink-0"
          : "h-6 w-6 flex-shrink-0"
    }
    
    switch (iconName) {
      case "Code": return <Code {...iconProps} />
      case "Cpu": return <Cpu {...iconProps} />
      case "CircuitBoard": return <CircuitBoard {...iconProps} />
      case "Smartphone": return <Smartphone {...iconProps} />
      case "Lightbulb": return <Lightbulb {...iconProps} />
      case "School": return <School {...iconProps} />
      case "CalendarDays": return <CalendarDays {...iconProps} />
      case "Calendar": return <Calendar {...iconProps} />
      case "Bell": return <Bell {...iconProps} />
      case "Box": return <Box {...iconProps} />
      case "Video": return <Video {...iconProps} />
      case "Calculator": return <Calculator {...iconProps} />
      case "Image": return <Image {...iconProps} />
      case "MessageSquare": return <MessageSquare {...iconProps} />
      case "Info": return <Info {...iconProps} />
      case "MapPin": return <MapPin {...iconProps} />
      case "BookOpen": return <BookOpen {...iconProps} />
      case "HelpCircle": return <HelpCircle {...iconProps} />
      case "Package": return <Package {...iconProps} />
      case "Images": return <Images {...iconProps} />
      case "Building": return <Building {...iconProps} />
      case "Briefcase": return <Briefcase {...iconProps} />
      case "Scale": return <Scale {...iconProps} />
      case "GraduationCap": return <GraduationCap {...iconProps} />
      case "FileSearch": return <FileSearch {...iconProps} />
      default: return null
    }
  }

  return (
    <header className="sticky top-0 z-[10] w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <MobileDrawer />
          <Link href="/" className="flex items-center space-x-2">
            <span className={`${themeText.brandTitle} ${themeColors.brandPrimary}`}>{headerBrand.primary}</span>
            <span className={`${themeText.brandTitle} ${themeColors.brandSecondary}`}>{headerBrand.secondary}</span>
          </Link>
        </div>

        <NavigationMenu className="hidden md:flex" viewport={false}>
          <NavigationMenuList className="flex gap-3">
            {headerNavSections.map((section: HeaderNavSection) => (
            <NavigationMenuItem key={section.title}>
                <NavigationMenuTrigger className={`text-base font-medium ${themeColors.body}`}>
                  <span>{section.title}</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div
                    className="p-2 bg-white"
                    style={
                      section.width
                        ? { width: typeof section.width === "number" ? `${section.width}px` : `${section.width}px` }
                        : undefined
                    }
                  >
                    <ul className="space-y-2">
                      {section.items.map((item: HeaderNavItem) => (
                        <li key={item.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.href}
                              className="block select-none no-underline outline-none transition-colors hover:bg-gray-50 rounded-md"
                            >
                              <div className="flex items-center p-1">
                                <div className="flex items-center justify-center pl-2 w-8 h-8 mr-3 rounded-md border border-gray-200">
                                  {renderIcon(item.icon, 'sm')}
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{item.label}</div>
                                  {item.description && (
                                    <div className="text-gray-500" style={{ fontSize: "11px" }}>
                                      {item.description}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          {isLoggedIn ? <UserMenuDropdown /> : <LoginDialog />}
        </div>
      </div>

      {showTop && (
        <div className="hidden md:block fixed bottom-6 right-6 z-[150]">
          <Button size="icon" variant="secondary" onClick={handleScrollTop} aria-label="맨 위로">
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      )}
    </header>
  )
}

export default Header


