/**
 * 댓글 카드 컴포넌트
 */

"use client"

import { useState } from "react"
import { Card } from "@/components/ui/data-display/card"
import { Badge } from "@/components/ui/data-display/badge"
import { Button } from "@/components/ui/buttons/button"
import { Textarea } from "@/components/ui/forms/textarea"
import { Edit, Trash2, ExternalLink } from "lucide-react"
import type { Comment } from "@/hooks/use-dashboard-data"
import { dashboardTexts, statusBadgeVariants } from "../../config"

interface CommentCardProps {
  comment: Comment
  onUpdate: (id: string, content: string) => void
  onDelete: (id: string) => void
}

/**
 * 개별 댓글 정보를 표시하고 수정/삭제할 수 있는 카드 컴포넌트
 */
export function CommentCard({ comment, onUpdate, onDelete }: CommentCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(comment.content)

  const handleSave = () => {
    onUpdate(comment.id, editContent)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditContent(comment.content)
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (confirm(dashboardTexts.comments.confirmDelete)) {
      onDelete(comment.id)
    }
  }

  const getPostTypeBadgeVariant = (type: Comment["postType"]) => {
    return statusBadgeVariants.comment[type] as "default" | "secondary" | "outline"
  }

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <Badge variant={getPostTypeBadgeVariant(comment.postType)}>
            {comment.postType}
          </Badge>
          <a
            href={comment.postUrl}
            className="text-blue-600 hover:underline flex items-center gap-1"
          >
            {comment.postTitle}
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        <span className="text-sm text-gray-500">{comment.createdAt}</span>
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <Textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows={3}
            className="w-full"
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave}>
              {dashboardTexts.comments.buttons.save}
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancel}>
              {dashboardTexts.comments.buttons.cancel}
            </Button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-gray-700 mb-4">{comment.content}</p>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="mr-2 h-4 w-4" />
              {dashboardTexts.comments.buttons.edit}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-red-600 hover:text-red-700"
              onClick={handleDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {dashboardTexts.comments.buttons.delete}
            </Button>
          </div>
        </>
      )}
    </Card>
  )
}

