from __future__ import unicode_literals

from django.db import models
from django.core.mail import send_mail
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import ugettext_lazy as _
from django.utils.text import slugify

from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(default='', unique=True)
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=30, blank=True)
    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
    is_active = models.BooleanField(_('active'), default=True)
    is_staff = models.BooleanField(_('staff'), default=False)
    avatar = models.ImageField(upload_to='avatars/', default='avatars/default.jpg', null=True, blank=True)
    bio = models.TextField(max_length=100, blank=True)
    bp = models.BooleanField(default=False)
    fullname = models.CharField(max_length=30, blank=True)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def getFollowers(self):
        return self.followers.all()

    def getFollowing(self):
        return self.following.all()

    def save(self, *args, **kwargs):
        self.slug = slugify(self.username)
        #self.set_password(self.password)
        super(User, self).save(*args, **kwargs)

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def get_full_name(self):
        return self.username

    def get_short_name(self):
        return self.username

    def get_absolute_url(self):
        return reverse("profile", kwargs={"slug": self.slug})

class UserRelation(models.Model):
    follower = models.ForeignKey("User", on_delete=models.CASCADE, related_name='following')
    target = models.ForeignKey("User", on_delete=models.CASCADE, related_name='followers')
    accepted = models.BooleanField(default=False)

    class Meta:
        verbose_name = _("UserRelation")
        verbose_name_plural = _("UserRelations")

    def __str__(self):
        return self.follower.username + " follows " + self.target.username + " | accepted: " + str(self.accepted)
