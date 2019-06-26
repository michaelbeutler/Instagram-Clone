from django.test import TestCase
from accounts.models import User, UserRelation
from .models import Post, Like, Comment, Location
from django.utils import timezone

# Create your tests here.
class PostTestCase(TestCase):
    def setUp(self):
        User.objects.create(username="t1", email="t1@localhost", password="test")
        User.objects.create(username="t2", email="t2@localhost", password="test")
        User.objects.create(username="t3", email="t3@localhost", password="test", bp=True)
        u = User.objects.get(username="t1")
        u1 = User.objects.get(username="t2")
        u2 = User.objects.get(username="t3")

        Location.objects.create(name="TestLab", slug="TestLab")
        l = Location.objects.get(name="TestLab")
        Post.objects.create(account=u, image="default", caption="test", date=timezone.now(), location=l)
        Post.objects.create(account=u1, image="default", caption="test", date=timezone.now(), location=l)
        Post.objects.create(account=u2, image="default", caption="test", date=timezone.now(), location=l)

    def test_post_values(self):
        u = User.objects.get(username="t1")
        p = Post.objects.get(account=u)
        self.assertEqual(p.caption, 'test')
        self.assertEqual(p.location.name, 'TestLab')
        self.assertEqual(p.account.username, 't1')
        

    def test_post_permissions(self):
        u = User.objects.get(username="t1")
        u2 = User.objects.get(username="t2")
        u3 = User.objects.get(username="t3")
        p = Post.objects.get(account=u)
        self.assertFalse(p.account.isAllowed(u2))

        UserRelation.objects.create(follower=u2, target=u, accepted=True)
        self.assertTrue(p.account.isAllowed(u2))

        p = Post.objects.get(account=u2)
        self.assertFalse(p.account.isAllowed(u))

        p = Post.objects.get(account=u3)
        self.assertTrue(p.account.isAllowed(u2))