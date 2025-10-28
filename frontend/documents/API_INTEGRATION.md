# API 연동 가이드

## 📋 개요

이 문서는 AIMakerLab Web 프론트엔드와 Django REST API를 연동하는 방법을 설명합니다.

---

## 🔗 API 엔드포인트

### 백엔드 서버 URL

```bash
# 개발 환경
http://localhost:8000/api/

# 프로덕션 환경
https://api.aimakerlab.com/api/
```

---

## 📁 백엔드 API 구조

### Django Apps

```
backend/
├── accounts/                   # 사용자 인증
├── curriculum/                 # 커리큘럼
├── gallery/                    # 갤러리
├── home/                       # 홈페이지
├── inquiry/                    # 문의
└── products/                   # 제품
```

### API 엔드포인트 목록

#### 1. 인증 (accounts)
```
POST   /api/accounts/register/           # 회원가입
POST   /api/accounts/login/              # 로그인
POST   /api/accounts/logout/             # 로그아웃
POST   /api/accounts/refresh/            # 토큰 갱신
GET    /api/accounts/profile/            # 프로필 조회
PUT    /api/accounts/profile/            # 프로필 수정
POST   /api/accounts/password/change/    # 비밀번호 변경
POST   /api/accounts/password/reset/     # 비밀번호 재설정
```

#### 2. 커리큘럼 (curriculum)
```
GET    /api/curriculum/projects/         # 프로젝트 목록
GET    /api/curriculum/projects/:id/     # 프로젝트 상세
```

#### 3. 갤러리 (gallery)
```
GET    /api/gallery/items/               # 갤러리 아이템 목록
GET    /api/gallery/items/:id/           # 갤러리 아이템 상세
POST   /api/gallery/items/               # 갤러리 아이템 등록
PUT    /api/gallery/items/:id/           # 갤러리 아이템 수정
DELETE /api/gallery/items/:id/           # 갤러리 아이템 삭제
```

#### 4. 홈페이지 (home)
```
GET    /api/home/hero-slides/            # 히어로 슬라이드
GET    /api/home/curriculum-highlights/  # 커리큘럼 하이라이트
```

#### 5. 문의 (inquiry)
```
GET    /api/inquiry/inquiries/           # 문의 목록
GET    /api/inquiry/inquiries/:id/       # 문의 상세
POST   /api/inquiry/inquiries/           # 문의 등록
PUT    /api/inquiry/inquiries/:id/       # 문의 수정
DELETE /api/inquiry/inquiries/:id/       # 문의 삭제
```

#### 6. 제품 (products)
```
GET    /api/products/products/           # 제품 목록
GET    /api/products/products/:id/       # 제품 상세
POST   /api/products/quote/              # 견적 요청
GET    /api/products/videos/             # 교구 사용 영상
```

---

## 🛠️ API 클라이언트 설정

### 1. 환경 변수 설정

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. API 클라이언트 생성

```typescript
// lib/api/client.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

/**
 * API 클라이언트 인스턴스
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 요청 인터셉터: 인증 토큰 자동 추가
 */
apiClient.interceptors.request.use(
  (config) => {
    // localStorage에서 토큰 가져오기
    const token = localStorage.getItem('access_token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 응답 인터셉터: 에러 처리 및 토큰 갱신
 */
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 Unauthorized 에러 && 재시도하지 않은 요청
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh Token으로 새 Access Token 발급
        const refreshToken = localStorage.getItem('refresh_token');
        
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/accounts/refresh/`,
          { refresh: refreshToken }
        );

        const { access } = response.data;
        
        // 새 토큰 저장
        localStorage.setItem('access_token', access);
        
        // 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh Token도 만료된 경우 로그아웃
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

/**
 * API 응답 타입
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

/**
 * API 에러 타입
 */
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status: number;
}
```

---

## 🔐 인증 API

### 1. 회원가입

```typescript
// lib/api/auth.ts
import { apiClient, ApiResponse } from './client';

export interface RegisterData {
  email: string;
  password: string;
  password2: string;
  name: string;
  phone?: string;
}

export interface RegisterResponse {
  user: {
    id: number;
    email: string;
    name: string;
  };
  tokens: {
    access: string;
    refresh: string;
  };
}

/**
 * 회원가입
 */
export async function register(data: RegisterData): Promise<ApiResponse<RegisterResponse>> {
  const response = await apiClient.post('/accounts/register/', data);
  
  // 토큰 저장
  const { tokens } = response.data;
  localStorage.setItem('access_token', tokens.access);
  localStorage.setItem('refresh_token', tokens.refresh);
  
  return response.data;
}
```

**사용 예시**:
```typescript
// components/register-dialog.tsx
const handleRegister = async (data: RegisterData) => {
  try {
    const response = await register(data);
    console.log('회원가입 성공:', response.user);
    // 홈으로 리다이렉트
    router.push('/');
  } catch (error) {
    console.error('회원가입 실패:', error);
    // 에러 메시지 표시
  }
};
```

### 2. 로그인

```typescript
// lib/api/auth.ts
export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: number;
    email: string;
    name: string;
  };
  tokens: {
    access: string;
    refresh: string;
  };
}

/**
 * 로그인
 */
export async function login(data: LoginData): Promise<ApiResponse<LoginResponse>> {
  const response = await apiClient.post('/accounts/login/', data);
  
  // 토큰 저장
  const { tokens } = response.data;
  localStorage.setItem('access_token', tokens.access);
  localStorage.setItem('refresh_token', tokens.refresh);
  
  return response.data;
}
```

### 3. 로그아웃

```typescript
// lib/api/auth.ts
/**
 * 로그아웃
 */
export async function logout(): Promise<void> {
  await apiClient.post('/accounts/logout/');
  
  // 토큰 삭제
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}
```

---

## 📝 문의 API

### 1. 문의 등록

```typescript
// lib/api/inquiry.ts
import { apiClient, ApiResponse } from './client';

export interface InquiryData {
  name: string;
  phone: string;
  email?: string;
  inquiry_type: 'online' | 'weekday' | 'weekend';
  course?: string;
  student_grade?: string;
  student_count?: number;
  preferred_date?: string;
  preferred_time?: string;
  message?: string;
}

export interface Inquiry extends InquiryData {
  id: number;
  created_at: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
}

/**
 * 문의 등록
 */
export async function createInquiry(data: InquiryData): Promise<ApiResponse<Inquiry>> {
  const response = await apiClient.post('/inquiry/inquiries/', data);
  return response.data;
}
```

**사용 예시**:
```typescript
// components/inquiry-form-dialog.tsx
const handleSubmit = async (data: InquiryData) => {
  try {
    const response = await createInquiry(data);
    console.log('문의 등록 성공:', response.data);
    toast.success('문의가 성공적으로 등록되었습니다!');
    setOpen(false);
  } catch (error) {
    console.error('문의 등록 실패:', error);
    toast.error('문의 등록에 실패했습니다.');
  }
};
```

### 2. 문의 목록 조회

```typescript
// lib/api/inquiry.ts
/**
 * 문의 목록 조회
 */
export async function getInquiries(): Promise<ApiResponse<Inquiry[]>> {
  const response = await apiClient.get('/inquiry/inquiries/');
  return response.data;
}
```

---

## 🛍️ 제품 API

### 1. 제품 목록 조회

```typescript
// lib/api/products.ts
import { apiClient, ApiResponse } from './client';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  is_available: boolean;
}

/**
 * 제품 목록 조회
 */
export async function getProducts(params?: {
  category?: string;
  search?: string;
  page?: number;
  page_size?: number;
}): Promise<ApiResponse<{ results: Product[]; count: number }>> {
  const response = await apiClient.get('/products/products/', { params });
  return response.data;
}
```

### 2. 제품 상세 조회

```typescript
// lib/api/products.ts
/**
 * 제품 상세 조회
 */
export async function getProduct(id: string): Promise<ApiResponse<Product>> {
  const response = await apiClient.get(`/products/products/${id}/`);
  return response.data;
}
```

### 3. 견적 요청

```typescript
// lib/api/products.ts
export interface QuoteData {
  name: string;
  phone: string;
  email?: string;
  organization?: string;
  items: {
    product_id: string;
    quantity: number;
  }[];
  message?: string;
}

export interface Quote extends QuoteData {
  id: number;
  total_price: number;
  created_at: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
}

/**
 * 견적 요청
 */
export async function createQuote(data: QuoteData): Promise<ApiResponse<Quote>> {
  const response = await apiClient.post('/products/quote/', data);
  return response.data;
}
```

---

## 🖼️ 갤러리 API

### 1. 갤러리 목록 조회

```typescript
// lib/api/gallery.ts
import { apiClient, ApiResponse } from './client';

export interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: 'work' | 'review';
  author?: string;
  created_at: string;
}

/**
 * 갤러리 목록 조회
 */
export async function getGalleryItems(params?: {
  category?: 'work' | 'review';
  page?: number;
  page_size?: number;
}): Promise<ApiResponse<{ results: GalleryItem[]; count: number }>> {
  const response = await apiClient.get('/gallery/items/', { params });
  return response.data;
}
```

### 2. 갤러리 아이템 등록 (이미지 업로드)

```typescript
// lib/api/gallery.ts
/**
 * 갤러리 아이템 등록 (FormData 사용)
 */
export async function createGalleryItem(data: {
  title: string;
  description: string;
  category: 'work' | 'review';
  image: File;
}): Promise<ApiResponse<GalleryItem>> {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('description', data.description);
  formData.append('category', data.category);
  formData.append('image', data.image);

  const response = await apiClient.post('/gallery/items/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
}
```

---

## 🔄 커스텀 훅으로 API 연동

### 1. useQuery 패턴 (데이터 조회)

```typescript
// hooks/useProducts.ts
import { useState, useEffect } from 'react';
import { getProducts, Product } from '@/lib/api/products';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts();
        setProducts(response.data.results);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}
```

### 2. useMutation 패턴 (데이터 변경)

```typescript
// hooks/useCreateInquiry.ts
import { useState } from 'react';
import { createInquiry, InquiryData, Inquiry } from '@/lib/api/inquiry';

export function useCreateInquiry() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (data: InquiryData): Promise<Inquiry | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await createInquiry(data);
      return response.data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
}
```

**사용 예시**:
```typescript
// components/inquiry-form-dialog.tsx
const { mutate, loading, error } = useCreateInquiry();

const handleSubmit = async (data: InquiryData) => {
  const result = await mutate(data);
  
  if (result) {
    toast.success('문의가 등록되었습니다!');
    setOpen(false);
  } else {
    toast.error('문의 등록에 실패했습니다.');
  }
};
```

---

## 🎣 React Query 사용 (권장)

### 1. 설치

```bash
npm install @tanstack/react-query
```

### 2. Query Client 설정

```typescript
// app/providers.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1분
      cacheTime: 5 * 60 * 1000, // 5분
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

### 3. useQuery 사용

```typescript
// hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/lib/api/products';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await getProducts();
      return response.data.results;
    },
  });
}
```

**사용 예시**:
```typescript
// app/products/coding-ai/page.tsx
const { data: products, isLoading, error } = useProducts();

if (isLoading) return <LoadingState />;
if (error) return <ErrorState error={error} />;
```

### 4. useMutation 사용

```typescript
// hooks/useCreateInquiry.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createInquiry, InquiryData } from '@/lib/api/inquiry';

export function useCreateInquiry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: InquiryData) => createInquiry(data),
    onSuccess: () => {
      // 문의 목록 쿼리 무효화 (자동 재조회)
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
  });
}
```

**사용 예시**:
```typescript
// components/inquiry-form-dialog.tsx
const { mutate, isPending, error } = useCreateInquiry();

const handleSubmit = (data: InquiryData) => {
  mutate(data, {
    onSuccess: () => {
      toast.success('문의가 등록되었습니다!');
      setOpen(false);
    },
    onError: (error) => {
      toast.error('문의 등록에 실패했습니다.');
    },
  });
};
```

---

## 🚨 에러 처리

### 1. 전역 에러 처리

```typescript
// lib/api/error-handler.ts
import { toast } from '@/hooks/use-toast';

export function handleApiError(error: any) {
  // 네트워크 에러
  if (!error.response) {
    toast({
      title: '네트워크 오류',
      description: '인터넷 연결을 확인해주세요.',
      variant: 'destructive',
    });
    return;
  }

  // HTTP 상태 코드별 처리
  switch (error.response.status) {
    case 400:
      toast({
        title: '잘못된 요청',
        description: error.response.data.message || '입력 내용을 확인해주세요.',
        variant: 'destructive',
      });
      break;
    case 401:
      toast({
        title: '인증 실패',
        description: '로그인이 필요합니다.',
        variant: 'destructive',
      });
      // 로그인 페이지로 리다이렉트
      window.location.href = '/';
      break;
    case 403:
      toast({
        title: '권한 없음',
        description: '접근 권한이 없습니다.',
        variant: 'destructive',
      });
      break;
    case 404:
      toast({
        title: '찾을 수 없음',
        description: '요청한 리소스를 찾을 수 없습니다.',
        variant: 'destructive',
      });
      break;
    case 500:
      toast({
        title: '서버 오류',
        description: '일시적인 오류입니다. 잠시 후 다시 시도해주세요.',
        variant: 'destructive',
      });
      break;
    default:
      toast({
        title: '오류 발생',
        description: error.response.data.message || '알 수 없는 오류가 발생했습니다.',
        variant: 'destructive',
      });
  }
}
```

---

## 📊 로딩 상태 처리

### 1. 스켈레톤 로딩

```typescript
// components/product-skeleton.tsx
export function ProductSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-48 w-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

---

## 🧪 API 테스트

### Postman Collection

```json
{
  "info": {
    "name": "AIMakerLab API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"test@example.com\",\n  \"password\": \"password123\",\n  \"password2\": \"password123\",\n  \"name\": \"홍길동\"\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "{{baseUrl}}/accounts/register/",
              "host": ["{{baseUrl}}"],
              "path": ["accounts", "register", ""]
            }
          }
        }
      ]
    }
  ]
}
```

---

**최종 업데이트**: 2025-10-28
**작성자**: AI Maker Lab 개발팀

