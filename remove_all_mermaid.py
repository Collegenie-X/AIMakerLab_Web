#!/usr/bin/env python3
"""
프로젝트 전체에서 모든 mermaid 다이어그램을 제거하는 스크립트
"""
import re
import sys
from pathlib import Path


def remove_mermaid_blocks(content):
    """
    mermaid 블록을 모두 제거
    """
    # ```mermaid ... ``` 패턴 제거
    pattern = r"```mermaid\n.*?```\n*"
    new_content = re.sub(pattern, "", content, flags=re.DOTALL)

    # 연속된 빈 줄 정리 (3개 이상 -> 2개)
    new_content = re.sub(r"\n\n\n+", "\n\n", new_content)

    return new_content


def process_file(file_path):
    """
    파일 하나 처리
    """
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        # mermaid 개수 확인
        mermaid_count = len(re.findall(r"```mermaid", content))

        if mermaid_count == 0:
            return 0

        # mermaid 제거
        new_content = remove_mermaid_blocks(content)

        # 저장
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)

        print(f"✅ {file_path.name}: {mermaid_count}개 제거")
        return mermaid_count

    except Exception as e:
        print(f"❌ {file_path}: {e}")
        return 0


def main():
    # 현재 디렉토리부터 재귀적으로 .md 파일 찾기
    root_dir = Path("/Users/kimjongphil/Documents/GitHub/AIMakerLab_Web")

    md_files = list(root_dir.rglob("*.md"))
    tsx_files = list(root_dir.rglob("*.tsx"))

    all_files = md_files + tsx_files

    total_removed = 0
    processed_files = 0

    print(f"총 {len(all_files)}개 파일 검사 중...\n")

    for file_path in sorted(all_files):
        # node_modules, .git 등 제외
        if "node_modules" in str(file_path) or ".git" in str(file_path):
            continue

        removed = process_file(file_path)
        if removed > 0:
            total_removed += removed
            processed_files += 1

    print(f"\n{'='*60}")
    print(f"✅ 완료!")
    print(f"   처리된 파일: {processed_files}개")
    print(f"   제거된 mermaid: {total_removed}개")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
