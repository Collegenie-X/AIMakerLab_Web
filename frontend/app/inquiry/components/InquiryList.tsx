"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/data-display/card"
import { Button } from "@/components/ui/buttons/button"
import { Badge } from "@/components/ui/data-display/badge"
import type { InquiryItem } from "../config"
import { InquiryViewDialog } from "./InquiryViewDialog"
import { InquiryDialog } from "./InquiryDialog"
import { CheckCircle2, Clock, Send, AlertTriangle, FileText } from "lucide-react"
import { useInquiries } from "../hooks/useInquiries"

type Props = {
  initialItems: InquiryItem[]
}

function loadLocal(): InquiryItem[] | null {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem('online_inquiries') : null
    return raw ? (JSON.parse(raw) as InquiryItem[]) : null
  } catch {
    return null
  }
}

function saveLocal(items: InquiryItem[]) {
  try {
    localStorage.setItem('online_inquiries', JSON.stringify(items))
  } catch {}
}

function StatusBadge({ status }: { status: string }) {
  const config = {
    확정: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle2 },
    완료: { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: CheckCircle2 },
    견적발송: { bg: 'bg-blue-100', text: 'text-blue-700', icon: Send },
    검토중: { bg: 'bg-orange-100', text: 'text-orange-700', icon: AlertTriangle },
    접수대기: { bg: 'bg-gray-100', text: 'text-gray-700', icon: Clock },
  }[status] ?? { bg: 'bg-gray-100', text: 'text-gray-700', icon: FileText }

  const Icon = config.icon
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${config.bg} ${config.text}`}>
      <Icon className="h-3.5 w-3.5" />
      {status}
    </span>
  )
}

export function InquiryList({ initialItems }: Props) {
  const { items, upsert, remove } = useInquiries({ initial: initialItems })
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<InquiryItem | undefined>(undefined)
  const [page, setPage] = useState(1)
  const pageSize = 10

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const startIdx = (page - 1) * pageSize
  const visible = items.slice(startIdx, startIdx + pageSize)

  // Ensure current page stays within bounds when items change
  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [items.length, totalPages, page])

  const handleItemClick = (item: InquiryItem) => {
    setSelectedItem(item)
    setViewDialogOpen(true)
  }

  const handleEdit = () => {
    setViewDialogOpen(false)
    setEditDialogOpen(true)
  }

  const handleSave = (item: InquiryItem) => upsert(item)

  const handleDelete = (id: number) => remove(id)

  const handleViewDelete = () => {
    if (selectedItem) {
      handleDelete(selectedItem.id)
      setViewDialogOpen(false)
    }
  }

  return (
    <>
      <Card className="overflow-hidden shadow-sm">
        <CardContent className="p-0">
          <div className="hidden grid-cols-[1fr_140px_140px_120px] items-center gap-4 border-b bg-gray-50 px-6 py-3 text-sm font-medium text-gray-700 md:grid">
            <div>제목</div>
            <div className="text-center">교육과정</div>
            <div className="text-center">상태</div>
            <div className="text-center">생성일</div>
          </div>
          <div>
            {visible.map((inquiry, idx) => (
              <button
                key={inquiry.id}
                className={`grid w-full grid-cols-1 items-center gap-3 px-6 py-4 text-left transition-colors hover:bg-blue-50/50 md:grid-cols-[1fr_140px_140px_120px] md:gap-4 ${
                  idx < visible.length - 1 ? 'border-b' : ''
                }`}
                onClick={() => handleItemClick(inquiry)}
              >
                <div className="min-w-0">
                  <div className="truncate text-base font-semibold text-gray-900">{inquiry.title}</div>
                </div>
                <div className="md:text-center">
                  <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
                    {inquiry.category}
                  </Badge>
                </div>
                <div className="md:text-center">
                  <StatusBadge status={inquiry.status} />
                </div>
                <div className="text-sm text-gray-600 md:text-center">{inquiry.date}</div>
              </button>
            ))}
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 px-4 py-3">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              이전
            </Button>
            {(() => {
              const pages: Array<number | string> = []
              if (totalPages <= 7) {
                for (let i = 1; i <= totalPages; i++) pages.push(i)
              } else {
                pages.push(1)
                const start = Math.max(2, page - 1)
                const end = Math.min(totalPages - 1, page + 1)
                if (start > 2) pages.push('ellipsis-left')
                for (let i = start; i <= end; i++) pages.push(i)
                if (end < totalPages - 1) pages.push('ellipsis-right')
                pages.push(totalPages)
              }
              return pages.map((p) =>
                typeof p === 'number' ? (
                  <Button
                    key={`page-${p}`}
                    variant={p === page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </Button>
                ) : (
                  <span key={`page-${p}`} className="px-1 text-gray-400">…</span>
                ),
              )
            })()}
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p - 0 + 1))}
            >
              다음
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 읽기 전용 뷰 다이얼로그 */}
      {selectedItem && (
        <InquiryViewDialog
          open={viewDialogOpen}
          onOpenChange={setViewDialogOpen}
          item={selectedItem}
          onEdit={handleEdit}
          onDelete={handleViewDelete}
        />
      )}

      {/* 수정용 입력 폼 다이얼로그 */}
      <InquiryDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        initial={selectedItem}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </>
  )
}
