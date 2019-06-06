from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect
from .forms import UserCreationForm
from django.views.generic import CreateView, DetailView
from .models import User
from django.utils.text import slugify

# Create your views here.
class RegisterView(CreateView):
    model = User
    slug_field = 'username'
    slug_kwargs = 'username'
    template_name = "accounts/register.html"
    fields = ['username', 'email', 'password']

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            email = form.cleaned_data.get('email')
            raw_password = form.cleaned_data.get('password1')
            user = User(username=username, password=raw_password, email=email)
            return redirect('home')
    else:
        form = UserCreationForm()
    return render(request, 'accounts/register.html', {'form': form})

class ProfileView(DetailView):
    model = User
    template_name = 'accounts/profile.html'

    def get_queryset(self, *args, **kwargs):
        if (self.kwargs['slug'][0] == '@'):
            self.kwargs['slug'] = slugify(self.kwargs['slug'][:1])
        return super().get_queryset(*args, **kwargs)