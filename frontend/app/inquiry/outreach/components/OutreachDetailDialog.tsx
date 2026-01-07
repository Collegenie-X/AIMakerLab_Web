/**
 * 출강 수업 상세 정보 다이얼로그
 * UI 로직: 문의 상세 내용 표시
 */

'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { OutreachInquiryItem } from '../config'
import {
  Building2,
  Calendar,
  Clock,
  DollarSign,
  Mail,
  MapPin,
  Phone,
  User,
  Users,
  Briefcase,
  GraduationCap,
  Package,
} from 'lucide-react'

type OutreachDetailDialogProps = {
  item: OutreachInquiryItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * 정보 행 컴포넌트
 */
function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: any
  label: string
  value?: string | boolean
}) {
  if (!value) return null

  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 text-gray-400 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-sm text-gray-900">
          {typeof value === 'boolean' ? (value ? '가능' : '불가능') : value}
        </p>
      </div>
    </div>
  )
}

/**
 * 출강 수업 상세 정보 다이얼로그
 */
export function OutreachDetailDialog({ item, open, onOpenChange }: OutreachDetailDialogProps) {
  if (!item) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{item.title}</DialogTitle>
          <DialogDescription className="flex flex-wrap gap-2 pt-2">
            <Badge variant="outline">{item.category}</Badge>
            <Badge>{item.status}</Badge>
            <span className="text-sm text-gray-500">{item.date}</span>
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)] pr-4">
          <div className="space-y-6">
            {/* 기관 정보 */}
            {(item.institution || item.institutionType) && (
              <section>
                <h3 className="mb-3 text-sm font-semibold text-gray-900">기관 정보</h3>
                <div className="space-y-3">
                  <InfoRow icon={Building2} label="기관명" value={item.institution} />
                  <InfoRow icon={Briefcase} label="기관 유형" value={item.institutionType} />
                </div>
              </section>
            )}

            {/* 담당자 정보 */}
            {(item.requesterName || item.requesterContact || item.requesterEmail) && (
              <>
                <Separator />
                <section>
                  <h3 className="mb-3 text-sm font-semibold text-gray-900">담당자 정보</h3>
                  <div className="space-y-3">
                    <InfoRow icon={User} label="담당자명" value={item.requesterName} />
                    <InfoRow
                      icon={Briefcase}
                      label="직책"
                      value={item.requesterPosition}
                    />
                    <InfoRow icon={Phone} label="연락처" value={item.requesterContact} />
                    <InfoRow icon={Mail} label="이메일" value={item.requesterEmail} />
                  </div>
                </section>
              </>
            )}

            {/* 교육 내용 */}
            {(item.course || item.grade || item.participantCount) && (
              <>
                <Separator />
                <section>
                  <h3 className="mb-3 text-sm font-semibold text-gray-900">교육 내용</h3>
                  <div className="space-y-3">
                    <InfoRow icon={GraduationCap} label="교육 과정" value={item.course} />
                    <InfoRow icon={Users} label="대상 학년/연령" value={item.grade} />
                    <InfoRow
                      icon={Users}
                      label="참가 인원"
                      value={item.participantCount}
                    />
                    <InfoRow
                      icon={Users}
                      label="주요 대상"
                      value={item.targetAudience}
                    />
                  </div>
                </section>
              </>
            )}

            {/* 일정 및 장소 */}
            {(item.location || item.preferredDate) && (
              <>
                <Separator />
                <section>
                  <h3 className="mb-3 text-sm font-semibold text-gray-900">일정 및 장소</h3>
                  <div className="space-y-3">
                    <InfoRow icon={MapPin} label="출강 지역" value={item.location} />
                    <InfoRow icon={MapPin} label="상세 주소" value={item.address} />
                    <InfoRow icon={Calendar} label="희망 날짜" value={item.preferredDate} />
                    <InfoRow icon={Clock} label="희망 시간" value={item.preferredTime} />
                    <InfoRow icon={Clock} label="교육 시간" value={item.duration} />
                    <InfoRow icon={Calendar} label="총 회차" value={item.sessionCount} />
                  </div>
                </section>
              </>
            )}

            {/* 예산 및 장비 */}
            {(item.budget || item.equipmentProvided !== undefined) && (
              <>
                <Separator />
                <section>
                  <h3 className="mb-3 text-sm font-semibold text-gray-900">예산 및 장비</h3>
                  <div className="space-y-3">
                    <InfoRow icon={DollarSign} label="예산 범위" value={item.budget} />
                    <InfoRow
                      icon={Package}
                      label="기관 장비 제공"
                      value={item.equipmentProvided}
                    />
                    {item.equipmentNeeded && item.equipmentNeeded.length > 0 && (
                      <div className="flex items-start gap-3">
                        <Package className="mt-0.5 h-4 w-4 text-gray-400 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-500">필요 장비</p>
                          <ul className="mt-1 list-inside list-disc text-sm text-gray-900">
                            {item.equipmentNeeded.map((equipment, index) => (
                              <li key={index}>{equipment}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              </>
            )}

            {/* 추가 요청사항 */}
            {(item.content || item.additionalRequests || item.transportation) && (
              <>
                <Separator />
                <section>
                  <h3 className="mb-3 text-sm font-semibold text-gray-900">추가 정보</h3>
                  <div className="space-y-3">
                    {item.content && (
                      <div>
                        <p className="mb-1 text-sm font-medium text-gray-500">문의 내용</p>
                        <p className="whitespace-pre-wrap text-sm text-gray-900">
                          {item.content}
                        </p>
                      </div>
                    )}
                    {item.additionalRequests && (
                      <div>
                        <p className="mb-1 text-sm font-medium text-gray-500">
                          추가 요청사항
                        </p>
                        <p className="whitespace-pre-wrap text-sm text-gray-900">
                          {item.additionalRequests}
                        </p>
                      </div>
                    )}
                    {item.transportation && (
                      <div>
                        <p className="mb-1 text-sm font-medium text-gray-500">교통 정보</p>
                        <p className="text-sm text-gray-900">{item.transportation}</p>
                      </div>
                    )}
                  </div>
                </section>
              </>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

