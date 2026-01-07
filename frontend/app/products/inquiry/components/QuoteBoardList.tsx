// 견적 문의 게시판 목록 컴포넌트

"use client"

import { useEffect, useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/data-display/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/data-display/table"
import { Button } from "@/components/ui/buttons/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/overlays/dialog"
import { Input } from "@/components/ui/forms/input"
import { Label } from "@/components/ui/forms/label"
import { useQuotes } from "../hooks/useQuotes"
import type { QuoteBoardItem } from "../types"

/**
 * 게시판 목록 Props
 */
type QuoteBoardListProps = {
  initialItems?: QuoteBoardItem[]
}

/**
 * 초기 폼 데이터 생성 함수
 */
function createInitialBoardForm(): QuoteBoardItem {
  return {
    id: Date.now(),
    title: "",
    requester: "",
    phone: "",
    email: "",
    createdAt: new Date().toISOString().slice(0, 10),
    status: "접수",
  }
}

/**
 * 견적 문의 게시판 목록 컴포넌트
 * 접수된 견적 문의를 목록으로 관리합니다
 */
export function QuoteBoardList({ initialItems = [] }: QuoteBoardListProps) {
  // 게시판 데이터 관리
  const { items, upsert, remove } = useQuotes({ initial: initialItems })
  
  // 다이얼로그 상태
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<QuoteBoardItem | null>(null)
  const [form, setForm] = useState<QuoteBoardItem>(createInitialBoardForm())

  /**
   * 수정 모드 진입 시 폼 데이터 설정
   */
  useEffect(() => {
    if (editing) {
      setForm(editing)
    }
  }, [editing])

  /**
   * 새 글 작성 핸들러
   */
  const handleNew = useCallback(() => {
    setEditing(null)
    setForm(createInitialBoardForm())
    setOpen(true)
  }, [])

  /**
   * 수정 핸들러
   */
  const handleEdit = useCallback((item: QuoteBoardItem) => {
    setEditing(item)
    setForm(item)
    setOpen(true)
  }, [])

  /**
   * 삭제 핸들러
   */
  const handleDelete = useCallback((id: number) => {
    remove(id)
  }, [remove])

  /**
   * 폼 제출 핸들러
   */
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    
    // 저장
    upsert({ ...form })
    
    // 초기화
    setOpen(false)
    setEditing(null)
    setForm(createInitialBoardForm())
  }, [form, upsert])

  /**
   * 폼 필드 변경 핸들러
   */
  const handleFormChange = useCallback(<K extends keyof QuoteBoardItem>(
    key: K,
    value: QuoteBoardItem[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }, [])

  return (
    <Card className="overflow-hidden">
      {/* 헤더 */}
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>견적 문의 게시판</CardTitle>
        <Button size="sm" onClick={handleNew}>새 글</Button>
      </CardHeader>

      {/* 테이블 */}
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50%]">제목</TableHead>
              <TableHead>작성자</TableHead>
              <TableHead>연락처</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead>상태</TableHead>
              <TableHead className="w-[120px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.requester}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    onClick={() => handleEdit(item)}
                  >
                    수정
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive" 
                    onClick={() => handleDelete(item.id)}
                  >
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {/* 수정/추가 다이얼로그 */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "문의 수정" : "새 문의"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-3">
            {/* 제목 */}
            <div>
              <Label htmlFor="title">제목</Label>
              <Input 
                id="title" 
                value={form.title} 
                onChange={(e) => handleFormChange("title", e.target.value)} 
              />
            </div>

            {/* 작성자, 연락처, 이메일, 상태 */}
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <Label htmlFor="requester">작성자</Label>
                <Input 
                  id="requester" 
                  value={form.requester} 
                  onChange={(e) => handleFormChange("requester", e.target.value)} 
                />
              </div>
              <div>
                <Label htmlFor="phone">연락처</Label>
                <Input 
                  id="phone" 
                  value={form.phone} 
                  onChange={(e) => handleFormChange("phone", e.target.value)} 
                />
              </div>
              <div>
                <Label htmlFor="email">이메일</Label>
                <Input 
                  id="email" 
                  value={form.email} 
                  onChange={(e) => handleFormChange("email", e.target.value)} 
                />
              </div>
              <div>
                <Label htmlFor="status">상태</Label>
                <Input 
                  id="status" 
                  value={form.status} 
                  onChange={(e) => handleFormChange("status", e.target.value as QuoteBoardItem["status"])} 
                />
              </div>
            </div>

            {/* 저장 버튼 */}
            <div className="flex justify-end">
              <Button type="submit">저장</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  )
}


