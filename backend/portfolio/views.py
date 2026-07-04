
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from .models import Profile, Project, ProjectImage, Certificate
from .serializers import ProfileSerializer
from django.core.mail import send_mail
from django.conf import settings
from decouple import config 

ADMIN_USERNAME = config("USER_NAME", default="Username")
ADMIN_PASSWORD = config("PASSWORD", default="Password")

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')


    if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
        return Response({
            "success": True
        })

    return Response({
        "success": False,
        "message": "Invalid credentials"
    }, status=401)


@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
def profile_view(request):
    profile_obj = Profile.objects.first()
    
    if request.method == 'GET':
        if not profile_obj:
            profile_obj = Profile.objects.create()
        serializer = ProfileSerializer(profile_obj, context={'request': request})
        return Response(serializer.data)
        
    elif request.method == 'POST':
        if not profile_obj:
            profile_obj = Profile.objects.create()
        
        # Build data from text fields only — avoids deepcopy of unpicklable file objects
        data = request.POST.dict()
        
        # For file fields: use the new upload if provided, otherwise remove the
        # existing URL string so the serializer doesn't try to validate it as a file.
        # With partial=True, omitting a field means "leave the current value unchanged".
        for field in ('profilePic', 'resume'):
            if field in request.FILES:
                data[field] = request.FILES[field]   # new file upload
            else:
                data.pop(field, None)                # remove URL string — keep existing

            
        serializer = ProfileSerializer(profile_obj, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            
            # 1. Parse and Save Projects List
            projects_count_str = request.data.get('projects_count')
            if projects_count_str is not None:
                try:
                    projects_count = int(projects_count_str)
                except ValueError:
                    projects_count = 0
                
                for i in range(projects_count):
                    proj_id = request.data.get(f'projects[{i}][id]')
                    is_deleted = request.data.get(f'projects[{i}][isDeleted]') == 'true'
                    
                    if proj_id and is_deleted:
                        Project.objects.filter(profile=profile_obj, id=proj_id).delete()
                        continue
                    
                    if is_deleted:
                        continue
                        
                    title = request.data.get(f'projects[{i}][title]', '')
                    description = request.data.get(f'projects[{i}][description]', '')
                    tech = request.data.get(f'projects[{i}][tech]', '')
                    url = request.data.get(f'projects[{i}][url]', '')
                    main_image = request.FILES.get(f'projects[{i}][image]')
                    
                    project_obj = None
                    if proj_id:
                        project_obj = Project.objects.filter(profile=profile_obj, id=proj_id).first()
                        if project_obj:
                            project_obj.title = title
                            project_obj.description = description
                            project_obj.tech = tech
                            project_obj.url = url
                            if main_image:
                                project_obj.image = main_image
                            project_obj.save()
                    else:
                        project_obj = Project.objects.create(
                            profile=profile_obj,
                            title=title,
                            description=description,
                            tech=tech,
                            url=url,
                            image=main_image
                        )
                    
                    if project_obj:
                        # Handle new additional screenshots for this specific project
                        gallery_files = request.FILES.getlist(f'projects[{i}][gallery_images]')
                        for gf in gallery_files:
                            ProjectImage.objects.create(project=project_obj, image=gf)
                            
                        # Handle deletion of specific gallery images in this project
                        delete_gallery_ids = request.data.getlist(f'projects[{i}][delete_gallery_images]')
                        if delete_gallery_ids:
                            ProjectImage.objects.filter(project=project_obj, id__in=delete_gallery_ids).delete()

            # 2. Parse and Save Certificates List
            certs_count_str = request.data.get('certificates_count')
            if certs_count_str is not None:
                try:
                    certs_count = int(certs_count_str)
                except ValueError:
                    certs_count = 0
                    
                for i in range(certs_count):
                    cert_id = request.data.get(f'certificates[{i}][id]')
                    is_deleted = request.data.get(f'certificates[{i}][isDeleted]') == 'true'
                    
                    if cert_id and is_deleted:
                        Certificate.objects.filter(profile=profile_obj, id=cert_id).delete()
                        continue
                        
                    if is_deleted:
                        continue
                        
                    title = request.data.get(f'certificates[{i}][title]', '')
                    name = request.data.get(f'certificates[{i}][name]', '')
                    from_org = request.data.get(f'certificates[{i}][from_org]', '')
                    
                    if cert_id:
                        cert_obj = Certificate.objects.filter(profile=profile_obj, id=cert_id).first()
                        if cert_obj:
                            cert_obj.title = title
                            cert_obj.name = name
                            cert_obj.from_org = from_org
                            cert_obj.save()
                    else:
                        Certificate.objects.create(
                            profile=profile_obj,
                            title=title,
                            name=name,
                            from_org=from_org
                        )

            return Response({
                "success": True,
                "data": ProfileSerializer(profile_obj, context={'request': request}).data
            })
        # Convert errors dict to a readable string e.g. "name: This field is required."
        error_messages = []
        for field, msgs in serializer.errors.items():
            error_messages.append(f"{field}: {', '.join(str(m) for m in msgs)}")
        readable_errors = " | ".join(error_messages)
        print("[Profile serializer errors]", serializer.errors)  # visible in Django console
        return Response({
            "success": False,
            "message": readable_errors
        }, status=400)


@api_view(['POST'])
def contact_view(request):
    name = request.data.get('name', '').strip()
    email = request.data.get('email', '').strip()
    message = request.data.get('message', '').strip()

    if not name or not email or not message:
        return Response({'success': False, 'message': 'All fields are required.'}, status=400)

    subject = f"Portfolio Contact: Message from {name}"
    body = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"

    try:
        send_mail(
            subject,
            body,
            settings.EMAIL_HOST_USER,        # from
            [settings.EMAIL_RECIPIENT],      # to (your inbox)
            fail_silently=False,
        )
        return Response({'success': True, 'message': 'Message sent successfully!'})
    except Exception as e:
        return Response({'success': False, 'message': str(e)}, status=500)