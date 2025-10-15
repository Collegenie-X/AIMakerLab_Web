"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare } from "lucide-react"

export function InquiryFormDialog() {
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert("문의가 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2">
          <MessageSquare className="h-5 w-5" />
          출강 수업 문의하기
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">출강 수업 문의</DialogTitle>
          <DialogDescription>
            기관이나 단체로 출강 수업을 원하시면 아래 양식을 작성해주세요. 담당자가 빠르게 연락드리겠습니다.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">이름 *</Label>
            <Input id="name" placeholder="홍길동" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="organization">기관/단체명 *</Label>
            <Input id="organization" placeholder="예: OO초등학교, OO기업" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">연락처 *</Label>
            <Input id="phone" type="tel" placeholder="010-1234-5678" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">이메일 *</Label>
            <Input id="email" type="email" placeholder="example@email.com" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="course">희망 교육 과정 *</Label>
            <Select required>
              <SelectTrigger id="course">
                <SelectValue placeholder="교육 과정을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="app-inventor">앱 인벤터 코딩</SelectItem>
                <SelectItem value="arduino">아두이노 코딩</SelectItem>
                <SelectItem value="raspberry-pi">Raspberry Pi 코딩</SelectItem>
                <SelectItem value="ai">AI 교육 프로그램</SelectItem>
                <SelectItem value="robot">로봇 코딩</SelectItem>
                <SelectItem value="web">웹 개발</SelectItem>
                <SelectItem value="other">기타 (상담 필요)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="participants">예상 인원</Label>
            <Input id="participants" type="number" placeholder="예: 20" min="1" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferred-date">희망 일정</Label>
            <Input id="preferred-date" placeholder="예: 2025년 3월 중" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">문의 내용 *</Label>
            <Textarea
              id="message"
              placeholder="출강 수업에 대해 궁금하신 점이나 요청사항을 자유롭게 작성해주세요."
              className="min-h-[120px]"
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button type="submit" className="flex-1">
              문의 접수
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
