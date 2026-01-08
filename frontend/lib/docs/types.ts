/**
 * 문서 시스템 타입 정의
 */

import { LucideIcon } from 'lucide-react';

// 문서 카테고리
export type DocCategory = 'Backend' | 'Frontend' | 'Architecture' | 'Legal' | 'Education';

// 문서 메타데이터
export interface DocMetadata {
  title: string;
  description: string;
  category: DocCategory;
  icon: string; // 아이콘 이름
  color: string;
  tags?: string[];
}

// 문서 정보
export interface DocInfo {
  filename: string;
  slug: string;
  source: 'documents' | 'public';
  title: string;
  description: string;
  category: DocCategory;
  icon: any;
  color: string;
  updatedAt: Date;
  size: number;
  tags?: string[];
}

// 카테고리 정보
export interface CategoryInfo {
  id: DocCategory;
  label: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

// 문서 메타데이터 매핑
export type DocMetadataMap = Record<string, DocMetadata>;

// 문서 설정
export interface DocsConfig {
  categories: Record<DocCategory, CategoryInfo>;
  metadata: DocMetadataMap;
}

