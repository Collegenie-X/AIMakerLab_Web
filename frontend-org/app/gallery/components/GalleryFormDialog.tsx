"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/buttons/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/overlays/dialog"
import { Input } from "@/components/ui/forms/input"
import { Label } from "@/components/ui/forms/label"
import { Textarea } from "@/components/ui/forms/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/forms/select"
import { Upload, X, Star } from "lucide-react"
import { useCreateGalleryItem, useUpdateGalleryItem, type GalleryItem, type WorkItem, type ReviewItem, type GalleryType, type WorkSource } from "@/lib/gallery"
import { useToast } from "@/hooks/use-toast"

type Props = {
  type: GalleryType
  open: boolean
  onClose: () => void
  editingItem?: GalleryItem | null
}

/**
 * 갤러리 등록/수정 폼 다이얼로그
 * - 작품과 후기를 구분하여 다른 필드 표시
 */
export function GalleryFormDialog({ type, open, onClose, editingItem }: Props) {
  const { toast } = useToast()
  const createMutation = useCreateGalleryItem(type)
  const updateMutation = useUpdateGalleryItem(type)

  const isEditMode = !!editingItem
  const isWorkType = type === 'works'

  // 폼 상태
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [details, setDetails] = useState("")
  const [author, setAuthor] = useState("")
  const [tags, setTags] = useState("")
  const [emoji, setEmoji] = useState("✨")
  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  // 작품 전용
  const [source, setSource] = useState<WorkSource>("student")
  const [techStack, setTechStack] = useState("")
  const [difficulty, setDifficulty] = useState<WorkItem['difficulty']>("초급")
  const [duration, setDuration] = useState("")
  const [features, setFeatures] = useState("")
  const [challenges, setChallenges] = useState("")
  const [learnings, setLearnings] = useState("")
  const [grade, setGrade] = useState("")

  // 후기 전용
  const [rating, setRating] = useState(5)
  const [courseType, setCourseType] = useState("")
  const [courseDuration, setCourseDuration] = useState("")
  const [studentGrade, setStudentGrade] = useState("")
  const [classType, setClassType] = useState<ReviewItem['classType']>("소규모")
  const [curriculumRating, setCurriculumRating] = useState(5)
  const [instructorRating, setInstructorRating] = useState(5)
  const [facilityRating, setFacilityRating] = useState(4)
  const [managementRating, setManagementRating] = useState(5)

  // 수정 모드일 때 기존 데이터 로드
  useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title)
      setCategory(editingItem.category)
      setAuthor(editingItem.author)
      setTags(editingItem.tags.join(", "))
      setEmoji(editingItem.emoji)
      setUploadedImages(editingItem.images)

      if (editingItem.type === 'work') {
        setDescription(editingItem.description)
        setDetails(editingItem.projectDetails)
        setSource(editingItem.source || "student")
        setTechStack(editingItem.techStack?.join(", ") || "")
        setDifficulty(editingItem.difficulty || "초급")
        setDuration(editingItem.duration || "")
        setFeatures(editingItem.features?.join("\n") || "")
        setChallenges(editingItem.challenges || "")
        setLearnings(editingItem.learnings || "")
        setGrade(editingItem.grade || "")
      } else {
        setDescription(editingItem.summary)
        setDetails(editingItem.reviewContent)
        setRating(editingItem.rating)
        setCourseType(editingItem.courseType || "")
        setCourseDuration(editingItem.courseDuration || "")
        setStudentGrade(editingItem.studentGrade || "")
        setClassType(editingItem.classType || "소규모")
        if (editingItem.satisfaction) {
          setCurriculumRating(editingItem.satisfaction.curriculum || 5)
          setInstructorRating(editingItem.satisfaction.instructor || 5)
          setFacilityRating(editingItem.satisfaction.facility || 4)
          setManagementRating(editingItem.satisfaction.management || 5)
        }
      }
    }
  }, [editingItem])

  // 폼 초기화
  const resetForm = () => {
    setTitle("")
    setCategory("")
    setDescription("")
    setDetails("")
    setAuthor("")
    setTags("")
    setEmoji("✨")
    setUploadedImages([])
    setSource("student")
    setTechStack("")
    setDifficulty("초급")
    setDuration("")
    setFeatures("")
    setChallenges("")
    setLearnings("")
    setGrade("")
    setRating(5)
    setCourseType("")
    setCourseDuration("")
    setStudentGrade("")
    setClassType("소규모")
    setCurriculumRating(5)
    setInstructorRating(5)
    setFacilityRating(4)
    setManagementRating(5)
  }

  // 이미지 업로드
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
    setUploadedImages((prev) => [...prev, ...newImages])
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  // 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 유효성 검사
    if (!title || !category || !description || !details || !author) {
      toast({
        title: "필수 항목 누락",
        description: "모든 필수 항목을 입력해주세요.",
        variant: "destructive",
      })
      return
    }

    const tagsArray = tags.split(",").map((t) => t.trim()).filter(Boolean)
    const imageArray = uploadedImages.length > 0 ? uploadedImages : ["/placeholder.svg"]

    if (isWorkType) {
      // 작품 데이터
      const workData: Omit<WorkItem, 'id' | 'views' | 'likes' | 'date'> = {
        type: 'work',
        title,
        description,
        category,
        image: imageArray[0],
        emoji,
        author: author + (grade ? ` (${grade})` : ""),
        source,
        projectDetails: details,
        images: imageArray,
        tags: tagsArray,
        techStack: techStack ? techStack.split(",").map((t) => t.trim()) : undefined,
        difficulty,
        duration: duration || undefined,
        features: features ? features.split("\n").filter(Boolean) : undefined,
        challenges: challenges || undefined,
        learnings: learnings || undefined,
        grade: grade || undefined,
      }

      if (isEditMode && editingItem) {
        updateMutation.mutate(
          { itemId: editingItem.id, updates: workData },
          {
            onSuccess: () => {
              toast({ title: "수정 완료", description: "작품이 성공적으로 수정되었습니다." })
              resetForm()
              onClose()
            },
            onError: (error) => {
              toast({ title: "수정 실패", description: error.message, variant: "destructive" })
            },
          }
        )
      } else {
        createMutation.mutate(workData, {
          onSuccess: () => {
            toast({ title: "등록 완료", description: "작품이 성공적으로 등록되었습니다." })
            resetForm()
            onClose()
          },
          onError: (error) => {
            toast({ title: "등록 실패", description: error.message, variant: "destructive" })
          },
        })
      }
    } else {
      // 후기 데이터
      const reviewData: Omit<ReviewItem, 'id' | 'views' | 'likes' | 'date'> = {
        type: 'review',
        title,
        summary: description,
        category,
        image: imageArray[0],
        emoji,
        author,
        rating,
        reviewContent: details,
        images: imageArray,
        tags: tagsArray,
        courseType: courseType || undefined,
        courseDuration: courseDuration || undefined,
        studentGrade: studentGrade || undefined,
        classType,
        satisfaction: {
          curriculum: curriculumRating,
          instructor: instructorRating,
          facility: facilityRating,
          management: managementRating,
        },
        wouldRecommend: true,
      }

      if (isEditMode && editingItem) {
        updateMutation.mutate(
          { itemId: editingItem.id, updates: reviewData },
          {
            onSuccess: () => {
              toast({ title: "수정 완료", description: "후기가 성공적으로 수정되었습니다." })
              resetForm()
              onClose()
            },
            onError: (error) => {
              toast({ title: "수정 실패", description: error.message, variant: "destructive" })
            },
          }
        )
      } else {
        createMutation.mutate(reviewData, {
          onSuccess: () => {
            toast({ title: "등록 완료", description: "후기가 성공적으로 등록되었습니다." })
            resetForm()
            onClose()
          },
          onError: (error) => {
            toast({ title: "등록 실패", description: error.message, variant: "destructive" })
          },
        })
      }
    }
  }

  const categories = isWorkType
    ? ["IoT", "AI", "앱 개발", "로보틱스", "웹 개발"]
    : ["주중 강의", "주말 강의", "출장 강의"]

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-full sm:max-w-[95vw] md:max-w-4xl lg:max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <span className="text-4xl">{isWorkType ? "🎨" : "💬"}</span>
            {isEditMode ? "수정하기" : isWorkType ? "작품 등록하기" : "후기 작성하기"}
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* 이미지 업로드 */}
          <div className="space-y-2">
            <Label htmlFor="image">📷 이미지 *</Label>

            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-3">
                {uploadedImages.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`Upload ${idx + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-purple-300 border-dashed rounded-lg cursor-pointer bg-purple-50 hover:bg-purple-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 mb-2 text-purple-500" />
                  <p className="text-sm text-gray-600">클릭하여 이미지 업로드</p>
                </div>
                <input
                  id="image"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>

          {/* 제목 & 이모지 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <Label htmlFor="emoji">이모지</Label>
              <Input
                id="emoji"
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
                placeholder="✨"
                className="text-2xl text-center"
              />
            </div>
            <div className="md:col-span-3">
              <Label htmlFor="title">제목 *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={isWorkType ? "프로젝트 제목" : "후기 제목"}
                required
              />
            </div>
          </div>

          {/* 카테고리 */}
          <div>
            <Label htmlFor="category">카테고리 *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="카테고리 선택" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 간단한 설명 */}
          <div>
            <Label htmlFor="description">{isWorkType ? "한 줄 소개" : "한 줄 요약"} *</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={isWorkType ? "프로젝트를 한 줄로 소개해주세요" : "후기를 한 줄로 요약해주세요"}
              required
            />
          </div>

          {/* 작품 전용: 구분 & 기술 정보 */}
          {isWorkType && (
            <>
              <div>
                <Label htmlFor="source">작품 구분 *</Label>
                <Select value={source} onValueChange={(v) => setSource(v as WorkSource)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">🧑‍🎓 학생 작품</SelectItem>
                    <SelectItem value="internal">🏢 내부 작품</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="techStack">사용 기술 (쉼표로 구분)</Label>
                  <Input
                    id="techStack"
                    value={techStack}
                    onChange={(e) => setTechStack(e.target.value)}
                    placeholder="Python, TensorFlow, Flask"
                  />
                </div>
                <div>
                  <Label htmlFor="difficulty">난이도</Label>
                  <Select value={difficulty} onValueChange={(v) => setDifficulty(v as WorkItem['difficulty'])}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="입문">입문</SelectItem>
                      <SelectItem value="초급">초급</SelectItem>
                      <SelectItem value="중급">중급</SelectItem>
                      <SelectItem value="고급">고급</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">제작 기간</Label>
                  <Input
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="예: 3개월"
                  />
                </div>
                <div>
                  <Label htmlFor="grade">학년</Label>
                  <Input
                    id="grade"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    placeholder="예: 중2"
                  />
                </div>
              </div>
            </>
          )}

          {/* 후기 전용: 평점 & 수업 정보 */}
          {!isWorkType && (
            <>
              <div>
                <Label>평점 *</Label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="text-3xl transition-all hover:scale-110"
                    >
                      {star <= rating ? "⭐" : "☆"}
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">{rating}점</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="courseType">수업 과정</Label>
                  <Input
                    id="courseType"
                    value={courseType}
                    onChange={(e) => setCourseType(e.target.value)}
                    placeholder="예: 앱인벤터"
                  />
                </div>
                <div>
                  <Label htmlFor="courseDuration">수강 기간</Label>
                  <Input
                    id="courseDuration"
                    value={courseDuration}
                    onChange={(e) => setCourseDuration(e.target.value)}
                    placeholder="예: 6개월"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="studentGrade">학생 학년</Label>
                  <Input
                    id="studentGrade"
                    value={studentGrade}
                    onChange={(e) => setStudentGrade(e.target.value)}
                    placeholder="예: 초5"
                  />
                </div>
                <div>
                  <Label htmlFor="classType">수업 형태</Label>
                  <Select value={classType} onValueChange={(v) => setClassType(v as ReviewItem['classType'])}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="개인">개인</SelectItem>
                      <SelectItem value="소규모">소규모</SelectItem>
                      <SelectItem value="그룹">그룹</SelectItem>
                      <SelectItem value="출장">출장</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* 만족도 평가 */}
              <div className="space-y-3 p-4 bg-purple-50 rounded-lg">
                <Label>만족도 평가</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-gray-700 block mb-1">커리큘럼</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} type="button" onClick={() => setCurriculumRating(star)} className="text-xl">
                          {star <= curriculumRating ? "⭐" : "☆"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 block mb-1">강사</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} type="button" onClick={() => setInstructorRating(star)} className="text-xl">
                          {star <= instructorRating ? "⭐" : "☆"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 block mb-1">시설</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} type="button" onClick={() => setFacilityRating(star)} className="text-xl">
                          {star <= facilityRating ? "⭐" : "☆"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 block mb-1">운영 관리</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} type="button" onClick={() => setManagementRating(star)} className="text-xl">
                          {star <= managementRating ? "⭐" : "☆"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* 상세 내용 */}
          <div>
            <Label htmlFor="details">{isWorkType ? "프로젝트 상세 설명" : "수업 후기 상세"} *</Label>
            <Textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder={
                isWorkType
                  ? "프로젝트에 대해 자세히 설명해주세요..."
                  : "수업을 들으면서 느낀 점을 자세히 작성해주세요..."
              }
              rows={6}
              required
            />
          </div>

          {/* 작품 전용: 추가 정보 */}
          {isWorkType && (
            <>
              <div>
                <Label htmlFor="features">주요 기능 (한 줄씩 입력)</Label>
                <Textarea
                  id="features"
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  placeholder="기능 1&#10;기능 2&#10;기능 3"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="challenges">어려웠던 점</Label>
                  <Textarea
                    id="challenges"
                    value={challenges}
                    onChange={(e) => setChallenges(e.target.value)}
                    placeholder="프로젝트를 진행하면서 어려웠던 점..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="learnings">배운 점</Label>
                  <Textarea
                    id="learnings"
                    value={learnings}
                    onChange={(e) => setLearnings(e.target.value)}
                    placeholder="프로젝트를 통해 배운 점..."
                    rows={3}
                  />
                </div>
              </div>
            </>
          )}

          {/* 작성자 & 태그 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="author">작성자 *</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder={isWorkType ? "이름" : "이름 (예: 김OO 학부모)"}
                required
              />
            </div>
            <div>
              <Label htmlFor="tags">태그 (쉼표로 구분)</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="태그1, 태그2, 태그3"
              />
            </div>
          </div>

          {/* 제출 버튼 */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {isEditMode ? "수정하기" : "등록하기"}
            </Button>
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
              취소
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
