"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/overlays/dialog"
import { Button } from "@/components/ui/buttons/button"
import { Badge } from "@/components/ui/data-display/badge"
import { User, GraduationCap, Calendar, MessageSquare, Mail, Phone, MapPin, DollarSign, Clock, Users } from "lucide-react"
import type { InquiryItem } from "../config"

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
  item: InquiryItem
  onEdit: () => void
  onDelete: () => void
}

function StatusBadge({ status }: { status: string }) {
  const config = {
    확정: { bg: 'bg-green-900/40', text: 'text-green-400' },
    완료: { bg: 'bg-emerald-900/40', text: 'text-emerald-400' },
    견적발송: { bg: 'bg-blue-900/40', text: 'text-blue-400' },
    검토중: { bg: 'bg-orange-900/40', text: 'text-orange-400' },
    접수대기: { bg: 'bg-gray-800', text: 'text-gray-400' },
  }[status] ?? { bg: 'bg-gray-800', text: 'text-gray-400' }

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${config.bg} ${config.text}`}>
      {status}
    </span>
  )
}

export function InquiryViewDialog({ open, onOpenChange, item, onEdit, onDelete }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto z-[200] bg-gray-950 border-gray-800 text-gray-200">
        <DialogHeader>
          <DialogTitle className="text-2xl pr-10 text-white">{item.title}</DialogTitle>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3 text-sm text-gray-400">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-gray-700 bg-gray-800 text-gray-300">
                {item.category}
              </Badge>
              <span>• {item.date}</span>
            </div>
            <StatusBadge status={item.status} />
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* 연락처 정보 */}
          {(item.requesterName || item.requesterContact || item.requesterEmail) && (
            <>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-300">
              <User className="h-4 w-4" />
              연락처 정보
            </h4>
            <section className="rounded-lg border border-gray-800 bg-gray-900 p-4">

              <div className="grid gap-3 text-sm">
                {item.requesterName && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-500">요청자명:</span>
                    <span className="font-medium text-white">{item.requesterName}</span>
                  </div>
                )}
                {item.requesterContact && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-500">연락처:</span>
                    <span className="font-medium text-white">{item.requesterContact}</span>
                  </div>
                )}
                {item.requesterEmail && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-500">이메일:</span>
                    <span className="font-medium text-white">{item.requesterEmail}</span>
                  </div>
                )}
              </div>
            </section>
            </>
          )}

          {/* 교육 설정 */}
          {(item.course || item.grade || item.participantCount || item.location || item.budget) && (
         <>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-300">
                    <GraduationCap className="h-4 w-4" />
                    교육 설정
                  </h4>
            <section className="rounded-lg border border-gray-800 bg-gray-900 p-4">

                  <div className="grid gap-3 text-sm md:grid-cols-2">
                    {item.course && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">희망 과목:</span>
                        <span className="font-medium text-white break-words">{item.course}</span>
                      </div>
                    )}
                    {item.grade && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">학년:</span>
                        <span className="font-medium text-white break-words">{item.grade}</span>
                      </div>
                    )}
                    {item.participantCount && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-500">참여 인원:</span>
                        <span className="font-medium text-white break-words">{item.participantCount}</span>
                      </div>
                    )}
                    {item.location && (
                      <div className="flex items-center gap-2 md:col-span-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-500">교육 장소:</span>
                        <span className="font-medium text-white break-words">{item.location}</span>
                      </div>
                    )}
                    {item.budget && (
                      <div className="col-span-2 flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-500">예산:</span>
                        <span className="font-medium text-white break-words">{item.budget}</span>
                      </div>
                    )}
                  </div>
                </section>
            </>
          )}

          {/* 일정 설정 */}
          {(item.preferredDate || item.preferredTime || item.duration) && (
            <>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-300">
              <Calendar className="h-4 w-4" />
              희망 일정
            </h4>
            <section className="rounded-lg border border-gray-800 bg-gray-900 p-4">
              <div className="grid gap-3 text-sm md:grid-cols-3">
                {item.preferredDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <p className="font-medium text-white">{item.preferredDate}</p>
                  </div>
                )}
                {item.preferredTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="font-medium text-white">{item.preferredTime}</span>
                  </div>
                )}
                {item.duration && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">교육 시간:</span>
                    <span className="font-medium text-white">{item.duration}</span>
                  </div>
                )}
              </div>
            </section>
            </>
          )}

          {/* 교육 요청사항 */}
          {item.content && (
            <>
               <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-300">
               <MessageSquare className="h-4 w-4" />
               교육 요청사항
             </h4>
            <section className="rounded-lg border border-gray-800 bg-gray-900 p-4">

              <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-300">{item.content}</p>
            </section>
            </>
          )}
        </div>

        <DialogFooter className="justify-between">
          <Button variant="destructive" onClick={onDelete}>
            삭제
          </Button>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => onOpenChange(false)}>
              닫기
            </Button>
            <Button onClick={onEdit}>수정</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
