/**
 * API 클라이언트
 * 
 * Django 백엔드 API 호출을 위한 유틸리티
 * Next.js rewrite를 통해 모든 요청이 프록시됩니다.
 */

import { API_BASE_URL } from './config';

/**
 * API 요청 옵션 인터페이스
 */
interface ApiRequestOptions extends RequestInit {
  token?: string;
}

/**
 * API 에러 인터페이스
 */
interface ApiError {
  message: string;
  status?: number;
  data?: any;
}

/**
 * API 클라이언트 클래스
 */
class ApiClient {
  private baseUrl: string;
  
  constructor(baseUrl: string = API_BASE_URL) {
    // baseUrl이 빈 문자열이면 상대 경로로 요청
    // Next.js rewrite가 /api/* 경로를 백엔드로 프록시함
    this.baseUrl = baseUrl;
  }
  
  /**
   * 헤더 생성
   */
  private getHeaders(token?: string): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }
  
  /**
   * GET 요청
   */
  async get<T>(endpoint: string, options?: ApiRequestOptions): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(options?.token),
        credentials: 'include', // 쿠키 포함
        ...options,
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const error: ApiError = {
          message: `API Error: ${response.status} ${response.statusText}`,
          status: response.status,
          data: errorData,
        };
        throw error;
      }
      
      return response.json();
    } catch (error) {
      console.error('API GET Error:', error);
      throw error;
    }
  }
  
  /**
   * POST 요청
   */
  async post<T>(endpoint: string, data: any, options?: ApiRequestOptions): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: this.getHeaders(options?.token),
        body: JSON.stringify(data),
        credentials: 'include', // 쿠키 포함
        ...options,
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const error: ApiError = {
          message: `API Error: ${response.status} ${response.statusText}`,
          status: response.status,
          data: errorData,
        };
        throw error;
      }
      
      return response.json();
    } catch (error) {
      console.error('API POST Error:', error);
      throw error;
    }
  }
  
  /**
   * PUT 요청
   */
  async put<T>(endpoint: string, data: any, options?: ApiRequestOptions): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: this.getHeaders(options?.token),
        body: JSON.stringify(data),
        credentials: 'include',
        ...options,
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const error: ApiError = {
          message: `API Error: ${response.status} ${response.statusText}`,
          status: response.status,
          data: errorData,
        };
        throw error;
      }
      
      return response.json();
    } catch (error) {
      console.error('API PUT Error:', error);
      throw error;
    }
  }
  
  /**
   * PATCH 요청
   */
  async patch<T>(endpoint: string, data: any, options?: ApiRequestOptions): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: this.getHeaders(options?.token),
        body: JSON.stringify(data),
        credentials: 'include',
        ...options,
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const error: ApiError = {
          message: `API Error: ${response.status} ${response.statusText}`,
          status: response.status,
          data: errorData,
        };
        throw error;
      }
      
      return response.json();
    } catch (error) {
      console.error('API PATCH Error:', error);
      throw error;
    }
  }
  
  /**
   * DELETE 요청
   */
  async delete<T>(endpoint: string, options?: ApiRequestOptions): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: this.getHeaders(options?.token),
        credentials: 'include',
        ...options,
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const error: ApiError = {
          message: `API Error: ${response.status} ${response.statusText}`,
          status: response.status,
          data: errorData,
        };
        throw error;
      }
      
      // DELETE는 204 No Content를 반환할 수 있음
      if (response.status === 204) {
        return {} as T;
      }
      
      return response.json();
    } catch (error) {
      console.error('API DELETE Error:', error);
      throw error;
    }
  }
  
  /**
   * 파일 업로드 (FormData)
   */
  async upload<T>(endpoint: string, formData: FormData, options?: ApiRequestOptions): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const headers: HeadersInit = {};
      if (options?.token) {
        headers['Authorization'] = `Bearer ${options.token}`;
      }
      // FormData는 Content-Type을 자동으로 설정
      
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: formData,
        credentials: 'include',
        ...options,
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const error: ApiError = {
          message: `API Error: ${response.status} ${response.statusText}`,
          status: response.status,
          data: errorData,
        };
        throw error;
      }
      
      return response.json();
    } catch (error) {
      console.error('API Upload Error:', error);
      throw error;
    }
  }
}

// 싱글톤 인스턴스 생성
export const apiClient = new ApiClient();

/**
 * JSON 파일 로드 (로컬)
 */
export async function loadJsonFile<T>(path: string): Promise<T> {
  const response = await fetch(path);
  
  if (!response.ok) {
    throw new Error(`Failed to load JSON: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}
