/**
 * Products Coding-AI Layout
 * - ReactQuery Provider 적용
 */

import { ProductsQueryProvider } from '@/lib/products/query-provider'
import { ReactNode } from 'react'

export default function CodingAIProductsLayout({
  children,
}: {
  children: ReactNode
}) {
  return <ProductsQueryProvider>{children}</ProductsQueryProvider>
}

