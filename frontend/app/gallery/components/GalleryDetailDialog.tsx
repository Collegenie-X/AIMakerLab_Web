"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/data-display/badge"
import { Button } from "@/components/ui/buttons/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/overlays/dialog"
import { Calendar, ChevronLeft, ChevronRight, Eye, Heart, Star, User, Share2, Edit, Trash2 } from "lucide-react"
import { useToggleLike, useIncrementViews, useDeleteGalleryItem, type GalleryItem, type GalleryType, isWorkItem, isReviewItem } from "@/lib/gallery"
import { getDefaultImage, isItemLiked, isUserOwnedItem } from "@/lib/gallery"
import { useToast } from "@/hooks/use-toast"

type Props = {
  item: GalleryItem
  type: GalleryType
  open: boolean
  onClose: () => void
  onEdit?: (item: GalleryItem) => void
}

/**
 * 갤러리 상세 보기 다이얼로그
 * - CRUD 기능 포함 (좋아요, 조회수, 수정, 삭제)
 * - React Query Mutation으로 즉시 반영
 */
export function GalleryDetailDialog({ item, type, open, onClose, onEdit }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const { toast } = useToast()

  // React Query Mutations
  const toggleLikeMutation = useToggleLike(type)
  const incrementViewsMutation = useIncrementViews(type)
  const deleteMutation = useDeleteGalleryItem(type)

  // 사용자 소유 여부 확인
  const isOwner = isUserOwnedItem(type, item.id)

  // 좋아요 상태 초기화
  useEffect(() => {
    setIsLiked(isItemLiked(type, item.id))
  }, [item.id, type])

  // 다이얼로그 열릴 때 조회수 증가
  useEffect(() => {
    if (open) {
      incrementViewsMutation.mutate(item.id)
      setCurrentImageIndex(0) // 이미지 인덱스 초기화
    }
  }, [open, item.id])

  // 좋아요 토글 핸들러
  const handleLike = () => {
    toggleLikeMutation.mutate(item.id, {
      onSuccess: () => {
        const newIsLiked = !isLiked
        setIsLiked(newIsLiked)
        
        toast({
          title: newIsLiked ? "❤️ 좋아요!" : "💔 좋아요 취소",
          description: newIsLiked ? "마음에 드셨다니 기쁩니다!" : "좋아요를 취소했습니다.",
        })
      },
      onError: (error) => {
        toast({
          title: "오류 발생",
          description: error.message,
          variant: "destructive",
        })
      },
    })
  }

  // 공유 핸들러
  const handleShare = async () => {
    const description = isReviewItem(item) ? item.summary : item.description
    const shareData = {
      title: item.title,
      text: description,
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
        toast({
          title: "공유 완료",
          description: "성공적으로 공유되었습니다.",
        })
      } else {
        // 클립보드에 복사
        await navigator.clipboard.writeText(window.location.href)
        toast({
          title: "링크 복사 완료",
          description: "링크가 클립보드에 복사되었습니다.",
        })
      }
    } catch (error) {
      console.error("공유 실패:", error)
    }
  }

  // 수정 핸들러
  const handleEdit = () => {
    if (onEdit) {
      onEdit(item)
      onClose()
    }
  }

  // 삭제 핸들러
  const handleDelete = () => {
    deleteMutation.mutate(item.id, {
      onSuccess: () => {
        toast({
          title: "삭제 완료",
          description: `${isReview ? "후기가" : "작품이"} 성공적으로 삭제되었습니다.`,
        })
        onClose()
      },
      onError: (error) => {
        toast({
          title: "삭제 실패",
          description: error.message,
          variant: "destructive",
        })
      },
    })
  }

  // 이미지 네비게이션
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % item.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length)
  }

  // 라벨 설정
  const likeLabel = type === "reviews" ? "도움됨" : "좋아요"
  const isReview = isReviewItem(item)
  const isWork = isWorkItem(item)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-full sm:max-w-[95vw] md:max-w-5xl lg:max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <span className="text-4xl">{item.emoji}</span>
            {item.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 이미지 슬라이더 */}
          <div className="relative">
            <div className="overflow-hidden rounded-lg">
              <img
                src={item.images[currentImageIndex] || getDefaultImage(item.category)}
                alt={`${item.title} ${currentImageIndex + 1}`}
                className="w-full h-auto max-h-[60vh] object-contain bg-gray-100"
              />
            </div>

            {/* 이미지 네비게이션 */}
            {item.images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    prevImage()
                  }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    nextImage()
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {item.images.length}
                </div>
              </>
            )}
          </div>

          {/* 썸네일 스트립 */}
          {item.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {item.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === currentImageIndex ? "border-purple-500 scale-110" : "border-gray-300"
                  }`}
                >
                  <img
                    src={img || getDefaultImage(item.category)}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* 정보 */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <Badge className="bg-purple-100 text-purple-700">{item.category}</Badge>
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {item.author}
              {isWork && item.grade && <span className="ml-1 text-gray-500">({item.grade})</span>}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {item.date}
            </span>
            {isReview && (
              <span className="flex items-center gap-1 text-yellow-500">
                <Star className="h-4 w-4 fill-yellow-500" />
                {item.rating}.0
              </span>
            )}
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {item.views}회
            </span>
            <span className="flex items-center gap-1 text-pink-500">
              <Heart className={`h-4 w-4 ${isLiked ? "fill-pink-500" : ""}`} />
              {item.likes}
            </span>
          </div>

          {/* 작품 전용: 기술 스택 & 난이도 */}
          {isWork && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {item.techStack && item.techStack.length > 0 && (
                <div className="rounded-lg bg-blue-50 p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">🛠️ 사용 기술</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.techStack.map((tech, idx) => (
                      <Badge key={idx} variant="outline" className="border-blue-300 text-blue-700">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {item.difficulty && (
                <div className="rounded-lg bg-green-50 p-4">
                  <h4 className="font-semibold text-green-900 mb-2">📊 프로젝트 정보</h4>
                  <p className="text-sm text-green-700">난이도: <strong>{item.difficulty}</strong></p>
                  {item.duration && <p className="text-sm text-green-700">제작 기간: {item.duration}</p>}
                </div>
              )}
            </div>
          )}

          {/* 후기 전용: 수업 정보 & 만족도 */}
          {isReview && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {item.courseType && (
                <div className="rounded-lg bg-blue-50 p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">📚 수업 정보</h4>
                  <p className="text-sm text-blue-700">과정: <strong>{item.courseType}</strong></p>
                  {item.courseDuration && <p className="text-sm text-blue-700">기간: {item.courseDuration}</p>}
                  {item.studentGrade && <p className="text-sm text-blue-700">학년: {item.studentGrade}</p>}
                  {item.classType && <p className="text-sm text-blue-700">형태: {item.classType}</p>}
                </div>
              )}
              {item.satisfaction && (
                <div className="rounded-lg bg-purple-50 p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">⭐ 만족도</h4>
                  <div className="space-y-1 text-sm">
                    {item.satisfaction.curriculum && <p>커리큘럼: {"⭐".repeat(item.satisfaction.curriculum)}</p>}
                    {item.satisfaction.instructor && <p>강사: {"⭐".repeat(item.satisfaction.instructor)}</p>}
                    {item.satisfaction.facility && <p>시설: {"⭐".repeat(item.satisfaction.facility)}</p>}
                    {item.satisfaction.management && <p>운영: {"⭐".repeat(item.satisfaction.management)}</p>}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 상세 설명 */}
          <div className="rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 p-6">
            <h3 className="font-semibold text-gray-900 mb-3">
              {isWork ? "📝 프로젝트 상세" : "💬 수업 후기"}
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {isWork ? item.projectDetails : item.reviewContent}
            </p>
          </div>

          {/* 작품 전용: 주요 기능 */}
          {isWork && item.features && item.features.length > 0 && (
            <div className="rounded-lg bg-green-50 p-6">
              <h3 className="font-semibold text-green-900 mb-3">✨ 주요 기능</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {item.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* 작품 전용: 어려웠던 점 & 배운 점 */}
          {isWork && (item.challenges || item.learnings) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {item.challenges && (
                <div className="rounded-lg bg-orange-50 p-4">
                  <h4 className="font-semibold text-orange-900 mb-2">😓 어려웠던 점</h4>
                  <p className="text-sm text-gray-700">{item.challenges}</p>
                </div>
              )}
              {item.learnings && (
                <div className="rounded-lg bg-emerald-50 p-4">
                  <h4 className="font-semibold text-emerald-900 mb-2">💡 배운 점</h4>
                  <p className="text-sm text-gray-700">{item.learnings}</p>
                </div>
              )}
            </div>
          )}

          {/* 후기 전용: 성과 & 향상 */}
          {isReview && (item.achievements || item.improvements) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {item.achievements && item.achievements.length > 0 && (
                <div className="rounded-lg bg-yellow-50 p-4">
                  <h4 className="font-semibold text-yellow-900 mb-2">🏆 수강 후 성과</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    {item.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}
              {item.improvements && item.improvements.length > 0 && (
                <div className="rounded-lg bg-teal-50 p-4">
                  <h4 className="font-semibold text-teal-900 mb-2">📈 향상된 부분</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    {item.improvements.map((improvement, idx) => (
                      <li key={idx}>{improvement}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* 태그 */}
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag, idx) => (
              <Badge key={idx} variant="outline" className="border-purple-300 text-purple-700">
                #{tag}
              </Badge>
            ))}
          </div>

          {/* 액션 버튼 */}
          <div className="space-y-3">
            {/* 좋아요 & 공유 */}
            <div className="flex gap-3">
              <Button
                className={`flex-1 ${
                  isLiked
                    ? "bg-pink-500 hover:bg-pink-600"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                }`}
                onClick={handleLike}
                disabled={toggleLikeMutation.isPending}
              >
                <Heart className={`mr-2 h-4 w-4 ${isLiked ? "fill-white" : ""}`} />
                {isLiked ? `${likeLabel} 완료` : likeLabel}
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                공유하기
              </Button>
            </div>

            {/* 수정 & 삭제 (본인 작성글만) */}
            {isOwner && (
              <div className="flex gap-3 pt-2 border-t">
                <Button
                  variant="outline"
                  className="flex-1 border-blue-300 text-blue-600 hover:bg-blue-50"
                  onClick={handleEdit}
                  disabled={!onEdit}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  수정하기
                </Button>
                {!showDeleteConfirm ? (
                  <Button
                    variant="outline"
                    className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    삭제하기
                  </Button>
                ) : (
                  <div className="flex-1 flex gap-2">
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={handleDelete}
                      disabled={deleteMutation.isPending}
                    >
                      확인
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      취소
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
