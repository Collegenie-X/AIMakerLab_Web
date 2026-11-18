/**
 * Debug 모드 사용 예제
 * 
 * 이 파일은 debug 모드를 사용하는 다양한 방법을 보여줍니다.
 */

import { 
  fetchOutreachInquiries, 
  fetchProducts, 
  fetchGalleryWorks,
  logDebugConfig,
  getDebugStats,
} from '@/lib/api';

// ============================================
// 예제 1: 자동 모드 (환경 변수에 따라 자동 선택)
// ============================================

export async function Example1_AutoMode() {
  // .env 파일의 NEXT_PUBLIC_DEBUG_INQUIRY_OUTREACH 값에 따라 자동 선택
  // true: JSON 사용, false: API 사용
  const inquiries = await fetchOutreachInquiries();
  
  return (
    <div>
      <h2>자동 모드</h2>
      {inquiries.map((item: any) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
}

// ============================================
// 예제 2: 명시적 debug 설정
// ============================================

export async function Example2_ExplicitDebug() {
  // 강제로 JSON 사용
  const jsonData = await fetchOutreachInquiries({ debug: true });
  
  // 강제로 API 사용
  const apiData = await fetchOutreachInquiries({ debug: false });
  
  return (
    <div>
      <h2>JSON 데이터</h2>
      <div>{JSON.stringify(jsonData)}</div>
      
      <h2>API 데이터</h2>
      <div>{JSON.stringify(apiData)}</div>
    </div>
  );
}

// ============================================
// 예제 3: 조건부 debug 모드
// ============================================

export async function Example3_ConditionalDebug({ 
  searchParams 
}: { 
  searchParams: { debug?: string } 
}) {
  // URL 쿼리로 debug 모드 제어: /page?debug=true
  const useDebug = searchParams.debug === 'true';
  
  const inquiries = await fetchOutreachInquiries({ debug: useDebug });
  
  return (
    <div>
      <h2>조건부 모드 (debug={searchParams.debug})</h2>
      <p>현재 모드: {useDebug ? 'JSON 📄' : 'API 🌐'}</p>
      {inquiries.map((item: any) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
}

// ============================================
// 예제 4: 여러 페이지 동시 사용
// ============================================

export async function Example4_MultiplePages() {
  // 각 페이지는 독립적인 debug 설정을 가짐
  const inquiries = await fetchOutreachInquiries(); // inquiry.outreach 설정 사용
  const products = await fetchProducts(); // products.products 설정 사용
  const works = await fetchGalleryWorks(); // gallery.works 설정 사용
  
  return (
    <div>
      <section>
        <h2>출강 문의</h2>
        {inquiries.map((item: any) => (
          <div key={item.id}>{item.title}</div>
        ))}
      </section>
      
      <section>
        <h2>제품</h2>
        {products.map((item: any) => (
          <div key={item.id}>{item.title}</div>
        ))}
      </section>
      
      <section>
        <h2>학생 작품</h2>
        {works.map((item: any) => (
          <div key={item.id}>{item.title}</div>
        ))}
      </section>
    </div>
  );
}

// ============================================
// 예제 5: Debug 설정 확인
// ============================================

export function Example5_CheckDebugConfig() {
  // 개발 모드에서만 실행
  if (process.env.NODE_ENV === 'development') {
    logDebugConfig();
    const stats = getDebugStats();
    console.log('Debug Stats:', stats);
  }
  
  return (
    <div>
      <h2>Debug 설정 확인</h2>
      <p>콘솔을 확인하세요</p>
    </div>
  );
}

// ============================================
// 예제 6: Client Component with Toggle
// ============================================

'use client';

import { useState, useEffect } from 'react';

export function Example6_ClientToggle() {
  const [debug, setDebug] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const loadData = async () => {
    setLoading(true);
    try {
      const result = await fetchOutreachInquiries({ debug });
      setData(result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadData();
  }, [debug]);
  
  return (
    <div>
      <div>
        <button onClick={() => setDebug(!debug)}>
          현재 모드: {debug ? 'JSON 📄' : 'API 🌐'}
        </button>
        
        <button onClick={loadData} disabled={loading}>
          {loading ? '로딩 중...' : '새로고침'}
        </button>
      </div>
      
      <div>
        {data.map((item) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.institution}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// 예제 7: 환경별 설정
// ============================================

export async function Example7_EnvironmentBased() {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isProduction = process.env.NODE_ENV === 'production';
  
  // 개발: JSON 사용 보장
  const devData = await fetchOutreachInquiries({ 
    debug: isDevelopment ? true : undefined 
  });
  
  // 프로덕션: API 사용 보장
  const prodData = await fetchOutreachInquiries({ 
    debug: isProduction ? false : undefined 
  });
  
  return (
    <div>
      <h2>환경: {process.env.NODE_ENV}</h2>
      <p>자동으로 적절한 데이터 소스를 선택합니다</p>
    </div>
  );
}

// ============================================
// 예제 8: Error Handling with Debug Mode
// ============================================

export async function Example8_ErrorHandling() {
  try {
    // API 모드에서 에러 발생 시 JSON으로 폴백
    let data;
    try {
      data = await fetchOutreachInquiries({ debug: false });
    } catch (error) {
      console.warn('API 실패, JSON으로 폴백:', error);
      data = await fetchOutreachInquiries({ debug: true });
    }
    
    return (
      <div>
        <h2>에러 처리 with Fallback</h2>
        {data.map((item: any) => (
          <div key={item.id}>{item.title}</div>
        ))}
      </div>
    );
  } catch (error) {
    return (
      <div>
        <h2>에러 발생</h2>
        <p>{String(error)}</p>
      </div>
    );
  }
}

// ============================================
// 예제 9: Performance Comparison
// ============================================

export async function Example9_PerformanceTest() {
  // JSON 성능 측정
  const jsonStart = Date.now();
  const jsonData = await fetchOutreachInquiries({ debug: true });
  const jsonTime = Date.now() - jsonStart;
  
  // API 성능 측정
  const apiStart = Date.now();
  const apiData = await fetchOutreachInquiries({ debug: false });
  const apiTime = Date.now() - apiStart;
  
  return (
    <div>
      <h2>성능 비교</h2>
      <p>JSON: {jsonTime}ms</p>
      <p>API: {apiTime}ms</p>
      <p>더 빠른 방법: {jsonTime < apiTime ? 'JSON' : 'API'}</p>
    </div>
  );
}

// ============================================
// 예제 10: A/B Testing
// ============================================

export async function Example10_ABTesting({ userId }: { userId: number }) {
  // 사용자 ID 기반 A/B 테스트
  const useApi = userId % 2 === 0; // 짝수: API, 홀수: JSON
  
  const data = await fetchOutreachInquiries({ debug: !useApi });
  
  return (
    <div>
      <h2>A/B 테스트</h2>
      <p>User {userId}: {useApi ? 'API 그룹' : 'JSON 그룹'}</p>
      <div>{data.length}개의 항목</div>
    </div>
  );
}
