// 이 파일은 클라이언트 측 데모용입니다.
// 실제 서비스에서는 서버 API를 사용해야 합니다.

interface User {
  email: string
  passwordHash: string
  isVerified: boolean
  verificationToken?: string
  tokenExpiry?: number
  resetToken?: string
  resetTokenExpiry?: number
}

const USERS_STORAGE_KEY = "demo_users"
const TOKEN_EXPIRY = 24 * 60 * 60 * 1000 // 24시간

function getUsers(): User[] {
  if (typeof window === "undefined") return []
  const usersJson = localStorage.getItem(USERS_STORAGE_KEY)
  return usersJson ? JSON.parse(usersJson) : []
}

function saveUsers(users: User[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
}

function generateToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function signUp(email: string, password: string): { ok: boolean; error?: string } {
  const users = getUsers()
  if (users.some((user) => user.email === email)) {
    return { ok: false, error: "이미 가입된 이메일입니다." }
  }

  const verificationToken = generateToken()
  const tokenExpiry = Date.now() + TOKEN_EXPIRY

  const newUser: User = {
    email,
    passwordHash: password, // 데모용으로 평문 저장, 실제로는 해싱 필요
    isVerified: false,
    verificationToken,
    tokenExpiry,
  }

  users.push(newUser)
  saveUsers(users)
  return { ok: true }
}

export function generateVerification(email: string): { ok: boolean; error?: string; url?: string } {
  const users = getUsers()
  const user = users.find((u) => u.email === email)

  if (!user) {
    return { ok: false, error: "사용자를 찾을 수 없습니다." }
  }

  const verificationToken = generateToken()
  const tokenExpiry = Date.now() + TOKEN_EXPIRY

  user.verificationToken = verificationToken
  user.tokenExpiry = tokenExpiry
  saveUsers(users)

  return {
    ok: true,
    url: `/verify-email?email=${encodeURIComponent(email)}&token=${verificationToken}`,
  }
}

export function verifyEmail(email: string, token: string): { ok: boolean; error?: string } {
  const users = getUsers()
  const user = users.find((u) => u.email === email)

  if (!user) {
    return { ok: false, error: "사용자를 찾을 수 없습니다." }
  }

  if (user.isVerified) {
    return { ok: true }
  }

  if (user.verificationToken !== token) {
    return { ok: false, error: "유효하지 않은 인증 토큰입니다." }
  }

  if (user.tokenExpiry && user.tokenExpiry < Date.now()) {
    return { ok: false, error: "만료된 인증 토큰입니다." }
  }

  user.isVerified = true
  user.verificationToken = undefined
  user.tokenExpiry = undefined
  saveUsers(users)

  return { ok: true }
}

export function loginWithPassword(email: string, password: string): { ok: boolean; error?: string } {
  const users = getUsers()
  const user = users.find((u) => u.email === email)

  if (!user) {
    return { ok: false, error: "이메일 또는 비밀번호가 올바르지 않습니다." }
  }

  if (!user.isVerified) {
    return { ok: false, error: "이메일 인증이 필요합니다." }
  }

  if (user.passwordHash !== password) { // 데모용, 실제로는 해싱된 비밀번호 비교
    return { ok: false, error: "이메일 또는 비밀번호가 올바르지 않습니다." }
  }

  return { ok: true }
}

export function generatePasswordReset(email: string): { ok: boolean; error?: string; url?: string } {
  const users = getUsers()
  const user = users.find((u) => u.email === email)

  if (!user) {
    return { ok: false, error: "등록되지 않은 이메일입니다." }
  }

  const resetToken = generateToken()
  const resetTokenExpiry = Date.now() + TOKEN_EXPIRY

  user.resetToken = resetToken
  user.resetTokenExpiry = resetTokenExpiry
  saveUsers(users)

  return {
    ok: true,
    url: `/reset-password?email=${encodeURIComponent(email)}&token=${resetToken}`,
  }
}

export function verifyResetToken(email: string, token: string): { ok: boolean; error?: string } {
  const users = getUsers()
  const user = users.find((u) => u.email === email)

  if (!user) {
    return { ok: false, error: "사용자를 찾을 수 없습니다." }
  }

  if (user.resetToken !== token) {
    return { ok: false, error: "유효하지 않은 토큰입니다." }
  }

  if (user.resetTokenExpiry && user.resetTokenExpiry < Date.now()) {
    return { ok: false, error: "만료된 토큰입니다." }
  }

  return { ok: true }
}

export function resetPassword(email: string, token: string, newPassword: string): { ok: boolean; error?: string } {
  const users = getUsers()
  const user = users.find((u) => u.email === email)

  if (!user) {
    return { ok: false, error: "사용자를 찾을 수 없습니다." }
  }

  if (user.resetToken !== token) {
    return { ok: false, error: "유효하지 않은 토큰입니다." }
  }

  if (user.resetTokenExpiry && user.resetTokenExpiry < Date.now()) {
    return { ok: false, error: "만료된 토큰입니다." }
  }

  user.passwordHash = newPassword // 데모용, 실제로는 해싱 필요
  user.resetToken = undefined
  user.resetTokenExpiry = undefined
  saveUsers(users)

  return { ok: true }
}

export function updatePassword(email: string, currentPassword: string, newPassword: string): { ok: boolean; error?: string } {
  const users = getUsers()
  const user = users.find((u) => u.email === email)

  if (!user) {
    return { ok: false, error: "사용자를 찾을 수 없습니다." }
  }

  if (user.passwordHash !== currentPassword) { // 데모용, 실제로는 해싱된 비밀번호 비교
    return { ok: false, error: "현재 비밀번호가 올바르지 않습니다." }
  }

  user.passwordHash = newPassword // 데모용, 실제로는 해싱 필요
  saveUsers(users)

  return { ok: true }
}