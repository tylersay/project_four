from django.urls import path, include, re_path
from rest_framework_simplejwt import views as jwt_views
from .views import TickerView


urlpatterns = [
path('auth/', include('rest_auth.urls')),    
path('auth/register/', include('rest_auth.registration.urls')),
path('dashboard/', TickerView.as_view(), name='dashboard')
]