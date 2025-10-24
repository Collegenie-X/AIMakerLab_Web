"""
사용자 인증 Views
"""

from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta
import uuid

from .models import EmailVerification
from .serializers import (
    UserSerializer,
    UserRegistrationSerializer,
    PasswordChangeSerializer,
    EmailVerificationSerializer
)

User = get_user_model()


class UserProfileView(generics.RetrieveUpdateAPIView):
    """사용자 프로필 조회 및 수정"""
    
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user


class UserRegistrationView(generics.CreateAPIView):
    """회원가입"""
    
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # 이메일 인증 토큰 생성
        token = str(uuid.uuid4())
        expires_at = timezone.now() + timedelta(days=1)
        
        EmailVerification.objects.create(
            user=user,
            token=token,
            expires_at=expires_at
        )
        
        # TODO: 이메일 전송 (실제 구현 시 celery 등 활용)
        # send_verification_email(user.email, token)
        
        return Response({
            'message': '회원가입이 완료되었습니다. 이메일을 확인해주세요.',
            'user': UserSerializer(user).data,
        }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([AllowAny])
def verify_email(request):
    """이메일 인증"""
    serializer = EmailVerificationSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    
    token = serializer.validated_data['token']
    
    try:
        verification = EmailVerification.objects.get(token=token)
        
        if not verification.is_valid():
            return Response({
                'error': '만료되었거나 이미 사용된 토큰입니다.'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # 이메일 인증 완료
        verification.user.email_verified = True
        verification.user.save()
        
        verification.is_used = True
        verification.save()
        
        return Response({
            'message': '이메일 인증이 완료되었습니다.',
        }, status=status.HTTP_200_OK)
        
    except EmailVerification.DoesNotExist:
        return Response({
            'error': '유효하지 않은 토큰입니다.'
        }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def resend_verification_email(request):
    """인증 이메일 재전송"""
    user = request.user
    
    if user.email_verified:
        return Response({
            'message': '이미 이메일 인증이 완료되었습니다.'
        }, status=status.HTTP_200_OK)
    
    # 기존 미사용 토큰 삭제
    EmailVerification.objects.filter(user=user, is_used=False).delete()
    
    # 새 토큰 생성
    token = str(uuid.uuid4())
    expires_at = timezone.now() + timedelta(days=1)
    
    EmailVerification.objects.create(
        user=user,
        token=token,
        expires_at=expires_at
    )
    
    # TODO: 이메일 전송
    # send_verification_email(user.email, token)
    
    return Response({
        'message': '인증 이메일이 재전송되었습니다.'
    }, status=status.HTTP_200_OK)


class PasswordChangeView(generics.GenericAPIView):
    """비밀번호 변경"""
    
    serializer_class = PasswordChangeSerializer
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response({
            'message': '비밀번호가 변경되었습니다.'
        }, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """로그아웃"""
    try:
        refresh_token = request.data.get('refresh_token')
        if refresh_token:
            token = RefreshToken(refresh_token)
            token.blacklist()
        
        return Response({
            'message': '로그아웃되었습니다.'
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=status.HTTP_400_BAD_REQUEST)
