from django.urls import path
from .views import get_posts, get_profile, IndexView

urlpatterns = [
    path('', IndexView.as_view()),
    path('get_posts/', get_posts),
    path('get_profile/', get_profile),
]
