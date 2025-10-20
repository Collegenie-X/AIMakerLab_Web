"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/data-display/card"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/overlays/dialog"
import { Badge } from "@/components/ui/data-display/badge"
import { Button } from "@/components/ui/buttons/button"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Clock, BarChart3, BookOpen, PlayCircle } from "lucide-react"
import type { VideoItem } from "../config"
import { videosConfig } from "../config"

type Props = {
  items: VideoItem[]
}

export function VideoGrid({ items }: Props) {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState<VideoItem | null>(null)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  const onOpen = (item: VideoItem) => {
    setCurrent(item)
    setCurrentStepIndex(0)
    setOpen(true)
  }

  const goToNextStep = () => {
    if (!current) return
    if (currentStepIndex < current.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    }
  }

  const goToPrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  const currentStep = current?.steps[currentStepIndex]

  // YouTube URL에 타임스탬프 추가 및 자동 재생
  const getVideoSrcWithTimestamp = (): string => {
    if (!current) return ""

    // 기본 URL (autoplay 추가)
    let videoUrl = `${current.src}${current.src.includes("?") ? "&" : "?"}autoplay=1`

    // 타임스탬프가 있으면 해당 시간부터 재생
    if (currentStep?.youtubeTimestamp) {
      const timestamp = currentStep.youtubeTimestamp
      // "1m30s" -> 90초로 변환
      const match = timestamp.match(/(\d+)m(\d+)s/)
      if (match) {
        const totalSeconds = parseInt(match[1]) * 60 + parseInt(match[2])
        videoUrl += `&start=${totalSeconds}`
      }
    }

    return videoUrl
  }

  return (
    <>
      {/* 비디오 그리드 */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((v) => (
          <button 
            key={v.id} 
            onClick={() => onOpen(v)} 
            className="text-left transition-transform hover:scale-[1.02]"
          >
            <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
              <div className="relative w-full aspect-video">
                <Image 
                  src={v.thumbnail} 
                  alt={v.title} 
                  fill 
                  className="object-cover" 
                />
                {/* 재생 시간 및 난이도 오버레이 */}
                <div className="absolute top-2 right-2 flex gap-2">
                  {v.duration && (
                    <Badge variant="secondary" className="bg-black/70 text-white">
                      <Clock className="w-3 h-3 mr-1" />
                      {v.duration}
                    </Badge>
                  )}
                </div>
                <div className="absolute bottom-2 left-2 flex gap-2">
                  {v.difficulty && (
                    <Badge variant="secondary" className="bg-black/70 text-white">
                      <BarChart3 className="w-3 h-3 mr-1" />
                      {v.difficulty}
                    </Badge>
                  )}
                  {/* 단계 수 표시 */}
                  <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
                    <BookOpen className="w-3 h-3 mr-1" />
                    총 {v.steps.length}단계
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">{v.title}</CardTitle>
                <CardDescription className="line-clamp-2">{v.description}</CardDescription>
              </CardHeader>
            </Card>
          </button>
        ))}
      </div>

      {/* 상세 다이얼로그 */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={`${videosConfig.dialog.contentClass} p-0 overflow-hidden max-h-[90vh]`}>
          <div className="flex flex-col h-full max-h-[90vh]">
            {/* 비디오 영역 */}
            <div className="relative w-full bg-black" style={{ height: '50vh', maxHeight: '500px' }}>
              {current && (
                <>
                  {current.src.includes("youtube.com") || current.src.includes("youtu.be") ? (
                    <iframe
                      key={currentStepIndex} // 스텝 변경 시 iframe 리로드
                      src={getVideoSrcWithTimestamp()}
                      title={current.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <video src={current.src} controls className="w-full h-full object-contain" />
                  )}
                </>
              )}
            </div>

            {/* 정보 영역 - 확장 */}
            <div className="flex-1 overflow-y-auto p-6 bg-muted/5">
              {current && (
                <>
                  {/* 제목 및 설명 */}
                  <div className="mb-5">
                    <DialogTitle className="text-xl font-bold mb-2">
                      {current.title}
                    </DialogTitle>
                    <DialogDescription className="text-sm">
                      {current.description}
                    </DialogDescription>
                    <div className="flex gap-2 mt-2">
                      {current.duration && (
                        <Badge variant="outline" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {current.duration}
                        </Badge>
                      )}
                      {current.difficulty && (
                        <Badge variant="outline" className="text-xs">
                          <BarChart3 className="w-3 h-3 mr-1" />
                          {current.difficulty}
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        총 {current.steps.length}단계
                      </Badge>
                    </div>
                  </div>

                  {/* 단계별 네비게이션 */}
                  {current.steps.length > 0 && (
                    <div className="border rounded-lg p-4 bg-muted/30">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-sm text-muted-foreground">
                          제작 단계
                        </h3>
                        <span className="text-xs font-medium text-muted-foreground">
                          {currentStepIndex + 1} / {current.steps.length}
                        </span>
                      </div>

                      {/* 현재 스텝 내용 */}
                      {currentStep && (
                        <div className="mb-4 p-4 rounded-lg border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
                          {/* 단계 제목과 영상 시간을 좌우 배치 */}
                          <div className="flex items-center justify-between gap-3 mb-3">
                            <div className="flex items-center gap-3 flex-1">
                              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground text-base font-bold shrink-0">
                                {currentStep.stepNumber}
                              </span>
                              <h4 className="font-bold text-base text-foreground">
                                {currentStep.stepTitle}
                              </h4>
                            </div>
                            {currentStep.youtubeTimestamp && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                                <PlayCircle className="w-3 h-3" />
                                <span>영상 시간: {currentStep.youtubeTimestamp}</span>
                              </div>
                            )}
                          </div>
                          
                          {/* 설명 텍스트 */}
                          <div className="pl-12">
                            <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-line">
                              {currentStep.stepDescription}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* 좌우 네비게이션 버튼 */}
                      <div className="flex gap-2 mb-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={goToPrevStep}
                          disabled={currentStepIndex === 0}
                          className="flex-1"
                        >
                          <ChevronLeft className="w-4 h-4 mr-1" />
                          이전 단계
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={goToNextStep}
                          disabled={currentStepIndex === current.steps.length - 1}
                          className="flex-1"
                        >
                          다음 단계
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>

                      {/* 스텝 인디케이터 */}
                      <div className="flex gap-1">
                        {current.steps.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentStepIndex(idx)}
                            className={`flex-1 h-1.5 rounded-full transition-colors ${
                              idx === currentStepIndex 
                                ? "bg-primary" 
                                : idx < currentStepIndex
                                ? "bg-primary/50"
                                : "bg-muted"
                            }`}
                            aria-label={`${idx + 1}단계로 이동`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}


