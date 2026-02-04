"use client"

import { useState } from "react"
import { MessageCircle, Send, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import { Badge } from "@/components/ui/data-display/badge"
import { Textarea } from "@/components/ui/forms/textarea"
import type { Comment, ScheduleTexts } from "../../config"

type Props = {
  commentList?: Comment[]
  texts: ScheduleTexts
}

/**
 * 질문/댓글 탭 컴포넌트
 */
export function QnATab({ commentList, texts }: Props) {
  const [newComment, setNewComment] = useState("")

  const handleSubmitComment = () => {
    if (!newComment.trim()) return
    
    // TODO: 실제 API 호출로 댓글 저장
    console.log("새 질문:", newComment)
    alert("질문이 등록되었습니다. (데모 버전)")
    setNewComment("")
  }

  return (
    <div className="space-y-4 mt-0">
      {/* 댓글 입력 폼 */}
      <div className="rounded-lg border bg-blue-50 p-6">
        <div className="mb-4 flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-900">{texts.labels.writeComment}</h3>
        </div>
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={texts.labels.commentPlaceholder}
          className="mb-3 min-h-[120px] resize-none"
        />
        <div className="flex justify-end">
          <Button
            onClick={handleSubmitComment}
            disabled={!newComment.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="mr-2 h-4 w-4" />
            {texts.labels.submitComment}
          </Button>
        </div>
      </div>

      {/* 댓글 목록 */}
      {commentList && commentList.length > 0 ? (
        <div className="space-y-4">
          {commentList.map((comment) => (
            <div key={comment.id} className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold">
                    {comment.userName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">{comment.userName}</span>
                      {comment.userType === "student" && (
                        <Badge variant="secondary" className="text-xs">수강생</Badge>
                      )}
                      {comment.userType === "instructor" && (
                        <Badge className="bg-blue-600 text-xs">강사</Badge>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">{comment.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {comment.answer ? (
                    <Badge className="bg-green-600">{texts.labels.answered}</Badge>
                  ) : (
                    <Badge variant="outline">{texts.labels.unanswered}</Badge>
                  )}
                </div>
              </div>
              
              <p className="mb-3 text-gray-700 leading-relaxed">{comment.question}</p>
              
              {/* 좋아요 버튼 */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <button className="flex items-center gap-1 rounded-md px-2 py-1 hover:bg-gray-100 transition-colors">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{comment.likes || 0}</span>
                </button>
              </div>

              {/* 답변 */}
              {comment.answer && (
                <div className="mt-4 rounded-lg bg-blue-50 p-4 border-l-4 border-blue-500">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm">
                      {comment.answer.userName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 text-sm">
                          {comment.answer.userName}
                        </span>
                        {comment.answer.userType === "instructor" && (
                          <Badge className="bg-blue-600 text-xs">강사</Badge>
                        )}
                        {comment.answer.userType === "admin" && (
                          <Badge className="bg-purple-600 text-xs">관리자</Badge>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">{comment.answer.date}</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed pl-10">
                    {comment.answer.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <MessageCircle className="mx-auto h-12 w-12 text-gray-300 mb-3" />
          <p className="text-gray-500">{texts.labels.noComments}</p>
        </div>
      )}
    </div>
  )
}
