from django.urls import path, include
from .views import register, ProfileView, logout_view, follow, unfollow, get_latest_users
from django.contrib.auth.views import LoginView
from django.contrib.auth.decorators import login_required

urlpatterns = [
    #path('', IndexView.as_view()),
    path('<str:slug>', login_required(ProfileView.as_view()), name="profile"),
    path('register/', register, name="register"),
    path('logout/', logout_view, name="logout"),
    path('login/', LoginView.as_view(template_name='accounts/login.html'), name="login"),
    path('follow/<int:pk>', (follow), name="follow"),
    path('unfollow/<int:pk>', login_required(unfollow), name="unfollow"),
    path('get_latest_users/', login_required(get_latest_users), name="get_latest_users"),
]
