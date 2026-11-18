/**
 * 프로필 관리를 위한 커스텀 훅
 */

import { useState } from "react"
import { updatePassword } from "@/lib/auth/email-verification"
import { dashboardTexts } from "@/app/dashboard/config"

/**
 * 사용자 프로필 정보 타입
 */
export interface UserProfile {
  name: string
  phone: string
  address: string
}

/**
 * 메시지 타입
 */
interface Message {
  text: string
  type: "success" | "error"
}

/**
 * 프로필 업데이트 훅
 */
export function useProfileUpdate(userEmail: string) {
  const [profile, setProfile] = useState<UserProfile>({
    name: "홍길동",
    phone: "010-1234-5678",
    address: "서울시 강남구",
  })
  const [message, setMessage] = useState<Message | null>(null)

  const updateProfile = (updatedProfile: UserProfile) => {
    // TODO: 백엔드 API로 프로필 업데이트 요청
    setProfile(updatedProfile)
    setMessage({
      text: dashboardTexts.profile.messages.profileUpdateSuccess,
      type: "success",
    })
  }

  return { profile, setProfile, message, setMessage, updateProfile }
}

/**
 * 비밀번호 변경 훅
 */
export function usePasswordChange(userEmail: string) {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState<Message | null>(null)

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const changePassword = () => {
    // 유효성 검사
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage({
        text: dashboardTexts.profile.messages.allFieldsRequired,
        type: "error",
      })
      return false
    }

    if (newPassword !== confirmPassword) {
      setMessage({
        text: dashboardTexts.profile.messages.passwordMismatch,
        type: "error",
      })
      return false
    }

    if (newPassword.length < 6) {
      setMessage({
        text: dashboardTexts.profile.messages.passwordTooShort,
        type: "error",
      })
      return false
    }

    // 비밀번호 변경 시도
    const result = updatePassword(userEmail, currentPassword, newPassword)
    if (result.ok) {
      setMessage({
        text: dashboardTexts.profile.messages.passwordChangeSuccess,
        type: "success",
      })
      // 입력 필드 초기화
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      return true
    } else {
      setMessage({
        text: result.error || "비밀번호 변경에 실패했습니다.",
        type: "error",
      })
      return false
    }
  }

  return {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    message,
    setMessage,
    showCurrentPassword,
    setShowCurrentPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    changePassword,
  }
}

