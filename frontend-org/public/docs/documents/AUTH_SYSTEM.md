# 인증 시스템 가이드

## 📋 개요

이 문서는 AIMakerLab Web의 사용자 인증 시스템에 대한 구현 가이드입니다. 현재는 클라이언트 측 데모 구현이 되어 있으며, 향후 백엔드 API로 전환할 예정입니다.

---

## 🗂️ 파일 구조

```
frontend/
├── components/
│   ├── login-dialog.tsx              # 로그인/회원가입 다이얼로그
│   └── password-reset-dialog.tsx     # 비밀번호 찾기 다이얼로그
├── app/
│   ├── profile/                      # 사용자 프로필
│   │   └── page.tsx
│   ├── reset-password/               # 비밀번호 재설정
│   │   └── page.tsx
│   └── verify-email/                 # 이메일 인증
│       └── page.tsx
└── lib/
    └── auth/
        ├── AUTH.md                   # 인증 시스템 문서
        └── email-verification.ts     # 인증 관련 유틸리티 (데모)
```

---

## 🔐 인증 흐름

### 1. 회원가입 흐름

```
1. 사용자가 로그인 다이얼로그에서 "회원가입" 모드 선택
   ↓
2. 이메일, 비밀번호 입력 및 약관 동의
   ↓
3. 회원가입 폼 제출 (signUp 함수 호출)
   ↓
4. 이메일 인증 링크 생성 및 발송 (generateVerification 함수)
   ↓
5. 사용자가 이메일의 인증 링크 클릭
   ↓
6. 인증 페이지 로드 (/verify-email?email=...&token=...)
   ↓
7. 토큰 검증 (verifyEmail 함수)
   ↓
8. 인증 완료 및 로그인 가능 상태로 전환
```

### 2. 로그인 흐름

```
1. 사용자가 로그인 다이얼로그에서 이메일/비밀번호 입력
   ↓
2. 로그인 폼 제출 (loginWithPassword 함수 호출)
   ↓
3. 이메일 인증 여부 확인
   ↓
4. 비밀번호 검증
   ↓
5. 로그인 성공 및 다이얼로그 닫힘
```

### 3. 비밀번호 재설정 흐름

```
1. 사용자가 "비밀번호를 잊으셨나요?" 클릭
   ↓
2. 비밀번호 찾기 다이얼로그에서 이메일 입력
   ↓
3. 재설정 링크 발송 요청
   ↓
4. 사용자가 이메일의 재설정 링크 클릭
   ↓
5. 비밀번호 재설정 페이지 로드 (/reset-password?email=...&token=...)
   ↓
6. 토큰 검증 (verifyResetToken 함수)
   ↓
7. 새 비밀번호 설정 (resetPassword 함수)
   ↓
8. 비밀번호 재설정 완료 및 로그인 페이지로 리다이렉트
```

---

## 🧩 컴포넌트 구조

### 1. LoginDialog

```tsx
// components/login-dialog.tsx
export function LoginDialog() {
  const [mode, setMode] = useState<'login' | 'signup'>("login");
  // ...

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">로그인</Button>
      </DialogTrigger>
      <DialogContent>
        {/* 로그인/회원가입 폼 */}
      </DialogContent>
    </Dialog>
  );
}
```

**주요 기능**:
- 로그인/회원가입 모드 전환
- 이메일/비밀번호 입력
- 비밀번호 보기/숨기기 토글
- 약관 동의 체크박스 (회원가입 모드)
- 소셜 로그인 버튼 (Google, Kakao)
- 비밀번호 찾기 링크

### 2. PasswordResetDialog

```tsx
// components/password-reset-dialog.tsx
export function PasswordResetDialog({ open, onOpenChange }: PasswordResetDialogProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  // ...

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {/* 비밀번호 찾기 폼 */}
      </DialogContent>
    </Dialog>
  );
}
```

**주요 기능**:
- 이메일 입력
- 재설정 링크 발송 요청
- 상태 표시 (idle, sending, sent)

### 3. 프로필 페이지

```tsx
// app/profile/page.tsx
export default function ProfilePage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  // ...

  return (
    <>
      <Header />
      <main>
        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">프로필 정보</TabsTrigger>
            <TabsTrigger value="security">보안 설정</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            {/* 프로필 정보 폼 */}
          </TabsContent>
          <TabsContent value="security">
            {/* 비밀번호 변경 폼 */}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </>
  );
}
```

**주요 기능**:
- 프로필 정보 표시/수정
- 비밀번호 변경
- 비밀번호 보기/숨기기 토글

### 4. 비밀번호 재설정 페이지

```tsx
// app/reset-password/page.tsx
export default function ResetPasswordPage() {
  const [status, setStatus] = useState<"verifying" | "invalid" | "valid" | "success" | "error">("verifying");
  // ...

  return (
    <div className="min-h-screen">
      {status === "verifying" && (
        <div className="loading-state">로딩 중...</div>
      )}
      {status === "invalid" && (
        <div className="error-state">유효하지 않은 링크</div>
      )}
      {status === "valid" && (
        <form onSubmit={handleSubmit}>
          {/* 새 비밀번호 입력 폼 */}
        </form>
      )}
      {status === "success" && (
        <div className="success-state">비밀번호 재설정 완료</div>
      )}
    </div>
  );
}
```

**주요 기능**:
- URL 파라미터에서 이메일/토큰 추출
- 토큰 유효성 검증
- 새 비밀번호 입력
- 상태 표시 (verifying, invalid, valid, success, error)

### 5. 이메일 인증 페이지

```tsx
// app/verify-email/page.tsx
export default function VerifyEmailPage() {
  const [verificationStatus, setVerificationStatus] = useState<"verifying" | "success" | "failed">("verifying");
  // ...

  useEffect(() => {
    const email = searchParams.get("email");
    const token = searchParams.get("token");

    if (email && token) {
      const result = verifyEmail(email, token);
      setVerificationStatus(result.success ? "success" : "failed");
      setMessage(result.message);
    } else {
      setVerificationStatus("failed");
      setMessage("유효하지 않은 인증 링크입니다.");
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen">
      {/* 상태별 UI */}
    </div>
  );
}
```

**주요 기능**:
- URL 파라미터에서 이메일/토큰 추출
- 토큰 유효성 검증
- 상태 표시 (verifying, success, failed)

---

## 🛠️ 유틸리티 함수

### 1. 회원가입

```typescript
// lib/auth/email-verification.ts
export function signUp(email: string, password: string): { ok: boolean; error?: string } {
  const users = getUsers();
  if (users.some((user) => user.email === email)) {
    return { ok: false, error: "이미 가입된 이메일입니다." };
  }

  const verificationToken = generateToken();
  const tokenExpiry = Date.now() + TOKEN_EXPIRY;

  const newUser: User = {
    email,
    passwordHash: password, // 데모용으로 평문 저장, 실제로는 해싱 필요
    isVerified: false,
    verificationToken,
    tokenExpiry,
  };

  users.push(newUser);
  saveUsers(users);
  return { ok: true };
}
```

### 2. 이메일 인증 링크 생성

```typescript
// lib/auth/email-verification.ts
export function generateVerification(email: string): { ok: boolean; error?: string; url?: string } {
  const users = getUsers();
  const user = users.find((u) => u.email === email);

  if (!user) {
    return { ok: false, error: "사용자를 찾을 수 없습니다." };
  }

  const verificationToken = generateToken();
  const tokenExpiry = Date.now() + TOKEN_EXPIRY;

  user.verificationToken = verificationToken;
  user.tokenExpiry = tokenExpiry;
  saveUsers(users);

  return {
    ok: true,
    url: `/verify-email?email=${encodeURIComponent(email)}&token=${verificationToken}`,
  };
}
```

### 3. 이메일 인증

```typescript
// lib/auth/email-verification.ts
export function verifyEmail(email: string, token: string): { ok: boolean; error?: string } {
  const users = getUsers();
  const user = users.find((u) => u.email === email);

  if (!user) {
    return { ok: false, error: "사용자를 찾을 수 없습니다." };
  }

  if (user.isVerified) {
    return { ok: true };
  }

  if (user.verificationToken !== token) {
    return { ok: false, error: "유효하지 않은 인증 토큰입니다." };
  }

  if (user.tokenExpiry && user.tokenExpiry < Date.now()) {
    return { ok: false, error: "만료된 인증 토큰입니다." };
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.tokenExpiry = undefined;
  saveUsers(users);

  return { ok: true };
}
```

### 4. 로그인

```typescript
// lib/auth/email-verification.ts
export function loginWithPassword(email: string, password: string): { ok: boolean; error?: string } {
  const users = getUsers();
  const user = users.find((u) => u.email === email);

  if (!user) {
    return { ok: false, error: "이메일 또는 비밀번호가 올바르지 않습니다." };
  }

  if (!user.isVerified) {
    return { ok: false, error: "이메일 인증이 필요합니다." };
  }

  if (user.passwordHash !== password) { // 데모용, 실제로는 해싱된 비밀번호 비교
    return { ok: false, error: "이메일 또는 비밀번호가 올바르지 않습니다." };
  }

  return { ok: true };
}
```

### 5. 비밀번호 재설정 링크 생성

```typescript
// lib/auth/email-verification.ts
export function generatePasswordReset(email: string): { ok: boolean; error?: string; url?: string } {
  const users = getUsers();
  const user = users.find((u) => u.email === email);

  if (!user) {
    return { ok: false, error: "등록되지 않은 이메일입니다." };
  }

  const resetToken = generateToken();
  const resetTokenExpiry = Date.now() + TOKEN_EXPIRY;

  user.resetToken = resetToken;
  user.resetTokenExpiry = resetTokenExpiry;
  saveUsers(users);

  return {
    ok: true,
    url: `/reset-password?email=${encodeURIComponent(email)}&token=${resetToken}`,
  };
}
```

### 6. 비밀번호 재설정

```typescript
// lib/auth/email-verification.ts
export function resetPassword(email: string, token: string, newPassword: string): { ok: boolean; error?: string } {
  const users = getUsers();
  const user = users.find((u) => u.email === email);

  if (!user) {
    return { ok: false, error: "사용자를 찾을 수 없습니다." };
  }

  if (user.resetToken !== token) {
    return { ok: false, error: "유효하지 않은 토큰입니다." };
  }

  if (user.resetTokenExpiry && user.resetTokenExpiry < Date.now()) {
    return { ok: false, error: "만료된 토큰입니다." };
  }

  user.passwordHash = newPassword; // 데모용, 실제로는 해싱 필요
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  saveUsers(users);

  return { ok: true };
}
```

---

## 🔄 백엔드 연동 계획

현재는 localStorage를 사용한 클라이언트 측 데모 구현이지만, 향후 백엔드 API로 전환할 계획입니다:

```typescript
// 현재: localStorage 기반 데모
function getUsers(): User[] {
  if (typeof window === "undefined") return [];
  const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
}

// 향후: API 호출
async function signUp(email: string, password: string): Promise<ApiResponse<User>> {
  const response = await apiClient.post('/api/auth/register/', { email, password });
  return response.data;
}
```

### API 엔드포인트 계획

```
POST   /api/auth/register/           # 회원가입
POST   /api/auth/login/              # 로그인
POST   /api/auth/logout/             # 로그아웃
POST   /api/auth/verify-email/       # 이메일 인증
POST   /api/auth/password/reset/     # 비밀번호 재설정 링크 요청
POST   /api/auth/password/reset/confirm/ # 비밀번호 재설정
GET    /api/auth/profile/            # 프로필 조회
PUT    /api/auth/profile/            # 프로필 수정
POST   /api/auth/password/change/    # 비밀번호 변경
```

---

## 🔒 보안 고려사항

### 1. 비밀번호 보안

현재 데모 구현에서는 비밀번호를 평문으로 저장하고 있지만, 실제 구현에서는 다음과 같은 보안 조치가 필요합니다:

1. **비밀번호 해싱**: bcrypt 등의 알고리즘으로 해싱
2. **솔트 적용**: 무작위 솔트 생성 및 적용
3. **비밀번호 정책**: 최소 길이, 복잡성 요구사항 적용
4. **로그인 시도 제한**: 일정 횟수 이상 실패 시 계정 잠금

### 2. 토큰 보안

1. **만료 시간 설정**: 모든 토큰에 만료 시간 적용
2. **토큰 암호화**: JWT 토큰 사용 시 적절한 서명 알고리즘 사용
3. **토큰 저장**: HttpOnly 쿠키 또는 안전한 저장소 사용
4. **CSRF 방어**: CSRF 토큰 사용

### 3. API 보안

1. **HTTPS 사용**: 모든 API 통신은 HTTPS로 암호화
2. **입력값 검증**: 모든 사용자 입력 데이터 검증
3. **Rate Limiting**: API 요청 횟수 제한
4. **로깅**: 인증 관련 이벤트 로깅

---

## 📱 반응형 디자인

모든 인증 관련 UI는 다음과 같은 반응형 디자인을 적용했습니다:

1. **로그인/회원가입 다이얼로그**: 모바일에서 전체 화면, 데스크톱에서 모달
2. **프로필 페이지**: 모바일에서 탭 세로 배치, 데스크톱에서 가로 배치
3. **비밀번호 재설정 페이지**: 중앙 정렬 컨테이너, 최대 너비 제한

---

## 🧪 테스트

### 수동 테스트 항목

1. **회원가입 흐름**: 이메일, 비밀번호, 약관 동의 검증
2. **이메일 인증**: 인증 링크 클릭 후 상태 변경 확인
3. **로그인**: 인증된 계정으로 로그인 확인
4. **비밀번호 재설정**: 재설정 링크 클릭 후 새 비밀번호 설정 확인
5. **프로필 수정**: 사용자 정보 수정 및 비밀번호 변경 확인

### 자동화 테스트 계획 (향후)

```typescript
// 예시: 회원가입 테스트
describe('SignUp', () => {
  it('should register a new user successfully', async () => {
    // 테스트 코드
  });
  
  it('should require email verification', async () => {
    // 테스트 코드
  });
});
```

---

## 📚 참고 자료

- [JWT 인증 가이드](https://jwt.io/introduction)
- [OWASP 인증 보안 가이드](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/04-Authentication_Testing/README)
- [비밀번호 해싱 모범 사례](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)

---

**최종 업데이트**: 2025-10-28
**작성자**: AI Maker Lab 개발팀
