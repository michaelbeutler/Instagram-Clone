from django.shortcuts import render
from .models import Post, PostImage, Location, Like
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.generic import TemplateView
from .models import Post, PostImage, Location
from django.contrib.humanize.templatetags.humanize import naturalday
from django.core import serializers
from django.shortcuts import get_object_or_404
from accounts.models import User

class IndexView(TemplateView):
    template_name = "posts/index.html"

class NewView(TemplateView):
    template_name = "posts/new.html"

@require_http_methods(["POST"])
def like(request, pk):
    post = get_object_or_404(Post, pk=pk)
    rows = Like.objects.filter(account=request.user, post=post)
    
    for r in rows:
        r.delete()

    like = Like(account=request.user, post=post)
    like.save()
    
    return JsonResponse({'code':200, 'description':'success'})

@require_http_methods(["POST"])
def unlike(request, pk):
    post = get_object_or_404(Post, pk=pk)
    rows = Like.objects.filter(account=request.user, post=post)
    
    for r in rows:
        r.delete()

    return JsonResponse({'code':200, 'description':'success'})

@require_http_methods(["GET"])
def get_posts(request):
    posts = Post.objects.all()
    post_data = []
    for post in posts:
        comment_data = []
        for comment in post.comments.all():
            comment_data.append(
                {
                    "user": {
                        "username": comment.account.username,
                        "url": "accounts/" + comment.account.slug,
                        "avatar": comment.account.avatar.url
                    },
                    "comment": comment.text
                }
            )
        like_data = []
        liked = False
        for like in post.likes.all():
            like_data.append(
                {
                    "user": {
                        "username": like.account.username,
                        "url": "accounts/" + like.account.slug,
                        "avatar": like.account.avatar.url
                    }
                }
            )
            if like.account == request.user:
                liked = True

        post_data.append({
            "id": post.pk,
            "user": {
                "username": post.account.username,
                "url": "accounts/" + post.account.slug,
                "avatar": post.account.avatar.url
            },
            "image": post.image.image.url,
            "location": {
                "name": post.location.name,
                "url": post.location.name
            },
            "caption": post.caption,
            "date": naturalday(post.date).upper(),
            "comment": True,
            "comments": comment_data,
            "likes": like_data,
            "liked": liked       
        })
    

    data = {
        "code": 200,
        "description": "success",
        "data": {
            "posts": post_data
        }
    }
    return JsonResponse(data)

@require_http_methods(["GET"])
def get_profile(request):
    data = {
        "code": 200,
        "description": "success",
        "data": {
            "username": request.user.username,
            "url": "accounts/" + request.user.slug,
            "avatar": request.user.avatar.url
        }
    }
    return JsonResponse(data)

@require_http_methods(["GET"])
def get_users(request):
    users = User.objects.all()
    users_data = []
    for user in users:
        users_data.append({
            "id": user.pk,
            "username": user.username,
            "url": "accounts/" + user.slug,
            "avatar": user.avatar.url
        })

    data = {
        "code": 200,
        "description": "success",
        "data": {
            "users": users_data
        }
    }
    return JsonResponse(data)