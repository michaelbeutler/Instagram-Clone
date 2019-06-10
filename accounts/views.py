from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect, get_object_or_404
from .forms import CustomUserCreationForm
from django.views.generic import CreateView, DetailView, UpdateView
from .models import User, UserRelation
from django.utils.text import slugify
from django.contrib.auth import logout
from django.urls import reverse_lazy
from django.http import JsonResponse

def logout_view(request):
    logout(request)
    return redirect('login')

def follow(request, pk):
    target = get_object_or_404(User, pk=pk)
    num_results = UserRelation.objects.filter(follower=request.user, target=target).count()
    if num_results == 0:
        ur = UserRelation(follower=request.user, target=target, accepted=True)
        ur.save()
        return JsonResponse({'code':201, 'description':'success'})
    return JsonResponse({'code':200, 'description':'already following'})

# Create your views here.
class RegisterView(CreateView):
    model = User
    slug_field = 'username'
    slug_kwargs = 'username'
    template_name = "accounts/register.html"
    fields = ['username', 'email', 'password']

def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            email = form.cleaned_data.get('email')
            raw_password = form.cleaned_data.get('password1')
            user = User(username=username, password=raw_password, email=email)
            return redirect('home')
    else:
        form = CustomUserCreationForm()
    return render(request, 'accounts/register.html', {'form': form})

class ProfileView(UpdateView):
    model = User
    template_name = 'accounts/profile.html'
    fields = ['avatar', 'fullname', 'username', 'bio']
    success_url = reverse_lazy('home')

    def get_queryset(self, *args, **kwargs):
        if (self.kwargs['slug'][0] == '@'):
            self.kwargs['slug'] = self.kwargs['slug'][:1]
        return super().get_queryset(*args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(ProfileView, self).get_context_data(**kwargs)
        if self.request.user == context['object']:
            context['is_current_user'] = True
        else:
            context['is_current_user'] = False
            for r in context['object'].getFollowers():
                if r.accepted and r.follower == self.request.user:
                    context['following'] = True
                else:
                    context['following'] = False
        return context