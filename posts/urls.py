from django.urls import path
from .views import get_posts, get_profile, get_users, like, unlike, IndexView, NewView

urlpatterns = [
    path('', IndexView.as_view(), name='home'),
    path('new/', NewView.as_view(), name='new-post'),
    path('get_posts/', get_posts),
    path('get_users/', get_users),
    path('get_profile/', get_profile),
    path('like/<int:pk>', like),
    path('unlike/<int:pk>', unlike),
]
