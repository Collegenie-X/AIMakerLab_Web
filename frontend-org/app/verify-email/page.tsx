"use client"

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { verifyEmailToken } from '@/lib/auth/email-verification'
import Link from 'next/link'

export default function VerifyEmailPage() {
  const search = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<'pending' | 'success' | 'error'>(
    'pending',
  )
  const [message, setMessage] = useState('')

  useEffect(() => {
    const email = search.get('email') || ''
    const token = search.get('token') || ''
    if (!email || !token) {
      setStatus('error')
      setMessage('잘못된 요청입니다.')
      return
    }
    const result = verifyEmailToken(email, token)
    if (result.ok) {
      setStatus('success')
      setMessage('이메일 인증이 완료되었습니다. 이제 로그인할 수 있습니다.')
      const t = setTimeout(() => router.push('/'), 2000)
      return () => clearTimeout(t)
    } else {
      setStatus('error')
      setMessage(result.error)
    }
  }, [search, router])

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="rounded-lg border p-6 text-center max-w-md">
        <h1 className="mb-2 text-xl font-semibold">이메일 인증</h1>
        <p className="mb-4 text-sm text-gray-600">{message || '처리 중...'}</p>
        <Link href="/" className="text-blue-600 hover:underline">
          홈으로 이동
        </Link>
      </div>
    </div>
  )
}


