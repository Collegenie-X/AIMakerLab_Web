export type CompanyInfoItem = {
  label: string
  value: string
  isEmail?: boolean
}

export type CustomerCenterItem = {
  title: string
  icon: "clock" | "phone"
  lines: string[]
}

export type CommunityLink = {
  label: string
  href: string
  badge: string
  badgeBg: string
  badgeText: string
}

export type PolicyLink = {
  label: string
  href: string
  external?: boolean
}

export const companyInfoItems: CompanyInfoItem[] = [
  { label: '회사명', value: '만랩'},
  { label: '대표자', value: '김종필'},
  { label: '사업자번호', value: '760-57-00294' },
  { label: '통신판매업', value: '2025-하남시-0894' },
  { 
    label: '주소', 
    value: '경기도 하남시 풍산동 미사강변서로 16\n 하우스디스마트벨리 10층 F1046호' 
  },
  { label: '대표메일', value: 'support.aimakerlab@gmail.com', isEmail: true },
]

export const customerCenterItems: CustomerCenterItem[] = [
  { title: '상담시간', icon: 'clock', lines: ['평일 10:00~18:00', '(점심시간 12:30~13:30)'] },
  { title: '교육문의', icon: 'phone', lines: ['010-2708-0051'] },
]

export const kakaoButton = {
  label: "카카오톡으로 문의하기",
  href: "#",
}

export const communityLinks: CommunityLink[] = [
  { label: '네이버 블로그 바로가기', href: '#', badge: 'N', badgeBg: 'bg-green-100', badgeText: 'text-green-700' },
  { label: '네이버 카페 바로가기', href: '#', badge: 'C', badgeBg: 'bg-green-100', badgeText: 'text-green-700' },
  { label: '스마트스토어 바로가기', href: '#', badge: 'S', badgeBg: 'bg-green-100', badgeText: 'text-green-700' },
]

export const policyLinks: PolicyLink[] = [
  { label: '회사소개', href: '/about' },
  { label: '이용약관', href: '/terms' },
  { label: '개인정보취급방침', href: '/privacy' },
  { label: '이메일무단수집거부', href: '/email-policy' },
  { label: '네이버 쇼핑몰', href: 'https://smartstore.naver.com', external: true },
]

export const copyrightText = 'COPYRIGHT © 2019 BPLAB ALL RIGHTS RESERVED.'