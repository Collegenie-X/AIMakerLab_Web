"""
갤러리 모델 (학생 작품 & 수업 후기)
완전 분리된 구조
"""

from django.db import models


# ============================================
# 이미지 업로드 경로
# ============================================


def student_work_image_path(instance, filename):
    """학생 작품 이미지 업로드 경로"""
    return f"gallery/works/{filename}"


def class_review_image_path(instance, filename):
    """수업 후기 이미지 업로드 경로"""
    return f"gallery/reviews/{filename}"


def student_work_gallery_image_path(instance, filename):
    """학생 작품 갤러리 이미지 업로드 경로"""
    return f"gallery/works/gallery/{filename}"


def class_review_gallery_image_path(instance, filename):
    """수업 후기 갤러리 이미지 업로드 경로"""
    return f"gallery/reviews/gallery/{filename}"


# ============================================
# 학생 작품 모델
# ============================================


class StudentWork(models.Model):
    """학생 작품 (Student Work)"""

    # 난이도 선택
    DIFFICULTY_CHOICES = [
        ("beginner", "입문"),
        ("elementary", "초급"),
        ("intermediate", "중급"),
        ("advanced", "고급"),
    ]

    # 기본 정보
    work_id = models.IntegerField("작품 ID", unique=True)
    title = models.CharField("작품명", max_length=200)
    description = models.TextField("작품 설명")

    # 이미지
    image = models.ImageField("대표 이미지", upload_to=student_work_image_path)
    images = models.JSONField("추가 이미지", default=list, blank=True)

    # 학생 정보
    student_name = models.CharField("학생명", max_length=100)
    student_grade = models.CharField(
        "학년", max_length=50
    )  # "초등 5학년", "중등 2학년"
    student_age = models.IntegerField("나이", null=True, blank=True)

    # 제작 정보
    technologies = models.JSONField(
        "사용 기술",
        default=list,
        blank=True,
        help_text='예: ["Python", "AI", "머신러닝"]',
    )
    tools = models.JSONField(
        "사용 도구/키트",
        default=list,
        blank=True,
        help_text='예: ["micro:bit", "아두이노", "라즈베리파이"]',
    )
    difficulty = models.CharField(
        "난이도", max_length=20, choices=DIFFICULTY_CHOICES, default="elementary"
    )
    project_period = models.CharField(
        "제작 기간", max_length=100, blank=True
    )  # "2주", "1개월"

    # 작품 상세
    project_description = models.TextField("제작 과정 설명", blank=True)
    learning_points = models.JSONField(
        "배운 점",
        default=list,
        blank=True,
        help_text='예: ["센서 활용법", "코딩 원리"]',
    )

    # 통계
    views = models.IntegerField("조회수", default=0)
    likes = models.IntegerField("좋아요", default=0)

    # 태그
    tags = models.JSONField(
        "태그", default=list, blank=True, help_text='예: ["AI", "로봇", "게임"]'
    )

    # 순서 및 공개
    order = models.PositiveIntegerField("정렬 순서", default=0)
    is_featured = models.BooleanField("추천 작품", default=False)
    is_published = models.BooleanField("공개", default=True)

    # 날짜
    created_date = models.DateField("제작 날짜")
    created_at = models.DateTimeField("등록일", auto_now_add=True)
    updated_at = models.DateTimeField("수정일", auto_now=True)

    class Meta:
        db_table = "gallery_student_works"
        verbose_name = "학생 작품"
        verbose_name_plural = "학생 작품 목록"
        ordering = ["-is_featured", "order", "-created_date"]

    def __str__(self):
        return f"{self.title} - {self.student_name}"


# ============================================
# 수업 후기 모델
# ============================================


class ClassReview(models.Model):
    """수업 후기 (Class Review)"""

    # 작성자 구분
    AUTHOR_TYPE_CHOICES = [
        ("student", "학생"),
        ("parent", "학부모"),
    ]

    # 기본 정보
    review_id = models.IntegerField("후기 ID", unique=True)
    title = models.CharField("후기 제목", max_length=200)
    content = models.TextField("후기 내용")

    # 이미지 (선택사항)
    image = models.ImageField(
        "후기 이미지", upload_to=class_review_image_path, blank=True, null=True
    )
    images = models.JSONField("추가 이미지", default=list, blank=True)

    # 작성자 정보
    author_name = models.CharField("작성자", max_length=100)
    author_type = models.CharField(
        "구분", max_length=20, choices=AUTHOR_TYPE_CHOICES, default="parent"
    )

    # 수강 정보
    course_name = models.CharField("수강 과정", max_length=200)
    course_period = models.CharField("수강 기간", max_length=100)  # "2024.01 ~ 2024.02"
    instructor = models.CharField("강사명", max_length=100, blank=True)

    # 평가 (1~5점)
    overall_rating = models.IntegerField("종합 만족도", default=5, help_text="1~5점")
    teaching_quality = models.IntegerField("강의 품질", default=5, help_text="1~5점")
    curriculum_quality = models.IntegerField(
        "커리큘럼 품질", default=5, help_text="1~5점"
    )
    learning_effect = models.IntegerField("학습 효과", default=5, help_text="1~5점")

    # 장점/개선점
    pros = models.TextField("좋았던 점", blank=True)
    cons = models.TextField("개선할 점", blank=True)

    # 추천 여부
    recommend = models.BooleanField("추천 여부", default=True)

    # 통계
    views = models.IntegerField("조회수", default=0)
    helpful_count = models.IntegerField("도움됨 수", default=0)

    # 순서 및 공개
    order = models.PositiveIntegerField("정렬 순서", default=0)
    is_featured = models.BooleanField("추천 후기", default=False)
    is_published = models.BooleanField("공개", default=True)

    # 날짜
    review_date = models.DateField("작성일")
    created_at = models.DateTimeField("등록일", auto_now_add=True)
    updated_at = models.DateTimeField("수정일", auto_now=True)

    class Meta:
        db_table = "gallery_class_reviews"
        verbose_name = "수업 후기"
        verbose_name_plural = "수업 후기 목록"
        ordering = ["-is_featured", "order", "-review_date"]

    def __str__(self):
        return f"{self.title} - {self.author_name}"

    @property
    def average_rating(self):
        """평균 평점 계산"""
        return (
            self.overall_rating
            + self.teaching_quality
            + self.curriculum_quality
            + self.learning_effect
        ) / 4


# ============================================
# 갤러리 이미지 모델들
# ============================================


class StudentWorkImage(models.Model):
    """학생 작품 추가 이미지"""

    work = models.ForeignKey(
        StudentWork,
        on_delete=models.CASCADE,
        related_name="gallery_images",
        verbose_name="작품",
    )
    image = models.ImageField("이미지", upload_to=student_work_gallery_image_path)
    caption = models.CharField(
        "설명", max_length=200, blank=True, help_text="이미지 설명 (선택사항)"
    )
    order = models.PositiveIntegerField("정렬 순서", default=0)
    created_at = models.DateTimeField("등록일", auto_now_add=True)

    class Meta:
        db_table = "gallery_student_work_images"
        verbose_name = "작품 이미지"
        verbose_name_plural = "작품 이미지 목록"
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.work.title} - 이미지 {self.order}"


class ClassReviewImage(models.Model):
    """수업 후기 추가 이미지"""

    review = models.ForeignKey(
        ClassReview,
        on_delete=models.CASCADE,
        related_name="gallery_images",
        verbose_name="후기",
    )
    image = models.ImageField("이미지", upload_to=class_review_gallery_image_path)
    caption = models.CharField(
        "설명", max_length=200, blank=True, help_text="이미지 설명 (선택사항)"
    )
    order = models.PositiveIntegerField("정렬 순서", default=0)
    created_at = models.DateTimeField("등록일", auto_now_add=True)

    class Meta:
        db_table = "gallery_class_review_images"
        verbose_name = "후기 이미지"
        verbose_name_plural = "후기 이미지 목록"
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.review.title} - 이미지 {self.order}"
