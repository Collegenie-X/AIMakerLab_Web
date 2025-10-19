"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/data-display/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/data-display/table"
import { Button } from "@/components/ui/buttons/button"
import { useQuotes, type QuoteBoardItem } from "../hooks/useQuotes"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/overlays/dialog"
import { Input } from "@/components/ui/forms/input"
import { Label } from "@/components/ui/forms/label"

type Props = {
  initialItems?: QuoteBoardItem[]
}

export function QuoteBoardList({ initialItems = [] }: Props) {
  const { items, upsert, remove } = useQuotes({ initial: initialItems })
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<QuoteBoardItem | null>(null)

  const [form, setForm] = useState<QuoteBoardItem>({ id: Date.now(), title: "", requester: "", phone: "", email: "", createdAt: new Date().toISOString().slice(0, 10), status: "접수" })

  useEffect(() => {
    if (editing) setForm(editing)
  }, [editing])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    upsert({ ...form })
    setOpen(false)
    setEditing(null)
    setForm({ id: Date.now(), title: "", requester: "", phone: "", email: "", createdAt: new Date().toISOString().slice(0, 10), status: "접수" })
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>견적 문의 게시판</CardTitle>
        <Button size="sm" onClick={() => { setEditing(null); setOpen(true) }}>새 글</Button>
      </CardHeader>
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
            {items.map((it) => (
              <TableRow key={it.id}>
                <TableCell>{it.title}</TableCell>
                <TableCell>{it.requester}</TableCell>
                <TableCell>{it.phone}</TableCell>
                <TableCell>{it.email}</TableCell>
                <TableCell>{it.status}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" variant="secondary" onClick={() => { setEditing(it); setOpen(true) }}>수정</Button>
                  <Button size="sm" variant="destructive" onClick={() => remove(it.id)}>삭제</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "문의 수정" : "새 문의"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit} className="grid gap-3">
            <div>
              <Label htmlFor="title">제목</Label>
              <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <Label htmlFor="requester">작성자</Label>
                <Input id="requester" value={form.requester} onChange={(e) => setForm({ ...form, requester: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="phone">연락처</Label>
                <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="email">이메일</Label>
                <Input id="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="status">상태</Label>
                <Input id="status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as any })} />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit">저장</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  )
}


