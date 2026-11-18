"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuthGuard } from "@/hooks/use-auth-guard"
import { useProfileUpdate, usePasswordChange } from "@/hooks/use-profile"
import { Card } from "@/components/ui/data-display/card"
import { Button } from "@/components/ui/buttons/button"
import { Input } from "@/components/ui/forms/input"
import { Label } from "@/components/ui/forms/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/navigation/tabs"
import { User, Mail, Phone, MapPin, Lock, Eye, EyeOff } from "lucide-react"

/**
 * 프로필 페이지 (Udemy 스타일)
 * 헤더, 푸터가 있는 일반 페이지 구조
 */
export default function MyProfilePage() {
  const { userEmail } = useAuthGuard()
  const profileHook = useProfileUpdate(userEmail || "")
  const passwordHook = usePasswordChange(userEmail || "")

  // 로그인하지 않은 경우
  if (!userEmail) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <User className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">로그인이 필요합니다</h2>
            <p className="text-gray-600 mb-4">프로필을 확인하려면 로그인해주세요.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    profileHook.updateProfile(profileHook.profile)
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    passwordHook.changePassword()
  }

  const currentMessage = profileHook.message || passwordHook.message

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gray-50">
        {/* 심플한 헤더 */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">프로필 설정</h1>
            <p className="text-gray-600">회원 정보와 보안 설정을 관리하세요</p>
          </div>
        </div>

        {/* 프로필 설정 섹션 */}
        <div className="container mx-auto px-4 py-8">

          {/* 메시지 표시 */}
          {currentMessage && (
            <div
              className={`mb-6 rounded-lg px-4 py-3 ${
                currentMessage.type === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {currentMessage.text}
            </div>
          )}

          {/* 프로필 정보 섹션 */}
          <div className="mb-8">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-900 mb-1">개인 정보</h2>
              <p className="text-sm text-gray-600">개인 정보 및 연락처 정보를 업데이트하세요</p>
            </div>
            
            <Card className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  {/* 이름 */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">이름</Label>
                    <Input
                      id="name"
                      type="text"
                      className="h-10"
                      placeholder="홍길동"
                      value={profileHook.profile.name}
                      onChange={(e) =>
                        profileHook.setProfile({ ...profileHook.profile, name: e.target.value })
                      }
                    />
                  </div>

                  {/* 이메일 */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">이메일</Label>
                    <Input
                      id="email"
                      type="email"
                      className="h-10 bg-gray-50"
                      value={userEmail}
                      disabled
                    />
                  </div>

                  {/* 연락처 */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">연락처</Label>
                    <Input
                      id="phone"
                      type="tel"
                      className="h-10"
                      placeholder="010-1234-5678"
                      value={profileHook.profile.phone}
                      onChange={(e) =>
                        profileHook.setProfile({ ...profileHook.profile, phone: e.target.value })
                      }
                    />
                  </div>

                  {/* 주소 */}
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-sm font-medium text-gray-700">주소</Label>
                    <Input
                      id="address"
                      type="text"
                      className="h-10"
                      placeholder="서울시 강남구"
                      value={profileHook.profile.address}
                      onChange={(e) =>
                        profileHook.setProfile({
                          ...profileHook.profile,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>

                  <Button type="submit" className="w-full md:w-auto">
                    변경사항 저장
                  </Button>
                </form>
              </Card>
            </div>

            {/* 보안 설정 섹션 */}
            <div className="mb-8">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900 mb-1">계정 설정</h2>
                <p className="text-sm text-gray-600">계정 보안 및 환경 설정을 관리하세요</p>
              </div>
              
              <Card className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="space-y-6">
                  <div className="pb-4 border-b">
                    <h3 className="font-semibold text-gray-900 mb-1">비밀번호 변경</h3>
                    <p className="text-sm text-gray-600">계정을 안전하게 유지하기 위해 비밀번호를 업데이트하세요</p>
                  </div>
                  
                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    {/* 현재 비밀번호 */}
                    <div className="space-y-2">
                      <Label htmlFor="current-password" className="text-sm font-medium text-gray-700">
                        현재 비밀번호
                      </Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          type={passwordHook.showCurrentPassword ? "text" : "password"}
                          className="h-10 pr-10"
                          value={passwordHook.currentPassword}
                          onChange={(e) => passwordHook.setCurrentPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          onClick={() =>
                            passwordHook.setShowCurrentPassword(!passwordHook.showCurrentPassword)
                          }
                          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                        >
                          {passwordHook.showCurrentPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* 새 비밀번호 */}
                    <div className="space-y-2">
                      <Label htmlFor="new-password" className="text-sm font-medium text-gray-700">
                        새 비밀번호
                      </Label>
                      <div className="relative">
                        <Input
                          id="new-password"
                          type={passwordHook.showNewPassword ? "text" : "password"}
                          className="h-10 pr-10"
                          value={passwordHook.newPassword}
                          onChange={(e) => passwordHook.setNewPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => passwordHook.setShowNewPassword(!passwordHook.showNewPassword)}
                          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                        >
                          {passwordHook.showNewPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* 새 비밀번호 확인 */}
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
                        새 비밀번호 확인
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirm-password"
                          type={passwordHook.showConfirmPassword ? "text" : "password"}
                          className="h-10 pr-10"
                          value={passwordHook.confirmPassword}
                          onChange={(e) => passwordHook.setConfirmPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          onClick={() =>
                            passwordHook.setShowConfirmPassword(!passwordHook.showConfirmPassword)
                          }
                          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                        >
                          {passwordHook.showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full md:w-auto">
                      비밀번호 변경
                    </Button>
                  </form>
                </div>
              </Card>
            </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

