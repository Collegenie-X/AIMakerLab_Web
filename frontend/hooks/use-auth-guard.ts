/**
 * 인증 체크 및 리다이렉트를 위한 커스텀 훅
 */

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth/email-verification"

/**
 * 로그인 여부를 체크하고 비로그인시 리다이렉트하는 훅
 */
export function useAuthGuard() {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const email = getCurrentUser()
      
      if (!email) {
        router.push("/")
        return
      }
      
      setUserEmail(email)
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  return { userEmail, isLoading }
}

