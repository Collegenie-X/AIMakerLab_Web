/**
 * 보안 설정 폼 컴포넌트
 */

"use client"

import { Button } from "@/components/ui/buttons/button"
import { Input } from "@/components/ui/forms/input"
import { Label } from "@/components/ui/forms/label"
import { Card } from "@/components/ui/data-display/card"
import { Eye, EyeOff } from "lucide-react"
import { dashboardTexts } from "../../config"

interface SecurityFormProps {
  currentPassword: string
  newPassword: string
  confirmPassword: string
  showCurrentPassword: boolean
  showNewPassword: boolean
  showConfirmPassword: boolean
  onCurrentPasswordChange: (value: string) => void
  onNewPasswordChange: (value: string) => void
  onConfirmPasswordChange: (value: string) => void
  onToggleCurrentPassword: () => void
  onToggleNewPassword: () => void
  onToggleConfirmPassword: () => void
  onSubmit: (e: React.FormEvent) => void
}

/**
 * 비밀번호 변경 폼 컴포넌트
 */
export function SecurityForm({
  currentPassword,
  newPassword,
  confirmPassword,
  showCurrentPassword,
  showNewPassword,
  showConfirmPassword,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onToggleCurrentPassword,
  onToggleNewPassword,
  onToggleConfirmPassword,
  onSubmit,
}: SecurityFormProps) {
  const { labels, hints, buttons } = dashboardTexts.profile

  return (
    <Card className="p-6">
      <form onSubmit={onSubmit} className="space-y-4">
        {/* 현재 비밀번호 */}
        <div className="space-y-2">
          <Label htmlFor="current-password">{labels.currentPassword}</Label>
          <div className="relative">
            <Input
              id="current-password"
              type={showCurrentPassword ? "text" : "password"}
              className="pr-10"
              value={currentPassword}
              onChange={(e) => onCurrentPasswordChange(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={onToggleCurrentPassword}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* 새 비밀번호 */}
        <div className="space-y-2">
          <Label htmlFor="new-password">{labels.newPassword}</Label>
          <div className="relative">
            <Input
              id="new-password"
              type={showNewPassword ? "text" : "password"}
              className="pr-10"
              value={newPassword}
              onChange={(e) => onNewPasswordChange(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={onToggleNewPassword}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          <p className="text-sm text-gray-500">{hints.passwordLength}</p>
        </div>

        {/* 새 비밀번호 확인 */}
        <div className="space-y-2">
          <Label htmlFor="confirm-password">{labels.confirmPassword}</Label>
          <div className="relative">
            <Input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              className="pr-10"
              value={confirmPassword}
              onChange={(e) => onConfirmPasswordChange(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={onToggleConfirmPassword}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <Button type="submit" className="w-full md:w-auto">
          {buttons.changePassword}
        </Button>
      </form>
    </Card>
  )
}

