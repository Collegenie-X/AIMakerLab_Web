"""
사용자 인증 Serializers
"""

from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

# from .models import UserProfile, UserCourseEnrollment  # TODO: 모델 생성 후 활성화

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """사용자 정보 Serializer"""

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "name",
            "phone",
            "email_verified",
            "social_provider",
            "date_joined",
            "last_login",
        ]
        read_only_fields = [
            "id",
            "email_verified",
            "social_provider",
            "date_joined",
            "last_login",
        ]


class UserRegistrationSerializer(serializers.ModelSerializer):
    """회원가입 Serializer"""

    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
        style={"input_type": "password"},
    )
    password2 = serializers.CharField(
        write_only=True, required=True, style={"input_type": "password"}
    )

    class Meta:
        model = User
        fields = ["email", "password", "password2", "name", "phone"]

    def validate(self, attrs):
        """비밀번호 확인"""
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError(
                {"password": "비밀번호가 일치하지 않습니다."}
            )
        return attrs

    def create(self, validated_data):
        """사용자 생성"""
        validated_data.pop("password2")
        user = User.objects.create_user(**validated_data)
        return user


class PasswordChangeSerializer(serializers.Serializer):
    """비밀번호 변경 Serializer"""

    old_password = serializers.CharField(
        required=True, style={"input_type": "password"}
    )
    new_password = serializers.CharField(
        required=True, validators=[validate_password], style={"input_type": "password"}
    )
    new_password2 = serializers.CharField(
        required=True, style={"input_type": "password"}
    )

    def validate(self, attrs):
        """새 비밀번호 확인"""
        if attrs["new_password"] != attrs["new_password2"]:
            raise serializers.ValidationError(
                {"new_password": "새 비밀번호가 일치하지 않습니다."}
            )
        return attrs

    def validate_old_password(self, value):
        """기존 비밀번호 확인"""
        user = self.context["request"].user
        if not user.check_password(value):
            raise serializers.ValidationError("기존 비밀번호가 올바르지 않습니다.")
        return value

    def save(self, **kwargs):
        """비밀번호 저장"""
        user = self.context["request"].user
        user.set_password(self.validated_data["new_password"])
        user.save()
        return user


class EmailVerificationSerializer(serializers.Serializer):
    """이메일 인증 Serializer"""

    token = serializers.CharField(required=True)

    def validate_token(self, value):
        """토큰 유효성 검증"""
        from .models import EmailVerification

        try:
            verification = EmailVerification.objects.get(token=value)
            if not verification.is_valid():
                raise serializers.ValidationError(
                    "만료되었거나 이미 사용된 토큰입니다."
                )
        except EmailVerification.DoesNotExist:
            raise serializers.ValidationError("유효하지 않은 토큰입니다.")

        return value


# ============================================
# 향후 확장: 사용자 프로필 & 수강 과정 Serializers
# ============================================
# UserProfile 및 UserCourseEnrollment 모델 생성 후 활성화

# class UserProfileSerializer(serializers.ModelSerializer):
#     """사용자 프로필 Serializer"""
#     user_email = serializers.EmailField(source='user.email', read_only=True)
#     user_name = serializers.CharField(source='user.name', read_only=True)
#
#     class Meta:
#         model = UserProfile
#         fields = ['id', 'user', 'user_email', 'user_name', 'bio', 'avatar', ...]

# class UserCourseEnrollmentSerializer(serializers.ModelSerializer):
#     """사용자 수강 과정 Serializer"""
#     user_email = serializers.EmailField(source='user.email', read_only=True)
#
#     class Meta:
#         model = UserCourseEnrollment
#         fields = ['id', 'user', 'course_title', 'status', ...]

# class UserCourseEnrollmentListSerializer(serializers.ModelSerializer):
#     """사용자 수강 과정 목록 Serializer"""
#     status_display = serializers.CharField(source='get_status_display', read_only=True)
#
#     class Meta:
#         model = UserCourseEnrollment
#         fields = ['id', 'course_title', 'status', ...]
