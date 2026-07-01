import os
from django.db import models

def upload_resume(instance, filename):
    # Always save as 'resume.<ext>' — overwrites old file, no random suffix
    ext = os.path.splitext(filename)[1]
    return f'resumes/resume{ext}'

def upload_profile_pic(instance, filename):
    ext = os.path.splitext(filename)[1]
    return f'profiles/profile_pic{ext}'

def upload_project_thumbnail(instance, filename):
    ext = os.path.splitext(filename)[1]
    return f'projects/project_{instance.id or "new"}_thumb{ext}'

# Create your models here.

class Profile(models.Model):
    # Profile Info
    profilePic = models.FileField(upload_to=upload_profile_pic, null=True, blank=True)
    resume = models.FileField(upload_to=upload_resume, null=True, blank=True)
    
    # Skills Section
    skillCategory = models.CharField(max_length=100, default='Frontend')
    skills = models.TextField(blank=True, default='')
    frontendSkills = models.TextField(blank=True, default='')
    backendSkills = models.TextField(blank=True, default='')
    databaseSkills = models.TextField(blank=True, default='')
    toolsSkills = models.TextField(blank=True, default='')
    aiMlSkills = models.TextField(blank=True, default='')
    otherSkills = models.TextField(blank=True, default='')
    
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

    def save(self, *args, **kwargs):
        # Delete old resume file if a new one is being uploaded
        if self.pk:
            try:
                old = Profile.objects.get(pk=self.pk)
                if old.resume and self.resume and old.resume != self.resume:
                    if os.path.isfile(old.resume.path):
                        os.remove(old.resume.path)
                if old.profilePic and self.profilePic and old.profilePic != self.profilePic:
                    if os.path.isfile(old.profilePic.path):
                        os.remove(old.profilePic.path)
            except Profile.DoesNotExist:
                pass
        super().save(*args, **kwargs)




class Project(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='projects')
    title = models.CharField(max_length=255, blank=True, default='')
    description = models.TextField(blank=True, default='')
    tech = models.CharField(max_length=255, blank=True, default='')
    url = models.URLField(blank=True, default='')
    image = models.FileField(upload_to='projects/', null=True, blank=True)

    def __str__(self):
        return f"Project: {self.title}"


class ProjectImage(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='images', null=True, blank=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='images', null=True, blank=True)
    image = models.FileField(upload_to='projects/')

    def __str__(self):
        return f"Project Image - {self.id}"


class Certificate(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='certificates')
    title = models.CharField(max_length=255, blank=True, default='')
    name = models.CharField(max_length=255, blank=True, default='')
    from_org = models.CharField(max_length=255, blank=True, default='')

    def __str__(self):
        return f"Certificate: {self.name}"



