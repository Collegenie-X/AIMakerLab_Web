"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/buttons/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/overlays/dialog"
import { Input } from "@/components/ui/forms/input"
import { Label } from "@/components/ui/forms/label"
import { Textarea } from "@/components/ui/forms/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/forms/select"
import { MessageSquare, User, GraduationCap, Calendar } from "lucide-react"
import { inquiryConfig } from "@/app/inquiry/config"

export function InquiryFormDialog() {
  const [open, setOpen] = useState(false)
  const [courseValue, setCourseValue] = useState("")
  const [gradeValue, setGradeValue] = useState("")
  const [participantValue, setParticipantValue] = useState("")
  const [durationValue, setDurationValue] = useState("")

  const [courseMode, setCourseMode] = useState<"select" | "input">("select")
  const [gradeMode, setGradeMode] = useState<"select" | "input">("select")
  const [participantMode, setParticipantMode] = useState<"select" | "input">("select")
  const [durationMode, setDurationMode] = useState<"select" | "input">("select")
  const [categoryValue, setCategoryValue] = useState("")

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
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px] z-[200] rounded border-2">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center mb-2">출강 수업 문의하기</DialogTitle>

        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 기본 정보 */}
          <section>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                <MessageSquare className="h-4 w-4" />
                제목 
              </h4>
            
              <div>
                <Input id="title" placeholder="ex> 중학교 자유학기제 프로그램 문의" className="rounded border-2 border-gray-300 focus:border-blue-500 bg-white" required />
              </div>
          </section>
          

          {/* 연락처 정보 */}
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
              <User className="h-4 w-4" />
              연락처 정보
            </h4>
          <section className="rounded border-2 border-gray-300 bg-gray-50/50 p-5">
      
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="name" className="mb-2 ml-2 block text-sm font-medium text-gray-900">요청자명 *</Label>
                <Input id="name" placeholder="이름 (직함, 직책 등)" className="rounded border-2 border-gray-300 bg-white focus:border-blue-500" required />
              </div>
              <div>
                <Label htmlFor="contact" className="mb-2 ml-2 block text-sm font-medium text-gray-900">연락처 *</Label>
                <Input id="contact" type="tel" placeholder="연락처" className="rounded border-2 border-gray-300 bg-white focus:border-blue-500" required />
              </div>
              <div>
                <Label htmlFor="email" className="mb-2 ml-2 block text-sm font-medium text-gray-900">이메일 *</Label>
                <Input id="email" type="email" placeholder="이메일" className="rounded border-2 border-gray-300 bg-white focus:border-blue-500" required />
              </div>
            </div>
          </section>

          {/* 교육 설정 */}
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
              <GraduationCap className="h-4 w-4" />
              교육 설정
            </h4>
          <section className="rounded border-2 border-gray-300 bg-gray-50/50 p-5">
  
            <div className="grid gap-4 md:grid-cols-2">
              {/* 희망 과목 */}
              <div className="flex items-center">
                <Label htmlFor="course" className="block text-sm font-medium text-gray-900 w-20">희망 과목 *</Label>
                {courseMode === "input" ? (
                  <div className="space-y-2">
                    <Input
                      id="course-custom"
                      placeholder="희망 교육 과정을 입력하세요"
                      value={courseValue}
                      onChange={(e) => setCourseValue(e.target.value)}
                      className="rounded border-2 border-gray-300 focus:border-blue-500"
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCourseMode("select")
                        setCourseValue("")
                      }}
                      className="w-full text-xs rounded border-2"
                    >
                      목록에서 선택하기
                    </Button>
                  </div>
                ) : (
                  <Select
                    value={courseValue}
                    onValueChange={(v) => {
                      if (v === "직접입력") {
                        setCourseMode("input")
                        setCourseValue("")
                      } else {
                        setCourseValue(v)
                      }
                    }}
                    required
                  >
                    <SelectTrigger id="course" className="rounded border-2 border-gray-300 bg-white">
                      <SelectValue placeholder="희망 과목 *" />
                    </SelectTrigger>
                    <SelectContent className="z-[210] rounded border-2">
                      {inquiryConfig.formOptions.courses.map((course) => (
                        <SelectItem key={course} value={course}>
                          {course}
                        </SelectItem>
                      ))}
                      <SelectItem value="직접입력">직접 입력</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>

              {/* 학년 */}
              <div className="flex items-center">
                <Label htmlFor="grade" className="block text-sm font-medium text-gray-900 w-20">학년 *</Label>
                {gradeMode === "input" ? (
                  <div className="space-y-2">
                    <Input
                      id="grade-custom"
                      placeholder="학년을 입력하세요"
                      value={gradeValue}
                      onChange={(e) => setGradeValue(e.target.value)}
                      className="rounded border-2 border-gray-300 focus:border-blue-500"
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setGradeMode("select")
                        setGradeValue("")
                      }}
                      className="w-full text-xs rounded border-2"
                    >
                      목록에서 선택하기
                    </Button>
                  </div>
                ) : (
                  <Select
                    value={gradeValue}
                    onValueChange={(v) => {
                      if (v === "직접입력") {
                        setGradeMode("input")
                        setGradeValue("")
                      } else {
                        setGradeValue(v)
                      }
                    }}
                    required
                  >
                    <SelectTrigger id="grade" className="rounded border-2 border-gray-300 bg-white">
                      <SelectValue placeholder="학년 *" />
                    </SelectTrigger>
                    <SelectContent className="z-[210] rounded border-2">
                      {inquiryConfig.formOptions.grades.map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          {grade}
                        </SelectItem>
                      ))}
                      <SelectItem value="직접입력">직접 입력</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>

    

              {/* 참여 인원 */}
              <div className="flex items-center">
                <Label htmlFor="participants" className="block text-sm font-medium text-gray-900 w-20">참여 인원 *</Label>
                {participantMode === "input" ? (
                  <div className="space-y-2">
                    <Input
                      id="participants-custom"
                      placeholder="예상 인원을 입력하세요 (예: 25명)"
                      value={participantValue}
                      onChange={(e) => setParticipantValue(e.target.value)}
                      className="rounded border-2 border-gray-300 focus:border-blue-500"
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setParticipantMode("select")
                        setParticipantValue("")
                      }}
                      className="w-full text-xs rounded border-2"
                    >
                      목록에서 선택하기
                    </Button>
                  </div>
                ) : (
                  <Select
                    value={participantValue}
                    onValueChange={(v) => {
                      if (v === "직접입력") {
                        setParticipantMode("input")
                        setParticipantValue("")
                      } else {
                        setParticipantValue(v)
                      }
                    }}
                    required
                  >
                    <SelectTrigger id="participants" className="rounded border-2 border-gray-300 bg-white">
                      <SelectValue placeholder="참여 인원 *" />
                    </SelectTrigger>
                    <SelectContent className="z-[210] rounded border-2">
                      {inquiryConfig.formOptions.participantCounts.map((count) => (
                        <SelectItem key={count} value={count}>
                          {count}
                        </SelectItem>
                      ))}
                      <SelectItem value="직접입력">직접 입력</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>

              {/* 교육 장소 */}
              <div className="flex items-center">
                <Label htmlFor="location" className="block text-sm font-medium text-gray-900 w-30">교육 장소 *</Label>
                <Input id="location" placeholder="교육 장소" className="rounded border-2 border-gray-300 focus:border-blue-500 bg-white" />
              </div>

              {/* 예산 */}
              <div className="flex items-center">
                <Label htmlFor="budget" className="block text-sm font-medium text-gray-900 w-40">예산 (선택사항)</Label>
                <Input id="budget" placeholder="예산 (선택사항)" className="rounded border-2 border-gray-300 focus:border-blue-500 bg-white w-[200px]" />
              </div>
            </div>
          </section>

          {/* 일정 설정 */}
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
              <Calendar className="h-4 w-4" />
              일정 설정
            </h4>
          <section className="rounded border-2 border-gray-300 bg-gray-50/50 p-5">
      
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="preferred-date" className="mb-2 block text-sm font-medium text-gray-900">희망 날짜 *</Label>
                <Input id="preferred-date" type="date" placeholder="mm/dd/yyyy" className="rounded border-2 border-gray-300 focus:border-blue-500 bg-white" />
              </div>
              <div>
                <Label htmlFor="preferred-time" className="mb-2 block text-sm font-medium text-gray-900">희망 시간 *</Label>
                <Input id="preferred-time" type="time" placeholder="--:-- --" className="rounded border-2 border-gray-300 focus:border-blue-500 bg-white" />
              </div>
              <div>
                <Label htmlFor="duration" className="mb-2 block text-sm font-medium text-gray-900">교육 시간 *</Label>
                {durationMode === "input" ? (
                  <div className="space-y-2">
                    <Input
                      id="duration-custom"
                      placeholder="교육 시간을 입력하세요"
                      value={durationValue}
                      onChange={(e) => setDurationValue(e.target.value)}
                      className="rounded border-2 border-gray-300 focus:border-blue-500"
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setDurationMode("select")
                        setDurationValue("")
                      }}
                      className="w-full text-xs rounded border-2"
                    >
                      목록에서 선택하기
                    </Button>
                  </div>
                ) : (
                  <Select
                    value={durationValue}
                    onValueChange={(v) => {
                      if (v === "직접입력") {
                        setDurationMode("input")
                        setDurationValue("")
                      } else {
                        setDurationValue(v)
                      }
                    }}
                    required
                  >
                    <SelectTrigger id="duration" className="rounded border-2 border-gray-300 bg-white">
                      <SelectValue placeholder="교육 시간 *" />
                    </SelectTrigger>
                    <SelectContent className="rounded border-2 z-[200]">
                      {inquiryConfig.formOptions.durations.map((duration) => (
                        <SelectItem key={duration} value={duration}>
                          {duration}
                        </SelectItem>
                      ))}
                      <SelectItem value="직접입력">직접 입력</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          </section>

          {/* 교육 요청사항 */}
          <section>
            <Label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-900">
              교육 요청사항
            </Label>
            <Textarea
              id="message"
              placeholder="기타 요청사항을 입력해주세요"
              className="min-h-[120px] rounded border-2 border-gray-300 focus:border-blue-500 bg-white"
            />
          </section>

          <DialogDescription className="text-left">
            * 담당자가 최대한 빠르게 연락드리겠습니다.
          </DialogDescription>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1 bg-transparent rounded border-2 border-gray-300 hover:bg-gray-100" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button type="submit" className="flex-1 rounded border-2 border-blue-600 bg-blue-600 hover:bg-blue-700">
              문의 접수
            </Button>
          </div>
        </form>


      </DialogContent>
    </Dialog>
  )
}
