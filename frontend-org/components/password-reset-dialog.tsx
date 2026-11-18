"use client"

import { useState } from "react"
import { Button } from "@/components/ui/buttons/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/overlays/dialog"
import { Input } from "@/components/ui/forms/input"
import { Label } from "@/components/ui/forms/label"

interface PasswordResetDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PasswordResetDialog({ open, onOpenChange }: PasswordResetDialogProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    setMessage("")

    try {
      // TODO: 실제 API 연동
      // const response = await resetPassword(email)
      await new Promise(resolve => setTimeout(resolve, 1000)) // 데모용 딜레이
      
      setStatus("sent")
      setMessage("이메일로 재설정 링크를 발송했습니다.")
      
      // 성공 후 3초 뒤 닫기
      setTimeout(() => {
        onOpenChange(false)
        setStatus("idle")
        setEmail("")
        setMessage("")
      }, 3000)
    } catch (error) {
      setStatus("idle")
      setMessage("오류가 발생했습니다. 다시 시도해주세요.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">비밀번호 찾기</DialogTitle>
        </DialogHeader>

        {message && (
          <div className={`rounded-md px-3 py-2 text-sm ${
            status === "sent" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="reset-email">이메일 주소</Label>
            <Input
              id="reset-email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12"
              required
              disabled={status === "sending" || status === "sent"}
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12"
            disabled={status === "sending" || status === "sent"}
          >
            {status === "sending" ? "처리 중..." : "재설정 링크 받기"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}