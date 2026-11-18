/**
 * 프로필 정보 폼 컴포넌트
 */

"use client"

import { Button } from "@/components/ui/buttons/button"
import { Input } from "@/components/ui/forms/input"
import { Label } from "@/components/ui/forms/label"
import { Card } from "@/components/ui/data-display/card"
import { User, Mail, Phone, MapPin } from "lucide-react"
import { dashboardTexts } from "../../config"
import type { UserProfile } from "@/hooks/use-profile"

interface ProfileFormProps {
  userEmail: string
  profile: UserProfile
  onProfileChange: (profile: UserProfile) => void
  onSubmit: (e: React.FormEvent) => void
}

/**
 * 사용자 프로필 정보를 수정하는 폼 컴포넌트
 */
export function ProfileForm({ userEmail, profile, onProfileChange, onSubmit }: ProfileFormProps) {
  const { labels, placeholders, hints, buttons } = dashboardTexts.profile

  return (
    <Card className="p-6">
      <form onSubmit={onSubmit} className="space-y-4">
        {/* 이름 */}
        <div className="space-y-2">
          <Label htmlFor="name">{labels.name}</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="name"
              type="text"
              className="pl-10"
              placeholder={placeholders.name}
              value={profile.name}
              onChange={(e) => onProfileChange({ ...profile, name: e.target.value })}
            />
          </div>
        </div>

        {/* 이메일 */}
        <div className="space-y-2">
          <Label htmlFor="email">{labels.email}</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="email"
              type="email"
              className="pl-10 bg-gray-50"
              value={userEmail}
              disabled
            />
          </div>
          <p className="text-sm text-gray-500">{hints.emailReadonly}</p>
        </div>

        {/* 연락처 */}
        <div className="space-y-2">
          <Label htmlFor="phone">{labels.phone}</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="phone"
              type="tel"
              className="pl-10"
              placeholder={placeholders.phone}
              value={profile.phone}
              onChange={(e) => onProfileChange({ ...profile, phone: e.target.value })}
            />
          </div>
        </div>

        {/* 주소 */}
        <div className="space-y-2">
          <Label htmlFor="address">{labels.address}</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="address"
              type="text"
              className="pl-10"
              placeholder={placeholders.address}
              value={profile.address}
              onChange={(e) => onProfileChange({ ...profile, address: e.target.value })}
            />
          </div>
        </div>

        <Button type="submit" className="w-full md:w-auto">
          {buttons.updateProfile}
        </Button>
      </form>
    </Card>
  )
}

