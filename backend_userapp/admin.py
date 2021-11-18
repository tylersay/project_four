from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Ticker
from .forms import CustomUserChangeForm, CustomUserCreationForm
# Register your models here.

class TickerInline(admin.TabularInline):
    model = Ticker
    extra = 3

class CustomUserAdmin(admin.ModelAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ['email']
    inlines = [TickerInline]



admin.site.register(CustomUser, CustomUserAdmin)