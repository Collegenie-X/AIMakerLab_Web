"""
홈페이지 모델

히어로 슬라이드, 특징, 통계 등 홈페이지에 표시되는 데이터
"""

from django.db import models


def hero_slide_image_path(instance, filename):
    """히어로 슬라이드 이미지 업로드 경로"""
    return f"home/hero_slides/{filename}"


def curriculum_highlight_image_path(instance, filename):
    """커리큘럼 하이라이트 이미지 업로드 경로"""
    return f"home/curriculum_highlights/{filename}"


class HeroSlide(models.Model):
    """히어로 슬라이드"""

    title = models.CharField("제목", max_length=200)
    description = models.TextField("설명")
    image = models.ImageField("이미지", upload_to=hero_slide_image_path)
    cta_label = models.CharField("버튼 텍스트", max_length=100)
    cta_href = models.CharField("버튼 링크", max_length=500)

    # 설정
    is_active = models.BooleanField("활성화", default=True)
    order = models.PositiveIntegerField("정렬 순서", default=0)

    # 타임스탬프
    created_at = models.DateTimeField("생성일", auto_now_add=True)
    updated_at = models.DateTimeField("수정일", auto_now=True)

    class Meta:
        db_table = "hero_slides"
        verbose_name = "히어로 슬라이드"
        verbose_name_plural = "히어로 슬라이드 목록"
        ordering = ["order"]

    def __str__(self):
        return self.title


class IntroVideo(models.Model):
    """소개 영상"""

    heading = models.CharField("제목", max_length=200)
    subheading = models.CharField("부제목", max_length=500)
    youtube_title = models.CharField("영상 제목", max_length=200)
    youtube_embed_url = models.URLField("YouTube 임베드 URL")

    # 설정
    is_active = models.BooleanField("활성화", default=True)

    # 타임스탬프
    created_at = models.DateTimeField("생성일", auto_now_add=True)
    updated_at = models.DateTimeField("수정일", auto_now=True)

    class Meta:
        db_table = "intro_videos"
        verbose_name = "소개 영상"
        verbose_name_plural = "소개 영상 목록"

    def __str__(self):
        return self.heading


class Feature(models.Model):
    """특징 항목"""

    icon = models.CharField("아이콘", max_length=50)
    title = models.CharField("제목", max_length=200)
    description = models.TextField("설명")

    # 설정
    is_active = models.BooleanField("활성화", default=True)
    order = models.PositiveIntegerField("정렬 순서", default=0)

    # 타임스탬프
    created_at = models.DateTimeField("생성일", auto_now_add=True)
    updated_at = models.DateTimeField("수정일", auto_now=True)

    class Meta:
        db_table = "features"
        verbose_name = "특징"
        verbose_name_plural = "특징 목록"
        ordering = ["order"]

    def __str__(self):
        return self.title


class CurriculumHighlight(models.Model):
    """커리큘럼 하이라이트 (홈페이지용)"""

    title = models.CharField("제목", max_length=200)
    description = models.TextField("설명")
    image = models.ImageField("이미지", upload_to=curriculum_highlight_image_path)
    href = models.CharField("링크", max_length=500)
    level_badge = models.CharField("레벨 배지", max_length=50)
    duration = models.CharField("기간", max_length=100)
    size = models.CharField("인원", max_length=100)

    # 설정
    is_active = models.BooleanField("활성화", default=True)
    order = models.PositiveIntegerField("정렬 순서", default=0)

    # 타임스탬프
    created_at = models.DateTimeField("생성일", auto_now_add=True)
    updated_at = models.DateTimeField("수정일", auto_now=True)

    class Meta:
        db_table = "curriculum_highlights"
        verbose_name = "커리큘럼 하이라이트"
        verbose_name_plural = "커리큘럼 하이라이트 목록"
        ordering = ["order"]

    def __str__(self):
        return self.title


class OutreachStats(models.Model):
    """출강 통계"""

    metric_icon = models.CharField("아이콘", max_length=50)
    value = models.CharField("값", max_length=100)
    caption = models.CharField("설명", max_length=200)

    # 설정
    is_active = models.BooleanField("활성화", default=True)
    order = models.PositiveIntegerField("정렬 순서", default=0)

    # 타임스탬프
    created_at = models.DateTimeField("생성일", auto_now_add=True)
    updated_at = models.DateTimeField("수정일", auto_now=True)

    class Meta:
        db_table = "outreach_stats"
        verbose_name = "출강 통계"
        verbose_name_plural = "출강 통계 목록"
        ordering = ["order"]

    def __str__(self):
        return f"{self.caption}: {self.value}"


class QuickLink(models.Model):
    """빠른 링크"""

    CATEGORY_CHOICES = [
        ("inquiry", "문의"),
        ("curriculum", "커리큘럼"),
        ("products", "제품"),
        ("about", "소개"),
    ]

    category = models.CharField("카테고리", max_length=50, choices=CATEGORY_CHOICES)
    title = models.CharField("제목", max_length=200)
    description = models.TextField("설명")
    icon = models.CharField("아이콘", max_length=50)
    href = models.CharField("링크", max_length=500)

    # 설정
    is_active = models.BooleanField("활성화", default=True)
    order = models.PositiveIntegerField("정렬 순서", default=0)

    # 타임스탬프
    created_at = models.DateTimeField("생성일", auto_now_add=True)
    updated_at = models.DateTimeField("수정일", auto_now=True)

    class Meta:
        db_table = "quick_links"
        verbose_name = "빠른 링크"
        verbose_name_plural = "빠른 링크 목록"
        ordering = ["order"]

    def __str__(self):
        return self.title


class HomepageConfig(models.Model):
    """홈페이지 전역 설정"""

    # Hero 섹션 설정
    hero_heading = models.CharField("히어로 제목", max_length=200, blank=True)
    hero_subheading = models.CharField("히어로 부제목", max_length=500, blank=True)
    carousel_autoplay = models.BooleanField("자동 재생", default=True)
    carousel_interval_ms = models.IntegerField("슬라이드 간격(ms)", default=4000)
    carousel_indicators = models.BooleanField("인디케이터 표시", default=True)
    carousel_pause_on_hover = models.BooleanField("호버 시 정지", default=True)

    # Features 섹션
    features_heading = models.CharField(
        "특징 섹션 제목", max_length=200, default="왜 AI Maker Lab인가요?"
    )
    features_subheading = models.CharField(
        "특징 섹션 부제목",
        max_length=500,
        default="체계적인 커리큘럼과 실습 중심 교육으로 실력을 키웁니다",
    )

    # Curriculum 섹션
    curriculum_section_badge = models.CharField(
        "커리큘럼 배지", max_length=100, default="교육 프로그램"
    )
    curriculum_heading = models.CharField(
        "커리큘럼 제목", max_length=200, default="체계적인 교육 커리큘럼"
    )
    curriculum_subheading = models.CharField(
        "커리큘럼 부제목",
        max_length=500,
        default="초급부터 고급까지, 단계별 맞춤 교육 프로그램",
    )
    curriculum_view_all_label = models.CharField(
        "전체보기 버튼", max_length=100, default="전체 커리큘럼 보기"
    )

    # Outreach 섹션
    outreach_heading = models.CharField(
        "출강 섹션 제목", max_length=200, default="AI Maker Lab의 찾아가는 코딩 수업!"
    )
    outreach_subheading = models.CharField(
        "출강 섹션 부제목",
        max_length=500,
        default="코딩교육이 필요한 공간에, 여기저기 달려갑니다.",
    )
    outreach_grades = models.JSONField("대상 학년", default=list)
    outreach_image = models.CharField(
        "출강 이미지",
        max_length=500,
        default="/modern-coding-education-classroom-with-computers.jpg",
    )
    outreach_card_title = models.CharField(
        "출강 카드 제목", max_length=200, default="온라인 스마트 시대 열기"
    )
    outreach_card_lines = models.JSONField("출강 카드 내용", default=list)
    outreach_hashtags = models.JSONField("해시태그", default=list)

    # 메타 정보
    site_name = models.CharField("사이트 이름", max_length=100, default="AI Maker Lab")

    # 타임스탬프
    created_at = models.DateTimeField("생성일", auto_now_add=True)
    updated_at = models.DateTimeField("수정일", auto_now=True)

    class Meta:
        db_table = "homepage_config"
        verbose_name = "홈페이지 설정"
        verbose_name_plural = "홈페이지 설정"

    def __str__(self):
        return "홈페이지 설정"

    def save(self, *args, **kwargs):
        """Singleton 패턴 - 하나의 설정만 존재"""
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def get_config(cls):
        """설정 가져오기"""
        config, created = cls.objects.get_or_create(pk=1)
        return config
