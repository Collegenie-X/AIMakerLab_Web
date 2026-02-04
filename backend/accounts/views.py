"""
사용자 인증 Views
"""

from rest_framework import status, generics, permissions, viewsets
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta
import uuid

from .models import EmailVerification, UserProfile, UserCourseEnrollment
from .serializers import (
    UserSerializer,
    UserRegistrationSerializer,
    PasswordChangeSerializer,
    EmailVerificationSerializer,
    UserProfileSerializer,
    UserCourseEnrollmentSerializer,
    UserCourseEnrollmentListSerializer,
)
from .data_source_utils import get_data_source_config, load_json_file, save_json_file

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


class UserProfileViewSet(viewsets.ModelViewSet):
    """사용자 프로필 ViewSet (CRUD)"""
    
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """현재 사용자의 프로필만 조회"""
        return UserProfile.objects.filter(user=self.request.user)
    
    def retrieve(self, request, *args, **kwargs):
        """프로필 조회 (JSON 또는 DB)"""
        use_json = get_data_source_config('user_profile')
        
        if use_json:
            data = load_json_file('user-profile.json')
            if data:
                return Response(data)
        
        # DB에서 조회
        try:
            profile = UserProfile.objects.get(user=request.user)
            serializer = self.get_serializer(profile)
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            # 프로필이 없으면 자동 생성
            profile = UserProfile.objects.create(user=request.user)
            serializer = self.get_serializer(profile)
            return Response(serializer.data)
    
    def update(self, request, *args, **kwargs):
        """프로필 수정"""
        use_json = get_data_source_config('user_profile')
        
        if use_json:
            # JSON 파일에 저장
            data = request.data
            save_json_file('user-profile.json', data)
            return Response(data)
        
        # DB에 저장
        return super().update(request, *args, **kwargs)


class UserCourseEnrollmentViewSet(viewsets.ModelViewSet):
    """사용자 수강 과정 ViewSet (나의 강의 - CRUD)"""
    
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        """액션에 따라 다른 Serializer 사용"""
        if self.action == 'list':
            return UserCourseEnrollmentListSerializer
        return UserCourseEnrollmentSerializer
    
    def get_queryset(self):
        """현재 사용자의 수강 과정만 조회"""
        return UserCourseEnrollment.objects.filter(user=self.request.user)
    
    def list(self, request, *args, **kwargs):
        """수강 과정 목록 조회 (JSON 또는 DB)"""
        use_json = get_data_source_config('user_courses')
        
        if use_json:
            data = load_json_file('user-courses.json')
            if data:
                return Response(data)
        
        # DB에서 조회
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request, *args, **kwargs):
        """수강 과정 추가"""
        use_json = get_data_source_config('user_courses')
        
        if use_json:
            # JSON 파일에 추가
            data = load_json_file('user-courses.json') or []
            new_item = request.data
            new_item['id'] = len(data) + 1
            data.append(new_item)
            save_json_file('user-courses.json', data)
            return Response(new_item, status=status.HTTP_201_CREATED)
        
        # DB에 저장
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def update(self, request, *args, **kwargs):
        """수강 과정 수정"""
        use_json = get_data_source_config('user_courses')
        
        if use_json:
            # JSON 파일에서 수정
            data = load_json_file('user-courses.json') or []
            item_id = int(kwargs.get('pk'))
            
            for i, item in enumerate(data):
                if item.get('id') == item_id:
                    data[i] = {**item, **request.data}
                    save_json_file('user-courses.json', data)
                    return Response(data[i])
            
            return Response({'error': '항목을 찾을 수 없습니다.'}, status=status.HTTP_404_NOT_FOUND)
        
        # DB에서 수정
        return super().update(request, *args, **kwargs)
    
    def destroy(self, request, *args, **kwargs):
        """수강 과정 삭제"""
        use_json = get_data_source_config('user_courses')
        
        if use_json:
            # JSON 파일에서 삭제
            data = load_json_file('user-courses.json') or []
            item_id = int(kwargs.get('pk'))
            
            data = [item for item in data if item.get('id') != item_id]
            save_json_file('user-courses.json', data)
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        # DB에서 삭제
        return super().destroy(request, *args, **kwargs)
