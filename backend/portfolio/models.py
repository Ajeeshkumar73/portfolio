from django.db import models

# Create your models here.

class Profile(models.Model):
    # Profile Info
    profilePic = models.FileField(upload_to='profiles/', null=True, blank=True)
    
    # Skills Section
    skillCategory = models.CharField(max_length=100, default='Frontend')
    skills = models.TextField(blank=True, default='')
    
    # Project Section
    projectTitle = models.CharField(max_length=255, blank=True, default='')
    projectDescription = models.TextField(blank=True, default='')
    projectTech = models.CharField(max_length=255, blank=True, default='')
    projectUrl = models.URLField(blank=True, default='')
    projectImage = models.FileField(upload_to='projects/', null=True, blank=True)
    
    # Certification Section
    certificationTitle = models.CharField(max_length=255, blank=True, default='')
    certificateName = models.CharField(max_length=255, blank=True, default='')
    certificateFrom = models.CharField(max_length=255, blank=True, default='')

    def __str__(self):
        return f"Portfolio Profile - {self.skillCategory}"


class ProjectImage(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='images')
    image = models.FileField(upload_to='projects/')

    def __str__(self):
        return f"Project Image - {self.id}"


