'use client'

import { useState } from 'react'
import { Star, ThumbsUp, MessageCircle, Smile, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/overlays/dialog'
import { Input } from '@/components/ui/forms/input'
import { Textarea } from '@/components/ui/forms/textarea'

/**
 * 리뷰 데이터 타입
 */
interface Review {
  id: string
  authorName: string
  authorRole: string
  authorSchool: string
  rating: number
  date: string
  content: string
  photos: string[]
  likes: number
  helpful: number
}

/**
 * 리뷰 댓글 타입 (더미용)
 */
interface ReviewComment {
  id: string
  authorName: string
  date: string
  content: string
  photos: string[]
}

interface ProductReviewsProps {
  reviews: Review[]
  averageRating: number
  totalReviews: number
}

/**
 * 제품 리뷰 컴포넌트
 */
export function ProductReviews({ reviews, averageRating, totalReviews }: ProductReviewsProps) {
  const [likedReviews, setLikedReviews] = useState<Set<string>>(new Set())
  const [helpfulReviews, setHelpfulReviews] = useState<Set<string>>(new Set())
  const [open, setOpen] = useState(false)
  const [newReview, setNewReview] = useState({
    authorName: '',
    authorRole: '교사',
    authorSchool: '',
    rating: 5,
    content: '',
    photos: [] as string[],
  })
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const PAGE_SIZE = 5
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(reviews.length / PAGE_SIZE))
  const startIndex = (page - 1) * PAGE_SIZE
  const endIndex = Math.min(reviews.length, startIndex + PAGE_SIZE)
  const pagedReviews = reviews.slice(startIndex, endIndex)
  const [imageViewer, setImageViewer] = useState<{ open: boolean; src: string; alt: string }>({ open: false, src: '', alt: '' })

  // 더미 댓글 데이터 (리뷰별 샘플)
  const dummyComments: Record<string, ReviewComment[]> = {
    '1': [
      {
        id: 'c1',
        authorName: '관리자',
        date: '2024-11-02',
        content: '좋은 후기 감사합니다! 수업 사진 공유도 가능해요 😊',
        photos: ['/products/student-robot-project.jpg'],
      },
      {
        id: 'c2',
        authorName: '김선생님',
        date: '2024-11-03',
        content: '우리 반도 비슷하게 진행했어요. 아이들이 정말 좋아하더라고요.',
        photos: ['/products/arduino-electronics-circuit.jpg', '/products/mobile-app-interface.png'],
      },
    ],
  }

  // 좋아요 토글
  const toggleLike = (reviewId: string) => {
    setLikedReviews((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId)
      } else {
        newSet.add(reviewId)
      }
      return newSet
    })
  }

  // 도움됨 토글
  const toggleHelpful = (reviewId: string) => {
    setHelpfulReviews((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId)
      } else {
        newSet.add(reviewId)
      }
      return newSet
    })
  }

  // 별점 렌더링
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-600'
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <section className="border-t border-gray-700 bg-gray-900 py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8">
          <h2 className="mb-4 text-3xl font-bold text-white">사용 후기</h2>

          {/* 평균 평점 */}
          <div className="flex items-center gap-6 rounded-xl border-2 border-gray-700 bg-gray-800 p-6">
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold text-teal-400">{averageRating.toFixed(1)}</div>
              <div className="mb-2 flex justify-center">
                {renderStars(Math.round(averageRating))}
              </div>
              <div className="text-sm text-gray-400">{totalReviews}개 후기</div>
            </div>

            <div className="h-20 w-px bg-gray-700" />

            <div className="flex-1">
              <p className="text-gray-300">
                <span className="font-bold text-teal-400">{totalReviews}명</span>의 선생님과 학부모님이 이 제품을 사용하고 계십니다.
              </p>
              <p className="mt-2 text-sm text-gray-400">
                실제 수업에서 활용한 생생한 후기를 확인하세요!
              </p>
            </div>
          </div>
        </div>

        {/* 리뷰 목록 (페이지네이션 적용) */}
        <div className="space-y-4">
          {pagedReviews.map((review) => (
            <div
              key={review.id}
              className="rounded-xl border-2 border-gray-700 bg-gray-800 p-6 transition-shadow hover:shadow-md"
            >
              {/* 리뷰 헤더 */}
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="font-bold text-white">{review.authorName}</span>
                    <span className="rounded bg-teal-900/50 px-2 py-0.5 text-xs font-medium text-teal-300">
                      {review.authorRole}
                    </span>
                  </div>
                  <div className="mb-2 flex items-center gap-2 text-sm text-gray-400">
                    <span>{review.authorSchool}</span>
                    <span>·</span>
                    <span>{review.date}</span>
                  </div>
                  {renderStars(review.rating)}
                </div>
              </div>

              {/* 리뷰 내용 */}
              <p className="mb-4 text-gray-300 leading-relaxed">{review.content}</p>

              {/* 리뷰 사진 */}
              {review.photos.length > 0 && (
                <div className="mb-4 flex gap-2 overflow-x-auto">
                  {review.photos.map((photo, index) => (
                    <button
                      key={index}
                      type="button"
                      className="focus:outline-hidden"
                      onClick={() => setImageViewer({ open: true, src: photo, alt: `후기 사진 ${index + 1}` })}
                    >
                      <img
                        src={photo}
                        alt={`후기 사진 ${index + 1}`}
                        className="h-24 w-24 flex-shrink-0 rounded-lg border border-gray-700 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* 리뷰 액션 */}
              <div className="flex items-center gap-3 border-t border-gray-700 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className={`gap-2 ${
                    likedReviews.has(review.id)
                      ? 'border-teal-600 bg-teal-950/30 text-teal-400'
                      : 'bg-transparent'
                  }`}
                  onClick={() => toggleLike(review.id)}
                >
                  <ThumbsUp className="h-4 w-4" />
                  좋아요 {review.likes + (likedReviews.has(review.id) ? 1 : 0)}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className={`gap-2 ${
                    helpfulReviews.has(review.id)
                      ? 'border-blue-600 bg-blue-950/30 text-blue-400'
                      : 'bg-transparent'
                  }`}
                  onClick={() => toggleHelpful(review.id)}
                >
                  <MessageCircle className="h-4 w-4" />
                  도움됨 {review.helpful + (helpfulReviews.has(review.id) ? 1 : 0)}
                </Button>
              </div>

              {/* 댓글 (더미) */}
              {dummyComments[review.id]?.length ? (
                <div className="mt-4 rounded-lg border border-gray-700 bg-gray-700/50 p-4">
                  <div className="mb-3 text-sm font-semibold text-gray-200">댓글 {dummyComments[review.id].length}</div>
                  <div className="space-y-3">
                    {dummyComments[review.id].map((comment) => (
                      <div key={comment.id} className="rounded-md border border-gray-600 bg-gray-800 p-3">
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span className="font-semibold text-white">{comment.authorName}</span>
                          <span className="text-gray-400">{comment.date}</span>
                        </div>
                        <p className="mb-2 text-sm text-gray-300">{comment.content}</p>
                        {comment.photos.length > 0 && (
                          <div className="flex gap-2">
                            {comment.photos.map((p, i) => (
                              <button
                                key={i}
                                type="button"
                                className="focus:outline-hidden"
                                onClick={() => setImageViewer({ open: true, src: p, alt: `댓글 사진 ${i + 1}` })}
                              >
                                <img src={p} alt={`댓글 사진 ${i + 1}`} className="h-16 w-16 rounded border border-gray-700 object-cover" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="mt-6 flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-sm">
          <span className="text-gray-400">
            {reviews.length === 0 ? '후기가 없습니다.' : `${startIndex + 1}-${endIndex} / ${reviews.length}`}
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" /> 이전
            </Button>
            <span className="min-w-16 text-center font-semibold text-gray-200">
              {page} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              다음 <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 이미지 확대 다이얼로그 */}
        <Dialog open={imageViewer.open} onOpenChange={(o) => setImageViewer((prev) => ({ ...prev, open: o }))}>
          <DialogContent className="bg-gray-900 border-gray-700 text-gray-200 sm:max-w-3xl">
            <div className="overflow-hidden rounded-lg">
              {imageViewer.src && (
                <img src={imageViewer.src} alt={imageViewer.alt} className="max-h-[70vh] w-full object-contain" />
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* 후기 작성 안내 + 다이얼로그 */}
        <Dialog open={open} onOpenChange={setOpen}>
          <div className="mt-8 rounded-xl border-2 border-dashed border-gray-700 bg-gray-800 p-8 text-center">
            <p className="mb-2 text-lg font-semibold text-white">이 제품을 사용해보셨나요?</p>
            <p className="mb-4 text-sm text-gray-400">다른 선생님들과 경험을 공유해주세요!</p>
            <DialogTrigger asChild>
              <Button className="bg-teal-600 hover:bg-teal-700">
                후기 작성하기
              </Button>
            </DialogTrigger>
          </div>

          <DialogContent className="bg-gray-900 border-gray-700 text-gray-200 sm:max-w-xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-2xl">
                <Smile className="h-6 w-6 text-teal-400" /> 후기 작성
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-300">이름</label>
                  <Input
                    placeholder="예: 김교사"
                    value={newReview.authorName}
                    onChange={(e) => setNewReview({ ...newReview, authorName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-300">소속</label>
                  <Input
                    placeholder="예: 서울초 5학년"
                    value={newReview.authorSchool}
                    onChange={(e) => setNewReview({ ...newReview, authorSchool: e.target.value })}
                  />
                </div>
              </div>

              {/* 별점 선택 */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">별점</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="transition-transform hover:scale-110"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      aria-label={`${star}점`}
                    >
                      <Star className={`h-6 w-6 ${star <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* 내용 */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">후기 내용</label>
                <Textarea
                  rows={5}
                  placeholder="수업에서 어떻게 활용하셨는지, 좋았던 점과 아쉬웠던 점을 적어주세요 😊"
                  value={newReview.content}
                  onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                />
              </div>

              {/* 사진 업로드 (간단 표시용) */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">수업 사진 업로드 (여러 장 가능)</label>
                <label
                  htmlFor="review-photos"
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-600 bg-gray-800 p-4 text-sm text-gray-400 transition-colors hover:bg-gray-700"
                >
                  <ImageIcon className="h-4 w-4" /> 이미지를 선택하거나 끌어다 놓으세요
                  <input
                    id="review-photos"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || [])
                      if (files.length === 0) return
                      setSelectedFiles(files)
                      Promise.all(
                        files.map(
                          (file) =>
                            new Promise<string>((resolve) => {
                              const reader = new FileReader()
                              reader.onload = () => resolve(String(reader.result))
                              reader.readAsDataURL(file)
                            }),
                        ),
                      ).then((urls) => setNewReview((prev) => ({ ...prev, photos: urls })))
                    }}
                  />
                </label>

                {newReview.photos.length > 0 && (
                  <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
                    {newReview.photos.map((src, idx) => (
                      <div key={idx} className="relative overflow-hidden rounded-md border border-gray-700">
                        <img src={src} alt={`선택 사진 ${idx + 1}`} className="h-24 w-full object-cover" />
                        <button
                          type="button"
                          className="absolute right-1 top-1 rounded-full bg-black/60 px-1.5 text-xs text-white"
                          onClick={() => {
                            setNewReview((prev) => ({
                              ...prev,
                              photos: prev.photos.filter((_, i) => i !== idx),
                            }))
                            setSelectedFiles((prev) => prev.filter((_, i) => i !== idx))
                          }}
                          aria-label="사진 제거"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setOpen(false)}>취소</Button>
              <Button
                className="bg-teal-600 hover:bg-teal-700"
                onClick={() => {
                  // 실제 저장 로직은 서버 연동 후 구현 예정
                  setOpen(false)
                }}
              >
                제출하기
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
