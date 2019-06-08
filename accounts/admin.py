from django.contrib import admin
from .models import User, UserRelation
from .forms import CustomUserCreationForm, CustomUserChangeForm

# Register your models here.
class UserAdmin(User):
    model = User
    list_display = ['email', 'username',]

admin.site.register(User)
admin.site.register(UserRelation)
