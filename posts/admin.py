from django.contrib import admin
from .models import Post, PostImage, Location, Comment

# Register your models here.
admin.site.register(Post)
admin.site.register(PostImage)
admin.site.register(Location)
admin.site.register(Comment)