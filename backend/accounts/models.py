"""
사용자 인증 모델

이메일 기반 로그인 및 소셜 로그인을 지원합니다.
"""

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone


class CustomUserManager(BaseUserManager):
    """커스텀 사용자 매니저"""
    
    def create_user(self, email, password=None, **extra_fields):
        """일반 사용자 생성"""
        if not email:
            raise ValueError('이메일은 필수입니다')
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        """슈퍼유저 생성"""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('슈퍼유저는 is_staff=True여야 합니다')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('슈퍼유저는 is_superuser=True여야 합니다')
        
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """커스텀 사용자 모델 - 이메일 기반 로그인"""
    
    email = models.EmailField('이메일', unique=True)
    name = models.CharField('이름', max_length=50, blank=True)
    phone = models.CharField('전화번호', max_length=20, blank=True)
    
    # 권한 관련
    is_active = models.BooleanField('활성 상태', default=True)
    is_staff = models.BooleanField('스태프 권한', default=False)
    is_superuser = models.BooleanField('슈퍼유저 권한', default=False)
    
    # 이메일 인증
    email_verified = models.BooleanField('이메일 인증 완료', default=False)
    
    # 소셜 로그인 정보
    social_provider = models.CharField(
        '소셜 로그인 제공자',
        max_length=20,
        blank=True,
        null=True,
        choices=[
            ('google', 'Google'),
            ('kakao', 'Kakao'),
        ]
    )
    social_id = models.CharField('소셜 ID', max_length=255, blank=True, null=True)
    
    # 타임스탬프
    date_joined = models.DateTimeField('가입일', default=timezone.now)
    last_login = models.DateTimeField('최근 로그인', blank=True, null=True)
    
    objects = CustomUserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    class Meta:
        db_table = 'users'
        verbose_name = '사용자'
        verbose_name_plural = '사용자 목록'
        ordering = ['-date_joined']
    
    def __str__(self):
        return self.email
    
    def get_full_name(self):
        return self.name or self.email
    
    def get_short_name(self):
        return self.name or self.email.split('@')[0]


class EmailVerification(models.Model):
    """이메일 인증 토큰"""
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='email_verifications')
    token = models.CharField('인증 토큰', max_length=255, unique=True)
    created_at = models.DateTimeField('생성일시', auto_now_add=True)
    expires_at = models.DateTimeField('만료일시')
    is_used = models.BooleanField('사용 완료', default=False)
    
    class Meta:
        db_table = 'email_verifications'
        verbose_name = '이메일 인증'
        verbose_name_plural = '이메일 인증 목록'
        ordering = ['-created_at']
    
    def __str__(self):
        return f'{self.user.email} - {self.token[:20]}'
    
    def is_valid(self):
        """토큰이 유효한지 확인"""
        return not self.is_used and self.expires_at > timezone.now()
