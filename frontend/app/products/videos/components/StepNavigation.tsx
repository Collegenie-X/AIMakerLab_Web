/**
 * 단계별 네비게이션 컴포넌트
 * 
 * UI 로직: 제작 단계 표시 및 네비게이션
 */

"use client"

import { Button } from "@/components/ui/buttons/button"
import { ChevronLeft, ChevronRight, PlayCircle } from "lucide-react"
import type { VideoStep } from "@/lib/products/videos"

type StepNavigationProps = {
  steps: VideoStep[]
  currentStepIndex: number
  onPrevStep: () => void
  onNextStep: () => void
  onSelectStep: (index: number) => void
}

/**
 * 단계별 네비게이션 및 표시
 * 현재 단계 정보, 이전/다음 버튼, 진행 인디케이터
 */
export function StepNavigation({
  steps,
  currentStepIndex,
  onPrevStep,
  onNextStep,
  onSelectStep,
}: StepNavigationProps) {
  const currentStep = steps[currentStepIndex]

  // 단계가 없으면 렌더링하지 않음
  if (!steps.length) {
    return null
  }

  return (
    <div className="border rounded-lg p-4 bg-muted/30">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm text-muted-foreground">
          제작 단계
        </h3>
        <span className="text-xs font-medium text-muted-foreground">
          {currentStepIndex + 1} / {steps.length}
        </span>
      </div>

      {/* 현재 단계 내용 */}
      {currentStep && (
        <div className="mb-4 p-4 rounded-lg border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
          {/* 단계 제목과 영상 시간 */}
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

      {/* 이전/다음 버튼 */}
      <div className="flex gap-2 mb-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevStep}
          disabled={currentStepIndex === 0}
          className="flex-1"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          이전 단계
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={onNextStep}
          disabled={currentStepIndex === steps.length - 1}
          className="flex-1"
        >
          다음 단계
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      {/* 진행 인디케이터 */}
      <div className="flex gap-1">
        {steps.map((_, idx) => (
          <button
            key={idx}
            onClick={() => onSelectStep(idx)}
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
  )
}

