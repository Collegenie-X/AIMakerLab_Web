"""
문의 모델 (수업 문의, 일정)
"""

from django.db import models


class Inquiry(models.Model):
    """수업 문의"""
    
    STATUS_CHOICES = [
        ('pending', '접수대기'),
        ('reviewing', '검토중'),
        ('quoted', '견적발송'),
        ('confirmed', '확정'),
        ('completed', '완료'),
    ]
    
    inquiry_id = models.IntegerField('문의 ID', unique=True)
    title = models.CharField('제목', max_length=200)
    category = models.CharField('카테고리', max_length=100)
    status = models.CharField('상태', max_length=50, choices=STATUS_CHOICES, default='pending')
    date = models.DateField('문의일')
    
    # 문의자 정보
    requester_name = models.CharField('문의자 이름', max_length=100)
    requester_contact = models.CharField('연락처', max_length=50)
    requester_email = models.EmailField('이메일')
    
    # 수업 정보
    course = models.CharField('수업 과정', max_length=200)
    grade = models.CharField('대상 학년', max_length=100)
    participant_count = models.CharField('참여 인원', max_length=100)
    location = models.CharField('장소', max_length=500)
    budget = models.CharField('예산', max_length=100)
    
    # 희망 일정
    preferred_date = models.DateField('희망 날짜', null=True, blank=True)
    preferred_time = models.TimeField('희망 시간', null=True, blank=True)
    duration = models.CharField('희망 기간', max_length=100)
    
    # 문의 내용
    content = models.TextField('문의 내용')
    
    # 타임스탬프
    created_at = models.DateTimeField('생성일', auto_now_add=True)
    updated_at = models.DateTimeField('수정일', auto_now=True)
    
    class Meta:
        db_table = 'inquiries'
        verbose_name = '수업 문의'
        verbose_name_plural = '수업 문의 목록'
        ordering = ['-date']
    
    def __str__(self):
        return f'{self.title} - {self.requester_name}'


class Schedule(models.Model):
    """수업 일정"""
    
    SCHEDULE_TYPE_CHOICES = [
        ('weekday', '주중 수업'),
        ('weekend', '주말 수업'),
    ]
    
    schedule_id = models.CharField('일정 ID', max_length=100, unique=True)
    schedule_type = models.CharField('일정 유형', max_length=50, choices=SCHEDULE_TYPE_CHOICES)
    title = models.CharField('제목', max_length=200)
    course = models.CharField('수업 과정', max_length=200)
    instructor = models.CharField('강사', max_length=100)
    
    # 일정 정보
    date = models.DateField('날짜')
    start_time = models.TimeField('시작 시간')
    end_time = models.TimeField('종료 시간')
    duration = models.CharField('기간', max_length=100)
    
    # 수업 정보
    target_grade = models.CharField('대상 학년', max_length=100)
    max_students = models.IntegerField('최대 인원')
    current_students = models.IntegerField('현재 인원', default=0)
    location = models.CharField('장소', max_length=500)
    
    # 추가 정보
    description = models.TextField('설명', blank=True)
    requirements = models.JSONField('준비물', default=list)
    is_available = models.BooleanField('수강 가능', default=True)
    
    # 순서
    order = models.PositiveIntegerField('정렬 순서', default=0)
    
    # 타임스탬프
    created_at = models.DateTimeField('생성일', auto_now_add=True)
    updated_at = models.DateTimeField('수정일', auto_now=True)
    
    class Meta:
        db_table = 'schedules'
        verbose_name = '수업 일정'
        verbose_name_plural = '수업 일정 목록'
        ordering = ['date', 'start_time']
    
    def __str__(self):
        return f'{self.title} - {self.date}'
    
    @property
    def is_full(self):
        """정원 초과 여부"""
        return self.current_students >= self.max_students
