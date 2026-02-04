/**
 * 데이터 페처 (Data Fetcher)
 * 
 * JSON 또는 API에서 데이터를 가져오는 통합 인터페이스
 * Debug 모드에 따라 자동으로 데이터 소스 선택
 */

import { DATA_SOURCE_CONFIG } from './config';
import { apiClient, loadJsonFile } from './client';
import { isDebugMode, type PageDebugConfig } from './debug-config';

/**
 * 데이터 페처 옵션 인터페이스
 */
interface DataFetcherOptions {
  token?: string;
  forceSource?: 'json' | 'api';
  debug?: boolean; // 명시적 debug 모드 설정
}

/**
 * 데이터 페처 클래스
 */
export class DataFetcher {
  /**
   * 데이터 가져오기 (JSON 또는 API)
   * Debug 모드에 따라 자동 선택
   */
  static async fetch<T>(
    category: keyof typeof DATA_SOURCE_CONFIG,
    page: string,
    jsonPath: string,
    apiEndpoint: string,
    options?: DataFetcherOptions
  ): Promise<T> {
    // 1. forceSource가 있으면 우선 사용
    if (options?.forceSource === 'json') {
      if (process.env.NODE_ENV === 'development') {
        console.log(`🔧 [${category}/${page}] Force using JSON`);
      }
      return loadJsonFile<T>(jsonPath);
    }
    
    if (options?.forceSource === 'api') {
      if (process.env.NODE_ENV === 'development') {
        console.log(`🔧 [${category}/${page}] Force using API`);
      }
      return apiClient.get<T>(apiEndpoint, { token: options?.token });
    }
    
    // 2. 명시적 debug 옵션 확인
    if (options?.debug !== undefined) {
      const useJson = options.debug;
      if (process.env.NODE_ENV === 'development') {
        console.log(`🐛 [${category}/${page}] Debug mode: ${useJson ? 'JSON' : 'API'}`);
      }
      
      if (useJson) {
        return loadJsonFile<T>(jsonPath);
      } else {
        return apiClient.get<T>(apiEndpoint, { token: options?.token });
      }
    }
    
    // 3. Debug Config 확인
    const debugMode = isDebugMode(category as keyof PageDebugConfig, page);
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 [${category}/${page}] ${debugMode ? 'JSON 📄' : 'API 🌐'}`);
    }
    
    if (debugMode) {
      // Debug 모드: JSON 사용
      return loadJsonFile<T>(jsonPath);
    } else {
      // Production 모드: API 사용
      return apiClient.get<T>(apiEndpoint, { token: options?.token });
    }
  }
  
  /**
   * 목록 데이터 가져오기
   */
  static async fetchList<T>(
    category: keyof typeof DATA_SOURCE_CONFIG,
    page: string,
    jsonPath: string,
    apiEndpoint: string,
    options?: DataFetcherOptions
  ): Promise<T[]> {
    return this.fetch<T[]>(category, page, jsonPath, apiEndpoint, options);
  }
  
  /**
   * 상세 데이터 가져오기
   */
  static async fetchDetail<T>(
    category: keyof typeof DATA_SOURCE_CONFIG,
    page: string,
    id: string | number,
    jsonPath: string,
    apiEndpoint: string,
    options?: DataFetcherOptions
  ): Promise<T | null> {
    // Debug 모드 확인
    const debugMode = options?.debug ?? isDebugMode(category as keyof PageDebugConfig, page);
    
    if (!debugMode || options?.forceSource === 'api') {
      // API에서 가져오기
      const endpoint = `${apiEndpoint}${id}/`;
      return apiClient.get<T>(endpoint, { token: options?.token });
    } else {
      // JSON 파일에서 가져와서 필터링
      const list = await loadJsonFile<T[]>(jsonPath);
      const item = list.find((item: any) => item.id === id || item.item_id === id);
      return item || null;
    }
  }
  
  /**
   * 데이터 생성 (API만 지원)
   */
  static async create<T>(
    apiEndpoint: string,
    data: any,
    options?: DataFetcherOptions
  ): Promise<T> {
    return apiClient.post<T>(apiEndpoint, data, { token: options?.token });
  }
  
  /**
   * 데이터 수정 (API만 지원)
   */
  static async update<T>(
    apiEndpoint: string,
    id: string | number,
    data: any,
    options?: DataFetcherOptions
  ): Promise<T> {
    const endpoint = `${apiEndpoint}${id}/`;
    return apiClient.put<T>(endpoint, data, { token: options?.token });
  }
  
  /**
   * 데이터 삭제 (API만 지원)
   */
  static async delete(
    apiEndpoint: string,
    id: string | number,
    options?: DataFetcherOptions
  ): Promise<void> {
    const endpoint = `${apiEndpoint}${id}/`;
    await apiClient.delete(endpoint, { token: options?.token });
  }
}

/**
 * 간편 함수들 (Debug 모드 지원)
 */

// 문의 데이터
export const fetchInquiries = (options?: DataFetcherOptions) =>
  DataFetcher.fetchList('inquiry', 'inquiries', '/inquiry/inquiries.json', '/api/inquiry/inquiries/', options);

export const fetchOutreachInquiries = (options?: DataFetcherOptions) =>
  DataFetcher.fetchList('inquiry', 'outreach', '/inquiry/outreach-inquiries.json', '/api/inquiry/outreach/', options);

export const fetchSchedules = (type?: 'weekday' | 'weekend', options?: DataFetcherOptions) => {
  if (type === 'weekday') {
    return DataFetcher.fetchList('inquiry', 'schedules', '/inquiry/schedules-weekday.json', '/api/inquiry/schedules/?schedule_type=weekday', options);
  } else if (type === 'weekend') {
    return DataFetcher.fetchList('inquiry', 'schedules', '/inquiry/schedules-weekend.json', '/api/inquiry/schedules/?schedule_type=weekend', options);
  } else {
    return DataFetcher.fetchList('inquiry', 'schedules', '/inquiry/schedules-weekday.json', '/api/inquiry/schedules/', options);
  }
};

// 제품 데이터
export const fetchProducts = (options?: DataFetcherOptions) =>
  DataFetcher.fetchList('products', 'products', '/products/products.json', '/api/products/products/', options);

export const fetchQuoteItems = (options?: DataFetcherOptions) =>
  DataFetcher.fetchList('products', 'quoteItems', '/products/quote-items.json', '/api/products/quote-items/', options);

export const fetchVideos = (options?: DataFetcherOptions) =>
  DataFetcher.fetchList('products', 'videos', '/products/videos.json', '/api/products/videos/', options);

// 갤러리 데이터
export const fetchGalleryWorks = (options?: DataFetcherOptions) =>
  DataFetcher.fetchList('gallery', 'works', '/gallery/works.json', '/api/gallery/?category=works', options);

export const fetchGalleryReviews = (options?: DataFetcherOptions) =>
  DataFetcher.fetchList('gallery', 'reviews', '/gallery/reviews.json', '/api/gallery/?category=reviews', options);
