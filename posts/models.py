from django.db import models

# Create your models here.
class Post(models.Model):
    caption         = models.TextField(blank=True, max_length=100)
    location        = models.ManyToManyField(Location, blank=True, required=False)
    image           = models.ForeignKey(PostImage, on_delete=models.CASCADE)
    date            = models.DateTimeField(auto_now=False, auto_now_add=False)

    class Meta:
        verbose_name = _("Post")
        verbose_name_plural = _("Posts")

    def __str__(self):
        return self.caption

    def get_absolute_url(self):
        return reverse("Post_detail", kwargs={"pk": self.pk})

class PostImage(models.Model):
    image           = models.ImageField(upload_to=None, height_field=None, width_field=None, max_length=None)    

    class Meta:
        verbose_name = _("PostImage")
        verbose_name_plural = _("PostImages")

    def __str__(self):
        return self.image

    def get_absolute_url(self):
        return reverse("PostImage_detail", kwargs={"pk": self.pk})


class Location(models.Model):
    name            = models.CharField(max_length=50)
    slug            = models.SlugField()

    class Meta:
        verbose_name = _("Location")
        verbose_name_plural = _("Locations")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Location_detail", kwargs={"slug": self.slug})
