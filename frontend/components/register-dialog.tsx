"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/buttons/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/overlays/dialog";
import { Input } from "@/components/ui/forms/input";
import { Label } from "@/components/ui/forms/label";
import { Checkbox } from "@/components/ui/forms/checkbox";
import { Separator } from "@/components/ui/layout/separator";
import { Alert, AlertDescription } from "@/components/ui/data-display/alert";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

/**
 * 회원가입 다이어로그 컴포넌트
 * 이메일/비밀번호 회원가입 및 소셜 회원가입 지원
 */
export function RegisterDialog() {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // 폼 상태
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  
  // 약관 동의 상태
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  
  // 에러 상태
  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
   * 전체 동의 체크박스 핸들러
   */
  const handleAgreeAll = (checked: boolean) => {
    setAgreeAll(checked);
    setAgreeTerms(checked);
    setAgreePrivacy(checked);
    setAgreeMarketing(checked);
  };

  /**
   * 개별 약관 동의 핸들러
   */
  const handleIndividualAgree = () => {
    // 모든 필수 약관에 동의했는지 확인
    if (agreeTerms && agreePrivacy) {
      // 마케팅 동의 여부와 상관없이 전체 동의는 필수만 체크
      setAgreeAll(agreeTerms && agreePrivacy && agreeMarketing);
    } else {
      setAgreeAll(false);
    }
  };

  /**
   * 유효성 검증
   */
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 이메일 검증
    if (!email) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
    }

    // 비밀번호 검증
    if (!password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (password.length < 8) {
      newErrors.password = "비밀번호는 8자 이상이어야 합니다.";
    } else if (!/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
      newErrors.password = "비밀번호는 영문과 숫자를 포함해야 합니다.";
    }

    // 비밀번호 확인 검증
    if (!confirmPassword) {
      newErrors.confirmPassword = "비밀번호 확인을 입력해주세요.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    // 이름 검증
    if (!name) {
      newErrors.name = "이름을 입력해주세요.";
    } else if (name.length < 2) {
      newErrors.name = "이름은 2자 이상이어야 합니다.";
    }

    // 연락처 검증
    if (!phone) {
      newErrors.phone = "연락처를 입력해주세요.";
    } else if (!/^[0-9]{10,11}$/.test(phone.replace(/-/g, ""))) {
      newErrors.phone = "올바른 연락처 형식이 아닙니다.";
    }

    // 필수 약관 동의 검증
    if (!agreeTerms) {
      newErrors.terms = "이용약관에 동의해주세요.";
    }
    if (!agreePrivacy) {
      newErrors.privacy = "개인정보취급방침에 동의해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * 회원가입 제출 핸들러
   */
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Early return: 유효성 검증 실패 시
    if (!validateForm()) {
      return;
    }

    console.log("[회원가입 시도]", {
      email,
      password,
      name,
      phone,
      agreeMarketing,
    });

    // TODO: 회원가입 API 호출
    // try {
    //   const response = await register({
    //     email,
    //     password,
    //     password2: confirmPassword,
    //     name,
    //     phone,
    //     agree_marketing: agreeMarketing,
    //   });
    //   console.log("회원가입 성공:", response);
    //   setOpen(false);
    // } catch (error) {
    //   console.error("회원가입 실패:", error);
    // }
  };

  /**
   * Google 소셜 로그인
   */
  const handleGoogleRegister = () => {
    console.log("[Google 회원가입 클릭]");
    // TODO: Google OAuth 연동
  };

  /**
   * 카카오 소셜 로그인
   */
  const handleKakaoRegister = () => {
    console.log("[카카오 회원가입 클릭]");
    // TODO: 카카오 OAuth 연동
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
          회원가입
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            회원가입
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleRegister} className="space-y-4 py-4">
          {/* 이메일 */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-gray-600">
              이메일 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`h-12 ${errors.email ? "border-red-500" : "bg-blue-50/50 border-blue-200 focus:border-blue-400"}`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.email}
              </p>
            )}
          </div>

          {/* 비밀번호 */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm text-gray-600">
              비밀번호 <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="영문, 숫자 포함 8자 이상"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`h-12 pr-10 ${errors.password ? "border-red-500" : "bg-blue-50/50 border-blue-200 focus:border-blue-400"}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.password}
              </p>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm text-gray-600">
              비밀번호 확인 <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="비밀번호를 다시 입력해주세요"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`h-12 pr-10 ${errors.confirmPassword ? "border-red-500" : "bg-blue-50/50 border-blue-200 focus:border-blue-400"}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* 이름 */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm text-gray-600">
              이름 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="홍길동"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`h-12 ${errors.name ? "border-red-500" : "bg-blue-50/50 border-blue-200 focus:border-blue-400"}`}
            />
            {errors.name && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.name}
              </p>
            )}
          </div>

          {/* 연락처 */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm text-gray-600">
              연락처 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="01012345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`h-12 ${errors.phone ? "border-red-500" : "bg-blue-50/50 border-blue-200 focus:border-blue-400"}`}
            />
            {errors.phone && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.phone}
              </p>
            )}
          </div>

          {/* 약관 동의 */}
          <div className="space-y-3 pt-4">
            <Separator />
            <div className="space-y-3">
              {/* 전체 동의 */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeAll"
                  checked={agreeAll}
                  onCheckedChange={handleAgreeAll}
                />
                <label
                  htmlFor="agreeAll"
                  className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  전체 동의
                </label>
              </div>

              <Separator />

              {/* 이용약관 (필수) */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeTerms"
                    checked={agreeTerms}
                    onCheckedChange={(checked) => {
                      setAgreeTerms(checked as boolean);
                      handleIndividualAgree();
                    }}
                  />
                  <label
                    htmlFor="agreeTerms"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    이용약관 동의 <span className="text-red-500">(필수)</span>
                  </label>
                </div>
                <Link
                  href="/legal/terms-of-service"
                  target="_blank"
                  className="text-xs text-blue-600 hover:underline"
                >
                  보기
                </Link>
              </div>
              {errors.terms && (
                <p className="text-sm text-red-500 flex items-center gap-1 ml-6">
                  <AlertCircle className="h-4 w-4" />
                  {errors.terms}
                </p>
              )}

              {/* 개인정보취급방침 (필수) */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreePrivacy"
                    checked={agreePrivacy}
                    onCheckedChange={(checked) => {
                      setAgreePrivacy(checked as boolean);
                      handleIndividualAgree();
                    }}
                  />
                  <label
                    htmlFor="agreePrivacy"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    개인정보취급방침 동의 <span className="text-red-500">(필수)</span>
                  </label>
                </div>
                <Link
                  href="/legal/privacy-policy"
                  target="_blank"
                  className="text-xs text-blue-600 hover:underline"
                >
                  보기
                </Link>
              </div>
              {errors.privacy && (
                <p className="text-sm text-red-500 flex items-center gap-1 ml-6">
                  <AlertCircle className="h-4 w-4" />
                  {errors.privacy}
                </p>
              )}

              {/* 마케팅 정보 수신 (선택) */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeMarketing"
                  checked={agreeMarketing}
                  onCheckedChange={(checked) => {
                    setAgreeMarketing(checked as boolean);
                    handleIndividualAgree();
                  }}
                />
                <label
                  htmlFor="agreeMarketing"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  마케팅 정보 수신 동의 <span className="text-gray-400">(선택)</span>
                </label>
              </div>
            </div>
          </div>

          {/* 회원가입 버튼 */}
          <Button
            type="submit"
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            회원가입
          </Button>

          {/* 로그인 링크 */}
          <div className="text-center text-sm">
            <span className="text-gray-600">이미 계정이 있으신가요? </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-blue-600 hover:underline font-medium"
            >
              로그인
            </button>
          </div>
        </form>

        {/* 소셜 회원가입 */}
        <div className="relative">
          <Separator className="my-4" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white px-4 text-sm text-gray-500">소셜 회원가입</span>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          {/* Google 회원가입 */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 border-gray-300 hover:bg-gray-50 bg-transparent"
            onClick={handleGoogleRegister}
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            GOOGLE로 회원가입
          </Button>

          {/* 카카오 회원가입 */}
          <Button
            type="button"
            className="w-full h-12 bg-[#FEE500] hover:bg-[#FDD835] text-gray-900 font-medium"
            onClick={handleKakaoRegister}
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3C6.477 3 2 6.477 2 10.75c0 2.764 1.828 5.192 4.56 6.56l-1.172 4.297a.5.5 0 00.748.56l5.047-3.364c.272.02.547.03.817.03 5.523 0 10-3.477 10-7.75S17.523 3 12 3z" />
            </svg>
            카카오톡으로 회원가입
          </Button>
        </div>

        {/* 개인정보 보호 안내 */}
        <Alert className="mt-4">
          <AlertDescription className="text-xs text-gray-600">
            회원가입 시 입력하신 개인정보는 {" "}
            <Link href="/legal/privacy-policy" target="_blank" className="text-blue-600 hover:underline">
              개인정보취급방침
            </Link>
            에 따라 안전하게 보호됩니다.
          </AlertDescription>
        </Alert>
      </DialogContent>
    </Dialog>
  );
}

