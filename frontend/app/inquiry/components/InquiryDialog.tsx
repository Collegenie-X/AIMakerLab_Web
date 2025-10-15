"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/overlays/dialog"
import { Button } from "@/components/ui/buttons/button"
import { Input } from "@/components/ui/forms/input"
import { Label } from "@/components/ui/forms/label"
import { Textarea } from "@/components/ui/forms/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/forms/select"
import { User, GraduationCap, Calendar, MessageSquare } from "lucide-react"
import type { InquiryItem } from "../config"
import { inquiryConfig } from "../config"

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
  initial?: InquiryItem
  onSave: (item: InquiryItem) => void
  onDelete?: (id: number) => void
}

export function InquiryDialog({ open, onOpenChange, initial, onSave, onDelete }: Props) {
  const [formData, setFormData] = useState<InquiryItem>(
    initial ?? { id: Date.now(), title: "", category: "", status: "검토중", date: new Date().toISOString().slice(0, 10) }
  )

  const [courseValue, setCourseValue] = useState(initial?.course ?? "")
  const [courseMode, setCourseMode] = useState<"select" | "input">(
    initial?.course && !inquiryConfig.formOptions.courses.includes(initial.course) ? "input" : "select"
  )

  const [gradeValue, setGradeValue] = useState(initial?.grade ?? "")
  const [gradeMode, setGradeMode] = useState<"select" | "input">(
    initial?.grade && !inquiryConfig.formOptions.grades.includes(initial.grade) ? "input" : "select"
  )

  const [participantValue, setParticipantValue] = useState(initial?.participantCount ?? "")
  const [participantMode, setParticipantMode] = useState<"select" | "input">(
    initial?.participantCount && !inquiryConfig.formOptions.participantCounts.includes(initial.participantCount) ? "input" : "select"
  )

  const [durationValue, setDurationValue] = useState(initial?.duration ?? "")
  const [durationMode, setDurationMode] = useState<"select" | "input">(
    initial?.duration && !inquiryConfig.formOptions.durations.includes(initial.duration) ? "input" : "select"
  )

  // Sync when switching between different items
  useEffect(() => {
    if (initial) {
      setFormData(initial)
      setCourseValue(initial.course ?? "")
      setCourseMode(initial.course && !inquiryConfig.formOptions.courses.includes(initial.course) ? "input" : "select")
      setGradeValue(initial.grade ?? "")
      setGradeMode(initial.grade && !inquiryConfig.formOptions.grades.includes(initial.grade) ? "input" : "select")
      setParticipantValue(initial.participantCount ?? "")
      setParticipantMode(
        initial.participantCount && !inquiryConfig.formOptions.participantCounts.includes(initial.participantCount)
          ? "input"
          : "select",
      )
      setDurationValue(initial.duration ?? "")
      setDurationMode(initial.duration && !inquiryConfig.formOptions.durations.includes(initial.duration) ? "input" : "select")
    } else {
      setFormData({ id: Date.now(), title: "", category: "", status: "검토중", date: new Date().toISOString().slice(0, 10) })
      setCourseValue("")
      setCourseMode("select")
      setGradeValue("")
      setGradeMode("select")
      setParticipantValue("")
      setParticipantMode("select")
      setDurationValue("")
      setDurationMode("select")
    }
  }, [initial])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    onSave({
      ...formData,
      course: courseValue,
      grade: gradeValue,
      participantCount: participantValue,
      duration: durationValue,
    })
    onOpenChange(false)
  }

  const handleDelete = () => {
    if (initial && onDelete) {
      onDelete(initial.id)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto z-[200]">
        <DialogHeader>
          <DialogTitle className="text-xl">{initial ? formData.title || "문의 수정" : "출강 수업 문의"}</DialogTitle>
          <DialogDescription>
            기관이나 단체로 출강 수업을 원하시면 아래 양식을 작성해주세요. 담당자가 빠르게 연락드리겠습니다.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 기본 정보 */}
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
              <MessageSquare className="h-4 w-4" />
              기본 정보
            </h4>
          <section className="rounded-lg border p-4">
 
            <div className="space-y-3">
              <div>
                <Label htmlFor="title" className="mb-1 block">제목 *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="중학교 자유학기제 프로그램 문의"
                  required
                />
              </div>
              {/* 수정 모드일 때만 교육과정과 상태 표시 (관리자 전용, 수정 불가) */}
            </div>
          </section>

          {/* 연락처 정보 */}
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
              <User className="h-4 w-4" />
              연락처 정보
            </h4>
          <section className="rounded-lg border p-4">
    
            <div className="grid gap-3 md:grid-cols-3">
              <div>
                <Label htmlFor="name" className="mb-1 block">요청자명 *</Label>
                <Input
                  id="name"
                  value={formData.requesterName ?? ""}
                  onChange={(e) => setFormData({ ...formData, requesterName: e.target.value })}
                  placeholder="요청자명"
                  required
                />
              </div>
              <div>
                <Label htmlFor="contact" className="mb-1 block">연락처 *</Label>
                <Input
                  id="contact"
                  type="tel"
                  value={formData.requesterContact ?? ""}
                  onChange={(e) => setFormData({ ...formData, requesterContact: e.target.value })}
                  placeholder="연락처"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="mb-1 block">이메일 *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.requesterEmail ?? ""}
                  onChange={(e) => setFormData({ ...formData, requesterEmail: e.target.value })}
                  placeholder="이메일"
                  required
                />
              </div>
            </div>
          </section>

          {/* 교육 설정 */}
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
              <GraduationCap className="h-4 w-4" />
              교육 설정
            </h4>
          <section className="rounded-lg border p-4">
      
            <div className="grid gap-3 md:grid-cols-2">
              {/* 희망 과목 */}
              <div>
                <Label htmlFor="course" className="mb-1 block">희망 과목 *</Label>
                {courseMode === "input" ? (
                  <div className="space-y-2">
                    <Input
                      id="course-custom"
                      placeholder="희망 교육 과정을 입력하세요"
                      value={courseValue}
                      onChange={(e) => setCourseValue(e.target.value)}
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
                      className="w-full text-xs"
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
                    <SelectTrigger id="course">
                      <SelectValue placeholder="희망 과목 *" />
                    </SelectTrigger>
                    <SelectContent>
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
              <div>
                <Label htmlFor="grade" className="mb-1 block">학년 *</Label>
                {gradeMode === "input" ? (
                  <div className="space-y-2">
                    <Input
                      id="grade-custom"
                      placeholder="학년을 입력하세요"
                      value={gradeValue}
                      onChange={(e) => setGradeValue(e.target.value)}
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
                      className="w-full text-xs"
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
                    <SelectTrigger id="grade">
                      <SelectValue placeholder="학년 *" />
                    </SelectTrigger>
                    <SelectContent>
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
              <div>
                <Label htmlFor="participants" className="mb-1 block">참여 인원 *</Label>
                {participantMode === "input" ? (
                  <div className="space-y-2">
                    <Input
                      id="participants-custom"
                      placeholder="예상 인원을 입력하세요 (예: 25명)"
                      value={participantValue}
                      onChange={(e) => setParticipantValue(e.target.value)}
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
                      className="w-full text-xs"
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
                    <SelectTrigger id="participants">
                      <SelectValue placeholder="참여 인원 *" />
                    </SelectTrigger>
                    <SelectContent>
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
              <div>
                <Label htmlFor="location" className="mb-1 block">교육 장소 *</Label>
                <Input
                  id="location"
                  value={formData.location ?? ""}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="교육 장소"
                />
              </div>

              {/* 예산 */}
              <div className="md:col-span-2">
                <Label htmlFor="budget" className="mb-1 block">예산 (선택사항)</Label>
                <Input
                  id="budget"
                  value={formData.budget ?? ""}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder="예산 (선택사항)"
                />
              </div>
            </div>
          </section>

          {/* 일정 설정 */}

          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
              <Calendar className="h-4 w-4" />
              희망 일정
            </h4>
          <section className="rounded-lg border p-4">
    
            <div className="grid gap-3 md:grid-cols-3">
              <div>
                <Label htmlFor="preferred-date" className="mb-1 block">희망 날짜 *</Label>
                <Input
                  id="preferred-date"
                  type="date"
                  value={formData.preferredDate ?? ""}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  placeholder="mm/dd/yyyy"
                />
              </div>
              <div>
                <Label htmlFor="preferred-time" className="mb-1 block">희망 시간 *</Label>
                <Input
                  id="preferred-time"
                  type="time"
                  value={formData.preferredTime ?? ""}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  placeholder="--:-- --"
                />
              </div>
              <div>
                <Label htmlFor="duration" className="mb-1 block">교육 시간 *</Label>
                {durationMode === "input" ? (
                  <div className="space-y-2">
                    <Input
                      id="duration-custom"
                      placeholder="교육 시간을 입력하세요"
                      value={durationValue}
                      onChange={(e) => setDurationValue(e.target.value)}
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
                      className="w-full text-xs"
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
                    <SelectTrigger id="duration">
                      <SelectValue placeholder="교육 시간 *" />
                    </SelectTrigger>
                    <SelectContent>
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
            <Label htmlFor="message" className="mb-2 block">
              교육 요청사항
            </Label>
            <Textarea
              id="message"
              value={formData.content ?? ""}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="기타 요청사항을 입력해주세요"
              className="min-h-[120px]"
            />
          </section>

          <div className="flex gap-2 pt-4">
            {initial && (
              <Button type="button" variant="destructive" onClick={handleDelete} className="mr-auto">
                삭제
              </Button>
            )}
            <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => onOpenChange(false)}>
              취소
            </Button>
            <Button type="submit" className="flex-1">
              {initial ? "수정 완료" : "문의 접수"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
