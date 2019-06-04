from django.db import models
from django.utils.crypto import get_random_string
from accounts.models import User
import os

# Create your models here.
def user_post_path(instance, filename):
    return 'posts/{0}.{1}'.format(get_random_string(length=32), os.path.splitext(filename)[1])

class Post(models.Model):
    account         = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts', default=1)
    caption         = models.TextField(blank=True, max_length=100)
    location        = models.ForeignKey('Location', on_delete=models.CASCADE)
    image           = models.ForeignKey('PostImage', on_delete=models.CASCADE)
    date            = models.DateTimeField(auto_now=False, auto_now_add=False)

    def __str__(self):
        return self.caption

    def get_absolute_url(self):
        return reverse("Post_detail", kwargs={"pk": self.pk})

class PostImage(models.Model):
    image           = models.ImageField(upload_to=user_post_path, height_field=None, width_field=None, max_length=None)    

    def __str__(self):
        return self.image.url

    def get_absolute_url(self):
        return reverse("PostImage_detail", kwargs={"pk": self.pk})


class Location(models.Model):
    name            = models.CharField(max_length=50)
    slug            = models.SlugField()

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Location_detail", kwargs={"slug": self.slug})

class Comment(models.Model):
    account = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments', default=1)
    post = models.ForeignKey('Post', on_delete=models.CASCADE, related_name='comments', default=1)
    text = models.TextField(max_length=50, blank=False)

    def __str__(self):
        return self.text

    def get_absolute_url(self):
        return reverse("Comment_detail", kwargs={"pk": self.pk})
