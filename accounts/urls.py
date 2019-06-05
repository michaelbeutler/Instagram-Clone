from django.urls import path
from .views import RegisterView, ProfileView

urlpatterns = [
    #path('', IndexView.as_view()),
    path('<str:username>', ProfileView.as_view(), name="profile"),
    path('register/', RegisterView.as_view()),
]
