from django.urls import path
from .views import login_view, profile_view, contact_view

urlpatterns = [
    path('login/', login_view),
    path('profile/', profile_view),
    path("contact/", contact_view),
]
