# 인증 시스템 가이드

## 🔐 인증 흐름

### 1. 이메일 회원가입
1. 사용자가 이메일/비밀번호 입력
2. 필수 약관 동의 확인
3. 회원가입 요청
4. 인증 이메일 발송
5. 이메일 링크로 인증 완료
6. 로그인 가능 상태로 전환

### 2. 소셜 로그인
- Google OAuth 2.0
- Kakao Login API

## 🛠 구현 상세

### 이메일 인증
```typescript
// 회원가입
const signupResult = await signUp(email, password);
if (signupResult.ok) {
  // 인증 이메일 발송
  const verificationResult = await generateVerification(email);
}

// 이메일 인증 처리 (GET /verify-email)
const verifyResult = await verifyEmailToken(email, token);
if (verifyResult.ok) {
  // 인증 완료 처리
}
```

### 소셜 로그인
```typescript
// Google 로그인
const handleGoogleLogin = async () => {
  // Google OAuth 처리
};

// Kakao 로그인
const handleKakaoLogin = async () => {
  // Kakao SDK 처리
};
```

## 📝 데이터 구조

### 사용자 정보
```typescript
interface User {
  email: string;
  passwordHash: string;
  verified: boolean;
  verificationToken?: string;
  verificationExpiresAt?: number;
  agreedTerms: boolean;
  agreedPrivacy: boolean;
  agreedMarketing?: boolean;
}
```

### 인증 토큰
```typescript
interface AuthToken {
  token: string;
  expiresAt: number;
  refreshToken?: string;
}
```

## 🔒 보안 고려사항

### 1. 비밀번호 처리
- 해시 처리 필수
- 솔트 적용
- 안전한 알고리즘 사용

### 2. 토큰 관리
- JWT 사용
- 적절한 만료 시간 설정
- 안전한 저장소 사용

### 3. API 보안
- HTTPS 필수
- CSRF 방지
- Rate Limiting

## 🔄 상태 관리

### 로그인 상태
```typescript
interface AuthState {
  isAuthenticated: boolean;
  user?: User;
  token?: string;
}
```

### 상태 지속성
- 로컬 스토리지
- 세션 스토리지
- 쿠키 관리

## 📡 API 엔드포인트

### 인증 관련
- POST /api/auth/signup
- POST /api/auth/login
- GET /api/auth/verify-email
- POST /api/auth/refresh-token

### 소셜 로그인
- GET /api/auth/google
- GET /api/auth/kakao

## ⚙️ 설정

### 환경 변수
```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
KAKAO_APP_KEY=your_kakao_app_key
JWT_SECRET=your_jwt_secret
```

### 개발 모드 설정
```typescript
const isDev = process.env.NODE_ENV === 'development';
const AUTH_CONFIG = {
  tokenExpiry: isDev ? '1h' : '15m',
  verificationExpiry: '24h',
  // ...
};
```

## 🧪 테스트

### 단위 테스트
```typescript
describe('Auth Functions', () => {
  test('signUp validates email format', () => {
    // ...
  });

  test('verifyEmailToken checks expiry', () => {
    // ...
  });
});
```

### 통합 테스트
```typescript
describe('Auth Flow', () => {
  test('complete signup and verification flow', async () => {
    // ...
  });
});
```

## 📚 참고 자료

- [Next.js Authentication Docs](https://nextjs.org/docs/authentication)
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)
- [Kakao Login Docs](https://developers.kakao.com/docs/latest/ko/kakaologin/common)
