"use client"

import { useAuthGuard } from "@/hooks/use-auth-guard"
import { useComments } from "@/hooks/use-dashboard-data"
import { MessageSquare } from "lucide-react"
import { CommentCard } from "./components/comment-card"
import { EmptyState } from "../components/empty-state"
import { dashboardTexts } from "../config"

/**
 * 댓글 관리 페이지
 * 사용자가 작성한 댓글을 확인하고 수정/삭제
 */
export default function MyCommentsPage() {
  const { userEmail } = useAuthGuard()
  const { comments, isLoading, updateComment, deleteComment } = useComments()

  if (!userEmail || isLoading) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{dashboardTexts.comments.title}</h1>
        <p className="text-gray-600">{dashboardTexts.comments.description}</p>
      </div>

      {/* 댓글 목록 또는 빈 상태 */}
      {comments.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title={dashboardTexts.comments.emptyTitle}
          description={dashboardTexts.comments.emptyDescription}
        />
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              onUpdate={updateComment}
              onDelete={deleteComment}
            />
          ))}
        </div>
      )}
    </div>
  )
}

