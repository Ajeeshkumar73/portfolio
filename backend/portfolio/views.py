
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from .models import Profile, ProjectImage
from .serializers import ProfileSerializer

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')


    if (username=="Ajeesh" and password =="112233") :
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
        
        data = request.data.copy()
        
        # If the frontend sent existing URL strings for files, remove them from data so they are not cleared.
        if 'profilePic' in data and isinstance(data['profilePic'], str):
            del data['profilePic']
        if 'projectImage' in data and isinstance(data['projectImage'], str):
            del data['projectImage']
            
        serializer = ProfileSerializer(profile_obj, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            
            # Handle multiple project images uploaded
            files = request.FILES.getlist('project_images')
            for f in files:
                ProjectImage.objects.create(profile=profile_obj, image=f)

            # Handle deletion of project images
            delete_ids = request.data.getlist('delete_images')
            if delete_ids:
                ProjectImage.objects.filter(profile=profile_obj, id__in=delete_ids).delete()

            return Response({
                "success": True,
                "data": ProfileSerializer(profile_obj, context={'request': request}).data
            })
        return Response({
            "success": False,
            "message": serializer.errors
        }, status=400)
