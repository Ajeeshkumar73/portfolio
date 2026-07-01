from rest_framework import serializers
from .models import Profile, Project, ProjectImage, Certificate

class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    images = ProjectImageSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = '__all__'

class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    images = ProjectImageSerializer(many=True, read_only=True)
    projects = ProjectSerializer(many=True, read_only=True)
    certificates = CertificateSerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = '__all__'


