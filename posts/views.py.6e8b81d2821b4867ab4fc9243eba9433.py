from django.shortcuts import render
from .models import Post, PostImage, Location
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.generic import TemplateView
from .models import Post, PostImage, Location
from django.contrib.humanize.templatetags.humanize import naturalday

class IndexView(TemplateView):
    template_name = "posts/index.html"

@require_http_methods(["GET"])
def get_posts(request):
    posts = Post.objects.all()
    data = {
        "code": 200,
        "description": "success",
        "data": {
            "posts": [
                {
                    "user": {
                        "username": posts[0].account.username,
                        "url": posts[0].account.slug,
                        "avatar": posts[0].account.avatar.url
                    },
                    "image": posts[0].image.image.url,
                    "location": posts[0].location.name,
                    "caption": posts[0].caption,
                    "date": naturalday(posts[0].date).upper(),
                    "comment": True,
                    "comments": [
                        {
                            "user": {
                                "username": posts[0].comments.all()[0].account.username,
                                "url": posts[0].comments.all()[0].account.slug,
                                "avatar": posts[0].comments.all()[0].account.avatar.url
                            },
                            "comment": posts[0].comments.all()[0].text
                        },
                        {
                            "user": {
                                "username": "michi.beutler",
                                "url": "slug",
                                "avatar": "img/42002584_995628447264876_5615867123332022272_n.jpg"
                            },
                            "comment": "test"
                        },
                        {
                            "user": {
                                "username": "michi.beutler",
                                "url": "slug",
                                "avatar": "img/42002584_995628447264876_5615867123332022272_n.jpg"
                            },
                            "comment": "test"
                        },
                        {
                            "user": {
                                "username": "michi.beutler",
                                "url": "slug",
                                "avatar": "img/42002584_995628447264876_5615867123332022272_n.jpg"
                            },
                            "comment": "test"
                        },
                        {
                            "user": {
                                "username": "michi.beutler",
                                "url": "slug",
                                "avatar": "img/42002584_995628447264876_5615867123332022272_n.jpg"
                            },
                            "comment": "test"
                        },
                        {
                            "user": {
                                "username": "michi.beutler",
                                "url": "slug",
                                "avatar": "img/42002584_995628447264876_5615867123332022272_n.jpg"
                            },
                            "comment": "test"
                        },
                        {
                            "user": {
                                "username": "michi.beutler",
                                "url": "slug",
                                "avatar": "img/42002584_995628447264876_5615867123332022272_n.jpg"
                            },
                            "comment": "test"
                        }
                    ],
                    "likes": [
                        {
                            "user": {
                                "username": "michi.beutler",
                                "url": "slug",
                                "avatar": "img/42002584_995628447264876_5615867123332022272_n.jpg"
                            },
                            "date": "2019/06/03"
                        },
                        {
                            "user": {
                                "username": "michi.beutler",
                                "url": "slug",
                                "avatar": "img/42002584_995628447264876_5615867123332022272_n.jpg"
                            },
                            "date": "2019/06/03"
                        },
                        {
                            "user": {
                                "username": "michi.beutler",
                                "url": "slug",
                                "avatar": "img/42002584_995628447264876_5615867123332022272_n.jpg"
                            },
                            "date": "2019/06/03"
                        },
                        {
                            "user": {
                                "username": "michi.beutler",
                                "url": "slug",
                                "avatar": "img/42002584_995628447264876_5615867123332022272_n.jpg"
                            },
                            "date": "2019/06/03"
                        },
                        {
                            "user": {
                                "username": "michi.beutler",
                                "url": "slug",
                                "avatar": "img/42002584_995628447264876_5615867123332022272_n.jpg"
                            },
                            "date": "2019/06/03"
                        },
                        {
                            "user": {
                                "username": "michi.beutler",
                                "url": "slug",
                                "avatar": "img/42002584_995628447264876_5615867123332022272_n.jpg"
                            },
                            "date": "2019/06/03"
                        },
                        {
                            "user": {
                                "username": "michi.beutler",
                                "url": "slug",
                                "avatar": "img/42002584_995628447264876_5615867123332022272_n.jpg"
                            },
                            "date": "2019/06/03"
                        }
                    ],
                    "liked": True
                },
                {
                    "user": {
                        "username": "michi.beutler",
                        "url": "slug",
                        "avatar": "img/42002584_995628447264876_5615867123332022272_n.jpg"
                    },
                    "image": "img/60450661_2376164995975286_6308187267627809876_n.jpg",
                    "location": "Example Location1",
                    "caption": "Love these sunsets#ktm🥰",
                    "date": "VOR 30 SEKUNDEN",
                    "comment": True,
                    "comments": [
                        {
                            "user": {
                                "username": "timon.74",
                                "url": "slug",
                                "avatar": "img/42002584_995628447264876_5615867123332022272_n.jpg"
                            },
                            "comment": "sooo niceeee 😍"
                        }
                    ],
                    "likes": [
                        {
                            "user": {
                                "username": "michi.beutler",
                                "url": "slug",
                                "avatar": "img/42002584_995628447264876_5615867123332022272_n.jpg"
                            },
                            "date": "2019/06/03"
                        }
                    ],
                    "liked": False
                }
            ]
        }
    }
    return JsonResponse(data)

    @require_http_methods(["GET"])
def get_posts(request):
    posts = Post.objects.all()
    data = {
        "code": 200,
        "description": "success",
        "data": {
            
                        "username": posts[0].account.username,
                        "url": posts[0].account.slug,
                        "avatar": posts[0].account.avatar.url
            
            
        }
    }
    return JsonResponse(data)
