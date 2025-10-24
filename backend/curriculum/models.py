"""
커리큘럼 모델

앱 인벤터, 아두이노, 라즈베리파이, AI 교육, 과학 교육 커리큘럼 데이터
"""

from django.db import models


def curriculum_project_image_path(instance, filename):
    """커리큘럼 프로젝트 이미지 업로드 경로"""
    return f"curriculum/projects/{filename}"


class CurriculumCategory(models.TextChoices):
    """커리큘럼 카테고리"""

    AI_EDUCATION = "ai-education", "AI 교육"
    APP_INVENTOR = "app-inventor", "앱 인벤터"
    ARDUINO = "arduino", "아두이노"
    RASPBERRY_PI = "raspberry-pi", "라즈베리파이"
    SCIENCE = "science", "과학 교육"


class Curriculum(models.Model):
    """커리큘럼 메인 정보"""

    category = models.CharField(
        "카테고리", max_length=50, choices=CurriculumCategory.choices, unique=True
    )
    title = models.CharField("제목", max_length=200)
    description = models.TextField("설명")
    badge = models.CharField("배지 텍스트", max_length=100, blank=True)
    gradient_class = models.CharField("그라데이션 클래스", max_length=200)

    # 메타 정보
    meta_title = models.CharField("메타 제목", max_length=200)
    meta_description = models.TextField("메타 설명")

    # 순서
    order = models.PositiveIntegerField("정렬 순서", default=0)

    # 타임스탬프
    created_at = models.DateTimeField("생성일", auto_now_add=True)
    updated_at = models.DateTimeField("수정일", auto_now=True)

    class Meta:
        db_table = "curriculum"
        verbose_name = "커리큘럼"
        verbose_name_plural = "커리큘럼 목록"
        ordering = ["order", "category"]

    def __str__(self):
        return self.title


class CourseInfo(models.Model):
    """과정 정보 카드"""

    curriculum = models.ForeignKey(
        Curriculum, on_delete=models.CASCADE, related_name="course_info_items"
    )
    info_id = models.CharField("정보 ID", max_length=50)
    icon = models.CharField("아이콘", max_length=50)
    icon_color = models.CharField("아이콘 색상", max_length=50)
    label = models.CharField("라벨", max_length=100)
    value = models.CharField("값", max_length=200)
    order = models.PositiveIntegerField("순서", default=0)

    class Meta:
        db_table = "course_info"
        verbose_name = "과정 정보"
        verbose_name_plural = "과정 정보 목록"
        ordering = ["curriculum", "order"]

    def __str__(self):
        return f"{self.curriculum.title} - {self.label}"


class LearningGoal(models.Model):
    """학습 목표"""

    curriculum = models.ForeignKey(
        Curriculum, on_delete=models.CASCADE, related_name="learning_goals"
    )
    goal_id = models.CharField("목표 ID", max_length=50)
    category = models.CharField("카테고리", max_length=100)
    title = models.CharField("제목", max_length=200)
    description = models.TextField("설명")
    skills = models.JSONField("기술 목록", default=list)
    order = models.PositiveIntegerField("순서", default=0)

    class Meta:
        db_table = "learning_goals"
        verbose_name = "학습 목표"
        verbose_name_plural = "학습 목표 목록"
        ordering = ["curriculum", "order"]

    def __str__(self):
        return f"{self.curriculum.title} - {self.title}"


class CurriculumProject(models.Model):
    """커리큘럼 프로젝트"""

    curriculum = models.ForeignKey(
        Curriculum, on_delete=models.CASCADE, related_name="projects"
    )
    project_id = models.CharField("프로젝트 ID", max_length=50)
    title = models.CharField("제목", max_length=200)
    description = models.TextField("설명")
    image = models.ImageField(
        "이미지", upload_to=curriculum_project_image_path, blank=True
    )
    difficulty = models.CharField("난이도", max_length=50)
    university = models.CharField("대학 연계", max_length=200, blank=True)
    order = models.PositiveIntegerField("순서", default=0)

    class Meta:
        db_table = "curriculum_projects"
        verbose_name = "커리큘럼 프로젝트"
        verbose_name_plural = "커리큘럼 프로젝트 목록"
        ordering = ["curriculum", "order"]

    def __str__(self):
        return f"{self.curriculum.title} - {self.title}"


class ProjectTab(models.Model):
    """프로젝트 탭 (3시간, 6시간, 12시간 과정)"""

    project = models.ForeignKey(
        CurriculumProject, on_delete=models.CASCADE, related_name="tabs"
    )
    tab_id = models.CharField("탭 ID", max_length=50)
    label = models.CharField("라벨", max_length=100)
    duration = models.CharField("기간", max_length=50)
    description = models.TextField("설명")
    order = models.PositiveIntegerField("순서", default=0)

    class Meta:
        db_table = "project_tabs"
        verbose_name = "프로젝트 탭"
        verbose_name_plural = "프로젝트 탭 목록"
        ordering = ["project", "order"]

    def __str__(self):
        return f"{self.project.title} - {self.label}"


class Module(models.Model):
    """수업 모듈"""

    tab = models.ForeignKey(
        ProjectTab, on_delete=models.CASCADE, related_name="modules"
    )
    module_id = models.CharField("모듈 ID", max_length=50)
    title = models.CharField("제목", max_length=200)
    duration = models.CharField("소요 시간", max_length=50)
    detail_description = models.TextField("상세 설명")
    topics = models.JSONField("주제 목록", default=list)
    order = models.PositiveIntegerField("순서", default=0)

    class Meta:
        db_table = "modules"
        verbose_name = "수업 모듈"
        verbose_name_plural = "수업 모듈 목록"
        ordering = ["tab", "order"]

    def __str__(self):
        return f"{self.tab.label} - {self.title}"


class GradeRecommendation(models.Model):
    """학년별 추천"""

    curriculum = models.ForeignKey(
        Curriculum, on_delete=models.CASCADE, related_name="grade_recommendations"
    )
    course_id = models.CharField("과정 ID", max_length=50)
    course_name = models.CharField("과정명", max_length=200)
    description = models.CharField("설명", max_length=500)
    difficulty = models.CharField("난이도", max_length=50)
    duration = models.CharField("기간", max_length=50)

    # 학년별 추천 여부 (null: 해당없음, 선택, 권장, 도전)
    elementary_mid = models.CharField("초3-4", max_length=50, blank=True, null=True)
    elementary_high = models.CharField("초5-6", max_length=50, blank=True, null=True)
    middle_low = models.CharField("중1-2", max_length=50, blank=True, null=True)
    middle_high = models.CharField("중3", max_length=50, blank=True, null=True)
    high = models.CharField("고등", max_length=50, blank=True, null=True)

    order = models.PositiveIntegerField("순서", default=0)

    class Meta:
        db_table = "grade_recommendations"
        verbose_name = "학년별 추천"
        verbose_name_plural = "학년별 추천 목록"
        ordering = ["curriculum", "order"]

    def __str__(self):
        return f"{self.curriculum.title} - {self.course_name}"


class EducationRequirement(models.Model):
    """교육 조건"""

    curriculum = models.ForeignKey(
        Curriculum, on_delete=models.CASCADE, related_name="education_requirements"
    )
    requirement_id = models.CharField("조건 ID", max_length=50)
    icon = models.CharField("아이콘", max_length=50)
    icon_color = models.CharField("아이콘 색상", max_length=50)
    title = models.CharField("제목", max_length=200)
    description = models.CharField("설명", max_length=500)
    details = models.JSONField("세부 사항", default=list)
    order = models.PositiveIntegerField("순서", default=0)

    class Meta:
        db_table = "education_requirements"
        verbose_name = "교육 조건"
        verbose_name_plural = "교육 조건 목록"
        ordering = ["curriculum", "order"]

    def __str__(self):
        return f"{self.curriculum.title} - {self.title}"


class Material(models.Model):
    """수업 자료"""

    curriculum = models.ForeignKey(
        Curriculum, on_delete=models.CASCADE, related_name="materials"
    )
    category_id = models.CharField("카테고리 ID", max_length=50)
    category_title = models.CharField("카테고리 제목", max_length=200)
    material_id = models.CharField("자료 ID", max_length=50)
    title = models.CharField("제목", max_length=200)
    description = models.CharField("설명", max_length=500)
    icon = models.CharField("아이콘", max_length=50)
    format = models.CharField("포맷", max_length=50)
    pages = models.CharField("페이지/파일 수", max_length=50)
    size = models.CharField("크기", max_length=50)
    download_url = models.CharField("다운로드 URL", max_length=500)
    order = models.PositiveIntegerField("순서", default=0)

    class Meta:
        db_table = "materials"
        verbose_name = "수업 자료"
        verbose_name_plural = "수업 자료 목록"
        ordering = ["curriculum", "order"]

    def __str__(self):
        return f"{self.curriculum.title} - {self.title}"
