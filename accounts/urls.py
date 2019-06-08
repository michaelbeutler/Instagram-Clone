from django.urls import path, include
from .views import register, ProfileView, logout_view
from django.contrib.auth.views import LoginView

urlpatterns = [
    #path('', IndexView.as_view()),
    path('<str:slug>', ProfileView.as_view(), name="profile"),
    path('register/', register, name="register"),
    path('logout/', logout_view, name="logout"),
    path('login/', LoginView.as_view(template_name='accounts/login.html'), name="login"),
]
