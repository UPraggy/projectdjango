from django.db import models

# Create your models here.
class Match(models.Model):
	roomname = models.CharField(max_length=40, blank=True, null=True)
	player1 = models.CharField(max_length=40, blank=True, null=True)
	player2 = models.CharField(max_length=40, blank=True, null=True)
	num_players = models.CharField(max_length=40, blank=True, null=True)

	def __str__(self):
		return self.roomname
