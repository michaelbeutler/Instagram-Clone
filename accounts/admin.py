from django.contrib import admin
from .models import User
from .forms import CustomUserCreationForm, CustomUserChangeForm

# Register your models here.
class UserAdmin(User):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = ['email', 'username',]

admin.site.register(User)
