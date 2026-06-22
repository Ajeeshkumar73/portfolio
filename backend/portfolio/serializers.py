from rest_framework import serializers
from .models import Profile, ProjectImage

class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    images = ProjectImageSerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = '__all__'

