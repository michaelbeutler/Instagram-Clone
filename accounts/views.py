from django.shortcuts import render
from django.views.generic import CreateView, DetailView
from .models import User

# Create your views here.
class RegisterView(CreateView):
    model = User
    template_name = "accounts/register.html"
    fields = ['username', 'email', 'password']

class ProfileView(DetailView):
    model = User
    slug_field = 'slug'
    slug_url_kwarg = 'username'
    template_name = 'accounts/profile.html'
