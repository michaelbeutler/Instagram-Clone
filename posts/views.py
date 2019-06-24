from django.shortcuts import render
from .models import Post, Location, Like, Comment
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.generic import TemplateView, CreateView, ListView
from django.contrib.humanize.templatetags.humanize import naturaltime
from django.core import serializers
from django.shortcuts import get_object_or_404
from accounts.models import User
from django.urls import reverse_lazy

class IndexView(TemplateView):
    template_name = "posts/index.html"

import datetime
class NewView(CreateView):
    template_name = 'posts/new.html'
    model = Post
    fields = ['image', 'caption', 'location']
    success_url = reverse_lazy('home')

    def form_valid(self, form):
        if Location.objects.all().count() < 1:
            Location.objects.create(name="Switzerland", slug="switzerland")
        post = form.save(commit=False)
        post.account = self.request.user
        post.date = datetime.datetime.now()
        #article.save()  # This is redundant, see comments.
        return super(NewView, self).form_valid(form)

@require_http_methods(["POST"])
def upload_post_image(request):
    PostImage(image=request.file)
    return JsonResponse({'code':200, 'description':'success'})


@require_http_methods(["POST"])
def comment(request, pk):
    post = get_object_or_404(Post, pk=pk)
    comment = Comment(account=request.user, post=post, text=request.POST.get('text'))
    comment.save()
    
    return JsonResponse({'code':200, 'description':'success', 'data': request.POST})

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
        like_data = []
        liked = False
        comment_data = []
        for comment in post.comments.all():
            comment_data.append(
                {
                    "id": comment.pk,
                    "user": {
                        "id": comment.account.pk,
                        "username": comment.account.username,
                        "url": "accounts/" + comment.account.slug,
                        "avatar": comment.account.avatar.url
                    },
                    "comment": comment.text
                }
            )
            
            for like in post.likes.all():
                like_data.append(
                    {
                        "id": like.pk,
                        "user": {
                            "id": like.account.pk,
                            "username": like.account.username,
                            "url": "accounts/" + like.account.slug,
                            "avatar": like.account.avatar.url
                        }
                    }
                )
                if like.account == request.user:
                    liked = True

        if post.account.isAllowed(request.user):
            post_data.append({
                "id": post.pk,
                "user": {
                    "id": post.account.pk,
                    "username": post.account.username,
                    "url": "accounts/" + post.account.slug,
                    "avatar": post.account.avatar.url
                },
                "image": post.image.url,
                "location": {
                    "id": post.location.pk,
                    "name": post.location.name,
                    "url": post.location.name
                },
                "caption": post.caption,
                "date": naturaltime(post.date),
                "allowComment": True,
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
def get_locations(request):
    locations = Location.objects.all().order_by('-pk')[:10]
    location_data = []
    for l in locations:
        location_data.append({"id": l.pk, "name": l.name, "url": l.slug})
    data = {
        "code": 200,
        "description": "success",
        "data": {
            "locations": location_data
        }
    }
    return JsonResponse(data)

@require_http_methods(["GET"])
def get_current_user(request):
    data = {
        "code": 200,
        "description": "success",
        "data": {
            "user": {
                "id": request.user.pk,
                "username": request.user.username,
                "url": "accounts/" + request.user.slug,
                "avatar": request.user.avatar.url
            } 
        }
    }
    return JsonResponse(data)

@require_http_methods(["GET"])
def update(request):
    update = False
    data = {
        "code": 200,
        "description": "success",
        "data": {
            "update": update
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