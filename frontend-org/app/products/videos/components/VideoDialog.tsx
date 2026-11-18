/**
 * 비디오 상세 다이얼로그 컴포넌트
 * 
 * UI 로직: 비디오 플레이어 + 단계별 네비게이션
 */

"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/overlays/dialog"
import { Badge } from "@/components/ui/data-display/badge"
import { Clock, BarChart3 } from "lucide-react"
import type { VideoItem } from "@/lib/products/videos"
import { VideoPlayer } from "./VideoPlayer"
import { StepNavigation } from "./StepNavigation"

type VideoDialogProps = {
  video: VideoItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * 비디오 상세 다이얼로그
 * 플레이어, 정보, 단계별 네비게이션을 포함합니다
 */
export function VideoDialog({ video, open, onOpenChange }: VideoDialogProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  // 다이얼로그가 열릴 때 스텝 인덱스 초기화
  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      setCurrentStepIndex(0)
    }
    onOpenChange(newOpen)
  }

  // 이전 단계로 이동
  const goToPrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  // 다음 단계로 이동
  const goToNextStep = () => {
    if (!video) return
    if (currentStepIndex < video.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    }
  }

  // 특정 단계로 이동
  const goToStep = (index: number) => {
    setCurrentStepIndex(index)
  }

  // 비디오가 없으면 렌더링하지 않음
  if (!video) {
    return null
  }

  const currentStep = video.steps[currentStepIndex]

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="!max-w-5xl w-[92vw] p-0 overflow-hidden max-h-[90vh]">
        <div className="flex flex-col h-full max-h-[90vh]">
          {/* 비디오 플레이어 */}
          <VideoPlayer 
            video={video} 
            currentStep={currentStep}
            stepIndex={currentStepIndex}
          />

          {/* 정보 및 네비게이션 영역 */}
          <div className="flex-1 overflow-y-auto p-6 bg-muted/5">
            {/* 제목 및 설명 */}
            <div className="mb-5">
              <DialogTitle className="text-xl font-bold mb-2">
                {video.title}
              </DialogTitle>
              <DialogDescription className="text-sm">
                {video.description}
              </DialogDescription>
              
              {/* 메타데이터 뱃지 */}
              <div className="flex gap-2 mt-2 flex-wrap">
                {video.duration && (
                  <Badge variant="outline" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {video.duration}
                  </Badge>
                )}
                {video.difficulty && (
                  <Badge variant="outline" className="text-xs">
                    <BarChart3 className="w-3 h-3 mr-1" />
                    {video.difficulty}
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs">
                  총 {video.steps.length}단계
                </Badge>
              </div>
            </div>

            {/* 단계별 네비게이션 */}
            <StepNavigation
              steps={video.steps}
              currentStepIndex={currentStepIndex}
              onPrevStep={goToPrevStep}
              onNextStep={goToNextStep}
              onSelectStep={goToStep}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

