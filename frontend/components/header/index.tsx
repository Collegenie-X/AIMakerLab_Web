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
import { ArrowUp, Code, Cpu, CircuitBoard, Smartphone, Lightbulb, School, CalendarDays, Calendar, Bell, Box, Video, Calculator, Image, MessageSquare, Info, MapPin, BookOpen, HelpCircle, Package, Images, Building, Briefcase, Scale, GraduationCap, FileSearch, Rocket, LogIn, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"

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
    setIsLoggedIn(getCurrentUser() !== null)
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

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
      case "Rocket": return <Rocket {...iconProps} />
      default: return null
    }
  }

  const renderTriggerIcon = (iconName?: string) => {
    if (!iconName) return null
    const iconProps = { className: "h-4 w-4 mr-1.5 flex-shrink-0 opacity-70" }
    switch (iconName) {
      case "BookOpen": return <BookOpen {...iconProps} />
      case "HelpCircle": return <HelpCircle {...iconProps} />
      case "Package": return <Package {...iconProps} />
      case "Images": return <Images {...iconProps} />
      case "Rocket": return <Rocket {...iconProps} />
      case "Building": return <Building {...iconProps} />
      default: return null
    }
  }

  const mainNavSections = headerNavSections.filter(s => s.title !== "About")
  const aboutSection = headerNavSections.find(s => s.title === "About")

  return (
    <header className="sticky top-0 z-[10] w-full bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-gray-950/80">
      <div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <MobileDrawer />
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600">
              <Sparkles className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              {headerBrand.primary} {headerBrand.secondary}
            </span>
          </Link>
        </div>

        {/* Main Navigation */}
        <NavigationMenu className="hidden lg:flex" viewport={false}>
          <NavigationMenuList className="flex gap-1">
            {mainNavSections.map((section: HeaderNavSection) => (
              <NavigationMenuItem key={section.title}>
                <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 data-[state=open]:bg-white/5 data-[state=open]:text-white px-3 py-2 h-9">
                  {renderTriggerIcon(section.icon)}
                  <span>{section.title}</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div
                    className="p-2 bg-black border border-white/10 rounded-lg shadow-xl shadow-black/20"
                    style={
                      section.width
                        ? { width: `${section.width}px` }
                        : undefined
                    }
                  >
                    <ul className="space-y-1">
                      {section.items.map((item: HeaderNavItem) => (
                        <li key={item.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.href}
                              className="block select-none no-underline outline-none transition-colors hover:bg-white/10 rounded-md"
                            >
                              <div className="flex items-center p-1.5">
                                <div className="flex items-center justify-center w-7 h-7 mr-2.5 rounded-md border border-white/15 text-violet-400">
                                  {renderIcon(item.icon, 'sm')}
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-white">{item.label}</div>
                                  {item.description && (
                                    <div className="text-white/40 leading-tight" style={{ fontSize: "11px" }}>
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

        {/* Right Side: About + Auth */}
        <div className="hidden lg:flex items-center gap-2">
          {aboutSection && (
            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-white/90 border border-white/20 rounded-full hover:bg-white/5 hover:border-white/30 data-[state=open]:bg-white/5 data-[state=open]:border-violet-400/50 px-4 py-2 h-9">
                    <Info className="h-4 w-4 mr-1.5 flex-shrink-0 opacity-70" />
                    <span>About</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-2 bg-black border border-white/10 rounded-lg shadow-xl shadow-black/20" style={{ width: "190px" }}>
                      <ul className="space-y-1">
                        {aboutSection.items.map((item: HeaderNavItem) => (
                          <li key={item.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={item.href}
                                className="block select-none no-underline outline-none transition-colors hover:bg-white/10 rounded-md"
                              >
                                <div className="flex items-center p-1.5">
                                  <div className="flex items-center justify-center w-7 h-7 mr-2.5 rounded-md border border-white/15 text-violet-400">
                                    {renderIcon(item.icon, 'sm')}
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-white">{item.label}</div>
                                    {item.description && (
                                      <div className="text-white/40 leading-tight" style={{ fontSize: "11px" }}>
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
              </NavigationMenuList>
            </NavigationMenu>
          )}

          {isLoggedIn ? (
            <UserMenuDropdown />
          ) : (
            <LoginDialog />
          )}
        </div>

        {/* Mobile auth (shown on smaller screens) */}
        <div className="flex lg:hidden items-center gap-2">
          {isLoggedIn ? <UserMenuDropdown /> : <LoginDialog />}
        </div>
      </div>

      {/* Gradient bottom border */}
      <div className="h-[2px] bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 opacity-80" />

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
