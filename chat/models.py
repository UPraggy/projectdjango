from django.contrib.auth.models import User
from django.db import models
import django.utils.timezone
# Create your models here.

class AccountChat(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	profile_picture = models.CharField(max_length=100000, blank=True, null=True)

	def __str__(self):
		return self.user.username


class Room(models.Model):
	ROOM_CHOICES = (
        ("Public", "Public"),
        ("Private", "Private"),
        ("Group", "Group")
    )
	name = models.CharField(max_length=255)
	room_picture = models.FileField(upload_to='room_pictures', default='room_pictures/default.jpeg')
	slug = models.SlugField(unique=True)
	room_type = models.TextField(max_length=7, choices=ROOM_CHOICES, blank=False, null=False) # Public, Private, Group
	authorized_users = models.TextField(max_length=10000, null=True) #Users can use room

	def __str__(self):
		return self.name

class Message(models.Model):
	room = models.ForeignKey(Room, related_name='messages', on_delete=models.CASCADE)
	user = models.ForeignKey(User, related_name='messages', on_delete=models.CASCADE)
	content = models.TextField()
	date_added = models.DateTimeField(default=django.utils.timezone.now)#auto_now_add=True)

	def __str__(self):
		return self.room.name + " " + str(self.date_added)

	class Meta:
		ordering = ('date_added', )

