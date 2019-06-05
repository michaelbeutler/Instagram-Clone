from django.shortcuts import render
from .models import Post, PostImage, Location
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.generic import TemplateView
from .models import Post, PostImage, Location
from django.contrib.humanize.templatetags.humanize import naturalday
from django.core import serializers

class IndexView(TemplateView):
    template_name = "posts/index.html"


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
        post_data.append({
            "user": {
                "username": post.account.username,
                "url": "accounts/" + post.account.slug,
                "avatar": post.account.avatar.url
            },
            "image": post.image.image.url,
            "location": post.location.name,
            "caption": post.caption,
            "date": naturalday(post.date).upper(),
            "comment": True,
            "comments": comment_data,
            "likes": [],
            "liked": False       
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
