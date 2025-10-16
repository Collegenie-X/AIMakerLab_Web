"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/buttons/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/overlays/dialog"
import { Input } from "@/components/ui/forms/input"
import { Label } from "@/components/ui/forms/label"
import { Textarea } from "@/components/ui/forms/textarea"
import { Upload, X } from "lucide-react"

type FormField = {
  label: string
  emoji: string
  placeholder: string
}

type FormFieldWithOptions = FormField & {
  options?: string[]
}

export type GalleryFormConfig = {
  title: string
  emoji: string
  submitLabel: string
  cancelLabel: string
  fields: {
    image: {
      label: string
      emoji: string
      uploadPlaceholder: string
      uploadHint: string
    }
    title: FormField
    category: FormFieldWithOptions
    description: FormField
    details: FormField
    author: FormField
    tags: FormField
    rating?: {
      label: string
      emoji: string
    }
  }
}

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
  config: GalleryFormConfig
  onSubmit?: (e: React.FormEvent) => void
  showRating?: boolean
}

/**
 * 갤러리 작품/후기 등록 폼 다이얼로그
 */
export function GalleryFormDialog({ open, onOpenChange, config, onSubmit, showRating = false }: Props) {
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [rating, setRating] = useState(5)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
    setUploadedImages((prev) => [...prev, ...newImages])
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full sm:max-w-[95vw] md:max-w-4xl lg:max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <span className="text-4xl">{config.emoji}</span>
            {config.title}
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-6" onSubmit={onSubmit}>
          {/* 이미지 업로드 */}
          <div className="space-y-2">
            <Label htmlFor="image">
              {config.fields.image.emoji} {config.fields.image.label}
            </Label>

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
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 mb-3 text-blue-500" />
                  <p className="mb-2 text-sm text-gray-600">
                    <span className="font-semibold">{config.fields.image.uploadPlaceholder}</span> 또는 드래그 앤 드롭
                  </p>
                  <p className="text-xs text-gray-500">{config.fields.image.uploadHint}</p>
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

          {/* 제목 */}
          <div className="space-y-2">
            <Label htmlFor="title">
              {config.fields.title.emoji} {config.fields.title.label}
            </Label>
            <Input id="title" placeholder={config.fields.title.placeholder} className="border-blue-300 bg-white" />
          </div>

          {/* 카테고리 */}
          <div className="space-y-2">
            <Label htmlFor="category">
              {config.fields.category.emoji} {config.fields.category.label}
            </Label>
            <select
              id="category"
              className="w-full rounded-md border border-blue-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">{config.fields.category.placeholder}</option>
              {config.fields.category.options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* 평점 (후기 전용) */}
          {showRating && config.fields.rating && (
            <div className="space-y-2">
              <Label htmlFor="rating">
                {config.fields.rating.emoji} {config.fields.rating.label}
              </Label>
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
          )}

          {/* 간단한 설명 */}
          <div className="space-y-2">
            <Label htmlFor="description">
              {config.fields.description.emoji} {config.fields.description.label}
            </Label>
            <Input
              id="description"
              placeholder={config.fields.description.placeholder}
              className="border-blue-300 bg-white"
            />
          </div>

          {/* 상세 설명 */}
          <div className="space-y-2">
            <Label htmlFor="details">
              {config.fields.details.emoji} {config.fields.details.label}
            </Label>
            <Textarea
              id="details"
              placeholder={config.fields.details.placeholder}
              rows={6}
              className="border-blue-300 bg-white"
            />
          </div>

          {/* 작성자 */}
          <div className="space-y-2">
            <Label htmlFor="author">
              {config.fields.author.emoji} {config.fields.author.label}
            </Label>
            <Input id="author" placeholder={config.fields.author.placeholder} className="border-blue-300 bg-white" />
          </div>

          {/* 태그 */}
          <div className="space-y-2">
            <Label htmlFor="tags">
              {config.fields.tags.emoji} {config.fields.tags.label}
            </Label>
            <Input id="tags" placeholder={config.fields.tags.placeholder} className="border-blue-300 bg-white" />
          </div>

          {/* 제출 버튼 */}
          <div className="flex gap-3">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              {config.submitLabel}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => onOpenChange(false)}
            >
              {config.cancelLabel}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

