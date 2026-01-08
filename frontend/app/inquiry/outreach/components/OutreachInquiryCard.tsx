/**
 * 출강 수업 문의 카드 컴포넌트
 * UI 로직: 개별 문의 항목 표시 및 상세보기 트리거
 */

'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  Button,
} from '@/components/ui'
import { OutreachInquiryItem } from '../config'
import { Building2, Calendar, MapPin, Users } from 'lucide-react'

type OutreachInquiryCardProps = {
  item: OutreachInquiryItem
  onViewDetail: (item: OutreachInquiryItem) => void
}

/**
 * 문의 상태에 따른 배지 스타일
 */
function getStatusBadgeVariant(
  status: OutreachInquiryItem['status']
): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (status) {
    case '완료':
      return 'default'
    case '확정':
      return 'default'
    case '견적발송':
      return 'secondary'
    case '검토중':
      return 'outline'
    case '접수대기':
      return 'secondary'
    default:
      return 'outline'
  }
}

/**
 * 출강 수업 문의 카드
 */
export function OutreachInquiryCard({ item, onViewDetail }: OutreachInquiryCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="mb-2 text-lg">{item.title}</CardTitle>
            <CardDescription className="flex flex-wrap gap-2 text-sm">
              <Badge variant="outline">{item.category}</Badge>
              <Badge variant={getStatusBadgeVariant(item.status)}>{item.status}</Badge>
            </CardDescription>
          </div>
          <span className="text-sm text-gray-500">{item.date}</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* 기관 정보 */}
        {item.institution && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Building2 className="h-4 w-4 text-gray-400" />
            <span>{item.institution}</span>
            {item.institutionType && (
              <Badge variant="secondary" className="text-xs">
                {item.institutionType}
              </Badge>
            )}
          </div>
        )}
        
        {/* 날짜 정보 */}
        {item.preferredDate && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>
              {item.preferredDate} {item.preferredTime && `· ${item.preferredTime}`}
            </span>
          </div>
        )}
        
        {/* 위치 정보 */}
        {item.location && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>{item.location}</span>
          </div>
        )}
        
        {/* 인원 정보 */}
        {item.participantCount && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="h-4 w-4 text-gray-400" />
            <span>{item.participantCount}</span>
          </div>
        )}
        
        {/* 상세보기 버튼 */}
        <div className="pt-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => onViewDetail(item)}
          >
            자세히 보기
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

