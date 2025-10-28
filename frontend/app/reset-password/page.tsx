"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/buttons/button"
import { Input } from "@/components/ui/forms/input"
import { Label } from "@/components/ui/forms/label"
import { Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react"
import { verifyResetToken, resetPassword } from "@/lib/auth/email-verification"

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"verifying" | "invalid" | "valid" | "success" | "error">("verifying")
  const [message, setMessage] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    const email = searchParams.get("email")
    const token = searchParams.get("token")

    if (!email || !token) {
      setStatus("invalid")
      setMessage("유효하지 않은 비밀번호 재설정 링크입니다.")
      return
    }

    const result = verifyResetToken(email, token)
    if (result.ok) {
      setStatus("valid")
    } else {
      setStatus("invalid")
      setMessage(result.error || "유효하지 않은 비밀번호 재설정 링크입니다.")
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const email = searchParams.get("email")
    const token = searchParams.get("token")

    if (!email || !token) {
      setStatus("error")
      setMessage("유효하지 않은 요청입니다.")
      return
    }

    if (password !== confirmPassword) {
      setStatus("error")
      setMessage("비밀번호가 일치하지 않습니다.")
      return
    }

    if (password.length < 8) {
      setStatus("error")
      setMessage("비밀번호는 8자 이상이어야 합니다.")
      return
    }

    const result = resetPassword(email, token, password)
    if (result.ok) {
      setStatus("success")
      setMessage("비밀번호가 성공적으로 재설정되었습니다.")
      // 3초 후 로그인 페이지로 이동
      setTimeout(() => {
        router.push("/")
      }, 3000)
    } else {
      setStatus("error")
      setMessage(result.error || "비밀번호 재설정에 실패했습니다.")
    }
  }

  if (status === "verifying") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg text-center">
          <div className="mb-4 text-4xl animate-pulse">⏳</div>
          <h1 className="mb-2 text-2xl font-bold text-gray-800">링크 확인 중...</h1>
          <p className="text-gray-600">잠시만 기다려 주세요.</p>
        </div>
      </div>
    )
  }

  if (status === "invalid") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg text-center">
          <XCircle className="mx-auto mb-4 h-16 w-16 text-red-500" />
          <h1 className="mb-2 text-2xl font-bold text-red-700">유효하지 않은 링크</h1>
          <p className="text-gray-600">{message}</p>
          <Button
            className="mt-6"
            onClick={() => router.push("/")}
          >
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    )
  }

  if (status === "success") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg text-center">
          <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-500" />
          <h1 className="mb-2 text-2xl font-bold text-green-700">비밀번호 재설정 완료</h1>
          <p className="text-gray-600">{message}</p>
          <p className="mt-4 text-sm text-gray-500">잠시 후 로그인 페이지로 이동합니다...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-center">새 비밀번호 설정</h1>

        {status === "error" && (
          <div className="mb-6 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">새 비밀번호</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">새 비밀번호 확인</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full">
            비밀번호 변경
          </Button>
        </form>
      </div>
    </div>
  )
}
