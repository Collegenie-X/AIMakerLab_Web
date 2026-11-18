#!/usr/bin/env python3
"""
문서를 1000줄 이하로 강력하게 압축
"""
import re
import sys


def aggressive_compress(content, target_lines=1000):
    """강력한 압축"""
    lines = content.split("\n")

    if len(lines) <= target_lines:
        return content

    print(f"압축 시작: {len(lines)} 줄 -> {target_lines} 줄 목표")

    # 1. 코드 블록 대폭 축약
    content = re.sub(
        r"```\w*\n(.*?)\n```",
        lambda m: (
            "```\n// ... [코드 생략] ...\n```"
            if len(m.group(1).split("\n")) > 10
            else m.group(0)
        ),
        content,
        flags=re.DOTALL,
    )

    # 2. 연속된 빈 줄 제거
    content = re.sub(r"\n\n\n+", "\n\n", content)

    # 3. 표 데이터 샘플링 (10줄 이상의 표는 상위 5개만)
    def compress_table(match):
        table = match.group(0)
        table_lines = table.split("\n")
        if len(table_lines) > 12:  # 헤더(2) + 10행
            # 헤더 + 구분선 + 상위 5개 + "... 외 N개" + 하위 1개
            header = "\n".join(table_lines[:2])
            rows = table_lines[2:7]
            omitted = len(table_lines) - 8
            last_row = table_lines[-1] if len(table_lines) > 8 else ""
            return (
                f"{header}\n"
                + "\n".join(rows)
                + f"\n| ... | ... | ... | (외 {omitted}개 항목 생략) |\n{last_row}"
            )
        return table

    content = re.sub(
        r"\|.*?\|.*?\n\|[-\s\|:]+\|\n(\|.*?\|.*?\n)+",
        compress_table,
        content,
        flags=re.MULTILINE,
    )

    # 4. "예시", "사례" 섹션 축약
    content = re.sub(
        r"###\s+예시.*?\n\n(.*?)\n\n###",
        lambda m: f"### 예시 [상세 내용 생략]\n\n> 자세한 예시는 원본 문서를 참조하세요.\n\n###",
        content,
        flags=re.DOTALL,
    )

    # 5. 긴 리스트 축약 (20개 이상 항목)
    def compress_list(match):
        items = match.group(0).split("\n")
        if len(items) > 20:
            return "\n".join(items[:10]) + f"\n- ... (외 {len(items)-10}개 항목 생략)\n"
        return match.group(0)

    content = re.sub(
        r"^[-*]\s+.*$(\n^[-*]\s+.*$){19,}", compress_list, content, flags=re.MULTILINE
    )

    lines = content.split("\n")
    print(f"압축 완료: {len(lines)} 줄")

    # 여전히 초과하면 섹션 단위로 잘라내기
    if len(lines) > target_lines:
        print(f"⚠️  여전히 초과: 섹션 샘플링 적용")
        # 주요 섹션만 유지
        content = keep_important_sections(content, target_lines)
        lines = content.split("\n")
        print(f"최종: {len(lines)} 줄")

    return content


def keep_important_sections(content, target_lines):
    """중요 섹션만 유지"""
    # ## 섹션으로 분할
    sections = re.split(r"(^## .*$)", content, flags=re.MULTILINE)

    if len(sections) <= 1:
        # 섹션이 없으면 앞부분만 자르기
        lines = content.split("\n")
        return (
            "\n".join(lines[:target_lines])
            + "\n\n---\n\n**[문서가 길어 일부 내용이 생략되었습니다. 전체 내용은 원본 문서를 참조하세요.]**\n"
        )

    # 헤더 + 중요 섹션만 조합
    result = [sections[0]]  # 문서 시작 부분

    # 중요 키워드가 포함된 섹션 우선
    important_keywords = [
        "개요",
        "목차",
        "요약",
        "핵심",
        "정의",
        "목표",
        "결론",
        "참고",
    ]

    for i in range(1, len(sections), 2):
        if i + 1 < len(sections):
            section_title = sections[i]
            section_content = sections[i + 1]

            # 중요 섹션이거나 짧은 섹션만 포함
            if (
                any(keyword in section_title for keyword in important_keywords)
                or len(section_content.split("\n")) < 50
            ):
                result.append(section_title)
                result.append(section_content)

        # 목표 줄 수에 도달하면 중단
        if len("\n".join(result).split("\n")) > target_lines * 0.8:
            break

    result.append(
        "\n\n---\n\n**[이하 내용 생략]** 전체 내용은 원본 문서를 참조하세요.\n"
    )

    return "\n".join(result)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("사용법: python aggressive_compress.py <파일경로> [목표줄수]")
        sys.exit(1)

    input_file = sys.argv[1]
    target = int(sys.argv[2]) if len(sys.argv) > 2 else 1000

    with open(input_file, "r", encoding="utf-8") as f:
        content = f.read()

    compressed = aggressive_compress(content, target)

    with open(input_file, "w", encoding="utf-8") as f:
        f.write(compressed)

    print(f"✅ 완료: {input_file}")
