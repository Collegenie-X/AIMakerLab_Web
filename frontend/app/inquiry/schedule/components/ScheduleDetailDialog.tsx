"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/overlays/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/navigation/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/layout/accordion"
import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/buttons/button"
import { Badge } from "@/components/ui/data-display/badge"
import { Textarea } from "@/components/ui/forms/textarea"
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Star, 
  Users, 
  Target, 
  TrendingUp, 
  Award,
  BookOpen,
  HelpCircle,
  GraduationCap,
  MessageCircle,
  Send,
  ThumbsUp
} from "lucide-react"
import type { ScheduleItem, ScheduleTexts, CurriculumModule } from "../config"
import { ScheduleMediaGallery } from "./ScheduleMediaGallery"

type Props = {
  item: ScheduleItem
  trigger?: React.ReactNode
  texts: ScheduleTexts
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

/**
 * 수업 상세 정보 다이얼로그 컴포넌트 (Udemy 스타일)
 * @param item - 수업 정보
 * @param trigger - 다이얼로그를 여는 트리거 요소 (선택)
 * @param texts - 표시할 텍스트 설정
 * @param open - 다이얼로그 열림 상태 (선택, 외부 제어)
 * @param onOpenChange - 다이얼로그 열림 상태 변경 핸들러 (선택, 외부 제어)
 */
export function ScheduleDetailDialog({ item, trigger, texts, open: controlledOpen, onOpenChange }: Props) {
  const router = useRouter()
  const isClosed = item.enrolled >= item.capacity
  const [internalOpen, setInternalOpen] = useState(false)
  const [newComment, setNewComment] = useState("")

  // 외부 제어와 내부 상태 중 선택
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = onOpenChange !== undefined ? onOpenChange : setInternalOpen

  // 출강 수업 문의하기 핸들러
  const handleOutreachInquiry = () => {
    const params = new URLSearchParams({
      course: item.title,
      instructor: item.instructor,
      duration: item.duration,
      level: item.level,
    })
    router.push(`/inquiry/online?${params.toString()}`)
  }

  const handleTriggerClick = useCallback(() => {
    if (typeof window !== "undefined") {
      try {
        window.scrollTo({ top: 0, behavior: "smooth" })
      } catch {
        window.scrollTo(0, 0)
      }
    }
    window.setTimeout(() => setOpen(true), 200)
  }, [])

  const handleSubmitComment = useCallback(() => {
    if (!newComment.trim()) return
    
    // TODO: 실제 API 호출로 댓글 저장
    console.log("새 질문:", newComment)
    alert("질문이 등록되었습니다. (데모 버전)")
    setNewComment("")
  }, [newComment])

  // 커리큘럼이 상세 타입인지 확인
  const isDetailedCurriculum = Array.isArray(item.curriculum) && 
    item.curriculum.length > 0 && 
    typeof item.curriculum[0] === 'object' &&
    'week' in item.curriculum[0]

  const curriculumModules = isDetailedCurriculum ? item.curriculum as CurriculumModule[] : []
  const simpleCurriculum = !isDetailedCurriculum ? item.curriculum as string[] : []

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && (
        <div role="button" onClick={handleTriggerClick} aria-label="수업 상세 열기">
          {trigger}
        </div>
      )}
      
      {/* 너비를 max-w-7xl로 확장 */}
      <DialogContent className="h-[90vh] overflow-y-auto sm:max-w-7xl">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-3xl mb-2">{item.title}</DialogTitle>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{item.level}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{item.rating}</span>
                    <span>({item.reviews}{texts.labels.reviews})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* 왼쪽: 탭 콘텐츠 영역 */}
          <div className="space-y-6">
            {/* 동영상 */}
            {(item.videoUrl || item.videoId) && (
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-900">
                <iframe
                  className="h-full w-full"
                  src={item.videoUrl ? item.videoUrl : `https://www.youtube.com/embed/${item.videoId}`}
                  title={item.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {/* 탭 네비게이션 */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-4">
                <TabsTrigger value="overview">{texts.labels.overview}</TabsTrigger>
                <TabsTrigger value="curriculum">{texts.labels.curriculum}</TabsTrigger>
                <TabsTrigger value="instructor">{texts.labels.instructorTab}</TabsTrigger>
                {/* 오프라인 교육이므로 수강평 탭은 임시 비활성화 */}
                {/* <TabsTrigger value="reviews">{texts.labels.reviewsTab}</TabsTrigger> */}
                <TabsTrigger value="qna">{texts.labels.qnaTab}</TabsTrigger>
                <TabsTrigger value="faq">{texts.labels.faqs}</TabsTrigger>
              </TabsList>

              {/* 개요 탭 */}
              <TabsContent value="overview" className="space-y-6 mt-0">
                {/* 수업 소개 */}
                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-xl font-bold">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    {texts.labels.intro}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{item.description}</p>
                </div>

                {/* 학습 목표 */}
                {item.learningObjectives && item.learningObjectives.length > 0 && (
                  <div>
                    <h3 className="mb-3 flex items-center gap-2 text-xl font-bold">
                      <Target className="h-5 w-5 text-green-600" />
                      {texts.labels.learningObjectives}
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {item.learningObjectives.map((objective, i) => (
                        <div key={i} className="flex gap-3 rounded-lg border bg-green-50/50 p-3">
                          <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-600 mt-0.5" />
                          <span className="text-sm text-gray-800">{objective}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 기대 효과 */}
                {item.expectedOutcomes && item.expectedOutcomes.length > 0 && (
                  <div>
                    <h3 className="mb-3 flex items-center gap-2 text-xl font-bold">
                      <TrendingUp className="h-5 w-5 text-purple-600" />
                      {texts.labels.expectedOutcomes}
                    </h3>
                    <div className="space-y-2">
                      {item.expectedOutcomes.map((outcome, i) => (
                        <div key={i} className="flex gap-3 rounded-lg border bg-purple-50/50 p-3">
                          <Award className="h-5 w-5 flex-shrink-0 text-purple-600 mt-0.5" />
                          <span className="text-sm font-medium text-gray-800">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 학생 작품 */}
                {item.studentProjects && item.studentProjects.length > 0 && (
                  <div>
                    <h3 className="mb-3 flex items-center gap-2 text-xl font-bold">
                      <Award className="h-5 w-5 text-orange-600" />
                      {texts.labels.studentProjects}
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {item.studentProjects.map((project, i) => (
                        <div key={i} className="overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md">
                          <div className="aspect-video w-full overflow-hidden bg-gray-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                              src={project.image} 
                              alt={project.title} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="p-3">
                            <h4 className="font-semibold text-gray-900 mb-1">{project.title}</h4>
                            <p className="text-xs text-gray-600">{project.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 준비사항 */}
                <div>
                  <h3 className="mb-3 text-xl font-bold">{texts.labels.requirements}</h3>
                  <div className="space-y-2">
                    {item.requirements.map((req, i) => (
                      <div key={i} className="flex gap-3 rounded-lg border p-3">
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-600" />
                        <span className="text-sm text-gray-700">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 미디어 갤러리 */}
                {item.gallery && item.gallery.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-xl font-bold">{texts.labels.mediaGallery}</h3>
                    <ScheduleMediaGallery items={item.gallery} />
                  </div>
                )}
              </TabsContent>

              {/* 커리큘럼 탭 */}
              <TabsContent value="curriculum" className="space-y-4 mt-0">
                <h3 className="mb-4 text-xl font-bold">{texts.labels.curriculumDetail}</h3>
                
                {isDetailedCurriculum ? (
                  <Accordion type="single" collapsible className="w-full">
                    {curriculumModules.map((module, i) => (
                      <AccordionItem key={i} value={`module-${i}`}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-3 text-left">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                              {i + 1}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{module.week}: {module.title}</div>
                              <div className="text-xs text-gray-500">{module.duration}</div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="ml-11 space-y-2 pt-2">
                            {module.topics.map((topic, j) => (
                              <div key={j} className="flex gap-2 text-sm text-gray-700">
                                <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-600 mt-0.5" />
                                <span>{topic}</span>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="space-y-2">
                    {simpleCurriculum.map((c, i) => (
                      <div key={i} className="flex gap-3 rounded-lg border p-3">
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-600" />
                        <span className="text-sm text-gray-700">{c}</span>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* 강사 탭 */}
              <TabsContent value="instructor" className="space-y-4 mt-0">
                {item.instructorInfo ? (
                  <div className="rounded-lg border bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
                    <div className="mb-4 flex items-center gap-4">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-white">
                        <GraduationCap className="h-10 w-10" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{item.instructorInfo.name}</h3>
                        <p className="text-blue-600 font-medium">{item.instructorInfo.title}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-lg bg-white p-3">
                        <div className="text-xs text-gray-500">경력</div>
                        <div className="font-semibold text-gray-900">{item.instructorInfo.experience}</div>
                      </div>
                      <div className="rounded-lg bg-white p-3">
                        <div className="text-xs text-gray-500">전문 분야</div>
                        <div className="font-semibold text-gray-900">{item.instructorInfo.specialization}</div>
                      </div>
                      <div className="rounded-lg bg-white p-3">
                        <div className="text-xs text-gray-500">학력</div>
                        <div className="font-semibold text-gray-900">{item.instructorInfo.education}</div>
                      </div>
                    </div>
                    
                    <div className="rounded-lg bg-white p-4">
                      <h4 className="mb-2 font-semibold text-gray-900">소개</h4>
                      <p className="text-sm leading-relaxed text-gray-700">{item.instructorInfo.introduction}</p>
                    </div>
                    
                    <div className="mt-4 flex items-center gap-3 rounded-lg bg-white p-3">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-bold">{item.rating}</span>
                      <span className="text-gray-600">강사 평점 ({item.reviews}개 리뷰)</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                    <div>
                      <div className="text-sm text-gray-500">{texts.labels.instructor}</div>
                      <div className="text-lg font-semibold">{item.instructor}</div>
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* 수강평 탭 - 오프라인 교육이므로 임시 비활성화 */}
              {/* <TabsContent value="reviews" className="space-y-4 mt-0">
                {item.reviewList && item.reviewList.length > 0 ? (
                  <>
                    <div className="mb-6 flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Star className="h-8 w-8 fill-yellow-400 text-yellow-400" />
                        <div>
                          <div className="text-3xl font-bold">{item.rating}</div>
                          <div className="text-sm text-gray-600">{item.reviews}{texts.labels.reviews}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {item.reviewList.map((review) => (
                        <div key={review.id} className="rounded-lg border bg-white p-6 shadow-sm">
                          <div className="mb-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">
                                {review.studentName.charAt(0)}
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">{review.studentName}</div>
                                <div className="text-xs text-gray-500">{review.date}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          {review.course && (
                            <div className="mb-2 text-sm text-blue-600">
                              {review.course}
                            </div>
                          )}
                          <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="rounded-lg border border-dashed p-12 text-center">
                    <Star className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                    <p className="text-gray-500">{texts.labels.noReviews}</p>
                  </div>
                )}
              </TabsContent> */}

              {/* 질문/댓글 탭 */}
              <TabsContent value="qna" className="space-y-4 mt-0">
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
                {item.commentList && item.commentList.length > 0 ? (
                  <div className="space-y-4">
                    {item.commentList.map((comment) => (
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
              </TabsContent>

              {/* FAQ 탭 */}
              <TabsContent value="faq" className="space-y-4 mt-0">
                {item.faqs && item.faqs.length > 0 ? (
                  <>
                    <div className="mb-4 flex items-center gap-2">
                      <HelpCircle className="h-6 w-6 text-blue-600" />
                      <h3 className="text-xl font-bold">{texts.labels.faqs}</h3>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                      {item.faqs.map((faq, i) => (
                        <AccordionItem key={i} value={`faq-${i}`}>
                          <AccordionTrigger className="text-left hover:no-underline">
                            <span className="font-semibold text-gray-900">{faq.question}</span>
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="text-sm leading-relaxed text-gray-700 pl-4 border-l-2 border-blue-200">
                              {faq.answer}
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </>
                ) : (
                  <div className="rounded-lg border border-dashed p-8 text-center text-gray-500">
                    FAQ가 준비 중입니다.
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* 오른쪽: 수강 신청 카드 (고정) */}
          <aside className="space-y-4 lg:sticky lg:top-4 lg:h-fit">
            <div className="rounded-lg border bg-white p-4 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">{texts.labels.instructor}</div>
                  <div className="font-semibold">{item.instructor}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-bold">{item.rating}</span>
                  <span className="text-sm text-gray-500">({item.reviews})</span>
                </div>
              </div>

              <div className="mb-4 grid gap-3">
                <div className="flex items-center gap-3 rounded-lg border p-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <div className="text-xs text-gray-500">{texts.labels.openingDate}</div>
                    <div className="font-semibold text-sm">{item.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border p-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <div className="text-xs text-gray-500">{texts.labels.classTime}</div>
                    <div className="font-semibold text-sm">{item.time}</div>
                  </div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                      <Users className="h-4 w-4 text-blue-600" />
                      수강 인원
                    </div>
                    <span className="text-xs text-gray-600">
                      {item.capacity - item.enrolled > 0
                        ? `${item.capacity - item.enrolled}${texts.labels.remain}`
                        : texts.labels.closed}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-blue-600">{item.enrolled}명</span>
                    <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="absolute left-0 top-0 h-2 rounded-full bg-blue-600 transition-all"
                        style={{ width: `${(item.enrolled / item.capacity) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{item.capacity}명</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-4 shadow-sm border">
                <div className="flex-1">
                  <div className="mb-1 text-sm text-gray-600">{texts.labels.price}</div>
                  <div className="mb-1 text-3xl font-bold text-blue-600">{item.price}</div>
                  <div className="text-sm text-gray-500">{item.duration}</div>
                </div>
                <div className="flex flex-col gap-3 w-full">
                  <Button 
                    size="lg" 
                    disabled={isClosed}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all w-full"
                  >
                    {isClosed ? texts.labels.closedFull : texts.labels.apply}
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    onClick={handleOutreachInquiry}
                    className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-6 text-base font-semibold w-full"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    출강 수업 문의하기
                  </Button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </DialogContent>
    </Dialog>
  )
}
