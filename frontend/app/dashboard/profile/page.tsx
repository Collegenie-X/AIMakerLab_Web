"use client"

import { useAuthGuard } from "@/hooks/use-auth-guard"
import { useProfileUpdate, usePasswordChange } from "@/hooks/use-profile"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/navigation/tabs"
import { User, Lock } from "lucide-react"
import { ProfileForm } from "./components/profile-form"
import { SecurityForm } from "./components/security-form"
import { dashboardTexts } from "../config"

/**
 * 사용자 프로필 관리 페이지
 * 개인정보 수정 및 비밀번호 변경 기능 제공
 */
export default function ProfilePage() {
  const { userEmail } = useAuthGuard()
  const profileHook = useProfileUpdate(userEmail || "")
  const passwordHook = usePasswordChange(userEmail || "")

  if (!userEmail) {
    return null
  }

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    profileHook.updateProfile(profileHook.profile)
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    passwordHook.changePassword()
  }

  // 메시지 표시 (프로필 또는 비밀번호 변경)
  const currentMessage = profileHook.message || passwordHook.message

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">{dashboardTexts.profile.title}</h1>

      {/* 메시지 표시 */}
      {currentMessage && (
        <div
          className={`mb-6 rounded-lg px-4 py-3 ${
            currentMessage.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {currentMessage.text}
        </div>
      )}

      {/* 탭 */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            {dashboardTexts.profile.tabs.profile}
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Lock className="h-4 w-4" />
            {dashboardTexts.profile.tabs.security}
          </TabsTrigger>
        </TabsList>

        {/* 프로필 정보 탭 */}
        <TabsContent value="profile">
          <ProfileForm
            userEmail={userEmail}
            profile={profileHook.profile}
            onProfileChange={profileHook.setProfile}
            onSubmit={handleProfileSubmit}
          />
        </TabsContent>

        {/* 보안 설정 탭 */}
        <TabsContent value="security">
          <SecurityForm
            currentPassword={passwordHook.currentPassword}
            newPassword={passwordHook.newPassword}
            confirmPassword={passwordHook.confirmPassword}
            showCurrentPassword={passwordHook.showCurrentPassword}
            showNewPassword={passwordHook.showNewPassword}
            showConfirmPassword={passwordHook.showConfirmPassword}
            onCurrentPasswordChange={passwordHook.setCurrentPassword}
            onNewPasswordChange={passwordHook.setNewPassword}
            onConfirmPasswordChange={passwordHook.setConfirmPassword}
            onToggleCurrentPassword={() =>
              passwordHook.setShowCurrentPassword(!passwordHook.showCurrentPassword)
            }
            onToggleNewPassword={() => passwordHook.setShowNewPassword(!passwordHook.showNewPassword)}
            onToggleConfirmPassword={() =>
              passwordHook.setShowConfirmPassword(!passwordHook.showConfirmPassword)
            }
            onSubmit={handlePasswordSubmit}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
