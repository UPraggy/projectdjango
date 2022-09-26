from django.db import models
from django.contrib.auth.models import User
import django.utils.timezone

# Create your models here.
class Automail(models.Model):
	user = models.ForeignKey(User, related_name='automail', on_delete=models.CASCADE)
	to_email = models.EmailField(max_length=254)
	subject = models.CharField(max_length=50)
	content = models.TextField()
	date_added = models.DateTimeField(default=django.utils.timezone.now)

	def __str__(self):
		day = self.date_added.day
		month = self.date_added.month
		if (day < 10):
			day = '0'+ str(day)
		if (month < 10):
			month = '0'+ str(month)
		return f'{self.user.username} - {self.subject} | {day}-{month}-{self.date_added.year}'