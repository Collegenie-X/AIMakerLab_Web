/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  
  // 환경 변수 설정
  env: {
    // Django 백엔드 API URL
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
    
    // 데이터 소스 모드 (json 또는 api)
    NEXT_PUBLIC_DATA_SOURCE: process.env.NEXT_PUBLIC_DATA_SOURCE || 'json',
    
    // 페이지별 데이터 소스 설정
    NEXT_PUBLIC_USE_API_ACCOUNTS: process.env.NEXT_PUBLIC_USE_API_ACCOUNTS || 'false',
    NEXT_PUBLIC_USE_API_INQUIRY: process.env.NEXT_PUBLIC_USE_API_INQUIRY || 'false',
    NEXT_PUBLIC_USE_API_PRODUCTS: process.env.NEXT_PUBLIC_USE_API_PRODUCTS || 'false',
    NEXT_PUBLIC_USE_API_GALLERY: process.env.NEXT_PUBLIC_USE_API_GALLERY || 'false',
    NEXT_PUBLIC_USE_API_CURRICULUM: process.env.NEXT_PUBLIC_USE_API_CURRICULUM || 'false',
    NEXT_PUBLIC_USE_API_HOME: process.env.NEXT_PUBLIC_USE_API_HOME || 'false',
  },
  
  // API 프록시 설정 (CORS 회피 및 URL 보안)
  // 실제 백엔드 URL을 클라이언트에 노출하지 않고 프록시를 통해 접근
  async rewrites() {
    // 서버 측 환경 변수 사용 (클라이언트에 노출되지 않음)
    const apiBaseUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
    
    return [
      // /api/backend/* 경로로 들어오는 모든 요청을 Django 백엔드로 프록시
      {
        source: '/api/backend/:path*',
        destination: `${apiBaseUrl}/api/:path*`,
      },
      // Admin 페이지 프록시 (선택사항)
      {
        source: '/admin-backend/:path*',
        destination: `${apiBaseUrl}/admin/:path*`,
      },
    ];
  },
  
  // CORS 허용 헤더
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
        ],
      },
    ];
  },
}

export default nextConfig
