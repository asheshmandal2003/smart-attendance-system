from rest_framework import serializers
from .models import User

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'password', 'img_path', 'img_public_id']
        extra_kwargs = {'password': {'write_only': True}}

class UserSignupSerializer(UserProfileSerializer):
    def create(self, validated_data):
        user = User.objects.create(
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            email = validated_data['email'],
            img_path = validated_data['img_path'],
            img_public_id = validated_data['img_public_id']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta(UserProfileSerializer.Meta):
        fields = ['first_name', 'last_name', 'email', 'password', 'img_path', 'img_public_id']
        