from django import forms
from django.contrib.auth.forms import UserChangeForm, UserCreationForm 
from .models import CustomUser, Ticker 
 
class CustomUserCreationForm(UserCreationForm):    
    class Meta:        
        model = CustomUser        
        fields = ('email',)  
class CustomUserChangeForm(UserChangeForm):    
    class Meta:        
        model = CustomUser        
        fields = UserChangeForm.Meta.fields

 
class TickerChangeForm(UserChangeForm):    
    class Meta:        
        model = Ticker        
        fields = UserChangeForm.Meta.fields

