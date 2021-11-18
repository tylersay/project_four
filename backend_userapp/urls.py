from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views


urlpatterns = [
path('auth/', include('rest_auth.urls')),    
path('auth/register/', include('rest_auth.registration.urls'))
]