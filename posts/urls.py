from django.urls import path
from django.contrib.auth.decorators import login_required
from .views import get_posts, get_profile, upload_post_image, update, get_users, like, unlike, IndexView, NewView

urlpatterns = [
    path('', login_required(IndexView.as_view()), name='home'),
    path('new/', login_required(NewView.as_view()), name='new-post'),
    path('new/upload_post_image/', login_required(upload_post_image)),
    path('get_posts/', login_required(get_posts)),
    path('get_users/', login_required(get_users)),
    path('get_profile/', login_required(get_profile)),
    path('update_needed/', login_required(update)),
    path('like/<int:pk>', login_required(like)),
    path('unlike/<int:pk>', login_required(unlike)),
]
