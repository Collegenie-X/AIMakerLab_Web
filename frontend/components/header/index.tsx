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
import { headerBrand, headerNavSections, headerUIConfig } from "@/components/header/config"
import type { HeaderNavItem, HeaderNavSection } from "@/components/header/config"
import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import { themeText, themeColors } from "@/theme"

export function Header() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 240)
    }
    window.addEventListener("scroll", onScroll)
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <header className="sticky top-0 z-[10] w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <MobileDrawer />
          <Link href="/" className="flex items-center space-x-2">
            <span className={`${themeText.brandTitle} ${themeColors.brandPrimary}`}>{headerBrand.primary}</span>
            <span className={`${themeText.brandTitle} ${themeColors.brandSecondary}`}>{headerBrand.secondary}</span>
          </Link>
        </div>

        <NavigationMenu className="hidden md:flex" viewport={false}>
          <NavigationMenuList className="flex gap-6">
            {headerNavSections.map((section: HeaderNavSection) => (
            <NavigationMenuItem key={section.title}>
                <NavigationMenuTrigger className={`text-base font-medium ${themeColors.body}`}>
                  {section.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul
                    className={`grid ${headerUIConfig.submenuWidthClass || "w-[180px]"} gap-1 p-2`}
                    style={
                      section.width
                        ? { width: typeof section.width === "number" ? `${section.width}px` : `${section.width}px` }
                        : undefined
                    }
                  >
                    {section.items.map((item: HeaderNavItem) => (
                      <li key={item.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className={`block select-none rounded-md px-3 py-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${themeColors.body}`}
                          >
                            <div className={`text-sm font-medium leading-none ${themeColors.body}`}>{item.label}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <LoginDialog />
          {/* <RegisterDialog /> */}
        </div>
      </div>

      {showTop && (
        <div className="fixed bottom-6 right-6 z-[150]">
          <Button size="icon" variant="secondary" onClick={handleScrollTop} aria-label="맨 위로">
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      )}
    </header>
  )
}

export default Header


