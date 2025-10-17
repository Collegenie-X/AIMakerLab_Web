'use client'

import { useState } from 'react'
import { Star, Users, Clock, GraduationCap, Package, ShoppingCart, Heart, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/data-display/badge'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent } from '@/components/ui/data-display/card'
import { Product } from '../../hooks/useProducts'
import { PRODUCT_DETAIL_TEXTS } from '../../config'

/**
 * 제품 상세 페이지 상단 섹션 컴포넌트
 * 이미지 슬라이더 + 제품 정보 + 구매 옵션
 */
interface ProductDetailTopProps {
  product: Product
}

export function ProductDetailTop({ product }: ProductDetailTopProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  // 이미지 배열 (images가 있으면 사용, 없으면 image 사용)
  const images = product.images || [product.image]

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta))
  }

  // 이미지 슬라이드 이동
  const goToPrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNextImage = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const totalPrice = Number.parseInt(product.price) * quantity

  return (
    <section className="py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* 이미지 슬라이더 갤러리 */}
          <div>
            <div className="relative mb-4 overflow-hidden rounded-2xl border bg-white shadow-lg">
              <div className="aspect-square bg-gray-50 p-8">
                <img
                  src={images[selectedImage] || '/placeholder.svg'}
                  alt={product.title}
                  className="h-full w-full object-contain transition-opacity duration-300"
                />
              </div>

              {/* 슬라이드 화살표 (이미지가 2개 이상일 때만 표시) */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={goToPrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
                    aria-label="이전 이미지"
                  >
                    <ChevronLeft className="h-6 w-6 text-gray-800" />
                  </button>
                  <button
                    onClick={goToNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
                    aria-label="다음 이미지"
                  >
                    <ChevronRight className="h-6 w-6 text-gray-800" />
                  </button>

                  {/* 이미지 인디케이터 */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`h-2 rounded-full transition-all ${
                          selectedImage === index
                            ? 'w-8 bg-teal-600'
                            : 'w-2 bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`${index + 1}번 이미지로 이동`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* 썸네일 이미지 (이미지가 2개 이상일 때만 표시) */}
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`overflow-hidden rounded-lg border-2 transition-all hover:border-teal-500 hover:scale-105 ${
                      selectedImage === index ? 'border-teal-500 ring-2 ring-teal-200' : 'border-gray-200'
                    }`}
                  >
                    <div className="aspect-square bg-gray-50 p-2">
                      <img
                        src={image || '/placeholder.svg'}
                        alt={`${product.title} ${index + 1}`}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 제품 정보 */}
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              {product.badges.map((badge, i) => (
                <Badge key={i} className="bg-teal-600 hover:bg-teal-700">
                  {badge}
                </Badge>
              ))}
            </div>

            <h1 className="mb-3 text-2xl font-bold text-gray-900 leading-tight">{product.title}</h1>
            <p className="mb-4 text-gray-600">{product.shortDescription}</p>

            {/* 평점 & 소셜 프루프 */}
            <div className="mb-4 flex flex-wrap items-center gap-4 border-b pb-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-bold text-gray-900">{product.rating}</span>
                </div>
                <span className="text-sm text-gray-600">({product.reviews}개 리뷰)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Package className="h-4 w-4" />
                <span>{product.soldCount}개 학교 구매</span>
              </div>
            </div>

            {/* 가격 - 더 강조 */}
            <div className="mb-6 rounded-2xl bg-gradient-to-r from-teal-50 to-cyan-50 p-6 border-2 border-teal-200">
              <p className="mb-2 text-sm text-gray-600 font-medium">{PRODUCT_DETAIL_TEXTS.top.salePriceLabel}</p>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-5xl font-bold text-teal-600">
                  {Number.parseInt(product.price).toLocaleString()}
                </span>
                <span className="text-2xl font-bold text-teал-600">{PRODUCT_DETAIL_TEXTS.top.currencySuffix}</span>
              </div>
              {product.originalPrice && (
                <div className="flex items-center gap-3">
                  <span className="text-lg text-gray-400 line-through">
                    {PRODUCT_DETAIL_TEXTS.top.listPriceLabel} {Number.parseInt(product.originalPrice).toLocaleString()}{PRODUCT_DETAIL_TEXTS.top.currencySuffix}
                  </span>
                  <Badge className="bg-red-500 text-base px-3 py-1">{product.discount}% {PRODUCT_DETAIL_TEXTS.top.discountSuffix}</Badge>
                </div>
              )}
            </div>

            {/* 수업 정보 - 간결하게 */}
            <div className="mb-6 grid grid-cols-3 gap-3">
              <div className="rounded-lg border bg-gray-50 p-3 text-center">
                <GraduationCap className="mx-auto mb-1 h-5 w-5 text-teal-600" />
                <p className="font-semibold text-gray-900 text-sm">{product.targetGrade} <span className="text-gray-400 text-sm font-normal">(적정 학년) </span></p>
              </div>
              <div className="rounded-lg border bg-gray-50 p-3 text-center">
                <Clock className="mx-auto mb-1 h-5 w-5 text-teal-600" />                
                <p className="font-semibold text-gray-900 text-sm">{product.classTime} <span className="text-gray-400 text-sm font-normal"> (수업 차시)</span></p>
              </div>
              <div className="rounded-lg border bg-gray-50 p-3 text-center">
                <Users className="mx-auto mb-1 h-5 w-5 text-teal-600" />
                <p className="font-semibold text-gray-900 text-sm">{product.groupSize} <span className="text-gray-400 text-sm font-normal"> (권장 인원)</span></p>
              </div>
            </div>

            {/* 수량 & 구매 */}
            <div className="mb-4 flex items-center gap-3 rounded-lg border p-4">
              <span className="text-sm font-semibold text-gray-700">{PRODUCT_DETAIL_TEXTS.top.quantityLabel}</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 bg-transparent"
                  onClick={() => handleQuantityChange(-1)}
                >
                  -
                </Button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                  className="h-8 w-16 rounded border text-center text-sm"
                  min="1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 bg-transparent"
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </Button>
              </div>
              <div className="ml-auto text-right">
                <p className="text-xs text-gray-500">{PRODUCT_DETAIL_TEXTS.top.totalPriceLabel}</p>
                <p className="text-xl font-bold text-teal-600">{totalPrice.toLocaleString()}원</p>
              </div>
            </div>

            <div className="mb-6 flex gap-3">
              <Button size="lg" className="flex-1 bg-teal-600 hover:bg-teal-700 h-14 text-lg font-bold">
                <ShoppingCart className="mr-2 h-6 w-6" />
                {PRODUCT_DETAIL_TEXTS.top.addToCartButton}
              </Button>
              <Button size="lg" variant="outline" className="h-14">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* 학교 구매 안내 */}
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="mb-2 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-900">{PRODUCT_DETAIL_TEXTS.top.schoolPurchase.title}</h4>
                </div>
                <ul className="space-y-1 text-sm text-blue-800">
                  {PRODUCT_DETAIL_TEXTS.top.schoolPurchase.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

