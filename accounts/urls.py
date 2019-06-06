from django.urls import path
from .views import register, ProfileView

urlpatterns = [
    #path('', IndexView.as_view()),
    path('<str:slug>', ProfileView.as_view(), name="profile"),
    path('register/', register),
]
